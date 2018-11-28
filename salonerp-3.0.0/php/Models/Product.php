<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="product")
 **/
class Product extends BaseModel
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue
     **/
    private $id;

    /** @Column(type="text") */
    private $name;

    /** @Column(type="float") */
    private $price;

    /** @Column(type="integer", nullable=true) */
    private $duration;

    /** @Column(type="text", nullable=true) */
    private $color;

    /**
     * Many Products to many Categories
     * @ManyToMany(targetEntity="ProductCategory", inversedBy="products", cascade={"persist", "remove"})
     */
    private $categories;

    /**
     * @OneToMany(targetEntity="Event", mappedBy="product", cascade={"persist", "remove"})
     */
    private $events;

	/**
	 * @ManyToMany(targetEntity="Event", mappedBy="additionalProducts", cascade={"persist", "remove"})
	 */
	private $eventsSecondary;

    /**
     * @OneToMany(targetEntity="InvoiceLine", mappedBy="product", cascade={"persist", "remove"})
     */
    private $invoices;

    public function __construct()
    {
        $this->events = new ArrayCollection();
        $this->eventsSecondary = new ArrayCollection();
        $this->invoices = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getDuration()
    {
        return $this->duration;
    }

    public function setDuration($duration)
    {
        $this->duration = $duration;
    }

    public function getColor()
    {
        return $this->color;
    }

    public function setColor($color)
    {
        $this->color = $color;
    }

    public function getCategories()
    {
        return $this->categories;
    }

    public function setCategories($categories)
    {
        $this->categories = $categories;
    }
    
    public function clearCategories()
    {
        $this->categories->clear();
    }

    public function addCategory(ProductCategory $category){
        $this->categories[] = $category;
    }

    public function removeCategory($category){
        $this->categories->remove($category);
    }

}
