---
title: ECharts-GL 实战：轻松实现 3D 旋转地球
---

# ECharts-GL 实战：轻松实现 3D 旋转地球

## 一. 前言

在数据可视化的世界中，**3D** 旋转地球是一个令人着迷的高大上展示方式，它不仅能够呈现地球的外观，还能让我们以独特的视角观察地球上的各种信息。

**ECharts-GL** 作为一款强大的可视化库，为我们实现 **3D** 旋转地球提供了简洁而高效的方式。通过其丰富的功能和灵活的配置选项，我们可以轻松地将地球呈现为一个栩栩如生的 3D 模型，并实现自由的旋转和交互。

在本篇文章中，我将向大家逐步介绍如何使用 **ECharts-GL** 最简洁的代码来创建一个 3D 旋转地球。我们将了解到 **ECharts-GL** 的一些基本概念和使用流程，以及如何利用其提供的工具和选项来定制地球的外观和行为。

通过简洁的代码示例，你可以看到如何快速搭建起一个 **3D** 旋转地球的框架，并了解到如何添加自己的数据和交互功能，让地球变得更加有趣和实用。

提前预览一下效果图，本文要实现的 **3D** 旋转地球效果如下图所示：

![globe.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2163f8da3cf4091ba16032af6028844~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=924&h=550&s=4243894&e=gif&f=74&b=121c4d)

## 二. 了解 ECharts-GL

### 1. 初识 ECharts-GL

**ECharts-GL** 是一个基于 `JavaScript` 的 **3D** 可视化库，它构建在 `ECharts` 的基础上，提供了更强大的 **3D** 绘图能力。**ECharts-GL** 扩展了 `ECharts` 的功能，使得我们能够创建丰富的 **3D** 可视化效果。

### 2. ECharts-GL 能干什么

通过 **ECharts-GL**，你可以以交互的方式展示和探索数据，它支持各种**几何体**、**材质**、**光照**和**动画**效果。这使得你可以创建逼真的 **3D 场景**，如**地球仪**、**城市地图**、**建筑模型**等。

该库提供了丰富的 API 和文档，方便开发者进行定制和集成。它具有高效的渲染性能和良好的兼容性，可以在各种现代浏览器中运行。

简言之，**ECharts-GL** 能够实现以下功能：

1. **绘制 3D 图形**：如 **3D 柱状图**、**3D 折线图**等。

2. **创建 3D 场景**：包括**地球**、**星空**等。

3. **支持多种交互方式**：如**旋转**、**缩放**、**平移**等。

### 3. ECharts-GL 与 ECharts

**ECharts-GL** 与 `ECharts` 有着密切的关系：

1. **ECharts-GL** 是 ECharts 的扩展，它继承了 ECharts 的优势和特性。

2. 使用 **ECharts-GL** 可以充分利用 ECharts 丰富的功能和社区资源。

3. **ECharts-GL** 为 ECharts 增添了 3D 可视化的能力，使其在数据展示方面更加多样化。

**ECharts-GL** 是一个强大的工具，可用于创建 3D 可视化应用程序。如果你也对 3D 数据可视化感兴趣，并且十分熟悉 ECharts，那么 **ECharts-GL** 则是你值得探索的选择。

## 三. 构建 3D 地球

### 1. 导入 ECharts-GL

