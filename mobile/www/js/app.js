// Ionic Starter App
var MyApp = angular.module('MyApp', ['ionic', 'ui.router', 'satellizer',
  'btford.socket-io', 'ngCordova', 'angularMoment']);

MyApp.factory('mySocket', ['socketFactory', '$auth', 'LoginDetectService',
  function (socketFactory, $auth, LoginDetectService) {
  // KJN TBF
  /*var myIoSocket = io.connect('http://10.230.149.76:80');
  var mySocket = socketFactory({
    ioSocket: myIoSocket
  }); */
  var mySocket = socketFactory();
  if ($auth.isAuthenticated()) {
    LoginDetectService.setLogin();
    console.log("Used auto login");
  }
  mySocket.forward('error');
  return mySocket;
}]);

MyApp.service('LoginDetectService', function(){
    var that = this;
    that.userloggedin = false;
    that.setLogin = function(){
      that.userloggedin = true;
    };
    that.resetLogin = function(){
      that.userloggedin = false;
    };
    that.isUserLoggedin = function(){
      return that.userloggedin;
    };
});

MyApp.config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$locationProvider', '$compileProvider',
  function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $compileProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/home_page/home.html',
        controller: 'HomeCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if ($auth.isAuthenticated()) {
              return $location.path('/user_home');
            }
          }]
        }
      })
      .state('user_home', {
        url: '/user_home',
        templateUrl: 'js/home_page/user_home.html',
        controller: 'UserHomeCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/');
            }
          }]
        }
      })
      .state('create_group', {
        cache: false,
        url: '/create_group',
        templateUrl: 'js/group_manager/create_group.html',
        controller: 'CreateGroupCtrl',
        params:{groupInfo:null},
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/');
            }
          }]
        }
      })
      .state('create_match', {
        cache: false,
        url: '/create_match',
        templateUrl: 'js/match_manager/create_match.html',
        controller: 'CreateMatchCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/');
            }
          }]
        }
      })
      .state('start_scoring', {
        cache: false,
        url: '/start_scoring',
        templateUrl: 'js/match_manager/start_scoring.html',
        controller: 'StartScoringCtrl',
        params:{sideInfo:null, tagList:null, groupId:null},
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/');
            }
          }]
        }
      })
      .state('match_detail', {
        url: '/match_detail',
        params:{matchInfo:null},
        templateUrl: 'js/stats_viewer/match_detail.html',
        controller: 'MatchDetailCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/');
            }
          }]
        }
      })
      .state('group_match_list', {
        url: '/group_match_list',
        params:{groupInfo:null, matchList:null},
        templateUrl: 'js/stats_viewer/group_match_list.html',
        controller: 'GroupMatchListCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/');
            }
          }]
        }
      })
      .state('group_stats', {
        url: '/group_stats',
        templateUrl: 'js/stats_viewer/group_stats.html',
        controller: 'GroupStatsCtrl',
        resolve: {
          authenticated: ['$location', '$auth', function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/');
            }
          }]
        }
      });

    $authProvider.loginRedirect = '/user_home';
    $authProvider.platform = 'mobile';
    //$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    //var url = 'http://localhost:3000';
    var url = 'http://www.brightboard.co.in:3002';

    $authProvider.facebook({
      url: url+'/auth/facebook',
      clientId: '787479751340055'
    });

    $authProvider.google({
      url: url+'/auth/google',
      clientId: '542331465101-qjdso0o95td4ooucs678avsdmsljqaas.apps.googleusercontent.com',
      redirectUri: 'http://localhost'
    });

    // list of setting for authentication
    $authProvider.loginUrl = url+'/auth/login';

    // http://stackoverflow.com/questions/16514509/how-do-you-serve-a-file-for-download-with-angularjs-or-javascript
    // https://docs.angularjs.org/api/ng/provider/$compileProvider
    //console.log("Old white list"+ $compileProvider.aHrefSanitizationWhitelist());
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):|data:image\//);
}]);



// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
MyApp
.run(['$rootScope', '$state', '$stateParams','$ionicPlatform',
  function($rootScope, $state, $stateParams, $ionicPlatform) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // Make sure all the plugins are ready to be consumed
    console.log("Ionic Platform ready is called: All plugins are loaded");
  });
}]);

