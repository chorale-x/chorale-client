(function() {
    'use strict';

    angular.module('chorale.home')
        .config(HomeRouter);

    /** @ngInject */
    function HomeRouter($stateProvider) {
        $stateProvider
            .state('index.home', {
                url: 'home',
                templateUrl: "app/components/home/home.html",
                controller: 'HomeController',
                controllerAs: 'home'
            })
        ;
    }
})();