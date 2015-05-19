angular.module('MyApp')
    .service('GroupListService', ['mySocket', '$filter', 'DataStorageService',
        'MatchListService',
        function(mySocket, $filter, DataStorageService, MatchListService){

    var that = this;
    that.init = function(){
        //that.createGroupList();
        that.getGroupList();
    }
    that.handleMessage = function(message, callback){
        if(message.eventInfo === "Create"){
            that.groupList[message.groupId] = message.data;
            DataStorageService.setObject("ksgrouplist", that.groupList);
            MatchListService.addGroupMatchList(message.groupId);
        }
        else if(message.eventInfo === "Update"){
            that.groupList[message.groupId] = message.data;
            DataStorageService.setObject("ksgrouplist", that.groupList);
        }
        callback(null);
    }
    that.getGroupList = function(){
        that.groupList = DataStorageService.getObject("ksgrouplist");
        if(!that.groupList) that.groupList = {};
    }
    that.reset = function(){
        DataStorageService.remove("ksgrouplist");
    }
    that.searchName = function(name, callback){

        mySocket.emit("findPlayers",
            // http://docs.mongodb.org/manual/reference/operator/query/or/
            {$or:[{displayName:{ "$regex": name, "$options": "i" }},
             {email:{ "$regex": name, "$options": "i" }}]},'',
            function(error, nameList){
            if(error){
                //console.log("Error in query", name);
                return callback(error, null);
            }
            //console.log(error, nameList, name);
            return callback(null, nameList);
        });
    }
    that.create = function(groupInfo, callback){
        mySocket.emit("groupCreate", groupInfo, callback);
    }

    that.edit = function(id, groupInfo, callback){
        mySocket.emit("groupUpdate", id, groupInfo,callback);
    }
}]);
