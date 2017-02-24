(function() {
    'use strict';
    angular.module('eobbs')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('user.reply', {
                    url: '/reply',
                    auth:true,
                    template: '<eo-reply></eo-reply>'
                });
        }])
})();
