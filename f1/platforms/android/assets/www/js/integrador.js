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
		controller: 'h'};
	var p = {
		name: 'p',
		url: '/p',
		params: {
			param1: { array: true }
		},
		templateUrl: 'integrador.html',
		controller: 'p'};

		$stateProvider
		.state(integrador)
		.state(p)
		//$stateProvider=MercadoPagoService.getStateProvider();
	})
.run(function($ionicPlatform,$rootScope,$state) {
	$ionicPlatform.ready(function() {
	});
})
.controller('h', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory,$timeout){

	$ionicHistory.clearHistory();
	$ionicHistory.clearCache();
	MercadoPagoService.setAccessToken("APP_USR-244508097630521-031308-29cafdb25ffb6404fba1f5e24e0c4599__LA_LD__-150216849");
	MercadoPagoService.setPublicKey("APP_USR-5a399d42-6015-4f6a-8ff8-dd7d368068f8");
	MercadoPagoService.setPrefId("150216849-34d5b32d-02d1-40b4-808f-62d11cc3e460");

	var callback=function(datos){
		console.log(datos);
	}

	$scope.f3=function(){
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache();
		// 	MercadoPagoService.grupos().get(function(data){
		//
		// 	//MercadoPagoService.startRyc(b, $state.current,data,pref,data.groups[1].children[0]);
		// })
		MercadoPagoService.startCheckout(callback);
	}
	$scope.f2=function(){
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache();
		MercadoPagoService.startF2(callback);
	}
})
.controller('p', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory,$timeout){

	$scope.pagar=function(){
		$state.go('integrador', { // llamas al state
		});
	}
	$ionicHistory.clearHistory(); // no funciona
	$ionicHistory.clearCache();

	$state.reload();

})
