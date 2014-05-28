'use strict';

var App = angular.module('isThatOutYetApp', [
  'ngRoute',
  'ui.bootstrap'
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
});

// Controller used for the Angular-UI Typeahead function
App.controller('TypeaheadCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$location', function ($scope, $http, $routeParams, $rootScope, $location) {

  $scope.selected = undefined;

  $scope.getGame = function(val) {
    return $http.get('http://isthatoutyet.com/get-games/' + val)
    .then(function(res) {

      var game = [];

      if(!res.data.results) {

        console.log('Database');

        angular.forEach(res.data, function(item){
          game.push({name: item.title, id: item.game_id, image: item.image});
        });

      }else {

        console.log('API');

        angular.forEach(res.data.results, function(item){

          if(item.image.small_url === null) {
            $scope.imageFix = '../../images/image_error.jpg';
          }else  {
            $scope.imageFix = item.image.small_url;
          }

          game.push({name: item.name, id: item.id, image: imageFix, release_day: item.expected_release_day, release_month: item.expected_release_month, release_year: item.expected_release_year, release_date: item.original_release_date, desc: item.deck, platforms: item.platforms});
        });

      }
        return game;
    });
  };

  // When item is selected, redirect to detail page with game id and game info
  $scope.onSelect = function ($item) {
    $routeParams.id = $item.id;

    $location.path('/detail/' + $routeParams.id);
  };

}]);