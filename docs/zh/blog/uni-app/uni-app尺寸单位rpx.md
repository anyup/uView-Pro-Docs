---
title: 一文读懂uni-app中的尺寸单位rpx
---

# 一文读懂uni-app中的尺寸单位rpx

## 一. rpx 是什么

rpx 是一种尺寸单位，通常用于小程序和跨平台开发框架中，最初是由微信推出，后来其他几家小程序平台陆续都兼容了 rpx 机制，rpx 不再是微信的专用单位，而成为了这个行业的通用单位。

rpx 的全称是“**responsive pixel**”意为响应式像素，它是根据屏幕宽度等于750rpx来换算的像素单位，这样设计的目的是为了解决不同设备、不同分辨率下元素大小和布局的显示效果不一致的问题。

使用 rpx 的有以下好处：

- **响应式布局**

- **简化适配工作**

- **加快开发速度**

- **提高用户体验**

总体来说，rpx 是一种相对单位，能够根据屏幕宽度进行自适应布局，是开发小程序和跨平台应用中常用的尺寸单位之一。

## 二. 传统单位 px 与 rpx 单位

### 传统单位 px 在不同屏幕密度上的显示效果问题

传统单位 px 在不同屏幕密度上的显示效果问题主要涉及到屏幕像素密度和物理尺寸之间的关系，在高密度屏幕上，同样的像素数会被显示得更小，而在低密度屏幕上则会显示得更大，导致显示效果不一致的情况，这种情况通常称为“**像素密度问题**”或“**DPI 问题**”。

具体来说，传统单位 px 在不同屏幕密度上的显示效果问题表现为：

1. **在高密度屏幕下：** 如果使用传统单位 px 来设置元素大小，相同像数的元素在高密度屏幕上会显得更小，导致界面显示过小，影响用户体验。

2. **在低密度屏幕下：** 相同像素数的元素在低密度屏幕上会显得更大，可能导致界面显示过大，也会影响用户体验。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2d97969efa4474e854ee2de486ab571~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=785&h=259&s=19057&e=png&b=ffffff)

如上图所示，在不同的屏幕分辨率下，设置相同尺寸（px）大小的图标，展示效果就会有影响。

因此，对于同密度的屏幕，传统 px 无法做到的适配和显示，容易导致界面显示效果不一致的问题。为解决这一问题，引入 rpx 这样的相对单位，可以根据屏幕宽度进行自适应布局，提高界面在不同屏幕密度下的显示效果一致性，从而改善用户体验。

### rpx 单位如何解决这个问题

在一个移动端的页面中，假设有两个宽度不同的按钮，设置一个宽度为 `200px` 的按钮，另一个设置为宽度为 `400rpx` 的按钮，我们具体看一下在不同分辨率的手机屏幕上，设置 200px 和 400rpx 的展示效果是如何的？

**示例代码：**

```html
<template>
  <view>
     <button class="btn1"> 200px 按钮 </app-button>
     <button class="btn2"> 400rpx 按钮 </app-button>
  </view>
</template>

<style lang="scss" scoped>
.btn1 {
  width: 200px;
}
.btn2 {
  width: 400rpx;
}
</style>
```

**具体表现：**

- 在分辨率为 375 x 667 的 iPhone SE 型号上的表现

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/544cf2216157431eb48118dc413f765c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=438&h=354&s=15692&e=png&b=ffffff)

通过浏览器查看按钮的样式，发现样式 200px 和 400rpx 的按钮，渲染出来的按钮宽度是一样的

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e692d7a15fd2497a9c325cc170754f81~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1344&h=380&s=165885&e=png&b=fcfbfb)

- 在分辨率为 430 x 932 的 iPhone 14 Pro Max 型号上的表现

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6503b5529214b4aaeb615b33c91078a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=496&h=396&s=17840&e=png&b=ffffff)

通过浏览器查看按钮的样式，发现两组按钮的显示宽度有了差别，400rpx 的按钮宽度真实渲染宽度为 229px

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14990c8f43bc4325bcdd1d4316435d74~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1350&h=478&s=205600&e=png&b=fdfdfd)

从上面的示例可以看出，rpx 相对于 px 单位更具有适配性，能够解决在不同屏幕密度下元素显示大小不一致的问题。总结一下 使用 rpx 单位的优点：

1. **根据屏幕宽度自适应：** rpx 单位是根据屏幕宽度进行换算的，1rpx 在不同屏幕宽度下对应的物理像素数是不同的，这样就能够根据屏幕的实际宽度来自动适配元素的大小，保证在不同屏幕密度下元素显示的大小基本一致。

2. **灵活适配不同设备：** 使用 rpx 单位可以让开发者较少的考虑在不同设备的屏幕密度和分辨率，只需按照设计稿的比例使用 rpx 单位来设置元素的大小和位置，就能够在不同设备上实现良好的显示效果。

rpx 单位通过可以根据屏幕宽度自适应调整元素的大小，以便于灵活适配不同设备，提高用户体验，因此合理的使用 rpx 单位，可以解决在不同屏幕密度下元素显示大小不一致的问题。

## 三. rpx 单位的定义与换算规则

rpx 单位作为小程序开发中的一个相对长度单位，它是如何实现在不同屏幕密度下元素的自适应显示的呢？其实 rpx 单位有它自己的换算规则，最终按照自己的换算规则渲染成所需要的大小，具体的定义和换算规则如下：

