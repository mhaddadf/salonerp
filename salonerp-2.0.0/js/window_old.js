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

function createWindow(t, createElements, okClicked){
    var window = document.createElement('div');
	var scroll;
    document.body.appendChild(window);
    window.className = "inputWindow";
    window.close = function() {
        for(var i = 0; i < currentWindows.length; i++){
            if(currentWindows[i] == window){
                currentWindows.splice(i, 1);
                break;
            }
        }
        window.parentNode.removeChild(window);
		scroll.destroy();
    };
    var frame = document.createElement('div');
	frame.className = "frame";
    window.appendChild(frame);
    frame.closeWindow = function() { window.close(); };
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode(t));
	title.className = "title";
    frame.appendChild(title);
    createElements(frame);
    var buttons = document.createElement('div');
    var okButton = document.createElement('div');
    var cancelButton = document.createElement('div');
	buttons.className = "windowButtons";
    okButton.className = "styled-button";
    cancelButton.className = "styled-button";
    okButton.innerHTML = language.ok;
    cancelButton.innerHTML = language.cancel;
    cancelButton.onclick = window.close;
    okButton.onclick = function() {
        if(okClicked(frame) == true)window.close();
    }
    window.appendChild(buttons);
    buttons.appendChild(cancelButton);
    buttons.appendChild(okButton);

    currentWindows.push(window);
	scroll = new IScroll(window);
}

