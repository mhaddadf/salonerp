<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="invoice_line", indexes={
  * 	@Index(name="invoiceline_invoice", columns={"invoice"}),
  * 	@Index(name="invoiceline_product", columns={"product"})
  * })
 **/
class InvoiceLine extends BaseModel
{
	/**
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 **/
	private $id;

	/**
     * @ManyToOne(targetEntity="Invoice", inversedBy="invoiceLines", cascade={"persist"})
     * @JoinColumn(name="invoice", referencedColumnName="id", nullable=false)
     */
	private $invoice;

	/**
     * @ManyToOne(targetEntity="Product", inversedBy="invoices", cascade={"persist"})
     * @JoinColumn(name="product", referencedColumnName="id", nullable=false)
     */
	private $product;

	/** @Column(type="integer") */
	private $quantity;

	/** @Column(type="float") */
	private $price;

	public function __construct()
	{
	}

	public function getId()
	{
		return $this->id;
	}

	public function getInvoice()
	{
		return $this->invoice;
	}

	public function setInvoice($invoice)
	{
		$this->invoice = $invoice;
	}

	public function getProduct()
	{
		return $this->product;
	}

	public function setProduct($product)
	{
		$this->product = $product;
	}

	public function getQuantity()
	{
		return $this->quantity;
	}

	public function setQuantity($quantity)
	{
		$this->quantity = $quantity;
	}

	public function getPrice()
	{
		return $this->price;
	}

	public function setPrice($price)
	{
		$this->price = $price;
	}

}
