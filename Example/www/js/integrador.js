angular.module('integrador', ['ionic','starter'])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$stateProvider){
	$urlRouterProvider.otherwise('/integrador');

	var integrador = {
		name: 'integrador',
		url: '/integrador',
		cache:false,
		params: {
			param1: { array: true }
		},
		templateUrl: 'integrador.html',
		controller: 'AppCtrl'};

		var vip = {
		name: 'vip',
		cache:false,
		url: '/vip',
		templateUrl: 'vip.html',
		controller: 'ProductCtrl'
	};

	var payment_methods = {
		name: 'payment_methods',
		cache:false,
		url: '/:product_id/:payment_method_id',
		templateUrl: 'payment_methods.html',
		controller: 'PaymentMethodsCtrl'
	};

	var card_issuers = {
		name: 'card_issuers',
		cache:false,
		url: '/:product_id/:payment_method_id/:issuer_id',
		templateUrl: 'card_issuers.html',
		controller: 'CardIssuersCtrl'
	};

	var installments = {
		name: 'installments',
		cache:false,
		url: '/:product_id/:payment_method_id/:issuer_id/:installments',
		templateUrl: 'installments.html',
		controller: 'InstallmentsCtrl'
	};

	var card_form = {
		name: 'card_form',
		cache:false,
		url: '/:product_id/:payment_method_id/:issuer_id/:installments/:token',
		templateUrl: 'card_form.html',
		controller: 'CardFormCtrl'
	};

	var payment_result = {
		name: 'payment_result',
		cache:false,
		url: '/:product_id/:payment_method_id/:issuer_id/:installments/:token/payment_result',
		templateUrl: 'payment_result.html',
		controller: 'PaymentCtrl'
	};

	var payment_result_off = {
		name: 'payment_result_off',
		cache:false,
		url: '/:product_id/:payment_method_id/payment_result_off',
		templateUrl: 'payment_result.html',
		controller: 'PaymentCtrl'
	};

	$stateProvider
		.state(vip)
		.state(payment_methods)
		.state(card_issuers)
		.state(installments)
		.state(card_form)
		.state(payment_result)
		.state(payment_result_off)
		.state(integrador)

	})
.run(function($ionicPlatform, $rootScope, $state) {
	$ionicPlatform.ready(function() {});
	$rootScope.noCardIssuers=false;
})
.controller('AppCtrl', function($scope, MercadoPagoService, $rootScope, $state ){
	MercadoPagoService.setAccessToken("APP_USR-244508097630521-031308-29cafdb25ffb6404fba1f5e24e0c4599__LA_LD__-150216849");
	MercadoPagoService.setPublicKey("TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a");
	MercadoPagoService.setPrefId("150216849-9fa110ac-8351-4526-b874-00871f9f94ef");

	var callback=function(datos){
		console.log(datos);
	}

	$scope.pay=function(){
		$state.go('payment_methods',
			{
				"product_id": 1
			});
	}
})