function showEvent(event, time, okClicked, onPaid){
    var customers;
    var products;
    var comment;
    var duration;
    createWindow(language.event, function(parent){
        var table = document.createElement("table");
        parent.appendChild(table);

        var row = table.insertRow();
        element = document.createElement("a");
        element.appendChild(document.createTextNode(language.customer));
        element.onclick = function() {
            var currentCustomer = getCustomer(customers.getSelectedValue());
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
                modifyCustomerEvents.forEach(function(element){
                    element(currentCustomer);
                });
            });
        };
        row.insertCell(0).appendChild(element);
        var customerElement = document.createElement("div");
        var addCustomerButton = document.createElement("div");
        addCustomerButton.className = "styled-button";
        addCustomerButton.innerHTML = "+";
        row.insertCell(1).appendChild(customerElement);
        row.insertCell(2).appendChild(addCustomerButton);

        var row = table.insertRow();
        var element = document.createElement("a");
        element.appendChild(document.createTextNode(language.treatment));
        element.onclick = function() {
            var currentProduct = getProduct(products.getSelectedValue());
            showCreateProduct(currentProduct, function(name, duration, price, color){
                var modify = true;
                beforeModifyProductEvents.forEach(function(element){
                    if(!element(currentProduct, name, duration, price, color))modify = false;
                });
                if(!modify)return;
                currentProduct.name = name;
                currentProduct.duration = duration;
                currentProduct.price = price;
                currentProduct.color = color;
                modifyProductEvents.forEach(function(element){
                    element(currentProduct);
                });
            });
        };
        row.insertCell(0).appendChild(element);
        var productElement = document.createElement("div");
        var addProductButton = document.createElement("div");
        addProductButton.className = "styled-button";
        addProductButton.innerHTML = "+";
        row.insertCell(1).appendChild(productElement);
        row.insertCell(2).appendChild(addProductButton);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.comment));
        comment = document.createElement("textarea");
        if(event != null)comment.value = event.data.comment;
        row.insertCell(1).appendChild(comment);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.duration));
        duration = document.createElement("select");
        for(var i = 15; i < 135; i += 15){
            var option = document.createElement("option");
            option.value = i;
            option.appendChild(document.createTextNode(i + " " + language.minutesShort));
            if(time == i)option.selected = true;
            duration.appendChild(option);
        }
		var styledSelect = document.createElement("div");
		styledSelect.className = "styled-select";
		styledSelect.appendChild(duration);
        row.insertCell(1).appendChild(styledSelect);

        if(event != null){
            var cell = table.insertRow().insertCell(0);
            cell.colSpan = "3";
            if(event.data.invoicedate == null){
				var buttonContainer = document.createElement("table");
				buttonContainer.className = "buttonContainer";
                cell.appendChild(buttonContainer);
				var buttonRows = buttonContainer.insertRow();

                var button = document.createElement("div");
                buttonRows.insertCell(0).appendChild(button);
                button.className = "styled-button";
                button.innerHTML = language.pay;
                button.onclick = function() { showPayWindow(event, onPaid, parent); };

                button = document.createElement("div");
                buttonRows.insertCell(1).appendChild(button);
                button.className = "styled-button";
                button.innerHTML = language.cancelEvent;
                button.onclick = function() {
					if(confirm(language.sureToCancelEvent)){
						var del = true;
                        beforeDeleteEvents.forEach(function(handler){
                            if(!handler(event))del = false;
                        });
                        if(!del)return;
                        deleteEvents.forEach(function(handler){
                            handler(event);
                        });
                        parent.closeWindow();
                    }
                };

                button = document.createElement("div");
                buttonRows.insertCell(2).appendChild(button);
                button.className = "styled-button";
                button.innerHTML = language.newTime;
                button.onclick = function() {
                    eventToReschedule = event;
                    parent.closeWindow();
                    alert(language.chooseNewTime);
                };
            }else{
                var d = event.data.invoicedate.toString().replace(" ", "T");
                var date = new DayPilot.Date(d);
                var dateString = (1+date.getDay()) + "." + (1+date.getMonth()) + "." + (date.getYear());
                cell.appendChild(document.createTextNode(language.paidOn + " " + dateString));

                var button = document.createElement("div");
                cell.appendChild(button);
                button.className = "styled-button";
                button.innerHTML = language.copy;
                button.onclick = function() {
                    eventToReschedule = event;
                    parent.closeWindow();
                    alert(language.chooseTime);
                };

                button = document.createElement("div");
                cell.appendChild(button);
                button.className = "styled-button";
                button.innerHTML = language.invoice;
                button.onclick = function() {
					$.post("invoice.php", {
						save: "",
						invoice: event.data.invoice
					}, function(){
						window.open("invoice.php");
						console.log("Opening invoice");
					});
                };
            }
        }
        customers = new dhtmlXCombo(customerElement, "Customer");
        products = new dhtmlXCombo(productElement, "Product");
        customers.enableFilteringMode("between");
        products.enableFilteringMode("between");
        getAllCustomers().forEach(function(entry){
            customers.addOption(entry.id, entry.name);
        });
        getAllProducts().forEach(function(entry){
            products.addOption(entry.id, entry.name);
        });
        if(event != null)customers.setComboValue(event.data.customer);
        if(event != null)products.setComboValue(event.data.product);
        products.attachEvent("onChange", function() { duration.value = getProduct(products.getSelectedValue()).duration; });

        addProductButton.onclick = function(){
            showCreateProduct(null, function(name, duration, price, color){
                var newProduct = { name:name, duration:duration, price:price, color:color };
                beforeNewProductEvents.forEach(function(event){
                    event(newProduct);
                });
                allProducts.push(newProduct);
                products.addOption(newProduct.id, newProduct.name);
                products.setComboValue(newProduct.id);
                newProductEvents.forEach(function(event){
                    event(newProduct);
                });
            });
        }

        addCustomerButton.onclick = function(){
            showCreateCustomer(null, function(firstname, lastname, comment, address, telephone){
                var newCustomer = { name:firstname+" "+lastname, firstname:firstname, lastname:lastname, comment:comment, address:address, telephone:telephone };
                beforeNewCustomerEvents.forEach(function(event){
                    event(newCustomer);
                });
                allCustomers.push(newCustomer);
                customers.addOption(newCustomer.id, newCustomer.name);
                customers.setComboValue(newCustomer.id);
                newCustomerEvents.forEach(function(event){
                    event(newCustomer);
                });
            });
        }
    }, function(parent){
        if(event != null && event.data.invoicedate != null){
            alert(language.cantChangePaidEvent);
            return false;
        }

        var customer = customers.getSelectedValue();
        var product = products.getSelectedValue();
        if(customer == null || product == null){
            alert(language.customerProductNeeded);
            return false;
        }

        var text = comment.value;
        var newDuration = duration.value;
        okClicked(customer, product, text, newDuration);
        return true;
    });
}

