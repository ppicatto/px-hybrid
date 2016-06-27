angular.module('mercadopago.services', [])

.factory('MercadoPagoService', function ($resource, $http,$state) {
  var public_key = "?public_key=444a9ef5-8a6b-429f-abdf-587639155d88";
  var base_url = "https://api.mercadopago.com";
  var prefid="150216849-34d5b32d-02d1-40b4-808f-62d11cc3e460";
  var access_token="APP_USR-244508097630521-031308-29cafdb25ffb6404fba1f5e24e0c4599__LA_LD__-150216849";
  //access_token=APP_USR-244508097630521-051010-7af8baf16f142dd96dd3c2abb6507a16__B_I__-150216849

  //var token={"card_number": "4024007134824373","security_code": "123","expiration_month": 4,"expiration_year": 2020,"cardholder": {"name": "auto","identification": {"subtype": null,"type": "DNI","number": "12345678",}}};
    return {
      getPaymentMethods:function(){
        return $resource(base_url+'/v1/payment_methods'+public_key);
      },
      getIssuers:function(pmid){
        return $resource(base_url+'/v1/payment_methods/card_issuers'+public_key+"&payment_method_id=:payment_method_id",{ payment_method_id: pmid});
      },
      getInstallments:function(pmid,issuid,amm){
        return $resource(base_url+'/v1/payment_methods/installments'+public_key+"&payment_method_id=:payment_method_id&issuer.id=:issuer&amount=:ammount",{ payment_method_id: pmid,ammount:amm,issuer:issuid});
      },
      getIdentificationTypes:function(){
        return $resource(base_url+'/v1/identification_types'+public_key);
      },
      getPromos:function(){
        return $resource(base_url+'/v1/payment_methods/deals'+public_key);
      },
      createTonken:function(data){
        return $resource(base_url+'/v1/card_tokens'+public_key,data);
      },
      createPayment:function(data){
        return $resource("https://www.mercadopago.com/checkout/examples/doPayment",data);
      },
      grupos:function(){
        return $resource("https://api.mercadopago.com/beta/checkout/payment_methods/search/options"+public_key);
      },
      getPrefId:function(){
        return $resource("https://api.mercadolibre.com/checkout/preferences/"+prefid+"?access_token="+access_token);
      },
      setPrefId:function(dato){
        prefid=dato;
      },
      setAccess:function(dato){
        access_token=dato;
      }

    }
  })

.factory('ProductService', function () {
     return {
       getProduct: function(id) {
        var products=[{ id: '0', name: 'Funda Flip Cover Samsung Galaxy S4 Mini', image_url:'http://mla-s1-p.mlstatic.com/funda-flip-cover-samsung-galaxy-s4-mini-original-film-7290-MLA5178884614_102013-O.jpg', price: 150 },{ id: '1', name: 'Funda Flip Cover Samsung Galaxy S4 Mini', image_url:'http://mla-s1-p.mlstatic.com/funda-flip-cover-samsung-galaxy-s4-mini-original-film-7290-MLA5178884614_102013-O.jpg', price: 300 }];
        if (id!=null){
          return products[id];
        }
        else
          return products;
      }
    }
})