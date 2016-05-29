'use strict';

angular.module('travelDiary.destinationDetails', []);
angular.module('travelDiary.destinationDetails').directive('destinationDetails', DestinationDetails);

function DestinationDetails () {
  return {
    templateUrl: 'modules/travel/destination-details.directive.html',
    controller: 'DestinationDetailsController',
    controllerAs: 'destDetCtrl',
    bindToController: true
  }
}

angular.module('travelDiary.destinationDetails').controller('DestinationDetailsController', DestinationDetailsController);

DestinationDetailsController.$inject = ['$stateParams','DestinationDetailsService'];

function DestinationDetailsController ($stateParams, DestinationDetailsService) {
  var vm = this;
  vm.init = init;
  vm.getDestinationDetails = getDestinationDetails;
  vm.deleteDestination = deleteDestination;

  vm.init();

  function init() {
    if ($stateParams.id) {
      getDestinationDetails($stateParams.id);
    }
  }

  function getDestinationDetails(id) {
    DestinationDetailsService.getDestinationDetails(id)
    .success(function getDestinationDetailsSuccess(data) {
        vm.destination = data;
    })
    .error(function getDestinationDetailsError(data) {
        console.log('Error: ' + data);
        vm.destination = null;
    });
  }

  function deleteDestination() {
    DestinationDetailsService.deleteDestination(vm.destination._id)
      .success(function(data) {
          vm.destination = null;
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };
}

angular.module('travelDiary.destinationDetails').service('DestinationDetailsService', DestinationDetailsService);

DestinationDetailsService.$inject = ['$http'];

function DestinationDetailsService ($http) {

  var DestinationDetailsService = {
    getDestinationDetails : getDestinationDetails,
    deleteDestination : deleteDestination
  };

  function getDestinationDetails(id) {
    return $http.get(`/api/destinations/${id}`);
  }

  function deleteDestination(id) {
    return $http.delete(`/api/destinations/${id}`);
  };

  return DestinationDetailsService;
}
