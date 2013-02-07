"use strict";

var DataModel = Backbone.Model.extend({
		initialize: function() {
			this.displayPath = [''];
			this.file = new File();
		},
		changeDir: function(id) {
			var url = '/' + Drupal.settings.menu + '/update/' + id;
			var self = this;
			jQuery.ajax({
				'url' : url,
				'dataType': 'json',
				'success' : function(data) {
					self.path = data.path;
					self.set({'data': data.items});
					self.parentId = data.pid;
				},
				fail: function(e) {
					console.log(e);
				}
			});
		},
		loadFile: function(id) {
			var currentFile = this.attributes.data[id];
			this.file.set({'file': currentFile.title, 'type': currentFile.type, 'path': Drupal.settings.menu + '/image-get/' + currentFile.id});
		},
});

var File = Backbone.Model.extend({
});