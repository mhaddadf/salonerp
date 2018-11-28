<?php

namespace Models;

abstract class BaseModel
{
	private static $entityManager;

	private static $autosave = true;

	public static function setEntityManager($em)
	{
		BaseModel::$entityManager = $em;
	}

	public static function getEntityManager()
	{
		return BaseModel::$entityManager;
	}

	public static function listAll()
	{
		return BaseModel::$entityManager->getRepository(get_called_class())->findAll();
	}

	public static function createQueryBuilder($alias)
	{
		return BaseModel::$entityManager->getRepository(get_called_class())->createQueryBuilder($alias);
	}

	public static function getRepository()
	{
		return BaseModel::$entityManager->getRepository(get_called_class());
	}

	public static function find($id)
	{
		return BaseModel::$entityManager->getRepository(get_called_class())->find($id);
	}

	public static function findBy($query)
	{
		return BaseModel::$entityManager->getRepository(get_called_class())->findBy($query);
	}

	public static function findOneBy($query)
	{
		return BaseModel::$entityManager->getRepository(get_called_class())->findOneBy($query);
	}

	public static function autosave($autosave)
	{
		if($autosave)BaseModel::$entityManager->flush();
		BaseModel::$autosave = $autosave;
	}

	public static function saveAll()
	{
		BaseModel::$entityManager->flush();
	}

	public function save()
	{
		BaseModel::$entityManager->persist($this);

		if(BaseModel::$autosave)
			BaseModel::$entityManager->flush();
	}

	public function remove()
	{
		BaseModel::$entityManager->remove($this);

		if(BaseModel::$autosave)
			BaseModel::$entityManager->flush();
	}
}
