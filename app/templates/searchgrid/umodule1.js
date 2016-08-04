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
          self.initAdvancedQueryAndTable();
        }
      });
<%}else{%>
      this.$rootElement.html(indexView.render({}), true);
      this.initAdvancedQueryAndTable();
<%}%>
      /********页面内事件通过eventMap统一管理********/
      this.eventMap = {
        '[data-action="编辑"]': this.actionEdit
      };
    },

    initAdvancedQueryAndTable: function() {
      var cardTpl = utils.loadCompiledPage('<%=moduleName %>CardTpl', require);
      var tableOptions = {
        pagePath: bs.api.pageModel,
        action: 'TABLE',
        template: cardTpl,
        searchElement: $('#<%=moduleName %>-index-search'),
        customColumns: this.getCustomColumns()
      };
      var searchData = WIS_EMAP_SERV.getModel(bs.api.advancedQueryModel, 'TABLE', "search");

      $('#<%=moduleName %>-index-search').emapAdvancedQuery({
        data: searchData,
        showTotalNum: true
      });
      $('#<%=moduleName %>-index-search').on('search', this.searchCallback);

      $('#<%=moduleName %>-index-table').emapGrid(tableOptions);
    },

    searchCallback: function(e, data, opts) {
      $('#<%=moduleName %>-index-table').emapdatatable('reload', {
        querySetting: JSON.stringify(data)
      });
    },

    getCustomColumns: function() {
      var customColumns = [{
        colIndex: '0',
        type: 'checkbox'
      }, {
        colIndex: '100',
        type: 'tpl',
        column: {
          text: '操作',
          align: 'center',
          cellsalign: 'center',
          cellsRenderer: function(row, column, value, rowData) {
            return '<a href="javascript:void(0);" class="j-row-edit" data-x-wid="' + rowData.WID + '" data-action="编辑">编辑</a>';
          }
        }
      }];

      return customColumns;
    },

    actionEdit: function(event) {
      var wid = $(event.currentTarget).attr('data-x-wid');

    }

  };

  return viewConfig;
});
