angular.module('StockSync')
    .directive('addSymbol', function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/add-symbol.html',
            controller: 'SymbolCtrl'
        };
    });