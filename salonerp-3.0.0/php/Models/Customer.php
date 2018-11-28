<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="customer")
 **/
class Customer extends BaseModel
{
	/**
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 **/
	private $id;

	/** @Column(type="text", nullable=true) */
	private $firstname;

	/** @Column(type="text", nullable=true) */
	private $lastname;

	/** @Column(type="text", nullable=true) */
	private $comment;

	/** @Column(type="text", nullable=true) */
	private $address;

	/** @Column(type="text", nullable=true) */
	private $telephone;

	/** @Column(type="text", nullable=true) */
	private $email;

	/**
     * @OneToMany(targetEntity="Event", mappedBy="customer", cascade={"persist", "remove"})
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

	public function getFirstname()
	{
		return $this->firstname;
	}

	public function setFirstname($firstname)
	{
		$this->firstname = $firstname;
	}

	public function getLastname()
	{
		return $this->lastname;
	}

	public function setLastname($lastname)
	{
		$this->lastname = $lastname;
	}

	public function getComment()
	{
		return $this->comment;
	}

	public function setComment($comment)
	{
		$this->comment = $comment;
	}

	public function getAddress()
	{
		return $this->address;
	}

	public function setAddress($address)
	{
		$this->address = $address;
	}

	public function getTelephone()
	{
		return $this->telephone;
	}

	public function setTelephone($telephone)
	{
		$this->telephone = $telephone;
	}

	public function getEmail()
	{
		return $this->email;
	}

	public function setEmail($email)
	{
		$this->email = $email;
	}

}
