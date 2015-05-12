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
        }
        return callback(null);

    }
    that.addGroupMatchList = function(groupId){
        that.groupMatchList[groupId] = [];
        DataStorageService.setObject("ksgroupmatchlist", that.groupMatchList);
    }
    that.addMatchInfo = function(matchInfo, groupId, callback){
        mySocket.emit("addMatch", matchInfo, groupId, callback);
    }
    that.getMatchList = function(groupId){
        for(var i=0;i<that.groupList.length;i++){
            if(that.groupList[i]._id===groupId){
                return that.groupList[i].matchList;
            }
        }
        console.log("Error in finding the group", groupId);
        return null;
    }
    that.getMatchInfo = function(matchIndex){
        return that.groupList[0].matchList[0];
    }
    that.getStoredMatchList = function(){
        that.groupMatchList = DataStorageService.getObject("ksgroupmatchlist");
    }
    that.createStoredMatchList = function(){
        var groupMatchList = {
            "0":[{
                // Array of Sides and each array having array of players
                sideInfo:[
                    [{playerId:"0000",displayName:"KJN1", teamName:"team1"}],
                    [{playerId:"0001",displayName:"KJN2", teamName:"team2"}],
                ],
                // Array of sets and each set having array of games
                // Each game having array of side scores and winner
                scoreInfo:{
                    setList:[
                        {gameList:
                            [{scoreList:[10,11], winner:1},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:1,
                        summary:[1,2]},
                        {gameList:
                            [{scoreList:[12,11], winner:0},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:0,
                        summary:[2,1]},
                        {gameList:
                            [{scoreList:[12,11], winner:0},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:0,
                        summary:[2,1]}
                    ],
                    winner:0,
                    summary:[2,1]
                },
                tagList:["tag1"],
                date:Date()
            }],
            "1":[{
                // Array of Sides and each array having array of players
                sideInfo:[
                    [{playerId:"0000",displayName:"G2KJN1", teamName:"team1"}],
                    [{playerId:"0001",displayName:"G2KJN2", teamName:"team2"}],
                ],
                // Array of sets and each set having array of games
                // Each game having array of side scores and winner
                scoreInfo:{
                    setList:[
                        {gameList:
                            [{scoreList:[10,11], winner:1},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:1,
                        summary:[1,2]},
                        {gameList:
                            [{scoreList:[12,11], winner:0},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:0,
                        summary:[2,1]},
                        {gameList:
                            [{scoreList:[12,11], winner:0},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:0,
                        summary:[2,1]}
                    ],
                    winner:0,
                    summary:[2,1]
                },
                tagList:["tag1"],
                date:Date()
            },{
                // Array of Sides and each array having array of players
                sideInfo:[
                    [{playerId:"0000",displayName:"G2KJN1", teamName:"team1"}],
                    [{playerId:"0001",displayName:"G2KJN3", teamName:"team2"}],
                ],
                // Array of sets and each set having array of games
                // Each game having array of side scores and winner
                scoreInfo:{
                    setList:[
                        {gameList:
                            [{scoreList:[10,11], winner:1},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:1,
                        summary:[1,2]},
                        {gameList:
                            [{scoreList:[12,11], winner:0},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:0,
                        summary:[2,1]},
                        {gameList:
                            [{scoreList:[12,11], winner:0},
                             {scoreList:[12,11], winner:0},
                             {scoreList:[12,13], winner:1}],
                        winner:0,
                        summary:[2,1]}
                    ],
                    winner:0,
                    summary:[2,1]
                },
                tagList:["tag1"],
                date:Date()
            }]
        }
        DataStorageService.setObject("ksgroupmatchlist", groupMatchList);
    }
}]);
