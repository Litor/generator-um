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

        }
      });
      <%}%>
      <%if(!isPaperDialog){%>
      this.$rootElement.html(indexView.render({}), true);
      <%}%>
      this.eventMap = {

      };
    }
  };

  return viewConfig;
});
