<?php
$curr = $_GET['data'];
header('Content-Disposition: attachment; filename="'.$curr.'"');
print(readfile("/home/maxent/$curr"));
?>
