angular.module('MyApp')
  .controller('StartScoringCtrl', ['$scope', '$state','AlertService',
    'UserDataInitService','$stateParams', 'MatchInfoParseService',
    'MatchListService', 'MessageHandlingService',
    function($scope, $state, AlertService, UserDataInitService, $stateParams,
        MatchInfoParseService, MatchListService, MessageHandlingService) {
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
    $scope.getCurGame = function(){
        var setIdx = $scope.getCurSetIdx();
        var gameIdx = $scope.getCurGameIdx();
        return $scope.scoreInfo.setList[setIdx].gameList[gameIdx];
    }

    $scope.addNewGame = function(){
        var winner = $scope.mips.getGameWinner($scope.getCurGame());
        if(winner === -1) {
            AlertService.message("Draw not possible :(","Game Winner");
            return;
        }
        AlertService.confirm(
            "Starting New Game. Is "+$scope.mips.getSideNameTempalate(winner)+" the winner?",
            "Game Winner",
            function(response){
        if(!response) return;
        // Update Game level
        $scope.getCurGame().winner = winner;
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].summary[$scope.getCurGame().winner]++;
        // Add New Game
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].gameList
            .push($scope.mips.getEmptyGame($scope.sideInfo.length));
        });
    }
    $scope.addNewSet = function(){
        var winner = $scope.mips.getGameWinner($scope.getCurGame());
        if(winner === -1) {
            AlertService.message("Game draw not possible :(","Game Winner");
            return;
        }
        var setWinner =
            $scope.mips.getSetWinner(
                $scope.scoreInfo.setList[$scope.getCurSetIdx()].gameList,
                $scope.sideInfo.length, winner);
        if(setWinner === -1) {
            AlertService.message("Set draw not possible :(","Set Winner");
            return;
        }
        if(setWinner !== winner) {
            console.error("Set winner not equal to game winner. Not Possible",setWinner, winner);
        }
        AlertService.confirm(
            "Starting New Set. Is "+$scope.mips.getSideNameTempalate(winner)+" the winner?",
            "Set Winner",
            function(response){
        if(!response) return;
        // Update game level
        $scope.getCurGame().winner = winner;
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].summary[$scope.getCurGame().winner]++;
        // Update set level
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].winner = winner;
        $scope.scoreInfo.summary[winner]++;
        // Add new set
        $scope.scoreInfo.setList.push($scope.mips.getEmptySet($scope.sideInfo.length));
        });
    }
    $scope.scoreInfo.setList.push($scope.mips.getEmptySet($scope.sideInfo.length));



    $scope.endMatch = function(){
        var winner = $scope.mips.getGameWinner($scope.getCurGame());
        if(winner === -1) {
            AlertService.message("Game draw not possible :(","Game Winner");
            return;
        }
        var setWinner =
            $scope.mips.getSetWinner(
                $scope.scoreInfo.setList[$scope.getCurSetIdx()].gameList,
                $scope.sideInfo.length, winner);
        if(setWinner === -1) {
            AlertService.message("Set draw not possible :(","Set Winner");
            return;
        }
        if(setWinner !== winner) {
            console.error("Set winner not equal to game winner. Not Possible",setWinner, winner);
        }
        var matchWinner = $scope.mips.getMatchWinner($scope.scoreInfo.setList,
            $scope.sideInfo.length, setWinner);
        if(matchWinner === -1) {
            AlertService.message("Match draw not possible :(","Match Winner");
            return;
        }
        if(matchWinner !== setWinner) {
            console.error("Match winner not equal to set winner. Not Possible",matchWinner, setWinner);
        }
        AlertService.confirm(
            "Is "+$scope.mips.getSideNameTempalate(winner)+" the winner?",
            "Match Winner",
            function(response){
        if(!response) return;
        // Update game level
        $scope.getCurGame().winner = winner;
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].summary[$scope.getCurGame().winner]++;
        // Update set level
        $scope.scoreInfo.setList[$scope.getCurSetIdx()].winner = winner;
        $scope.scoreInfo.summary[winner]++;
        // Update match information
        $scope.scoreInfo.winner = winner;
        var matchInfo = {
            // https://docs.angularjs.org/api/ng/function/angular.toJson [stripping $$]
            // https://docs.angularjs.org/api/ng/function/angular.fromJson
            sideInfo:angular.fromJson(angular.toJson($scope.sideInfo)),
            tagList:$scope.tagList,
            date: Date(),
            scoreInfo:$scope.scoreInfo
        }
        MatchListService.addMatchInfo(matchInfo, $scope.groupId, function(error){
        if(error){
            AlertService.message("Error in saving matchInfo "+error, "Match Over");
            return;
        }
        $state.go('user_home');
        MessageHandlingService.getNewMessages();
        });
        });
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
