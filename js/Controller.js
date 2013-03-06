var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
	"use strict";

	var PageController = Backbone.Model.extend({
		startListening: function() {
			var controller = this;
			//var url = Drupal.settings['module_path'].replace(/%2F/g,'/');
			var url = Drupal.settings['module_path'];
			$('.cec-button.back').click(function() {
				cecDataModel.dirUp(url);
			});
			$('.cec-data-list-item').click(function() {
				el = cecDataModel.displayPath.join('/') + '/' + $(this).data('filesystem-name');
				cecDataModel.updateData(el, url);
			});
			$('#cec-portal-small-screen').click(function() {
					$('#cec-data').removeClass('overlay');
					$('#cec-portal-small-screen').attr('id','cec-portal-full-screen');
					$('#cec-portal-full-screen').attr('alt','Full Screen');
					$('#cec-portal-full-screen').attr('title','Full Screen');
					controller.startListening();
			});
			$('#cec-portal-full-screen').click(function() {
					$('#cec-data').addClass('overlay');
					$('#cec-portal-full-screen').attr('id','cec-portal-small-screen');
					$('#cec-portal-small-screen').attr('title','Exit Full Screen');
					$('#cec-portal-small-screen').attr('alt','Exit Full Screen');
					controller.startListening();
			});
		},
		refresh: function(data) {
				cecDataModel.setData(data);
				//cecDataModel.setDirs();
				cecDataModel.updatePath(el);
				cecDataPage.buildPage();
				cecDataController.startListening();
				//cecDataPage.fileLoad(data);
		},
		dirUpRender: function(data, curr_path) {
			cecDataModel.setData(data['data']);
			//cecDataModel.setDirs();
			cecDataModel.displayPath = curr_path;
			cecDataPage.buildPage();
			cecDataController.startListening();
		},
	});
	cecPortal.PageController = new PageController()

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
			cecPortal.Model.changeDir(3);
		},
		data: function(dirId) {
			cecPortal.Model.changeDir(dirId);
		},
		file: function(dirId,fileType,fileTitle,fileId) {
			cecPortal.Model.changeDir(dirId);
			cecPortal.Model.on('change:data', function() {
				cecPortal.Model.loadFile(fileId, fileTitle, fileType);
			});
		},
		addListeners: function() {
			var self = this;
			this.listenTo(cecPortal.Model, 'error',function(model, error) {
				self.navigate('data/' + cecPortal.Model.get('pid'), {trigger: true});
			});
		},
	});
	cecPortal.Router = new Router();
}(jQuery));