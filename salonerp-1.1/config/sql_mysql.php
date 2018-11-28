<?php

function createTables($db)
{
	$tables = array(
		"CREATE TABLE customer (
			id			INTEGER NOT NULL AUTO_INCREMENT,
			firstname	TEXT,
			lastname	TEXT,
			comment		TEXT,
			address		TEXT,
			telephone	TEXT,
			PRIMARY KEY(id)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE employee (
			id			INTEGER NOT NULL AUTO_INCREMENT,
			name		TEXT,
			PRIMARY KEY(id)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE events (
			id			INTEGER NOT NULL AUTO_INCREMENT,
			customer	INTEGER NOT NULL,
			product		INTEGER NOT NULL,
			employee	INTEGER NOT NULL,
			name		TEXT,
			start		TIMESTAMP NOT NULL,
			end			TIMESTAMP NOT NULL,
			deleted		BOOL DEFAULT 0,
			resource	VARCHAR(30),
			PRIMARY KEY(id),
			INDEX(customer),
			INDEX(product),
			INDEX(deleted),
			INDEX(start),
			INDEX(end)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE invoice (
			id		INTEGER NOT NULL AUTO_INCREMENT,
			event	INTEGER NOT NULL,
			date	TIMESTAMP NOT NULL,
			cash	DOUBLE NOT NULL,
			bank	DOUBLE NOT NULL,
			PRIMARY KEY(id),
			INDEX(event),
			INDEX(date)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE invoice_line (
			id		INTEGER NOT NULL AUTO_INCREMENT,
			invoice	INTEGER NOT NULL,
			product	INTEGER NOT NULL,
			PRIMARY KEY(id),
			INDEX(invoice),
			INDEX(product)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE language (
			id		INTEGER NOT NULL AUTO_INCREMENT,
			name	TEXT NOT NULL,
			PRIMARY KEY(id)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE language_word (
			language	INTEGER NOT NULL,
			name		VARCHAR(64) NOT NULL,
			value		TEXT NOT NULL,
			PRIMARY KEY(language,name)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE product (
			id			INTEGER NOT NULL AUTO_INCREMENT,
			name		TEXT NOT NULL,
			price		DOUBLE NOT NULL,
			duration	INTEGER NOT NULL,
			color		TEXT NOT NULL,
			PRIMARY KEY(id)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE reports (
			id			INTEGER NOT NULL AUTO_INCREMENT,
			title		TEXT NOT NULL,
			font		TEXT,
			fontsize	DOUBLE,
			query		TEXT NOT NULL,
			ask			TEXT,
			sum			TEXT,
			currency	TEXT,
			PRIMARY KEY(id)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE settings (
			name	VARCHAR(64) NOT NULL,
			value	TEXT NOT NULL,
			PRIMARY KEY(name)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;",

		"CREATE TABLE user (
			id			INTEGER NOT NULL AUTO_INCREMENT,
			name		TEXT NOT NULL,
			password	TEXT NOT NULL,
			PRIMARY KEY(id)
		)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;"/*,

		"ALTER TABLE events ADD FOREIGN KEY(customer) REFERENCES customer.id",
		"ALTER TABLE events ADD FOREIGN KEY(product) REFERENCES product.id",
		"ALTER TABLE invoice ADD FOREIGN KEY(event) REFERENCES events.id",
		"ALTER TABLE invoice_line ADD FOREIGN KEY(invoice) REFERENCES invoice.id",
		"ALTER TABLE invoice_line ADD FOREIGN KEY(product) REFERENCES product.id",
		"ALTER TABLE language_word ADD FOREIGN KEY(language) REFERENCES language.id"*/
	);

	foreach($tables as $table)
	{
		$stmt = $db->prepare($table);
		if(!$stmt->execute())
		{
			$info = $db->errorInfo();
			echo "Error executing SQL<br />";
			echo "SQLSTATE: " . $info[0]."<br />";
			echo "Error code: " . $info[1]."<br />";
			echo "Message: " . $info[2]."<br />";
		}
	}
}

function createReports($db)
{
	$reports = array();

	$reports[] = array(
		"title" => "revenue",
		"font" => "Times",
		"fontsize" => 12.0,
		"query" => "SELECT
					CONCAT('R000', invoice.id) AS invoiceNumber,
					DATE_FORMAT(date, '%Y-%m-%d %T') AS date,
					CONCAT(firstname, ' ', lastname) AS customer,
					cash AS cash,
					bank AS bank
				FROM invoice
				JOIN events ON events.id = invoice.event
				JOIN customer ON customer.id = events.customer
				WHERE DATE(invoice.date) >= DATE(:startDate)
				AND DATE(invoice.date) <= DATE(:endDate)",
		"ask" => "startDate=date,endDate=date",
		"sum" => "3,4",
		"currency" => "3,4"
	);

	$reports[] = array(
		"title" => "bestProducts",
		"font" => "Times",
		"fontsize" => 12.0,
		"query" => "SELECT
					product.name AS product,
					COUNT(*) AS numberSold,
					SUM(price) AS totalPrice
				FROM invoice_line
				JOIN invoice ON invoice.id = invoice_line.invoice
				JOIN product ON product.id = invoice_line.product
				WHERE DATE(invoice.date) >= DATE(:startDate)
				AND DATE(invoice.date) <= DATE(:endDate)
				GROUP BY product.name
				ORDER BY numberSold DESC, totalPrice DESC",
		"ask" => "startDate=date,endDate=date",
		"sum" => "",
		"currency" => "2"
	);

	$reports[] = array(
		"title" => "bestCustomers",
		"font" => "Times",
		"fontsize" => 12.0,
		"query" => "SELECT
					CONCAT(customer.firstname, ' ', customer.lastname) AS customer,
					COUNT(*) AS amount,
					SUM(invoice.cash + invoice.bank) as revenue
				FROM invoice
				JOIN events ON events.id = invoice.event
				JOIN customer ON customer.id = events.customer
				WHERE DATE(invoice.date) >= DATE(:startDate)
				AND DATE(invoice.date) <= DATE(:endDate)
				GROUP BY customer
				ORDER BY revenue DESC",
		"ask" => "startDate=date,endDate=date",
		"sum" => "",
		"currency" => "2"
	);

	$reports[] = array(
		"title" => "productsPerCustomer",
		"font" => "Times",
		"fontsize" => 12.0,
		"query" => "SELECT
					CONCAT(customer.firstname, ' ', customer.lastname) AS customer,
					GROUP_CONCAT(product.name SEPARATOR ', ') AS products,
					DATE_FORMAT(invoice.date, '%Y-%m-%d %T') AS date,
					invoice.cash + invoice.bank AS price
				FROM invoice_line
				JOIN product ON product.id = invoice_line.product
				JOIN invoice ON invoice.id = invoice_line.invoice
				JOIN events ON events.id = invoice.event
				JOIN customer ON customer.id = events.customer
				WHERE customer.id = :customer
				AND DATE(invoice.date) >= DATE(:startDate)
				AND DATE(invoice.date) <= DATE(:endDate)
				GROUP BY invoice.id
				ORDER BY date DESC",
		"ask" => "customer=customer,startDate=date,endDate=date",
		"sum" => "3",
		"currency" => "3"
	);

	$insertReport = "INSERT INTO reports(title, font, fontsize, query, ask, sum, currency) VALUES(:title, :font, :fontsize, :query, :ask, :sum, :currency)";

	foreach($reports as $report)
	{
		$stmt = $db->prepare($insertReport);
		$stmt->bindParam(":title", $report["title"]);
		$stmt->bindParam(":font", $report["font"]);
		$stmt->bindParam(":fontsize", $report["fontsize"]);
		$stmt->bindParam(":query", $report["query"]);
		$stmt->bindParam(":ask", $report["ask"]);
		$stmt->bindParam(":sum", $report["sum"]);
		$stmt->bindParam(":currency", $report["currency"]);
		if(!$stmt->execute())
		{
			$info = PDO::errorInfo();
			echo "Error executing SQL";
			echo "SQLSTATE: " . $info[0];
			echo "Error code: " . $info[1];
			echo "Message: " . $infor[2];
		}
	}
}

function createLanguages($db, $languages)
{
	$insertLanguage = "INSERT INTO language(name) VALUES(:name)";
	$insertWord = "INSERT INTO language_word(language, name, value) VALUES((SELECT id FROM language WHERE name = :language), :name, :value)";

	foreach($languages as $language => $words)
	{
		$stmt = $db->prepare($insertLanguage);
		$stmt->bindParam(":name", $language);
		if(!$stmt->execute())
		{
			$info = PDO::errorInfo();
			echo "Error executing SQL";
			echo "SQLSTATE: " . $info[0];
			echo "Error code: " . $info[1];
			echo "Message: " . $infor[2];
		}

		foreach($words as $name => $value)
		{
			$stmt = $db->prepare($insertWord);
			$stmt->bindParam(":language", $language);
			$stmt->bindParam(":name", $name);
			$stmt->bindParam(":value", $value);
			if(!$stmt->execute())
			{
				$info = $db->errorInfo();
				echo "Error executing SQL<br />";
				echo "SQLSTATE: " . $info[0]."<br />";
				echo "Error code: " . $info[1]."<br />";
				echo "Message: " . $info[2]."<br />";
			}
		}
	}
}

function createUser($db, $user, $password)
{
	$createUser = "INSERT INTO user(name, password) VALUES(:name, :password)";

	$stmt = $db->prepare($createUser);
	$stmt->bindParam(":name", $user);
	$pwd = sha1($password);
	$stmt->bindParam(":password", $pwd);
	if(!$stmt->execute())
	{
		$info = PDO::errorInfo();
		echo "Error executing SQL";
		echo "SQLSTATE: " . $info[0];
		echo "Error code: " . $info[1];
		echo "Message: " . $infor[2];
	}
}

function setLanguage($db, $language)
{
	$setLanguage = "INSERT INTO settings(name, value) VALUES('language', :language)";

	$stmt = $db->prepare($setLanguage);
	$stmt->bindParam(":language", $language);
	if(!$stmt->execute())
	{
		$info = PDO::errorInfo();
		echo "Error executing SQL";
		echo "SQLSTATE: " . $info[0];
		echo "Error code: " . $info[1];
		echo "Message: " . $infor[2];
	}
}

$updateEvent = "UPDATE events SET
	name = :name,
	customer = :customer,
	product = :product,
	employee = :employee,
	start = :start,
	end = :end
WHERE id = :id";

$resizeEvent = "UPDATE events SET
	start = :start,
	end = :end,
	employee = :employee
WHERE id = :id";

$createInvoice = "INSERT INTO invoice (event, date, cash, bank)
VALUES (:event, (SELECT end FROM events WHERE id = :event), :cash, :bank)";

$createInvoiceline = "INSERT INTO invoice_line (invoice, product)
VALUES (:invoice, :product)";

$getEvents = "SELECT
	events.id,
	customer,
	product,
	name,
	DATE_FORMAT(start, '%Y-%m-%dT%T') AS start,
	DATE_FORMAT(end, '%Y-%m-%dT%T') AS end,
	DATE_FORMAT(date, '%Y-%m-%dT%T') AS date,
	invoice.id AS invoice
FROM events
LEFT JOIN invoice ON events.id = invoice.event
WHERE NOT ((end <= :start) OR (start >= :end))
AND deleted = 0
AND employee = :employee;";

$createEvent = "INSERT INTO events (name, start, end, customer, product, employee)
VALUES (:name, :start, :end, :customer, :product, :employee)";

$deleteEvent = "UPDATE events SET
	deleted = 1
WHERE id = :id";

$getCustomers = "SELECT
	id,
	firstname,
	lastname,
	comment,
	address,
	telephone
FROM customer
ORDER BY firstname, lastname";

$getProducts = "SELECT
	id,
	name,
	duration,
	price,
	color
FROM product
ORDER BY name";

$createProduct = "INSERT INTO product (name, duration, price, color)
VALUES (:name, :duration, :price, :color)";

$createCustomer = "INSERT INTO customer (firstname, lastname, comment, address, telephone)
VALUES (:firstname, :lastname, :comment, :address, :telephone)";

$createEmployee = "INSERT INTO employee (name)
VALUES (:name)";

$updateProduct = "UPDATE product SET
	name = :name,
	duration = :duration,
	price = :price,
	color = :color
WHERE id = :id";

$updateCustomer = "UPDATE customer SET
	firstname = :firstname,
	lastname = :lastname,
	comment = :comment,
	address = :address,
	telephone = :telephone
WHERE id = :id";

$updateEmployee = "UPDATE employee SET
	name = :name
WHERE id = :id";

$language = "SELECT
	language_word.name,
	language_word.value
FROM language
JOIN language_word ON language.id = language_word.language
WHERE language.name = :language";

$settings = "SELECT
	name,
	value
FROM settings";

$getReports = "SELECT
	title,
	font,
	fontsize,
	query,
	ask,
	sum,
	currency
FROM reports;";

$saveSetting = "REPLACE INTO settings(name, value)
VALUES(:name, :value);";

$getEmployees = "SELECT
	id,
	name
FROM employee;";

?>
