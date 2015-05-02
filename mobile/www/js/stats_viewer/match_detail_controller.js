angular.module('MyApp')
  .controller('MatchDetailCtrl', ['$scope', '$state','AlertService',
    'UserDataInitService', '$stateParams', 'GroupListService', 'MatchInfoParseService',
    function($scope, $state, AlertService, UserDataInitService, $stateParams,
        GroupListService, MatchInfoParseService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();

    $scope.matchInfo = $stateParams.matchInfo;
    $scope.mips = MatchInfoParseService;

}]);
