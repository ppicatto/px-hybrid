
@import MercadoPagoSDK;
#import "MercadoPagoPlugin.h"

@interface UIColor (fromHex)
+ (UIColor *)colorwithHexString:(NSString *)hexStr alpha:(CGFloat)alpha;
@end
@implementation UIColor (fromHex)

#define MERCADO_PAGO_BASE_COLOR @"#30AFE2"

+ (UIColor *)colorwithHexString:(NSString *)hexStr alpha:(CGFloat)alpha;
{
    unsigned int hexint = 0;
    
    // Create scanner
    NSScanner *scanner = [NSScanner scannerWithString:hexStr];
    
    [scanner setCharactersToBeSkipped:[NSCharacterSet
                                       characterSetWithCharactersInString:@"#"]];
    [scanner scanHexInt:&hexint];
    
    UIColor *color =
    [UIColor colorWithRed:((CGFloat) ((hexint & 0xFF0000) >> 16))/255
                    green:((CGFloat) ((hexint & 0xFF00) >> 8))/255
                     blue:((CGFloat) (hexint & 0xFF))/255
                    alpha:alpha];
    
    return color;
}

@end
@implementation MercadoPagoPlugin

@synthesize cho;

- (void) sendCallback:(NSString*)resultString callbackID:(NSString*)callbackID {
    CDVPluginResult* result = [CDVPluginResult
                               resultWithStatus:CDVCommandStatus_OK
                               messageAsString:resultString];
    [self.commandDelegate sendPluginResult:result callbackId:callbackID];
}

- (void) sendErrorCallback:(NSString*)error errorCallbackID:(NSString*)errorCallbackID {
    CDVPluginResult* result = [CDVPluginResult
                               resultWithStatus:CDVCommandStatus_ERROR
                               messageAsString:error.description];
    [self.commandDelegate sendPluginResult:result callbackId:errorCallbackID];
}

- (void) startSavedCards:(CDVInvokedUrlCommand*)command {
    
    //Get Customer
    NSData *customerData = [[[command arguments] objectAtIndex:0] dataUsingEncoding:NSUTF8StringEncoding];
    id customerJson = [NSJSONSerialization JSONObjectWithData:customerData options:0 error:nil];
    Customer *customer = [Customer fromJSON:customerJson];
    
    //Get Decoration Preference Color
    UIColor *color = [UIColor colorwithHexString:[[command arguments] objectAtIndex:1] alpha:1];
    
    //Get Black Font Bool Value
    BOOL blackFont = [[[command arguments] objectAtIndex:2]boolValue];
    
    //Get Title
    NSString *title = [[command arguments] objectAtIndex:3];
    
    //Get Footer Text
    NSString *footerText = [[command arguments] objectAtIndex:4];
    
    //Get Confirm Prompt Text
    NSString *confirmPromptText = [[command arguments] objectAtIndex:5];
    
    //Get Callback ID
    NSString* callbackId = [command callbackId];
    
    
    DecorationPreference* dp = [[DecorationPreference alloc] initWithBaseColor:color];
    if (blackFont){
        [dp enableDarkFont];
    }else {
        [dp enableLightFont];
    }
    
    [MercadoPagoCheckout setDecorationPreference:dp];
    
    CardsAdminViewModel* vm = [[CardsAdminViewModel alloc] initWithCards:customer.cards extraOptionTitle:footerText confirmPromptText: confirmPromptText];
    [vm setScreenTitleWithTitle:title];
    
    CardsAdminViewController* vc = [[CardsAdminViewController alloc] initWithViewModel:vm callback:^(Card * card) {
        
        [self dissmissNavigationController];
        
        if (card != nil) {
            [self sendCallback:[card toJSONString] callbackID:callbackId];
        } else {
            [self sendCallback:@"footerSelected" callbackID:callbackId];
        }
    }];
    vc.callbackCancel = ^{
       [self sendCallback:@"backPressed" callbackID:callbackId];
        [self dissmissNavigationController];
    };
    
    [self showInNavigationController:vc];
}

