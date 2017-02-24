(function () {

    angular.module('eobbs')


    .directive('messageCard', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/messageCard/index.html',
                replace: true,
                scope:{
                    id:'=id',
                    content:'=content',
                    messageTitle:'=messageTitle',
                    read:'=read',
                    from:'=from',
                    drop:'&',
                    time:'=time'
                },
                controller: messageCard,
                controllerAs: 'messageCard'
            }
    }])




    messageCard.$inject = ['$scope', 'API', '$sce','$state','$timeout','Tool'];

    function messageCard($scope, API,$sce, $state,$timeout,Tool) {
        var vm = this;
        $scope.content=$sce.trustAsHtml(Tool.htmlDecodeByRegExp($scope.content));
        $scope.from=JSON.parse($scope.from);
        vm.toggleRead=function(){
            if(!$scope.read){
                $scope.$emit('READ_MESSAGE',$scope.id);
                $scope.read=true;
            }
            vm.toggle=!vm.toggle;
        }
    }

})();