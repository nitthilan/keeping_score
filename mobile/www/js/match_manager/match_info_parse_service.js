angular.module('MyApp')
    .service('MatchInfoParseService', [function(){

    this.getSideNameTempalate = function(i){
        var t = ++i;
        return "Side "+t
    }
    this.getEmptyGame = function(numSides){
        var empty_game = {scoreList:[], winner:null};
        for(var i=0;i<numSides;i++){
            empty_game.scoreList.push(0);
        }
        return  empty_game;
    }
    this.getEmptySet = function(numSides){
        var empty_set = {gameList:[],winner:null,summary:[]};
        for(var i=0;i<numSides;i++){
            empty_set.summary.push(0);
        }
        empty_set.gameList.push(this.getEmptyGame(numSides));
        return empty_set
    }
    this.getNumGamesPerSide = function(gameList, numSides){
        var numGamesPerSide = [];
        for(var i=0;i<numSides;i++){
            numGamesPerSide[i] = 0;
        }
        for(var i in gameList){
            var game = gameList[i];
            numGamesPerSide[game.winner]++;
        }
        return numGamesPerSide;
    }
    this.getSetWinner = function(gameList, numSides){
        var numGamesPerSide = this.getNumGamesPerSide(gameList, numSides);
        var maxGames = 0;
        var winner = -1;
        for(var i in numGamesPerSide){
            if(numGamesPerSide[i] > maxGames){
                maxGames = numGamesPerSide[i];
                winner = i;
            }
        }
        return winner;
    }
    this.getNumSetsPerSide = function(setList, numSides){
        var numSetsPerSide = [];
        for(var i=0;i<numSides;i++){
            numSetsPerSide[i] = 0;
        }
        for(var i in setList){
            var set = setList[i];
            numSetsPerSide[set.winner]++;
        }
        return numSetsPerSide;
    }
    this.getMatchWinner = function(setList, numSides){
        var numSetsPerSide = this.getNumSetsPerSide(setList, numSides);
        var maxSets = 0;
        var winner = -1;
        for(var i in numSetsPerSide){
            if(numSetsPerSide[i] > maxSets){
                maxSets = numSetsPerSide[i];
                winner = i;
            }
        }
        return winner;
    }
    this.getSideInfo = function(sideList, scoreInfo){
        if(!sideList) return "";
        //console.log(sideList);
        var sideInfo = "";
        for(var i=0;i<sideList.length;i++){
            var sideName = "";
            for(var j=0;j<sideList[i].length;j++){
                sideName = sideName +
                    sideList[i][j].displayName +
                    "("+sideList[i][j].teamName +") ";
            }
            sideInfo = sideInfo + sideName + "[" +scoreInfo.summary[i];
            if(scoreInfo.winner === i){ sideInfo = sideInfo + "W";}
            sideInfo = sideInfo + "]";
            if(i !== sideList.length-1){
                sideInfo = sideInfo + " Vs ";
            }
        }
        return sideInfo;
    }
    this.getTag = function(tagList){
        var tagString = "";
        for(var i=0;i<tagList.length;i++){
            tagString = tagString + "#"+tagList[i];
            if(i !== tagList.length-1){
                tagString = tagString + ",";
            }
        }
        return tagString;
    }
}]);
