// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'mercadopago.services','mercadopago.controllers','ngResource', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope, MercadoPagoService, $ionicLoading) {
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
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.custom-icon {/*font-size: 64px;*/color : rgb(29,159,222);}.barra{color:red!default;background-color:rgb(29,159,222)!important;border-style: none!important;}.carrito{color:white;font-size: 26px;font-weight: bold;}.texto{font-size: 12pt;text-align: center;color:rgb(153,153,153);}.link{color:rgb(0,102,204);}.flecha{color:rgb(153,153,153);}.amarillo{color:rgb(178,144,84);}.pesos{font-size: 30pt;font-weight: bold;text-align: center; }.tic{font-size: 50px;font-weight: bold;text-align: center;}.header{font-size:13pt !important;font-weight: 200 !important;color:white!important;word-wrap:break-word!important}.opciones{font-size:12pt!important;color:rgb(102,102,102)!important;}.footer{font-size:11pt;color:rgb(153,153,153)!important;text-align: center;}.copy{font-size:9pt;color:rgb(153,153,153)!important;text-align: center;}.pagar{font-size: 15pt!important;text-align: center!important;font-weight: 200!important;}.textoinstru{font-size: 16pt!important;font-weight: 200!important;color:rgb(102,102,102)!important;}';
    document.getElementsByTagName('head')[0].appendChild(style);

    $rootScope.mostrar=false;
    $rootScope.no=true;
    $rootScope.car="";

    $rootScope.mos = function() {
      if ($rootScope.mostrar==true)
          $rootScope.mostrar=false;
      else
          $rootScope.mostrar=true;
    };
    $ionicLoading.show({
          template: 'Cargando...'
      })
    MercadoPagoService.getPrefId().get(function(data){
        $rootScope.prefid=data;

      });
    MercadoPagoService.grupos().get(function(data){
      $rootScope.datos=data;
      $ionicLoading.hide();
    });

  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
  $ionicConfigProvider.navBar.alignTitle('center');

  var card_form = {
    name: 'MercadoPago-FormTarjeta',
    url: '/',
    params: {
      opcion: {},
      flavour: {}
    },
    templateUrl: 'card_form.html',
    controller: 'CardFormCtrl'};

  var grupos = {
    name: 'MercadoPago-Grupos',
    url: '/',
    cache:false,
    params: {
      flavour: {}
    },
    templateUrl: 'mercadopago.html',
    controller: 'Inicio'};

  var grupos2 = {
    name: 'MercadoPago-Grupos2',
    url: '/',
    cache:false,
    params: {
      opcion: {},
      flavour: {}
    },
    templateUrl: 'mercadopago.html',
    controller: 'Inicio2'};

  var ryc = {
    name: 'MercadoPago-Ryc',
    url: '/',
    cache:false,
    params: {
      flavour: {}
    },
    templateUrl: 'mercadopago.html',
    controller: 'Ryc'};

  var instru = {
    name: 'MercadoPago-Ins',
    url: '/',
    cache:false,
    params: {
      instru: {},
      flavour: {},
      pago: {}

    },
    templateUrl: 'mercadopago.html',
    controller: 'instru'};

    var congrats = {
      name: 'MercadoPago-Congrats',
      url: '/',
      params: {
        congrats: {},
        flavour: {},
        pago: { }

      },
      templateUrl: 'mercadopago.html',
      controller: 'congrats'};
    var isssuers = {
      name: 'MercadoPago-CardIssuers',
      url: '/',
      params: {
        opcion: {},
        flavour: {},
        pago: { },
        token: {},

      },
      templateUrl: 'card_issuers.html',
      controller: 'CardIssuersCtrl'};
    var installments = {
      name: 'MercadoPago-CardInstallments',
      url: '/',
      params: {
        opcion: {},
        issuer:{},
        flavour: {},
        pago: { },
        token:{},

      },
      templateUrl: 'installments.html',
      controller: 'InstallmentsCtrl'};

  $stateProvider
    .state(card_form)
    .state(grupos)
    .state(grupos2)
    .state(ryc)
    .state(instru)
    .state(congrats)
    .state(installments)
    .state(isssuers)

})
angular.module('mercadopago.services', [])

