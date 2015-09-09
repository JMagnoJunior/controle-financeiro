var controlefinanceiroCntrl = angular.module('controlefinanceiroController', ['controlefinanceiroService']);

controlefinanceiroCntrl.controller('MenuCntrl',['$scope','MenuService',
    function($scope, MenuService){
            $scope.menus = MenuService.query();
    }
]);

controlefinanceiroCntrl.controller('GastosListCtrl', ['$scope','$filter','ControleFinanceiroService',
    function($scope, $filter,ControleFinanceiroService){
            $scope.sort = {
              sortingOrder : 'pessoa',
              reverse : false
            };

            $scope.gastos = ControleFinanceiroService.query(
                function(gastos){


                    $scope.groupedItems = [];
                    $scope.currentPage  = 0;
                    $scope.itemsPerPage = 3;

                    $scope.filteredItems = [];
                    $scope.pagedItems = [];
                    $scope.items = $scope.gastos


                    // init the filtered items
                    $scope.search = function () {
                        console.log($scope.sort.sortingOrder)

                        angular.forEach($scope.items, function (i) {
                           i.valor = parseFloat(i.valor);
                        });

                        $scope.filteredItems = $filter('orderBy')($scope.items, $scope.sort.sortingOrder, $scope.sort.reverse);

                        // now group by pages
                        $scope.groupToPages();
                    };


                      // calculate page in place
                      $scope.groupToPages = function () {
                          $scope.pagedItems = [];

                          for (var i = 0; i < $scope.filteredItems.length; i++) {

                              if (i % $scope.itemsPerPage === 0) {
                                  $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
                              } else {
                                  $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                              }
                          }
                      };

                    // functions have been describe process the data for display
                    $scope.search();

                    $scope.nextPage = function () {
                             if ($scope.currentPage < $scope.pagedItems.length - 1) {
                                 $scope.currentPage++;
                             }
                    };

                    $scope.prevPage = function () {
                        if ($scope.currentPage > 0) {
                            $scope.currentPage--;
                        }

                    };

                    $scope.setPage = function () {
                        $scope.currentPage = this.n;
                    };

                    $scope.rangeTotalPaginas = function ( ) {
                          var ret = [];
                          start = 0;

                         end = $scope.pagedItems.length;

                         for (var i = start; i < end; i++) {
                              ret.push(i);
                         }

                         return ret;
                     };

        });
        $scope.gastos_edit_list = []
        $scope.gravar_alteracoes = function(){
            
        }

        $scope.add_gastos_editados = function(gasto){
            index = $scope.gastos_edit_list.indexOf(gasto);
            if (index == -1){
                $scope.gastos_edit_list.push(gasto);
            }else{
                $scope.gastos_edit_list.splice(index, 1);
            }

        }
    }
]);
