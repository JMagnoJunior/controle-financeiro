
var app = angular.module('controlefinanceiroApp', [
      'ngRoute',
      'controlefinanceiroController',
      'controlefinanceiroDirective',
      'controlefinanceiroService'
]);

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller:'GastosListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
