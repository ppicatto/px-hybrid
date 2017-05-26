#import <Cordova/CDV.h>
#import "MercadoPagoPlugin.h"

@interface MercadoPagoPlugin : CDVPlugin

@property (nonatomic, retain) MercadoPagoCheckout * cho;

- (void) sendCallback:(NSString*)resultString callbackID:(NSString*)callbackID;
- (void) sendErrorCallback:(NSString*)error errorCallbackID:(NSString*)errorCallbackID;
- (void) startCheckout:(CDVInvokedUrlCommand*)command;
- (void) getPaymentMethods:(CDVInvokedUrlCommand*)command;
- (void) setPaymentPreference:(CDVInvokedUrlCommand*)command;
- (void) getIssuers:(CDVInvokedUrlCommand*)command;
- (void) getInstallments:(CDVInvokedUrlCommand*)command;
- (void) getIdentificationTypes:(CDVInvokedUrlCommand*)command;
- (void) createToken:(CDVInvokedUrlCommand*)command;
- (void) getBankDeals:(CDVInvokedUrlCommand*)command;
- (void) getPaymentResult:(CDVInvokedUrlCommand*)command;
- (void) createPayment:(CDVInvokedUrlCommand*)command;
- (void) showPaymentVault:(CDVInvokedUrlCommand*)command;
- (void) showCardWithInstallments:(CDVInvokedUrlCommand*)command;
- (void) showCardWithoutInstallments:(CDVInvokedUrlCommand*)command;
- (void) showPaymentResult:(CDVInvokedUrlCommand*)command;
- (void) showPaymentMethods:(CDVInvokedUrlCommand*)command;
- (void) showIssuers:(CDVInvokedUrlCommand*)command;
- (void) showInstallments:(CDVInvokedUrlCommand*)command;
- (void) showBankDeals:(CDVInvokedUrlCommand*)command;
- (void) showInNavigationController:(UIViewController *)viewControllerBase;
- (void) dissmissNavigationController:(UINavigationController *)navigationController;
- (void) startSavedCards:(CDVInvokedUrlCommand*)command;
- (void) getCustomer:(CDVInvokedUrlCommand*)command;
- (void) startCardSelection:(CDVInvokedUrlCommand*)command;
- (NSString *) toString:(NSArray*)array;
- (NSString *) getSiteID:(NSString*)site;

@end
