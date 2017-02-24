(function () {

    angular.module('eobbs')


    .directive('eoNavbar', ['$timeout', "$window", function ($timeout, $window, EVENT) {
            return {
                restrict: 'AE',
                templateUrl: 'app/components/navbar/index.html',
                replace: true,
                controller: navbar,
                controllerAs: 'navbar'
            }
    }])




    navbar.$inject = ['$rootScope', 'API', '$state','$timeout','ngToast','USER_ROLES','CookieName'];

    function navbar($rootScope, API, $state,$timeout,ngToast,USER_ROLES,CookieName) {
        var vm = this;
        vm.user_roles=USER_ROLES;
        vm.logout=function(){
            API.AUTH.LOGOUT().$promise.then(function(){
                $rootScope.info='';
                $rootScope.role=USER_ROLES.GUEST;
                ngToast.success('退出成功');
                // $cookies.remove(CookieName)
                $state.go('dashboard');
            })
        }
        vm.redirect_uri=window.location.href;
        vm.origin=window.location.origin;
    }

})();