(function() {
    'use strict';

    angular
        .module('chorale.comments')
        .factory('Comment', Comment);

    /** @ngInject */
    function Comment(DS) {
        return DS.defineResource('comment');
    }
})();