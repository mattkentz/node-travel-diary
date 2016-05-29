angular.module('travelDiary.travelRoutes', ['ui.router']).config(routeConfiguration);

routeConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfiguration ($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise("/");

  $stateProvider
    .state('destinations', {
      url: "/",
      templateUrl: "modules/travel/destinations.html"
    });
}
