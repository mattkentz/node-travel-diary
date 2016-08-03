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
    DestinationFormService.addDestination(vm.formData).then(
    function addDestinationSuccess(resp) {
        vm.formData = {}; // clear the form so our user is ready to enter another
    },
    function addDestinationFailed(err) {
        console.log('Error: ' + err);
    });
  };
}

angular.module('destination.destinationForm').service('DestinationFormService', DestinationFormService);

DestinationFormService.$inject = ['$http', '$rootScope'];

function DestinationFormService ($http, $rootScope) {

  var DestinationFormService = {
    addDestination : addDestination
  };

  function addDestination(destination) {
    return $http.post('/api/destinations', destination).then(
        function addDestinationSuccess(resp) {
          if (resp.status !== 401 && resp.data) {
            $rootScope.$broadcast('destinations-updated', resp.data);
          }
        }
    );
  }

  return DestinationFormService;
}
