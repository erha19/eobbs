(function () {

    angular.module('eobbs')


    .directive('comment', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/comment/index.html',
                replace: true,
                scope:{
                    childReply:'=childReply',
                    author:'=author',
                    reply:'=reply',
                    id:'=id',
                    drop:'&drop',
                    toggle:'=toggle',
                    time:'=time'
                },
                controller: comment,
                controllerAs: 'comment'
            }
    }])

    comment.$inject = ['$scope','$sce', '$timeout', '$state','Tool'];

    function comment($scope,$sce, $timeout, $state,Tool) {
        var vm = this;
        vm.replyStatus=false;
        $timeout(function(){
            if($scope.childReply && typeof $scope.childReply == 'string'){
                $scope.childReply=JSON.parse($scope.childReply);
            }
        },0,true)
        vm.content='';
        vm.timer=null;
        vm.switchReplyStatus = function(){
            vm.replyStatus=!vm.replyStatus;
        }
        vm.removeHtmlTag=Tool.removeHtmlTag;
        
        vm.reply=function(id){
            if(vm.timer)$timeout.cancel(vm.timer);
            vm.timer=$timeout(function(){
                if(vm.content.length>0){
                    $scope.$emit('REPLY_TOPIC',vm.content,id)
                    vm.content ='';
                    vm.replyStatus=false;
                }
            },200,true)
        }
    }

})();