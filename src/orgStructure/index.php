<!DOCTYPE html>
<html ng-app="orgStructure.App">
	<head>
		<?php
			echo "<base href=\"" . $_SERVER['REQUEST_URI'] . "\"/>";
		?>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>Research &amp; Innovation: New Organizational Structure</title>
		<!--
		<script src="../js/vendor/angular-1.2.0rc1/angular.js"></script>
		<script src="../js/vendor/angular-1.2.0rc1/angular-route.js"></script> 
		-->		
		<script src="js/vendor/angular-1.2.27/angular.js"></script>
		<script src="js/vendor/angular-1.2.27/angular-route.js"></script>
		<script src="js/vendor/angular-1.2.27/angular-animate.js"></script>
		<script src="js/vendor/ui-bootstrap-tpls-0.12.0.js"></script>
		<!-- <script src="js/orgStructureForm.js" type="text/javascript"></script> -->
		<script src="js/orgStructureApp.js" type="text/javascript"></script>

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
