angular.module('mercadopago.controllers', [])

.controller('CardFormCtrl', function($scope, MercadoPagoService,$state, $stateParams){
  MercadoPagoService.getIdentificationTypes().query(function(data) {
    $scope.identification_types = data;
  });

  $scope.card_token={};

  $scope.createToken = function() {
    
  };
})


//--------------------------------------------------------------------------------

.controller('Inicio', function($scope, MercadoPagoService,$state, $stateParams, ProductService, $templateCache, $rootScope){

  var prefid;
  var datos;

  $scope.start = function() {
    $scope.grupos={};
    MercadoPagoService.grupos().get(function(data){
        datos=data;
        datos.groups[0].icon="ion-card ";
        datos.groups[1].icon="ion-cash ";
        datos.groups[2].icon="ion-ios-locked ";

        console.log(datos.groups)
        $scope.grupos=datos.groups;
    });
    MercadoPagoService.getPrefId().get(function(data){
      prefid=data;
      $scope.titulo=prefid.items[0].title;
      $scope.imagen=prefid.items[0].picture_url;
      $scope.total=function(){
        var precio=0;
        for(i=0;i<prefid.items.length;i++){
          precio+=prefid.items[i].unit_price;
        }
        return precio;
      }
    });
      $scope.header="¿Comó quieres pagar?";
  };

  $scope.start();
 
  $scope.selectedGrupo = function(pm) {

    if(pm.children==null){
        if (pm.id=="credit_card"){
              $state.go('card_form', {
                "payment_method_id": pm.id 
              });
        }
      }
    else{  
      $state.go('grupos2', {
        "param1": pm,
        "param2":datos,
        "param3":prefid
      });
    }    
  };
})
.controller('Inicio2', function($scope, MercadoPagoService,$state, $stateParams, ProductService, $templateCache){

  var datos=$stateParams.param2;
  var prefid=$stateParams.param3[0];

  $scope.grupos=$stateParams.param1[0].children;
  $scope.header=$stateParams.param1[0].children_header;
  $scope.titulo=prefid.items[0].title;
  $scope.imagen=prefid.items[0].picture_url;

  $scope.total=function(){
         var precio=0;
  for(i=0;i<prefid.items.length;i++){
    precio+=prefid.items[i].unit_price;
  }
  return precio;
  }

  $scope.getImagen=function(pm){

  if (pm.show_icon==true){
    if(pm.id=="redlink_bank_transfer"||pm.id=="redlink_atm") pm.id="redlink";
      for(a=0;a<datos[0].payment_methods.length;a++){
        if(datos[0].payment_methods[a].id==pm.id)
          return datos[0].payment_methods[a].thumbnail;
      }
    }
  }
  $scope.elegir=function(pm){
     $state.go('ryc', {
      "param1": pm,
      "param2":datos,
      "param3":prefid
    });
  }
})

.controller('Ryc', function($scope, MercadoPagoService,$state, $stateParams, ProductService, $templateCache){

  var datos=$stateParams.param2;
  var prefid=$stateParams.param3[0];
  
  $scope.titulo=prefid.items[0].title;
  $scope.imagen=prefid.items[0].picture_url;
  $scope.grupos=$stateParams.param1[0];
  $scope.header="Revisa si está todo bien…";
  $scope.total=function(){
    var precio=0;
    for(i=0;i<prefid.items.length;i++){
      precio+=prefid.items[i].unit_price;
    }
    return precio;
  }
  $scope.getImagen=function(pm){

    if (pm.show_icon==true){
      if(pm.id=="redlink_bank_transfer"||pm.id=="redlink_atm") pm.id="redlink";
        for(a=0;a<datos[0].payment_methods.length;a++){
          if(datos[0].payment_methods[a].id==pm.id)
            return datos[0].payment_methods[a].thumbnail;
        }
    } 
  }
    $scope.pagar=function(){
           $state.go('instru', {
           //"param1": pm,
           //"param2":datos,
           "param3":prefid

        });
    }
})
.controller('instru', function($scope, MercadoPagoService,$state, $stateParams, ProductService, $templateCache){

  var datos;
  var prefid=$stateParams.param3[0];
  $scope.numConvenio="9903136140";
  $scope.numReferencia="9903136140";

  $scope.total=function(){
    var precio=0;
    for(i=0;i<prefid.items.length;i++){
      precio+=prefid.items[i].unit_price;
    }
    return precio;
  } 
})
.directive('footer', function(){
    return {
        restrict: 'AE',
        template: "<br> <div style='background-color: rgb( 222,222,222); border-bottom: 1pt;border-bottom-color: rgb( 222,222,222); border-style:solid; margin: 0px 20px 0px 20px'></div> <br> <div class='footer'>Usuario@gmail.com (<a class='link'>Salir</a>)</div><br><div class='footer'><a class='link'>Cancelar y volver</a></div><br><div class='copy'<p>© 1999-2015 Procesado por MercadoPago</p></div><br>"
    }  
})
;