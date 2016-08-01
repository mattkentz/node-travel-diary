'use strict';

angular.module('user.registration', []);
angular.module('user.registration').directive('userRegistration', UserRegistration);

function UserRegistration () {
    return {
        templateUrl: 'modules/user/user-registration.directive.html',
        controller: 'UserRegistrationController',
        controllerAs: 'userRegistrationCtrl',
        bindToController: true
    }
}

angular.module('user.registration').controller('UserRegistrationController', UserRegistrationController);

UserRegistrationController.$inject = ['$state', 'UserRegistrationService'];

function UserRegistrationController ($state, UserRegistrationService) {
    var vm = this;
    vm.user = {
        email: undefined,
        password: undefined
    };

    vm.registerUser = registerUser;

    function registerUser() {
        UserRegistrationService.registerUser(vm.user).then(
            function registerSuccess(resp) {
                $state.go('destinations');
            }
        );
    }

}

angular.module('user.registration').service('UserRegistrationService', UserRegistrationService);

UserRegistrationService.$inject = ['$http'];

function UserRegistrationService ($http) {

    var UserRegistrationService = {
        registerUser : registerUser
    };

    function registerUser(user) {
        return $http.post('/api/users', user)
    }

    return UserRegistrationService;
}
