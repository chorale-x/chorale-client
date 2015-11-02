(function() {
    'use strict';

    angular
        .module('chorale.auth')
        .config(AuthRouter);

    /** @ngInject */
    function AuthRouter($stateProvider) {
        $stateProvider
            .state('index.login', {
                url: 'login',
                templateUrl: 'app/components/auth/login.html',
                controller: 'AuthController',
                controllerAs: 'authCtl'
            })
            .state('index.forgot-password', {
                url: "forgot-password",
                templateUrl: "app/components/auth/forgot-password.html",
                controller: 'PasswordController',
                controllerAs: 'pwdCtl'
            })
        ;
    }
})();