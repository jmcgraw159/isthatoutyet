'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('DetailCtrl', function ($scope, $http, $window, $routeParams) {

  // API call to get game detail
  $http.jsonp('http://www.giantbomb.com/api/games/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp', {
	   params: {
	        callback: 'JSON_CALLBACK',
	        json_callback: 'angular.callbacks._' + $window.angular.callbacks.counter.toString(36),
	        filter: 'id' + $routeParams.id
	    }
    })
    .success(function(data){
      console.log(data);
    })
    .error(function(data) {
      console.log(data);
    });

});