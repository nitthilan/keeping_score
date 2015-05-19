angular.module('MyApp')
  .controller('GroupMatchListCtrl', ['$scope', '$state','AlertService',
    'GroupListService', '$stateParams', 'MatchInfoParseService',
    function($scope, $state, AlertService, GroupListService,
        $stateParams, MatchInfoParseService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    //UserDataInitService.init();

    $scope.groupInfo = $stateParams.groupInfo;

    $scope.matchList = $stateParams.matchList;//groupInfoGroupListService.getMatchList(groupId);
    $scope.mips = MatchInfoParseService;
    $scope.openMatchDetail = function(match){
        $state.go('match_detail',{matchInfo:match});
    }
    $scope.editGroup = function(){
        $state.go('create_group', {groupInfo:$scope.groupInfo});
    }
    $scope.openCreateMatch = function(){
        $state.go('create_match',{groupInfo:$scope.groupInfo});
    }
}]);
