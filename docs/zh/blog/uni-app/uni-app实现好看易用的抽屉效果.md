---
title: uni-app 实现好看易用的抽屉效果
---

# uni-app 实现好看易用的抽屉效果

## 一. 前言

我之前使用 `uni-app` 和 `uniCloud` 开发了一款软考刷题应用，在这个应用中，我使用了抽屉组件来实现一些功能，切换题库，如下图所示：

![youti1.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bf3c1e5e0a134436adc79b5bf5277ecb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727686228&x-orig-sign=8oNfyGlIAwZd5RYAR3soqQ8ClhE%3D)

在移动应用开发中，抽屉（`Drawer`）是一种常见的界面设计模式，这个组件可以在需要侧边导航或者额外信息展示的地方使用。它允许用户通过侧滑的效果打开一个菜单或额外的内容区域。

这种设计不仅能够节省屏幕空间，还能提供一种直观的交互方式。

例如，在**电商应用**中，可以将购物车或分类列表放在抽屉里；在**新闻阅读器**中，可以放置频道选择等；而在**有题记**刷题软件中，我主要用于题库的选择功能。

本文将介绍如何使用 uni-app 框架来实现一个简单的抽屉组件：`DrawerWindow`。文末提供完整的代码示例，让你能够轻松地在 uni-app 中实现抽屉效果。

## 二. 实现分析

Vue 组件的结构通常由三个主要部分组成：模板（`<template>`）、脚本（`<script>`）和样式（`<style>`），标准的的单文件组件（`SFC`）结构。

uni-app 也是如此，在这个组件中，我们也将使用 Vue 的单文件组件（`SFC`）结构，这意味着我们将在一个 `.vue` 文件中同时包含模板、脚本和样式。

接下来我们按照这个格式来简单实现一下。

### 1. 模板页面 (`<template>`)

首先，模版页面是很简单的部分，我们需要创建一个基础的 Vue 组件，该组件包含了主页面、抽屉内容和关闭按钮三个部分。以下是组件的模板代码：

```html
<template>
  <view class="drawer-window-wrap">
    <scroll-view scroll-y class="DrawerPage" :class="{ show: modalName === 'viewModal' }">
      <!-- 主页面 -->
      <slot></slot>
    </scroll-view>
    <!-- 关闭抽屉 -->
    <view class="DrawerClose" :class="{ show: modalName === 'viewModal' }" @tap="hide">
      <u-icon name="backspace"></u-icon>
    </view>
    <!-- 抽屉页面 -->
    <scroll-view scroll-y class="DrawerWindow" :class="{ show: modalName === 'viewModal' }">
      <slot name="drawer"></slot>
    </scroll-view>
  </view>
</template>
```

在模板部分，我们主要定义了三个主要元素：主页面、关闭按钮和抽屉页面。每个元素都有一个`class`绑定，这个绑定会根据 `modalName` 的状态来决定是否添加 `.show` 类。

- **主页面** (`<scroll-view class="DrawerPage">`)：

  - 这个滚动视图代表应用的主要内容区域。
  - 当抽屉打开时，它会被缩小并移向屏幕右侧。
  - 提供默认插槽 `<slot></slot>`，允许父组件传递自定义内容到这个位置。

- **关闭按钮** (`<view class="DrawerClose">`)：

  - 位于屏幕右侧的一个透明背景层，当点击时触发 `hide()` 方法来关闭抽屉。
  - 包含了一个图标 `<u-icon name="backspace"></u-icon>`，这里使用的是 uView UI 库中的图标组件。你可以选用其他组件库里的图标或者图片。

- **抽屉页面** (`<scroll-view class="DrawerWindow">`)：

  - 这是抽屉本身的内容区域，通常包含菜单或其他附加信息。
  - 同样地，定义特有的插槽名称，`<slot name="drawer"></slot>` 允许从外部插入特定的内容。
  - 抽屉默认是隐藏的，并且当显示时会有动画效果。

在这里，我们主要使用了 `<slot>` 元素来定义可以插入自定义内容的位置。`modalName` 属性用来控制抽屉的状态。

### 2. 逻辑处理 (`<script>`)

接下来，逻辑处理其实也很简单，主要会定义打开和关闭抽屉的方法：

```javascript
<script>
export default {
  data() {
    return {
      modalName: null
    }
  },
  methods: {
    // 打开抽屉
    show() {
      this.modalName = 'viewModal';
    },
    // 关闭抽屉
    hide() {
      this.modalName = null;
    }
  }
}
</script>
```

- **数据 (`data`)**:

  - `modalName`: 用于控制抽屉状态的数据属性。当它的值为 `'viewModal'` 时，表示抽屉处于打开状态；否则，抽屉是关闭的。

- **方法 (`methods`)**:

  - `show()`: 将 `modalName` 设置为`'viewModal'`，从而通过 CSS 样式控制抽屉显示。
  - `hide()`: 将 `modalName` 重置为 `null`，控制抽屉隐藏。

当调用 `show()` 方法时，`modalName` 被设置为 `'viewModal'`，这会触发 CSS 中的 `.show` 类，从而显示抽屉；反之，调用 `hide()` 方法则会隐藏抽屉。

### 3. 样式设计 (`<style>`)

在这个组件中，其实要做好的在样式部分，主要是显示抽屉的动画部分。在主页面，我们主要定义了三个主要的样式类：主页面、关闭按钮和抽屉页面。

- **主页面样式** (`DrawerPage`):

  - 初始状态下占据整个屏幕宽度和高度。
  - 当抽屉打开时（即有`.show`类），页面会缩小并移动到屏幕右侧 85%的位置，同时增加阴影效果以模拟深度。

