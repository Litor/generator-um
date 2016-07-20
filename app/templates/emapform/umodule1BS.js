define(function(require) {

  var utils = require('utils');
  var mock = require('./mock');

  var bs = {
    api: {
      pageModel: 'http://res.wisedu.com/fe_components/mock/page_model.json',

      advancedQueryModel: 'http://res.wisedu.com/fe_components/mock/advencedQueryModel.json',

      rowDataDetailUrl: 'http://res.wisedu.com/fe_components/mock/userInfo.json'
    },

    getRowDataDetails: function() {
      return utils.fetch({
        url: bs.api.rowDataDetailUrl,
        data: {},

        /***parser用于对接口返回的数据做进一步处理***/
        parser: function(res) {

        }
      });
    }
  };

  return bs;
});
