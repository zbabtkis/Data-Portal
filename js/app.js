(function ($) {
	function App() {
		this.name;
		this.PHP_REFRESH_LOCATION;
		this.IMG_GET_LOCATION;
	}
	cecDataApp = new App();
	
	Drupal.behaviors.biogeog_portal = {
		attach: function() {
			cecDataModel = new DataModel();
			cecDataPage = new Page();
			cecDataController = new PageController();
			cecDataPage.buildPage();
			cecDataController.startListening();
		}
	};
})(jQuery);
