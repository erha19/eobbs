(function() {
    'use strict';

    angular
        .module('eobbs')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide','ngToastProvider','ngDialogProvider','$sceProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide,ngToastProvider,ngDialogProvider,$sceProvider){
      
      var core = angular.module('eobbs');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;
      //ng-toast-config
      ngToastProvider.configure({
        verticalPosition: 'top',
        horizontalPosition: 'center',
        maxNumber: 1,
        timeout:2000,
        animation:'slide'
      })
      //ng-dialog-config
      ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        showClose: true,
        closeByDocument: true,
        closeByEscape: true
      });
      var expireDate = new Date();
  
      expireDate.setMinutes(expireDate.getMinutes() + 30);
      

      
      // $cookiesProvider.defaults={
      //     expires: expireDate,
      //     domain:CookieConfig.domain

      // }
    }

})();