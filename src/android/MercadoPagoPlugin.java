package com.mercadopago.cordova.sdk;


import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import com.mercadopago.callbacks.Callback;
import com.mercadopago.constants.PaymentMethods;
import com.mercadopago.constants.PaymentTypes;
import com.mercadopago.constants.Sites;
import com.mercadopago.core.MercadoPago;
import com.mercadopago.core.MerchantServer;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.model.ApiException;

import com.mercadopago.model.DecorationPreference;
import com.mercadopago.model.Installment;
import com.mercadopago.model.Issuer;
import com.mercadopago.model.Item;
import com.mercadopago.model.MerchantPayment;
import com.mercadopago.model.BankDeal;
import com.mercadopago.model.Card;
import com.mercadopago.model.CardToken;
import com.mercadopago.model.IdentificationType;
import com.mercadopago.model.Instruction;
import com.mercadopago.model.PayerCost;
import com.mercadopago.model.Payment;
import com.mercadopago.model.PaymentMethod;
import com.mercadopago.model.PaymentPreference;
import com.mercadopago.model.PaymentResult;
import com.mercadopago.model.Token;
import com.mercadopago.model.Customer;
import com.mercadopago.model.PaymentRecovery;
import com.mercadopago.core.MercadoPagoUI;

import com.mercadopago.util.JsonUtil;

import com.mercadopago.util.MercadoPagoUtil;
//import com.mercadopago.connect.MPConnect;
import com.mercadopago.mpconnect.MPConnect;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import static android.text.TextUtils.isEmpty;

public class MercadoPagoPlugin extends CordovaPlugin {