- (void) getCustomer:(CDVInvokedUrlCommand*)command {
    
    //Get Merchant Base Url
    NSString *merchantBaseUrl = [[command arguments] objectAtIndex:0];
    
    //Get Merchant Get Customer Uri
    NSString *merchantGetCustomerUri = [[command arguments] objectAtIndex:1];
    
    //Get Merchant Access Token
    NSString *merchantAccessToken = [[command arguments] objectAtIndex:2];
    
    ServicePreference* servicePref = [[ServicePreference alloc] init];
    NSMutableDictionary* params = [[NSMutableDictionary alloc] init];
    [params setValue:merchantAccessToken forKey:@"merchant_access_token"];
    [MercadoPagoContext setMerchantAccessTokenWithMerchantAT:merchantAccessToken];
    [servicePref setGetCustomerWithBaseURL:merchantBaseUrl URI:merchantGetCustomerUri additionalInfo:params];
    [MercadoPagoCheckout setServicePreference:servicePref];
    
    //Get CallbackID
    NSString* callbackId = [command callbackId];
    
    //Get Customer
    [MerchantServer getCustomer:^(Customer * customer) {
        [self sendCallback:[customer toJSONString] callbackID:callbackId];
    } failure:^(NSError * error) {
        [self sendErrorCallback:error.description errorCallbackID:callbackId];
    }];
}

-(void) startCardSelection:(CDVInvokedUrlCommand*)command {
    [self showCardWithInstallments:command];
}
- (void)showCardWithInstallments:(CDVInvokedUrlCommand*)command {
    
    //Get Public Key
    NSString *pk = [[command arguments] objectAtIndex:0];
    
    //Get Site ID
   
    NSString *siteID =  [self getSiteID:[[command arguments] objectAtIndex:1]];
    
    //Get Amount
    double amount = [[[command arguments] objectAtIndex:2]doubleValue];
    
    //Get Merchant Base Url
    NSString *merchantBaseUrl = [[command arguments] objectAtIndex:3];
    
    //Get Merchant Get Customer Uri
    NSString *merchantGetCustomerUri = [[command arguments] objectAtIndex:4];
    
    //Get Merchant Access Token
    NSString *merchantAccessToken = [[command arguments] objectAtIndex:5];
    
    //Get Decoration Preference Color
    UIColor *color = [UIColor colorwithHexString:[[command arguments] objectAtIndex:6] alpha:1];
    
    //Get Black Font Bool Value
    BOOL blackFont = [[[command arguments] objectAtIndex:7]boolValue];
    
    //Get Installments Enabled Bool Value
    BOOL installmentsEnabled = [[[command arguments] objectAtIndex:8]boolValue];
    
    
    //Get Payment Preference
    PaymentPreference *paymentPref = [[PaymentPreference alloc]init];
    paymentPref.excludedPaymentTypeIds = [NSSet setWithObjects:@"atm", @"ticket", @"bank_transfer", @"prepaid_card", @"digital_currency", @"account_money", nil];
    
    if (!installmentsEnabled) {
        [paymentPref setDefaultInstallments:1];
        [paymentPref setMaxAcceptedInstallments:1];
    }
    
    //Get Callback ID
    NSString* callbackId = [command callbackId];
    
    
    //Create Checkout Preference
    Payer *payer = [[Payer alloc] initWith_id:@"payer_id" email:@"dummy@mail.com" type:nil identification:nil entityType:nil];
    Item *item = [[Item alloc] initWith_id:@"item_id" title:@"item_title" quantity:1 unitPrice:amount description:nil currencyId:@"ARS"];
    NSArray *items = [NSArray arrayWithObjects:item, nil];
    
    CheckoutPreference* pref = [[CheckoutPreference alloc] initWithItems:items payer:payer paymentMethods:paymentPref];
    //--Create Checkout Preference
    
    //Checkout Customization Preferences
    FlowPreference* fp = [[FlowPreference alloc]init];
    [fp disableReviewAndConfirmScreen];
    
    DecorationPreference* dp = [[DecorationPreference alloc]initWithBaseColor:color];
    if (blackFont){
        [dp enableDarkFont];
    }else {
        [dp enableLightFont];
    }
    
    ServicePreference* sp = [[ServicePreference alloc]init];
    NSDictionary *extraParams = @{@"merchant_access_token" : merchantAccessToken};
    [sp setGetCustomerWithBaseURL:merchantBaseUrl URI:merchantGetCustomerUri additionalInfo:extraParams];
    //--Checkout Customization Preferences
    
    UIViewController *rootViewController = [[[[UIApplication sharedApplication] delegate] window] rootViewController];

    navCon = [[UINavigationController alloc]init];
    
    CardFormViewController.showBankDeals = NO;
    
    //Create and Start Checkout
    MercadoPagoCheckout* cho = [[MercadoPagoCheckout alloc] initWithPublicKey:pk checkoutPreference:pref discount:nil navigationController:navCon];

    cho.callbackCancel = ^{
        [self sendCallback:@"backPressed" callbackID:callbackId];
        [self dissmissNavigationController];
    };
    
    [pref setSiteId:siteID];
    [MercadoPagoCheckout setFlowPreference:fp];
    [MercadoPagoCheckout setDecorationPreference:dp];

    [rootViewController presentViewController:navCon animated:YES completion:^{[cho start];}];
    //--Create and Start Checkout
    [MercadoPagoCheckout setServicePreference:sp];
    //Callback
    [MercadoPagoCheckout setPaymentDataCallbackWithPaymentDataCallback:^(PaymentData * pd) {
        [self dissmissNavigationController];
        NSString *jsonPaymentMethod = [pd.paymentMethod toJSONString];
        NSString *jsonToken = [pd.token toJSONString];
        NSString *jsonPayerCost = [pd.payerCost toJSONString];
        
        NSMutableDictionary *mpResponse = [[NSMutableDictionary alloc] init];
        [mpResponse setObject:jsonPaymentMethod forKey:@"payment_method"];
        [mpResponse setObject:jsonToken forKey:@"token"];
        if (jsonPayerCost) {
            [mpResponse setObject:jsonPayerCost forKey:@"payer_cost"];
        }
        if (pd.issuer != nil ){
            NSString *jsonIssuer = [pd.issuer toJSONString];
            [mpResponse setObject:jsonIssuer forKey:@"issuer"];
        }
        if (pd.discount) {
            NSString *jsonDiscount = [pd.discount toJSONString];
            [mpResponse setObject:jsonDiscount forKey:@"discount"];
        }
        NSError * err;
        NSData * jsonData = [NSJSONSerialization dataWithJSONObject:mpResponse options:0 error:&err];
        NSString * myString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        [self sendCallback:myString callbackID:callbackId];
    }];
    
}

