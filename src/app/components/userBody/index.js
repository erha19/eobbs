(function () {

    angular.module('eobbs')


    .directive('userBody', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/userBody/index.html',
                replace: true,
                transclude: true,
                controller: userBody,
                controllerAs: 'userBody'
            }
    }])




    userBody.$inject = ['$scope', 'API', '$state','$timeout'];

    function userBody($scope, API, $state,$timeout) {
        var vm = this;
    }

})();