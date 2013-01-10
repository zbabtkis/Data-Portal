function Page() {
}
Page.prototype.buildPage = function() {
	cecDataModel.setDirs();
	jQuery('#cec-data-list').html('');
	jQuery('#data-path').html(cecDataModel.displayPath.join('/'));
	for(object in cecDataModel.data) {
		var row;
		if(object%2 == 0) {
			row = 'row-even';
		} else {
			row = 'row-odd';
		}
		jQuery('#cec-data-list').append('<li data-filesystem-name="' + cecDataModel.data[object]['file_loc'] + '" class="cec-data-list-item ' + row + '">' + cecDataModel.dirs[object] + '</li>');
	}
}

Page.prototype.fileLoad = function(data) {
	if(data['type'] == 'file') {
		jQuery('#cec-data-data').html('<pre>' + data['file'] + '</pre>');
	}else {
		jQuery('#cec-data-data').html("<div id='cec-data-download'><a href='" + data['url'] + "'>Download</a></div><span>If this image doesn't load, your browser may not be compatible with tiff images. If you are on a mac, try viewing this website in Safari. If you are using a PC, download and install AlternaTiff at http://www.alternatiff.com/.</span><br /><img src='" + data["url"] + "' />");
	}
}
