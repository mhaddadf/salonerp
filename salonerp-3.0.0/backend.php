<?php

require_once("login.php");
require_once '_db.php';

//Load customizations at the end
require_once 'customizations/customizations.php';

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Tools\SchemaValidator;
use Doctrine\ORM\Query\Expr;

use Models\Employee;
use Models\Customer;
use Models\Product;
use Models\ProductCategory;
use Models\Event;
use Models\Invoice;
use Models\InvoiceLine;
use Models\Report;
use Models\Setting;

const DateFormat = "Y-m-d\TH:i:s";

if(!isset($_POST["what"]))
{
	echo "What is missing";
	return;
}

if(isset($customizations[$_POST["what"]]))
{
	$customFunction = $customizations[$_POST["what"]];
	$response = $customFunction($_POST, $db);
}
else
{
	switch($_POST["what"])
	{
	case "updateEvent":
		$event = Event::find($_POST['id']);
		$product = Product::find($_POST['product']);
		$customer = Customer::find($_POST['customer']);

		$event->setName($_POST['name']);
		$event->setCustomer($customer);
		$event->setProduct($product);

		$event->clearAdditionalProducts($product);
		if(isset($_POST['additionalProducts']))
		{
			foreach($_POST['additionalProducts'] as $p)
			{
				$product = Product::find($_POST['product']);
				$event->addAdditionalProduct($product);
			}
		}

		$event->setStart(new \DateTime($_POST['start']));
		$event->setEnd(new \DateTime($_POST['end']));
		$event->save();
		$response = array( "result" => 'OK' );
		break;
	case "resizeEvent":
		$event = Event::find($_POST['id']);
		$employee = Employee::find($_POST['employee']);

		$event->setStart(new \DateTime($_POST['newStart']));
		$event->setEnd(new \DateTime($_POST['newEnd']));
		$event->setEmployee($employee);
		$event->save();
		$response = array( "result" => 'OK' );
		break;
	case "createInvoice":
		$invoice = new Invoice();
		$event = Event::find($_POST['event']);

		$invoice->setEvent($event);
		$invoice->setCash($_POST['cash']);
		$invoice->setBank($_POST['bank']);
		$invoice->setDate(new \DateTime($_POST['date']));
		$invoice->save();

		if(isset($customizations["getInvoiceNumber"]))
			$invoiceNumber = $customizations["getInvoiceNumber"]($invoice->getId());
		else
		{
			$invoiceNumber = "" . $invoice->getId();
			while(strlen($invoiceNumber) < 9)$invoiceNumber = "0" . $invoiceNumber;
			$invoiceNumber = "R" . $invoiceNumber;
		}
		$invoice->setInvoiceNumber($invoiceNumber);
		$invoice->save();

		foreach($_POST["products"] as $p)
		{
		    $line = new InvoiceLine();
			$product = Product::find($p["id"]);

		    $line->setInvoice($invoice);
		    $line->setProduct($product);
			$line->setQuantity($p["quantity"]);
			$line->setPrice($p["price"]);
		    $line->save();
		}

		$response = array( "result" => 'OK', "id" => $invoice->getId() );
		break;
	case "getEvents":
		$employee = Employee::find($_POST['employee']);

		$criteria = Criteria::create()
			->where(Criteria::expr()->gte("start", new \DateTime($_POST['start'])))
			->andWhere(Criteria::expr()->lte("end", new \DateTime($_POST['end'])))
			->andWhere(Criteria::expr()->eq("deleted", false));

		$response = array();
		foreach($employee->getEvents()->matching($criteria) as $event) {
			$additionalProducts = array();
			foreach($event->getAdditionalProducts() as $product)
				$additionalProducts[] = $product->getId();

			$e = array(
				"id" => $event->getId(),
				"customer" => $event->getCustomer()->getId(),
				"product" => $event->getProduct()->getId(),
				"additionalProducts" => $additionalProducts,
				"text" => $event->getName(),
				"start" => $event->getStart()->format(DateFormat),
				"end" => $event->getEnd()->format(DateFormat)
			);

			if($event->getInvoice() != null)
			{
				$e["invoicedate"] = $event->getInvoice()->getDate()->format(DateFormat);
				$e["invoice"] = $event->getInvoice()->getId();
			}

			$response[] = $e;
		}
		break;
	case "createEvent":
		$event = new Event();
		$product = Product::find($_POST['product']);
		$customer = Customer::find($_POST['customer']);
		$employee = Employee::find($_POST['employee']);

		$event->setName($_POST['name']);
		$event->setCustomer($customer);
		$event->setProduct($product);

		$event->clearAdditionalProducts($product);
		if(isset($_POST['additionalProducts']))
		{
			foreach($_POST['additionalProducts'] as $p)
			{
				$product = Product::find($_POST['product']);
				$event->addAdditionalProduct($product);
			}
		}

		$event->setStart(new \DateTime($_POST['start']));
		$event->setEnd(new \DateTime($_POST['end']));
		$event->setEmployee($employee);
		$event->setDeleted(false);
		$event->save();
		$response = array( "result" => 'OK', "id" => $event->getId() );
		break;
	case "deleteEvent":
		$event = Event::find($_POST['id']);
		$event->setDeleted(true);
		$event->save();
		$response = array( "result" => 'OK' );
		break;
	case "getCustomers":
		$response = array();
		foreach(Customer::listAll() as $customer) {
			$response[] = array(
				"id" => $customer->getId(),
				"firstname" => $customer->getFirstname(),
				"lastname" => $customer->getLastname(),
				"name" => $customer->getFirstname() . " " . $customer->getLastname(),
				"comment" => $customer->getComment(),
				"address" => $customer->getAddress(),
				"telephone" => $customer->getTelephone(),
				"email" => $customer->getEmail()
			);
		}
		break;
	case "getProducts":
		$response = array();
		foreach(Product::listAll() as $product) {
			$p = array(
				"id" => $product->getId(),
				"name" => $product->getName(),
				"duration" => $product->getDuration(),
				"price" => $product->getPrice(),
				"color" => $product->getColor(),
				"categories" => array()
			);

			foreach($product->getCategories() as $category)
				$p["categories"][] = $category->getId();

			$response[] = $p;
		}
		break;
	case "getCategories":
	$response = array();
		foreach(ProductCategory::listAll() as $category) {
			$response[] = array(
				"id" => $category->getId(),
				"name" => $category->getName()
			);
		}
		break;
	case "createProduct":
		$product = new Product();

		$product->setName($_POST['name']);
		$product->setDuration($_POST['duration']);
		$product->setPrice($_POST['price']);
		$product->setColor($_POST['color']);

		if(isset($_POST['categories']))
		{
			foreach($_POST['categories'] as $c)
			{
				$product_category = ProductCategory::find($c);
				$product->addCategory($product_category);
				$product_category->addProduct($product);
				$product_category->save();
			}
		}
        
        $product->save();
		$response = array( "result" => 'OK', "id" => $product->getId() );
		break;
	case "createCustomer":
		$customer = new Customer();
		$customer->setFirstname($_POST['firstname']);
		$customer->setLastname($_POST['lastname']);
		$customer->setComment($_POST['comment']);
		$customer->setAddress($_POST['address']);
		$customer->setTelephone($_POST['telephone']);
		$customer->setEmail($_POST['email']);
		$customer->save();
		$response = array( "result" => 'OK', "id" => $customer->getId() );
		break;
	case "createEmployee":
		$employee = new Employee();
		$employee->setName($_POST['name']);
		$employee->setAddress($_POST['address']);
		$employee->setTelephone($_POST['telephone']);
		$employee->setEmail($_POST['email']);
		$employee->save();
		$response = array( "result" => 'OK', "id" => $employee->getId() );
		break;
	case "createCategory":
		$category = new ProductCategory();
		$category->setName($_POST['name']);
		$category->save();
		$response = array( "result" => 'OK', "id" => $category->getId() );
		break;
	case "updateProduct":
		$product = Product::find($_POST['id']);
		$product->setName($_POST['name']);
		$product->setDuration($_POST['duration']);
		$product->setPrice($_POST['price']);
		$product->setColor($_POST['color']);

		$product->clearCategories();
		if(isset($_POST['categories']))
		{
			foreach($_POST['categories'] as $c)
			{
				$product_category = ProductCategory::find($c);
				$product->addCategory($product_category);
				$product_category->addProduct($product);
				$product_category->save();
			}
		}

		$product->save();
		$response = array( "result" => 'OK' );
		break;
	case "updateCustomer":
		$customer = Customer::find($_POST['id']);
		$customer->setFirstname($_POST['firstname']);
		$customer->setLastname($_POST['lastname']);
		$customer->setComment($_POST['comment']);
		$customer->setAddress($_POST['address']);
		$customer->setTelephone($_POST['telephone']);
		$customer->setEmail($_POST['email']);
		$customer->save();
		$response = array( "result" => 'OK' );
		break;
	case "updateEmployee":
		$employee = Employee::find($_POST['id']);
		$employee->setName($_POST['name']);
		$employee->setAddress($_POST['address']);
		$employee->setTelephone($_POST['telephone']);
		$employee->setEmail($_POST['email']);
		$employee->save();
		$response = array( "result" => 'OK' );
		break;
	case "updateCategory":
		$category = ProductCategory::find($_POST['id']);
		$category->setName($_POST['name']);
		$category->save();
		$response = array( "result" => 'OK' );
		break;
	case "language":
		$response = loadLanguage($db, $_POST['language']);
		break;
	case "settings":
		$response = $GLOBALS["SETTINGS"];
		break;
	case "getReports":
		$response = array();
		foreach(Report::listAll() as $report) {
			$response[] = array(
				"title" => $report->getTitle(),
				"font" => $report->getFont(),
				"fontSize" => $report->getFontsize(),
				"sql" => $report->getQuery(),
				"ask" => $report->getAskArray(),
				"sum" => $report->getSumArray(),
				"currency" => $report->getCurrencyArray()
			);
		}
		break;
	case "getInvoiceLayouts":
		$response = array();
		foreach(Invoice::$invoiceLayouts as $name => $layout) {
			$response[] = array(
				"name" => $name,
				"settings" => $layout["settings"],
				"structure" => $layout["structure"]
			);
		}
		break;
	case "saveSettings":
		foreach($_POST["data"] as $name => $value)
		{
			$setting = Setting::find($name);
			if($setting == null)$setting = new Setting();
			$setting->setName($name);
			$setting->setValue($value);
			$setting->save();
		}
		$response = array( "result" => 'OK' );
		break;
	case "getEmployees":
		$response = array();
		foreach(Employee::listAll() as $employee) {
			$response[] = array(
				"id" => $employee->getId(),
				"name" => $employee->getName(),
				"address" => $employee->getAddress(),
				"telephone" => $employee->getTelephone(),
				"email" => $employee->getEmail()
			);
		}
		break;
	case "updateDatabase":
		$ex = updateDatabaseSchema($db);
		if($ex == null)
			$response = "Success";
		else
			$response = $ex->getMessage();
		break;
	case "databaseStatus":
		$validator = new SchemaValidator($db);
		$errors = $validator->validateMapping();
		$response = array();
		foreach($errors as $error)$response[] = $error;
		$response[] = $validator->schemaInSyncWithMetadata() ? "Database in sync" : "Database not in sync";
		break;
	default:
		echo "Unknown command ".$_POST["what"];
		return;
	}
}

header('Content-Type: application/json');
echo json_encode($response);

?>
