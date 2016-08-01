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
                alert('Registration Successful');
                $state.go('destinations');
            },
            function registerFailed(err) {
                alert('Something went wrong!');
                console.error(err);
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
