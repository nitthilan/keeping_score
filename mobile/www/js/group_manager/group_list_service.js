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
            //MatchListService.addGroupMatchList(message.groupId);
        }
        callback(null);
    }
    that.getGroupList = function(){
        that.groupList = DataStorageService.getObject("ksgrouplist");
        if(!that.groupList) that.groupList = {};
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

    that.createGroupList = function(){
        var groupList = {
            "0":{
                _id:"0",
                name:"group1",
                adminList:[{playerId:"0000",displayName:"KJN0"}],
                playerList:[
                    {playerId:"0000",displayName:"KJN0"},
                    {playerId:"0001",displayName:"KJN1", teamName:"team2"},
                    {playerId:"0002",displayName:"KJN2", teamName:"team3"}
                ],
                tagList:["tag1","tag2"],
            },
            "1":{
                _id:"1",
                name:"group2",
                playerList:[
                    {playerId:"0000",displayName:"KJN"},
                    {playerId:"0001",displayName:"KJN1"},
                    {playerId:"0002",displayName:"KJN2"}
                ],
                tagList:["tag1","tag2"],
            }
        }
        DataStorageService.setObject("ksgrouplist", groupList);
        that.groupList1 = [{
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
    }
}]);
