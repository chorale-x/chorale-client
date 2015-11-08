(function() {
    'use strict';

    angular
        .module('chorale.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(Concert, $log) {
        var vm = this;

        Concert.next().then(function(resp) {
            if (resp.data.length > 0){
                vm.theresNext = true;
                vm.next_concert = resp.data[0];
            } else {
                vm.theresNext = false;
            }
        });
    }
})();
