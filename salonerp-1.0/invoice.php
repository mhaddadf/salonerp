<?php

@session_start();

if(isset($_POST["save"]))
{
	$_SESSION["invoice"] = $_POST["invoice"];
	exit();
}

$invoice = 1;
$font = "Helvetica";
$fontSize = 12;


if(isset($_SESSION["invoice"]))$invoice = $_SESSION["invoice"];
if(isset($_SESSION["font"]))$font = $_SESSION["font"];
if(isset($_SESSION["fontSize"]))$fontSize = $_SESSION["fontSize"];
unset($_SESSION["invoice"]);
unset($_SESSION["font"]);
unset($_SESSION["fontSize"]);

require_once("tcpdf/tcpdf_import.php");
require_once("_db.php");
loadSettings($db);
loadLanguage($db, $GLOBALS["SETTINGS"]["language"]);

class Invoice extends TCPDF
{

	function Header()
	{
		$this->image("media/logo.png", 10, 6, 30);
		$this->SetFont("Helvetica", "B", 15);
		$this->Cell(0, 10, $GLOBALS["LANGUAGE"]["invoice"], 0, 6, "C");
		$this->Ln();
		$this->SetFont($this->FontFamily, "", 12);
		$this->Cell(0, 6, $GLOBALS["SETTINGS"]["company"], 0, 0, "R");
		$this->Ln();
		$this->Cell(0, 6, $GLOBALS["SETTINGS"]["address1"], 0, 0, "R");
		$this->Ln();
		$this->Cell(0, 6, $GLOBALS["SETTINGS"]["address2"], 0, 0, "R");
		$this->Ln();
		$this->Cell(0, 6, $GLOBALS["SETTINGS"]["telephone"], 0, 0, "R");
		$this->Ln();
		$this->Cell(0, 6, $GLOBALS["SETTINGS"]["homepage"], 0, 0, "R");
		$this->Ln();
		$this->Cell(0, 6, $GLOBALS["SETTINGS"]["taxId"], 0, 0, "R");
		$this->Ln();
	}

	function Footer()
	{
		$this->SetFont("Helvetica", "B", 8);
		$this->SetY(-15);
		$this->Cell(0, 10, $GLOBALS["SETTINGS"]["company"]." | ".$GLOBALS["SETTINGS"]["telephone"]." | ".$GLOBALS["SETTINGS"]["homepage"], 0, 0, "C");
	}

	function SetData($data)
	{
		$this->SetFont("Helvetica", "B", 12);
		$widths = array(
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["name"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["amount"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["price"]) + 2
		);
		$this->SetFont("Helvetica", "", 12);

		$invoice = "";
		$total = "";
		$totalCounted = 0;
		$date = "";
		foreach($data as $d)
		{
			$invoice = $d[0];
			$total = $d[1];
			$totalCounted += ($d[5]* $d[4]);
			$date = $d[2];

			$widths[0] = max($widths[0], $this->GetStringWidth($d[3]) + 2);
			$widths[1] = max($widths[1], $this->GetStringWidth($d[4]) + 2);
			$widths[2] = max($widths[2], $this->GetStringWidth($d[5] . " " . $GLOBALS["SETTINGS"]["currency"]) + 2);
		}
		$x = ($this->w - array_sum($widths)) / 2;

		$this->SetFont("Helvetica", "B", 14);
		$this->Cell(0, 7, $GLOBALS["LANGUAGE"]["invoice"] . " " . $invoice);
		$this->Ln();
		$this->Cell(0, 7, $GLOBALS["LANGUAGE"]["date"] . " " . str_replace("T", " ", $date));
		$this->Ln();
		$this->Ln();

		$this->SetFont("Helvetica", "B", 12);
		$this->Cell($x, 7, "");
		$this->Cell($widths[0], 7, $GLOBALS["LANGUAGE"]["name"], "BR", 0, "C");
		$this->Cell($widths[1], 7, $GLOBALS["LANGUAGE"]["amount"], "B", 0, "C");
		$this->Cell($widths[2], 7, $GLOBALS["LANGUAGE"]["price"], "BL", 0, "C");
		$this->Ln();

		$this->SetFont("Helvetica", "", 12);
		foreach($data as $d)
		{
			$this->Cell($x, 7, "");
			$this->Cell($widths[0], 6, $d[3], "R", 0, "L");
			$this->Cell($widths[1], 6, $d[4], "", 0, "C");
			$this->Cell($widths[2], 6, $d[5] . " " . $GLOBALS["SETTINGS"]["currency"], "L", 0, "R");
			$this->Ln();
		}
		$this->Cell($x, 7, "");
		$this->Cell(array_sum($widths), 0, "", "T", 0, "", false, "", 0, true);
		$this->Ln();
		if($total != $totalCounted)
		{
			$this->Cell($x, 7, "");
			$this->Cell($widths[0]+$widths[1], 6, $GLOBALS["LANGUAGE"]["discount"], "", 0, "L");
			$this->Cell($widths[2], 6, "- " . ($totalCounted-$total) . " " . $GLOBALS["SETTINGS"]["currency"], "", 0, "R");
			$this->Ln();
			$this->Cell($x, 7, "");
			$this->Cell($widths[0]+$widths[1], 0, "", "");
			$this->Cell($widths[2], 0, "", "T");
			$this->Ln();
		}
		$this->SetFont("Helvetica", "B", 12);
		$this->Cell($x, 7, "");
		$this->Cell($widths[0]+$widths[1], 6, "", "", 0, "L");
		$this->Cell($widths[2], 6, $total . " " . $GLOBALS["SETTINGS"]["currency"], "", 0, "R");

		$this->Ln();
		$this->Ln();
		$this->SetFont("Helvetica", "", 12);
		$this->Cell($x, 7, "");
		$this->Cell(0, 7, $GLOBALS["SETTINGS"]["taxName"] . ": " . ($total*$GLOBALS["SETTINGS"]["taxValue"]/100) . " " . $GLOBALS["SETTINGS"]["currency"]);

	}

}

$sql = "SELECT
	'R000' || invoice.id,
	cash + bank,
	date,
	product.name,
	COUNT(product.id),
	product.price
FROM invoice
JOIN invoice_line ON invoice.id = invoice_line.invoice
JOIN product ON invoice_line.product = product.id
WHERE invoice.id = :invoice
GROUP BY product.name, product.price";

$stmt = $db->prepare($sql);

$stmt->bindParam(":invoice", $invoice);
$stmt->execute();
$result = $stmt->fetchAll();

$invoice = new Invoice(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, "UTF-8", false);
$invoice->SetCreator("SalonERP");
$invoice->SetAuthor($GLOBALS["SETTINGS"]["company"]);
$invoice->SetTitle($GLOBALS["LANGUAGE"]["invoice"]);
$invoice->SetMargins(PDF_MARGIN_LEFT, 50, PDF_MARGIN_RIGHT);
$invoice->SetHeaderMargin(PDF_MARGIN_HEADER);
$invoice->SetFooterMargin(PDF_MARGIN_FOOTER);
$invoice->SetAutoPageBreak(true, PDF_MARGIN_BOTTOM);

$invoice->AddPage();
$invoice->SetFont($font, "", $fontSize);
$invoice->SetData($result);
$invoice->Output($GLOBALS["LANGUAGE"]["invoice"] . ".pdf", "I");

?>
