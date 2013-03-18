<?php
/**
 * @file
 * Class definitions for parsing and importing filesystem into data portal db.
 */

/** Defines Filesystem class */
class FS {
	// Start counting at 1.
	public $id = 1;
	public $path = "";
	public function add_path($path) {
		$path = $this->path_to_str($path);
		// Check if path already exists in database
		if($this->fetch_path($path) == null) {
			// Instantiates new path
			$this->path = new Path($path, $this->id);
			$this->id++;
			// Insert the new path into the database.
			$this->db_insert();
		}
	}
	public function get_parent($path) {
		$path = $this->path_to_arr($path);
		// Gets the directory up path.
		array_pop($path);
		$path = $this->path_to_str($path);
		// Fetches the partent directory information from db.
		$parent = $this->fetch_path($path);
		return $parent;
	}
	public function get_pid($path) {
		$parent = $this->get_parent($path->path);
		// The default parent id should be 0 for top level directories.
		$pid = $parent ? $parent['id'] : 0;
		return $pid;
	}
	public function get_ppid($path) {
		$parent = $this->get_parent($path->path);
		// The default parent's parent id should be 0 for top level dirs.		
		$ppid = $parent ? $parent['pid'] : 0;
		return $ppid;
	}
	public function db_insert() {
		$path = $this->path;
		// Insert path information into database.
		db_insert('data_portal_data')
			->fields(array(
				'title' => $path->title,
				'pid' => $this->get_pid($path),
				'ppid' => $this->get_ppid($path),
				'id' => $path->id,
				'path' => $path->path,
				'ext' => $path->ext))
			->execute();
	}
	public function fetch_path($path) {
		// Find paths that are already in database.
		$result = db_select('data_portal_data', 'b')
			->fields('b')
			->condition('path',$path,'=')
			->execute()->fetchAssoc();
		return($result);
	}
	public function path_to_str($path) {
		if(gettype($path) == 'array') {
			$path = implode('/', $path);
		}
		return $path;
	}
	public function path_to_arr($path) {
		if(gettype($path) == 'string') {
			$path = explode('/', $path);
		}
		return $path;
	}
}
/** Defines file / directory path class */
class Path {
	public function __construct($path, $id) {
		$this->id = $id;
		$this->path = $path;
		$this->title = $this->get_title();
		$this->ext = $this->get_extension();
	}
	public function get_title() {
		// Convert path to array using FS class method.
		$path = FS::path_to_arr($this->path);
		// Gets filename or directory title.
		$title = array_pop($path);
		return $title;
	}
	public function get_extension($path) {
		return substr(strrchr($this->title,'.'),1);
	}
	private function get_parent($path) {
		$arr = explode('/', $path);
		array_pop($arr);
		return implode('/',$arr);
	}
}
?>