**ECharts-GL** 的 npm 地址：[echarts-gl npm](https://www.npmjs.com/package/echarts-gl)

#### npm 安装

```bash
npm install echarts
npm install echarts-gl
```

#### cdn 使用

```html
<!-- echarts 库 -->
<script src="https://unpkg.com/echarts@5.4.3/dist/echarts.min.js"></script>
<!-- echarts-gl 库 -->
<script src="https://unpkg.com/echarts-gl@2.0.9/dist/echarts-gl.min.js"></script>
```

#### 导入项目中

```js
import * as echarts from 'echarts'
import 'echarts-gl'
```

### 2. 初始化 ECharts-GL

首先，我们先来了解一下 **ECharts-GL** 都提供了哪些配置，换句话说，了解好这些配置能够帮助我们来实现什么 3D 效果？

- `globe`：地球组件。组件提供了地球的绘制以及相应的坐标系。

- `geo3D`：三维的地理坐标系组件。组件提供了三维 GeoJSON 的绘制以及相应的坐标系，

- `mapbox3D`：基于 mapbox-gl-js 的地理组件。

- `grid3D`：三维笛卡尔坐标系组件。需要和 xAxis3D，yAxis3D，zAxis3D 三个坐标轴组件一起使用。

- `xAxis3D`：三维笛卡尔坐标系中的 x 轴。

- `yAxis3D`：三维笛卡尔坐标系中的 y 轴。

- `zAxis3D`：三维笛卡尔坐标系中的 z 轴。

- `series`： 系列列表。每个系列通过 type 决定自己的图表类型。

以上是 **ECharts-GL** 中主要的可配置对象，通过配置这些不同的对象，可以实现丰富的 3D 效果。

因为本篇文章还是主要介绍关于 `globe` 地球组件的相关配置，因此我们主要打交道的是 `globe` 对象，如下所示：

```html
<div id="main"></div>

<script>
  var globeChart = echarts.init(document.getElementById('main'))
  globeChart.setOption({
    globe: {}
  })
</script>
```

通过以上简单的代码，就可以实现 3D 地球的初始模型，虽然有点丑，如下图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cda5cd619ce4803a4e4bdeb69542013~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=821&h=498&s=294460&e=png&b=3d3d3d)

接下来我们继续对它进行美化，所有的配置都基于 globe 配置项参数进行的美化！

### 3. 一些基本配置

本文主要介绍一些关于 `globe` 球体的一些基本配置，目的是让大家能够轻松快捷的实现一个 3D 地球，主要涉及到以下配置参数：

- `globe.baseTexture`：地球的纹理设置。

- `globe.environment`：地球的环境图片，类似于背景。

- `globe.light`：地球的光照相关的设置。

- `globe.viewControl`：用于鼠标的旋转，缩放等视角控制。

当然，关于 `globe` 的相关配置参数有很多，这里无法进行一一介绍，只介绍几个重点的来进行相关配置。

如果你想要详细了解相关参数，可以查看官方文档，官方文档有更详尽的参数配置说明：[echarts-gl 官方文档](https://echarts.apache.org/zh/option-gl.html#globe)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe69dcd29211407db032fe373cd26bd5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1105&h=516&s=99688&e=png&b=fefefe)

#### 设置纹理图片

`globe.baseTexture` 主要用于地球的纹理设置。支持图片路径的字符串，图片或者 Canvas 的对象。

```js
// 设置图表的选项
globeChart.setOption({
  globe: {
    baseTexture: 'asset/bg-earth.jpg'
  }
})
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3142ff7957234be59dd70f394d44f7f8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=935&h=482&s=540983&e=png&b=132249)

#### 设置环境纹理图片

`globe.environment` 环境贴图。支持纯色、渐变色、全景贴图的 url。默认为 'auto'

```js
// 设置图表的选项
globeChart.setOption({
  globe: {
    environment: 'asset/starfield.jpg'
  }
})
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9da95872eff543319d8faad87f5cc942~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=972&h=494&s=205146&e=png&b=000000)

#### 设置光照

`globe.light` 主要用于地球的光照设置，光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。

> 注意：光照相关的设置。在 shading 为 'color' 的时候无效。

```js
// 设置图表的选项
globeChart.setOption({
  globe: {
    light: {
      // 主光强度
      main: {
        intensity: 1,
        // 是否产生阴影
        shadow: true
      },
      // 环境光强度
      ambient: {
        intensity: 0.6
      }
    }
  }
})
```

#### 视图控制配置

`globe.viewControl` 用于鼠标的旋转，缩放等视角控制。

