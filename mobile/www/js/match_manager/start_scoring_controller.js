angular.module('MyApp')
  .controller('StartScoringCtrl', ['$scope', '$state','AlertService',
    'UserDataInitService','$stateParams', 'MatchInfoParseService', 'GroupListService',
    function($scope, $state, AlertService, UserDataInitService, $stateParams,
        MatchInfoParseService, GroupListService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();

    // Initialise sideInfo and tagList
    /*$scope.sideInfo = [
        [{_id:"0000",displayName:"KJN1", teamName:"team1"}],
        [{_id:"0001",displayName:"KJN2", teamName:"team2"}],
    ];*/
    $scope.sideInfo = $stateParams.sideInfo;
    $scope.tagList = $stateParams.tagList;
    $scope.groupId = $stateParams.groupId;
    $scope.mips = MatchInfoParseService;


    $scope.scoreInfo = {setList:[], winner:null,summary:[]};
    for(var i=0;i<$scope.sideInfo.length;i++){
        $scope.scoreInfo.summary.push(0);
    }
    $scope.getCurSetIdx = function(){
        return $scope.scoreInfo.setList.length-1;
    }
    $scope.getCurGameIdx = function(){
        var curSetIdx = $scope.getCurSetIdx();
        return $scope.scoreInfo.setList[curSetIdx].gameList.length-1;
    }
    var validateSet = function(){
        var curGame = $scope.getCurGame();
        var winner = curGame.winner;
        var gameList = $scope.scoreInfo.setList[$scope.getCurSetIdx()].gameList;
        var numSides = $scope.sideInfo.length;
        var expWinner = $scope.mips.getSetWinner(gameList, numSides);
        if(expWinner !== winner){
            AlertService.message("Check winner is valid.Expected: "+
                $scope.mips.getSideNameTempalate(expWinner)+" .Choosen: "+
                $scope.mips.getSideNameTempalate(winner) ,"Set Over");
            return false;
        }
        return true;
    }
    $scope.addNewSet = function(){
        if(!validateGame()) return;
        if(!validateSet()) return;
        var curGame = $scope.getCurGame();
        var winner = curGame.winner;
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].winner = winner;
        $scope.scoreInfo.summary[winner]++;
        AlertService.message("Winner: "+$scope.mips.getSideNameTempalate(curGame.winner)+
            ". Starting new Set", "New Set");
        $scope.scoreInfo.setList.push($scope.mips.getEmptySet($scope.sideInfo.length));
        //console.log($scope.scoreInfo);
        //console.log($scope.scoreInfo.setList[$scope.getCurSetIdx()].gameList[$scope.getCurGameIdx()].scoreList[0]);
    }
    $scope.scoreInfo.setList.push($scope.mips.getEmptySet($scope.sideInfo.length));

    var validateGame = function(){
        var curGame = $scope.getCurGame();
        if(curGame.winner === null){
            AlertService.message("Choose a winner","Game Over");
            return false;
        }
        var maxScore = 0;
        var winnerIdx = -1;
        for(var i in curGame.scoreList){
            if(curGame.scoreList[i] > maxScore){
                maxScore = curGame.scoreList[i];
                winnerIdx = i;
            }
        }
        if(curGame.winner !== winnerIdx){
            AlertService.message("Check winner is valid.Expected: "+
                $scope.mips.getSideNameTempalate(winnerIdx)+" .Set: "+
                $scope.mips.getSideNameTempalate(curGame.winner) ,"Game Over");
            return false;
        }
        return true;
    }
    $scope.addNewGame = function(){
        if(!validateGame()) return;
        var curGame = $scope.getCurGame();
        AlertService.message("Winner: "+$scope.mips.getSideNameTempalate(curGame.winner)+
            ". Starting new Game", "New Game");
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].summary[curGame.winner]++;
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].gameList
            .push($scope.mips.getEmptyGame($scope.sideInfo.length));
    }
    $scope.endMatch = function(){
        if(!validateGame()) return;
        if(!validateSet()) return;
        var curGame = $scope.getCurGame();
        var winner = curGame.winner;
        // Update the current set information
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].winner = winner;
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].summary[curGame.winner]++;
        // Validate the match winner
        var expWinner = $scope.mips.getMatchWinner($scope.scoreInfo.setList,
            $scope.sideInfo.length);
        if(winner !== expWinner){
            AlertService.message("Check winner is valid.Expected: "+
                $scope.mips.getSideNameTempalate(expWinner)+" .Set: "+
                $scope.mips.getSideNameTempalate(winner) ,"Match Over");
            return;
        }
        // Update match information
        $scope.scoreInfo.winner = winner;
        $scope.scoreInfo.summary[winner]++;
        AlertService.message("Winner: "+
            $scope.mips.getSideNameTempalate(curGame.winner), "Match Over");

        var matchInfo = {
            // https://docs.angularjs.org/api/ng/function/angular.toJson [stripping $$]
            // https://docs.angularjs.org/api/ng/function/angular.fromJson
            sideInfo:angular.fromJson(angular.toJson($scope.sideInfo)),
            tagList:$scope.tagList,
            date: Date(),
            scoreInfo:$scope.scoreInfo
        }
        GroupListService.addMatchInfo(matchInfo, $scope.groupId, function(error){
            if(error){
                AlertService.message("Error in saving matchInfo "+error, "Match Over");
                return;
            }
            $state.go('user_home');
        });
    }

    $scope.getCurGame = function(){
        var setIdx = $scope.getCurSetIdx();
        var gameIdx = $scope.getCurGameIdx();
        return $scope.scoreInfo.setList[setIdx].gameList[gameIdx];
    }

    var curScore = function(index, value){
        var curGame = $scope.getCurGame();
        //console.log(value);
        if(value !== undefined) curGame.scoreList[index] = value;
        return curGame.scoreList[index];
    }

    $scope.incScore = function($index){
        var score = curScore($index);
        curScore($index, ++score);
        //console.log("Entered increment score", $index, score);
        //console.log("The winner is ", $scope.getCurGame().winner);
    }
    $scope.decScore = function($index){
        var score = curScore($index);
        score = score - 1;
        if(score < 0) {score = 0;}
        curScore($index, score);
        //console.log("Entered decrement score",$index, score);
    }

}]);
