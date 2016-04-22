angular.module('StockSync')
    .controller('SymbolCtrl', ['$scope', 'QuoteService', 'stockSocket', function($scope, QuoteService, stockSocket) {
        stockSocket.on('join', function(data) {
            data.symbols.forEach(function(sym) {
                QuoteService.register(sym);
            });
            $scope.generate($scope.scalebyStart);
        });
        stockSocket.on('stock', function(data) {

            QuoteService.register(data.symbol);
            $scope.generate($scope.scalebyStart);

        });
        $scope.search = {};
        $scope.search.text = "";
        $scope.search.results = [];
        $scope.register = function(symbol) {
            if (QuoteService.showSymbols().indexOf(symbol) === -1) {
                QuoteService.register(symbol);
                $scope.generate($scope.scalebyStart);
                stockSocket.emit('stock', {
                    symbol: symbol
                });
            }
        };
        $scope.$watch('search.text', function(newValue) {
            QuoteService.search(newValue).then(function(response) {
                $scope.search.results = response.results;
            });
        });

    }]);