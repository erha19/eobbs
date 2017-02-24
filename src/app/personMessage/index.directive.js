(function () {

    angular.module('eobbs').directive('eoMessage', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/personMessage/index.html',
                replace:true,
                controller: personMessage,
                controllerAs: 'personMessage',
                link: function (scope, element, attrs, ngModel) {

                }
            }
        }])
    personMessage.$inject = ['$scope','$rootScope','$state','$timeout','API','PAGE','ngToast','ngDialog']
    function personMessage($scope,$rootScope,$state,$timeout,API,PAGE,ngToast,ngDialog) {
        var vm = this;

        var query_messagelist=function(page,pagesize){
            vm.loading="open";
            API.MESSAGE.QUERY({
                page:page,
                pageSize:pagesize
            }).$promise.then(function(res){
                if(res.messageList){
                    for(var message in res.messageList){
                        if(res.messageList[message].msgType!=2){
                            res.messageList.splice(message,1);
                        }
                    }
                }
                vm.messages=res.messageList||[];
                if(vm.messages.length>0){
                    vm.loading="close";
                }else{
                    vm.loading="还没有什么通知~";
                }
            })
        }

        vm.page={
            current_page:1,
            page_count:1
        };

        query_messagelist(vm.page.current_page,PAGE.PAGESIZE);

        //删除回复
        vm.delete =function(id){
            ngDialog.openConfirm({
                template:'\
                    <p>确定删除该消息?</p>\
                    <div class="ngdialog-buttons">\
                        <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button>\
                        <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>\
                    </div>',
                plain: true
            }).then(function(){
                API.MESSAGE.DELETE({
                    msgID:id
                }).$promise.then(function(data){
                    ngToast.success('删除成功');
                    query_messagelist(vm.page.current_page,PAGE.PAGESIZE);
                })
            })
        }
        //切换页面
        vm.onPageChange=function(page){
            query_messagelist(vm.page.current_page,PAGE.PAGESIZE);
        }
        //冒泡列表渲染完毕事件，通知eoFooter组件根据页面高度更改定位方式
        vm.emitRenderFinishedEvent=function(){
            $timeout(function() {
                $rootScope.$broadcast('TOPIC_RENDER_FINISHED')
            }, 0, true)
        }
        $scope.$on('READ_MESSAGE',function(e,id){
            API.MESSAGE.UPDATE({
                msgID:id
            }).$promise.then(function(){
                $scope.$emit('UPDATE_USERINFO');
            })
        })

    }

})();

