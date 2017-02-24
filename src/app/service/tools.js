(function() {
    'use strict';
    angular.module('eobbs')

        .factory('Tool',Tool);

        Tool.$inject=['$rootScope']

        function Tool($rootScope) {
            return {
                htmlEncodeByRegExp:function (str){  
                     var s = "";
                     if(str.length == 0) return "";
                     s = str.replace(/&/g,"&amp;");
                     s = s.replace(/</g,"&lt;");
                     s = s.replace(/>/g,"&gt;");
                     s = s.replace(/ /g,"&nbsp;");
                     s = s.replace(/\'/g,"&#39;");
                     s = s.replace(/\"/g,"&quot;");
                     return s;  
               },
               /*2.用正则表达式实现html解码*/
               htmlDecodeByRegExp:function (str){  
                     var s = "";
                     if(!str||str.length == 0) return "";
                     s = str.replace(/&amp;/g,"&");
                     s = s.replace(/&lt;/g,"<");
                     s = s.replace(/&gt;/g,">");
                     s = s.replace(/&nbsp;/g," ");
                     s = s.replace(/&#39;/g,"\'");
                     s = s.replace(/&quot;/g,"\"");
                     return s;  
               },
               replaceImageToText:function(str){
                    var reg = /<img.*?(?:>|\/>)/gi;
                    return str.replace(reg,'[图片]') 
               },
               removeHtmlTag:function(str){
                    var reg = /<[^<]*>/gi;
                    return str.replace(reg,'')
               },
               replaceHtmlTagExceptImg:function(str){
                    var imgReg = /<img.*?(?:>|\/>)/gi;
                    var htmlReg = /<[^<]*>/gi;
                    return str.replace(imgReg,'[图片]').replace(htmlReg,'')
               }
            };
        }
})();