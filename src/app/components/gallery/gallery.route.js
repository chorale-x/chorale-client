(function() {
    'use strict';

    angular
        .module('chorale.gallery')
        .config(GalleryRouter);

    /** @ngInject */
    function GalleryRouter($stateProvider) {
        $stateProvider
            .state('index.gallery', {
                url: 'galerie',
                templateUrl: "app/components/gallery/gallery.html",
                controller: 'GalleryController',
                controllerAs: 'galleryCtl'
            })
        ;
    }
})();