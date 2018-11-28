-- Update database script from SalonERP < 1.2 to SalonERP 1.2

-- Update table product
ALTER TABLE product RENAME product_old;

CREATE TABLE product (
	id			INTEGER NOT NULL AUTO_INCREMENT,
	name		TEXT NOT NULL,
	price		DOUBLE NOT NULL,
	duration	INTEGER,
	color		TEXT,
	category	TEXT,
	PRIMARY KEY(id),
	INDEX(category(256))
)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO product(id, name, price, duration, color, category)
SELECT
	id,
	name,
	price,
	duration,
	color,
	''
FROM product_old;

DROP TABLE product_old;

--Update table invoice_line
ALTER TABLE invoice_line RENAME invoice_line_old;

CREATE TABLE invoice_line (
	id		INTEGER NOT NULL AUTO_INCREMENT,
	invoice	INTEGER NOT NULL,
	product	INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	price	DOUBLE NOT NULL,
	PRIMARY KEY(id),
	INDEX(invoice),
	INDEX(product)
)ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO invoice_line(id, invoice, product, quantity, price)
SELECT
	invoice_line_old.id,
	invoice_line_old.invoice,
	invoice_line_old.product,
	1,
	product.price
FROM invoice_line_old
JOIN product ON invoice_line_old.product = product.id;

DROP TABLE invoice_line_old;

-- Update reports
UPDATE reports
SET query = 'SELECT
		product.name AS product,
		SUM(invoice_line.quantity) AS numberSold,
		SUM(invoice_line.price * invoice_line.quantity) AS totalPrice
	FROM invoice_line
	JOIN invoice ON invoice.id = invoice_line.invoice
	JOIN product ON product.id = invoice_line.product
	WHERE DATE(invoice.date) >= DATE(:startDate)
	AND DATE(invoice.date) <= DATE(:endDate)
	GROUP BY product.name
	ORDER BY numberSold DESC, totalPrice DESC'
WHERE title = 'bestProducts';


-- Update languages
INSERT INTO language_word(language, name, value) VALUES
((SELECT id FROM language WHERE name = 'English'), 'category', 'Category'),
((SELECT id FROM language WHERE name = 'English'), 'tendered', 'Tendered'),
((SELECT id FROM language WHERE name = 'English'), 'cashReturn', 'Cash return'),
((SELECT id FROM language WHERE name = 'English'), 'makeBankPayment', 'Please make card payment and press OK'),
((SELECT id FROM language WHERE name = 'English'), 'printInvoice', 'Print invoice'),

((SELECT id FROM language WHERE name = 'Deutsch'), 'category', 'Kategorie'),
((SELECT id FROM language WHERE name = 'Deutsch'), 'tendered', 'Gegeben'),
((SELECT id FROM language WHERE name = 'Deutsch'), 'cashReturn', 'Geld zurück'),
((SELECT id FROM language WHERE name = 'Deutsch'), 'makeBankPayment', 'Bitte schließen Sie die Kartenzahlung ab und klicken OK'),
((SELECT id FROM language WHERE name = 'Deutsch'), 'printInvoice', 'Rechnung drucken');

