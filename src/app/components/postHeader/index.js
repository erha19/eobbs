(function () {

    angular.module('eobbs')


    .directive('postHeader', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/postHeader/index.html',
                replace: true,
                scope:{
                    title:'=description',
                    author:'=author',
                    time:'=time',
                    discuss:'=discuss',
                    edit:'&update',
                    drop:'&drop',
                    isChanageable:'=isChanageable'
                },
                controller: postHeader,
                controllerAs: 'postHeader'
            }
    }])
    



    postHeader.$inject = ['$scope', 'API', '$state','$timeout'];

    function postHeader($scope, API, $state,$timeout) {
        console.log($scope)
        var vm = this;
    }

})();