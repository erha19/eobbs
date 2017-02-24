/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
  'use strict';

  angular
    .module('eobbs')
    .constant('AUTH_EVENTS', {
        //帖子标题/内容非法
        TOPIC_UNSAFE:{event:'topic_unsafe',tip:'帖子标题/内容非法'},
        //删除失败 
        DELETE_ERROR:{event:'delete_error',tip:'删除失败'},
        //获取内容失败
        QUERY_ERROR:{event:'query_error',tip:'获取内容失败'},
        //修改失败
        UPDATE_ERROR:{event:'update_error',tip:'修改失败'},
        //添加评论失败
        PUT_COMMENT_ERROR:{event:'put_comment_error',tip:'添加评论失败'},
        //图片上传失败
        UPLOAD_ERROR:{event:'upload_error',tip:'图片上传失败'},
        //搜索帖子失败
        SEARCH_ERROR:{event:'search_error',tip:'没有搜索帖子'}
    })
    .constant('USER_ROLES', {
      ADMIN:4,
      OWNER:3,
      USER: 2,
      GUEST: 1
    })
    .constant('PAGE', {
      PAGESIZE: 15
    })
})();