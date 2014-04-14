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

  // Set new location in Firebase
  $scope.email = $firebase(new Firebase('https://isthatoutyet.firebaseio.com/unconfirmed/'));

  $scope.addData = function()  {
    console.log('Added to database');

    // Add the newly formated email address to the end of the Firebase url
    var newEmail = $scope.email.$child(escapeEmailAddress($scope.email.inputEmail));

    // Add information to database
    newEmail.$add({title: $rootScope.name, date: $rootScope.date, selectedDate: $scope.email.selectedDate});
  }

}])