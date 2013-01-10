function DataModel() {
	this.data = Drupal.settings['cec-data'];
	this.parent = '/home/maxent'
	this.displayPath = ['/'];
	this.dirs = [];
}
DataModel.prototype.updatePath = function(path) {
	if(path == '../') {
		this.displayPath.pop();
	} else {
		var curr_dir = path.substr(path.lastIndexOf('/') + 1);
		this.displayPath.push(curr_dir);
	}
}
DataModel.prototype.setData = function(data) {
	this.data = data;
}
DataModel.prototype.updateData = function(el, url) {
	jQuery.ajax({
		'url' : url,
		'data' : {data: el},
		'dataType' : 'json',
		'success' : function(data) {
			cecDataController.refresh(data);
		},
	});
}
DataModel.prototype.dirUp = function(url) {
	var curr_path = cecDataModel.displayPath;
	curr_path.pop();
	jQuery.ajax({
		'url' : url,
		'data' : {data:curr_path.join('/')},
		'dataType' : 'json',
		'success' : function(data) {
			cecDataController.dirUpRender(data, curr_path);
		},
	});
}
DataModel.prototype.setDirs = function() {
	this.dirs = [];
	for(object in this.data) {
		var data_cp = this.data;
		dir = data_cp[object]['file_loc'].split('/');
		if(jQuery.isArray(dir) && dir.length != 1) {
			this.dirs.push(dir[dir.length -1 ]);
		} else {
			this.dirs.push(dir);
		}
		if(this.dirs[0] == null) {
			dirs = this.data;
		}
	}
}