1. **定义：**

rpx 是可以根据屏幕宽度进行自适应的相对单位。规定屏幕宽为 750rpx。如在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素。

- 在小程序中，1rpx 代表屏幕宽度的 1/750，也就是屏幕宽度除以 750。屏幕宽度是指屏幕的物理宽度，单位是 px。
- 换句话说，屏幕宽度为 750rpx 时，该屏幕上 1rpx 等价于 1px；而当屏幕宽度大于或小于 750rpx 时，1rpx 的实际像素数会相应地进行等比例缩放或扩大。

2. **换算规则：**

- 实际开发中，我们一般通过 JavaScript 等语言来动态计算 rpx 单位在不同屏幕宽度下的像素值。换算规则可以简单描述为：元素在样式中设置的 rpx 值乘以当前屏幕宽度除以 750 即可得到最终的像素值。
- 具体换算公式为：`px = rpx * (屏幕宽度 / 750)`

以上述设置的 400rpx 宽度按钮为例子，我们按照以上的计算规则计算一下按钮的真实宽度，

- 在屏幕宽度为 375px 的设备上，通过换算规则可得到实际像素值：
  `px = 400rpx * (375px / 750) = 200px`
- 在屏幕宽度为 430px 的设备上，通过换算规则可得到实际像素值：
  `px = 400rpx * (430px / 750) = 229px`

通过以上的换算规则，发现和上面的示例是一样的

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03dcff9eb5834d2c8bd7d67f948940ba~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=925&h=351&s=57795&e=png&b=ffffff)

通过 rpx 单位的定义和换算规则，开发者可以通过极少的适配代码，便可以更加灵活地设计和布局界面，实现在不同屏幕密度下元素的自适应显示，提高用户体验。

## 四. 使用 rpx 单位的最佳实践

在使用 uni-app 开发应用时，我总结了一下几点最佳实践，可以帮助你更快更好的使用 rpx 来设计页面！

- **设计稿尺寸**：移动端设计稿的宽度推荐使用 750rpx，这样在绝大多数设备上都能得到较好的显示。

- **屏幕宽度相关**：注意 rpx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如不想根据屏幕宽度缩放，则应该使用 px 单位。

- **字体大小**：如果你在字体或高度中也使用了 rpx ，那么需注意这样的写法意味着随着屏幕变宽，字体会变大、高度会变大。如果你需要固定高度，则应该使用 px 。

- **屏幕方向**：rpx 不支持动态横竖屏切换计算，使用 rpx 建议锁定屏幕方向

- App 端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px，不支持 rpx，如下图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/004d3f613ea84f91895d8e7a7bd40497~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=665&h=485&s=67484&e=png&b=212121)

> 注意：只有当你需要某元素的单位要根据屏幕宽度（小范围）大小变化时，才需要 rpx 这类动态宽度单位。一般情况下高度和字体大小是不应该根据屏幕宽度（等比）变化的。

## 五. 自己实现一个 px 和 rpx 互相换算工具

原理：需要获取到当前的屏幕宽度，根据实际屏幕宽度按照上文提到的换算规则，转换为所需要的 px 或 rpx。

- px 转为 rpx 换算公式为：`px = rpx * (屏幕宽度 / 750)`
- rpx 转为 px 换算公式为：`rpx = px / (屏幕宽度 / 750)`

具体的示例代码如下所示：

```js
// rpx 转为 px
function rpxToPx(value) {
  const screenWidth = uni.getSystemInfoSync().screenWidth
  return Math.ceil(Number.parseInt(value) * (screenWidth / 750))
}

// px 转为 rpx
function pxToRpx(value) {
  const screenWidth = uni.getSystemInfoSync().screenWidth
  return Math.ceil(Number.parseInt(value) / (screenWidth / 750))
}
```

使用上面说过的两个按钮的例子，我们对在屏幕宽度为 375px 和 430px 的设备分别对两个按钮的宽度尺寸进行换算一下：

- 在 375px 的设备转换结果如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c34cef83865049ada3d6cee91658816c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1046&h=356&s=65125&e=png&b=fefefe)

- 在 430px 的设备转换结果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86e8414bed504da48cdee337169a1dca~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1047&h=325&s=64313&e=png&b=fefefe)

从以上的结果中可以看出，根据实际的屏幕宽度，按照我们定义好的换算规则，转换的 px 或 rpx 符合我们的预期。

## 六. 总结

通过本篇文章的介绍，相信大家都可以了解到 rpx 在 uni-app 中的重要性，正确的使用 rpx 单位能够提升项目的适配性和用户体验。

总之，在 uni-app 中，rpx 尺寸单位是一个非常实用的单位，它可以帮助我们更方便地进行跨平台应用的开发。希望本篇文章能帮助您更好地理解和使用 rpx。

**资源文档**

[微信小程序尺寸单位官方文档介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)

[uni-app 尺寸单位官方文档介绍](https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)


![Snipaste_2024-04-03_17-17-20.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb46858c740449d3b9322aba3dac2200~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=650&h=130&s=19740&e=png&b=ffffff)

<ArticleFooter :link="['juejin::https://juejin.cn/post/7339743984099016745', 'weixin::https://mp.weixin.qq.com/s/9BjfQEHcqTxmOA4Fi7Laiw', 'yuque::https://www.yuque.com/anyup/uniapp/nise0t4ck9gztsoh']" />