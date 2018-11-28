<?php

use Doctrine\ORM\Tools\Console\ConsoleRunner;

// replace with file to your own project bootstrap
require_once '_db.php';

return ConsoleRunner::createHelperSet($db);

?>
