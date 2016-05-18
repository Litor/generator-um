define(function(require, exports, module) {

  var utils = require('utils');
  var mock = require('./mock');

  var bs = {
    api: {
      pageModel: 'http://res.wisedu.com/fe_components/mock/page_model.json',

      advancedQueryModel: 'http://res.wisedu.com/fe_components/mock/advencedQueryModel.json',

      rowDataDetailUrl: 'http://res.wisedu.com/fe_components/mock/userInfo.json'
    },

    getRowDataDetails: function() {
      var def = $.Deferred();

      utils.doAjax(bs.api.rowDataDetailUrl, null, 'get').done(function(res) {

        def.resolve(res);
      }).fail(function(res) {
        def.reject(res);
      });

      return def.promise();
    },

    getTabInfo: function() {
      var def = $.Deferred();
      var res = {
        tabs: [{
          index: 0,
          title: '待发布'
        }, {
          index: 1,
          title: '已发布'
        }]
      };
      def.resolve(res);

      return def.promise();
    }
  };

  return bs;
});
