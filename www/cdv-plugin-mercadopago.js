/*global cordova, module*/

function MercadoPago() {}


MercadoPago.prototype.showPaymentVault = function(publicKey, amount, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showPaymentVault", [publicKey, amount, color, blackFont]);
};
MercadoPago.prototype.showCardWithoutInstallments = function(publicKey, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showCardWithoutInstallments", [publicKey, color, blackFont]);
};
MercadoPago.prototype.showCardWithInstallments = function(publicKey, amount, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showCardWithInstallments", [publicKey, amount, color, blackFont]);
};
MercadoPago.prototype.showPaymentMethods = function(publicKey, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showPaymentMethods", [publicKey, color, blackFont]);
};
MercadoPago.prototype.showIssuers = function(publicKey, paymentMethod, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showIssuers", [publicKey, paymentMethod, color, blackFont]);
};
MercadoPago.prototype.showInstallments = function(publicKey, amount, paymentMethod, Issuer, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showInstallments", [publicKey, amount, paymentMethod, Issuer, color, blackFont]);
};
MercadoPago.prototype.showBankDeals = function(publicKey, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showBankDeals", [publicKey, color, blackFont]);
};
MercadoPago.prototype.createPayment = function(publicKey, itemID, itemQuantity, itemPrice, campaignId, accessToken, url, uri, paymentMethod, installment, cardIssuerId, tokenId, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "createPayment", [publicKey, itemID, itemQuantity, itemPrice, campaignId, accessToken, url, uri, paymentMethod, installment, cardIssuerId, tokenId]);
};
MercadoPago.prototype.showInstructions = function(publicKey, payment, paymentMethod, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showInstructions", [publicKey, payment, paymentMethod, color, blackFont]);
};
MercadoPago.prototype.showCongrats = function(publicKey, payment, paymentMethod, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showCongrats", [publicKey, payment, paymentMethod, color, blackFont]);
};
MercadoPago.prototype.startCheckout = function(publicKey, prefid, color, blackFont, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startCheckout", [publicKey, prefid, color, blackFont]);
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
