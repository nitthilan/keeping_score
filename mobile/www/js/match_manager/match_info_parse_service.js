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
    var getMaxIdx = function(array){
        var max = 0;
        var idx = -1;
        var secondIdx = -1;
        for(var i in array){
            if(array[i] > max){
                max = array[i];
                idx = i;
            }
            if(array[i] === max){
                secondIdx = i;
            }
        }
        // If there is another value same as max then return no winner
        if(secondIdx !== idx){idx = -1}
        return idx;
    }
    this.getGameWinner = function(curGame){
        return getMaxIdx(curGame.scoreList);
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
    this.getSetWinner = function(gameList, numSides, curGameWinner){
        var numGamesPerSide = this.getNumGamesPerSide(gameList, numSides);
        // Since current game winner would not be update
        numGamesPerSide[curGameWinner]++;
        return getMaxIdx(numGamesPerSide);
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
    this.getMatchWinner = function(setList, numSides, curSetWinner){
        var numSetsPerSide = this.getNumSetsPerSide(setList, numSides);
        // Since current set winner would not be update
        numSetsPerSide[curSetWinner]++;
        return getMaxIdx(numSetsPerSide);
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
