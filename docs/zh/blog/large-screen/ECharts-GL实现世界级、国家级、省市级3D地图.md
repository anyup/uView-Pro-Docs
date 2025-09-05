---
title: ECharts-GL 实现世界级、国家级、省市级 3D 地图
---

# ECharts-GL 实现世界级、国家级、省市级 3D 地图

## 一. 前言

在数据可视化领域，二维地图早已司空见惯，它以直观的方式呈现数据关系，帮助我们理解复杂的信息。然而，在追求更优（高大上）用户体验的今天，传统的二维展示方式已经不满足客户的体验需求，同时平面图表也难以充分展现地理信息的丰富维度和空间关系。于是，三维数据可视化越来越受到广大用户的青睐。

**ECharts-GL**，作为 ECharts 家族的一员，更是专为三维数据可视化而生，它不仅继承了 ECharts 的易用性和高性能，还引入了 **WebGL** 技术，为用户提供了一个强大且直观的工具，用于创建令人惊叹的 3D 地图和数据可视化作品。

本篇文章，你将学习到如何利用 ECharts-GL 构建沉浸式的 3D 地图体验。并学习如何配置和定制地图的部分细节，包括**地形、光照、视角**以及**纹理**的三维表示。

通过本篇文章，你将学习到以下内容：

- 基础 3D 地图的实现逻辑
- 丰富 3D 地图的配置项
- 世界级、国家级、省市区级别 3D 地图展示

本篇文章既是 3D 地图的扫盲篇章，也是开启你从二维地图迈向三维世界的开端，让你从零到一，循序渐进的完整实现各种 3D 地图的渲染！

预览效果图如下图所示：

![map3D1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c36d11244cdc49c68668020018f823ad~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=528&s=1779696&e=gif&f=142&b=040829)

## 二. 准备 geoJson 数据

首先，我们需要准备多层级的地图数据，比如世界、国家、省份、城市等各级别的地理数据，以及每个区域对应的数据指标，这些数据通常是以 JSON 格式提供的地理信息数据。同时，确保数据格式符合 ECharts 的要求，可以参考官方文档了解各种地图类型的数据格式。

我们可以在一些其他网站获取最新的 geoJson，比如：我是通过[阿里云 DataV 数据可视化平台](https://datav.aliyun.com/portal/school/atlas/area_selector)下载最新的 json 数据文件，以保证目前所有市区的数据都是最新的。

如下图所示，选择数据版本后，点击页面上的下载按钮后即可以下载 json 文件:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbc0e54a906f465c9e337ba8984b20f8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1190&h=678&s=268279&e=png&b=f9f6f3)

也可以使用在线的 JSON API 接口获取数据，API 地址：

