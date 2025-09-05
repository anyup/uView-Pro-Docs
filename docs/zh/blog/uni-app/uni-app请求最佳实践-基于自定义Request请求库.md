---
title: uni-app请求最佳实践：基于自定义Request请求库
---

# uni-app请求最佳实践：基于自定义Request请求库

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03e95d4f235e4d4c999f1fd8021a3419~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=697&h=282&s=17531&e=png&b=feffff)

## 一. 前言

之前一篇文章详细写了如何基于 `uni.request` 打造一款轻量便捷、小而美的 `uni-http` 请求库，支持多种运行环境，包括**浏览器 H5**、**小程序**、**APP** 等各端。

详细了解请看文章：[100 行代码打造小而美的 uni-app 请求库](https://juejin.cn/post/7360893272199348233)

通过以上这篇文章，你将收获到如何成功构建一个简洁高效的 `uni-app` 请求库，如何实现统一**请求响应拦截器**、**全局错误处理**等功能，使用它可以让我们的 `uni-app` 项目开发变得更加顺畅和便利。

后来我又写了一篇文章，介绍了一个通用的小工具 `FlyHttp`，目的在于解决重复的代码声明，化繁为简，解放双手，更加高效的专注请求流程！

详细了解请看文章：[前端小工具！加速构建你的 API 请求类，全端通用](https://juejin.cn/post/7371479502456963106)

今天我们来说一下基于 `uni-http` 这个请求库，如何更高效，标准化的使用它，以及如何与 `FlyHttp` 搭配使用，构建 API 请求的最佳实践方案！文末源码仅供参考。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f977b58621474881a22219b8c49337cf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1079&h=387&s=62033&e=png&b=fffbfb)

## 二. uni-http 支持环境

### 2.1 Vue 版本

`uni-http` 使用 `TypeScript` 开发， 支持 `Vue2` 和 `Vue3` 的版本。

### 2.2 应用兼容性

基于 `uni.request`，所以和 `uni.request` 有同样的兼容性

- 完全支持 APP、H5、微信小程序
- 其他小程序有部分兼容性问题，如下图所示

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/838847c9dfbe45d793d29c1bdd17097c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2076&h=752&s=68382&e=png&b=ffffff)

### 2.3 安装方式

- npm 安装：推荐

```bash
npm install @anyup/uni-http -S
```

- cdn 引入

```html
<!-- 最新版 -->
<script src="https://unpkg.com/@anyup/uni-http/dist/uni-http.umd.js"></script>

<!-- 指定版本号 -->
<script src="https://unpkg.com/@anyup/uni-http@1.1.1/dist/uni-http.umd.js"></script>

<script>
  const { Http } = UniHttp
  const http = new Http()
</script>
```

- 静态文件引入：不推荐，无法实时更新

复制 `dist` 文件夹下的 `uni-http.umd.js` 文件，引入现有的项目中。

## 三. uni-http 构建基础请求类

### 3.1 初始化 http

uni-http 提供了一个基础类 `Http`，类中提供了一下请求方法 `get`, `post`, `put`, `patch`, `head`, `delete`，`request` 等，实例化基础类后可以使用其内部方法

> 说明：所有的请求方式 `get`, `post`, `put`, `patch`, `head`, `delete` 等都是基于 `request` 方法，因此 `request` 是基准方法！

```js
import { Http } from '@anyup/uni-http'

const http = new Http()
```

很简单，基础类的创建形式，使用 `new` 方法就可以创建一个 `Http`，接下来我们来快乐的使用它！

> 以下的代码均基于已创建的 http 来说明使用

### 3.2 设置共有变量

共有变量类似于配置文件，维护一些公共的请求配置信息，主要是在每个请求进行时，无需重复设置，即可携带这种公共配置的一种策略。在 API 的请求机制中，uni-http 请求库支持的共有变量都有：

- `baseURL` ：主要是统一设置接口前缀，发起请求是自动组装 URL，完整的请求 url 为 `baseURL + url` > `header` 头部：请求头的作用是为了使请求更加具有针对性、安全、高效地与服务器通信。比如设置身份验证，设置 Content-Type

