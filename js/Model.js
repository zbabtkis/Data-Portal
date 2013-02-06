var DataModel = Backbone.Model.extend({
		initialize: function() {
			this.data = Drupal.settings['cec-data'];
			this.parent = '/home/maxent'
			this.displayPath = [''];
			this.dirs = [];
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
});
