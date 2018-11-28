<?php

@session_start();

if(isset($_POST["save"]))
{
	var_dump($_POST);
	$_SESSION["title"] = $_POST["title"];
	$_SESSION["font"] = $_POST["font"];
	$_SESSION["fontSize"] = $_POST["fontSize"];
	$_SESSION["sql"] = $_POST["sql"];
	$_SESSION["ask"] = $_POST["ask"];
	$_SESSION["sum"] = $_POST["sum"];
	$_SESSION["currency"] = $_POST["currency"];
	exit();
}

$title = "revenue";
$font = "Helvetica";
$fontSize = 12;
$sql = "SELECT
	'R000' || invoice.id AS invoiceNumber,
	date AS date,
	firstname || ' ' || lastname AS customer,
	cash AS cash,
	bank AS bank
FROM invoice
JOIN events ON events.id = invoice.event
JOIN customer ON customer.id = events.customer";
$ask = array();
$sum = array(3, 4);
$currency = array(3, 4);


if(isset($_SESSION["title"]))$title = $_SESSION["title"];
if(isset($_SESSION["font"]))$font = $_SESSION["font"];
if(isset($_SESSION["fontSize"]))$fontSize = $_SESSION["fontSize"];
if(isset($_SESSION["sql"])){ $sql = $_SESSION["sql"]; $sum = array(); $currency = array(); }
if(isset($_SESSION["ask"]))$ask = $_SESSION["ask"];
if(isset($_SESSION["sum"]))$sum = $_SESSION["sum"];
if(isset($_SESSION["currency"]))$currency = $_SESSION["currency"];

unset($_SESSION["title"]);
unset($_SESSION["font"]);
unset($_SESSION["fontSize"]);
unset($_SESSION["sql"]);
unset($_SESSION["ask"]);
unset($_SESSION["sum"]);
unset($_SESSION["currency"]);

require_once("tcpdf/tcpdf_import.php");
require_once("_db.php");
loadSettings($db);
loadLanguage($db, $GLOBALS["SETTINGS"]["language"]);

class Report extends TCPDF
{

	function Header()
	{
		$this->image("media/logo.png", 10, 6, 30);
		$this->SetFont("Helvetica", "B", 15);
		$this->Cell(0, 10, $this->title, 0, 0, "C");
		$this->Ln(20);
	}

	function Footer()
	{
		$this->SetFont("Helvetica", "B", 8);
		$this->SetY(-15);
		$this->Cell(0, 10, $this->getAliasNumPage()."/".$this->getAliasNbPages(), 0, 0, "C");
	}

	function SetData($data, $sum, $currency)
	{
		if(count($data) == 0)
		{
			$this->SetFont($this->FontFamily, "B", $this->FontSizePt);
			$this->Cell(0, 7, "No data", 0, "C");
			return;
		}

		//Find max width for each col and calculate sums
		$widths = array();
		$sums = array();
		foreach($data as $row)
		{
			$counter = 0;
			foreach($row as $header => $col)
			{
				if(!is_numeric($header))
				{
					if(count($widths) <= $counter)$widths[] = 0;
					$this->SetFont($this->FontFamily, "B", $this->FontSizePt);
					$text = $GLOBALS["LANGUAGE"][$header];
					$widths[$counter] = max($widths[$counter], $this->GetStringWidth($text) + 2);

					$this->SetFont($this->FontFamily, "", $this->FontSizePt);
					$isCurrency = false;
					foreach($currency as $cur)if($counter == $cur)$isCurrency = true;
					$text = $col . " " . ($isCurrency ? $GLOBALS["SETTINGS"]["currency"] : "");
					$widths[$counter] = max($widths[$counter], $this->GetStringWidth($text) + 2);
					foreach($sum as $s)
					{
						if($counter == $s)
						{
							if(!isset($sums["C".$s]))$sums["C".$s] = $col;
							else $sums["C".$s] += $col;
						}
					}
					$counter++;
				}
			}
		}

		$this->SetFont($this->FontFamily, "B", $this->FontSizePt);
		foreach($sum as $s)
		{
			$isCurrency = false;
			foreach($currency as $cur)if($s == $cur)$isCurrency = true;
			$text = $sums["C".$s] . " " . ($isCurrency ? $GLOBALS["SETTINGS"]["currency"] : "");
			$widths[$s] = max($widths[$s], $this->GetStringWidth($text) + 2);
		}

		$this->SetFont($this->FontFamily, "", $this->FontSizePt);
		$first = true;
		foreach($data as $row)
		{
			if($first == true)
			{
				$counter = 0;
				foreach($row as $header => $col)
				{
					$this->SetFont($this->FontFamily, "B", $this->FontSizePt);
					if(!is_numeric($header))
					{
						$text = $GLOBALS["LANGUAGE"][$header];
						$this->Cell($widths[$counter++], 7, $text, 1, "C");
					}
				}

				$this->Ln();
				$first = false;
			}

			$this->SetFont($this->FontFamily, "", $this->FontSizePt);
			$counter = 0;
			foreach($row as $header => $col)
			{
				if(!is_numeric($header))
				{
					$isCurrency = false;
					foreach($currency as $cur)if($counter == $cur)$isCurrency = true;
					$text = $col . " " . ($isCurrency ? $GLOBALS["SETTINGS"]["currency"] : "");
					if(is_numeric($col))$this->Cell($widths[$counter], 6, $text, "LR", 0, "R");
					else $this->Cell($widths[$counter], 6, $text, "LR", 0, "L");
					$counter++;
				}
			}

			$this->Ln();
		}
		$this->Cell(array_sum($widths), 0, "", "T", 0, "", false, "", 0, true);
		$this->Ln();

		$this->SetFont($this->FontFamily, "B", $this->FontSizePt);
		for($i = 0; $i < count($widths); $i++)
		{
			$wasSum = false;
			foreach($sum as $s)
			{
				if($i == $s)
				{
					$isCurrency = false;
					foreach($currency as $cur)if($s == $cur)$isCurrency = true;
					$text = $sums["C".$s] . " " . ($isCurrency ? $GLOBALS["SETTINGS"]["currency"] : "");
					$this->Cell($widths[$s], 6, $text, 1, 0, "R");
					$wasSum = true;
					break;
				}
			}

			if(!$wasSum)
			{
				$this->Cell($widths[$i], 6, "");
			}
		}
	}

}

$stmt = $db->prepare($sql);
foreach($ask as $a)
{
	$stmt->bindParam(":".$a["name"], $a["value"]);
}

$stmt->execute();
$result = $stmt->fetchAll();

$report = new Report(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, "UTF-8", false);
$report->SetCreator("SalonERP");
$report->SetAuthor($GLOBALS["SETTINGS"]["company"]);
$report->SetTitle($GLOBALS["LANGUAGE"][$title]);
$report->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP + 20, PDF_MARGIN_RIGHT);
$report->SetHeaderMargin(PDF_MARGIN_HEADER+10);
$report->SetFooterMargin(PDF_MARGIN_FOOTER);
$report->SetAutoPageBreak(true, PDF_MARGIN_BOTTOM);

$report->AddPage();
$report->SetFont($font, "", $fontSize);
$report->SetData($result, $sum, $currency);
$report->Output($GLOBALS["LANGUAGE"][$title] . ".pdf", "I");

?>
