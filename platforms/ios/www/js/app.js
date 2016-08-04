// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.controller('StarterCtrl', function($scope) {

      var success = function(message) {
      console.log(message);
    };

    var failure = function() {
      alert("Error calling MercadoPago Plugin");
    };

    var publicKey = "TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a";
    //var publicKey = "APP_USR-4d5ba2c5-5151-4bca-a472-27ffe6e2de08" //produccion

  $scope.startPaymentVault = function() {
    
    
    //f2
    MercadoPago.showPaymentVault(publicKey, 200, "#FFAAFF", true, success, failure);
    //MercadoPago.showCardWithoutInstallments(publicKey, "#00FF00", true, success, failure);
    //MercadoPago.showCardWithInstallments(publicKey, 200, "#FAFAFA", false, success, failure);
    //MercadoPago.showPaymentMethods(publicKey, "#FAFAFA", true, success, failure);
    //MercadoPago.showIssuers(publicKey, "visa", "#FAFAFA", true, success, failure);
    //MercadoPago.showInstallments(publicKey, 200, "visa", "326", "#FAFAFA", true, success, failure);
    //MercadoPago.showBankDeals(publicKey, "#FAFAFA", true, success, failure);
    //MercadoPago.showInstructions(publicKey, 1200753, "ticket", "#FAFAFA", false, success, failure);
    //MercadoPago.createPayment(publicKey, "id", 1, 2000, 111111, "access_token", "url.com", "createPayment", paymentMethod, 12, 3, 123456678);

    //f1
    //MercadoPago.getPaymentMethods(publicKey, success, failure);
    //MercadoPago.getIssuers(publicKey, "visa", "null", success, failure);
    //MercadoPago.getInstallments(publicKey, "master", "503175", 326, 200,  success, failure);
    //MercadoPago.getIdentificationTypes(publicKey, success, failure);
    //MercadoPago.createToken(publicKey, "5031755734530604", 11, 2019, "123", "APROJuan", "DNI", "12345678", success, failure);
    //MercadoPago.getBankDeals(publicKey, success, failure);
    //MercadoPago.getInstructions(publicKey, 1202870, "ticket", success, failure);

 };
 $scope.startCheckout = function(){
  MercadoPago.startCheckout(publicKey, "176234066-fc6d5d5e-2671-4073-ab49-362a98b720b5",null, false, success, failure);
 }
 $scope.showCardWithoutInstallments = function(){
  MercadoPago.showCardWithoutInstallments(publicKey, "#00FF00", true, success, failure);
 }
 $scope.showCardWithInstallments = function(){
  MercadoPago.showCardWithInstallments(publicKey, 200, null, false, success, failure);
 }
 $scope.showPaymentMethods = function(){
  MercadoPago.showPaymentMethods(publicKey, null, true, success, failure);
 }
 $scope.showIssuers = function(){
  MercadoPago.showIssuers(publicKey, "visa", null, true, success, failure);
 }
 $scope.showInstallments = function(){
  MercadoPago.showInstallments(publicKey, 200, "visa", "326", null, true, success, failure);
 }
 $scope.showBankDeals = function(){
  MercadoPago.showBankDeals(publicKey, null, true, success, failure);
 }
 $scope.showInstructions = function(){
  MercadoPago.showInstructions(publicKey, 1200753, "ticket", null, false, success, failure);
 }
 $scope.showCongrats = function(){
  MercadoPago.showCongrats(publicKey, 1200753, "ticket", null, false, success, failure);
 }
 $scope.createPayment = function(){
  MercadoPago.createPayment(publicKey, "id", 1, 2000, 111111, "access_token", "url.com", "createPayment", "visa", 12, 3, 123456678);
 }
 $scope.getPaymentMethods = function(){
  MercadoPago.getPaymentMethods(publicKey, success, failure);
 }
 $scope.getIssuers = function(){
  MercadoPago.getIssuers(publicKey, "visa", "null", success, failure);
 }
 $scope.getInstallments = function(){
  MercadoPago.getInstallments(publicKey, "master", "503175", 326, 200,  success, failure);
 }
 $scope.getIdentificationTypes = function(){
  MercadoPago.getIdentificationTypes(publicKey, success, failure);
 }
 $scope.createToken = function(){
  MercadoPago.createToken(publicKey, "5031755734530604", 11, 2019, "123", "APROJuan", "DNI", "12345678", success, failure);
 }
 $scope.getInstructions = function(){
  MercadoPago.getInstructions(publicKey, 1202870, "ticket", success, failure);
 }
 $scope.getBankDeals = function(){
  MercadoPago.getBankDeals(publicKey, success, failure);
 }

});