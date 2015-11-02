(function() {
    'use strict';

    angular
        .module('chorale')
        .config(config)
        .filter('civility', civilityFilter)
        .filter('nl2br', nl2brFilter);

    /** @ngInject */
    function config($logProvider, $httpProvider, DSProvider, DSHttpAdapterProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        $httpProvider.interceptors.push('AuthInterceptor');
        // $httpProvider.interceptors.push('HttpRequestInterceptor');

        angular.extend(DSProvider.defaults, {});
        angular.extend(DSHttpAdapterProvider.defaults, {
            basePath: 'http://127.0.0.1:8000',
            forceTrailingSlash: true
        });
    }

    /** @ngInject */
    function civilityFilter() {
        return function(text) {
            if (text == 'Monsieur') {
                return 'M.';
            } else if (text == 'Madame') {
                return 'Mme';
            } else {
                return '';
            }
        };
    }

    /** @ngInject */
    function nl2brFilter() {
        return function(text) {
            return text ? text.replace(/\n/g, '<br/>') : '';
        };
    }
})();
