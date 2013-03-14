/**
 ================================================================================
                           Drupal Data Portal - App
                    Created by Zachary Babtkis Winter 2013
 ================================================================================

Contents
-----------
Drupal.behaviors.biogeog_portal -- attach data portal to Drupal data/portal menu page.
 */

var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
	"use strict";
	
	Drupal.behaviors.biogeog_portal = {
		attach: function() {
			cecPortal.version = '0.1-alpha';
			// Start listening for hashchanges.
			Backbone.history.start();
		}
	};

})(jQuery);
