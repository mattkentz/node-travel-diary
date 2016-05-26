'use strict';

angular.module('travelDiary.destinationList', []);
angular.module('travelDiary.destinationList').directive('destinationList', DestinationList);

function DestinationList () {
  return {
    templateUrl: 'modules/travel/destination-list.directive.html',
    controller: 'DestinationListController',
    controllerAs: 'destListCtrl',
    bindToController: true
  }
}

angular.module('travelDiary.destinationList').controller('DestinationListController', DestinationListController);

DestinationListController.$inject = ['DestinationListService'];

function DestinationListController (DestinationListService) {
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
      .success(function(data) {
          vm.destinations = data;
          console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };
}

angular.module('travelDiary.destinationList').service('DestinationListService', DestinationListService);

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
