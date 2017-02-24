(function() {
    'use strict';
    angular.module('eobbs')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('user.message', {
                    url: '/message',
                    auth:true,
                    template: '<eo-message></eo-message>'
                });
        }])
})();
