var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * This class is respnsible for the communication
 * with the PHP backend
 */
var Backend = /** @class */ (function () {
    function Backend() {
    }
    /**
     * Loads the settings
     */
    Backend.prototype.getSettings = function () {
        var data = {
            what: "settings"
        };
        return this.doHttp(data);
    };
    /**
     * Prepares an invoice to be opened
     * @param invoice The invoice to open
     */
    Backend.prototype.saveInvoice = function (invoice) {
        var data = {
            save: "",
            invoice: invoice
        };
        return this.doInvoiceHttp(data);
    };
    /**
     * Prints the given invoice
     * @param invoice The invoice to print
     */
    Backend.prototype.printInvoice = function (invoice) {
        var data = {
            print: "",
            invoice: invoice
        };
        return this.doInvoiceHttp(data);
    };
    /**
     * Creates the given product
     * @param product The product to create
     */
    Backend.prototype.createProduct = function (product) {
        var data = {
            what: "createProduct",
            name: product.name,
            duration: product.duration,
            price: product.price,
            color: product.color,
            categories: product.categories
        };
        return this.doHttp(data);
    };
    /**
     * Creates the given customer
     * @param customer The customer to create
     */
    Backend.prototype.createCustomer = function (customer) {
        var data = {
            what: "createCustomer",
            firstname: customer.firstname,
            lastname: customer.lastname,
            comment: customer.comment,
            address: customer.address,
            telephone: customer.telephone,
            email: customer.email
        };
        return this.doHttp(data);
    };
    /**
     * Creates the given employee
     * @param employee The employee to create
     */
    Backend.prototype.createEmployee = function (employee) {
        var data = {
            what: "createEmployee",
            name: employee.name,
            address: employee.address,
            telephone: employee.telephone,
            email: employee.email
        };
        return this.doHttp(data);
    };
    /**
     * Creates the given category
     * @param category The category to create
     */
    Backend.prototype.createCategory = function (category) {
        var data = {
            what: "createCategory",
            name: category.name
        };
        return this.doHttp(data);
    };
    /**
     * Deletes the given event
     * @param event The event to delete
     */
    Backend.prototype.deleteEvent = function (event) {
        var data = {
            what: "deleteEvent",
            id: event.id
        };
        return this.doHttp(data);
    };
    /**
     * Updates the given customer
     * @param customer The customer to update
     */
    Backend.prototype.updateCustomer = function (customer) {
        var data = {
            what: "updateCustomer",
            id: customer.id,
            firstname: customer.firstname,
            lastname: customer.lastname,
            comment: customer.comment,
            address: customer.address,
            telephone: customer.telephone,
            email: customer.email
        };
        return this.doHttp(data);
    };
    /**
     * Updates the given product
     * @param product The product to update
     */
    Backend.prototype.updateProduct = function (product) {
        var data = {
            what: "updateProduct",
            id: product.id,
            name: product.name,
            duration: product.duration,
            price: product.price,
            color: product.color,
            categories: product.categories
        };
        return this.doHttp(data);
    };
    /**
     * Updates the given employee
     * @param employee The employee to update
     */
    Backend.prototype.updateEmployee = function (employee) {
        var data = {
            what: "updateEmployee",
            id: employee.id,
            name: employee.name,
            address: employee.address,
            telephone: employee.telephone,
            email: employee.email
        };
        return this.doHttp(data);
    };
    /**
     * Updates the given category
     * @param category The category to update
     */
    Backend.prototype.updateCategory = function (category) {
        var data = {
            what: "updateCategory",
            id: category.id,
            name: category.name
        };
        return this.doHttp(data);
    };
    /**
     * Saves the settings
     * @param settings The settings to save
     */
    Backend.prototype.saveSettings = function (settings) {
        var data = {
            what: "saveSettings",
            data: settings
        };
        return this.doHttp(data);
    };
    /**
     * Loads all employees
     */
    Backend.prototype.getEmployees = function () {
        var data = {
            what: "getEmployees"
        };
        return this.doHttp(data);
    };
    /**
     * Loads all customers
     */
    Backend.prototype.getCustomers = function () {
        var data = {
            what: "getCustomers"
        };
        return this.doHttp(data);
    };
    /**
     * Loads all products
     */
    Backend.prototype.getProducts = function () {
        var data = {
            what: "getProducts"
        };
        return this.doHttp(data);
    };
    /**
     * Loads all categories
     */
    Backend.prototype.getCategories = function () {
        var data = {
            what: "getCategories"
        };
        return this.doHttp(data);
    };
    /**
     * Loads the given language
     * @param lang The language to load
     */
    Backend.prototype.getLanguage = function (lang) {
        var data = {
            what: "language",
            language: lang
        };
        return this.doHttp(data);
    };
    /**
     * Loads all reports
     */
    Backend.prototype.getReports = function () {
        var data = {
            what: "getReports"
        };
        return this.doHttp(data);
    };
    /**
     * Loads all invoice layouts
     */
    Backend.prototype.getInvoiceLayouts = function () {
        var data = {
            what: "getInvoiceLayouts"
        };
        return this.doHttp(data);
    };
    /**
     * Prepares the given report to be opened
     * @param report The report to prepare
     * @param toAsk The variables for the report
     */
    Backend.prototype.saveReport = function (report, toAsk) {
        var data = {
            save: "",
            title: report.title,
            font: report.font,
            fontSize: report.fontSize,
            sql: report.sql,
            ask: toAsk,
            sum: report.sum,
            currency: report.currency
        };
        return this.doReportHttp(data);
    };
    /**
     * Loads all the events in the given time range
     * from the given employee
     * @param start The start time
     * @param end The end time
     * @param employeeId The employee id
     */
    Backend.prototype.getEvents = function (start, end, employeeId) {
        var data = {
            what: "getEvents",
            start: start.toString(),
            end: end.toString(),
            employee: employeeId
        };
        return this.doHttp(data).then(function (events) {
            events.forEach(function (event) { return event.employee = employeeId; });
            return events;
        });
    };
    /**
     * Creates the given event
     * @param event The event to create
     */
    Backend.prototype.createEvent = function (event) {
        var data = {
            what: "createEvent",
            start: event.start.toString(),
            end: event.end.toString(),
            name: event.comment,
            customer: event.customer,
            product: event.product,
            additionalProducts: event.additionalProducts,
            employee: event.employee
        };
        return this.doHttp(data);
    };
    /**
     * Updates the given event
     * @param event The event to update
     */
    Backend.prototype.updateEvent = function (event) {
        var data = {
            what: "updateEvent",
            id: event.id,
            name: event.comment,
            customer: event.customer,
            product: event.product,
            additionalProducts: event.additionalProducts,
            start: event.start.toString(),
            end: event.end.toString()
        };
        return this.doHttp(data);
    };
    /**
     * Creates an invoice for the given event
     * which the given lines and money values
     * @param event The event
     * @param lines The invoice lines
     * @param cash The amount of money paid cash
     * @param bank The amount of money paid by bank
     */
    Backend.prototype.createInvoice = function (event, lines, cash, bank) {
        var data = {
            what: "createInvoice",
            event: event.id,
            products: lines,
            cash: cash,
            bank: bank,
            date: new DayPilot.Date().toString()
        };
        return this.doHttp(data);
    };
    /**
     * Resizes the given event and updates the employee
     * id
     * @param event The event to reisze
     * @param employeeId The new employee id
     */
    Backend.prototype.resizeEvent = function (event, employeeId) {
        var data = {
            what: "resizeEvent",
            id: event.id,
            newStart: event.start.toString(),
            newEnd: event.end.toString(),
            employee: employeeId
        };
        return this.doHttp(data);
    };
    /**
     * Triggers an update of the database
     */
    Backend.prototype.updateDatabase = function () {
        var data = {
            what: "updateDatabase"
        };
        return this.doHttp(data);
    };
    Backend.prototype.getDatabaseStatus = function () {
        var data = {
            what: "databaseStatus"
        };
        return this.doHttp(data);
    };
    /**
     * Does the actual http request to the backend
     * @param data The data to send
     */
    Backend.prototype.doHttp = function (data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "backend.php",
                data: data,
                success: function (data) {
                    resolve(data);
                },
                error: function (request, text, error) {
                    console.log(error);
                    reject(error);
                }
            });
        });
    };
    /**
     * Does the actual http request to the invoice
     * @param data The data to send
     */
    Backend.prototype.doInvoiceHttp = function (data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "invoice.php",
                data: data,
                success: function (data) {
                    resolve(data);
                },
                error: function (request, text, error) {
                    console.log(error);
                    reject(error);
                }
            });
        });
    };
    /**
     * Does the actual http request to the report
     * @param data The data to send
     */
    Backend.prototype.doReportHttp = function (data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "report.php",
                data: data,
                success: function (data) {
                    resolve(data);
                },
                error: function (request, text, error) {
                    console.log(error);
                    reject(error);
                }
            });
        });
    };
    return Backend;
}());
/// <reference path="backend.ts"/>
/**
 * This class represents the main "glue"
 * of salonERP.
 * It connects all the views together and with
 * the backend server.
 */
