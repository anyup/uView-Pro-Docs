---
title: ECharts-GL 实战：教你轻松实现 3D 地图下钻功能
---

# ECharts-GL 实战：教你轻松实现 3D 地图下钻功能

## 一. 前言

在做可视化大屏项目中，**地图下钻**功能是常被用户提出来要做的功能，其主要功能是指在地图上点击某个区域后，该区域会进一步细化展示其下一级别的地图信息，

例如：从国家地图，点击某省份下钻到省级地图，再点击市区下钻到市级地图，再到区县级地图，主要目的通过点击进入不同的省市区进而联动不同省市区界别，展示相关的数据在大屏上，这种逐级细化的过程有助于更细致地分析和理解地区数据。

地图下钻是和用户进行交互的功能，可以使用户能够深入地图的不同层级，查看更加详细的地图层级数据，帮助用户逐层深入地查看不同区域或层级的数据分布情况，增强了数据可视化的深度和用户体验。

此前，我写过一篇文章详细介绍了 ECharts 2D 地图下钻功能的实现，详细参考：[ECharts 地图实战分析：实现一个完整的地图下钻功能](https://juejin.cn/post/7345297984264863782)

因此，今天的文章主要目的是实现一款效果还算不错的 3D 地图下钻功能。

提前预览一下效果图吧，文末给出源码以及演示地址，各位倔友们满意请**点赞收藏**，感谢！

![3D-map-1.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a5d45c44a12a4644aafe45ad682492bb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727688670&x-orig-sign=ZDyobbGz%2B%2BRdr3FlpAiM7%2BKje48%3D)

## 二. 实现 3D 地图

本文所实现的 3D 地图主要使用 ECharts 和 ECharts-GL 构建，ECharts-GL 相当于是 ECharts 的扩展插件，主要用于创建 3D 可视化应用程序，因此使用 ECharts 搭配 ECharts—GL 插件库就可以构建出 3D 地图。

在这里，我们也简单总结一下如何使用 ECharts + ECharts-GL 实现一款还不错的 3D 地图：

- 引入 ECharts 和 ECharts-GL 开源库
- 准备 geoJson 层级数据
- 初始化 3D 地图，根据所需的 geoJson 数据渲染地图
- 丰富地图 3D 效果：包括地图颜色、标签、鼠标指向、提示等基础配置，环境贴图、地面、光照、纹理、视角控制等丰富配置

### 1. 引入 ECharts 和 ECharts-GL

下载合适版本的 ECharts 和 ECharts-GL，在项目中进行引入，有以下几种引入方式：

**从 GitHub 获取**

在[apache/echarts](https://github.com/apache/echarts)  项目的  [release](https://github.com/apache/echarts/releases)  页面可以找到各个版本的链接。

在[ecomfe/echarts-gl](https://github.com/ecomfe/echarts-gl)  项目的  [release](https://github.com/ecomfe/echarts-gl/releases)  页面可以找到各个版本的链接。

下载后导入本地项目中即可使用。

**从 npm 获取**

```bash
npm install echarts
npm install echarts-gl
```

**从 CDN 获取**

从第三方 CDN 网站进行引入，例如：cdnjs

[echarts](https://cdnjs.com/libraries/echarts)

[echarts-gl](https://cdnjs.com/libraries/echarts-gl)

> 本文示例代码使用的库版本是：echarts：5.4.3，echarts-gl：2.0.9

### 2. 准备 geoJson 数据

在测试阶段，我们可以使用一些第三方网站已有的最新 geoJson 数据进行调试，比如：通过阿里云 DataV 数据可视化地图小工具，可以请求最新的 json 数据文件进行调试：

[阿里云 DataV.GeoAtlas 地理小工具](https://datav.aliyun.com/portal/school/atlas/area_selector)

它提供了一些 JSON API 可以通过远程调用，比如，请求中国地图的 geoJson 数据

```js
axios.get('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full').then(res => {
  // 请求完成的中国地图 geoJson 数据
})
```

如果你在请求【阿里云 DataV 数据平台】的接口，出现了 403 Forbidden 的问题，请参考以下文章进行解决：

[巧用 meta 标签，设置 referrer 解决 403 Forbidden 问题](https://juejin.cn/post/7388072384349650959)

注意：建议本地调试可以使用阿里云的地理数据 API，如果要上线发布正式版，建议下载下所有的 geoJson 文件，放在自己服务器下。我已经整理好了最新一版的 geoJson 数据，需要的可以进行下载：

点击下载按钮即可下载：[全国地图下钻 geoJson 完整版下载 20240312.zip](https://github.com/anyup/juejin-up/blob/master/plugins/%E5%85%A8%E5%9B%BD%E5%9C%B0%E5%9B%BE%E4%B8%8B%E9%92%BB%20geoJson%20%E5%AE%8C%E6%95%B4%E7%89%88%2020240312.zip)

![Snipaste_2024-07-12_15-28-54.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4b62bf0e121747768bf302a9713ac970~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727688670&x-orig-sign=P8%2BbdTo8lQ6tO%2F%2F%2FWaH63K5%2FOgo%3D)

### 3. 开发基础 3D 地图

根据上一步，我们已经获取到所有的 geoJson 数据，接下来我们实现完整的一个 3D 地图，以中国地图为例：

在这里，如何详细的从零到一实现一个 3D 版中国地图，不再过度讲解了，因为上篇文章已经详细的实现了 3D 版的世界地图、中国地图以及省市级地图，请查看上一篇文章：[使用 ECharts-GL 实现世界级、国家级、省市级 3D 地图](https://juejin.cn/post/7388281982985699363)

接下来我们简单总结一下，要实现一款效果还算不错的 3D 地图，只需要以下配置即可：

```js
const geoJson = '获取的的中国地图json'
const myChart = echarts.init(document.getElementById('main'))
// 注册地图名字(china)和数据(geoJson)
echarts.registerMap('china', geoJson)
// 图表配置项
const option = {
  tooltip: {}, // 提示框组件，指向地图该如何提示
  series: [
    {
      type: 'map3D',
      map: 'china',
      itemStyle: {}, // 地图的区域颜色
      label: {}, // 标签的相关设置
      emphasis: {}, // 鼠标 hover 高亮时图形和标签的样式
      environment: 'auto', // 环境贴图
      groundPlane: {}, // 设置地面，地面可以使整个场景看起来更真实，更有模型感。
      light: {}, // 光照相关的设置
      viewControl: {}, // 设置视角控制
      shading: 'realistic', // 三维图形的着色效果
      realisticMaterial: {}, // 真实感材质相关的配置项
      postEffect: {}, // 后处理特效
      data: [] // 数据，重要
    }
  ]
}
// 设置图表实例的配置项以及数据
myChart.setOption(option)
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b76f9a4a47ff40dc9a89ed05dbbefb0b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1600&h=1164&s=240208&e=png&b=050a2e)

## 三. 实现 3D 地图下钻

有了以上的效果，接下来我们从零开始实现 3D 地图的下钻功能

- 准备层级数据（包括中国、各省市区的 geoJson 数据）
- 设置地图点击事件，当点击地图区域时，获取到该区域对应的 geoJson 数据
- 根据区域 geoJson 数据渲染区域地图

### 1. 设置地图点击事件

首先需要给地图添加点击事件监听器，当用户点击地图时，获取到用户点击该区域对应的编码。

```js
myChart.on('click', function (params) {
  if (params.data) {
    const { adcode, name, level } = params.data
  }
})
```

在这里有一个前提，我们在点击地图某区域时，能获取到该区域 adcode 的前提是：在渲染地图时，提前赋值了数据（在 series.data 中赋值），例如如下代码：

```js
const option = {
  series: [
    {
      data: geoJson.features.map(item => {
        return item.properties
      })
    }
  ]
}
```

有了以上代码的设置，即可正常获取到 adcode, name, level 等数据。

当我们点击地图区域时，以点击山东省为例，会输出如下图所示的数据，则证明我们的数据正常。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/983f632ca8584a01b0a08a6f32aef487~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727688670&x-orig-sign=MRk1FJFOs57m0df7YkRA3X%2BS7AU%3D)

### 2. 获取区域地图 JSON

根据上面的点击，获取到点击区域的地理编码 `adcode` 和名称，接下来需要通过 `adcode` 来获取子区域的 geoJson，以下的代码是通过调用阿里云 DataV 在线的 JSON API 接口获取到的数据。

```js
// 根据 adcode 获取原始地图json数据
function getJSON(adcode) {
  return axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`)
}
// 例如：根据 adcode 获取省市区的 json 数据
// 获取山东省下的所有市的数据
getJSON('370000').then(res => {
  console.log('山东省子区域地图数据：', res)
})

// 获取青岛市下的所有区级数据
getJSON('370200').then(res => {
  console.log('山东省子区域地图数据：', res)
})
```

### 3. 渲染区域地图

通过上述操作，我们成功的获取到了点击区域的子区域地图 JSON 数据，通过 JSON 数据，我们就可以动态的渲染区域地图了，如下代码所示：

```javascript
// 渲染地图
function renderChart(name, data) {
  // 注册地图
  echarts.registerMap(name, data)
  // 根据 json 数据拼装 mapdata， 用于地图点击下钻时传递数据，主要有adcode、name
  const mapdata = data.features.map(item => {
    return item.properties
  })
  // 配置option
  setOption(name, mapdata)
}

// 根据adcode区域编码获取地图数据，例如：根据山东省的区域编码：370000，获取市区geoJson数据
getJSON('370000', function (data) {
  console.log('山东省子区域地图数据：', data)
  renderChart('山东省', data)
})
```

## 四. 体验优化

所谓体验优化，就是让用户使用舒服，在这里我仅提供一些简单优化思路，包括但不限于以下几种：

- 判断是否为最底层地图，也就是末级地图，当我们点击地图进行下钻到无法再继续时，可以提示用户或返回首层地图，是具体业务而定

- 可以记录点击地图的路径历史，类似于浏览器的 history，可以回退，避免用户点击下钻错误时返回上一层地图

### 1. 判断末级地图

在事件处理函数中，根据用户点击的区域信息，判断是否需要进行下钻操作。如果需要下钻，才可以展示子区域的地图信息。如果已经到了地图最末端，无法再进行下钻，应该相应提示用户。

例如，当用户点击到区县级地图且无法再下钻时，可以考虑弹窗显示详细信息或者返回至上一级别。

```javascript
// 设置地图点击事件
myChart.on('click', function (params) {
  if (params.data) {
    const { adcode, name, level } = params.data
    // 判断如果是 district 层级，则提示用户已经为最底级了
    if (level === 'district') {
      alert('无此区域地图显示！')
      initChinaMap() // 重新渲染中国地图或其他逻辑处理
      return
    }
    // 继续进行下钻
    getJSON({ name, adcode }, function (data) {
      renderChart(name, data)
    })
  }
})
```

![3d1.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b7611954e3b64087b93d94dffbf2f8d2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727688670&x-orig-sign=0G8K45SQe%2FEOECEurpNndw1JVSk%3D)

### 2. 返回上一级地图

在用户点击地图进行下钻的过程中，可以返回上一层进行重新点击地图进行下探！

实现这个功能主要需要定义一个变量 mapList 数组，记录地图的层级数据，主要用于返回时可以根据 adcode 获取上一级的地图数据。

当用户点击地图进行下钻时，记录地图的名称、级别和编码。当用户返回上一级的时候，需要删除记录数组中对应的数据。

核心代码如下：

```javascript
// 点击地图下钻时记录name和adcode
mapList.push({ name, adcode })

// 点击返回时删除对应的name和adcode
mapList.splice(-2, 2)

// 点击返回，地图返回上一级
function goBack() {
  if (mapList.length >= 2) {
    const { name, adcode } = mapList[mapList.length - 2]
    mapList.splice(-2, 2)
    getJSON({ name, adcode }, function (data) {
      renderChart(name, data)
    })
  }
}
```

![3d2.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7720db4df761445d9c90bfad42eedec4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727688670&x-orig-sign=IhHfNcNZChApBUb3E1HwWIw2yRw%3D)

## 五. 演示

该代码片段已经发布到码上掘金，大家可以尽情的修改完善，我是使用古老的 html + JavaScript 实现，不限于框架，你可以使用 Vue 或 React 等语言改写。

[jcode](https://code.juejin.cn/pen/7391785145499385865)

## 六. 总结

通过本篇文章，我们使用 ECharts + ECharts-GL 实现一款还不错的 3D 地图，并且快速地实现地图下钻功能。最后，我们还优化了一些使用体验，比如判断末级地图，避免递归下钻，还实现了支持返回上一层地图，

当然，本文完成的是核心下钻逻辑，在实际过程中，你可能会根据项目要求进一步优化完善，对地图继续进行个性化定制，但这些并不是难点，相信参考 ECharts 和 ECharts-GL 配置项手册来进行配置地图属性，也是非常容易实现的。

## 七. 资源链接

1. 代码演示地址：[3D 中国地图下钻演示：支持所有省市下钻演示](https://www.anyup.cn/demo/echarts/3d-map-drilldown.html)

2. 源码地址：[ECharts 地图下钻源码地址](https://code.juejin.cn/pen/7391785145499385865)

3. 全国及省市区级 geoJson 文件下载：[全国地图下钻 geoJson 完整版下载 20240312.zip](https://github.com/anyup/juejin-up/blob/master/plugins/%E5%85%A8%E5%9B%BD%E5%9C%B0%E5%9B%BE%E4%B8%8B%E9%92%BB%20geoJson%20%E5%AE%8C%E6%95%B4%E7%89%88%2020240312.zip)

4. ECharts 官方文档：[ECharts 地图配置项手册](https://echarts.apache.org/zh/option.html#)

5. ECharts-GL 官方文档：[ECharts-GL 地图配置项手册](https://echarts.apache.org/zh/option-gl.html)

<ArticleFooter link="https://juejin.cn/post/7398352956712534054" />
