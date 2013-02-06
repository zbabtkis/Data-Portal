<?php
/** bootstrap drupal **/
define("DRUPAL_ROOT", "/var/www/vhosts/biogeog.ucsb.edu");
require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

if(isset($_GET['dir_id'])) {
	$dir_id = $_GET['dir_id'];
	$query = db_select('biogeog_portal_data','d');
	// Ged file id, file's parent id and title of the file.
	$query->fields('d',array('id','pid','title'))
	// On first view, we will show directories starting at level 4.
		  ->condition('pid',$dir_id,'=');
	$results = $query->execute();

	$data = array();
	while($record = $results->fetchAssoc()) {
		$fileType = preg_match('/^.*\.(.*?)$/i', $record['title'], $ft);
		if(!$ft[1]) {
			$type = 'directory';
		} else {
			$type = 'file';
		}
		$record['type'] = $type;
	    $data[$record['id']] = $record;
	}
	// Send current filesystem level objects to app Model.
	print(json_encode($data));
} else {
	print("You haven't requested a directory id");
}
?>