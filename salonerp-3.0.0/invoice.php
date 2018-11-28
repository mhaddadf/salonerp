<?php

require_once("_db.php");

//Load customizations at the end
require_once 'customizations/customizations.php';

loadLanguage($db, $GLOBALS["SETTINGS"]["language"]);

$invoiceLayout = Models\Invoice::$invoiceLayouts["A4"];

if(isset($GLOBALS["SETTINGS"]["invoiceLayout"]))
{
	if(isset(Models\Invoice::$invoiceLayouts[$GLOBALS["SETTINGS"]["invoiceLayout"]]))
	{
		$invoiceLayout = Models\Invoice::$invoiceLayouts[$GLOBALS["SETTINGS"]["invoiceLayout"]];
	}
	else
	{
		$invoiceLayout = json_decode($GLOBALS["SETTINGS"]["invoiceLayout"], true);
	}
}

/************* End Invoice parameter configuration *************/

@session_start();


if(isset($_POST["save"]))
{
	$_SESSION["invoice"] = $_POST["invoice"];
	exit();
}
if(isset($_POST["print"]))
{
	$_SESSION["invoice"] = $_POST["invoice"];
}

$invoice = 1;

if(isset($_SESSION["invoice"]))$invoice = $_SESSION["invoice"];
unset($_SESSION["invoice"]);

$result = Models\Invoice::find($invoice);

if(isset($_GET["preview"]))
{
	$invoiceLayout = json_decode($_GET["preview"], true);

	$product1 = new Models\Product();
	$product1->setName("Test product 1");
	$product1->setPrice(12);
	$product1->setDuration(120);
	$product1->setColor("FFEEAA");

	$product2 = new Models\Product();
	$product2->setName("Test product 1");
	$product2->setPrice(12);
	$product2->setDuration(120);
	$product2->setColor("FFEEAA");

	$event = new Models\Event();
	$event->setProduct($product1);
	$event->setName("My test comment");
	$event->setStart(new DateTime());
	$event->setEnd(new DateTime());

	$invoiceLine1 = new Models\InvoiceLine();
	$invoiceLine1->setProduct($product1);
	$invoiceLine1->setQuantity(1);
	$invoiceLine1->setPrice(12);

	$invoiceLine2 = new Models\InvoiceLine();
	$invoiceLine2->setProduct($product1);
	$invoiceLine2->setQuantity(1);
	$invoiceLine2->setPrice(12);

	$result = new Models\Invoice();
	$result->setDate(new DateTime());
	$result->setInvoiceNumber("XXXX");
	$result->setCash(10);
	$result->setBank(10);
	$result->setEvent($event);

	$result->getInvoiceLines()->add($invoiceLine1);
	$result->getInvoiceLines()->add($invoiceLine2);
}

class Invoice extends TCPDF
{

	private $settings;
	private $structure;
	private $textAlign;
	private $data;
	private $invoiceNumber;
	private $invoiceDate;
	private $customizations;

	function __construct($invoiceSettings, $structure, $data, $customizations)
	{
		parent::__construct(PDF_PAGE_ORIENTATION, $invoiceSettings["unit"], $invoiceSettings["format"], true, "UTF-8");
		$this->settings = $invoiceSettings;
		$this->structure = $structure;
		$this->data = $data;
		$this->customizations = $customizations;
		$this->invoiceNumber = $data->getInvoiceNumber();
		$this->invoiceDate = $data->getDate()->format("Y-m-d\ H:i:s");

		$this->SetMargins($invoiceSettings["marginLeft"], $invoiceSettings["marginTop"], $invoiceSettings["marginRight"]);
		$this->SetHeaderMargin($invoiceSettings["marginHeader"]);
		$this->SetFooterMargin($invoiceSettings["marginFooter"]);
		$this->SetAutoPageBreak($invoiceSettings["pageBreak"], $invoiceSettings["marginBottom"]);

		if(is_array($invoiceSettings["format"]) && $invoiceSettings["pageBreak"] == false)
		{
			//Calculate height
			$height = intval($this->GetTotalHeight()) + 1;
			$height += $this->GetHeaderMargin();
			$height += $this->GetFooterMargin();
			$this->setPageFormat(array($invoiceSettings["format"][0], $height));
		}
	}

