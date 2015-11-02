(function() {
    'use strict';

    angular.module('chorale')
        .factory('HttpRequestInterceptor', HttpRequestInterceptor);

    /** @ngInject */
    function HttpRequestInterceptor($q, $location) {
        return {
            'responseError': function(rejection) {
                // do something on error
                if(rejection.status === 404){
                    $location.path('/404');                    
                }
                return $q.reject(rejection);
             }
         };
    }
})();