var SalonErp = /** @class */ (function () {
    /**
     * Default ctor
     */
    function SalonErp() {
        /** All employees which currently loaded */
        this.allEmployees = {};
        /** All customers nwhich are currently loaded */
        this.allCustomers = {};
        /** All products which are currently loaded */
        this.allProducts = {};
        /** All product categories which are currently loaded */
        this.allCategories = {};
        /** All events which are currently loaded */
        this.allEvents = [];
        /** All settings which are currently loaded */
        this.settings = {};
        this.backend = new Backend();
    }
    /**
     * Loads the settings from the backend server
     * and raises the newSettings event
     */
    SalonErp.prototype.loadSettings = function () {
        var _this = this;
        return this.backend.getSettings().then(function (s) {
            _this.settings = s;
            return SalonErpEvents.newSettings.raise(s).then(function () { return undefined; });
        });
    };
    /**
     * Replaces all loaded employees with the given ones
     * @param employees All employees
     */
    SalonErp.prototype.setAllEmployees = function (employees) {
        var _this = this;
        this.allEmployees = {};
        employees.forEach(function (employee) { return _this.allEmployees[employee.id] = employee; });
    };
    /**
     * Replaces all loaded customers with the given ones
     * @param customers All customers
     */
    SalonErp.prototype.setAllCustomers = function (customers) {
        var _this = this;
        this.allCustomers = {};
        customers.forEach(function (customer) { return _this.allCustomers[customer.id] = customer; });
    };
    /**
     * Replaces all loaded products with the given ones
     * @param products All products
     */
    SalonErp.prototype.setAllProducts = function (products) {
        var _this = this;
        this.allProducts = {};
        products.forEach(function (product) { return _this.allProducts[product.id] = product; });
    };
    /**
     * Sets the product categories
     * @param categories All categories
     */
    SalonErp.prototype.setAllCategories = function (categories) {
        var _this = this;
        this.allCategories = {};
        categories.forEach(function (category) { return _this.allCategories[category.id] = category; });
    };
    /**
     * Gets all employees
     */
    SalonErp.prototype.getAllEmployees = function () {
        return this.allEmployees;
    };
    /**
     * Gets all customers
     */
    SalonErp.prototype.getAllCustomers = function () {
        return this.allCustomers;
    };
    /**
     * Gets all products
     */
    SalonErp.prototype.getAllProducts = function () {
        return this.allProducts;
    };
    /**
     * Gets all categories
     */
    SalonErp.prototype.getAllCategories = function () {
        return this.allCategories;
    };
    /**
     * Edits the given customer and calls the callback once finished
     * @param customer The customer to edit
     * @param editedCallback The callback to call (true if edited, false otherwise)
     */
    SalonErp.prototype.showEditCustomer = function (customer, editedCallback) {
        var _this = this;
        var view = new EditCustomer(customer);
        view.onCreate.push(function (firstname, lastname, comment, address, telephone, email) {
            _this.editCustomer(customer, firstname, lastname, comment, address, telephone, email).then(function () {
                if (editedCallback != undefined)
                    editedCallback(true);
            })["catch"](function () {
                if (editedCallback != undefined)
                    editedCallback(false);
            });
        });
        view.show();
        return view;
    };
    /**
     * Edits the given customer by setting the new given values
     * The beforeModifyCustomer and modifyCustomer event is raised
     * and the customer is saved in the backend server
     * @param customer The customer to edit
     * @param firstname The new firstname
     * @param lastname The new lastname
     * @param comment The new comment
     * @param address The new address
     * @param telephoneThe new telephone
     * @param email The new email
     */
    SalonErp.prototype.editCustomer = function (customer, firstname, lastname, comment, address, telephone, email) {
        var _this = this;
        return SalonErpEvents.beforeModifyCustomer.raise(customer, firstname, lastname, comment, address, telephone, email).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            customer.firstname = firstname;
            customer.lastname = lastname;
            customer.comment = comment;
            customer.address = address;
            customer.telephone = telephone;
            customer.email = email;
            customer.name = customer.firstname + " " + customer.lastname;
            return _this.backend.updateCustomer(customer);
        }).then(function () {
            return SalonErpEvents.modifyCustomer.raise(customer);
        });
    };
    /**
     * Edits the given product and calls the callback once finished
     * @param product The product to edit
     * @param editedCallback The callback to call (true if edited, false otherwise)
     */
    SalonErp.prototype.showEditProduct = function (product, editedCallback) {
        var _this = this;
        var view = new EditProduct(this.allCategories, product);
        view.onAddCategory = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddCategory(function (category) {
                    if (category == undefined)
                        reject("Canceled");
                    else
                        resolve(category);
                });
            });
        };
        view.onEditCategory = function (category) {
            return new Promise(function (resolve, reject) {
                _this.showEditCategory(category, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.onCreate.push(function (name, duration, price, color, categories) {
            _this.editProduct(product, name, duration, price, color, categories).then(function () {
                if (editedCallback != undefined)
                    editedCallback(true);
            })["catch"](function () {
                if (editedCallback != undefined)
                    editedCallback(false);
            });
        });
        view.show();
        return view;
    };
    /**
     * Edits the given product by setting the new given values
     * The beforeModifyProduct and modifyProduct event is raised
     * and the product is saved in the backend server
     * @param product The product to edit
     * @param name The new name
     * @param duration The new duration
     * @param price The new price
     * @param color The new color
     * @param category The new category
     */
    SalonErp.prototype.editProduct = function (product, name, duration, price, color, categories) {
        var _this = this;
        return SalonErpEvents.beforeModifyProduct.raise(product, name, duration, price, color, categories)["catch"](function (result) {
            if (result.index(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            product.name = name;
            product.duration = duration;
            product.price = price;
            product.color = color;
            product.categories = categories;
            return _this.backend.updateProduct(product);
        }).then(function () {
            return SalonErpEvents.modifyProduct.raise(product);
        });
    };
    /**
     * Edits the given employee and calls the callback once finished
     * @param employee The employee to edit
     * @param editedCallback The callback to call (true if edited, false otherwise)
     */
    SalonErp.prototype.showEditEmployee = function (employee, editedCallback) {
        var _this = this;
        var view = new EditEmployee(employee);
        view.onCreate.push(function (name, address, telephone, email) {
            _this.editEmployee(employee, name, address, telephone, email).then(function () {
                if (editedCallback != undefined)
                    editedCallback(true);
            })["catch"](function () {
                if (editedCallback != undefined)
                    editedCallback(false);
            });
        });
        view.show();
        return view;
    };
    /**
     * Edits the given employee by setting the new given values
     * The beforeModifyEmployee and modifyEmployee event is raised
     * and the employee is saved in the backend server
     * @param employee The employee to edit
     * @param name The new name
     * @param address The new address
     * @param telephone The new telephone number
     * @param email The new email address
     */
    SalonErp.prototype.editEmployee = function (employee, name, address, telephone, email) {
        var _this = this;
        return SalonErpEvents.beforeModifyEmployee.raise(employee, name, address, telephone, email).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            employee.name = name;
            employee.address = address;
            employee.telephone = telephone;
            employee.email = email;
            return _this.backend.updateEmployee(employee);
        }).then(function () {
            return SalonErpEvents.modifyEmployee.raise(employee);
        });
    };
    /**
     * Edits the given category and calls the callback once finished
     * @param category The category to edit
     * @param editedCallback The callback to call (true if edited, false otherwise)
     */
    SalonErp.prototype.showEditCategory = function (category, editedCallback) {
        var _this = this;
        var view = new EditCategory(category);
        view.onCreate.push(function (name) {
            _this.editCategory(category, name).then(function () {
                if (editedCallback != undefined)
                    editedCallback(true);
            })["catch"](function () {
                if (editedCallback != undefined)
                    editedCallback(false);
            });
        });
        view.show();
        return view;
    };
    /**
     * Edits the given category by setting the new given values
     * The beforeModifyCategory and modifyCategory event is raised
     * and the category is saved in the backend server
     * @param category The category to edit
     * @param name The new name
     */
    SalonErp.prototype.editCategory = function (category, name) {
        var _this = this;
        return SalonErpEvents.beforeModifyCategory.raise(category, name).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            category.name = name;
            return _this.backend.updateCategory(category);
        }).then(function () {
            return SalonErpEvents.modifyCategory.raise(category);
        });
    };
    /**
     * Edits the given employee and calls the callback once finished
     * @param event The event to edit
     * @param editedCallback The callback to call (true if edited, false otherwise)
     */
    SalonErp.prototype.showEditEvent = function (event, editedCallback) {
        var _this = this;
        var duration = (event.end.getTotalTicks() - event.start.getTotalTicks()) / 60000;
        var view = new EditEvent(event.start, duration, this.allCustomers, this.allProducts, event);
        view.okClicked.push(function (customerId, productId, additionalProductIds, comment, startTime, duration) {
            var start = new DayPilot.Date(startTime);
            var end = start.addMinutes(duration);
            _this.editEvent(event, customerId, productId, additionalProductIds, comment, start, end).then(function () {
                if (editedCallback != undefined)
                    editedCallback(true);
            })["catch"](function () {
                if (editedCallback != undefined)
                    editedCallback(false);
            });
        });
        view.onPaid.push(function (products, cash, bank) {
            _this.createInvoice(event, products, cash, bank);
        });
        view.onAddProduct = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddProduct(function (product) {
                    if (product == undefined)
                        reject("Canceled");
                    else
                        resolve(product);
                });
            });
        };
        view.onAddCustomer = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddCustomer(function (customer) {
                    if (customer == undefined)
                        reject("Canceled");
                    else
                        resolve(customer);
                });
            });
        };
        view.onEditProduct = function (product) {
            return new Promise(function (resolve, reject) {
                _this.showEditProduct(product, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.onEditCustomer = function (customer) {
            return new Promise(function (resolve, reject) {
                _this.showEditCustomer(customer, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.onOpenInvoice = function (invoice) {
            _this.openInvoice(invoice);
        };
        view.onPrintInvoice = function (invoice) {
            _this.printInvoice(invoice);
        };
        view.onCancelEvent = function () {
            return _this.cancelEvent(event).then(function () { return undefined; });
        };
        view.show();
        return view;
    };
    /**
     * Edits the given event by setting the new given values
     * The beforeModifyEvent and modifyEvent event is raised
     * and the employee is saved in the backend server
     * @param event The event to edit
     * @param customerId The new customer id
     * @param productId The new product id
     * @param comment The new comment
     * @param start The new start time
     * @param end The new end time
     */
    SalonErp.prototype.editEvent = function (event, customerId, productId, additionalProductIds, comment, start, end) {
        var _this = this;
        return SalonErpEvents.beforeModifyEvent.raise(event, customerId, productId, comment, start, end).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            var product = _this.allProducts[productId];
            var customer = _this.allCustomers[customerId];
            event.customer = customerId;
            event.product = productId;
            event.additionalProducts = additionalProductIds;
            event.comment = comment;
            event.start = start;
            event.end = end;
            if (customer != undefined && product != undefined) {
                event.text = customer.name + ", " + product.name + ", " + event.comment;
            }
            else {
                event.text = "Customer or product undefined!";
            }
            return _this.backend.updateEvent(event);
        }).then(function () {
            return SalonErpEvents.modifyEvent.raise(event);
        });
    };
    /**
     * Changes the times and employee id of an event
     * The beforeChangeTime and changeTime event is raised
     * and the event is saved in the backend server
     * @param event The event to edit the time for
     * @param newStart The new start time
     * @param newEnd The new end time
     * @param employeeId The new employee id
     */
    SalonErp.prototype.changeEventTime = function (event, newStart, newEnd, employeeId) {
        var _this = this;
        return SalonErpEvents.beforeChangeTime.raise(event, newStart, newEnd, employeeId).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            event.start = newStart;
            event.end = newEnd;
            event.employee = employeeId;
            return _this.backend.resizeEvent(event, employeeId);
        }).then(function () {
            return SalonErpEvents.changeTime.raise(event);
        });
    };
    /**
     * Shows the view to add a new customer to the system and calls the
     * optional callback function
     * @param createdCallback The function which is called when the customer is created
     */
    SalonErp.prototype.showAddCustomer = function (createdCallback) {
        var _this = this;
        var view = new EditCustomer();
        view.onCreate.push(function (firstname, lastname, comment, address, telephone, email) {
            _this.addCustomer(firstname, lastname, comment, address, telephone, email).then(function (newCustomer) {
                if (createdCallback != undefined)
                    createdCallback(newCustomer);
            })["catch"](function () {
                if (createdCallback != undefined)
                    createdCallback(undefined);
            });
        });
        view.show();
        return view;
    };
    /**
     * Adds a customer to the system
     * The beforeNewCustomer and newCustomer event is raised
     * and the customer is saved in the backend server
     * @param firstname The customer's firstname
     * @param lastname The customer's lastname
     * @param comment The customer's comment
     * @param address The customer's address
     * @param telephone The customer's telephone numnber
     * @param email The customer's E-Mail address
     */
    SalonErp.prototype.addCustomer = function (firstname, lastname, comment, address, telephone, email) {
        var _this = this;
        var newCustomer = {
            id: "",
            name: firstname + " " + lastname,
            firstname: firstname,
            lastname: lastname,
            comment: comment,
            address: address,
            telephone: telephone,
            email: email
        };
        return SalonErpEvents.beforeNewCustomer.raise(newCustomer).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            return _this.backend.createCustomer(newCustomer);
        }).then(function (data) {
            newCustomer.id = data.id;
            _this.allCustomers[newCustomer.id] = newCustomer;
            return SalonErpEvents.newCustomer.raise(newCustomer);
        }).then(function () {
            return newCustomer;
        });
    };
    /**
     * Shows the view to add a new product to the system and calls the
     * optional callback function
     * @param createdCallback The function which is called when the product is created
     */
    SalonErp.prototype.showAddProduct = function (createdCallback) {
        var _this = this;
        var view = new EditProduct(this.allCategories);
        view.onAddCategory = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddCategory(function (category) {
                    if (category == undefined)
                        reject("Canceled");
                    else
                        resolve(category);
                });
            });
        };
        view.onEditCategory = function (category) {
            return new Promise(function (resolve, reject) {
                _this.showEditCategory(category, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.onCreate.push(function (name, duration, price, color, categories) {
            _this.addProduct(name, duration, price, color, categories).then(function (newProduct) {
                if (createdCallback != undefined)
                    createdCallback(newProduct);
            })["catch"](function () {
                if (createdCallback != undefined)
                    createdCallback(undefined);
            });
        });
        view.show();
        return view;
    };
    /**
     * Adds a product to the system
     * The beforeNewProduct and newProduct event is raised
     * and the product is saved in the backend server
     * @param name The product's name
     * @param duration The product's duration
     * @param price The product's price
     * @param color The product's color
     * @param category The product's category
     */
    SalonErp.prototype.addProduct = function (name, duration, price, color, categories) {
        var _this = this;
        var newProduct = {
            id: "",
            name: name,
            duration: duration,
            price: price,
            color: color,
            categories: categories
        };
        return SalonErpEvents.beforeNewProduct.raise(newProduct).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            return _this.backend.createProduct(newProduct);
        }).then(function (data) {
            newProduct.id = data.id;
            _this.allProducts[newProduct.id] = newProduct;
            return SalonErpEvents.newProduct.raise(newProduct);
        }).then(function () {
            return newProduct;
        });
    };
    /**
     * Shows the view to add a new employee to the system and calls the
     * optional callback function
     * @param createdCallback The function which is called when the employee is created
     */
    SalonErp.prototype.showAddEmployee = function (createdCallback) {
        var _this = this;
        var view = new EditEmployee();
        view.onCreate.push(function (name, address, telephone, email) {
            _this.addEmployee(name, address, telephone, email).then(function (newEmployee) {
                if (createdCallback != undefined)
                    createdCallback(newEmployee);
            })["catch"](function () {
                if (createdCallback != undefined)
                    createdCallback(undefined);
            });
        });
        view.show();
        return view;
    };
    /**
     * Adds an employee to the system
     * The beforeNewEmployee and newEmployee event is raised
     * and the employee is saved in the backend server
     * @param name The customer's name
     * @param address The customer's address
     * @param telephone The customer's telephone number
     * @param email The customer's email address
     */
    SalonErp.prototype.addEmployee = function (name, address, telephone, email) {
        var _this = this;
        var newEmployee = {
            id: "",
            name: name,
            address: address,
            telephone: telephone,
            email: email
        };
        return SalonErpEvents.beforeNewEmployee.raise(newEmployee).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            return _this.backend.createEmployee(newEmployee);
        }).then(function (data) {
            newEmployee.id = data.id;
            _this.allEmployees[newEmployee.id] = newEmployee;
            return SalonErpEvents.newEmployee.raise(newEmployee);
        }).then(function () {
            return newEmployee;
        });
    };
    /**
     * Shows the view to add a new category to the system and calls the
     * optional callback function
     * @param createdCallback The function which is called when the category is created
     */
    SalonErp.prototype.showAddCategory = function (createdCallback) {
        var _this = this;
        var view = new EditCategory();
        view.onCreate.push(function (name) {
            _this.addCategory(name).then(function (newCategory) {
                if (createdCallback != undefined)
                    createdCallback(newCategory);
            })["catch"](function () {
                if (createdCallback != undefined)
                    createdCallback(undefined);
            });
        });
        view.show();
        return view;
    };
    /**
     * Adds a category to the system
     * The beforeNewCategory and newCategory event is raised
     * and the category is saved in the backend server
     * @param name The category's name
     */
    SalonErp.prototype.addCategory = function (name) {
        var _this = this;
        var newCategory = {
            id: "",
            name: name
        };
        return SalonErpEvents.beforeNewCategory.raise(newCategory).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            return _this.backend.createCategory(newCategory);
        }).then(function (data) {
            newCategory.id = data.id;
            _this.allCategories[newCategory.id] = newCategory;
            return SalonErpEvents.newEmployee.raise(newCategory);
        }).then(function () {
            return newCategory;
        });
    };
    /**
     * Cancels the given event
     * The beforeDeleteEvent and deleteEvent event is raised
     * and the event is removed from the backend server
     * @param event The event to remove
     */
    SalonErp.prototype.cancelEvent = function (event) {
        var _this = this;
        return SalonErpEvents.beforeDeleteEvent.raise(event).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            return _this.backend.deleteEvent(event);
        }).then(function () {
            var index = _this.allEvents.indexOf(event);
            _this.allEvents.splice(index, 1);
            return SalonErpEvents.deleteEvent.raise(event);
        });
    };
    /**
     * Shows the view to add a new event to the system and calls the
     * optional callback function
     * @param date The desired start date of the event
     * @param duration The duration of the event
     * @param employeeId The responsible employee id of the event
     * @param createdCallback The function which is called when the product is created
     */
    SalonErp.prototype.showAddEvent = function (date, duration, employeeId, createdCallback) {
        var _this = this;
        var view = new EditEvent(date, duration, this.allCustomers, this.allProducts);
        view.onAddProduct = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddProduct(function (product) {
                    if (product == undefined)
                        reject("Canceled");
                    else
                        resolve(product);
                });
            });
        };
        view.onAddCustomer = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddCustomer(function (customer) {
                    if (customer == undefined)
                        reject("Canceled");
                    else
                        resolve(customer);
                });
            });
        };
        view.onEditProduct = function (product) {
            return new Promise(function (resolve, reject) {
                _this.showEditProduct(product, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.onEditCustomer = function (customer) {
            return new Promise(function (resolve, reject) {
                _this.showEditCustomer(customer, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.okClicked.push(function (customerId, productId, additionalProductIds, comment, startTime, time) {
            var start = new DayPilot.Date(startTime);
            var end = start.addMinutes(time);
            _this.addEvent(customerId, productId, additionalProductIds, comment, start, end, employeeId).then(function (newEvent) {
                if (createdCallback != undefined)
                    createdCallback(newEvent);
            })["catch"](function () {
                if (createdCallback != undefined)
                    createdCallback(undefined);
            });
        });
        view.show();
        return view;
    };
    /**
     * Adds an event to the system
     * The beforeNewEvent and newEvent event is raised
     * and the event is saved in the backend server
     * @param customerId The event's customer id
     * @param productId The event's product id
     * @param comment The event's comment
     * @param start The event's start time
     * @param end The event's end time
     * @param employeeId The event's employee id
     */
    SalonErp.prototype.addEvent = function (customerId, productId, additionalProductIds, comment, start, end, employeeId) {
        var _this = this;
        var customer = this.allCustomers[customerId];
        var product = this.allProducts[productId];
        var newEvent = {
            id: -1,
            start: start,
            end: end,
            resource: "E",
            text: "",
            customer: customerId,
            product: productId,
            additionalProducts: additionalProductIds,
            employee: employeeId,
            comment: comment
        };
        if (customer != undefined && product != undefined) {
            newEvent.text = customer.name + ", " + product.name + ", " + newEvent.comment;
        }
        else {
            newEvent.text = "Customer or product undefined!";
        }
        return SalonErpEvents.beforeNewEvent.raise(newEvent).then(function (result) {
            if (result.indexOf(false) != -1)
                return Promise.reject(result);
            else
                return Promise.resolve();
        }).then(function () {
            return _this.backend.createEvent(newEvent);
        }).then(function (result) {
            newEvent.id = result.id;
            _this.allEvents.push(newEvent);
            return SalonErpEvents.newEvent.raise(newEvent);
        }).then(function () {
            return newEvent;
        });
    };
    /**
     * Opens the invoice with the given invoice id
     * @param invoice The invoice id to open
     */
    SalonErp.prototype.openInvoice = function (invoice) {
        return this.backend.saveInvoice(invoice).then(function () {
            window.open("invoice.php");
            console.log("Opening invoice");
        });
    };
    /**
     * Prints the invoice with the given invoice id
     * @param invoice The invoice id to print
     */
    SalonErp.prototype.printInvoice = function (invoice) {
        return this.backend.printInvoice(invoice).then(function () {
            console.log("Printing invoice");
        });
    };
    /**
     * Retrieves all the business data from the backend server:
     *  - employees
     *  - customers
     *  - products
     *  - product categories
     */
    SalonErp.prototype.update = function () {
        var _this = this;
        var employeePromise = this.backend.getEmployees().then(function (employees) {
            _this.setAllEmployees(employees);
            SalonErpEvents.employeesLoaded.raise(employees);
        });
        var customersPromise = this.backend.getCustomers().then(function (customers) {
            _this.setAllCustomers(customers);
            SalonErpEvents.customersLoaded.raise(customers);
        });
        var productsPromise = this.backend.getProducts().then(function (products) {
            _this.setAllProducts(products);
            SalonErpEvents.productsLoaded.raise(products);
        });
        var categoriesPromise = this.backend.getCategories().then(function (categories) {
            _this.setAllCategories(categories);
            SalonErpEvents.categoriesLoaded.raise(categories);
        });
        return Promise.all([employeePromise, customersPromise, productsPromise, categoriesPromise]);
    };
    /**
     * Shows the customers overview
     */
    SalonErp.prototype.showCustomers = function () {
        var _this = this;
        var view = new OverviewCustomers(this.allCustomers);
        view.onAddCustomer = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddCustomer(function (customer) {
                    if (customer == undefined)
                        reject("Canceled");
                    else
                        resolve(customer);
                });
            });
        };
        view.onEditCustomer = function (customer) {
            return new Promise(function (resolve, reject) {
                _this.showEditCustomer(customer, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.show();
        return view;
    };
    /**
     * Shows the products overview
     */
    SalonErp.prototype.showProducts = function () {
        var _this = this;
        var view = new OverviewProducts(this.allProducts, this.allCategories);
        view.onAddProduct = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddProduct(function (product) {
                    if (product == undefined)
                        reject("Canceled");
                    else
                        resolve(product);
                });
            });
        };
        view.onEditProduct = function (product) {
            return new Promise(function (resolve, reject) {
                _this.showEditProduct(product, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.show();
        return view;
    };
    /**
     * Shows the employees overview
     */
    SalonErp.prototype.showEmployees = function () {
        var _this = this;
        var view = new OverviewEmployees(this.allEmployees);
        view.onAddEmployee = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddEmployee(function (employee) {
                    if (employee == undefined)
                        reject("Canceled");
                    else
                        resolve(employee);
                });
            });
        };
        view.onEditEmployee = function (employee) {
            return new Promise(function (resolve, reject) {
                _this.showEditEmployee(employee, function (edited) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve();
                });
            });
        };
        view.show();
        return view;
    };
    /**
     * Shows the reports overview
     */
    SalonErp.prototype.showReports = function () {
        var _this = this;
        this.backend.getReports().then(function (reports) {
            var view = new OverviewReports(reports);
            view.onShowReport = function (report) {
                _this.showReport(report);
            };
            view.show();
        });
    };
    /**
     * Shows the given report
     * @param report The report to show
     */
    SalonErp.prototype.showReport = function (report) {
        var _this = this;
        var reportView = new ShowReport(report, this.allCustomers, this.allProducts);
        reportView.openReport.push(function (report, toAsk) { return _this.openReport(report, toAsk); });
        reportView.show();
    };
    /**
     * Shows the settinds view
     */
    SalonErp.prototype.showSettings = function () {
        var _this = this;
        var view = new OverviewSettings(this.settings);
        view.onSave.push(function (s) {
            _this.settings = s;
            return _this.backend.saveSettings(_this.settings).then(function () {
                return SalonErpEvents.newSettings.raise(s);
            });
        });
        view.onShowEmployees = function () {
            _this.showEmployees();
        };
        view.show();
        return view;
    };
    /**
     * Opens the given report with the given variables
     * @param report The report to open
     * @param toAsk The variables to use for the report
     */
    SalonErp.prototype.openReport = function (report, toAsk) {
        return this.backend.saveReport(report, toAsk).then(function () {
            window.open("report.php");
            console.log("Opening report");
        });
    };
    /**
     * Creates an invoice in the system
     * The invoice is saved in the backend server
     * @param e The event to create the invoice for
     * @param products The invoice lines
     * @param cash The amount of the invoice which was paid by cash
     * @param bank The amount ot the invoice which was paid by bank
     */
    SalonErp.prototype.createInvoice = function (e, products, cash, bank) {
        var _this = this;
        return this.backend.createInvoice(e, products, cash, bank).then(function (data) {
            e.invoicedate = new DayPilot.Date().toString();
            e.invoice = data.id;
            console.log("Invoice created.");
            if (_this.settings.printInvoice == "true")
                _this.printInvoice(data.id);
            if (_this.settings.openInvoice == "true")
                _this.openInvoice(data.id);
        });
    };
    /**
     * Loads all events for the given time range and employees
     * @param start The start time to load the events
     * @param end The end time to load the events
     * @param employeeIds The desired employees to load the events
     */
    SalonErp.prototype.loadEvents = function (start, end, employeeIds) {
        var _this = this;
        SalonErpEvents.eventsLoading.raise();
        var promises = employeeIds.map(function (employeeId) {
            return _this.backend.getEvents(start.toString(), end.toString(), employeeId).then(function (data) {
                data.forEach(function (element) {
                    var customer = _this.allCustomers[element.customer];
                    var product = _this.allProducts[element.product];
                    if (customer != undefined && product != undefined) {
                        element.comment = element.text;
                        element.text = customer.name + ", " + product.name + ", " + element.comment;
                    }
                    else {
                        element.text = "Customer or product undefined!";
                    }
                });
                return data;
            });
        });
        return Promise.all(promises);
    };
    return SalonErp;
}());
/// <reference path="salonerp.ts"/>
/**
 * This class contains all the logic to interact
 * with the SalonERP Admin GUI
 */
var SalonErpAdmin = /** @class */ (function () {
    /**
     * Default ctor
     */
    function SalonErpAdmin() {
        this.erp = new SalonErp();
        this.initEvents();
        this.erp.loadSettings();
    }
    /**
     * Initializes the events which are triggered by the SalonERP business logic
     */
    SalonErpAdmin.prototype.initEvents = function () {
        var _this = this;
        SalonErpEvents.newSettings.addHandler(function (settings) {
            if (settings == undefined)
                return Promise.reject("Settings are undefined");
            var promises = [];
            if (settings.language != undefined) {
                //Load language
                var promise = _this.loadLanguage(settings["language"]);
                promises.push(promise);
            }
            return Promise.all(promises).then(function () { return undefined; });
        });
    };
    /**
     * Loads the given language
     * @param lang The language to load
     */
    SalonErpAdmin.prototype.loadLanguage = function (lang) {
        return this.erp.backend.getLanguage(lang).then(function (data) {
            language = data;
            for (var word in language) {
                var elements = document.getElementsByClassName("language_" + word);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = language[word];
                }
            }
            console.log("Language " + lang + " loaded.");
        });
    };
    /**
     * Shows the admin database view
     */
    SalonErpAdmin.prototype.showAdminDatabase = function () {
        var _this = this;
        this.erp.backend.getDatabaseStatus().then(function (status) {
            var view = new AdminDatabase(status);
            view.onUpdateDatabase = function () {
                return _this.erp.backend.updateDatabase();
            };
            view.show();
        });
    };
    /**
     * Shows the admin database view
     */
    SalonErpAdmin.prototype.showInvoiceLayout = function () {
        var _this = this;
        this.erp.backend.getInvoiceLayouts().then(function (layouts) {
            var view = new AdminInvoiceLayout(layouts, _this.erp.settings.invoiceLayout);
            view.onEdit.push(function (layout) {
                _this.erp.settings.invoiceLayout = layout;
                return _this.erp.backend.saveSettings(_this.erp.settings).then(function () {
                    return SalonErpEvents.newSettings.raise(_this.erp.settings);
                });
            });
            view.onPreviewLayout = function (layout) {
                window.open("invoice.php?preview=" + encodeURI(layout));
            };
            view.show();
        });
    };
    return SalonErpAdmin;
}());
/**
 * This template class is used to trigger and handle events
 * One EventContainer is used for each event
 */
var EventContainer = /** @class */ (function () {
    /**
     * Default ctor
     * Initializes the event handlers array
     */
    function EventContainer() {
        this.handlers = [];
    }
    /**
     * Adds an event handler to the given event container
     * @param handler The event handler to add
     */
    EventContainer.prototype.addHandler = function (handler) {
        this.handlers.push(handler);
    };
    /**
     * Raises an event and notifies all subscribed handlers
     * @param arg1-10 The arguments which should be passed to the event handlers
     * @return A promise which is resolved when all handlers are resolved
     */
    EventContainer.prototype.raise = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        var promises = this.handlers.map(function (handler) {
            return handler(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
        });
        return Promise.all(promises);
    };
    /**
     * Removes the given handler from the list of subscribers
     * @param handler The handler to remove
     */
    EventContainer.prototype.removeHandler = function (handler) {
        this.handlers = this.handlers.filter(function (h) { return h != handler; });
    };
    return EventContainer;
}());
/// <reference path="models/event.container.ts"/>
/**
 * This class contains the events which are triggered by SalonERP
 */
var SalonErpEvents = /** @class */ (function () {
    function SalonErpEvents() {
    }
    /** Is raised before the events are loaded */
    SalonErpEvents.eventsLoading = new EventContainer();
    /** Is raised when the categories are loaded */
    SalonErpEvents.categoriesLoaded = new EventContainer();
    /** Is raised when the products are loaded */
    SalonErpEvents.productsLoaded = new EventContainer();
    /** Is raised when the customers are loaded */
    SalonErpEvents.customersLoaded = new EventContainer();
    /** Is raised when the employees are loaded */
    SalonErpEvents.employeesLoaded = new EventContainer();
    /** Is raised when a new customer is created */
    SalonErpEvents.newCustomer = new EventContainer();
    /** Is raised when a new product is created */
    SalonErpEvents.newProduct = new EventContainer();
    /** Is raised when a new employee is created */
    SalonErpEvents.newEmployee = new EventContainer();
    /** Is raised when a new category is created */
    SalonErpEvents.newCategory = new EventContainer();
    /** Is raised when a new event is created */
    SalonErpEvents.newEvent = new EventContainer();
    /** Is raised when new settings are loaded/created */
    SalonErpEvents.newSettings = new EventContainer();
    /** Is raised when an event is deleted */
    SalonErpEvents.deleteEvent = new EventContainer();
    /** Is raised when a customer is modified */
    SalonErpEvents.modifyCustomer = new EventContainer();
    /** Is raised when a product is modified */
    SalonErpEvents.modifyProduct = new EventContainer();
    /** Is raised when an employee is modified */
    SalonErpEvents.modifyEmployee = new EventContainer();
    /** Is raised when a category is modified */
    SalonErpEvents.modifyCategory = new EventContainer();
    /** Is raised when an event is modified */
    SalonErpEvents.modifyEvent = new EventContainer();
    /** Is raised when the time of an event is changed */
    SalonErpEvents.changeTime = new EventContainer();
    /** Is raised before a new customer is created. The process can be canceled by returning false */
    SalonErpEvents.beforeNewCustomer = new EventContainer();
    /** Is raised before a new product is created. The process can be canceled by returing false */
    SalonErpEvents.beforeNewProduct = new EventContainer();
    /** Is raised before a new employee is created. The process can be canceled by returing false */
    SalonErpEvents.beforeNewEmployee = new EventContainer();
    /** Is raised before a new category is created. The process can be canceled by returing false */
    SalonErpEvents.beforeNewCategory = new EventContainer();
    /** Is raised before a new event is created. The process can be canceled by returing false */
    SalonErpEvents.beforeNewEvent = new EventContainer();
    /** Is raised before an event is deleted. The process can be canceled by returing false */
    SalonErpEvents.beforeDeleteEvent = new EventContainer();
    /** Is raised before a customer is modified. The process can be canceled by returing false */
    SalonErpEvents.beforeModifyCustomer = new EventContainer();
    /** Is raised before a product is modified. The process can be canceled by returing false */
    SalonErpEvents.beforeModifyProduct = new EventContainer();
    /** Is raised before an employee is modified. The process can be canceled by returing false */
    SalonErpEvents.beforeModifyEmployee = new EventContainer();
    /** Is raised before a category is modified. The process can be canceled by returing false */
    SalonErpEvents.beforeModifyCategory = new EventContainer();
    /** Is raised before an event is modified. The process can be canceled by returing false */
    SalonErpEvents.beforeModifyEvent = new EventContainer();
    /** Is raised before the time of an event is changed. The process can be canceled by returing false */
    SalonErpEvents.beforeChangeTime = new EventContainer();
    return SalonErpEvents;
}());
/** The currently loaded language */
var language = {};
/** The frontend customizations */
var customizations = {};
/**
 * This function executes a customization if any
 * @param what The customzationsd key
 * @param data The data which is then passed to the customization
 */
function custom(what, data) {
    console.log("Custom: " + what);
    if (customizations[what] != undefined) {
        return customizations[what](data);
    }
}
/**
 * This class contains all the logic to interact
 * with the SalonERP GUI --> the menu and the
 * DayPilot calendars
 */
var SalonErpGui = /** @class */ (function () {
    /**
     * Constructs the SalonERP GUI and starts the update loop
     * @param navigators The query selector where the navigator should be placed
     * @param calendars The query selector where the calendars should be placed
     */
    function SalonErpGui(navigators, calendars) {
        var _this = this;
        /** The additional calendard */
        this.additionalDPs = [];
        this.erp = new SalonErp();
        //Create calendar elements
        this.calendarDescriptions = $('<div style="text-align:center"></div>');
        this.dpElement = $('<div id="dp" style="display:inline-block"></div>');
        this.allCalendars = $("#" + calendars);
        this.allCalendars.append(this.calendarDescriptions, this.dpElement);
        //Create the navigator
        this.nav = new DayPilot.Navigator(navigators);
        this.nav.selectMode = "day";
        this.nav.cellHeight = 30;
        this.nav.cellWidth = 30;
        //Create the main calendar
        this.dp = new SalonErpCalendar("dp");
        this.dp.viewType = "Week";
        this.nav.init();
        this.dp.init();
        //Register events
        this.initDPEvents();
        this.initErpEvents();
        //Start update loop
        this.erp.loadSettings().then(function () {
            _this.updateLoop();
        });
    }
    /**
     * "Glues" together the business logic with the GUI
     */
    SalonErpGui.prototype.initDPEvents = function () {
        var _this = this;
        //Load events when a time range was selected in the navigator
        this.nav.onTimeRangeSelected = function (args) {
            _this.dp.startDate = args.day;
            for (var i = 0; i < _this.additionalDPs.length; i++) {
                _this.additionalDPs[i].startDate = args.day;
            }
            _this.updateCalendar();
            _this.loadEvents();
        };
        //Prevent moving a paid event
        this.dp.onEventMove = function (args) {
            if (args.e.data.invoicedate != undefined) {
                alert(language.cantChangePaidEvent);
                args.preventDefault();
            }
        };
        //Prevent resizing a paid event
        this.dp.onEventResize = function (args) {
            if (args.e.data.invoicedate != undefined) {
                alert(language.cantChangePaidEvent);
                args.preventDefault();
            }
        };
        //Reschedule the event when it was moved in the calendar
        var temp = this;
        this.dp.onEventMoved = function (args) {
            temp.changeTime(args.e.data, args.newStart, args.newEnd, this.employee);
        };
        //Reschedule the event when it was resized in the calendar
        this.dp.onEventResized = function (args) {
            temp.changeTime(args.e.data, args.newStart, args.newEnd, this.employee);
        };
        //Create a new event when a timerange is selected
        this.dp.onTimeRangeSelected = function (args) {
            console.log(args);
            var currentDP = this;
            //Close all windows
            if (TWindow.areWindowsActive()) {
                TWindow.closeAll();
                return;
            }
            //Reschedule an event instead
            if (temp.isEventToReschedule()) {
                temp.reschedule(args, temp.getEventToReschedule(), currentDP);
                temp.clearEventToReschedule();
                return;
            }
            temp.erp.showAddEvent(args.start, 30, currentDP.employee);
        };
        //Edit an event if clicked
        this.dp.onEventClicked = function (args) {
            if (TWindow.areWindowsActive()) {
                TWindow.closeAll();
            }
            var event = args.e.data;
            var view = _this.erp.showEditEvent(event);
            view.onNewTime = function () {
                _this.eventToReschedule = event;
                view.close();
                alert(language.chooseNewTime);
            };
            view.onCopyEvent = function () {
                _this.eventToReschedule = event;
                view.close();
                alert(language.chooseTime);
            };
            view.onAddProduct = function () {
                return new Promise(function (resolve, reject) {
                    _this.erp.showAddProduct(function (product) {
                        if (product == undefined)
                            reject("Canceled");
                        else
                            resolve(product);
                    });
                });
            };
            view.onAddCustomer = function () {
                return new Promise(function (resolve, reject) {
                    _this.erp.showAddCustomer(function (customer) {
                        if (customer == undefined)
                            reject("Canceled");
                        else
                            resolve(customer);
                    });
                });
            };
        };
    };
    /**
     * Checks if an event exists to reschedule
     */
    SalonErpGui.prototype.isEventToReschedule = function () {
        return (this.eventToReschedule != undefined);
    };
    /**
     * Returns the event to reschedule
     */
    SalonErpGui.prototype.getEventToReschedule = function () {
        return this.eventToReschedule;
    };
    /**
     * Clears the event to reschedule
     */
    SalonErpGui.prototype.clearEventToReschedule = function () {
        this.eventToReschedule = undefined;
    };
    /**
     * Gets the current DayPilot locale
     */
    SalonErpGui.prototype.getDpLocale = function () {
        return DayPilot.Locale.all[this.dp.locale];
    };
    /**
     * Gets the DayPilot localized day name for the given day
     * @param day The day to translate
     */
    SalonErpGui.prototype.getDayName = function (day) {
        return DayPilot.Locale.all[this.dp.locale].dayNames[day];
    };
    /**
     * Gets the visible start of the calendar
     */
    SalonErpGui.prototype.getVisibleStart = function () {
        return this.dp.visibleStart();
    };
    /**
     * Get the current view type of SalonERP ("week" or "day")
     */
    SalonErpGui.prototype.getViewType = function () {
        return this.dp.viewType;
    };
    /**
     * Shows the customer overview
     */
    SalonErpGui.prototype.showCustomers = function () {
        if (TWindow.areWindowsActive()) {
            TWindow.closeAll();
        }
        return this.erp.showCustomers();
    };
    /**
     * Shows the products overview
     */
    SalonErpGui.prototype.showProducts = function () {
        if (TWindow.areWindowsActive()) {
            TWindow.closeAll();
        }
        return this.erp.showProducts();
    };
    /**
     * Shows the reports overview
     */
    SalonErpGui.prototype.showReports = function () {
        if (TWindow.areWindowsActive()) {
            TWindow.closeAll();
        }
        return this.erp.showReports();
    };
    /**
     * Shows the settings
     */
    SalonErpGui.prototype.showSettings = function () {
        if (TWindow.areWindowsActive()) {
            TWindow.closeAll();
        }
        return this.erp.showSettings();
    };
    /**
     * Initializes the events which are triggered by the SalonERP business logic
     */
    SalonErpGui.prototype.initErpEvents = function () {
        var _this = this;
        //Override settings when new loaded
        SalonErpEvents.newSettings.addHandler(function (settings) {
            if (settings == undefined)
                return Promise.reject("Settings are undefined");
            var promises = [];
            if (settings.theme != undefined) {
                _this.dp.theme = settings["theme"];
                for (var i = 0; i < _this.additionalDPs.length; i++) {
                    _this.additionalDPs[i].theme = settings["theme"];
                }
            }
            if (settings.language != undefined) {
                //Load language
                var promise = _this.loadLanguage(settings["language"]);
                promises.push(promise);
            }
            if (settings.startTime != undefined) {
                _this.dp.businessBeginsHour = parseInt(settings.startTime);
                for (var i = 0; i < _this.additionalDPs.length; i++) {
                    _this.additionalDPs[i].businessBeginsHour = parseInt(settings.startTime);
                }
            }
            if (settings.endTime != undefined) {
                _this.dp.businessEndsHour = parseInt(settings.endTime);
                for (var i = 0; i < _this.additionalDPs.length; i++) {
                    _this.additionalDPs[i].businessEndsHour = parseInt(settings.endTime);
                }
            }
            if (settings.showMonths != undefined) {
                _this.nav.showMonths = parseInt(settings.showMonths);
                _this.nav.skipMonths = parseInt(settings.showMonths);
                _this.nav.update();
            }
            if (settings.timeFormat != undefined) {
                _this.dp.timeFormat = settings.timeFormat;
                for (var i = 0; i < _this.additionalDPs.length; i++) {
                    _this.additionalDPs[i].timeFormat = settings.timeFormat;
                }
            }
            _this.updateCalendar();
            return Promise.all(promises).then(function () { return undefined; });
        });
        //Add event to calendar if new created in business logic
        SalonErpEvents.newEvent.addHandler(function (event) {
            if (event == undefined)
                return Promise.reject("Event is undefined");
            var currentDp = _this.getDpForEmployee(event.employee);
            if (currentDp == undefined)
                return Promise.reject("No dp found for employee " + event.employee);
            var e = new DayPilot.Event(event);
            currentDp.events.add(e);
            _this.updateCalendar();
            _this.clearSelection();
            return Promise.resolve();
        });
        //Delete event from calendar if removed from business loginc
        SalonErpEvents.deleteEvent.addHandler(function (event) {
            if (event == undefined)
                return Promise.reject("Event is undefined");
            _this.removeEvent(event);
            return Promise.resolve();
        });
        //Update procuct names in calendar in changed in business logic
        SalonErpEvents.modifyProduct.addHandler(function (product) {
            if (product == undefined)
                return Promise.reject("Product is undefined");
            _this.updateCalendar();
            return Promise.resolve();
        });
        //Update event in calendar if edited in business logic
        SalonErpEvents.modifyEvent.addHandler(function (event) {
            _this.updateCalendar();
            return Promise.resolve();
        });
    };
    /**
     * Gets the calendar for the given employee
     * @param employee The employee
     */
    SalonErpGui.prototype.getDpForEmployee = function (employee) {
        for (var i = 0; i < this.additionalDPs.length + 1; i++) {
            var currentDp = (i == 0) ? this.dp : this.additionalDPs[i - 1];
            if (currentDp.employee == employee)
                return currentDp;
        }
        return undefined;
    };
    /**
     * Reschedules (or creates new if already paid) the given event
     * @param args The DP event which contains the event to reschedule
     * @param  currentDP The calendar which triggered the reschedule event
     */
    SalonErpGui.prototype.reschedule = function (args, event, currentDP) {
        var duration = (event.end.getTotalTicks() - event.start.getTotalTicks()) / 60000;
        var end = args.start.addMinutes(duration);
        if (event.invoicedate == undefined) {
            this.removeEvent(event);
            this.changeTime(event, args.start, end, currentDP.employee);
            var e = new DayPilot.Event(event);
            currentDP.events.add(e);
            this.updateCalendar();
        }
        else {
            custom("productSelected", { event: event, product: event.product });
            custom("customerSelected", { event: event, customer: event.customer });
            custom("productAndCustomerSelected", { event: event, product: event.product, customer: event.customer });
            this.erp.addEvent(event.customer, event.product, event.additionalProducts, event.comment, args.start, end, currentDP.employee);
        }
        this.clearSelection();
    };
    /**
     * Changes the time and employyee id of the given event
     * @param event The event to change the time and employee id
     * @param newSTart The desired new start time
     * @param newEnd The new end time of the event
     * @param employeeId The new employee id of the event
     */
    SalonErpGui.prototype.changeTime = function (event, newStart, newEnd, employeeId) {
        var _this = this;
        this.erp.changeEventTime(event, newStart, newEnd, employeeId).then(function () {
            _this.updateCalendar();
        });
    };
    /**
     * Loads the given language and applies it to the GUI
     */
    SalonErpGui.prototype.loadLanguage = function (lang) {
        var _this = this;
        return this.erp.backend.getLanguage(lang).then(function (data) {
            language = data;
            for (var word in language) {
                var elements = document.getElementsByClassName("language_" + word);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = language[word];
                }
            }
            console.log("Setting dp language to " + language.calendarLocale);
            _this.nav.locale = language.calendarLocale;
            _this.dp.locale = language.calendarLocale;
            for (var i = 0; i < _this.additionalDPs.length; i++) {
                _this.additionalDPs[i].locale = language.calendarLocale;
            }
            _this.nav.update();
            _this.updateCalendar();
            console.log("Language " + lang + " loaded.");
        });
    };
    /**
     * Once called, this function runs every 5 minutes
     * and updates all the business data
     */
    SalonErpGui.prototype.updateLoop = function () {
        var _this = this;
        this.update();
        setTimeout(function () { return _this.updateLoop(); }, 300000);
    };
    /**
     * Updates the business data
     */
    SalonErpGui.prototype.update = function () {
        var _this = this;
        return this.erp.update().then(function () {
            _this.loadEvents();
        });
    };
    /**
     * Clears the selection in all calendars
     */
    SalonErpGui.prototype.clearSelection = function () {
        this.dp.clearSelection();
        for (var i = 0; i < this.additionalDPs.length; i++) {
            this.additionalDPs[i].clearSelection();
        }
    };
    /**
     * Removes the given event from the calendar
     * @param event The event to remove
     */
    SalonErpGui.prototype.removeEvent = function (event) {
        for (var i = 0; i < this.additionalDPs.length + 1; i++) {
            var currentDP = (i == 0) ? this.dp : this.additionalDPs[i - 1];
            var index = currentDP.events.list.indexOf(event);
            if (index != -1) {
                currentDP.events.list.splice(index, 1);
                currentDP.update();
                break;
            }
        }
        this.updateCalendar();
    };
    /**
     * Scrolls back one unit (= day or week)
     */
    SalonErpGui.prototype.previousDate = function () {
        var days = ((this.dp.viewType == "Week") ? 7 : 1);
        var newDay = this.nav.selectionStart.addDays(-days);
        this.nav.select(newDay);
    };
    /**
     * Scrolls forward one unit (= day or week)
     */
    SalonErpGui.prototype.nextDate = function () {
        var days = ((this.dp.viewType == "Week") ? 7 : 1);
        var newDay = this.nav.selectionStart.addDays(days);
        this.nav.select(newDay);
    };
    /**
     * A helper function which checks if which starts with str
     * @param which
     * @param str
     */
    SalonErpGui.prototype.stringStartsWith = function (which, str) {
        return which.indexOf(str) === 0;
    };
    /**
     * Updates the events with the colors of the products
     */
    SalonErpGui.prototype.updateCalendar = function () {
        var _this = this;
        this.dp.update();
        this.additionalDPs.forEach(function (additionalDp) { return additionalDp.update(); });
        var elements = $(".calendar_default_event_inner, .calendar_traditional_event_inner, .calendar_g_event_inner, .calendar_green_event_inner, .calendar_transparent_event_inner, .calendar_white_event_inner");
        elements.each(function (index, element) {
            var products = _this.erp.getAllProducts();
            for (var id in products) {
                if (element.innerHTML.indexOf(products[id].name) > -1) {
                    var color = products[id].color;
                    if (color != undefined) {
                        if (!_this.stringStartsWith(color, "#"))
                            color = "#" + color;
                        element.style.border = "2px solid " + color;
                    }
                }
            }
            ;
        });
        elements = $(".calendar_default_event, .calendar_traditional_event, .calendar_g_event, .calendar_green_event, .calendar_transparent_event, .calendar_white_event");
        elements.each(function (index, element) {
            console.log(element.style.left);
            //let left = (element.style.left == null) ? 0 : parseInt(element.style.left);
            //left = (dp.viewType == "Week") ? 0 : left / 4;
            var left = 0;
            element.style.left = left + "%";
            element.style.width = (90 - left) + "%";
        });
    };
    /**
     * Is triggered when an employee is selected
     * @param id The employee id
     */
    SalonErpGui.prototype.selectEmployee = function (id) {
        this.selectedEmployee = undefined;
        var employees = this.erp.getAllEmployees();
        this.selectedEmployee = employees[id];
        this.loadEvents();
    };
    /**
     * Changes the view type of the calendars
     * @param viewType The view type to display
     */
    SalonErpGui.prototype.setViewType = function (viewType) {
        this.dp.viewType = viewType;
        for (var i = 0; i < this.additionalDPs.length; i++) {
            this.additionalDPs[i].viewType = viewType;
        }
        this.updateCalendar();
        this.loadEvents();
    };
    /**
     * Loads the events for the selected employee(s)
     * and the selected time range
     */
    SalonErpGui.prototype.loadEvents = function () {
        var _this = this;
        var employees = this.erp.getAllEmployees();
        var employeeIds = Object.keys(employees);
        if (employeeIds.length == 0) {
            alert(language.pleaseCreateEmployees);
            return Promise.reject("No employees");
        }
        console.log("Loading events.");
        var start = this.dp.visibleStart();
        var end = this.dp.visibleEnd();
        this.calendarDescriptions.empty();
        if (this.selectedEmployee == undefined) {
            //Load employee overview (=all employees)
            this.calendarDescriptions.width("");
            var calendarDescriptions = this.calendarDescriptions;
            var width = (this.dp.viewType == "Week") ? "800px" : "800px";
            var calendarsPerRow = void 0;
            if (this.erp.settings.calendarsPerRow != undefined)
                calendarsPerRow = parseInt(this.erp.settings.calendarsPerRow);
            else
                calendarsPerRow = 10;
            //Create Calendars
            this.additionalDPs.forEach(function (dp) { return dp.dispose(); });
            this.additionalDPs = new Array(employeeIds.length - 1);
            for (var i = 0; i < this.allCalendars.get(0).children.length; i++) {
                var child = this.allCalendars.get(0).children.item(i);
                if (child !== this.dpElement.get(0) && child !== this.calendarDescriptions.get(0)) {
                    child.remove();
                    i--;
                }
            }
            for (var i = 0; i < employeeIds.length; i++) {
                if (i % calendarsPerRow == 0 && i != 0) {
                    this.allCalendars.append($("<br />"));
                    this.allCalendars.append($("<br />"));
                    this.allCalendars.append($("<br />"));
                    calendarDescriptions = $('<div style="text-align:center"></div>');
                    this.allCalendars.append(calendarDescriptions);
                }
                var dpElement = void 0;
                var currentDP = void 0;
                if (i > 0) {
                    dpElement = $('<div style="display:inline-block"></div>');
                    this.allCalendars.append(dpElement);
                    currentDP = new SalonErpCalendar(dpElement.get(0));
                    currentDP.startDate = this.dp.startDate;
                    currentDP.locale = this.dp.locale;
                    currentDP.viewType = this.dp.viewType;
                    currentDP.theme = this.dp.theme;
                    currentDP.timeFormat = this.dp.timeFormat;
                    currentDP.businessBeginsHour = this.dp.businessBeginsHour;
                    currentDP.businessEndsHour = this.dp.businessEndsHour;
                    currentDP.onEventMove = this.dp.onEventMove;
                    currentDP.onEventResize = this.dp.onEventResize;
                    currentDP.onEventMoved = this.dp.onEventMoved;
                    currentDP.onEventResized = this.dp.onEventResized;
                    currentDP.onTimeRangeSelected = this.dp.onTimeRangeSelected;
                    currentDP.onEventClicked = this.dp.onEventClicked;
                    currentDP.init();
                    this.additionalDPs[i - 1] = currentDP;
                }
                else {
                    dpElement = this.dpElement;
                    currentDP = this.dp;
                }
                currentDP.employee = employeeIds[i];
                dpElement.width(width);
                var nameCell = $('<div style="display:inline-block"></div>');
                nameCell.width(width);
                nameCell.html(employees[currentDP.employee].name);
                calendarDescriptions.append(nameCell);
            }
            //Insert events
            return this.erp.loadEvents(start, end, employeeIds).then(function (allEvents) {
                allEvents.forEach(function (events, index) {
                    var currentDP = (index == 0) ? _this.dp : _this.additionalDPs[index - 1];
                    currentDP.events.list = events;
                });
                _this.updateCalendar();
            });
        }
        else {
            //Remove additional calendars
            this.additionalDPs.forEach(function (calendar) {
                calendar.dispose();
            });
            this.additionalDPs = [];
            for (var i = 0; i < this.allCalendars.get(0).children.length; i++) {
                var child = this.allCalendars.get(0).children.item(i);
                if (child !== this.dpElement.get(0) && child !== this.calendarDescriptions.get(0)) {
                    child.remove();
                    i--;
                }
            }
            this.dpElement.width("100%");
            this.dp.employee = this.selectedEmployee.id;
            if (this.dp.viewType == "Week") {
                var locale = DayPilot.Locale.all[this.dp.locale];
                for (var i = 0; i < 7; i++) {
                    var index = locale.weekStarts + i;
                    if (index >= 7)
                        index -= 7;
                    var day = $('<div style="display:inline-block"></div>');
                    this.calendarDescriptions.append(day);
                    day.html(locale.dayNames[index]);
                    day.width("14.28571%");
                }
                this.calendarDescriptions.width("100%");
            }
            return this.erp.loadEvents(start, end, [this.dp.employee]).then(function (data) {
                _this.dp.events.list = data[0];
                _this.updateCalendar();
            });
        }
    };
    return SalonErpGui;
}());
/**
 * This is the base class of a twindow element
 * It provides basic common functionality
 */
var TWindowContentObject = /** @class */ (function () {
    /**
     * Constructs the content object using its definition and the parent twindow
     * @param definition The object definition
     * @param window The parent window
     */
    function TWindowContentObject(definition, window) {
        this.definition = definition;
        this.window = window;
    }
    /**
     * Initializes the content object. This function should
     * be overridden by the child class and the html element
     * should be created before calling parent.init
     */
    TWindowContentObject.prototype.init = function () {
        var _this = this;
        //Set the value
        if (this.definition.value != undefined) {
            if (this.setValue == undefined)
                console.log("No function setValue for element " + JSON.stringify(this));
            this.setValue(this.definition.value);
        }
        if (this.definition.className != undefined)
            this.htmlElement.className = this.definition.className;
        if (this.definition.id != undefined)
            this.htmlElement.id = this.definition.id;
        if (this.definition.customData != undefined)
            this.customData = this.definition.customData;
        //Set custom style
        if (this.definition.style != undefined) {
            this.definition.style.forEach(function (style) {
                _this.htmlElement.style[style.name] = style.value;
            });
        }
    };
    /**
     * Returns the content object definiton
     */
    TWindowContentObject.prototype.getObjectDefinition = function () {
        return this.definition;
    };
    /**
     * Hides the element. If hideParentIfSingleChild is set to
     * true, also the parent and its parents etc are hidden too
     * if the parent only contains a single child
     * @param hideParentIfSingleChild
     */
    TWindowContentObject.prototype.hide = function (hideParentIfSingleChild) {
        if (hideParentIfSingleChild === void 0) { hideParentIfSingleChild = false; }
        this.htmlElement.style.display = "none";
        if (hideParentIfSingleChild) {
            var parent_1 = this.htmlElement.parentElement;
            while (parent_1 != null && parent_1.childElementCount == 1 && parent_1.style.display != "none") {
                parent_1.style.display = "none";
                parent_1 = parent_1.parentElement;
            }
        }
    };
    /**
     * Shows the element. If showParentIfSingleChild is set to
     * true, also the parent and its parents etc are shown too
     * if the parent only contains a single child
     * @param showParentIfSingleChild
     */
    TWindowContentObject.prototype.show = function (showParentIfSingleChild) {
        if (showParentIfSingleChild === void 0) { showParentIfSingleChild = false; }
        this.htmlElement.style.display = "";
        if (showParentIfSingleChild) {
            var parent_2 = this.htmlElement.parentElement;
            while (parent_2 != null && parent_2.childElementCount == 1 && parent_2.style.display != "") {
                parent_2.style.display = "";
                parent_2 = parent_2.parentElement;
            }
        }
    };
    /**
     * Enables the element e.g input element
     */
    TWindowContentObject.prototype.enable = function () {
        this.setEnabled(true);
    };
    /**
     * Disables the element e.g input element
     */
    TWindowContentObject.prototype.disable = function () {
        this.setEnabled(false);
    };
    /**
     * Sets if the element should be enabled or not e.g. text element
     * @param enabled Whether to enable or not
     */
    TWindowContentObject.prototype.setEnabled = function (enabled) {
        if (enabled)
            this.htmlElement.removeAttribute("disabled");
        else
            this.htmlElement.setAttribute("disabled", "disabled");
    };
    /**
     * Sets the tooltip of the element
     * @param tooltip The tooptil of the element or undefined if it should be removed
     */
    TWindowContentObject.prototype.setTooltip = function (tooltip) {
        if (tooltip == undefined)
            this.htmlElement.removeAttribute("title");
        else
            this.htmlElement.setAttribute("title", tooltip);
    };
    return TWindowContentObject;
}());
/// <reference path="../../twindow/twindow.content.object.ts"/>
/**
 * This class is used to graphically modify the layout
 * of an invoice.
 * It is used like a canvas where all the different
 * invoice elements can be placed using drag and drop
 */
var InvoiceBoard = /** @class */ (function (_super) {
    __extends(InvoiceBoard, _super);
    /**
     * Constructs the invoice board
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceBoard(object, objects, twindow) {
        var _this = _super.call(this, object, twindow) || this;
        _this.objects = objects;
        /** All the invoice elements which are currently placed on the board */
        _this.invoiceElements = [];
        return _this;
    }
    /**
     * The generator function to generate the element
     * which is used by tWindow
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    InvoiceBoard.generatorFunction = function (object, objects, twindow) {
        return new InvoiceBoard(object, objects, twindow);
    };
    InvoiceBoard.prototype.init = function () {
        var _this = this;
        this.htmlElement = document.createElement("div");
        //Generate title html element
        this.title = document.createElement("p");
        this.title.innerHTML = this.definition.text;
        this.title.style.marginBottom = "0";
        this.htmlElement.appendChild(this.title);
        //Generate layout element
        this.layout = document.createElement("div");
        this.layout.style.overflow = "auto";
        this.layout.style.width = "400px";
        this.layout.style.border = "1px dotted grey";
        this.layout.style.whiteSpace = "pre";
        this.htmlElement.appendChild(this.layout);
        //enable dropping elements on the layout element
        this.layout.ondragover = function (event) { return _this.onDragOver(event); };
        this.layout.ondrop = function (event) { return _this.onDrop(event); };
        //Some default sizes for the different types of boards
        if (this.definition.text == "Body") {
            this.layout.style.height = "200px";
        }
        else {
            this.layout.style.height = "100px";
        }
        _super.prototype.init.call(this);
    };
    /**
     * Removes all invoice elements from the board
     */
    InvoiceBoard.prototype.clear = function () {
        this.layout.innerHTML = "";
        this.invoiceElements = [];
    };
    /**
     * Enables dropping on the layout element
     */
    InvoiceBoard.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    /**
     * Is called when an invoice element is dropped on the
     * board
     * @param event The drop event
     */
    InvoiceBoard.prototype.onDrop = function (event) {
        event.preventDefault();
        //Find invoice element from the data transfer
        var id = parseInt(event.dataTransfer.getData("text"));
        var invoiceElement = InvoiceElement.invoiceElements[id];
        var indexElement;
        if (this.containsElement(invoiceElement)) {
            //Find index if already present
            indexElement = this.invoiceElements.indexOf(invoiceElement);
        }
        else {
            //Add invoice element
            invoiceElement = this.addInvoiceElement(invoiceElement.getObjectDefinition());
            indexElement = this.invoiceElements.length - 1;
        }
        //Here we try to find a suitable position for the newly placed
        //invoice element by using the cursor's y position and the
        //other  element's y position.
        var indexTarget = 0;
        var containerY = this.layout.getBoundingClientRect().top;
        for (indexTarget = 0; indexTarget < this.invoiceElements.length; indexTarget++) {
            //Calculate y position of current invoice element
            var rect = this.invoiceElements[indexTarget].htmlElement.getBoundingClientRect();
            var y = rect.top - containerY;
            //Stop loop when the y position of the current invoice
            //element is bigger than the y position of the mouse
            if (event.offsetY < y)
                break;
        }
        if (indexTarget < this.invoiceElements.length) {
            //Move new invoice element between two other elements
            this.invoiceElements.splice(indexElement, 1);
            if (indexElement < indexTarget)
                indexTarget--;
            var targetElement = this.invoiceElements[indexTarget];
            this.invoiceElements.splice(indexTarget, 0, invoiceElement);
            this.layout.insertBefore(invoiceElement.htmlElement, targetElement.htmlElement);
        }
        else {
            //Move new invoice element to the end
            this.invoiceElements.splice(indexElement, 1);
            this.invoiceElements.push(invoiceElement);
            this.layout.appendChild(invoiceElement.htmlElement);
        }
    };
    /**
     * This function is called when in invoice element is dropped
     * on another invoice element which is already placed on the
     * board. The the dropped invoice element is placed at the
     * position where the other was
     * @param event The drop event
     * @param targetElement The element where the new element was placed
     */
    InvoiceBoard.prototype.onDropOnElement = function (event, targetElement) {
        event.preventDefault();
        //Stop propagation to prevent the board to receive the event
        event.stopPropagation();
        //Find element by the transfer data
        var id = parseInt(event.dataTransfer.getData("text"));
        var invoiceElement = InvoiceElement.invoiceElements[id];
        var indexElement;
        if (this.containsElement(invoiceElement)) {
            //Find index if already present
            indexElement = this.invoiceElements.indexOf(invoiceElement);
        }
        else {
            //Add element
            invoiceElement = this.addInvoiceElement(invoiceElement.getObjectDefinition());
            indexElement = this.invoiceElements.length - 1;
        }
        //Move element at the desired position
        this.invoiceElements.splice(indexElement, 1);
        var indexTarget = this.invoiceElements.indexOf(targetElement);
        this.invoiceElements.splice(indexTarget, 0, invoiceElement);
        this.layout.insertBefore(invoiceElement.htmlElement, targetElement.htmlElement);
    };
    /**
     * Adds the given element to the board.
     * The enableClick method is called on the new invoice
     * element which enables its modification.
     * Also the drop functions are registered which makes it
     * possible to drop other invoice elements on the new element.
     * @param definition The definition of the new invoice element
     */
    InvoiceBoard.prototype.addInvoiceElement = function (definition) {
        var _this = this;
        var newElement = this.window.createElement(definition, this.objects);
        this.layout.appendChild(newElement.htmlElement);
        newElement.enableClick();
        newElement.setPlacedBoard(this);
        if (definition.id != null) {
            this.objects[definition.id] = newElement;
        }
        this.invoiceElements.push(newElement);
        //Register drop events
        newElement.htmlElement.ondragover = function (event) { return _this.onDragOver(event); };
        newElement.htmlElement.ondrop = function (event) { return _this.onDropOnElement(event, newElement); };
        return newElement;
    };
    /**
     * Removes the given invoice element from the board
     * @param invoiceElement The element to remove
     */
    InvoiceBoard.prototype.removeInvoiceElement = function (invoiceElement) {
        var indexElement = this.invoiceElements.indexOf(invoiceElement);
        this.invoiceElements.splice(indexElement, 1);
        invoiceElement.htmlElement.remove();
    };
    /**
     * Checks whether the given element exists on the board
     * @param element The element to check
     */
    InvoiceBoard.prototype.containsElement = function (element) {
        return (this.invoiceElements.indexOf(element) !== -1);
    };
    /**
     * Iterates over all placed invoice elements
     */
    InvoiceBoard.prototype.forEach = function (callback) {
        this.invoiceElements.forEach(callback);
    };
    return InvoiceBoard;
}(TWindowContentObject));
/**
 * This is the base class for all invoice elements
 * which can be placed on the invoice boards to
 * compose the layout of the invoice
 */
