function PageController() {
}
PageController.prototype.startListening = function() {
	var controller = this;
	//var url = Drupal.settings['module_path'].replace(/%2F/g,'/');
	var url = Drupal.settings['module_path'];
	jQuery('.cec-button.back').click(function() {
		cecDataModel.dirUp(url);
	});
	jQuery('.cec-data-list-item').click(function() {
		el = jQuery(this).data('filesystem-name');
		cecDataModel.updateData(el, url);
	});
	jQuery('#cec-portal-small-screen').click(function() {
			jQuery('#cec-data').removeClass('overlay');
			jQuery('#cec-portal-small-screen').attr('id','cec-portal-full-screen');
			jQuery('#cec-portal-full-screen').attr('alt','Full Screen');
			jQuery('#cec-portal-full-screen').attr('title','Full Screen');
			controller.startListening();
	});
	jQuery('#cec-portal-full-screen').click(function() {
			jQuery('#cec-data').addClass('overlay');
			jQuery('#cec-portal-full-screen').attr('id','cec-portal-small-screen');
			jQuery('#cec-portal-small-screen').attr('title','Exit Full Screen');
			jQuery('#cec-portal-small-screen').attr('alt','Exit Full Screen');
			controller.startListening();
	});
}
PageController.prototype.refresh = function(data) {
	if(data['type'] === 'fs') {
		cecDataModel.setData(data['data']);
		//cecDataModel.setDirs();
		cecDataModel.updatePath(el);
		cecDataPage.buildPage();
		cecDataController.startListening();
	} else {
		cecDataPage.fileLoad(data);
	}
}
PageController.prototype.dirUpRender = function(data, curr_path) {
	cecDataModel.setData(data['data']);
	//cecDataModel.setDirs();
	cecDataModel.displayPath = curr_path;
	cecDataPage.buildPage();
	cecDataController.startListening();
}
