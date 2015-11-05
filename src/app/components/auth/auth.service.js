(function() {
    'use strict';

    angular
        .module('chorale.auth')
        .factory('AuthService', AuthService)
        .factory('AuthInterceptor', AuthInterceptor);

    /** @ngInject */
    function AuthService($injector, $localStorage, $q, API, $location, User) {
        if (angular.isUndefined($localStorage.auth)) {
            $localStorage.auth = {
                token: null,
                user: null
            };
        }
        return {
            login: function(credentials) {
                return $injector.get('$http').post(API.route('api-token-auth/'), credentials).then(
                    function(response) {
                        $localStorage.auth.token = response.data.token;
                        User.me().then(function(me) {
                            User.inject(me.data);
                            User.find(me.data.id).then(function(u) {
                                $localStorage.auth.user = u;
                            });
                        });
                    },
                    function(response) {
                        $localStorage.auth.token = null;
                        $localStorage.auth.user = null;
                        return $q.reject(response);
                    });
            },
            logout: function() {
                $localStorage.auth.token = null;
                $localStorage.auth.user = null;
                $location.path('/');
            },
            isAuthenticated: function() {
                return $localStorage.auth.token !== null;
            },
            getToken: function() {
                return $localStorage.auth.token;
            },
            getUser: function() {
                return $localStorage.auth.user;
            }
        };
    }

    /** @ngInject */
    function AuthInterceptor(AuthService, $q, $injector) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if (AuthService.isAuthenticated() && !/angularjs/.test(config.url)) {
                    config.headers.Authorization = 'JWT ' + AuthService.getToken();
                }
                return config || $q.when(config);
            },
            response: function(response) {
                if (response.status === 401) {
                    AuthService.logout();
                    $injector.get('$state').go('index.login');
                }
                return response || $q.when(response);
            },
            responseError: function(response) {
                if (response.status === 401) {
                    AuthService.logout();
                    $injector.get('$state').go('index.login');
                }
                return $q.reject(response);
            }
        };
    }

})();
