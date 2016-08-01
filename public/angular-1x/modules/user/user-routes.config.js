angular.module('user.routes', ['ui.router']).config(routeConfiguration);

routeConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfiguration ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/destinations");

    $stateProvider
        .state('register', {
            url: "/register",
            template: "<user-registration></user-registration>"
        });
}
