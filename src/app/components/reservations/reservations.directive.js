(function() {
    'use strict';

    angular.module('chorale.reservations')
        .directive('choraleConcertResa', ChoraleConcertResa);

    /** @ngInject */
    function ChoraleConcertResa() {
        return {
            restrict: 'E',
            scope: {
                concert: '=concert'
            },
            templateUrl: 'app/components/reservations/directive.html',
            controllerAs: 'resaDir',
            bindToController: true
        };
    }
})();