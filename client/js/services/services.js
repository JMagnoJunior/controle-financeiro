
var controlefinanceiroService = angular.module('controlefinanceiroService',['ngResource'])

controlefinanceiroService.factory('MenuService', ['$resource',
  function($resource){
    return $resource('http://127.0.0.1:5000/api/v1/menus', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }
]);

controlefinanceiroService.factory('ControleFinanceiroService', ['$resource',
  function($resource){
    return $resource('http://127.0.0.1:5000/api/v1/gastos', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }
]);
