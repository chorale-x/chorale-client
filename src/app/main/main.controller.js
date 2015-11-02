(function() {
    'use strict';

    angular
        .module('chorale')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(AuthService, $uibModal, $state) {
        var vm = this;

        vm.user = null;

        vm.isLoggedIn = function() {
            return AuthService.isAuthenticated();
        };

        vm.logout = function() {
            vm.user = null;
            AuthService.logout();
            $state.go('index.home');
        };
        
        vm.loginOpen = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: "app/components/auth/login.html",
                controller: 'AuthController',
                controllerAs: 'authCtl',
                size: size
            });

            modalInstance.result.then(function (user) {
                vm.user = user;
            });
        };
    }
})();
