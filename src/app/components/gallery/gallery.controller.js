(function() {
    'use strict';

    angular
        .module('chorale.gallery')
        .controller('GalleryController', GalleryController);

    /** @ngInject */
    function GalleryController(Gallery, $window) {
        var vm = this;

        Gallery.query().$promise.then(function(imgs) {
            vm.images = imgs;
        });
        vm.openGallery = function(i) {
            var gallery = $window.blueimp.Gallery(vm.images, { index: i });
        };
    }
})();