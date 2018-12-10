angular.module('flowers').controller('FlowerController', ['$scope', 'Flowers',
    function ($scope, Flowers) {
        Flowers.getAll().then(function (response) {
            console.log('setting flowers')
            $scope.flowers = response.data;
        }, function (error) {
            console.log('Unable to retrieve listings:', error);
        });
        $scope.getSightings = function(flowerName) {
            Flowers.getSightingsByName(flowerName).then(function(response){
                $scope.sightings = response.data;
                console.log($scope.sightings)
            }), function(error) {
                console.log("Couldn't get listings by name");
            }
        }

    }
]);
