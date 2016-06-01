define(function(require, exports, module) {

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
      <%}%>
      <%if(!isPaperDialog){%>
      this.$rootElement.html(indexView.render({}), true);
      this.initForm();
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
    }
  };

  return viewConfig;
});