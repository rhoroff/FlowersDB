angular.module('flowers', []).factory('Flowers', function ($http) {
    var methods = {
      getAll: function () {
        console.log('got all the flowers');
        return $http.get('/api/flowers');
      },
      getSightingsByName : function(flowerName) {
          return $http.get('api/sightings/' + flowerName);
      },
      addSighting : function(newSighting) {
        return $http.post('/api/sightings', newSighting);
      },
      getCurrentUserName : function() {
        return $http.get('/api/user');
      },
      getLocations : function() {
        return $http.get('/api/locations');
      }
    };
    return methods;
  });