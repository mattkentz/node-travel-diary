'use strict';

angular.module('user.login', []);
angular.module('user.login').directive('userLogin', UserLogin);

function UserLogin () {
    return {
        templateUrl: 'modules/user/user-login.directive.html',
        controller: 'UserLoginController',
        controllerAs: 'userLoginCtrl',
        bindToController: true
    }
}

angular.module('user.login').controller('UserLoginController', UserLoginController);

UserLoginController.$inject = ['$window', 'UserLoginService'];

function UserLoginController ($window, UserLoginService) {
    var vm = this;
    vm.user = {
        email: undefined,
        password: undefined
    };

    vm.loginUser = loginUser;

    function loginUser() {
        UserLoginService.loginUser(vm.user).then(
            function registerSuccess(resp) {
                alert('Login Successful');
                $window.sessionStorage.token = resp.data.token;
            },
            function registerFailed(err) {
                alert('Something went wrong!');
                console.error(err);
                delete $window.sessionStorage.token;
            }
        );
    }

}

angular.module('user.login').service('UserLoginService', UserLoginService);

UserLoginService.$inject = ['$http'];

function UserLoginService ($http) {

    var UserLoginService = {
        loginUser : loginUser
    };

    function loginUser(user) {
        return $http.post('/api/users/login', user)
    }

    return UserLoginService;
}
