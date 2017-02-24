(function () {

    angular.module('eobbs')


    .directive('cardBody', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/cardBody/index.html',
                replace: true,
                transclude: true,
                controller: cardBody,
                controllerAs: 'cardBody'
            }
    }])




    cardBody.$inject = ['$scope', 'API', '$state','$timeout'];

    function cardBody($scope, API, $state,$timeout) {
        var vm = this;
    }

})();