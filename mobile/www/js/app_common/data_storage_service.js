angular.module('MyApp')
.factory('DataStorageService', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      //console.log(key, value);
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      //console.log($window.localStorage[key]);
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
