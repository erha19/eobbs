(function() {
    'use strict';
    angular.module('eobbs')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('dashboard.publish', {
                    url: '/publish?ut',
                    template: '<eo-publish></eo-publish>',
                    resolve: helper.resolveFor('wang-editor')
                });
        }])
})();
