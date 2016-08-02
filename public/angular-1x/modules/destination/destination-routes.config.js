angular.module('destination.routes', ['ui.router']).config(routeConfiguration);

routeConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfiguration ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/destinations");

  $stateProvider
    .state('destinations', {
      url: "/destinations",
      templateUrl: "modules/destination/destinations.html"
    })
    .state('destination-details', {
      url: "/destination-details/:id",
      template: `<destination-details></destination-details>`
    });
}
