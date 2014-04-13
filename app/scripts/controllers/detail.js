'use strict';

var App = angular.module('isThatOutYetApp');

App.controller('DetailCtrl', function ($scope, $http, $window, $routeParams) {

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

      // Condition to check what date format should be shown
      if(data.results[0].expected_release_day == null && data.results[0].expected_release_month != null && data.results[0].expected_release_year != null){

        $scope.date = data.results[0].expected_release_month + '/' + data.results[0].expected_release_year;

      }else if(data.results[0].expected_release_day == null && data.results[0].expected_release_month == null && data.results[0].expected_release_year != null) {

        $scope.date = data.results[0].expected_release_year;

      }else if(data.results[0].expected_release_day != null && data.results[0].expected_release_month != null && data.results[0].expected_release_year != null) {

        $scope.date = data.results[0].expected_release_month + '/' + data.results[0].expected_release_day + '/' + data.results[0].expected_release_year;

      }else {

        // parsedDate used to turn the date into a Timestamp, which will be formated into the desired format
        $scope.parsedDate = Date.parse(data.results[0].original_release_date);

      	$scope.date = $scope.parsedDate;
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