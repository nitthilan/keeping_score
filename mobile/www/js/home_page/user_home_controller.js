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
      MatchListService.readMatchList(groupInfo._id);
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
    $scope.groupMatchList = MatchListService.groupMatchList;
    $scope.groupMatchMeta = MatchListService.groupMatchMeta;
    $scope.mips = MatchInfoParseService;
    $scope.userProfile = UserProfile;
    MessageHandlingService.getNewMessages();
    console.log("groupList", Object.keys($scope.groupList).length);

    $scope.getMetaList = function(){
      var metaList = [];
      angular.forEach($scope.groupMatchMeta, function(value, key) {
        this.push(value);
      }, metaList);
      //console.log(metaList);
      return metaList;
    }

  }]);
angular.module('MyApp')
.filter('keylength', function(){
  return function(input){
    if(!angular.isObject(input)){
      throw Error("Usage of non-objects with keylength filter!!")
    }
    return Object.keys(input).length;
  }
});

angular.module('MyApp')
.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    console.log(items, field, reverse);
    return filtered;
  };
});


