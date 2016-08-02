package com.mercadopago.cordova.sdk;


import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.text.BidiFormatter;
import android.util.StringBuilderPrinter;
import android.widget.Toast;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mercadopago.callbacks.Callback;
import com.mercadopago.constants.Sites;
import com.mercadopago.core.MercadoPago;
import com.mercadopago.core.MerchantServer;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.model.ApiException;

import com.mercadopago.model.CardIssuer;
import com.mercadopago.model.DecorationPreference;
import com.mercadopago.model.Installment;
import com.mercadopago.model.Issuer;
import com.mercadopago.model.Item;
import com.mercadopago.model.MerchantPayment;
import com.mercadopago.model.BankDeal;
import com.mercadopago.model.CardToken;
import com.mercadopago.model.IdentificationType;
import com.mercadopago.model.Installment;
import com.mercadopago.model.Instruction;
import com.mercadopago.model.Issuer;
import com.mercadopago.model.Item;
import com.mercadopago.model.MerchantPayment;
import com.mercadopago.model.Payer;
import com.mercadopago.model.PayerCost;
import com.mercadopago.model.Payment;
import com.mercadopago.model.PaymentMethod;
//import com.mercadopago.model.Sites;
import com.mercadopago.model.Token;

import com.mercadopago.util.JsonUtil;

import com.mercadopago.util.MercadoPagoUtil;


import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.util.List;


public class MercadoPagoPlugin extends CordovaPlugin {
    private CallbackContext callback = null;


    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {



        if (action.equals("startCheckout")) {
            cordova.setActivityResultCallback (this);

            DecorationPreference decorationPreference = new DecorationPreference();

//            if (data.getString(2) != "null") {
//                decorationPreference.setBaseColor(data.getString(2));
//
//            }
//            if (data.getBoolean(3) == true){
//                decorationPreference.enableDarkFont();
//            }

            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setDecorationPreference(decorationPreference)
            .setPublicKey(data.getString(0))
            .setCheckoutPreferenceId(data.getString(1))
            .startCheckoutActivity();

            callback = callbackContext;


            return true;


        } else if (action.equals("showPaymentVault")){

            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(2) != "null") {
                decorationPreference.setBaseColor(data.getString(2));

            }
            if (data.getBoolean(3) == true){
                decorationPreference.enableDarkFont();
            }

            cordova.setActivityResultCallback (this);
            callback = callbackContext;
            BigDecimal b = new BigDecimal(data.getInt(1));
            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setDecorationPreference(decorationPreference)
            .setAmount(b)
            .setSite(Sites.ARGENTINA)
            .startPaymentVaultActivity();

            return true;


        } else if (action.equals("showCardWithoutInstallments")){

            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(1) != "null") {
                decorationPreference.setBaseColor(data.getString(1));

            }
            if (data.getBoolean(2) == true){
                decorationPreference.enableDarkFont();
            }
            cordova.setActivityResultCallback (this);
            callback = callbackContext;
            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setDecorationPreference(decorationPreference)
            .setPublicKey(data.getString(0))
            .startGuessingCardActivity();