.factory('MercadoPagoService', function ($resource, $http,$state,$ionicHistory,$rootScope,$ionicLoading) {
  var public_key;
  var base_url = "https://api.mercadopago.com";
  var access_token='';
  var call;
  var volver;
  var prefid;
  var flavour;

  var getInstructions= function(payment_id, payment_method_id, payment_type){
    return $resource("https://api.mercadopago.com/beta/checkout/payments/"+payment_id+"/results?public_key="+public_key+"&payment_method_id="+payment_method_id+"&payment_type="+payment_type);
  }
  var postPayment=function(data){
    return $resource("https://api.mercadopago.com/beta/checkout/payments",data);
  }
  var createCardToken=function(data){
    return $resource(base_url+'/v1/card_tokens?public_key='+public_key+'', data);
  }
  var getPrefId=function(){
    return $resource("https://api.mercadolibre.com/checkout/preferences/"+prefid+"?access_token="+access_token);
  }
  var startIns=function(callback, view, datos){
      getInstructions(datos.id,datos.payment_method_id,datos.payment_type_id).get(function(response){
        console.log(response);
        $ionicLoading.hide();
        call=callback;
        volver=view;
        $state.go('MercadoPago-Ins', {
         "flavour":3,
         "pago": datos,
         "instru":response});})
  }
  var startCongrats=function(callback, view, datos){
        $ionicLoading.hide();
        call=callback;
        volver=view;
        $state.go('MercadoPago-Congrats', {
         "flavour":3,
         "pago": datos,
         "congrats":2});
  }

    return {
      getPaymentMethods:function(){
        return $resource(base_url+'/v1/payment_methods?public_key='+public_key);
      },
      getIssuers:function(pmid,bin){
        return $resource(base_url+'/v1/payment_methods/card_issuers?public_key='+public_key+"&payment_method_id=:payment_method_id&bin="+bin,{ payment_method_id: pmid});
      },
      getInstallments:function(pmid,issuid,amm){
        return $resource(base_url+'/v1/payment_methods/installments?public_key='+public_key+"&payment_method_id=:payment_method_id&issuer.id=:issuer&amount=:ammount",{ payment_method_id: pmid,ammount:amm,issuer:issuid});
      },
      getIdentificationTypes:function(){
        return $resource(base_url+'/v1/identification_types?public_key='+public_key);
      },
      getPromos:function(){
        return $resource(base_url+'/v1/payment_methods/deals?public_key='+public_key);
      },
      createTonken:function(data){
        return $resource(base_url+'/v1/card_tokens?public_key='+public_key,data);
      },
      createPayment:function(data){
        return $resource("https://www.mercadopago.com/checkout/examples/doPayment",data);
      },
      grupos:function(){
        return $resource("https://api.mercadopago.com/beta/checkout/payment_methods/search/options?public_key="+public_key);
      },
      setPrefId:function(dato){
        prefid=dato;
      },
      setAccessToken:function(dato){
        access_token=dato;
      },
      setPublicKey:function(dato){
        public_key=dato;
      },
      postPayment:postPayment,
      getInstructions:getInstructions,
      getPrefId:getPrefId,
      startIns:startIns,
      createCardToken:createCardToken,

      calcularTotal:function(prefid){
        var precio=0;
        for(i=0;i<prefid.items.length;i++)
          precio+=prefid.items[i].unit_price;
        return precio;
      },
      startCheckout:function(callback, view){
        call=callback;
        volver=view;
        $rootScope.elegida=undefined;
        $state.go('MercadoPago-Ryc', {
         "flavour":3});
      },
      startF2:function(callback){
        call=callback;
        $rootScope.elegida=2;
        $state.go('MercadoPago-Grupos', {
         "flavour":2
      });
      },
      startGrupos:function(callback, view){
        call=callback;
        volver=view;
        $state.go('MercadoPago-Grupos', {
         "flavour":1
      });
      },
      startRyc:function(callback, view, datos, prefid, pm){
        call=callback;
        volver=view;
        $state.go('MercadoPago-Ryc', {
         "flavour":1,
         "opcion": pm,
         "datosapi":datos,
         "prefid":prefid,});
      },

      volver:function(flavour, datos,pref_id, seguir){
        $rootScope.elegida=undefined;

        if(flavour==3 && seguir==true){
          $ionicLoading.show({template: 'Cargando...'});
          if (datos[0]==undefined){
          postPayment({
            "public_key":public_key,
            "payment_method_id":datos[1],
            "pref_id":prefid,
            "email":"test-email@email.com"}).save(function(response){
              startIns(call,volver,response);
            });
          }
          else {
              postPayment({
                "public_key":public_key,
                "payment_method_id":datos[1],
                "pref_id":prefid,
                "email":"test-email@email.com",
                "token":datos[0].id,
                "issuer":datos[2],
                "installments":datos[3]}).save(function(response){
                  startCongrats(call,volver,response);
                })
            }
          }

      else{
        $ionicHistory.goBack(-1*($ionicHistory.currentView().index));
        if (call!=null)
          call(datos);
      }
    }
  }
})

