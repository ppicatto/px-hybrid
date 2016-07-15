/*global cordova, module*/

function MercadoPago() {}

MercadoPago.prototype.startActivity = function(successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startActivity");
};

MercadoPago.prototype.startPaymentVault = function(pk, amount, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startPaymentVault", [pk, amount]);
};
MercadoPago.prototype.getPaymentMethods = function(pk, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPago", "startPaymentVault", [pk]);
};


module.exports = new MercadoPago();