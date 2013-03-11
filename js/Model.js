var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
	"use strict";

	var File = Backbone.Model.extend({
		loadText: function(id) {
			var that = this;
			var url = '/' + Drupal.settings.menu + '/get-text/' + that.get('id');
			console.log(url);
			$.ajax({
				'url': url,
				'dataType': 'text',
				'success': function (data) {
					that.set('text', data);
				}
			});
		},
		loadImage: function() {
			this.set({'path': '/' + Drupal.settings.menu + '/get-image/' + this.get('id')});
		}
	});
	var DataModel = Backbone.Model.extend({
			initialize: function() {
				this.displayPath = [''];
				this.file = new File();
				this.on('change:id', this.changeDir);
				_.bindAll(this);
			},
			changeDir: function() {
				var url = 'http://snow-dev.eri.ucsb.edu/' + Drupal.settings.menu + '/update/' + this.get('id');
				$.ajax({
					url: url,
					dataType: 'json',
					async: true,
					data: {test: 'none'},
					success: this.loadData
				});
			},
			loadData: function(data) {
				if(data.items) {
					this.set({
						'path': data.path,
						'data': data.items,
						'ppid': data.ppid,
						'pid': data.pid,
						'validate': true});
				} else {
					console.log('nothing');
				}
			},
			validate: function(attrs, opts) {
				var errors = {};
				if(attrs['id'] == undefined) {
					if(attrs.data == undefined) {
						errors.data = "The requested directory is empty";
					}
				}
	
				return _.isEmpty(errors) ? null : errors;
			},
			loadFile: function(id, title, type) {
				this.file.set({'file': title, 'type': type, 'id': id});
				switch(type) {
					case 'gtif':
						this.file.loadImage();
						break;
					case 'tif':
						this.file.loagImage();
						break;
					case 'jpeg':
						this.file.loadImage();
						break;
					case 'aux':
						this.file.loadText();
						break;
					case 'rar':
						this.file.loadAttachment();
					default:
						this.file.loadText();
				}
			},
			listen: function() {
				this.listenTo(cecPortal.View.dataList, 'dirClicked', function(fileDataset) {
					this.set('lastClicked', fileDataset)
					cecPortal.Router.navigate('data/' + fileDataset.fileId, {trigger: true});
				}.bind(this));
				this.listenTo(cecPortal.View.dataList, 'fileClicked', function(fileDataset) {
					cecPortal.Router.navigate('data/' + fileDataset.parentId + '/load/' + fileDataset.fileType + '/' + fileDataset.fileTitle + '/' + fileDataset.fileId, {trigger: true});
				});
			}
	});
	cecPortal.Model = new DataModel();
}(jQuery));