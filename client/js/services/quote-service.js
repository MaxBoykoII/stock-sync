angular.module('StockSync')
    .service('QuoteService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        $rootScope.symbols = [];

        //[1] Helper functions for managing tracked symbols;
        this.showSymbols = function() {
            return $rootScope.symbols;
        };
        this.register = function(symbol) {
            $rootScope.symbols.push(symbol);
        };
        this.remove = function(symbol) {
           _.remove($rootScope.symbols, function(sym) {
                return sym === symbol;
            });
        };
        //[2] Main processing functions for interacting with server api
        this.fetch = function() {
            var deferred = $q.defer(),
                selection = $rootScope.symbols.map(function(el) {
                    el = '"' + el.replace(/"/g, '') + '"';
                    return el;
                }).join(', '),
                query = 'select * from yahoo.finance.historicaldata where symbol in (' + selection + ') and startDate = "2009-09-11" and endDate = "2010-03-10"';

            $http.get('api/stocks?symbols=' + query).then(function(res) {
                var data = res.data.body.query.results.quote,
                    quotesbySymbol = [];

                for (var i = 0, l = $rootScope.symbols.length; i < l; i++) {
                    quotesbySymbol.push(data.filter(function(el) {
                        return el.Symbol === $rootScope.symbols[i];
                    }).map(function(el) {
                        return {
                            "Symbol": el.Symbol,
                            "Close": parseFloat(el.Close),
                            "Date": new Date(el.Date)
                        };
                    }));
                    deferred.resolve({
                        result: quotesbySymbol
                    });
                }
            }, function() {
                deferred.reject();
            });
            return deferred.promise;
        };
        this.search = function(search) {
            var deferred = $q.defer();
            $http.get('/api/stocks/' + search).then(function(res) {
                deferred.resolve({
                    results: res.data.results
                }, function() {
                    deferred.reject();
                });
            });
            return deferred.promise;
        };
    }]);