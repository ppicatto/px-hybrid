/*global cordova, module*/

function MercadoPagoPlugin() {}

MercadoPagoPlugin.prototype.startActivity = function(successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPagoPlugin", "startActivity");
};

MercadoPagoPlugin.prototype.startPaymentVault = function(pk, ammount , successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "MercadoPagoPlugin", "startPaymentVault", [pk, ammount]);
};

module.exports = new MercadoPagoPlugin();