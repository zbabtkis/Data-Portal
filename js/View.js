var Page = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#cec-data');
		this.dataList = new DataList();
		this.currentPath = new PathDisplay();
	},
	buildPage: function() {
		cecDataModel.setDirs();
		this.dataList.$el.html('');
		this.currentPath.$el.html(cecDataModel.displayPath.join('/'));
		this.dataList.loadFiles();
	}
});

var DataList = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#cec-data-list');
	},
	loadFiles: function() {
		for( object in cecDataModel.data ) {
			var row;
			if( object % 2 == 0 ) {
				row = 'row-even';
			} else {
				row = 'row-odd';
			}
			this.$el.append(new DataListItem({'row':row, 'pid': cecDataModel.data[object].pid, 'title':cecDataModel.data[object].title}).$el);
		}
	}
})

var DataListItem = Backbone.View.extend({
	tagName: 'li',
	className: 'cec-data-list-item ',
	attributes: function() {
		return {
			'data-parent-id':this.options.pid,
		};
	},
	initialize: function() {
		this.$el.html(this.options.title)
		this.$el.addClass(this.options.row);
	}
})

var PathDisplay = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#data-path');
	},
	setDataPath: function() {

	}
})

var DataDisplay = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#cec-data-data');
	},
	fileLoad: function(data) {
		if(data['type'] == 'file') {
			this.$el.html('<pre>' + data['file'] + '</pre>');
		}else {
			this.$el.html("<div id='cec-data-download'><a href='" + data['url'] + "'>Download</a></div><span>If this image doesn't load, your browser may not be compatible with tiff images. If you are on a mac, try viewing this website in Safari. If you are using a PC, download and install AlternaTiff at http://www.alternatiff.com/.</span><br /><img src='" + data["url"] + "' />");
		}
	}
})

var Link = Backbone.View.extend({
	tagName: 'a',
	attributes: function() {
		return {
			'href': this.attributes.link
		};
	},
	initialize: function() {
		this.html(this.attributes.title);
	},
})