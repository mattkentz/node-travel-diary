'use strict';

angular.module('destination.destinationForm', []);
angular.module('destination.destinationForm').directive('destinationForm', DestinationForm);

function DestinationForm () {
  return {
    templateUrl: 'modules/destination/destination-form.directive.html',
    controller: 'DestinationFormController',
    controllerAs: 'destFormCtrl',
    bindToController: true
  }
}

angular.module('destination.destinationForm').controller('DestinationFormController', DestinationFormController);

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

angular.module('destination.destinationForm').service('DestinationFormService', DestinationFormService);

DestinationFormService.$inject = ['$http', '$rootScope'];

function DestinationFormService ($http, $rootScope) {

  var DestinationFormService = {
    addDestination : addDestination
  };

  function addDestination(destination) {
    return $http.post('/api/destinations', destination)
    .success(function(data) {
        //TODO refactor using service 
        $rootScope.$broadcast('destinations-updated', data);
    });
  }

  return DestinationFormService;
}
