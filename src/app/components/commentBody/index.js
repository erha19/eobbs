(function () {

    angular.module('eobbs')


    .directive('commentBody', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/commentBody/index.html',
                replace: true,
                transclude: true,
                controller: commentBody,
                controllerAs: 'commentBody'
            }
    }])




    commentBody.$inject = ['$scope', 'API', '$state','$timeout','ngToast','Tool'];

    function commentBody($scope, API, $state,$timeout,ngToast,Tool) {
        var vm = this;
        vm.content='';

        vm.replaceHtmlTagExceptImg=Tool.replaceHtmlTagExceptImg;

        vm.reply=function(){
            if(vm.content.length>0){
                vm.replyState=true;
                $scope.$emit('REPLY_TOPIC',vm.content)
                vm.content ='';
            }else{
                ngToast.info('回复内容不能为空!')
            }
        }
    }

})();