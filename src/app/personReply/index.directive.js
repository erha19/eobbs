(function () {

    angular.module('eobbs').directive('eoReply', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/personReply/index.html',
                replace:true,
                controller: personReply,
                controllerAs: 'personReply',
                link: function (scope, element, attrs, ngModel) {

                }
            }
        }])
    personReply.$inject = ['$scope','$rootScope','Tool','$state','$timeout','API','PAGE','ngToast','ngDialog']

    function personReply($scope,$rootScope,Tool,$state,$timeout,API,PAGE,ngToast,ngDialog) {
        var vm = this;
        var query_usercomment=function(page,pagesize){
            vm.loading='open';
            API.COMMENT.GET_USERCOMMENTLIST({
                page:page,
                pageSize:pagesize
            }).$promise.then(function(res){
                res.commentList=res.commentList||[];
                res.commentList.forEach(function(data){
                    data.content=Tool.replaceImageToText(Tool.htmlDecodeByRegExp(data.content));
                    data.content=Tool.removeHtmlTag(data.content)
                })
                $timeout(function(){
                    vm.page_count=res.commentCount;
                    vm.comments=res.commentList;
                    if(vm.comments.length>0){
                        vm.loading='close';
                    }else{
                        vm.loading='您还没有发表过评论哦~'
                    }
                },0,true)
                
            })   
        }

        var search_usercomment=function(tip,page,pagesize){
            vm.loading='open';
            API.COMMENT.SEARCH_USERCOMMENTLIST({
                tip:tip,
                page:page,
                pageSize:pagesize
            }).$promise.then(function(res){
                res.commentList=res.commentList||[];
                res.commentList.forEach(function(data){
                    data.content=Tool.replaceImageToText(Tool.htmlDecodeByRegExp(data.content));
                    data.content=Tool.removeHtmlTag(data.content)
                })
                $timeout(function(){
                    vm.page_count=res.commentCount;
                    vm.comments=res.commentList;
                    if(vm.comments.length>0){
                        vm.loading='close';
                    }else{
                        vm.loading='搜索不到带该关键字的评论~'
                    }
                },0,true)
                
            })   
        }
        
        vm.page={
            current_page:1,
            page_count:1
        };

        query_usercomment(vm.page.current_page,PAGE.PAGESIZE);

        //删除回复
        vm.delete =function(id){
            ngDialog.openConfirm({
                template:'\
                    <p>确定删除该回复?</p>\
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
                    $scope.$emit('UPDATE_USERINFO');
                    query_usercomment(vm.page.current_page,PAGE.PAGESIZE);
                })
            })
            
        }
        //切换页面
        vm.onPageChange=function(page){
            query_usercomment(vm.page.current_page,PAGE.PAGESIZE);
        }
        //冒泡列表渲染完毕事件，通知eoFooter组件根据页面高度更改定位方式
        vm.emitRenderFinishedEvent=function(){
            $timeout(function() {
                $rootScope.$broadcast('TOPIC_RENDER_FINISHED')
            }, 0, true)
        }
        //监听搜索事件
        $scope.$on('SEARCH_COMMENT',function(obj,tip){
            vm.page.current_page=1;
            vm.page.page_count=1;
            search_usercomment(tip,vm.page.current_page,PAGE.PAGESIZE)
        })
    }

})();