```js
globeChart.setOption({
  globe: {
    // 视图控制配置
    viewControl: {
      // 初始视点位置
      center: [0, 0, 0],
      // 初始纵横轴旋转角度（垂直角度）
      alpha: 20,
      // 初始纵横轴旋转角度（水平角度）
      beta: 50,
      // 是否自动旋转
      autoRotate: true,
      // 鼠标静止后自动旋转的时间间隔
      autoRotateAfterStill: 5,
      // 视角距离
      distance: 200,
      // 自动旋转速度
      autoRotateSpeed: 15
    }
  }
})
```

![globe-1.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27a1ef719262407db306adabb6c364f6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=945&h=481&s=2801648&e=gif&f=58&b=010101)

## 四. 定制地球外观

以上我们使用的是地球的纹理图片作为整个地球的纹理背景，这种方式虽然是方便的，但是如果我们要做一些国家的交互功能，比如：数据展示、手势交互等，使用以上的方式可能不容易实现。

因此官方也提供了另一种方式：`globe.baseTexture` 支持直接使用 `ECharts` 的实例作为纹理，此时在地球上的鼠标动作会跟纹理上使用的 `ECharts` 实例有联动。

接下来我们继续来看一下：

### 1. 注册地图

注册世界地图，需要世界地图的 json 数据，因此我们首先需要准备好 json 数据，准备好以后可以直接使用 registerMap 方法进行注册。

> 说明：世界地图的 json 数据将在文末提供

```js
// 注册地图
echarts.registerMap('world', data)
```

### 2. 构建 ECharts 世界地图

1. 创建 `canvas` 元素。

2. 初始化 `ECharts `实例，并将其绑定到创建的 `canvas` 元素上。

3. 设置 `ECharts` 实例的配置选项。

在指定的 `canvas` 元素上显示一个世界地图，并可以进行后续的地图相关操作和数据展示。

```js
// 使用 echarts 绘制世界地图的实例作为纹理
var canvas = document.createElement('canvas')
var mapChart = echarts.init(canvas, null, {
  width: 4096,
  height: 2048
})
mapChart.setOption({
  geo: {
    type: 'map',
    map: 'world',
    // 绘制完整尺寸的 echarts 实例
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boundingCoords: [
      [-180, 90],
      [180, -90]
    ]
  }
})

// 设置图表的选项
mapChart.setOption({
  globe: {
    baseTexture: mapChart
  }
})
```

在以上的配置选项中，对几个重要的属性解释一下：

- `geo`属性表示地理相关的配置。
- `type`属性指定为地图类型。
- `map`属性设置为世界地图。
- 通过设置`top`、`left`、`right`和`bottom`属性，将地图绘制在`canvas`元素的整个区域。
- `boundingCoords`属性指定了地图的边界坐标范围。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd1bb8e5736f4bccbec2a86f4c48ace7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=958&h=481&s=110952&e=png&b=333333)

### 3. 鼠标指向高亮

定义地图元素在不同状态下的颜色、边框和标签显示等样式，添加鼠标指向地图区域时，国家的高亮显示，以提供更好的可视化效果和用户交互体验。

```js
// 设置图表的选项
mapChart.setOption({
  geo: {
    itemStyle: {
      borderWidth: 1,
      normal: {
        // 未选中状态
        borderColor: 'rgba(255,255,255,0.7)',
        areaColor: 'rgba(0, 90, 171, 1)',
        label: {
          show: false
        }
      }
    },
    // 设置高亮状态下的多边形和标签样式
    emphasis: {
      // 设置区域样式
      itemStyle: {
        areaColor: '#602bdd', // 高亮区域颜色
        borderColor: '#f29100' // 描边颜色
      }
    }
  }
})
```

对以上代码的部分配置解释一下：

1. `geo` 对象中的 `itemStyle` 部分：

   - `borderWidth: 1`：设置地图元素的边框宽度为 1。
   - `normal` 对象定义了未选中状态下的样式：
     - `borderColor: "rgba(255,255,255,0.7)"`：设置边框的颜色为半透明的白色。
     - `areaColor: "rgba(0, 90, 171, 1)"`：设置区域的颜色为一种蓝色。
     - `label` 对象的 `show: false` 表示不显示标签。

