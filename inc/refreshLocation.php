<?php
$cec_data = array();
$curr = $_GET['data'];
if(get_file_extension($_GET['data'])) {
	$cec_data['type'] = 'file';
	if(get_file_extension($_GET['data']) == 'gtif' || get_file_extension($_GET['data']) == 'jpg') {
		header("Content-type: image/tiff");
		$cec_data['type'] = 'url';
		$cec_data['file'] = exif_read_data("/home/maxent/$curr");
		$cec_data['url'] = dirname($_SERVER['PHP_SELF']) . '/imageGet.php?data=' . $curr;
	} else {
		$cec_data['file'] = file_get_contents("/home/maxent/$curr");
	}
} else {
	$data_paths = glob("/home/maxent/$curr/*");
}
if($cec_data['type'] != 'file' && $cec_data['type'] != 'url') {
	foreach($data_paths as $path) {
		 preg_match('/\/home\/maxent\/(.*)/',$path, $filename);
		 $data_filenames[] = $filename[1];
	}
	for($i = 0, $l = count($data_paths); $i < $l; $i++) {
		$cec_data['data'][] = array('path' => $data_paths[$i], 'file_loc' => $data_filenames[$i]);
	}
	$cec_data['type'] = 'fs';
}
print(json_encode($cec_data));

function get_file_extension($file_name) {
  return substr(strrchr($file_name,'.'),1);
}
?>
