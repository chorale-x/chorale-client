(function() {
    'use strict';

    angular
        .module('chorale.comments')
        .config(CommentsRouter);

    /** @ngInject */
    function CommentsRouter($stateProvider) {
        $stateProvider
            .state('index.comments', {
                url: 'comments',
                templateUrl: "app/components/comments/list.html",
                controller: 'CommentsController',
                controllerAs: 'commentCtl'
            })
        ;
    }
})();
