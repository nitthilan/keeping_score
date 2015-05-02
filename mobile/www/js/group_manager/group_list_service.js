angular.module('MyApp')
    .service('GroupListService', ['mySocket',function(mySocket){

    var that = this;
    that.init = function(){
        that.createGroupList()
    }
    that.id = 0;
    that.getId = function(){
        that.id++;
        return that.id;
    }
    that.searchName = function(name){
        var nameList = [
        {_id:"0000",displayName:"KJN"},
        {_id:"0001",displayName:"KJN1"},
        {_id:"0002",displayName:"KJN2"},
        {_id:"0003",displayName:"KJN3"}
        ];
        return nameList;
    }
    that.createGroupList = function(){
        that.groupList = [{
            _id:"0",
            name:"group1",
            playerList:[
                {_id:"0000",displayName:"KJN0", teamName:"team1"},
                {_id:"0001",displayName:"KJN1", teamName:"team2"},
                {_id:"0002",displayName:"KJN2", teamName:"team3"}
            ],
            tagList:["tag1","tag2"],
            matchList:[{
                // Array of Sides and each array having array of players
                sideInfo:[
                    [{_id:"0000",displayName:"KJN1", teamName:"team1"}],
                    [{_id:"0001",displayName:"KJN2", teamName:"team2"}],
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
                {_id:"0000",displayName:"KJN"},
                {_id:"0001",displayName:"KJN1"},
                {_id:"0002",displayName:"KJN2"}
            ],
            tagList:["tag1","tag2"],
            matchList:[{
                // Array of Sides and each array having array of players
                sideInfo:[
                    [{_id:"0000",displayName:"G2KJN1", teamName:"team1"}],
                    [{_id:"0001",displayName:"G2KJN2", teamName:"team2"}],
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
                    [{_id:"0000",displayName:"G2KJN1", teamName:"team1"}],
                    [{_id:"0001",displayName:"G2KJN3", teamName:"team2"}],
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

    that.add = function(groupInfo){
        if(groupInfo._id === undefined){
            groupInfo._id = that.getId();
        }
        that.groupList.push(groupInfo);
    }
    that.addMatchInfo = function(matchInfo, groupId){
        for(var i=0;i<that.groupList.length;i++ ){
            var id = that.groupList[i]._id;
            if(id === groupId){
                break;
            }
        }
        if(i === that.groupList.length){
            console.log("Error in group id", groupId);
            return;
        }
        var group = that.groupList[i];
        group.matchList.push(matchInfo);
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
