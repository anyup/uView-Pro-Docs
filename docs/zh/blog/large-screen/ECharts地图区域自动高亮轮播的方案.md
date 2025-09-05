---
title: 探索 ECharts 地图区域自动高亮轮播的方案
---

# 探索 ECharts 地图区域自动高亮轮播的方案

## 1. 背景

在数据可视化的世界中，ECharts 以其强大的功能和灵活的特性，为我们呈现出丰富多彩的数据展示效果，而在我们做的多个地图展示大屏中，其中一个展示功能便是地图区域自动高亮轮播。

当我们面对一张复杂的地图，通过自动高亮轮播的方式，能够清晰地聚焦于不同的区域，帮助我们更有效地传达信息、突出重点和引导用户的注意力，它可以让复杂的数据在地图上以一种动态变化方式呈现出来，使得观众更容易理解和记忆。

如下简单效果图所示：**文末附源码**

![map3.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a761b9ebd8714c04bf2ca56543cf96d2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033831&x-orig-sign=rCHtqSoR%2Bh8CoLMFHWK%2Bk4dKTTA%3D)

## 2. 地图展示

我们已经清晰的了解到，如何快速的渲染一个合规的中国地图，请查阅这篇文章：[分享 ECharts 地图合规整改经验，并实现一个最基础的中国地图](https://juejin.cn/post/7313742254144880676)

本篇文章我们也是以中国地图为例，实现一个可以自动高亮轮播的地图。

通过以下简单的代码，我们可以快速的实现一个最基础的地图：

```html
<div id="main" style="height: 100%"></div>
```

```js
// echarts 实例化
const myChart = echarts.init(document.getElementById('main'))

// 注册地图
echarts.registerMap('china', chinaJson)

// 定义option，省略一些个性化配置
const option = {
  tooltip: {},
  geo: {
    map: 'china',
    roam: true,
    label: {},
    itemStyle: {},
    emphasis: {}
  },
  series: [
    {
      type: 'map',
      map: 'china',
      geoIndex: 0,
      roam: true
    }
  ]
}
// 设置 option
myChart.setOption(option)
```

通过以上代码，我们可以实现一个最基础的地图，但是我们发现，这个地图渲染完成后是没有任何交互的，我们希望这个地图可以自动高亮轮播，那么我们需要怎么做呢？

想要做到自动高亮轮播，那么首先我们要做区域高亮，接下来看一下如何做？

## 3. 区域高亮

区域高亮也就是将地图上的某区域进行高亮显示，比如在中国地图下，让某个省区域地图高亮，那么我们可以通过以下代码来实现区域高亮。

高亮山东省区域：

```js
// 高亮当前区域
myChart.dispatchAction({
  type: 'highlight',
  seriesIndex: 0,
  name: '山东省'
})
```

很简单，通过 echartsInstance.dispatchAction 方法可以触发图表行为，highlight 可以高亮指定的数据图形。而 downplay 取消高亮指定的数据图形。

取消高亮山东省区域：

```js
// 取消高亮区域
myChart.dispatchAction({
  type: 'downplay',
  seriesIndex: 0,
  name: '山东省'
})
```

> 注意：高亮区域相关的行为，需要配置相关的配置项，才能有效果

比如：通过配置 emphasis 设置高亮状态下的多边形和标签样式。

```js
// 设置高亮状态下的多边形和标签样式
option = {
  geo: {
    emphasis: {
      // 设置区域样式
      itemStyle: {
        areaColor: '#ffff99', // 区域颜色
        borderColor: '#f29100' // 描边颜色
      },
      // 设置字体
      label: {
        fontSize: 16, // 字体大小
        color: '#f29100' // 标签颜色
      }
    }
  }
}
```

通过以上各个方法的说明，我们可以实现高亮和取消高亮区域，以下面一个具体实践例子，看如何来操作。

地图加载完成后，高亮山东省区域，3 秒后取消高亮山东省区域，那么我们可以这么实现：

```js
// 高亮当前区域
myChart.dispatchAction({
  type: 'highlight',
  seriesIndex: 0,
  name: '山东省'
})

setTimeout(() => {
  // 取消高亮区域
  myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    name: '山东省'
  })
})
```

具体效果图如下所示：

![map1.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4b6ea84fb29744d08ca99cdbe703c923~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033831&x-orig-sign=HW%2FO2aWmz8qFBECa39K%2BS9ZymWY%3D)

## 4. tooltip 提示跟随

以上的代码实现了区域高亮，但是我们发现，高亮的区域是没有任何提示的，那么我们如何让高亮的区域有提示呢？也就是 tooltip 提示。

同样的，echarts 也提供了类似的方案来实现 tooltip 提示，我们可以通过以下代码来实现 tooltip 提示：

显示 tooltip

```js
// 显示 tooltip
myChart.dispatchAction({
  type: 'showTip',
  seriesIndex: 0,
  name: '山东省'
})
```

隐藏 tooltip

```js
myChart.dispatchAction({
  type: 'hideTip'
})
```

> 注意：提示框组件相关的行为，必须引入提示框组件后才能使用。

所以，在这里，我简单设置一下 tooltip，展示区域名称即可，具体代码如下所示：

```js
option = {
  tooltip: {
    trigger: 'item',
    position: 'bottom',
    formatter: '{b}',
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    textStyle: {
      color: '#FFFFFF',
      textalign: 'center',
      fontSize: '12px'
    }
  }
}
```

结合上面区域高亮的 demo，简单的效果图如下所示：

![map2.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bedcaf0986b24e1fa5dacc7e6fa6882b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033831&x-orig-sign=ceQ%2BzmKnB3kGs1aOAaiXlOE%2FS1U%3D)

## 5. 轮播方案

通过高亮区域和 tooltip 提示跟随，我们可以实现单个或多个区域的一次性高亮，那么实现轮播其实也是特别简单的。价格轮巡函数来控制就好了

- 准备一组需要高亮的数据支撑
- 定义高亮和取消高亮函数
- 定义轮巡函数，循环遍历数据，依次高亮
- 调用轮巡函数，实现轮巡效果

```js
// 定义高亮区域数组
const regions = ['黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省']
// 动态高亮
function highlightRegion(index) {
  // 高亮当前区域
  myChart.dispatchAction({
    type: 'highlight',
    seriesIndex: 0, // 如果有多个geo组件，可以指定索引
    name: regions[index]
  })

  // 显示 tooltip
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    name: regions[index]
  })
}

// 取消高亮显示
function cancelHighlightRegion(index) {
  // 取消高亮区域
  myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    name: regions[index]
  })
  // 取消显示 tooltip
  myChart.dispatchAction({
    type: 'hideTip'
  })
}

// 开始轮播显示
function startInterval() {
  // 循环高亮
  intervalId = setInterval(function () {
    // 取消上一个区域高亮
    if (currentIndex > 0) {
      cancelHighlightRegion(currentIndex - 1)
    }
    if (currentIndex >= regions.length) {
      clearInterval(intervalId)
      return
    }
    // 高亮当前区域
    highlightRegion(currentIndex++)
  }, timeout) // 每个区域之间的切换时间
}
```

效果图如下所示：

![map3.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a761b9ebd8714c04bf2ca56543cf96d2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033831&x-orig-sign=rCHtqSoR%2Bh8CoLMFHWK%2Bk4dKTTA%3D)

## 6. 优化点

当正在进行区域轮播高亮显示是，如果鼠标移入可能会产生冲突问题，造成高亮区域的混乱，那么我们可以通过以下方案来解决：

监听鼠标的移入和移除时间，对轮播进行管理：

- 鼠标移入时，停止定时器
- 鼠标移除时，重新开始定时器

```js
// 鼠标划入
myChart.on('mouseover', () => {
  // 停止定时器
  clearInterval(intervalId)
  intervalId = null
  // 清除之前的高亮
  cancelHighlightRegion(currentIndex)
})
// 鼠标划出重新开始定时器
myChart.on('mouseout', () => {
  startInterval()
})
```

## 7. 总结

通过本文的简单实现方案，我们可以实现一个简单的地图区域自动高亮轮播，下面我们来简单总结一下要点：

- 通过 `dispatchAction` 方法来实现高亮和取消高亮，通过 `tooltip` 提示来展示区域名称，主要包括：`highlight`，`downplay`，`showTip`，`hideTip` 四个行为来分别实现

- 通过定时器 `setInterval` 来实现轮巡效果

- 注意通过 `dispatchAction` 方法实现的行为，必须引入提示框组件后才能使用

- 注意监听鼠标移入和移除时间，对轮播计时器进行管理，避免出现问题

## 源码演示，可直接复制使用

[jcode](https://code.juejin.cn/pen/7403240716752650280)

<ArticleFooter link="https://juejin.cn/post/7402444509154115596" />
