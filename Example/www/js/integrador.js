angular.module('integrador', ['ionic','starter'])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$stateProvider){
	$urlRouterProvider.otherwise('/integrador');
	//$ionicConfigProvider.views.maxCache(0);
	$ionicConfigProvider.views.forwardCache(true);

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
		// cache:false,
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
.run(function($ionicPlatform,$rootScope,$state,$rootScope) {
//$rootScope.claseBarra= false ;
	$ionicPlatform.ready(function() {});
	$rootScope.pm={
		"children": null,
    "children_header": null,
    "comment": "Se acreditará en 7 dias hábiles",
    "description": "",
    "id": "bapropagos",
    "show_icon": true,
    "type": "payment_method"};
	$rootScope.pagooff={
		"id":585794,
	   "date_created":"2016-05-03T13:23:30.000-04:00",
	   "date_approved":null,
	   "date_last_updated":"2016-05-03T13:23:30.000-04:00",
	   "money_release_date":null,
	   "operation_type":"regular_payment",
	   "issuer_id":null,
	   "payment_method_id":"rapipago",
	   "payment_type_id":"ticket",
	   "status":"pending",
	   "status_detail":"pending_waiting_payment",
	   "currency_id":"ARS",
	   "description":null,
	   "live_mode":false,
	   "sponsor_id":null,
	   "authorization_code":null,
	   "collector_id":150216849,
	   "payer":{
	      "type":"guest",
	      "id":null,
	      "email":"test-email@email.com",
	      "identification":{
	         "type":null,
	         "number":null
	      },
	      "phone":{
	         "area_code":null,
	         "number":null,
	         "extension":null
	      },
	      "first_name":null,
	      "last_name":null
	   },
	   "metadata":{

	   },
	   "order":{

	   },
	   "external_reference":null,
	   "transaction_amount":1000,
	   "transaction_amount_refunded":0,
	   "coupon_amount":0,
	   "differential_pricing_id":null,
	   "deduction_schema":null,
	   "transaction_details":{
	      "net_received_amount":0,
	      "total_paid_amount":1000,
	      "overpaid_amount":0,
	      "external_resource_url":"https://sandbox.mercadopago.com/coupon/rapipago",
	      "installment_amount":0,
	      "financial_institution":null,
	      "payment_method_reference_id":"585793"
	   },
	   "fee_details":[

	   ],
	   "captured":true,
	   "binary_mode":false,
	   "call_for_authorize_id":null,
	   "statement_descriptor":null,
	   "installments":1,
	   "card":{

	   },
	   "notification_url":null,
	   "refunds":[

	   ]};
})
.controller('AppCtrl', function($scope, MercadoPagoService, $rootScope, $state ){
	MercadoPagoService.setAccessToken("APP_USR-244508097630521-031308-29cafdb25ffb6404fba1f5e24e0c4599__LA_LD__-150216849");
	MercadoPagoService.setPublicKey("TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a");
	MercadoPagoService.setPrefId("150216849-9fa110ac-8351-4526-b874-00871f9f94ef");

	// MercadoPagoService.setAccessToken("APP_USR-8666946229145884-060616-4b35b1b63cb75b53e3f5e18b1ac154b3__LA_LC__-176234066");
	// MercadoPagoService.setPublicKey("APP_USR-4d5ba2c5-5151-4bca-a472-27ffe6e2de08");
	// MercadoPagoService.setPrefId("176234066-fc6d5d5e-2671-4073-ab49-362a98b720b5"); productivos


	var callback=function(datos){
		console.log(datos);
	}
	$scope.grupos=function(){
		MercadoPagoService.startGrupos(callback);
	}
	$scope.ryc=function(){
		MercadoPagoService.startRyc(callback, $rootScope.pm);
	}
	$scope.ins=function(){
		MercadoPagoService.startIns(callback, $rootScope.pagooff);
	}
	$scope.con=function(){
		//MercadoPagoService.startCongrats(callback);
	}
	$scope.f3=function(){
		MercadoPagoService.startCheckout(callback);
	}
	$scope.f2=function(){
		MercadoPagoService.startF2(callback);
	}
	$scope.pagar=function(){
		$state.go('payment_methods',
			{
				"product_id": 1
			});
	}
})
.controller('ProductCtrl', function($scope, $state, $stateParams, $ionicHistory, ProductService) {
	$scope.product = ProductService.getProduct('id1');
	$scope.startCheckout = function(prod) {
		$state.go('payment_methods',
			{
				"product_id": prod.id
			});
	};
})
.controller('PaymentMethodsCtrl', function($scope, $state, $stateParams, $ionicLoading, MercadoPagoService) {
		$ionicLoading.show({template: 'Cargando...',noBackdrop: true});
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
.controller('CardIssuersCtrl', function($scope, $state, $stateParams, $ionicLoading, MercadoPagoService) {
	$ionicLoading.show({template: 'Cargando...',noBackdrop: true});

    MercadoPagoService.getIssuers($stateParams.payment_method_id,"").get(function(response) {
			$ionicLoading.hide();
			$scope.cardIssuers = response;
			if (response.length==1)
				$scope.selectedCardIssuer(response[0]);
			else if (response.length==0)
				$scope.selectedCardIssuer(undefined);
		},function(error){
			alert(JSON.stringify(error));
			$ionicLoading.hide();
		});

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

    MercadoPagoService.getInstallments($stateParams.payment_method_id, $stateParams.issuer_id, product.price).get(function(response) {
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
	var token={
		"card_number": "4556364421355272",
		"security_code": "123",
		"expiration_month": 4,
		"expiration_year": 2020,
		"cardholder": {
		"name": "APRO",
		"identification": {
			"subtype": null,
			"type": "DNI",
			"number": "12345678"}}
	};

	$scope.createToken = function() {
		$ionicLoading.show({
	      template: 'Cargando...',
	      noBackdrop: true
	    });
		MercadoPagoService.createToken().save(token,function(response) {
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
