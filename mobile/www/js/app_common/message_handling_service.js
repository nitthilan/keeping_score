angular.module('MyApp')
    .service('MessageHandlingService', ['mySocket', 'GroupListService', 'MatchListService',
        function(mySocket, GroupListService, MatchListService){

    var that = this;
    that.init = function(){
    }
    that.getNewMessages = function(){
        mySocket.emit("getMessages", function(error, messages, callback){
            console.log("Error ", error);
            console.log("Messages ", messages);
            if(error) return callback(error);
            for(var i in messages){
                var message = messages[i];
                if(message.application === "Group"){
                    GroupListService.handleMessage(message,function(error){
                    mySocket.emit("deleteMessage", message._id, function(error){
                        //console.log(error, message)
                    });
                    });
                }
                else if(message.application === "Match"){
                    MatchListService.handleMessage(message, function(error){
                    mySocket.emit("deleteMessage",message._id, function(error){
                        //console.log(error, message)
                    });
                    });
                }
                else{
                    console.log("Error in received message", message);
                    mySocket.emit("deleteMessage",message._id, function(error){
                        //console.log(error, message)
                    });
                }
            }

        });
    }
}]);
