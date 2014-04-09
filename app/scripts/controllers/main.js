'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('MainCtrl', function ($scope, $http) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // API call to get the images for the latest releases
  $http.jsonp('http://www.giantbomb.com/api/games/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&filter=original_release_date%3A1700-01-01%2000%3A00%3A00%7C2014-04-08%2000%3A00%3A00&format=jsonp&callback=JSON_CALLBACK&json_callback=angular.callbacks._0&limit=5&sort=original_release_date%3Adesc')
    .success(function(data){
      $scope.upcoming = data;
      console.log($scope.upcoming.results[0].image.thumb_url);
    })
    .error(function(data) {
      console.log(data);
    });

});


// Function used to create a drop-down list of related items to what is typed in by the user
function TypeaheadCtrl($scope, $http, $window) {
  $scope.selected = undefined;

  // Trying to update callback so it doesn't change the number
  // var callback = 'angular.callbacks._1';

  // Angular Callback Counter
  var c = $window.angular.callbacks.counter.toString(36);

  $scope.getGame = function(val) {
    return $http.jsonp('http://www.giantbomb.com/api/search/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&callback=1&json_callback=angular.callbacks._&resources=game&limit=10', {
      params: {
        query: val
      }
    }).then(function(res){
      var game = [];
      angular.forEach(res.data.results, function(item){
        console.log(item.name);
        game.push(item.name);
      });
      return game;
    });
  };
}