var InvoiceElement = /** @class */ (function (_super) {
    __extends(InvoiceElement, _super);
    /**
     * Constructs the invoice element
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceElement(object, objects, twindow) {
        var _this = _super.call(this, object, twindow) || this;
        _this.invoiceElementId = InvoiceElement.invoiceElementCounter++;
        InvoiceElement.invoiceElements[_this.invoiceElementId] = _this;
        return _this;
    }
    InvoiceElement.prototype.init = function () {
        var _this = this;
        this.htmlElement = document.createElement("div");
        //Some predefined styles
        this.htmlElement.style.padding = "5px";
        this.htmlElement.style.border = "2px solid grey";
        this.htmlElement.style.margin = "5px";
        this.htmlElement.style.cursor = "grab";
        this.htmlElement.style.cssFloat = "left";
        this.htmlElement.style.width = "30px";
        this.htmlElement.style.height = "30px";
        //Make it draggable
        this.htmlElement.draggable = true;
        this.htmlElement.ondragstart = function (event) { return _this.onDragStart(event); };
        this.icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.htmlElement.appendChild(this.icon);
        _super.prototype.init.call(this);
    };
    /**
     * This function is called when the user drags the element.
     * It stores its id in the transfer data
     * @param event The drag event
     */
    InvoiceElement.prototype.onDragStart = function (event) {
        event.dataTransfer.setData("text", "" + this.invoiceElementId);
    };
    /**
     * Enables the onclick method so that the element can be modified
     */
    InvoiceElement.prototype.enableClick = function () {
        var _this = this;
        if (this.definition.target != undefined) {
            this.htmlElement.onclick = function () { return _this.definition.target(_this); };
            this.htmlElement.style.cursor = "pointer";
        }
    };
    /**
     * Disables clicking on the element
     */
    InvoiceElement.prototype.disableClick = function () {
        this.htmlElement.onclick = function () { };
        this.htmlElement.style.cursor = "grab";
    };
    /**
     * Sets the currenly placed board of the element
     * @param board The board
     */
    InvoiceElement.prototype.setPlacedBoard = function (board) {
        this.placedBoard = board;
    };
    /**
     * Checks whether the element is placed on a board or not
     */
    InvoiceElement.prototype.isPlacedOnBoard = function () {
        return (this.placedBoard != undefined);
    };
    /** Is used to generate unique invoice element ids to identify the elements by drag & drop */
    InvoiceElement.invoiceElementCounter = 0;
    /** Holds all invoice elements by their id */
    InvoiceElement.invoiceElements = {};
    return InvoiceElement;
}(TWindowContentObject));
/// <reference path="invoice.element.ts"/>
/**
 * This is a special invoice element. It removes
 * Other invoice elements from their board when they
 * are dropped on this element
 */
var InvoiceElementRemove = /** @class */ (function (_super) {
    __extends(InvoiceElementRemove, _super);
    /**
     * Constructs the invoice element
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceElementRemove(object, objects, twindow) {
        return _super.call(this, object, objects, twindow) || this;
    }
    /**
     * The generator function to generate the element
     * which is used by tWindow
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    InvoiceElementRemove.generatorFunction = function (object, objects, twindow) {
        return new InvoiceElementRemove(object, objects, twindow);
    };
    InvoiceElementRemove.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        //Disable dragging
        this.htmlElement.draggable = false;
        this.htmlElement.ondragstart = function () { };
        //Enable dropping
        this.htmlElement.ondragover = function (event) { return _this.onDragOver(event); };
        this.htmlElement.ondrop = function (event) { return _this.onDrop(event); };
        this.icon.setAttribute("viewBox", "0 0 512 512");
        this.icon.innerHTML = '<g><path d="M493.8,257.5c0,131.4-106.6,238-238,238s-238-106.6-238-238s106.6-238,238-238S493.8,126.1,493.8,257.5z" fill="#F06292"/></g><g><polygon fill="none" points="310.9,381.1    201.1,381.1 180.6,170.3 331.4,170.3  " stroke="#FFFFFF" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="16"/><line fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="16" x1="180.6" x2="160" y1="170.3" y2="170.3"/><line fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="16" x1="331.4" x2="352" y1="170.3" y2="170.3"/><rect fill="none" height="27.4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="16" width="51.4" x="230.1" y="142.9"/></g>';
    };
    /**
     * Enables dropping on the element
     * @param event The drag event
     */
    InvoiceElementRemove.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    /**
     * This function is called when an invoice element
     * is dragged on this element. Then the dragged element
     * is removed from its board
     * @param event
     */
    InvoiceElementRemove.prototype.onDrop = function (event) {
        event.preventDefault();
        //Find invoice element by the transfer data
        var id = parseInt(event.dataTransfer.getData("text"));
        var invoiceElement = InvoiceElement.invoiceElements[id];
        //Remove element from board
        if (invoiceElement.placedBoard != undefined)
            invoiceElement.placedBoard.removeInvoiceElement(invoiceElement);
    };
    InvoiceElementRemove.prototype.toString = function (textSettings) {
        throw "A remove element can not be converted to string";
    };
    return InvoiceElementRemove;
}(InvoiceElement));
/**
 * Represents an image which can be placed on an invoice
 */
var InvoiceImage = /** @class */ (function (_super) {
    __extends(InvoiceImage, _super);
    /**
     * Constructs the invoice element
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceImage(object, objects, twindow) {
        return _super.call(this, object, objects, twindow) || this;
    }
    /**
     * The generator function to generate the element
     * which is used by tWindow
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    InvoiceImage.generatorFunction = function (object, objects, twindow) {
        return new InvoiceImage(object, objects, twindow);
    };
    InvoiceImage.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setTooltip(language.image);
        this.icon.setAttribute("viewBox", "0 0 512 512");
        this.icon.innerHTML = '<path d="M336,272c0,44.188-35.813,80-80,80s-80-35.813-80-80s35.813-80,80-80S336,227.813,336,272z M512,144v256 c0,17.688-14.313,32-32,32H32c-17.688,0-32-14.313-32-32V144c0-17.688,14.313-32,32-32h32c0-17.688,14.328-32,32-32h32 c17.672,0,32,14.313,32,32h320C497.688,112,512,126.313,512,144z M368,272c0-61.75-50.25-112-112-112s-112,50.25-112,112 s50.25,112,112,112S368,333.75,368,272z M448,144h-64v32h64V144z"/>';
    };
    /**
     * Sets the server path of the image
     * @param path The path on the server of the image
     */
    InvoiceImage.prototype.setPath = function (path) {
        this.path = path;
    };
    /**
     * Sets the x position of the image
     * @param x The x position
     */
    InvoiceImage.prototype.setX = function (x) {
        this.x = x;
    };
    /**
     * Sets the y position of the image
     * @param y The y position
     */
    InvoiceImage.prototype.setY = function (y) {
        this.y = y;
    };
    /**
     * Sets the width of the image
     * @param width The width
     */
    InvoiceImage.prototype.setWidth = function (width) {
        this.width = width;
    };
    /**
     * Sets the height of the image
     * @param height The height
     */
    InvoiceImage.prototype.setHeight = function (height) {
        this.height = height;
    };
    InvoiceImage.prototype.toString = function (textSettings) {
        return [
            "image: path=" + this.path +
                ", x=" + this.x +
                ", y=" + this.y +
                ((this.width != undefined && this.width != "") ? ", width=" + this.width : "") +
                ((this.height != undefined && this.height != "") ? ", height=" + this.height : "")
        ];
    };
    return InvoiceImage;
}(InvoiceElement));
/**
 * This special invoice element represents a new line.
 * It actually just clears the css float to visually
 * create a new line
 */
