angular.module('MyApp')
    .service('GroupListService', ['mySocket', '$filter',function(mySocket, $filter){

    var that = this;
    that.init = function(){
        that.createGroupList();
    }
    that.searchName = function(name, callback){
        /* var nameList = [
        {_id:"0000",displayName:"KJN"},
        {_id:"0001",displayName:"KJN1"},
        {_id:"0002",displayName:"KJN2"},
        {_id:"0003",displayName:"KJN3"}
        ];*/
        mySocket.emit("findPlayers",
            // http://docs.mongodb.org/manual/reference/operator/query/or/
            {$or:[{displayName:{ "$regex": name, "$options": "i" }},
             {email:{ "$regex": name, "$options": "i" }}]},'',
            function(error, nameList){
            if(error){
                console.log("Error in query", name);
                return callback(error, null);
            }
            console.log(error, nameList, name);
            return callback(null, nameList);
        });
    }
    that.create = function(groupInfo, callback){
        mySocket.emit("groupCreate", groupInfo, function(error, groupInfoSaved){
            if(error){return callback(error);}
            that.groupList.push(groupInfoSaved);
            return callback(null);
        });
    }
    that.edit = function(id, groupInfo, callback){
        mySocket.emit("groupUpdate", id, groupInfo,
            function(error, groupInfoSaved){
            if(error){return callback(error);}
            that.groupList.push(groupInfoSaved);
            return callback(null);
        });
    }
    that.addMatchInfo = function(matchInfo, groupId, callback){
        mySocket.emit("addMatch", matchInfo, groupId, function(error){
        console.log("Error in saving match ", error, matchInfo);
        if(error) return callback(error);
        var group = $filter('filter')(that.groupList, {_id:groupId});

        if(group.length !== 1){
            return callback(new Error("Unable to find the specified group"));
        }
        console.log("filtered group", group, groupId);
        group[0].matchList.push(matchInfo);

        return callback(error);
        });
    }
    that.createGroupList = function(){
        that.groupList = [{
            _id:"0",
            name:"group1",
            adminList:[{playerId:"0000",displayName:"KJN0"}],
            playerList:[
                {playerId:"0000",displayName:"KJN0"},
                {playerId:"0001",displayName:"KJN1", teamName:"team2"},
                {playerId:"0002",displayName:"KJN2", teamName:"team3"}
            ],
            tagList:["tag1","tag2"],
            matchList:[{
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
            }]
        },{
            _id:"1",
            name:"group2",
            playerList:[
                {playerId:"0000",displayName:"KJN"},
                {playerId:"0001",displayName:"KJN1"},
                {playerId:"0002",displayName:"KJN2"}
            ],
            tagList:["tag1","tag2"],
            matchList:[{
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
        }];
        mySocket.emit("findGroups", {},'', function(error, queriedGroupList){
            if(error){return;}
            console.log("Queried groupInfo ", queriedGroupList);
            for(var i in queriedGroupList){
                that.groupList.push(queriedGroupList[i]);
            }
        });
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
}]);
