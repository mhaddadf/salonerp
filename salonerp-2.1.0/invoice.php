<?php

require_once("_db.php");
require_once("tcpdf/tcpdf_import.php");

//Load customizations at the end
require_once 'customizations/customizations.php';

loadSettings($db);
loadLanguage($db, $GLOBALS["SETTINGS"]["language"]);

/*************** Invoice parameter configuration ***************/

$invoiceSettingsA4 = array(
	"creator"		=> "SPos",
	"unit"			=> "mm",
	"format"		=> "A4",
	"fonts"			=> array(
							"normal" => array(
								"font" => "Helvetica",
								"size" => 12,
								"weight" => "",
							),
							"title" => array(
								"font" => "Helvetica",
								"size" => 18,
								"weight" => "B",
							),
							"font1" => array(
								"font" => "Helvetica",
								"size" => 12,
								"weight" => "B",
							),
							"footer" => array(
								"font" => "Helvetica",
								"size" => 8,
								"weight" => "B",
							),
						),

	"margin-left"	=> PDF_MARGIN_LEFT,
	"margin-right"	=> PDF_MARGIN_RIGHT,
	"margin-top"	=> 50,
	"margin-bottom"	=> PDF_MARGIN_BOTTOM,
	"margin-header"	=> PDF_MARGIN_HEADER,
	"margin-footer"	=> PDF_MARGIN_FOOTER,

	"page-break"	=> true
);
		
$structureA4 = array(
	"header" => array(
		"image: media/logo.png, x=10, y=0, width=30",
		"align: center",
		"font: title",
		"text: Invoice",
		"font: normal",
		"newline",
		"newline",
		"align: right",
		"text: %%company_name%%",
		"newline",
		"text: %%company_address1%%",
		"newline",
		"text: %%company_address2%%",
		"newline",
		"text: %%company_telephone%%",
		"newline",
		"text: %%company_homepage%%",
		"newline",
		"text: %%company_taxid%%"
	),
	"body" => array(
		"font: font1",
		"align: left",
		"text: Invoice: %%invoice_number%%",
		"newline",
		"text: Date: %%invoice_date%%",
		"newline",
		"newline",
		"font: normal",
		"align: center",
		"products",
		"newline",
		"newline",
		"tax",
	),
	"footer" => array(
		"font: footer",
		"align: center",
		"text: %%company_name%% | %%company_telephone%% | %%company_homepage%%"
	)
);

$invoiceSettingsReceipt = array(
	"creator"		=> "SPos",
	"unit"			=> "mm",
	"format"		=> array(83, 83),
	"fonts"			=> array(
							"normal" => array(
								"font" => "Helvetica",
								"size" => 8,
								"weight" => "",
							),
							"font1" => array(
								"font" => "Helvetica",
								"size" => 8,
								"weight" => "B",
							),
							"footer" => array(
								"font" => "Helvetica",
								"size" => 8,
								"weight" => "B",
							),
						),

	"margin-left"	=> 8,
	"margin-right"	=> 8,
	"margin-top"	=> 32,
	"margin-bottom"	=> PDF_MARGIN_BOTTOM,
	"margin-header"	=> PDF_MARGIN_HEADER,
	"margin-footer"	=> PDF_MARGIN_FOOTER,

	"page-break"	=> false
);
		
$structureReceipt = array(
	"header" => array(
		"align: center",
		"font: normal",
		"image: media/logo.png, x=22, y=0, width=30",
		"text: ",
		"newline",
		"newline",
		"newline",
		"text: %%company_name%%",
		"newline",
		"text: %%company_address1%%",
		"newline",
		"text: %%company_address2%%",
		"newline",
		"text: %%company_taxid%%"
	),
	"body" => array(
		"font: font1",
		"align: left",
		"text: Invoice: %%invoice_number%%",
		"newline",
		"text: Date: %%invoice_date%%",
		"newline",
		"newline",
		"font: normal",
		"align: center",
		"products",
		"newline",
		"newline",
		"tax",
		"newline"
	),
	"footer" => array(
		"font: footer",
		"align: center",
		"text: %%company_name%% | %%company_telephone%% | %%company_homepage%%"
	)
);

$invoiceSettings = $invoiceSettingsReceipt;
$structure = $structureReceipt;

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

class Invoice extends TCPDF
{

	private $settings;
	private $structure;
	private $textAlign;
	private $data;
	private $invoiceNumber;
	private $invoiceDate;

