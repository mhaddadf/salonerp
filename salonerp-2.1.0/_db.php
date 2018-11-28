<?php

require_once("config/config.php");
require_once("config/sql.php");

if($GLOBALS["configuration"]["database-type"] == "SQLite")
{
	$db = new PDO('sqlite:database.sqlite');
}
else if($GLOBALS["configuration"]["database-type"] == "MySQL")
{
	$db = new PDO(
		'mysql:host='.$GLOBALS["configuration"]["mysql-server"].';dbname='.$GLOBALS["configuration"]["mysql-database"],
		$GLOBALS["configuration"]["mysql-user"],
		$GLOBALS["configuration"]["mysql-password"]
	);
}

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function loadSettings($db)
{
	$stmt = $db->prepare("SELECT * FROM settings");

	$stmt->execute();

	$GLOBALS["SETTINGS"] = array();
	foreach($stmt->fetchAll() as $row) {
		$GLOBALS["SETTINGS"][$row["name"]] = $row["value"];
	}
}

function loadLanguage($db, $language)
{
	$stmt = $db->prepare("SELECT
		language_word.name,
		language_word.value
	FROM language
	JOIN language_word ON language.id = language_word.language
	WHERE language.name = :language");

	$stmt->bindParam(":language", $language);
	$stmt->execute();

	$GLOBALS["LANGUAGE"] = array();
	foreach($stmt->fetchAll() as $row) {
		$GLOBALS["LANGUAGE"][$row["name"]] = $row["value"];
	}
}

?>
