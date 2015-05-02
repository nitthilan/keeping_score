angular.module('MyApp')
  .factory('Account', function($http, $auth) {
    var getProfile = function(callback) {
      var url = 'http://www.brightboard.co.in/api/me';
      //var url = 'http://localhost:3000/api/me';
      $http.get(url)
      .success(function(data) {
        return callback({
          logged_in : true,
          user_info : data,
          is_demo_user : (data.displayName === "BrightBoarder")
        });
      })
      .error(function(data) {
        return callback({
          logged_in : false,
          user_info : "",
          is_demo_user : false
        });
      });
    };
    var updateProfile = function(profileData) {
      return $http.put('/api/me', profileData);
    };
    return {
      getProfile: getProfile,
      updateProfile: updateProfile
    };
  });
