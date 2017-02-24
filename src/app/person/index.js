(function() {
    'use strict';
    angular.module('eobbs')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('user', {
                    url: '/user',
                    abstract: true,
                    auth:true,
                    template: '<eo-user></eo-user>'
                });
        }])
})();
