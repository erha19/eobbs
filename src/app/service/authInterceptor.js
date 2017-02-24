(function() {
	'use strict';
	angular.module('eobbs')

		.factory('AuthInterceptor',AuthInterceptor);

		AuthInterceptor.$inject=['$rootScope', '$q', '$location', '$injector','AUTH_EVENTS','CookieName']

		function AuthInterceptor($rootScope, $q, $location, $injector,AUTH_EVENTS,CookieName) {
			var Auth;
			return {
				request: function(config) {
					config.headers = config.headers || {};
					// config['userToken']=$cookieStore.get(CookieName);
					return config;
				},
				response: function(response) {
					$rootScope.$broadcast({					
						'130002': AUTH_EVENTS.TOPIC_UNSAFE.event,
						'130005': AUTH_EVENTS.DELETE_ERROR.event,
						'130007': AUTH_EVENTS.QUERY_ERROR.event,
						'130008': AUTH_EVENTS.UPDATE_ERROR.event,
						'140003': AUTH_EVENTS.PUT_COMMENT_ERROR.event,
						'140005': AUTH_EVENTS.DELETE_ERROR.event,
						'140007': AUTH_EVENTS.UPDATE_ERROR.event,
						'140008': AUTH_EVENTS.UPLOAD_ERROR.event,
						'150001': AUTH_EVENTS.DELETE_ERROR.event,
						'130009': AUTH_EVENTS.QUERY_ERROR.event,
						// '130010': AUTH_EVENTS.DELETE_ERROR.event,
						'120002': AUTH_EVENTS.QUERY_ERROR.event
					}[response.data.statusCode], response);
					return $q.resolve(response);
				},
				responseError: function(rejection) {
					return rejection;
				}
			};
		}
})();
