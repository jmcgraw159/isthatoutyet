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
      $scope.slides = [];

      // Check to see if there if the image is glitching
      angular.forEach(data.results, function(item){
        if(item.image) {
          // console.log(item.image.small_url);
          $scope.slides.push({
            image: item.image.small_url,
            name: item.name,
            id: item.id
          });
        }else  {
          // console.log('No Image');
          $scope.slides.push({
            image: '../../images/image_error.jpg',
            name: item.name
          });
        }
      });

      // Used for formating the layout of the carousel
      $scope.$watch('slides', function(values) {

        var i, a = [], b;

        for (i = 0; i < $scope.slides.length; i += 5) {
          b = { image1: $scope.slides[i] };

          if ($scope.slides[i + 1]) {
            b.image2 = $scope.slides[i + 1];
          }

          if ($scope.slides[i + 2]) {
            b.image3 = $scope.slides[i + 2];
          }

          if ($scope.slides[i + 3]) {
            b.image4 = $scope.slides[i + 3];
          }

          if ($scope.slides[i + 4]) {
            b.image5 = $scope.slides[i + 4];
          }

          a.push(b);
        }

        $scope.groupedSlides = a;

      }, true);

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