function showPayWindow(event, onPaid, parentWindow){
    var currentProducts = new Array();
    var cash = document.createElement("input");
    var bank = document.createElement("input");
    cash.type = "text";
    bank.type = "text";
    cash.value = "";
    bank.value = "";

    createWindow(language.pay, function(parent){
        parent.className = "payWindow";
        var pr = getProduct(event.data.product);
        var table = document.createElement("table");
        parent.appendChild(table);
        table.innerHTML = '<tr><th>' + language.customer + '</th><td>' + getCustomer(event.data.customer).name + '</td></tr>';
        var row = table.insertRow();
        var cell = row.insertCell(0);
        cell.colSpan = "2";

        var products = document.createElement("table");
        products.className = "invoiceItems";
        cell.appendChild(products);
        products.innerHTML += '<tr><th>' + language.product + '</th><th>' + language.price + '</th></tr>';
        var sum = document.createElement("input");
        sum.type = "text";
        sum.value = 0;
        sum.enabled = false;
        row = products.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.sum));
        row.insertCell(1).appendChild(sum);

		var addProduct = function(pr){
			var row = products.insertRow(products.rows.length-1);
            currentProducts.push({
				id: pr.id,
				quantity: 1,
				price: pr.price
			});
            row.insertCell(0).appendChild(document.createTextNode(pr.name));
            row.insertCell(1).appendChild(document.createTextNode(pr.price));
            sum.value = parseFloat(sum.value) + parseFloat(pr.price);
		}
		addProduct(pr);

        row = table.insertRow();
        cell = row.insertCell(0);
        cell.colSpan = "2";
        var addProductButton = document.createElement("div");
        cell.appendChild(addProductButton);
        addProductButton.className = "styled-button";
        addProductButton.innerHTML = language.additionalProduct;
        addProductButton.onclick = function() {
            showAddProductWindow(function(product) {
                addProduct(getProduct(product))
            });
        };

        var payTable = document.createElement("table");
        parent.appendChild(payTable);
        var allCash = document.createElement("div");
        var allBank = document.createElement("div");
        allCash.className = "styled-button";
        allBank.className = "styled-button";
        allCash.innerHTML = language.allCash;
        allBank.innerHTML = language.allBank;
        allCash.onclick = function() { cash.value = sum.value; bank.value = "0"; };
        allBank.onclick = function() { bank.value = sum.value; cash.value = "0"; };
        row = payTable.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.cash));
        row.insertCell(1).appendChild(cash);
        row.insertCell(2).appendChild(allCash);
        row = payTable.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.bank));
        row.insertCell(1).appendChild(bank);
        row.insertCell(2).appendChild(allBank);
    }, function(parent){
        if(cash.value == "" && bank.value == ""){
            alert(language.enterCashBank);
            return false;
        }

        parentWindow.closeWindow();
        onPaid(currentProducts, cash.value, bank.value);
        return true;
    });
}

function showAddProductWindow(onAdd){
    var products;
    createWindow(language.additionalProduct, function(parent){
        var table = document.createElement("table");
        parent.appendChild(table);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.product));
        var productElement = document.createElement("div");
        var addProductButton = document.createElement("div");
        addProductButton.className = "styled-button";
        addProductButton.innerHTML = "+";
        row.insertCell(1).appendChild(productElement);
        row.insertCell(2).appendChild(addProductButton);

        products = new dhtmlXCombo(productElement, "Product", "400px");
        products.enableFilteringMode("between");
        getAllProducts().forEach(function(entry){
            products.addOption(entry.id, entry.name);
        });

        addProductButton.onclick = function(){
            showCreateProduct(null, function(name, duration, price){
                var newProduct = { name:name, duration:duration, price:price };
                beforeNewProductEvents.forEach(function(event){
                    event(newProduct);
                });
                allProducts.push(newProduct);
                products.addOption(newProduct.id, newProduct.name);
                products.setComboValue(newProduct.id);
                newProductEvents.forEach(function(event){
                    event(newProduct);
                });
            });
        }


    }, function(parent){
        var product = products.getSelectedValue();
        if(product == null){
            alert(language.chooseProduct);
            return false;
        }

        onAdd(product);
        return true;
    });
}

