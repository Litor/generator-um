// avalon 1.3.6
/**
 * @enName <%=widgetName %>
 * @introduce
 */
define(["avalon", "text!./avalon.<%=widgetName %>.html", "css!./avalon.<%=widgetName %>.css", "../avalon.getModel.js"], function(avalon, template) {
    /**
    *   templateArr = template.split('MS_OPTION_EJS');
    */
    var widget = avalon.ui.<%=widgetName %> = function (element, data, vmodels) {
        var options = data.<%=widgetName %>Options,
        $element = avalon(element),
        vmId = data.<%=widgetName %>Id;
        options.template = options.getTemplate(template, options);

        var inited, id = +(new Date());

        var vm = avalon.mix({
            $id : vmId,
            widgetElement : element,
            defaults:widget.defaults,
            $skipArray : ["defaults", "widgetElement", "template"],
            $uid : id,
            $init :  function (continueScan) {
                if (inited) return;
                inited = true;
                vmodel.template = vmodel.template.replace(/\{\{MS_COMBOX_ID\}\}/g, id);
                element.innerHTML = vmodel.template;

                if (continueScan) {
                    continueScan();
                }
            }
        }, options);

        var vmodel = avalon.define(vm);

        return vmodel;
    };

    widget.defaults = {
        test:'helloworld!',
        getTemplate: function (str, options) {
            return str;
        }
    };

    return avalon;
});

/**
  //遍历数组元素，依次处理111
  [].forEach(function (dataItem, index) {
      if (dataItem.selected) {
          selectedData.push(dataItem);
      }
  });

  //监听view model中属性的变化
  vmodel.$watch("scrollerHeight", function(n) {

  //解析字符串模板为dom对象
  var dom = avalon.parseHTML(options.template);
  });

  //组件嵌套时 外部组件向内部组件传值
  var duplexVM = avalon.getModel(options.duplex, [vmodel].concat(vmodels)),
  duplexArr = duplexVM && duplexVM[1][duplexVM[0]]

   //新建dom元素
   popup = popup || document.createElement("div");
   popup.innerHTML = options.template;
   document.body.appendChild(popup)

   //抽取data-tooltip-text、data-tooltip-attr属性，组成一个配置对象
   var widgetData = avalon.getWidgetData(elem, widget)

   //绑定父作用域属性（只能绑定基本数据类型及函数等，对象和数组不支持）
   avalon.bindParentVM(vmodels, vmodel, "value");
*/
