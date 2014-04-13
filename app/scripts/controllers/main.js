'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('MainCtrl', function ($scope, $http, $window, $filter) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // Retrive today's date
  var today = $filter('date')(new Date(),'yyyy-MM-dd');

  // API call to get the images for the latest releases
  $http.jsonp('http://www.giantbomb.com/api/games/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&limit=5&sort=original_release_date%3Adesc', {
    params: {
        callback: 'JSON_CALLBACK',
        json_callback: 'angular.callbacks._' + $window.angular.callbacks.counter.toString(36),
        filter: 'original_release_date:1700-01-01|' + today
      }
    })
    .success(function(data){
      $scope.upcoming = data;

      // Check to see if there if the image is glitching
      angular.forEach(data.results, function(item){
        if(item.image) {
          // console.log(item.image.small_url);
        }else  {
          console.log('No Image');
        }
      });

    })
    .error(function(data) {
      console.log(data);
    });
});