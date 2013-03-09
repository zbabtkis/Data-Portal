var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
	"use strict";

	var Router = Backbone.Router.extend({
		initialize: function() {
			this.addListeners();
		},
		routes: {
			'':'index',
			'data/:dirid':'data',
			'data/:dirid/load/:filetype/:filetitle/:fileid': 'file',
		},
		index: function() {
			cecPortal.Model.set('id', 0);
		},
		data: function(dirId) {
			cecPortal.Model.set('id', dirId);
		},
		file: function(dirId,fileType,fileTitle,fileId) {
			cecPortal.Model.set({id:dirId});
			cecPortal.Model.loadFile(fileId, fileTitle, fileType);
		},
		addListeners: function() {
			var self = this;
			this.listenTo(cecPortal.Model, 'error',function(model, error) {
				console.log(error);
				self.navigate('data/' + cecPortal.Model.get('pid'), {trigger: true});
			});
		},
	});
	cecPortal.Router = new Router();
}(jQuery));