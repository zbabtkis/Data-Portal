"use strict";

(function ($) {
	var App = Backbone.Router.extend({
		initialize: function() {
			this.view = new View();
			this.model = new DataModel();
			this.addListeners();
		},
		routes: {
			'':'index',
			'data/:dirid':'data',
			'data/:dirid/load/:fileid': 'file',
		},
		index: function() {
			this.model.changeDir(3);
		},
		data: function(dirId) {
			this.model.changeDir(dirId);
		},
		file: function(dirId,fileId) {
			var self = this;
			this.model.changeDir(dirId);
			this.model.on('change', function() {
				self.model.loadFile(fileId);
			});
		},
		addListeners: function() {
			var self = this;
			this.view.dataList.on('dirClicked', function(fileDataset) {
				self.navigate('data/' + fileDataset.fileId, {trigger: true});
			});
			this.view.dataList.on('fileClicked', function(fileDataset) {
				self.navigate('data/' + fileDataset.parentId + '/load/' + fileDataset.fileId, {trigger: true});
			})
			this.model.on('change', function() {
				console.log('new data has been loaded');
				self.view.buildPage(self.model);
				self.view.currentPath.setDataPath(self.model.path);
			});
			this.model.file.on('change', function() {
				self.view.dataDisplay.fileCheck(self.model.file);
			});
			this.view.on('dirUpRequested', function() {
				self.navigate('data/' + self.model.parentId ,{trigger: true});
			})
		},
	});
	Drupal.behaviors.biogeog_portal = {
		attach: function() {
			window.app = new App();
			window.app.version = '0.0.0';
			Backbone.history.start();
		}
	};

})(jQuery);
