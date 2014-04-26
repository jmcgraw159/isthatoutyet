'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('SubscribeCtrl', function ($scope, $routeParams) {

	// Firebase URLs
	$scope.url = new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/' + $routeParams.email + '/' + $routeParams.id);
	$scope.unconfirmed = new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/' + $routeParams.email);
	$scope.confirmed = new Firebase('https://isthatoutyet.firebaseio.com/confirmed/' + $routeParams.email);

	$scope.url.once('value', function(ss) {

		// Check to see if value exists
        if(ss.val() === null) {

        	console.log('null');

        }else {

	    	ss.forEach(function(data) {

	    		var checker = data.val();

	    		// Check to make sure value is false
	    		if(checker.confirmed === false) {

	    			// If false, set to true
	    			$scope.url.child(data.name()).set({confirmed: 'true'}, function() {

		    			$scope.unconfirmed.on('value', function(screenshot) {

		    				var data = screenshot.val();

		    				// Push data to confirm section
		    				$scope.confirmed.push(data);

		    				// Remove data from unconfirmed section
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