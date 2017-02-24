(function () {

    angular.module('eobbs').directive('eoIssues', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/issues/index.html',
                replace:true,
                controller: issues,
                controllerAs: 'issues',
                link: function (scope, element, attrs, ngModel) {

                }
            }
        }])
    issues.$inject = ['$scope','$state','$timeout','$sce','API','PAGE','ngToast','Tool','USER_ROLES','ngDialog','Tool']
    function issues($scope,$state,$timeout,$sce,API,PAGE,ngToast,Tool,USER_ROLES,ngDialog,Tool) {
        var vm = this;
        var topic_id = $state.params.id;
        var query_issue=function(id){
            vm.contentLoading='open';
            API.GUESTTOPIC.GET_TOPIC({
                topicID:id
            }).$promise.then(function(res){
                if(res.topicInfo){
                    vm.topic=res.topicInfo;
                    vm.topic.body=Tool.htmlDecodeByRegExp(vm.topic.body);
                    vm.contentLoading='close';
                    query_commentlist(topic_id,vm.page.current_page,PAGE.PAGESIZE);
                }else{
                    vm.contentLoading='没有该帖子信息';
                }
                
            })
        }
        var query_commentlist=function(id,page,pagesize){
            vm.commentLoading='open';
            API.GUESTCOMMENT.GET_COMMENTLIST({
                topicID:id,
                page:page,
                pageSize:pagesize
            }).$promise.then(function(res){
                res.commentList=res.commentList||[];
                res.commentList.forEach(function(data){
                    data.content=Tool.htmlDecodeByRegExp(data.content);
                })
                $timeout(function(){
                    vm.page.page_count=res.commentCount/pagesize||1;
                    vm.topic.discuss=res.commentCount;
                    vm.comments=res.commentList;
                    vm.comments.forEach(function(comment){
                        comment['childReply']=comment.replyFor.length?comment.replyFor[0]:'';
                        comment.childReply.content=Tool.htmlDecodeByRegExp(comment.childReply.content);
                    })
                    if(vm.comments.length>0){
                        vm.commentLoading='close';
                    }else{
                        vm.commentLoading='还没有评论哦~'
                    }
                    
                },0,true)
                
            })   
        };
        var put_comment=function(id,content,desCommentID,userName){
            API.COMMENT.PUT_COMMENT({
                topicID:id,
                content:content,
                desCommentID:desCommentID,
                userName:userName,
            }).$promise.then(function(res){
                ngToast.success('回复成功');
                query_commentlist(topic_id,vm.page.current_page,PAGE.PAGESIZE);
            })
        };
        vm.user_roles=USER_ROLES;

        vm.page={
            current_page:1,
            page_count:1
        };

        //管理员删除回复
        vm.deleteComment =function(id){
            if($scope.role>=USER_ROLES.OWNER){
                ngDialog.openConfirm({
                    template:'\
                        <p>确定删除该评论?</p>\
                        <div class="ngdialog-buttons">\
                            <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button>\
                            <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>\
                        </div>',
                    plain: true
                }).then(function(){
                    API.COMMENT.DELETE_COMMENT({
                        commentID:id
                    }).$promise.then(function(data){
                        ngToast.success('删除成功');
                        query_commentlist(topic_id,vm.page.current_page,PAGE.PAGESIZE);
                    })
                })
            }
        }
        //作者/管理员删除帖子
        vm.deleteIssue =function(id){
            if($scope.role>=USER_ROLES.USER){
                ngDialog.openConfirm({
                    template:'\
                        <p>确定删除该帖子?</p>\
                        <div class="ngdialog-buttons">\
                            <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button>\
                            <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>\
                        </div>',
                    plain: true
                }).then(function(){
                    API.TOPIC.DELETE_TOPIC({
                        topicID:id
                    }).$promise.then(function(data){
                        ngToast.success('删除成功');
                        $state.go('dashboard',{boardID:999});
                    })
                })
            }
        }
        //作者/管理员修改帖子
        vm.updateIssue=function(){
            $scope.updateIssue=angular.copy(vm.topic)
            $scope.user_roles=USER_ROLES;
            if($scope.role>=USER_ROLES.USER){
                ngDialog.openConfirm({
                    templateUrl:'app/issues/edit.html',
                    width:'1170px',
                    height:'500px',
                    scope: $scope,
                    controller:['$scope',function($scope){
                        $scope.updateIssue=$scope.$parent.$parent.updateIssue;
                        $scope.check=function(){
                            if(!$scope.updateIssue.title||$scope.updateIssue.title.length<5){
                                ngToast.danger('标题请至少输入5个字')
                            }else if(!Tool.replaceHtmlTagExceptImg($scope.updateIssue.body)){
                                ngToast.danger('帖子内容不能为空')
                            }else{
                                return true;
                            }
                            return false;
                        }
                    }],
                    closeByNavigation : true
                }).then(function(){
                    API.TOPIC.UPDATE_TOPIC({
                        topicID:$scope.updateIssue.topicID,
                        title:$scope.updateIssue.title,
                        body:$scope.updateIssue.body,
                        isInTop:$scope.updateIssue.isInTop
                    }).$promise.then(function(data){
                        ngToast.success('修改成功');
                        $state.reload();
                    })
                })
            }
        }

        //切换页面
        vm.onPageChange=function(page){
            query_commentlist(topic_id,vm.page.current_page,PAGE.PAGESIZE);
        }
        query_issue(topic_id);
        $scope.$on('REPLY_TOPIC',function(obj,content,desCommentID,userName){
            if($scope.role<USER_ROLES.USER){
                ngToast.info('尚未登录，请登陆后操作');
            }
            else{
                put_comment(topic_id,content,desCommentID);
            }
            
        })
    }

})();

