<?php

$db = new PDO('sqlite:data_db/biogeog_data.db');
$data = $db->query("SELECT * FROM dirs");
foreach($data as $d) {
	print("<pre>");
	print_r($d);
	print("</pre>");
}

?>