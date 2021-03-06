'use strict';

angular.module('destination.destinationList', []);
angular.module('destination.destinationList').directive('destinationList', DestinationList);

function DestinationList () {
  return {
    templateUrl: 'modules/destination/destination-list.directive.html',
    controller: 'DestinationListController',
    controllerAs: 'destListCtrl',
    bindToController: true
  }
}

angular.module('destination.destinationList').controller('DestinationListController', DestinationListController);

DestinationListController.$inject = ['$rootScope','DestinationListService'];

function DestinationListController ($rootScope, DestinationListService) {
  var vm = this;
  vm.init = init;
  vm.getDestinations = getDestinations;
  vm.deleteDestination = deleteDestination;

  vm.init();

  function init() {
    getDestinations();
  }

  function getDestinations() {
    DestinationListService.getDestinations()
    .success(function getDestinationsSuccess(data) {
        vm.destinations = data;
    })
    .error(function getDestinationsError(data) {
        console.log('Error: ' + data);
        vm.destinations = null;
    });
  }

  function deleteDestination(id) {
    DestinationListService.deleteDestination(id)
      .success(function(resp) {
          if (resp.status !== 401 && resp) {
            vm.destinations = resp;
          }
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };

  var destinationUpdateListener = $rootScope.$on('destinations-updated', function (event, data) {
    vm.destinations = data;
  });
}

angular.module('destination.destinationList').service('DestinationListService', DestinationListService);

DestinationListService.$inject = ['$http'];

function DestinationListService ($http) {

  var DestinationListService = {
    getDestinations : getDestinations,
    deleteDestination : deleteDestination
  };

  function getDestinations() {
    return $http.get('/api/destinations');
  }

  function deleteDestination(id) {
    return $http.delete('/api/destinations/' + id);
  };

  return DestinationListService;
}
