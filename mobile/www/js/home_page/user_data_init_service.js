angular.module('MyApp')
    .service('UserDataInitService', ['$auth', 'LoginDetectService', 'mySocket',
        'GroupListService', 'UserProfile', 'MatchListService', 'HeartBeatService',
        function($auth, LoginDetectService, mySocket, GroupListService, UserProfile,
            MatchListService, HeartBeatService){

    var that = this;

    that.init = function(){
        if(LoginDetectService.isUserLoggedin()){
            mySocket.ioconnect({forceNew: true, query: 'token=' + $auth.getToken()});
            GroupListService.init();
            UserProfile.init();
            MatchListService.init();
            HeartBeatService.init();

            // Set flag to false
            LoginDetectService.resetLogin();
            console.log("Login token "+$auth.getToken());
        }
    };
    that.reset = function(){
        MatchListService.reset();
        GroupListService.reset();
    }
}]);
