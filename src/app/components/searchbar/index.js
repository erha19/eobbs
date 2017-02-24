(function () {

    angular.module('eobbs')


    .directive('searchbar', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/searchbar/index.html',
                replace: true,
                controller: searchbar,
                controllerAs: 'searchbar'
            }
    }])




    searchbar.$inject = ['$scope', '$rootScope', '$state','$timeout','USER_ROLES','ngToast'];

    function searchbar($scope, $rootScope, $state,$timeout,USER_ROLES,ngToast) {
        var vm = this;

        vm.submitSearchTip = function(event){
            if(event){
                event.preventDefault();
                $scope.$emit('SEARCH_TOPIC',vm.search_keyword)
            }
        }
        vm.publish=function(){
            if($scope.role<USER_ROLES.USER){
                ngToast.info('尚未登录，请登陆后操作');
            }else{
                $state.go('dashboard.publish')
            }
        }
    }

})();