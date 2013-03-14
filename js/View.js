var cecPortal = window.cecPortal || (window.cecPortal = {});

(function ($) {
  "use strict";

  $(function() {
  
    //cecPortal.View = {};
  
    var View = Backbone.View.extend({
      el: '#cec-data',
      initialize: function() {
        this.dataList = new DataList();
        this.currentPath = new PathDisplay();
        this.dataDisplay = new DataDisplay();
        this.screenToggle = new ScreenToggle();
      },
      buildPage: function() {
        this.dataList.$el.html('');
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
        cecPortal.Router.navigate('data/' + cecPortal.Model.get('ppid') ,{trigger: true});
      },
      events: {
        'click #cec-portal-full-screen':'toggleFullScreen',
        'click #cec-portal-small-screen':'toggleSmallScreen',
        'click .cec-button.back':'directoryUp',
      }
    });
    
    var DataList = Backbone.View.extend({
      el: '#cec-data-list',
      initialize: function() {
        var tpl = $('#cec-data-list-template').html();
        this.templateHelpers();
        this.template = Handlebars.compile(tpl);
        this.listenTo(cecPortal.Model, 'change:data', this.render, this);
      },
      render: function() {
        var data = {};
        data.files = cecPortal.Model.get('data');
        var list = this.template(data);
        this.$el.html(list);
        this.trigger('dataListed');
      },
      templateHelpers: function() {
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
        if(dataset.fileType === 'directory') {
          this.trigger('dirClicked', dataset);
        } else {
          this.trigger('fileClicked', dataset);
        }
      }
    });
    
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
      renderText: function() {
        var data = cecPortal.Model.file.get('text');
        this.$el.html('<pre>' + data + '</pre>');
      },
      renderImage: function() {
        this.$el.html('');
        var data = cecPortal.Model.file;
        var downloadInfo = new InfoBox({"id": "cec-data-download","infoText": "If this image doesn't load, your browser may not be compatible with tiff images.If you are on a mac, try viewing this website in Safari. If you are using a PC, download and install AlternaTiff at http://www.alternatiff.com/.",});
        var imageView = new ImageView({"src": data.get('path')});
        var downloadLink = new LinkView({'link': encodeURI(data.get('path')),'title':data.get('file')});
    
        downloadInfo.$el.append(downloadLink.$el);
        downloadInfo.$el.append(imageView.$el);
        this.$el.append(downloadInfo.$el);
        this.$el.antiscroll();
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
        var title = document.createTextNode(this.options.title);
        this.$el.append(title);
      },
    });
    
    var ScreenToggle = Backbone.View.extend({
      initialize: function() {
        this.$el = $('#cec-portal-full-screen');
      },
    });
    cecPortal.View = new View();
    cecPortal.Model.listen();
  });
}(jQuery));