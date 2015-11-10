(function() {
  'use strict';

  angular
    .module('chorale', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'angularMoment',
        'bootstrapLightbox',
        'js-data',
        'angularFileUpload',

        'chorale.auth',

        'chorale.home',
        'chorale.static',
        'chorale.comments',
        'chorale.gallery',
        'chorale.concerts',
        'chorale.reservations',
        'chorale.users',
        'chorale.me',
        'chorale.subscribers'
    ]);

})();
