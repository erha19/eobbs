(function () {
    'use strict';

            angular.module('eobbs.filter')
            

            .filter('htmlDecode',['Tool',function(Tool){
                return function(input,params){
                    return Tool.htmlDecodeByRegExp(input);
                }
            }])

})();


