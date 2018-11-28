<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="settings")
 **/
class Setting extends BaseModel
{
	/**
	  * @Id
	  * @Column(type="string", length=64)
	 **/
	private $name;

	/** @Column(type="text") */
	private $value;

	public function __construct()
	{}

	public function getName()
	{
		return $this->name;
	}

	public function setName($name)
	{
		$this->name = $name;
	}

	public function getValue()
	{
		return $this->value;
	}

	public function setValue($value)
	{
		$this->value = $value;
	}

}
