(function () {

    angular.module('eobbs')


    .directive('richEditor', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/richEditor/index.html',
                replace: true,
                transclude: true,
                scope: {
                    value: '=value',
                    editorHeight:'@editorHeight'
                },
                link: function(scope, element, attrs, ngModel) {
                    element.on('scroll', function(e) {
                        e.stopPropagation();
                    });
                },
                controller: richEditor,
                controllerAs: 'richEditor'
            }
    }])




    richEditor.$inject = ['$scope','$rootScope', 'API','$timeout','USER_ROLES','ngToast'];

    function richEditor($scope,$rootScope, API,$timeout,USER_ROLES,ngToast) {
        var vm = this;

        vm.role=$rootScope.role;
        vm.editor_height={
            height:$scope.editorHeight||'150px'
        }
    }

})();