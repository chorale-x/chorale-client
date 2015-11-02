(function() {
    'use strict';

    angular
        .module('chorale.me')
        .config(MeRouter);

    /** @ngInject */
    function MeRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/me', '/me/');
        $stateProvider
            .state('index.me', {
                url: "me",
                // abstract: true,
                template: "<ui-view />",
            })
                .state('index.me.home', {
                    url: "/",
                    templateUrl: "app/components/me/home.html",
                    controller: 'MeHomeController',
                    controllerAs: 'meHomeCtl'
                })
                .state('index.me.change_pwd', {
                    url: "/change-password",
                    templateUrl: "app/components/me/change-pwd.html",
                    controller: 'MeChangePasswordController',
                    controllerAs: 'mePwdCtl'
                })
                .state('index.me.edit', {
                    url: "/edit",
                    templateUrl: "app/components/me/edit.html",
                    controller: 'MeEditController',
                    controllerAs: 'meEditCtl'
                })
        ;
    }
})();