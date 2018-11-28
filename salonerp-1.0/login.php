<?php
@session_start();

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
			<form action="" method="post">
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
