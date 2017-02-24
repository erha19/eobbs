(function () {

    angular.module('eobbs').directive('eoDashboard', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/dashboard/index.html',
                replace:true,
                controller: dashboard,
                controllerAs: 'dashboard',
                link: function (scope, element, attrs, ngModel) {

                }
            }
        }])
    dashboard.$inject = ['$scope','$rootScope','$state','$timeout','API','PAGE','ngToast','ngDialog','USER_ROLES']
    function dashboard($scope,$rootScope,$state,$timeout,API,PAGE,ngToast,ngDialog,USER_ROLES) {
        var vm = this;
        var query_topiclist=function(boardID,page,pagesize){
            vm.loading='open';
            API.GUESTTOPIC.GET_TPICLIST({
                boardID:boardID,
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
                    console.log(res.topicList)
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
        var search_topiclist=function(tip,page,pagesize){
            vm.loading='open';
            API.GUESTTOPIC.QUERY_TOPIC({
                tip:tip
            }).$promise.then(function(res){
                $timeout(function(){
                    if(res.topicList){
                        vm.page.page_count = res.topicCount/pagesize + 1;
                        res.topicList.forEach(function(topic){
                            if(topic.isInTop){
                                topic['icon']='//eobbs.oss-cn-shenzhen.aliyuncs.com/bbs_opt.png';
                            }
                            else
                                topic['icon']='';
                        });
                    }
                    vm.issues = res.topicList||[];
                    if(!vm.issues||vm.issues.length==0){
                        vm.loading='搜索不到含该关键字的帖子~';
                        $scope.$broadcast('TOPIC_RENDER_FINISHED')
                    }else{
                        vm.loading='close';
                    }
                },0,true)
            })
        };
        //获取最新帖子
        var query_latesttopiclist=function(page,pagesize){
            vm.loading='open';
            API.GUESTTOPIC.GET_LATESTTOPIC({
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
                        vm.loading='该板块暂时还没有什么帖子哦~';
                        $scope.$broadcast('TOPIC_RENDER_FINISHED')
                    }else{
                        vm.loading='close';
                    }
                },0,true)
            })
        }
        //获取模块信息
        var query_boardlist=function(){
          API.BOARD.GET_BOARDLIST().$promise.then(function(data){
            $rootScope.boardList=data.boardList;
            query_topiclist(data.boardList[0].boardID,vm.page.current_page,PAGE.PAGESIZE);
          });
        }
        vm.user_roles=USER_ROLES;

        vm.page={
            current_page:1,
            page_count:1
        };
        vm.boardID = $state.params.boardID||999;
        if(!vm.boardID){
            query_boardlist();
        }else if(vm.boardID==999){
            query_latesttopiclist(vm.page.current_page,PAGE.PAGESIZE);
        }else{
            query_topiclist(vm.boardID,vm.page.current_page,PAGE.PAGESIZE);
        }
        //管理员删帖
        vm.delete =function(id){
            if($scope.role>=USER_ROLES.OWNER){
                ngDialog.openConfirm({
                    template:'\
                        <p>确定删除该消息?</p>\
                        <div class="ngdialog-buttons">\
                            <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button>\
                            <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>\
                        </div>',
                    plain: true
                }).then(function(){
                    API.TOPIC.DELETE_TOPIC({
                        topicID:id
                    }).$promise.then(function(data){
                        ngToast.create('删帖成功');
                        $scope.$emit('UPDATE_USERINFO');
                        query_usertopic(vm.page.current_page,PAGE.PAGESIZE);
                    })
                })
            }
        }
        //切换页面
        vm.onPageChange=function(page){
            if(vm.boardID!=999){
                query_topiclist(vm.boardID,vm.page.current_page,PAGE.PAGESIZE);
            }else{
                query_latesttopiclist(vm.page.current_page,PAGE.PAGESIZE);
            }
        }
        //冒泡列表渲染完毕事件，通知eoFooter组件根据页面高度更改定位方式
        vm.emitRenderFinishedEvent=function(){
            $timeout(function() {
                $scope.$broadcast('TOPIC_RENDER_FINISHED')
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

