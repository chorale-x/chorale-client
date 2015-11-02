(function() {
    'use strict';

    angular
        .module('chorale.comments')
        .controller('CommentsController', CommentsController);

    /** @ngInject */
    function CommentsController(Comment, $location, $log, AuthService) {
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
            c.DSCreate({cacheResponse: true}).then(function(cc) {
                // Comment.findAll({bypassCache: true}).then(function(cc) { 
                //     vm.comments = cc; 
                // });
                vm.comment = Comment.createInstance();
                Comment.findAll().then(function(nc) {
                    $log.debug(nc);
                });
            }, function(e) {
                $log.error(e);
            });
        };
    }
})();