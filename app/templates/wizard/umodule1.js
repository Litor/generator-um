define(function(require) {

  var utils = require('utils');
  var bs = require('./<%=moduleName %>BS');

  /********子页面********/
  //var sub1 = require('./sub1/sub1');

  var viewConfig = {
    /********页面内事件通过eventMap统一管理********/
    eventMap: function() {
      return {
        //'[data-action="编辑"]': this.actionEdit
      };
    },

    /********页面入口方法********/
    initialize: function() {
      /********注册子页面********/
      //this.pushSubView([sub1]);
      var self = this;
      var indexView = utils.loadCompiledPage('<%=moduleName %>IndexPage', require);
<%if(isPaperDialog){ %>
      $.bhPaperPileDialog.show({
        content: indexView.render(),
        render: function() {
          self.initWizard();
        }
      });
<%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initWizard();
<%}%>
    },

    initWizard: function() {
      var self = this;

      bs.getWizardInfo().done(function(model) {
        $('.<%=moduleName %>-index-wizard').bhWizard({
          items: model.wizard,
          active2: '0',
          change: function(item) {
            var $element = $('.<%=moduleName %>-index-content');

            switch (item.stepId) {
              case '0':
                //sub1.$rootElement = $element;
                //sub1.initialize();
                break;

              default:;
            }
          }
        });
      });

    }
  };

  return viewConfig;
});
