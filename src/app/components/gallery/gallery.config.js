(function() {
    'use strict';

    angular.module('chorale.gallery')
        .config(galleryConfig);

    /** @ngInject */
    function galleryConfig(LightboxProvider) {
        LightboxProvider.templateUrl = 'app/components/gallery/lightbox.html';
    }
})