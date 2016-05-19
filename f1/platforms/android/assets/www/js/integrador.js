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
.controller('h', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory, $ionicViewService,$timeout){

	$ionicHistory.clearHistory(); 
	$ionicHistory.clearCache();
	MercadoPagoService.setAccessToken("APP_USR-244508097630521-031308-29cafdb25ffb6404fba1f5e24e0c4599__LA_LD__-150216849");
	MercadoPagoService.setPublicKey("?public_key=444a9ef5-8a6b-429f-abdf-587639155d88");
	MercadoPagoService.setPrefId("150216849-34d5b32d-02d1-40b4-808f-62d11cc3e460");
	var pref=MercadoPagoService.getPrefId().get();
    var b=function(datos){
    	alert(datos);
    }

	$scope.pagar=function(){
		$ionicHistory.clearHistory(); 
    	$ionicHistory.clearCache();
    	MercadoPagoService.grupos().get(function(data){

    	//MercadoPagoService.startRyc(b, $state.current,data,pref,data.groups[1].children[0]);
		})
    	MercadoPagoService.startF2(b);
    }
})
.controller('p', function($scope, MercadoPagoService,$state, $stateParams,$ionicHistory, $ionicViewService,$timeout){

	$scope.pagar=function(){
    	$state.go('integrador', { // llamas al state
      });
    }
	$ionicHistory.clearHistory(); // no funciona
	$ionicHistory.clearCache();

	$state.reload();

})