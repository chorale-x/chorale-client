(function() {
    'use strict';

    angular.module('chorale.comments')
        .directive('choraleComment', ChoraleCommentDirective)
        .controller('ChoraleCommentDirectiveController', ChoraleCommentDirectiveController);

    /** @ngInject */
    function ChoraleCommentDirective() {
        return {
            restrict: 'E',
            scope: {
                comment: '=comment',
                admin: '=?admin'
            },
            templateUrl: 'app/components/comments/directive.html',
            controller: 'ChoraleCommentDirectiveController',
            controllerAs: 'commentDir',
            bindToController: true
        };
    }

    /** @ngInject */
    function ChoraleCommentDirectiveController(Comment) {
        var vm = this;

        vm.trash = function(c) {
            c.deleted = true;
            c.DSSave();
        };
        vm.untrash = function(c) {
            c.deleted = false;
            c.DSSave();
        };
    }
})();