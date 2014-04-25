'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('SubscribeCtrl', function ($scope, $routeParams) {

	$scope.url = new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/' + $routeParams.emailId + '/' + $routeParams.uniqueId);

	$scope.unconfirmed = new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/' + $routeParams.emailId);

	$scope.confirmed = new Firebase('https://isthatoutyet.firebaseio.com/confirmed/' + $routeParams.emailId);

	$scope.url.on('value', function(ss) {

        if(ss.val() === null) {

        	console.log('null');

        }else {

	    	ss.forEach(function(data) {

	    		var checker = data.val();

	    		if(checker.confirmed === false) {

	    			$scope.url.child(data.name()).set({confirmed: 'true'}, function() {

		    			$scope.unconfirmed.on('value', function(screenshot) {

		    				var data = screenshot.val();

		    				$scope.confirmed.push(data);

		    				$scope.unconfirmed.remove();
		    			})

		    		});

	    		}else {
	    			console.log(checker.confirmed)
	    		}

	    	});
        }
    });

});