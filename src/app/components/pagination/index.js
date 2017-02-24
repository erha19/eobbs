(function () {

    angular.module('eobbs')


    .constant('ngPaginationConfig', {
      visiblePageCount: 10,
      firstText: '首页',
      lastText: '末页',
      prevText: '<',
      nextText: '>',
      showIfOnePage: true,
      showFirstLastText: false,
      gotoText: '跳转',
      showGoto: false
    }).directive("pager", ['ngPaginationConfig', function (ngPaginationConfig) {
      return {
        replace: true,
        restrict: "E",
        scope: {
          pageCount: '=',
          currentPage: '=',
          onPageChange: '&'
        },
        templateUrl: 'app/components/pagination/index.html',
        link: function (scope, element, attrs) {
          var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : ngPaginationConfig.visiblePageCount;
          scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : ngPaginationConfig.firstText;
          scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : ngPaginationConfig.lastText;
          scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : ngPaginationConfig.prevText;
          scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : ngPaginationConfig.nextText;
          scope.showFirstLastText = angular.isDefined(attrs.showFirstLastText) ? attrs.showFirstLastText : ngPaginationConfig.showFirstLastText;
          scope.showIfOnePage = angular.isDefined(attrs.showIfOnePage) ? attrs.showIfOnePage : ngPaginationConfig.showIfOnePage;
          scope.gotoText = angular.isDefined(attrs.gotoText) ? attrs.gotoText : ngPaginationConfig.gotoText;
          scope.showGoto = angular.isDefined(attrs.showGoto) ? attrs.showGoto : ngPaginationConfig.showGoto;
          scope.currentPage = 1;

          scope.pageChange = function (page) {
            if (page >= 1 && page <= scope.pageCount) {
              scope.currentPage = page;
            } else {
              scope.currentPage = 1;
            }
          }

          scope.keyupHanlder = function (e) {
            var value = e.target.value;
            var parsedValue = parseInt(value, 10);
            if (!Number.isNaN(parsedValue)) {
              if (parsedValue >= 1 && parsedValue <= scope.pageCount) {

              } else if (parsedValue < 1) {
                e.target.value = 1;
              } else {
                e.target.value = scope.pageCount;
              }
              if (e.keyCode === 13) {
                // pressed enter
                scope.currentPage = parsedValue;
              }
            } else {
              if (e.preventDefault) {
                e.preventDefault();
              } else {
                return false;
              }
            }
          }

          function build() {
            var low,
              high,
              v;

            scope.pagenums = [];

            if (scope.pageCount === 0) {
              return;
            }
            if (scope.currentPage > scope.pageCount) {
              scope.currentPage = 1;
            }

            if (scope.pageCount <= visiblePageCount) {
              low = 1;
              high = scope.pageCount;
            } else {
              v = Math.ceil(visiblePageCount / 2);
              low = Math.max(scope.currentPage - v, 1);
              high = Math.min(low + visiblePageCount - 1, scope.pageCount);

              if (scope.pageCount - high < v) {
                low = high - visiblePageCount + 1;
              }
            }

            for (; low <= high; low++) {
              scope.pagenums.push(low);
            }
          }

          scope.$watch('currentPage', function (a, b) {
            if (a !== b) {
              build();
              scope.onPageChange();
            }
          });

          scope.$watch('pageCount', function (a, b) {
            if (!!a) {
              build();
            }
          });

        }
      }
       
    }]);

})();