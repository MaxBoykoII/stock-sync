angular.module('StockSync')
    .factory('stockSocket', ['socketFactory', function(socketFactory) {
        return socketFactory();
    }]);