var InvoiceNewline = /** @class */ (function (_super) {
    __extends(InvoiceNewline, _super);
    /**
     * Constructs the invoice element
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceNewline(object, objects, twindow) {
        return _super.call(this, object, objects, twindow) || this;
    }
    /**
     * The generator function to generate the element
     * which is used by tWindow
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    InvoiceNewline.generatorFunction = function (object, objects, twindow) {
        return new InvoiceNewline(object, objects, twindow);
    };
    InvoiceNewline.prototype.init = function () {
        _super.prototype.init.call(this);
        this.htmlElement.style.backgroundColor = "#FFAAAA";
        this.htmlElement.style.width = "10px";
        this.htmlElement.style.clear = "left";
        this.setTooltip(language.newline);
        this.icon.setAttribute("viewBox", "0 0 384 448");
        this.icon.innerHTML = '<path d="M 320,0 V 128 H 192 V 0 L 0,192 192,384 V 256 h 192 c 0,0 64,-0.375 64,-64 V 0 Z" id="path2" inkscape:connector-curvature="0" sodipodi:nodetypes="ccccccccscc" />';
    };
    InvoiceNewline.prototype.toString = function (textSettings) {
        return ["newline"];
    };
    return InvoiceNewline;
}(InvoiceElement));
/**
 * This invoice element represents the invoice lines
 * which are printed as a table
 */
var InvoiceProducts = /** @class */ (function (_super) {
    __extends(InvoiceProducts, _super);
    /**
     * Constructs the invoice element
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceProducts(object, objects, twindow) {
        return _super.call(this, object, objects, twindow) || this;
    }
    /**
     * The generator function to generate the element
     * which is used by tWindow
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    InvoiceProducts.generatorFunction = function (object, objects, twindow) {
        return new InvoiceProducts(object, objects, twindow);
    };
    InvoiceProducts.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setTooltip(language.products);
        this.icon.setAttribute("viewBox", "0 0 1000 1000");
        this.icon.innerHTML = '<g><path d="M177.5,592.2v161.5l323.9,127.8l325.1-131.7V587.3L990,517.9L825.4,349.4L990,190.9l-327-72.3L511.4,243.4L347.8,118.5L12.9,183.9l167.5,166.4h21.8l299.2-96.1l300.3,96.1L519.3,473.3L202.2,356.3v-15.8l-23.3,13.9L10,518.8L177.5,592.2z"/></g>';
    };
    /**
     * Sets the font to use to print the products table
     * @param font The font to use
     */
    InvoiceProducts.prototype.setFont = function (font) {
        this.font = font;
    };
    InvoiceProducts.prototype.toString = function (textSettings) {
        var lines = [];
        if (this.font != textSettings.font)
            lines.push("font: " + this.font);
        lines.push("products");
        return lines;
    };
    return InvoiceProducts;
}(InvoiceElement));
/**
 * This invoice element prints the tax line of the invoice
 */
var InvoiceTax = /** @class */ (function (_super) {
    __extends(InvoiceTax, _super);
    /**
     * Constructs the invoice element
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceTax(object, objects, twindow) {
        return _super.call(this, object, objects, twindow) || this;
    }
    /**
     * The generator function to generate the element
     * which is used by tWindow
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    InvoiceTax.generatorFunction = function (object, objects, twindow) {
        return new InvoiceTax(object, objects, twindow);
    };
    InvoiceTax.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setTooltip(language.tax);
        this.icon.setAttribute("viewBox", "0 0 64 64");
        this.icon.innerHTML = '<path d="M 20.330078 1.6601562 C 18.150078 1.5601562 16.010703 2.3600781 14.470703 3.8300781 C 12.900703 5.3300781 12.02 7.3595313 12 9.5195312 C 11.98 11.689531 12.809609 13.729766 14.349609 15.259766 C 16.929609 17.849766 20.970547 18.32 24.060547 16.5 L 26.390625 18.820312 L 23.289062 21.919922 C 23.265062 21.943922 23.257328 21.975 23.236328 22 L 3 22 C 1.35 22 0 23.35 0 25 L 0 57 C 0 58.65 1.35 60 3 60 L 61 60 C 62.65 60 64 58.65 64 57 L 64 25 C 64 23.35 62.65 22 61 22 L 40.880859 22 L 37.699219 18.820312 L 39.980469 16.539062 C 43.070469 18.359063 47.109219 17.900547 49.699219 15.310547 C 51.229219 13.770547 52.069063 11.730312 52.039062 9.5703125 C 52.019062 7.4003125 51.140312 5.3791406 49.570312 3.8691406 C 48.040312 2.3991406 45.870938 1.6192188 43.710938 1.6992188 C 41.520938 1.7892188 39.449063 2.7591406 38.039062 4.3691406 C 36.859063 5.6991406 36.170547 7.3803906 36.060547 9.1503906 L 32.050781 13.169922 L 27.980469 9.0996094 C 27.870469 7.3296094 27.179766 5.6503125 26.009766 4.3203125 C 24.589766 2.7203125 22.530078 1.7501563 20.330078 1.6601562 z M 20.25 3.6601562 C 21.9 3.7201563 23.449766 4.4503906 24.509766 5.6503906 C 25.459766 6.7203906 25.98 8.0990625 26 9.5390625 C 26 9.7990625 26.099062 10.050234 26.289062 10.240234 L 30.630859 14.580078 L 32.039062 15.990234 L 34.869141 18.820312 L 36.289062 20.240234 L 38.050781 22 L 40.050781 24 L 47.580078 31.529297 C 48.520078 32.469297 49.039063 33.730547 49.039062 35.060547 C 49.039062 36.060547 48.750703 37.010312 48.220703 37.820312 L 37.736328 27.337891 C 37.712328 27.310891 37.689109 27.285719 37.662109 27.261719 L 34.400391 24 L 32.050781 21.650391 L 29.220703 18.820312 L 27.810547 17.410156 L 24.900391 14.5 C 24.700391 14.31 24.449453 14.210938 24.189453 14.210938 C 23.979453 14.210938 23.769844 14.270156 23.589844 14.410156 C 21.219844 16.190156 17.859766 15.949609 15.759766 13.849609 C 14.609766 12.699609 13.98 11.169063 14 9.5390625 C 14.02 7.9190625 14.679609 6.3995312 15.849609 5.2695312 C 16.999609 4.1795313 18.59 3.5901563 20.25 3.6601562 z M 43.800781 3.6992188 C 45.450781 3.6192187 47.039453 4.2203125 48.189453 5.3203125 C 49.369453 6.4503125 50.029063 7.9598438 50.039062 9.5898438 C 50.059063 11.209844 49.439297 12.740625 48.279297 13.890625 C 46.189297 15.990625 42.820938 16.229219 40.460938 14.449219 C 40.060938 14.149219 39.500391 14.189062 39.150391 14.539062 L 36.289062 17.410156 L 33.460938 14.580078 L 37.75 10.279297 C 37.94 10.099297 38.050781 9.8400781 38.050781 9.5800781 C 38.060781 8.1500781 38.589062 6.7594531 39.539062 5.6894531 C 40.589062 4.4894531 42.140781 3.7692188 43.800781 3.6992188 z M 20.003906 5.6113281 C 18.979781 5.6113281 17.954328 6.0002969 17.173828 6.7792969 C 15.613828 8.3392969 15.613828 10.876547 17.173828 12.435547 C 17.929828 13.191547 18.933953 13.607422 20.001953 13.607422 C 21.070953 13.607422 22.075078 13.191547 22.830078 12.435547 C 24.390078 10.875547 24.390078 8.3382969 22.830078 6.7792969 C 22.051078 6.0002969 21.028031 5.6113281 20.003906 5.6113281 z M 44.041016 5.6542969 C 43.016641 5.6542969 41.991891 6.0427656 41.212891 6.8222656 C 39.653891 8.3822656 39.653891 10.921469 41.212891 12.480469 C 41.992891 13.260469 43.018016 13.648438 44.041016 13.648438 C 45.065016 13.648438 46.089141 13.259469 46.869141 12.480469 C 48.429141 10.920469 48.429141 8.3812656 46.869141 6.8222656 C 46.088641 6.0427656 45.065391 5.6542969 44.041016 5.6542969 z M 20.001953 7.609375 C 20.514953 7.609375 21.026016 7.8033594 21.416016 8.1933594 C 22.196016 8.9743594 22.196016 10.241484 21.416016 11.021484 C 20.660016 11.777484 19.343891 11.777484 18.587891 11.021484 C 17.807891 10.241484 17.807891 8.9733594 18.587891 8.1933594 C 18.977891 7.8033594 19.489953 7.609375 20.001953 7.609375 z M 44.042969 7.6523438 C 44.554969 7.6523438 45.065078 7.8463281 45.455078 8.2363281 C 46.234078 9.0163281 46.235078 10.286406 45.455078 11.066406 C 44.676078 11.844406 43.405953 11.846406 42.626953 11.066406 C 41.847953 10.286406 41.847953 9.0173281 42.626953 8.2363281 C 43.016953 7.8463281 43.529969 7.6523437 44.042969 7.6523438 z M 27.800781 20.240234 L 29.560547 22 L 26.039062 22 L 27.800781 20.240234 z M 3 24 L 31.570312 24 L 36 28.429688 L 36 30 C 36 30.023 36.011672 30.042453 36.013672 30.064453 C 35.076672 29.546453 34.065 29.1955 33 29.0625 L 33 28 C 33 27.447 32.553 27 32 27 C 31.447 27 31 27.447 31 28 L 31 29.0625 C 29.935 29.1955 28.923328 29.546453 27.986328 30.064453 C 27.988328 30.042453 28 30.023 28 30 L 28 28 C 28 27.447 27.553 27 27 27 C 26.447 27 26 27.447 26 28 L 26 30 C 26 30.44 26.287641 30.800547 26.681641 30.935547 C 23.989641 33.076547 22.199219 36.784 22.199219 41 C 22.199219 45.216 23.989641 48.923453 26.681641 51.064453 C 26.287641 51.199453 26 51.56 26 52 L 26 54 C 26 54.553 26.447 55 27 55 C 27.553 55 28 54.553 28 54 L 28 52 C 28 51.977 27.988328 51.957547 27.986328 51.935547 C 28.923328 52.453547 29.935 52.8045 31 52.9375 L 31 54 C 31 54.553 31.447 55 32 55 C 32.553 55 33 54.553 33 54 L 33 52.9375 C 34.065 52.8045 35.076672 52.453547 36.013672 51.935547 C 36.011672 51.957547 36 51.977 36 52 L 36 54 C 36 54.553 36.447 55 37 55 C 37.553 55 38 54.553 38 54 L 38 52 C 38 51.56 37.712359 51.199453 37.318359 51.064453 C 40.010359 48.923453 41.800781 45.216 41.800781 41 C 41.800781 36.784 40.010359 33.076547 37.318359 30.935547 C 37.598359 30.840547 37.821734 30.632422 37.927734 30.357422 L 47.580078 40.009766 C 47.770078 40.199766 48.019062 40.310547 48.289062 40.310547 C 48.549062 40.310547 48.810234 40.199766 48.990234 40.009766 C 50.320234 38.689766 51.039062 36.930547 51.039062 35.060547 C 51.039062 33.190547 50.320234 31.439375 48.990234 30.109375 L 42.880859 24 L 61 24 C 61.55 24 62 24.45 62 25 L 62 57 C 62 57.55 61.55 58 61 58 L 3 58 C 2.45 58 2 57.55 2 57 L 2 25 C 2 24.45 2.45 24 3 24 z M 17 27 C 16.447 27 16 27.447 16 28 L 16 30 C 16 30.553 16.447 31 17 31 C 17.553 31 18 30.553 18 30 L 18 28 C 18 27.447 17.553 27 17 27 z M 22 27 C 21.447 27 21 27.447 21 28 L 21 30 C 21 30.553 21.447 31 22 31 C 22.553 31 23 30.553 23 30 L 23 28 C 23 27.447 22.553 27 22 27 z M 7 28 C 6.447 28 6 28.447 6 29 C 6 29.553 6.447 30 7 30 L 12 30 C 12.553 30 13 29.553 13 29 C 13 28.447 12.553 28 12 28 L 7 28 z M 52 28 C 51.447 28 51 28.447 51 29 C 51 29.553 51.447 30 52 30 L 57 30 C 57.553 30 58 29.553 58 29 C 58 28.447 57.553 28 57 28 L 52 28 z M 32 31 C 36.301 31 39.800781 35.486 39.800781 41 C 39.800781 46.514 36.301 51 32 51 C 27.699 51 24.199219 46.514 24.199219 41 C 24.199219 35.486 27.699 31 32 31 z M 9 37 C 6.794 37 5 38.794 5 41 C 5 43.206 6.794 45 9 45 C 11.206 45 13 43.206 13 41 C 13 38.794 11.206 37 9 37 z M 55 37 C 52.794 37 51 38.794 51 41 C 51 43.206 52.794 45 55 45 C 57.206 45 59 43.206 59 41 C 59 38.794 57.206 37 55 37 z M 9 39 C 10.103 39 11 39.897 11 41 C 11 42.103 10.103 43 9 43 C 7.897 43 7 42.103 7 41 C 7 39.897 7.897 39 9 39 z M 55 39 C 56.103 39 57 39.897 57 41 C 57 42.103 56.103 43 55 43 C 53.897 43 53 42.103 53 41 C 53 39.897 53.897 39 55 39 z M 17 51 C 16.447 51 16 51.447 16 52 L 16 54 C 16 54.553 16.447 55 17 55 C 17.553 55 18 54.553 18 54 L 18 52 C 18 51.447 17.553 51 17 51 z M 22 51 C 21.447 51 21 51.447 21 52 L 21 54 C 21 54.553 21.447 55 22 55 C 22.553 55 23 54.553 23 54 L 23 52 C 23 51.447 22.553 51 22 51 z M 42 51 C 41.447 51 41 51.447 41 52 L 41 54 C 41 54.553 41.447 55 42 55 C 42.553 55 43 54.553 43 54 L 43 52 C 43 51.447 42.553 51 42 51 z M 47 51 C 46.447 51 46 51.447 46 52 L 46 54 C 46 54.553 46.447 55 47 55 C 47.553 55 48 54.553 48 54 L 48 52 C 48 51.447 47.553 51 47 51 z M 7 52 C 6.447 52 6 52.447 6 53 C 6 53.553 6.447 54 7 54 L 12 54 C 12.553 54 13 53.553 13 53 C 13 52.447 12.553 52 12 52 L 7 52 z M 52 52 C 51.447 52 51 52.447 51 53 C 51 53.553 51.447 54 52 54 L 57 54 C 57.553 54 58 53.553 58 53 C 58 52.447 57.553 52 57 52 L 52 52 z"/>';
    };
    /**
     * Sets the font to use to print the tax line
     * @param font The font to use
     */
    InvoiceTax.prototype.setFont = function (font) {
        this.font = font;
    };
    InvoiceTax.prototype.toString = function (textSettings) {
        var lines = [];
        if (this.font != textSettings.font)
            lines.push("font: " + this.font);
        lines.push("tax");
        return lines;
    };
    return InvoiceTax;
}(InvoiceElement));
/**
 * This invoice element represents a text which should
 * be printed on an invoice
 */
var InvoiceText = /** @class */ (function (_super) {
    __extends(InvoiceText, _super);
    /**
     * Constructs the invoice element
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    function InvoiceText(object, objects, twindow) {
        return _super.call(this, object, objects, twindow) || this;
    }
    /**
     * The generator function to generate the element
     * which is used by tWindow
     * @param object The object definition
     * @param objects The collection of objects
     * @param twindow The tWindow which generates the element
     */
    InvoiceText.generatorFunction = function (object, objects, twindow) {
        return new InvoiceText(object, objects, twindow);
    };
    InvoiceText.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setTooltip(language.text);
        this.icon.setAttribute("viewBox", "0 0 1000 1000");
        this.icon.innerHTML = '<g><g transform="translate(0.000000,375.000000) scale(0.100000,-0.100000)"><path d="M5420.9,2314.1c-97.6-51.6-116.7-183.6-38.3-254.4c21-19.1,93.7-40.2,185.6-49.7c290.8-36.3,524.1-195.1,646.6-445.7c82.3-162.6,105.2-298.4,105.2-617.9V711l-2911.5-3.8L495,701.5l-101.4-45.9C269.3,600.1,167.9,485.3,131.6,359c-42.1-141.6-42.1-3076,0-3217.6c38.3-128.1,137.7-241,262.1-294.6l101.4-44l2907.7-1.9l2907.7-1.9l5.7-210.4c1.9-114.8-1.9-277.4-13.4-361.6c-47.8-397.9-350.1-700.1-728.8-732.7c-172.2-15.3-237.2-59.3-237.2-166.4c0-45.9,13.4-84.2,42.1-112.9c38.3-36.3,61.2-42.1,179.8-38.3c319.5,9.6,610.2,164.5,837.9,449.5l72.7,89.9l78.4-103.3c181.7-239.1,480.1-403.6,807.2-440c168.3-21.1,246.8,32.5,246.8,164.5c0,101.4-61.2,137.7-265.9,158.8c-227.6,23-493.5,210.4-610.2,428.5c-80.4,151.1-103.3,292.7-95.7,606.4l5.7,267.8l1446.2,3.8l1446.2,1.9l97.6,49.7c118.6,59.3,206.6,164.5,243,286.9c42.1,141.6,42.1,3076,0,3217.6c-36.4,122.4-124.3,225.7-246.8,290.8l-97.6,51.7L8076,707.2l-1450,5.7v275.5c0,306.1,19.1,432.3,89.9,572c55.5,109,195.1,265.9,296.5,329c95.6,61.2,285,122.4,378.8,122.4c135.8,0,210.4,57.4,210.4,162.6c0,170.2-181.7,202.8-512.7,93.7c-221.9-72.7-409.4-204.7-541.4-382.6l-78.4-101.4l-72.7,89.9c-218.1,273.6-480.1,420.8-803.4,451.5C5506.9,2335.1,5453.4,2331.3,5420.9,2314.1z M6310.4-1249.7v-1626l-2882.8-5.7l-2880.9-3.8l-59.3,49.7l-59.3,49.8v1536.1V286.3l59.3,49.7l59.3,49.7l2880.9-3.8l2882.8-5.7V-1249.7z M9512.6,336.1l59.3-49.7V-1244v-1530.3l-55.5-55.5l-55.5-55.5H8043.5H6626v1635.6V385.8h1413.7h1413.7L9512.6,336.1z"/></g></g>';
    };
    /**
     * Sets the text. Also the preview of the
     * invoice element is changed to the text
     * @param text The text
     */
    InvoiceText.prototype.setText = function (text) {
        this.text = text;
        this.htmlElement.innerHTML = "";
        var preview = document.createElement("p");
        preview.innerHTML = text;
        this.htmlElement.style.width = null;
        this.htmlElement.appendChild(preview);
    };
    /**
     * Sets the font to use to print the text
     * @param font The font
     */
    InvoiceText.prototype.setFont = function (font) {
        this.font = font;
    };
    /**
     * Sets the text align to use to print the text
     * @param align The align
     */
    InvoiceText.prototype.setAlign = function (align) {
        this.align = align;
    };
    InvoiceText.prototype.toString = function (textSettings) {
        var lines = [];
        if (this.font != textSettings.font)
            lines.push("font: " + this.font);
        if (this.align != textSettings.align)
            lines.push("align: " + this.align);
        lines.push("text: " + this.text);
        return lines;
    };
    return InvoiceText;
}(InvoiceElement));
/**
 * The SalonERP calendar which contains
 * the employee id it belongs to
 */
var SalonErpCalendar = /** @class */ (function (_super) {
    __extends(SalonErpCalendar, _super);
    function SalonErpCalendar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SalonErpCalendar;
}(DayPilot.Calendar));
/**
 * This calss is the base class of all views (windows)
 * in SalonERP.
 */
var BaseView = /** @class */ (function () {
    /**
     * Constructs the view
     * @param title The title of the view/window
     */
    function BaseView(title) {
        var _this = this;
        this.objects = {};
        this.window = new TWindow(title);
        this.window.setCloseCallback(function () { return _this.onClosing(); });
        this.window.setOKCallback(function () { return _this.onOKClicked(); });
    }
    /**
     * Is called when the user tries to close the
     * window. This function can be overridden by
     * a subclass.
     * Closing the window can be prevented by returning
     * false in this function
     */
    BaseView.prototype.onClosing = function () {
        return true;
    };
    /**
     * Is called when the user clicks ok in the
     * window. This function can be overridden by
     * a subclass.
     * Closing the window can be prevented by returning
     * false in this function
     */
    BaseView.prototype.onOKClicked = function () {
        return true;
    };
    /**
     * This function is called when the window is showing.
     * A subclass should override this function to actually
     * add the content to the view.
     * Showing the window can be prevented by returing false
     * in this function.
     */
    BaseView.prototype.onShowing = function () {
        return true;
    };
    /**
     * This function shows the window.
     * It executes the customization functions,
     * calls this.onShowing and finally shows
     * the window.
     */
    BaseView.prototype.show = function () {
        custom("beforeShow" + this.getViewName(), this);
        if (!this.onShowing())
            return;
        this.window.show();
        custom("show" + this.getViewName(), this);
    };
    /**
     * This function closes the window.
     * It executes the customization function,
     * calls this.onCLosing and finally closes
     * the window
     */
    BaseView.prototype.close = function () {
        if (!this.onClosing())
            return;
        custom("close" + this.getViewName(), this);
        this.window.close();
    };
    return BaseView;
}());
/// <reference path="base.view.ts"/>
/**
 * Shows a window with an overview of the categories
 * Mandatory fields to set:
 *  - onAddCategory
 *  - onEditCategory
 */
var AddCategories = /** @class */ (function (_super) {
    __extends(AddCategories, _super);
    /**
     * Constructs the view
     * @param categories All categories which should appear in the overview
     */
    function AddCategories(categories, selectedCategories) {
        var _this = _super.call(this, language.categories) || this;
        _this.categories = categories;
        _this.selectedCategories = selectedCategories;
        /** These subscribers are called when the user presses "OK" */
        _this.onCategoriesSelected = [];
        //The layout of the view
        _this.allOptions = [
            [
                { type: "text", id: "search", placeholder: language.search },
                { type: "button", text: "+", target: function () { return _this.addCategory(); } }
            ]
        ];
        return _this;
    }
    AddCategories.prototype.getViewName = function () {
        return "AddCategories";
    };
    AddCategories.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        //Register delayed input event for the search field
        this.objects.search.onDelayedInput(function (value) { return _this.filter(value); });
        //Add all categories to the overview
        for (var id in this.categories)
            this.addNewCategory(this.categories[id]);
        return true;
    };
    /**
     * Adds a new category to the overview ("+" clicked)
     * by calling onAddCategory
     */
    AddCategories.prototype.addCategory = function () {
        var _this = this;
        this.onAddCategory().then(function (category) {
            if (category != undefined)
                _this.addNewCategory(category);
        });
    };
    /**
     * Edits the given category by calling onEditCategory
     * @param category The category to edit
     */
    AddCategories.prototype.editCategory = function (category) {
        var _this = this;
        this.onEditCategory(category).then(function () {
            _this.objects["text_category" + category.id].setText(category.name);
        });
    };
    /**
     * Adds the given category to the overview
     * @param category The category to add
     */
    AddCategories.prototype.addNewCategory = function (category) {
        var _this = this;
        this.rootElement.addRow([{
                id: "category" + category.id,
                type: "container",
                objects: [
                    {
                        type: "checkbox",
                        id: "checkbox_category" + category.id,
                        customData: category,
                        value: (this.selectedCategories.indexOf(category.id) == -1) ? "false" : "true"
                    }, {
                        type: "link",
                        id: "text_category" + category.id,
                        text: category.name,
                        target: function () { return _this.editCategory(category); }
                    }
                ],
                customData: category,
                settings: { colspan: 2 }
            }]);
    };
    /**
     * Filters the overview by the given criterie
     * @param value The criterie to filter
     */
    AddCategories.prototype.filter = function (value) {
        for (var id in this.objects) {
            if (id.indexOf("category") == 0) {
                if (value == "" || this.matchesCategory(value, this.objects[id].customData))
                    this.objects[id].show(true);
                else
                    this.objects[id].hide(true);
            }
        }
        this.window.adjustSize();
    };
    /**
     * Checks if the given category matches the given filter
     * @param filter The filter
     * @param category The category to check
     */
    AddCategories.prototype.matchesCategory = function (filter, category) {
        return this.matchesString(filter, category.name);
    };
    /**
     * Checks if the lowercase value contains the lowercase filter
     * @param filter
     * @param value
     */
    AddCategories.prototype.matchesString = function (filter, value) {
        if (filter == undefined || value == undefined) {
            return false;
        }
        return value.toLowerCase().indexOf(filter.toLowerCase()) != -1;
    };
    AddCategories.prototype.onOKClicked = function () {
        var selectedCategories = [];
        for (var id in this.objects) {
            if (id.indexOf("checkbox_category") == 0) {
                var category = this.objects[id].customData;
                var checked = this.objects[id].getBooleanValue();
                if (checked) {
                    selectedCategories.push(category);
                }
            }
        }
        //Notify subsribers
        this.onCategoriesSelected.forEach(function (handler) {
            handler(selectedCategories);
        });
        return true;
    };
    return AddCategories;
}(BaseView));
/// <reference path="base.view.ts"/>
/**
 * This view shows the window to add an additional
 * invoice line (=product/treatment)
 * Mandatory fields to set:
 *  - onAddProduct
 */
var AddInvoiceLine = /** @class */ (function (_super) {
    __extends(AddInvoiceLine, _super);
    /**
     * Constructs the view
     * @param allProducts All products which should appear in the list
     */
    function AddInvoiceLine(allProducts) {
        var _this = _super.call(this, language.additionalProduct) || this;
        _this.allProducts = allProducts;
        /** These subscribers are called when the user presses "OK" */
        _this.onAdd = [];
        var products = [];
        for (var id in allProducts) {
            products.push({
                value: id,
                text: allProducts[id].name
            });
        }
        //The layout of the view
        _this.allOptions = [
            [
                { type: "label", text: language.product },
                { id: "product", type: "searchselect", options: products },
                { type: "button", text: "+", target: function () { return _this.addProduct(); } }
            ]
        ];
        return _this;
    }
    AddInvoiceLine.prototype.getViewName = function () {
        return "AddInvoiceLine";
    };
    /**
     * Overrides BaseView.
     * Adds the content as table
     */
    AddInvoiceLine.prototype.onShowing = function () {
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        return true;
    };
    /**
     * Is executed when pressing the "+" button.
     * Calls the onAddProduct promise and adds
     * the resulting product to the list
     */
    AddInvoiceLine.prototype.addProduct = function () {
        var _this = this;
        this.onAddProduct().then(function (product) {
            _this.objects.product.addOption({
                value: product.id,
                text: product.name
            });
            _this.objects.product.setValue(product.id);
        });
    };
    /**
     * Overrides BaseView.
     * Notifies all subscribers with the selected product
     */
    AddInvoiceLine.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var productId = this.objects.product.getValue();
        var product = this.allProducts[productId];
        if (product == undefined) {
            alert(language.chooseProduct);
            return false;
        }
        //NOtify subscribers
        this.onAdd.forEach(function (handler) {
            handler(product);
        });
        return true;
    };
    return AddInvoiceLine;
}(BaseView));
/**
 * Shows the window the edit or create a category
 */
var EditCategory = /** @class */ (function (_super) {
    __extends(EditCategory, _super);
    /**
     * COnstructs the view
     *@param category The optional category to edit
     */
    function EditCategory(category) {
        var _this = _super.call(this, language.category) || this;
        _this.category = category;
        /** These subscribers are called when the user presses "OK" */
        _this.onCreate = [];
        //The layout of the view
        _this.allOptions = [
            { name: language.name, value: { id: "name", type: "text", value: ((category != undefined) ? category.name : undefined) } }
        ];
        return _this;
    }
    EditCategory.prototype.getViewName = function () {
        return "EditCategory";
    };
    EditCategory.prototype.onShowing = function () {
        //Creating the view fromthe layout
        this.rootElement = this.window.addNameValueContent(this.allOptions, this.objects);
        return true;
    };
    EditCategory.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var name = this.objects.name.getValue();
        if (name == "") {
            alert(language.provideOneValue);
            return false;
        }
        //Notify subsribers
        this.onCreate.forEach(function (handler) {
            handler(name);
        });
        return true;
    };
    return EditCategory;
}(BaseView));
/**
 * Shows the window to edit or create a customer
 */