	function getData()
	{
		return $this->data;
	}

	function GenerateInvoice()
	{
		foreach($this->structure["body"] as $element)
		{
			$this->perform($element);
		}
	}

	function GetTotalHeight()
	{
		$height = $this->settings["marginTop"];
		foreach($this->structure["body"] as $element)
			$height += $this->GetHeight($element);

		return $height;
	}

	function perform($element)
	{
		$line = array_map('trim', explode(':', $element, 2));
		$count = count($line);
		if($count < 1)error_log("Invalid command " . $element);

		$command = strtolower($line[0]);
		$fullArg = ($count > 1) ? $line[1] : "";
		$args = ($count > 1) ? array_map('trim', explode(',', $line[1])) : array();
		$mappedArgs = array();
		foreach($args as $arg)
		{
			$splitted = array_map('trim', explode('=', $arg, 2));
			if(count($splitted) > 1)
				$mappedArgs[$splitted[0]] = $splitted[1];
		}

		if(isset($this->customizations["invoice-" . $command]))
		{
			$this->customizations["invoice-" . $command]($this, $fullArg, $mappedArgs);
			return;
		}

		switch($command)
		{
		case "align":
			$this->textAlign = strtoupper($fullArg[0]);
			break;
		case "image":
			$isWidth = isset($mappedArgs["width"]);
			$isHeight = isset($mappedArgs["height"]);
			$y = $this->GetY() + $mappedArgs["y"];
			if($isWidth && $isHeight)$this->image($mappedArgs["path"], $mappedArgs["x"], $y, $mappedArgs["width"], $mappedArgs["height"]);
			elseif($isWidth)$this->image($mappedArgs["path"], $mappedArgs["x"], $y, $mappedArgs["width"]);
			elseif($isHeight)$this->image($mappedArgs["path"], $mappedArgs["x"], $y, 0, $mappedArgs["height"]);
			else $this->image($mappedArgs["path"], $mappedArgs["x"], $y);
			break;
		case "font":
			$fontFamily = $this->settings["fonts"][$fullArg]["font"];
			$fontSize = $this->settings["fonts"][$fullArg]["size"];
			$fontWeight = $this->settings["fonts"][$fullArg]["weight"];
			$this->SetFont($fontFamily, $fontWeight, $fontSize);
			break;
		case "text":
			$fullArg = str_replace("%%invoice_number%%", $this->invoiceNumber, $fullArg);
			$fullArg = str_replace("%%invoice_date%%", $this->invoiceDate, $fullArg);
			$fullArg = str_replace("%%company_name%%", $GLOBALS["SETTINGS"]["company"], $fullArg);
			$fullArg = str_replace("%%company_address1%%", $GLOBALS["SETTINGS"]["address1"], $fullArg);
			$fullArg = str_replace("%%company_address2%%", $GLOBALS["SETTINGS"]["address2"], $fullArg);
			$fullArg = str_replace("%%company_telephone%%", $GLOBALS["SETTINGS"]["telephone"], $fullArg);
			$fullArg = str_replace("%%company_homepage%%", $GLOBALS["SETTINGS"]["homepage"], $fullArg);
			$fullArg = str_replace("%%company_taxid%%", $GLOBALS["SETTINGS"]["taxId"], $fullArg);
			$this->Cell(0, 0, $fullArg, 0, 0, $this->textAlign);
			break;
		case "newline":
			$this->Ln();
			break;
		case "products":
			$this->Products();
			break;
		case "tax":
			$this->Tax();
			break;
		default:
			echo "Unknown command " . $element;
			break;
		}
	}

