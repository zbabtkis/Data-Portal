/**
 ================================================================================
                           Drupal Data Portal - View
                    Created by Zachary Babtkis Winter 2013
 ================================================================================

Contents
-----------
..1) View -- Main app View.
..2) DataList -- Displays directory listing.
..3) PathDisplay -- Displays current path in filesystem.
..4) InfoBox - Displays information about the data in DataView.
..5) ImageView -- Formatted display for images in DataView.
..6) LinkView -- Formatted display for links in DataView.
..7) ScreenToggle -- switch between full and small screen.
 */

var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
  "use strict";

  $(function() {
  
/** 1. View */
    var View = Backbone.View.extend({
      el: '#cec-data',
      initialize: function() {
        // Instantiates nested views.
        this.dataList = new DataList();
        this.currentPath = new PathDisplay();
        this.dataDisplay = new DataDisplay();
        this.screenToggle = new ScreenToggle();
      },
      buildPage: function() {
        this.dataList.$el.html('');
        // Get files for current dir from model.
        this.dataList.loadFiles();
      },
      toggleSmallScreen: function() {
        var self = this;
        this.screenToggle.$el.click(function() {
          self.$el.removeClass('data-portal-overlay');
          $('#cec-portal-small-screen').attr('id','cec-portal-full-screen');
          $('#cec-portal-full-screen').attr('alt','Full Screen');
          $('#cec-portal-full-screen').attr('title','Full Screen');
        });
      },
      toggleFullScreen: function() {
        var self = this;
        this.screenToggle.$el.click(function() {
          self.$el.addClass('data-portal-overlay');
          $('#cec-portal-full-screen').attr('id','cec-portal-small-screen');
          $('#cec-portal-small-screen').attr('title','Exit Full Screen');
          $('#cec-portal-small-screen').attr('alt','Exit Full Screen');
        });
      },
      directoryUp: function() {
        // Navigate to directory listing of parent's parent id.
        cecPortal.Router.navigate(
          'data/' + cecPortal.Model.get('ppid') , {
            trigger: true // Triggers router callback.
          }
        );
      },
      events: { // Handle nav button clicks.
        'click #cec-portal-full-screen':'toggleFullScreen',
        'click #cec-portal-small-screen':'toggleSmallScreen',
        'click .cec-button.back':'directoryUp',
      }
    });
/** 2. DataList */    
    var DataList = Backbone.View.extend({
      el: '#cec-data-list',
      initialize: function() {
        // Get Handlebars script element.
        var tpl = $('#cec-data-list-template').html();
        // Add helpers for Handlebars rendering.
        this.templateHelpers();
        this.template = Handlebars.compile(tpl);
        //When data listing changes, re-render.
        this.listenTo(cecPortal.Model, 'change:data', this.render, this);
      },
      render: function() {
        var data = {};
        data.files = cecPortal.Model.get('data');
        // Insert new data list into template.
        var list = this.template(data);
        // Insert templated content into data wrapper.
        this.$el.html(list);
        this.trigger('dataListed');
      },
      templateHelpers: function() {
        // Adds helper for creating striped lists.
        Handlebars.registerHelper("zebra", function(items, options) {
          var out = '';
          for (var i = 0, j = items.length; i < j; i++) {
            var item = items[i];
            // we'll just put the appropriate stripe class name onto the item for now
            item.stripeClass = (i % 2 == 0 ? 'row-even' : 'row-odd');
            out += options.fn(item);
          }
          return out;
        });
      },
      events: {
        'click .cec-data-list-item':'goToData',
      },
      goToData: function(e) {
        var dataset = e.target.dataset
        // Check filetype from data attributes.
        if(dataset.fileType === 'directory') {
          this.trigger('dirClicked', dataset);
        } else {
          this.trigger('fileClicked', dataset);
        }
      }
    });
/** 3. PathDisplay */
    var PathDisplay = Backbone.View.extend({
      initialize: function() {
        this.$el = $('#data-path');
      },
      setDataPath: function(path) {
        this.$el.html(path.join('/'));
      }
    });
    
    var DataDisplay = Backbone.View.extend({
      el: '#cec-data-data',
      initialize: function() {
        _.bindAll(this, 'renderText', 'renderImage');
        this.listenTo(cecPortal.Model.file, 'change:path', this.renderImage);
        this.listenTo(cecPortal.Model.file, 'change:text', this.renderText);
      },
      renderText: function() { // Render returned file as text.
        var data = cecPortal.Model.file.get('text');
        this.$el.html('<pre>' + data + '</pre>');
      },
      renderImage: function() { // Rendered returned data as image.
        this.$el.html('');
        var data = cecPortal.Model.file;
        // Information about loading tiffs on windows and mac.
        var downloadInfo = new InfoBox({"id": "cec-data-download","infoText": "If this image doesn't load, your browser may not be compatible with tiff images.If you are on a mac, try viewing this website in Safari. If you are using a PC, download and install AlternaTiff at http://www.alternatiff.com/.",});
        // Render image.
        var imageView = new ImageView({"src": data.get('path')});
        var downloadLink = new LinkView({'link': encodeURI(data.get('path')),'title':data.get('file')});
    
        downloadInfo.$el.append(downloadLink.$el);
        downloadInfo.$el.append(imageView.$el);
        this.$el.append(downloadInfo.$el);
        this.$el.antiscroll();
      }
    });
/** 4. InfoBox -- render information about the data. */
    var InfoBox = Backbone.View.extend({
      tagName: 'div',
      initialize: function() {
        var infoText = document.createTextNode(this.options.infoText);
        this.$el.append(infoText);
      },
    });
/** 5. ImageView -- image rendering from returned data done here!  */
    var ImageView = Backbone.View.extend({
      tagName: 'img',
      attributes: function() {
        return {
          'src': this.options.src,
        };
      },
    });
/** 6. LinkView -- render link to data. */
    var LinkView = Backbone.View.extend({
      tagName: 'a',
      attributes: function() {
        return {
          'href': this.options.link
        };
      },
      initialize: function() {
        var title = document.createTextNode(this.options.title);
        this.$el.append(title);
      },
    });
/** 7. ScreenToggle */
    var ScreenToggle = Backbone.View.extend({
      initialize: function() {
        this.$el = $('#cec-portal-full-screen');
      },
    });

    // Add view to App.
    cecPortal.View = new View();
    // Tell model to begin listening to view.
    cecPortal.Model.listen();
  });
}(jQuery));