(function () {

    angular.module('eobbs')


    .directive('eoContainer', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/eoContainer/index.html',
                replace: true,
                transclude: true,
                controller: eoContainer,
                controllerAs: 'eoContainer'
            }
    }])

    eoContainer.$inject = ['$scope','$rootScope','$state','$timeout'];

    function eoContainer($scope,$rootScope,$state,$timeout) {
        var vm = this;
        vm.state=true;
        $timeout(function(){
            vm.state=$state.current.name!='issues';//true代表是在首页，false代表在帖子页面
        },1000,true)
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if(toState.name=='issues'){
                vm.state=false;
            }
            else
                vm.state=true;
        });

    }

})();