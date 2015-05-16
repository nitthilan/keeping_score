angular.module('MyApp')
    .service('MatchInfoParseService', ['$filter', function($filter){

    var that = this;

    that.getSideNameTempalate = function(i){
        var t = ++i;
        return "Side "+t
    }
    that.getEmptyGame = function(numSides){
        var empty_game = {scoreList:[], winner:null};
        for(var i=0;i<numSides;i++){
            empty_game.scoreList.push(0);
        }
        return  empty_game;
    }
    that.getEmptySet = function(numSides){
        var empty_set = {gameList:[],winner:null,summary:[]};
        for(var i=0;i<numSides;i++){
            empty_set.summary.push(0);
        }
        empty_set.gameList.push(that.getEmptyGame(numSides));
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
    that.getGameWinner = function(curGame){
        return getMaxIdx(curGame.scoreList);
    }
    that.getNumGamesPerSide = function(gameList, numSides){
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
    that.getSetWinner = function(gameList, numSides, curGameWinner){
        var numGamesPerSide = that.getNumGamesPerSide(gameList, numSides);
        // Since current game winner would not be update
        numGamesPerSide[curGameWinner]++;
        return getMaxIdx(numGamesPerSide);
    }
    that.getNumSetsPerSide = function(setList, numSides){
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
    that.getMatchWinner = function(setList, numSides, curSetWinner){
        var numSetsPerSide = that.getNumSetsPerSide(setList, numSides);
        // Since current set winner would not be update
        numSetsPerSide[curSetWinner]++;
        return getMaxIdx(numSetsPerSide);
    }
    that.getSideName = function(sideInfo, limitName, limitTeam){
        var sideName = "";
        for(var j=0;j<sideInfo.length;j++){
            sideName = sideName +
                $filter('limitTo')(sideInfo[j].displayName, limitName) +
                "("+$filter('limitTo')(sideInfo[j].teamName, limitTeam) +") ";
        }
        return sideName;
    }
    that.getSideInfo = function(sideList, scoreInfo, limitName, limitTeam){
        if(!sideList) return "";
        //console.log(sideList);
        var sideInfo = "";
        for(var i=0;i<sideList.length;i++){
            var sideName = that.getSideName(sideList[i], limitName, limitTeam);
            sideInfo = sideInfo + sideName + "[" +scoreInfo.summary[i];
            if(scoreInfo.winner === i){ sideInfo = sideInfo + "W";}
            sideInfo = sideInfo + "]";
            if(i !== sideList.length-1){
                sideInfo = sideInfo + " Vs ";
            }
        }
        return sideInfo;
    }
    that.getTag = function(tagList){
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
