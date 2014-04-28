'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('UnsubscribeCtrl', function ($scope, $routeParams, $window) {

  // Firebase URLs
  $scope.url = new Firebase('https://isthatoutyet.firebaseio.com/confirmed/' + $routeParams.email);
  $scope.confirmed = new Firebase('https://isthatoutyet.firebaseio.com/confirmed/' + $routeParams.email);

  $scope.url.once('value', function(ss) {

  	console.log(ss.val());

    // Check to see if value exists
    if(ss.val() === null) {

      console.log('null');

      // If null, redirect to homepage
      $window.location = '/';

    }else {

      ss.forEach(function(data) {

        data.forEach(function(id) {

          if(id.name() === $routeParams.id) {
            $scope.confirmed.remove();
          }

        })
      });
    }
  });
});