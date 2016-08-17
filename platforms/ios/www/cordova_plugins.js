cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.mercadopago.cordova.sdk.MercadoPago",
        "file": "plugins/com.mercadopago.cordova.sdk/www/cdv-plugin-mercadopago.js",
        "pluginId": "com.mercadopago.cordova.sdk",
        "clobbers": [
            "MercadoPago"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-add-swift-support": "1.3.1",
    "com.mercadopago.cordova.sdk": "0.9.0"
};
// BOTTOM OF METADATA
});