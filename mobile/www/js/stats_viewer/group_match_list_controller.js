angular.module('MyApp')
  .controller('GroupMatchListCtrl', ['$scope', '$state','AlertService',
    'UserDataInitService', 'GroupListService', '$stateParams', 'MatchInfoParseService',
    function($scope, $state, AlertService, UserDataInitService, GroupListService,
        $stateParams, MatchInfoParseService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();

    $scope.groupInfo = $stateParams.groupInfo;

    $scope.matchList = $scope.groupInfo.matchList;//groupInfoGroupListService.getMatchList(groupId);
    $scope.mips = MatchInfoParseService;
    $scope.openMatchDetail = function(match){
        $state.go('match_detail',{matchInfo:match});
    }
    $scope.editGroup = function(){
        $state.go('create_group', {groupInfo:$scope.groupInfo});
    }

}]);
