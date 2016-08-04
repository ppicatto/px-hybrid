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

  $scope.blackFont = false;
  $scope.myStyle = {};
  $scope.myStyle.color = null;

    $scope.toggleChange = function() {
        if ($scope.blackFont == false) {
            $scope.blackFont = true;
        } else
            $scope.blackFont = false;
    };


    var success = function(message) {
      console.log(message);
    };

    var failure = function() {
      alert("Error calling MercadoPago Plugin");
    };

    var publicKey = "TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a";
    //var publicKey = "APP_USR-4d5ba2c5-5151-4bca-a472-27ffe6e2de08" //produccion

  $scope.startPaymentVault = function() {
    MercadoPago.showPaymentVault(publicKey, 200, $scope.myStyle.color, $scope.blackFont, success, failure);
 };
 $scope.startCheckout = function(){
  MercadoPago.startCheckout(publicKey, "176234066-fc6d5d5e-2671-4073-ab49-362a98b720b5", $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showCardWithoutInstallments = function(){
  MercadoPago.showCardWithoutInstallments(publicKey, $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showCardWithInstallments = function(){
  MercadoPago.showCardWithInstallments(publicKey, 200, $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showPaymentMethods = function(){
  MercadoPago.showPaymentMethods(publicKey, $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showIssuers = function(){
  MercadoPago.showIssuers(publicKey, "visa", $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showInstallments = function(){
  MercadoPago.showInstallments(publicKey, 200, "visa", "326", $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showBankDeals = function(){
  MercadoPago.showBankDeals(publicKey, $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showInstructions = function(){
  MercadoPago.showInstructions(publicKey, 1200753, "ticket", $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showCongrats = function(){
  MercadoPago.showCongrats(publicKey, 1200753, "ticket", $scope.myStyle.color, $scope.blackFont, success, failure);
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