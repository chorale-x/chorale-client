(function() {
    'use strict';

    angular
        .module('chorale.gallery')
        .factory('Gallery', Gallery);

    /** @ngInject */
    function Gallery(API, $resource) {
        return $resource(API.route('gallery/:id'), {}, {}, {stripTrailingSlashes: false});
    }
})();
