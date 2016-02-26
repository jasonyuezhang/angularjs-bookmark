'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.categories = [
		{id: 1, name: 'Category #1'},
		{id: 2, name: 'Category #2'},
		{id: 3, name: 'Category #3'},
		{id: 4, name: 'Category #4'},
	];

	$scope.bookmarks = [
		{id: 0, url: 'http://google.com', title: 'google #2', categoryId: 2},
		{id: 1, url: 'http://google.com', title: 'google #1', categoryId: 1},
		{id: 2, url: 'http://google.com', title: 'google #2', categoryId: 2},
		{id: 3, url: 'http://google.com', title: 'google #1', categoryId: 1},
		{id: 4, url: 'http://google.com', title: 'google #4', categoryId: 4},
		{id: 5, url: 'http://google.com', title: 'google #4', categoryId: 4},
		{id: 6, url: 'http://google.com', title: 'google #3', categoryId: 3},
		{id: 7, url: 'http://google.com', title: 'google #1', categoryId: 1},
		{id: 8, url: 'http://google.com', title: 'google #2', categoryId: 2},
		{id: 9, url: 'http://google.com', title: 'google #3', categoryId: 3}	
	];

	$scope.currentCategory = null;

	function isCurrentCategory(category) {
		return $scope.currentCategory !== null && $scope.currentCategory.id === category.id;
	}

	function setCurrentCategory(category) {
		$scope.currentCategory = category;

		cancelCreating();
		cancelEditing();
	};

	$scope.setCurrentCategory = setCurrentCategory;
	$scope.isCurrentCategory = isCurrentCategory;

	/*
	 *
	 */
	$scope.isCreating = false;
	$scope.isEditing = false;

	function startCreating() {
		$scope.isCreating = true;
		$scope.isEditing = false;

		resetCreateForm();
	}

	function cancelCreating() {
		$scope.isCreating = false;
	}

	function startEditing() {
		$scope.isEditing = true;
		$scope.isCreating = false;
	}

	function cancelEditing() {
		$scope.isEditing = false;
	}

	function shouldShowCreating() {
		return $scope.currentCategory && !$scope.isEditing;
	}

	function shouldShowEditing() {
		return $scope.currentCategory && !$scope.isCreating;
	}

	$scope.startCreating = startCreating;
	$scope.cancelCreating = cancelCreating;
	$scope.startEditing = startEditing;
	$scope.cancelEditing = cancelEditing;

	$scope.shouldShowCreating = shouldShowCreating;
	$scope.shouldShowEditing = shouldShowEditing;

	/*******
	 * CRUD
	 *******/
	function resetCreateForm() {
		$scope.newBookmark = {
			title: '',
			url: '',
			categoryId: $scope.currentCategory.id
		};
		$scope.isCreating = false;
	}

	function createBookmark(bookmark) {
		bookmark.id = $scope.bookmarks.length;
		$scope.bookmarks.push(bookmark);

		resetCreateForm();
	}

	$scope.editedBookmark = null;

	function setEditedBookmark(bookmark) {
		$scope.editedBookmark = angular.copy(bookmark);

		startEditing();
	}

	function updateBookmark(bookmark) {
		var index = _.findIndex($scope.bookmarks, function(b) {
			return b.id === bookmark.id;
		});

		$scope.bookmarks[index] = bookmark;

		$scope.editedBookmark = null;
		$scope.isEditing = false;
	}

	function isSelectedBookmark(bookmarkId) {
		return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
	}

	function deleteBookmark(bookmark) {
		_.remove($scope.bookmarks, function(b) {
			return b.id === bookmark.id;
		});
	}

	$scope.createBookmark = createBookmark;
	$scope.setEditedBookmark = setEditedBookmark;
	$scope.updateBookmark = updateBookmark;
	$scope.deleteBookmark = deleteBookmark;
	$scope.isSelectedBookmark = isSelectedBookmark;
}]);