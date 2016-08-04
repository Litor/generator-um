define(function(require) {

  var utils = require('utils');
  var bs = require('./<%=moduleName %>BS');

  /********子页面********/
  //var sub1 = require('./sub1/sub1');

  var viewConfig = {
    initialize: function() {
      /********注册子页面********/
      //this.pushSubView([sub1]);
      var self = this;
      var indexView = utils.loadCompiledPage('<%=moduleName %>IndexPage', require);
<%if(isPaperDialog){ %>
      $.bhPaperPileDialog.show({
        content: indexView.render(),
        render: function() {
          self.initAdvancedQueryAndCard();
        }
      });
<%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initAdvancedQueryAndCard();
<%}%>
      /********页面内事件通过eventMap统一管理********/
      this.eventMap = {
        '[data-action="编辑"]': this.actionEdit
      };
    },

    initAdvancedQueryAndCard: function() {
      var cardTpl = utils.loadCompiledPage('<%=moduleName %>CardTpl', require);
      var tableOptions = {
        pagePath: bs.api.pageModel,
        action: 'TABLE',
        template: cardTpl,
        pageable: false,
        cardBeforeRender: function(row) {}
      };
      var searchData = WIS_EMAP_SERV.getModel(bs.api.advancedQueryModel, 'TABLE', "search");

      $('#<%=moduleName %>-index-search').emapAdvancedQuery({
        data: searchData
      });
      $('#<%=moduleName %>-index-search').on('search', this.searchCallback);

      $('#<%=moduleName %>-index-card').emapCard(tableOptions);
    },

    searchCallback: function(e, data, opts) {
      $('#<%=moduleName %>-index-card').emapCard('reload', {
        querySetting: JSON.stringify(data)
      });
    },

    actionEdit: function(event) {
      var wid = $(event.currentTarget).attr('data-x-wid');

    }

  };

  return viewConfig;
});
