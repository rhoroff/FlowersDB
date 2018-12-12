angular.module('flowers').controller('FlowerController', ['$scope', 'Flowers',
    function ($scope, Flowers) {
        $scope.hidden = true;
        $scope.curFlowName = undefined;
        $scope.curFlowGenus = undefined;
        $scope.curFlowSpecies = undefined;

        $scope.curFlowImageURL = undefined;
        Flowers.getLocations().then(function (response) {
            console.log(response.data);
            $scope.locations = response.data;
        });
        $scope.getUser = function () {
            Flowers.getCurrentUserName().then(function (response) {
                $scope.curUserFirstName = response.data.first_name;
                $scope.curUserLastName = response.data.last_name;
            });
        }
        Flowers.getAll().then(function (response) {
            $scope.flowers = response.data;
        }, function (error) {
            console.log('Unable to retrieve listings:', error);
        });
        $scope.getSightings = function (flowerName, flowGenus, flowSpecies) {
            Flowers.getSightingsByName(flowerName).then(function (response) {
                $scope.sightings = response.data;
                $scope.curFlowName = flowerName;
                $scope.curFlowGenus = flowGenus;
                $scope.curFlowSpecies = flowSpecies;
            }), function (error) {
                console.log("Couldn't get listings by name");
            }
        }
        $scope.addSighting = function () {
            var inputDate;
            inputDate = $scope.sightedDate[6].toString + $scope.sightedDate[7].toString() + $scope.sightedDate[8].toString() + $scope.sightedDate[9].toString() + '-' +$scope.sightedDate[0].toString() + $scope.sightedDate[1].toString() +'-' + $scope.sightedDate[3].toString() + $scope.sightedDate[4].toString();
            newSighting = {
                "flowerName" : $scope.curFlowName,
                "person" : $scope.curUserFirstName + " " + $scope.curUserLastName,
                "location" : $scope.location,
                "date" : $scope.sightedDate,
            }
            Flowers.addSighting(newSighting).then(function (response) {
                if (err) {
                    console.log(err);
                }
            });
            $scope.curFlowName=newSighting.flowerName;
            $scope.getSightings($scope.curFlowName);
        }
        $scope.updateCurFlowerImageURL = function(flowerName) {
            Flowers.getCurFlowerURL(flowerName).then(function (response) {
                console.log(flowerName);
                console.log(response.data[0][flowerName]);
                $scope.curFlowImageURL=response.data[0][flowerName];
            });
        }
    }
]);
