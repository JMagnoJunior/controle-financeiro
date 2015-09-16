var tabelaGastos = angular.module('tabelaGastosController', ['restangular']);

tabelaGastos.controller('TabelaGastosCntrl',['$scope','$filter','Restangular','$location',
    function($scope, $filter, Restangular, $location){
        $scope.sort = {
          sortingOrder : 'pessoa',
          reverse : false
        };

        Restangular.setBaseUrl("http://127.0.0.1:5000/api/v1/");
        Restangular.all('gastos').getList().then(function(gastos) {

            $scope.gastos = gastos;

            $scope.groupedItems = [];
            $scope.currentPage  = 0;
            $scope.itemsPerPage = 3;

            $scope.filteredItems = [];
            $scope.pagedItems = [];
            $scope.items = $scope.gastos;


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

            $scope.rangeTotalPaginas = function ( ) {
                  var ret = [];
                  start = 0;

                 end = $scope.pagedItems.length;

                 for (var i = start; i < end; i++) {
                      ret.push(i);
                 }

                 return ret;
             };


        })


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

        $scope.gastos_edit_list = []
        $scope.gravar_alteracoes = function(){
            // Restangular.one('gastos',id).get();

            for(var i=0; i < $scope.gastos.length; i++){
                for(linha_editada in $scope.lista_edicoes){
                    if($scope.lista_edicoes[linha_editada].id == $scope.gastos[i].id ){
                        $scope.gastos[i].patch($scope.lista_edicoes[linha_editada].edicoes)
                    }
                }
            }
            for(var i=0; i < $scope.gastos.length; i++){
                $scope.gastos[i].selecionado = false;
            }
            $scope.ocorreu_edicao = false;
        }

        $scope.selecionar = function(gasto){
            gasto.selecionado = true;
            $scope.ocorreu_edicao = true;
        }

        $scope.add_gastos_editados = function(gasto){
            index = $scope.gastos_edit_list.indexOf(gasto);
            if (index == -1){
                $scope.gastos_edit_list.push(gasto);
            }else{
                $scope.gastos_edit_list.splice(index, 1);
            }

        }
        $scope.lista_edicoes = []

        $scope.campo_editado = function(id, campo, valor){
            // [{'id' : id, 'edicoes':[{campo:valor}]}]
            var id_existente = false;
            var campo_existente = false;

            var c = {}
            c[campo] = valor

            for (var i=0; i < $scope.lista_edicoes.length; i++) {
                // na linha editada

                if($scope.lista_edicoes[i]['id'] == id){

                    len = $scope.lista_edicoes[i]['edicoes'].length
                    for(var j=0; j < len; j++){
                        // na coluna editada, se o campo já tiver na lista de edições

                        if(campo in $scope.lista_edicoes[i]['edicoes'][j]){
                            //remove o exisente
                            $scope.lista_edicoes[i]['edicoes'].splice(j, 1);
                            //add o novo
                            $scope.lista_edicoes[i]['edicoes'].push(c)
                            campo_existente = true;
                        }
                    }
                    if(!campo_existente){

                        $scope.lista_edicoes[i]['edicoes'].push(c)

                    }

                    id_existente = true;
                }
            }
            if(!id_existente){

                $scope.lista_edicoes.push({'id': id,'edicoes': [c]})

            }

        }
        $scope.go = function(path){            
            $location.path( path );
        }
    }
]);