var EditCustomer = /** @class */ (function (_super) {
    __extends(EditCustomer, _super);
    /**
     * Constructs the view
     * @param customer The optional customer to edit
     */
    function EditCustomer(customer) {
        var _this = _super.call(this, language.customer) || this;
        _this.customer = customer;
        /** These subscribers are called when the user presses OK */
        _this.onCreate = [];
        //The layout of the view
        _this.allOptions = [
            { name: language.firstname, value: { id: "firstname", type: "text", value: ((customer != undefined) ? customer.firstname : undefined) } },
            { name: language.lastname, value: { id: "lastname", type: "text", value: ((customer != undefined) ? customer.lastname : undefined) } },
            { name: language.comment, value: { id: "comment", type: "textarea", value: ((customer != undefined) ? customer.comment : undefined) } },
            { name: language.address, value: { id: "address", type: "text", value: ((customer != undefined) ? customer.address : undefined) } },
            { name: language.telephone, value: { id: "telephone", type: "text", value: ((customer != undefined) ? customer.telephone : undefined) } },
            { name: language.email, value: { id: "email", type: "text", value: ((customer != undefined) ? customer.email : undefined) } }
        ];
        return _this;
    }
    EditCustomer.prototype.getViewName = function () {
        return "EditCustomer";
    };
    EditCustomer.prototype.onShowing = function () {
        //Creating the view fromthe layout
        this.rootElement = this.window.addNameValueContent(this.allOptions, this.objects);
        return true;
    };
    EditCustomer.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var firstname = this.objects.firstname.getValue();
        var lastname = this.objects.lastname.getValue();
        if (firstname == "" && lastname == "") {
            alert(language.provideOneValue);
            return false;
        }
        var comment = this.objects.comment.getValue();
        var address = this.objects.address.getValue();
        var telephone = this.objects.telephone.getValue();
        var email = this.objects.email.getValue();
        //Notify subsribers
        this.onCreate.forEach(function (handler) {
            handler(firstname, lastname, comment, address, telephone, email);
        });
        return true;
    };
    return EditCustomer;
}(BaseView));
/**
 * Shows the window the edit or create an employee
 */
var EditEmployee = /** @class */ (function (_super) {
    __extends(EditEmployee, _super);
    /**
     * COnstructs the view
     *@param employee The optional employee to edit
     */
    function EditEmployee(employee) {
        var _this = _super.call(this, language.employee) || this;
        _this.employee = employee;
        /** These subscribers are called when the user presses "OK" */
        _this.onCreate = [];
        //The layout of the view
        _this.allOptions = [
            { name: language.name, value: { id: "name", type: "text", value: ((employee != undefined) ? employee.name : undefined) } },
            { name: language.address, value: { id: "address", type: "text", value: ((employee != undefined) ? employee.address : undefined) } },
            { name: language.telephone, value: { id: "telephone", type: "text", value: ((employee != undefined) ? employee.telephone : undefined) } },
            { name: language.email, value: { id: "email", type: "text", value: ((employee != undefined) ? employee.email : undefined) } }
        ];
        return _this;
    }
    EditEmployee.prototype.getViewName = function () {
        return "EditEmployee";
    };
    EditEmployee.prototype.onShowing = function () {
        //Creating the view fromthe layout
        this.rootElement = this.window.addNameValueContent(this.allOptions, this.objects);
        return true;
    };
    EditEmployee.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var name = this.objects.name.getValue();
        if (name == "") {
            alert(language.provideOneValue);
            return false;
        }
        var address = this.objects.address.getValue();
        var telephone = this.objects.telephone.getValue();
        var email = this.objects.email.getValue();
        //Notify subsribers
        this.onCreate.forEach(function (handler) {
            handler(name, address, telephone, email);
        });
        return true;
    };
    return EditEmployee;
}(BaseView));
/**
 * Shows the window to edit or create an event
 * Mandatory fields to set:
 *  - onNewTime (only if an event is edited)
 *  - onCopyEvent (only if the invoice id is set in the event)
 *  - onAddProduct
 *  - onAddCustomer
 *  - onEditProduct
 *  - onEditCustomer
 *  - onOpenInvoice (only if the invoice id is set in the event)
 *  - onPrintInvoice (only if the invoice id is set in the event)
 *  - onCancelEvent (only if no id is set in the invoice)
 */
var EditEvent = /** @class */ (function (_super) {
    __extends(EditEvent, _super);
    /**
     * Constructs the view
     * @param startTime The start time of the event
     * @param time The duration in minutes
     * @param allCustomers All customers which should appear in the list
     * @param allProducts All products which should appear in the list
     * @param event The optional event to edit
     */
    function EditEvent(startTime, time, allCustomers, allProducts, event) {
        var _this = _super.call(this, language.event) || this;
        _this.startTime = startTime;
        _this.time = time;
        _this.allCustomers = allCustomers;
        _this.allProducts = allProducts;
        _this.event = event;
        /** These subscribers are called when the user presses "OK" */
        _this.okClicked = [];
        /** These subscribers are called when the user presses "OK" in the payment window */
        _this.onPaid = [];
        _this.additionalProducts = [];
        //Construct a value-text pair of the customers
        var customers = [];
        for (var id in allCustomers) {
            customers.push({
                value: id,
                text: allCustomers[id].name
            });
        }
        //Construct a value-text pair of all products
        _this.productsList = [];
        for (var id in allProducts) {
            _this.productsList.push({
                value: id,
                text: allProducts[id].name
            });
        }
        //Construct a value-text pair of all possible start times
        var startTimes = [];
        var tempStartTime = new DayPilot.Date(startTime);
        tempStartTime = tempStartTime.addHours(-tempStartTime.getHours());
        tempStartTime = tempStartTime.addMinutes(-tempStartTime.getMinutes());
        tempStartTime = tempStartTime.addSeconds(-tempStartTime.getSeconds());
        for (var i = 0; i < 24 * 4; i++) {
            var hour = tempStartTime.getHours();
            var minute = tempStartTime.getMinutes();
            startTimes.push({ value: tempStartTime.toString(), text: ((hour < 10) ? "0" + hour : hour) + ":" + ((minute < 10) ? "0" + minute : minute) });
            tempStartTime = tempStartTime.addMinutes(15);
        }
        //Construct a value-text pair of all possible durations
        var times = [];
        for (var i = 15; i < 135; i += 15) {
            times.push({
                value: "" + i,
                text: i + " " + language.minutesShort
            });
        }
        //Convert the event's start and end time to a duration in minutes
        var currentDuration = undefined;
        if (event != undefined) {
            var milli = new Date(event.end).getTime() - new Date(event.start).getTime();
            currentDuration = milli / 60000;
        }
        //The layout of the view
        _this.allOptions = [
            [
                { type: "link", target: function () { return _this.editCustomer(); }, text: language.customer },
                { id: "customer", type: "searchselect", value: ((event != undefined) ? event.customer : undefined), options: customers },
                { type: "button", target: function () { return _this.addCustomer(); }, text: "+" }
            ], [
                { type: "link", target: function () { return _this.editProduct(); }, text: language.treatment },
                { id: "product", type: "searchselect", value: ((event != undefined) ? event.product : undefined), options: _this.productsList },
                { type: "button", target: function () { return _this.addProduct(); }, text: "+" }
            ], [
                { type: "label", text: language.additionalProducts, settings: { rowspan: 2 } },
                { type: "container", id: "additionalProducts" }
            ], [
                { type: "button", text: "+", target: function () { return _this.addAdditionalProduct(); } }
            ], [
                { type: "label", text: language.comment },
                { id: "comment", type: "textarea", value: ((event != undefined) ? event.comment : undefined) }
            ], [
                { type: "label", text: language.startTime },
                { id: "startTime", type: "select", options: startTimes, value: startTime.toString() }
            ], [
                { type: "label", text: language.duration },
                { id: "duration", type: "select", options: times, value: (currentDuration != undefined) ? currentDuration.toString() : undefined }
            ], [
                { id: "notPaid", type: "container", settings: { colspan: 3 }, objects: [
                        { type: "button", target: function () { return _this.showPayWindow(); }, text: language.pay },
                        { type: "button", target: function () { return _this.cancelEvent(); }, text: language.cancelEvent },
                        { type: "button", target: function () { return _this.newTime(); }, text: language.newTime }
                    ] }
            ], [
                { id: "paid", type: "container", settings: { colspan: 3 }, objects: [
                        { type: "label", text: ((event != undefined && event.invoicedate) ? _this.getHumanReadableDate(event.invoicedate) : "") },
                        { type: "button", target: function () { return _this.copyEvent(); }, text: language.copy },
                        { type: "button", target: function () { return _this.openInvoice(); }, text: language.openInvoice },
                        { type: "button", target: function () { return _this.printInvoice(); }, text: language.printInvoice }
                    ] }
            ]
        ];
        return _this;
    }
    EditEvent.prototype.getViewName = function () {
        return "EditEvent";
    };
    EditEvent.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        //Register a change event when the selected product changes
        this.objects.product.onChange(function (value) {
            var selectedProduct = _this.allProducts[value];
            if (selectedProduct != undefined) {
                //Update the default duration of the event
                _this.objects.duration.setValue("" + selectedProduct.duration);
                //Call the custom functions
                custom("productSelected", { event: event, product: value });
                if (_this.objects.customer.getValue() != undefined) {
                    custom("productAndCustomerSelected", { event: event, product: value, customer: _this.objects.customer.getValue() });
                }
            }
            else
                console.log("Product is undefined");
        });
        //Register a change event when the selected customer changes
        this.objects.customer.onChange(function (value) {
            //Call custom functions
            custom("customerSelected", { event: event, customer: value });
            if (_this.objects.product != undefined) {
                custom("productAndCustomerSelected", { event: event, product: _this.objects.product.getValue(), customer: value });
            }
        });
        if (this.event == undefined) {
            //Hide some parts of the view if we're creating a new event
            this.objects["notPaid"].hide();
            this.objects["paid"].hide();
        }
        else {
            if (this.event.invoicedate == undefined) {
                //Hide the paid parts of the view if the event is not yet paid
                this.objects["paid"].hide();
            }
            else {
                //Hide the noPaid parts of the view if the event is paid
                this.window.setOKButtonVisible(false);
                this.objects["notPaid"].hide();
            }
            //Add all additional products
            this.event.additionalProducts.forEach(function (productId) {
                _this.addAdditionalProduct(_this.allProducts[productId]);
            });
        }
        return true;
    };
    /**
     * Adds an additional product to the event
     * @param product Optional product
     */
    EditEvent.prototype.addAdditionalProduct = function (product) {
        var additionalProduct = this.objects.additionalProducts.addObject({
            type: "searchselect",
            value: (product != undefined) ? product.id : undefined,
            options: this.productsList
        });
        this.additionalProducts.push(additionalProduct);
    };
    /**
     * Converts an ISO date string to a human readable date
     * @param str The ISO date
     */
    EditEvent.prototype.getHumanReadableDate = function (str) {
        var d = str.toString().replace(" ", "T");
        var date = new Date(d);
        return ((date.getDate() < 10) ? "0" : "") + date.getDate() + "." +
            (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + "." +
            (date.getFullYear());
    };
    /**
     * Edits the currently selected customer
     * by calling the onEditCustomer field
     */
    EditEvent.prototype.editCustomer = function () {
        var customerId = this.objects.customer.getValue();
        var customer = this.allCustomers[customerId];
        if (customer != undefined)
            this.onEditCustomer(customer).then(function () { });
        else
            console.log("Customer is undefined");
    };
    /**
     * Edits the currently selected product
     * by calling the onEditProduct field
     */
    EditEvent.prototype.editProduct = function () {
        var productId = this.objects.product.getValue();
        var product = this.allProducts[productId];
        if (product != undefined)
            this.onEditProduct(product).then(function () { });
        else
            console.log("Product is undefined");
    };
    /**
     * Shows the pay window for the current event
     */
    EditEvent.prototype.showPayWindow = function () {
        var view = new Pay(this.event, this.allProducts, this.allCustomers, this);
        view.onPaid = this.onPaid;
        view.onAddProduct = this.onAddProduct;
        view.show();
    };
    /**
     * Opens the invoice for the current event
     * by calling onOpenInvoice
     */
    EditEvent.prototype.openInvoice = function () {
        this.onOpenInvoice(this.event.invoice);
    };
    /**
     * Prints the invoice of the current event
     * by calling onPrintInvoice
     */
    EditEvent.prototype.printInvoice = function () {
        this.onPrintInvoice(this.event.invoice);
    };
    /**
     * Removes the current event
     * by calling onCancelEvent
     */
    EditEvent.prototype.cancelEvent = function () {
        var _this = this;
        if (confirm(language.sureToCancelEvent)) {
            this.onCancelEvent().then(function () {
                console.log("Event canceled");
                _this.window.close();
            });
        }
    };
    /**
     * Chooses a new time for the event
     * by calling onNewTime
     */
    EditEvent.prototype.newTime = function () {
        this.onNewTime();
    };
    ;
    /**
     * Copies the event by calling
     * onCopyEvent
     */
    EditEvent.prototype.copyEvent = function () {
        this.onCopyEvent();
    };
    ;
    /**
     * Adds a new product to the list of products
     * ("+" clicked) by calling onAddProduct
     */
    EditEvent.prototype.addProduct = function () {
        var _this = this;
        this.onAddProduct().then(function (product) {
            if (product != undefined) {
                var newOption_1 = {
                    value: product.id,
                    text: product.name
                };
                //Add new option to all additional products search selects
                _this.additionalProducts.forEach(function (additionalProduct) {
                    additionalProduct.addOption(newOption_1);
                });
                //Add new product to main search select an select it
                _this.objects.product.addOption(newOption_1);
                _this.objects.product.setValue(product.id);
            }
        });
    };
    ;
    /**
     * Adds a new customer to the list of customers
     * ("+" clicked) by calling onAddCustomer
     */
    EditEvent.prototype.addCustomer = function () {
        var _this = this;
        this.onAddCustomer().then(function (customer) {
            if (customer != undefined) {
                _this.objects.customer.addOption({
                    value: customer.id,
                    text: customer.name
                });
                _this.objects.customer.setValue(customer.id);
            }
        });
    };
    ;
    EditEvent.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        if (this.event != undefined && this.event.invoicedate != undefined) {
            alert(language.cantChangePaidEvent);
            return false;
        }
        var customer = this.objects.customer.getValue();
        var product = this.objects.product.getValue();
        if (customer == undefined || product == undefined) {
            alert(language.customerProductNeeded);
            return false;
        }
        var additionalProducts = this.additionalProducts.map(function (product) { return product.getValue(); }).filter(function (product) { return product != undefined; });
        var text = this.objects.comment.getValue();
        var newStartTime = this.objects.startTime.getValue();
        newStartTime = newStartTime.split(".")[0];
        var newDuration = this.objects.duration.getValue();
        //Notify subscribers
        this.okClicked.forEach(function (handler) {
            handler(customer, product, additionalProducts, text, newStartTime, parseInt(newDuration));
        });
        return true;
    };
    return EditEvent;
}(BaseView));
/**
 * Shows the window to edit or create a product
 * Mandatory fields:
 *  - onAddCategory
 *  - onEditCategory
 */
var EditProduct = /** @class */ (function (_super) {
    __extends(EditProduct, _super);
    /**
     * Constructs the view
     * @param allCategories All categories which should appear in the select
     * @param product The optional product to edit
     */
    function EditProduct(allCategories, product) {
        var _this = _super.call(this, language.product) || this;
        _this.allCategories = allCategories;
        _this.product = product;
        /** These subscribers are called when the user presses "OK" */
        _this.onCreate = [];
        //Generate a value-text pair of all possible durations
        var durations = [];
        for (var i = 15; i < 135; i += 15) {
            durations.push({
                value: "" + i,
                text: i + " min"
            });
        }
        //The layout of the view
        _this.allOptions = [
            [
                { type: "label", text: language.name },
                { id: "name", type: "text", value: ((product != undefined) ? product.name : undefined) }
            ], [
                { type: "label", text: language.duration },
                { id: "duration", type: "select", options: durations, value: ((product != undefined && product.duration != undefined) ? product.duration.toString() : undefined) }
            ], [
                { type: "label", text: language.price },
                { id: "price", type: "text", value: ((product != undefined && product.price != undefined) ? product.price.toString() : undefined) }
            ], [
                { type: "label", text: language.color },
                { id: "color", type: "color", value: ((product != undefined) ? product.color : "FFFFFF") }
            ], [
                { type: "label", text: language.category, style: [
                        { name: "margin-top", value: "10px" },
                        { name: "display", value: "inline-block" }
                    ] },
                { type: "button", text: "+", target: function () { return _this.addNewCategory(); } }
            ], [
                { id: "categories", type: "table", settings: { colspan: 2 } }
            ]
        ];
        return _this;
    }
    EditProduct.prototype.getViewName = function () {
        return "EditProduct";
    };
    EditProduct.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        if (this.product != undefined && this.product.categories != undefined) {
            //Add all product's categories to the view
            this.product.categories.forEach(function (categoryId) {
                var category = _this.allCategories[categoryId];
                _this.addCategory(category);
            });
        }
        return true;
    };
    /**
     * Adds the given category to the view
     * @param category The category to add
     */
    EditProduct.prototype.addCategory = function (category) {
        var _this = this;
        this.objects.categories.addRow([
            { type: "link", id: "category" + category.id, text: category.name, customData: category, target: function () { return _this.editCategory(category); } },
            { type: "button", id: "remove_button_category" + category.id, text: "x", style: [{ name: "color", value: "red" }], target: function () { return _this.removeCategory(category); } }
        ]);
    };
    /**
     * Edits the given category by calling onEditCategory
     * @param category The category to edit
     */
    EditProduct.prototype.editCategory = function (category) {
        var _this = this;
        return this.onEditCategory(category).then(function () {
            console.log("updating category name to" + category.name);
            _this.objects["category" + category.id].setText(category.name);
        });
    };
    /**
     * Removes the given category from the view
     * @param category The category to remove
     */
    EditProduct.prototype.removeCategory = function (category) {
        this.objects["category" + category.id].hide();
        this.objects["remove_button_category" + category.id].hide();
        delete this.objects["category" + category.id];
        delete this.objects["remove_button_category" + category.id];
    };
    /**
     * Removes all categories from the view
     */
    EditProduct.prototype.clearCategories = function () {
        this.objects.categories.clear();
        for (var id in this.objects) {
            if (id.indexOf("category") == 0 || id.indexOf("remove_button_category") == 0) {
                delete this.objects[id];
            }
        }
    };
    /**
     * Adds a new category to the view by opening
     * th AddCategories view
     */
    EditProduct.prototype.addNewCategory = function () {
        var _this = this;
        var view = new AddCategories(this.allCategories, this.getSelectedCategories());
        view.onAddCategory = function () {
            return _this.onAddCategory();
        };
        view.onEditCategory = function (category) {
            return _this.editCategory(category);
        };
        view.onCategoriesSelected.push(function (categories) {
            _this.clearCategories();
            categories.forEach(function (category) { return _this.addCategory(category); });
        });
        view.show();
    };
    /**
     * Retrieves a list of all selected categories in the view
     */
    EditProduct.prototype.getSelectedCategories = function () {
        var selectedCategories = [];
        for (var id in this.objects) {
            if (id.indexOf("category") == 0) {
                var category = this.objects[id].customData;
                selectedCategories.push(category.id);
            }
        }
        return selectedCategories;
    };
    EditProduct.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var name = this.objects.name.getValue();
        var price = this.objects.price.getValue();
        if (name == "" || price == "") {
            alert(language.enterNamePrice);
            return false;
        }
        var duration = this.objects.duration.getValue();
        var color = this.objects.color.getValue();
        var categories = this.getSelectedCategories();
        //Notify subsribers
        this.onCreate.forEach(function (handler) {
            handler(name, parseInt(duration), parseInt(price), color, categories);
        });
        return true;
    };
    return EditProduct;
}(BaseView));
/**
 * Shows the window with an overview of the customers
 * Mandatory fields to set:
 *  - onAddCUstomer
 *  - onEditCustomer
 */
var OverviewCustomers = /** @class */ (function (_super) {
    __extends(OverviewCustomers, _super);
    /**
     * Constructs the view
     * @param customers All customers which should appear in the overview
     */
    function OverviewCustomers(customers) {
        var _this = _super.call(this, language.customers) || this;
        _this.customers = customers;
        //The layout of the view
        _this.allOptions = [
            [
                { type: "text", id: "search", placeholder: language.search },
                { type: "button", text: "+", target: function () { return _this.addCustomer(); } }
            ]
        ];
        //Hide cancel button
        _this.window.setCancelButtonVisible(false);
        return _this;
    }
    OverviewCustomers.prototype.getViewName = function () {
        return "OverviewCustomers";
    };
    OverviewCustomers.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        //Register delayed input event for the search field
        this.objects.search.onDelayedInput(function (value) { return _this.filter(value); });
        //Add all customers to the overview
        for (var id in this.customers)
            this.addNewCustomer(this.customers[id]);
        return true;
    };
    /**
     * Adds a new customer to the overview ("+" clicked)
     * by calling onAddCustomer
     */
    OverviewCustomers.prototype.addCustomer = function () {
        var _this = this;
        this.onAddCustomer().then(function (newCustomer) {
            if (newCustomer != undefined)
                _this.addNewCustomer(newCustomer);
        });
    };
    /**
     * Edits the given customer by calling onEditCustomer
     * @param customer The customer to edit
     */
    OverviewCustomers.prototype.editCustomer = function (customer) {
        var _this = this;
        this.onEditCustomer(customer).then(function () {
            _this.objects["customer" + customer.id].setText(customer.name);
        });
    };
    /**
     * Adds the given customer to the overview
     * @param customer The customer to add
     */
    OverviewCustomers.prototype.addNewCustomer = function (customer) {
        var _this = this;
        this.rootElement.addRow([{
                id: "customer" + customer.id,
                type: "link",
                settings: {
                    colspan: 2
                }, customData: customer,
                text: customer.name,
                target: function () { return _this.editCustomer(customer); }
            }]);
    };
    /**
     * Filters the overview by the given criterie
     * @param value The criterie to filter
     */
    OverviewCustomers.prototype.filter = function (value) {
        for (var id in this.objects) {
            if (id.indexOf("customer") == 0) {
                if (value == "" || this.matchesCustomer(value, this.objects[id].customData))
                    this.objects[id].show(true);
                else
                    this.objects[id].hide(true);
            }
        }
        this.window.adjustSize();
    };
    /**
     * Checks if the given customer matches the given filter
     * @param filter The filter
     * @param customer The customer to check
     */
    OverviewCustomers.prototype.matchesCustomer = function (filter, customer) {
        return this.matchesString(filter, customer.name) ||
            this.matchesString(filter, customer.address) ||
            this.matchesString(filter, customer.comment) ||
            this.matchesString(filter, customer.telephone) ||
            this.matchesString(filter, customer.email);
    };
    /**
     * Checks if the lowercase value contains the lowercase filter
     * @param filter
     * @param value
     */
    OverviewCustomers.prototype.matchesString = function (filter, value) {
        if (filter == undefined || value == undefined) {
            return false;
        }
        return value.toLowerCase().indexOf(filter.toLowerCase()) != -1;
    };
    return OverviewCustomers;
}(BaseView));
/**
 * SHows the window with an overview of the employees
 * Mandatory fields to set
 *  - onAddEmployee
 *  - onEditEmployee
 */
var OverviewEmployees = /** @class */ (function (_super) {
    __extends(OverviewEmployees, _super);
    /**
     * Constructs the view
     * @param employees All employees which should appear in the overview
     */
    function OverviewEmployees(employees) {
        var _this = _super.call(this, language.employees) || this;
        _this.employees = employees;
        //The layout of the view
        _this.allOptions = [
            [
                { type: "text", id: "search", placeholder: language.search },
                { type: "button", text: "+", target: function () { return _this.addEmployee(); } }
            ]
        ];
        //Hide cancel button
        _this.window.setCancelButtonVisible(false);
        return _this;
    }
    OverviewEmployees.prototype.getViewName = function () {
        return "OverviewEmployees";
    };
    OverviewEmployees.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        //Register delayed input event for the search field
        this.objects.search.onDelayedInput(function (value) { return _this.filter(value); });
        //Add all employees to the overview
        for (var id in this.employees)
            this.addNewEmployee(this.employees[id]);
        return true;
    };
    /**
     * Adds a new employee to the overview ("+" clicked)
     * by calling onAddEmployee
     */
    OverviewEmployees.prototype.addEmployee = function () {
        var _this = this;
        this.onAddEmployee().then(function (employee) {
            if (employee != undefined)
                _this.addNewEmployee(employee);
        });
    };
    /**
     * Edits the given employee by calling onEditEmployee
     * @param employee The employee to edit
     */
    OverviewEmployees.prototype.editEmployee = function (employee) {
        var _this = this;
        this.onEditEmployee(employee).then(function () {
            _this.objects["employee" + employee.id].setText(employee.name);
        });
    };
    /**
     * Adds the given employee to the overview
     * @param employee The employee to add
     */
    OverviewEmployees.prototype.addNewEmployee = function (employee) {
        var _this = this;
        this.rootElement.addRow([{
                id: "employee" + employee.id,
                type: "link",
                customData: employee,
                target: function () { return _this.editEmployee(employee); },
                text: employee.name
            }]);
    };
    /**
     * Filters the overview by the given criterie
     * @param value The criterie to filter
     */
    OverviewEmployees.prototype.filter = function (value) {
        for (var id in this.objects) {
            if (id.indexOf("employee") == 0) {
                if (value == "" || this.matchesEmployee(value, this.objects[id].customData))
                    this.objects[id].show(true);
                else
                    this.objects[id].hide(true);
            }
        }
        this.window.adjustSize();
    };
    /**
     * Checks if the given employee matches the given filter
     * @param filter The filter
     * @param employee The employee to check
     */
    OverviewEmployees.prototype.matchesEmployee = function (filter, employee) {
        return this.matchesString(filter, employee.name);
    };
    /**
     * Checks if the lowercase value contains the lowercase filter
     * @param filter
     * @param value
     */
    OverviewEmployees.prototype.matchesString = function (filter, value) {
        if (filter == undefined || value == undefined) {
            return false;
        }
        return value.toLowerCase().indexOf(filter.toLowerCase()) != -1;
    };
    return OverviewEmployees;
}(BaseView));
/**
 * Shows a window with an overview of the products
 * Mandatory fields to set:
 *  - onAddProduct
 *  - onEditProduct
 */
