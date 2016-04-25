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
            console.log(symbol);
            var before = QuoteService.showSymbols().length;

            if (QuoteService.showSymbols().indexOf(symbol) === -1) {
                console.log(before);
                QuoteService.register(symbol);
                $scope.generate($scope.scalebyStart).then(function() {
                    //don't send symbol to array on server if it was removed from symbols array
                    //on account of missing data
                    if (before !== QuoteService.showSymbols().length) {
                        stockSocket.emit('stock', {
                            symbol: symbol
                        });
                    }
                });
            }
        };
        $scope.$watch('search.text', function(newValue) {
            QuoteService.search(newValue).then(function(response) {
                $scope.search.results = response.results;
            });
        });

    }]);