- (void)showCardWithoutInstallments:(CDVInvokedUrlCommand*)command {
    
    //Get Public Key
    NSString *pk = [[command arguments] objectAtIndex:0];
    
    //Get Decoration Preference Color
    UIColor *color = [UIColor colorwithHexString:[[command arguments] objectAtIndex:1] alpha:1];
    
    //Get Black Font Bool Value
    BOOL blackFont = [[[command arguments] objectAtIndex:2]boolValue];
    
    //Get Payment Preference
    PaymentPreference *paymentPref = [[PaymentPreference alloc] init];
    paymentPref.excludedPaymentTypeIds = [NSSet setWithObjects:@"atm", @"ticket", @"bank_transfer", @"prepaid_card", @"digital_currency", nil];
    paymentPref.maxAcceptedInstallments = 1;
    CardFormViewController.showBankDeals = NO;
    //Get Callback ID
    NSString* callbackId = [command callbackId];
    
    
    //Create Checkout Preference
    Payer *payer = [[Payer alloc] initWith_id:@"payer_id" email:@"payer_email" type:nil identification:nil entityType:nil];
    Item *item = [[Item alloc] initWith_id:@"item_id" title:@"item_title" quantity:1 unitPrice:100 description:nil currencyId:@"ARS"];
    NSArray *items = [NSArray arrayWithObjects:item, nil];
    
    CheckoutPreference* pref = [[CheckoutPreference alloc] initWithItems:items payer:payer paymentMethods:paymentPref];
    //--Create Checkout Preference
    
    //Checkout Customization Preferences
    FlowPreference* fp = [[FlowPreference alloc]init];
    [fp disableReviewAndConfirmScreen];
    [fp disableDiscount];
    DecorationPreference* dp = [[DecorationPreference alloc]initWithBaseColor:color];
    if (blackFont){
        [dp enableDarkFont];
    }else {
        [dp enableLightFont];
    }
    //--Checkout Customization Preferences
    [MercadoPagoCheckout setServicePreference:[[ServicePreference alloc]init]];
    navCon  = [[UINavigationController alloc]init];
    UIViewController *rootViewController = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    
    //Create and Start Checkout
    self.cho = [[MercadoPagoCheckout alloc] initWithPublicKey:pk checkoutPreference:pref discount:nil navigationController:navCon];
    [MercadoPagoCheckout setFlowPreference:fp];
    [MercadoPagoCheckout setDecorationPreference:dp];
    [cho start];
    
    self.cho.callbackCancel = ^{
        [self sendCallback:@"backPressed" callbackID:callbackId];
        [self dissmissNavigationController];
    };
    
    [rootViewController presentViewController:navCon animated:YES completion:^{}];
    //--Create and Start Checkout
    
    //Callback
    [MercadoPagoCheckout setPaymentDataCallbackWithPaymentDataCallback:^(PaymentData * pd) {
        
      // [navCon dismissViewControllerAnimated:true completion:nil];
        [self dissmissNavigationController];
        NSString *jsonPaymentMethod = [pd.paymentMethod toJSONString];
        NSString *jsonToken = [pd.token toJSONString];
        
        NSMutableDictionary *mpResponse = [[NSMutableDictionary alloc] init];
        [mpResponse setObject:jsonPaymentMethod forKey:@"payment_method"];
        [mpResponse setObject:jsonToken forKey:@"token"];
        
        if (pd.issuer != nil ){
            NSString *jsonIssuer = [pd.issuer toJSONString];
            [mpResponse setObject:jsonIssuer forKey:@"issuer"];
        }
        
        NSError * err;
        NSData * jsonData = [NSJSONSerialization dataWithJSONObject:mpResponse options:0 error:&err];
        NSString * myString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        [self sendCallback:myString callbackID:callbackId];
    }];
    //--Callback
}