var OverviewProducts = /** @class */ (function (_super) {
    __extends(OverviewProducts, _super);
    /**
     * Constructs the view
     * @param products All products which should appear in the overview
     * @param allCategories All categories which should be available for the products
     */
    function OverviewProducts(products, allCategories) {
        var _this = _super.call(this, language.products) || this;
        _this.products = products;
        _this.allCategories = allCategories;
        //The layout of the view
        _this.allOptions = [
            [
                { type: "text", id: "search", placeholder: language.search },
                { type: "button", text: "+", target: function () { return _this.addProduct(); } }
            ]
        ];
        //Hide cancel button
        _this.window.setCancelButtonVisible(false);
        return _this;
    }
    OverviewProducts.prototype.getViewName = function () {
        return "OverviewProducts";
    };
    OverviewProducts.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        //Register delayed input event for the search field
        this.objects.search.onDelayedInput(function (value) { return _this.filter(value); });
        //Add all products to the overview
        for (var id in this.products)
            this.addNewProduct(this.products[id]);
        return true;
    };
    /**
     * Adds a new product to the overview ("+" clicked)
     * by calling onAddProduct
     */
    OverviewProducts.prototype.addProduct = function () {
        var _this = this;
        this.onAddProduct().then(function (product) {
            if (product != undefined)
                _this.addNewProduct(product);
        });
    };
    /**
     * Edits the given product by calling onEditProduct
     * @param product The product to edit
     */
    OverviewProducts.prototype.editProduct = function (product) {
        var _this = this;
        this.onEditProduct(product).then(function () {
            var color = product.color;
            if (color != undefined && color.indexOf("#") != 0)
                color = "#" + color;
            _this.objects["product" + product.id].setText(product.name);
            _this.objects["product" + product.id].htmlElement.style.borderLeft = "10px solid " + color;
        });
    };
    /**
     * Adds the given product to the overview
     * @param product The product to add
     */
    OverviewProducts.prototype.addNewProduct = function (product) {
        var _this = this;
        this.rootElement.addRow([{
                id: "product" + product.id,
                type: "link",
                text: product.name,
                customData: product,
                settings: { colspan: 2 },
                target: function () { return _this.editProduct(product); }
            }]);
        var color = product.color;
        if (color != undefined && color.indexOf("#") != 0)
            color = "#" + color;
        this.objects["product" + product.id].htmlElement.style.borderLeft = "10px solid " + color;
        this.objects["product" + product.id].htmlElement.style.paddingLeft = "5px";
    };
    /**
     * Filters the overview by the given criterie
     * @param value The criterie to filter
     */
    OverviewProducts.prototype.filter = function (value) {
        for (var id in this.objects) {
            if (id.indexOf("product") == 0) {
                if (value == "" || this.matchesProduct(value, this.objects[id].customData))
                    this.objects[id].show(true);
                else
                    this.objects[id].hide(true);
            }
        }
        this.window.adjustSize();
    };
    /**
     * Checks if the given product matches the given filter
     * @param filter The filter
     * @param product The product to check
     */
    OverviewProducts.prototype.matchesProduct = function (filter, product) {
        return this.matchesString(filter, product.name) ||
            this.matchesCategories(filter, product.categories);
    };
    /**
     * Checks if any of the given category names matches the
     * given filter
     * @param filter The filter to match
     * @param categoriyIds The category ids
     */
    OverviewProducts.prototype.matchesCategories = function (filter, categoriyIds) {
        var _this = this;
        if (categoriyIds == undefined)
            return false;
        var results = categoriyIds.map(function (categoryId) {
            var category = _this.allCategories[categoryId];
            return _this.matchesString(filter, category.name);
        });
        return !results.every(function (result) { return result == false; });
    };
    /**
     * Checks if the lowercase value contains the lowercase filter
     * @param filter
     * @param value
     */
    OverviewProducts.prototype.matchesString = function (filter, value) {
        if (filter == undefined || value == undefined) {
            return false;
        }
        return value.toLowerCase().indexOf(filter.toLowerCase()) != -1;
    };
    return OverviewProducts;
}(BaseView));
/**
 * Shows the window with an overview of the reports
 * Mandatory fields to set:
 *  - onSHowReport
 */
var OverviewReports = /** @class */ (function (_super) {
    __extends(OverviewReports, _super);
    /**
     * Constructs the view
     * @param reports All reports which should appear in the overview
     */
    function OverviewReports(reports) {
        var _this = _super.call(this, language.reports) || this;
        _this.reports = reports;
        //The layout of the view
        _this.allOptions = [];
        //Hide cancel button
        _this.window.setCancelButtonVisible(false);
        return _this;
    }
    OverviewReports.prototype.getViewName = function () {
        return "OverviewReports";
    };
    OverviewReports.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        //Add all reports to the overview
        this.reports.forEach(function (report) {
            _this.addNewReport(report);
        });
        return true;
    };
    /**
     * Adds the given report to the overview
     * @param report The report to add
     */
    OverviewReports.prototype.addNewReport = function (report) {
        var _this = this;
        this.rootElement.addRow([
            { type: "link", text: language[report.title], target: function () { _this.showReport(report); } }
        ]);
    };
    /**
     * Shows the given report by calling onShowReport
     * @param report The report to show
     */
    OverviewReports.prototype.showReport = function (report) {
        this.onShowReport(report);
    };
    return OverviewReports;
}(BaseView));
/**
 * Shows the view to edit the settings
 * Mandatory fields to set:
 *  - onSHowEmployees
 */
var OverviewSettings = /** @class */ (function (_super) {
    __extends(OverviewSettings, _super);
    /**
     * Constructs the view
     *@param settings The collection of settings to edit
     */
    function OverviewSettings(settings) {
        var _this = _super.call(this, language.settings) || this;
        /** These subscribers are called when the user presses "OK" */
        _this.onSave = [];
        //Custruct a value-text pair of all possible times (workhour start and end)
        var hours = [];
        for (var time = 0; time <= 24; time++) {
            hours.push({
                value: "" + time,
                text: time + " " + language.oClock
            });
        }
        //Construct a value-text pair of all possible calendar amounts
        var calendars = [];
        for (var i = 1; i <= 5; i++) {
            calendars.push({
                value: "" + i,
                text: "" + i
            });
        }
        //The layout of the view
        _this.allOptions = [
            { name: language.theme, value: { id: "theme", type: "select", value: settings.theme, options: [
                        { value: "calendar_default", text: "Default" },
                        { value: "calendar_g", text: "Google-like" },
                        { value: "calendar_green", text: "Green" },
                        { value: "calendar_traditional", text: "Traditional" },
                        { value: "calendar_transparent", text: "Transparent" },
                        { value: "calendar_white", text: "White" }
                    ] } },
            { name: language.companyName, value: { id: "company", type: "text", value: settings.company } },
            { name: language.taxId, value: { id: "taxId", type: "text", value: settings.taxId } },
            { name: language.address1, value: { id: "address1", type: "text", value: settings.address1 } },
            { name: language.address2, value: { id: "address2", type: "text", value: settings.address2 } },
            { name: language.telephone, value: { id: "telephone", type: "text", value: settings.telephone } },
            { name: language.homepage, value: { id: "homepage", type: "text", value: settings.homepage } },
            { name: language.taxName, value: { id: "taxName", type: "text", value: settings.taxName } },
            { name: language.taxValue, value: { id: "taxValue", type: "text", value: settings.taxValue } },
            { name: language.startTime, value: { id: "startTime", type: "select", value: settings.startTime, options: hours } },
            { name: language.endTime, value: { id: "endTime", type: "select", value: settings.endTime, options: hours } },
            { name: language.showMonths, value: { id: "showMonths", type: "select", value: settings.showMonths, options: calendars } },
            { name: language.timeFormat, value: { id: "timeFormat", type: "select", value: settings.timeFormat, options: [
                        { value: "Clock12Hours", text: language.clock12Hours },
                        { value: "Clock24Hours", text: language.clock24Hours }
                    ] } },
            { name: language.currency, value: { id: "currency", type: "text", value: settings.currency } },
            { name: language.newlyCreatedInvoices, value: { type: "table", cells: [[
                            { id: "printInvoice", type: "checkbox", text: language.printInvoice, value: settings.printInvoice }
                        ], [
                            { id: "openInvoice", type: "checkbox", text: language.openInvoice, value: settings.openInvoice }
                        ]] } },
            { name: language.calendarsPerRow, value: { id: "calendarsPerRow", type: "text", value: settings.calendarsPerRow } },
            { name: language.employees, value: { type: "link", text: language.manage, target: function () { return _this.showEmployees(); } } },
            { name: language.administration, value: { type: "link", text: language.open, target: function () { return _this.openAdministration(); } } }
        ];
        return _this;
    }
    OverviewSettings.prototype.getViewName = function () {
        return "OverviewSettings";
    };
    OverviewSettings.prototype.onShowing = function () {
        //Creating the view fromthe layout
        this.rootElement = this.window.addNameValueContent(this.allOptions, this.objects);
        return true;
    };
    /**
     * Shows the employees view by calling onShowEmployees
     */
    OverviewSettings.prototype.showEmployees = function () {
        this.onShowEmployees();
    };
    /**
     * Opens the administration page
     */
    OverviewSettings.prototype.openAdministration = function () {
        window.open("admin.php", "_blank");
    };
    OverviewSettings.prototype.onOKClicked = function () {
        var settings = {};
        for (var setting in this.objects) {
            if (this.objects[setting].getValue == undefined)
                console.log("Object has no getValue function" + JSON.stringify(this.objects[setting]));
            settings[setting] = this.objects[setting].getValue();
        }
        //Notify subscribers
        this.onSave.forEach(function (handler) {
            handler(settings);
        });
        return true;
    };
    return OverviewSettings;
}(BaseView));
/**
 * Shows the pay total window which lets the
 * user choose the payment method and shows
 * the money values
 */
var PayTotal = /** @class */ (function (_super) {
    __extends(PayTotal, _super);
    /**
     * Constructs the view
     * @param total The total amount of money which needs to be paid
     */
    function PayTotal(total) {
        var _this = _super.call(this, language.pay) || this;
        _this.total = total;
        /** These subscribers are called when the user presses "OK" */
        _this.callback = [];
        //The layout of the view
        _this.allOptions = [
            [{ id: "total", type: "label", text: language.totalPrice + ": " + total, settings: { colspan: 2 } }],
            [{ id: "paymentMethodText", type: "label", text: language.tendered, settings: { colspan: 2 } }],
            [{ id: "cashReturn", type: "label", text: language.cashReturn, settings: { colspan: 2 } }],
            [
                { type: "list", objects: [
                        { id: "cash", type: "link", text: language.cash, target: function () { return _this.cashSelected(); } },
                        { id: "bank", type: "link", text: language.bank, target: function () { return _this.bankSelected(); } }
                    ] },
                { id: "payTotal", type: "container", objects: [] }
            ],
            [{ id: "printInvoice", type: "checkbox", text: language.printInvoice, value: "true", settings: { colspan: 2 } }]
        ];
        return _this;
    }
    PayTotal.prototype.getViewName = function () {
        return "PayTotal";
    };
    PayTotal.prototype.onShowing = function () {
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        this.cashSelected();
        return true;
    };
    /**
     * Updates the tendered and return texts
     * @param tendered The amount of money tendered
     */
    PayTotal.prototype.updateCashText = function (tendered) {
        this.objects.paymentMethodText.setText(language.tendered + ": " + tendered);
        if (tendered > this.total) {
            this.objects.cashReturn.htmlElement.style.display = "";
            this.objects.cashReturn.setText(language.cashReturn + ": " + (tendered - this.total));
        }
        else {
            this.objects.cashReturn.htmlElement.style.display = "none";
        }
    };
    /**
     * Displays the cash pament sections of the window
     */
    PayTotal.prototype.cashSelected = function () {
        var _this = this;
        this.paymentType = "cash";
        this.objects["cash"].htmlElement.style.background = "#dddddd";
        this.objects["bank"].htmlElement.style.background = "";
        this.objects.payTotal.clear();
        var tendered = 0;
        var counter = 0;
        //Generate money values
        ["500", "200", "100", "50", "20", "10", "5", "2", "1", "0.5", "0.2", "0.1", "0.05", "0.02", "0.01"].forEach(function (number) {
            _this.objects.payTotal.addObject({ type: "link", className: "money", text: number, target: function () {
                    tendered = tendered + parseFloat(number);
                    _this.updateCashText(tendered);
                }
            });
            //Add a new line every four money elements
            if (counter++ == 4) {
                _this.objects.payTotal.addObject({ type: "newline" });
                counter = 0;
            }
        });
        this.updateCashText(tendered);
    };
    /**
     * Displays the bank pament sections of the window
     */
    PayTotal.prototype.bankSelected = function () {
        this.paymentType = "bank";
        this.objects["cash"].htmlElement.style.background = "";
        this.objects["bank"].htmlElement.style.background = "#dddddd";
        this.objects.payTotal.clear();
        this.objects.paymentMethodText.setText(language.makeBankPayment);
        this.objects["cashReturn"].htmlElement.style.display = "none";
    };
    PayTotal.prototype.onOKClicked = function () {
        var cash = 0;
        var bank = 0;
        if (this.paymentType == "cash")
            cash = this.total;
        else
            bank = this.total;
        var printInvoice = this.objects.printInvoice.getBooleanValue();
        //notify subscribers
        this.callback.forEach(function (handler) {
            handler(cash, bank, printInvoice);
        });
        return true;
    };
    return PayTotal;
}(BaseView));
/**
 * Shows the pay window
 * Mandatory fields to set:
 *  - onAddProduct
 */
var Pay = /** @class */ (function (_super) {
    __extends(Pay, _super);
    /**
     * Constructs the view
     * @param event The event to pay
     * @param allProducts All products (--> the event only contains the id so we need this list)
     * @param allCustomers All Customers (--> the event only contains the id so we need this list)
     * @param parentView The parent view of this view. It will be automatically closed when this view closes
     */
    function Pay(event, allProducts, allCustomers, parentView) {
        var _this = _super.call(this, language.pay) || this;
        _this.event = event;
        _this.allProducts = allProducts;
        _this.allCustomers = allCustomers;
        _this.parentView = parentView;
        /** These subscribers are called when the user presses "OK" */
        _this.onPaid = [];
        _this.currentProducts = [];
        var customer = _this.allCustomers[event.customer];
        var customerName = (customer != undefined) ? customer.name : "Undefined customer";
        //The layout of the view
        _this.allOptions = [
            [
                { type: "container", settings: { colspan: 3 }, objects: [
                        { type: "label", settings: { fontWeight: "bold" }, text: language.customer + ": " },
                        { type: "label", text: customerName }
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
                { type: "button", settings: { colspan: 3 }, text: language.additionalProduct, target: function () { return _this.showAddProductWindow(); } }
            ], [
                { type: "label", text: language.cash },
                { id: "cash", type: "text" },
                { type: "button", text: language.allCash, target: function () { return _this.allCash(); } }
            ], [
                { type: "label", text: language.bank },
                { id: "bank", type: "text" },
                { type: "button", text: language.allBank, target: function () { return _this.allBank(); } }
            ]
        ];
        return _this;
    }
    Pay.prototype.getViewName = function () {
        return "Pay";
    };
    Pay.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        var pr = this.allProducts[this.event.product];
        if (pr != undefined)
            this.addProduct(pr);
        else
            console.log("Product is undefined");
        this.event.additionalProducts.forEach(function (additionalProductId) {
            _this.addProduct(_this.allProducts[additionalProductId]);
        });
        return true;
    };
    /**
     * Is called when the entire amount
     * should be paid by cash
     */
    Pay.prototype.allCash = function () {
        var sum = this.objects.sum.getValue();
        this.objects.cash.setValue(sum);
        this.objects.bank.setValue("0");
    };
    /**
     * Is called when the entire amount
     * should be paid by bank
     */
    Pay.prototype.allBank = function () {
        var sum = this.objects.sum.getValue();
        this.objects.bank.setValue(sum);
        this.objects.cash.setValue("0");
    };
    /**
     * Shows the add product window and adds the resulting
     * product as an invoice line
     */
    Pay.prototype.showAddProductWindow = function () {
        var _this = this;
        var view = new AddInvoiceLine(this.allProducts);
        view.onAdd.push(function (product) {
            _this.addProduct(product);
        });
        view.onAddProduct = this.onAddProduct;
        view.show();
    };
    /**
     * Updates the sum of the invoice lines
     */
    Pay.prototype.updateSum = function () {
        var sum = 0;
        for (var i = 0; i < this.currentProducts.length; i++) {
            sum += parseFloat(this.objects["price" + i].getValue());
        }
        this.objects.sum.setValue("" + sum);
    };
    /**
     * Adds the given product as invoice line
     * @param pr The product to add
     */
    Pay.prototype.addProduct = function (pr) {
        var _this = this;
        var index = this.currentProducts.length;
        //Add a new row to the table
        this.objects.products.addRow([
            { type: "label", text: pr.name },
            { id: "price" + index, type: "text", value: "" + pr.price },
        ], this.objects.products.rowsCount() - 1);
        //Register a change event when the price is updated manually
        this.objects["price" + index].onChange(function () { return _this.updateSum(); });
        this.currentProducts.push({
            id: pr.id,
            quantity: 1,
            price: pr.price
        });
        //Recalulate sum
        this.updateSum();
    };
    ;
    Pay.prototype.onOKClicked = function () {
        var _this = this;
        //Check if all mandatory fields are set
        var cash = this.objects.cash.getValue();
        var bank = this.objects.bank.getValue();
        if (cash == "" && bank == "") {
            alert(language.enterCashBank);
            return false;
        }
        if (this.parentView != undefined)
            this.parentView.close();
        for (var i = 0; i < this.currentProducts.length; i++) {
            var price = this.objects["price" + i].getValue();
            this.currentProducts[i].price = parseInt(price);
        }
        //Notify subscribers
        this.onPaid.forEach(function (handler) {
            handler(_this.currentProducts, parseInt(cash), parseInt(bank));
        });
        return true;
    };
    return Pay;
}(BaseView));
/**
 * Shows the report variables which are needed
 * to generate a report
 */
var ShowReport = /** @class */ (function (_super) {
    __extends(ShowReport, _super);
    /**
     * Constructs the view
     * @param report The report to show
     * @param allCustomers The list of all customers which should appear if a variable has the type customer
     * @param allProducts The list of all products which should appear if a variable has the type product
     */
    function ShowReport(report, allCustomers, allProducts) {
        var _this = _super.call(this, language[report.title]) || this;
        _this.report = report;
        _this.allCustomers = allCustomers;
        _this.allProducts = allProducts;
        /** These subscribers are called when the user presses "OK" */
        _this.openReport = [];
        _this.toAsk = [];
        return _this;
    }
    ShowReport.prototype.getViewName = function () {
        return "ShowReport";
    };
    ShowReport.prototype.onShowing = function () {
        var _this = this;
        //This view is not needed if the report does not contain
        //any variables to ask
        if (this.report.ask.length == 0) {
            //Notify all subsribers and close the view
            this.onOKClicked();
            return false;
        }
        //Creating the view fromthe layout
        var table = document.createElement("table");
        this.window.addCustomContent(table);
        //Create a GUI for each variable
        this.report.ask.forEach(function (askTemplate) {
            var ask = {
                name: askTemplate[0],
                value: ""
            };
            var tr = table.insertRow(table.rows.length);
            tr.insertCell(0).appendChild(document.createTextNode(language[askTemplate[0]]));
            switch (askTemplate[1]) {
                case "date":
                    //A date variable is displayed using a DayPilot navigator
                    var date = document.createElement("div");
                    date.id = "date" + askTemplate[0];
                    tr.insertCell(1).appendChild(date);
                    var nav_1 = new DayPilot.Navigator(date.id);
                    nav_1.selectMode = "day";
                    nav_1.onTimeRangeSelected = function (args) {
                        ask.value = args.day.toString();
                    };
                    setTimeout(function () { return nav_1.init(); }, 0);
                    ask.value = nav_1.selectionStart.toString();
                    break;
                case "customer":
                    //A customer variable is displayed using a customer search select
                    var customerElement = document.createElement("div");
                    tr.insertCell(1).appendChild(customerElement);
                    var customers = new dhtmlXCombo(customerElement, "Customer", "200px");
                    customers.enableFilteringMode("between");
                    for (var id in _this.allCustomers)
                        customers.addOption(id, _this.allCustomers[id].name);
                    customers.attachEvent("onChange", function (value) {
                        ask.value = value;
                    });
                    break;
                case "product":
                    //A product is displayed using a product search select
                    var productElement = document.createElement("div");
                    tr.insertCell(1).appendChild(productElement);
                    var products = new dhtmlXCombo(productElement, "Product", "200px");
                    products.enableFilteringMode("between");
                    for (var id in _this.allProducts)
                        products.addOption(id, _this.allProducts[id].name);
                    products.attachEvent("onChange", function (value) {
                        ask.value = value;
                    });
                    break;
                default:
                    var text = document.createElement("input");
                    tr.insertCell(1).appendChild(text);
                    text.type = "text";
                    text.onchange = function (event) {
                        ask.value = event.srcElement.value;
                    };
                    break;
            }
            _this.toAsk.push(ask);
        });
        return true;
    };
    ShowReport.prototype.onOKClicked = function () {
        var _this = this;
        //Notify subsribers
        this.openReport.forEach(function (handler) {
            handler(_this.report, _this.toAsk);
        });
        return true;
    };
    return ShowReport;
}(BaseView));
/// <reference path="../base.view.ts"/>
/**
 * Shows the admin database view.
 * Mandatory fields to set:
 *  - onUpdateDatabase
 */
var AdminDatabase = /** @class */ (function (_super) {
    __extends(AdminDatabase, _super);
    /**
     * Constructs the view
     */
    function AdminDatabase(status) {
        var _this = _super.call(this, language.adminDatabase) || this;
        _this.status = status;
        //The layout of the view
        _this.allOptions = [
            { name: language.databaseStatus, value: { type: "table", id: "databaseStatus" } },
            { name: language.updateDatabase, value: { type: "button", text: language.update, target: function () { return _this.updateDatabase(); } } }
        ];
        return _this;
    }
    AdminDatabase.prototype.getViewName = function () {
        return "AdminDatabase";
    };
    /**
     * Overrides BaseView
     * Adds the content of the dialog as a name-value content
     */
    AdminDatabase.prototype.onShowing = function () {
        var _this = this;
        //Creating the view fromthe layout
        this.rootElement = this.window.addNameValueContent(this.allOptions, this.objects);
        this.status.forEach(function (status) {
            _this.objects.databaseStatus.addRow([
                { type: "label", text: status }
            ]);
        });
        return true;
    };
    /**
     * Is called when the user presses the update database button
     */
    AdminDatabase.prototype.updateDatabase = function () {
        this.onUpdateDatabase().then(function (message) {
            alert(message);
        });
    };
    /**
     * Is pressed when the user closes the window
     */
    AdminDatabase.prototype.onOKClicked = function () {
        return true;
    };
    return AdminDatabase;
}(BaseView));
/**
 * Shows a window to edit the invoice layout
 * Mandatory fields:
 *  - onPreviewLayout
 */
var AdminInvoiceLayout = /** @class */ (function (_super) {
    __extends(AdminInvoiceLayout, _super);
    /**
     * Constructs the view
     * @param availableLayouts All the available layouts which should be shown in the list
     * @param selectedLayout The currently selected layout
     */
    function AdminInvoiceLayout(availableLayouts, selectedLayout) {
        var _this = _super.call(this, language.invoice) || this;
        _this.availableLayouts = availableLayouts;
        _this.selectedLayout = selectedLayout;
        /** This event is triggered when the user clicks the "OK" button */
        _this.onEdit = [];
        /** All the fonts which are available for the currently loaded layout */
        _this.availableFonts = {};
        //Registering all the invoice elements and the board for the current window
        _this.window.registerCustomElement("invoiceElementRemove", InvoiceElementRemove.generatorFunction);
        _this.window.registerCustomElement("invoiceBoard", InvoiceBoard.generatorFunction);
        _this.window.registerCustomElement("invoiceImage", InvoiceImage.generatorFunction);
        _this.window.registerCustomElement("invoiceText", InvoiceText.generatorFunction);
        _this.window.registerCustomElement("invoiceProducts", InvoiceProducts.generatorFunction);
        _this.window.registerCustomElement("invoiceTax", InvoiceTax.generatorFunction);
        _this.window.registerCustomElement("invoiceNewline", InvoiceNewline.generatorFunction);
        //The layout of the view
        _this.allOptions = [[
                //Layout overview
                { type: "table", cells: [
                        [{ type: "table", id: "layouts", style: [{ name: "verticalAlign", value: "top" }], cells: [
                                    [{ type: "label", text: language.availableLayouts, style: [{ name: "fontWeight", value: "bold" }] }],
                                    [{ type: "label", text: "" }]
                                ] }],
                        [{ type: "button", style: [{ name: "vertivalAlign", value: "bottom" }], text: language.preview, target: function () { return _this.openPreview(); } }]
                    ] },
                //Layout settings
                { type: "table", style: [
                        { name: "marginLeft", value: "5px" },
                        { name: "borderLeft", value: "1px solid grey" },
                        { name: "paddingLeft", value: "5px" },
                        { name: "marginRight", value: "5px" },
                        { name: "borderRight", value: "1px solid grey" },
                        { name: "paddingRight", value: "5px" }
                    ], cells: [
                        [
                            { type: "label", text: language.creator },
                            { type: "text", id: "creator" }
                        ], [
                            { type: "label", text: language.unit },
                            { type: "select", id: "unit", options: [{ text: "mm", value: "mm" }] }
                        ], [
                            { type: "label", text: language.format },
                            { type: "table", cells: [
                                    [{ type: "select", id: "predefinedFormat", settings: { colspan: "2" }, options: [{ text: "A4", value: "A4" }] }],
                                    [
                                        { type: "checkbox", id: "customFormat", text: language.custom + ": " },
                                        { type: "text", id: "customFormatX", style: [{ name: "width", value: "5ch" }] },
                                        { type: "label", text: " x " },
                                        { type: "text", id: "customFormatY", style: [{ name: "width", value: "5ch" }] }
                                    ]
                                ] }
                        ], [
                            { type: "label", text: language.marginLeft },
                            { type: "text", id: "marginLeft" }
                        ], [
                            { type: "label", text: language.marginRight },
                            { type: "text", id: "marginRight" }
                        ], [
                            { type: "label", text: language.marginTop },
                            { type: "text", id: "marginTop" }
                        ], [
                            { type: "label", text: language.marginBottom },
                            { type: "text", id: "marginBottom" }
                        ], [
                            { type: "label", text: language.marginHeader },
                            { type: "text", id: "marginHeader" }
                        ], [
                            { type: "label", text: language.marginFooter },
                            { type: "text", id: "marginFooter" }
                        ], [
                            { type: "checkbox", id: "pageBreak", text: language.pageBreak, settings: { colspan: 2 } }
                        ]
                    ] },
                //Actual layout
                { type: "table", cells: [[
                            { type: "table", cells: [
                                    [{ type: "invoiceBoard", id: "invoiceBoardHeader", text: "Header" }],
                                    [{ type: "invoiceBoard", id: "invoiceBoardBody", text: "Body" }],
                                    [{ type: "invoiceBoard", id: "invoiceBoardFooter", text: "Footer" }],
                                ] },
                            { type: "table", cells: [
                                    [{ type: "invoiceElementRemove" }],
                                    [{ type: "label", text: " " }],
                                    [{ type: "invoiceImage", target: function (source) { return _this.changeImage(source); } }],
                                    [{ type: "invoiceText", target: function (source) { return _this.changeText(source); } }],
                                    [{ type: "invoiceProducts", target: function (source) { return _this.changeProducts(source); } }],
                                    [{ type: "invoiceTax", target: function (source) { return _this.changeTax(source); } }],
                                    [{ type: "invoiceNewline" }]
                                ] }
                        ]] }
            ]];
        return _this;
    }
    AdminInvoiceLayout.prototype.getViewName = function () {
        return "AdminInvoiceLayout";
    };
    /**
     * Overrides BaseView
     * Adds the content of the dialog as a name-value content
     */
    AdminInvoiceLayout.prototype.onShowing = function () {
        var _this = this;
        //Creating the view from the layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        //Register a change listener which enables/disables the format controls
        this.objects.customFormat.onBooleanChange(function (checked) {
            _this.updateDisabledComponents();
        });
        this.updateDisabledComponents();
        //Add all available layouts
        this.availableLayouts.forEach(function (layout) {
            _this.addLayout(layout);
        });
        //Load the selected layout
        if (this.selectedLayout != undefined) {
            if (this.availableLayouts.filter(function (layout) { return (layout.name == _this.selectedLayout); }).length == 0) {
                //If the selected layout is not present in the available layouts
                //then it must be a custom layout which is JSOn encoded
                //Adding and loading it...
                var custom_1 = JSON.parse(this.selectedLayout);
                custom_1.name = language.custom;
                this.availableLayouts.push(custom_1);
                this.addLayout(custom_1);
                this.loadLayout(custom_1.name);
            }
            else {
                this.loadLayout(this.selectedLayout);
            }
        }
        return true;
    };
    /**
     * Opens the layout preview by callong
     * onPreviewLayout
     */
    AdminInvoiceLayout.prototype.openPreview = function () {
        var layout = this.generateLayout();
        if (layout == undefined)
            return;
        this.onPreviewLayout(layout);
    };
    /**
     * Adds the given layout the the list of layouts
     * @param layout The alyout to add
     */
    AdminInvoiceLayout.prototype.addLayout = function (layout) {
        var _this = this;
        this.objects.layouts.addRow([
            { type: "link", id: "layout" + layout.name, text: layout.name, target: function () { return _this.loadLayout(layout.name); } }
        ]);
    };
    /**
     * Loads the layout with the given name
     * @param layoutName The layout to load
     */
    AdminInvoiceLayout.prototype.loadLayout = function (layoutName) {
        var _this = this;
        if (this.loadedLayout != undefined) {
            //Reset link color of the previously loaded layout
            var loadedLayoutLink_1 = this.objects["layout" + this.loadedLayout.name];
            loadedLayoutLink_1.htmlElement.style.fontWeight = "";
            loadedLayoutLink_1.htmlElement.style.color = "";
        }
        //Find new layout using its name, copy the  available fonts
        //And change the link color of the layout
        var loadedLayout = this.availableLayouts.filter(function (layout) { return layout.name == layoutName; })[0];
        this.loadedLayout = loadedLayout;
        this.availableFonts = JSON.parse(JSON.stringify(loadedLayout.settings.fonts));
        var loadedLayoutLink = this.objects["layout" + layoutName];
        loadedLayoutLink.htmlElement.style.fontWeight = "bold";
        loadedLayoutLink.htmlElement.style.color = "darkblue";
        //Setting all the input elements
        this.objects.creator.setValue(loadedLayout.settings.creator);
        this.objects.unit.setValue(loadedLayout.settings.unit);
        if (typeof (loadedLayout.settings.format) == "string" || loadedLayout.settings.format instanceof String) {
            this.objects.customFormat.setValue(false);
            this.objects.predefinedFormat.setValue(loadedLayout.settings.format);
        }
        else {
            this.objects.customFormat.setValue(true);
            this.objects.customFormatX.setValue("" + loadedLayout.settings.format[0]);
            this.objects.customFormatY.setValue("" + loadedLayout.settings.format[1]);
        }
        this.objects.marginLeft.setValue("" + loadedLayout.settings.marginLeft);
        this.objects.marginRight.setValue("" + loadedLayout.settings.marginRight);
        this.objects.marginTop.setValue("" + loadedLayout.settings.marginTop);
        this.objects.marginBottom.setValue("" + loadedLayout.settings.marginBottom);
        this.objects.marginHeader.setValue("" + loadedLayout.settings.marginHeader);
        this.objects.marginFooter.setValue("" + loadedLayout.settings.marginFooter);
        this.objects.pageBreak.setValue(loadedLayout.settings.pageBreak);
        this.updateDisabledComponents();
        //Loading the actual invoice elements into the invoice boards
        var textSettings = {};
        this.objects.invoiceBoardHeader.clear();
        loadedLayout.structure.header.forEach(function (line) {
            _this.addLine(_this.objects.invoiceBoardHeader, line, textSettings);
        });
        this.objects.invoiceBoardBody.clear();
        loadedLayout.structure.body.forEach(function (line) {
            _this.addLine(_this.objects.invoiceBoardBody, line, textSettings);
        });
        this.objects.invoiceBoardFooter.clear();
        loadedLayout.structure.footer.forEach(function (line) {
            _this.addLine(_this.objects.invoiceBoardFooter, line, textSettings);
        });
    };
    /**
     * Adds the given layout line as string to the given invoice
     * board by creating an appropriate invoice element
     * @param layout The invoice board
     * @param line The invoice line
     * @param textSettings The current text settings
     */
    AdminInvoiceLayout.prototype.addLine = function (layout, line, textSettings) {
        var _this = this;
        if (line.indexOf("image:") == 0) {
            var properties = line.substring(line.indexOf(":") + 1).split(",");
            var element_1 = layout.addInvoiceElement({ type: "invoiceImage", target: function (source) { return _this.changeImage(source); } });
            properties.forEach(function (property) {
                var name = property.split("=", 2)[0].trim();
                var value = property.split("=", 2)[1].trim();
                switch (name) {
                    case "path":
                        element_1.setPath(value);
                        break;
                    case "x":
                        element_1.setX(value);
                        break;
                    case "y":
                        element_1.setY(value);
                        break;
                    case "width":
                        element_1.setWidth(value);
                        break;
                    case "height":
                        element_1.setHeight(value);
                        break;
                }
            });
        }
        else if (line.indexOf("text:") == 0) {
            var text = line.substring(line.indexOf(":") + 1).trim();
            var element = layout.addInvoiceElement({ type: "invoiceText", target: function (source) { return _this.changeText(source); } });
            element.setText(text);
            element.setFont(textSettings.font);
            element.setAlign(textSettings.align);
        }
        else if (line.indexOf("newline") == 0) {
            layout.addInvoiceElement({ type: "invoiceNewline" });
        }
        else if (line.indexOf("products") == 0) {
            var element = layout.addInvoiceElement({ type: "invoiceProducts", target: function (source) { return _this.changeProducts(source); } });
            element.setFont(textSettings.font);
        }
        else if (line.indexOf("tax") == 0) {
            var element = layout.addInvoiceElement({ type: "invoiceTax", target: function (source) { return _this.changeTax(source); } });
            element.setFont(textSettings.font);
        }
        else if (line.indexOf("font:") == 0) {
            textSettings.font = line.substring(line.indexOf(":") + 1).trim();
        }
        else if (line.indexOf("align:") == 0) {
            textSettings.align = line.substring(line.indexOf(":") + 1).trim();
        }
        else {
            console.log("Unknown or custom invoice command: " + line);
            layout.addInvoiceElement({ type: line });
        }
    };
    /**
     * This function changes the format elements
     * of the view to disabled/enabled based on
     * whether the customFormat checkbox is checked
     */
    AdminInvoiceLayout.prototype.updateDisabledComponents = function () {
        var checked = this.objects.customFormat.getBooleanValue();
        if (checked) {
            this.objects.predefinedFormat.disable();
            this.objects.customFormatX.enable();
            this.objects.customFormatY.enable();
        }
        else {
            this.objects.predefinedFormat.enable();
            this.objects.customFormatX.disable();
            this.objects.customFormatY.disable();
        }
    };
    /**
     * This function is called when the user clicks on an
     * image invoice element. It opens the view to change it
     */
    AdminInvoiceLayout.prototype.changeImage = function (invoiceImage) {
        var view = new EditInvoiceImage(invoiceImage);
        view.onEdit.push(function (path, x, y, width, height) {
            invoiceImage.setPath(path);
            invoiceImage.setX(x);
            invoiceImage.setY(y);
            invoiceImage.setWidth(width);
            invoiceImage.setHeight(height);
        });
        view.show();
    };
    /**
     * This function is called when the user clicks on a
     * text invoice element. It opens the view to change it
     */
    AdminInvoiceLayout.prototype.changeText = function (invoiceText) {
        var _this = this;
        var view = new EditInvoiceText(this.availableFonts, invoiceText);
        view.onEdit.push(function (text, font, align) {
            invoiceText.setText(text);
            invoiceText.setFont(font);
            invoiceText.setAlign(align);
        });
        view.onAddFont = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddFont(function (name, font) {
                    if (name == undefined || font == undefined)
                        reject("Canceled");
                    else
                        resolve({ name: name, font: font });
                });
            });
        };
        view.onEditFont = function (name, font) {
            return new Promise(function (resolve, reject) {
                _this.showEditFont(name, font, function (edited, newName) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve(newName);
                });
            });
        };
        view.show();
    };
    /**
     * This function is called when the user clicks on a
     * tax invoice element. It opens the view to change it
     */
    AdminInvoiceLayout.prototype.changeTax = function (invoiceTax) {
        var _this = this;
        var view = new EditInvoiceTax(this.availableFonts, invoiceTax);
        view.onEdit.push(function (font) {
            invoiceTax.setFont(font);
        });
        view.onAddFont = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddFont(function (name, font) {
                    if (name == undefined || font == undefined)
                        reject("Canceled");
                    else
                        resolve({ name: name, font: font });
                });
            });
        };
        view.onEditFont = function (name, font) {
            return new Promise(function (resolve, reject) {
                _this.showEditFont(name, font, function (edited, newName) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve(newName);
                });
            });
        };
        view.show();
    };
    /**
     * This function is called when the user clicks on a
     * products invoice element. It opens the view to change it
     */
    AdminInvoiceLayout.prototype.changeProducts = function (invoiceProducts) {
        var _this = this;
        var view = new EditInvoiceProducts(this.availableFonts, invoiceProducts);
        view.onEdit.push(function (font) {
            invoiceProducts.setFont(font);
        });
        view.onAddFont = function () {
            return new Promise(function (resolve, reject) {
                _this.showAddFont(function (name, font) {
                    if (name == undefined || font == undefined)
                        reject("Canceled");
                    else
                        resolve({ name: name, font: font });
                });
            });
        };
        view.onEditFont = function (name, font) {
            return new Promise(function (resolve, reject) {
                _this.showEditFont(name, font, function (edited, newName) {
                    if (!edited)
                        reject("Canceled");
                    else
                        resolve(newName);
                });
            });
        };
        view.show();
    };
    /**
     * Opens the view to add a new font to the available fonts
     * @param createdCallback The callback which is executed when the user presses ok
     */
    AdminInvoiceLayout.prototype.showAddFont = function (createdCallback) {
        var _this = this;
        var view = new EditInvoiceFont();
        view.onEdit.push(function (name, font, size, weight) {
            _this.addFont(name, font, size, weight).then(function (newFont) {
                if (createdCallback != undefined)
                    createdCallback(name, newFont);
            })["catch"](function () {
                if (createdCallback != undefined)
                    createdCallback(undefined);
            });
        });
        view.show();
        return view;
    };
    /**
     * Opens the view to edit an available font
     * @param name The name of the font to edit
     * @param invoiceFont The font to edit
     * @param editedCallback The callback which is executed when the user presses ok
     */
    AdminInvoiceLayout.prototype.showEditFont = function (name, invoiceFont, editedCallback) {
        var _this = this;
        var view = new EditInvoiceFont(name, invoiceFont);
        view.onEdit.push(function (newName, font, size, weight) {
            _this.editFont(name, invoiceFont, newName, font, size, weight).then(function () {
                if (editedCallback != undefined)
                    editedCallback(true, newName);
            })["catch"](function () {
                if (editedCallback != undefined)
                    editedCallback(false);
            });
        });
        view.show();
        return view;
    };
    /**
     * Adds a new font with the given properties to
     * the available fonts
     * @param name  The name of the new font
     * @param font The font family
     * @param size The font size
     * @param weight The font weight
     */
    AdminInvoiceLayout.prototype.addFont = function (name, font, size, weight) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var newFont = {
                font: font,
                size: size,
                weight: weight
            };
            _this.availableFonts[name] = newFont;
            resolve(newFont);
        });
    };
    /**
     * Edits an available font
     * @param oldName The old font name
     * @param invoiceFont The old font
     * @param name The new font name
     * @param font The font family
     * @param size The font size
     * @param weight The font weight
     */
    AdminInvoiceLayout.prototype.editFont = function (oldName, invoiceFont, name, font, size, weight) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (oldName != name) {
                delete _this.availableFonts[oldName];
                _this.availableFonts[name] = invoiceFont;
            }
            invoiceFont.font = font;
            invoiceFont.size = size;
            invoiceFont.weight = weight;
            resolve();
        });
    };
    /**
     * This function converts the current layout
     * settings to a string which can be saved in the
     * settings or used to generate the preview
     */
    AdminInvoiceLayout.prototype.generateLayout = function () {
        //Retrieve all the settings from the input elements
        var creator = this.objects.creator.getValue();
        var unit = this.objects.unit.getValue();
        var format;
        if (this.objects.customFormat.getBooleanValue()) {
            format = [
                parseInt(this.objects.customFormatX.getValue()),
                parseInt(this.objects.customFormatY.getValue())
            ];
        }
        else {
            format = this.objects.predefinedFormat.getValue();
        }
        var marginLeft = this.objects.marginLeft.getValue();
        var marginRight = this.objects.marginRight.getValue();
        var marginTop = this.objects.marginTop.getValue();
        var marginBottom = this.objects.marginBottom.getValue();
        var marginHeader = this.objects.marginHeader.getValue();
        var marginFooter = this.objects.marginFooter.getValue();
        var pageBreak = this.objects.pageBreak.getBooleanValue();
        var header = [];
        var body = [];
        var footer = [];
        //Generate string arrays from invoice elements placed on the boards
        var textSettings = {};
        this.objects.invoiceBoardHeader.forEach(function (element) {
            var lines = element.toString(textSettings);
            header = header.concat(lines);
        });
        this.objects.invoiceBoardBody.forEach(function (element) {
            var lines = element.toString(textSettings);
            body = body.concat(lines);
        });
        this.objects.invoiceBoardFooter.forEach(function (element) {
            var lines = element.toString(textSettings);
            footer = footer.concat(lines);
        });
        //Check if all mandatory fields are set
        if (creator == "" || unit == "" || format == "" || format[0] == 0 || format[1] == 0 ||
            marginRight == "" || marginLeft == "" || marginTop == "" || marginBottom == "" ||
            marginHeader == "" || marginFooter == "") {
            alert(language.provideOneValue);
            return undefined;
        }
        //Generate actual layout object
        var layout = {
            name: "Custom",
            settings: {
                creator: creator,
                fonts: this.availableFonts,
                format: format,
                marginBottom: parseFloat(marginBottom),
                marginFooter: parseFloat(marginFooter),
                marginHeader: parseFloat(marginHeader),
                marginLeft: parseFloat(marginLeft),
                marginRight: parseFloat(marginRight),
                marginTop: parseFloat(marginTop),
                pageBreak: pageBreak,
                unit: unit
            },
            structure: {
                body: body,
                footer: footer,
                header: header
            }
        };
        return JSON.stringify(layout);
    };
    AdminInvoiceLayout.prototype.onOKClicked = function () {
        var layout = this.generateLayout();
        if (layout == undefined)
            return false;
        //Notify subsribers
        this.onEdit.forEach(function (handler) {
            handler(layout);
        });
        return true;
    };
    return AdminInvoiceLayout;
}(BaseView));
/**
 * Shows the window the edit an invoice font
 */
