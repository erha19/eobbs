(function () {

    angular.module('eobbs')


    .directive('replyCard', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/replyCard/index.html',
                replace: true,
                scope:{
                    id:'=id',
                    content:'=content',
                    topicTitle:'=topicTitle',
                    drop:'&',
                    time:'=time'
                },
                controller: replyCard,
                controllerAs: 'replyCard'
            }
    }])




    replyCard.$inject = ['$scope', 'API', '$sce','$state','$timeout','Tool'];

    function replyCard($scope, API,$sce, $state,$timeout,Tool) {
        var vm = this;
        $scope.content=$sce.trustAsHtml(Tool.htmlDecodeByRegExp($scope.content));
    }

})();