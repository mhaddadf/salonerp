//Script for creating input windows

var currentWindows = new Array();
var newCustomerEvents = Array();
var newProductEvents = Array();
var newEmployeeEvents = Array();
var deleteEvents = Array();
var modifyCustomerEvents = Array();
var modifyProductEvents = Array();
var modifyEmployeeEvents = Array();
var newSettingsEvents = Array();
var beforeNewCustomerEvents = Array();
var beforeNewProductEvents = Array();
var beforeNewEmployeeEvents = Array();
var beforeDeleteEvents = Array();
var beforeModifyCustomerEvents = Array();
var beforeModifyProductEvents = Array();
var beforeModifyEmployeeEvents = Array();
var allCustomers = new Array();
var allProducts = new Array();
var allCategories = new Array();
var eventToReschedule = null;
var settings = new Array();

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.indexOf(str) === 0;
	};
}

function formatDateTime(date){
	return (1900+date.getYear()) +  "-" +
			(((date.getMonth()+1) < 10) ? "0" : "") + (date.getMonth()+1) + "-" +
			((date.getDate() < 10) ? "0" : "") + date.getDate() + "T" +
			((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" +
			((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" +
			((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
}

function getHumanReadableDate(date){
	var d = date.toString().replace(" ", "T");
	var date = new Date(d);
	return ((date.getDate() < 10) ? "0" : "") + date.getDate() + "." +
			(((date.getMonth()+1) < 10) ? "0" : "") + (date.getMonth()+1) + "." +
			(1900 + date.getYear());
}

function loadSettings(){
	$.post("backend.php", {
		what: "settings"
	},
	function(data) {
		settings = data;

		newSettingsEvents.forEach(function(handler){
			handler(settings);
		});
	});
}

function isEventToReschedule(){
	return (eventToReschedule != null);
}

function getEventToReschedule(){
	return eventToReschedule;
}

function clearEventToReschedule(){
	eventToReschedule = null;
}

function areWindowsActive(){
	return (currentWindows.length > 0);
}

function closeAllWindows(){
	for(var i = 0; i < currentWindows.length; i++){
		currentWindows[i].close();
	}
}

function attachEvent(type, eventHandler){
    switch(type){
    case "newProduct":
        newProductEvents.push(eventHandler);
        break;
    case "newCustomer":
        newCustomerEvents.push(eventHandler);
        break;
    case "newEmployee":
        newEmployeeEvents.push(eventHandler);
        break;
    case "delete":
        deleteEvents.push(eventHandler);
        break;
    case "modifyCustomer":
        modifyCustomerEvents.push(eventHandler);
        break;
    case "modifyProduct":
        modifyProductEvents.push(eventHandler);
        break;
    case "modifyEmployee":
        modifyEmployeeEvents.push(eventHandler);
        break;
    case "newSettings":
        newSettingsEvents.push(eventHandler);
        break;
    case "beforeNewProduct":
        beforeNewProductEvents.push(eventHandler);
        break;
    case "beforeNewCustomer":
        beforeNewCustomerEvents.push(eventHandler);
        break;
    case "beforeNewEmployee":
        beforeNewEmployeeEvents.push(eventHandler);
        break;
    case "beforeDelete":
        beforeDeleteEvents.push(eventHandler);
        break;
    case "beforeModifyCustomer":
        beforeModifyCustomerEvents.push(eventHandler);
        break;
    case "beforeModifyProduct":
        beforeModifyProductEvents.push(eventHandler);
        break;
    case "beforeModifyEmployee":
        beforeModifyProductEvents.push(eventHandler);
        break;
    default:
        console.log("Invalid event " + type);
    }
}

function detachEvent(type, eventHandler){
    switch(type){
    case "newProduct":
        newProductEvents = newProductEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "newCustomer":
        newCustomerEvents = newCustomerEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "newEmployee":
        newEmployeeEvents = newEmployeeEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "delete":
        deleteEvents = deleteEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "modifyCustomer":
        modifyCustomerEvents = modifyCustomerEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "modifyProduct":
        modifyProductEvents = modifyProductEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "modifyEmployee":
        modifyEmployeeEvents = modifyEmployeeEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "newSettings":
        newSettingsEvents = newSettingsEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "beforeNewProduct":
        beforeNewProductEvents = beforeNewProductEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "beforeNewCustomer":
        beforeNewCustomerEvents = beforeNewCustomerEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "beforeNewEmployee":
        beforeNewEmployeeEvents = beforeNewEmployeeEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "beforeDelete":
        beforeDeleteEvents = beforeDeleteEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "beforeModifyCustomer":
        beforeModifyCustomerEvents = beforeModifyCustomerEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "beforeModifyProduct":
        beforeModifyProductEvents = beforeModifyProductEvents.filter(function(element) { return element != eventHandler; });
        break;
    case "beforeModifyEmployee":
        beforeModifyProductEvents = beforeModifyProductEvents.filter(function(element) { return element != eventHandler; });
        break;
    default:
        console.log("Invalid event " + type);
    }
}

function setAllCustomers(customers){
	allCustomers = customers;
}

function setAllProducts(products){
	allProducts = products;
}

function setAllCategories(categories){
	allCategories = categories;
}

function getAllCustomers(){
	return allCustomers;
}

function getAllProducts(){
	return allProducts;
}

function getAllCategories(){
	return allCategories;
}

function getCustomer(id){
	var customer = {id:id, name:""};
	getAllCustomers().forEach(function(element){
		if(element.id == id)customer = element;
	});
	return customer;
}

function getProduct(id){
	var product = {id:id, name:""};
	getAllProducts().forEach(function(element){
		if(element.id == id)product = element;
	});
	return product;
}

window.addEventListener('resize', function(){
	currentWindows.forEach(function(window){
		window.adjustSize();
	});
}, true);

function Window(title){
	this.window = document.createElement('div');
	this.frame = document.createElement('div');
	this.title = document.createElement("h2");
	this.okButton = document.createElement('div');
	this.cancelButton = document.createElement('div');
	this.scrollHelper = document.createElement('div');
	this.scroll = null;
	this.okCallback = null;
	this.cancelCallback = null;
	this.closeCallback = null;

	this.window.className = "inputWindow";
	this.frame.className = "frame";

	this.setTitle(title);
	this.title.className = "title";
	this.window.appendChild(this.title);

	this.window.appendChild(this.scrollHelper);
	this.scrollHelper.className = "scroll";
	this.scrollHelper.appendChild(this.frame);

	var buttons = document.createElement('div');
	this.window.appendChild(buttons);
	buttons.className = "windowButtons";
	this.okButton.className = "styled-button";
	this.cancelButton.className = "styled-button";
	this.okButton.innerHTML = language.ok;
	this.cancelButton.innerHTML = language.cancel;
	buttons.appendChild(this.cancelButton);
	buttons.appendChild(this.okButton);

	var helper = this;
	this.cancelButton.onclick = function() {
		if(helper.cancelCallback == null || helper.cancelCallback() == true)helper.close();
	};
	this.okButton.onclick = function() {
		if(helper.okCallback == null || helper.okCallback() == true)helper.close();
	}
}

Window.prototype.close = function(){
	if(this.closeCallback != null){
		if(!this.closeCallback())return;
	}

	for(var i = 0; i < currentWindows.length; i++){
		if(currentWindows[i] == this){
			currentWindows.splice(i, 1);
			break;
		}
	}
	this.window.parentNode.removeChild(this.window);
	if(this.scroll != null)this.scroll.destroy();
}

Window.prototype.setTitle = function(title){
	this.title.innerHTML = "";
	this.title.appendChild(document.createTextNode(title));
}

Window.prototype.show = function(){
	document.body.appendChild(this.window);
	currentWindows.push(this);
	this.adjustSize();
}

Window.prototype.adjustSize = function(){
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	if(this.window.offsetHeight > h){
		if(this.scroll == null){
			this.window.style.height = "90%";
			this.scroll = new IScroll(this.scrollHelper, {
				mouseWheel: true,
				scrollbars: true
			});
		}
	}else if(this.scroll != null){
		this.window.style.height = null;
		this.scroll.destroy();
		this.scroll = null;

		//Check again if window fits now...
		this.adjustSize();
	}
}

Window.prototype.addCustomContent = function(content){
	this.frame.appendChild(content);
}

Window.prototype.setOKCallback = function(callback){
	this.okCallback = callback;
}

Window.prototype.setCancelCallback = function(callback){
	this.cancelCallback = callback;
}

Window.prototype.setCloseCallback = function(callback){
	this.closeCallback = callback;
}

Window.prototype.setOKButtonVisible = function(visible){
	this.okButton.style.display = (visible == true) ? "" : "none";
}

Window.prototype.setCancelButtonVisible = function(visible){
	this.cancelButton.style.display = (visible == true) ? "" : "none";
}

Window.prototype.addNameValueContent = function(table, objects){
	var finalTable = new Array();
	for(var i = 0; i < table.length; i++){
		finalTable.push([
			{ type: "label", text: table[i].name },
			table[i].value
		]);
	}
	return this.addTableContent(finalTable, objects);
}

Window.prototype.addTableContent = function(table, objects){
	var tableElement = this.createElement({
		type: "table",
		cells: table
	}, objects);
	this.addCustomContent(tableElement.htmlElement);
	return tableElement;
}

Window.prototype.createElement = function(object, objects){
	var element = new Object({
		definition: object,
		hide: function(){ this.htmlElement.style.display = "none"; },
		show: function(){ this.htmlElement.style.display = ""; }
	});
	switch(object.type){
	case "label":
		element.htmlElement = document.createElement("span");
		element.htmlElement.appendChild(document.createTextNode(object.text));
		if(object.settings != null && object.settings.fontWeight != null){
			element.htmlElement.style.fontWeight = object.settings.fontWeight;
		}
		element.setText = function(text) { element.htmlElement.innerHTML = ""; element.htmlElement.appendChild(document.createTextNode(text)); };
		break;
	case "newline":
		element.htmlElement = document.createElement("br");
		break;
	case "text":
		element.htmlElement = document.createElement("input");
		element.htmlElement.type = "text";
		element.getValue = function() { return element.htmlElement.value; };
		element.setValue = function(value) { element.htmlElement.value = value; };
		element.onChange = function(callback) { element.htmlElement.onchange = function(){ callback(element.getValue()); }; };
		break;
	case "color":
		element.htmlElement = document.createElement("input");
		element.htmlElement.type = "text";
		element.myColor = new jscolor.color(element.htmlElement);
		element.getValue = function() { return element.htmlElement.value; };
		element.setValue = function(value) { element.myColor.fromString(value); };
		element.onChange = function(callback) { element.htmlElement.onchange = function(){ callback(element.getValue()); }; };
		break;
	case "select":
		element.htmlElement = document.createElement("div");
		element.htmlElement.className = "styled-select";
		element.innerSelect = document.createElement("select");
		element.htmlElement.appendChild(element.innerSelect);
		object.options.forEach(function(option){
			var optionElement = document.createElement("option");
			optionElement.value = option.value;
			optionElement.appendChild(document.createTextNode(option.text));
			element.innerSelect.appendChild(optionElement);
		});
		element.getValue = function() { return element.innerSelect.value; };
		element.setValue = function(value) { element.innerSelect.value = value; };
		element.addOption = function(option) {
			var optionElement = document.createElement("option");
			optionElement.value = option.value;
			optionElement.appendChild(document.createTextNode(option.text));
			element.innerSelect.appendChild(optionElement);
		};
		element.onChange = function(callback) { element.innerSelect.onchange = function(){ callback(element.getValue()); }; };
		break;
	case "searchselect":
		element.htmlElement = document.createElement("div");
		element.dhtml = new dhtmlXCombo(element.htmlElement, "searchselect" + object.id);
		element.dhtml.enableFilteringMode("between");
		object.options.forEach(function(entry){
		    element.dhtml.addOption(entry.value, entry.text);
		});
		var allowFreeText = (object.settings != null && object.settings.allowFreeText == true);
		if(allowFreeText)element.dhtml.allowFreeText(true);
		element.getValue = function() { return (allowFreeText == true) ? element.dhtml.getComboText() : element.dhtml.getSelectedValue(); };
		element.setValue = function(value) { element.dhtml.setComboValue(value); };
		element.addOption = function(entry) { element.dhtml.addOption(entry.value, entry.text); };
		element.onChange = function(callback) { element.dhtml.attachEvent("onChange", function(){ callback(element.getValue()); }); };
		break;
	case "checkbox":
		element.htmlElement = document.createElement("span");
		element.innerCheckbox = document.createElement("input");
		element.htmlElement.appendChild(element.innerCheckbox);
		element.textElement = document.createElement("span");
		element.htmlElement.appendChild(element.textElement);
		element.innerCheckbox.type = "checkbox";
		element.getValue = function() { return (element.innerCheckbox.checked == true) ? "true" : false; };
		element.setValue = function(value) { element.innerCheckbox.checked = (value != null && (value.toLowerCase() != "false" || value == true)); };
		element.onChange = function(callback) { element.htmlElement.onchange = function(){ callback(element.getValue()); }; };
		element.setText = function(text) { element.textElement.innerHTML = ""; element.textElement.appendChild(document.createTextNode(text)); };
		if(object.text != null)element.setText(object.text);
		break;
	case "link":
		element.htmlElement = document.createElement("a");
		element.htmlElement.onclick = object.target;
		element.htmlElement.appendChild(document.createTextNode(object.text));
		element.setText = function(text) { element.htmlElement.innerHTML = ""; element.htmlElement.appendChild(document.createTextNode(text)); };
		break;
	case "textarea":
		element.htmlElement = document.createElement("textarea");
		element.getValue = function() { return element.htmlElement.value; };
		element.setValue = function(value) { element.htmlElement.value = value; };
		element.onChange = function(callback) { element.htmlElement.onchange = function(){ callback(element.getValue()); }; };
		break;
	case "button":
		element.htmlElement = document.createElement("div");
		element.htmlElement.className = "styled-button";
		element.htmlElement.appendChild(document.createTextNode(object.text));
		element.htmlElement.onclick = object.target;
		element.setText = function(text) { element.htmlElement.innerHTML = ""; element.htmlElement.appendChild(document.createTextNode(text)); };
		break;
	case "container":
		var helper = this;
		element.htmlElement = document.createElement("div");
		element.addObject = function(innerObject){
			var innerElement = helper.createElement(innerObject);
			element.htmlElement.appendChild(innerElement.htmlElement);

			if(innerObject.id != null){
				objects[innerObject.id] = innerElement;
			}
		}
		element.clear = function(){
			element.htmlElement.innerHTML = "";
		}
		for(var i = 0; i < object.objects.length; i++){
			var innerObject = object.objects[i];
			element.addObject(innerObject);
		}
		break;
	case "table":
		var helper = this;
		element.htmlElement = document.createElement("table");
		element.addRow = function(row, position){
			var rowElement = element.htmlElement.insertRow(position);
			var cellCounter = 0;
			row.forEach(function(cell){
				var cellElement;
				if(cell.settings != null && cell.settings.header == true){
					cellElement = document.createElement("th");
					rowElement.appendChild(cellElement);
				}else{
					cellElement = rowElement.insertCell(cellCounter++);
				}
				if(cell.settings != null){
					if(cell.settings["colspan"] != null)cellElement.colSpan = cell.settings["colspan"];
				}
				var element = helper.createElement(cell, objects);
				cellElement.appendChild(element.htmlElement);

				if(cell.id != null){
					objects[cell.id] = element;
				}
			});
		}
		element.rowsCount = function(){ return element.htmlElement.rows.length; };
		object.cells.forEach(element.addRow);
		break;
	case "list":
		var helper = this;
		element.htmlElement = document.createElement("ul");
		element.addObject = function(innerObject){
			var innerElement = helper.createElement(innerObject);
			var li = document.createElement("li");
			li.appendChild(innerElement.htmlElement);
			element.htmlElement.appendChild(li);

			if(innerObject.id != null){
				objects[innerObject.id] = innerElement;
			}
		}
		element.clear = function(){
			element.htmlElement.innerHTML = "";
		}
		for(var i = 0; i < object.objects.length; i++){
			var innerObject = object.objects[i];
			element.addObject(innerObject);
		}
		break;
	default:
		element.htmlElement = document.createTextNode("Invalid object type " + object.type);
		break;
	}
	if(object.value != null){
		if(element.setValue == null)console.log("No function setValue for element " + JSON.stringify(element));
		element.setValue(object.value);
	}
	if(object.className != null)element.htmlElement.className = object.className;
	if(object.id != null)element.htmlElement.id = object.id;
	return element;
}

function editCustomer(currentCustomer) {
    showCreateCustomer(currentCustomer, function(firstname, lastname, comment, address, telephone){
        var modify = true;
        beforeModifyCustomerEvents.forEach(function(element){
            if(!element(currentCustomer, firstname, lastname, comment, address, telephone))modify = false;
        });
        if(!modify)return;
        currentCustomer.firstname = firstname;
        currentCustomer.lastname = lastname;
        currentCustomer.comment = comment;
        currentCustomer.address = address;
        currentCustomer.telephone = telephone;
		currentCustomer.name = currentCustomer.firstname + " " + currentCustomer.lastname;
        modifyCustomerEvents.forEach(function(element){
            element(currentCustomer);
        });
    });
}

function editProduct(currentProduct) {
    showCreateProduct(currentProduct, function(name, duration, price, color, category){
        var modify = true;
        beforeModifyProductEvents.forEach(function(element){
            if(!element(currentProduct, name, duration, price, color, category))modify = false;
        });
        if(!modify)return;
        currentProduct.name = name;
        currentProduct.duration = duration;
        currentProduct.price = price;
        currentProduct.color = color;
        currentProduct.category = category;
        modifyProductEvents.forEach(function(element){
            element(currentProduct);
        });
    });
}

function addCustomer(){
    showCreateCustomer(null, function(firstname, lastname, comment, address, telephone){
        var newCustomer = { name:firstname+" "+lastname, firstname:firstname, lastname:lastname, comment:comment, address:address, telephone:telephone };
        beforeNewCustomerEvents.forEach(function(event){
            event(newCustomer);
        });
        allCustomers.push(newCustomer);
        newCustomerEvents.forEach(function(event){
            event(newCustomer);
        });
    });
}

function addProduct(){
    showCreateProduct(null, function(name, duration, price, color, category){
        var newProduct = { name:name, duration:duration, price:price, color:color, category:category };
        beforeNewProductEvents.forEach(function(event){
            event(newProduct);
        });
        allProducts.push(newProduct);
        newProductEvents.forEach(function(event){
            event(newProduct);
        });
    });
}

function addEmployee(){
    showCreateEmployee(null, function(name){
        var newEmployee = { name:name };
        beforeNewEmployeeEvents.forEach(function(event){
            event(newEmployee);
        });
        newEmployeeEvents.forEach(function(event){
            event(newEmployee);
        });
    });
}

function editEmployee(employee){
	showCreateEmployee(employee, function(name){
	    var modify = true;
	    beforeModifyEmployeeEvents.forEach(function(element){
	        if(!element(employee, name))modify = false;
	    });
	    if(!modify)return;
	    employee.name = name;
	    modifyEmployeeEvents.forEach(function(element){
	        element(employee);
	    });
	});
}

function cancelEvent(event) {
	if(confirm(language.sureToCancelEvent)){
		var del = true;
        beforeDeleteEvents.forEach(function(handler){
            if(!handler(event))del = false;
        });
        if(!del)return false;
        deleteEvents.forEach(function(handler){
            handler(event);
        });
        return true;
    }
}

function openInvoice(invoice) {
	$.post("invoice.php", {
		save: "",
		invoice: invoice
	}, function(){
		window.open("invoice.php");
		console.log("Opening invoice");
	});
}

function showEvent(event, time, okClicked, onPaid){
    var objects = new Object();

	var newTime = function() {
		eventToReschedule = event;
		window.close();
		alert(language.chooseNewTime);
	};

	var copyEvent = function() {
		eventToReschedule = event;
		window.close();
		alert(language.chooseTime);
	};

	var customers = new Array();
	getAllCustomers().forEach(function(customer){
		customers.push({ value: customer.id, text: customer.name });
	});

	var products = new Array();
	getAllProducts().forEach(function(product){
		products.push({ value: product.id, text: product.name });
	});

	var times = new Array();
	for(var i = 15; i < 135; i += 15){
		times.push({ value: i, text: i + " " + language.minutesShort });
	}

	var currentDuration = null;
	if(event != null){
		var milli = new Date(event.data.end) - new Date(event.data.start);
		currentDuration = milli / 60000;
	}

	var window = new Window(language.event);
	var allOptions = [
		[
			{ type: "link", target: function(){ editCustomer(getCustomer(objects["customer"].getValue())); }, text: language.customer },
			{ id: "customer", type: "searchselect", value: ((event != null) ? event.data.customer : null), options: customers },
			{ type: "button", target: addCustomer, text: "+" }
		], [
			{ type: "link", target: function(){ editProduct(getProduct(objects["product"].getValue())); }, text: language.treatment },
			{ id: "product", type: "searchselect", value: ((event != null) ? event.data.product : null), options: products },
			{ type: "button", target: addProduct, text: "+" }
		], [
			{ type: "label", text: language.comment },
			{ id: "comment", type: "textarea", value: ((event != null) ? event.data.comment : null) }
		], [
			{ type: "label", text: language.duration },
			{ id: "duration", type: "select", options: times, value: currentDuration }
		], [
			{ id: "notPaid", type: "container", settings: { colspan:3 }, objects: [
				{ type: "button", target: function() { showPayWindow(event, onPaid, window); }, text: language.pay },
				{ type: "button", target: function(){ if(cancelEvent(event))window.close(); }, text: language.cancelEvent },
				{ type: "button", target: newTime, text: language.newTime }
			] }
		], [
			{ id: "paid", type: "container", settings: { colspan:3 }, objects: [
				{ type: "label", text: ((event != null && event.data.invoicedate) ? getHumanReadableDate(event.data.invoicedate) : "") },
				{ type: "button", target: copyEvent, text: language.copy },
				{ type: "button", target: function(){ openInvoice(event.data.invoice); }, text: language.invoice }
			] }
		]
	];
	window.addTableContent(allOptions, objects);

	objects["product"].onChange(function(value) {
		var selectedProduct = getProduct(value);
		objects["duration"].setValue(selectedProduct.duration);
	});

	if(event == null){
		objects["notPaid"].hide();
		objects["paid"].hide();
	}else{
		if(event.data.invoicedate == null){
			objects["paid"].hide();
		}else{
			window.setOKButtonVisible(false);
			objects["notPaid"].hide();
		}
	}

	var newProductCallback = function(product){
		objects["product"].addOption({ value: product.id, text: product.name });
		objects["product"].setValue(product.id);
	};

	var newCustomerCallback = function(customer){
		objects["customer"].addOption({ value: customer.id, text: customer.name });
		objects["customer"].setValue(customer.id);
	};

	attachEvent("newProduct", newProductCallback);
	attachEvent("newCustomer", newCustomerCallback);

	window.setOKCallback(function(){
		if(event != null && event.data.invoicedate != null){
			alert(language.cantChangePaidEvent);
			return false;
		}

		var customer = objects["customer"].getValue();
		var product = objects["product"].getValue();
		if(customer == null || product == null){
			alert(language.customerProductNeeded);
			return false;
		}

		var text = objects["comment"].getValue();
		var newDuration = objects["duration"].getValue();
		okClicked(customer, product, text, newDuration);
		return true;
	});

	window.setCloseCallback(function(){
		detachEvent("newProduct", newProductCallback);
		detachEvent("newCustomer", newCustomerCallback);
		return true;
	});

	window.show();
}

function showPayWindow(event, onPaid, parentWindow){
	var objects = new Object();
	var currentProducts = new Array();

	var updateSum = function(){
		var sum = 0;
		for(var i = 0; i < currentProducts.length; i++){
			sum += parseFloat(objects["price" + i].getValue());
		}
		objects["sum"].setValue(sum);
	}

	var addProduct = function(pr){
		var index = currentProducts.length;

		objects["products"].addRow([
			{ type: "label", text: pr.name },
			{ id: "price" + index, type: "text", value: pr.price },
		], objects["products"].rowsCount()-1);

		objects["price" + index].onChange(updateSum);

		currentProducts.push({
			id: pr.id,
			quantity: 1,
			price: pr.price
		});

		updateSum();
	};

	var window = new Window(language.pay);
	var pr = getProduct(event.data.product);

	allOptions = [
		[
			{ type: "container", settings: { colspan: 3 }, objects: [
				{ type: "label", settings: { fontWeight: "bold" }, text: language.customer + ": " },
				{ type: "label", text: getCustomer(event.data.customer).name }
			] }
		], [
			{ id: "products", type: "table", className: "payWindow", settings: { colspan: 3 }, cells: [
				[
					{ type: "label", settings: { header: true }, text: language.product },
					{ type: "label", settings: { header: true }, text: language.price },
				], [
					{ type: "label", text: language.sum },
					{ id: "sum", type: "text", value: "0" },
				]
			] }
		], [
			{ type: "button", settings: { colspan: 3 }, text: language.additionalProduct, target: function() {
				showAddProductWindow(function(product) {
					addProduct(getProduct(product));
				});
			} }
		], [
			{ type: "label", text: language.cash },
			{ id: "cash", type: "text" },
			{ type: "button", text: language.allCash, target: function() { objects["cash"].setValue(sum.value); objects["bank"].setValue("0"); } }
		], [
			{ type: "label", text: language.bank },
			{ id: "bank", type: "text" },
			{ type: "button", text: language.allBank, target: function() { objects["bank"].setValue(sum.value); objects["cash"].setValue("0"); } }
		]
	]

	window.addTableContent(allOptions, objects);

	addProduct(pr);

	window.setOKCallback(function(){
		if(cash.value == "" && bank.value == ""){
			alert(language.enterCashBank);
			return false;
		}

		if(parentWindow != null)parentWindow.close();

		for(var i = 0; i < currentProducts.length; i++){
			currentProducts[i].price = objects["price" + i].getValue();
		}

		onPaid(currentProducts, cash.value, bank.value);
		return true;
	});
	window.show();
}

function showAddProductWindow(onAdd){
	var objects = new Object();

	var products = new Array();
	getAllProducts().forEach(function(entry){
		products.push({ value: entry.id, text: entry.name });
	});

	var window = new Window(language.additionalProduct);

	var allOptions = [
		[
			{ type: "label", text: language.product },
			{ id: "product", type: "searchselect", options: products },
			{ type: "button", text: "+", target: addProduct }
		]
	];

	window.addTableContent(allOptions, objects);

	var addProductCallback = function(product){
		objects["product"].addOption({ value: product.id, text: product.name });
		objects["product"].setValue(product.id);
	};

	attachEvent("newProduct", addProductCallback);

	window.setOKCallback(function(){
		var product = objects["product"].getValue();
		if(product == null){
			alert(language.chooseProduct);
			return false;
		}

		onAdd(product);
		return true;
	});

	window.setCloseCallback(function(){
		detachEvent("newProduct", addProductCallback);
		return true;
	});

	window.show();
}

function showCreateProduct(product, onCreate){
	var objects = new Object();

	var durations = new Array();
	for(var i = 15; i < 135; i += 15){
		durations.push({ value: i, text: i + " min" });
	}

	var categories = new Array();
	getAllCategories().forEach(function(entry){
		if(entry != null)categories.push({ value: entry, text: entry });
	});

	var window = new Window(language.product);

	var allOptions = [
		{ name: language.name,		value: { id: "name", type: "text", value: ((product != null) ? product.name : null) } },
		{ name: language.duration,	value: { id: "duration", type: "select", options: durations, value: ((product != null) ? product.duration : null) } },
		{ name: language.price,		value: { id: "price", type: "text", value: ((product != null) ? product.price : null) } },
		{ name: language.color,		value: { id: "color", type: "color", value: ((product != null) ? product.color : "FFFFFF") } },
		{ name: language.category,	value: { id: "category", type: "searchselect", options: categories, settings: { allowFreeText: true }, value: ((product != null) ? product.category : null) } },
	];

	window.addNameValueContent(allOptions, objects);

	window.setOKCallback(function(){
		var name = objects["name"].getValue();
		var price = objects["price"].getValue();
		if(name == "" || price == ""){
			alert(language.enterNamePrice);
			return false;
		}

		onCreate(name, objects["duration"].getValue(), price, objects["color"].getValue(), objects["category"].getValue());
		return true;
	});
	window.show();
}

function showCreateCustomer(customer, onCreate){
	var objects = new Object();

	var window = new Window(language.customer);

	var allOptions = [
		{ name: language.firstname,	value: { id: "firstname", type: "text", value: ((customer != null) ? customer.firstname : null) } },
		{ name: language.lastname,	value: { id: "lastname", type: "text", value: ((customer != null) ? customer.lastname : null) } },
		{ name: language.comment,	value: { id: "comment", type: "textarea", value: ((customer != null) ? customer.comment : null) } },
		{ name: language.address,	value: { id: "address", type: "text", value: ((customer != null) ? customer.address : null) } },
		{ name: language.telephone,	value: { id: "telephone", type: "text", value: ((customer != null) ? customer.telephone : null) } },
	];

	window.addNameValueContent(allOptions, objects);

	window.setOKCallback(function(){
		var firstname = objects["firstname"].getValue();
		var lastname = objects["lastname"].getValue();
		if(firstname == "" && lastname == ""){
			alert(language.provideOneValue);
			return false;
		}

		onCreate(firstname, lastname, objects["comment"].getValue(), objects["address"].getValue(), objects["telephone"].getValue());
		return true;
	});
	window.show();
}

function showCreateEmployee(employee, onCreate){
	var objects = new Object();

	var window = new Window(language.employees);

	var allOptions = [
		{ name: language.name, value: { id: "name", type: "text", value: ((employee != null) ? employee.name : null) } }
	];

	window.addNameValueContent(allOptions, objects);

	window.setOKCallback(function(){
		var name = objects["name"].getValue();
		if(name == ""){
			alert(language.provideOneValue);
			return false;
		}

		onCreate(name);
		return true;
	});
	window.show();
}

function showCustomers(){
	var objects = new Object();

	var window = new Window(language.customers);
	window.setCancelButtonVisible(false);

	var allOptions = [
		[ { type: "button", text: "+", target: addCustomer } ]
	];

	var list = window.addTableContent(allOptions, objects);

	var addNewCustomer = function(customer){
		list.addRow([ { id: "customer" + customer.id, type: "link", text: customer.name, target: function(){ editCustomer(customer); } } ]);
	};

	getAllCustomers().forEach(addNewCustomer);

	var createCustomerCallback = function(customer){
		addNewCustomer(customer);
	};

	var modifyCustomerCallback = function(customer){
		objects["customer" + customer.id].setText(customer.name);
	};

	attachEvent("newCustomer", createCustomerCallback);
	attachEvent("modifyCustomer", modifyCustomerCallback);

	window.setCloseCallback(function(){
		detachEvent("newCustomer", createCustomerCallback);
		detachEvent("modifyCustomer", modifyCustomerCallback);
		return true;
	});

	window.show();
}

function showProducts(){
	var objects = new Object();

	var window = new Window(language.products);
	window.setCancelButtonVisible(false);

	var allOptions = [
		[ { type: "button", settings: { colspan: 2 }, text: "+", target: addProduct } ]
	];

	var list = window.addTableContent(allOptions, objects);

	var addNewProduct = function(product){
		list.addRow([
			{ id: "product" + product.id + "color", type: "container", objects: [] },
			{ id: "product" + product.id, type: "link", text: product.name, target: function(){ editProduct(product); } }
		]);
		var color = product.color;
		if(!color.startsWith("#"))color = "#" + color;
		objects["product" + product.id + "color"].htmlElement.style.borderLeft = "10px solid " + color;
		objects["product" + product.id + "color"].htmlElement.style.paddingLeft = "5px";
		objects["product" + product.id + "color"].htmlElement.style.display = "inline";
	};

	getAllProducts().forEach(addNewProduct);

	var createProductCallback = function(product){
		addNewProduct(product);
	};

	var modifyProductCallback = function(product){
		var color = product.color;
		if(!color.startsWith("#"))color = "#" + color;
		objects["product" + product.id].setText(product.name);
		objects["product" + product.id + "color"].htmlElement.style.borderLeft = "10px solid " + color;
	};

	attachEvent("newProduct", createProductCallback);
	attachEvent("modifyProduct", modifyProductCallback);

	window.setCloseCallback(function(){
		detachEvent("newProduct", createProductCallback);
		detachEvent("modifyProduct", modifyProductCallback);
		return true;
	});

	window.show();
}

function showReports(){
	var window = new Window(language.reports);
	window.setCancelButtonVisible(false);

	var list = document.createElement("list");
	window.addCustomContent(list);

	$.post("backend.php", {
		what: "getReports"
	}, function(reports) {
		reports.forEach(function(report){
			var r = document.createElement("a");
			list.appendChild(r);
			list.appendChild(document.createElement("br"));
			r.innerHTML = language[report.title];
			r.onclick = function(){ showReport(report); };
		});
	});

	window.show();
}

function showReport(report){
	if(report.ask.length == 0){
		$.post("report.php", {
			save: "",
			title: report.title,
			font: report.font,
			fontSize: report.fontSize,
			sql: report.sql,
			sum: report.sum,
			currency: report.currency
		}, function(){
			window.open("report.php");
			console.log("Opening report");
		});
		return;
	}

	var ask = new Array();
	var window = new Window(language[report.title]);
	var table = document.createElement("table");
	window.addCustomContent(table);
	window.show();

	for(var i = 0; i < report.ask.length; i++){
		ask.push({
			name: report.ask[i][0],
			value: ""
		});

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language[report.ask[i][0]]));
		switch(report.ask[i][1])
		{
		case "date":
			var date = document.createElement("div");
			date.id = "date" + report.ask[i][0];
			tr.insertCell(1).appendChild(date);
			var nav = new DayPilot.Navigator("date" + report.ask[i][0]);
			nav.selectMode = "day";
			nav.index = i;
			nav.onTimeRangeSelected = function(args) {
				ask[this.index].value = args.day.toString();
			};
			nav.init();
			ask[i].value = nav.selectionStart.toString();
			break;
		case "customer":
			var customerElement = document.createElement("div");
			tr.insertCell(1).appendChild(customerElement);
			customers = new dhtmlXCombo(customerElement, "Customer", "200px");
			customers.enableFilteringMode("between");
			getAllCustomers().forEach(function(entry){
			    customers.addOption(entry.id, entry.name);
			});
			customers.index = i;
			customers.attachEvent("onChange", function(){
				ask[this.index].value = this.getSelectedValue();
			});
			break;
		case "product":
			var productElement = document.createElement("div");
			tr.insertCell(1).appendChild(productElement);
			products = new dhtmlXCombo(productElement, "Product", "200px");
			products.enableFilteringMode("between");
			getAllProducts().forEach(function(entry){
			    products.addOption(entry.id, entry.name);
			});
			products.index = i;
			products.attachEvent("onChange", function(){
				ask[this.index].value = this.getSelectedValue();
			});
			break;
		default:
			var text = document.createElement("input");
			tr.insertCell(1).appendChild(text);
			text.type = "text";
			text.index = i;
			text.onchange = function(){
				ask[this.index].value = this.value;
			};
			break;
		}
	}

	window.setOKCallback(function(){
		$.post("report.php", {
			save: "",
			title: report.title,
			font: report.font,
			fontSize: report.fontSize,
			sql: report.sql,
			ask: ask,
			sum: report.sum,
			currency: report.currency
		}, function(){
			window.open("report.php");
			console.log("Opening report");
		});
		return true;
	});
}

function showSettings(){
	var objects = new Object();

	var hours = new Array();
	for(var time = 0; time <= 24; time++){
		hours.push({ value: time, text: time + " " +language.oClock });
	}

	var calendars = new Array();
	for(var i = 1; i <= 5; i++){
		calendars.push({ value: i, text: i });
	}

	var window = new Window(language.settings);
	var table = document.createElement("table");
	var allSettings = [
		{ name: language.theme,			value: { id: "theme",		type: "select", value: settings.theme, options: [
			{ value: "calendar_default",	text: "Default" },
			{ value: "calendar_g",			text: "Google-like" },
			{ value: "calendar_green",		text: "Green" },
			{ value: "calendar_traditional",text: "Traditional" },
			{ value: "calendar_transparent",text: "Transparent" },
			{ value: "calendar_white",		text: "White" }
		] } },
		{ name: language.companyName,	value: { id: "company",		type: "text", value: settings.company } },
		{ name: language.taxId,			value: { id: "taxId", 		type: "text", value: settings.taxId } },
		{ name: language.address1,		value: { id: "address1",	type: "text", value: settings.address1 } },
		{ name: language.address2,		value: { id: "address2",	type: "text", value: settings.address2 } },
		{ name: language.telephone,		value: { id: "telephone",	type: "text", value: settings.telephone } },
		{ name: language.homepage,		value: { id: "homepage",	type: "text", value: settings.homepage } },
		{ name: language.taxName,		value: { id: "taxName",		type: "text", value: settings.taxName } },
		{ name: language.taxValue,		value: { id: "taxValue",	type: "text", value: settings.taxValue } },
		{ name: language.startTime,		value: { id: "startTime",	type: "select", value: settings.startTime, options: hours } },
		{ name: language.endTime,		value: { id: "endTime",		type: "select", value: settings.endTime, options: hours } },

		{ name: language.showMonths,	value: { id: "showMonths",	type: "select", value: settings.showMonths, options: calendars } },
		{ name: language.timeFormat,	value: { id: "timeFormat",	type: "select", value: settings.timeFormat, options: [
			{ value: "Clock12Hours", text: language.clock12Hours },
			{ value: "Clock24Hours", text: language.clock24Hours }
		] } },
		{ name: language.currency,		value: { id: "currency",	type: "text", value: settings.currency } },
		{ name: language.employees,		value: { type: "link", text: language.manage, target: showEmployees } }
	];

	window.addNameValueContent(allSettings, objects);

	window.setOKCallback(function(){
		settings = new Object();
		for(var a in objects){
			if(objects[a].getValue == null)console.log("Object has no getValue function" + JSON.stringify(objects[a]));
			settings[a] = objects[a].getValue();
		}

		$.post("backend.php", {
			what: "saveSettings",
			data: settings
		}, function() {
			console.log("Settings saved");
		});
		newSettingsEvents.forEach(function(handler){
			handler(settings);
		});
		return true;
	});
	window.show();
}

function showEmployees(){
	var objects = new Object();

	var window = new Window(language.employees);
	window.setCancelButtonVisible(false);

	var allOptions = [
		[ { type: "button", text: "+", target: addEmployee } ]
	];

	var list = window.addTableContent(allOptions, objects);

	var addNewEmployee = function(employee){
		list.addRow([ { id: "employee" + employee.id, type: "link", target: function(){ editEmployee(employee); }, text: employee.name } ]);
	}

	var addEmployeeCallback = function(employee){
		addNewEmployee(employee);
	};

	var modifyEmployeeCallback = function(employee){
		objects["employee" + employee.id].setText(employee.name);
	};

	attachEvent("newEmployee", addEmployeeCallback);
	attachEvent("modifyEmployee", modifyEmployeeCallback);

	$.ajax({
		type: "POST",
		url: "backend.php",
		data: {
			what: "getEmployees"
		},
		success: function(data) {
			var employees = document.getElementById("employee");
			data.forEach(function(employee){
				addNewEmployee(employee);
			});
			employees.selectedIndex = 0;
		},
		async: false
	});

	window.setCloseCallback(function(){
		detachEvent("newEmployee", addEmployeeCallback);
		detachEvent("modifyEmployee", modifyEmployeeCallback);
		return true;
	})

	window.show();
}

function showPayWindowTotal(total, callback){
	var objects = new Object();

	var updateCashText = function(tendered){
		objects["paymentMethodText"].setText(language.tendered + ": " + tendered);
		if(tendered > total){
			objects["cashReturn"].htmlElement.style.display = "";
			objects["cashReturn"].setText(language.cashReturn + ": " + (parseFloat(tendered)-parseFloat(total)));
		}else{
			objects["cashReturn"].htmlElement.style.display = "none";
		}
	}

	var cashSelected = function(){
		paymentType = "cash";
		objects["cash"].htmlElement.style.background = "#dddddd";
		objects["bank"].htmlElement.style.background = "";
		objects["payTotal"].clear();
		var tendered = 0;
		var counter = 0;
		[500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01].forEach(function(number){
			objects["payTotal"].addObject({ type: "link", className: "money", text: number, target: function(){
				tendered = parseFloat(tendered) + parseFloat(number);
				updateCashText(tendered);
			} });

			if(counter++ == 4){
				objects["payTotal"].addObject({ type: "newline" });
				counter = 0;
			}
		});
		updateCashText(tendered);
	}
	var bankSelected = function(){
		paymentType = "bank";
		objects["cash"].htmlElement.style.background = "";
		objects["bank"].htmlElement.style.background = "#dddddd";
		objects["payTotal"].clear();
		objects["paymentMethodText"].setText(language.makeBankPayment);
		objects["cashReturn"].htmlElement.style.display = "none";
	}

	var window = new Window(language.pay);

	var allOptions = [
		[ { id: "total", type: "label", text: language.totalPrice + ": " + total, settings: { colspan: 2 } } ],
		[ { id: "paymentMethodText", type: "label", text: language.tendered, settings: { colspan: 2 } } ],
		[ { id: "cashReturn", type: "label", text: language.cashReturn, settings: { colspan: 2 } } ],
		[
			{ type: "list", objects: [
				{ id: "cash", type: "link", text: language.cash, target: cashSelected },
				{ id: "bank", type: "link", text: language.bank, target: bankSelected }
			] },
			{ id: "payTotal", type: "container", objects: [] }
		],
		[ { id: "printInvoice", type: "checkbox", text: language.printInvoice, value: "true", settings: { colspan: 2 } } ]
	];

	window.addTableContent(allOptions, objects);

	cashSelected();

	window.setOKCallback(function(){
		var cash = 0;
		var bank = 0;
		if(paymentType == "cash")cash = total;
		else bank = total;

		callback(cash, bank, (objects["printInvoice"].getValue()==true));
		return true;
	});

	window.show();
}
