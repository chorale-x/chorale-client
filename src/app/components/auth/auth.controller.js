(function() {
    'use strict';

    angular
        .module('chorale.auth')
        .controller('AuthController', AuthController)
        .controller('PasswordController', PasswordController);

    /** @ngInject */
    function AuthController($state, AuthService, $timeout, $modalInstance) {
        var vm = this;

        $timeout(function () {
            document.getElementById("usernameInput").focus();
        }, 300);

        vm.alerts = [];
        vm.credentials = {
            username: '',
            password: ''
        };

        vm.connexion = function (login) {
            vm.loginError = false;
            vm.inLogin = true;
            AuthService.login(login).then(
                function(user) {
                    vm.login = {username: '', password: ''};
                    vm.inLogin = false;
                    $modalInstance.close(user);
                }, function() {
                    vm.loginError = true;
                    vm.alerts.push({type: 'danger', msg: 'Échec de l\'authentification.'});
                    vm.login.password = '';
                    vm.inLogin = false;
                }
            );
        };
        
        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };

        vm.cancel = function(dest) {
            $modalInstance.dismiss('cancel');
            if (dest == 'forgot') {
                $state.go('index.forgot-password');
            }
        };
    }

    /** @ngInject */
    function PasswordController() { // depends on 'User'
        var vm = this;

        vm.email = '';

        // vm.generatePwd = function(email) {
        //     User.forgot_password({email: email}).$promise.then(function(res) {
        //         console.log(res);
        //     }, function(error) {
        //         console.log(error);
        //     });
        // };
    }
})();