---
title: 前端小工具 FlyHttp 代码提示指南：让你的开发更高效
---

# 前端小工具 FlyHttp 代码提示指南：让你的开发更高效

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/552ddd6b5aab48e58aa425f452650b16~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=879&h=266&s=46918&e=png&b=ffffff)

## 一. 引言

之前我写了一篇文章，介绍了一下我在前端项目中是如何构建 API 网络请求流程，并且将其中使用的一个小工具封装了一下 npm 并发了出来，主要目的是分享自己的在某些方面的编程思路，感兴趣的可以了解一下之前文章：[前端小工具！加速构建你的 API 网络请求流程，全端通用！](https://juejin.cn/post/7371479502456963106)

然而，有很多朋友看完后，忍不住有很多疑惑要发问？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88a8cf9b42ac4ecfa4e35e011f340b71~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=940&h=358&s=94896&e=png&b=fdfdfd)

总结一下，无外乎有以下几种问题：

- **代码提示**怎么搞？

- 导出方式为一个**对象**？有其他的导出方式吗？

- 如果我有**多个不同的请求域名**接口怎么办？

- 如果是全链接的 **URL** 该如何传递？

- **restful URL** 格式该如何请求？

- **全局请求体**参数如何传递？

以以上这些问题为导向，我们逐步分析一下，以最佳实践的方式解答一下以上的问题！如果有 `FlyHttp` 做不到的，可以完全通过自定义的方式进行改写！

本文先以**代码提示怎么搞？** 这个问题，我们来详细分析一下该如何做？

## 二. FlyHttp 是什么？

首先，我们来先简单介绍一下 `FlyHttp` 是什么？

> 一句话定义为：`FlyHttp` 是一个帮助你快速构建前端 API 接口请求流程的小工具!

前后端分离的项目开发模式，以 `Vue` 开发为例，请求工具为 `axios`，我们在与后端进行数据交互的时候，通常以接口的形式对数据进行增、删、改、查，因此体量越大的项目必然需要的接口就会越多，我们在开发过程中这些接口地址是如何维护的？请求方法是如何进行书写的，相信每一位前端开发者都应该有自己的一套规范流程。

因此我之前介绍的构建流程也是我在众多前端开发项目中沉淀下来的最佳实践！（当然是我自认为的），我认为简洁、灵活、可维护性高就可以了。

## 三. 最佳的代码组织结构是怎样的？

在 src 目录下创建 api 模块，所有的 API 相关请求都在这个文件夹内，内部按照项目模块功能划分目录结构，以电商为例，比如：

- **user**：用户模块相关的接口请求
- **cart**：购物车相关的接口请求
- **goods**：商品相关的接口请求
- **order**：订单相关的接口请求
- **coupon**：优惠券相关的接口请求
- ... 等等

```
├── src
├── ├── api                    # 所有请求
├── ├── ├──  modules           # 模块文件夹
├── ├── └── └──  user.ts       # 用户模块
├── ├── └── └──  cart.ts       # 购物车
├── ├── └── └──  goods.ts      # 商品
├── ├── └── └──  order.ts      # 订单
├── ├── └── └──  coupon.ts     # 优惠券
├── ├── ├──  axios.ts          # axios 实例，二次封装的 axios
├── ├── ├──  index.ts          # 统一导出
├── ├── assets                 # 资源目录
├── ├── components             # 组件目录
├── ├── hooks                  # 封装 hooks
├── ├── router                 # 路由
├── ├── store                  # 状态管理
├── ├── utils                  # 工具类
├── ├── views                  # 所有页面
├── ├── App.vue                # 入口
├── ├── main.ts                # 入口
└── package.json               # package.json
```

最佳的代码组织结构是通用的编程结构规范，在 `Vue` 开发中，就算你不使用 `FlyHttp`，你自己的项目组织结构也应该如此！

## 四. 如何使用代码提示功能？

其实代码提示做的好不好，关键看在 `TypeScript` 开发时类型定义做的好不好，非不得已的情况下尽量不要书写 `any` 的定义方式，不要将 `TypeScript` 变成 `AnyScript`，那样你的使用体验将会非常糟糕！

### 1. 定义

`axios.ts` 文件中应该有以下代码，其主要作用是二次封装 `axios`， 主要配置一些全局参数，请求拦截器和响应拦截器等，视项目情况而定，原则：简单、易用、适度即可！

```js
import axios from 'axios'
import { FlyHttp } from '@anyup/flyit'

// 配置新建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: '',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
})
// 添加请求拦截器
axiosInstance.interceptors.request.use()
// 添加响应拦截器
axiosInstance.interceptors.response.use()

// 构建一个 FlyHttp 实例
const flyHttpInstance = new FlyHttp.Builder(axiosInstance)

// 导出
export { axiosInstance, flyHttpInstance }
```

`FlyHttp` 内部模块提供了基础的 `Type` 定义，导入部分定义即可以实现基础的代码提示，以用户模块为例 `user.ts`，看一下如何使用代码提示！

