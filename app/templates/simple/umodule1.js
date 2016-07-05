define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./<%=moduleName %>BS');

  /********子页面********/
  //var sub1 = require('./sub1/sub1');

  var viewConfig = {
    initialize: function() {
      /********注册子页面********/
      //this.pushSubView([sub1, sub2]);
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

      /********页面内事件通过eventMap统一管理********/
      this.eventMap = {
        //'[data-action="添加"]': this.actionAdd
      };
    }
  };

  return viewConfig;
});
