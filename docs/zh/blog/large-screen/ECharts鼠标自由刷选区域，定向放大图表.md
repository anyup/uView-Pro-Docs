---
title: 产品需求：ECharts鼠标自由刷选区域，定向放大图表
---

# 产品需求：ECharts鼠标自由刷选区域，定向放大图表

## 一. 背景

在 ECharts 中，图表开发属于最基础的组件开发，适合统计展示各种各样的数据，使用图形化的效果将海量数据直观的展示给用户，以便于让用户能够快速获取到数据展示及走向。但随着用户需求的不断迭代，我们最近的一个项目需求是：

需要将曲线图表的某一段曲线细致的呈现给用户，具体方式为：**用户通过鼠标随意框选区域，进而放大展示所框选区域内的数据图表**。

提前预览效果图如下：

![record-line.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcd9b71aac2f43b8bdc7065792fea18e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=965&h=517&s=1274945&e=gif&f=135&b=fefefe)

当涉及到框选区域选择并实现定向缩放的需求时，这是一个对于定向查看某段数据来说是非常实用的功能。通过框选区域实现定向缩放，可以帮助用户更方便地查看感兴趣的数据细节，提升数据可视化的交互性和用户体验。

在本篇文章中，我将介绍如何通过 ECharts 的 `brush` 和 `dataZoom` 组件结合使用，实现在图表中进行框选区域选择，并实现定向缩放的功能。

## 二. 初步分析

### 1. 初步缩放功能

老生常谈，其实这个就是正常的图表缩放的需求，ECharts 提供了最基础的配置图表缩放属性，ECharts 的 `dataZoom` 组件 用于区域缩放，通过配置 `dataZoom` 属性实现曲线缩放。从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。

其中，最核心的代码如下所示：

```javascript
option = {
  dataZoom: [
    {
      id: "dataZoomX",
      type: "slider",
      xAxisIndex: [0],
    },
    {
      id: "dataZoomY",
      type: "slider",
      yAxisIndex: [0],
    },
  ],
};
```

配置完成后，通过鼠标滚轮放大或者拖动 x 轴或 y 轴滑块缩放图表，效果如下所示：

![record-line 2.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f57713cdfe5b446c80e89271357a488b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=965&h=517&s=704434&e=gif&f=67&b=fefefe)

