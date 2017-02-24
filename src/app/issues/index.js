(function() {
    'use strict';
    angular.module('eobbs')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('issues', {
                    url: '/issues/:id',
                    template: '<eo-issues></eo-issues>',
                    resolve: helper.resolveFor('wang-editor')
                });
        }])
})();
