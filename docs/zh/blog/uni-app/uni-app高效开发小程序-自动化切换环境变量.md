---
title: uni-app 高效开发小程序：自动化切换环境变量
---

# uni-app 高效开发小程序：自动化切换环境变量

## 一. 前言

在微信小程序开发中，`uni-app` 作为一个开发利器，方便了广大开发者，越来越多的公司开始使用 uni-app 进行开发，尤其是在开发小程序的时候，今天给大家分享一个使用 `uni-app` 高效开发小程序的技巧，如何自动化切换环境变量，无缝适配微信小程序的各种版本！

## 二. 背景

在 `uni-app` 进行开发小程序时，需要在不同的环境中配置不同的域名，比如**开发环境**，**测试环境**，**生产环境**。以微信小程序开发为例，有**开发版**、**体验版**、**正式版**环境的区分，通常情况下，测试人员会在体验版中进行，同时对应我们测试环境。测试通过后，发布正式版，则是对应生产环境。

因此，在**常规的测试发布应用**过程中，可能我们需要先将体验版的域名配置到测试环境，等待测试通过后，再将体验版的域名配置到生产环境，进而提交审核上线。这个过程，需要我们手动修改环境去操作微信小程序的开发工具，然后再去提交审核。这样的操作，不仅繁琐，而且容易出错，很有可能在修改之后，因为没有及时改回去，导致线下测试操作了线上数据，引发生产问题。

因此为了持续集成自动化，我们可以使用一些方式来判断微信所处的运行环境，根据环境自动切换连接对应后端接口地址。

本篇文章，我们将学习到如何自动代替手动，无缝快速切换微信小程序的环境，根据不同环境使用全局定义的环境变量。

## 三. 解决方案

对于根据微信小程序的环境（开发版，体验版，正式版）自动化切换环境变量，代替手动切换的繁琐和易错性。其实微信小程序的官方 API ：`wx.getAccountInfoSync()` 已经提供了这个功能，可以根据返回 `envVersion` 来进行判断。

我们可以看一下如下的代码：

```js
const accountInfo = wx.getAccountInfoSync()
console.log('小程序appId：', accountInfo.miniProgram.appId) // 小程序 appId
console.log('小程序版本：', accountInfo.miniProgram.envVersion) // 小程序版本
console.log('线上小程序版本号：', accountInfo.miniProgram.version) // 线上小程序版本号
```

`envVersion` 可以取三个值之一：'**develop**'、'**trial**' 和 '**release**'。这些值代表了小程序当前的运行环境：

- `develop`: 表示开发版环境，即在开发者工具中预览或者通过 `wx.preview` 方法预览的环境。

- `trial`: 表示体验版环境，即通过微信公众平台将小程序提交后发布为体验版，用户可以在微信中体验到的环境。

- `release`: 表示正式版环境，即通过微信公众平台审核通过后正式发布的环境，用户可以在微信中搜索到并使用的环境。

在微信开发者工具中运行的小程序，`envVersion` 的值为 '**develop**'，如下图所示：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7840851cc2554ebfbd817e7aa6e99917~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726208912&x-orig-sign=5ULZq9W6Bc6Y7JRMbPsQucb9v%2Fg%3D)

## 四. 实现流程

### 1. 定义环境变量

首先我们先在项目目录下，新建一个 `environment.js` 文件，用于定义环境变量。这些环境变量一经定义，可以全局使用。可以主要有以下几个：

- `isProd`：是否是生产环境

- `baseURL`：API 接口的基础 URL

在这里，我简单定义了两个环境变量，后续可以根据项目的开发需要，自行定义。

```js
// API 环境变量配置
const environment = {
  isProd: true,
  baseURL: 'http://api.production.com'
}

export { environment }
```

### 2. 判断小程序环境

在 `uni-app` 中，我们可以通过 `#ifdef` 和 `#endif` 来判断当前的环境，从而进行不同的操作。我们可以在 `environment.js` 文件中，设置不同的环境变量，从而实现不同环境下的不同操作。

在微信小程序环境下，根据微信环境变量，不同的版本设置不同的域名。

```js
// #ifdef MP-WEIXIN
// 在微信小程序环境下，根据微信环境变量，根据不同的版本设置不同的域名

const accountInfo = wx.getAccountInfoSync()

switch (accountInfo.miniProgram.envVersion) {
  case 'develop': // 开发版小程序
    console.log('开发版小程序')
    break
  case 'trial': // 体验版小程序
    console.log('体验版小程序')
    break
  case 'release': // 线上小程序
    console.log('线上小程序')
    break
  default:
    console.log('判读出错')
    break
}
// #endif
```

在微信开发者工具中运行的小程序，可以看到输出的是体验版小程序，如下图所示：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a50007e88edd4df187ffb600a4a2f3d8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726209165&x-orig-sign=p8YXH2QO9%2Bk%2FNamwPWCbFn0s3NE%3D)

### 3. 设置环境变量

根据以上的判断结果，我们可以在 `environment.js` 文件中，设置不同的环境变量，从而实现不同环境下对应的变量值是预期的值。

```js
const environment = {
  isProd: true,
  baseURL: 'http://api.production.com'
}
// #ifdef MP-WEIXIN
// 在微信小程序环境下，根据微信环境变量，根据不同的版本设置不同的域名
const accountInfo = wx.getAccountInfoSync()

switch (accountInfo.miniProgram.envVersion) {
  case 'develop': // 开发版小程序
    environment.isProd = false
    environment.baseURL = 'https://api.development.com'
    break
  case 'trial': // 体验版小程序
    environment.isProd = false
    environment.baseURL = 'https://api.release.com'
    break
  case 'release': // 线上小程序
    environment.isProd = true
    environment.baseURL = 'https://api.production.com'
    break
  default:
    environment.isProd = true
    environment.baseURL = 'https://api.production.com'
    break
}
// #endif
console.log('环境变量：', environment)
export { environment }
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1ece42fae37643deb91737a165125bc6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726209363&x-orig-sign=VCwqz0C3ZpatXuwhGEXxGSzmTQc%3D)

## 五. 问题

在使用 `wx.getAccountInfoSync()` 获取 `envVersion` 判断微信小程序所处环境时。在某些未知的情况下，当我们提交体验版审核时，可能会出现判断出现错误的情况，影响审核人员的审核！

这个问题曾经在社区问烂了，到如今可能未必解决，如下图所示：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/074b310f763b4d5fad22c751bf947fb0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726210953&x-orig-sign=1uSxB5PiBfX65Z4fgQhO5gyEYvM%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d0b012c756e246a2a3055d9a3b9f6bac~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726212444&x-orig-sign=YK9PoIbcKfCMnPHGtDq%2FZFAQ%2FzQ%3D)

所以遇到这个问题不必惊讶，可以探寻适合自己的方案解决！我最近还遇到了一次，登录无响应，想来是判断环境和预期不一致导致的。

## 六. 总结

通过以上的了解，在微信小程序开发中，我们可以根据微信官方的小程序 API `wx.getAccountInfoSync()` 这个方法而得到当前运行的小程序环境变量 `envVersion`，根据他来判断是开发版、体验版、正式版，从而实现不同环境下使用不同的全局变量，进而实现自动化配置。

其实不只是小程序，在 `uni-app` 的多端开发中，在开发 **H5 端**、**App 端**时，也可以使用类似的思想实现这种自动化，同时也不仅限于全局环境变量。我们可以将这种自动化配置的思想延续到其他方面，从而实现更加高效的开发。

[微信官方文档-小程序 API](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html)

