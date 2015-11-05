(function() {
    'use strict';

    angular
        .module('chorale.comments')
        .controller('CommentsController', CommentsController);

    /** @ngInject */
    function CommentsController(Comment, $scope, $location, $log, AuthService) {
        var vm = this;

        Comment.findAll().then(function(c) {
            vm.comments = c;
            $log.debug(vm.comments);
        });

        vm.filterDeleted = function() {
            if (AuthService.isAuthenticated()) {
                return '';
            } else {
                return {
                    deleted: false
                };
            }
        }

        vm.goToForm = function() {
            $location.hash('formComment');
        };

        vm.comment = Comment.createInstance();
        vm.add = function(c) {
            Comment.create(c).then(function(cc) {
                Comment.findAll().then(function(coms) {
                    $log.debug(coms);
                    vm.comments = coms;
                });
                vm.comment = Comment.createInstance();
            }, function(e) {
                $log.error(e);
            });
        };
    }
})();
