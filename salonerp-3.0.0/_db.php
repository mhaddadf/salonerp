<?php

require_once "vendor/autoload.php";
require_once("php/config.php");

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Doctrine\Common\ClassLoader;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Tools\ToolEvents;
use Doctrine\ORM\Tools\Event\GenerateSchemaEventArgs;
use Doctrine\Common\Proxy\AbstractProxyFactory;
use Doctrine\ORM\Tools\SchemaTool;

use Models\Setting;
use Models\BaseModel;
use Models\Report;
use Tools\Tools;

if($GLOBALS["configuration"]["database-type"] == "SQLite")
{
	$dbParams = array(
		"driver"	=> "pdo_sqlite",
		"path"		=> "database.sqlite"
	);
}
else if($GLOBALS["configuration"]["database-type"] == "MySQL")
{
	$dbParams = array(
		"driver"	=> "pdo_mysql",
		"user"		=> $GLOBALS["configuration"]["mysql-user"],
		"password"	=> $GLOBALS["configuration"]["mysql-password"],
		"dbname"	=> $GLOBALS["configuration"]["mysql-database"],
		"host"		=> $GLOBALS["configuration"]["mysql-server"]
	);
}
else if($GLOBALS["configuration"]["database-type"] == "Postres")
{
	$dbParams = array(
		"driver"	=> "pdo_pgsql",
		"user"		=> $GLOBALS["configuration"]["pgsql-user"],
		"password"	=> $GLOBALS["configuration"]["pgsql-password"],
		"dbname"	=> $GLOBALS["configuration"]["pgsql-database"],
		"host"		=> $GLOBALS["configuration"]["pgsql-server"]
	);
}
else if($GLOBALS["configuration"]["database-type"] == "OCI")
{
	$dbParams = array(
		"driver"	=> "pdo_oci",
		"user"		=> $GLOBALS["configuration"]["oci-user"],
		"password"	=> $GLOBALS["configuration"]["oci-password"],
		"dbname"	=> $GLOBALS["configuration"]["oci-database"],
		"host"		=> $GLOBALS["configuration"]["oci-server"]
	);
}
else if($GLOBALS["configuration"]["database-type"] == "MSSQL")
{
	$dbParams = array(
		"driver"	=> "pdo_sqlsrv",
		"user"		=> $GLOBALS["configuration"]["sqlsrv-user"],
		"password"	=> $GLOBALS["configuration"]["sqlsrv-password"],
		"dbname"	=> $GLOBALS["configuration"]["sqlsrv-database"],
		"host"		=> $GLOBALS["configuration"]["sqlsrv-server"],
		"port"		=> $GLOBALS["configuration"]["sqlsrv-port"]
	);
}
else if($GLOBALS["configuration"]["database-type"] == "SQLAnywhere")
{
	$dbParams = array(
		"driver"	=> "pdo_sqlanywhere",
		"user"		=> $GLOBALS["configuration"]["sqlanywhere-user"],
		"password"	=> $GLOBALS["configuration"]["sqlanywhere-password"],
		"dbname"	=> $GLOBALS["configuration"]["sqlanywhere-database"],
		"host"		=> $GLOBALS["configuration"]["sqlanywhere-server"],
		"port"		=> $GLOBALS["configuration"]["sqlanywhere-port"]
	);
}

$modelsLoader = new ClassLoader('Models', 'php');
$modelsLoader->register();
$toolsLoader = new ClassLoader('Tools', 'php');
$toolsLoader->register();
$customModelsLoader = new ClassLoader('Models', 'customizations');
$customModelsLoader->register();

$config = Setup::createAnnotationMetadataConfiguration(array("php/Models", "customizations/Models"), false);
$config->setAutoGenerateProxyClasses(AbstractProxyFactory::AUTOGENERATE_FILE_NOT_EXISTS);
$db = EntityManager::create($dbParams, $config);
BaseModel::setEntityManager($db);

//...no foreign keys used
class DropForeignKeysListener implements EventSubscriber
{
    public function postGenerateSchema(GenerateSchemaEventArgs $args) {
        $schema = $args->getSchema();

        $table_names = $schema->getTableNames();
        foreach ($table_names as $table_name) {
            $table = $schema->getTable($table_name);
            $fks = $table->getForeignKeys();

            foreach ($fks as $fk => $obj) {
                $table->removeForeignKey($fk);
            }
        }
    }

    public function getSubscribedEvents() {
        return array(ToolEvents::postGenerateSchema);
    }

}
$db->getEventManager()->addEventSubscriber(new DropForeignKeysListener());

function loadLanguage($db, $language)
{
	if ($handle = opendir("php/languages/")) {
		while (false !== ($entry = readdir($handle))) {
			if ($entry != "." && $entry != "..") {
				if(Tools::endsWith($entry, ".php"))
					include_once("php/languages/" . $entry);
			}
		}
		closedir($handle);
	}
	$GLOBALS["LANGUAGE"] = $languages[$language];
	return $languages[$language];
}

function updateDatabaseSchema($db)
{
	$models = array();

	//Create standard models
	if ($handle = opendir("php/Models/")) {
		while (false !== ($entry = readdir($handle))) {
			if(Tools::endsWith($entry, ".php"))
			{
				try {
					$name = "Models\\" . substr($entry, 0, strlen($entry) - 4);
					$models[] = $db->getClassMetadata($name);
				} catch (Exception $e) {} //We don't care about those errors
			}
		}
		closedir($handle);
	}

	//Create custom models
	if ($handle = opendir("customizations/Models/")) {
		while (false !== ($entry = readdir($handle))) {
			if(Tools::endsWith($entry, ".php"))
			{
				try {
					$name = "Models\\" . substr($entry, 0, strlen($entry) - 4);
					$models[] = $db->getClassMetadata($name);
				} catch (Exception $e) {} //We don't care about those errors
			}
		}
		closedir($handle);
	}

	$tool = new SchemaTool($db);

	try {
		$tool->updateSchema($models);
	} catch(Exception $e) {
		return $e;
	}

	Report::createDefaultReports();
	return null;
}

function setLanguage($db, $language)
{
	$setting = Setting::find("language");
	if($setting == null)$setting = new Setting();
	$setting->setName("language");
	$setting->setValue($language);
	$setting->save();
}

try
{
	$GLOBALS["SETTINGS"] = array();
	foreach(Setting::listAll() as $setting) {
		$GLOBALS["SETTINGS"][$setting->getName()] = $setting->getValue();
	}
}
catch(Exception $e)
{
	//We don't do anything with this exception here
	//because it is only thrown at the time of installation.
	//And we don't care yet because we create the tables soon
}

?>
