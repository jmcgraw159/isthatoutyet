'use strict';

var App = angular.module('isThatOutYetApp')
  App.controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Trying to connect to API

    // Try #1
    // $http.jsonp('http://www.giantbomb.com/api/search/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&callback=json_callback&json_callback&query=gameTitle&resources=game')
    //   .success(function(data){
    //     $scope.data = data;

    //   })
    //   .error(function(data) {
    //     console.log(data);
    //   });

    // Try #2
    // function jsonp_callback(data) {
    //     console.log(data);
    // }

    // $scope.doRequest = function() {
    //     var url = "http://www.giantbomb.com/api/search/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&callback=json_callback&json_callback&query=gameTitle&resources=game";

    //     $http.jsonp(url);
    // };

  });