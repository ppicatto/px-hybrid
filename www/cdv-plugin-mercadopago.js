/*global cordova, module*/

function MercadoPago() {}

MercadoPago.prototype.startActivity = function(successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startActivity");
};

MercadoPago.prototype.showPaymentVault = function(pk, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showPaymentVault", [publicKey, amount]);
};
MercadoPago.prototype.showCardWithoutInstallments = function(publicKey, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showCardWithoutInstallments", [publicKey]);
};
MercadoPago.prototype.showCardWithInstallments = function(publicKey, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showCardWithInstallments", [publicKey, amount]);
};
MercadoPago.prototype.showPaymentMethods = function(publicKey, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showPaymentMethods", [publicKey]);
};
MercadoPago.prototype.showIssuers = function(publicKey, paymentMethod, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showIssuers", [publicKey, paymentMethod]);
};
MercadoPago.prototype.showInstallments = function(publicKey, amount, paymentMethod, Issuer, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showInstallments", [publicKey, amount, paymentMethod, Issuer]);
};
MercadoPago.prototype.showBankDeals = function(publicKey, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showBankDeals", [publicKey]);
};
MercadoPago.prototype.createPayment = function(publicKey, itemID, itemQuantity, itemPrice, campaignId, accessToken, url, uri, paymentMethod, installment, cardIssuerId, tokenId, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "createPayment", [publicKey, itemID, itemQuantity, itemPrice, campaignId, accessToken, url, uri, paymentMethod, installment, cardIssuerId, tokenId]);
};
MercadoPago.prototype.showInstructions = function(publicKey, payment, paymentMethod, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showInstructions", [publicKey, payment, paymentMethod]);
};
MercadoPago.prototype.showCongrats = function(publicKey, payment, paymentMethod, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "showCongrats", [publicKey, payment, paymentMethod]);
};
module.exports = new MercadoPago();
