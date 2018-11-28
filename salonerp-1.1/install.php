<?php

$language_dir = "config/languages";
$d = opendir($language_dir);
while(($filename=readdir($d)) !== false)
{
	if($filename != ".." && $filename != ".")
	{
		$file = $language_dir . "/" . $filename;
		require_once($file);
	}
}

$msg = "";
function install(&$msg, $languages)
{
	$databaseType = $_POST["database-type"];
	$mysqlServer = $_POST["mysql-server"];
	$mysqlDatabase = $_POST["mysql-database"];
	$mysqlUser = $_POST["mysql-user"];
	$mysqlPassword = $_POST["mysql-password"];
	$selectedLanguage = $_POST["language"];
	$user = $_POST["user"];
	$password = $_POST["password"];
	$repeatPassword = $_POST["repeat-password"];
	$logo = @$_FILES["logo"]["tmp_name"];

	if($databaseType != "MySQL" && $databaseType != "SQLite")$msg .= "Error: Invalid database type: " . $databaseType . "<br />";
	if($password != $repeatPassword)$msg .= "The passwords don't match.<br />";
	if($msg != "")return;

	$configFile = fopen("config/config.php", "w") or $msg .= "Error: Can't create config file. Please check your permissions.<br />";
	if($msg != "")return;

	if($databaseType == "MySQL")
	{
		copy("config/sql_mysql.php", "config/sql.php");
		fwrite($configFile,
			'<?php
			$GLOBALS["configuration"] = array(
				"database-type" => "MySQL",
				"mysql-server" => "'.$mysqlServer.'",
				"mysql-database" => "'.$mysqlDatabase.'",
				"mysql-user" => "'.$mysqlUser.'",
				"mysql-password" => "'.$mysqlPassword.'"
			);
			?>');
	}
	else if($databaseType == "SQLite")
	{
		copy("config/sql_sqlite.php", "config/sql.php");
		fwrite($configFile,
			'<?php
			$GLOBALS["configuration"] = array(
				"database-type" => "SQLite"
			);
			?>');
	}
	fclose($configFile);

	require_once("_db.php");

	if(!$db)
	{
		$msg = "Error: Unable to connect to database server<br />";
		unlink("config/config.php");
		unlink("config/sql.php");
		return;
	}

	if(isset($logo))
	{
		if(!move_uploaded_file($logo, "media/logo.png"))
		{
			$msg = "Error: Unable to upload logo. Check your permissions<br />";
			unlink("config/config.php");
			unlink("config/sql.php");
			return;
		}
	}

	createTables($db);
	createReports($db);
	createLanguages($db, $languages);
	createUser($db, $user, $password);
	setLanguage($db, $selectedLanguage);

	$msg = "Installation complete. You can log in <a href=\"index.php\">here</a>";
}

if(isset($_POST["install"]))
{
	install($msg, $languages);
}

?>

<!DOCTYPE html>
<html>
	<head>
		<title>SalonERP Install</title>
		<link type="text/css" rel="stylesheet" href="media/layout.css" />
		<link type="text/css" rel="stylesheet" href="media/window.css" />
	</head>
	<style>
		#install-logo {
			width: 300px;
		}
	</style>
	<script>
		function databaseChanged(database){
			if(database == "MySQL"){
				Array.prototype.forEach.call(document.getElementsByClassName("mysql-settings"), function(e){
					e.style.display = "";
				});
			}else{
				Array.prototype.forEach.call(document.getElementsByClassName("mysql-settings"), function(e){
					e.style.display = "none";
				});
			}
		}

		function init(){
			Array.prototype.forEach.call(document.getElementsByClassName("mysql-settings"), function(e){
				e.style.display = "none";
			});

			document.getElementById("databaseType").selectedIndex = 0;
		}
	</script>
	<body onload="init()">
		<div class="inputWindow">
			<form action="" method="post">
				<table>
					<tr><td colspan="2" align="center"><img src="media/salonerp.png" id="install-logo" /></td></tr>
					<tr><td colspan="2"><h2>Installation</h2></td></tr>

					<tr><td>Database type</td><td><div class="styled-select"><select name="database-type" onchange="databaseChanged(this.value)" id="databaseType">
						<option value="SQLite">SQLite</option>
						<option value="MySQL">MySQL</option>
					</select></div></td></tr>

					<tr class="mysql-settings"><td>MySQL Server</td><td><input type="text" name="mysql-server" /></td></tr>
					<tr class="mysql-settings"><td>MySQL Database</td><td><input type="text" name="mysql-database" /></td></tr>
					<tr class="mysql-settings"><td>MySQL User</td><td><input type="text" name="mysql-user" /></td></tr>
					<tr class="mysql-settings"><td>MySQL Password</td><td><input type="password" name="mysql-password" /></td></tr>

					<tr><td>Language</td><td><div class="styled-select"><select name="language">
						<?php
						foreach($languages as $l => $arr)
						{
							echo "<option value=\"$l\">$l</option>";
						}
						?>
					</select></div></td></tr>

					<tr><td>Logo</td><td><input type="file" name="logo" /></td></tr>

					<tr><td>Username</td><td><input type="text" name="user" /></td></tr>
					<tr><td>Password</td><td><input type="password" name="password" /></td></tr>
					<tr><td>Repeat password</td><td><input type="password" name="repeat-password" /></td></tr>

					<?php if($msg != "")echo '<tr><td colspan="2">'.$msg.'</td></tr>'; ?>

					<tr><td colspan="2" align="right"><input type="submit" name="install" class="styled-button" /></td></tr>
				</table>
			</form>
		</div>
	</body>
</html>
