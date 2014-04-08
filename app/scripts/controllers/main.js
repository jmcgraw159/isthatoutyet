'use strict';

var App = angular.module('isThatOutYetApp');
App.controller('MainCtrl', function ($scope, $http) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // Try #1
  $http.jsonp('http://www.giantbomb.com/api/search/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&json_callback=angular.callbacks._0&query=gameTitle&resources=game')
    .success(function(data){
      console.log(data);

    })
    .error(function(data) {
      console.log(data);
    });

});

function TypeaheadCtrl($scope, $http) {
  $scope.selected = undefined;
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getGame = function(val) {
    return $http.jsonp('http://www.giantbomb.com/api/search/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp&json_callback=angular.callbacks._0&resources=game', {
      params: {
        query: val
      }
    }).then(function(res){
      var game = [];
      angular.forEach(res.data.results, function(item){
        game.push(item.name);
      });
      console.log(res);
      return game;
    });
  };
}