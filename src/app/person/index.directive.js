(function () {

    angular.module('eobbs').directive('eoUser', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/person/index.html',
                replace:true,
                controller: person,
                controllerAs: 'person',
                link: function (scope, element, attrs, ngModel) {

                }
            }
        }])
    person.$inject = ['$scope','$rootScope','$state','$timeout','API','PAGE']
    function person($scope,$rootScope,$state,$timeout,API,PAGE) {
        var vm = this;
    }

})();

