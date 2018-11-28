<?php

require_once("login.php");

require_once '_db.php';

if(!isset($_POST["what"]))
{
	echo "What is missing";
	return;
}

switch($_POST["what"])
{
case "updateEvent":
	$stmt = $db->prepare($updateEvent);

	$stmt->bindParam(':id', $_POST['id']);
	$stmt->bindParam(':name', $_POST['name']);
	$stmt->bindParam(':customer', $_POST['customer']);
	$stmt->bindParam(':product', $_POST['product']);
	$stmt->bindParam(':employee', $_POST['employee']);
	$stmt->bindParam(':start', $_POST['start']);
	$stmt->bindParam(':end', $_POST['end']);

	execute($stmt);

	$response = array( "result" => 'OK' );
	break;
case "resizeEvent":
	$stmt = $db->prepare($resizeEvent);

	$stmt->bindParam(':start', $_POST['newStart']);
	$stmt->bindParam(':end', $_POST['newEnd']);
	$stmt->bindParam(':id', $_POST['id']);
	$stmt->bindParam(':employee', $_POST['employee']);

	execute($stmt);

	$response = array( "result" => 'OK' );
	break;
case "createInvoice":
	$stmt = $db->prepare($createInvoice);

	$stmt->bindParam(':event', $_POST['event']);
	$stmt->bindParam(':cash', $_POST['cash']);
	$stmt->bindParam(':bank', $_POST['bank']);
	$stmt->bindParam(':date', $_POST['date']);

	execute($stmt);
	$invoice = $db->lastInsertId();

	foreach($_POST["products"] as $p)
	{
	    $stmt = $db->prepare($createInvoiceline);
	    $stmt->bindParam(':invoice', $invoice);
	    $stmt->bindParam(':product', $p["id"]);
	    execute($stmt);
	}

	$response = array( "result" => 'OK', "id" => $invoice );
	break;
case "getEvents":
	$stmt = $db->prepare($getEvents);

	$stmt->bindParam(':start', $_POST['start']);
	$stmt->bindParam(':end', $_POST['end']);
	$stmt->bindParam(':employee', $_POST['employee']);

	execute($stmt);

	$response = array();
	foreach($stmt->fetchAll() as $row) {
		$response[] = array(
			"id" => $row['id'],
			"customer" => $row['customer'],
			"product" => $row['product'],
			"text" => $row['name'],
			"start" => $row['start'],
			"end" => $row['end'],
			"invoicedate" => $row['date'],
			"invoice" => $row['invoice']
		);
	}
	break;
case "createEvent":
	$stmt = $db->prepare($createEvent);

	$stmt->bindParam(':start', $_POST['start']);
	$stmt->bindParam(':end', $_POST['end']);
	$stmt->bindParam(':name', $_POST['name']);
	$stmt->bindParam(':customer', $_POST['customer']);
	$stmt->bindParam(':product', $_POST['product']);
	$stmt->bindParam(':employee', $_POST['employee']);

	execute($stmt);

	$response = array( "result" => 'OK', "id" => $db->lastInsertId() );
	break;
case "deleteEvent":
	$stmt = $db->prepare($deleteEvent);

	$stmt->bindParam(':id', $_POST['id']);

	execute($stmt);

	$response = array( "result" => 'OK' );
	break;
case "getCustomers":
	$stmt = $db->prepare($getCustomers);

	execute($stmt);

	$response = array();
	foreach($stmt->fetchAll() as $row) {
		$response[] = array(
			"id" => $row["id"],
			"firstname" => $row["firstname"],
			"lastname" => $row["lastname"],
			"name" => $row["firstname"] . " " . $row["lastname"],
			"comment" => $row["comment"],
			"address" => $row["address"],
			"telephone" => $row["telephone"]
		);
	}
	break;
case "getProducts":
	$stmt = $db->prepare($getProducts);

	execute($stmt);

	$response = array();
	foreach($stmt->fetchAll() as $row) {
		$response[] = array(
			"id" => $row["id"],
			"name" => $row["name"],
			"duration" => $row["duration"],
			"price" => $row["price"],
			"color" => $row["color"]
		);
	}
	break;
case "createProduct":
	$stmt = $db->prepare($createProduct);

	$stmt->bindParam(':name', $_POST['name']);
	$stmt->bindParam(':duration', $_POST['duration']);
	$stmt->bindParam(':price', $_POST['price']);
	$stmt->bindParam(':color', $_POST['color']);

	execute($stmt);

	$response = array( "result" => 'OK', "id" => $db->lastInsertId() );
	break;
case "createCustomer":
	$stmt = $db->prepare($createCustomer);

	$stmt->bindParam(':firstname', $_POST['firstname']);
	$stmt->bindParam(':lastname', $_POST['lastname']);
	$stmt->bindParam(':comment', $_POST['comment']);
	$stmt->bindParam(':address', $_POST['address']);
	$stmt->bindParam(':telephone', $_POST['telephone']);

	execute($stmt);

	$response = array( "result" => 'OK', "id" => $db->lastInsertId() );
	break;
case "createEmployee":
	$stmt = $db->prepare($createEmployee);

	$stmt->bindParam(':name', $_POST['name']);
	execute($stmt);

	$response = array( "result" => 'OK', "id" => $db->lastInsertId() );
	break;
case "updateProduct":
	$stmt = $db->prepare($updateProduct);

	$stmt->bindParam(':id', $_POST['id']);
	$stmt->bindParam(':name', $_POST['name']);
	$stmt->bindParam(':duration', $_POST['duration']);
	$stmt->bindParam(':price', $_POST['price']);
	$stmt->bindParam(':color', $_POST['color']);

	execute($stmt);

	$response = array( "result" => 'OK' );
	break;
case "updateCustomer":
	$stmt = $db->prepare($updateCustomer);

	$stmt->bindParam(':id', $_POST['id']);
	$stmt->bindParam(':firstname', $_POST['firstname']);
	$stmt->bindParam(':lastname', $_POST['lastname']);
	$stmt->bindParam(':comment', $_POST['comment']);
	$stmt->bindParam(':address', $_POST['address']);
	$stmt->bindParam(':telephone', $_POST['telephone']);

	execute($stmt);

	$response = array( "result" => 'OK' );
	break;
case "updateEmployee":
	$stmt = $db->prepare($updateEmployee);

	$stmt->bindParam(':id', $_POST['id']);
	$stmt->bindParam(':name', $_POST['name']);

	execute($stmt);

	$response = array( "result" => 'OK' );
	break;
case "language":
	$stmt = $db->prepare($language);

	$stmt->bindParam(':language', $_POST['language']);
	execute($stmt);

	$response = array();
	foreach($stmt->fetchAll() as $row) {
		$response[$row["name"]] = $row["value"];
	}
	break;
case "settings":
	$stmt = $db->prepare($settings);

	execute($stmt);

	$response = array();
	foreach($stmt->fetchAll() as $row) {
		$response[$row["name"]] = $row["value"];
	}
	break;
case "getReports":
	$stmt = $db->prepare($getReports);

	execute($stmt);

	$response = array();
	foreach($stmt->fetchAll() as $row) {
		$ask = $row["ask"] == null ? array() : explode(",", $row["ask"]);
		for($i = 0; $i < count($ask); $i++)
			$ask[$i] = explode("=", $ask[$i]);

		$response[] = array(
			"title" => $row["title"],
			"font" => $row["font"],
			"fontSize" => $row["fontsize"],
			"sql" => $row["query"],
			"ask" => $ask,
			"sum" => $row["sum"] == null ? array() : explode(",", $row["sum"]),
			"currency" => $row["currency"] == null ? array() : explode(",", $row["currency"])
		);
	}
	break;
case "saveSettings":
	foreach($_POST["data"] as $name => $value)
	{
		$stmt = $db->prepare($saveSetting);

		$stmt->bindParam(':name', $name);
		$stmt->bindParam(':value', $value);

		execute($stmt);
	}
	$response = array( "result" => 'OK' );
	break;
case "getEmployees":
	$stmt = $db->prepare($getEmployees);

	execute($stmt);

	$response = array();
	foreach($stmt->fetchAll() as $row) {
		$response[] = array(
			"id" => $row["id"],
			"name" => $row["name"]
		);
	}
	break;
default:
	echo "Unknown command ".$_POST["what"];
	return;
}

function execute($stmt)
{
	if(!$stmt->execute())
	{
		$info = PDO::errorInfo();
		echo "Error executing SQL";
		echo "SQLSTATE: " . $info[0];
		echo "Error code: " . $info[1];
		echo "Message: " . $infor[2];
		exit();
	}
}

header('Content-Type: application/json');
echo json_encode($response);

?>
