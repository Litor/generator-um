<!DOCTYPE html>
<html>
<head>
    <title><%=widgetName %></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <script src="../avalon.js"></script>
    <script src="../highlight/shCore.js"></script>
    <script>

        require(["<%=widgetName %>/avalon.<%=widgetName %>"], function() {
            avalon.define("test", function(vm) {
                vm.name = "tstttt";
            })

            avalon.scan();
        })
    </script>
</head>
<body>
<style>

</style>
<div ms-controller="test">
    <div ms-widget="<%=widgetName %>">

    </div>
</div>

</body>
</html>
