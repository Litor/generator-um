define(function(require) {

  var utils = require('utils');
  var bs = require('./<%=moduleName %>BS');

  var viewConfig = {
    initialize: function() {
      var self = this;

      this.initPropertyDialog();

      this.eventMap = {

      };
    },

    initPropertyDialog: function() {
      var datamodel = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'FORM_GROUP', 'form');

      $.bhPropertyDialog.show({
        title: '标题',
        content: '<div class="<%=moduleName %>-form"></div>',
        footer: 'default',
        ok: function() {

        }
      });

      $.bhPropertyDialog.footerShow();

      $('.<%=moduleName %>-form').emapForm({
        root: '',
        data: datamodel,
        readonly: false,
        model: 'v'
      });
    }
  };

  return viewConfig;
});
