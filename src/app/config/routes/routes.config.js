/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
  'use strict';

  angular
    .module('eobbs')
    .config(routesConfig)
    .run(routesRun)

  routesConfig.$inject = ['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];

  function routesConfig($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider, helper) {


    $httpProvider.interceptors.push([
      '$injector',
      function($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
    // $locationProvider.html5Mode(true);

    // defaults to dashboard
    $urlRouterProvider.otherwise('/dashboard');
  }

  routesRun.$inject = ['$rootScope', '$state', 'AUTH_EVENTS'];

  function routesRun($rootScope, $state, AUTH_EVENTS) {



  }


})();