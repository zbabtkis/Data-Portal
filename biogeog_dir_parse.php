<?php

define("DRUPAL_ROOT", "/var/www/vhosts/biogeog.ucsb.edu");
require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$f = fopen('biogeog_dir_db.csv', 'r');
try {
    $db = new PDO('sqlite:data_db/biogeog_data.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$id = 0;
//holds dir name to check if name already exists in data structure,
$struct = array();
//holds full data set including id, pid and dir name
$data = array();
$last_dir = null;
try {
	$db->exec("DROP TABLE IF EXISTS dirs");
	$db->exec("CREATE TABLE IF NOT EXISTS dirs (id INTEGER PRIMARY KEY, pid INTEGER, title TEXT)");
} catch (PDOException $e) {
	echo "Create table failed: " . $e->getMessage();
}
while(($line = fgetcsv($f, 4000, '/')) != FALSE) {
	$pid = 0;
	foreach($line as $key=>$dir) {
		if(!isset($struct[$key]) || !in_array($dir, $struct[$key])) {
			$id++;
			$pid = $data[$key-1][$last_dir]['id'];
			$struct[$key][$dir] = $dir;
			$data[$key][$dir] = array('name'=>$dir, 'id'=> $id, 'pid'=>$pid);
			try {
				$db->exec("INSERT INTO dirs (title, pid, id) VALUES ('$dir', '$pid', '$id')");
			} catch(PDOException $e) {
				echo "Error: " . $e->getMessage();
			}
		}
		$last_dir = $dir;
	}
}
?>