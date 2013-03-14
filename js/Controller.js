/**
 ================================================================================
                   Drupal Data Portal - Controller (Router)
                    Created by Zachary Babtkis Winter 2013
 ================================================================================

Contents
-----------
..1) Router -- Yeah, okay it's not really a "Controller," but it helps navigate!
 */

var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
	"use strict";

	var Router = Backbone.Router.extend({
		initialize: function() {
			this.addListeners();
		},
		routes: {
			'':'index', // Load default view.
			'data/:dirid':'data', // Deal with directory listing.
			'data/:dirid/load/:filetype/:filetitle/:fileid': 'file', // Deal with files.
		},
		index: function() {
			// Load up root path.
			cecPortal.Model.set('id', 0);
		},
		data: function(dirId) {
			// Load up path from dirId.
			cecPortal.Model.set('id', dirId);
		},
		file: function(dirId,fileType,fileTitle,fileId) {
			// Deal with loading and rendering files.
			cecPortal.Model.set({id:dirId});
			cecPortal.Model.loadFile(fileId, fileTitle, fileType);
		},
		addListeners: function() {
			var self = this;
			// @TODO this should be moved somewhere else.
			// Handle file fetching errors in model
			this.listenTo(cecPortal.Model, 'error',function(model, error) {
				console.log(error);
				self.navigate(
					'data/' + cecPortal.Model.get('pid'), {
						trigger: true
					}
				);
			});
		},
	});

	// Instantiate Router on App.
	cecPortal.Router = new Router();
}(jQuery));