            return true;

        } else if (action.equals("showCardWithInstallments")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(2) != "null") {
                decorationPreference.setBaseColor(data.getString(2));

            }
            if (data.getBoolean(3) == true){
                decorationPreference.enableDarkFont();
            }

            BigDecimal amount = new BigDecimal(data.getInt(1));
            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setDecorationPreference(decorationPreference)
            .setAmount(amount)
            .setSite(Sites.ARGENTINA)
            .startCardVaultActivity();

            return true;

        } else if (action.equals("showPaymentMethods")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;
            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(1) != "null") {
                decorationPreference.setBaseColor(data.getString(1));

            }
            if (data.getBoolean(2) == true){
                decorationPreference.enableDarkFont();
            }

            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setDecorationPreference(decorationPreference)
            .startPaymentMethodsActivity();

            return true;

        } else if (action.equals("showIssuers")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(2) != "null") {
                decorationPreference.setBaseColor(data.getString(2));

            }
            if (data.getBoolean(3) == true){
                decorationPreference.enableDarkFont();
            }
            PaymentMethod paymentMethod = new PaymentMethod();
            paymentMethod.setId(data.getString(1));

            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setDecorationPreference(decorationPreference)
            .setPaymentMethod(paymentMethod)
            .startIssuersActivity();

            return true;

        } else if (action.equals("showInstallments")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;
            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(4) != "null") {
                decorationPreference.setBaseColor(data.getString(4));

            }
            if (data.getBoolean(5) == true){
                decorationPreference.enableDarkFont();
            }

            PaymentMethod paymentMethod = new PaymentMethod();
            paymentMethod.setId(data.getString(2));
            Issuer issuer = new Issuer();
            issuer.setId(data.getLong(3));
            BigDecimal amount = new BigDecimal(data.getInt(1));

            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setSite(Sites.ARGENTINA)
            .setDecorationPreference(decorationPreference)
            .setAmount(amount)
            .setIssuer(issuer)
            .setPaymentMethod(paymentMethod)
            .startInstallmentsActivity();

            return true;
        } else if (action.equals("showBankDeals")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(1) != "null") {
                decorationPreference.setBaseColor(data.getString(1));

            }
            if (data.getBoolean(2) == true){
                decorationPreference.enableDarkFont();
            }

            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setDecorationPreference(decorationPreference)
            .startBankDealsActivity();

            return true;
        } else if (action.equals("showCongrats")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(3) != "null") {
                decorationPreference.setBaseColor(data.getString(3));

            }
            if (data.getBoolean(4) == true){
                decorationPreference.enableDarkFont();
            }

            Payment payment = new Payment();
            payment.setId(data.getLong(1));
            PaymentMethod paymentMethod = new PaymentMethod();
            paymentMethod.setPaymentTypeId(data.getString(2));

            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setPayment(payment)
            .setDecorationPreference(decorationPreference)
            .setPaymentMethod(paymentMethod)
            .startCongratsActivity();

            return true;
        } else if (action.equals("showInstructions")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            DecorationPreference decorationPreference = new DecorationPreference();

            if (data.getString(3) != "null") {
                decorationPreference.setBaseColor(data.getString(3));

            }
            if (data.getBoolean(4) == true){
                decorationPreference.enableDarkFont();
            }

            Payment payment = new Payment();
            payment.setId(data.getLong(1));
            PaymentMethod paymentMethod = new PaymentMethod();
            paymentMethod.setPaymentTypeId(data.getString(2));

            new MercadoPago.StartActivityBuilder()
            .setActivity(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .setPayment(payment)
            .setDecorationPreference(decorationPreference)
            .setPaymentMethod(paymentMethod)
            .startInstructionsActivity();

            return true;
        } else if (action.equals("createPayment")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            final PaymentMethod paymentMethod = new PaymentMethod();
            paymentMethod.setId(data.getString(8));
            int installments = data.getInt(9);
            Long cardIssuerId = data.getLong(10);
            String token = data.getString(11);

            BigDecimal amount = new BigDecimal(data.getInt(3));
            if (paymentMethod != null) {

                Item item = new Item(data.getString(1), data.getInt(2), amount);

                String paymentMethodId = paymentMethod.getId();

                MerchantPayment payment = new MerchantPayment(item, installments,
                                                              cardIssuerId, token, paymentMethodId, data.getLong(4), data.getString(5));

                // Enviar los datos a tu servidor
                MerchantServer.createPayment(this.cordova.getActivity(), data.getString(6), data.getString(7), payment, new Callback<Payment>() {
                     @Override
                     public void success(Payment payment) {

                         if (MercadoPagoUtil.isCard(paymentMethod.getPaymentTypeId())) {
                             Gson gson = new Gson();
                             String mpPayment = gson.toJson(payment);
                             String mpPaymentMethod = gson.toJson(paymentMethod);
                             JSONObject js = new JSONObject();
                             try {
                                 js.put("payment", mpPayment);
                                 js.put("payment_methods", mpPaymentMethod);
                             } catch (JSONException e) {
                                 // TODO Auto-generated catch block
                                 e.printStackTrace();
                             }
                             callback.success(js.toString());
                         } else {

                             Gson gson = new Gson();
                             String mpPayment = gson.toJson(payment);
                             String mpPaymentMethod = gson.toJson(paymentMethod);
                             JSONObject js = new JSONObject();
                             try {
                                 js.put("payment", mpPayment);
                                 js.put("payment_methods", mpPaymentMethod);
                             } catch (JSONException e) {
                                 // TODO Auto-generated catch block
                                 // TODO Auto-generated catch block
                                 e.printStackTrace();
                             }
                             callback.success(js.toString());
                         }
                     }

                     @Override
                     public void failure(ApiException apiException) {
                         callback.success(apiException.getError());

                     }
                 });
            } else {
                Toast.makeText(this.cordova.getActivity(), "Invalid payment method", Toast.LENGTH_LONG).show();
            }

            return true;

        } else if (action.equals("getPaymentMethods")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            MercadoPago mercadoPago = new MercadoPago.Builder()
            .setContext(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .build();

            mercadoPago.getPaymentMethods(new Callback<List<PaymentMethod>>() {
                @Override
                public void success(List<PaymentMethod> paymentMethods) {
                    Gson gson = new Gson();
                    String pm = gson.toJson(paymentMethods);
                    callback.success(pm);
                }

                @Override
                public void failure(ApiException error) {
                    callback.success(error.toString());
                }
            });
            return true;
        } else if (action.equals("getIssuers")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            String paymentMethodId = data.getString(1);
            String bin = data.getString(2);

            MercadoPago mercadoPago = new MercadoPago.Builder()
            .setContext(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .build();

            mercadoPago.getIssuers(paymentMethodId, bin, new Callback <List<Issuer>>() {
                @Override
                public void success(List<Issuer> issuers) {
                    Gson gson = new Gson();
                    String issuer = gson.toJson(issuers);
                    callback.success(issuer);
                }

                @Override
                public void failure(ApiException error) {
                    callback.success(error.toString());
                }
            });
            return true;
        } else if (action.equals("getInstallments")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            String paymentMethodId = data.getString(1);
            String bin = data.getString(2);
            Long issuerId = data.getLong(3);

            BigDecimal amount = new BigDecimal(data.getInt(4));

            MercadoPago mercadoPago = new MercadoPago.Builder()
            .setContext(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .build();

            mercadoPago.getInstallments(bin, amount, issuerId, paymentMethodId, new Callback <List<Installment>>() {
                @Override
                public void success(List<Installment> installments) {
                    Gson gson = new Gson();
                    String installment = gson.toJson(installments);
                    callback.success(installment);
                }

                @Override
                public void failure(ApiException error) {
                    callback.success(error.toString());
                }
            });
            return true;
        } else if (action.equals("getIdentificationTypes")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            MercadoPago mercadoPago = new MercadoPago.Builder()
            .setContext(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .build();

            mercadoPago.getIdentificationTypes(new Callback<List<IdentificationType>>() {
                @Override
                public void success(List<IdentificationType> identificationTypes) {
                    Gson gson = new Gson();
                    String identificationType = gson.toJson(identificationTypes);
                    callback.success(identificationType);
                }

                @Override
                public void failure(ApiException error) {
                    callback.success(error.toString());
                }
            });
            return true;
        } else if (action.equals("createToken")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            CardToken cardToken = new CardToken(data.getString(1), data.getInt(2), data.getInt(3), data.getString(4), data.getString(5), data.getString(6), data.getString(7));

            MercadoPago mercadoPago = new MercadoPago.Builder()
            .setContext(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .build();

            mercadoPago.createToken(cardToken, new Callback<Token>() {
                @Override
                public void success(Token token) {
                    Gson gson = new Gson();
                    String mptoken = gson.toJson(token);
                    callback.success(mptoken);
                }

                @Override
                public void failure(ApiException error) {
                    callback.success(error.toString());
                }
            });
            return true;

        } else if (action.equals("getBankDeals")){
            cordova.setActivityResultCallback(this);
            callback = callbackContext;

            MercadoPago mercadoPago = new MercadoPago.Builder()
            .setContext(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .build();

            mercadoPago.getBankDeals(new Callback<List<BankDeal>>() {
                @Override
                public void success(List<BankDeal> bankDeals) {
                    Gson gson = new Gson();
                    String bankDeal = gson.toJson(bankDeals);
                    callback.success(bankDeal);
                }

                @Override
                public void failure(ApiException error) {
                    callback.success(error.toString());
                }
            });
            return true;

        } else if (action.equals("getInstructions")){
            cordova.setActivityResultCallback (this);
            callback = callbackContext;

            Long paymentId = data.getLong(1);
            String paymentTypeId = data.getString(2);

            MercadoPago mercadoPago = new MercadoPago.Builder()
            .setContext(this.cordova.getActivity())
            .setPublicKey(data.getString(0))
            .build();

            mercadoPago.getInstructions(paymentId, paymentTypeId, new Callback<Instruction>() {
                @Override
                public void success(Instruction instruction) {

                    Gson gson = new Gson();
                    String mpinstruction = gson.toJson(instruction);
                    callback.success(mpinstruction);
                }

                @Override
                public void failure(ApiException error) {
                    callback.success(error.toString());
                }
            });
            return true;


        } else {

            return false;

        }
    }
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(requestCode == MercadoPago.PAYMENT_VAULT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                PaymentMethod mppaymentMethod = JsonUtil.getInstance().fromJson(data.getStringExtra("paymentMethod"), PaymentMethod.class);
                Issuer mpissuer = JsonUtil.getInstance().fromJson(data.getStringExtra("issuer"), Issuer.class);
                Token mptoken = JsonUtil.getInstance().fromJson(data.getStringExtra("token"), Token.class);
                PayerCost mppayerCost = JsonUtil.getInstance().fromJson(data.getStringExtra("payerCost"), PayerCost.class);
                Gson gson = new Gson();
                String paymentMethod = gson.toJson(mppaymentMethod);
                String issuer = gson.toJson(mpissuer);
                String token = gson.toJson(mptoken);
                String payerCost = gson.toJson(mppayerCost);
                JSONObject js = new JSONObject();
                try {
                    js.put("payment_method", paymentMethod);
                    js.put("issuer", issuer);
                    js.put("token", token);
                    js.put("payer_cost", payerCost);

                } catch (JSONException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                callback.success(js.toString());
            }
        }  else if(requestCode == MercadoPago.GUESSING_CARD_REQUEST_CODE) {
            if(resultCode == Activity.RESULT_OK) {
                PaymentMethod paymentMethod = JsonUtil.getInstance().fromJson(data.getStringExtra("paymentMethod"), PaymentMethod.class);
                Issuer mpissuer = JsonUtil.getInstance().fromJson(data.getStringExtra("issuer"), Issuer.class);
                Token mptoken = JsonUtil.getInstance().fromJson(data.getStringExtra("token"), Token.class);

                Gson gson = new Gson();
                String pm = gson.toJson(paymentMethod);
                String issuer = gson.toJson(mpissuer);
                String token = gson.toJson(mptoken);

                JSONObject js = new JSONObject();

                try {
                    js.put("payment_method", pm);
                    js.put("issuer", issuer);
                    js.put("token", token);

                } catch (JSONException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }

                callback.success(js.toString());

            }
        } else if (requestCode == MercadoPago.CARD_VAULT_REQUEST_CODE) {
            if(resultCode == Activity.RESULT_OK) {
                PaymentMethod mppaymentMethod = JsonUtil.getInstance().fromJson(data.getStringExtra("paymentMethod"), PaymentMethod.class);
                Issuer mpissuer = JsonUtil.getInstance().fromJson(data.getStringExtra("issuer"), Issuer.class);
                Token mptoken = JsonUtil.getInstance().fromJson(data.getStringExtra("token"), Token.class);
                PayerCost mppayerCost = JsonUtil.getInstance().fromJson(data.getStringExtra("payerCost"), PayerCost.class);


                Gson gson = new Gson();
                String paymentMethod = gson.toJson(mppaymentMethod);
                String issuer = gson.toJson(mpissuer);
                String token = gson.toJson(mptoken);
                String payerCost = gson.toJson(mppayerCost);
                JSONObject js = new JSONObject();
                try {
                    js.put("payment_method", paymentMethod);
                    js.put("issuer", issuer);
                    js.put("token", token);
                    js.put("payer_cost", payerCost);

                } catch (JSONException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                callback.success(js.toString());

            } else {
                if ((data != null) &&
                    (data.getSerializableExtra("mpException") != null)) {
                    MPException exception
                    = (MPException) data.getSerializableExtra("mpException");
                }
            }
        }else if(requestCode == MercadoPago.PAYMENT_METHODS_REQUEST_CODE) {
            if(resultCode == Activity.RESULT_OK) {
                PaymentMethod paymentMethod = JsonUtil.getInstance().fromJson(data.getStringExtra("paymentMethod"), PaymentMethod.class);

                Gson gson = new Gson();
                callback.success(gson.toJson(paymentMethod).toString());
            } else {
                if ((data != null) &&
                    (data.getSerializableExtra("mpException") != null)) {
                    MPException exception
                    = (MPException) data.getSerializableExtra("mpException");
                }
            }
        } else if (requestCode == MercadoPago.ISSUERS_REQUEST_CODE) {
            if(resultCode == Activity.RESULT_OK) {
                Issuer issuer = JsonUtil.getInstance().fromJson(data.getStringExtra("issuer"), Issuer.class);

                Gson gson = new Gson();
                callback.success(gson.toJson(issuer).toString());

            } else {
                if ((data != null) &&
                    (data.getSerializableExtra("mpException") != null)) {
                    MPException exception
                    = (MPException) data.getSerializableExtra("mpException");
                }
            }
        }else if(requestCode == MercadoPago.INSTALLMENTS_REQUEST_CODE) {
            if(resultCode == Activity.RESULT_OK) {
                PayerCost payerCost = JsonUtil.getInstance().fromJson(data.getStringExtra("payerCost"), PayerCost.class);

                Gson gson = new Gson();
                callback.success(gson.toJson(payerCost).toString());
            }
            else {
                if ((data != null) &&
                    (data.getSerializableExtra("mpException") != null)) {
                    MPException mpException = (MPException) data.getSerializableExtra("mpException");
                    callback.success(mpException.getMessage());
                }
            }
        } else if (requestCode == MercadoPago.CHECKOUT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {

                // Listo! El pago ya fue procesado por MP.
                Payment payment = JsonUtil.getInstance().fromJson(data.getStringExtra("payment"), Payment.class);

                if (payment != null) {
                    Gson gson = new Gson();
                    callback.success(gson.toJson(payment).toString());
                } else {
                    callback.success("El usuario no concretó el pago.");
                }

            } else {
                if ((data != null) &&
                    (data.getSerializableExtra("mpException") != null)) {
                    MPException mpException = (MPException) data.getSerializableExtra("mpException");
                    callback.success(mpException.getMessage());
                }
            }
        }

    }
}
