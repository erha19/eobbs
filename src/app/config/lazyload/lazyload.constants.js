(function () {
    "use strict";

    angular
            .module("eobbs")
            .constant("APP_REQUIRES", {
                // jQuery based and standalone scripts
                scripts: {},
                // Angular based script (use the right module name)
                modules: [{
                        name: "trix-editor",
                        files: ["vendor/trix/dist/trix.js","vendor/trix/dist/trix.css","vendor/angular-trix/dist/angular-trix.js"]
                    }, {
                        name: "angular-qiniu-upload",
                        files: ["vendor/angular-qiniu-upload/src/qupload.js","vendor/angular-local-storage/dist/angular-local-storage.js"]
                    }, {
                        name: "wang-editor",
                        files: ["vendor/wangEditor/dist/css/wangEditor.min.css","vendor/wangEditor/dist/js/wangEditor.min.js","vendor/angular-wangeditor/index.js","vendor/angular-wangeditor/index.css","vendor/plupload/js/plupload.full.min.js","vendor/qiniu/dist/qiniu.min.js"]
                    }
                ]

            });

})();