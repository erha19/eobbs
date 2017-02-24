(function () {

    angular.module('eobbs')


    .directive('replySearchbar', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/replySearchbar/index.html',
                replace: true,
                controller: replySearchbar,
                controllerAs: 'replySearchbar'
            }
    }])




    replySearchbar.$inject = ['$scope', 'API', '$state','$timeout'];

    function replySearchbar($scope, API, $state,$timeout) {
        var vm = this;

        vm.submitSearchTip = function(event){
            if(event){
                event.preventDefault();
                $scope.$emit('SEARCH_COMMENT',vm.search_keyword)
            }
        }
    }

})();