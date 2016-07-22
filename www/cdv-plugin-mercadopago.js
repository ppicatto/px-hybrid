/*global cordova, module*/

function MercadoPago() {}

MercadoPago.prototype.startCheckout = function(publicKey, prefid, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startCheckout", [publicKey, prefid]);
};
MercadoPago.prototype.startPaymentVault = function(publicKey, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startPaymentVault", [publicKey, amount]);
};
MercadoPago.prototype.getPaymentMethods = function(publicKey, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getPaymentMethods", [publicKey]);
};
MercadoPago.prototype.getIssuers = function(publicKey, paymentMethodId, bin, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getIssuers", [publicKey, paymentMethodId, bin]);
};
MercadoPago.prototype.getInstallments = function(publicKey, paymentMethodId, bin, issuerId, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getInstallments", [publicKey, paymentMethodId, bin, issuerId, amount]);
};
MercadoPago.prototype.getIdentificationTypes = function(publicKey, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getIdentificationTypes", [publicKey]);
};
MercadoPago.prototype.createToken = function(publicKey, cardNumber, expirationMonth, expirationYear, securityCode, cardholdername, docType, docNumber, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "createToken", [publicKey, cardNumber, expirationMonth, expirationYear, securityCode, cardholdername, docType, docNumber]);
};
MercadoPago.prototype.getBankDeals = function(publicKey, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getBankDeals", [publicKey]);
};
MercadoPago.prototype.getInstructions = function(publicKey, paymentId, paymentTypeId, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getInstructions", [publicKey, paymentId, paymentTypeId]);
};
module.exports = new MercadoPago();
