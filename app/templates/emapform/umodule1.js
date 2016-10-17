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
        render: function() {
          self.initForm();
        }
      });
<%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initForm();
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
    }
  };

  return viewConfig;
});