angular.module('mercadopago.controllers', [])
.controller('CardIssuersCtrl', function($scope, MercadoPagoService,$state, $stateParams){

MercadoPagoService.getIssuers($stateParams.opcion, $stateParams.token.first_six_digits).query(function(data) {
    if (data.length==1){
      $scope.selectedCardIssuer(data[0]);
  }
  else{
  $scope.cardIssuers = data;
}
  });

  $scope.selectedCardIssuer = function(issuer) {
    $state.go('MercadoPago-CardInstallments',
      {
         "issuer": issuer.id,
         "opcion": $stateParams.opcion,
         "token": $stateParams.token,
         "flavour": $stateParams.flavour,
        // "issuer_id": issuer.id
      });
  };
})
.controller('InstallmentsCtrl', function($scope, MercadoPagoService,$state, $stateParams,$rootScope){

  var prefid=$rootScope.prefid;

   //console.log($stateParams.token);
  $scope.total=MercadoPagoService.calcularTotal(prefid);
    MercadoPagoService.getInstallments($stateParams.opcion, $stateParams.issuer, $scope.total).query(function(data) {
      $scope.installments = data[0];}
  );
  $scope.selectedInstallment = function(installment) {
    var datos=[];
    datos.push($stateParams.token);
    datos.push($stateParams.opcion);
    datos.push($stateParams.issuer);
    datos.push(installment.installments);
    MercadoPagoService.volver($stateParams.flavour,datos,"",true);
  };
})

.controller('CardFormCtrl', function($scope, MercadoPagoService,$state, $stateParams,$rootScope,$ionicHistory){
  //console.log($ionicHistory.currentView());
  $scope.mostrarIcono=false;
  MercadoPagoService.getIdentificationTypes().query(function(data) {
    $scope.identification_types = data;
  });
  $scope.card_token={};

  $scope.sacarBins=function(num, card){
    var bin=[""]; var a=0;
    for (i=1;i<($rootScope.datos.payment_methods[num].settings[0].bin.pattern.length);i++){ //saco los numeros
      if ($rootScope.datos.payment_methods[num].settings[0].bin.pattern[i]!='('&& $rootScope.datos.payment_methods[num].settings[0].bin.pattern[i]!=')'){
         if ($rootScope.datos.payment_methods[num].settings[0].bin.pattern[i]!='|'){
        bin[a]+=$rootScope.datos.payment_methods[num].settings[0].bin.pattern[i];
      }
        else{
          a++;
          bin[a]="";
        }
      }

    }
    if (bin[0].length==0)
      return false;

    for(i=0;i<bin.length;i++){

      if(bin[i]==(card-card%Math.pow(10,6-bin[i].length))/Math.pow(10,6-bin[i].length)){ //los comparo con la tarjeta
        return true;
      }
    }
    return false;
  }
  $scope.sacarExclusiones=function(num,card){
    var bin=[""]; var a=0;
    for (i=$rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern.length-1;i>0;i--){ //saco los numeros
      if ($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i]!='('&& $rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i]!=')'){
         if ($rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i]!='|'){
        bin[a]+=$rootScope.datos.payment_methods[num].settings[0].bin.exclusion_pattern[i];
      }
        else{
          a++;
          bin[a]="";
        }
      }

    }
    if (bin[0].length==0)
      return true;
    for(i=0;i<bin.length;i++){

      if(bin[i]==(card-card%Math.pow(10,6-bin[i].length))/Math.pow(10,6-bin[i].length)){ //los comparo con la tarjeta
        return false;
      }
    }
    return true;
  }

  $scope.keyPress = function(keyCode){

    if($scope.card_token.card_number!=undefined&&($scope.card_token.card_number+'').length >=6 && $rootScope.car!=$scope.card_token.card_number){
      $scope.mostrarIcono=true;
    var base=Math.pow(10,($scope.card_token.card_number+'').length-6);
    var num= ($scope.card_token.card_number-$scope.card_token.card_number%base)/base;

    var i=0;
    while(i<$rootScope.datos.payment_methods.length){
        if ($scope.sacarExclusiones(i,num)&&$scope.sacarBins(i,num)){
        return $rootScope.datos.payment_methods[i];
      }
      i++;
    }
     $rootScope.car=$scope.card_token.card_number;
  }
  else if($scope.card_token.card_number==undefined||($scope.card_token.card_number+'').length <=6){}
    $scope.mostrarIcono=false;

}
  $scope.createToken = function() {

  var token={
    "card_number": "4556364421355272",
    "security_code": "123",
    "expiration_month": 4,
    "expiration_year": 2020,
    "cardholder": {
    "name": "APRO",
    "identification": {
      "subtype": null,
      "type": "DNI",
      "number": "12345678"}}
  };

  if ($scope.card_token.card_number!=undefined){
    token.card_number=$scope.card_token.card_number;
  }

//  if ($scope.card_token.cardholder!=undefined){
//   $scope.card_token.cardholder.identification.number=""+$scope.card_token.cardholder.identification.number+"";
//   // $scope.card_token.expiration_year=$scope.card_token.expirationMonth.year;
//   $scope.card_token.security_code=""+$scope.card_token.security_code+"";
// }
  /*var d = new Date( $scope.card_token.expirationMonth);

if ( !!d.valueOf() ) { // Valid date
    $scope.card_token.expiration_year=d.getFullYear();
    $scope.card_token.expiration_month=d.getMonth();
}*/

MercadoPagoService.createCardToken().save(token,function(response){
  console.log(response);
  $state.go('MercadoPago-CardIssuers',{
    'opcion':$scope.keyPress().id,
    'token': response,
    "flavour": $stateParams.flavour,})
});

  };
})

