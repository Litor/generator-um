define(function(require) {

  var utils = require('utils');
  var bs = require('./<%=moduleName %>BS');

  var viewConfig = {
    initialize: function() {
      var self = this;
      var indexView = utils.loadCompiledPage('<%=moduleName %>IndexPage', require);
<%if(isPaperDialog){ %>
      $.bhPaperPileDialog.show({
        content: indexView.render(),
        render: function() {
          self.initForm();
        }
      });
<%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initForm();
      this.resetFormOutline();
<%}%>
      this.eventMap = {

      };
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

    resetFormOutline: function() {
      var $insertContainer = this.$rootElement.find('.<%=moduleName %>-form-container');

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
        fixedContainer: this.$rootElement.find(".bh-form-outline")
      });
    }
  };

  return viewConfig;
});
