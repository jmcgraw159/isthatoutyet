'use strict';

var App = angular.module('isThatOutYetApp');

App.controller('DetailCtrl', function ($scope, $http, $routeParams, $rootScope, $cookieStore) {

      $http.get('http://isthatoutyet.com/get-game/' + $routeParams.id)
      .success(function(data){

        console.log(data);

        $scope.game = data.results;
        $scope.thumbnail = $scope.game.small_url;

        // Condition to check if email signup should be shown
        if($scope.game.release_date === null) {
          $scope.hideClass = 'show';
        }else {
          $scope.hideClass = 'hide';
        }

        // Set rootScope variables so data can be used in another controller
        $rootScope.name = $scope.game.name;
        $rootScope.gameID = $scope.game.id;

        // Condition to check what date format should be shown
        if($scope.game.expected_release_day === null && $scope.game.expected_release_month !== null && $scope.game.expected_release_year !== null){

          $scope.date = $scope.game.expected_release_month + '/' + $scope.game.expected_release_year;

          $rootScope.date = $scope.date;
          $rootScope.month = $scope.game.expected_release_month;
          $rootScope.day = $scope.game.expected_release_day;
          $rootScope.year = $scope.game.expected_release_year;

        }else if($scope.game.expected_release_day === null && $scope.game.expected_release_month === null && $scope.game.expected_release_year !== null) {

          $scope.date = $scope.game.expected_release_year;

          $rootScope.date = $scope.date;
          $rootScope.month = $scope.game.expected_release_month;
          $rootScope.day = $scope.game.expected_release_day;
          $rootScope.year = $scope.game.expected_release_year;

        }else if($scope.game.expected_release_day !== null && $scope.game.expected_release_month !== null && $scope.game.expected_release_year !== null) {

          $scope.date = $scope.game.expected_release_month + '/' + $scope.game.expected_release_day + '/' + $scope.game.expected_release_year;

          $rootScope.date = $scope.date;
          $rootScope.month = $scope.game.expected_release_month;
          $rootScope.day = $scope.game.expected_release_day;
          $rootScope.year = $scope.game.expected_release_year;

        }else if($scope.game.expected_release_day === null && $scope.game.expected_release_month === null && $scope.game.expected_release_year === null && $scope.game.original_release_date === null) {

          $scope.date = 'TBA';

          $rootScope.date = $scope.date;
          $rootScope.month = $scope.game.expected_release_month;
          $rootScope.day = $scope.game.expected_release_day;
          $rootScope.year = $scope.game.expected_release_year;

        }else {

          // Formating released date to the correct format
          var releasedDate = $scope.game.original_release_date;
          var parsedDate = releasedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

          $scope.date = parsedDate;
        }

        });

      // Retrive stored cookie info
      // $scope.game = $cookieStore.get('game');


});

App.controller('EmailCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

  function addUser(email, callback) {
    $http.get('http://isthatoutyet.com/get-users/' + email + '/' + $rootScope.name + '/' + $rootScope.month + '/' + $rootScope.day + '/' + $rootScope.year + '/' + $rootScope.gameID + '/' + $scope.email.selectedDate)
    .success(function(data){

      if(typeof callback === 'function') {
        callback(data);
      }

    })
    .error(function(data) {
      console.log(data);
    });
  }

  // Alert Array
  $scope.alerts = [];

  // When clicked, close alert message
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.addData = function()  {

    // Condition to check to see if a field is empty
    if($scope.email.inputEmail === undefined || $scope.email.inputEmail === null || $scope.email.inputEmail === '') {

      // Remove alert so it doesnt' stack upon each other
      $scope.alerts.pop();

      // Push alert to array to display
      $scope.alerts.push({type: 'danger', msg: "Error! Please enter your email address."});

    }else {

      // Remove alert so it doesnt' stack upon each other
      $scope.alerts.pop();

      // Call to addUser function
      addUser($scope.email.inputEmail, function(data) {

        $scope.successClass = 'hide';

        if(data === '0') {
          // Push alert to array to display
          $scope.alerts.push({type: 'success', msg: "Success! We will send you an email to confirm your email address."});
        }else {
          // Push alert to array to display
          $scope.alerts.push({type: 'success', msg: "Success! We will notify you on the selected date."});
        }

      });
    }
  }

}]);