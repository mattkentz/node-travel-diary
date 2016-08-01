angular.module('travelDiary.travelRoutes', ['ui.router']).config(routeConfiguration);

routeConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfiguration ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/destinations");

  $stateProvider
    .state('destinations', {
      url: "/destinations",
      templateUrl: "modules/travel/destinations.html"
    })
    .state('destination-details', {
      url: "/destination-details/:id",
      template: `<destination-details></destination-details>`
    });
}
