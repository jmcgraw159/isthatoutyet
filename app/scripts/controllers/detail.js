'use strict';

var App = angular.module('isThatOutYetApp');

App.controller('DetailCtrl', function ($scope, $http, $window, $routeParams, $rootScope) {

  // API call to get game detail
  $http.jsonp('http://www.giantbomb.com/api/games/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp', {
	  params: {
        callback: 'JSON_CALLBACK',
        json_callback: 'angular.callbacks._' + $window.angular.callbacks.counter.toString(36),
        filter: 'id:' + $routeParams.id
      }
    })
  .success(function(data){
      $scope.details = data.results[0];

      $rootScope.name = $scope.details.name;
      $rootScope.gameID = $scope.details.id;

      // Condition to check what date format should be shown
      if(data.results[0].expected_release_day === null && data.results[0].expected_release_month !== null && data.results[0].expected_release_year !== null){

        $scope.date = data.results[0].expected_release_month + '/' + data.results[0].expected_release_year;

        $rootScope.date = $scope.date;

        $rootScope.month = data.results[0].expected_release_month;
        $rootScope.day = data.results[0].expected_release_day;
        $rootScope.year = data.results[0].expected_release_year;

      }else if(data.results[0].expected_release_day === null && data.results[0].expected_release_month === null && data.results[0].expected_release_year !== null) {

        $scope.date = data.results[0].expected_release_year;

        $rootScope.date = $scope.date;

        $rootScope.month = data.results[0].expected_release_month;
        $rootScope.day = data.results[0].expected_release_day;
        $rootScope.year = data.results[0].expected_release_year;

      }else if(data.results[0].expected_release_day !== null && data.results[0].expected_release_month !== null && data.results[0].expected_release_year !== null) {

        $scope.date = data.results[0].expected_release_month + '/' + data.results[0].expected_release_day + '/' + data.results[0].expected_release_year;

        $rootScope.date = $scope.date;

        $rootScope.month = data.results[0].expected_release_month;
        $rootScope.day = data.results[0].expected_release_day;
        $rootScope.year = data.results[0].expected_release_year;

      }else {

        // Formating released date to the correct format
        var releasedDate = data.results[0].original_release_date;
        var parsedDate = releasedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

        $scope.date = parsedDate;

        $rootScope.month = data.results[0].expected_release_month;
        $rootScope.day = data.results[0].expected_release_day;
        $rootScope.year = data.results[0].expected_release_year;
        $rootScope.release = parsedDate;
      }

      // Condition to check if email signup should be shown
      if(data.results[0].original_release_date === null) {
        $scope.hideClass = 'show';
      }else {
        $scope.hideClass = 'hide';
      }

    })
    .error(function(data) {
      console.log(data);
    });

});

App.controller('EmailCtrl', ['$scope', '$firebase', '$rootScope', '$http', function ($scope, $firebase, $rootScope, $http) {

  function addUser(email, callback) {
    $http.get('http://localhost:8888/get-users/' + email + '/' + $rootScope.name + '/' + $rootScope.month + '/' + $rootScope.day + '/' + $rootScope.year + '/' + $rootScope.gameID + '/' + $scope.email.selectedDate)
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

        console.log(data);

        $scope.successClass = 'hide';

        // Push alert to array to display
        $scope.alerts.push({type: 'success', msg: "Sucess! We will send you an email to confirm your email address."});

      });
    }
  }

}]);