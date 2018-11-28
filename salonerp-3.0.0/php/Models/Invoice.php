<?php

namespace Models;

use \TCPDF;
use Doctrine\Common\Collections\ArrayCollection;

//We use this call to autoload TCPDF so that the constants below (e.g. PDF_MARGIN_LEFT) are defined
isset(TCPDF::$hack_to_autoload_tcpdf);

/**
  * @Entity
  * @Table(name="invoice", indexes={
  * 	@Index(name="invoice_event", columns={"event"}),
  * 	@Index(name="invoice_invoicenumber", columns={"invoiceNumber"}),
  * 	@Index(name="invoice_date", columns={"date"})
  * })
 **/
class Invoice extends BaseModel
{

	static $invoiceLayouts = array(
		"A4" => array(
			"settings" => array(
				"creator"		=> "SalonERP",
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

				"marginLeft"	=> PDF_MARGIN_LEFT,
				"marginRight"	=> PDF_MARGIN_RIGHT,
				"marginTop"	=> 50,
				"marginBottom"	=> PDF_MARGIN_BOTTOM,
				"marginHeader"	=> PDF_MARGIN_HEADER,
				"marginFooter"	=> PDF_MARGIN_FOOTER,

				"pageBreak"	=> true
			),
			"structure" => array(
				"header" => array(
					"image: path=media/logo.png, x=10, y=0, width=30",
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
			)
		),
		"Receipt" => array(
			"settings" => array(
				"creator"		=> "SalonERP",
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

				"marginLeft"	=> 8,
				"marginRight"	=> 8,
				"marginTop"	=> 32,
				"marginBottom"	=> PDF_MARGIN_BOTTOM,
				"marginHeader"	=> PDF_MARGIN_HEADER,
				"marginFooter"	=> PDF_MARGIN_FOOTER,

				"pageBreak"	=> false
			),
			"structure" => array(
				"header" => array(
					"align: center",
					"font: normal",
					"image: path=media/logo.png, x=22, y=0, width=30",
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
			)
		)
	);

	/**
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 **/
	private $id;

	/**
	  * @Column(type="string", length=20, nullable=true)
	 **/
	private $invoiceNumber;

	/**
     * @OneToOne(targetEntity="Event", inversedBy="invoice", cascade={"persist"})
     * @JoinColumn(name="event", referencedColumnName="id", nullable=true)
     */
	private $event;

	/** @Column(type="datetime") */
	private $date;

	/** @Column(type="float") */
	private $cash;

	/** @Column(type="float") */
	private $bank;

	/**
     * @OneToMany(targetEntity="InvoiceLine", mappedBy="invoice", cascade={"persist", "remove"})
     */
	private $invoiceLines;

	public function __construct()
	{
		$this->invoiceLines = new ArrayCollection();
	}

	public function getId()
	{
		return $this->id;
	}

	public function getInvoiceNumber()
	{
		return $this->invoiceNumber;
	}

	public function setInvoiceNumber($invoiceNumber)
	{
		$this->invoiceNumber = $invoiceNumber;
	}

	public function getEvent()
	{
		return $this->event;
	}

	public function setEvent($event)
	{
		$this->event = $event;
	}

	public function getDate()
	{
		return $this->date;
	}

	public function setDate($date)
	{
		$this->date = $date;
	}

	public function getCash()
	{
		return $this->cash;
	}

	public function setCash($cash)
	{
		$this->cash = $cash;
	}

	public function getBank()
	{
		return $this->bank;
	}

	public function setBank($bank)
	{
		$this->bank = $bank;
	}

	public function getTotal()
	{
		return $this->bank + $this->cash;
	}

	public function getInvoiceLines()
	{
		return $this->invoiceLines;
	}

}
