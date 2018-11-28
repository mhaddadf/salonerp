/**
  * 
  * This folder contains all the customizations (php and js)
  * In this file we will cover the frontend customizations.
  * Please have a look at customizations.php for the backend
  * customizations
  * 
  * SalonERP contains some customization hooks you can use
  * to insert your customizations. Currently there are ony
  * a few ones but I will create more if you need - just
  * contact me!
  * The following frontend customization hooks exist at the
  * moment:
  *  - beforeShowXXX
  *  - showXXX
  *  - closeXXX:
  *    XXX stands for each view that exists in SalonERP. At
  *    the moment of writing this document, the following
  *    views exist:
  *     - AddInvoiceLine
  *     - EditCustomer (--> also add customer - then customer
  *       is undefined)
  *     - EditEmployee (--> also add employee - then employee
  *       is undefined)
  *     - EditEvent (--> also add event - then event is
  *       undefined)
  *     - EditProduct (--> also add product - then product is
  *       undefined)
  *     - OverviewCustomers
  *     - OverviewEmployees
  *     - OverviewProducts
  *     - OverviewReports
  *     - OverviewSettings
  *     - Pay
  *     - PayTotal
  *     - ShowReport
  *    You can edit each view after it is shown or e.g. add
  *    change events when the view is shown...
  *    The cusomization functions are called with the view as
  *    argument
  *  - productSelected: When a product is selected in the edit
  *    event view
  *  - customerSelected: When a customer is selected in the
  *    edit event view
  *  - productAndCustomerSelected: When both, a product and a
  *    customer are selected in the edit event view
  * The three events above are called with the following as
  * argument: { event: event, product: product, customer: customer }
  * 
  * Additionally to those customization hooks there are also
  * events you can listen to. The following events are available
  * at the time of writing this document:
  *  - eventsLoading
  *  - categoriesLoaded
  *  - productsLoaded
  *  - customersLoaded
  *  - employeesLoaded
  *  - newCustomer
  *  - newProduct
  *  - newEmployee
  *  - newCategory
  *  - newEvent
  *  - newSettings
  *  - deleteEvent
  *  - modifyCustomer
  *  - modifyProduct
  *  - modifyEmployee
  *  - modifyCategory
  *  - modifyEvent
  *  - changeTime
  *  - beforeNewCustomer
  *  - beforeNewProduct
  *  - beforeNewEmployee
  *  - beforeNewCategory
  *  - beforeNewEvent
  *  - beforeDeleteEvent
  *  - beforeModifyCustomer
  *  - beforeModifyProduct
  *  - beforeModifyEmployee
  *  - beforeModifyCategory
  *  - beforeModifyEvent
  *  - beforeChangeTime
  * 
  * You can subscribe to those events by e.g.:
  * SalonErpEvents.modifyCustomer.push(myEventHandler)
  * 
  * The signature of myEventHandler depends on the event.
  * Please have a look at src/salonerp.events.ts to find
  * more about the signature and please have a look at
  * src/salonerp.ts and salonerp.gui.ts when the events
  * are raised
  * 
  * 
  * Here is a small example how you could add an additional
  * setting, just place the following in a new js-file
  * in the current folder:
  * 
  * customizations["beforeShowOverviewSettings"] = function(settingsDialog){
  *		settingsDialog.allOptions.push({
  *			name: "Google",
  *			value: {
  *				type: "link",
  *				text: "open",
  *				target: function(){
  *					var win = window.open("https://google.com", '_blank');
  *					win.focus();
  *				}
  *			}
  *		});
  *	}
  * 
 **/