关于 ECharts `dataZoom` 配置项，如需更详细的使用，请参考 ECharts 官方文档：[ECharts dataZoom 配置项参考](https://echarts.apache.org/zh/option.html#dataZoom)

### 2. 探讨其他方案

很显然，以上的这种方案也是开发者最常使用的缩放功能，通过简单的配置 `dataZoom` 属性，可以实现在坐标轴的 x 轴或 y 轴添加缩放滑块，使用鼠标滚轮放大或者拖动滑块实现对曲线图的放大和缩小。但是这种却不是产品需求所需要的，还需要探索其他的方案来完成。

通过查询 ECharts 官方文档配置项手册，可以发现 ECharts 也提供了其他的方案可以实现曲线图的区域放大，主要有两种方案：

- 配置 `toolbox` 工具栏

- 使用 `brush` 区域选择组件

接下来，我将对这两种方案进行详细的方案实现和对比，马上开始吧！

## 三. 方案一：配置 toolbox 工具栏

通过配置 `toolbox` 工具栏，可以实现对图表数据区域定向缩放功能。

`toolbox` 为 ECharts 的工具栏，内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具，如下所示：

- 导出图片：`saveAsImage`

- 数据视图：`dataView`

- 动态类型切换：`magicType`

- 数据区域缩放：`dataZoom`

- 重置：`restore`

关于 `toolbox` 工具栏，主要有以上五种。其中，关于区域缩放的工具，就只有 `dataZoom` 了，因此，第一种实现方案就是配置 `toolbox` 的 `dataZoom` 组件，可以实现数据区域缩放，官方目前只支持直角坐标系的缩放。

这种方案相对特别简单，只需要简单的配置一下工具栏，使其工具生效就可以使用框选区域放大了，代码如下所示：

```javascript
option = {
    toolbox: {
      feature: {
        saveAsImage: {}, // 导出图片
        dataView: { readOnly: false }, // 数据视图
        magicType: { type: ["line", "bar"] }, // 动态类型切换
        dataZoom: {}, // 数据区域缩放
        restore: {}, // 重置
      },
    },
};
```

配置好以上的工具栏以后，演示效果如下图所示：


![toolbox demo.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be01564163444b16868c9ab8b492afe5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=882&h=511&s=1488909&e=gif&f=113&b=fefdfd)


关于更多的 ECharts `toolbox` 工具栏的其他配置项，本篇文章不做过多的解释，详细请参考官方文档：[ECharts toolbox 配置项](https://echarts.apache.org/zh/option.html#toolbox)

## 四. 方案二：使用 `brush` 区域选择组件

其实通过以上介绍的这种方案，完全就可以实现刷选区域定向放大图表的需求，按理说文章到这也可以收尾了。但是本着探索的态度，我的好奇心驱使我继续探索是否还有其他的方案实现这种功能。

通过继续查询资料，可以发现，ECharts 还提供了 `brush` 区域选择组件，用户可以选择图中一部分数据，可以对框选的数据进行自定义操作。

原本，`brush` 区域选择组件是为了便于向用户展示被选中数据，或者基于被选中的数据做一些统计计算结果。但是，我们我们这里根据产品需求，也可以实现根据选择的区域，定向的放大图表，就是可能需要额外的处理一下刷选事件，再次触发图标行为，使其放大。

因此，第二种方法相对繁琐一些，我总结了以下几个步骤可以使用 `brush` 实现刷选放大功能。

- 配置 `brush` 刷子

- 监听回调事件

- 放大图表区域

接下来，我将会对以上这几个步骤进行一一说明。

### 1. 配置 brush 刷子

**配置刷子的类型和启动按钮**

目前 `brush` 组件支持的图表类型：`scatter`、`bar`、`candlestick`（`parallel` 本身自带刷选功能，但并非由 `brush` 组件来提供）。点击 `toolbox` 中的按钮，能够进行『**区域选择**』、『**清除选择**』等操作。

例如：在 `bar` 图中的 `brush` 效果（点击 `toolbox` 中的按钮启动刷选），可以进行选择 `bar`。

![record-bar.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f652a1e72184432a57e46cae90644e9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=805&h=364&s=331997&e=gif&f=73&b=fefefe)

看到这里，我不仅有个疑问，`brush` 不支持折线图？？将信将疑，先不管，继续向下进行。

**配置刷子刷选形状**

目前刷子支持这几种选框：矩形刷子，任意形状刷子，横向刷子，纵向刷子，`brush` 相关的 `toolbox` 按钮如下所示：

- `rect`：矩形刷子，开启矩形选框选择功能。

- `polygon`：任意形状刷子，开启任意形状选框选择功能。

- `lineX`：横向刷子，开启横向选择功能。

- `lineY`：纵向刷子，开启纵向选择功能。

- `keep`：切换『**单选**』和『**多选**』模式。后者可支持同时画多个选框。前者支持单击清除所有选框。

- `clear`：清空所有选框。

在这里，我们主要使用矩形刷子或横向刷子，它们两个的主要区别在于：

- **横向刷子**：主要支持 x 轴的框选操作

- **矩形刷子**：以矩形的形式可以在 x 轴、y 轴进行任意框选

通过代码配置选择使用刷子形状

```javascript
option = {
  brush: {
    toolbox: ["rect", "lineX", "clear"], // 配置使用矩形刷子、横向刷子、清除选项
  },
};
```

通过以上的少量配置，我们就实现了使用 `brush` 刷子框选曲线的功能，但是仅限于框选，框选完成后没有任何操作。效果如下图所示：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e127ba0222643509fb00052894df70f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=927&h=529&s=57682&e=png&b=ffffff)

关于更多的 `brush` 刷子个性化的配置，请参考：[ECharts brush 配置项](https://echarts.apache.org/zh/option.html#brush)

### 2. 监听回调事件

以上的阶段，我们仅仅实现了使用 `brush` 刷子框选曲线的功能，但是框选完成后我们应该怎么做？这才是重中之重，我们继续向下看。

通过查阅文档，官方文档也提供了 `brush` 的相关回调函数，这这里我们主要能使用到的有以下两个事件：

- `events.brushselected`：在 `setOption` 时不会发出，在其他的 `dispatchAction` 时，或者用户在界面中创建、删除、修改选框时会发出。

- `events.brushEnd`：“选框添加完毕”事件。即发出 `brushEnd action` 得到的事件。

简言之：在使用 `brush` 进行框选过程中会不断触发 `brushselected` 事件，在框选结束之后会触发 `brushEnd` 事件。

因此，在我们对曲线框选结束之后，对所框选的内容进行解析，获取到用户实际的框选数据，然后进行放大曲线。

```javascript
// 刷选过程触发事件
myChart.on("brushselected", function (params) {
  console.log("brushselected", params);
});
// 刷选完毕事件
myChart.on("brushEnd", function (params) {
  console.log("brushEnd", params);
});
```

使用上述代码监听刷选事件，得到的回调输出如下所示：

> 以上的 `brushselected` 有性能问题，下述会讲解如何优化这个性能问题

监听到刷选事件后，我们可以对其返回的数据进行解析，根据 `coordRange` 计算框选区域内的 x 轴和 y 轴坐标系的 `startValue` 和 `endValue`，然后根据 `startValue` 和 `endValue` 进行放大曲线点位。

具体代码如下所示：

```javascript
myChart.on("brushEnd", function (params) {
  console.log(params);
  if (params.areas.length === 0) {
    return;
  }
  // 根据 coordRange 计算框选区域内的x坐标的startValue和endValue，然后根据startValue和endValue进行放大曲线点位
  const xAxisRange = params.areas[0].coordRange[0];
  const yAxisRange = params.areas[0].coordRange[1];
  const xstartValue = xAxisRange[0]; //x 轴 startValue
  const xendValue = xAxisRange[1]; //x 轴 endValue
  const ystartValue = yAxisRange[0]; //y轴 startValue
  const yendValue = yAxisRange[1]; //y轴 endValue

  console.log("x轴：", xstartValue, xendValue);
  console.log("y轴：", ystartValue, yendValue);
});
```

> 提示：在目前的应用场景下，`brushEnd` 和 `brushselected` 事件可以二选其一，在这里我使用的 `brushEnd` 事件。

关于更多的 ECharts brush 的相关回调事件，请参考：[ECharts brush 回调事件 API](https://echarts.apache.org/zh/api.html#events.brush)

以上操作，我们获取并解析成功，得到了刷选区域的 x 轴和 y 轴的坐标数据，根据这些数据，就可以适时的放大曲线。在进行下一步操作之前，我们先来优化一下使用 `brushSelected` 事件而导致的性能问题。

### 3. 避免性能问题

默认情况，刷选或者移动选区的时候，会不断得触发 `brushSelected` 事件，从而告诉外界选中的内容。

但是频繁的事件可能导致性能问题，或者动画效果很差。所以 `brush` 组件提供了 `brush.throttleType`，`brush.throttleDelay` 来解决这个问题。

**brush.throttleType 取值说明：**

- `debounce`：表示只有停止动作了（即一段时间没有操作了），才会触发事件。

- `fixRate`：表示按照一定的频率触发事件。

**brush.throttleDelay 取值说明：**

- 数值为毫秒数，例如：500 表示为 500 毫秒。

- 默认为 0 表示不开启 `throttle`。

> 注意：`brush.throttleType` 时间阈值或时间间隔由 `brush.throttleDelay` 指定。

通过配置 `brush.throttleType` 和 `brush.throttleDelay`，可以解决性能问题，代码配置如下所示：

```javascript
option = {
  brush: {
    toolbox: ["rect", "lineX", "clear"], // 配置使用rect、lineX、clear
    throttleType: "debounce", // 指定为 debounce 模式
    throttleDelay: 500, // 表示按照 500ms 的频率触发事件
  },
};
```

- 未配置防抖优化时，在进行刷选图表操作时，可以看见事件触发的密集度。

![record-line 3.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94fc8c4601c1445f8b8ff4ce349e8f2a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1005&h=422&s=319842&e=gif&f=37&b=fefefe)

- 配置 `brush.throttleType` 和 `brush.throttleDelay` 后，再次进行刷选图表，可以发现已经没有频繁的事件触发。

![record-line 4.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/625644dd68954a04b0a19cdbd6a8a905~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1005&h=422&s=197281&e=gif&f=25&b=fefefe)

### 4. 放大图表区域

曲线的配置项 `option` 中有 `dataZoom` 属性，主要用于区域缩放，关于 `dataZoom` 的配置，可以配置数据窗口范围，主要通过以下属性：

- `start`：数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。

- `end`：数据窗口范围的结束百分比。范围是：0 ~ 100。

- `startValue`：数据窗口范围的起始数值。

- `endValue`：数据窗口范围的结束数值。

关于以上数据更详细的解释，你可以继续阅读官方文档：[ECharts dataZoom 数据窗口范围配置项](https://echarts.apache.org/zh/option.html#dataZoom-slider.start)

通过以上两组数据，start 和 end 为一组数据，startValue 和 endValue 为一组数据，我们就可以实现曲线窗口的缩放。有以下两种思路可以实现图表放大：

- 第一种，通过 setOption 重新给曲线设置 option，修改 dataZoom 属性，更新为最新的数据

- 第二种，通过 dispatchAction 触发图表行为，修改数据区域缩放 dataZoom

在这里我主要使用的 startValue 和 endValue，因为在上面的步骤中，通过对刷选区域回调数据的解析，我们已经得到的数据就是 startValue 和 endValue，因此接下来，我分别对这两种方案进行实现说明：

**第一种：通过 setOption 更新 option，放大图表**

通过 `setOption` 更新曲线 option 的 `dataZoom` 属性，修改 x 轴和 y 轴的 `startValue` 和 `endValue`

```javascript
myChart.setOption({
  dataZoom: [
    {
      xAxisIndex: [0], // 控制x轴
      startValue: startValue, // x轴起始数值
      endValue: endValue, // x轴结束数值
    },
    {
      yAxisIndex: [0], // 控制y轴
      startValue: ystartValue, // y轴起始数值
      endValue: yendValue, // y轴结束数值
    },
  ],
});
```

**第二种：通过 dispatchAction 触发图表行为，放大图表**

`dispatchAction` 为触发图表行为，例如图例开关 `legendToggleSelect`, 数据区域缩放 `dataZoom`，显示提示框 `showTip` 等等。

`payload` 参数可以通过 batch 属性同时触发多个行为，在这里我们也会使用 batch 同时触发 x 轴和 y 轴的放大。

```javascript
myChart.dispatchAction({
  type: "dataZoom",
  batch: [
    {
      // 第一个 dataZoom 组件，x轴
      startValue: startValue,
      endValue: endValue,
    },
    {
      // 第二个 dataZoom 组件，y轴
      startValue: ystartValue,
      endValue: yendValue,
    },
  ],
});
```

关于 `dispatchAction` 图表行为，更多的详细信息请参考 [ECharts dispatchAction 图表行为 API](https://echarts.apache.org/zh/api.html#echartsInstance.dispatchAction)

## 五. 两种方案对比

先回顾一下，通过以上的介绍，可以有两种方案实现刷选区域放大的功能：

- 方案一：配置 `toolbox` 工具栏，添加 `dataZoom` 缩放组件

- 方案二：使用 `brush` 刷子区域选择组件

1. 方案一简单快捷，只需要简单配置 `toolbox` 工具栏，即可实现刷选放大功能。

2. 方案二流程复杂，定制化需求高，可能会出现不明确的 bug。

如果您仅仅是需要刷选放大图表，建议选择方案一；如果您不仅需要放大图表，还需要对刷选区域进行统计数据，建议使用方案二，能够统计计算框内数据，适合定制化统计展示。

## 六. 注意事项

1. 在使用 brush 进行刷选或者移动选区的时候，会不断得触发 `brushSelected` 事件，需要进行节流或防抖事件，避免性能问题。

```javascript
option = {
  brush: {
    throttleType: "debounce", // 指定为 debounce 模式
    throttleDelay: 500, // 表示按照 500ms 的频率触发事件
  },
};
```

- 可以使用官方的配置项，但需要注意 `brush.throttleType` 时间阈值或时间间隔由 `brush.throttleDelay` 指定，不指定会失效。
- 也可以使用防抖或节流函数，是同样的性能优化原理，关于防抖和节流，参考：[前端性能优化 ｜ 防抖与节流](https://juejin.cn/post/7270532002733228068)

2. 在使用 brush 刷选区域结束并完成区域放大后，需要主动清除所有选框，否则，曲线图上则会存在选框区域未清除。

```javascript
myChart.dispatchAction({
  type: "brush",
  areas: [],
});
```

3. 注意缩放选区的 `start`、`end`、`startValue`、`endValue` 对应的值的含义，它们是有区别的。

- `start` 和 `end` 为一组，表示数据窗口范围的起始和结束百分比，表示缩放滑块处于当前坐标轴的百分比

- `startValue` 和 `endValue` 为一组，表示数据窗口范围的起始和结束数值，可以设置为数组值本身，也可以设置为数组的 `index`，但是如果设置为数组值本身，会在内部自动转化为数组的 `index`

4. 特别注意：注意 ECharts 版本的差异性

本文所有的演示示例代码，所使用的 ECharts 版本为 5.4.3，目前官方已经发布了 5.5 的版本。可能在项目中也有用到其他版本的，如果有在项目中使用同样的配置代码但图表效果展示不一致，请先排查一下是否为 ECharts 版本不一致导致的问题，不同的 ECharts 版本可能在使用方式上会有所差异。

## 七. 总结

通过以上流程性的介绍和学习，按照顺序仔细阅读的话，相信大家对于实现通过鼠标框选区域，放大数据图表的功能有一个清晰的思路，主要有两种方案进行选择，

如果需要快速的使用刷选功能而尽量少的改动代码，就使用方案一：使用 `toolbox` 配置 `dataZoom` 区域放大组件，简单快捷，使用方便。如果不仅想要刷选区域放大，还需要对刷选区域进行统计数据，则需要定制使用 `brush` 刷子，但同时要注意代码的性能优化。

本篇文章到这就结束了，希望能够帮助你更好地理解和使用 ECharts，以上为项目经验所得，如果有任何错误，敬请指出!

> 如果您感觉文章还不错，点个赞再走吧！

### 文档资料链接

[ECharts 配置项手册：https://echarts.apache.org/zh/option.html](https://echarts.apache.org/zh/option.html)

[ECharts API 文档：https://echarts.apache.org/zh/api.html](https://echarts.apache.org/zh/api.html)

[体验 Demo 地址 1](https://anyup.gitee.io/juejin-up/src/echarts/brush-dataZoom-line.html)

[体验 Demo 地址 2](https://anyup.gitee.io/juejin-up/src/echarts/brush-dataZoom-demo.html)

### 完整代码 option

```javascript
// 随机生成一些图表数据
const data = Array.from({ length: 100 }, (_, index) => {
  return [
    new Date(Date.UTC(2024, 2, 6, 0, 0, 0) + index * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    Math.floor(Math.random() * (40 - 20 + 1)) + 20,
  ];
});
// 完整 option
const option = {
  tooltip: {
    trigger: "axis",
  },
  toolbox: {
    feature: {
      dataZoom: {},
      restore: {},
    },
  },
  brush: {
    throttleType: "debounce",
    throttleDelay: 500,
    xAxisIndex: "all",
    toolbox: ["rect", "clear"],
  },
  xAxis: {
    type: "time",
  },
  yAxis: {
    type: "value",
    name: "温度(°C)",
    min: 0,
    max: 50,
  },
  dataZoom: [
    { type: "slider", xAxisIndex: [0], start: 0, end: 100 },
    { type: "slider", yAxisIndex: [0], start: 0, end: 100 },
  ],
  series: {
    name: "温度(°C)",
    type: "line",
    smooth: true,
    //  随机生成数据
    data: data,
  },
};
// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById("main"));
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.on("brushEnd", function (params) {
  // 判断是否有框选区域
  if (params.areas.length === 0) {
    return;
  }
  console.log(params);
  // 根据 coordRange 计算框选区域内的x坐标的startValue和endValue
  const xAxisRange = params.areas[0].coordRange[0];
  const yAxisRange = params.areas[0].coordRange[1];
  const xstartValue = xAxisRange[0]; //x 轴 startValue
  const xendValue = xAxisRange[1]; //x 轴 endValue
  const ystartValue = yAxisRange[0]; //y轴 startValue
  const yendValue = yAxisRange[1]; //y轴 endValue
  console.log("x轴：", xstartValue, xendValue);
  console.log("y轴：", ystartValue, yendValue);
  // 图表行为，根据startValue和endValue进行放大图表区域
  myChart.setOption({
    dataZoom: [
      {
        xAxisIndex: [0], // 控制x轴
        startValue: xstartValue, // x轴起始数值
        endValue: xendValue, // x轴结束数值
      },
      {
        yAxisIndex: [0], // 控制y轴
        startValue: ystartValue, // y轴起始数值
        endValue: yendValue, // y轴结束数值
      },
    ],
  });
  // 如果 areas 为空，则删除所有选框。否则，曲线图上则会存在选框区域未清除
  myChart.dispatchAction({
    type: "brush",
    areas: [],
  });
});
```

<ArticleFooter link="juejin::https://juejin.cn/post/7342861726001594419" />