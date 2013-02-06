"use strict";

var View = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#cec-data');
		this.dataList = new DataList();
		this.currentPath = new PathDisplay();
		this.dataDisplay = new DataDisplay();
		this.screenToggle = new ScreenToggle();
	},
	buildPage: function(model) {
		//cecDataModel.setDirs();
		this.dataList.$el.html('');
		//this.currentPath.$el.html(cecDataModel.displayPath.join('/'));
		var data = model.attributes.data;
		this.dataList.loadFiles(data);
	},
	toggleSmallScreen: function() {
		console.log('clicked');
		var self = this;
		this.screenToggle.$el.click(function() {
				self.$el.removeClass('overlay');
				jQuery('#cec-portal-small-screen').attr('id','cec-portal-full-screen');
				jQuery('#cec-portal-full-screen').attr('alt','Full Screen');
				jQuery('#cec-portal-full-screen').attr('title','Full Screen');
		});
	},
	toggleFullScreen: function() {
		var self = this;
		this.screenToggle.$el.click(function() {
				self.$el.addClass('overlay');
				jQuery('#cec-portal-full-screen').attr('id','cec-portal-small-screen');
				jQuery('#cec-portal-small-screen').attr('title','Exit Full Screen');
				jQuery('#cec-portal-small-screen').attr('alt','Exit Full Screen');
		});
	},
	events: {
		'click #cec-portal-full-screen':'toggleFullScreen',
		'click #cec-portal-small-screen':'toggleSmallScreen',
	}
});

var DataList = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#cec-data-list');
	},
	loadFiles: function(data) {
		for( var object in data ) {
			var row;
			if( object % 2 == 0 ) {
				row = 'row-even';
			} else {
				row = 'row-odd';
			}
			this.$el.append(new DataListItem({'type': data[object].type, 'row':row, 'fileId': data[object].id, 'pid': data[object].pid, 'title': data[object].title}).$el);
		}
		this.trigger('dataListed');
	},
	events: {
		'click .cec-data-list-item':'goToData',
	},
	goToData: function(element) {
		var dataset = element.currentTarget.dataset;
		if(dataset.fileType === 'directory') {
			this.trigger('dirClicked', dataset);
		} else {
			this.trigger('fileClicked', dataset);
		}
	}
});

var DataListItem = Backbone.View.extend({
	tagName: 'li',
	className: 'cec-data-list-item ',
	attributes: function() {
		return {
			'data-parent-id':this.options.pid,
			'data-file-id':this.options.fileId,
			'data-file-type':this.options.type,
		};
	},
	initialize: function() {
		this.$el.html(this.options.title)
		this.$el.addClass(this.options.row);
	},
});

var PathDisplay = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#data-path');
	},
	setDataPath: function() {

	}
});

var DataDisplay = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#cec-data-data');
	},
	fileCheck: function(data) {
		this.data = data;
		var type = this.data.get('type');
		if(type == 'text') {
			this.renderText();
		}else if(type == 'file') {
			this.renderImage();
		}
	},
	renderText: function(data) {
		this.$el.html('<pre>' + data['file'] + '</pre>');
	},
	renderImage: function(data) {
		this.$el.html('');
		var downloadInfo = new InfoBox({"id": "cec-data-download","infoText": "If this image doesn't load, your browser may not be compatible with tiff images.If you are on a mac, try viewing this website in Safari. If you are using a PC, download and install AlternaTiff at http://www.alternatiff.com/.",});
		var imageView = new ImageView({"src": this.data.attributes.path,});
		var downloadLink = new LinkView({'link': encodeURI(this.data.attributes.path),'title': this.data.attributes.file,});

		downloadInfo.$el.append(downloadLink.$el)
		downloadInfo.$el.append(imageView.$el)
		this.$el.append(downloadInfo.$el);
	}
});

var InfoBox = Backbone.View.extend({
	tagName: 'div',
	initialize: function() {
		var infoText = document.createTextNode(this.options.infoText);
		this.$el.append(infoText);
	},
});

var ImageView = Backbone.View.extend({
	tagName: 'img',
	attributes: function() {
		return {
			'src': this.options.src,
		};
	},
});

var LinkView = Backbone.View.extend({
	tagName: 'a',
	attributes: function() {
		return {
			'href': this.options.link
		};
	},
	initialize: function() {
		console.log(this);
		var title = document.createTextNode(this.options.title);
		this.$el.append(title);
	},
});

var ScreenToggle = Backbone.View.extend({
	initialize: function() {
		this.$el = jQuery('#cec-portal-full-screen');
	},
});