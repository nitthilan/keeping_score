angular.module('MyApp')
    .service('AlertService', ['$ionicPopup', '$timeout', function($ionicPopup, $timeout){

    var that = this;

    that.message = function(message, title, callback){
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message
        });
        alertPopup.then(callback);

        $timeout(function() {
            alertPopup.close();
        }, 2000);
        console.log(message, title);
    };
}]);

