angular.module('StockSync')
    .controller('ChartCtrl', ['$scope', 'QuoteService', 'stockSocket', '$rootScope', function($scope, QuoteService, stockSocket, $rootScope) {
        $rootScope.$watch('symbols', function(newValue) {
            $scope.symbols = newValue;
        });
        stockSocket.on('remove', function(data) {
            var symbol = data.symbol;
            QuoteService.remove(symbol);
            $scope.generate($scope.scalebyStart);
        });
        $scope.remove = function(symbol) {
            if ($rootScope.symbols.length > 1) {
                QuoteService.remove(symbol);
                $scope.generate($scope.scalebyStart);
                stockSocket.emit('remove', {
                    symbol: symbol
                });
            }
            else {
                alert("The chart must have at least one symbol.");
            }
        };
    }]);