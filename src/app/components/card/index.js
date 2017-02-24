(function () {

    angular.module('eobbs')


    .directive('card', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/card/index.html',
                replace: true,
                scope:{
                    id:'=id',
                    icon:'=icon',
                    titleContent:'=titleContent',
                    author:'=author',
                    discuss:'=discuss',
                    drop:'&',
                    toggle:'=toggle',
                    update:'&update',
                    isChanageable:'=isChanageable',
                    time:'=time'
                },
                controller: card,
                controllerAs: 'card'
            }
    }])




    card.$inject = ['$scope', 'API', '$state','$timeout'];

    function card($scope, API, $state,$timeout) {
        var vm = this;
    }

})();