- (void)showPaymentResult:(CDVInvokedUrlCommand*)command {
    //Get Public Key
    NSString *pk = [[command arguments] objectAtIndex:0];
    
    //Get Payment
    NSData *data = [[[command arguments] objectAtIndex:1] dataUsingEncoding:NSUTF8StringEncoding];
    id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    Payment *payment = [Payment fromJSON:json];
    
    //Get Payment Method
    data = [[[command arguments] objectAtIndex:2] dataUsingEncoding:NSUTF8StringEncoding];
    json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    PaymentMethod *paymentMethod = [PaymentMethod fromJSON:json];
    
    //Get Callback ID
    NSString* callbackId = [command callbackId];
    
    // Create PaymentData
    PaymentData *paymentData = [PaymentData alloc];
    
    paymentData.paymentMethod = paymentMethod;
    
    Issuer *issuer = [[Issuer alloc] init];
    issuer._id = [NSString stringWithFormat:@"%ld",(long)payment.issuerId];
    paymentData.issuer = issuer;
    
    NSArray *labels = [[NSArray alloc] initWithObjects:@"labels", nil];
    PayerCost *dummyPayerCost = [[PayerCost alloc] initWithInstallments:1 installmentRate:0 labels:labels minAllowedAmount:1 maxAllowedAmount:10000000 recommendedMessage:nil installmentAmount:payment.transactionAmount totalAmount:payment.transactionAmount];
    dummyPayerCost.totalAmount = payment.transactionAmount;
    paymentData.payerCost = dummyPayerCost;
    
    if (payment.card != nil) {
        Token *token = [[Token alloc] initWith_id:payment.tokenId publicKey:pk cardId:nil luhnValidation:nil status:payment.status usedDate:nil cardNumberLength:payment.card.paymentMethod.settings[0].cardNumber.length creationDate:nil lastFourDigits:payment.card.lastFourDigits firstSixDigit:payment.card.firstSixDigits securityCodeLength:3 expirationMonth:payment.card.expirationMonth expirationYear:payment.card.expirationYear lastModifiedDate:payment.card.dateLastUpdated dueDate:nil cardHolder:payment.card.cardHolder];
        paymentData.token = token;
    } else {
        paymentData.token = nil;
    }
    
    paymentData.payer = payment.payer;
    
    paymentData.transactionDetails = payment.transactionDetails;
    
    if (payment.couponAmount == 0) {
        paymentData.discount = nil;
    } else {
        DiscountCoupon *discount = [[DiscountCoupon alloc] init];
        NSNumber *discountAmount = [NSNumber numberWithDouble:payment.couponAmount];
        discount.amount = payment.transactionAmount;
        discount.coupon_amount = [discountAmount stringValue];
        discount.amount_off = [discountAmount stringValue];
        
        paymentData.discount = discount;
    }
    //--Create PaymentData
    
    PaymentResult *paymentResult = [[PaymentResult alloc] initWithPayment:payment paymentData:paymentData];
    
    Item *itemDummy = [[Item alloc] initWith_id:@"item_ID" title:@"item" quantity:1 unitPrice:payment.transactionAmount description:@"item_description" currencyId:payment.currencyId];
    NSArray *items = [[NSArray alloc] initWithObjects:itemDummy, nil];
    CheckoutPreference *pref = [[CheckoutPreference alloc] initWithItems:items payer:paymentData.payer paymentMethods:nil];
    
    PaymentResultScreenPreference* prPref = [[PaymentResultScreenPreference alloc] init];
    
    PaymentResultViewController* congratsViewController = [[PaymentResultViewController alloc] initWithPaymentResult:paymentResult checkoutPreference:pref paymentResultScreenPreference:prPref callback:^(enum CongratsState actionState) {
        
        [self dissmissNavigationController];
        
        NSString *responseMessage;
        
        if (actionState == CongratsStateCancel_SELECT_OTHER || actionState == CongratsStateCancel_RETRY || actionState == CongratsStateCancel_RECOVER) {
            responseMessage = @"select_other_payment_method";
        } else if (actionState == CongratsStateCall_FOR_AUTH) {
            responseMessage = @"recover_payment";
        } else {
            responseMessage = @"continue";
        }
        
        NSMutableDictionary *mpResponse = [[NSMutableDictionary alloc] init];
        [mpResponse setObject:responseMessage forKey:@"nextAction"];
        
        NSError * err;
        NSData * jsonData = [NSJSONSerialization dataWithJSONObject:mpResponse options:0 error:&err];
        NSString * myString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        [self sendCallback:myString callbackID:callbackId];
        
        
    }];
    
    congratsViewController.callbackCancel = ^{
        [self sendCallback:@"backPressed" callbackID:callbackId];
        [self dissmissNavigationController];
    };
    
    [self showInNavigationController:congratsViewController];
    
}
- (void)setPaymentPreference:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = [command callbackId];
    
    PaymentPreference *pp = [[PaymentPreference alloc]init];
    
    NSArray *exPaymentMethods = [[command arguments] objectAtIndex:2];
    pp.excludedPaymentMethodIds = exPaymentMethods;
    NSArray *exPaymentTypes = [[command arguments] objectAtIndex:3];
    pp.excludedPaymentTypeIds = exPaymentTypes;
    pp.maxAcceptedInstallments = [[[command arguments] objectAtIndex:0]integerValue];
    pp.defaultInstallments =[[[command arguments] objectAtIndex:1]integerValue];
    
    [self sendCallback:[pp toJSONString] callbackID:callbackId];
}

