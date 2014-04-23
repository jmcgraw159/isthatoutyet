'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('SubscribeCtrl', function ($scope, $routeParams) {

	$scope.url = new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/' + $routeParams.emailId + '/' + $routeParams.uniqueId);

	$scope.url.on('value', function(ss) {

        if(ss.val() === null) {

        	console.log('null');

        }else {

	    	ss.forEach(function(data) {

	    		var checker = data.val();

	    		console.log(checker.confirmed);

	    		$scope.url.child(data.name()).set({confirmed: 'true'});

	    	});
        }
    });

});