'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('UnsubscribeCtrl', function ($scope, $http, $routeParams, $window) {

    // API call to unconfirm email
    function unconfirmUser(email, id, callback) {
      $http.get('http://localhost:8888/unconfirm-user/' + email + '/' + id)
      .success(function(data){

        if(typeof callback === 'function') {
          callback(data);
        }

      })
      .error(function(data) {
        console.log(data);
      });
    }

   unconfirmUser($routeParams.email, $routeParams.id, function(data) {

    console.log(data[0].confirmed);

  });

});