2. `emphasis` 对象用于设置高亮状态下的样式：
   - `itemStyle` 对象中的 `areaColor: "#602bdd"` 定义了高亮区域的颜色。
   - `borderColor: "#f29100"` 设置了描边的颜色为橙色。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91df63804e17433d98a96f9cff3016ea~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=906&h=465&s=135829&e=png&b=333333)

### 4. 加点数据

在之前的地图配置基础上添加了一个散点系列（`scatter`)，添加了一个散点数据，并设置了其在地图上的显示样式和标签信息。

> 注意：这些散点可以根据你的实际数据需求进行自定义和更新，比如数据是试试获取的，等到获取成功后再此更新图表，可以提升用户体验！

```js
mapChart.setOption({
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      label: { show: true },
      data: [
        {
          value: [103.012761, 33.113421],
          label: {
            color: 'rgba(25, 228, 253, 1)',
            fontSize: 12,
            fontWeight: 'bold',
            formatter: 'GDP：126.06万亿元'
          }
        }
      ]
    }
  ]
})
```

上述代码主要是在 `series` 数组中添加了一个对象，指定某个地区的经纬度，显示数据的配置信息：

- `type: "scatter"`：指定系列类型为散点。
- `coordinateSystem: "geo"`：表示该散点系列在地理坐标系中展示。
- `label: { show: true }`：显示数据点的标签。
- `data` 数组定义了数据点的信息：
  - 每个数据点具有 `value` 属性，包含经度和纬度坐标。
  - `label` 对象设置了标签的样式，包括颜色、字体大小、字体粗细和格式化函数。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a83033c48c6d43dda18199ad940c5105~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=915&h=494&s=151258&e=png&b=333333)

### 5. 最终效果图预览

按照以上的流程示例，可以实现以下的效果图，主要实现了功能如下：

- 3D 球体的展示
- 基于 `ECharts` 世界地图 json 实现地球纹理展示
- 地球手势支持：旋转，放大，指向高亮
- 光照设置
- 数据展示

![globe-2.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73d7c75622bd424fa20686ed50ff8c09~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=985&h=546&s=4946005&e=gif&f=80&b=111b49)

### 6. 码上掘金演示

[jcode](https://code.juejin.cn/pen/7376489234334482483)

## 五. 总结

通过以上的流程演示，我们一步步循序渐进，相信大家都有了一个清晰的认识，使用 **ECharts-GL**，通过少量的配置和关键的函数调用，能够轻松创建一个逼真的 **3D** 地球模型，并实现其自由旋转，使我们能够以更直观和吸引人的方式呈现地理信息。

**ECharts-GL** 的灵活性还允许我们进一步定制地球的外观、添加数据和交互功能，以满足不同的需求。无论是在地理信息展示、数据大屏可视化、全球信息统计还是其他领域，**3D** 旋转地球都能为用户带来独特的视觉体验。

当然，本文实现的地球功能并不复杂，然而却有意想不到的视觉效果，因此只要按照文档配置，相信你也可以通过使用 **ECharts-GL** 实现令人惊叹的 **3D** 可视化效果。

本文也只是抛砖引玉，这次的 **3D** 旋转地球示例只是其众多功能的一个展示，希望能激发大家进一步探索 **ECharts-GL** 的潜力，创造出更多丰富精彩的可视化作品。

## 源码

[参考源码](https://code.juejin.cn/api/raw/7376489234334482483?id=7376489234334498867)

[世界地图 JSON 数据](https://code.juejin.cn/api/raw/7376489234334482483?id=7376489234334531635)

## 文档链接

[echarts-gl 官方文档](https://echarts.apache.org/zh/option-gl.html#globe)

[echarts-gl npm](https://www.npmjs.com/package/echarts-gl)

<ArticleFooter link="https://juejin.cn/post/7376213569442824203" />
