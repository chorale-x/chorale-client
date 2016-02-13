(function() {
    'use strict';

    angular
        .module('chorale')
        .factory('API', APIService);

    /** @ngInject */
    function APIService($location) {
        return {
            route: function(path) {
                if (!_.endsWith(path, '/')) {
                    path = path + '/'; // Django wants trailing slash
                }
                if (!_.startsWith(path, '/')) {
                    path = '/' + path;
                }
                if (/localhost/.test($location.absUrl())) {
                    return 'http://127.0.0.1:8000' + path;
                } else {
                    return 'http://api.chorale.binets.fr' + path;
                }
            }
        };
    }
})();
