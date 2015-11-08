(function() {
    'use strict';

    angular
        .module('chorale.concerts')
        .controller('ConcertListController', ConcertListController)
        .controller('ConcertDetailController', ConcertDetailController)
        .controller('ConcertRemoveController', ConcertRemoveController);

    /** @ngInject */
    function ConcertListController(Concert, concerts, $log) {
        var vm = this;

        _.forEach(concerts, function(c) {
            c.pieces = _.sortBy(c.pieces, 'rank');
        });
        vm.concerts = concerts;

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
    function ConcertDetailController(Concert, concert, $log) {
        var vm = this;

        vm.concert = concert;

        vm.togglePublish = function(c) {
            c.published = !c.published;
            Concert.update(c.id, c);
        };
        vm.toggleAnnounce = function(c) {
            c.announced = !c.announced;
            Concert.update(c.id, c);
        };
        vm.toggleBooking = function(c) {
            c.booking = !c.booking;
            Concert.update(c.id, c);
        };
    }

    /** @ngInject */
    function ConcertRemoveController(Concert, concert, $state, $log) {
        var vm = this;

        vm.concert = concert;

        vm.trash = function(c) {
            Concert.destroy(c.id).then(function() {
                $state.go('index.concerts');
            }, function(e) {
                $log.error(e);
            });
        };
    }
})();