- **关闭按钮样式** (`DrawerClose`):

  - 默认情况下是不可见且不响应用户交互的。
  - 当抽屉打开时，按钮变为可见并可点击，提供了一种关闭抽屉的方式。

- **抽屉页面样式** (`DrawerWindow`):

  - 初始状态下位于屏幕左侧外侧，不显示也不响应交互。
  - 当抽屉打开时，抽屉平滑滑入屏幕内，变得完全可见且可以与用户互动。

- **动画与过渡**

  - 所有的 `.show` 类都带有 `transition: all 0.4s;`，这使得任何属性的变化都会有一个 0.4 秒的平滑过渡效果。
  - 抽屉和主页面的 `transform` 属性被用来控制它们的位置和大小变化。
  - `opacity` 和 `pointer-events` 属性确保在不需要时抽屉不会影响用户的操作。

如下代码所示，我们主要添加一些 CSS 样式来实现平滑的过渡效果以及视觉上的美观：

```scss
<style lang="scss">
// 省略其他样式...
.DrawerPage.show,
.DrawerWindow.show,
.DrawerClose.show {
  transition: all 0.4s;
}

.DrawerPage.show {
  transform: scale(0.9, 0.9) translateX(85vw);
  box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.2);
}

.DrawerWindow.show {
  transform: scale(1, 1) translateX(0%);
  opacity: 1;
  pointer-events: all;
}

.DrawerClose.show {
  width: 15vw;
  color: #fff;
  opacity: 1;
  pointer-events: all;
}
</style>
```

以上的这些样式确保了当抽屉显示或隐藏时有流畅的动画效果，并且在不需要的时候不会影响用户的交互。

## 三. 完整代码

### 1. 完整抽屉组件，复制可使用

```html
<template>
  <view class="drawer-window-wrap">
    <scroll-view scroll-y class="DrawerPage" :class="modalName == 'viewModal' ? 'show' : ''">
      <!-- 主页面 -->
      <slot></slot>
    </scroll-view>
    <!-- 关闭抽屉 -->
    <view class="DrawerClose" :class="modalName == 'viewModal' ? 'show' : ''" @tap="hide()">
      <u-icon name="backspace"></u-icon>
    </view>
    <!-- 抽屉页面 -->
    <scroll-view scroll-y class="DrawerWindow" :class="modalName == 'viewModal' ? 'show' : ''">
      <slot name="drawer"></slot>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        modalName: null
      }
    },
    methods: {
      // 打开抽屉
      show() {
        this.modalName = 'viewModal'
      },
      // 关闭抽屉
      hide() {
        this.modalName = null
      }
    }
  }
</script>

<style lang="scss">
  page {
    width: 100vw;
    overflow: hidden !important;
  }

  .DrawerPage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0vw;
    background-color: #f1f1f1;
    transition: all 0.4s;
  }

  .DrawerPage.show {
    transform: scale(0.9, 0.9);
    left: 85vw;
    box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.2);
    transform-origin: 0;
  }

  .DrawerWindow {
    position: absolute;
    width: 85vw;
    height: 100vh;
    left: 0;
    top: 0;
    transform: scale(0.9, 0.9) translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
    background-image: linear-gradient(45deg, #1cbbb4, #2979ff) !important;
  }

  .DrawerWindow.show {
    transform: scale(1, 1) translateX(0%);
    opacity: 1;
    pointer-events: all;
  }

  .DrawerClose {
    position: absolute;
    width: 40vw;
    height: 100vh;
    right: 0;
    top: 0;
    color: transparent;
    padding-bottom: 50rpx;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
    letter-spacing: 5px;
    font-size: 50rpx;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
  }

  .DrawerClose.show {
    opacity: 1;
    pointer-events: all;
    width: 15vw;
    color: #fff;
  }

  .DrawerPage .cu-bar.tabbar .action button.cuIcon {
    width: 64rpx;
    height: 64rpx;
    line-height: 64rpx;
    margin: 0;
    display: inline-block;
  }

  .DrawerPage .cu-bar.tabbar .action .cu-avatar {
    margin: 0;
  }

  .DrawerPage .nav {
    flex: 1;
  }

  .DrawerPage .nav .cu-item.cur {
    border-bottom: 0;
    position: relative;
  }

  .DrawerPage .nav .cu-item.cur::after {
    content: '';
    width: 10rpx;
    height: 10rpx;
    background-color: currentColor;
    position: absolute;
    bottom: 10rpx;
    border-radius: 10rpx;
    left: 0;
    right: 0;
    margin: auto;
  }

  .DrawerPage .cu-bar.tabbar .action {
    flex: initial;
  }
</style>
```

### 2. 在父组件中使用抽屉组件

在父组件中，可以通过以下简单的代码使用它，你可以继续进行丰富：

```html
<template>
  <drawer-window ref="drawerWindow">
    <view class="main-container" @click="$refs.drawerWindow.show()"> 主页面，点击打开抽屉 </view>
    <view slot="drawer" class="drawer-container"> 抽屉页面 </view>
  </drawer-window>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .main-container,
  .drawer-container {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #333;
    padding-top: 100px;
  }
</style>
```

以上代码的实现效果如下图所示：

![youti2.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9a70595a9545471a9aede49e0da23152~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727686228&x-orig-sign=aCzEKlGJ%2BSWCjaY61P9Q4jqQmU4%3D)

## 四. 小程序体验

以上的组件，来源于我独立开发的软考刷题小程序中的效果，想要体验或软考刷题的掘友可以参考以下文章，文末获取：

[软考小工具重磅更新啦！最好用的软考刷题工具](https://juejin.cn/post/7412490227550765083)

## 五. 结语

通过以上步骤，我们已经构建了一个基本的抽屉组件。当然，你也可以根据具体的应用场景对这个组件进行进一步的定制和优化。
