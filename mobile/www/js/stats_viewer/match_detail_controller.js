angular.module('MyApp')
  .controller('MatchDetailCtrl', ['$scope', '$state','AlertService',
    '$stateParams', 'MatchInfoParseService',
    function($scope, $state, AlertService, $stateParams,
        MatchInfoParseService) {

    $scope.matchInfo = $stateParams.matchInfo;
    $scope.mips = MatchInfoParseService;

}]);
