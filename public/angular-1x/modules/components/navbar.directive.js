'use strict';

angular.module('components.navbar', []);
angular.module('components.navbar').directive('navBar', NavBar);

function NavBar () {
    return {
        templateUrl: 'modules/components/navbar.directive.html',
        controller: 'NavBarController',
        controllerAs: 'navBarCtrl',
        bindToController: true
    }
}

angular.module('components.navbar').controller('NavBarController', NavBarController);

NavBarController.$inject = ['NavBarService'];

function NavBarController (NavBarService) {
    var vm = this;

}

angular.module('components.navbar').service('NavBarService', NavBarService);

NavBarService.$inject = [];

function NavBarService () {

    var NavBarService = {
    };

    return NavBarService;
}
