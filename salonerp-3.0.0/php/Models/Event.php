<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="events", indexes={
  * 	@Index(name="event_deleted", columns={"deleted"}),
  * 	@Index(name="event_start", columns={"start"}),
  * 	@Index(name="event_end", columns={"end"}),
  * 	@Index(name="event_customer", columns={"customer"}),
  * 	@Index(name="event_employee", columns={"employee"}),
  * 	@Index(name="event_product", columns={"product"})
  * })
 **/
class Event extends BaseModel
{
	/**
	  * @Id
	  * @Column(type="integer")
	  * @GeneratedValue
	 **/
	private $id;

	/**
     * @ManyToOne(targetEntity="Customer", inversedBy="events", cascade={"persist"})
     * @JoinColumn(name="customer", referencedColumnName="id", nullable=false)
     */
	private $customer;

	/**
     * @ManyToOne(targetEntity="Product", inversedBy="events", cascade={"persist"})
     * @JoinColumn(name="product", referencedColumnName="id", nullable=false)
     */
	private $product;

	/**
	 * @ManyToMany(targetEntity="Product", inversedBy="eventsSecondary", cascade={"persist"})
	 * @JoinTable(name="additional_products")
	 */
	private $additionalProducts;

	/** @Column(type="text", nullable=true) */
	private $name;

	/** @Column(type="datetime") */
	private $start;

	/** @Column(type="datetime") */
	private $end;

	/** @Column(type="boolean", nullable=true) */
	private $deleted;

	/** @Column(type="string", length=30, nullable=true) */
	private $resource;

	/**
     * @ManyToOne(targetEntity="Employee", inversedBy="events", cascade={"persist"})
     * @JoinColumn(name="employee", referencedColumnName="id", nullable=false)
     */
	private $employee;

	/**
     * @OneToOne(targetEntity="Invoice", mappedBy="event", cascade={"persist", "remove"})
     */
	private $invoice;

	public function __construct()
	{
        $this->additionalProducts = new ArrayCollection();
	}

	public function getId()
	{
		return $this->id;
	}

	public function getCustomer()
	{
		return $this->customer;
	}

	public function setCustomer($customer)
	{
		$this->customer = $customer;
	}

	public function getProduct()
	{
		return $this->product;
	}

	public function setProduct($product)
	{
		$this->product = $product;
	}

	public function getAdditionalProducts()
	{
		return $this->additionalProducts;
	}

	public function addAdditionalProduct($product)
	{
		$this->additionalProducts->add($product);
	}

	public function clearAdditionalProducts()
	{
		$this->additionalProducts->clear();
	}

	public function getName()
	{
		return $this->name;
	}

	public function setName($name)
	{
		$this->name = $name;
	}

	public function getStart()
	{
		return $this->start;
	}

	public function setStart($start)
	{
		$this->start = $start;
	}

	public function getEnd()
	{
		return $this->end;
	}

	public function setEnd($end)
	{
		$this->end = $end;
	}

	public function getDeleted()
	{
		return $this->deleted;
	}

	public function setDeleted($deleted)
	{
		$this->deleted = $deleted;
	}

	public function getResource()
	{
		return $this->resource;
	}

	public function setResource($resource)
	{
		$this->resource = $resource;
	}

	public function getEmployee()
	{
		return $this->employee;
	}

	public function setEmployee($employee)
	{
		$this->employee = $employee;
	}

	public function getInvoice()
	{
		return $this->invoice;
	}

}
