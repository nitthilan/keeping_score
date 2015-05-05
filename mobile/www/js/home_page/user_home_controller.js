angular.module('MyApp')
  .controller('UserHomeCtrl', ['$scope', 'UserDataInitService', '$state',
    '$auth', 'AlertService', 'mySocket','DataLoadingAnimationService',
    'GroupListService', 'MatchInfoParseService','UserProfile',
    function($scope, UserDataInitService,
      $state, $auth, AlertService, mySocket, DataLoadingAnimationService,
      GroupListService, MatchInfoParseService, UserProfile) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();
    console.log(UserProfile.userProfile);
    $scope.openCreateMatch=function() {
      $state.go('create_match');
    };
    $scope.openCreateGroup=function() {
      $state.go('create_group');
    };
    $scope.openGroupMatchList=function(group) {
      $state.go('group_match_list',{groupInfo:group});
    }
    $scope.logout = function(){
        $auth.logout().then(function() {
            mySocket.disconnect();
            AlertService.message('You have been logged out');
        });
    };
    $scope.groupList = GroupListService.groupList;
    $scope.mips = MatchInfoParseService;
    $scope.userProfile = UserProfile;

  }]);

