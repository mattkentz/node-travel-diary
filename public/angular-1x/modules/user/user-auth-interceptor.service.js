'use strict';

angular.module('user.authInterceptor', []);
angular.module('user.authInterceptor').service('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['x-access-token'] = $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (error) {
            if (error.status === 401) {
                delete $window.sessionStorage.token;
            }
            return error || $q.when(error);
        }
    };
});

angular.module('user.authInterceptor').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});