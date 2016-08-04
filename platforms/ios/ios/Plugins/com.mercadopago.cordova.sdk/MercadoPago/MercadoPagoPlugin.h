#import <Cordova/CDV.h>

@interface MercadoPagoPlugin : CDVPlugin

- (void) startCheckout:(CDVInvokedUrlCommand*)command;
- (void) getPaymentMethods:(CDVInvokedUrlCommand*)command;

@end