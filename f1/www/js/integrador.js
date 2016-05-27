angular.module('integrador', ['ionic','starter'])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$stateProvider){
	$urlRouterProvider.otherwise('/integrador');
	//$ionicConfigProvider.views.maxCache(0);
	$ionicConfigProvider.views.forwardCache(true);

	var integrador = {
		name: 'integrador',
		url: '/integrador',
		params: {
			param1: { array: true }
		},
		templateUrl: 'integrador.html',
		controller: 'AppCtrl'};

		$stateProvider
		.state(integrador)

	})
.run(function($ionicPlatform,$rootScope,$state) {
	$ionicPlatform.ready(function() {
	});
})
.controller('AppCtrl', function($scope, MercadoPagoService){

	// $ionicHistory.clearHistory();
	// $ionicHistory.clearCache();
	MercadoPagoService.setAccessToken("APP_USR-244508097630521-031308-29cafdb25ffb6404fba1f5e24e0c4599__LA_LD__-150216849");
	MercadoPagoService.setPublicKey("TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a");
	MercadoPagoService.setPrefId("150216849-9fa110ac-8351-4526-b874-00871f9f94ef");

	var callback=function(datos){
		console.log(datos);
	}

	$scope.f3=function(){
		MercadoPagoService.startCheckout(callback);
	}
	$scope.f2=function(){
		MercadoPagoService.startF2(callback);
	}
})