`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c5a07a861de462fb54971aa194b7641~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1594&h=478&s=49642&e=png&b=f3f4f6)

注意：**如遇 403 Forbidden 错误，请参考文章**：[巧用 meta 标签，设置 referrer 解决 403 Forbidden 问题](https://juejin.cn/post/7388072384349650959)

因为后面我会逐步实现世界级、国家级、城市级的 3D 地图，所以在这里我准备了这几个 json 文件，可以通过在线 API 获取：

- 世界地图 geoJson：https://code.juejin.cn/api/raw/7376489234334482483?id=7376489234334531635

- 中国地图 geoJson：`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full`

- 山东省地图 geoJson：`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=370000_full`

- 青岛市地图 geoJson：`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=370200_full`

准备好以上地图数据，接下来我们继续进行，最终实现世界地图，中国地图，山东省地图，青岛市地图等 3D 地图展示。

## 三. 初步实现 3D 地图

以中国地图 - 3D 地图的实现为例，接下来我们一步一步进行从零到一逐步丰富地图的显示

### 1. 加载 geoJson 数据

```js
const geoJson = '获取的的中国地图json'
const myChart = echarts.init(document.getElementById('main'))
// 注册地图名字(china)和数据(geoJson)
echarts.registerMap('china', geoJson)
// 图表配置项
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china'
    }
  ]
}
// 设置图表实例的配置项以及数据
myChart.setOption(option)
```

通过以上最基础的代码，就可以渲染出最基础的 3D 中国地图，如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fe58580d00a40eea54f74f615315b84~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=898&h=594&s=54365&e=png&b=f8f8f8)

### 2. 设置地图的颜色

`itemStyle` 主要用来设置三维地图中三维图形的视觉属性，包括颜色，透明度，描边等。

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      // 地图的颜色
      itemStyle: {
        color: '#286ECA', // 地图板块的颜色
        opacity: 1, // 图形的不透明度 [ default: 1 ]
        borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域
        borderColor: '#286ECA' // 图形描边的颜色。[ default: #333 ]
      }
    }
  ]
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b9d35d5d6d8407ab472eaf43c7bf799~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=600&s=73209&e=png&b=ffffff)

### 3. 设置标签显示

`label` 主要用来配置地图上的城市名称是否显示标签，同时对标签的显示格式、显示样式进行配置

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      // 标签的相关设置
      label: {
        show: true, // (地图上的城市名称)是否显示标签
        distance: 5,
        formatter: function (params) {
          return params.name ? params.name : ' '
        },
        textStyle: {
          // 标签的字体样式
          color: '#fff', // 地图初始化区域字体颜色
          fontSize: 8 // 字体大小
        }
      }
    }
  ]
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3f665aa2c2e4f46bb3f8510e793c3a9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=609&s=102950&e=png&b=ffffff)

### 4. 设置鼠标 hover 高亮效果

`emphasis` 主要用来设置鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label 和 itemStyle 的样式)

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      // 鼠标 hover 高亮时图形和标签的样式
      emphasis: {
        label: {
          // label 高亮时的配置
          show: true,
          textStyle: {
            color: '#fff', // 高亮时标签颜色变为 白色
            fontSize: 15 // 高亮时标签字体 变大
          }
        },
        itemStyle: {
          // itemStyle 高亮时的配置
          color: '#66ffff' // 高亮时地图板块颜色改变
        }
      }
    }
  ]
}
```

![map3D-2.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b57688cbe004c05879339cee897e3ce~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=578&s=156673&e=gif&f=33&b=fefefe)

### 5. 设置 tootip

`tooltip` 为提示框组件，它的设置属于 `ECharts` 的基础配置项，提示框组件可以设置在多种地方，主要作用为当鼠标鼠标悬浮到地图上时，提示框浮层的显示效果，详细配置参考文档：[ECharts tooltip](https://echarts.apache.org/zh/option.html#tooltip)

```js
const option = {
  tooltip: {
    trigger: 'item',
    position: 'inside',
    formatter: '{b}',
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    textStyle: {
      color: '#FFFFFF',
      textalign: 'center',
      fontSize: '12px'
    }
  },
  series: [
    {
      type: 'map3D',
      map: 'china'
    }
  ]
}
```

![map3D-3.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/671e166bcf5f43a6bd0ad15cd4eb413a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=578&s=287447&e=gif&f=37&b=fefefe)

## 四. 丰富 3D 地图的配置

### 1. 环境贴图

环境贴图 `environment` 主要支持 3 种配置方式，支持纯颜色值，渐变色，全景贴图的 url。默认为 'auto'

简单说：环境贴图可以看作是地图的底层背景。

- 配置为全景贴图
  - `environment: 'asset/environment.png'`
- 配置为纯黑色的背景
  - `environment: '#000'`
- 配置为垂直渐变的背景
  - 通过 `new echarts.graphic.LinearGradient` 来配置

> 注意：在配置有 `light.ambientCubemap.texture` 的时候会使用该纹理作为环境贴图。否则不显示环境贴图。

在这里，我们使用垂直渐变的背景色来配置

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      // 环境贴图，支持純颜色值，渐变色，全景贴图的 url。默认为 'auto'
      environment: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            // 配置为垂直渐变的背景
            offset: 0,
            color: '#183890' // 天空颜色
          },
          {
            offset: 0.7,
            color: '#040829' // 地面颜色
          },
          {
            offset: 1,
            color: '#040829' // 地面颜色
          }
        ],
        false
      )
    }
  ]
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1aef174f4584b069e87ac8ab268e02b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1540&h=1116&s=330290&e=png&b=0c1354)

### 2. 设置地面

