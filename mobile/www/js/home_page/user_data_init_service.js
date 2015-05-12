angular.module('MyApp')
    .service('UserDataInitService', ['$auth', 'LoginDetectService', 'mySocket',
        'GroupListService', 'UserProfile', 'MatchListService',
        function($auth, LoginDetectService, mySocket, GroupListService, UserProfile,
            MatchListService){

    var that = this;

    that.init = function(){
        if(LoginDetectService.isUserLoggedin()){
            mySocket.ioconnect({forceNew: true, query: 'token=' + $auth.getToken()});
            GroupListService.init();
            UserProfile.init();
            MatchListService.init();

            // Set flag to false
            LoginDetectService.resetLogin();
            console.log("Login token "+$auth.getToken());
        }
    };
}]);
