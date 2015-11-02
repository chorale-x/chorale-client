(function() {
    'use strict';

    angular
        .module('chorale.static', [])
        .config(StaticRouter);

    /** @ngInject */
    function StaticRouter($stateProvider) {
        $stateProvider
            .state('index.presentation', {
                url: 'presentation',
                templateUrl: 'app/components/static/presentation.html'
            })
            .state('index.liens', {
                url: 'liens',
                templateUrl: 'app/components/static/liens.html'
            })
        ;
    }
})();