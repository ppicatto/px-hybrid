// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {
                          
                          if(window.cordova && window.cordova.plugins.Keyboard) {
                          
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                          
                          // Don't remove this line unless you know what you are doing. It stops the viewport
                          // from snapping when text inputs are focused. Ionic handles this internally for
                          // a much nicer keyboard experience.
                          cordova.plugins.Keyboard.disableScroll(true);
                          }
                          if(window.StatusBar) {
                          StatusBar.styleDefault();
                          }
                          });
     
     })

.controller('StarterCtrl', function($scope) {

            //Objectos
            
            var payment = "{\"binaryMode\":false,\"captured\":true,\"card\":{},\"collectorId\":\"150216849\",\"couponAmount\":0,\"currencyId\":\"ARS\",\"dateCreated\":\"Aug 10, 2016 2:17:47 PM\",\"dateLastUpdated\":\"Aug 10, 2016 2:17:47 PM\",\"description\":\"HPreferencia\",\"feeDetails\":[],\"id\":1307531,\"installments\":1,\"liveMode\":false,\"metadata\":{},\"operationType\":\"regular_payment\",\"order\":{},\"payer\":{\"email\":\"hdlopezsoca@hotmail.com\",\"identification\":{\"number\":\"29842398\",\"type\":\"DNI\"},\"type\":\"guest\"},\"paymentMethodId\":\"cargavirtual\",\"paymentTypeId\":\"ticket\",\"refunds\":[],\"status\":\"pending\",\"status_detail\":\"pending_waiting_payment\",\"transactionAmount\":2,\"transactionAmountRefunded\":0,\"transactionDetails\":{\"externalResourceUrl\":\"https://sandbox.mercadopago.com/coupon/cargavirtual\",\"installmentAmount\":0,\"netReceivedAmount\":0,\"overpaidAmount\":0,\"paymentMethodReferenceId\":\"1307530\",\"totalPaidAmount\":2}}";
            var paymentOnApproved = "{\"statement_descriptor\":\"MERCADOPAGO\",\"captured\":true,\"fee_details\":[{\"amount\":5.99,\"fee_payer\":\"collector\",\"type\":\"mercadopago_fee\"}],\"date_last_updated\":\"2015-03-11T16:00:05.434-04:00\",\"date_created\":\"2015-03-11T16:00:05.480-04:00\",\"id\":1082629802,\"issuer_id\":3,\"order\":{},\"external_reference\":null,\"description\":null,\"transaction_amount\":100,\"card\":{\"id\":149024476,\"first_six_digits\":\"503175\",\"expiration_month\":4,\"cardholder\":{\"identification\":{\"number\":\"12345678\",\"type\":\"DNI\"},\"name\":\"APRO\"},\"date_last_updated\":null,\"date_created\":null,\"expiration_year\":2089,\"last_four_digits\":\"0604\"},\"transaction_details\":{\"total_paid_amount\":100,\"payment_method_reference_id\":\"545048133_766f737b6d63637c7d7b\",\"net_received_amount\":94.01,\"financial_institution\":null,\"installment_amount\":100,\"ƒexternal_resource_url\":null,\"overpaid_amount\":0},\"coupon_amount\":40,\"call_for_authorize_id\":null,\"metadata\":{},\"currency_id\":\"ARS\",\"collector_id\":177785900,\"status\":\"approved\",\"payment_method_id\":\"visa\",\"status_detail\":\"accredited\",\"binary_mode\":false,\"operation_type\":\"regular_payment\",\"installments\":1,\"money_release_date\":null,\"differential_pricing_id\":null,\"payer\":{\"id\":\"178101336\",\"email\":null,\"identification\":{\"number\":null,\"type\":null},\"type\":\"customer\"},\"notification_url\":null,\"transaction_amount_refunded\":0,\"refunds\":[],\"date_approved\":\"2015-03-11T16:00:05.434-04:00\",\"payment_type_id\":\"credit_card\",\"live_mode\":true}";
            var paymentOnRejected = "{\"id\":1859276,\"date_created\":\"2016-10-20T15:24:24.000-04:00\",\"date_approved\":null,\"date_last_updated\":\"2016-10-20T15:24:24.000-04:00\",\"money_release_date\":null,\"operation_type\":\"regular_payment\",\"issuer_id\":\"310\",\"payment_method_id\":\"visa\",\"payment_type_id\":\"credit_card\",\"status\":\"rejected\",\"status_detail\":\"other_reason\",\"currency_id\":\"ARS\",\"description\":\"Id de Viaje: 140\",\"live_mode\":false,\"sponsor_id\":null,\"authorization_code\":null,\"collector_id\":98781497,\"payer\":{\"type\":\"customer\",\"id\":\"127233032-AvQ8fKbm4RmrXK\",\"email\":\"leonardo.gaston.rossi@gmail.com\",\"identification\":{\"type\":null,\"number\":null},\"phone\":{\"area_code\":\" \",\"number\":\"11 5967-8899\",\"extension\":\"\"},\"first_name\":\"Leonardo\",\"last_name\":\"Rossi\"},\"metadata\":[],\"order\":{},\"external_reference\":null,\"transaction_amount\":123,\"transaction_amount_refunded\":0,\"coupon_amount\":0,\"differential_pricing_id\":null,\"deduction_schema\":null,\"transaction_details\":{\"net_received_amount\":0,\"total_paid_amount\":123,\"overpaid_amount\":0,\"external_resource_url\":null,\"installment_amount\":123,\"financial_institution\":null,\"payment_method_reference_id\":null},\"fee_details\":[],\"captured\":true,\"binary_mode\":false,\"call_for_authorize_id\":null,\"statement_descriptor\":\"WWW.MERCADOPAGO.COM\",\"installments\":1,\"card\":{\"id\":\"1476374869695\",\"first_six_digits\":\"450995\",\"last_four_digits\":\"3704\",\"expiration_month\":12,\"expiration_year\":2060,\"date_created\":\"2016-10-13T12:06:08.000-04:00\",\"date_last_updated\":\"2016-10-13T12:06:21.000-04:00\",\"cardholder\":{\"name\":\"CALLSSSS\",\"identification\":{\"number\":\"44444444\",\"type\":\"DNI\"}}},\"notification_url\":null,\"refunds\":[]}";
            var paymentOnCallForAuth = "{\"statement_descriptor\":\"MERCADOPAGO\",\"captured\":true,\"fee_details\":[{\"amount\":5.99,\"fee_payer\":\"collector\",\"type\":\"mercadopago_fee\"}],\"date_last_updated\":\"2015-03-11T16:00:05.434-04:00\",\"date_created\":\"2015-03-11T16:00:05.480-04:00\",\"id\":1082629802,\"issuer_id\":3,\"order\":{},\"external_reference\":null,\"description\":null,\"transaction_amount\":100,\"card\":{\"id\":149024476,\"first_six_digits\":\"503175\",\"expiration_month\":4,\"cardholder\":{\"identification\":{\"number\":\"12345678\",\"type\":\"DNI\"},\"name\":\"APRO\"},\"date_last_updated\":null,\"date_created\":null,\"expiration_year\":2089,\"last_four_digits\":\"0604\"},\"transaction_details\":{\"total_paid_amount\":100,\"payment_method_reference_id\":\"545048133_766f737b6d63637c7d7b\",\"net_received_amount\":94.01,\"financial_institution\":null,\"installment_amount\":100,\"ƒexternal_resource_url\":null,\"overpaid_amount\":0},\"coupon_amount\":0,\"call_for_authorize_id\":null,\"metadata\":{},\"currency_id\":\"ARS\",\"collector_id\":177785900,\"status\":\"rejected\",\"payment_method_id\":\"visa\",\"status_detail\":\"cc_rejected_call_for_authorize\",\"binary_mode\":false,\"operation_type\":\"regular_payment\",\"installments\":1,\"money_release_date\":null,\"differential_pricing_id\":null,\"payer\":{\"id\":\"178101336\",\"email\":null,\"identification\":{\"number\":null,\"type\":null},\"type\":\"customer\"},\"notification_url\":null,\"transaction_amount_refunded\":0,\"refunds\":[],\"date_approved\":\"2015-03-11T16:00:05.434-04:00\",\"payment_type_id\":\"credit_card\",\"live_mode\":true}";
            var paymentMethod = "{\"accreditation_time\":2880,\"additional_info_needed\":[\"cardholder_name\",\"cardholder_identification_type\",\"cardholder_identification_number\"],\"id\":\"visa\",\"name\":\"Visa\",\"payment_type_id\":\"credit_card\",\"settings\":[{\"bin\":{\"exclusion_pattern\":\"^(487017)\",\"installments_pattern\":\"^4\",\"pattern\":\"^4\"},\"card_number\":{\"length\":16,\"validation\":\"standard\"},\"security_code\":{\"card_location\":\"back\",\"length\":3,\"mode\":\"mandatory\"}}]}";
            var issuer = "{\"id\": \"692\",\"name\": \"Cencosud\",\"secure_thumbnail\": \"https://www.mercadopago.com/org-img/MP3/API/logos/692.gif\",\"thumbnail\": \"http://img.mlstatic.com/org-img/MP3/API/logos/692.gif\"}";
            var token = "{\"public_key\": \"444a9ef5-8a6b-429f-abdf-587639155d88\", \"card_id\": null, \"first_six_digits\": \"444444\", \"luhn_validation\": true, \"date_used\": null, \"status\": \"active\", \"date_due\": \"2016-07-15T14:47:20.194-04:00\", \"live_mode\": true, \"card_number_length\": 16, \"id\": \"7143cb7ddbd65d52d1e3808ef8a455f3\", \"security_code_length\": 3, \"expiration_year\": 2018, \"expiration_month\": 11, \"date_last_updated\": \"2016-07-07T14:47:20.193-04:00\", \"last_four_digits\": \"0008\", \"cardholder\": {\"identification\": {\"number\": \"20123456\", \"type\": \"DNI\"}, \"name\": \"john\"},\"date_created\": \"2016-07-07T14:47:20.193-04:00\"}";
            var payerCost = "{\"installments\": 1, \"installment_rate\": 0, \"discount_rate\": 0, \"labels\": [], \"min_allowed_amount\": 5, \"max_allowed_amount\": 200000, \"recommended_message\": \"1 mensualidad de $ 1,000.00 ($ 1,000.00)\", \"installment_amount\": 1000, \"total_amount\": 1000}";
            var paymentIos = "{\"id\":1202870,\"status_detail\":\"pending_waiting_payment\",\"transaction_amount\":2,\"payment_method_id\":\"rapipago\",\"installments\":1,\"description\":\"HPreferencia\",\"tokenId\":\"\",\"card\":\"\",\"issuerId\":0,\"status\":\"pending\"}";
//            var paymentPreference = "{\"default_installments\":1,\"default_payment_method_id\":null,\"default_payment_type_id\":null,\"excluded_payment_methods\":[{\"accreditation_time\":null,\"additional_info_needed\":null,\"id\":\"master\",\"name\":null,\"payment_type_id\":null,\"settings\":null},{\"accreditation_time\":null,\"additional_info_needed\":null,\"id\":\"amex\",\"name\":null,\"payment_type_id\":null,\"settings\":null}],\"excluded_payment_types\":[{\"id\":\"ticket\"}]";
            var paymentPreference = null;
            var paymentPreferenceIos = "{\"default_installments\":1,\"excluded_payment_types\":[{\"id\":\"ticket\"}],\"installments\":6,\"default_payment_method_id\":null,\"excluded_payment_methods\":[{\"id\":\"amex\"},{\"id\":\"visa\"}]}";
            var exPaymentMethods = ["visa", "amex"];
            var exPaymentType =["ticket"];

            var customer = null;
            
            $scope.toggleChange = function() {
                if ($scope.blackFont == false) {
                    $scope.blackFont = true;
                } else
                    $scope.blackFont = false;
            };
            var cardsResponse = function(message) {
                alert(message);
                if(message == "footerSelected") {
                    MercadoPago.showCardWithoutInstallments(publicKey, "#ffe700", true, "", null, newCardResponse, failure);
                } else {
                    console.log(message);
                }
            };
            
            var newCardResponse = function(message) {
                console.log(message);
            };
            
            var paymentRecoveryResponse = function(message) {
                MercadoPago.showCardWithoutInstallments(publicKey, "#ffe700", true, message, "", newCardResponse, failure);
            };
            
            var connectResponse = function(message) {
                alert(message);
            };

            var saveCustomer = function(message) {
                alert(message);
                customer = message
                $scope.cardAdminFlow()
            };

            var deleteCustomer = function(message) {
                alert(message);
                customer = null
            };

            var failure = function(error) {
                alert("Error calling MercadoPago Plugin " + error);
            };
            
            var publicKey = "TEST-bbc4bfb5-b57b-48cc-9cc5-a3e3d5f1f5e1";
    
            
            var customerResponse = function(customerJson) {
                MercadoPago.startSavedCards(customerJson, "#ffe700", true, "Mis tarjetas", "Agregar tarjeta...", "¿Eliminar tarjeta?", "delete", "", cardsResponse, failure);
            };
            
            // Componente de tarjeta que usa taxiBA, muestra tarjetas guardas, credito y debito sin cuotas
            $scope.startCardSelection = function(){
            
                var site = "ARGENTINA";
                var amount = 250;
                var color = "#ffe701";
                var merchantBaseUrl = "https://www.mercadopago.com";
                var merchantGetCustomerUri = "/checkout/examples/getCustomer";
                var merchantAccessToken = "mla-cards-data";
                var blackFont = true;
                var installmentEnabled = false;
                var paymentRecovery = null;

                MercadoPago.startCardSelection(publicKey, site, amount, merchantBaseUrl, merchantGetCustomerUri, merchantAccessToken, color, blackFont, installmentEnabled, paymentPreference, connectResponse, failure);
            
            }

            $scope.showCardWithInstallments = function(){
                var site = "ARGENTINA";
                var amount = 250;
                var color = "#ffe701";
                var merchantBaseUrl = "https://www.mercadopago.com";
                var merchantGetCustomerUri = "/checkout/examples/getCustomer";
                var merchantAccessToken = "mla-cards-data";
                var blackFont = true;
                var installmentEnabled = true;

                MercadoPago.showCardWithInstallments(publicKey, site, amount, merchantBaseUrl, merchantGetCustomerUri, merchantAccessToken, color, blackFont, installmentEnabled, paymentPreference, connectResponse, failure);
            }

            $scope.showCardWithoutInstallments = function(){
            
                var site = "ARGENTINA";
                var amount = 250;
                var color = "#ffe701";
                var merchantBaseUrl = "https://www.mercadopago.com";
                var merchantGetCustomerUri = "/checkout/examples/getCustomer";
                var merchantAccessToken = "mla-cards-data";
                var blackFont = true;
                var installmentEnabled = true;
                var paymentRecovery = null;

                MercadoPago.showCardWithoutInstallments(publicKey, color, blackFont, paymentRecovery, paymentPreference, connectResponse, failure);
            }

            // Administrador de tarjetas
            $scope.startSavedCards = function(){

            var color = "#ffe701";
            var blackFont = true;
            var installmentEnabled = true;
            var paymentRecovery = null;

            var title = "Tus Tarjetas";
            var footerText = "Agregar ";
            var confirmPromptText = "Seguro que quieres eliminarla?";
            var mode = "sadasd";


            var getCustomer = "\{\"cards\":[{\"expiration_year\":2019,\"issuer\":{\"id\":3,\"name\":\"Mastercard\"},\"last_four_digits\":\"0604\",\"date_created\":null,\"id\":149024476,\"payment_method\":{\"secure_thumbnail\":\"https:\/\/www.mercadopago.com\/org-img\/MP3\/API\/logos\/master.gif\",\"name\":\"Mastercard\",\"thumbnail\":\"http:\/\/img.mlstatic.com\/org-img\/MP3\/API\/logos\/master.gif\",\"payment_type_id\":\"credit_card\",\"accreditation_time\":null,\"additional_info_needed\":\"\",\"financial_institutions\":null,\"status\":null,\"id\":\"master\",\"settings\":null,\"max_allowed_amount\":null,\"min_allowed_amount\":0,\"deferred_capture\":null},\"expiration_month\":11,\"security_code\":{\"mode\":\"\",\"cardLocation\":\"back\",\"length\":3},\"card_holder\":{\"name\":\"APRO\",\"identification\":{\"type\":\"DNI\",\"number\":\"12345678\"}},\"date_last_updated\":null,\"customer_id\":\"178101336\",\"first_six_digits\":\"503175\"}],\"identification\":{\"type\":null,\"number\":null},\"id\":\"178101336\",\"last_name\":null,\"default_card\":null,\"email\":\"test_user_61065665@testuser.com\",\"date_created\":\"2015-02-27\",\"description\":null,\"first_name\":\"test user\"}";

            var customer = "{\"id\": \"220411882-yPNPOGEz85OBRV\", \"email\": \"payer2@email.com\", \"first_name\": \"Jla\", \"last_name\": \"asd\",\"description\": \"description\", \"default_card\": \"180263840\", \"default_address\": null, \"cards\": [{ \"date_last_updated\": \"2016-07-07T13:42:20.448-04:00\",\"date_created\": \"2016-07-07T13:42:20.448-04:00\",\"last_four_digits\": \"5324\",\"id\": \"180263840\", \"first_six_digits\": \"590712\",\"issuer\": {\"id\": 1061, \"name\": \"Otro\"},\"expiration_month\": 10,\"card_number_id\": \"A0F4AFA3E93689A1C9E7DAD0A375B119ECF256AA\",\"cardholder\": {\"identification\": {\"number\": null,\"type\": null},\"name\": null},\"expiration_year\": 2058,\"security_code\": {\"length\": 3,\"card_location\": \"back\",\"mode\": \"mandatory\"},\"payment_method\": {\"id\": \"codensa\",\"thumbnail\": \"http://img.mlstatic.com/org-img/MP3/API/logos/visa.gif\",\"secure_thumbnail\": \"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif\",\"name\": \"Codensa\",\"payment_type_id\": \"credit_card\"},\"customer_id\": \"220411882-yPNPOGEz85OBRV\"},{ \"date_last_updated\": \"2016-07-07T13:42:20.448-04:00\",\"date_created\": \"2016-07-07T13:42:20.448-04:00\",\"last_four_digits\": \"5324\",\"id\": \"180263840\", \"first_six_digits\": \"590712\",\"issuer\": {\"id\": 1061, \"name\": \"Otro\"},\"expiration_month\": 10,\"card_number_id\": \"A0F4AFA3E93689A1C9E7DAD0A375B119ECF256AA\",\"cardholder\": {\"identification\": {\"number\": null,\"type\": null},\"name\": null},\"expiration_year\": 2058,\"security_code\": {\"length\": 3,\"card_location\": \"back\",\"mode\": \"mandatory\"},\"payment_method\": {\"id\": \"visa\",\"thumbnail\": \"http://img.mlstatic.com/org-img/MP3/API/logos/visa.gif\",\"secure_thumbnail\": \"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif\",\"name\": \"Visa\",\"payment_type_id\": \"credit_card\"},\"customer_id\": \"220411882-yPNPOGEz85OBRV\"}],\"metadata\": {},\"live_mode\": true}";
            var custonecard = "{\"id\": \"220411882-yPNPOGEz85OBRV\", \"email\": \"payer2@email.com\", \"first_name\": \"Jla\", \"last_name\": \"asd\",\"description\": \"description\", \"default_card\": \"180263840\", \"default_address\": null, \"cards\": [{ \"date_last_updated\": \"2016-07-07T13:42:20.448-04:00\",\"date_created\": \"2016-07-07T13:42:20.448-04:00\",\"last_four_digits\": \"5324\",\"id\": \"180263840\", \"first_six_digits\": \"590712\",\"issuer\": {\"id\": 1061, \"name\": \"Otro\"},\"expiration_month\": 10,\"card_number_id\": \"A0F4AFA3E93689A1C9E7DAD0A375B119ECF256AA\",\"cardholder\": {\"identification\": {\"number\": null,\"type\": null},\"name\": null},\"expiration_year\": 2058,\"security_code\": {\"length\": 3,\"card_location\": \"back\",\"mode\": \"mandatory\"},\"payment_method\": {\"id\": \"codensa\",\"thumbnail\": \"http://img.mlstatic.com/org-img/MP3/API/logos/visa.gif\",\"secure_thumbnail\": \"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif\",\"name\": \"Codensa\",\"payment_type_id\": \"credit_card\"},\"customer_id\": \"220411882-yPNPOGEz85OBRV\"}],\"metadata\": {},\"live_mode\": true}";


            var cardsPrueba = "{\"cards\":[{}],\"identification\":\"{\"type\":null,\"number\":null}\",\"id\":\"239785138-WRG5Zw4PCf7Whk\",\"last_name\":null,\"default_card\":null,\"email\":\"palazzogcba@gmail.com\",\"date_created\":\"2017-01-09\",\"description\":null,\"first_name\":null}";

            var customerPrueba = "{\"cards\":null,\"identification\":{\"type\":null,\"number\":null},\"id\":\"239785138-ZJ25PFw7cYGu7L\",\"last_name\":null,\"default_card\":null,\"email\":\"palazzogcba@gmail.com\",\"date_created\":\"2017-01-30\",\"description\":null,\"first_name\":null}"

            var customerConTarjetas = "{\"cards\":[{\"expiration_year\":2017,\"issuer\":{\"id\":279,\"name\":\"Banco Galicia\"},\"last_four_digits\":\"6762\",\"date_created\":\"2017-05-23 03:00:00 +0000\",\"id\":210616405,\"payment_method\":{\"secure_thumbnail\":\"https:\/\/www.mercadopago.com\/org-img\/MP3\/API\/logos\/visa.gif\",\"name\":\"Visa\",\"thumbnail\":\"http:\/\/img.mlstatic.com\/org-img\/MP3\/API\/logos\/visa.gif\",\"payment_type_id\":\"credit_card\",\"accreditation_time\":null,\"additional_info_needed\":\"\",\"financial_institutions\":null,\"status\":null,\"id\":\"visa\",\"settings\":null,\"max_allowed_amount\":null,\"min_allowed_amount\":0,\"deferred_capture\":null},\"expiration_month\":6,\"security_code\":{\"mode\":\"\",\"cardLocation\":\"back\",\"length\":3},\"card_holder\":{\"name\":\"IGNACIO OVIEDO\",\"identification\":{\"type\":\"DNI\",\"number\":\"36409502\"}},\"date_last_updated\":\"2017-05-23 03:00:00 +0000\",\"customer_id\":\"242465951-bE6gna32mdkmFG\",\"first_six_digits\":\"454640\"}],\"identification\":{\"type\":null,\"number\":null}\,\"id\":\"242465951-bE6gna32mdkmFG\",\"last_name\":null\,\"default_card\":null\,\"email\":\"ignaciooviedo.gcba@gmail.com\",\"date_created\":\"2017-01-30\",\"description\":null,\"first_name\":null}"


                MercadoPago.startSavedCards(customer, color, blackFont, title, footerText, confirmPromptText, mode, paymentPreference, connectResponse, failure);
            }

            $scope.startSavedCardsSinCards = function(){

                var color = "#ffe701";
                var merchantBaseUrl = "https://www.mercadopago.com";
                var merchantGetCustomerUri = "/checkout/examples/getCustomer";
                var merchantAccessToken = "mla-cards-data";
                var blackFont = true;

                var title = "Tus Tarjetas";
                var footerText = "Agregar ";
                var confirmPromptText = "Seguro que quieres eliminarla?";
                var mode = "sadasd";

                var cardsPrueba = "{\"cards\":[{}],\"identification\":\"{\"type\":null,\"number\":null}\",\"id\":\"239785138-WRG5Zw4PCf7Whk\",\"last_name\":null,\"default_card\":null,\"email\":\"palazzogcba@gmail.com\",\"date_created\":\"2017-01-09\",\"description\":null,\"first_name\":null}";

                var customerPrueba = "{\"cards\":[],\"identification\":{\"type\":null,\"number\":null},\"id\":\"239785138-ZJ25PFw7cYGu7L\",\"last_name\":null,\"default_card\":null,\"email\":\"palazzogcba@gmail.com\",\"date_created\":\"2017-01-30\",\"description\":null,\"first_name\":null}"

                MercadoPago.startSavedCards(customerPrueba, color, blackFont, title, footerText, confirmPromptText, mode, paymentPreference, connectResponse, failure);

            }

            $scope.cardAdminFlow = function(){

                var color = "#ffe701";
                var merchantBaseUrl = "https://api.mercadopago.com";
                var merchantGetCustomerUri = "/v1/customers/261207170-jxqdmty1ClVKjU";
                var merchantAccessToken = "TEST-3284996600758722-031613-bd9e7923837b50bd493d18728eb971f0__LC_LD__-243966003";
                var blackFont = true;

                var title = "Tus Tarjetas";
                var footerText = "Agregar ";
                var confirmPromptText = "Seguro que quieres eliminarla?";
                var mode = "sadasd";

                if (customer == null) {
                    MercadoPago.getCustomer(merchantBaseUrl, merchantGetCustomerUri, merchantAccessToken, saveCustomer, failure);
                } else {
                    MercadoPago.startSavedCards(customer, color, blackFont, title, footerText, confirmPromptText, mode, paymentPreference, deleteCustomer, failure);
                }
            }
            
            $scope.getCustomer = function(){
                var merchantBaseUrl = "https://www.mercadopago.com";
                var merchantGetCustomerUri = "/checkout/examples/getCustomer";
                var merchantAccessToken = "mla-cards-data";
                MercadoPago.getCustomer(merchantBaseUrl, merchantGetCustomerUri, merchantAccessToken, connectResponse , failure);
            }

            $scope.showPaymentResultApproved = function(){

                var taxiBAPayment = "{\"id\":2776824281,\"date_created\":\"2017-06-06T14:40:19.000-04:00\",\"date_approved\":\"2017-06-06T14:40:21.000-04:00\",\"date_last_updated\":\"2017-06-06T14:40:21.000-04:00\",\"money_release_date\":\"2017-06-20T14:40:21.000-04:00\",\"operation_type\":\"regular_payment\",\"issuer_id\":\"279\",\"payment_method_id\":\"visa\",\"payment_type_id\":\"credit_card\",\"status\":\"approved\",\"status_detail\":\"accredited\",\"currency_id\":\"ARS\",\"description\":\"ZZZ999 - CONDUCTOR 03, PEPE\",\"live_mode\":true,\"sponsor_id\":null,\"authorization_code\":\"005354\",\"collector_id\":136865589,\"payer\":{\"type\":\"customer\",\"id\":\"242465951-bE6gna32mdkmFG\",\"email\":\"ignaciooviedo.gcba@gmail.com\",\"identification\":{\"type\":null,\"number\":null},\"phone\":{\"area_code\":null,\"number\":null,\"extension\":\"\"},\"first_name\":\"\",\"last_name\":\"ignaciooviedo.gcba\",\"entity_type\":null},\"metadata\":[],\"additional_info\":[],\"order\":{},\"external_reference\":\"1000013\",\"transaction_amount\":10,\"transaction_amount_refunded\":0,\"coupon_amount\":0,\"differential_pricing_id\":null,\"deduction_schema\":null,\"transaction_details\":{\"net_received_amount\":9.43,\"total_paid_amount\":10,\"overpaid_amount\":0,\"external_resource_url\":null,\"installment_amount\":10,\"financial_institution\":null,\"payment_method_reference_id\":null},\"fee_details\":[{\"type\":\"mercadopago_fee\",\"amount\":0.57,\"fee_payer\":\"collector\"}],\"captured\":true,\"binary_mode\":true,\"call_for_authorize_id\":null,\"statement_descriptor\":\"WWW.MERCADOPAGO.COM\",\"installments\":1,\"card\":{\"id\":\"210616405\",\"first_six_digits\":\"454640\",\"last_four_digits\":\"6762\",\"expiration_month\":6,\"expiration_year\":2017,\"date_created\":\"2017-05-23T13:45:42.000-04:00\",\"date_last_updated\":\"2017-05-23T17:48:41.000-04:00\",\"cardholder\":{\"name\":\"IGNACIO OVIEDO\",\"identification\":{\"number\":\"36409502\",\"type\":\"DNI\"}}},\"notification_url\":null,\"refunds\":[],\"processing_mode\":null,\"merchant_account_id\":null,\"acquirer\":null,\"merchant_number\":null}";

                var json = JSON.parse(taxiBAPayment);

                MercadoPago.showPaymentResult(publicKey, JSON.stringify(json), paymentMethod, connectResponse, failure);
            }

            $scope.showPaymentResultRejected = function(){

                var taxiBAPayment = "{\"id\":2776824281,\"date_created\":\"2017-06-06T14:40:19.000-04:00\",\"date_approved\":\"2017-06-06T14:40:21.000-04:00\",\"date_last_updated\":\"2017-06-06T14:40:21.000-04:00\",\"money_release_date\":\"2017-06-20T14:40:21.000-04:00\",\"operation_type\":\"regular_payment\",\"issuer_id\":\"279\",\"payment_method_id\":\"visa\",\"payment_type_id\":\"credit_card\",\"status\":\"rejected\",\"status_detail\":\"cc_rejected_other_reason\",\"currency_id\":\"ARS\",\"description\":\"ZZZ999 - CONDUCTOR 03, PEPE\",\"live_mode\":true,\"sponsor_id\":null,\"authorization_code\":\"005354\",\"collector_id\":136865589,\"payer\":{\"type\":\"customer\",\"id\":\"242465951-bE6gna32mdkmFG\",\"email\":\"ignaciooviedo.gcba@gmail.com\",\"identification\":{\"type\":null,\"number\":null},\"phone\":{\"area_code\":null,\"number\":null,\"extension\":\"\"},\"first_name\":\"\",\"last_name\":\"ignaciooviedo.gcba\",\"entity_type\":null},\"metadata\":[],\"additional_info\":[],\"order\":{},\"external_reference\":\"1000013\",\"transaction_amount\":10,\"transaction_amount_refunded\":0,\"coupon_amount\":0,\"differential_pricing_id\":null,\"deduction_schema\":null,\"transaction_details\":{\"net_received_amount\":9.43,\"total_paid_amount\":10,\"overpaid_amount\":0,\"external_resource_url\":null,\"installment_amount\":10,\"financial_institution\":null,\"payment_method_reference_id\":null},\"fee_details\":[{\"type\":\"mercadopago_fee\",\"amount\":0.57,\"fee_payer\":\"collector\"}],\"captured\":true,\"binary_mode\":true,\"call_for_authorize_id\":null,\"statement_descriptor\":\"WWW.MERCADOPAGO.COM\",\"installments\":1,\"card\":{\"id\":\"210616405\",\"first_six_digits\":\"454640\",\"last_four_digits\":\"6762\",\"expiration_month\":6,\"expiration_year\":2017,\"date_created\":\"2017-05-23T13:45:42.000-04:00\",\"date_last_updated\":\"2017-05-23T17:48:41.000-04:00\",\"cardholder\":{\"name\":\"IGNACIO OVIEDO\",\"identification\":{\"number\":\"36409502\",\"type\":\"DNI\"}}},\"notification_url\":null,\"refunds\":[],\"processing_mode\":null,\"merchant_account_id\":null,\"acquirer\":null,\"merchant_number\":null}";

                var json = JSON.parse(taxiBAPayment);

                MercadoPago.showPaymentResult(publicKey, JSON.stringify(json), paymentMethod, connectResponse, failure);
            }

            
            $scope.paymentRecovery = function(){
                MercadoPago.createPaymentRecovery(paymentOnRejected, token, paymentMethod, issuer, payerCost, paymentRecoveryResponse, failure);
            }
            
            $scope.startConnect = function(){
                MercadoPago.startMercadoPagoConnect("3339632528347950", "https://mpconnect-wrapper.herokuapp.com", "checkout/get_credentials", "", "https://www.mercadopago.com.ar", connectResponse, failure);
            }
            });