var EditInvoiceFont = /** @class */ (function (_super) {
    __extends(EditInvoiceFont, _super);
    /**
     * COnstructs the view
     * @param name The name of the font
     * @param invoiceFont The optional invoice font to edit
     */
    function EditInvoiceFont(name, invoiceFont) {
        var _this = _super.call(this, language.font) || this;
        _this.name = name;
        _this.invoiceFont = invoiceFont;
        /** These subscribers are called when the user presses "OK" */
        _this.onEdit = [];
        //The available fonts to choose from
        var fonts = [
            { value: "arial", text: "Arial" },
            { value: "courier", text: "Courier" },
            { value: "helvetica", text: "Helvetica" },
            { value: "symbol", text: "Symbol" },
            { value: "times", text: "Times New Roman" },
            { value: "zapfdingbats", text: "Zapf Dingbats	" }
        ];
        //The available font sizes to choose from
        var sizes = [];
        for (var i = 5; i <= 24; i += 0.5) {
            sizes.push({
                value: "" + i,
                text: "" + i
            });
        }
        //The layout of the view
        _this.allOptions = [
            { name: language.name, value: { id: "name", type: "text", value: name } },
            { name: language.font, value: { id: "font", type: "select", options: fonts, value: ((invoiceFont != undefined) ? invoiceFont.font.toLowerCase() : undefined) } },
            { name: language.size, value: { id: "size", type: "select", options: sizes, value: ((invoiceFont != undefined) ? "" + invoiceFont.size : undefined) } },
            { name: language.fontWeight, value: {
                    id: "bold",
                    type: "checkbox",
                    text: language.bold,
                    value: ((invoiceFont != undefined && invoiceFont.weight.indexOf("B") != -1) ? "true" : undefined)
                } },
            { name: "", value: {
                    id: "italic",
                    type: "checkbox",
                    text: language.italic,
                    value: ((invoiceFont != undefined && invoiceFont.weight.indexOf("I") != -1) ? "true" : undefined)
                } },
            { name: "", value: {
                    id: "underline",
                    type: "checkbox",
                    text: language.underline,
                    value: ((invoiceFont != undefined && invoiceFont.weight.indexOf("U") != -1) ? "true" : undefined)
                } }
        ];
        return _this;
    }
    EditInvoiceFont.prototype.getViewName = function () {
        return "EditInvoiceFont";
    };
    EditInvoiceFont.prototype.onShowing = function () {
        //Creating the view from the layout
        this.rootElement = this.window.addNameValueContent(this.allOptions, this.objects);
        return true;
    };
    EditInvoiceFont.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var name = this.objects.name.getValue();
        var font = this.objects.font.getValue();
        var size = this.objects.size.getValue();
        if (name == "" || font == "" || size == "") {
            alert(language.provideOneValue);
            return false;
        }
        var bold = this.objects.bold.getBooleanValue();
        var italic = this.objects.italic.getBooleanValue();
        var underline = this.objects.underline.getBooleanValue();
        var weight = (bold ? "B" : "") + (italic ? "I" : "") + (underline ? "U" : "");
        //Notify subsribers
        this.onEdit.forEach(function (handler) {
            handler(name, font, parseFloat(size), weight);
        });
        return true;
    };
    return EditInvoiceFont;
}(BaseView));
/**
 * Shows the window the edit in invoice image
 */
var EditInvoiceImage = /** @class */ (function (_super) {
    __extends(EditInvoiceImage, _super);
    /**
     * COnstructs the view
     *@param invoiceImage The optional invoice image to edit
     */
    function EditInvoiceImage(invoiceImage) {
        var _this = _super.call(this, language.image) || this;
        _this.invoiceImage = invoiceImage;
        /** These subscribers are called when the user presses "OK" */
        _this.onEdit = [];
        //The layout of the view
        _this.allOptions = [
            { name: language.path, value: { id: "path", type: "text", value: ((invoiceImage != undefined) ? invoiceImage.path : undefined) } },
            { name: language.xPosition, value: { id: "x", type: "text", value: ((invoiceImage != undefined) ? invoiceImage.x : undefined) } },
            { name: language.yPosition, value: { id: "y", type: "text", value: ((invoiceImage != undefined) ? invoiceImage.y : undefined) } },
            { name: language.width, value: { id: "width", type: "text", value: ((invoiceImage != undefined) ? invoiceImage.width : undefined) } },
            { name: language.height, value: { id: "height", type: "text", value: ((invoiceImage != undefined) ? invoiceImage.height : undefined) } }
        ];
        return _this;
    }
    EditInvoiceImage.prototype.getViewName = function () {
        return "EditInvoiceImage";
    };
    EditInvoiceImage.prototype.onShowing = function () {
        //Creating the view from the layout
        this.rootElement = this.window.addNameValueContent(this.allOptions, this.objects);
        return true;
    };
    EditInvoiceImage.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var path = this.objects.path.getValue();
        var x = this.objects.x.getValue();
        var y = this.objects.y.getValue();
        var width = this.objects.width.getValue();
        var height = this.objects.height.getValue();
        if (path == "" || x == "" || y == "" || (width == "" && height == "")) {
            alert(language.provideOneValue);
            return false;
        }
        //Notify subsribers
        this.onEdit.forEach(function (handler) {
            handler(path, x, y, width, height);
        });
        return true;
    };
    return EditInvoiceImage;
}(BaseView));
/**
 * Shows the window the edit the invoice products
 * Mandatory fields to set:
 *  - onAddFont
 *  - onEditFont
 */
var EditInvoiceProducts = /** @class */ (function (_super) {
    __extends(EditInvoiceProducts, _super);
    /**
     * COnstructs the view
     * @param availableFonts All available fonts
     * @param invoiceProducts The optional invoice products to edit
     */
    function EditInvoiceProducts(availableFonts, invoiceProducts) {
        var _this = _super.call(this, language.products) || this;
        _this.availableFonts = availableFonts;
        _this.invoiceProducts = invoiceProducts;
        /** These subscribers are called when the user presses "OK" */
        _this.onEdit = [];
        //The available fonts to choose from
        var fonts = [];
        for (var name_1 in availableFonts) {
            fonts.push({
                value: name_1,
                text: name_1
            });
        }
        //The layout of the view
        _this.allOptions = [
            [
                { type: "label", text: language.font },
                { type: "select", id: "font", options: fonts, value: ((invoiceProducts != undefined) ? invoiceProducts.font : undefined) },
                { type: "button", text: "...", target: function () { return _this.editFont(_this.objects.font.getValue()); } },
                { type: "button", text: "+", target: function () { return _this.editFont(); } }
            ]
        ];
        return _this;
    }
    EditInvoiceProducts.prototype.getViewName = function () {
        return "EditInvoiceProducts";
    };
    /**
     * Shows the window to edit the given font by calling
     * onAddFont or onEditFont
     * @param fontName The name of the font to edit
     */
    EditInvoiceProducts.prototype.editFont = function (fontName) {
        var _this = this;
        if (fontName == undefined || fontName == "") {
            this.onAddFont().then(function (newFont) {
                var name = newFont.name;
                var font = newFont.font;
                _this.objects.font.addOption({
                    value: name,
                    text: name
                });
            });
            return;
        }
        var font = this.availableFonts[fontName];
        this.onEditFont(fontName, font).then(function (newName) {
            console.log("Changing font " + fontName + " to " + newName);
            _this.objects.font.changeOption(fontName, newName, newName);
        });
    };
    EditInvoiceProducts.prototype.onShowing = function () {
        //Creating the view from the layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        return true;
    };
    EditInvoiceProducts.prototype.onOKClicked = function () {
        var font = this.objects.font.getValue();
        //Notify subsribers
        this.onEdit.forEach(function (handler) {
            handler(font);
        });
        return true;
    };
    return EditInvoiceProducts;
}(BaseView));
/**
 * Shows the window the edit the invoice tax
 * Mandatory fields to set:
 *  - onAddFont
 *  - onEditFont
 */
var EditInvoiceTax = /** @class */ (function (_super) {
    __extends(EditInvoiceTax, _super);
    /**
     * COnstructs the view
     * @param availableFonts All available fonts
     * @param invoiceTax The optional invoice tax to edit
     */
    function EditInvoiceTax(availableFonts, invoiceTax) {
        var _this = _super.call(this, language.tax) || this;
        _this.availableFonts = availableFonts;
        _this.invoiceTax = invoiceTax;
        /** These subscribers are called when the user presses "OK" */
        _this.onEdit = [];
        var fonts = [];
        for (var name_2 in availableFonts) {
            fonts.push({
                value: name_2,
                text: name_2
            });
        }
        //The layout of the view
        _this.allOptions = [
            [
                { type: "label", text: language.font },
                { type: "select", id: "font", options: fonts, value: ((invoiceTax != undefined) ? invoiceTax.font : undefined) },
                { type: "button", text: "...", target: function () { return _this.editFont(_this.objects.font.getValue()); } },
                { type: "button", text: "+", target: function () { return _this.editFont(); } }
            ]
        ];
        return _this;
    }
    EditInvoiceTax.prototype.getViewName = function () {
        return "EditInvoiceTax";
    };
    /**
     * Shows the window to edit the given font by calling
     * onAddFont or onEditFont
     * @param fontName The name of the font to edit
     */
    EditInvoiceTax.prototype.editFont = function (fontName) {
        var _this = this;
        if (fontName == undefined || fontName == "") {
            this.onAddFont().then(function (newFont) {
                var name = newFont.name;
                var font = newFont.font;
                _this.objects.font.addOption({
                    value: name,
                    text: name
                });
            });
            return;
        }
        var font = this.availableFonts[fontName];
        this.onEditFont(fontName, font).then(function (newName) {
            console.log("Changing font " + fontName + " to " + newName);
            _this.objects.font.changeOption(fontName, newName, newName);
        });
    };
    EditInvoiceTax.prototype.onShowing = function () {
        //Creating the view from the layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        return true;
    };
    EditInvoiceTax.prototype.onOKClicked = function () {
        var font = this.objects.font.getValue();
        //Notify subsribers
        this.onEdit.forEach(function (handler) {
            handler(font);
        });
        return true;
    };
    return EditInvoiceTax;
}(BaseView));
/**
 * Shows the window the edit in invoice text
 * Mandatory fields to set:
 *  - onAddFont
 *  - onEditFont
 */
var EditInvoiceText = /** @class */ (function (_super) {
    __extends(EditInvoiceText, _super);
    /**
     * COnstructs the view
     * @param availableFonts All available fonts
     * @param invoiceText The optional invoice text to edit
     */
    function EditInvoiceText(availableFonts, invoiceText) {
        var _this = _super.call(this, language.text) || this;
        _this.availableFonts = availableFonts;
        _this.invoiceText = invoiceText;
        /** These subscribers are called when the user presses "OK" */
        _this.onEdit = [];
        //All available fonts
        var fonts = [];
        for (var name_3 in availableFonts) {
            fonts.push({
                value: name_3,
                text: name_3
            });
        }
        //All available text aligns
        var aligns = [
            { value: "left", text: language.alignLeft },
            { value: "center", text: language.alignCenter },
            { value: "right", text: language.alignRight }
        ];
        //The layout of the view
        _this.allOptions = [
            [
                { type: "label", text: language.font },
                { type: "select", id: "font", options: fonts, value: ((invoiceText != undefined) ? invoiceText.font : undefined) },
                { type: "button", text: "...", target: function () { return _this.editFont(_this.objects.font.getValue()); } },
                { type: "button", text: "+", target: function () { return _this.editFont(); } }
            ], [
                { type: "label", text: language.align },
                { type: "select", id: "align", options: aligns, value: ((invoiceText != undefined) ? invoiceText.align : undefined) }
            ],
            [
                { id: "text", type: "textarea", settings: { colspan: 3 }, value: ((invoiceText != undefined) ? invoiceText.text : undefined) },
                { type: "container", objects: [
                        { type: "label", text: language.placeholders },
                        { type: "list", objects: [
                                { type: "link", text: language.invoiceNumber, target: function () { return _this.insertText("%%invoice_number%%"); } },
                                { type: "link", text: language.invoiceDate, target: function () { return _this.insertText("%%invoice_date%%"); } },
                                { type: "link", text: language.companyName, target: function () { return _this.insertText("%%company_name%%"); } },
                                { type: "link", text: language.address1, target: function () { return _this.insertText("%%company_address1%%"); } },
                                { type: "link", text: language.address2, target: function () { return _this.insertText("%%company_address2%%"); } },
                                { type: "link", text: language.telephone, target: function () { return _this.insertText("%%company_telephone%%"); } },
                                { type: "link", text: language.homepage, target: function () { return _this.insertText("%%company_homepage%%"); } },
                                { type: "link", text: language.taxId, target: function () { return _this.insertText("%%company_taxid%%"); } },
                            ] }
                    ] }
            ]
        ];
        return _this;
    }
    EditInvoiceText.prototype.getViewName = function () {
        return "EditInvoiceText";
    };
    /**
     * Inserts the given text at the current caret position
     * @param text The text to insert
     */
    EditInvoiceText.prototype.insertText = function (text) {
        this.objects.text.insert(text);
    };
    /**
     * Shows the window to edit the given font by calling
     * onAddFont or onEditFont
     * @param fontName The name of the font to edit
     */
    EditInvoiceText.prototype.editFont = function (fontName) {
        var _this = this;
        if (fontName == undefined || fontName == "") {
            this.onAddFont().then(function (newFont) {
                var name = newFont.name;
                var font = newFont.font;
                _this.objects.font.addOption({
                    value: name,
                    text: name
                });
            });
            return;
        }
        var font = this.availableFonts[fontName];
        this.onEditFont(fontName, font).then(function (newName) {
            console.log("Changing font " + fontName + " to " + newName);
            _this.objects.font.changeOption(fontName, newName, newName);
        });
    };
    EditInvoiceText.prototype.onShowing = function () {
        //Creating the view from the layout
        this.rootElement = this.window.addTableContent(this.allOptions, this.objects);
        return true;
    };
    EditInvoiceText.prototype.onOKClicked = function () {
        //Check if all mandatory fields are set
        var text = this.objects.text.getValue();
        if (text == "") {
            alert(language.provideOneValue);
            return false;
        }
        var font = this.objects.font.getValue();
        var align = this.objects.align.getValue();
        //Notify subsribers
        this.onEdit.forEach(function (handler) {
            handler(text, font, align);
        });
        return true;
    };
    return EditInvoiceText;
}(BaseView));
/// <reference path="twindow.content.object.ts"/>
/**
 * This twindow content element represents a button
 */
