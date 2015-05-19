angular.module('MyApp')
.factory('DataStorageService', ['$window', function($window) {
  return {
    clear: function(){
      $window.localStorage.clear();
    },
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      //console.log(key, value);
      $window.localStorage[key] = angular.toJson(value);
    },
    getObject: function(key) {
      //console.log($window.localStorage[key]);
      return angular.fromJson(($window.localStorage[key] || '{}'));
    },
    remove: function(key){
      $window.localStorage.removeItem(key);
    }
  }
}]);
