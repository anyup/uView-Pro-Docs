---
title: 介绍
---

# 介绍

## 1. 前言

在开发 uni-app 项目时，我们经常需要对接后端接口进行数据请求。虽然 uni-app 框架本身提供了`uni.request` 用于发起请求，但在实际项目中，我们往往会封装一些请求库来简化请求的操作，提高代码复用性和可维护性。

本文将介绍基于 `uni.request` 实现一款小而美的请求工具，通过大约 100 行代码的实现，为 uni-app 项目打造一个简洁高效的请求库。

## 2. 为什么要开发请求库

在 uni-app 中使用 `uni.request` 来发起请求，但这种直接调用 `uni.request` 的方式在实际开发中存在一些不足之处，比如请求逻辑过于分散、请求参数拼接繁琐等。因此，我们希望通过封装一个简单的请求库来优化这一过程。

在 uni-app 使用 `uni.request` 的方式：

```js
uni.request({
  // url 仅为示例，并非真实接口地址。
  url: "https://www.example.com/request", 
  data: {
    text: "uni.request",
  },
  header: {
    // 自定义请求头信息
    "custom-header": "hello",
  },
  success: (res) => {
    console.log(res.data);
    this.text = "request success";
  },
});
```

以上的这种请求方式是在 uni-app 项目中最常见的代码书写方式，很简单也很好理解，但是无法支持 promise API 式的请求，不支持请求和响应拦截器，同时也不支持全局的变量配置，逻辑分散，不便于维护！

> 不过我最近看官方文档，官方已经对部分 API 进行了 Promise 封装
> 
> 详情参考：[官方 Promise - 封装](https://uniapp.dcloud.net.cn/api/#promise-%E5%B0%81%E8%A3%85)

::: warning 注意
1. 在使用本工具前，要求你至少会Vue、uni-app的基本使用和基本配置，然后再查看本文档。
2. 本文档仅负责介绍uni-http相关使用，更多其他相关请移步 [Vue文档](https://cn.vuejs.org/)、[uni-app文档](https://uniapp.dcloud.io/)
:::

## 3. 适用领域
* **App开发**

* **HTML5网站开发**

* **微信小程序开发**


## 4. 版权信息

> uni-http遵循MIT开源协议，但禁止将此应用到非法的领域，如因此产生纠纷等法律问题，uni-http不承担任何责任。










