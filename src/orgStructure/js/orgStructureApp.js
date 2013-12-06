var orgStructure = orgStructure || (orgStructure = {});

orgStructure.App = angular.module('orgStructure.App', ['ngRoute', 'ngAnimate', 'ui.bootstrap']).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
						.when('/', {
							templateUrl: 'partials/main.tpl.html',
							controller: 'orgStructure.MainCtrl',
							reloadOnSearch: false
						})
						// .when('/:section', {
							// action: ""
// 							
						// })
						.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(true);
	}]);
	
	
orgStructure.MainCtrl = function($scope, $http, $location, $dialog, $rootScope, $sce, $timeout) {
	
	var formatBU = function(s) {
		return s ? s.split(" ").join(", ").replace("professional", "Professional").replace("school", "School").replace("higherEd", "Higher Ed") : "Research & Innovation Network";
	};
	var formatSubSection = function(s) {
		return s ? s.split(" ").join(", ").replace("northAmerica", "North America").replace("growthVenture", "Growth / Venture").replace("core", "Core") : "" ;
	};
	
	$http.get('data/project_data.json')
		.success(function(result) {
			$scope.projectData = result;
			$rootScope.projectDataMap = {};
			angular.forEach($scope.projectData, function(value, key) {
				var leads = [];
				var names = value['projectLeads'].split(',');
				var addresses = value['leadEmail'].split(',');
				for (var i=0; i < addresses.length; i++) {
					leads.push({name: names[i], address: addresses[i] });
				};
				value['leads'] = leads;
				value['projectGoal'] = $sce.trustAsHtml(value['projectGoal']);
				value['projectResults'] = $sce.trustAsHtml(value['projectResults']);
				value['related'] = value['related'] != "" ? value['related'].split(',') : [];
				value['businessUnitDisplay'] = formatBU(value['businessUnit']);
				value['subSectionDisplay'] = formatSubSection(value['subSection']);
				$rootScope.projectDataMap[value.id] = value;
			});
		}).error(function(result) {
			alert("Error getting project data. " + result);
		});
	
	$scope.circleHrefs = [];
	var businessUnits = ['higherEd', 'professional', 'school'];
	var subSections = ['northAmerica', 'core', 'growthVenture', 'northAmerica'];
	
	var positions = [
		[businessUnits[2], businessUnits[0], businessUnits[1]],
		[businessUnits[0], businessUnits[1], businessUnits[2]],
		[businessUnits[1], businessUnits[2], businessUnits[0]]
	];
	
	var setSections = function(pos) {
		var order = positions[pos];
		for (var i=0; i < 12; i++) {
			var prefix = order[Math.floor(i/4)];
			var suffix = subSections[i%4];
			$scope.circleHrefs[i] = "businessUnit=" + prefix + "&subSection=" + suffix;
		}
	};
	
	$scope.getLocation = function() {
		$scope.currBU = ($location.search()).businessUnit;
		$scope.displayBU = formatBU($scope.currBU);
		$scope.currSubSection = ($location.search()).subSection;
		$scope.displaySubSection = formatSubSection($scope.currSubSection);
	};
	$scope.getLocation();
	setSections($scope.currBU ? businessUnits.indexOf($scope.currBU) : 1);
	$scope.hideCircleMask = ($scope.currBU == undefined);
	
	$scope.onMapClick = function($event, id) {
		$event.preventDefault();
		$event.target.blur();
		var href = $scope.circleHrefs[id];
		$location.search(href);
		var oldBU = $scope.currBU;
		$scope.getLocation();
		setSections($scope.currBU ? businessUnits.indexOf($scope.currBU) : 0);
		if (oldBU != $scope.currBU) {
			$scope.hideCircleMask = true;
			$scope.circleMaskClass = "transitioning"; 
			$timeout(function() {
				$scope.circleMaskClass = ""; 
				$scope.hideCircleMask = false;
			}, 850);
		}
	};
	
	$scope.dialogOpts = {
		backdrop: true,
		backdropFade: true,
		backdropClick: true,
		dialogFade: false,
		keyboard: true,
		templateUrl: "partials/project.tpl.html",
		controller: 'orgStructure.ProjectDialogController'
	};

	$scope.openDialog = function(){
		var d = $dialog.dialog($scope.dialogOpts);
		d.open().then(function(result){
			if(result)
			{
				alert('dialog closed with result: ' + result);
			}
		});
	};
	
	$scope.onProjectClick = function($event, id) {
		$event.preventDefault();
		$rootScope.project = $rootScope.projectDataMap[id];
		$scope.openDialog();
	};
	
	// handle showing/hiding section copy
	$scope.hideCopy = false;
	$scope.onCopyToggle = function() {
		$scope.hideCopy = !$scope.hideCopy;
	};
};

// the dialog is injected in the specified controller
orgStructure.ProjectDialogController = function($scope, $rootScope, dialog){
	
	$scope.project = $rootScope.project;
	
	$scope.close = function(result){
		dialog.close(result);
	};
};
