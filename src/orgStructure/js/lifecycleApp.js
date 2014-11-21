var lifecycle = lifecycle || (lifecycle = {});

lifecycle.App = angular.module('lifecycle.App', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
						.when('/lifecycle.php', {
							templateUrl: 'partials/lifecycle.tpl.html',
							controller: 'lifecycle.MainCtrl',
							reloadOnSearch: false
						})
						// .when('/inputForm', {
							// templateUrl: 'partials/form.tpl.html',
							// controller: 'lifecycle.FormCtrl',
							// reloadOnSearch: false
						// })
						.otherwise({redirectTo: '/lifecycle.php'});
		$locationProvider.html5Mode(true);
	}]);

lifecycle.MainCtrl = function($scope, $http) {

	console.log("Hello");

	$http.get('data/lifecycle_data.json')
		.success(function(result) {
			$scope.data = result;
		}).error(function(result) {
			alert("Error getting project data. " + result);
		});

};