	function GetHeight($element)
	{
		$line = array_map('trim', explode(':', $element, 2));
		$count = count($line);
		if($count < 1)error_log("Invalid command " . $element);

		$command = strtolower($line[0]);
		$fullArg = ($count > 1) ? $line[1] : "";
		$args = ($count > 1) ? array_map('trim', explode(',', $line[1])) : array();
		$mappedArgs = array();
		foreach($args as $arg)
		{
			$splitted = array_map('trim', explode('=', $arg, 2));
			if(count($splitted) > 1)
				$mappedArgs[$splitted[0]] = $splitted[1];
		}

		if(isset($this->customizations["invoice-perform-" . $command]))
		{
			return $this->customizations["invoice-" . $command . "-height"]($this, $fullArg, $mappedArgs);
		}

		switch($command)
		{
		case "image":
			$isHeight = isset($mappedArgs["height"]);
			if(!$isHeight)
			{
				error_log("Sorry but currently I don't know how to calculate the height on an image without height...");
				return 0;
			}
			return $mappedArgs["height"];
		case "font":
			$fontFamily = $this->settings["fonts"][$fullArg]["font"];
			$fontSize = $this->settings["fonts"][$fullArg]["size"];
			$fontWeight = $this->settings["fonts"][$fullArg]["weight"];
			$this->SetFont($fontFamily, $fontWeight, $fontSize);
			break;
		case "text":
			//A simple text actually has no height without newline
			return 0;
		case "newline":
			return $this->getCellHeight($this->getFontSize());
		case "products":
			$height = 0;
			$total = $this->data->getTotal();
			$totalCounted = 0;
			foreach($this->data->getInvoiceLines() as $d)
			{
				$totalCounted += ($d->getQuantity() * $d->getPrice());
			}

			//Table header
			$this->SetFont($this->getFontFamily(), $this->getFontStyle()."B", $this->getFontSizePT());
			$height += $this->getCellHeight($this->getFontSize());
			$this->SetFont($this->getFontFamily(), str_replace("B", "", $this->getFontStyle()), $this->getFontSizePT());

			//Each product
			foreach($this->data->getInvoiceLines() as $d)
			{
				$height += $this->getCellHeight($this->getFontSize());
			}
			$height += $this->getCellHeight($this->getFontSize());
			if($total != $totalCounted)
			{
				//discount
				$height += $this->getCellHeight($this->getFontSize());
				$height += $this->getCellHeight($this->getFontSize());
			}
			//total
			$height += $this->getCellHeight($this->getFontSize());
			return $height;
		case "tax":
			return $this->getCellHeight($this->getFontSize());
		default:
			return 0;
		}
	}

	function Header()
	{
		foreach($this->structure["header"] as $element)
		{
			$this->perform($element);
		}
	}

	function Footer()
	{
		foreach($this->structure["footer"] as $element)
		{
			$this->perform($element);
		}
	}

