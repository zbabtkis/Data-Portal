<?php
/*$cec_data = array();
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
	$data_filenames = scandir("/home/maxent/$curr");
}
if($cec_data['type'] != 'file' && $cec_data['type'] != 'url') {
	$data_paths = array();
	foreach($data_filenames as $file) {
		 $data_paths[] = $curr . '/' . $file;
	}
	for($i = 0, $l = count($data_paths); $i < $l; $i++) {
		$cec_data['data'][] = array('path' => $data_paths, 'file_loc' => $data_filenames[$i]);
	}
	$cec_data['type'] = 'fs';
	$cec_data['debug'] = $curr;
}
print(json_encode($cec_data));

function get_file_extension($file_name) {
  return substr(strrchr($file_name,'.'),1);
}*/

class Data {
	public function __construct($filename, $path, $base) {
		$this->cec_data = array();
		$this->cec_data['type'];
		$this->cec_data['file'];
		$this->cec_data['url'];
		$this->base_url = $base;
		$this->file_path = $this->base_url . $path;
		$this->filename = ltrim($this->file_path,$this->base_url);
		$this->ext = $this->getFileExtension($this->file_path);
		if($this->ext != NULL)
		{
			$this->checkExtensions($this->ext);
		}
	}
	public function getFileExtension($file_name) {
		return substr(strrchr($file_name,'.'),1);
	}
	public function checkExtensions($ext) {
		if($ext === 'gtif' || $ext === 'jpg') {
			$this->cec_data['url'] = $ext;
			//$this->readImageFile();
		} else {
			$this->readTextFile();
		}
	}
	public function readTextFile() {
		$file_path = $this->file_path;
		//$this->cec_data['file'] = file_get_contents($file_path);
	}
	public function readImageFile() {
		$file_path = $this->file_path;
		//header("Content-type: image/tiff");
		$this->cec_data['url'] = exif_read_data($file_path);
	}
}

function directoryReader($dir) {
	$dir_read = scandir($dir);
	foreach($dir_read as $file)
	{
		$files[] = $file;
	}
	return $files;
}

if($_GET['data']) {
	$curr = $_GET['data'];
	define('BASE',"/home/maxent$curr");
	$data_filenames = directoryReader(BASE);
	foreach($data_filenames as $file) {
		$dfs[] = new Data($curr, $file, BASE);
	}
	print(json_encode($dfs));
}
?>
