angular.module('travelDiary', []);

angular.module('travelDiary').controller('mainController', function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all destinations and show them
    $http.get('/api/destinations')
        .success(function(data) {
            $scope.destinations = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createDestination = function() {
        $http.post('/api/destinations', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.destinations = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a destination after checking it
    $scope.deleteDestination = function(id) {
        $http.delete('/api/destinations/' + id)
            .success(function(data) {
                $scope.destinations = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});
