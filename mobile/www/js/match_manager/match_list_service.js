angular.module('MyApp')
    .service('MatchListService', ['mySocket', 'DataStorageService',
        function(mySocket, DataStorageService){

    var that = this;
    that.init = function(){
        //that.createStoredMatchList();
        that.getStoredMatchList();
    }
    that.handleMessage = function(message, callback){
        if(message.eventInfo === "Create"){
            that.groupMatchList[message.groupId].push(message.data);
            DataStorageService.setObject("ksgroupmatchlist", that.groupMatchList);
            that.groupMatchMeta[message.groupId] =
                {id:message.groupId, unread:true,time:Date()};
            DataStorageService.setObject("ksgroupmatchmeta", that.groupMatchMeta);
        }
        return callback(null);

    }
    that.addGroupMatchList = function(groupId){
        that.groupMatchList[groupId] = [];
        DataStorageService.setObject("ksgroupmatchlist", that.groupMatchList);
        that.groupMatchMeta[groupId] =
            {id:groupId, unread:true, time:Date()};
        DataStorageService.setObject("ksgroupmatchmeta", that.groupMatchMeta);
    }
    that.readMatchList = function(groupId){
        that.groupMatchMeta[groupId].unread = false;
        DataStorageService.setObject("ksgroupmatchmeta", that.groupMatchMeta);
    }
    that.addMatchInfo = function(matchInfo, groupId, callback){
        mySocket.emit("addMatch", matchInfo, groupId, callback);
    }
    that.getStoredMatchList = function(){
        //DataStorageService.clear();
        that.groupMatchList = DataStorageService.getObject("ksgroupmatchlist");
        that.groupMatchMeta = DataStorageService.getObject("ksgroupmatchmeta");
        //console.log("Hi", that.groupMatchMeta);
    }
    that.reset = function(){
        DataStorageService.remove("ksgroupmatchlist");
        DataStorageService.remove("ksgroupmatchmeta");
    }

}]);
