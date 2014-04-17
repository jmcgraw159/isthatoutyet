'use strict';

var App = angular.module('isThatOutYetApp');

App.controller('DetailCtrl', function ($scope, $http, $window, $routeParams, $rootScope) {

  // API call to get game detail
  $http.jsonp('http://www.giantbomb.com/api/games/?api_key=cdb456f4a15c4052a419f97b568218a2b50634c9&format=jsonp', {
	  params: {
        callback: 'JSON_CALLBACK',
        json_callback: 'angular.callbacks._' + $window.angular.callbacks.counter.toString(36),
        filter: 'id' + $routeParams.id
      }
    })
  .success(function(data){
      $scope.details = data.results[0];

      $rootScope.name = $scope.details.name;

      // Condition to check what date format should be shown
      if(data.results[0].expected_release_day === null && data.results[0].expected_release_month !== null && data.results[0].expected_release_year !== null){

        $scope.date = data.results[0].expected_release_month + '/' + data.results[0].expected_release_year;

        $rootScope.date = $scope.date;

      }else if(data.results[0].expected_release_day === null && data.results[0].expected_release_month === null && data.results[0].expected_release_year !== null) {

        $scope.date = data.results[0].expected_release_year;

        $rootScope.date = $scope.date;

      }else if(data.results[0].expected_release_day !== null && data.results[0].expected_release_month !== null && data.results[0].expected_release_year !== null) {

        $scope.date = data.results[0].expected_release_month + '/' + data.results[0].expected_release_day + '/' + data.results[0].expected_release_year;

        $rootScope.date = $scope.date;

      }else {

        // Formating released date to the correct format
        var releasedDate = data.results[0].original_release_date;
        var parsedDate = releasedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

        $scope.date = parsedDate;
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

App.controller('EmailCtrl', ['$scope', '$firebase', '$rootScope', function ($scope, $firebase, $rootScope) {

  // Function used to replace '.' with a ',' in email address since it is not allowed in a Firebase url
  function escapeEmailAddress(email) {
  if (!email) return false
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email;
  }

  // Alert Array
  $scope.alerts = [];

  // When clicked, close alert message
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.url = new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/');

  // Set new location in Firebase
  $scope.email = $firebase($scope.url);

  $scope.addData = function()  {

    // Condition to check to see if a field is empty
    if($scope.email.inputEmail === undefined || $scope.email.inputEmail === null || $scope.email.inputEmail === '') {

      // Remove alert so it doesnt' stack upon each other
      $scope.alerts.pop();

      // Push alert to array to display
      $scope.alerts.push({type: 'danger', msg: "Error! Please enter your email address."});

    }else if($scope.email.selectedDate === undefined) {

      // Remove alert so it doesnt' stack upon each other
      $scope.alerts.pop();

      // Push alert to array to display
      $scope.alerts.push({type: 'danger', msg: "Error! Please select a date."});

    }else if($scope.email.inputEmail === undefined && $scope.email.selectedDate === undefined || $scope.email.inputEmail === null && $scope.email.selectedDate === undefined || $scope.email.inputEmail === '' && $scope.email.selectedDate === undefined) {

      // Remove alert so it doesnt' stack upon each other
      $scope.alerts.pop();

      // Push alert to array to display
      $scope.alerts.push({type: 'danger', msg: "Error! Please fill out the form above."});

    }else {

      // Remove alert so it doesnt' stack upon each other
      $scope.alerts.pop();

      // Push alert to array to display
      $scope.alerts.push({type: 'success', msg: "Sucess! We will send you an email to confirm your email address."});

      // Format the email address
      var formatedEmail = escapeEmailAddress($scope.email.inputEmail);

      // New email format
      var newEmail;

      // Check to see if the email already exists in the database
      $scope.url.child(formatedEmail).once('value', function(ss) {

        if( ss.val() === null ) {

          console.log('Email not in database');

          // Add the newly formated email address to the end of the Firebase url
          newEmail = $scope.email.$child(formatedEmail);

          // Send confirmation email

        }else {

          console.log('Email is in database');

          // Add the newly formated email address to the end of the Firebase url
          newEmail = $scope.email.$child(formatedEmail);
        }

      });

      console.log(newEmail.$id);

      // Add information to database
      newEmail.$add({title: $rootScope.name, date: $rootScope.date, selectedDate: $scope.email.selectedDate});
    }
  }

}]);