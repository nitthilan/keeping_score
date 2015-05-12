angular.module('MyApp')
  .controller('HomeCtrl', ['$scope', '$http', '$interval', 'AlertService','$auth',
    'LoginDetectService', '$ionicHistory', '$cordovaOauth', '$window', '$state',
    function($scope, $http, $interval, AlertService, $auth, LoginDetectService,
      $ionicHistory, $cordovaOauth, $window, $state) {
    $ionicHistory.clearHistory();

    var loginSuccessful = function(log){
      LoginDetectService.setLogin();
      console.log(log);
      AlertService.message('Successful', 'Login');
      //$ionicHistory.clearHistory();
      $ionicHistory.clearCache();
      $ionicHistory.nextViewOptions({historyRoot: true});
    };
    var loginFailure = function(){
      LoginDetectService.resetLogin();
      AlertService.message("Failed.", 'Login');
    };

    $scope.login = function() {
      $auth.login({ email: "demouser@keepingscore.co.in", password: "demouser" })
        .then(function() {
          loginSuccessful("Used email and password");
        })
        .catch(function(response) {
          loginFailure();
        });
    };
    $scope.authenticate = function(provider) {
      $cordovaOauth.google("542331465101-qjdso0o95td4ooucs678avsdmsljqaas.apps.googleusercontent.com",
        ["https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            // results
            console.log(result);
            var post_url = 'http://www.brightboard.co.in:3002/auth/google/mobile';
            $http.post(post_url, {accessToken:result.access_token}).
            success(function(data, status, headers, config) {
              $window.localStorage['satellizer_token'] = data.token;
              $state.go("user_home");
              loginSuccessful("Used google or facebook token");
            }).
            error(function(data, status, headers, config) {
              delete $window.localStorage['satellizer_token'];
              loginFailure();
            });
        }, function(error) {
            // error
            console.log(error);
            loginFailure();
        });
    };
  }]);
