angular.module('MyApp')
  .controller('UserHomeCtrl', ['$scope', 'UserDataInitService', '$state',
    '$auth', 'AlertService', 'mySocket','MessageHandlingService',
    'GroupListService', 'MatchInfoParseService','UserProfile', 'MatchListService',
    function($scope, UserDataInitService,
      $state, $auth, AlertService, mySocket, MessageHandlingService,
      GroupListService, MatchInfoParseService, UserProfile, MatchListService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();
    console.log(UserProfile.userProfile);
    $scope.openCreateMatch=function() {
      $state.go('create_match');
    };
    $scope.openCreateGroup=function() {
      $state.go('create_group');
    };
    $scope.openGroupMatchList=function(groupInfo, matchList) {
      $state.go('group_match_list',{groupInfo:groupInfo, matchList:matchList});
    }
    $scope.logout = function(){
        $auth.logout().then(function() {
            mySocket.disconnect();
            AlertService.message('You have been logged out');
        });
    };
    $scope.refreshMessageList = function(){
      MessageHandlingService.getNewMessages();
    }
    $scope.groupList = GroupListService.groupList;
    $scope.matchList = MatchListService.groupMatchList;
    $scope.mips = MatchInfoParseService;
    $scope.userProfile = UserProfile;
    MessageHandlingService.getNewMessages();

  }]);

