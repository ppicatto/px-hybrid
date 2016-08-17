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

  var payment = "{\"binaryMode\":false,\"captured\":true,\"card\":{},\"collectorId\":\"150216849\",\"couponAmount\":0,\"currencyId\":\"ARS\",\"dateCreated\":\"Aug 10, 2016 2:17:47 PM\",\"dateLastUpdated\":\"Aug 10, 2016 2:17:47 PM\",\"description\":\"HPreferencia\",\"feeDetails\":[],\"id\":1307531,\"installments\":1,\"liveMode\":false,\"metadata\":{},\"operationType\":\"regular_payment\",\"order\":{},\"payer\":{\"email\":\"hdlopezsoca@hotmail.com\",\"identification\":{\"number\":\"29842398\",\"type\":\"DNI\"},\"type\":\"guest\"},\"paymentMethodId\":\"cargavirtual\",\"paymentTypeId\":\"ticket\",\"refunds\":[],\"status\":\"pending\",\"statusDetail\":\"pending_waiting_payment\",\"transactionAmount\":2,\"transactionAmountRefunded\":0,\"transactionDetails\":{\"externalResourceUrl\":\"https://sandbox.mercadopago.com/coupon/cargavirtual\",\"installmentAmount\":0,\"netReceivedAmount\":0,\"overpaidAmount\":0,\"paymentMethodReferenceId\":\"1307530\",\"totalPaidAmount\":2}}";
  var paymentIos = "{\"id\":1202870,\"status_detail\":\"pending_waiting_payment\",\"transaction_amount\":2,\"payment_method_id\":\"rapipago\",\"installments\":1,\"description\":\"HPreferencia\",\"tokenId\":\"\",\"card\":\"\",\"issuerId\":0,\"status\":\"pending\"}";
  var paymentPreference = "{\"default_installments\":1,\"default_payment_method_id\":null,\"default_payment_type_id\":null,\"excluded_payment_methods\":[{\"accreditation_time\":null,\"additional_info_needed\":null,\"id\":\"visa\",\"name\":null,\"payment_type_id\":null,\"settings\":null},{\"accreditation_time\":null,\"additional_info_needed\":null,\"id\":\"amex\",\"name\":null,\"payment_type_id\":null,\"settings\":null}],\"excluded_payment_types\":[{\"id\":\"ticket\"}],\"installments\":3}";
  var exPaymentMethods = ["visa", "amex"];
  var exPaymentType =["ticket"];

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

    var failure = function(error) {
      alert("Error calling MercadoPago Plugin" + error);
    };

    var publicKey = "TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a";
    var publicKeyBr = "TEST-2e305326-c806-4d57-97ca-98f761c9cebd";
    //var publicKey = "APP_USR-4d5ba2c5-5151-4bca-a472-27ffe6e2de08" //produccion
 $scope.setPaymentPreference  = function () {
    MercadoPago.setPaymentPreference(3, 1, exPaymentMethods, exPaymentType, success, failure);
  }
 $scope.startPaymentVault = function() {
    MercadoPago.showPaymentVault(publicKey, "Argentina", 200, $scope.myStyle.color, $scope.blackFont, paymentPreference, success, failure);
 };
 $scope.startCheckout = function(){
  MercadoPago.startCheckout(publicKey, "176234066-fc6d5d5e-2671-4073-ab49-362a98b720b5", $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showCardWithoutInstallments = function(){
  MercadoPago.showCardWithoutInstallments(publicKeyBr, $scope.myStyle.color, $scope.blackFont, paymentPreference, success, failure);
 }
 $scope.showCardWithInstallments = function(){
  MercadoPago.showCardWithInstallments(publicKey, "Argentina", 200, "#404040", $scope.blackFont, paymentPreference, success, failure);
 }
 $scope.showPaymentMethods = function(){
  MercadoPago.showPaymentMethods(publicKey, $scope.myStyle.color, $scope.blackFont, paymentPreference, success, failure);
 }
 $scope.showIssuers = function(){
  MercadoPago.showIssuers(publicKey, "visa", $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showInstallments = function(){
  MercadoPago.showInstallments(publicKey, "Argentina", 200, "visa", "326", $scope.myStyle.color, $scope.blackFont, paymentPreference, success, failure);
 }
 $scope.showBankDeals = function(){
  MercadoPago.showBankDeals(publicKey, $scope.myStyle.color, $scope.blackFont, success, failure);
 }
 $scope.showPaymentResult = function(){
  MercadoPago.showPaymentResult(publicKey, paymentIos, "ticket", success, failure);
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
 $scope.getPaymentResult = function(){
  MercadoPago.getPaymentResult(publicKey, 1202870, "ticket", success, failure);
 }
 $scope.getBankDeals = function(){
  MercadoPago.getBankDeals(publicKey, success, failure);
 }

});