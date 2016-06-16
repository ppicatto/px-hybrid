angular.module('integrador', ['ionic','mercadopago'])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	var integrador = {
		name: 'integrador',
		url: '/',
		cache:false,
		templateUrl: 'integrador.html',
		controller: 'AppCtrl'};

	$stateProvider
		.state(integrador)

	})
.run(function($ionicPlatform, $rootScope, $state) {
	$ionicPlatform.ready(function() {});

})
.controller('AppCtrl', function($scope, MercadoPagoService, $rootScope, $state ){
	MercadoPagoService.setPublicKey("TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a");
	MercadoPagoService.setPrefId("150216849-9fa110ac-8351-4526-b874-00871f9f94ef");

	var callback=function(datos){
		console.log(datos);
	}
	 $scope.f3=function(){
		 MercadoPagoService.startCheckout(callback);
	 }
})
