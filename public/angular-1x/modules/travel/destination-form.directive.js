'use strict';

angular.module('travelDiary.destinationForm', []);
angular.module('travelDiary.destinationForm').directive('destinationForm', DestinationForm);

function DestinationForm () {
  return {
    templateUrl: 'modules/travel/destination-form.directive.html',
    controller: 'DestinationFormController',
    controllerAs: 'destFormCtrl',
    bindToController: true
  }
}

angular.module('travelDiary.destinationForm').controller('DestinationFormController', DestinationFormController);

DestinationFormController.$inject = ['DestinationFormService'];

function DestinationFormController (DestinationFormService) {
  var vm = this;

  vm.init = init;
  vm.addDestination = addDestination;

  vm.init();

  function init() {
    vm.formData = {};
  }

  function addDestination() {
    DestinationFormService.addDestination(vm.formData)
    .success(function(data) {
        vm.formData = {}; // clear the form so our user is ready to enter another
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });;
  };
}

angular.module('travelDiary.destinationForm').service('DestinationFormService', DestinationFormService);

DestinationFormService.$inject = ['$http'];

function DestinationFormService ($http) {

  var DestinationFormService = {
    addDestination : addDestination
  };

  function addDestination(destination) {
    return $http.post('/api/destinations', destination);
  }

  return DestinationFormService;
}
