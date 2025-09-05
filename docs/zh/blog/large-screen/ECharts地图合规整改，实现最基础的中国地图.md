---
title: 分享ECharts地图合规整改经验，并实现一个最基础的中国地图
---

# 分享ECharts地图合规整改经验，并实现一个最基础的中国地图

## 前言

早在 2019 年的时候，我们公司就使用 ECharts 的开发了许多的可视化大屏项目，其中主要用到的组件有：**折线图**、**柱状图**、**饼图**、**坐标图**、**地图**、**线图**等等，这些图表也是我们在使用 ECharts 开发大屏项目中最常使用的图表类型，因此掌握这些图表的开发技巧是必不可少的。

但是，项目近期暴露出来的一个问题，中国地图展示不合规，需要整改，避免涉及一些法务问题。如下所示：

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb09d647fac546fbb796d0ff45588ab9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=627&h=420&s=123543&e=png&b=050f31" alt="image.png"  /></p>

以上的地图就是不规范的，可能不经常开发地图的不太容易察觉，因为 ECharts 的可视化社区里提供的 demo 展示基本上就是同样的效果。大部分 option 复制粘贴到自己项目中，修改一下就直接使用了，但是涉及到中国地图，我们就要注意了：需要修改为下面的效果才是正确的，必须要将将整个中国地图的领土边界范围描绘清楚！必须要将南海的领土边界描绘清楚。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21bdd88ebf8e467c856b737ba0f6082c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=593&h=440&s=94104&e=png&b=021021" alt="image.png"  /></p>

> 原则： 中国，一点都不能少

因此本篇文章的主要目的是总结项目经验，解决了中国地图展示不合规的问题，并输出一些经验，说明如何利用 ECharts 按照一套标准化的流程开发一个合规的中国地图。

## ECharts 简介

ECharts 是一个基于 JavaScript 的开源可视化图表库，提供了丰富的图表类型和交互功能。其中，地图组件是 ECharts 中非常实用的一个功能，可以帮助我们快速搭建数字信息可视化页面。

其中，在这些可视化组件中，地图组件是 ECharts 的一大亮点，使得在数据可视化中展示地理信息变得简单而直观。
本文将重点介绍如何利用 ECharts 地图组件展示中国地图的开发方法，包括加载地图、自定义地图样式以及添加各种数据标记等操作。

## 开发中国地图

为了开发中国地图展示，我们需要以下基本的步骤进行开发：

### 1. 获取 ECharts

在引入 ECharts 库之前，请确保你已经下载了最新版本的 ECharts，在项目中进行引入。 有以下几种引入方式

#### 从 GitHub 获取

