<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/** @Entity */
class ProductCategory extends BaseModel
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue
     **/
    private $id;

    /** @Column(type="text") */
    private $name;

    /** @ManyToMany(targetEntity="Product", mappedBy="categories", cascade={"persist", "remove"}) */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getProducts()
    {
        return $this->products;
    }

    public function setProducts($products)
    {
        $this->products = $products;
    }

    public function addProduct(Product $product){
        $this->products[] = $product;
    }

    public function removeProduct($product){
        $this->products->remove($product);
    }


}