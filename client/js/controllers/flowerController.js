angular.module('flowers').controller('FlowerController', ['$scope', 'Flowers',
    function ($scope, Flowers) {
        Flowers.getAll().then(function (response) {
            console.log('setting flowers')
            $scope.flowers = response.data;
        }, function (error) {
            console.log('Unable to retrieve listings:', error);
        });
        //Stores Variable for Current User Info, Role/Lastname/FirstName/etc.

    }
]);
