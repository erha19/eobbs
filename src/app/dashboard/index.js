(function() {
    'use strict';
    angular.module('eobbs')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard?boardID',
                    template: '<eo-dashboard></eo-dashboard>'
                });
        }])
})();
