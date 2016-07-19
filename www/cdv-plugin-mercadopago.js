/*global cordova, module*/

function MercadoPago() {}

MercadoPago.prototype.startActivity = function(pk, prefid, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startActivity", [pk, prefid]);
};
MercadoPago.prototype.startPaymentVault = function(pk, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startPaymentVault", [pk, amount]);
};
MercadoPago.prototype.getPaymentMethods = function(pk, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getPaymentMethods", [pk]);
};
MercadoPago.prototype.getIssuers = function(pk, pmid, bin, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getIssuers", [pk, pmid, bin]);
};
MercadoPago.prototype.getInstallments = function(pk, pmid, bin, issuerId, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getInstallments", [pk, pmid, bin, issuerId, amount]);
};
MercadoPago.prototype.getIdentificationTypes = function(pk, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getIdentificationTypes", [pk]);
};
MercadoPago.prototype.createToken = function(pk, cardNumber, expirationMonth, expirationYear, securityCode, name, docType, docNumber, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "createToken", [pk, cardNumber, expirationMonth, expirationYear, securityCode, name, docType, docNumber]);
};
MercadoPago.prototype.getBankDeals = function(pk, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getBankDeals", [pk]);
};
MercadoPago.prototype.getInstructions = function(pk, paymentId, paymentTypeId, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "getInstructions", [pk, paymentId, paymentTypeId]);
};
MercadoPago.prototype.createPayment = function(pk, paymentMethod, issuerId, payerCostInstallments, tokenId, url, uri, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "createPayment", [pk, paymentMethod, issuerId, payerCostInstallments, tokenId, url, uri]);
};
module.exports = new MercadoPago();
