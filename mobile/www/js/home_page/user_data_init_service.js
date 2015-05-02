angular.module('MyApp')
    .service('UserDataInitService', ['$auth', 'LoginDetectService', 'mySocket',
        'GroupListService',
        function($auth, LoginDetectService, mySocket, GroupListService){

    var that = this;

    that.init = function(){
        if(LoginDetectService.isUserLoggedin()){
            //mySocket.ioconnect({forceNew: true, query: 'token=' + $auth.getToken()});
            GroupListService.init();

            // Set flag to false
            LoginDetectService.resetLogin();
            console.log("Login token "+$auth.getToken());
        }
    };
}]);
