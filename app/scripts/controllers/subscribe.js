'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('SubscribeCtrl', function ($scope, $routeParams) {

	$scope.url = new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/');

	$scope.url.child($routeParams.emailId + '/' + $routeParams.uniqueId).on('value', function(ss) {

        if(ss.val() === null) {

        	console.log('null');

        }else {

	    	ss.forEach(function(data) {

	    		var checker = data.val();

	    		console.log(checker.confirmed);

	    	});
        }
    });

});