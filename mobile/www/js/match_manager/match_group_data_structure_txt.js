/* var nameList = [
        {_id:"0000",displayName:"KJN"},
        {_id:"0001",displayName:"KJN1"},
        {_id:"0002",displayName:"KJN2"},
        {_id:"0003",displayName:"KJN3"}
        ];*/


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
