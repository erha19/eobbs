(function () {

    angular.module('eobbs').directive('eoPublish', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/publish/index.html',
                replace:true,
                controller: publish,
                controllerAs: 'publish',
                link: function (scope, element, attrs, ngModel) {

                }
            }
    }])

    publish.$inject = ['$scope','$state','API','ngToast','USER_ROLES','Tool']

    function publish($scope,$state,API,ngToast,USER_ROLES,Tool) {
        var vm = this;
        var put_topic=function(data){
            API.TOPIC.PUT_TOPIC(data).$promise.then(function(res){
                ngToast.success('发帖成功');
                $scope.$emit('UPDATE_USERINFO');
                $state.go('dashboard',{boardID:vm.topic.boardID},{reload: true});
            })
        }
        var query_boardlist=function(){
          API.BOARD.GET_AVBOARDLIST().$promise.then(function(data){
            vm.boardList=data.boardList;
          });
        }
            
        query_boardlist();
        vm.topic={
            title:'',
            boardID:'',
            body:'',
            isInTop:0
        }
        vm.user_roles=USER_ROLES;
        vm.selectBoard=function(id){
            vm.topic.boardID=id;
        }
        vm.replaceHtmlTagExceptImg=Tool.replaceHtmlTagExceptImg;

        //获取模块信息
        vm.publishTopic=function(){
            if($scope.role<USER_ROLES.USER){
                 ngToast.info('尚未登录，请登陆后操作');
            }else{
                if(vm.topic.title.length<5){
                    ngToast.danger('标题不小于五个字');
                }
                if($scope.publish_form.$valid){
                    if(!vm.topic.boardID){
                        ngToast.danger('请选择板块');
                    }
                    else if(!vm.topic.body){
                        ngToast.danger('请输入发帖内容');
                    }
                    else{
                        vm.publishState=true;
                        put_topic(vm.topic);
                    }
                }
            }
        }

    }

})();