```js
import { flyHttpInstance } from '@/api/axios' // 在 axios 应该要导出 FlyHttp 实例
import { IRequestConfig, IResult } from '@anyup/flyit'

// 定义 interface
interface UserApi {
  getUserList: (config: IRequestConfig) => Promise<IResult>; // 获取用户列表
  getUserInfo: (config: IRequestConfig) => Promise<IResult>; // 获取用户信息
  addUser: (config: IRequestConfig) => Promise<IResult>; // 添加用户
  editUser: (config: IRequestConfig) => Promise<IResult>; // 编辑用户
  exportUser: (config: IRequestConfig) => Promise<IResult>; // 导出用户列表
  deleteUser: (config: IRequestConfig) => Promise<IResult>; // 删除用户
}

// 定义接口地址和请求方式
const URL = {
  getUserList: { url: '/api/user/list', method: 'get' }, // 获取用户列表
  getUserInfo: { url: '/api/user', method: 'get' }, // 获取用户信息
  addUser: { url: '/api/user/add', method: 'post' }, // 添加用户
  editUser: { url: '/api/user/edit', method: 'post' }, // 编辑用户
  exportUser: { url: '/api/user/export', method: 'post' }, // 导出用户列表
  deleteUser: { url: '/api/user', method: 'delete' } // 删除用户
}

// 导出对象
export FlyHttp.dispatch(URL) as UserApi;

```

### 2. 请求时提示

请求时的提示主要是`request`参数提供信息，得益于定义的`IRequestConfig`，通过如上的方式可以在页面中使用提示了

```js
import userApi from '@/api/modules/user';

<script lang="ts" setup>
  const getUserList = (offset: number, limit: number) => {
    const query = { offset, limit };
    userApi.getUserList({ data: { query } }).then((res) => {
      console.log(res);
    });
  };
</script>
```

当我们输入`userApi.`的时候，将会出现以下提示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6de619f74cc643119970da50e664316a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=935&h=167&s=30310&e=png&b=212121)

当我们传递参数输入错误的情况下，将会出现以下提示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a03d7299068c4a2fa3c91235788d2ae8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=784&h=245&s=51146&e=png&b=222222)

最终正确的方式如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/418840799e9d43a7af45c0cb4b35e4b0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=811&h=145&s=24227&e=png&b=202020)

### 3. 响应结果提示

响应结果的提示依赖于上述定义接口时使用的 `IResult`，它提供了通用的一些请求体结构：

- code：响应码
- data：响应数据
- msg：响应信息

使用时提示如下信息：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c797e658e1147888d391160ddb4cef4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=938&h=173&s=34175&e=png&b=212121)

最终正确的方式如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3011684f81164bf1a5d9319bdc407b6b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=866&h=197&s=29298&e=png&b=202020)

> 如果以上的提示方式不符合你的要求，你完全可以自定义，搭配适合你项目的请求提示和响应提示！

## 五. 如何使用自定义的 types？

如果 `FlyHttp` 提供的内部 `Types` 定义并不满足你的需求，你完全可以自定义！

可以参考 `AxiosRequestConfig` , `AxiosResponse` 的设计等，因为 `FlyHttp`的 `request` 方法入参和 `AxiosRequestConfig` 定义一致。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bc2b1700ccf4c9a908ca2ccf0a03148~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1076&h=636&s=177711&e=png&b=202020)

按照自己的需求实现即可，例如以下是一个简单的例子：

定义完成后将入参类型修改为自己定义的 `MyRequestConfig` 和 `MyResult`

```js
// 定义 RequestConfig
interface MyRequestConfig<D = any> {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: any;
  params?: any;
  data?: D;
}

// 定义 Result
interface MyResult<T = any> {
  status?: number | string;
  data?: T;
  message?: string;
}

// 定义 interface，将入参类型修改为自己定义的 MyRequestConfig 和 MyResult
interface UserApi {
  getUserList: (config: MyRequestConfig) => Promise<MyResult>; // 获取用户列表
}
```

通过以上自定义的方式，就可以完成使用自定义的 types，可按照自己的项目需求进行编写类型定义，最终实现适合自己项目的代码提示！

## 六. 结语

本篇文章以在使用 `FlyHttp` 的过程中，书写代码时 **代码提示**怎么搞？为导向问题，提供一些思路和解决方案。同时也说明了我在开发前端项目中，分享在构建前端 API 请求流程时的一些编程思想，主要包括了代码组织结构，构建流程等。

当然了，最重要的还是适合自己，适合团队快速开发。如果你觉的 `FlyHttp` 设计的不好，你完全可以不用，你也可以有自己的一套标准开发流程，按照自己的规范去做一些简化开发的小工具。

但是，通过本篇文章，我希望大家能从中汲取一些不一样的知识，积极向上的，或者是灵光一现的，再或者是当作反面教材也罢，**取其精华，去其糟粕**，能帮助到某些人就可以了！

除了本文介绍的使用该工具该如何进行代码提示？后续我会逐步介绍并分析其他的问题！如果你有更好的想法和实现方案，欢迎联系我！

<ArticleFooter link="https://juejin.cn/post/7378893690146504740" />
