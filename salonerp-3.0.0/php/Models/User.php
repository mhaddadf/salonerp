<?php

namespace Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
  * @Entity
  * @Table(name="user")
 **/
class User extends BaseModel
{
	/**
	  * @Id
	  * @Column(type="integer")
	  * @GeneratedValue
	 **/
	private $id;

	/** @Column(type="text") */
	private $name;

	/** @Column(type="text") */
	private $password;

	public function __construct()
	{}

	public static function login($user, $password)
	{
		$pwd = hash("sha256", $password);

		$user = User::findOneBy(array(
			"name" => $user,
			"password" => $pwd
		));

		return ($user != null);
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

	public function setPassword($password)
	{
		if($password == null)
			$this->password = "";
		else
			$this->password = hash("sha256", $password);
	}

}
