angular.module('StockSync')
    .controller('SymbolCtrl', ['$scope', 'QuoteService', 'stockSocket', function($scope, QuoteService, stockSocket) {
       //[1] Push symbols received from server on 'join' event
        stockSocket.on('join', function(data) {
            data.symbols.forEach(function(sym) {
                QuoteService.register(sym);
            });
            $scope.generate($scope.scalebyStart);
        });
        //[2] On 'stock' event, register new symbol and update view
        stockSocket.on('stock', function(data) {

            QuoteService.register(data.symbol);
            $scope.generate($scope.scalebyStart);

        });
        
        //[3] Set up search object for handling user searches on symbols.
        $scope.search = {};
        $scope.search.text = "";
        $scope.search.results = [];
         $scope.$watch('search.text', function(newValue) {
            QuoteService.search(newValue).then(function(response) {
                $scope.search.results = response.results;
            });
        });
        
        //[4] Register handles adding new symbols; trigged when user clicks on search result.
        //The idea is try to add the symbol locally (not possible if there is no data for the symbol in the range),
        // and, if this can be done, push the symbol to server.
        $scope.register = function(symbol) {
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
    }]);