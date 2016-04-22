angular.module('StockSync')
    .controller('SymbolCtrl', ['$scope', 'QuoteService', function($scope, QuoteService) {
        $scope.search = {};
        $scope.search.text = "";
        $scope.search.results = [];
        $scope.register = function(symbol) {
            if(QuoteService.showSymbols().indexOf(symbol) === -1){
            QuoteService.register(symbol);
            $scope.generate($scope.scalebyStart);}
        };
        $scope.$watch('search.text', function(newValue) {
            QuoteService.search(newValue).then(function(response) {
                console.log(response);
                $scope.search.results = response.results;
            });
        });

    }]);