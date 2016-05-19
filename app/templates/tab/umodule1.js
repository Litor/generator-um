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
          self.initTab();
        }
      });
      <%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initTab();
      <%}%>
      this.eventMap = {

      };
    },

    initTab: function() {
      var self = this;
      var tabTpl = utils.loadCompiledPage('<%=moduleName %>TabTpl', require);

      bs.getTabInfo().done(function(model) {
        $('.<%=moduleName %>-tab-container').html(tabTpl.render(model), true);
        $('.<%=moduleName %>-tab').jqxTabs({
          position: 'top'
        });

        self.initTabContent(0);
        $('.<%=moduleName %>-tab').on('tabclick', function(event) {
          var tabIndex = event.args.item;
          self.initTabContent(tabIndex);
        });
      });
    },

    initTabContent: function(tabIndex) {
      var $element = $('.<%=moduleName %>-tab-content-' + tabIndex);
      switch (tabIndex) {
        case 0:
          break;
      }
    }
  };

  return viewConfig;
});
