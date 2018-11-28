<?php

if(!file_exists("php/config.php"))
{
	require_once("install.php");
	exit(0);
}

require_once("login.php");
require_once("_db.php");

//Load customizations at the end
require_once 'customizations/customizations.php';

?>

<!DOCTYPE html>
<html>
<head>
	<title>SalonERP - <?php echo $GLOBALS["SETTINGS"]["company"]; ?></title>
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
		<table id="main">
			<tr>
				<td rowspan="3">
					<div id="nav"></div>
				</td>
				<td rowspan="3">
					<div class="verticalLine"></div>
				</td>
				<td>
					<table id="menu">
						<tr>
							<td>
								<img src="media/salonerp.png" id="salonerp-logo" />
							</td>
							<td>
								<div class="styled-select">
									<select id="viewType">
										<option value="Week" class="language_week">Week</option>
										<option value="day" class="language_day">Day</option>
									</select>
								</div>
								<div class="styled-select">
									<select id="employee">
										<option value="overview" class="language_overview">Overview</option>
									</select>
								</div>
							</td>
							<td><p class="language_customers" id="menuCustomers">Customers</p></td>
							<td><p class="language_products" id="menuProducts">Products</p></td>
							<td><p class="language_reports" id="menuReports">Reports</p></td>
							<td><p class="language_settings" id="menuSettings">Settings</p></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<span id="title">
						<button class="language_previousDate styled-button" id="previousDate">Previous</button>
							<h2 id="dateText">Date</h2>
						<button class="language_nextDate styled-button" id="nextDate">Next</button>
					</span>
				</td>
			</tr>
			<tr>
				<td style="white-space:nowrap">
					<div id="calendars"></div>
				</td>
			</tr>
		</table>

		<script type="text/javascript">

		$(document).ready(function() {
			//Init SalonERP
			var salonerp = new SalonErpGui("nav", "calendars");

			//Register UI events
			$("#viewType").change(function() { salonerp.setViewType(this.value) });

			$("#employee").change(function() { salonerp.selectEmployee(this.value) });

			$("#menuCustomers").click(function() { salonerp.showCustomers() });
			$("#menuProducts").click(function() { salonerp.showProducts() });
			$("#menuReports").click(function() { salonerp.showReports() });
			$("#menuSettings").click(function() { salonerp.showSettings() });

			$("#previousDate").click(function() { salonerp.previousDate() });
			$("#nextDate").click(function() { salonerp.nextDate() });

			document.getElementById("viewType").selectedIndex = 0;

			SalonErpEvents.employeesLoaded.addHandler(function(employees){
				var element = $("#employee");
				employees.forEach(function(employee, index){
					var exists = element.children('option[value="' + employee.id + '"]').length > 0;

					if(!exists){
						var option = $('<option value="' + employee.id + '">' +employee.name + '</option>');
						option.insertBefore(element.children().eq(index));
					} 
				});
				element.children().each(function(index, e){
					var exists = false;
					var option = $(e);
					if(option.val() == "overview")return;
					for(var i = 0; i < employees.length; i++){
						if(option.val() == employees[i].id){
							exists = true;
							break;
						} 
					}
					if(!exists){
						option.remove();
					}
				});
			});

			SalonErpEvents.newEmployee.addHandler(function(employee){
				var element = $("#employee");
				var option = $('<option value="' + employee.id + '">' +employee.name + '</option>');
				option.insertBefore(element.children().eq(element.children.length));
			});

			SalonErpEvents.modifyEmployee.addHandler(function(employee) {
				var element = $("#employee");
				element.children('option[value="' + employee.id + '"]').text(employee.name);
			});

			var dateText = document.getElementById("dateText");
			SalonErpEvents.eventsLoading.addHandler(function() {
				if(salonerp.getViewType() == "Week"){
					dateText.className = "language_weeklyOverview";
					dateText.innerHTML = language.weeklyOverview;
				}else{
					dateText.className = "";
					dateText.innerHTML = salonerp.getDayName(salonerp.getVisibleStart().dayOfWeek());
				}
			});
		});

		</script>
		
	</body>
</html>
