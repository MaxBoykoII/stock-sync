'use strict';

angular.module('StockSync').controller('MainCtrl', ['$scope', 'QuoteService', '$q', function ($scope, QuoteService, $q) {
    //[1] Initialize chart variables
    $scope.chartObject = {};
    $scope.chartObject.options = {
        displayAnnotations: false,
        thickness: 2,
        displayRangeSelector: false,
        displayZoomButtons: false

    };
    $scope.chartObject.data = {};
    $scope.chartObject.type = "AnnotationChart";

    //[2] Helper function for row and column creation
    function rowAndColCreate(scaledData) {
        var cols = [{
            "id": "date",
            "label": "Date",
            "type": "date"
        }];
        QuoteService.showSymbols().forEach(function (symbol) {
            cols.push({
                "id": symbol,
                "label": symbol,
                "type": "number"
            });
        });
        var rows = [];

        function rowCreate(i) {
            var row = {
                c: [{
                    v: scaledData[0][i].Date
                }]
            };
            scaledData.forEach(function (arr) {
                row.c.push({
                    v: arr[i].Close
                });
            });

            return row;
        }

        for (var i = 0, l = scaledData[0].length; i < l; i++) {
            rows.push(rowCreate(i));
        }
        $scope.chartObject.data = {
            "cols": cols,
            "rows": rows
        };
    }

    //[3] scaling functions for scaling data from QuoteService
    $scope.scalebyStart = function (data) {
        var scaledData = data.map(function (arr) {

            return arr.map(function (el, i, arr) {
                var l = arr.length,
                    lastClose = arr[l - 1].Close;

                return {
                    "Symbol": el.Symbol,
                    "Close": parseFloat(el.Close / lastClose * 100),
                    "Date": new Date(el.Date)
                };
            });
        });
        rowAndColCreate(scaledData);
    };
    //[4] function to generate rows and columns using scaled data
    $scope.generate = function (scalingFunction) {
        var deferred = $q.defer();

        QuoteService.fetch().then(function (data) {
            scalingFunction(data.result);
            deferred.resolve();
        }, function () {
            deferred.reject();
        });
        return deferred.promise;
    };
}]);
//# sourceMappingURL=main.js.map