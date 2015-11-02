(function() {
    'use strict';

    angular
        .module('chorale')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: "/",
                abstract: true,
                views: {
                    '@': {
                        templateUrl: "app/main/layout.html",
                        controller: 'MainController',
                        controllerAs: 'main'
                    }
                }
            })
                .state('index.notfound', {
                    url: "/404",
                    templateUrl: "app/main/404.html"
                });

        $urlRouterProvider.otherwise('/home');
    }

})();
