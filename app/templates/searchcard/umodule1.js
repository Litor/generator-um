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
          self.initAdvancedQueryAndCard();
        }
      });
      <%}%>
      <%if(!isPaperDialog){%>
      this.$rootElement.html(indexView.render({}), true);
      this.initAdvancedQueryAndCard();
      <%}%>
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
      var wid = $(event.target).attr('data-x-wid');

    }

  };

  return viewConfig;
});
