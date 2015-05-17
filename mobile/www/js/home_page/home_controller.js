angular.module('MyApp')
  .controller('HomeCtrl', ['$scope', '$http', '$interval', 'AlertService','$auth',
    'LoginDetectService', '$ionicHistory', '$cordovaOauth', '$window', '$state',
    function($scope, $http, $interval, AlertService, $auth, LoginDetectService,
      $ionicHistory, $cordovaOauth, $window, $state) {
    $ionicHistory.clearHistory();

    console.log(ionic.Platform.device(),ionic.Platform.isWebView(),
      ionic.Platform.isAndroid(), ionic.Platform.version(),
      ionic.Platform.platform());

    $scope.shouldDisplay = function(){
      return (ionic.Platform.platform() === 'win32');
    }

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
      delete $window.localStorage['satellizer_token'];
      if(provider === 'google'){
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
              //var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
              //var headers = { Authorization: 'Bearer ' + accessToken };
              $http.get("https://www.googleapis.com/oauth2/v1/userinfo",
                { params: { access_token: result.access_token,
                  alt: "json" }}).then(function(result) {
                    console.log("FB Profile Data", result);
                $scope.profileData = result.data;
              }, function(error) {
                  alert("There was a problem getting your profile.  Check the logs for details.");
                  console.log(error);
              });

          }, function(error) {
              // error
              console.log(error);
              loginFailure();
          });
      }
      else{
        $cordovaOauth.facebook("787479751340055",
          ["email","public_profile"]).then(function(result) {
              // results
              console.log(result);
              var post_url = 'http://www.brightboard.co.in:3002/auth/facebook/mobile';
              $http.post(post_url, {accessToken:result.access_token}).
              success(function(data, status, headers, config) {
                console.log("facebook", data, status, headers, config);
                $window.localStorage['satellizer_token'] = data.token;
                $state.go("user_home");
                loginSuccessful("Used google or facebook token");
              }).
              error(function(data, status, headers, config) {
                delete $window.localStorage['satellizer_token'];
                loginFailure();
              });
              //https://github.com/nraboy/ng-cordova-facebook-example/blob/master/www/js/app.js
              $http.get("https://graph.facebook.com/v2.2/me",
                { params: { access_token: result.access_token,
                  fields: "id,name,email,gender",
                  format: "json" }}).then(function(result) {
                    console.log("FB Profile Data", result);
                $scope.profileData = result.data;
              }, function(error) {
                  alert("There was a problem getting your profile.  Check the logs for details.");
                  console.log(error);
              });
          }, function(error) {
              // error
              console.log(error);
              loginFailure();
          });
      }

    };
  }]);
