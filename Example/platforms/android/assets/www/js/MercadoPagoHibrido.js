// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mercadopago', ['ionic', 'mercadopago.services','mercadopago.controllers','ngResource' ])

.run(function($ionicPlatform, $rootScope, MercadoPagoService, $ionicLoading) {
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
    if(window.StatusBar)
      StatusBar.styleDefault();

    // Saber plataforma para tracking
    $rootScope.platform=ionic.Platform.platform();

    //Agrego css
    var MpCss = document.createElement('style');
    MpCss.type = 'text/css';
    MpCss.innerHTML = '.custom-icon {/*font-size: 64px;*/color : rgb(29,159,222);} .MpBarra{color:red!default;background-color:rgb(29,159,222)!important;border-style: none!important;}.carrito{color:white;font-size: 26px;font-weight: bold;}.texto{font-size: 12pt;text-align: center;color:rgb(153,153,153);}.link{color:rgb(0,102,204);}.flecha{color:rgb(153,153,153);}.amarillo{color:rgb(178,144,84);}.pesos{font-size: 30pt;font-weight: bold;text-align: center; }.tic{font-size: 50px;font-weight: bold;text-align: center;}.header{font-size:13pt !important;font-weight: 200 !important;color:white!important;word-wrap:break-word!important}.opciones{font-size:12pt!important;color:rgb(102,102,102)!important;}.footer{font-size:11pt;color:rgb(153,153,153)!important;text-align: center;}.copy{font-size:9pt;color:rgb(153,153,153)!important;text-align: center;}.pagar{font-size: 15pt!important;text-align: center!important;font-weight: 200!important;}.textoinstru{font-size: 16pt!important;font-weight: 200!important;color:rgb(102,102,102)!important;}';
    document.getElementsByTagName('head')[0].appendChild(MpCss);

    //Agrego Js de Google Analytics
    // var GoogleAnalyticsJs = document.createElement('script');
    // GoogleAnalyticsJs.type = "text/javascript";
    // GoogleAnalyticsJs.innerHTML = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-46085787-6', 'auto');ga('send', 'pageview');";
    // document.getElementsByTagName('head')[0].appendChild(GoogleAnalyticsJs);

    $rootScope.MpPrefIdVisible = false;
    $rootScope.MpShowBack = true;
    $rootScope.MpCheckoutInfo = [];
    $rootScope.index = 0;

    $rootScope.MpShowPrefId = function() {
      if ($rootScope.MpPrefIdVisible === true){
          $rootScope.MpPrefIdVisible = false;
      } else {
          $rootScope.MpPrefIdVisible = true;
      }
    };
  });
})

