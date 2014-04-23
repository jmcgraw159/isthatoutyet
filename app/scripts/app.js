'use strict';

/*global Firebase */
var App = angular.module('isThatOutYetApp', [
  'ngRoute',
  'ui.bootstrap',
  'firebase'
]);

App.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/detail/:id', {
      templateUrl: 'views/detail.html',
      controller: 'DetailCtrl'
    })
    .when('/subscribe/:id', {
      templateUrl: 'views/subscribe.html',
      controller: 'SubscribeCtrl'
    })
    .when('/unsubscribe/:id', {
      templateUrl: 'views/unsubscribe.html',
      controller: 'UnsubscribeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

// Controller used for the Angular-UI Typeahead function
App.controller('TypeaheadCtrl', ['$scope', '$http', '$window', '$routeParams', '$location', function ($scope, $http, $window, $routeParams, $location) {

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
        game.push({name: item.name, id: item.id, image: item.image});
      });

      return game;
    });
  };

  // When item is selected, redirect to detail page with game id
  $scope.onSelect = function ($item) {
    $routeParams = $item.id;
    $location.path('/detail/' + $routeParams);
  };

}]);