- `data` 请求体：不常用，有些场景下可能会需要，例如：传递时间戳

#### 3.2.1 设置 baseURL

```js
const baseURL = 'https://www.api.demo'
http.setBaseURL(baseURL)
```

#### 3.2.2 设置 header 头部

```js
const header = { 'Content-Type': 'application/json' }
http.setHeader(header)
```

#### 3.2.3 设置请求体

```js
const timestamp = Date.now()
http.setData({ timestamp })
```

在实时请求时传递的请求体，会与这里的请求体合并传递给后端。

### 3.3 设置拦截器

拦截器是用来在发送请求和接收响应之前对请求进行拦截和处理的机制，拦截器可以对请求和响应进行一系列的操作，如**修改请求参数**、**处理错误信息**等等。

#### 3.3.1 请求拦截器

请求拦截器是用来在发送请求之前拦截并处理请求的机制。比如添加公共请求头、身份验证信息、修改请求参数等。

```js
// 设置请求拦截器
http.interceptors.request.use(
  request => {
    // 设置请求header
    request.header['Authorization'] = ''
    return request
  },
  error => Promise.resolve(error)
)
```

#### 3.3.2 响应拦截器

响应拦截器是用来在接收到服务器响应后对响应进行拦截和处理的机制。比如解析响应数据、统一处理错误信息、格式化响应等。

```js
// 设置响应拦截器
http.interceptors.response.use(
  response => {
    // 请求成功
    if (!response.data) {
      return Promise.reject(new Error('接口请求未知错误'))
    }
    // 其他业务处理
    return Promise.resolve(response)
  },
  error => {
    // 请求失败，业务处理
    return Promise.reject(error)
  },
  complete => {
    // 请求完成
    if (complete.request.loading) {
      // 如果配置了loading，请求完成需要关闭
    }
    // 其他业务处理
    console.log('complete', complete)
  }
)
```

### 3.4 导出实例

通过以上的代码流程，我们完成了：

- 初始化 `http` 类
- 设置共有变量
- 设置拦截器

因此接下来我们需要导出这个 `http` 类，以后的全局的请求均使用这个 `http` 来请求。

```js
export default http
```

## 四. uni-http 基础使用方式

### 4.1 目录结构

按照项目模块功能划分目录结构，以电商为例，比如：

- **user**：用户模块
- **cart**：购物车
- **goods**：商品
- **order**：订单
- **coupon**：优惠券
- ... 等等

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99be14279c5c47a585e6162999dd8c30~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=629&h=488&s=44164&e=png&b=191919)

```
├── api                    # 所有请求
├── ├──  modules           # 模块文件夹
├── └── └──  user.js       # 用户模块
├── └── └──  cart.js       # 购物车
├── └── └──  goods.js      # 商品
├── └── └──  order.js      # 订单
├── └── └──  coupon.js     # 优惠券
├── ├──  http.js           # Http 实例
├── ├──  index.js          # 统一导出
├── App.vue                # 入口页面
├── main.js                # 入口文件
├── manifest.json          # 应用配置
├── package.json           # package.json
└── pages.json             # 页面配置
```

### 4.2 定义 URL 配置表并实现

以用户模块为例，常规做法使用以下方式书写：

```js
import http from '@/api/http'

// 定义接口地址
const api = {
  useLogin: '/api/user/login', // 用户登录
  useLogout: '/api/user/logout' // 用户登出
  // ...等等还有很多接口地址
}

// 用户登录方法
export function useLogin(data) {
  return request({
    url: api.useLogin,
    method: 'POST',
    data
  })
}

// 用户登出方法
export function useLogout(data) {
  return request({
    url: api.useLogout,
    method: 'POST',
    data
  })
}

// ...等等还有很多方法
```

> 以上仅是以用户模块的为例，其他模块请求都是这种实现方式，具体可根据不同项目进行开发

### 4.3 页面中使用

在页面中我们可以导入不同的功能模块 API 进行使用，按照业务需求调用模块内的方法

```html
<script>
  import userApi from '@/api/user'

  export default {
    methods: {
      // 种类导航列表
      async userLogin() {
        const data = { username: 'admin', password: '123456' }
        const res = await userApi.userLogin(data)
        // 登录成功，后续处理
        console.log(res)
      }
    }
  }
</script>
```