UINavigationController *navCon = nil;

-(void) showInNavigationController:(UIViewController *)viewControllerBase{
    
    navCon = [[UINavigationController alloc]initWithRootViewController:viewControllerBase];
    UIViewController *rootViewController = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    [rootViewController presentViewController:navCon animated:YES completion:^{}];
}

-(void) dissmissNavigationController{
    [navCon dismissViewControllerAnimated:true completion:^{}];
}

-(NSString *)toString:(NSArray*)array{
    NSString* json= @"[";
    
    for (int i=0; i < [array count]; i++) {
        json =[json stringByAppendingString:[array[i] toJSONString]];
        json = [json stringByAppendingString:@","];
    }
    json = [json substringToIndex:[json length] - 1];
    json = [json stringByAppendingString: @"]"];
    return json;
}

-(NSString *)getSiteID:(NSString*)site{
    if ([[site uppercaseString] isEqual: @"ARGENTINA"]){
        return @"MLA";
    } else if ([[site uppercaseString] isEqual: @"BRASIL"]){
        return @"MLC";
    }  else if ([[site uppercaseString] isEqual: @"CHILE"]){
        return @"MCO";
    } else if ([[site uppercaseString] isEqual: @"COLOMBIA"]){
        return @"MLM";
    } else if ([[site uppercaseString] isEqual: @"MEXICO"]){
        return @"MLB";
    } else if ([[site uppercaseString] isEqual: @"USA"]){
        return @"USA";
    } else if ([[site uppercaseString] isEqual: @"VENEZUELA"]){
        return @"MLV";
    }
}

@end
