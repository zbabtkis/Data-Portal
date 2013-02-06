"use strict";

var DataModel = Backbone.Model.extend({
		initialize: function() {
			this.displayPath = [''];
			this.dirs = [];
			this.file = new File();
		},
		updatePath: function(path) {
			var curr_dir = path.substr(path.lastIndexOf('/') + 1);
			this.displayPath.push(curr_dir);
		},
		setData: function(data) {
			this.data = data;
		},
		updateData: function(el, url) {
			jQuery.ajax({
				'url' : url,
				'data' : {data: el},
				'dataType' : 'json',
				'success' : function(data) {
					cecDataController.refresh(data);
				},
			});
		},
		dirUp: function(url) {
			var curr_path = this.displayPath;
			curr_path.pop();
			jQuery.ajax({
				'url' : url,
				'data' : {data:curr_path.join('/')},
				'dataType' : 'json',
				'success' : function(data) {
					cecDataController.dirUpRender(data, curr_path);
				},
			});
		},
		setDirs: function() {
			this.dirs = [];
			for(object in this.data) {
				var data_cp = this.data;
				dir = data_cp[object]['title'];
			}
		},
		changeDir: function(id) {
			var url = Drupal.settings.path + 'inc/changeDir.php';
			var self = this;
			jQuery.ajax({
				'url' : url,
				'data' : {dir_id: id},
				'dataType': 'json',
				'success' : function(data) {
					self.set({'data': data});
				},
				fail: function(e) {
					console.log(e);
				}
			});
		},
		loadFile: function(id) {
			var currentFile = this.attributes.data[id];
			this.file.set({'file': currentFile.title, 'type': currentFile.type, 'path': Drupal.settings.path + 'inc/imageGet.php?id=' + currentFile.id});
		},
});

var File = Backbone.Model.extend({
});