function showCreateProduct(product, onCreate){
	var category;
    var name = document.createElement("input");
    var duration = document.createElement("select");
    var price = document.createElement("input");
    var color = document.createElement("input");
    name.type = "text";
    price.type = "text";
    color.type = "text";
    name.value = "";
    price.value = "";
    color.value = "FFFFFF";
    color.className = "color";
    createWindow(language.product, function(parent){
        var table = document.createElement("table");
        parent.appendChild(table);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.name));
        if(product != null)name.value = product.name;
        row.insertCell(1).appendChild(name);

        var row = table.insertRow();
		row.insertCell(0).appendChild(document.createTextNode(language.duration));        
		for(var i = 15; i < 135; i += 15){
			var option = document.createElement("option");
			option.value = i;
			option.appendChild(document.createTextNode(i + " min"));
			if(product != null && product.duration == i)option.selected = true;
			duration.appendChild(option);
		}
		var styledSelect = document.createElement("div");
		styledSelect.className = "styled-select";
		styledSelect.appendChild(duration);
		row.insertCell(1).appendChild(styledSelect);

		var row = table.insertRow();

        row.insertCell(0).appendChild(document.createTextNode(language.price));
        if(product != null)price.value = product.price;
        row.insertCell(1).appendChild(price);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.color));
        if(product != null)color.value = product.color;
        row.insertCell(1).appendChild(color);
        var myColor = new jscolor.color(color);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.category));
        var categoryElement = document.createElement("div");
        row.insertCell(1).appendChild(categoryElement);
		category = new dhtmlXCombo(categoryElement, "Customer");
        category.enableFilteringMode("between");
		category.allowFreeText(true);
        getAllCategories().forEach(function(entry){
            category.addOption(entry, entry);
        });
        if(product != null)category.setComboValue(product.category);
    }, function(parent){
        if(name.value == "" || price.value == ""){
            alert(language.enterNamePrice);
            return false;
        }

        onCreate(name.value, duration.value, price.value, color.value, category.getComboText());
        return true;
    });
}

function showCreateCustomer(customer, onCreate){
    var firstname = document.createElement("input");
    var lastname = document.createElement("input");
    var comment = document.createElement("textarea");
    var address = document.createElement("input");
    var telephone = document.createElement("input");
    firstname.type = "text";
    lastname.type = "text";
    address.type = "text";
    telephone.type = "text";
    firstname.value = "";
    lastname.value = "";
    comment.value = "";
    address.value = "";
    telephone.value = "";
    createWindow(language.customer, function(parent){
        var table = document.createElement("table");
        parent.appendChild(table);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.firstname));
        if(customer != null)firstname.value = customer.firstname;
        row.insertCell(1).appendChild(firstname);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.lastname));
        if(customer != null)lastname.value = customer.lastname;
        row.insertCell(1).appendChild(lastname);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.comment));
        if(customer != null)comment.value = customer.comment;
        row.insertCell(1).appendChild(comment);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.address));
        if(customer != null)address.value = customer.address;
        row.insertCell(1).appendChild(address);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.telephone));
        if(customer != null)telephone.value = customer.telephone;
        row.insertCell(1).appendChild(telephone);
    }, function(parent){
        if(firstname.value == "" && lastname.value == "" && comment.value == "" && address.value == "" && telephone.value == ""){
            alert(language.provideOneValue);
            return false;
        }

        onCreate(firstname.value, lastname.value, comment.value, address.value, telephone.value);
        return true;
    });
}

