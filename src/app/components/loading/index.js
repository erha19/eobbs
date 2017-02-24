(function () {

    angular.module('eobbs')


    .directive('eoLoad', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/loading/index.html',
                replace: true,
                scope:{
                    show:'='
                },
                controller: loading,
                controllerAs: 'loading'
            }
    }])




    loading.$inject = ['$scope', '$document','$window', '$state','$timeout'];

    function loading($scope, $document,$window, $state,$timeout) {
        var vm = this;
 
    }

})();