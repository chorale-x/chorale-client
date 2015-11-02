(function() {
    'use strict';

    angular
        .module('chorale.users')
        .controller('UsersListController', UsersListController)
        .controller('UsersDetailsController', UsersDetailsController)
        .controller('UsersAddController', UsersAddController);

    /** @ngInject */
    function UsersListController(users_list) {
        var vm = this;

        vm.users_list = users_list;
    }

    /** @ngInject */
    function UsersDetailsController(User, user, $state, $stateParams, $log) {
        var vm = this;

        vm.user = user;

        vm.enable = function(u) {
            u.is_active = true;
            u.DSSave().then(function(ru) {
                $log.debug('Compte réactivé avec succès.');
                vm.user = ru;
            }, function(error) {
                $log.error(error);
            });
        };

        vm.disable = function(u) {
            u.is_active = false;
            u.DSSave().then(function(ru) {
                $log.debug('Compte désactivé avec succès.');
                vm.user = ru;
            }, function(error) {
                $log.error(error);
            });
        };

        vm.remove = function(u) {
            if (confirm("Cette opération est irréversible. Es-tu sûr de vouloir supprimer cet utilisateur ?")) {
                u.DSDestroy();
                $state.go('index.users.list');
            }
        };
    }

    /** @ngInject */
    function UsersAddController(User, $state, $log) {
        var vm = this;

        vm.user = User.createInstance();
        vm.user.password = '';
        vm.valid = false;
        vm.identicalPwd = true;
        vm.password_confirm = '';

        vm.checkUsername = function() {
            return angular.isUndefined(vm.user.username) || vm.user.username.length <= 30;
        };

        vm.checkPwd = function() {
            if (vm.user.password == vm.password_confirm) {
                vm.identicalPwd = true;
                if (vm.user.password != '') {
                    vm.valid = true;
                } else {
                    vm.valid = false;
                }
            } else {
                vm.identicalPwd = false;
                vm.valid = false;
            }
        };

        vm.add = function(u) {
            u.DSCreate().then(function(ru) {
                $log.debug(ru);
                $state.go('index.users.list');
            }, function(e) {
                $log.error(e);
            });
        };
    }
})();