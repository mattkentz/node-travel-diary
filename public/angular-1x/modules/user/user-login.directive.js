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

UserLoginController.$inject = ['$scope', '$window', 'UserLoginService'];

function UserLoginController ($scope, $window, UserLoginService) {
    var vm = this;
    vm.user = {
        email: undefined,
        password: undefined
    };

    vm.loginUser = loginUser;
    vm.logout = logout;

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

    function logout() {
        delete $window.sessionStorage.token;
    }

    $scope.$watch(function () {
        return $window.sessionStorage.token
    }, function (newVal, oldVal) {
        if (newVal) {
            vm.isLoggedIn = true;
        } else {
            vm.isLoggedIn = false;
        }
    });

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
