/**
 ================================================================================
                           Drupal Data Portal - Model
                    Created by Zachary Babtkis Winter 2013
 ================================================================================

Contents
-----------
..1) File -- Loads file when non-directory is clicked in view.
..2) DataModel -- Primary model for loading, validating and dealing with files/folders.
 */

var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
	"use strict";
/** 1) File - Loads file when non-directory is clicked in view. */
	var File = Backbone.Model.extend({
		// Load as plain text.
		load: function(id) {
			var that = this;
			var url = '/' + Drupal.settings.menu + '/get-data/' + that.get('id') + '/ajax';
			$.ajax({
				'url': url,
				'dataType': 'html',
				'success': function (data) {
					that.set('text', data);
				}
			});
		},
	});
/** 2) DataModel - Directory listing model. */
	var DataModel = Backbone.Model.extend({
			// Add listeners for directory changes and initialize model attributes vals.
			initialize: function() {
				this.displayPath = [''];
				this.file = new File();
				this.on('change:id', this.changeDir);
				_.bindAll(this);
			},
			changeDir: function() {
				// URL of menu to pull json from.
				var url = '/'  + Drupal.settings.menu + '/update/' + this.get('id');
				$.ajax({
					url: url,
					dataType: 'json',
					async: true,
					success: this.loadData
				});
			},
			loadData: function(data) {
				if(data.items) {
					// Sets folder attributes and files contained in folder (data).
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
				// Don't validate when setting file Id.
				if(attrs['id'] == undefined) {
					// Fail if selected folder is empty.
					if(attrs.data == undefined) {
						errors.data = "The requested directory is empty";
					}
				}
	
				return _.isEmpty(errors) ? null : errors;
			},
			loadFile: function(id, title, type) {
				this.file.set({'file': title, 'type': type, 'id': id});
				// Define filetype handlers.
				this.file.load();
			},
			listen: function() {
				// Directory click handler.
				this.listenTo(cecPortal.View.dataList, 'dirClicked', function(fileDataset) {
					this.set('lastClicked', fileDataset); // We aren't using lastClicked for anything right now, but it could be useful.
					cecPortal.Router.navigate(
						'data/' + fileDataset.fileId, {
							trigger: true
						}
					);
				}.bind(this));
				// File click handler.
				this.listenTo(cecPortal.View.dataList, 'fileClicked', function(fileDataset) {
					cecPortal.Router.navigate(
						'data/' + fileDataset.parentId + '/load/' + fileDataset.fileType + '/' + fileDataset.fileTitle + '/' + fileDataset.fileId, {
							trigger: true
						}
					);
				});
			}
	});
	// Instantiate model on app.
	cecPortal.Model = new DataModel();
}(jQuery));