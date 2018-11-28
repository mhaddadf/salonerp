<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="employee")
 **/
class Employee extends BaseModel
{
	/**
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 **/
	private $id;

	/** @Column(type="text") */
	private $name;

	/** @Column(type="text", nullable=true) */
	private $address;

	/** @Column(type="text", nullable=true) */
	private $telephone;

	/** @Column(type="text", nullable=true) */
	private $email;

	/**
     * @OneToMany(targetEntity="Event", mappedBy="employee", cascade={"persist", "remove"})
     */
	private $events;

	public function __construct()
	{
		$this->events = new ArrayCollection();
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

	public function setAddress($address)
	{
		$this->address = $address;
	}

	public function getAddress()
	{
		return $this->address;
	}

	public function setTelephone($telephone)
	{
		$this->telephone = $telephone;
	}

	public function getTelephone()
	{
		return $this->telephone;
	}

	public function setEmail($email)
	{
		$this->email = $email;
	}

	public function getEmail()
	{
		return $this->email;
	}

	public function getEvents()
	{
		return $this->events;
	}

}
