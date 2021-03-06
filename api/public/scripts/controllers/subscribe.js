'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('SubscribeCtrl', function ($scope, $http, $routeParams, $window, $location) {

  // API call to confirm email
  function confirmUser(email, id, callback) {
    $http.get('http://isthatoutyet.com/confirm-user/' + email + '/' + id)
    .success(function(data){

      if(typeof callback === 'function') {
        callback(data);
      }

    })
    .error(function(data) {
      console.log(data);
    });
  }

   confirmUser($routeParams.email, $routeParams.id, function(data) {

    console.log(data[0].confirmed);

  });

});