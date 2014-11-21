<!DOCTYPE html>
<html ng-app="lifecycle.App">
	<head>
		<?php
			$host = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
			$path = '';
			if (strpos($host, 'localhost') !== FALSE) {
				$path = '/cs/webapps/resInno/src/orgStructure/';
			} elseif (strpos($host, 'dev') !== FALSE) {
				$path = '/cs/dev/orgStructure/';
			} else {
				$path = '/cs/webapps/orgStructure/';
			}
			echo "<base href=\"" . $path . "\"/>";
		?>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>Research &amp; Innovation: Lifecycle</title>
		<!--
		<script src="../js/vendor/angular-1.2.0rc1/angular.js"></script>
		<script src="../js/vendor/angular-1.2.0rc1/angular-route.js"></script> 
		-->		
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.2/angular.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.2/angular-route.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.2/angular-animate.js"></script>
		<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
		<!-- <script src="js/orgStructureForm.js" type="text/javascript"></script> -->
		<script src="js/lifecycleApp.js" type="text/javascript"></script>

		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700' rel='stylesheet' type='text/css'>
		
		<!-- <link href="css/vendor/normalize.css" rel="stylesheet" /> -->
		<!-- <link href="css/vendor/bootstrap.min.css" rel="stylesheet" /> -->
		<link href="css/vendor/bootstrap.css" rel="stylesheet" />
		<!-- <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js"></script> -->

		<link href="css/org_structure.css" rel="stylesheet" /> 

	</head>
	<body>
			<div class="container" ng-view></div>
	</body>
</html>