`groundPlane` 主要用来配置地面，可以让整个组件有个“摆放”的地方，从而使整个场景看起来更真实，更有模型感。

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      // 地面可以使整个场景看起来更真实，更有模型感。
      groundPlane: {
        show: true, // 是否显示地面
        color: '#aaa' // 地面颜色
      }
    }
  ]
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8afa9f1afba47fc80e97b447014214d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1908&h=1104&s=270735&e=png&b=8f8f8f)

### 3. 设置光照

`light` 主要用来配置关照，主要有：场景主光源、全局环境光等，合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      // 光照相关的设置
      light: {
        main: {
          // 场景主光源的设置，在 globe 组件中就是太阳光。
          color: '#3D94CE', // 主光源的颜色。
          intensity: 1.2, // 主光源的强度。
          shadow: false, // 主光源是否投射阴影。默认关闭。开启阴影可以给场景带来更真实和有层次的光照效果。会增加程序的运行开销。
          shadowQuality: 'high', // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
          alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
          beta: 10 // 主光源绕 y 轴，即左右旋转的角度。
        },
        ambient: {
          // 全局的环境光设置。
          color: 'red', // 环境光的颜色。[ default: #fff ]
          intensity: 0.5 // 环境光的强度。[ default: 0.2 ]
        }
      }
    }
  ]
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e376d3f0cd60462f98c16ebc781a06b9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1480&h=1162&s=320616&e=png&b=0c1351)

> 注意：在 shading 为 'color' 的时候无效。 光照的设置会影响到组件以及组件所在坐标系上的所有图表。

### 4. 设置视角控制

`viewControl` 的配置主要用于鼠标的旋转，缩放等视角控制。

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      viewControl: {
        projection: 'perspective', // 投影方式
        autoRotate: true, // 是否开启视角绕物体的自动旋转查看
        autoRotateDirection: 'cw', // 物体自传的方向。默认是 'cw'，也可以取 'ccw'
        autoRotateSpeed: 10, // 物体自传的速度。角度 / 秒
        autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔
        damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子
        distance: 120, // 默认视角距离主体的距离
        alpha: 40, // 视角绕 x 轴，即上下旋转的角度
        beta: 0, // 视角绕 y 轴，即左右旋转的角度
        center: [0, 0, 0], // 视角中心点
        animation: true, // 是否开启动画
        animationDurationUpdate: 1000, // 过渡动画的时长
        animationEasingUpdate: 'cubicInOut' // 过渡动画的缓动效果
      }
    }
  ]
}
```

以上代码设置了开启了自动旋转，如下图所示：

![map3D-4.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcec04dc526247518d86ea67ec1fb107~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=578&s=1614323&e=gif&f=46&b=122271)

### 5. 设置纹理

在使用 `echarts-gl` 绘制 3D 地图时，为了增强地图的真实感，你可以设置纹理和光照效果。同时配合 `light` 和 `postEffect` 使用可以让展示的画面效果和质感有质的提升。

下面我们具体来看一下简单示例：

```js
const option = {
  series: [
    {
      type: 'map3D',
      map: 'china',
      // 三维图形的着色效果
      shading: 'realistic',
      // 真实感材质相关的配置项
      realisticMaterial: {
        detailTexture: './img/texture.png', // 纹理图片
        textureTiling: 1
      },
      // 后处理特效
      postEffect: {
        enable: true,
        SSAO: {
          enable: true,
          radius: 1,
          intensity: 1,
          quality: 'high'
        },
        bloom: {
          enable: true,
          strength: 0.5,
          radius: 0,
          threshold: 0
        },
        FXAA: {
          enable: true,
          alpha: 0.5
        }
      },
      // 光照设置
      light: {
        main: {
          color: '#3D94CE',
          intensity: 1.2,
          shadow: false,
          shadowQuality: 'high',
          alpha: 55,
          beta: 10
        },
        ambient: {
          color: '#fff',
          intensity: 0.5
        }
      }
    }
  ]
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbb3ccd81a3c4019be22c8e8ff904f92~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1652&h=1160&s=1316302&e=png&b=aaa9a9)

## 五. 显示不同级别的 3D 地图

通过上面的配置，地图的渲染效果已经逐渐有了效果还算不错的 3D 雏形，如果后续我们想要更好的视觉效果，可以参考官方文档配置项，一步步开发更加震撼的 3D 效果。

