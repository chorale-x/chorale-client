(function() {
    'use strict';

    angular
        .module('chorale.subscribers')
        .factory('Subscriber', Subscriber);

    /** @ngInject */
    function Subscriber(DS) {
        return DS.defineResource({
            name: 'subscriber'
        });
    }
})();
