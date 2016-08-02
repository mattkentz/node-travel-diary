'use strict';

angular.module('destination.destinationDetails', ['ngFileUpload']);
angular.module('destination.destinationDetails').directive('destinationDetails', DestinationDetails);

function DestinationDetails () {
  return {
    templateUrl: 'modules/destination/destination-details.directive.html',
    controller: 'DestinationDetailsController',
    controllerAs: 'destDetCtrl',
    bindToController: true
  }
}

angular.module('destination.destinationDetails').controller('DestinationDetailsController', DestinationDetailsController);

DestinationDetailsController.$inject = ['$scope','$stateParams','DestinationDetailsService'];

function DestinationDetailsController ($scope, $stateParams, DestinationDetailsService) {
  var vm = this;
    vm.destinationImage = null;
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
        vm.destinationImage = 'data:' + vm.destination.image.contentType + ';base64,' + vm.destination.image.data;
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

  function setDestinationImage(file) {
      var reader = new FileReader();

      reader.onload = function (e) {
          vm.destinationImage = e.target.result;
      }

      reader.readAsDataURL(file);
    DestinationDetailsService.setDestinationImage(vm.destination._id, vm.destination.name, vm.destination.description, file);
  }
}

angular.module('destination.destinationDetails').service('DestinationDetailsService', DestinationDetailsService);

DestinationDetailsService.$inject = ['$http', 'Upload'];

function DestinationDetailsService ($http, Upload) {

  var DestinationDetailsService = {
    getDestinationDetails : getDestinationDetails,
    updateDestinationDetails : updateDestinationDetails,
    deleteDestination : deleteDestination,
    setDestinationImage : setDestinationImage
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

  function setDestinationImage(id, name, description, file) {
    Upload.upload({
            method: 'POST',
            url: `/api/destinations/${id}`,
            data: {
              name: name,
              description: description,
              file: file
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
  }

  return DestinationDetailsService;
}
