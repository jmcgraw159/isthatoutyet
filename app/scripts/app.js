'use strict';

angular.module('isThatOutYetApp', [
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/detail:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .when('/subscribe:id', {
        templateUrl: 'views/subscribe.html',
        controller: 'SubscribeCtrl'
      })
      .when('/unsubscribe:id', {
        templateUrl: 'views/unsubscribe.html',
        controller: 'UnsubscribeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