function showCreateEmployee(employee, onCreate){
    var name = document.createElement("input");
    name.type = "text";
    name.value = "";
    createWindow(language.employees, function(parent){
        var table = document.createElement("table");
        parent.appendChild(table);

        var row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(language.name));
        if(employee != null)name.value = employee.name;
        row.insertCell(1).appendChild(name);
    }, function(parent){
        if(name.value == ""){
            alert(language.provideOneValue);
            return false;
        }

        onCreate(name.value);
        return true;
    });
}

function showCustomers(){
	createWindow(language.customers, function(parent){
		var addCustomerButton = document.createElement("div");
        addCustomerButton.className = "styled-button";
        addCustomerButton.innerHTML = "+";
		parent.appendChild(addCustomerButton);

		var list = document.createElement("div");
		parent.appendChild(list);

		addCustomerButton.onclick = function(){
            showCreateCustomer(null, function(firstname, lastname, comment, address, telephone){
                var newCustomer = { name:firstname+" "+lastname, firstname:firstname, lastname:lastname, comment:comment, address:address, telephone:telephone };
                beforeNewCustomerEvents.forEach(function(event){
                    event(newCustomer);
                });
                allCustomers.push(newCustomer);
				var c = document.createElement("a");
				c.innerHTML = newCustomer.name;
				list.appendChild(c);
				list.appendChild(document.createElement("br"));
                newCustomerEvents.forEach(function(event){
                    event(newCustomer);
                });
            });
        }

		getAllCustomers().forEach(function(customer){
			var c = document.createElement("a");
			c.innerHTML = customer.name;
			list.appendChild(c);
			list.appendChild(document.createElement("br"));
			c.onclick = function(){
				showCreateCustomer(customer, function(firstname, lastname, comment, address, telephone){
		            var modify = true;
		            beforeModifyCustomerEvents.forEach(function(element){
		                if(!element(customer, firstname, lastname, comment, address, telephone))modify = false;
		            });
		            if(!modify)return;
		            customer.firstname = firstname;
		            customer.lastname = lastname;
		            customer.comment = comment;
		            customer.address = address;
		            customer.telephone = telephone;
					c.innerHTML = customer.name;
		            modifyCustomerEvents.forEach(function(element){
		                element(customer);
		            });
		        });
			}
		});
	}, function(parent){
		return true;
	});
}

function showProducts(){
	createWindow(language.products, function(parent){
		var addProductButton = document.createElement("div");
        addProductButton.className = "styled-button";
        addProductButton.innerHTML = "+";
		parent.appendChild(addProductButton);

		var list = document.createElement("div");
		parent.appendChild(list);

		addProductButton.onclick = function(){
            showCreateProduct(null, function(name, duration, price, color, category){
                var newProduct = { name:name, duration:duration, price:price, color:color, category:category };
                beforeNewProductEvents.forEach(function(event){
                    event(newProduct);
                });
                allProducts.push(newProduct);
				var c = document.createElement("a");
				c.innerHTML = name;
				list.appendChild(c);
				list.appendChild(document.createElement("br"));
                newProductEvents.forEach(function(event){
                    event(newProduct);
                });
            });
        }

		getAllProducts().forEach(function(product){
			var p = document.createElement("a");
			p.appendChild(document.createTextNode(product.name));
			var color = product.color;
			if(!color.startsWith("#"))color = "#"+color;
			p.style.borderLeft = "10px solid " + color;
			p.style.paddingLeft = "5px";
			list.appendChild(p);
			list.appendChild(document.createElement("br"));
			p.onclick = function(){
		        showCreateProduct(product, function(name, duration, price, color, category){
		            var modify = true;
		            beforeModifyProductEvents.forEach(function(element){
		                if(!element(product, name, duration, price, color, category))modify = false;
		            });
		            if(!modify)return;
		            product.name = name;
		            product.duration = duration;
		            product.price = price;
		            product.color = color;
					product.category = category;
					p.innerHTML = "";
					p.appendChild(document.createTextNode(product.name));
		            modifyProductEvents.forEach(function(element){
		                element(product);
		            });
		        });
			}
		});
	}, function(parent){
		return true;
	});
}