有了以上的配置项之后，接下来我们看一下如何进行渲染不同级别的地图，主要原理在于：根据不同的 geoJson 渲染不同的地图模型即可。

### 1. 世界级别

加载世界级的 geoJson 即可展示 3D 世界地图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce20c1ba64544b318d9d18d10234479b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2120&h=1000&s=407749&e=png&b=050b2f)

> 注意：在渲染世界地图的时候，出现了一个奇怪的问题，在配置世界地图上的国家名称时出现了错误，下述说明

### 2. 国家级别

加载国家级的 geoJson 即可展示 3D 国家版地图，例如：中国地图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b76f9a4a47ff40dc9a89ed05dbbefb0b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1600&h=1164&s=240208&e=png&b=050a2e)

### 3. 省份级别

加载省份级的 geoJson 即可展示 3D 省份地图，例如：山东省地图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46007fae16804adcb4b0e232f2e082b9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1826&h=1036&s=196998&e=png&b=050b30)

### 4. 市区级别

加载市区级的 geoJson 即可展示 3D 市区地图，例如：青岛市地图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2b4d5c4fa0140c5ad06ae034ec5f506~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1604&h=1158&s=145732&e=png&b=04082b)

省级和城市级地图可能需要额外的处理，例如缩放和定位，以确保地图在 3D 视图中正确显示。此外，由于 echarts-gl 的设计，一些地图数据可能需要额外的调整才能在 3D 模式下正确渲染。

> 请注意：每个地图的 map 属性应该匹配你注册的地图数据的名称，如果你自己创建了地图数据并注册到 ECharts，那么 map 的值应该是你注册时所使用的名称。

最终预览效果图如下图所示：

![map3D1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c36d11244cdc49c68668020018f823ad~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=528&s=1779696&e=gif&f=142&b=040829)

## 六. 遇到的问题

### 1. 世界地图渲染国家名称 bug

当配置地图上显示国家或城市名称时，我们只需要配置 `label.show` 为 `true` 即可，但是当我配置世界地图显示国家名称时，却出现了意外情况。

国家名称不显示，然而控制台还打印了警告信息，如下图所示：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a4fe92be526d4125aa74651439285f57~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033654&x-orig-sign=NpMWDCh1UX2ZNopKLt53j0GLwGQ%3D)

那我们来搜一下，这是个什么错误，应该怎么解决？在经过了一系列的查询之后，终于在 github 官方 issue 下找寻到了同样的问题。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/31b57a3bf0b240758d59385f4e001dbd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033654&x-orig-sign=QQuecXZb1sPLsTX22N0OkfPWixU%3D)

github 朋友们也给出了解决方案，如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/32e6c831ff8a4f8088bfed7d8a6454cf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033654&x-orig-sign=WaTmomVMk28PC1JPlCTNKa1EFEM%3D)

我后来又查询了一下，世界地图的 geoJson 数据确实有两条 name 为空的数据，过滤一下即可得到以下异常数据：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/dcb951f7b5f74c688b22b77472950ebc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726033654&x-orig-sign=hlERkBBQj05GKy%2FWowtXbxD%2FNzI%3D)

## 七. 码上掘金演示

所有代码片段已上传至码上掘金，复制源码即可运行，部分代码已添加注释，感兴趣的掘友可参考，如下所示：

[jcode](https://code.juejin.cn/pen/7386861652676706341)

## 八. 总结

通过本篇文章的介绍，相信我们大家都掌握了如何使用 ECharts 和 ECharts-GL 来构建世界级、国家级以及省市级的 3D 地图，更重要的是，本篇文章也是开启你从二维地图迈向三维世界的开端，让你从零到一，循序渐进的完整实现各种 3D 地图的渲染！

ECharts-GL 不仅提供了强大的 3D 渲染引擎，还支持高度定制化的地图样式和动态交互，使得数据可视化不再局限于图表和表格，因此在接下来的文章中，我将继续探索 ECharts-GL 在 3D 可视化大屏中的的应用，敬请关注！

## 九. 参考文档

- [echarts-gl 官方文档](https://echarts.apache.org/zh/option-gl.html)

<ArticleFooter link="https://juejin.cn/post/7388281982985699363" />