    private static final String BACK_PRESSED = "backPressed";
    private CallbackContext callback = null;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("startMercadoPagoConnect")) {
            String appId = data.getString(0);
            String merchantBaseUrl = data.getString(1);
            String merchantGetCredentialsUri = data.getString(2);
            String merchantAccessToken = data.getString(3);
            String redirectUri = data.getString(4);
            startMercadoPagoConnect(appId, merchantBaseUrl, merchantGetCredentialsUri, merchantAccessToken, redirectUri, callbackContext);
            return true;

        } else if (action.equals("setPaymentPreference")) {
            Integer maxAcceptedInstallments = data.getInt(0);
            Integer defaultInstallments = data.getInt(1);
            JSONArray excludedPaymentMethodsJson = data.getJSONArray(2);
            JSONArray excludedPaymentTypesJson = data.getJSONArray(3);

            createPaymentPreference(maxAcceptedInstallments, defaultInstallments, excludedPaymentMethodsJson, excludedPaymentTypesJson, callbackContext);
            return true;

        } else if (action.equals("startSavedCards")) {

            Customer customer = JsonUtil.getInstance().fromJson(data.getString(0), Customer.class);
            String color = data.getString(1);
            Boolean blackFont = data.getBoolean(2);
            String title = data.getString(3);
            String footerText = data.getString(4);
            String confirmPromptText = data.getString(5);
            String mode = data.getString(6);
            PaymentPreference paymentPreference = JsonUtil.getInstance().fromJson(data.getString(7), PaymentPreference.class);

            startSavedCards(customer, color, blackFont, title, footerText, confirmPromptText, mode, paymentPreference, callbackContext);
            return true;

        } else if (action.equals("startCardSelection")) {

            String publicKey = data.getString(0);
            String site = data.getString(1);
            BigDecimal amount = new BigDecimal(data.getDouble(2));
            String merchantBaseUrl = data.getString(3);
            String merchantGetCustomerUri = data.getString(4);
            String merchantAccessToken = data.getString(5);
            String color = data.getString(6);
            Boolean blackFont = data.getBoolean(7);
            Boolean installmentsEnabled = data.getBoolean(8);
            PaymentPreference paymentPreference = JsonUtil.getInstance().fromJson(data.getString(9), PaymentPreference.class);

            startCardSelection(publicKey, site, amount, merchantBaseUrl, merchantGetCustomerUri, merchantAccessToken, color, blackFont, installmentsEnabled, paymentPreference, callbackContext);
            return true;

        } else if (action.equals("startCheckout")) {

            String publicKey = data.getString(0);
            String prefid = data.getString(1);
            String color = data.getString(2);
            Boolean blackFont = data.getBoolean(3);
            startCheckout(publicKey, prefid, color, blackFont, callbackContext);
            return true;

        } else if (action.equals("showPaymentVault")) {

            String publicKey = data.getString(0);
            String site = data.getString(1);
            BigDecimal amount = new BigDecimal(data.getDouble(2));
            String color = data.getString(3);
            Boolean blackFont = data.getBoolean(4);
            Boolean installmentsEnabled = data.getBoolean(5);
            PaymentPreference paymentPreference = JsonUtil.getInstance().fromJson(data.getString(6), PaymentPreference.class);
            startPaymentVault(publicKey, site, amount, color, blackFont, installmentsEnabled, paymentPreference, callbackContext);
            return true;

        } else if (action.equals("showCardWithoutInstallments")) {

            String publicKey = data.getString(0);
            String color = data.getString(1);
            Boolean blackFont = data.getBoolean(2);
            PaymentRecovery paymentRecovery = JsonUtil.getInstance().fromJson(data.getString(3), PaymentRecovery.class);
            PaymentPreference paymentPreference = JsonUtil.getInstance().fromJson(data.getString(4), PaymentPreference.class);

            startCardFormWithoutInstallments(publicKey, color, blackFont, paymentRecovery, paymentPreference, callbackContext);
            return true;

        } else if (action.equals("showCardWithInstallments")) {

            String publicKey = data.getString(0);
            String site = data.getString(1);
            BigDecimal amount = new BigDecimal(data.getDouble(2));
            String color = data.getString(3);
            Boolean blackFont = data.getBoolean(4);
            PaymentRecovery paymentRecovery = JsonUtil.getInstance().fromJson(data.getString(5), PaymentRecovery.class);
            PaymentPreference paymentPreference = JsonUtil.getInstance().fromJson(data.getString(6), PaymentPreference.class);
            startCardFormWithInstallments(publicKey, site, amount, color, blackFont, paymentRecovery, paymentPreference, callbackContext);
            return true;

        } else if (action.equals("showPaymentMethods")) {

            String publicKey = data.getString(0);
            String color = data.getString(1);
            Boolean blackFont = data.getBoolean(2);
            PaymentPreference paymentPreference = JsonUtil.getInstance().fromJson(data.getString(3), PaymentPreference.class);
            startPaymentMethodsList(publicKey, color, blackFont, paymentPreference, callbackContext);
            return true;

        } else if (action.equals("showIssuers")) {
            String publicKey = data.getString(0);
            String paymentMethodId = data.getString(1);
            String color = data.getString(2);
            Boolean blackFont = data.getBoolean(3);
            startIssuersList(publicKey, paymentMethodId, color, blackFont, callbackContext);
            return true;

        } else if (action.equals("showInstallments")) {

            String publicKey = data.getString(0);
            String site = data.getString(1);
            BigDecimal amount = new BigDecimal(data.getDouble(2));
            String paymentMethodId = data.getString(3);
            Long issuerId = data.getLong(4);
            String color = data.getString(5);
            Boolean blackFont = data.getBoolean(6);
            PaymentPreference paymentPreference = JsonUtil.getInstance().fromJson(data.getString(7), PaymentPreference.class);
            startInstallmentsList(publicKey, site, amount, paymentMethodId, issuerId, color, blackFont, paymentPreference, callbackContext);
            return true;

        } else if (action.equals("showBankDeals")) {

            String publicKey = data.getString(0);
            String color = data.getString(1);
            Boolean blackFont = data.getBoolean(2);
            startBankDealsList(publicKey, color, blackFont, callbackContext);
            return true;

        } else if (action.equals("showPaymentResult")) {

            String publicKey = data.getString(0);
            Payment payment = JsonUtil.getInstance().fromJson(data.getString(1), Payment.class);
            PaymentMethod paymentMethod = JsonUtil.getInstance().fromJson(data.getString(2), PaymentMethod.class);
            startPaymentResult(publicKey, payment, paymentMethod, callbackContext);
            return true;

        } else if(action.equals("getCustomer")) {

            String merchantBaseUrl = data.getString(0);
            String merchantGetCustomerUri = data.getString(1);
            String merchantAccessToken = data.getString(2);

            getCustomer(merchantBaseUrl, merchantGetCustomerUri, merchantAccessToken, callbackContext);
            return true;

        } else if (action.equals("createPayment")) {

            String publicKey = data.getString(0);
            String itemId = data.getString(1);
            Integer itemQuantity = data.getInt(2);
            BigDecimal amount = new BigDecimal(data.getDouble(3));
            Long campaignId = data.getLong(4);
            String merchantAccessToken = data.getString(5);
            String merchantBaseUrl = data.getString(6);
            String merchantGetCustomerUri = data.getString(7);
            String paymentMethodId = data.getString(8);
            int installments = data.getInt(9);
            Long cardIssuerId = data.getLong(10);
            String token = data.getString(11);

            createPayment(publicKey, itemId, itemQuantity, amount, campaignId, merchantAccessToken, merchantBaseUrl, merchantGetCustomerUri, paymentMethodId, installments, cardIssuerId, token, callbackContext);
            return true;

        } else if (action.equals("createPaymentRecovery")) {
            Payment payment = JsonUtil.getInstance().fromJson(data.getString(0), Payment.class);
            Token token = JsonUtil.getInstance().fromJson(data.getString(1), Token.class);
            PaymentMethod paymentMethod = JsonUtil.getInstance().fromJson(data.getString(2), PaymentMethod.class);
            Issuer issuer = JsonUtil.getInstance().fromJson(data.getString(3), Issuer.class);
            PayerCost payerCost = JsonUtil.getInstance().fromJson(data.getString(4), PayerCost.class);
            createPaymentRecovery(payment, token, paymentMethod, payerCost, issuer, callbackContext);
            return true;

        } else if (action.equals("getPaymentMethods")) {

            getPaymentMethods(data, callbackContext);
            return true;

        } else if (action.equals("getIssuers")) {

            getIssuers(data, callbackContext);
            return true;

        } else if (action.equals("getInstallments")) {

            getInstallments(data, callbackContext);
            return true;

        } else if (action.equals("getIdentificationTypes")) {

            getIdentificationTypes(data, callbackContext);
            return true;

        } else if (action.equals("createToken")) {

            createToken(data, callbackContext);
            return true;

        } else if (action.equals("getBankDeals")) {

            getBankDeals(data, callbackContext);
            return true;

        } else if (action.equals("getPaymentResult")) {

            getPaymentResult(data, callbackContext);
            return true;

        } else {
            return false;
        }
    }

    private void startMercadoPagoConnect(String appID, String merchantBaseUrl, String merchantGetCredentialsUri, String merchantAccessToken, String redirectUri, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        MPConnect.StartActivityBuilder mc = new MPConnect.StartActivityBuilder()
                        .setActivity(this.cordova.getActivity())
                        .setAppId(appID)
                        .setMerchantAccessToken(merchantAccessToken)
                        .setMerchantBaseUrl(merchantBaseUrl)
                        .setMerchantGetCredentialsUri(merchantGetCredentialsUri);
        if (redirectUri != "null") {
            mc.setRedirectUri(redirectUri);
        }
        mc.startConnectActivity();
    }

    private void createPaymentPreference(Integer maxAcceptedInstallments, Integer defaultInstallments, JSONArray excludedPaymentMethodsJson, JSONArray excludedPaymentTypesJson, CallbackContext callbackContext) throws JSONException {
        PaymentPreference paymentPreference = new PaymentPreference();
        if (maxAcceptedInstallments != 0) {
            paymentPreference.setMaxAcceptedInstallments(maxAcceptedInstallments);
        }
        if (defaultInstallments != 0) {
            paymentPreference.setDefaultInstallments(defaultInstallments);
        }
        List<String> excludedPaymentTypes = new ArrayList();
        for (int i = 0; i < excludedPaymentMethodsJson.length(); i++) {
            excludedPaymentTypes.add(excludedPaymentMethodsJson.getString(i));
        }

        paymentPreference.setExcludedPaymentTypeIds(excludedPaymentTypes);

        List<String> excludedPaymentMethods = new ArrayList();
        for (int i = 0; i < excludedPaymentMethodsJson.length(); i++) {
            excludedPaymentMethods.add(excludedPaymentMethodsJson.getString(i));
        }

        paymentPreference.setExcludedPaymentMethodIds(excludedPaymentMethods);
        callbackContext.success(JsonUtil.getInstance().toJson(paymentPreference));
    }

    private void createPaymentRecovery(Payment payment, Token token, PaymentMethod paymentMethod, PayerCost payerCost, Issuer issuer, CallbackContext callbackContext) {

        try {
            PaymentRecovery paymentRecovery = new PaymentRecovery(token, payment, paymentMethod, payerCost, issuer);
            callbackContext.success(JsonUtil.getInstance().toJson(paymentRecovery));
        }
        catch (Exception e) {
            callbackContext.error(e.getMessage());
        }
    }

    private void startSavedCards(Customer customer, String color, Boolean blackFont, String title, String customActionText, String confirmPromptText, String mode, PaymentPreference paymentPreference, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        DecorationPreference decorationPreference = new DecorationPreference();
        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        MercadoPagoUI.Activities.SavedCardsActivityBuilder builder = new MercadoPagoUI.Activities.SavedCardsActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setCards(customer.getCards())
                .setPaymentPreference(paymentPreference)
                .setDecorationPreference(decorationPreference)
                .setTitle(title)
                .setCustomActionMessage(customActionText)
                .setSelectionConfirmPromptText(confirmPromptText);

        builder.startActivity();
    }

    private void startCardSelection(String publicKey, String site, BigDecimal amount, String merchantBaseUrl, String merchantGetCustomerUri, String merchantAccessToken, String color, Boolean blackFont, Boolean installmentsEnabled, PaymentPreference merchantPaymentPreference, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        Boolean showBankDeals = true;
        DecorationPreference decorationPreference = new DecorationPreference();
        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        List<String> excluded = new ArrayList();
        excluded.add(PaymentTypes.ACCOUNT_MONEY);
        excluded.add(PaymentTypes.ATM);
        excluded.add(PaymentTypes.BANK_TRANSFER);
        excluded.add(PaymentTypes.DIGITAL_CURRENCY);
        excluded.add(PaymentTypes.TICKET);

        PaymentPreference paymentPreference = new PaymentPreference();
        paymentPreference.setExcludedPaymentTypeIds(excluded);

        if (merchantPaymentPreference != null) {
            paymentPreference.setExcludedPaymentMethodIds(merchantPaymentPreference.getExcludedPaymentMethodIds());
            paymentPreference.setDefaultInstallments(merchantPaymentPreference.getDefaultInstallments());
            paymentPreference.setMaxAcceptedInstallments(merchantPaymentPreference.getMaxInstallments());
            Integer maxInstallments = merchantPaymentPreference.getMaxInstallments();
            Integer defaultInstallments = merchantPaymentPreference.getDefaultInstallments();
            if((maxInstallments != null && maxInstallments == 1)
                    || (defaultInstallments != null && defaultInstallments == 1)) {
                showBankDeals = false;
            }
        }

        MercadoPago.StartActivityBuilder mp = new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setAmount(amount)
                .setMerchantBaseUrl(merchantBaseUrl)
                .setMerchantGetCustomerUri(merchantGetCustomerUri)
                .setMerchantAccessToken(merchantAccessToken)
                .setInstallmentsEnabled(installmentsEnabled)
                .setPaymentPreference(paymentPreference)
                .setShowBankDeals(showBankDeals)
                .setDecorationPreference(decorationPreference);

        if (site.toUpperCase().equals("ARGENTINA")) {
            mp.setSite(Sites.ARGENTINA);
        } else if (site.toUpperCase().equals("BRASIL")) {
            mp.setSite(Sites.BRASIL);
        } else if (site.toUpperCase().equals("CHILE")) {
            mp.setSite(Sites.CHILE);
        } else if (site.toUpperCase().equals("COLOMBIA")) {
            mp.setSite(Sites.COLOMBIA);
        } else if (site.toUpperCase().equals("MEXICO")) {
            mp.setSite(Sites.MEXICO);
        } else if (site.toUpperCase().equals("USA")) {
            mp.setSite(Sites.USA);
        } else if (site.toUpperCase().equals("VENEZUELA")) {
            mp.setSite(Sites.VENEZUELA);
        }
        mp.startPaymentVaultActivity();
    }

    private void startCheckout(String publicKey, String prefid, String color, Boolean blackFont, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setDecorationPreference(decorationPreference)
                .setPublicKey(publicKey)
                .setCheckoutPreferenceId(prefid)
                .startCheckoutActivity();
    }

    private void startPaymentVault(String publicKey, String site, BigDecimal amount, String color, Boolean blackFont, Boolean installmentsEnabled, PaymentPreference paymentPreference, CallbackContext callbackContext) {
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }


        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        MercadoPago.StartActivityBuilder mp = new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setDecorationPreference(decorationPreference)
                .setInstallmentsEnabled(installmentsEnabled)
                .setPaymentPreference(paymentPreference)
                .setAmount(amount);

        if (site.toUpperCase().equals("ARGENTINA")) {
            mp.setSite(Sites.ARGENTINA);
        } else if (site.toUpperCase().equals("BRASIL")) {
            mp.setSite(Sites.BRASIL);
        } else if (site.toUpperCase().equals("CHILE")) {
            mp.setSite(Sites.CHILE);
        } else if (site.toUpperCase().equals("COLOMBIA")) {
            mp.setSite(Sites.COLOMBIA);
        } else if (site.toUpperCase().equals("MEXICO")) {
            mp.setSite(Sites.MEXICO);
        } else if (site.toUpperCase().equals("USA")) {
            mp.setSite(Sites.USA);
        } else if (site.toUpperCase().equals("VENEZUELA")) {
            mp.setSite(Sites.VENEZUELA);
        }

        mp.startPaymentVaultActivity();
    }

    private void startCardFormWithoutInstallments(String publicKey, String color, Boolean blackFont, PaymentRecovery paymentRecovery, PaymentPreference paymentPreference, CallbackContext callbackContext) {
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setDecorationPreference(decorationPreference)
                .setPublicKey(publicKey)
                .setPaymentPreference(paymentPreference)
                .setPaymentRecovery(paymentRecovery)
                .setInstallmentsEnabled(false)
                .setDiscountEnabled(false)
                .setShowBankDeals(false)
                .startCardVaultActivity();

        cordova.setActivityResultCallback(this);
        callback = callbackContext;
    }

    private void startCardFormWithInstallments(String publicKey, String site, BigDecimal amount, String color, Boolean blackFont, PaymentRecovery paymentRecovery, PaymentPreference paymentPreference, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        MercadoPago.StartActivityBuilder mp = new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setDecorationPreference(decorationPreference)
                .setPaymentPreference(paymentPreference)
                .setPaymentRecovery(paymentRecovery)
                .setInstallmentsEnabled(true)
                .setDiscountEnabled(false)
                .setAmount(amount);

        if (site.toUpperCase().equals("ARGENTINA")) {
            mp.setSite(Sites.ARGENTINA);
        } else if (site.toUpperCase().equals("BRASIL")) {
            mp.setSite(Sites.BRASIL);
        } else if (site.toUpperCase().equals("CHILE")) {
            mp.setSite(Sites.CHILE);
        } else if (site.toUpperCase().equals("COLOMBIA")) {
            mp.setSite(Sites.COLOMBIA);
        } else if (site.toUpperCase().equals("MEXICO")) {
            mp.setSite(Sites.MEXICO);
        } else if (site.toUpperCase().equals("USA")) {
            mp.setSite(Sites.USA);
        } else if (site.toUpperCase().equals("VENEZUELA")) {
            mp.setSite(Sites.VENEZUELA);
        }
        mp.startCardVaultActivity();
    }

    private void startPaymentMethodsList(String publicKey, String color, Boolean blackFont, PaymentPreference paymentPreference, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setDecorationPreference(decorationPreference)
                .setPaymentPreference(paymentPreference)
                .setDiscountEnabled(false)
                .startPaymentMethodsActivity();

    }

    private void startIssuersList(String publicKey, String paymentMethodId, String color, Boolean blackFont, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setId(paymentMethodId);

        new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setDecorationPreference(decorationPreference)
                .setPaymentMethod(paymentMethod)
                .setDiscountEnabled(false)
                .startIssuersActivity();
    }

    private void startInstallmentsList(String publicKey, String site, BigDecimal amount, String paymentMethodId, Long issuerId, String color, Boolean blackFont, PaymentPreference paymentPreference, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);
        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setId(paymentMethodId);
        Issuer issuer = new Issuer();
        issuer.setId(issuerId);

        MercadoPago.StartActivityBuilder mp = new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setDecorationPreference(decorationPreference)
                .setPaymentPreference(paymentPreference)
                .setAmount(amount)
                .setIssuer(issuer)
                .setDiscountEnabled(false)
                .setPaymentMethod(paymentMethod);

        if (site.toUpperCase().equals("ARGENTINA")) {
            mp.setSite(Sites.ARGENTINA);
        } else if (site.toUpperCase().equals("BRASIL")) {
            mp.setSite(Sites.BRASIL);
        } else if (site.toUpperCase().equals("CHILE")) {
            mp.setSite(Sites.CHILE);
        } else if (site.toUpperCase().equals("COLOMBIA")) {
            mp.setSite(Sites.COLOMBIA);
        } else if (site.toUpperCase().equals("MEXICO")) {
            mp.setSite(Sites.MEXICO);
        } else if (site.toUpperCase().equals("USA")) {
            mp.setSite(Sites.USA);
        } else if (site.toUpperCase().equals("VENEZUELA")) {
            mp.setSite(Sites.VENEZUELA);
        }
        mp.startInstallmentsActivity();
    }

    private void startBankDealsList(String publicKey, String color, Boolean blackFont, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        DecorationPreference decorationPreference = new DecorationPreference();

        if (color != "null") {
            decorationPreference.setBaseColor(color);

        }
        if (blackFont) {
            decorationPreference.enableDarkFont();
        }

        new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setDecorationPreference(decorationPreference)
                .setDiscountEnabled(false)
                .startBankDealsActivity();
    }

    private void startPaymentResult(String publicKey, Payment payment, PaymentMethod paymentMethod, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;
        new MercadoPago.StartActivityBuilder()
                .setActivity(this.cordova.getActivity())
                .setPublicKey(publicKey)
                .setPayment(payment)
                .setPaymentMethod(paymentMethod)
                .setDiscountEnabled(false)
                .startPaymentResultActivity();
    }


    //SERVICIOS

    private void getCustomer(String merchantBaseUrl, String merchantGetCustomerUri, String merchantAccessToken, final CallbackContext callbackContext) {
      cordova.setActivityResultCallback(this);
      callback = callbackContext;
      MerchantServer.getCustomer(this.cordova.getActivity(), merchantBaseUrl, merchantGetCustomerUri, merchantAccessToken, new Callback<Customer>() {
            @Override
            public void success(Customer customer) {
                callback.success(JsonUtil.getInstance().toJson(customer));
            }

            @Override
            public void failure(ApiException apiException) {
                callback.error(apiException.getError());
            }
        });
    }

    private void createPayment(String publicKey, String itemId, Integer itemQuantity, BigDecimal amount, Long campaignId, String merchantAccessToken, String merchantBaseUrl, String merchantGetCustomerUri, String paymentMethodId, int installments, Long cardIssuerId, String token, CallbackContext callbackContext) {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        if (paymentMethodId != null) {

            Item item = new Item(itemId, itemQuantity, amount);

            MerchantPayment payment = new MerchantPayment(item, installments,
                    cardIssuerId, token, paymentMethodId, campaignId, merchantAccessToken);

            // Enviar los datos a tu servidor
            MerchantServer.createPayment(this.cordova.getActivity(), merchantBaseUrl, merchantGetCustomerUri, payment, new Callback<Payment>() {
                @Override
                public void success(Payment payment) {
                        String mpPayment = JsonUtil.getInstance().toJson(payment);
                        JSONObject js = new JSONObject();
                        try {
                            js.put("payment", mpPayment);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        callback.success(js.toString());
                }

                @Override
                public void failure(ApiException apiException) {
                    callback.error(apiException.getError());

                }
            });
        } else {
            Toast.makeText(this.cordova.getActivity(), "Invalid payment method", Toast.LENGTH_LONG).show();
        }
    }

    private void getPaymentMethods(JSONArray data, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        MercadoPago mercadoPago = new MercadoPago.Builder()
                .setContext(this.cordova.getActivity())
                .setPublicKey(data.getString(0))
                .build();

        mercadoPago.getPaymentMethods(new Callback<List<PaymentMethod>>() {
            @Override
            public void success(List<PaymentMethod> paymentMethods) {

                String pm = JsonUtil.getInstance().toJson(paymentMethods);
                callback.success(pm);
            }

            @Override
            public void failure(ApiException error) {
                callback.error(error.toString());
            }
        });
    }

    private void getIssuers(JSONArray data, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        String paymentMethodId = data.getString(1);
        String bin = data.getString(2);

        MercadoPago mercadoPago = new MercadoPago.Builder()
                .setContext(this.cordova.getActivity())
                .setPublicKey(data.getString(0))
                .build();

        mercadoPago.getIssuers(paymentMethodId, bin, new Callback<List<Issuer>>() {
            @Override
            public void success(List<Issuer> issuers) {

                String issuer = JsonUtil.getInstance().toJson(issuers);
                callback.success(issuer);
            }

            @Override
            public void failure(ApiException error) {
                callback.error(error.toString());
            }
        });
    }

    private void getInstallments(JSONArray data, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        String paymentMethodId = data.getString(1);
        String bin = data.getString(2);
        Long issuerId = data.getLong(3);

        BigDecimal amount = new BigDecimal(data.getDouble(4));

        MercadoPago mercadoPago = new MercadoPago.Builder()
                .setContext(this.cordova.getActivity())
                .setPublicKey(data.getString(0))
                .build();

        mercadoPago.getInstallments(bin, amount, issuerId, paymentMethodId, new Callback<List<Installment>>() {
            @Override
            public void success(List<Installment> installments) {
                String installment = JsonUtil.getInstance().toJson(installments);
                callback.success(installment);
            }

            @Override
            public void failure(ApiException error) {
                callback.error(error.toString());
            }
        });
    }

    private void getIdentificationTypes(JSONArray data, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        MercadoPago mercadoPago = new MercadoPago.Builder()
                .setContext(this.cordova.getActivity())
                .setPublicKey(data.getString(0))
                .build();

        mercadoPago.getIdentificationTypes(new Callback<List<IdentificationType>>() {
            @Override
            public void success(List<IdentificationType> identificationTypes) {
                String identificationType = JsonUtil.getInstance().toJson(identificationTypes);
                callback.success(identificationType);
            }

            @Override
            public void failure(ApiException error) {
                callback.error(error.toString());
            }
        });
    }

    private void createToken(JSONArray data, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        CardToken cardToken = new CardToken(data.getString(1), data.getInt(2), data.getInt(3), data.getString(4), data.getString(5), data.getString(6), data.getString(7));

        MercadoPago mercadoPago = new MercadoPago.Builder()
                .setContext(this.cordova.getActivity())
                .setPublicKey(data.getString(0))
                .build();

        mercadoPago.createToken(cardToken, new Callback<Token>() {
            @Override
            public void success(Token token) {

                String mptoken = JsonUtil.getInstance().toJson(token);
                callback.success(mptoken);
            }

            @Override
            public void failure(ApiException error) {
                callback.error(error.toString());
            }
        });
    }

    private void getBankDeals(JSONArray data, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        MercadoPago mercadoPago = new MercadoPago.Builder()
                .setContext(this.cordova.getActivity())
                .setPublicKey(data.getString(0))
                .build();

        mercadoPago.getBankDeals(new Callback<List<BankDeal>>() {
            @Override
            public void success(List<BankDeal> bankDeals) {

                String bankDeal = JsonUtil.getInstance().toJson(bankDeals);
                callback.success(bankDeal);
            }

            @Override
            public void failure(ApiException error) {
                callback.error(error.toString());
            }
        });
    }

    private void getPaymentResult(JSONArray data, CallbackContext callbackContext) throws JSONException {
        cordova.setActivityResultCallback(this);
        callback = callbackContext;

        Long paymentId = data.getLong(1);
        String paymentTypeId = data.getString(2);

        MercadoPago mercadoPago = new MercadoPago.Builder()
                .setContext(this.cordova.getActivity())
                .setPublicKey(data.getString(0))
                .build();

        mercadoPago.getPaymentResult(paymentId, paymentTypeId, new Callback<PaymentResult>() {
            @Override
            public void success(PaymentResult paymentResult) {

                String mpPaymentResult = JsonUtil.getInstance().toJson(paymentResult);
                callback.success(mpPaymentResult);
            }

            @Override
            public void failure(ApiException error) {
                callback.error(error.toString());
            }
        });
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        if (requestCode == MercadoPagoUI.Activities.CUSTOMER_CARDS_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                String cardsJson = data.getStringExtra("card");
                if (cardsJson != null) {
                    callback.success(cardsJson);
                } else {
                    callback.success("footerSelected");
                }
            } else {
                if ((data != null) && (data.hasExtra("mpException"))) {
                    MPException mpException = JsonUtil.getInstance()
                            .fromJson(data.getStringExtra("mpException"), MPException.class);
                    callback.error(mpException.getMessage());
                } else {
                    callback.success(BACK_PRESSED);
                }
            }
        } else if (requestCode == MercadoPago.PAYMENT_VAULT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                String paymentMethod = data.getStringExtra("paymentMethod");
                String issuer = data.getStringExtra("issuer");
                String token = data.getStringExtra("token");
                String payerCost = data.getStringExtra("payerCost");

                JSONObject js = new JSONObject();
                try {
                    js.put("payment_method", paymentMethod);
                    js.put("issuer", issuer);
                    js.put("token", token);
                    js.put("payer_cost", payerCost);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
                callback.success(js.toString());
            } else {
                if ((data != null) && (data.hasExtra("mpException"))) {
                    MPException mpException = JsonUtil.getInstance()
                            .fromJson(data.getStringExtra("mpException"), MPException.class);
                    callback.error(mpException.getMessage());
                } else {
                  callback.success(BACK_PRESSED);
                }
            }
        } else if (requestCode == MercadoPago.CARD_VAULT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                String paymentMethod = data.getStringExtra("paymentMethod");
                String issuer = data.getStringExtra("issuer");
                String token = data.getStringExtra("token");
                String payerCost = data.getStringExtra("payerCost");

                JSONObject js = new JSONObject();
                try {
                    js.put("payment_method", paymentMethod);
                    js.put("issuer", issuer);
                    js.put("token", token);
                    js.put("payer_cost", payerCost);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
                callback.success(js.toString());

            } else {
                if ((data != null) && (data.hasExtra("mpException"))) {
                    MPException mpException = JsonUtil.getInstance()
                            .fromJson(data.getStringExtra("mpException"), MPException.class);
                    callback.error(mpException.getMessage());
                } else {
                  callback.success(BACK_PRESSED);
                }
            }
        } else if (requestCode == MercadoPago.PAYMENT_METHODS_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                String paymentMethod = data.getStringExtra("paymentMethod");

                callback.success(paymentMethod);
            } else {
                if ((data != null) && (data.hasExtra("mpException"))) {
                    MPException mpException = JsonUtil.getInstance()
                            .fromJson(data.getStringExtra("mpException"), MPException.class);
                    callback.error(mpException.getMessage());
                } else {
                  callback.success(BACK_PRESSED);
                }
            }
        } else if (requestCode == MercadoPago.ISSUERS_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                String issuer = data.getStringExtra("issuer");

                callback.success(issuer);

            } else {
                if ((data != null) && (data.hasExtra("mpException"))) {
                    MPException mpException = JsonUtil.getInstance()
                            .fromJson(data.getStringExtra("mpException"), MPException.class);
                    callback.error(mpException.getMessage());
                } else {
                  callback.success(BACK_PRESSED);
                }
            }
        } else if (requestCode == MercadoPago.INSTALLMENTS_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                String payerCost = data.getStringExtra("payerCost");
                callback.success(payerCost);
            } else {
                if ((data != null) && (data.hasExtra("mpException"))) {
                    MPException mpException = JsonUtil.getInstance()
                            .fromJson(data.getStringExtra("mpException"), MPException.class);
                    callback.error(mpException.getMessage());
                } else {
                  callback.success(BACK_PRESSED);
                }
            }

        } else if (requestCode == MercadoPago.CHECKOUT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {

                // Listo! El pago ya fue procesado por MP.
                String payment = data.getStringExtra("payment");

                if (payment != null) {
                    callback.success(payment);
                } else {
                    callback.success("El usuario no concretó el pago.");
                }

            } else {
                if ((data != null) && (data.hasExtra("mpException"))) {
                    MPException mpException = JsonUtil.getInstance()
                            .fromJson(data.getStringExtra("mpException"), MPException.class);
                    callback.error(mpException.getMessage());
                } else {
                  callback.success(BACK_PRESSED);
                }
            }
        } else if (requestCode == MercadoPago.PAYMENT_RESULT_REQUEST_CODE) {
            String nextAction = "";

            if (resultCode == Activity.RESULT_CANCELED && data != null) {
                nextAction = data.getStringExtra("nextAction");
            } else {
                nextAction = "continue";
            }
            JSONObject js = new JSONObject();
            try {
                js.put("nextAction", nextAction);
            } catch (JSONException e) {
                callback.error(e.getMessage());
            }
            callback.success(js.toString());
        } else if (requestCode == MPConnect.CONNECT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                callback.success(data.getStringExtra("accessToken"));
            } else {
                callback.success(BACK_PRESSED);
            }
        }
    }
}
