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
      var self = this;
      var indexView = utils.loadCompiledPage('<%=moduleName %>IndexPage', require);
<%if(isPaperDialog){ %>
      $.bhPaperPileDialog.show({
        content: indexView.render(),
        render: function($header, $section, $footer, $aside) {
          self.initForm();
          self.resetFormOutline($section);
        }
      });
<%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initForm();
      this.resetFormOutline();
<%}%>
    },

    initForm: function() {
      var datamodel = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'FORM_GROUP', 'form');
      $('.<%=moduleName %>-form').emapForm({
        root: '',
        data: datamodel,
        readonly: false,
        model: 'h'
      });
    },

    resetFormOutline: function($section) {
      var $insertContainer = $section.find('.<%=moduleName %>-form-container');

      $.bhFormOutline.hide({
        destroy: true
      });

      $.bhFormOutline.show({
        insertContainer: $insertContainer,
        offset: {
          right: 16,
          top: 30
        }
      });

      $.bhAffix({
        hostContainer: $insertContainer,
        fixedContainer: $section.find(".bh-form-outline")
      });
    }
  };

  return viewConfig;
});
