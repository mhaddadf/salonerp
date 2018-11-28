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

<!DOCTYPE html>
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
	<script src="js/iscroll.js" type="text/javascript"></script>

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
				<td rowspan="4">
					<div id="nav"></div>
				</td>
				<td rowspan="4">
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
								<div class="styled-select" onchange="loadEvents()">
									<select id="employee">
										<option value="overview" class="language_overview">Overview</option>
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
				<td><table id="weekdays"></table></td>
			</tr>
			<tr>
				<td style="white-space:nowrap">
					<div id="dp" style="display:inline-block;"></div>
					<div id="additionalDPs" style="display:inline-block;"></div>
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

			$.ajax({
				type: "POST",
				url: "backend.php",
				data: { what: "getCategories" }, 
				success: function(data) { setAllCategories(data); },
				async: false
			});

			loadEvents();
			updateCalendar();
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
			for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].startDate = args.day; }
			updateCalendar();
			loadEvents();
			updateCalendar();
		};

		var dp = new DayPilot.Calendar("dp");
		var additionalDPs = new Array();
		dp.viewType = "Week";

		var language = new Object();

		function loadLanguage(lang){
			console.log("Language " + lang + " loaded.");
			$.post("backend.php", {
				what: "language",
				language: lang
			}, 
			function(data) {
				language = data;
				for(word in language){
					var elements = document.getElementsByClassName("language_" + word);
					for(var i = 0; i < elements.length; i++){
						elements[i].innerHTML = language[word];
					}
				}
				nav.locale = language.calendarLocale;
				dp.locale = language.calendarLocale;
				for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].locale = language.calendarLocale; }
				nav.update();
				updateCalendar();
			});
		}

		function clearSelection(){
			dp.clearSelection();
			for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].clearSelection(); }
		}

		function removeEvent(event){
			for(var i = 0; i < additionalDPs.length+1; i++){
				var currentDP = (i == 0) ? dp : additionalDPs[i-1];
				var found = false;
				for(var j = 0; j < currentDP.events.list.length; j++){
					if(currentDP.events.list[j].id == event.id()){
						currentDP.events.remove(event);
						found = true;
						break;
					}
				}
				if(found)break;
			}
			updateCalendar();
		}

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
			changeTime(args.e, args.newStart, args.newEnd, this.employee);
		};

		dp.onEventResized = function (args) {
			changeTime(args.e, args.newStart, args.newEnd, this.employee);
		};

		// event creating
		dp.onTimeRangeSelected = function (args) {
			var currentDP = this;

			if(areWindowsActive()){
				closeAllWindows();
				return;
			}

			if(isEventToReschedule()){
				reschedule(args, getEventToReschedule(), currentDP);
				clearEventToReschedule();
				return;
			}

			showEvent(null, 30, function(customer, product, comment, time){
				var end = args.start.addMinutes(parseInt(time));
				createEvent(customer, product, comment, args.start, end, currentDP);
				clearSelection();
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
					color: product.color,
					category: product.category
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

		attachEvent("beforeNewEmployee", function(employee){
			$.ajax({
				type: "POST",
				url: "backend.php",
				data: {
					what: "createEmployee",
					name: employee.name
				}, 
				success: function(data) {
					employee.id = data.id;
					var employees = document.getElementById("employee");
					var option = document.createElement("option");
					option.value = employee.id;
					option.appendChild(document.createTextNode(employee.name));
					employees.insertBefore(option, employees.lastElementChild);
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
			removeEvent(event);
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
				color: product.color,
				category: product.category
			}, 
			function() {
				console.log("Updated.");
			});
			updateCalendar();
		});

		attachEvent("modifyEmployee", function(employee){
			$.post("backend.php", {
				what: "updateEmployee",
				id: employee.id,
				name: employee.name
			}, 
			function() {
				var employees = document.getElementById("employee");
				for(var i = 0; i < employees.children.length; i++){
					if(employees.children[i].value == employee.id){
						employees.children[i].innerHTML = "";
						employees.children[i].appendChild(document.createTextNode(employee.name));
					}
				}
				console.log("Updated.");
			});
		});

		attachEvent("newSettings", function(settings){
			if(settings.theme != null){
				dp.theme = settings["theme"];
				for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].theme = settings["theme"]; }
			}
			if(settings.language != null){
				loadLanguage(settings["language"]);
			}
			if(settings.startTime != null){
				dp.businessBeginsHour = parseInt(settings.startTime);
				for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].businessBeginsHour = parseInt(settings.startTime); }
			}
			if(settings.endTime != null){
				dp.businessEndsHour = parseInt(settings.endTime);
				for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].businessEndsHour = parseInt(settings.endTime); }
			}
			if(settings.showMonths != null){
				nav.showMonths = parseInt(settings.showMonths);
				nav.skipMonths = parseInt(settings.showMonths);
				nav.update();
			}
			if(settings.timeFormat != null){
				dp.timeFormat = settings.timeFormat;
				for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].timeFormat = settings.timeFormat; }
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
			for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].update(); }

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

			var elements = document.querySelectorAll(".calendar_default_event, .calendar_traditional_event, .calendar_g_event, .calendar_green_event, .calendar_transparent_event, .calendar_white_event");
			for(var i = 0; i < elements.length; i++){
				console.log(elements[i].style.left);
				var left = "" + elements[i].style.left;
				if(left.length > 0)left = left.substr(0, left.length-1);
				left = //(dp.viewType == "Week") ?
					0;// :
					//parseInt(left) / 4;
				elements[i].style.left = left + "%";

				elements[i].style.width = (90 - left) + "%";
			}
		}

		function loadEvents() {
			var employees = document.getElementById("employee");
			if(employees.children.length == 1){
				alert(language.pleaseCreateEmployees);
				return;
			}

			console.log("Loading events.");
			var start = dp.visibleStart();
			var end = dp.visibleEnd();

			var locale = DayPilot.Locale.all[dp.locale];
			if(dp.viewType == "Week"){
				document.getElementById("dateText").innerHTML = language.weeklyOverview;
				document.getElementById("dateText").className = "language_weeklyOverview";
			}else{
				document.getElementById("dateText").className = "";
				document.getElementById("dateText").innerHTML = locale.dayNames[start.dayOfWeek()];
			}

			var additional = document.getElementById("additionalDPs");
			var weekdays = document.getElementById("weekdays");
			weekdays.innerHTML = "";
			if(employees.value == "overview"){

				//Create Calendars
				if(additionalDPs.length < employees.children.length-2){
					additionalDPs = new Array(employees.children.length-2);
					for(var i = 0; i < employees.children.length-1; i++){
						if(i > 0){
							var newDP = document.createElement("div");
							newDP.style.display = "inline-block";
							additional.appendChild(newDP);
							additionalDPs[i-1] = new DayPilot.Calendar(newDP);
							additionalDPs[i-1].locale = dp.locale;
							additionalDPs[i-1].viewType = dp.viewType;
							additionalDPs[i-1].theme = dp.theme;
							additionalDPs[i-1].businessBeginsHour = dp.businessBeginsHour;
							additionalDPs[i-1].businessEndsHour = dp.businessEndsHour;
							additionalDPs[i-1].onEventMove = dp.onEventMove;
							additionalDPs[i-1].onEventResize = dp.onEventResize;
							additionalDPs[i-1].onEventMoved = dp.onEventMoved;
							additionalDPs[i-1].onEventResized = dp.onEventResized;
							additionalDPs[i-1].onTimeRangeSelected = dp.onTimeRangeSelected;
							additionalDPs[i-1].onEventClicked = dp.onEventClicked;
							additionalDPs[i-1].init();
						}
					}
				}

				weekdays.style.width = "";
				var employeeName = weekdays.insertRow();

				var width = (dp.viewType == "Week") ? "500px" : "300px";

				//Insert events
				for(var i = 0; i < employees.children.length-1; i++){
					var currentDP = (i == 0) ? dp : additionalDPs[i-1];
					var currentEmployee = employees.children[i].value;
					var currentDPElement = (i == 0) ? document.getElementById("dp") : additional.children[i-1];
					var nameCell = employeeName.insertCell(i);
					currentDPElement.style.width = width;
					nameCell.style.width = width;
					nameCell.appendChild(document.createTextNode(employees.children[i].innerHTML));
					currentDP.employee = currentEmployee;
					$.ajax({
						type: "POST",
						url: "backend.php",
						data: {
							what: "getEvents",
							start: start.toString(),
							end: end.toString(),
							employee: currentEmployee
						}, 
						success: function(data) {
							data.forEach(function(element){
								element.comment = element.text;
								element.text = getCustomer(element.customer).name + ", " + getProduct(element.product).name + ", " + element.comment;
							});
							currentDP.events.list = data;
						},
						async: false
					});
				}
				updateCalendar();
			}else{
				additionalDPs.forEach(function(calendar){
					calendar.dispose();
				});
				additionalDPs = new Array();
				additional.innerHTML = "";
				document.getElementById("dp").style.width = "100%";
				dp.employee = document.getElementById("employee").value;

				if(dp.viewType == "Week"){
					var tr = weekdays.insertRow();
					for(var i = 0; i < 7; i++){
						var index = locale.weekStarts + i;
						if(index >= 7)index -= 7;
						tr.insertCell(i).appendChild(document.createTextNode(locale.dayNames[index]));
					}
					weekdays.style.width = document.getElementById("dp").style.width;
				}

				$.post("backend.php", {
					what: "getEvents",
					start: start.toString(),
					end: end.toString(),
					employee: dp.employee
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
		}

		function createEvent(customer, product, comment, start, end, currentDP){
			$.post("backend.php", {
				what: "createEvent",
				start: start.toString(),
				end: end.toString(),
				name: comment,
				customer: customer,
				product: product,
				employee: currentDP.employee
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
				currentDP.events.add(e);
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

		function reschedule(args, event, currentDP){
			var duration = (event.data.end.getTotalTicks() - event.data.start.getTotalTicks()) / 60000;
			var end = args.start.addMinutes(parseInt(duration));

			if(event.data.invoicedate == null){
				for(var j = 0; j < additionalDPs.length+1; j++){
					var cdp = j == 0 ? dp : additionalDPs[j-1];
					var found = false;
					for(var i = 0; i < cdp.events.list.length; i++){
						if(cdp.events.list[i].id == event.id())
						{
							cdp.events.remove(event);
							found = true;
						}
					}
					if(found)break;
				}
				changeTime(event, args.start, end, currentDP.employee);
				currentDP.events.add(event);
				updateCalendar();
			}else{
				createEvent(event.data.customer, event.data.product, event.data.comment, args.start, end, currentDP);
			}
			clearSelection();
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

		function changeTime(event, newStart, newEnd, employee){
			event.data.start = newStart;
			event.data.end = newEnd;
		
			$.post("backend.php", {
				what: "resizeEvent",
				id: event.id(),
				newStart: newStart.toString(),
				newEnd: newEnd.toString(),
				employee: employee
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
			$("#windowTheme").change(function(e) {
				setWindowTheme(this.value);
			});

			$("#viewType").change(function(e) {
				dp.viewType = this.value;
				for(var i = 0; i < additionalDPs.length; i++) { additionalDPs[i].viewType = this.value; }
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

			document.getElementById("viewType").selectedIndex = 0;

			loadSettings();

			nav.init();
			dp.init();

			$.ajax({
				type: "POST",
				url: "backend.php",
				data: {
					what: "getEmployees"
				}, 
				success: function(data) {
					var employees = document.getElementById("employee");
					data.forEach(function(element){
						var option = document.createElement("option");
						option.value = element.id;
						option.appendChild(document.createTextNode(element.name));
						employees.insertBefore(option, employees.lastElementChild);
					});
					employees.selectedIndex = 0;
				},
				async: false
			});

			//DayPilot needs a delay to init
			setTimeout("updateLoop()", 1000);
		});  

		</script>
		
	</body>
</html>
