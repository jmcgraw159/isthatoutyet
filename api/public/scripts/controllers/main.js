'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('MainCtrl', function ($scope, $http, $filter) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // Retrive today's date
  var today = $filter('date')(new Date(),'yyyy-MM-dd');
  var encodedDate = encodeURIComponent(today);

  // API call to get the images for the latest releases
  $http.get('http://isthatoutyet.com/get-recent/' + encodedDate)
    .success(function(data){
      $scope.upcoming = data;

      // Check to see if there if the image is glitching
      angular.forEach(data.results, function(item){
        if(item.image) {
          // console.log(item.image.small_url);
        }else  {
          console.log('No Image');
          item.image.small_url = 'images/image_error.jpg';
        }
      });

    })
    .error(function(data) {
      console.log(data);
    });
});

// If image fails to load, use fallback image
App.directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
   }
   return fallbackSrc;
 });