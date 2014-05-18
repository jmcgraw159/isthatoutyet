'use strict';

var App = angular.module('isThatOutYetApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngCookies'
]);

App.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('detail/:id', {
      templateUrl: 'views/detail.html',
      controller: 'DetailCtrl'
    })
    .when('/subscribe', {
      templateUrl: 'views/subscribe.html',
      controller: 'SubscribeCtrl'
    })
    .when('/unsubscribe', {
      templateUrl: 'views/unsubscribe.html',
      controller: 'UnsubscribeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});

// Controller used for the Angular-UI Typeahead function
App.controller('TypeaheadCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$location', '$cookieStore', function ($scope, $http, $routeParams, $rootScope, $location, $cookieStore) {

  $scope.selected = undefined;

  $scope.getGame = function(val) {
    return $http.get('http://isthatoutyet.com/get-games/' + val)
    .then(function(res) {

      var game = [];

        angular.forEach(res.data.results, function(item){
          game.push({name: item.name, id: item.id, image: item.image, release_day: item.expected_release_day, release_month: item.expected_release_month, release_year: item.expected_release_year, release_date: item.original_release_date, desc: item.deck, platforms: item.platforms});
        });

        return game;
    });
  };

  // When item is selected, redirect to detail page with game id and game info
  $scope.onSelect = function ($item) {
    $routeParams.id = $item.id;

    // Store game info into a cookie
    $cookieStore.put('game', $item);

    $location.path('detail/' + $routeParams.id);
  };

}]);