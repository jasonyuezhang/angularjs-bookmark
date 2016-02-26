'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.view2',
  'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

// takes second parameter as an array of dependcies and
// the last element of the array is the function of the
// controller
.controller('MainCtrl', function($scope) {
	$scope.hello = "world";
});
