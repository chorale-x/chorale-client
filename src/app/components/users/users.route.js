(function() {
    'use strict';

    angular
        .module('chorale.users')
        .config(UsersRouter);

    /** @ngInject */
    function UsersRouter($stateProvider) {
        $stateProvider
            .state('index.users', {
                url: "users",
                // abstract: true,
                template: "<ui-view />"
            })
                .state('index.users.list', {
                    url: "/",
                    templateUrl: "app/components/users/list.html",
                    controller: 'UsersListController',
                    controllerAs: 'usersListCtl',
                    resolve: {
                        users_list: function(User) {
                            return User.findAll();
                        }
                    }
                })
                .state('index.users.add', {
                    url: "/add",
                    templateUrl: "app/components/users/add.html",
                    controller: 'UsersAddController',
                    controllerAs: 'usersAddCtl'
                })
                .state('index.users.details', {
                    url: "/:id",
                    templateUrl: "app/components/users/details.html",
                    controller: 'UsersDetailsController',
                    controllerAs: 'usersDetCtl',
                    resolve: {
                        user: function(User, $stateParams) {
                            return User.find($stateParams.id);
                        }
                    }
                })
        ;
    }
})();