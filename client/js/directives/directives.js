// var controlefinanceiroDirective = angular.module('controlefinanceiroDirective',['controlefinanceiroController'])

controlefinanceiroDirective.directive("customSort",[
function() {
    return {
        restrict: 'A',
        transclude: true,
        controller: "GastosListCtrl",
        scope: {
          order: '=',
          sort: '=',
          func: '='
        },
        template :
          ' <a ng-click="sort_by(order)" style="color: #555555;">'+
          '    <span ng-transclude></span>'+
          '    <i ng-class="selectedCls(order)"></i>'+
          '</a>',
        link: function(scope, e, a,GastosListCtrl) {

        // change sorting order
        scope.sort_by = function(newSortingOrder) {

            var sort = scope.sort;

            if (sort.sortingOrder == newSortingOrder){
                sort.reverse = !sort.reverse;
            }

            sort.sortingOrder = newSortingOrder;
            scope.func()
        };

        scope.selectedCls = function(column) {
            if(column == scope.sort.sortingOrder){
                return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
            }
            else{
                return'icon-sort'
            }
        };

      }// end link
}
}])
