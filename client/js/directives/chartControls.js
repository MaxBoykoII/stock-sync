angular.module('StockSync')
    .directive('chartControls', function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/chart-controls.html',
            controller: 'ChartCtrl'
        };
    });