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

DestinationDetailsController.$inject = ['$scope','$stateParams','DestinationDetailsService'];

function DestinationDetailsController ($scope, $stateParams, DestinationDetailsService) {
  var vm = this;
  vm.init = init;
  vm.getDestinationDetails = getDestinationDetails;
  vm.updateDestinationDetails = updateDestinationDetails;
  vm.deleteDestination = deleteDestination;
  vm.setDestinationImage = setDestinationImage;

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

  function updateDestinationDetails() {
    DestinationDetailsService.updateDestinationDetails(vm.destination);
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

  function setDestinationImage() {

    var f = document.getElementById('destinationImageUpload').files[0];
    var  r = new FileReader();

    r.onloadend = function(e){
      var data = e.target.result;
      $scope.$evalAsync(function functionName() {
        vm.destination.image.data = data;
      });
    }
    r.readAsDataURL(f);
  }
}

angular.module('travelDiary.destinationDetails').service('DestinationDetailsService', DestinationDetailsService);

DestinationDetailsService.$inject = ['$http'];

function DestinationDetailsService ($http) {

  var DestinationDetailsService = {
    getDestinationDetails : getDestinationDetails,
    updateDestinationDetails : updateDestinationDetails,
    deleteDestination : deleteDestination
  };

  function getDestinationDetails(id) {
    return $http.get(`/api/destinations/${id}`);
  }

  function updateDestinationDetails(destination) {
    return $http.post(`/api/destinations/${destination._id}`, destination);
  }

  function deleteDestination(id) {
    return $http.delete(`/api/destinations/${id}`);
  };

  return DestinationDetailsService;
}
