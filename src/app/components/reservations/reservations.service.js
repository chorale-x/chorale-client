(function() {
    'use strict';

    angular
        .module('chorale.reservations')
        .factory('Reservation', Reservation);

    /** @ngInject */
    function Reservation(DS) {
        return DS.defineResource({
            name: 'reservation',
            relations: {
                belongsTo: {
                    concert: {
                        localField: '_concert',
                        localKey: 'concert'
                    }
                }
            }
        });
    }
})();
