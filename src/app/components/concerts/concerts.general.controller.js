(function() {
    'use strict';

    angular
        .module('chorale.concerts')
        .controller('ConcertListController', ConcertListController)
        .controller('ConcertDetailController', ConcertDetailController)
        .controller('ConcertRemoveController', ConcertRemoveController);

    /** @ngInject */
    function ConcertListController(Concert, $log) {
        var vm = this;

        Concert.findAll().then(function(concerts) {
            _.forEach(concerts, function(c) {
                c.pieces = _.sortBy(c.pieces, 'rank');
            });
            vm.concerts = concerts;
        });

        Concert.next().then(function(c) {
            vm.theresNext = c.data.length == 1;
            if (c.data.length == 1) {
                vm.next_concert = c.data[0];
            } else {
                vm.next_concert = null;
            }
            $log.debug(vm.theresNext);
        });

        vm.afterNow = function(p) {
            return function(i) {
                return moment(i[p]).isAfter();
            };
        };
        vm.beforeNow = function(p) {
            return function(i) {
                return moment(i[p]).isBefore();
            };
        };
    }

    /** @ngInject */
    function ConcertDetailController(Concert, $stateParams, $log) {
        var vm = this;

        Concert.find($stateParams.id).then(function(c) {
            vm.concert = c;
            $log.debug(c);
        });

        vm.togglePublish = function(c) {
            c.published = !c.published;
            c.DSSave();
        };
        vm.toggleAnnounce = function(c) {
            c.announced = !c.announced;
            c.DSSave();
        };
        vm.toggleBooking = function(c) {
            c.booking = !c.booking;
            c.DSSave();
        };
    }

    /** @ngInject */
    function ConcertRemoveController(Concert, $stateParams, $state, $log) {
        var vm = this;

        Concert.find($stateParams.id).then(function(c) {
            vm.concert = c;
        });
        
        vm.trash = function(c) {
            c.DSDestroy().then(function() {
                $state.go('index.concerts.list');
            }, function(e) {
                $log.error(e);
            });
        };
    }
})();