angular.module('MyApp')
    .service('UserProfile', ['$http',  function($http){

    var that = this;

    that.init = function(){
      var url = 'http://localhost:3000/api/me';
      //var url = 'http://www.brightboard.co.in:3002/api/me';
      $http.get(url)
      .success(function(data) {
        that.userProfile = data;
        console.log("UserProfile", that.userProfile);
        //$rootScope.$apply();
      })
      .error(function(error) {
        that.userProfile = null;
        console.log("Error in getting user information");
      });
    };
    that.get = function(){
      return that.userProfile;
    }
}]);
