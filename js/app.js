var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
	"use strict";
	
	Drupal.behaviors.biogeog_portal = {
		attach: function() {
			cecPortal.version = '0.0.0';
			Backbone.history.start();
		}
	};

})(jQuery);