var TWindowButton = /** @class */ (function (_super) {
    __extends(TWindowButton, _super);
    function TWindowButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowButton.prototype.init = function () {
        var _this = this;
        this.htmlElement = document.createElement("button");
        this.htmlElement.className = "styled-button";
        if (this.definition.text != undefined)
            this.htmlElement.appendChild(document.createTextNode(this.definition.text));
        if (this.definition.target != undefined)
            this.htmlElement.onclick = function () { return _this.definition.target(_this); };
        _super.prototype.init.call(this);
    };
    /**
     * Sets the text of the button
     * @param text The text of the button
     */
    TWindowButton.prototype.setText = function (text) {
        this.htmlElement.innerHTML = "";
        this.htmlElement.appendChild(document.createTextNode(text));
    };
    return TWindowButton;
}(TWindowContentObject));
/**
 * This twindow content element represents a checkbox
 */
var TWindowCheckbox = /** @class */ (function (_super) {
    __extends(TWindowCheckbox, _super);
    function TWindowCheckbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowCheckbox.prototype.init = function () {
        this.htmlElement = document.createElement("span");
        this.innerCheckbox = document.createElement("input");
        this.htmlElement.appendChild(this.innerCheckbox);
        this.textElement = document.createElement("span");
        this.htmlElement.appendChild(this.textElement);
        this.innerCheckbox.type = "checkbox";
        if (this.definition.text != null)
            this.setText(this.definition.text);
        _super.prototype.init.call(this);
    };
    /**
     * Returns whether the checkbox is checked or not as string
     */
    TWindowCheckbox.prototype.getValue = function () {
        return this.getBooleanValue() ? "true" : "false";
    };
    /**
     * Returns whether the checkbox is checked or not
     */
    TWindowCheckbox.prototype.getBooleanValue = function () {
        return this.innerCheckbox.checked;
    };
    /**
     * Sets whether the checkbox is checked or not
     * @param value The value of the checkbox
     */
    TWindowCheckbox.prototype.setValue = function (value) {
        this.innerCheckbox.checked = (value == "true" || value == true);
    };
    /**
     * Registers for the change event where the callback is
     * called with the boolean value
     * @param callback The callback which is called
     */
    TWindowCheckbox.prototype.onBooleanChange = function (callback) {
        var _this = this;
        this.htmlElement.onchange = function () {
            callback(_this.getBooleanValue());
        };
    };
    /**
     * Registers for the change event where the callback is
     * called with the string value
     * @param callback The callback which is called
     */
    TWindowCheckbox.prototype.onChange = function (callback) {
        var _this = this;
        this.htmlElement.onchange = function () {
            callback(_this.getValue());
        };
    };
    /**
     * Sets the text of the checkbox
     * @param text The text of the checkbox
     */
    TWindowCheckbox.prototype.setText = function (text) {
        this.textElement.innerHTML = "";
        this.textElement.appendChild(document.createTextNode(text));
    };
    return TWindowCheckbox;
}(TWindowContentObject));
/**
 * This twindow content element represents a color chooser
 */
var TWindowColor = /** @class */ (function (_super) {
    __extends(TWindowColor, _super);
    function TWindowColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowColor.prototype.init = function () {
        this.htmlElement = document.createElement("input");
        this.htmlElement.type = "text";
        this.myColor = new jscolor.color(this.htmlElement);
        _super.prototype.init.call(this);
    };
    /**
     * Gets the current value
     */
    TWindowColor.prototype.getValue = function () {
        return this.htmlElement.value;
    };
    /**
     * Sets the value
     * @param value The value
     */
    TWindowColor.prototype.setValue = function (value) {
        this.myColor.fromString(value);
    };
    /**
     * Registers a change callback
     * @param callback The callback which is called when the value changes
     */
    TWindowColor.prototype.onChange = function (callback) {
        var _this = this;
        this.htmlElement.onchange = function () {
            callback(_this.getValue());
        };
    };
    return TWindowColor;
}(TWindowContentObject));
/**
 * This twindow content element represents a
 * generic container to add other elements
 */
var TWindowContainer = /** @class */ (function (_super) {
    __extends(TWindowContainer, _super);
    /**
     * Constructs the element
     * @param definition The object definition
     * @param objects The container which holds all the elements wit an id
     * @param window The parent window
     */
    function TWindowContainer(definition, objects, window) {
        var _this = _super.call(this, definition, window) || this;
        _this.objects = objects;
        return _this;
    }
    TWindowContainer.prototype.init = function () {
        this.htmlElement = document.createElement("div");
        //Add all elements
        if (this.definition.objects != undefined) {
            for (var i = 0; i < this.definition.objects.length; i++) {
                var innerObject = this.definition.objects[i];
                this.addObject(innerObject);
            }
        }
        _super.prototype.init.call(this);
    };
    /**
     * Adds the given object to the container
     * @param innerObject The definition of the object to add
     */
    TWindowContainer.prototype.addObject = function (innerObject) {
        var innerElement = this.window.createElement(innerObject, this.objects);
        this.htmlElement.appendChild(innerElement.htmlElement);
        if (innerObject.id != null) {
            this.objects[innerObject.id] = innerElement;
        }
        return innerElement;
    };
    /**
     * Removes all child elements
     */
    TWindowContainer.prototype.clear = function () {
        this.htmlElement.innerHTML = "";
    };
    return TWindowContainer;
}(TWindowContentObject));
/**
 * This twindow content element represents a label
 */
var TWindowLabel = /** @class */ (function (_super) {
    __extends(TWindowLabel, _super);
    function TWindowLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowLabel.prototype.init = function () {
        this.htmlElement = document.createElement("span");
        if (this.definition.text != undefined)
            this.htmlElement.appendChild(document.createTextNode(this.definition.text));
        if (this.definition.settings != null && this.definition.settings.fontWeight != null) {
            this.htmlElement.style.fontWeight = this.definition.settings.fontWeight;
        }
        _super.prototype.init.call(this);
    };
    /**
     * Sets the text of the label
     * @param text The text
     */
    TWindowLabel.prototype.setText = function (text) {
        this.htmlElement.innerHTML = "";
        this.htmlElement.appendChild(document.createTextNode(text));
    };
    ;
    return TWindowLabel;
}(TWindowContentObject));
/**
 * This twindow content element represents a link
 */
var TWindowLink = /** @class */ (function (_super) {
    __extends(TWindowLink, _super);
    function TWindowLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowLink.prototype.init = function () {
        var _this = this;
        this.htmlElement = document.createElement("a");
        if (this.definition.target != undefined)
            this.htmlElement.onclick = function () { return _this.definition.target(_this); };
        if (this.definition.text != undefined)
            this.htmlElement.appendChild(document.createTextNode(this.definition.text));
        _super.prototype.init.call(this);
    };
    /**
     * Sets the text of the link
     * @param text The text
     */
    TWindowLink.prototype.setText = function (text) {
        this.htmlElement.innerHTML = "";
        this.htmlElement.appendChild(document.createTextNode(text));
    };
    return TWindowLink;
}(TWindowContentObject));
/**
 * This twindow content element represents an unsorted list
 */
var TWindowList = /** @class */ (function (_super) {
    __extends(TWindowList, _super);
    /**
     * Constructs the element
     * @param definition The object definition
     * @param objects The container which holds all the elements wit an id
     * @param window The parent window
     */
    function TWindowList(definition, objects, window) {
        var _this = _super.call(this, definition, window) || this;
        _this.objects = objects;
        return _this;
    }
    TWindowList.prototype.init = function () {
        this.htmlElement = document.createElement("ul");
        //Add all elements
        if (this.definition.objects != undefined) {
            for (var i = 0; i < this.definition.objects.length; i++) {
                var innerObject = this.definition.objects[i];
                this.addObject(innerObject);
            }
        }
        _super.prototype.init.call(this);
    };
    /**
     * Adds the given element
     * @param innerObject The definition of the element to add
     */
    TWindowList.prototype.addObject = function (innerObject) {
        var innerElement = this.window.createElement(innerObject, this.objects);
        var li = document.createElement("li");
        li.appendChild(innerElement.htmlElement);
        this.htmlElement.appendChild(li);
        if (innerObject.id != null) {
            this.objects[innerObject.id] = innerElement;
        }
    };
    /**
     * Removes all child elements
     */
    TWindowList.prototype.clear = function () {
        this.htmlElement.innerHTML = "";
    };
    return TWindowList;
}(TWindowContentObject));
/**
 * This twindow content element represents a new line
 */
var TWindowNewline = /** @class */ (function (_super) {
    __extends(TWindowNewline, _super);
    function TWindowNewline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowNewline.prototype.init = function () {
        this.htmlElement = document.createElement("br");
        _super.prototype.init.call(this);
    };
    return TWindowNewline;
}(TWindowContentObject));
/**
 * This twindow content element represents a searchable select
 */
var TWindowSearchselect = /** @class */ (function (_super) {
    __extends(TWindowSearchselect, _super);
    function TWindowSearchselect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowSearchselect.prototype.init = function () {
        var _this = this;
        this.htmlElement = document.createElement("div");
        this.dhtml = new dhtmlXCombo(this.htmlElement, "searchselect" + this.definition.id, "400px");
        this.dhtml.enableFilteringMode("between");
        //Add select options
        if (this.definition.options != undefined) {
            this.definition.options.forEach(function (entry) {
                _this.addOption(entry);
            });
        }
        this.allowFreeText = (this.definition.settings != null && this.definition.settings.allowFreeText == true);
        if (this.allowFreeText)
            this.dhtml.allowFreeText(true);
        _super.prototype.init.call(this);
    };
    /**
     * Returns the currently selected value
     */
    TWindowSearchselect.prototype.getValue = function () {
        if (this.allowFreeText)
            return this.dhtml.getComboText();
        else
            return this.dhtml.getSelectedValue();
    };
    /**
     * Sets the value of the search select
     * @param value The value
     */
    TWindowSearchselect.prototype.setValue = function (value) {
        this.dhtml.setComboValue(value);
    };
    /**
     * Adds a new option to the search select
     * @param entry The new option to add
     */
    TWindowSearchselect.prototype.addOption = function (entry) {
        this.dhtml.addOption(entry.value, entry.text);
    };
    /**
     * Registers a change callback
     * @param callback The callback which is called when the value changes
     */
    TWindowSearchselect.prototype.onChange = function (callback) {
        var _this = this;
        this.dhtml.attachEvent("onChange", function () {
            callback(_this.getValue());
        });
    };
    return TWindowSearchselect;
}(TWindowContentObject));
/**
 * This twindow content element represents a select
 */
var TWindowSelect = /** @class */ (function (_super) {
    __extends(TWindowSelect, _super);
    function TWindowSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowSelect.prototype.init = function () {
        var _this = this;
        this.htmlElement = document.createElement("div");
        this.htmlElement.className = "styled-select";
        this.innerSelect = document.createElement("select");
        this.htmlElement.appendChild(this.innerSelect);
        if (this.definition.options != undefined) {
            this.definition.options.forEach(function (option) {
                _this.addOption(option);
            });
        }
        _super.prototype.init.call(this);
    };
    /**
     * Returns the value of the select
     */
    TWindowSelect.prototype.getValue = function () {
        return this.innerSelect.value;
    };
    /**
     * Sets the valu of the select
     * @param value The value
     */
    TWindowSelect.prototype.setValue = function (value) {
        this.innerSelect.value = value;
    };
    /**
     * Adds an additional option to the select
     * @param option The option to add
     */
    TWindowSelect.prototype.addOption = function (option) {
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.appendChild(document.createTextNode(option.text));
        this.innerSelect.appendChild(optionElement);
    };
    /**
     * Changes the text and optionally also the value
     * of an option.
     * @param value The old value
     * @param text The new text
     * @param newValu The new value. Can be omitted, then the old value is preserved
     */
    TWindowSelect.prototype.changeOption = function (value, text, newValue) {
        for (var i = 0; i < this.innerSelect.children.length; i++) {
            var child = this.innerSelect.children[i];
            if (child.value == value) {
                child.innerHTML = text;
                if (newValue != undefined && newValue != value)
                    child.value = newValue;
                break;
            }
        }
    };
    /**
     * Removes an option from the select
     * @param value The value of the option to remove
     */
    TWindowSelect.prototype.removeOption = function (value) {
        for (var i = 0; i < this.innerSelect.children.length; i++) {
            var child = this.innerSelect.children[i];
            if (child.value == value) {
                child.remove();
                break;
            }
        }
    };
    /**
     * Registers a change callback
     * @param callback The callback which is called when the value changes
     */
    TWindowSelect.prototype.onChange = function (callback) {
        var _this = this;
        this.innerSelect.onchange = function () {
            callback(_this.getValue());
        };
    };
    /**
     * Enables or disables the select
     * @param enabled Whether to enable or disable the select
     */
    TWindowSelect.prototype.setEnabled = function (enabled) {
        if (enabled)
            this.innerSelect.removeAttribute("disabled");
        else
            this.innerSelect.setAttribute("disabled", "disabled");
    };
    return TWindowSelect;
}(TWindowContentObject));
/**
 * This twindow content element represents a
 * table which can hold multiple other elements
 */
var TWindowTable = /** @class */ (function (_super) {
    __extends(TWindowTable, _super);
    /**
     * Constructs the element
     * @param definition The object definition
     * @param objects The container which holds all the elements wit an id
     * @param window The parent window
     */
    function TWindowTable(definition, objects, window) {
        var _this = _super.call(this, definition, window) || this;
        _this.objects = objects;
        return _this;
    }
    TWindowTable.prototype.init = function () {
        var _this = this;
        this.htmlElement = document.createElement("table");
        if (this.definition.cells != undefined) {
            this.definition.cells.forEach(function (cell) {
                _this.addRow(cell);
            });
        }
        _super.prototype.init.call(this);
    };
    /**
     * Adds a new row to the table
     * @param row The definition of the row
     * @param position The desired position of the row
     */
    TWindowTable.prototype.addRow = function (row, position) {
        var _this = this;
        if (position == undefined)
            position = this.htmlElement.rows.length;
        var rowElement = this.htmlElement.insertRow(position);
        var cellCounter = 0;
        row.forEach(function (cell) {
            var cellElement;
            if (cell.settings != null && cell.settings.header == true) {
                cellElement = document.createElement("th");
                rowElement.appendChild(cellElement);
            }
            else {
                cellElement = rowElement.insertCell(cellCounter++);
            }
            if (cell.settings != null) {
                if (cell.settings.colspan != null)
                    cellElement.colSpan = cell.settings.colspan;
                if (cell.settings.rowspan != null)
                    cellElement.rowSpan = cell.settings.rowspan;
            }
            var element = _this.window.createElement(cell, _this.objects);
            cellElement.appendChild(element.htmlElement);
            if (cell.id != null) {
                _this.objects[cell.id] = element;
            }
        });
    };
    /**
     * Returns the amount of rows
     */
    TWindowTable.prototype.rowsCount = function () {
        return this.htmlElement.rows.length;
    };
    /**
     * Clears the content of the table
     */
    TWindowTable.prototype.clear = function () {
        this.htmlElement.innerHTML = "";
    };
    return TWindowTable;
}(TWindowContentObject));
/**
 * This twindow content element represents a text input element
 */
var TWindowText = /** @class */ (function (_super) {
    __extends(TWindowText, _super);
    function TWindowText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowText.prototype.init = function () {
        this.htmlElement = document.createElement("input");
        this.htmlElement.type = "text";
        if (this.definition.placeholder != undefined)
            this.htmlElement.placeholder = this.definition.placeholder;
        _super.prototype.init.call(this);
    };
    /**
     * Gets the value of the text input
     */
    TWindowText.prototype.getValue = function () {
        return this.htmlElement.value;
    };
    /**
     * Sets the value of the text input
     * @param value The value
     */
    TWindowText.prototype.setValue = function (value) {
        this.htmlElement.value = value;
    };
    /**
     * Inserts the given text at the current position
     * of the caret
     * @param text The text to insert
     */
    TWindowText.prototype.insert = function (text) {
        var caret = this.htmlElement.selectionStart;
        var value = this.htmlElement.value;
        this.htmlElement.value = value.substr(0, caret) + text + value.substr(caret);
    };
    /**
     * Registers a change callback
     * @param callback The callback which is called when the value changes
     */
    TWindowText.prototype.onChange = function (callback) {
        var _this = this;
        this.htmlElement.onchange = function () {
            callback(_this.getValue());
        };
    };
    /**
     * Registers a delayed change callback
     * @param callback The callback which is called when the value changes
     */
    TWindowText.prototype.onDelayedInput = function (callback, delay) {
        var _this = this;
        if (delay === void 0) { delay = 1000; }
        var lastTimeout = -1;
        this.htmlElement.oninput = function () {
            if (lastTimeout != -1)
                clearTimeout(lastTimeout);
            lastTimeout = setTimeout(function () {
                lastTimeout = -1;
                callback(_this.getValue());
            }, delay);
        };
    };
    return TWindowText;
}(TWindowContentObject));
/**
 * This twindow content element represents a text area
 * input element
 */
var TWindowTextarea = /** @class */ (function (_super) {
    __extends(TWindowTextarea, _super);
    function TWindowTextarea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TWindowTextarea.prototype.init = function () {
        this.htmlElement = document.createElement("textarea");
        _super.prototype.init.call(this);
    };
    /**
     * Gets the value of the text area
     */
    TWindowTextarea.prototype.getValue = function () {
        return this.htmlElement.value;
    };
    /**
     * Sets the value of the text area
     * @param value The value
     */
    TWindowTextarea.prototype.setValue = function (value) {
        this.htmlElement.value = value;
    };
    /**
     * Inserts the given text at the current position
     * of the caret
     * @param text The text to insert
     */
    TWindowTextarea.prototype.insert = function (text) {
        var caret = this.htmlElement.selectionStart;
        var value = this.htmlElement.value;
        this.htmlElement.value = value.substr(0, caret) + text + value.substr(caret);
    };
    /**
     * Registers a change callback
     * @param callback The callback which is called when the value changes
     */
    TWindowTextarea.prototype.onChange = function (callback) {
        var _this = this;
        this.htmlElement.onchange = function () {
            callback(_this.getValue());
        };
    };
    /**
     * Registers a delayed change callback
     * @param callback The callback which is called when the value changes
     */
    TWindowTextarea.prototype.onDelayedInput = function (callback, delay) {
        var _this = this;
        if (delay === void 0) { delay = 1000; }
        var lastTimeout = -1;
        this.htmlElement.oninput = function () {
            if (lastTimeout != -1)
                clearTimeout(lastTimeout);
            lastTimeout = setTimeout(function () {
                lastTimeout = -1;
                callback(_this.getValue());
            }, delay);
        };
    };
    return TWindowTextarea;
}(TWindowContentObject));
/**
 * This is the main file of the tWindow library.
 * It is a library to show views based on a layout.
 * Elements can be added dynamically and events
 * can be registered. It also handles scrolling using
 * the iScroll library
 */
var TWindow = /** @class */ (function () {
    function TWindow(title) {
        var _this = this;
        this.customElements = {};
        //Create html elements
        this.window = document.createElement('div');
        this.frame = document.createElement('div');
        this.title = document.createElement("h2");
        this.okButton = document.createElement('button');
        this.cancelButton = document.createElement('button');
        this.scrollHelper = document.createElement('div');
        this.window.className = "inputWindow";
        this.frame.className = "frame";
        this.setTitle(title);
        this.title.className = "title";
        this.window.appendChild(this.title);
        this.window.appendChild(this.scrollHelper);
        this.scrollHelper.className = "scroll";
        this.scrollHelper.appendChild(this.frame);
        //Create buttons
        var buttons = document.createElement('div');
        this.window.appendChild(buttons);
        buttons.className = "windowButtons";
        this.okButton.className = "styled-button";
        this.cancelButton.className = "styled-button";
        this.okButton.innerHTML = language.ok;
        this.cancelButton.innerHTML = language.cancel;
        buttons.appendChild(this.cancelButton);
        buttons.appendChild(this.okButton);
        //Register click events for buttons
        this.cancelButton.onclick = function () {
            if (_this.cancelCallback == null || _this.cancelCallback() == true)
                _this.close();
        };
        this.okButton.onclick = function () {
            if (_this.okCallback == null || _this.okCallback() == true)
                _this.close();
        };
    }
    /**
     * This function closes the findow
     * The closeCallback is called before
     */
    TWindow.prototype.close = function () {
        if (this.closeCallback != null) {
            if (!this.closeCallback())
                return;
        }
        //Remove from list of currently opened windows
        for (var i = 0; i < TWindow.currentWindows.length; i++) {
            if (TWindow.currentWindows[i] == this) {
                TWindow.currentWindows.splice(i, 1);
                break;
            }
        }
        if (this.window.parentNode != undefined)
            this.window.parentNode.removeChild(this.window);
        if (this.scroll != null)
            this.scroll.destroy();
    };
    /**
     * Sets the title of the window
     * @param title The title
     */
    TWindow.prototype.setTitle = function (title) {
        this.title.innerHTML = "";
        this.title.appendChild(document.createTextNode(title));
    };
    /**
     * Shows the window
     */
    TWindow.prototype.show = function () {
        document.body.appendChild(this.window);
        TWindow.currentWindows.push(this);
        this.adjustSize();
    };
    /**
     * Enables or disables scrolling based on the window size
     */
    TWindow.prototype.adjustSize = function () {
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (this.window.offsetHeight > h) {
            if (this.scroll == null) {
                this.window.style.height = "90%";
                this.scroll = new IScroll(this.scrollHelper, {
                    mouseWheel: true,
                    scrollbars: true,
                    disableMouse: true,
                    disablePointer: true
                });
            }
        }
        else if (this.scroll != null) {
            this.window.style.height = null;
            this.scroll.destroy();
            this.scroll = undefined;
            //Check again if window fits now...
            this.adjustSize();
        }
    };
    /**
     * Adds a custom element as content
     */
    TWindow.prototype.addCustomContent = function (content) {
        this.frame.appendChild(content);
    };
    /**
     * Sets the function which should be called when the user clicks ok
     * @param callback The callback
     */
    TWindow.prototype.setOKCallback = function (callback) {
        this.okCallback = callback;
    };
    /**
     * Sets the function which should be called when the user clicks cancel
     * @param callback The callback
     */
    TWindow.prototype.setCancelCallback = function (callback) {
        this.cancelCallback = callback;
    };
    /**
     * Sets the function which should be called when the
     * window is closed
     * @param callback The callback
     */
    TWindow.prototype.setCloseCallback = function (callback) {
        this.closeCallback = callback;
    };
    /**
     * Changes the visibility of the ok button
     * @param visible Whether the ok button should be visble or not
     */
    TWindow.prototype.setOKButtonVisible = function (visible) {
        this.okButton.style.display = (visible) ? "" : "none";
    };
    /**
     * Changes the visibility of the cancel button
     * @param visible Whether the cacnel button should be visble or not
     */
    TWindow.prototype.setCancelButtonVisible = function (visible) {
        this.cancelButton.style.display = (visible) ? "" : "none";
    };
    /**
     * Adds a name-valu content to the window.
     * This consists of multiple rows, each with
     * a label and a custom content
     * @param table The value-content table
     * @param objects The container where the objects with id are stored
     */
    TWindow.prototype.addNameValueContent = function (table, objects) {
        var finalTable = [];
        for (var i = 0; i < table.length; i++) {
            finalTable.push([
                { type: "label", text: table[i].name },
                table[i].value
            ]);
        }
        return this.addTableContent(finalTable, objects);
    };
    /**
     * Adds a table layout with multiple rows and multiple cells
     * to the window
     * @param table The table definition
     * @param objects The container where the objects with id are stored
     */
    TWindow.prototype.addTableContent = function (table, objects) {
        var tableElement = this.createElement({
            type: "table",
            cells: table
        }, objects);
        this.addCustomContent(tableElement.htmlElement);
        return tableElement;
    };
    /**
     * Creates an element for the given definition
     * @param object The object definition
     * @param objects The container where the objects with id are stored
     */
    TWindow.prototype.createElement = function (object, objects) {
        var element;
        switch (object.type) {
            case "label":
                element = new TWindowLabel(object, this);
                break;
            case "newline":
                element = new TWindowNewline(object, this);
                break;
            case "text":
                element = new TWindowText(object, this);
                break;
            case "color":
                element = new TWindowColor(object, this);
                break;
            case "select":
                element = new TWindowSelect(object, this);
                break;
            case "searchselect":
                element = new TWindowSearchselect(object, this);
                break;
            case "checkbox":
                element = new TWindowCheckbox(object, this);
                break;
            case "link":
                element = new TWindowLink(object, this);
                break;
            case "textarea":
                element = new TWindowTextarea(object, this);
                break;
            case "button":
                element = new TWindowButton(object, this);
                break;
            case "container":
                element = new TWindowContainer(object, objects, this);
                break;
            case "table":
                element = new TWindowTable(object, objects, this);
                break;
            case "list":
                element = new TWindowList(object, objects, this);
                break;
            default:
                if (this.customElements[object.type] != undefined)
                    element = this.customElements[object.type](object, objects, this);
                else
                    element = new TWindowLabel({ type: "label", text: "Invalid object type " + object.type }, this);
                break;
        }
        element.init();
        return element;
    };
    /**
     * Registers a custom element which can be added
     * using its object definition
     * @param name The name of the object how its used in the definition
     * @param type A generator function which generates the element based on the definition
     * @param twindow The parent window
     */
    TWindow.prototype.registerCustomElement = function (name, type) {
        this.customElements[name] = type;
    };
    /**
     * Checks whether windows are currently active
     */
    TWindow.areWindowsActive = function () {
        return (TWindow.currentWindows.length > 0);
    };
    /**
     * Closes all opened windows
     */
    TWindow.closeAll = function () {
        for (var i = 0; i < TWindow.currentWindows.length; i++) {
            TWindow.currentWindows[i].close();
        }
    };
    /**
     * Adjusts the window size of all currently opened windows
     */
    TWindow.adjustAllWindowsSize = function () {
        TWindow.currentWindows.forEach(function (window) {
            window.adjustSize();
        });
    };
    /** All currently opened windows */
    TWindow.currentWindows = [];
    return TWindow;
}());
window.addEventListener('resize', function () {
    TWindow.adjustAllWindowsSize();
}, true);
//# sourceMappingURL=salonerp.js.map