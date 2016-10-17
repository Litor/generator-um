define(function(require) {

  var utils = require('utils');
  var bs = require('./<%=moduleName %>BS');

  var viewConfig = {
    /********页面内事件通过eventMap统一管理********/
    eventMap: function() {
      return {
        //'[data-action="编辑"]': this.actionEdit
      };
    },

    /********页面入口方法********/
    initialize: function() {
      this.initPropertyDialog();
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
