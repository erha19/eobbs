(function() {
    'use strict';
    angular.module('eobbs')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('user.issue', {
                    url: '/issue',
                    auth:true,
                    template: '<eo-issue></eo-issue>',
                    resolve: helper.resolveFor('wang-editor')
                });
        }])
})();