	function __construct($invoiceSettings, $structure, $data)
	{
		parent::__construct(PDF_PAGE_ORIENTATION, $invoiceSettings["unit"], $invoiceSettings["format"], true, "UTF-8");
		$this->settings = $invoiceSettings;
		$this->structure = $structure;
		$this->data = $data;
		$this->invoiceNumber = $data[0][0];
		$this->invoiceDate = str_replace("T", " ", $data[0][2]);

		while(strlen($this->invoiceNumber) < 6)$this->invoiceNumber = "0" . $this->invoiceNumber;
		$this->invoiceNumber = "R" . $this->invoiceNumber;

		if(is_array($invoiceSettings["format"]) && $invoiceSettings["page-break"] == false)
		{
			//Calculate height
			$height = intval($this->GetTotalHeight()) + 1;
			$this->setPageFormat(array($invoiceSettings["format"][0], $height));
		}
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
		$height = $this->settings["margin-top"];
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

		switch($command)
		{
		case "align":
			$this->textAlign = strtoupper($fullArg[0]);
			break;
		case "image":
			$isWidth = isset($mappedArgs["width"]);
			$isHeight = isset($mappedArgs["height"]);
			$y = $this->GetY() + $mappedArgs["y"];
			if($isWidth && $isHeight)$this->image($args[0], $mappedArgs["x"], $y, $mappedArgs["width"], $mappedArgs["height"]);
			elseif($isWidth)$this->image($args[0], $mappedArgs["x"], $y, $mappedArgs["width"]);
			elseif($isHeight)$this->image($args[0], $mappedArgs["x"], $y, 0, $mappedArgs["height"]);
			else $this->image($args[0], $mappedArgs["x"], $y);
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
			//$this->getCellHeight($this->getFontSize())
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
			$total = 0;
			$totalCounted = 0;
			foreach($this->data as $d)
			{
				$total = $d[1];
				$totalCounted += ($d[5]* $d[4]);
			}

			//Table header
			$this->SetFont($this->getFontFamily(), $this->getFontStyle()."B", $this->getFontSizePT());
			$height += $this->getCellHeight($this->getFontSize());
			$this->SetFont($this->getFontFamily(), str_replace("B", "", $this->getFontStyle()), $this->getFontSizePT());

			//Each product
			foreach($this->data as $d)
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

		$total = "";
		$totalCounted = 0;
		foreach($this->data as $d)
		{
			$total = $d[1];
			$totalCounted += ($d[5]* $d[4]);

			$widths[0] = max($widths[0], $this->GetStringWidth($d[3]) + 2);
			$widths[1] = max($widths[1], $this->GetStringWidth($d[4]) + 2);
			$widths[2] = max($widths[2], $this->GetStringWidth($d[5] . " " . $GLOBALS["SETTINGS"]["currency"]) + 2);
		}
		$x = ($this->w - array_sum($widths)) / 2 - $this->getMargins()["left"];
		if($x < 0)$x = 1;

		$this->SetFont($this->getFontFamily(), $this->getFontStyle()."B", $this->getFontSizePT());
		$this->Cell($x);
		$this->Cell($widths[0], 0, $GLOBALS["LANGUAGE"]["name"], "BR", 0, "C");
		$this->Cell($widths[1], 0, $GLOBALS["LANGUAGE"]["amount"], "B", 0, "C");
		$this->Cell($widths[2], 0, $GLOBALS["LANGUAGE"]["price"], "BL", 0, "C");
		$this->Ln();
		$this->SetFont($this->getFontFamily(), str_replace("B", "", $this->getFontStyle()), $this->getFontSizePT());

		foreach($this->data as $d)
		{
			$this->Cell($x, 0, "");
			$this->Cell($widths[0], 0, $d[3], "R", 0, "L");
			$this->Cell($widths[1], 0, $d[4], "", 0, "C");
			$this->Cell($widths[2], 0, $d[5] . " " . $GLOBALS["SETTINGS"]["currency"], "L", 0, "R");
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
		$total = "";
		$widths = array(
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["name"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["amount"]) + 2,
			$this->GetStringWidth($GLOBALS["LANGUAGE"]["price"]) + 2
		);
		foreach($this->data as $d)
		{
			$total = $d[1];

			$widths[0] = max($widths[0], $this->GetStringWidth($d[3]) + 2);
			$widths[1] = max($widths[1], $this->GetStringWidth($d[4]) + 2);
			$widths[2] = max($widths[2], $this->GetStringWidth($d[5] . " " . $GLOBALS["SETTINGS"]["currency"]) + 2);
		}
		$x = ($this->w - array_sum($widths)) / 2 - $this->getMargins()["left"];
		if($x < 0)$x = 1;

		$this->Cell($x, 7, "");
		$this->Cell(0, 7, $GLOBALS["SETTINGS"]["taxName"] . ": " . ($total*$GLOBALS["SETTINGS"]["taxValue"]/100) . " " . $GLOBALS["SETTINGS"]["currency"]);
		$this->Ln();
	}

}

$sql = "SELECT
	invoice.id,
	cash + bank,
	date,
	product.name,
	invoice_line.quantity,
	invoice_line.price
FROM invoice
JOIN invoice_line ON invoice.id = invoice_line.invoice
JOIN product ON invoice_line.product = product.id
WHERE invoice.id = :invoice";

$stmt = $db->prepare($sql);

$stmt->bindParam(":invoice", $invoice);
$stmt->execute();
$result = $stmt->fetchAll();

$inv = new Invoice($invoiceSettings, $structure, $result);
$inv->SetCreator($invoiceSettings["creator"]);
$inv->SetAuthor($GLOBALS["SETTINGS"]["company"]);
$inv->SetTitle($GLOBALS["LANGUAGE"]["invoice"]);
$inv->SetMargins($invoiceSettings["margin-left"], $invoiceSettings["margin-top"], $invoiceSettings["margin-right"]);
$inv->SetHeaderMargin($invoiceSettings["margin-header"]);
$inv->SetFooterMargin($invoiceSettings["margin-footer"]);
$inv->SetAutoPageBreak($invoiceSettings["page-break"], $invoiceSettings["margin-bottom"]);

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
