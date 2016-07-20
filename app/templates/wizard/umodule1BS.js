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
    },

    getWizardInfo: function() {
      return utils.fetch({
        parser: function(res) {
          res = {
            wizard: [{
              stepId: '0',
              title: 'step0'
            }, {
              stepId: '1',
              title: 'step1'
            }, {
              stepId: '2',
              title: 'step2'
            }]
          };
          return res;
        }
      });
    }
  };

  return bs;
});
