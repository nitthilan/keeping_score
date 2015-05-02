angular.module('MyApp')
  .controller('CreateGroupCtrl', ['$scope', '$state','$auth', 'AlertService',
    'UserDataInitService','$ionicModal', '$filter', 'GroupListService',
    function($scope, $state, $auth, AlertService, UserDataInitService,
        $ionicModal, $filter, GroupListService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();

    $scope.groupInfoEdit = {
        name:null,
        playerList:[],
        tagList:[],

    };
    $scope.saveGroupInfo = function(){
        if(!$scope.groupInfoEdit.name){
            AlertService.message('Invalid Name', "Group");
            return;
        }
        if(!$scope.groupInfoEdit.playerList.length){
            AlertService.message('Empty player list', "Group");
            return;
        }
        GroupListService.add($scope.groupInfoEdit);
        $state.go('user_home');
    }

    $ionicModal.fromTemplateUrl('search_and_add_players.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.search_player_modal = modal;
    });
    $ionicModal.fromTemplateUrl('create_team.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.create_team_modal = modal;
    });
    $ionicModal.fromTemplateUrl('create_tags.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.create_tags_modal = modal;
    });
    $scope.openSearchPlayerModal = function() {
        $scope.search_player_modal.show();
    };
    $scope.closeSearchPlayerModal = function() {
        //console.log("The selected player "+$scope.selected_player.data);
        $scope.search_player_modal.hide();
    };
    $scope.player_search_list = [];
    $scope.search = {name:null};
    $scope.searchPlayers = function(name){
        console.log("Search string"+name);
        $scope.player_search_list = GroupListService.searchName(name);
        $scope.search.name = null;

    }
    $scope.choosenPlayer = function(player){
        if(!$filter('filter')($scope.groupInfoEdit.playerList, {_id:player._id}).length){
            $scope.groupInfoEdit.playerList.push({_id:player._id,
                displayName:player.displayName, teamName: null});
        }
    };
    $scope.removePlayer = function($index){
        $scope.groupInfoEdit.playerList.splice($index, 1)
    };

    /*$scope.selected_player = {
        data:""
    };*/

    $scope.teamList = {};
    for(i in $scope.groupInfoEdit.playerList){
        if($scope.groupInfoEdit.playerList.teamName){
            $scope.teamList[$scope.groupInfoEdit.playerList.teamName] = true;
        }
    }
    $scope.openCreateTeamModal = function(teamName) {
        $scope.team = {unchoosenPlayerList:[],name:null,choosenPlayerList:[]}

        for (index in $scope.groupInfoEdit.playerList){
            var player = $scope.groupInfoEdit.playerList[index];
            if(!player.teamName){
                $scope.team.unchoosenPlayerList.push(player);
            }
        }
        if(teamName){
            for (index in $scope.groupInfoEdit.playerList){
                var player = $scope.groupInfoEdit.playerList[index];
                if(player.teamName===teamName){
                    $scope.team.choosenPlayerList.push(player);
                }
            }
            $scope.team.name = teamName;
        }
        //console.log($scope.team.unchoosenPlayerList);
        $scope.create_team_modal.show();
    };
    $scope.closeCreateTeamModal = function() {
        var team = $scope.team;
        if(team.name && team.choosenPlayerList.length){
            for(i in $scope.team.unchoosenPlayerList){
                var player = $scope.team.unchoosenPlayerList[i];
                $filter('filter')($scope.groupInfoEdit.playerList,
                    {_id:player._id})[0].teamName = null;
            }
            for(i in $scope.team.choosenPlayerList){
                var player = $scope.team.choosenPlayerList[i];
                $filter('filter')($scope.groupInfoEdit.playerList,
                    {_id:player._id})[0].teamName = $scope.team.name;
            }
            $scope.teamList[$scope.team.name] = true;
        }
        $scope.create_team_modal.hide();
    };
    $scope.addPlayerToTeam = function(player, $index){
        $scope.team.choosenPlayerList.push(player);
        $scope.team.unchoosenPlayerList.splice($index, 1);
    };
    $scope.removePlayerFromTeam = function($index){
        var player = $scope.team.choosenPlayerList.splice($index, 1);
        $scope.team.unchoosenPlayerList.push(player[0]);
    }

    $scope.openCreateTagsModal = function(modalName) {
        $scope.create_tags_modal.show();
    };
    $scope.closeCreateTagsModal = function(string) {
        $scope.create_tags_modal.hide();
    };
    $scope.tag= {name : null};
    $scope.addNewTag = function(new_tag_name){
        if(!new_tag_name|| !new_tag_name.length) return;
        if(!$filter('filter')($scope.groupInfoEdit.tagList, new_tag_name).length){
            $scope.groupInfoEdit.tagList.push(new_tag_name);
        }
        $scope.tag.name = null;
    }

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.search_player_modal.remove();
        $scope.create_team_modal.remove();
        $scope.create_tags_modal.remove();
    });

}]);