.controller('PaymentMethodsCtrl', function($scope, $state, $stateParams, $ionicLoading, MercadoPagoService,$rootScope) {
		$ionicLoading.show({template: 'Cargando...',noBackdrop: true});

		$rootScope.noCardIssuers=false;
		MercadoPagoService.getBankDeals().get(function(response){
			console.log(response)
		}, function(error){
			console.log(error);
		})

    MercadoPagoService.getPaymentMethods().get(function(response){
		$scope.paymentMethods = response;
		$ionicLoading.hide();
	},function(error){
		alert(JSON.stringify(error));
		$ionicLoading.hide();
	});

	$scope.selectedPaymentMethod = function(pm) {
		var state = 'payment_result_off';
		if (pm.payment_type_id == "credit_card" ||pm.payment_type_id == "debit_card" ||pm.payment_type_id == "prepaid_card") {
			state = 'card_issuers';
		}
		$state.go(state,{
				"product_id": $stateParams.product_id,
				"payment_method_id": pm.id
			});
	};
})
.controller('CardIssuersCtrl', function($scope, $state, $stateParams, $ionicLoading, MercadoPagoService, $rootScope, $ionicHistory) {
	$ionicLoading.show({template: 'Cargando...',noBackdrop: true});
		($scope.goBack = function(){
			if ($rootScope.noCardIssuers==true){
				$rootScope.noCardIssuers=false;
				$ionicHistory.goBack(-1);
			}
			else{
				MercadoPagoService.getIssuers($stateParams.payment_method_id,"").get(function(response) {
					$ionicLoading.hide();
					$scope.cardIssuers = response;
					if (response.length==1){
						$scope.selectedCardIssuer(response[0]);
						$rootScope.noCardIssuers=true;
					} else if (response.length==0){
						$scope.selectedCardIssuer(undefined);
						$rootScope.noCardIssuers=true;
					} else {
						$rootScope.noCardIssuers=false;
					}
				},function(error){
					alert(JSON.stringify(error));
					$ionicLoading.hide();
				});
			}
		})();


	$scope.selectedCardIssuer = function(issuer) {
		var issuerid="";
		if (issuer!=undefined)
			issuerid=issuer.id;
		else
			issuerid=issuer;
		$state.go('installments',
			{
				"product_id": $stateParams.product_id,
				"payment_method_id": $stateParams.payment_method_id,
				"issuer_id": issuerid,
			});
	};
})
.controller('InstallmentsCtrl', function($scope, $state, $stateParams, $ionicLoading, MercadoPagoService, ProductService) {
	$ionicLoading.show({template: 'Cargando...',noBackdrop: true});

	var product = ProductService.getProduct('id1');

    MercadoPagoService.getInstallments($stateParams.payment_method_id, $stateParams.issuer_id, product.price)
		.get(function(response) {
			var pcs = response[0]["payer_costs"];
			if (pcs.length > 1) {
					$scope.installments = pcs;
					$ionicLoading.hide();
			} else {
					$ionicLoading.hide();
					$state.go('card_form',
					{
						"product_id": $stateParams.product_id,
						"payment_method_id": $stateParams.payment_method_id,
						"issuer_id": $stateParams.issuer_id,
						"installments": 1
					});
			}
		},function(error){
			alert(JSON.stringify(error));
			$ionicLoading.hide();
		}
	);

	$scope.selectedInstallment = function(installment) {
		$state.go('card_form',
			{
				"product_id": $stateParams.product_id,
				"payment_method_id": $stateParams.payment_method_id,
				"issuer_id": $stateParams.issuer_id,
				"installments": installment.installments
			});
	};
})
.controller('CardFormCtrl', function($scope, $state, $stateParams, $ionicLoading, MercadoPagoService) {
	$ionicLoading.show({template: 'Cargando...',noBackdrop: true});

  MercadoPagoService.getIdentificationTypes().get(function(response) {
		$scope.identification_types = response;
		$ionicLoading.hide();
	},function(error){
		alert(JSON.stringify(error));
		$ionicLoading.hide();
	});

	$scope.card_token = {};

	$scope.createToken = function() {
		$ionicLoading.show({
	      template: 'Cargando...',
	      noBackdrop: true
	    });

			$scope.card_token.cardholder.identification.number = "" + $scope.card_token.cardholder.identification.number + "";
			$scope.card_token.securityCode = "" + $scope.card_token.securityCode + "";
			$scope.card_token.cardholder.identification.type = "" +$scope.card_token.cardholder.identification.type.id + "";

		MercadoPagoService.createToken().save($scope.card_token,function(response) {
			$ionicLoading.hide();
			$state.go('payment_result',
			{
				"product_id": $stateParams.product_id,
				"payment_method_id": $stateParams.payment_method_id,
				"issuer_id": $stateParams.issuer_id,
				"installments": $stateParams.installments,
				"token": response.id
			});
		},function(error){
			alert(JSON.stringify(error));
			$ionicLoading.hide();
		});
	};
})
.controller('PaymentCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MercadoPagoService, ProductService) {
	$ionicLoading.show({
      template: 'Cargando...',
      noBackdrop: true
    });

	// WARNING: THIS IS A MOCK
	var YOUR_BASE_URL = 'https://www.mercadopago.com';
	var YOUR_PAYMENT_URI = '/checkout/examples/doPayment';

	var product = ProductService.getProduct('id1');

	var merchant_payment = {
		payment_method_id: $stateParams.payment_method_id,
		card_issuer_id: parseInt($stateParams.issuer_id),
		installments: parseInt($stateParams.installments),
		card_token: $stateParams.token,
		merchant_access_token: 'mla-cards-data',
		item: {
			id: product.id,
			quantity: 1,
			unit_price: product.price
		}
	};

	$scope.close = function() {
		$ionicHistory.goBack(-1*($ionicHistory.currentView().index));
	}

	MercadoPagoService.createPayment(YOUR_BASE_URL, YOUR_PAYMENT_URI)
		.save(merchant_payment,function(response) {
			console.log(response);
			$ionicLoading.hide();
			if (response["data"].status == "approved") {
				$scope.title = "Felicitaciones!";
				$scope.message = "Tu pago se procesó correctamente.";
				$scope.payment_status = "approved";
				$scope.icon = "ion-ios-checkmark-outline";
				$scope.background_color = "#33cd5f";
			} else {
				$scope.title = "Ups!";
				$scope.payment_status = "rejected";
				$scope.icon = "ion-ios-close-outline";
				$scope.background_color = "#ef473a";
				$scope.message = "No se pudo procesar tu pago";
			}
		}, function(data) {
				$ionicLoading.hide();
				$scope.title = "Ups!";
				$scope.payment_status = "rejected";
				$scope.icon = "ion-ios-close-outline";
				$scope.background_color = "#ef473a";
				$scope.message = "No se pudo procesar tu pago";
		}
	);

})
.factory('ProductService', function () {
		 return {
			 getProduct: function(id) {
			 	return { id: 'id1', name: 'Funda Flip Cover Samsung Galaxy S4 Mini', image_url:'http://mla-s1-p.mlstatic.com/funda-flip-cover-samsung-galaxy-s4-mini-original-film-7290-MLA5178884614_102013-O.jpg', price: 100 }
			 }
		 }
});
