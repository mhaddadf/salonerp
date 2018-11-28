//Script for creating input windows

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

	for(var i = 0; i < Window.currentWindows.length; i++){
		if(Window.currentWindows[i] == this){
			Window.currentWindows.splice(i, 1);
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
	Window.currentWindows.push(this);
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
		element.dhtml = new dhtmlXCombo(element.htmlElement, "searchselect" + object.id, "400px");
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

Window.currentWindows = [];

Window.areWindowsActive = function(){
	return (Window.currentWindows.length > 0);
}

Window.closeAll = function(){
	for(var i = 0; i < Window.currentWindows.length; i++){
		Window.currentWindows[i].close();
	}
}

window.addEventListener('resize', function(){
	Window.currentWindows.forEach(function(window){
		window.adjustSize();
	});
}, true);
