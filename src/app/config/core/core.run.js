(function() {
  'use strict';

  angular
    .module('eobbs')
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state', '$timeout', '$window','API', 'USER_ROLES','AUTH_EVENTS', 'ngProgressFactory','amMoment','ngToast','CookieName'];

  function appRun($rootScope, $state, $timeout,$window,API, USER_ROLES,AUTH_EVENTS, ngProgressFactory,amMoment,ngToast,CookieName) {
    // var get_usertoken=function(){
    //   var hash=window.location.hash,search;
    //   if(hash){
    //     search=hash.split('?').length>1?hash.split('?')[1].split('&'):'';
    //     if(search)
    //       for(var i in search){
    //         var data=search[i].split('=')
    //         if(data[0]=='ut')
    //           return data[1]
    //       }
    //   }
    // }
    // var userToken=get_usertoken();

    //获取用户角色
    var query_usertype=function(){
      API.USER.GET_ROLETYPE().$promise.then(function(res){
        $rootScope.role = res.rolePower||USER_ROLES.GUEST;
      })
    }

    //获取模块信息
    var query_boardlist=function(){
      API.BOARD.GET_BOARDLIST().$promise.then(function(data){
        $rootScope.boardList=data.boardList||[];
        $rootScope.boardList.unshift({boardID:999,boardName:'最新帖子'})
      });
    }

    //获取用户信息
    var query_userinfo=function(){
      API.USER.GET_USERINFO().$promise.then(function(data){
        $rootScope.info=data;
      });
    }

    // if(userToken){
    //   $cookies.put(CookieName,userToken.toString())
    // }

    //moment-il8
    amMoment.changeLocale('zh-cn');
    
    query_usertype();

    
    query_boardlist();
    

    
    query_userinfo();
    //更新用户信息
    $rootScope.$on('UPDATE_USERINFO',function(){
      query_userinfo();
    })
    //进度条配置
    $rootScope.progressbar = ngProgressFactory.createInstance();

    $rootScope.progressbar.setHeight('3px');

    $rootScope.progressbar.setColor('rgba(255,255,255,.3)');

    $rootScope.$on('$viewContentLoaded',function(event, toState){
      $rootScope.overflowHidden=$state.current.name=='dashboard.publish';
    })
    //全局监听路由跳转事件
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if(toState.auth&&[USER_ROLES.USER,USER_ROLES.ADMIN].indexOf($rootScope.role)==-1){
        $state.go('dashboard');
        return;
      }else{
        $rootScope.progressbar.start();
      }
      if(toState.name=='dashboard.publish'){
        $rootScope.overflowHidden=true;
      }else{
        $rootScope.overflowHidden=false;
      }
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      $window.scrollTo(0,0);
      $rootScope.progressbar.complete();
    });
    //添加全局事件监听
    for(var i in AUTH_EVENTS){
      $rootScope.$on(AUTH_EVENTS[i].event,function(){
        console.log('happend:'+AUTH_EVENTS[i].event)
        ngToast.danger(AUTH_EVENTS[i].tip);
      })
    }
  }

})();