### 4.4 导出方案

网上有一种约定俗成的导出方案，可以在 `index` 入口中快速将 `modules` 内的所有文件导出并提供使用。

```js
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default modules
```

## 五. FlyHttp 进阶使用

一个简单的小工具，简单配置可自动生成前端代码 **service** 层的工具，目的就是要解放你的双手，化繁为简，可降低代码量 **99%**！

详细了解可参考这篇文章：[前端小工具！加速构建你的 API 请求类，全端通用！](https://juejin.cn/post/7371479502456963106)

以上的文章说明了如何安装及使用，本文不对它做过多的介绍，只说明这两个工具如何结合使用能够快速的构建 uni-app 请求类

### 5.1 安装 Flyit

推荐使用 npm 仓库安装

```bash
npm install @anyup/flyit -S
```

### 5.2 代理 http 实例

将 `http.js` 中的内容改造如下

```js
import { Http } from '@anyup/uni-http'
import { FlyHttp } from '@anyup/flyit'

const baseURL = '/api/h5'
const header = { 'Content-Type': 'application/json' }
const http = new Http().setBaseURL(baseURL).setHeader(header)

// 请求拦截器
http.interceptors.request.use(
  request => {
    // 业务处理
    return request
  },
  error => Promise.resolve(error)
)
// 响应拦截器
http.interceptors.response.use(
  response => {
    // 请求成功
    if (!response.data) {
      return Promise.reject(new Error('接口请求未知错误'))
    }
    // 其他业务处理
    return Promise.resolve(response)
  },
  error => {
    // 请求失败，业务处理
    return Promise.reject(error)
  },
  complete => {
    // 请求完成 其他业务处理
    console.log('complete', complete)
  }
)

export default new FlyHttp.Builder(http)
```

### 5.3 生成 service 层代码

将 **4.2 定义 URL 配置表并实现** 改造如下：

url 配置表对应的方法不需要再次声明，直接调用以下方法即可

```js
import http from '@/api/http'

// 定义接口地址
const urls = {
  userLogin: { url: '/login', method: 'POST' },
  userLogout: { url: '/logout', method: 'POST' }
}

// 以上 url 对应的方法不需要再次声明，直接调用以下方法即可
export default http.dispatch(urls)
```

我们可以看到，以上有两个变动：

- URL 配置表变动
- 不需要定义方法，直接导出了 `http.dispatch`

那么在页面中我们就可以直接使用了！

```html
<script>
  import userApi from '@/api/user'

  export default {
    methods: {
      // 种类导航列表
      async userLogin() {
        const data = { username: 'admin', password: '123456' }
        const res = await userApi.userLogin({ data: data })
        // 请求成功，后续处理
        if (res) {
          console.log(res)
        }
      }
    }
  }
</script>
```

## 六. 总结

通过本篇文章，我们了解了以下内容：

- 如何使用 `uni-http` 请求库标准化的在 `uni-app` 项目中请数据。
- 如何通过 `uni-http` 结合 `FlyHttp` 构建更加高效的请求流程，降低重复代码。

`uni-http` 和 `FlyHttp` 即可单独使用也可结合使用，二者具有极强的解耦性，如果你有更好用的 uni-app 请求库，或者有自己封装的请求库，亦可以搭配 `FlyHttp` 实现生成部分代码！

## 关联文档

[uni.request 官方文档](https://uniapp.dcloud.net.cn/api/request/request.html#request)

[100 行代码打造小而美的 uni-app 请求库](https://juejin.cn/post/7360893272199348233)

[前端小工具！加速构建你的 API 请求类，全端通用](https://juejin.cn/post/7371479502456963106)

## 源码 DEMO

源码仅供参考：

github 源码地址：[uni-app 示例 Demo 源码下载](https://github.com/anyup/juejin-up/tree/master/template/uni-template)

使用过程中部分截图如下：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24ced43e045141648dba94b2b7e06076~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=988&h=529&s=107471&e=png&b=fefdfd)

<ArticleFooter link="https://juejin.cn/post/7374224361560358946" />