.config(function($stateProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
  $ionicConfigProvider.navBar.alignTitle('center'); //Alinear header en android

  var MpPaymentMethodSearch = {
    name: 'MercadoPago_PaymentMethodSearch',
    url: '/mercadopago',
    cache: false,
    params: {
      flavour: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpPaymentMethodSearchCtrl'};

  var MpPaymentMethodSearch2 = {
    name: 'MercadoPago_PaymentMethodSearch2',
    url: '/mercadopago',
    cache: false,
    params: {
      flavour: {},
      paymentMethod: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpPaymentMethodSearch2Ctrl'};

  var MpCheckout = {
    name: 'MercadoPago_Checkout',
    url: '/mercadopago',
    cache: false,
    params: {
      flavour: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCheckoutCtrl'};

  var MpInstructions = {
    name: 'MercadoPago_Instructions',
    url: '/mercadopago',
    cache: false,
    params: {
      flavour: {},
      instructionInfo: {},
      paymentInfo: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpInstructionsCtrl'};

  var MpCongrats = {
    name: 'MercadoPago_Congrats',
    url: '/mercadopago',
    cache: false,
    params: {
      flavour: {},
      paymentInfo: {},

    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCongratsCtrl'};

  var MpCardForm = {
    name: 'MercadoPago_CardForm',
    url: '/mercadopago',
    cache: false,
    params: {
      flavour: {},
      installments: {},
      paymentMethod: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCardFormCtrl'};

  var MpCardIssuers = {
    name: 'MercadoPago_CardIssuers',
    url: '/mercadopago',
    params: {
      flavour: {},
      paymentMethod: {},
      installments: {},
      token: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpCardIssuersCtrl'};

  var MpInstallments = {
    name: 'MercadoPago_Installments',
    url: '/mercadopago',
    params: {
      flavour: {},
      paymentMethod: {},
      cardIssuer: {},
      total: {},
      token: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpInstallmentsCtrl'};

  var MpPaymentMethod = {
    name: 'MercadoPago_PaymentMethod',
    url: '/mercadopago',
    params: {
      flavour: {},
    },
    templateUrl: 'mercadopago.html',
    controller: 'MpPaymentMethodCtrl'};

  $stateProvider
    .state(MpCardForm)
    .state(MpPaymentMethodSearch)
    .state(MpPaymentMethodSearch2)
    .state(MpCheckout)
    .state(MpInstructions)
    .state(MpCongrats)
    .state(MpInstallments)
    .state(MpCardIssuers)
    .state(MpPaymentMethod);

});
angular.module('mercadopago.services', [])
.factory('MercadoPagoService', function ($resource, $state, $ionicHistory, $rootScope, $ionicLoading, $q, $timeout) {
  var public_key, call, prefid, flavour, access_token;
  var errorNum = 0;
  var baseUrl = "https://api.mercadopago.com/";
  var version = "v1/";

  var getPaymentMethodSearch = function () {
    return $resource(baseUrl + version + "checkout/payment_methods/search/options?public_key="+public_key, {}, {
    get: {
        method: 'GET',
        timeout: 10800,
    }});
  };

  var getPaymentMethods = function () {
    return $resource(baseUrl + version + "payment_methods?public_key="+public_key, {}, {
    get: {
        method: 'GET',
        timeout: 10000,
        isArray:true,
    }});
  };

  var getIdentificationTypes = function () {
    return $resource(baseUrl + version + "identification_types?public_key="+public_key, {}, {
    get: {
        method: 'GET',
        timeout: 10000,
        isArray: true
    }});
  };

  var getIssuers = function (payment_method_id, bin) {
    return $resource(baseUrl + version + "payment_methods/card_issuers?public_key="+public_key+"&payment_method_id="+payment_method_id+"&bin="+bin,{}, {
    get: {
        method: 'GET',
        timeout: 10000,
        isArray: true
    }});
  };

  var getInstallments = function (payment_method_id, issuer_id, amount) {
    return $resource(baseUrl + version + "payment_methods/installments?public_key="+public_key+"&payment_method_id=:pmid&issuer.id=:issuer&amount=:ammount",{ pmid: payment_method_id,ammount:amount,issuer:issuer_id},{
    get: {
        method: 'GET',
        timeout: 10000,
        isArray: true
    }});
  };

  var getBankDeals = function () {
    return $resource(baseUrl + version + "payment_methods/deals?public_key="+public_key, {}, {
    get: {
        method: 'GET',
        timeout: 10000,
        isArray: true
    }});
  };

  var getInstructions = function (payment_id, payment_type) {
    return $resource(baseUrl + version + "checkout/payments/"+payment_id+"/results?public_key="+public_key+"&payment_type="+payment_type, {}, {
    get: {
        method: 'GET',
        timeout: 8100,
    }});
  };

  var getPublicKey = function () {
    return public_key;
  };

  var getPrefId = function () {
    return $resource(baseUrl + version + "checkout/preferences/"+prefid+"?public_key="+public_key, {}, {
    get: {
        method: 'GET',
        timeout: 5800,
    }});
  };

  var createToken = function (data) {
    return $resource(baseUrl + version + "card_tokens?public_key="+public_key,data, {
    save: {
        method: 'POST',
        timeout: 5000,
        cache: false,
    }});
  };

  var postPayment = function (data) {
    return $resource(baseUrl + version + "checkout/payments",data, {
    save: {
        method: 'POST',
        timeout: 10000,
        cache: false,
        headers: {'X-Idempotency-Key': getUUID(),'Content-Type':'application/json; charset=UTF-8'},
    }});
  };

  var createPayment = function (base_url, payment_uri, data) {
    return $resource(base_url+payment_uri,data);
  };

  var createPrefId = function (base_url, prefid_uri, data) {
    return $resource(base_url+prefid_uri,data);
  };

  var trackingOn = function (data) {
    return $resource(baseUrl + version + "checkout/tracking",data, {
    save: {
        method: 'POST',
        timeout: 5000,
    }});
  };

  var trackingOff = function (data) {
    return $resource(baseUrl + version + "checkout/tracking/off",data, {
    save: {
        method: 'POST',
        timeout: 5000,
    }});
  };

  var setPublicKey = function (publicKey) {
    public_key = publicKey;
  };

  var setPrefId = function (prefId) {
    prefid = prefId;
  };

  var setAccessToken = function (accessToken) {
    access_token = accessToken;
  };

  var startCheckout = function (callback) {
    $rootScope.index = $ionicHistory.currentView().index;
    var checkout = function (){
    $ionicLoading.show({template: 'Cargando...'});
    call = callback;
    var promise = getPaymentMethodsPrefId();

    promise.then(function (response){
      errorNum = 0;
      $ionicLoading.hide();
      $rootScope.selectedPaymentMethod = undefined;
      $rootScope.MpCheckoutInfo = [];

      $state.go('MercadoPago_Checkout',
      {
       "flavour":3,
      });

    }, function (error) {
      console.log(error);
      if (error.status == -1) {
          if (errorNum < 3){
            errorNum++;
            checkout();
        } else {
            alert("Intente devuelta");
            errorNum = 0;
            $ionicLoading.hide();
        }
      }
    });
    };
    checkout();
  };

  var startRyc = function (callback, paymentMethod) {
    $ionicLoading.show({template: 'Cargando...'});
    call = callback;
    var promise = getPaymentMethodsPrefId();

    promise.then(function () {
      errorNum = 0;
      $ionicLoading.hide();
      $rootScope.selectedPaymentMethod = paymentMethod;

        $state.go('MercadoPago_Checkout',
        {
          "flavour":1,
        });

    }, function (error) {
      console.log(error);

      if (error.status == -1) {
          if (errorNum < 3) {
              errorNum++;
              startRyc(callback,paymentMethod);
          } else {
              $ionicLoading.hide();
              alert("Intente devuelta");
              errorNum = 0;
          }
      }
    });
  };

  var startGrupos = function (callback) {
    $ionicLoading.show({template: 'Cargando...'});
    call = callback;

    var promise = getPaymentMethodsPrefId();
    promise.then(function () {
      errorNum = 0;
      $ionicLoading.hide();

      $state.go('MercadoPago_PaymentMethodSearch', {
          "flavour":1
      });

    }, function (error) {
      console.log(error);
      if (error.status == -1) {
          if (errorNum < 3) {
              errorNum++;
              startGrupos();
          } else {
              alert("Intente devuelta");
              errorNum = 0;
              $ionicLoading.hide();
          }
      }
    });
  };

  var startPaymentVault = function (callback) {
    $ionicLoading.show({template: 'Cargando...'});
    call = callback;

    var promise = getPaymentMethodsPrefId();
    promise.then(function () {
      errorNum = 0;
      $ionicLoading.hide();
      //$rootScope.selectedPaymentMethod = 2;

      $state.go('MercadoPago_PaymentMethodSearch',
      {
       "flavour": 2,
      });

    }, function (error) {
      console.log(error);
      if (error.status == -1) {
          if (errorNum < 3) {
              errorNum++;
              startPaymentVault();
          } else {
              alert("Intente devuelta");
              errorNum = 0;
              $ionicLoading.hide();
          }
      }
    });
  };

  var startInstructions = function (callback, paymentInfo, flavour) {
    call = callback;
    getInstructions(paymentInfo.id, paymentInfo.payment_type_id).get(function (response){
      $ionicLoading.hide();
      errorNum = 0;
      console.log(response);

      $state.go('MercadoPago_Instructions',
      {
         "flavour": flavour,
         "paymentInfo": paymentInfo,
         "instructionInfo": response
       });

    },function (error) {
      console.log(error);
      if (error.status == -1) {
          if (errorNum < 3){
              errorNum++;
              startInstructions(callback,paymentInfo,flavour);
        } else {
              alert("Intente devuelta");
              errorNum = 0;
              $ionicLoading.hide();
        }
      }
    });
  };

  var startCongrats = function (callback, paymentInfo, flavour) {
        $ionicLoading.hide();
        call = callback;
        $state.go('MercadoPago_Congrats',
        {
         "flavour": flavour,
         "paymentInfo": paymentInfo,
       });
  };
  var startCardWithInstallments = function (callback, selectedPaymentMethod) {
        call = callback;
        var promise = getPaymentMethodsPrefId();
        promise.then(function () {
          errorNum = 0;
          $ionicLoading.hide();

          $state.go('MercadoPago_CardForm',
          {
            "paymentMethod": selectedPaymentMethod,
            "installments": true,
            "flavour": 2,
          });

        }, function (error) {
          console.log(error);
          if (error.status == -1) {
              if (errorNum < 3) {
                  errorNum++;
                  startCardWithInstallments();
              } else {
                  alert("Intente devuelta");
                  errorNum = 0;
                  $ionicLoading.hide();
              }
          }
        });
  };
  var startCardWithoutInstallments = function (callback, selectedPaymentMethod) {
        call = callback;
        var promise = getPaymentMethodsPrefId();
        promise.then(function () {
          errorNum = 0;
          $ionicLoading.hide();

          $state.go('MercadoPago_CardForm',
          {
            "paymentMethod": selectedPaymentMethod,
            "installments": false,
            "flavour": 2,
          });

        }, function (error) {
          console.log(error);
          if (error.status == -1) {
              if (errorNum < 3) {
                  errorNum++;
                  startCardWithoutInstallments();
              } else {
                  alert("Intente devuelta");
                  errorNum = 0;
                  $ionicLoading.hide();
              }
          }
        });
  };
  var startIssuers = function (callback, paymentMethod, bin) {
      call = callback;
      $state.go('MercadoPago_CardIssuers',
      {
        'paymentMethod': paymentMethod,
        'token': bin,
        'installments': false,
        "flavour": 1,
      });
  };
  var startInstallments = function (callback, paymentMethod, cardIssuer, bin, total) {
      call = callback;
      $state.go('MercadoPago_Installments',
        {
           "cardIssuer": cardIssuer,
           "paymentMethod": paymentMethod,
           "token": bin,
           "total": total,
           "flavour": 1,
        });
  };
  var startPaymentMethod = function (callback) {
      call = callback;
      $state.go('MercadoPago_PaymentMethod',
        {
           "flavour": 1,
        });
  };

  var goBack = function (flavour, MpResponse, seguir) {
    $rootScope.selectedPaymentMethod=undefined;
    if (flavour == 3 && seguir === true) {
        $ionicLoading.show({template: 'Cargando...'});

        if (MpResponse[0] === undefined) { //medio off
            var paymentMethod = MpResponse[1].id;

            if (MpResponse[1].id == "redlink_bank_transfer" || MpResponse[1].id == "redlink_atm") {
                paymentMethod="redlink";
            }
            postPayment().save({
              "public_key": public_key,
              "payment_method_id": paymentMethod,
              "pref_id": prefid,
              "email": "test-email@email.com"}, function(data){
                if (MpResponse[1].id == "redlink_bank_transfer") {
                  data.payment_type_id = "bank_transfer";
                }
                console.log(data);
                startInstructions(call, data, 3);

                trackingOff().save({
                  "public_key": getPublicKey(),
                  "payment_id": data.id,
                  "sdk_flavor": flavour,
                  "sdk_platform": $rootScope.platform,
                  "sdk_type": "hybrid",
                  "sdk_framework": "ionic",
                  "sdk_version": "1.0"
                },function (response) {
                  console.log("tracking",response);
                },function (error) {
                  console.log(error);
                });


            }, function (error) {
                $ionicLoading.hide();
                if (error.status == 400) {
                    console.log(error.data.message);
                    alert(error.data.message);
                } else {
                    console.log(error);
                    alert("Intente nuevamente");
                }
            });
        } else {
            postPayment().save({ //online
              "public_key": public_key,
              "payment_method_id": MpResponse[1].id,
              "pref_id": prefid,
              "email": "test-email@email.com",
              "token": MpResponse[0].id,
              "issuer_id": MpResponse[2].id,
              "installments": MpResponse[3]}, function(payment) {
                  console.log(payment);
                  startCongrats(call, payment, 3);

              }, function (error){
                $ionicLoading.hide();
                if (error.status == 400) {
                    console.log(error.data.message);
                    alert(error.data.message);
                } else {
                    console.log(error);
                    alert("Intente nuevamente");
                }
            });
        }
    } else {

        $ionicHistory.goBack(-1*($ionicHistory.currentView().index)+$rootScope.index);
        if (call !== null && typeof call === "function"){
            call(MpResponse);
        }
    }
  };

  var getPaymentMethodsPrefId = function () {
    var deferred = $q.defer();
    getPrefId().get(function (pref){
      getPaymentMethodSearch().get(function (dato){
        $rootScope.datos = dato;
        $rootScope.prefid = pref;
        deferred.resolve(dato);
      },function (error) {
        deferred.reject(error);
      });
    },function (error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

  var getTotal = function (prefid) {
    var price = 0;
    for (i = 0; i < prefid.items.length; i++){
        price+= prefid.items[i].unit_price;
    }
    return price;
  };

  var getUUID= function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
  };

  return {
      getPaymentMethodSearch: getPaymentMethodSearch,
      getPaymentMethods: getPaymentMethods,
      getIdentificationTypes: getIdentificationTypes,
      getIssuers: getIssuers,
      getInstallments: getInstallments,
      getBankDeals: getBankDeals,
      setPublicKey: setPublicKey,
      setPrefId: setPrefId,
      setAccessToken: setAccessToken,
      getPublicKey: getPublicKey,
      postPayment: postPayment,
      getInstructions: getInstructions,
      getPrefId: getPrefId,
      startInstructions: startInstructions,
      createToken: createToken,
      createPayment: createPayment,
      createPrefId: createPrefId,
      trackingOn: trackingOn,
      trackingOff: trackingOff,
      getTotal: getTotal,
      startCheckout: startCheckout,
      startPaymentVault: startPaymentVault,
      startCardWithInstallments: startCardWithInstallments,
      startCardWithoutInstallments: startCardWithoutInstallments,
      startIssuers: startIssuers,
      startInstallments: startInstallments,
      startPaymentMethod: startPaymentMethod,
      startGrupos: startGrupos,
      startRyc: startRyc,
      goBack: goBack,
  };
});

angular.module('mercadopago.controllers', [])

.controller('MpPaymentMethodSearchCtrl', function ($scope, MercadoPagoService, $state, $stateParams, $rootScope, $ionicHistory, $ionicLoading){

  $scope.HTML= "<ion-content class='has-header' style='background-color:rgb(244,244,244)'><div ng-show='MpPrefIdVisible==true'class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{prefIdTitle}}<img ng-src='{{prefIdImage}}'><br>{{prefIdTotal | currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px'><div  id= 'l'class='item item-icon-left item-icon-right opciones' ng-repeat='grupo in paymentMethods' ng-click='selectedPaymentMethod(grupo); $event.stopPropagation();'><i class=' icon {{grupo.icon}} custom-icon'></i>{{grupo.description}}<i class='icon ion-ios-arrow-right flecha'></i></div></div><br><footer></footer></ion-content>";
  $scope.header= "¿Comó quieres pagar?";

  $scope.prefIdTitle = $rootScope.prefid.items[0].title;
  $scope.prefIdImage = $rootScope.prefid.items[0].picture_url;
  $scope.prefIdTotal = MercadoPagoService.getTotal($rootScope.prefid);

  $rootScope.MpShowBack = true; //mostrar la flecha de atras

  $rootScope.datos.groups[0].icon = "ion-card "; //Agrego iconos
  $rootScope.datos.groups[1].icon = "ion-cash ";
  $rootScope.datos.groups[2].icon = "ion-ios-locked ";

  $scope.paymentMethods = $rootScope.datos.groups;

  $rootScope.$ionicGoBack = function () {
    if ($rootScope.selectedPaymentMethod == undefined && $state.current.name == 'MercadoPago_PaymentMethodSearch'){
        $ionicHistory.goBack(-2);
    } else {
        $ionicHistory.goBack(-1);
    }
  };

  $scope.exit = function () {
    MercadoPagoService.goBack($stateParams.flavour, "cancel"); //cancelar y salir
  };

  $scope.selectedPaymentMethod = function (selectedPaymentMethod) {

    if (selectedPaymentMethod.children == null) {
        if ($stateParams.flavour == 1){
            MercadoPagoService.goBack($stateParams.flavour, selectedPaymentMethod); //devuelvo el resultado sino hay childs y f2 gris
      } else if (selectedPaymentMethod.id == "credit_card") {
            $state.go('MercadoPago_CardForm',
            {
              "paymentMethod": selectedPaymentMethod,
              "installments": true,
              "flavour": $stateParams.flavour,});
            }
    }else {
        $state.go('MercadoPago_PaymentMethodSearch2',
        {
          "paymentMethod": selectedPaymentMethod,
          "flavour": $stateParams.flavour,
        });
    }
  };
})

.controller('MpPaymentMethodSearch2Ctrl', function ($scope, MercadoPagoService, $state, $stateParams, $ionicHistory, $rootScope){

  $scope.HTML = "<ion-content class='has-header'style='background-color:rgb(244,244,244)'><div ng-show='MpPrefIdVisible==true'class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{prefIdTitle}}<img ng-src='{{prefIdImage}}'><br>{{prefIdTotal| currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px'><div  id= 'l'class='item item-icon-right' ng-repeat='grupo in paymentMethods' ng-click='selectedPaymentMethod(grupo); $event.stopPropagation();' style='padding: 10px'><div style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px' class='opciones' ><img id= 'im' ng-src='{{getImage(grupo)}}' style='padding: 0px 10px 0px 0px'>{{grupo.description}}</div><br><div class='footer' style='text-align: left'>{{grupo.comment}} </div><i class='icon ion-ios-arrow-right flecha'></i></div></div><footer></footer></ion-content>";
  $scope.header = $stateParams.paymentMethod.children_header;

  $scope.prefIdTitle = $rootScope.prefid.items[0].title; //preferencia
  $scope.prefIdImage = $rootScope.prefid.items[0].picture_url;
  $scope.prefIdTotal = MercadoPagoService.getTotal($rootScope.prefid);

  $scope.paymentMethods = $stateParams.paymentMethod.children; //agarro las paymentMethodes

  $scope.getImage = function (paymentMethod) { //buscar imagenes de los pm
    var paymentMethodId = paymentMethod.id;
    if (paymentMethod.show_icon == true) {
        if (paymentMethodId == "redlink_bank_transfer" || paymentMethodId == "redlink_atm"){
            paymentMethodId = "redlink";
        }
        for (i = 0; i < $rootScope.datos.payment_methods.length; i++) {
            if ($rootScope.datos.payment_methods[i].id == paymentMethodId) {
                paymentMethod.thumbnail = $rootScope.datos.payment_methods[i].thumbnail;
                return $rootScope.datos.payment_methods[i].thumbnail;
            }
        }
    }
  };

  $scope.exit = function () { //cancelar
    MercadoPagoService.goBack($stateParams.flavour,"cancel");
  };

  $scope.selectedPaymentMethod = function (selectedPaymentMethod) {
    if ($stateParams.flavour == 1){
        MercadoPagoService.goBack($stateParams.flavour, selectedPaymentMethod); //volver si es f2 gris
    } else if ($stateParams.flavour == 2) { //datos de f2
        var MpResponse = [];
        MpResponse.push($scope.token);
        MpResponse.push(selectedPaymentMethod);
        MpResponse.push($scope.cardIssuer);
        MpResponse.push($scope.installments);
        MercadoPagoService.goBack($stateParams.flavour, MpResponse);
    }
    else {
        $rootScope.selectedPaymentMethod = selectedPaymentMethod; //si es f3 vuelvo a ryc
        $rootScope.MpCheckoutInfo[0] = undefined;
        $ionicHistory.goBack(-1*($ionicHistory.currentView().index-1+$rootScope.index));
    }
  };
})

.controller('MpCheckoutCtrl', function ($scope, MercadoPagoService, $state, $stateParams, $ionicHistory, $rootScope) {

  $scope.HTML = "<ion-content class='has-header' style='background-color:rgb(244,244,244)'><div class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{prefIdTitle}}<img ng-src='{{prefIdImage}}'><br>{{prefIdTotal | currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px;border-bottom: none'><div  id= 'l'class='item item-icon-right' ng-click='goBack(); $event.stopPropagation();' style='padding: 10px;border: none'><div style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px' class='opciones'><img id= 'im' ng-src='{{getImage(selectedPaymentMethod)}}' style='padding: 0px 10px 0px 0px'>{{selectedPaymentMethod.description}}</div><br><div class='footer' style='text-align: left'>{{selectedPaymentMethod.comment}} </div><i class='icon ion-ios-arrow-right flecha'></i></div><div  id= 'l'class='item item-icon-right' ng-if='paymentOn==true' style='padding: 10px;'><div class='opciones'style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px;font-weight: 200; text-align: left;color:rgb(0,159,222)!important'>{{installments}}<i class='texto' style='color:rgb(67,176,0);text-align: left;'ng-show='installmentRate'>Sin intereses</i></div><br><div class='footer' style='text-align: left'> </div></div></div><div class='opciones'style='height: 40pt;background-color:rgb(244,244,244);vertical-align: middle; font-size: 16pt;line-height: 40pt; border-bottom: 2pt;border-bottom-color: rgb( 222,222,222);  border-style:solid; text-align: center;font-weight: 200;word-spacing-spacing: 1.5px'>Total a pagar: {{total| currency}}</div><br><div class='copy' style='padding: 0px 20px'><p>    Al pagar, afirmo que soy mayor de edad y acepto los <a class='link'>Términos y Condiciones</a> de MercadoPago.</p></div><div style='padding: 0px 10px 0px 10px'><button class='button button-block button-positive pagar' style='background-color:rgb(0,159,222)' ng-click='pay(); $event.stopPropagation();'>Pagar</button></div><footer></footer></ion-content>";
  $scope.header = "Revisa si está todo bien…";

  $rootScope.MpShowBack = false; //no mostrar flecha atras
  $scope.paymentOn = false; //si es pago on
  $scope.installmentRate = false;

  $scope.selectedPaymentMethod = $rootScope.selectedPaymentMethod; //muestro la paymentMethod elegida

  $scope.prefIdTitle = $rootScope.prefid.items[0].title; //muestro la compra
  $scope.prefIdImage = $rootScope.prefid.items[0].picture_url;
  $scope.prefIdTotal = MercadoPagoService.getTotal($rootScope.prefid);

  if ($scope.selectedPaymentMethod != undefined && $rootScope.MpCheckoutInfo[0] != undefined) { //seteo si es un pago on
      $scope.installments = $rootScope.MpCheckoutInfo[4].installments + " cuotas de $" + $rootScope.MpCheckoutInfo[4].installment_amount + " ";
      $scope.selectedPaymentMethod.description = "terminada en " + $rootScope.MpCheckoutInfo[0].last_four_digits;
      $scope.paymentOn = true;
      if ($rootScope.MpCheckoutInfo[4].installment_rate == 0) {
          $scope.installmentRate=true;
      }
  }

  if ($rootScope.selectedPaymentMethod == undefined) { //va directo a grupos apenas entro con f3
      $state.go('MercadoPago_PaymentMethodSearch',
      {
          "flavour": $stateParams.flavour
      });
  }

  $scope.getImage = function (paymentMethod) { //agrego la imagen a la paymentMethod
    if (paymentMethod != undefined) {
        var paymentMethodid = paymentMethod.id;
        if (paymentMethodid == "redlink_bank_transfer" || paymentMethodid == "redlink_atm") {
            paymentMethodid = "redlink";
        }
        for (i = 0; i < $rootScope.datos.payment_methods.length; i++) {
            if ($rootScope.datos.payment_methods[i].id == paymentMethodid){
                return $rootScope.datos.payment_methods[i].thumbnail;
            }
        }
    }
  };

  $scope.exit = function () { //volver si cancelo
    MercadoPagoService.goBack($stateParams.flavour, "cancel");
  };

  $scope.goBack = function () {
    if ($stateParams.flavour == 1){ //editar paymentMethod elegida si es f2 gris, devuelvo false
        MercadoPagoService.goBack($stateParams.flavour, "false");
    } else {
        $rootScope.MpShowBack = true; //mostrar atras si es f3
        $state.go('MercadoPago_PaymentMethodSearch',
        {
          "flavour": $stateParams.flavour,
        });
    }
  };

  $scope.pay = function () {
    $rootScope.MpShowBack = true; //mostrar flecha atras

    if ($stateParams.flavour == 1){ // devuelvo true si es f2 gris
        MercadoPagoService.goBack($stateParams.flavour, "true");

    } else {
        var MpResponse = []; //ir a pagar
        MpResponse.push($rootScope.MpCheckoutInfo[0]); //token
        MpResponse.push($scope.selectedPaymentMethod); //pm
        MpResponse.push($rootScope.MpCheckoutInfo[2]);
        MpResponse.push($rootScope.MpCheckoutInfo[3]);

        MercadoPagoService.goBack($stateParams.flavour, MpResponse, true);
    }
  };
})

.controller('MpCardIssuersCtrl', function ($scope, MercadoPagoService, $state, $stateParams,$rootScope, $ionicHistory){

  $scope.HTML = "<ion-content class='has-header'<div class='list'><div class='item' ng-repeat='cardIssuer in cardIssuers' ng-click='selectedCardIssuer(cardIssuer) ; $event.stopPropagation();'><img src='{{cardIssuer.thumbnail}}' width='50' height='19' style='margin-right: 20px;'>{{cardIssuer.name}}</div></div></ion-content>";
  $scope.header = "Selecciona el banco";

  var errorNum = 0;

  ($scope.getIssuer = function () {

    MercadoPagoService.getIssuers($stateParams.paymentMethod.id, $stateParams.token.first_six_digits)
    .get(function (response) {
      errorNum = 0;
      if (response.length <= 1){
          $scope.selectedCardIssuer(response[0]); //si es uno solo que elija ese directo
      } else {
          $scope.cardIssuers = response;
      }
    },function (error) {
      console.log(error);
      if (errorNum < 3) {
          errorNum++;
          $scope.getIssuer();
      } else {
          alert("Intente devuelta");
          errorNum = 0;
      }
    });
  })();

  $scope.selectedCardIssuer = function (cardIssuer) {
    if ($stateParams.installments == true){
        $state.go('MercadoPago_Installments',
          {
             "cardIssuer": cardIssuer,
             "paymentMethod": $stateParams.paymentMethod,
             "token": $stateParams.token,
             "flavour": $stateParams.flavour,
          });
    } else {
        var MpResponse = [];
        MpResponse.push($stateParams.token);
        MpResponse.push($stateParams.paymentMethod);
        MpResponse.push($stateParams.cardIssuer);
        MpResponse.push(undefined); //installments
        $rootScope.MpCheckoutInfo = MpResponse;
        if ($stateParams.flavour == 2){
            MercadoPagoService.goBack($stateParams.flavour, MpResponse, true);
        } else if ($stateParams.flavour == 1) {
            MercadoPagoService.goBack($stateParams.flavour, cardIssuer);
        } else {
            $rootScope.selectedPaymentMethod = $stateParams.paymentMethod; //si es f3 vuelvo a ryc
            $ionicHistory.goBack(-1*($ionicHistory.currentView().index-1+$rootScope.index));
        }
    }
  };
})

.controller('MpInstallmentsCtrl', function ($scope, MercadoPagoService, $stateParams, $rootScope, $ionicHistory) {

  $scope.HTML = "<ion-nav-buttons side='right'><i class='ion-ios-cart-outline carrito' style='padding: 5px' ng-click='MpShowPrefId()'></i></ion-nav-buttons><ion-content class='has-header'<div class='list'><div class='item' ng-repeat='installment in installments.payer_costs' ng-click='selectedInstallment(installment); $event.stopPropagation();'>{{installment.recommended_message}}</div></div></ion-content>";
  $scope.header = "Selecciona las cuotas";
  if ($rootScope.prefid != null){
      $scope.prefIdTotal = MercadoPagoService.getTotal($rootScope.prefid);
  } else {
      $scope.prefIdTotal = $stateParams.total;
  }
  var errorNum = 0;

  ($scope.getInstallments=function () {
    MercadoPagoService.getInstallments($stateParams.paymentMethod.id, $stateParams.cardIssuer.id, $scope.prefIdTotal)
    .get(function (response) {
      $scope.installments = response[0];
      errorNum = 0;
    },function (error) {
        console.log(error);
        if (error.status == -1) {
            if (errorNum < 3) {
                errorNum++;
                $scope.getInstallments($stateParams.paymentMethod.id, $stateParams.cardIssuer.id, $scope.prefIdTotal);
          } else {
                alert("Intente devuelta");
                errorNum = 0;
        }
      }
    });
  })();

  $scope.selectedInstallment = function (installment) {
    var MpResponse = [];
    MpResponse.push($stateParams.token);
    MpResponse.push($stateParams.paymentMethod);
    MpResponse.push($stateParams.cardIssuer);
    MpResponse.push(installment.installments);
    MpResponse.push(installment);
    $rootScope.MpCheckoutInfo = MpResponse;
    if ($stateParams.flavour == 2){
        MercadoPagoService.goBack($stateParams.flavour, MpResponse, true);
      } else if ($stateParams.flavour == 1) {
          MercadoPagoService.goBack($stateParams.flavour, installment);
      } else {
        $rootScope.selectedPaymentMethod = $stateParams.paymentMethod; //si es f3 vuelvo a ryc
        $ionicHistory.goBack(-1*($ionicHistory.currentView().index-1));
    }
  };
})
.controller('MpPaymentMethodCtrl', function ($scope, MercadoPagoService, $stateParams, $rootScope, $ionicHistory, $ionicLoading) {

  $scope.HTML = "<ion-content class='has-header' animation='slide-left-right' scroll='true' has-bouncing='true'><div class='list'><div class='item' ng-repeat='paymentMethod in paymentMethods' ng-click='selectedPaymentMethod(paymentMethod)'><img src='{{paymentMethod.thumbnail}}' width='29' height='19' style='margin-right: 20px;'>{{paymentMethod.name}}</div></div></ion-content>";
  $scope.header = "¿Cómo quieres pagar?";

  $ionicLoading.show({template: 'Cargando...',noBackdrop: true});

  MercadoPagoService.getPaymentMethods().get(function(response){
		$scope.paymentMethods = response;
		$ionicLoading.hide();
	},function(error){
		alert(JSON.stringify(error));
		$ionicLoading.hide();
	});

	$scope.selectedPaymentMethod = function (paymentMethod) {
    if ($stateParams.flavour == 1) {
        MercadoPagoService.goBack($stateParams.flavour, paymentMethod);
    }
	};
})

.controller('MpCardFormCtrl', function ($scope, MercadoPagoService, $state, $stateParams, $rootScope){

  $scope.HTML = "<ion-content class='has-header' animation='slide-left-right'  scroll='true' has-bouncing='true'><form ng-submit='createToken()'><div class='list'><label class='item item-input'><span class='input-label'>Card Number</span><img ng-show='showCardIcon'ng-src='{{keyPress().thumbnail}}'style='padding: 0px 10px'><input type='number' id='cardNumber' ng-model='card_token.card_number' ng-keyup='keyPress($event.keyCode)' placeholder='4509 9535 6623 3704'></label><label class='item item-input'><span class='input-label'>Cardholder Name</span><input type='text' id='cardholderName' ng-model='card_token.cardholder.name' placeholder='APRO'></label><label class='item item-input'><span class='input-label'>Expiration Month</span><input type='number' id='cardExpirationMonth' ng-model='card_token.expiration_month' placeholder='MM'> </label><label class='item item-input'><span class='input-label'>Expiration Year</span><input type='number' id='cardExpirationYear' ng-model='card_token.expiration_year' placeholder='AAAA'> </label><label class='item item-input item-select'><div class='input-label'>Document Type</div><select id='docType' ng-model='card_token.cardholder.identification.type' ng-options=' identification_type.name for identification_type in identification_types'><option value=''>Seleccionar</option></select></label><label class='item item-input'><span class='input-label'>Document number</span><input type='number' id='docNumber' ng-model='card_token.cardholder.identification.number' placeholder='12345678'></label><label class='item item-input'><span class='input-label'>Security Code</span><input type='number' id='securityCode' ng-model='card_token.security_code' placeholder='123'></label><center><br><button type='submit' class='button   button-balanced' style='padding:0px 100px;'>Pagar</button></center></div></form></ion-content>";
  $scope.header = "Datos de tu tarjeta";

  $scope.showCardIcon = false; //mostrar que tarjeta es
  $scope.card_token = {};
  var errorNum = 0;
  var MpCardNumberBefore = "";

  ($scope.getIdentificationTypes = function () {
    MercadoPagoService.getIdentificationTypes()
    .get(function(response) {
      $scope.identification_types = response;
      errorNum = 0;
    },function(error) {
      console.log(error);
      if (error.status == -1) {
          if (errorNum < 3) {
              errorNum++;
              $scope.getIdentificationTypes();
          } else {
              alert("Intente devuelta");
              errorNum = 0;
            }
      }
    });
  })();

  $scope.sacarBins = function (num, card) {
    var bin = [""];
    var a = 0;
    if ($rootScope.datos.payment_methods[num].payment_type_id == "credit_card" || $rootScope.datos.payment_methods[num].payment_type_id == "debit_card") {
        for (i = 1; i < ($rootScope.datos.payment_methods[num].settings[0].bin.pattern.length); i++) { //saco los numeros
            if ($rootScope.datos.payment_methods[num].settings[0].bin.pattern[i] != '(' && $rootScope.datos.payment_methods[num].settings[0].bin.pattern[i] != ')') {
                if ($rootScope.datos.payment_methods[num].settings[0].bin.pattern[i] != '|') {
                    bin[a] += $rootScope.datos.payment_methods[num].settings[0].bin.pattern[i];
                } else {
                    a++;
                    bin[a] = "";
                }
            }
        }
        if (bin[0].length === 0){
            return false;
        } else {
            for (i = 0; i<bin.length; i++) {
                if (bin[i] == (card-card % Math.pow(10, 6 - bin[i].length)) / Math.pow(10, 6 - bin[i].length)) {//los comparo con la tarjeta
                    return true;
                }
            }
            return false;
        }
    } else {
        return false;
    }
  };

  $scope.sacarExclusiones = function (num, card) {
    var bin = [""];
    var a = 0;
    if ($rootScope.datos.payment_methods[num].payment_type_id == "credit_card" || $rootScope.datos.payment_methods[num].payment_type_id=="debit_card"){
        for (i = 1; i < ($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern.length); i++) { //saco los numeros
            if ($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i] != '(' && $rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i] != ')') {
                if ($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i] != '|') {
                    bin[a] += $rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i];
                } else {
                    a++;
                    bin[a] = "";
                }
            }
        }
        if (bin[0].length === 0){
            return true;
        } else {
            for (i = 0; i < bin.length; i++) {
                if (bin[i] == (card - card % Math.pow(10, 6 - bin[i].length)) / Math.pow(10, 6 - bin[i].length)) {//los comparo con la tarjeta
                    return false;
                }
            }
            return true;
        }
    } else {
        return false;
    }
  };

  $scope.keyPress = function (keyCode) {
    if ($scope.card_token.card_number != undefined && ($scope.card_token.card_number + '').length >= 6 && MpCardNumberBefore != $scope.card_token.card_number){
        $scope.showCardIcon=true;
        var base = Math.pow(10,($scope.card_token.card_number + '').length - 6);
        var num = ($scope.card_token.card_number - $scope.card_token.card_number % base) / base;

        var i = ($rootScope.datos.payment_methods.length) - 1;

        while (i >= 0) {
            if ($scope.sacarExclusiones(i, num) && $scope.sacarBins(i, num)) {
              return $rootScope.datos.payment_methods[i];
            }
            i--;
        }
        $scope.showCardIcon = false;
        MpCardNumberBefore = $scope.card_token.card_number;
    } else if ($scope.card_token.card_number === undefined || ($scope.card_token.card_number + '').length <= 6) {
        $scope.showCardIcon = false;
        return "";
    }

  };

  $scope.createToken = function () {
    var token = {
        "card_number": 5031755734530604,
        "security_code": "123",
        "expiration_month": 4,
        "expiration_year": 2020,
        "cardholder": {
          "name": "APRO",
          "identification": {
            "subtype": null,
            "type": "DNI",
            "number": "12345678"
          }
        }
    };

    if ($scope.card_token.card_number != undefined){
        token.card_number=$scope.card_token.card_number;
    } else {
        $scope.card_token.card_number = token.card_number;
    }
    if ($scope.card_token.cardholder != undefined) {
        if ($scope.card_token.cardholder.name != undefined) {
            token.cardholder.name = $scope.card_token.cardholder.name;
        }
        if ($scope.card_token.cardholder.identification != undefined) {
            if ($scope.card_token.cardholder.identification.type != undefined){
                token.cardholder.identification.type = $scope.card_token.cardholder.identification.type.id;
            }
            if ($scope.card_token.cardholder.identification.number != undefined){
                token.cardholder.identification.number = "" + $scope.card_token.cardholder.identification.number + "";
            }
        }
    }
    if ($scope.card_token.security_code != undefined) {
        token.security_code = "" + $scope.card_token.security_code + "";
    }
    if($scope.card_token.expiration_year!=undefined)
      token.expiration_year=$scope.card_token.expiration_year;
    if($scope.card_token.expiration_month!=undefined)
      token.expiration_month=$scope.card_token.expiration_month;

    //  if ($scope.card_token.cardholder!=undefined){
    //   $scope.card_token.cardholder.identification.number=""+$scope.card_token.cardholder.identification.number+"";
    //   $scope.card_token.security_code=""+$scope.card_token.security_code+"";
    // }
    // $scope.card_token.cardholder.identification.number = "" + $scope.card_token.cardholder.identification.number + "";
    // $scope.card_token.security_code = "" + $scope.card_token.security_code + "";
    // $scope.card_token.cardholder.identification.type = "" +$scope.card_token.cardholder.identification.type.id + "";

    MercadoPagoService.createToken()
    .save(token, function (token){
      console.log(token);
      if ($rootScope.platform == "android" || $rootScope.platform == "ios"){
        var body = {//online
            "public_key": MercadoPagoService.getPublicKey(),
            "token": token.id,
            "sdk_flavor": $stateParams.flavour,
            "sdk_platform": $rootScope.platform,
            "sdk_type": "hybrid",
            "sdk_framework": "ionic",
            "sdk_version": "1.0"
        };
        MercadoPagoService.trackingOn()
        .save(body,function (response) {
          console.log("tracking", response);
        },function (error) {
          console.log(error);
        });
      }
      $state.go('MercadoPago_CardIssuers',
      {
        'paymentMethod': $scope.keyPress(),
        'token': token,
        'installments': $stateParams.installments,
        "flavour": $stateParams.flavour,
      });
    }, function(error){
      alert("Intente nuevamente");
    });
  };
})

.controller('MpInstructionsCtrl', function ($scope, MercadoPagoService,$state, $stateParams, $ionicHistory, $rootScope){

  $scope.HTML = "<ion-view hide-nav-bar='true'><ion-content style='background-color:rgb(244,244,244)'><div style=' background-color:rgb(251,248,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 22pt;text-align: center;padding: 20px 16pt 20pt 16pt;' class='textoinstru'><i class='icon ion-social-usd pesos' style='color:rgb(239,199,1); padding:40pt'></i><br class='textoinstru'>{{title}}</div><div class='card'><div class='item item-text-wrap opciones' style='text-align: left;width:100%;display:inline-block;border: none'><div ng-repeat='in in infos track by $index'>{{in}}<br></div><br><div ng-repeat='reference in references'><div class='copy'style='font-weight: 200; text-align: left;'>{{reference.label}}</div><div class='textoinstru'style='text-align: left; letter-spacing: 1.5px;padding:5px 0px 5px 0px'>{{value(reference)}}</div></div></div><div class='item item-text-wrap opciones' style=' background-color:rgb(244,244,244); text-align: left;'>{{secondInfo}}</div><div class='item item-text-wrap texto item-icon-left amarillo' style=' background-color:rgb(244,244,244); text-align: left;border-style: none; color:rgb(178,144,84);font-weight: 200'><i>{{accreditationMessage}}</i><i class='icon ion-ios-clock-outline amarillo'></i></div></div><footer></footer></ion-content></ion-view>";
  $scope.title = $stateParams.instructionInfo.title;

  $scope.accreditationMessage = $stateParams.instructionInfo.accreditation_message;
  $scope.infos = $stateParams.instructionInfo.info;
  $scope.references = $stateParams.instructionInfo.references;
  $scope.secondInfo = $stateParams.instructionInfo.secondary_info[0];

  $scope.value = function (reference) { //junto los datos de field_value
    var resultado = "";

    for (i = 0; i < reference.field_value.length; i++)
      if (reference.separator != null) {
          resultado += reference.field_value[i]+reference.separator;
      } else {
          resultado += reference.field_value[i];
      }
      return resultado;
  };

  $scope.exit = function () { //salir de la pantalla
    MercadoPagoService.goBack($stateParams.flavour, $stateParams.paymentInfo, false);
  };
})

.controller('MpCongratsCtrl', function ($scope, MercadoPagoService, $state, $stateParams, $ionicHistory, $rootScope){

  $scope.getImage = function () { //buscar imagenes de los pm
    var paymentMethodId = $stateParams.paymentInfo.payment_method_id;
    if (paymentMethodId == "redlink_bank_transfer" || paymentMethodId == "redlink_atm") {
        paymentMethodId = "redlink";
    }
    for (i = 0; i < $rootScope.datos.payment_methods.length; i++) {
        if ($rootScope.datos.payment_methods[i].id == paymentMethodId) {
            return $rootScope.datos.payment_methods[i].thumbnail;
        }
    }
  };

  $scope.intereses = function () {
    for (i = 0; i < $stateParams.paymentInfo.fee_details.length; i++) {
        if ($stateParams.paymentInfo.fee_details[i].type == "financing_fee") {
          return false;
        }
    }
    return true;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $scope.prefIdTotal = MercadoPagoService.getTotal($rootScope.prefid);
  $scope.lastFourDigits = $stateParams.paymentInfo.card.last_four_digits;
  $scope.installments = $stateParams.paymentInfo.installments;
  $scope.installmentAmount = $stateParams.paymentInfo.transaction_details.installment_amount;
  $scope.paymentId = $stateParams.paymentInfo.id;

  $scope.title = "";
  $scope.subtitle = "";
  $scope.statementDescriptor = $stateParams.paymentInfo.statement_descriptor;
  $scope.paymentMethodId = capitalizeFirstLetter($stateParams.paymentInfo.payment_method_id);


  switch ($stateParams.paymentInfo.status_detail) {
    case "accredited":
      $scope.title = "";
      $scope.subtitle = "";
      break;
    case "pending_contingency":
      $scope.title = "Estamos procesando el pago";
      $scope.subtitle = "En menos de 1 hora te enviaremos por e-mail el resultado.";
      break;
    case "pending_review_manual":
      $scope.title = "Estamos procesando el pago";

      $scope.subtitle = "En menos de 2 días hábiles te diremos por e-mail si se acreditó o si necesitamos más información.";
      $scope.subtitle = "En poquitas horas te diremos por e-mail si se acreditó o si necesitamos más información.";
      break;
    case "rejected_high_risk":
      $scope.title = "Por seguridad, tuvimos que rechazar tu pago";
      $scope.subtitle = "Si quieres pagar con el dinero de tu cuenta, contáctate con Atención al Cliente de MercadoPago. O si prefieres, puedes elegir otro medio de pago.";
        break;
    case "cc_rejected_insufficient_amount":
      $scope.title = "Tu " + $scope.paymentMethodId + " no tiene fondos suficientes";
      $scope.subtitle = "¡No te desanimes! Recárgala en cualquier banco o desde tu banca electrónica e inténtalo de nuevo. O si prefieres, puedes elegir otro medio de pago.";
        break;
    case "cc_rejected_other_reason":
      $scope.title = "" + $scope.paymentMethodId + " no procesó el pago";
      $scope.subtitle = "Usar otra tarjeta u otro medio de pago.";
        break;
    case "cc_rejected_max_attempts":
      $scope.title = "Llegaste al límite de intentos permitidos";
      $scope.subtitle = "Elige otra tarjeta u otro medio de pago.";
        break;
    case "cc_rejected_call_for_authorize":
      $scope.title = "";
      $scope.subtitle = "";
        break;
    case "cc_rejected_duplicated_payment":
      $scope.title = "" + $scope.paymentMethodId + " no procesó el pago";
      $scope.subtitle = "Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.";
      break;
    case "cc_rejected_card_disabled":
      $scope.title = "Llama a " + $scope.paymentMethodId + " para que active tu tarjeta";
      $scope.subtitle = "El teléfono está al dorso de tu tarjeta.";
      break;
    case "cc_rejected_bad_filled_other":
      $scope.title = "Uy, no pudimos procesar el pago";
      $scope.subtitle = "Algún dato de tu " + $scope.paymentMethodId + " es incorrecto.";
      break;
    case "cc_rejected_bad_filled_card_number":
      $scope.title = "Uy, no pudimos procesar el pago";
      $scope.subtitle = "El número de tu " + $scope.paymentMethodId + " es incorrecto.";
      break;
    case "cc_rejected_bad_filled_security_code":
      $scope.title = "Uy, no pudimos procesar el pago";
      $scope.subtitle = "El código de seguridad no es el correcto.";
      break;
    case "cc_rejected_bad_filled_date":
      $scope.title = "Uy, no pudimos procesar el pago";
      $scope.subtitle = "La fecha de vencimiento no es la correcta.";
      break;
  }
  $scope.Volver = function () {
    MercadoPagoService.goBack($stateParams.flavour, $stateParams.paymentInfo, false);
  };

  $scope.exit = function () {
    MercadoPagoService.goBack($stateParams.flavour, $stateParams.paymentInfo, false);
  };

  if ($stateParams.paymentInfo.status_detail == "cc_rejected_call_for_authorize") {
      $scope.HTML = "<ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div class='textoinstru' style=' background-color:rgb(228,242,249);border-bottom: 2pt;border-bottom-color: rgb(222,222,222); border-style:solid;line-height: 28pt;text-align: center;padding: 10px 16pt 16pt 16pt;color:rgb(102,102,102)!important;font-size:18pt!important' class='textoinstru'><i class='icon ion-android-call tic' style='color:rgb(57,135,173); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>Debes autorizar ante {{paymentMethodId}} el pago de {{total | currency}} a MercadoPago<br class='textoinstru'><div class='textoinstru' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 10px 30px; color:rgb(102,102,102)'>El teléfono está al dorso de tu tarjeta.</div></div><br><br><div class='footer'><a class='link' ng-click='exit() ; $event.stopPropagation();'>Ya hablé con Visa y me autorizó</a></div><br><div class='footer' style='padding: 10px 0'>¿No pudiste autorizarlo?</div><div class='footer' style='line-height: 15pt;'><a class='link' ng-click='exit(); $event.stopPropagation();'>Elige otro medio de pago</a></div><br><footer></footer></ion-content></ion-view>";
  } else if ($stateParams.paymentInfo.status == "rejected") {
      $scope.HTML = "<ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div class='textoinstru' style=' background-color:rgb(248,233,233);border-bottom: 2pt;border-bottom-color: rgb(222,222,222); border-style:solid;line-height: 25pt;text-align: center;padding: 10px 16pt 16pt 16pt;color:rgb(185,74,72)!important;font-size:18pt!important' class='textoinstru'><i class='icon ion-android-cancel tic' style='color:rgb(153,6,1); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>{{title}}<br class='textoinstru'><div class='textoinstru' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 8px 5px; color:rgb(102,102,102)'>{{subtitle}}</div></div><br><br><center><button class='button button-outline button-positive' style='background-color:rgb(255,255,255); -webkit-tap-highlight-background-color: rgb(0,0,0,0);text-align: center; font-size: 12pt;color: rgb(0,159,222); border-color:rgb(0,159,222);'ng-click='Volver() ; $event.stopPropagation();'>Usar otro medio de pago</button></center><footer></footer></ion-content></ion-view>";
  } else if ($stateParams.paymentInfo.status == "in_process") {
      $scope.HTML = "<ion-view hide-nav-bar='true'><ion-content style='background-color:rgb(244,244,244)'><div style=' background-color:rgb(251,248,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 22pt;text-align: center;padding: 20px 16pt 20pt 16pt;' class='textoinstru'><i class='icon ion-ios-clock-outline pesos' style='color:rgb(239,199,1); padding:40pt'></i><br class='textoinstru'>{{title}}<div class='texto' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 5px 30px; color:rgb(102,102,102)'>{{subtitle}}</div></div><footer></footer></ion-content></ion-view>";
  } else {
      $scope.HTML = "<ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div style=' background-color:rgb(234,255,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 28pt;text-align: center;padding: 10px 16pt 16pt 16pt;' class='textoinstru'><i class='icon ion-checkmark-circled tic' style='color:rgb(47,176,0); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>¡Listo, se acreditó tu pago!<div class='texto' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 5px 30px; color:rgb(102,102,102)'>Te enviaremos los datos  a usuario@gmail.com</div></div><div class='card' style='margin:0px 0px 0px 0px'><div class='item item-text-wrap textoinstru ' style='text-align: left;width:100%;display:inline-block; border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;'><img id= 'im' ng-src='{{getImage()}}' style='padding: 0px 10px 0px 0px'>terminada en {{lastFourDigits}}<br class='textoinstru'><br><div class='textoinstru'style='font-weight: 200; text-align: left;color:rgb(0,159,222)!important'>{{installments}} de {{installmentAmount | currency}}  <i class='texto' style='color:rgb(67,176,0);text-align: left;'ng-show='intereses()'>Sin intereses</i></div><br><div class='texto'style='text-align: left;  color:rgb(102,102,102)'>En tu estado de cuenta verás el cargo como {{statementDescriptor}}</div></div></div><div class='item item-text-wrap texto' style=' text-align: center;border-style: none;font-weight: 200;color: rgb(102,102,102); border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;'><i>Comprobante: {{paymentId}}</i></div></div><footer></footer></ion-content></ion-view>";
  }
})

.directive('footer', function() {
    return {
      restrict: 'AE',
      template: "<br> <div style='background-color: rgb( 222,222,222); border-bottom: 1pt;border-bottom-color: rgb( 222,222,222); border-style:solid; margin: 0px 20px 0px 20px'></div> <br> <div class='footer'>Usuario@gmail.com (<a class='link'>exit</a>)</div><br><div class='footer'><a class='link' ng-click='exit(); $event.stopPropagation();'>Cancelar y volver</a></div><br><div class='copy'<p>© 1999-2015 Procesado por MercadoPago</p></div><br>"
    };
})

.directive('compileHtml', function($compile) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
          scope.$watch(function () {
              return scope.$eval(attrs.compileHtml);
          }, function (value) {
              element.html(value);
              $compile(element.contents())(scope);
          });
      }
    };
});
