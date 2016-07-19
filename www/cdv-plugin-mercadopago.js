/*global cordova, module*/

function MercadoPago() {}

MercadoPago.prototype.startActivity = function(successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startActivity");
};

MercadoPago.prototype.startPaymentVault = function(pk, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startPaymentVault", [pk, amount]);
};
MercadoPago.prototype.startCardWithoutInstallments = function(pk, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startCardWithoutInstallments", [pk]);
};
MercadoPago.prototype.startCardWithInstallments = function(pk, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startCardWithInstallments", [pk, amount]);
};
MercadoPago.prototype.startPaymentMethods = function(pk, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startPaymentMethods", [pk]);
};
MercadoPago.prototype.startIssuers = function(pk, paymentMethod, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startIssuers", [pk, paymentMethod]);
};
MercadoPago.prototype.startInstallments = function(pk, amount, paymentMethod, Issuer, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startInstallments", [pk, amount, paymentMethod, Issuer]);
};
MercadoPago.prototype.startBankDeals = function(pk, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startBankDeals", [pk]);
};
MercadoPago.prototype.createPayment = function(pk, itemID, itemQuantity, itemPrice, campaignId, accessToken, url, uri, paymentMethod, installment, cardIssuerId, tokenId, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "createPayment", [pk, itemID, itemQuantity, itemPrice, campaignId, accessToken, url, uri, paymentMethod, installment, cardIssuerId, tokenId]);
};
MercadoPago.prototype.startInstructions = function(pk, payment, paymentMethod, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startInstructions", [pk, payment, paymentMethod]);
};
MercadoPago.prototype.startCongrats = function(pk, payment, paymentMethod, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startCongrats", [pk, payment, paymentMethod]);
};
module.exports = new MercadoPago();
