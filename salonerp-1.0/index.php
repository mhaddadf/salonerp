<?php

if(!file_exists("config/config.php"))
{
	require_once("install.php");
	exit(0);
}

require_once("login.php");
require_once("_db.php");
loadSettings($db);

?>

﻿<!DOCTYPE html>
<html>
<head>
	<title>SalonERP - <?php echo $GLOBALS["SETTINGS"]["company"]; ?></title>
	<link type="text/css" rel="stylesheet" href="media/layout.css" />

	<link type="text/css" rel="stylesheet" href="themes/calendar_g.css" />
	<link type="text/css" rel="stylesheet" href="themes/calendar_green.css" />
	<link type="text/css" rel="stylesheet" href="themes/calendar_traditional.css" />
	<link type="text/css" rel="stylesheet" href="themes/calendar_transparent.css" />
	<link type="text/css" rel="stylesheet" href="themes/calendar_white.css" />

	<!-- helper library -->
	<script src="js/jquery-1.9.1.min.js" type="text/javascript"></script>
	<script src="js/daypilot/daypilot-all.min.js" type="text/javascript"></script>
	<script src="js/jscolor/jscolor.js" type="text/javascript"></script>
	<script src="js/dhtmlxcombo.js" type="text/javascript"></script>
	<script src="js/language.js" type="text/javascript"></script>

	<!-- Combobox library -->
	<link rel="stylesheet" type="text/css" href="js/dhtmlxcombo.css"/>

	<!-- Window library -->
	<script src="js/window.js" type="text/javascript"></script>
	<link type="text/css" rel="stylesheet" href="media/window.css" />

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
							</td>
							<td><p class="language_customers" onclick="showCustomers()">Customers</p></td>
							<td><p class="language_products" onclick="showProducts()">Products</p></td>
							<td><p class="language_reports" onclick="showReports()">Reports</p></td>
							<td><p class="language_settings" onclick="showSettings()">Settings</p></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<span id="title">
						<div class="language_previousDate" id="previous" onclick="previousDate()">Previous</div>
							<h2 id="dateText">Date</h2>
						<div class="language_nextDate" id="next" onclick="nextDate()">Next</div>
					</span>
				</td>
			</tr>
			<tr>
				<td>
					<div id="dp"></div>
				</td>
			</tr>
		</table>

		<script type="text/javascript">
		function update(){
			$.ajax({
				type: "POST",
				url: "backend.php",
				data: { what: "getCustomers" }, 
				success: function(data) { setAllCustomers(data); },
				async: false
			});

			$.ajax({
				type: "POST",
				url: "backend.php",
				data: { what: "getProducts" }, 
				success: function(data) { setAllProducts(data); },
				async: false
			});
		}

		function updateLoop(){
			update();
			setTimeout(updateLoop, 300000);
		}


		var nav = new DayPilot.Navigator("nav");
		nav.selectMode = "day";
		nav.cellHeight = 30;
		nav.cellWidth = 30;
		nav.onTimeRangeSelected = function(args) {
			dp.startDate = args.day;
			dp.update();
			loadEvents();
			updateCalendar();
		};

		var dp = new DayPilot.Calendar("dp");
		dp.viewType = "Week";

		dp.onEventMove = function (args) {
			if(args.e.data.invoicedate != null){
				alert(language.cantChangePaidEvent);
				args.preventDefault();
			}
		}

		dp.onEventResize = function (args) {
			if(args.e.data.invoicedate != null){
				alert(language.cantChangePaidEvent);
				args.preventDefault();
			}
		}

		dp.onEventMoved = function (args) {
			changeTime(args.e, args.newStart, args.newEnd);
		};

		dp.onEventResized = function (args) {
			changeTime(args.e, args.newStart, args.newEnd);
		};

		// event creating
		dp.onTimeRangeSelected = function (args) {
			if(areWindowsActive()){
				closeAllWindows();
				return;
			}

			if(isEventToReschedule()){
				reschedule(args, getEventToReschedule());
				clearEventToReschedule();
				return;
			}

			showEvent(null, 30, function(customer, product, comment, time){
				var end = args.start.addMinutes(parseInt(time));
				createEvent(customer, product, comment, args.start, end);
				dp.clearSelection();
			});
		};

		dp.onEventClicked = function(args) {
			if(areWindowsActive()){
				closeAllWindows();
			}

			var duration = (args.e.data.end.getTotalTicks() - args.e.data.start.getTotalTicks()) / 60000;
			showEvent(args.e, duration, function(customer, product, comment, time){
				updateEvent(args.e, customer, product, comment, time);
			}, function(products, cash, bank){
				createInvoice(args.e, products, cash, bank);
			});
		};

		attachEvent("beforeNewProduct", function(product){
			$.ajax({
				type: "POST",
				url: "backend.php",
				data: {
					what: "createProduct",
					name: product.name,
					duration: product.duration,
					price: product.price,
					color: product.color
				}, 
				success: function(data) {
					product.id = data.id;
				},
				async: false
			});
			return true;
		});

		attachEvent("beforeNewCustomer", function(customer){
			$.ajax({
				type: "POST",
				url: "backend.php",
				data: {
					what: "createCustomer",
					firstname: customer.firstname,
					lastname: customer.lastname,
					comment: customer.comment,
					address: customer.address,
					telephone: customer.telephone
				}, 
				success: function(data) {
					customer.id = data.id;
				},
				async: false
			});
			return true;
		});

		attachEvent("delete", function(event){
			$.post("backend.php", {
				what: "deleteEvent",
				id: event.data.id
			}, 
			function() {
				console.log("Deleted.");
			});
			dp.events.remove(event);
			updateCalendar();
		});

		attachEvent("modifyCustomer", function(customer){
			$.post("backend.php", {
				what: "updateCustomer",
				id: customer.id,
				firstname: customer.firstname,
				lastname: customer.lastname,
				comment: customer.comment,
				address: customer.address,
				telephone: customer.telephone,
			}, 
			function() {
				console.log("Updated.");
			});
		});

		attachEvent("modifyProduct", function(product){
			$.post("backend.php", {
				what: "updateProduct",
				id: product.id,
				name: product.name,
				duration: product.duration,
				price: product.price,
				color: product.color
			}, 
			function() {
				console.log("Updated.");
			});
			updateCalendar();
		});

		attachEvent("newSettings", function(settings){
			if(settings.theme != null){
				dp.theme = settings["theme"];
			}
			if(settings.language != null){
				loadLanguage(settings["language"]);
			}
			if(settings.startTime != null){
				dp.businessBeginsHour = parseInt(settings.startTime);
			}
			if(settings.endTime != null){
				dp.businessEndsHour = parseInt(settings.endTime);
			}
			if(settings.showMonths != null){
				nav.showMonths = parseInt(settings.showMonths);
				nav.skipMonths = parseInt(settings.showMonths);
				nav.update();
			}
			if(settings.timeFormat != null){
				dp.timeFormat = settings.timeFormat;
			}
			updateCalendar();
		});

		function previousDate(){
			var days = ((dp.viewType == "Week") ? 7 : 1);
			var newDay = nav.selectionStart.addDays(-days);
			nav.select(newDay);
		}

		function nextDate(){
			var days = ((dp.viewType == "Week") ? 7 : 1);
			var newDay = nav.selectionStart.addDays(days);
			nav.select(newDay);
		}

		function updateCalendar(){
			dp.update();
			var elements = document.querySelectorAll(".calendar_default_event_inner, .calendar_traditional_event_inner, .calendar_g_event_inner, .calendar_green_event_inner, .calendar_transparent_event_inner, .calendar_white_event_inner");
			for(var i = 0; i < elements.length; i++){
				getAllProducts().forEach(function(product){
					if(elements[i].innerHTML.indexOf(product.name) > -1){
						var color = product.color;
						if(!color.startsWith("#"))color = "#"+color;
						elements[i].style.border = "2px solid " + color;
					}
				});
			}
		}

		function loadEvents() {
			var start = dp.visibleStart();
			var end = dp.visibleEnd();
			if(dp.viewType == "Week"){
				document.getElementById("dateText").innerHTML = language.weeklyOverview;
				document.getElementById("dateText").className = "language_weeklyOverview";
			}else{
				var locale = DayPilot.Locale.all[dp.locale];
				document.getElementById("dateText").className = "";
				document.getElementById("dateText").innerHTML = locale.dayNames[start.dayOfWeek()];
			}

			$.post("backend.php", {
				what: "getEvents",
				start: start.toString(),
				end: end.toString()
			}, 
			function(data) {
				data.forEach(function(element){
					element.comment = element.text;
					element.text = getCustomer(element.customer).name + ", " + getProduct(element.product).name + ", " + element.comment;
				});
				dp.events.list = data;
				updateCalendar();
			});
		}

		function createEvent(customer, product, comment, start, end){
			$.post("backend.php", {
				what: "createEvent",
				start: start.toString(),
				end: end.toString(),
				name: comment,
				customer: customer,
				product: product
			}, 
			function(result) {
				var e = new DayPilot.Event({
					start: start,
					end: end,
					id: result.id,
					resource: "E",//args.resource,
					text: getCustomer(customer).name + ", " + getProduct(product).name + ", " + comment,
					customer: customer,
					product: product,
					comment: comment
				});
				dp.events.add(e);
				updateCalendar();
				console.log("Created.");
			});
		}

		function updateEvent(e, customer, product, comment, time){
			e.data.customer = customer;
			e.data.product = product;
			e.data.comment = comment;
			e.data.text = getCustomer(customer).name + ", " + getProduct(product).name + ", " + comment;
			e.data.end = e.data.start.addMinutes(parseInt(time));
			updateCalendar();

			$.post("backend.php", {
				what: "updateEvent",
				id: e.data.id,
				name: comment,
				customer: customer,
				product: product,
				start: e.start().toString(),
				end: e.end().toString()
			}, 
			function() {
				console.log("Updated.");
			});
		}

		function reschedule(args, event){
			var duration = (event.data.end.getTotalTicks() - event.data.start.getTotalTicks()) / 60000;
			var end = args.start.addMinutes(parseInt(duration));

			if(event.data.invoicedate == null){
				changeTime(event, args.start, end);

				var found = false;
				for(var i = 0; i < dp.events.list.length; i++){
					if(dp.events.list[i].id == event.id())found = true;
				}
				if(!found){
					dp.events.add(event);
					updateCalendar();
				}
			}else{
				createEvent(event.data.customer, event.data.product, event.data.comment, args.start, end);
			}
			dp.clearSelection();
		}

		function createInvoice(e, products, cash, bank){
			$.post("backend.php", {
				what: "createInvoice",
				event: e.data.id,
				products: products,
				cash: cash,
				bank: bank,
				date: new DayPilot.Date().toString()
			}, 
			function(data) {
				e.data.invoicedate = new DayPilot.Date().toString();
				e.data.invoice = data.id;
				console.log("Invoice created.");
			});
		}

		function changeTime(event, newStart, newEnd){
			event.data.start = newStart;
			event.data.end = newEnd;
		
			$.post("backend.php", {
				what: "resizeEvent",
				id: event.id(),
				newStart: newStart.toString(),
				newEnd: newEnd.toString()
			}, 
			function() {
				console.log("Moved.");
			});
			updateCalendar();
		}

		</script>

		<script type="text/javascript">
		var windowTheme = null;

		function setWindowTheme(theme){
			if(windowTheme == null){
				windowTheme = document.createElement("link");
				document.head.appendChild(windowTheme);
				windowTheme.type = "text/css";
				windowTheme.rel = "stylesheet";
			}

			switch(theme){
			case "desktop":
				windowTheme.href = "media/window-desktop.css";
				break;
			case "mobile":
				windowTheme.href = "media/window-mobile.css";
				break;
			default:
				console.log("Undefined window theme " + theme);
			}
		}

		$(document).ready(function() {
			$("#theme").change(function(e) {
				dp.theme = this.value;
				updateCalendar();
			});


			$("#windowTheme").change(function(e) {
				setWindowTheme(this.value);
			});

			$("#viewType").change(function(e) {
				dp.viewType = this.value;
				updateCalendar();
				loadEvents();
			});

			if(navigator.userAgent.indexOf("Android") > -1){
				//Mobile device
				setWindowTheme("mobile");
			}else{
				//Desktop device
				setWindowTheme("desktop");
			}

			updateLoop();

			document.getElementById("viewType").selectedIndex = 0;

			loadSettings();

			nav.init();
			dp.init();

			loadEvents();
		});  

		</script>
		
	</body>
</html>

