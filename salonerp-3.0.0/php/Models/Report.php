<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="reports")
 **/
class Report extends BaseModel
{
	
	static $defaultReports = array(
		array(
			"title" => "revenue",
			"font" => "Times",
			"fontsize" => 12.0,
			"query" => "SELECT
						i.invoiceNumber AS invoiceNumber,
						i.date AS date,
						CONCAT(c.firstname, ' ', c.lastname) AS customer,
						i.cash AS cash,
						i.bank AS bank
					FROM Models\\Invoice i
					JOIN i.event e
					JOIN e.customer c
					WHERE DATE_DIFF(i.date, :startDate) >= 0
					AND DATE_DIFF(i.date, :endDate) <= 0",
			"ask" => "startDate=date,endDate=date",
			"sum" => "3,4",
			"currency" => "3,4"
		), array(
			"title" => "bestProducts",
			"font" => "Times",
			"fontsize" => 12.0,
			"query" => "SELECT
						p.name AS product,
						SUM(il.quantity) AS numberSold,
						SUM(il.price * il.quantity) AS totalPrice
					FROM Models\\InvoiceLine il
					JOIN il.invoice i
					JOIN il.product p
					WHERE DATE_DIFF(i.date, :startDate) >= 0
					AND DATE_DIFF(i.date, :endDate) <= 0
					GROUP BY p.name
					ORDER BY numberSold DESC, totalPrice DESC",
			"ask" => "startDate=date,endDate=date",
			"sum" => "",
			"currency" => "2"
		), array(
			"title" => "bestCustomers",
			"font" => "Times",
			"fontsize" => 12.0,
			"query" => "SELECT
						CONCAT(c.firstname, ' ', c.lastname) AS customer,
						COUNT(i.id) AS amount,
						SUM(i.cash + i.bank) as revenue
					FROM Models\\Invoice i
					JOIN i.event e
					JOIN e.customer c
					WHERE DATE_DIFF(i.date, :startDate) >= 0
					AND DATE_DIFF(i.date, :endDate) <= 0
					GROUP BY e.customer
					ORDER BY revenue DESC",
			"ask" => "startDate=date,endDate=date",
			"sum" => "",
			"currency" => "2"
		), array(
			"title" => "productsPerCustomer",
			"font" => "Times",
			"fontsize" => 12.0,
			"query" => "SELECT
						CONCAT(c.firstname, ' ', c.lastname) AS customer,
						COUNT(p.id) AS products,
						i.date AS date,
						i.cash + i.bank AS price
					FROM Models\\InvoiceLine il
					JOIN il.product p
					JOIN il.invoice i
					JOIN i.event e
					JOIN e.customer c
					WHERE c.id = :customer
					AND DATE_DIFF(i.date, :startDate) >= 0
					AND DATE_DIFF(i.date, :endDate) <= 0
					GROUP BY i.id
					ORDER BY i.date DESC",
			"ask" => "customer=customer,startDate=date,endDate=date",
			"sum" => "3",
			"currency" => "3"
		)
	);

	/**
	  * @Id
	  * @Column(type="integer")
	  * @GeneratedValue
	 **/
	private $id;

	/** @Column(type="text") */
	private $title;

	/** @Column(type="text", nullable=true) */
	private $font;

	/** @Column(type="float", nullable=true) */
	private $fontsize;

	/** @Column(type="text") */
	private $query;

	/** @Column(type="text", nullable=true) */
	private $ask;

	/** @Column(type="text", nullable=true) */
	private $sum;

	/** @Column(type="text", nullable=true) */
	private $currency;

	public function __construct()
	{}

	public static function createDefaultReports()
	{
		foreach(Report::$defaultReports as $r)
		{
			$report = Report::findOneBy(array("title" => $r["title"]));
			if($report == null)$report = new Report();

			$report->setTitle($r["title"]);
			$report->setFont($r["font"]);
			$report->setFontsize($r["fontsize"]);
			$report->setQuery($r["query"]);
			$report->setAsk($r["ask"]);
			$report->setSum($r["sum"]);
			$report->setCurrency($r["currency"]);

			$report->save();
		}
	}

	public function getId()
	{
		return $this->id;
	}

	public function getTitle()
	{
		return $this->title;
	}

	public function setTitle($title)
	{
		$this->title = $title;
	}

	public function getFont()
	{
		return $this->font;
	}

	public function setFont($font)
	{
		$this->font = $font;
	}

	public function getFontsize()
	{
		return $this->fontsize;
	}

	public function setFontsize($fontsize)
	{
		$this->fontsize = $fontsize;
	}

	public function getQuery()
	{
		return $this->query;
	}

	public function setQuery($query)
	{
		$this->query = $query;
	}

	public function getAsk()
	{
		return $this->ask;
	}

	public function getAskArray()
	{
		if($this->ask == null)
			return array();

		$ask = explode(",", $this->ask);
		foreach($ask as &$var)
			$var = explode("=", $var);

		return $ask;
	}

	public function setAsk($ask)
	{
		$this->ask = $ask;
	}

	public function getSum()
	{
		return $this->sum;
	}

	public function getSumArray()
	{
		if($this->sum == null)return array();
		else return explode(",", $this->sum);
	}

	public function setSum($sum)
	{
		$this->sum = $sum;
	}

	public function getCurrency()
	{
		return $this->currency;
	}

	public function getCurrencyArray()
	{
		if($this->currency == null)return array();
		else return explode(",", $this->currency);
	}

	public function setCurrency($currency)
	{
		$this->currency = $currency;
	}

}
