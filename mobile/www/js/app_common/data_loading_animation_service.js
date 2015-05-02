angular.module('MyApp')
    .service('DataLoadingAnimationService', ['$ionicLoading',
        function($ionicLoading){
    this.show = function(){
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>'
        });
    };
    this.hide = function(){
        $ionicLoading.hide();
    };
}]);
