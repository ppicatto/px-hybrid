/*global cordova, module*/

module.exports = {
    startActivity: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "MercadoPagoPlugin", "startActivity");
    },
    startPaymentVault: function (pk, ammount , successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "MercadoPagoPlugin", "startPaymentVault", [pk, ammount]);
    }
    
};
