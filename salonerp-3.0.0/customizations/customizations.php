<?php

/**
  * 
  * This folder contains all the customizations (php and js)
  * In this file we will cover the backend customizations.
  * Please have a look at customizations.js for the frontend
  * customizations
  * 
  * SalonERP is not too difficult to customize.
  * You can override any standard operation you want or create
  * new operations and use them in your customized frontend
  * script. The following operations are SalonERP's standard
  * methods:
  *  - updateEvent
  *  - resizeEvent
  *  - createInvoice
  *  - getEvents
  *  - createEvent
  *  - deleteEvent
  *  - getCustomers
  *  - getProducts
  *  - getCategories
  *  - createProduct
  *  - createCustomer
  *  - createEmployee
  *  - updateProduct
  *  - updateCustomer
  *  - updateEmployee
  *  - language
  *  - settings
  *  - getReports
  *  - saveSettings
  *  - getEmployees
  * 
  * In addition to the standard operations there exist also some specific
  * customizations:
  *  - getInvoiceNumber: This customization allows to change the invoice number.
  *    The customization function accepts one argument which is the invoice
  *    (database) id. The return value of this function should be the invoice number.
  *    Please have a look down for an example.
  *  - invoice customizations: You can create custom invoice elements by adding
  *    a customization *invoice-XXX* and *invoice-XXX-height* where XXX is the
  *    name of the new element. The customization invoice-XXX-height should return
  *    the height of the element - this is used to calculate the total height of the
  *    invoice. The customization invoice-XXX should actually paint the element.
  *    Both customizations receive the TCPF-element, full-argument and mapped-arguments
  *    as argument. Please have a look down for an example. The custom elements can
  *    then be used in the invoice designer
  * 
  * All customizations should be placed in their own files within this folder
  * 
  * 
  * Here is an example of how you can override standard operations:
  * 
  * //SalonERP by default allows to leave the address of a customer empty.
  * //you could change it using the following:
  * $customizations["createCustomer"] = function($data, $db)
  * {
  *		if($data['address'] == null)
  *			return array( "result" => 'Oh no boy you can't do this with my customization... Provide an address! :-)' );
  *
  * 	$customer = new Customer();
  *		$customer->setFirstname($data['firstname']);
  *		$customer->setLastname($data['lastname']);
  *		$customer->setComment($data['comment']);
  *		$customer->setAddress($data['address']);
  *		$customer->setTelephone($data['telephone']);
  *		$customer->setEmail($data['email']);
  *		$customer->save();
  *		return array( "result" => 'OK', "id" => $customer->getId() );
  * }
  * 
  * 
  * As you can see it's pretty easy to override standard operations.
  * You can have a look how these are implemented in backend.php
  * 
  * This example shows how to change the invoice number:
  * $customizations["getInvoiceNumber"] = function($id)
  * {
  * 	$invoiceNumber = "" . $id;
  * 	while(strlen($invoiceNumber) < 6)$invoiceNumber = "0" . $invoiceNumber;
  * 	$invoiceNumber = "R" . $invoiceNumber;
  * 	return $invoiceNumber;
  * };
  * 
  * This example shows how to add a qr code to the invoice:
  * 
  * It is also possible to create new database models by placing them
  * under the customizations/Models folder. You can have a look at
  * the php/Models folder to see the structure.
  * 
 **/

//Loading all customizations files in this folder
$folder = dirname(__FILE__);
if ($handle = opendir($folder))
{
	while (false !== ($entry = readdir($handle)))
	{
		if (Tools\Tools::endsWith($entry, ".php") && $entry != "customizations.php")
		{
			include_once("$folder/$entry");
		}
	}
	closedir($handle);
}

?>
