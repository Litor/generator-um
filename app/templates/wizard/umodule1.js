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
          self.initWizard();
        }
      });
      <%}%>
      <%if(!isPaperDialog){%>
      this.$rootElement.html(indexView.render({}), true);
      this.initWizard();
      <%}%>
      this.eventMap = {

      };
    },

    initWizard: function() {
      var self = this;

      bs.getWizardInfo().done(function(model) {
        $('.<%=moduleName %>-index-wizard').bhWizard({
          items: model.wizard,
          active: '0',
          change: function(item) {
            var $element = $('.<%=moduleName %>-index-content');

            switch (item.stepId) {
              case '0':

                break;
            }
          }
        });
      })

    }
  };

  return viewConfig;
});
