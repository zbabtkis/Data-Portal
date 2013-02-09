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
					self.set({
						'path': data.path,
						'data': data.items,
						'ppid': data.ppid,
						'pid': data.pid,
						'validate': true});
				},
				fail: function(e) {
					console.log(e);
				}
			});
		},
		validate: function(attrs, opts) {
			var errors = {};

			if(attrs.data == undefined) {
				errors.data = "The requested directory is empty";
			}

			return _.isEmpty(errors) ? null : errors;
		},
		loadFile: function(id, title, type) {
			this.file.set({'file': title, 'type': type, 'path': '/' + Drupal.settings.menu + '/get-image/' + id});
		},
});

var File = Backbone.Model.extend({
});