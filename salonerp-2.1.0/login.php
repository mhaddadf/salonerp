<?php
/*@session_start();

if(isset($_SESSION["user"]))return;

$invalid = false;
require_once("_db.php");

if(isset($_POST["login"]))
{
	$stmt = $db->prepare("SELECT * FROM user WHERE name = :name and password = :password");

	$stmt->bindParam(":name", $_POST["user"]);
	$pwd = sha1($_POST["password"]);
	$stmt->bindParam(":password", $pwd);

	$stmt->execute();
	if(count($stmt->fetchAll()) > 0)
	{
		$_SESSION["user"] = $_POST["user"];
		return;
	}

	$invalid = true;
}

loadSettings($db);
loadLanguage($db, $GLOBALS["SETTINGS"]["language"]);*/

@session_start();

if(isset($_SESSION["id"]) || isset($_COOKIE["salonerp-id"]))
{
	//Recover timed out php-session
	if(!isset($_SESSION["id"]))$_SESSION["id"] = $_COOKIE["salonerp-id"];

	//Clean up old sessions
	if($handle = opendir("sessions"))
	{
		$currentTime = time();
		while (false !== ($entry = readdir($handle)))
		{
			if($entry == "." || $entry == ".." || $entry == ".placeholder")continue;
			if(($currentTime - filemtime("sessions/" . $entry)) > 36000)
			{
				unlink("sessions/" . $entry);
			}
		}
		closedir($handle);
	}

	if(file_exists("sessions/" . $_SESSION["id"]))
	{
		//Update modification time
		touch("sessions/" . $_SESSION["id"]);
		return;
	}
}

function generateRandomString($length = 10) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}

$invalid = false;
require_once("_db.php");

if(isset($_POST["login"]))
{
	$stmt = $db->prepare("SELECT * FROM user WHERE name = :name and password = :password");

	$stmt->bindParam(":name", $_POST["user"]);
	$pwd = sha1($_POST["password"]);
	$stmt->bindParam(":password", $pwd);

	$stmt->execute();
	if(count($stmt->fetchAll()) > 0)
	{
		$sessionId = generateRandomString(20);
		file_put_contents("sessions/$sessionId", $sessionId);
		$_SESSION["id"] = $sessionId;
		setcookie("salonerp-id", $sessionId, time()+36000);
		echo "<meta http-equiv=\"refresh\" content=\"0; url=.\" />";
		exit(0);
	}

	$invalid = true;
}

loadSettings($db);
loadLanguage($db, $GLOBALS["SETTINGS"]["language"]);

?>

<!DOCTYPE html>
<html>
	<head>
		<title>SalonERP login</title>
		<link type="text/css" rel="stylesheet" href="media/layout.css" />
		<link type="text/css" rel="stylesheet" href="media/window.css" />
	</head>
	<style>
		#login-logo {
			width: 300px;
		}
	</style>
	<body>
		<div class="inputWindow">
			<form action="login.php" method="post">
				<table>
					<tr><td colspan="2" align="center"><img src="media/salonerp.png" id="login-logo" /></td></tr>

					<tr><td><?php echo $GLOBALS["LANGUAGE"]["user"]; ?></td><td><input type="text" name="user" /></td></tr>

					<tr><td><?php echo $GLOBALS["LANGUAGE"]["password"]; ?></td><td><input type="password" name="password" /></td></tr>

					<?php if($invalid)echo "<tr><td colspan=\"2\"><p>" . $GLOBALS["LANGUAGE"]["invalidUser"] . "</p></td></tr>"; ?>

					<tr><td colspan="2" align="right"><input type="submit" name="login" class="styled-button" /></td></tr>
				</table>
			</form>
		</div>
	</body>
</html>

<?php
exit(0);
?>