function showReports(){
	createWindow(language.reports, function(parent){
		var list = document.createElement("list");
		parent.appendChild(list);

		$.post("backend.php", {
			what: "getReports"
		}, 
		function(reports) {
			reports.forEach(function(report){
				var r = document.createElement("a");
				list.appendChild(r);
				list.appendChild(document.createElement("br"));
				r.innerHTML = language[report.title];
				r.onclick = function(){ showReport(report); };
			});
		});
	}, function(parent){
		return true;
	});
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
	createWindow(language[report.title], function(parent){
		var table = document.createElement("table");
		parent.appendChild(table);

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
	}, function(parent){
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
	var theme = document.createElement("select");
	var company = document.createElement("input");
	var taxId = document.createElement("input");
	var address1 = document.createElement("input");
	var address2 = document.createElement("input");
	var telephone = document.createElement("input");
	var homepage = document.createElement("input");
	var taxName = document.createElement("input");
	var taxValue = document.createElement("input");
	var startTime = document.createElement("select");
	var endTime = document.createElement("select");
	var showMonths = document.createElement("select");
	var timeFormat = document.createElement("select");
	var currency = document.createElement("input");
	company.type = "text";
	taxId.type = "text";
	address1.type = "text";
	address2.type = "text";
	telephone.type = "text";
	homepage.type = "text";
	taxName.type = "text";
	taxValue.type = "text";
	company.value = "";
	taxId.value = "";
	address1.value = "";
	address2.value = "";
	telephone.value = "";
	homepage.value = "";
	taxName.value = "";
	taxValue.value = "";
	currency.type = "text";
	currency.value = "";

	createWindow(language.settings, function(parent){
		var table = document.createElement("table");
		parent.appendChild(table);

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.theme));
		var styledSelect = document.createElement("div");
		styledSelect.className = "styled-select";
		styledSelect.appendChild(theme);
        tr.insertCell(1).appendChild(styledSelect);

		var option = document.createElement("option");
		theme.appendChild(option);
		option.value = "calendar_default";
		option.innerHTML = "Default";

		option = document.createElement("option");
		theme.appendChild(option);
		option.value = "calendar_g";
		option.innerHTML = "Google-Like";

		option = document.createElement("option");
		theme.appendChild(option);
		option.value = "calendar_green";
		option.innerHTML = "Green";

		option = document.createElement("option");
		theme.appendChild(option);
		option.value = "calendar_traditional";
		option.innerHTML = "Traditional";

		option = document.createElement("option");
		theme.appendChild(option);
		option.value = "calendar_transparent";
		option.innerHTML = "Transparent";

		option = document.createElement("option");
		theme.appendChild(option);
		option.value = "calendar_white";
		option.innerHTML = "White";

		if(settings.theme != null)theme.value = settings.theme;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.companyName));
		tr.insertCell(1).appendChild(company);
		if(settings.company != null)company.value = settings.company;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.taxId));
		tr.insertCell(1).appendChild(taxId);
		if(settings.taxId != null)taxId.value = settings.taxId;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.address1));
		tr.insertCell(1).appendChild(address1);
		if(settings.address1 != null)address1.value = settings.address1;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.address2));
		tr.insertCell(1).appendChild(address2);
		if(settings.address2 != null)address2.value = settings.address2;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.telephone));
		tr.insertCell(1).appendChild(telephone);
		if(settings.telephone != null)telephone.value = settings.telephone;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.homepage));
		tr.insertCell(1).appendChild(homepage);
		if(settings.homepage != null)homepage.value = settings.homepage;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.taxName));
		tr.insertCell(1).appendChild(taxName);
		if(settings.taxName != null)taxName.value = settings.taxName;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.taxValue));
		tr.insertCell(1).appendChild(taxValue);
		if(settings.taxValue != null)taxValue.value = settings.taxValue;

		for(var time = 0; time <= 24; time++){
			option = document.createElement("option");
			startTime.appendChild(option);
			option.value = time;
			option.innerHTML = time + " " +language.oClock;

			option = document.createElement("option");
			endTime.appendChild(option);
			option.value = time;
			option.innerHTML = time + " " + language.oClock;
		}

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.startTime));
		styledSelect = document.createElement("div");
		styledSelect.className = "styled-select";
		styledSelect.appendChild(startTime);
        tr.insertCell(1).appendChild(styledSelect);
		if(settings.startTime != null)startTime.value = settings.startTime;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.endTime));
		styledSelect = document.createElement("div");
		styledSelect.className = "styled-select";
		styledSelect.appendChild(endTime);
        tr.insertCell(1).appendChild(styledSelect);
		if(settings.endTime != null)endTime.value = settings.endTime;

		for(var i = 1; i <= 5; i++){
			option = document.createElement("option");
			showMonths.appendChild(option);
			option.value = i;
			option.innerHTML = i;
		}

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.showMonths));
		styledSelect = document.createElement("div");
		styledSelect.className = "styled-select";
		styledSelect.appendChild(showMonths);
        tr.insertCell(1).appendChild(styledSelect);
		if(settings.showMonths != null)showMonths.value = settings.showMonths;

		option = document.createElement("option");
		timeFormat.appendChild(option);
		option.value = "Clock12Hours";
		option.innerHTML = language.clock12Hours;

		option = document.createElement("option");
		timeFormat.appendChild(option);
		option.value = "Clock24Hours";
		option.innerHTML = language.clock24Hours;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.timeFormat));
		styledSelect = document.createElement("div");
		styledSelect.className = "styled-select";
		styledSelect.appendChild(timeFormat);
        tr.insertCell(1).appendChild(styledSelect);
		if(settings.timeFormat != null)timeFormat.value = settings.timeFormat;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.currency));
		tr.insertCell(1).appendChild(currency);
		if(settings.currency != null)currency.value = settings.currency;

		var tr = table.insertRow();
		tr.insertCell(0).appendChild(document.createTextNode(language.employees));
		var link = document.createElement("a");
		link.onclick = function() { showEmployees(); };
		link.appendChild(document.createTextNode(language.manage));
		tr.insertCell(1).appendChild(link);
	}, function(parent){
		settings = {
			theme: theme.value,
			company: company.value,
			taxId: taxId.value,
			address1: address1.value,
			address2: address2.value,
			telephone: telephone.value,
			homepage: homepage.value,
			taxName: taxName.value,
			taxValue: taxValue.value,
			startTime: startTime.value,
			endTime: endTime.value,
			showMonths: showMonths.value,
			timeFormat: timeFormat.value,
			currency: currency.value
		};

		$.post("backend.php", {
			what: "saveSettings",
			data: settings
		}, 
		function() {
			console.log("Settings saved");
		});
		newSettingsEvents.forEach(function(handler){
			handler(settings);
		});
		return true;
	});
}

