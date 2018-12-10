angular.module('flowers', []).factory('Flowers', function ($http) {
    var methods = {
      getAll: function () {
        console.log('got all the flowers');
        return $http.get('/api/flowers');
      },
      getSightingsByName : function(flowerName) {
          return $http.get('api/sightings/' + flowerName);
      }
    };

    return methods;
  });