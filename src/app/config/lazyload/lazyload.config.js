(function() {
    'use strict';

    angular
        .module('eobbs')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES','IsDebug'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES,IsDebug){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: IsDebug,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();