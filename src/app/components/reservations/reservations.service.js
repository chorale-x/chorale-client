(function() {
    'use strict';

    angular
        .module('chorale.reservations')
        .factory('Reservation', Reservation);

    /** @ngInject */
    function Reservation(API, $resource) {
        return $resource(API.route('reservations/:id'), {id: '@id'}, {
            query_concert: {method: 'GET', url: API.route('reservations/concert/:concert_id'), isArray: true},
            check: {method: 'PUT', url: API.route('reservations/check/:id')},
            uncheck: {method: 'PUT', url: API.route('reservations/uncheck/:id')},
            empty_concert: {method: 'DELETE', url: API.route('reservations/concert/:concert_id')}
        }, {stripTrailingSlashes: false});
    }
})();