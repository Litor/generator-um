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
          self.initTab();
        }
      });
<%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initTab();
<%}%>
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
          //sub1.$rootElement = $element;
          //sub1.initialize();
          break;

        default:;
      }
    }
  };

  return viewConfig;
});
