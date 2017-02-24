(function () {
    'use strict';

    angular

    .module('eobbs')

    .factory('API', API_DEFINED)

    API_DEFINED.$inject = ['$resource', 'ServerUrl'];

    function API_DEFINED($resource, serverUrl) {
        var API = {}, method = 'POST';
        //用户接口
        API['USER'] = $resource(serverUrl + '/BBS/User/:operate', {}, {
            /**
             * [获取用户类型]
             * @reutrn type,statusCode,roleType
             */
            GET_ROLETYPE: {
                method: method,
                params: {operate: "getRolePower"}
            },
            /**
             * [获取用户信息]
             * @reutrn type,statusCode,roleType
             */
            GET_USERINFO: {
                method: method,
                params: {operate: "getUserInfo"}
            }
        });
        //访客接口
        API['GUESTTOPIC'] = $resource(serverUrl + '/BBS/GuestTopic/:operate', {}, {
            /**
             * [获取访客帖子列表]
             */
            GET_LATESTTOPIC: {
                method: method,
                params: {operate: "getLatestTopicList"}
            },
            /**
             * [搜索帖子]
             * @reutrn type,statusCode,roleType
             */
            QUERY_TOPIC: {
                method: method,
                params: {operate: "searchTopic"}
            },
            /**
             * [获取帖子详情]
             * @topicID {Number}
             */
            GET_TOPIC: {
                method: method,
                params: {operate: "getTopic"}
            },
            /**
             * [获取帖子列表]
             * @boardID {Number}
             * @page {Number}
             * @pageSize {Number}
             */
            GET_TPICLIST: {
                method: method,
                params: {operate: "getTopicList"}
            },
        });

        //帖子接口
        API['TOPIC'] = $resource(serverUrl + '/BBS/Topic/:operate', {}, {
            /**
             * [修改帖子]
             * @topicID {Number}
             * @title {String}
             * @body {String}
             * @isInTop {String}
             */
            UPDATE_TOPIC: {
                method: method,
                params: {operate: "editTopic"}
            },

            /**
             * [搜索用户帖子]
             * @tip {String}
             * @page {Number}
             * @pageSize {Number}
             */
            SEARCH_USERTOPIC: {
                method: method,
                params: {operate: "searchUserTopic"}
            },
            /**
             * [获取用户帖子]
             * @page {Number}
             * @pageSize {Number}
             */
            QUERY_USERTOPIC: {
                method: method,
                params: {operate: "getUserTopicList"}
            },
            /**
             * [删除帖子]
             * @topicID {Number}
             */
            DELETE_TOPIC: {
                method: method,
                params: {operate: "deleteTopic"}
            },
            /**
             * [添加帖子]
             * @boardID {Number}
             * @title {String}
             * @body {String}
             * @topicType {String}
             */
            PUT_TOPIC: {
                method: method,
                params: {operate: "addTopic"}
            }
        });
        //评论接口
        API['GUESTCOMMENT'] = $resource(serverUrl + '/BBS/GuestComment/:operate', {}, {
            /**
             * [获取评论列表]
             * @topicID {Number}
             * @page {Number}
             * @pageSize {Number}
             */
            GET_COMMENTLIST: {
                method: method,
                params: {operate: "getCommentList"}
            }
        });
        //评论接口
        API['COMMENT'] = $resource(serverUrl + '/BBS/Comment/:operate', {}, {
            /**
             * [修改评论]
             * @commentID {Number}
             * @content {String}
             */
            UPDATE_COMMENT: {
                method: method,
                params: {operate: "editComment"}
            },
            /**
             * [获取评论信息]
             * @commentID {Number}
             */
            GET_COMMENT: {
                method: method,
                params: {operate: "getComment"}
            },
            /**
             * [获取评论列表]
             * @topicID {Number}
             * @page {Number}
             * @pageSize {Number}
             */
            GET_COMMENTLIST: {
                method: method,
                params: {operate: "getCommentList"}
            },
            /**
             * [获取用户评论列表]
             * @page {Number}
             * @pageSize {Number}
             */
            GET_USERCOMMENTLIST: {
                method: method,
                params: {operate: "getUserCommentList"}
            },
            /**
             * [搜索用户评论列表]
             * @tip {String}
             * @page {Number}
             * @pageSize {Number}
             */
            SEARCH_USERCOMMENTLIST: {
                method: method,
                params: {operate: "searchUserComment"}
            },
            /**
             * [删除评论]
             * @commentID {Number}
             */
            DELETE_COMMENT: {
                method: method,
                params: {operate: "deleteComment"}
            },
            /**
             * [添加评论]
             * @topicID {Number}
             * @content {String}
             * @desCommentID  目的评论ID（评论的评论）{String}
             */
            PUT_COMMENT: {
                method: method,
                params: {operate: "addComment"}
            }
        });
        //上传接口
        API['UPLOAD'] = $resource(serverUrl + '/BBS/Upload/:operate', {}, {
            /**
             * [获取上传Token]
             * @fileName ｛String｝
             * @fileSize ｛String｝
             */
            GET_UPLOADTOKEN: {
                method: method,
                params: {operate: "getUploadToken"}
            }
        });
        //模块接口
        API['BOARD'] = $resource(serverUrl + '/BBS/Board/:operate', {}, {
            /**
             * [获取模块列表]
             */
            GET_BOARDLIST: {
                method: method,
                params: {operate: "getBoardList"}
            },
            /**
             * [获取可发帖模块列表]
             */
            GET_AVBOARDLIST: {
                method: method,
                params: {operate: "getAvailableBoardList"}
            }
        });
        //消息接口
        API['MESSAGE'] = $resource(serverUrl + '/BBS/BBSMessage/:operate', {}, {
            /**
             * [清空消息]
             */
            DROP: {
                method: method,
                params: {operate: "cleanMessage"}
            },
            /**
             * [删除消息]
             * @ msgID {Number}
             */
            DELETE: {
                method: method,
                params: {operate: "delMessage"}
            },
            /**
             * [已阅消息]
             * @ msgID {Number}
             */
            UPDATE: {
                method: method,
                params: {operate: "readMessage"}
            },
            /**
             * [获取消息列表]
             */
            QUERY: {
                method: method,
                params: {operate: "getMessageList"}
            }
        });
        //回复接口
        API['AUTH'] = $resource(serverUrl + '/Web/User/:operate', {}, {
            /**
             * [退出登录]
             */
            LOGOUT: {
                method: method,
                params: {operate: "logout"}
            }
        });
        API['GUEST'] = $resource(serverUrl + '/Web/User/:operate', {}, {
            /**
             * [登录]
             */
            LOGIN: {
                method: method,
                params: {operate: "login"}
            }
        });

        return API;
    }



})();