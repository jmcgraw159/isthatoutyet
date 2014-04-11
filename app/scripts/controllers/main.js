'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('MainCtrl', function ($scope, $http, $window) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // API call to get the images for the latest releases
  $http.jsonp('http://www.giantbomb.com/api/games/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&filter=original_release_date%3A1700-01-01%2000%3A00%3A00%7C2014-04-08%2000%3A00%3A00&limit=5&sort=original_release_date%3Adesc', {
    params: {
        callback: 'JSON_CALLBACK',
        json_callback: 'angular.callbacks._' + $window.angular.callbacks.counter.toString(36),
      }
    })
    .success(function(data){
      $scope.upcoming = data;

      // Check to see if there is an image for the game
      angular.forEach(data.results, function(item){
        if(item.image) {
          console.log(item.image.small_url);
        }else  {
          console.log('No Image');
        }
      });

    })
    .error(function(data) {
      console.log(data);
    });
});

// Function used to create a drop-down list of related items to what is typed in by the user
function TypeaheadCtrl($scope, $http, $window, $routeParams, $location) {
  $scope.selected = undefined;

  $scope.getGame = function(val) {
    return $http.jsonp('http://www.giantbomb.com/api/search/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&resources=game&limit=10', {
      params: {
        callback: 'JSON_CALLBACK',
        json_callback: 'angular.callbacks._' + $window.angular.callbacks.counter.toString(36),
        query: val
      }
    }).then(function(res){
      var game = [];

      // Angular Callback Counter
      // console.log($window.angular.callbacks.counter);

      angular.forEach(res.data.results, function(item){
        game.push({name: item.name, id: item.id});
      });

      return game;
    });
  };

  $scope.onSelect = function ($item, $routeParams) {
    $routeParams = $item.id;
    $location.path('/detail:' + $routeParams);
  };
}