.controller('Inicio', function($scope, MercadoPagoService,$state, $stateParams, $templateCache, $rootScope,$ionicHistory, $ionicLoading){

//   function include(filename){
//     var head = document.getElementsByTagName('head')[0];
//
//     var script = document.createElement('script');
//     script.src = filename;
//     script.type = 'text/javascript';
//
//     head.appendChild(script)
// }
// include("js/ej.js");

$rootScope.$ionicGoBack=function(){
  if ($rootScope.elegida==undefined && $state.current.name=='MercadoPago-Grupos')
    $ionicHistory.goBack(-2);
  else
    $ionicHistory.goBack(-1);
};

  $scope.codigo="<ion-nav-view title='{{header}}'> <ion-content style='background-color:rgb(244,244,244)'><div  ng-show='mostrar==true'class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{titulo}}<img ng-src='{{imagen}}'><br>{{total | currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px'><div  id= 'l'class='item item-icon-left item-icon-right opciones' ng-repeat='grupo in grupos' ng-click='selectedGrupo(grupo)'><i class=' icon {{grupo.icon}} custom-icon'></i>{{grupo.description}}<i class='icon ion-ios-arrow-right flecha'></i></div></div><br><footer></footer></ion-content></ion-nav-view>";

  $rootScope.no=true; //mostrar la flecha de atras
  var prefid=$rootScope.prefid;
  var datos=$rootScope.datos;

  datos.groups[0].icon="ion-card "; //Agrego iconos
  datos.groups[1].icon="ion-cash ";
  datos.groups[2].icon="ion-ios-locked ";

  $scope.grupos=datos.groups;
  $scope.header="¿Comó quieres pagar?";

  $scope.titulo=prefid.items[0].title; // seteo el prefid para el carrito
  $scope.imagen=prefid.items[0].picture_url;
  $scope.total=MercadoPagoService.calcularTotal(prefid);

  $scope.Salir=function(){
    MercadoPagoService.volver($stateParams.flavour,"cancelo"); //cancelar y salir
  }
  $scope.selectedGrupo = function(pm) {

    if(pm.children==null){
      if($stateParams.flavour==1)
        MercadoPagoService.volver($stateParams.flavour, pm.id); //devuelvo el resultado sino hay childs y f2 gris

      else if (pm.id=="credit_card"){
        $state.go('MercadoPago-FormTarjeta', {
          "opcion": pm.id,
          "flavour":$stateParams.flavour,});
      }
    }
    else{
      $state.go('MercadoPago-Grupos2', {
        "opcion": pm,
        "flavour":$stateParams.flavour,});
    }
  };
})
.controller('Inicio2', function($scope, MercadoPagoService,$state, $stateParams, $templateCache,$ionicHistory, $rootScope){
  //console.log("grupo",$ionicHistory.currentView());

  var prefid=$rootScope.prefid;
  var datos=$rootScope.datos;

  $scope.grupos=$stateParams.opcion.children; //agarro las opciones
  $scope.header=$stateParams.opcion.children_header;

  $scope.titulo=prefid.items[0].title; //preferencia
  $scope.imagen=prefid.items[0].picture_url;
  $scope.total=MercadoPagoService.calcularTotal(prefid);

  $scope.codigo="<ion-nav-view title='{{header}}'><ion-content style='background-color:rgb(244,244,244)'><div ng-show='mostrar==true'class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{titulo}}<img ng-src='{{imagen}}'><br>{{total| currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px'><div  id= 'l'class='item item-icon-right' ng-repeat='grupo in grupos' ng-click='elegir(grupo)' style='padding: 10px'><div style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px' class='opciones' ><img id= 'im' ng-src='{{getImagen(grupo)}}' style='padding: 0px 10px 0px 0px'>{{grupo.description}}</div><br><div class='footer' style='text-align: left'>{{grupo.comment}} </div><i class='icon ion-ios-arrow-right flecha'></i></div></div><footer></footer></ion-content></ion-nav-view>";



  $scope.getImagen=function(pm){ //buscar imagenes de los pm
  if (pm.show_icon==true){
    if(pm.id=="redlink_bank_transfer"||pm.id=="redlink_atm") pm.id="redlink";
      for(a=0;a<datos.payment_methods.length;a++){
        if(datos.payment_methods[a].id==pm.id){
          pm.thumbnail=datos.payment_methods[a].thumbnail;
          return datos.payment_methods[a].thumbnail;
        }
      }
    }
  }
  $scope.Salir=function(){ //cancelar
    MercadoPagoService.volver($stateParams.flavour,"cancelo");
  }

  $scope.elegir=function(pm){
    if ($stateParams.flavour==1)
      MercadoPagoService.volver($stateParams.flavour, pm.id); //volver si es f2 gris

    else if ($stateParams.flavour==2){ //datos de f2
      var datos=[];
      datos.push($scope.token);
      datos.push(pm.id);
      datos.push($scope.issuer);
      datos.push($scope.payer_cost);
      MercadoPagoService.volver($stateParams.flavour,datos);
    }
    else {
      $rootScope.elegida=pm; //si es f3 vuelvo a ryc
      $ionicHistory.goBack(-2);
    }
  }
})
.controller('Ryc', function($scope, MercadoPagoService,$state, $stateParams, $templateCache,$ionicHistory,$ionicNavBarDelegate, $rootScope){

  // console.log("ryc",$ionicHistory.currentView());

  $rootScope.no=false; //no mostrar flecha atras
  var datos=$rootScope.datos;
  var prefid=$rootScope.prefid;

  $scope.grupos=$rootScope.elegida; //muestro la opcion elegida

  if($rootScope.elegida==undefined){ //va directo a grupos apenas entro con f3
    $state.go('MercadoPago-Grupos', {
          "flavour":$stateParams.flavour});
  }

  $scope.titulo=prefid.items[0].title; //muestro la compra
  $scope.imagen=prefid.items[0].picture_url;
  $scope.total=MercadoPagoService.calcularTotal(prefid);

  $scope.header="Revisa si está todo bien…";
  $scope.codigo="<ion-nav-view title='{{header}}'><ion-content style='background-color:rgb(244,244,244)'><div class=' item-thumbnail-left header'style='height: 80pt; background-color:rgb(90,190,231); word-wrap:break-word!important;line-height: 20pt'>{{titulo}}<img ng-src='{{imagen}}'><br>{{total | currency}}</div><div class='list list-inset' style=' margin:20px 0px 0px 0px;border-bottom: none'><div  id= 'l'class='item item-icon-right' ng-click='goBack()' style='padding: 10px;border: none'><div style='padding: 0px 0px 0px 0px; margin:0px 0px -15px 0px' class='opciones'><img id= 'im' ng-src='{{getImagen(grupos)}}' style='padding: 0px 10px 0px 0px'>{{grupos.description}}</div><br><div class='footer' style='text-align: left'>{{grupos.comment}} </div><i class='icon ion-ios-arrow-right flecha'></i></div></div><div class='opciones'style='height: 40pt;background-color:rgb(244,244,244);vertical-align: middle; font-size: 16pt;line-height: 40pt; border-bottom: 2pt;border-bottom-color: rgb( 222,222,222);  border-style:solid; text-align: center;font-weight: 200;word-spacing-spacing: 1.5px'>Total a pagar: {{total| currency}}</div><br><div class='copy' style='padding: 0px 20px'><p>    Al pagar, afirmo que soy mayor de edad y acepto los <a class='link'>Términos y Condiciones</a> de MercadoPago.</p></div><div style='padding: 0px 10px 0px 10px'><button class='button button-block button-positive pagar' style='background-color:rgb(0,159,222)' ng-click='pagar()'>Pagar</button></div><footer></footer></ion-content></ion-nav-view>";

  $scope.getImagen=function(pm){ //agrego la imagen a la opcion
    if(pm!=undefined){
    if (pm.show_icon==true){
      if(pm.id=="redlink_bank_transfer"||pm.id=="redlink_atm") pm.id="redlink";
        for(a=0;a<datos.payment_methods.length;a++){
          if(datos.payment_methods[a].id==pm.id)
            return datos.payment_methods[a].thumbnail;
        }
    }
    }
  }
  $scope.Salir=function(){ //volver si cancelo
    MercadoPagoService.volver($stateParams.flavour,"cancelo");
  }
  $scope.goBack = function() {

    if($stateParams.flavour==1) //editar opcion elegida si es f2 gris, devuelvo false
      MercadoPagoService.volver($stateParams.flavour,"false");
    else{
      $rootScope.no=true; //mostrar atras si es f3
      $state.go('MercadoPago-Grupos', {
          "flavour":$stateParams.flavour});
    }
  }

  $scope.pagar=function(){
    $rootScope.no=true; //mostrar flecha atras

    if($stateParams.flavour==1) // devuelvo true si es f2 gris
      MercadoPagoService.volver($stateParams.flavour,"true");

    else{
      var datos=[]; //ir a pagar
      datos.push($scope.token);
      datos.push($scope.grupos.id);
      datos.push($scope.issuer);
      datos.push($scope.payer_cost);

      MercadoPagoService.volver($stateParams.flavour,datos,"",true);
    }
  }
})
.controller('instru', function($scope, MercadoPagoService,$state, $stateParams, $templateCache,$ionicHistory, $rootScope){

  var datos=$stateParams.pago;
  var instru=$stateParams.instru;

  $scope.codigo="<ion-view title='{{header}}' hide-nav-bar='true'><ion-nav-view hide-nav-bar='true'><ion-content style='background-color:rgb(244,244,244)'><div style=' background-color:rgb(251,248,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 22pt;text-align: center;padding: 20px 16pt 20pt 16pt;' class='textoinstru'><i class='icon ion-social-usd pesos' style='color:rgb(239,199,1); padding:40pt'></i><br class='textoinstru'>{{titulo}}</div><div class='card'><div class='item item-text-wrap opciones' style='text-align: left;width:100%;display:inline-block;border: none'><div ng-repeat='in in infos track by $index'>{{in}}<br></div><br><div ng-repeat='reference in references'><div class='copy'style='font-weight: 200; text-align: left;'>{{reference.label}}</div><div class='textoinstru'style='text-align: left; letter-spacing: 1.5px;padding:5px 0px 5px 0px'>{{value(reference)}}</div></div></div><div class='item item-text-wrap opciones' style=' background-color:rgb(244,244,244); text-align: left;'>{{second}}</div><div class='item item-text-wrap texto item-icon-left amarillo' style=' background-color:rgb(244,244,244); text-align: left;border-style: none; color:rgb(178,144,84);font-weight: 200'><i>{{accreditation_message}}</i><i class='icon ion-ios-clock-outline amarillo'></i></div></div><footer></footer></ion-content></ion-view>";

  $scope.titulo=instru.title;
  $scope.accreditation_message=instru.accreditation_message;
  $scope.infos=instru.info;
  $scope.references=instru.references;
  $scope.second=instru.secondary_info[0];

  $scope.value=function (reference) { //junto los datos de field_value
    var resultado="";
    for (i=0;i<reference.field_value.length;i++)
    if(reference.separator!=null){
      resultado+=reference.field_value[i]+reference.separator;
    }
      else {
        resultado+=reference.field_value[i];
      }
    return resultado;
  }
  $scope.Salir=function(){ //salir de la pantalla
    MercadoPagoService.volver($stateParams.flavour,datos,"",false);
  }
})
.controller('congrats', function($scope, MercadoPagoService,$state, $stateParams, $templateCache,$ionicHistory, $rootScope){
//console.log($ionicHistory.currentView());
  var datos=$stateParams.pago;
  var prefid=$rootScope.prefid;

  //$scope.codigo="<ion-view title='{{header}}' hide-nav-bar='true'><ion-nav-view hide-nav-bar='true'><ion-content style='background-color:rgb(244,244,244)'><div style='height: 120pt; background-color:rgb(251,248,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 22pt;text-align: center;padding: 10px 16pt 50pt 16pt;' class='textoinstru'><i class='icon ion-social-usd pesos' style='color:rgb(239,199,1); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>Paga {{total | currency}} desde tu banca en línea de BBVA Bancomer</div><div class='card'><div class='item item-text-wrap opciones' style='text-align: left;width:100%;display:inline-block;border: none'>Elige Pago de servicios a MercadoLibre.<br class='textoinstru'><br><div class='copy'style='font-weight: 200; text-align: left;'>NÚMERO DE CONVENIO</div><div class='textoinstru'style='text-align: left; letter-spacing: 2.5px;'>{{numConvenio}}</div><br><div class='copy'style='font-weight: 200; text-align: left;'>REFERENCIA</div><div class='textoinstru'style='text-align: left; letter-spacing: 2.5px;'>{{numReferencia}}</div><br><br><button class='button button-outline button-positive' style=' -webkit-tap-highlight-background-color: rgb(0,0,0,0);    height:18pt; width:80px; margin: -20px -100px; position:relative;top:50%; left:50%; width:200px;text-align: center; font-size: 12pt;color: rgb(0,159,222); border-color:rgb(0,159,222);'>Ir a banca en línea</button><br><br></div><div class='item item-text-wrap opciones' style=' background-color:rgb(244,244,244); text-align: left;'>¿Prefieres transferir desde tu computadora o tablet?<div class='copy'><br></div><div style='font-weight: 200'>Te enviamos un e-mail para que puedas hacerlo desde tu correo.</div></div><div class='item item-text-wrap texto item-icon-left amarillo' style=' background-color:rgb(244,244,244); text-align: left;border-style: none; color:rgb(178,144,84);font-weight: 200'><i>Se acreditará en menos de 1 hora.</i><i class='icon ion-ios-clock-outline amarillo'></i></div></div><footer></footer></ion-content></ion-view>";
  $scope.imagen="http://img.mlstatic.com/org-img/MP3/API/logos/master.gif"
  $scope.total=MercadoPagoService.calcularTotal(prefid);

  console.log(datos);

  $scope.titulo="";
  $scope.subtitulo="";
  var pmid=datos.payment_method_id;

  switch (datos.status_detail) {
    case "accredited":
      $scope.titulo="";
      $scope.subtitulo="";
      break;
    case "pending_contingency":
      $scope.titulo="Estamos procesando el pago";
      $scope.subtitulo="En menos de 1 hora te enviaremos por e-mail el resultado.";

      break;
    case "pending_review_manual":
      $scope.titulo="Estamos procesando el pago";
      $scope.subtitulo="Depende de los if que estan acá: https://github.com/mercadolibre/checkout-frontend/blob/master/webserver/grails-app/views/checkout/pay/templates/errores/card/_pending_review_manual.gsp";
      break;
    case "rejected_high_risk":
      $scope.titulo="Por seguridad, tuvimos que rechazar tu pago";
      $scope.subtitulo="Si quieres pagar con el dinero de tu cuenta, contáctate con Atención al Cliente de MercadoPago. O si prefieres, puedes elegir otro medio de pago.";
        break;
    case "cc_rejected_insufficient_amount":
      $scope.titulo="Tu "+pmid+" no tiene fondos suficientes";
      $scope.subtitulo="¡No te desanimes! Recárgala en cualquier banco o desde tu banca electrónica e inténtalo de nuevo. O si prefieres, puedes elegir otro medio de pago.";
        break;
    case "cc_rejected_other_reason":
      $scope.titulo=""+pmid+" no procesó el pago";
      $scope.subtitulo="Usar otra tarjeta u otro medio de pago.";
        break;
    case "cc_rejected_max_attempts":
      $scope.titulo="Llegaste al límite de intentos permitidos";
      $scope.subtitulo="Elige otra tarjeta u otro medio de pago.";
        break;
    case "cc_rejected_call_for_authorize":
      $scope.titulo="";
      $scope.subtitulo="";
        break;
    case "cc_rejected_duplicated_payment":
      $scope.titulo=""+pmid+" no procesó el pago";
      $scope.subtitulo="Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.";
      break;
    case "cc_rejected_card_disabled":
      $scope.titulo="Llama a "+pmid+" para que active tu tarjeta";
      $scope.subtitulo="El teléfono está al dorso de tu tarjeta.";
      break;
    case "cc_rejected_bad_filled_other":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="Algún dato de tu "+pmid+" es incorrecto.";
      break;
    case "cc_rejected_bad_filled_card_number":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="El número de tu "+pmid+" es incorrecto.";
      break;
    case "cc_rejected_bad_filled_security_code":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="El código de seguridad no es el correcto.";
      break;
    case "cc_rejected_bad_filled_date":
      $scope.titulo="Uy, no pudimos procesar el pago";
      $scope.subtitulo="La fecha de vencimiento no es la correcta.";
      break;
    default:

  }
  $scope.Volver=function(){
    $ionicHistory.goBack(-4);
  }

  $scope.Salir=function(){
    MercadoPagoService.volver($stateParams.flavour,datos,prefid,false);
  }
  if (datos.status=="rejected")
    $scope.codigo="<ion-view title='{{header}}'><ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div class='textoinstru' style=' background-color:rgb(248,233,233);border-bottom: 2pt;border-bottom-color: rgb(222,222,222); border-style:solid;line-height: 35pt;text-align: center;padding: 10px 16pt 16pt 16pt;color:rgb(185,74,72)!important;font-size:18pt!important' class='textoinstru'><i class='icon ion-android-cancel tic' style='color:rgb(153,6,1); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>{{titulo}}<br class='textoinstru'><div class='textoinstru' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 10px 30px; color:rgb(102,102,102)'>{{subtitulo}}</div></div><br><br><button class='button button-outline button-positive' style='background-color:rgb(255,255,255); -webkit-tap-highlight-background-color: rgb(0,0,0,0);    height:18pt;margin: -20px -115px;position:relative;top:40%;left:50%; width:220px;text-align: center; font-size: 12pt;color: rgb(0,159,222); border-color:rgb(0,159,222);'ng-click='Volver()'>Usar otro medio de pago</button><footer></footer></ion-content></ion-view>";

  else if (datos.status_detail=="cc_rejected_call_for_authorize")
    $scope.codigo="<ion-view title='{{header}}'><ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div class='textoinstru' style=' background-color:rgb(228,242,249);border-bottom: 2pt;border-bottom-color: rgb(222,222,222); border-style:solid;line-height: 28pt;text-align: center;padding: 10px 16pt 16pt 16pt;color:rgb(102,102,102)!important;font-size:18pt!important' class='textoinstru'><i class='icon ion-android-call tic' style='color:rgb(57,135,173); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>Debes autorizar ante Visa el pago de {{total | currency}} a MercadoPago<br class='textoinstru'><div class='textoinstru' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 10px 30px; color:rgb(102,102,102)'>El teléfono está al dorso de tu tarjeta.</div></div><br><br><div class='footer'><a class='link' ng-click='Salir()'>Ya hablé con Visa y me autorizó</a></div><br><div class='footer' style='padding: 10px 0'>¿No pudiste autorizarlo?</div><div class='footer' style='line-height: 15pt;'><a class='link' ng-click='Salir()'>Elige otro medio de pago</a></div><br><footer></footer></ion-content></ion-view>";
  else if (datos.status=="in_process")
    $scope.codigo="<ion-view title='{{header}}' hide-nav-bar='true'><ion-nav-view hide-nav-bar='true'><ion-content style='background-color:rgb(244,244,244)'><div style=' background-color:rgb(251,248,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 22pt;text-align: center;padding: 20px 16pt 20pt 16pt;' class='textoinstru'><i class='icon ion-ios-clock-outline pesos' style='color:rgb(239,199,1); padding:40pt'></i><br class='textoinstru'>{{titulo}}<div class='texto' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 5px 30px; color:rgb(102,102,102)'>{{subtitulo}}</div></div><footer></footer></ion-content></ion-view>";
  else
    $scope.codigo="<ion-view title='{{header}}'><ion-view hide-nav-bar='true'><ion-content style=' background-color:rgb(244,244,244)'><div style=' background-color:rgb(234,255,225);border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;line-height: 28pt;text-align: center;padding: 10px 16pt 16pt 16pt;' class='textoinstru'><i class='icon ion-checkmark-circled tic' style='color:rgb(47,176,0); margin:0pt 0pt 5pt 0pt'></i><br class='textoinstru'>¡Listo, se acreditó tu pago!<div class='texto' style='line-height: 15pt; font-size: 11pt!important; font-weight: 300!important; padding: 5px 30px; color:rgb(102,102,102)'>Te enviaremos los datos  a usuario@gmail.com</div></div><div class='card' style='margin:0px 0px 0px 0px'><div class='item item-text-wrap textoinstru ' style='text-align: left;width:100%;display:inline-block; border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;'><img id= 'im' ng-src='{{imagen}}' style='padding: 0px 10px 0px 0px'>terminada en 5676<br class='textoinstru'><br><div class='textoinstru'style='font-weight: 200; text-align: left;color:rgb(0,159,222)!important'>6 de {{total | currency}}  <i class='texto' style='color:rgb(67,176,0);text-align: left;'>Sin intereses</i></div><br><div class='texto'style='text-align: left;  color:rgb(102,102,102)'>En tu estado de cuenta verás el cargo como MERCADOPAGO.</div></div></div><div class='item item-text-wrap texto' style=' text-align: center;border-style: none;font-weight: 200;color: rgb(102,102,102); border-bottom: 2pt;border-bottom-color: rgb( 222,222,222); border-style:solid;'><i>Comprobante: 234534678532</i></div></div><footer></footer></ion-content></ion-view>";

})
.directive('footer', function(){
    return {
      restrict: 'AE',
      template: "<br> <div style='background-color: rgb( 222,222,222); border-bottom: 1pt;border-bottom-color: rgb( 222,222,222); border-style:solid; margin: 0px 20px 0px 20px'></div> <br> <div class='footer'>Usuario@gmail.com (<a class='link'>Salir</a>)</div><br><div class='footer'><a class='link' ng-click='Salir()'>Cancelar y volver</a></div><br><div class='copy'<p>© 1999-2015 Procesado por MercadoPago</p></div><br>"
    }
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
