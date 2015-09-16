
var app = angular.module('controlefinanceiroApp', [
      'ngRoute',
    //   'controlefinanceiroController',
      'tabelaGastosController',
      'inclusaoGastosController',
    //   'controlefinanceiroDirective',
    //   'controlefinanceiroService'
]);

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        // controller:'GastosListCtrl'
        controller:'TabelaGastosCntrl'
      }).
      when('/incluir_gastos', {
        templateUrl: 'partials/incluir_gastos.html',
        // controller:'GastosListCtrl'
        controller:'InclusaoGastosCntrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
