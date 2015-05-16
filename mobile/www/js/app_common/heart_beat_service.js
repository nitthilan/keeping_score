angular.module('MyApp')
    .service('HeartBeatService', ['mySocket','$interval',
        function(mySocket, $interval){

    var that = this;
    that.init = function(){
        that.hear_beat_recieve_time = null;
        that.current_heart_beat_time = null;
        that.isConnected = false;
        mySocket.on('time', function(date){
            that.hear_beat_recieve_time = date;
        });
        // Check every 10 seconds once whether we have received a new time event
        // Currently the server is sending time every 5 seconds
        $interval(function(){
            if(that.current_heart_beat_time === that.hear_beat_recieve_time){
                that.isConnected = false;
            }
            else{
                that.isConnected = true;
            }
            //console.log("Is User connected ", that.hear_beat_recieve_time, that.isConnected);
            that.current_heart_beat_time = that.hear_beat_recieve_time;
        },10000);
    }
}]);
