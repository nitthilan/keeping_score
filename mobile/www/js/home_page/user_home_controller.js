angular.module('MyApp')
  .controller('UserHomeCtrl', ['$scope', 'Account','UserDataInitService', '$state',
    '$auth', 'AlertService', 'mySocket','DataLoadingAnimationService',
    'GroupListService', 'MatchInfoParseService',
    function($scope, Account, UserDataInitService,
      $state, $auth, AlertService, mySocket, DataLoadingAnimationService,
      GroupListService, MatchInfoParseService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();
    // View uses the Account service directly
    Account.getProfile(function(userProfile){
    $scope.userProfile = userProfile;
    });

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

  }]);

