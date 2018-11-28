<?php

require_once("login.php");
require_once("_db.php");

//Load customizations at the end
require_once 'customizations/customizations.php';

?>

<!DOCTYPE html>
<html>
<head>
	<title>SalonERP - Admin</title>
	<link type="text/css" rel="stylesheet" href="media/layout.css" />

	<link type="text/css" rel="stylesheet" href="media/themes/calendar_g.css" />
	<link type="text/css" rel="stylesheet" href="media/themes/calendar_green.css" />
	<link type="text/css" rel="stylesheet" href="media/themes/calendar_traditional.css" />
	<link type="text/css" rel="stylesheet" href="media/themes/calendar_transparent.css" />
	<link type="text/css" rel="stylesheet" href="media/themes/calendar_white.css" />

	<!-- helper libraries -->
	<script src="js/promise/es6-promise.min.js" type="text/javascript"></script>
	<script src="js/promise/es6-promise.auto.min.js" type="text/javascript"></script>
	<script src="js/jquery-1.9.1.min.js" type="text/javascript"></script>
	<script src="js/daypilot/daypilot-common.src.js" type="text/javascript"></script>
	<script src="js/daypilot/daypilot-calendar.src.js" type="text/javascript"></script>
	<script src="js/daypilot/daypilot-datepicker.src.js" type="text/javascript"></script>
	<script src="js/daypilot/daypilot-modal.src.js" type="text/javascript"></script>
	<script src="js/daypilot/daypilot-month.src.js" type="text/javascript"></script>
	<script src="js/daypilot/daypilot-navigator.src.js" type="text/javascript"></script>
	<script src="js/jscolor/jscolor.js" type="text/javascript"></script>
	<script src="js/iscroll.js" type="text/javascript"></script>
	<script src="js/dhtmlxcombo.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="js/dhtmlxcombo.css"/>

	<script src="js/salonerp.js" type="text/javascript"></script>
	<link type="text/css" rel="stylesheet" href="media/window.css" />

	<!-- Customizations -->
	<?php
	//Here we load all the frontend customizations
	$folder = dirname(__FILE__) . "/customizations";
	if ($handle = opendir($folder))
	{
		while (false !== ($entry = readdir($handle)))
		{
			if (Tools\Tools::endsWith($entry, ".js") && $entry != "customizations.js")
			{
				echo "<script src=\"customizations/$entry\" type=\"text/javascript\"></script>";
			}
		}
		closedir($handle);
	}
	?>
	<meta name="viewport" content="width=device-width, user-scalable=no" />
</head>
	<body>
		<img src="media/salonerp.png" id="salonerp-logo" />

		<h1 class="language_administration">Administration</h1>
		<table id="menu">
			<tr>
				<td><p class="language_adminDatabase" id="menuDatabase">Database Administration</p></td>
			</tr>
			<tr>
				<td><p class="language_invoiceLayout" id="invoiceLayout">Invoice layout</p></td>
			</tr>
		</table>

		<script type="text/javascript">

		$(document).ready(function() {
			//Init SalonERP
			var salonerp = new SalonErpAdmin();

			//Register UI events
			$("#menuDatabase").click(function() { salonerp.showAdminDatabase() });
			$("#invoiceLayout").click(function() { salonerp.showInvoiceLayout() });
		});

		</script>
		
	</body>
</html>
