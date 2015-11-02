(function() {
    'use strict';

    angular
        .module('chorale.me')
        .controller('MeHomeController', MeHomeController)
        .controller('MeChangePasswordController', MeChangePasswordController)
        .controller('MeEditController', MeEditController);

    /** @ngInject */
    function MeHomeController(AuthService, $log) {
        var vm = this;

        vm.me = AuthService.getUser();
    }

    /** @ngInject */
    function MeChangePasswordController() {
        //
    }

    /** @ngInject */
    function MeEditController(User, $state, AuthService, $localStorage, $log) {
        var vm = this;

        vm.me = AuthService.getUser();
        User.inject(vm.me);
        $log.debug(vm.me);

        vm.checkUsername = function() {
            return angular.isUndefined(vm.me.username) || vm.me.username.length <= 30;
        };

        vm.edit = function(u) {
            u.DSSave().then(function(res) {
                $localStorage.auth.user = res;
                $state.go('index.me.home');
            }, function(e) {
                $log.error(e);
            });
        };
    }
})();