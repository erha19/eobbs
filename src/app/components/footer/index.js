(function () {

    angular.module('eobbs')


    .directive('eoFooter', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/footer/index.html',
                replace: true,
                scope:{
                    position:'@'
                },
                controller: footer,
                controllerAs: 'footer'
            }
    }])




    footer.$inject = ['$scope', '$document','$window', '$state','$timeout'];

    function footer($scope, $document,$window, $state,$timeout) {
        var vm = this;
        vm.position=$scope.position;
        $scope.$on('TOPIC_RENDER_FINISHED',function(){
            if($window.innerHeight==$document[0].body.scrollHeight){
                vm.position='fixed';
            }
            else{
                vm.position='';
            }
        })
    }

})();