function showEmployees(){
	createWindow(language.employees, function(parent){
		var addEmployeeButton = document.createElement("div");
        addEmployeeButton.className = "styled-button";
        addEmployeeButton.innerHTML = "+";
		parent.appendChild(addEmployeeButton);

		var list = document.createElement("div");
		parent.appendChild(list);

		addEmployeeButton.onclick = function(){
            showCreateEmployee(null, function(name){
                var newEmployee = { name:name };
                beforeNewEmployeeEvents.forEach(function(event){
                    event(newEmployee);
                });
				var c = document.createElement("a");
				c.appendChild(document.createTextNode(name));
				list.appendChild(c);
				list.appendChild(document.createElement("br"));
                newEmployeeEvents.forEach(function(event){
                    event(newEmployee);
                });
            });
        }

		$.ajax({
			type: "POST",
			url: "backend.php",
			data: {
				what: "getEmployees"
			}, 
			success: function(data) {
				var employees = document.getElementById("employee");
				data.forEach(function(employee){
					var p = document.createElement("a");
					p.appendChild(document.createTextNode(employee.name));
					list.appendChild(p);
					list.appendChild(document.createElement("br"));
					p.onclick = function(){
						showCreateEmployee(employee, function(name){
						    var modify = true;
						    beforeModifyEmployeeEvents.forEach(function(element){
						        if(!element(employee, name))modify = false;
						    });
						    if(!modify)return;
						    employee.name = name;
							p.innerHTML = "";
							p.appendChild(document.createTextNode(employee.name))
						    modifyEmployeeEvents.forEach(function(element){
						        element(employee);
						    });
						});
					}


				});
				employees.selectedIndex = 0;
			},
			async: false
		});
	}, function(parent){
		return true;
	});
}

