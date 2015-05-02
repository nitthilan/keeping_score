angular.module('MyApp')
  .controller('GroupStatsCtrl', ['$scope', '$state','AlertService','UserDataInitService',
    function($scope, $state, AlertService, UserDataInitService) {
    // Initialise the service into the scope so that it can be used directly in view for databinding
    UserDataInitService.init();

}]);