	function Products()
	{
		$this->SetFont($this->getFontFamily(), $this->getFontStyle()."B", $this->getFontSizePT());
		$widths = array(
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["name"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["amount"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["price"]) + 2
		);
		$this->SetFont($this->getFontFamily(), str_replace("B", "", $this->getFontStyle()), $this->getFontSizePT());

		$total = $this->data->getTotal();
		$totalCounted = 0;
		foreach($this->data->getInvoiceLines() as $d)
		{
			$totalCounted += ($d->getQuantity() * $d->getPrice());

			$widths[0] = max($widths[0], $this->GetStringWidth($d->getProduct()->getName()) + 2);
			$widths[1] = max($widths[1], $this->GetStringWidth($d->getQuantity()) + 2);
			$widths[2] = max($widths[2], $this->GetStringWidth($d->getPrice() . " " . $GLOBALS["SETTINGS"]["currency"]) + 2);
		}
		$margins = $this->getMargins();
		$x = ($this->w - array_sum($widths)) / 2 - $margins["left"];
		if($x < 0)$x = 1;

		$this->SetFont($this->getFontFamily(), $this->getFontStyle()."B", $this->getFontSizePT());
		$this->Cell($x);
		$this->Cell($widths[0], 0, $GLOBALS["LANGUAGE"]["name"], "BR", 0, "C");
		$this->Cell($widths[1], 0, $GLOBALS["LANGUAGE"]["amount"], "B", 0, "C");
		$this->Cell($widths[2], 0, $GLOBALS["LANGUAGE"]["price"], "BL", 0, "C");
		$this->Ln();
		$this->SetFont($this->getFontFamily(), str_replace("B", "", $this->getFontStyle()), $this->getFontSizePT());

		foreach($this->data->getInvoiceLines() as $d)
		{
			$this->Cell($x, 0, "");
			$this->Cell($widths[0], 0, $d->getProduct()->getName(), "R", 0, "L");
			$this->Cell($widths[1], 0, $d->getQuantity(), "", 0, "C");
			$this->Cell($widths[2], 0, $d->getPrice() . " " . $GLOBALS["SETTINGS"]["currency"], "L", 0, "R");
			$this->Ln();
		}
		$this->Cell($x);
		$this->Cell(array_sum($widths), 0, "", "T", 0, "", false, "", 0, true);
		$this->Ln();
		if($total != $totalCounted)
		{
			$this->Cell($x);
			if($total < $totalCounted)
			{
				$this->Cell($widths[0]+$widths[1], 0, $GLOBALS["LANGUAGE"]["discount"], "", 0, "L");
				$this->Cell($widths[2], 0, "- " . ($totalCounted-$total) . " " . $GLOBALS["SETTINGS"]["currency"], "", 0, "R");
			}
			elseif($total > $totalCounted)
			{
				$this->Cell($widths[0]+$widths[1], 0, $GLOBALS["LANGUAGE"]["surcharge"], "", 0, "L");
				$this->Cell($widths[2], 0, ($total-$totalCounted) . " " . $GLOBALS["SETTINGS"]["currency"], "", 0, "R");
			}
			$this->Ln();
			$this->Cell($x);
			$this->Cell($widths[0]+$widths[1], 0, "", "");
			$this->Cell($widths[2], 0, "", "T");
			$this->Ln();
		}
		$this->SetFont($this->getFontFamily(), $this->getFontStyle()."B", $this->getFontSizePT());
		$this->Cell($x);
		$this->Cell($widths[0]+$widths[1], 0, "", "", 0, "L");
		$this->Cell($widths[2], 0, $total . " " . $GLOBALS["SETTINGS"]["currency"], "", 0, "R");
		$this->SetFont($this->getFontFamily(), str_replace("B", "", $this->getFontStyle()), $this->getFontSizePT());
	}

	function Tax()
	{
		$total = $this->data->getTotal();
		$widths = array(
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["name"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["amount"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["price"]) + 2
		);
		foreach($this->data->getInvoiceLines() as $d)
		{
			$widths[0] = max($widths[0], $this->GetStringWidth($d->getProduct()->getName()) + 2);
			$widths[1] = max($widths[1], $this->GetStringWidth($d->getQuantity()) + 2);
			$widths[2] = max($widths[2], $this->GetStringWidth($d->getPrice() . " " . $GLOBALS["SETTINGS"]["currency"]) + 2);
		}
		$margins = $this->getMargins();
		$x = ($this->w - array_sum($widths)) / 2 - $margins["left"];
		if($x < 0)$x = 1;

		$this->Cell($x, 7, "");
		$this->Cell(0, 7, $GLOBALS["SETTINGS"]["taxName"] . ": " . ($total*$GLOBALS["SETTINGS"]["taxValue"]/100) . " " . $GLOBALS["SETTINGS"]["currency"]);
		$this->Ln();
	}

}

$invoiceSettings = $invoiceLayout["settings"];
$structure = $invoiceLayout["structure"];

$inv = new Invoice($invoiceSettings, $structure, $result, $customizations);
$inv->SetCreator($invoiceSettings["creator"]);
$inv->SetAuthor($GLOBALS["SETTINGS"]["company"]);
$inv->SetTitle($GLOBALS["LANGUAGE"]["invoice"]);

$inv->AddPage();
$inv->GenerateInvoice();
//$inv->SetFont($invoiceSettings["font"], "", $invoiceSettings["fontsize"]);
//$inv->SetData($result);

if(isset($_POST["print"]))
{
	if(!file_exists("invoices"))mkdir("invoices");
	$inv->Output(dirname(__FILE__) . "/invoices/invoice-$invoice.pdf", "F");
	system("lpr " . dirname(__FILE__) . "/invoices/invoice-$invoice.pdf");
}
else
{
	$inv->Output($GLOBALS["LANGUAGE"]["invoice"] . ".pdf", "I");
}

?>
