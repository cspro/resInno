var orgStructure = orgStructure || (orgStructure = {});

orgStructure.App = angular.module('orgStructure.App', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/main.tpl.html',
				controller: 'orgStructure.MainCtrl',
				reloadOnSearch: false
			})
			.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(true);
	}]);
	
	angular.module('orgStructure.App').directive('testDirective', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				console.log("Here is a directive!");
			}
		};
	});
	
	
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
			$scope.projectCount = 0;
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
				value['selectionClass'] = "";
				value['show'] = value['isVisible'] == 'true' ? true : false;
				if (value['show']) {
					$scope.projectCount++;
				}
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
	
	$scope.centers = [
		{'id': 'DD', 'name': 'Digital Data, Analytics & Adaptive Learning' },
		{'id': 'CC', 'name': 'College & Career Success' },
		{'id': 'NG', 'name': 'NextGen Learning & Assessments' },
		{'id': 'OL', 'name': 'eLearning' },
		{'id': 'EE', 'name': 'Educator Learning & Effectiveness' },
		{'id': 'PD', 'name': 'Product Design Research & Efficacy' }
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
	
	var init = function() {
		$scope.getLocation();
		setSections($scope.currBU ? businessUnits.indexOf($scope.currBU) : 1);
		$scope.hideCircleMask = ($scope.currBU == undefined);
	};
	
	init();
	
	$scope.deselectAllProjects = function() {
		angular.forEach($scope.projectData, function(value, key) {
			value.selectionState = "";
		});
	};
	
	$scope.reset = function($event) {
		if ($event) {
			$event.preventDefault();
		}	
		$scope.deselectAllProjects();
		$location.search("");
		init();
	};
	
	$scope.onMapClick = function($event, id) {
		$scope.deselectAllProjects();
		$event.preventDefault();
		$event.target.blur();
		var href = $scope.circleHrefs[id];
		$location.search(href);
		var oldBU = $scope.currBU;
		$scope.getLocation();
		setSections($scope.currBU ? businessUnits.indexOf($scope.currBU) : 0);
		if (($scope.currBU == 'professional') && (oldBU == undefined)) {
			$scope.hideCircleMask = false;
		} else {
			if (oldBU != $scope.currBU ) {
				$scope.hideCircleMask = true;
				$scope.circleMaskClass = "transitioning"; 
				$timeout(function() {
					$scope.circleMaskClass = ""; 
					$scope.hideCircleMask = false;
				}, 850);
			}
		}
	};
	
	$scope.onCenterClick = function($event, id) {
		$event.preventDefault();
		$scope.reset();
		$scope.currBU = id;
		if (id=="PD") {
			$scope.openDialog(true);
		}
	};
	
	$scope.onLifecycleCenterClick = function($event, id) {
		$event.preventDefault();
		$scope.reset();
	};
	
	$scope.onProjectClick = function($event, id) {
		$event.preventDefault();
		$rootScope.project = $rootScope.projectDataMap[id];
		$scope.openDialog();
	};
	
	$scope.onProjectMouseOver = function($event, id) {
		angular.forEach($scope.projectData, function(value, key) {
			if (value.id == id) {
				value.selectionState = "selected";
			} else {
				value.selectionState = "";
			}
		});
	};
	
	$scope.onProjectMouseLeave = function($event, id) {
		angular.forEach($scope.projectData, function(value, key) {
			value.selectionState = "";
		});
	};
	
	// handle showing/hiding section copy
	$scope.hideCopy = false;
	$scope.onCopyToggle = function() {
		$scope.hideCopy = !$scope.hideCopy;
	};
	
	$scope.dialogOpts = {
		backdrop: true,
		backdropFade: true,
		backdropClick: true,
		dialogFade: false,
		keyboard: true
	};

	$scope.openDialog = function(isLifecycle){
		var opts = $scope.dialogOpts;
		opts.templateUrl = isLifecycle ? "partials/lifecycle.tpl.html" : "partials/project.tpl.html";
		opts.controller = isLifecycle ? "orgStructure.LifecycleController" : "orgStructure.ProjectDialogController";
		var d = $dialog.dialog($scope.dialogOpts);
		d.open();
	};


};

// the dialog is injected into the specified controller
orgStructure.ProjectDialogController = function($scope, $rootScope, dialog){
	
	$scope.project = $rootScope.project;
	
	$scope.close = function(result){
		dialog.close(result);
	};
};


orgStructure.LifecycleController  = function($scope, $http) {

	console.log("Hello");

	$http.get('data/lifecycle_data.json')
		.success(function(result) {
			$scope.data = result;
		}).error(function(result) {
			alert("Error getting project data. " + result);
		});

};