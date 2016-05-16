define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./<%=moduleName %>BS');

  var viewConfig = {
    initialize: function() {
      var self = this;
      var indexView = utils.loadCompiledPage('<%=moduleName %>IndexPage');

      self.$rootElement.html(indexView.render({}), true);

      this.initAdvancedQueryAndTable();

      this.eventMap = {
        '[data-action="编辑"]': this.actionEdit
      };
    },

    initAdvancedQueryAndTable: function() {
      var tableOptions = {
        pagePath: bs.api.pageModel,
        action: 'TABLE',
        customColumns: this.getCustomColumns()
      };
      var searchData = WIS_EMAP_SERV.getModel(bs.api.advancedQueryModel, 'TABLE', "search");

      $('#<%=moduleName %>-index-search').emapAdvancedQuery({
        data: searchData
      });
      $('#<%=moduleName %>-index-search').on('search', this.searchCallback);

      $('#<%=moduleName %>-index-table').emapdatatable(tableOptions);
    },

    searchCallback: function(e, data, opts) {
      $('#<%=moduleName %>-index-table').emapdatatable('reload', {
        querySetting: JSON.stringify(data)
      });
    },

    getCustomColumns: function() {
      var customColumns = [{
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
      var wid = $(event.target).attr('data-x-wid');
      var dialogView = utils.loadCompiledPage('umodule1DialogPage');

      bs.getRowDataDetails({
        wid: wid
      }).done(function(model) {
        $.bhPaperPileDialog.show({
          content: dialogView.render(model),
          ready: function() {
            var datamodel = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'FORM_GROUP', 'form');
            $('.umodule1-dialog-form').emapForm({
              root: '',
              data: datamodel,
              readonly: false,
              model: 'h'
            });
          }
        });
      });
    }

  };

  return viewConfig;
});
