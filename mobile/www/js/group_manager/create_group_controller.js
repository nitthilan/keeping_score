angular.module('MyApp')
  .controller('CreateGroupCtrl', ['$scope', '$state','$auth', 'AlertService',
    'UserDataInitService','$ionicModal', '$filter', 'GroupListService',
    'UserProfile', '$stateParams',
    function($scope, $state, $auth, AlertService, UserDataInitService,
        $ionicModal, $filter, GroupListService, UserProfile, $stateParams) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();

    if($stateParams.groupInfo){
        $scope.groupInfoEdit = {
            name:$stateParams.groupInfo.name,
            playerList:$stateParams.groupInfo.playerList,
            tagList:$stateParams.groupInfo.tagList,
        };
    }
    else{
        $scope.groupInfoEdit = {
            name:null,
            playerList:[],
            tagList:[],
            matchList:[]
        };
    }


    var getPlayer = function(player, isAdmin){
        return {playerId:player._id, displayName:player.displayName,
            teamName: null, isAdmin:isAdmin}
    }


    $scope.saveGroupInfo = function(){
        if(!$scope.groupInfoEdit.name){
            AlertService.message('Invalid Name', "Group");
            return;
        }
        if(!$scope.groupInfoEdit.playerList.length){
            AlertService.message('Empty player list', "Group");
            return;
        }
        // Adding the logged in user as administrator
        if(!UserProfile.userProfile){
            AlertService.message('Unable to receive logged in user', "Group");
            return;
        }
        var loggedUser = $filter('filter')($scope.groupInfoEdit.playerList,
            {playerId:UserProfile.userProfile._id});
        if(!loggedUser.length){
            $scope.groupInfoEdit.playerList.push(getPlayer(UserProfile.userProfile, true));
        }
        else{
            loggedUser[0].isAdmin = true
        }
        //console.log("groupInfo add", $scope.groupInfoEdit);
        var callback = function(error){
            if(error){
                console.log("Error in group", error, $scope.groupInfoEdit);
                AlertService.message('Error in storing the group'+error, "Group");
                return;
            }
            $state.go('user_home');
            MessageHandlingService.getNewMessages();
        }
        if(!$stateParams.groupInfo){
            GroupListService.create($scope.groupInfoEdit, callback);
        }
        else{
            GroupListService.edit($stateParams.groupInfo._id,
                $scope.groupInfoEdit, callback);
        }
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
        if(!name|| !name.length) return;
        //console.log("Search string "+name);
        GroupListService.searchName(name, function(error, nameList){
            if(error){
                AlertService.message('Error in Query'+error, "Search Player");
                return;
            }
            $scope.player_search_list = nameList;
        });
        $scope.search.name = null;

    }
    $scope.choosenPlayer = function(player){
        if(!$filter('filter')($scope.groupInfoEdit.playerList,
            {playerId:player._id}).length){
            $scope.groupInfoEdit.playerList.push(getPlayer(player, false));
        }
        $scope.player_search_list = null;
    };
    $scope.removePlayer = function($index){
        $scope.groupInfoEdit.playerList.splice($index, 1)
    };

    $scope.teamList = {};
    for(var i in $scope.groupInfoEdit.playerList){
        //console.log($scope.groupInfoEdit.playerList[i].teamName);
        if($scope.groupInfoEdit.playerList[i].teamName){
            $scope.teamList[$scope.groupInfoEdit.playerList[i].teamName] = true;
        }
    }
    //console.log($scope.teamList);
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
