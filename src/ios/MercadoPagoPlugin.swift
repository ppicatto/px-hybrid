@objc(MercadoPagoPlugin) class MercadoPagoPlugin : CDVPlugin {
    func startPaymentVault(command: CDVInvokedUrlCommand) {
        var pluginResult = CDVPluginResult(
            status: CDVCommandStatus_ERROR
        )
        let publicKey = "TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a"
        MercadoPagoContext.setPublicKey(publicKey)
        let prefId = "150216849-ceed1ee4-8ab9-4449-869f-f4a8565d386f"
        let checkout = MPFlowBuilder.startCheckoutViewController(prefId)
        { (payment : Payment) in
            // Listo! El pago ya fue procesado por MP.
            // En el paso siguiente se describe el método displayPaymentInfo
            self.displayPaymentInfo(payment)
        }
        
        self.presentViewController(checkout, animated: true, completion: {})
        
            pluginResult = CDVPluginResult(
                status: CDVCommandStatus_OK,
                messageAsString: "h"
            )
        
        self.commandDelegate!.sendPluginResult(
            pluginResult, 
            callbackId: command.callbackId
        )
    }
}