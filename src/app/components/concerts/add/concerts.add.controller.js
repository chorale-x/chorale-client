(function() {
    'use strict';

    angular
        .module('chorale.concerts')
        .controller('ConcertAddController', ConcertAddController)
        .controller('ConcertAddGeneralController', ConcertAddGeneralController);

    /** @ngInject */
    function ConcertAddController($state) {
        var vm = this;

        var steps_name = ['general', 'pieces', 'soloists', 'musicians', 'validation'];

        vm.steps = function(name) {
            var curStateW = $state.$current.name.split('.');
            var curState = _.last(curStateW);
            if (_.indexOf(steps_name, name) > _.indexOf(steps_name, curState)) {
                return 'progress-bar-danger';
            } else if (_.indexOf(steps_name, name) == _.indexOf(steps_name, curState)) {
                return 'progress-bar-warning';
            } else {
                return 'progress-bar-success';
            }
        };
    }

    /** @ngInject */
    function ConcertAddGeneralController(Concert, $state, $log) {
        var vm = this;

        vm.concert = new Concert();
        vm.concert_date = moment().set('hour', 20).set('minute', 0).toDate();
        vm.opened = false;

        vm.add = function(c) {
            vm.concert_date.setMinutes(vm.concert_date.getMinutes() - vm.concert_date.getTimezoneOffset());
            c.date = vm.concert_date.toISOString();
            $log.debug(c);
            c.$save().then(function(rc) {
                $state.go('index.concerts.add.pieces', {id: rc.id});
            }, function(e) {
                $log.error(e);
                vm.concert_date.setMinutes(vm.concert_date.getMinutes() + vm.concert_date.getTimezoneOffset());
            });
        };

        // Utils functions for date-/time-picker
        vm.time_change = function() {
            if (vm.ngModel && vm.time) {
                vm.ngModel.setHours(vm.time.getHours(), vm.time.getMinutes());
                vm.ngModel = new Date(vm.ngModel);
            }
        };
        vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        };
    }
})();