function showPayWindowTotal(total, callback){
	var paymentType = "";
	var printInvoice = document.createElement("input");
	createWindow(language.pay, function(parent){
		var table = document.createElement("table");
		table.id = "paytotal"
		parent.appendChild(table);

		var topPanel = table.insertRow().insertCell(0);
		topPanel.colSpan = "2";
		var totalText = document.createElement("p");
		topPanel.appendChild(totalText);
		totalText.appendChild(document.createTextNode(language.totalPrice + ": " + total));
		var paymentMethodText = document.createElement("p");
		topPanel.appendChild(paymentMethodText);

		var tr = table.insertRow();
		var types = document.createElement("ul");
		types.style.float = "left";
		tr.insertCell(0).appendChild(types);

		var cash = document.createElement("li");
		var bank = document.createElement("li");
		types.appendChild(cash);
		types.appendChild(bank);
		cash.appendChild(document.createTextNode(language.cash));
		bank.appendChild(document.createTextNode(language.bank));

		var centerPanel = document.createElement("div");
		centerPanel.style.overflow = "auto";
		tr.insertCell(1).appendChild(centerPanel);

		var updateCashText = function(tendered){
			paymentMethodText.innerHTML = "";
			paymentMethodText.appendChild(document.createTextNode(language.tendered + ": " + tendered));
			if(tendered > total){
				paymentMethodText.appendChild(document.createElement("br"));
				paymentMethodText.appendChild(document.createTextNode(language.cashReturn + ": " + (parseFloat(tendered)-parseFloat(total))));
			}
		}

		var cashSelected = function(){
			paymentType = "cash";
			cash.style.background = "#dddddd";
			bank.style.background = "";
			centerPanel.innerHTML = "";
			var tendered = 0;
			var counter = 0;
			[500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01].forEach(function(number){
				var money = document.createElement("div");
				money.className = "money";
				centerPanel.appendChild(money);
				var text = document.createElement("p");
				text.appendChild(document.createTextNode(number));
				money.appendChild(text);
				money.onclick = function(){
					tendered = parseFloat(tendered) + parseFloat(number);
					updateCashText(tendered);
				}
				if(counter++ == 4){
					centerPanel.appendChild(document.createElement("br"));
					counter = 0;
				}
			});
			updateCashText(tendered);
		}
		var bankSelected = function(){
			paymentType = "bank";
			cash.style.background = "";
			bank.style.background = "#dddddd";
			centerPanel.innerHTML = "";
			paymentMethodText.innerHTML = "";
			paymentMethodText.appendChild(document.createTextNode(language.makeBankPayment));
		}

		cash.onclick = cashSelected;
		bank.onclick = bankSelected;
		cashSelected();

		tr = table.insertRow();
		var bottomPanel = tr.insertCell(0);
		bottomPanel.colSpan = "2";
		printInvoice.type = "checkbox";
		printInvoice.checked = true;
		bottomPanel.appendChild(printInvoice);
		bottomPanel.appendChild(document.createTextNode(language.printInvoice));
	}, function(parent){
		var cash = 0;
		var bank = 0;
		if(paymentType == "cash")cash = total;
		else bank = total;
		callback(cash, bank, (printInvoice.checked==true));
		return true;
	});
}
