(function() {
    'use strict';

    angular.module('chorale.concerts')
        .directive('choraleConcertDetailed', ChoraleConcertDetailed)
        .directive('choraleConcertShort', ChoraleConcertShort)
    ;

    /** @ngInject */
    function ChoraleConcertShort() {
        return {
            restrict: 'E',
            scope: {
                concert: '=concert',
                admin: '=?admin'
            },
            templateUrl: 'app/components/concerts/directive-short.html'
        };
    }

    /** @ngInject */
    function ChoraleConcertDetailed() {
        return {
            restrict: 'E',
            scope: {
                concert: '=concert'
            },
            templateUrl: 'app/components/concerts/directive.html'
        };
    }
})();