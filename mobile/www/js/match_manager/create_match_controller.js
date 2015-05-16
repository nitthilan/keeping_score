angular.module('MyApp')
  .controller('CreateMatchCtrl', ['$scope', '$state','AlertService', '$ionicModal',
   'GroupListService','MatchInfoParseService',
    function($scope, $state, AlertService, $ionicModal,
        GroupListService, MatchInfoParseService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    //UserDataInitService.init();

    $scope.mips = MatchInfoParseService;

    $scope.groupList = GroupListService.groupList;

    $scope.selected_group = null;
    $ionicModal.fromTemplateUrl('choose_group.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.choose_group_modal = modal;
    });
    $scope.openChooseGroupModal = function() {
        $scope.choose_group_modal.show();
    };
    $scope.closeChooseGroupModal = function(group) {
        //console.log("The selected player "+$scope.selected_player.data);
        $scope.selected_group = group;
        $scope.unchoosenList = [];
        for(var i=0;i<$scope.selected_group.playerList.length;i++){
            $scope.unchoosenList.push($scope.selected_group.playerList[i]);
        }
        $scope.groupTagList = [];
        for(var i=0;i<$scope.selected_group.tagList.length;i++){
            $scope.groupTagList.push($scope.selected_group.tagList[i]);
        }
        init_num_sides();
        init_side_info();
        $scope.choose_group_modal.hide();
    };


    var init_num_sides = function(){
        $scope.sides={num_sides:2, num_players_per_side:1}
    }
    init_num_sides();
    $ionicModal.fromTemplateUrl('num_sides.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.num_sides_modal = modal;
    });
    $scope.openNumSidesModal = function() {
        $scope.num_sides_modal.show();
    };
    $scope.closeNumSidesModal = function() {
        console.log("Num sides "+$scope.sides.num_sides+"Num players "
            +$scope.sides.num_players_per_side);
        $scope.num_sides_modal.hide();
        init_side_info();
    };
    var init_side_info = function(){
        $scope.sideInfo = [];
        for(var i=0;i<$scope.sides.num_sides;i++){
            $scope.sideInfo.push([]);
        }
    }
    init_side_info();


    $ionicModal.fromTemplateUrl('choose_players.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.choose_players_modal = modal;
    });
    $scope.openChoosePlayersModal = function($index) {
        //console.log("Choosen index ", $index);
        $scope.choosen_side = {index : $index};
        $scope.choose_players_modal.show();
    };
    $scope.addPlayer = function(player, $index){
        $scope.unchoosenList.splice($index, 1)
        $scope.sideInfo[$scope.choosen_side.index].push(player);
    }
    $scope.removePlayer = function(player, $index){
        $scope.unchoosenList.push(player);
        $scope.sideInfo[$scope.choosen_side.index].splice($index, 1);
    }
    $scope.closeChoosePlayersModal = function() {
        if($scope.sideInfo[$scope.choosen_side.index].length !=
            $scope.sides.num_players_per_side){
            AlertService.message('Require '+$scope.sides.num_players_per_side+" players per side", "Num Players");
            return;
        }
        $scope.choose_players_modal.hide();
    };

    $ionicModal.fromTemplateUrl('choose_tags.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.choose_tags_modal = modal;
    });
    $scope.openChooseTagsModal = function() {
        $scope.choose_tags_modal.show();
    };
    $scope.matchTagList=[];
    $scope.addTag = function(tag, $index){
        $scope.groupTagList.splice($index, 1)
        $scope.matchTagList.push(tag);
    }
    $scope.removeTag = function(tag, $index){
        $scope.groupTagList.push(tag);
        $scope.matchTagList.splice($index, 1);
    }
    $scope.closeChooseTagsModal = function() {
        $scope.choose_tags_modal.hide();
    };


    $scope.startMatch = function(){
        //console.log($scope.sideInfo);
        $state.go('start_scoring',
            {sideInfo:$scope.sideInfo, tagList:$scope.matchTagList,
                groupId:$scope.selected_group._id});
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.choose_group_modal.remove();
        $scope.num_sides_modal.remove();
        $scope.choose_players_modal.remove();
        $scope.choose_tags_modal.remove();
    });

}]);