在[apache/echarts](https://github.com/apache/echarts)  项目的  [release](https://github.com/apache/echarts/releases)  页面可以找到各个版本的链接。下载后导入本地项目中即可使用。

#### 从 npm 获取

```bash
npm install echarts
```

#### 从 CDN 获取

从第三方 CDN 网站 [cdnjs](https://cdnjs.com/libraries/echarts) 进行引入

### 2. 获取 geoJson

为了展示中国地图，你还需要下载中国地图的 JSON 数据文件。你可以在 ECharts 的官方网站或 GitHub 上找到并下载这些文件。

>特别注意：由于在之前开发地图的时候，项目中大部分 echarts 组件都是基于可视化社区 Demo 的基础上进行开发的，链接如下：
>
>[ECharts 可视化社区](https://www.makeapie.cn/echarts)
>
>其实这里的地图展示相对来说已经过时了，地图加载的 JSON 也已经过时了，大家可以进行参考但是需要慎用生产。

因此在以后的项目开发中，我们需要使用最新的 JSON 文件，那么我们需要在哪里进行获取呢？我们可以在一些其他网站获取最新的 geoJson，比如：通过[阿里云 DataV 数据可视化平台](https://datav.aliyun.com/portal/school/atlas/area_selector)也可以下载最新的 json 数据文件

如下图所示，选择数据版本后，点击页面上的下载按钮后即可以下载 json 文件

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbc0e54a906f465c9e337ba8984b20f8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1190&h=678&s=268279&e=png&b=f9f6f3)

### 3. 创建 HTML 页面并引入 ECharts

在 HTML 页面中创建一个容器元素，用于承载地图。然后，在页面头部或 scripts 部分引入 ECharts 库的 JavaScript 文件，确保可以正常使用 ECharts 的功能。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>中国地图</title>
  </head>
  <body>
    <!-- 主页面 -->
    <div id="main"></div>
    <!-- jquery 库 -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
    <!-- echarts 库 -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
  </body>
</html>
```

### 4. 注册地图

在 JavaScript 中，通过 ECharts 的 `setOption` 方法来配置地图组件，并指定使用中国地图。示例代码如下：

```javascript
// 初始化 ECharts 实例
const myChart = echarts.init(document.getElementById("main"));

echarts.registerMap("china", json);
```

以上代码中，我们首先初始化了一个 ECharts 实例，并指定了容器元素的 id。然后，通过 `setOption` 方法设置地图组件的相关配置，其中 `map` 属性指定了使用的地图类型为 "china"，即中国地图。

### 5. 设置 option

```javascript
const option = {
  // 地理坐标系组件用于地图的绘制
  geo: {
    // 使用 registerMap 注册的地图名称。
    map: "china",
  },
  series: [
    {
      type: "map",
      map: "china",
    },
  ],
};
myChart.setOption(option, true);
```

![record.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7682d3251314d6c8924640be914de92~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=840&h=719&s=83648&e=gif&f=28&b=fafafa)

## 个性化设置

ECharts 提供了丰富的配置选项，可以自定义地图的样式。你可以设置地图的**颜色**、**边框**、**选中样式**等，以便更好地展示地理数据。

### 1. 设置区域颜色

通过 `itemStyle` 属性设置了地图区域的颜色和边界的颜色。`label` 属性用于设置地图标注的字体颜色。

如下面代码所示：设置区域颜色为绿色，省份边界描边的颜色为蓝色

```javascript
myChart.setOption({
  geo: {
    // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
    label: {
      show: true,
      color: "#666666",
    },
    // 地图区域的多边形 图形样式。
    itemStyle: {
      // 地图区域的颜色
      areaColor: "#71d5a1", // 绿色
      // 图形的描边颜色
      borderColor: "#2979ff", // 蓝色
    },
  },
});
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0e4710849b8479cbd9ffd6f1af9b54d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=780&h=688&s=80486&e=png&b=ffffff)

### 2. 设置鼠标指向样式

通过 `emphasis` 属性设置高亮状态下的多边形和标签样式，`label` 属性用于设置地图标注的字体颜色

如下面代码所示：设置高亮状态下区域颜色为黄色，省份边界描边的颜色为深黄色，高亮字体为黄色

```javascript
myChart.setOption({
  geo: {
    // 设置高亮状态下的多边形和标签样式
    emphasis: {
      // 设置区域样式
      itemStyle: {
        areaColor: "#ffff99", // 黄色
        borderColor: "#f29100", // 描边颜色黄色
      },
      // 设置字体
      label: {
        fontSize: 16, // 16px
        color: "#f29100", // 黄色
      },
    },
  },
});
```

![record.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25c14969fe0e473f9ce5fb4670b22f28~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=879&h=699&s=151568&e=gif&f=37&b=fefefe)

### 3. 设置地图缩放及拖动支持

通过 `roam` 属性设置为`true`，来开启鼠标缩放和平移漫游。也可以设置成 `scale` 或者 `move`单独开启某一种效果。

如下面代码所示：开启鼠标缩放和平移漫游

```javascript
myChart.setOption({
  // 地理坐标系组件用于地图的绘制
  geo: {
    // 是否开启鼠标缩放和平移漫游。默认不开启。
    // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
    roam: true,
  },
});
```

![record.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70ff9743dcfa4e5680e69332a38f296e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1139&h=684&s=502774&e=gif&f=33&b=fefefe)

### 4. 添加数据标记

在地理信息可视化中，常常需要在地图上添加数据标记，以突出显示特定的地理数据。ECharts 地图组件提供了多种方式来添加数据标记。

以下是一个简单的示例：通过定义`scatter`来定义点位

```javascript
myChart.setOption({
  series: [
    {
      type: "map",
      map: "china",
      geoIndex: 0,
      roam: true,
    },
    {
      type: "scatter",
      coordinateSystem: "geo",
      data: [
        { name: "北京", value: [116.4074, 39.9042] },
        { name: "上海", value: [121.4737, 31.2304] },
        { name: "广州", value: [113.2644, 23.1292] },
        // 更多数据...
      ],
    },
  ],
});
```

通过上述代码，我们通过添加 `scatter` 类型的系列来实现数据标记。`coordinateSystem` 属性指定了使用地理坐标系进行定位。`data` 属性用于设置数据标记的位置，这里的数据以经纬度的形式表示。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb0bbb7f38a46bd8829f2801d51514b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=801&h=691&s=82119&e=png&b=ffffff)

## 总结

本篇文章简要介绍了使用 ECharts 地图组件展示中国地图数据的开发方法及开发流程。

从最基本的获取 ECharts 文件及 geoJson 到加载一个最简单的中国地图，再到自定义地图样式以及添加数据标记等操作。到这里，我们都应该了解了众多地图是如何开发渲染的，

当然，这只是最简单、最基础的开发地图的流程，ECharts 的配置项手册有大量的属性，提供给开发者来配置图表，通过合理运用 ECharts 的功能和配置选项，我们可以打造更加出色的中国地图展示效果。

## 源码

以上所用的所有代码已经上传到GitHub，有需要的同学可以下载参考：

[获取 GitHub 源码](https://github.com/anyup/juejin-up/tree/master/src/echarts)

## 参考文档

[ECharts 可视化社区](https://www.makeapie.cn/echarts)

[ECharts 官方网站](https://echarts.apache.org/zh/index.html)

[ECharts 配置项手册](https://echarts.apache.org/zh/option.html#title)

[ECharts 5 升级指南](https://echarts.apache.org/handbook/zh/basics/release-note/v5-upgrade-guide/)

<ArticleFooter link="https://juejin.cn/post/7313742254144880676" />
