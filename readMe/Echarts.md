配置项1: series系列列表。每个系列通过type属性来决定图表的类型。

2: tooltip.trigger = "item/axis/none"   数据点触发

三个可选参数：item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。

axis坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。

none什么都不触发

3: tooltip.axisPointer 是配置坐标轴指示器的快捷方式（注：`tooltip.axisPointer` 中诸配置项的优先级低于轴上的 axisPointer 的配置项）

tooltip.axisPointer.type = 'line/shadow/none/cross'

四个可选参数：line---直线指示器，shadow---阴影指示器，none---无指示器，cross---十字准星指示器。

4: grid 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制[折线图](https://echarts.apache.org/v4/zh/option.html#series-line)，[柱状图](https://echarts.apache.org/v4/zh/option.html#series-bar)，[散点图（气泡图）](https://echarts.apache.org/v4/zh/option.html#series-scatter)。

5: grid的containLabel属性取值为Boolean（grid区域是否包含1坐标轴的刻度标签）

