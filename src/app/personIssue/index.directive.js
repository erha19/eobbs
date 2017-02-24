(function () {

    angular.module('eobbs').directive('eoIssue', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/personIssue/index.html',
                replace:true,
                controller: personIssue,
                controllerAs: 'personIssue',
                link: function (scope, element, attrs, ngModel) {

                }
            }
        }])
    personIssue.$inject = ['$scope','$rootScope','$state','$timeout','API','PAGE','ngToast','ngDialog','USER_ROLES','Tool']
    function personIssue($scope,$rootScope,$state,$timeout,API,PAGE,ngToast,ngDialog,USER_ROLES,Tool) {
        var vm = this;
        var query_usertopic=function(page,pagesize){
            vm.loading='open';
            API.TOPIC.QUERY_USERTOPIC({
                page:page,
                pageSize:pagesize
            }).$promise.then(function(res){
                $timeout(function(){
                    if(res.topicList){
                        vm.page.page_count = res.topicCount/pagesize + 1;
                        res.topicList.forEach(function(topic){
                            if(topic.isInTop){
                                topic['icon']='icon-creative';
                            }
                            else
                                topic['icon']='';
                        });
                    }
                    vm.issues = res.topicList||[];
                    if(!vm.issues||vm.issues.length==0){
                        vm.loading='你还没有发过帖子哦~';
                        $scope.$broadcast('TOPIC_RENDER_FINISHED')
                    }else{
                        vm.loading='close';
                    }
                },0,true)
            })
        }
        var search_topiclist=function(tip,page,pagesize){
            vm.loading='open';
            API.TOPIC.SEARCH_USERTOPIC({
                tip:tip
            }).$promise.then(function(res){
                $timeout(function(){
                    if(res.topicList){
                        vm.page.page_count = res.topicCount/pagesize + 1;
                        res.topicList.forEach(function(topic){
                            if(topic.topicType){
                                topic['icon']='//eobbs.oss-cn-shenzhen.aliyuncs.com/bbs_opt.png';
                            }
                            else
                                topic['icon']='';
                        });
                    }
                    vm.issues = res.topicList||[];
                    if(!vm.issues||vm.issues.length==0){
                        vm.loading='该板块暂时还没有什么帖子哦~';
                        $scope.$broadcast('TOPIC_RENDER_FINISHED')
                    }else{
                        vm.loading='close';
                    }
                },0,true)
            })
        };
        vm.page={
            current_page:1,
            page_count:1
        };
        query_usertopic(vm.page.current_page,PAGE.PAGESIZE);


        //删帖
        vm.delete =function(id){
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
                    ngToast.success('删帖成功');
                    $scope.$emit('UPDATE_USERINFO');
                    query_usertopic(vm.page.current_page,PAGE.PAGESIZE);
                })
            })
        }
        //作者/管理员修改帖子
        vm.updateIssue=function(id){
            if($scope.role>=USER_ROLES.USER){
                API.GUESTTOPIC.GET_TOPIC({
                    topicID:id
                }).$promise.then(function(res){
                    $scope.updateIssue=res.topicInfo;
                    $scope.updateIssue.body=Tool.htmlDecodeByRegExp($scope.updateIssue.body);
                    $scope.user_roles=USER_ROLES;
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
                })
                
            }
        }
        //切换页面
        vm.onPageChange=function(page){
            query_usertopic(vm.page.current_page,PAGE.PAGESIZE);
        }
        //冒泡列表渲染完毕事件，通知eoFooter组件根据页面高度更改定位方式
        vm.emitRenderFinishedEvent=function(){
            $timeout(function() {
                $rootScope.$broadcast('TOPIC_RENDER_FINISHED')
            }, 0, true)
        }
        //监听搜索事件
        $scope.$on('SEARCH_TOPIC',function(obj,tip){
            vm.page.current_page=1;
            vm.page.page_count=1;
            search_topiclist(tip,vm.page.current_page,PAGE.PAGESIZE)
        })
    }

})();

