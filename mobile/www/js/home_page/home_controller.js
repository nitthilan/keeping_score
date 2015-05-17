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
      var server_user_url = 'http://www.brightboard.co.in:3002/auth/mobile';
      var google_client_id = "542331465101-qjdso0o95td4ooucs678avsdmsljqaas.apps.googleusercontent.com";
      var facebook_client_id = "787479751340055";
      var google_app_scope_array = ["https://www.googleapis.com/auth/userinfo.email"];
      var facebook_app_scope_array = ["email","public_profile"];
      var google_profile_url = "https://www.googleapis.com/oauth2/v1/userinfo";
      var facebook_profile_url = "https://graph.facebook.com/v2.2/me";

      if(provider === 'google'){
        $cordovaOauth.google(google_client_id, google_app_scope_array).then(function(result) {
        // results
        console.log("Google access_token", result.access_token);
        $http.get(google_profile_url, { params: { access_token: result.access_token, alt: "json" }}).
          then(function(result) {
        //console.log("Google Profile Data", result);
        var profile = {
          name: result.data.name || result.data.email,
          email: result.data.email,
          id: result.data.id,
          type: "google"
        };
        console.log("Google Profile Data", result, profile);
        $http.post(server_user_url, profile).success(function(data, status, headers, config) {
          console.log("Google", data, status, headers, config);
          $window.localStorage['satellizer_token'] = data.token;
          $state.go("user_home");
          loginSuccessful("Used google token");
        }).
        error(function(data, status, headers, config) { console.log(data); loginFailure(); });
        },
        function(error) { console.log(error); loginFailure(); });
        },
        function(error) { console.log(error); loginFailure(); });
      }
      else{
        $cordovaOauth.facebook(facebook_client_id, facebook_app_scope_array).then(function(result) {
        // results
        console.log("Facebook access token", result.access_token);
        //https://github.com/nraboy/ng-cordova-facebook-example/blob/master/www/js/app.js
        $http.get(facebook_profile_url, { params: { access_token: result.access_token,
          fields: "id,name,email,gender", format: "json" }}).then(function(result) {
        console.log("FB Profile Data", result);
        var profile = {
          name: result.data.name || result.data.email,
          email: result.data.email,
          id: result.data.id,
          type: "facebook"
        };
        $http.post(server_user_url, profile).success(function(data, status, headers, config) {
          console.log("Facebook", data, status, headers, config);
          $window.localStorage['satellizer_token'] = data.token;
          $state.go("user_home");
          loginSuccessful("Used facebook token");
        }).
        error(function(data, status, headers, config) { console.log(data); loginFailure(); });
        },
        function(error) { console.log(error); loginFailure(); });
        },
        function(error) { console.log(error); loginFailure(); });
      }

    };
  }]);
