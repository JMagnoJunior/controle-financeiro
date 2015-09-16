var inclusaoGastos = angular.module('inclusaoGastosController', ['restangular']);

inclusaoGastos.controller('InclusaoGastosCntrl',['$scope', 'Restangular',
function($scope, Restangular){
    // Restangular.setBaseUrl("http://127.0.0.1:5000/api/v1/");
    $scope.total_paginas = 1
    $scope.gastos = []

    $scope.range = function(valor){
        n = []
        for(var i = 0; i < valor; i ++){
            n.push(i)
        }
        return n;
    }

    $scope.add_linha = function(linha){
        if(linha == $scope.total_paginas -1){
            $scope.total_paginas = $scope.total_paginas + 1
        }
    }

    $scope.incluir = function(){
        // Restangular.setBaseUrl("http://127.0.0.1:5000/api/v1/");
        // Restangular.all('gastos').post('gasto':$scope.gasto)
        
    }
}]);
