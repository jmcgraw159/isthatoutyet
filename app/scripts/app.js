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

// Controller to check to see if chosen date is equal to today
App.controller('CheckDateCtrl', ['$scope', '$filter', function ($scope, $filter) {

  var currentDate = new Date();
  currentDate = $filter('date')(currentDate, "MM/dd/yyyy");;

  console.log('Today\'s date is ' + currentDate);

  $scope.url = new Firebase('https://isthatoutyet.firebaseio.com/confirmed/');

  var x;

  $scope.url.once('value', function(ss) {

    // Check to see if value exists
    if(ss.val() === null) {

      console.log('null');

    }else {

      ss.forEach(function(data) {

        data.forEach(function(item) {

          item.forEach(function(detail) {

            x = detail.val();

            if(x.date === currentDate) {

              console.log('Send email, today is ' + x.date);

            }else if(x.date !== undefined) {

              console.log('Not today, email should be sent on ' + x.date);

            }

          })
        })
      });
    }
  });
}])