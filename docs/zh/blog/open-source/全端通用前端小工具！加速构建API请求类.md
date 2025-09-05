---
title: 前端小工具！加速构建你的API请求类，全端通用
---

# 前端小工具！加速构建你的API请求类，全端通用

## 一. 前言

> 这是一个自动生成前端代码 **service** 层的工具，目的就是要解放你的双手，化繁为简，可降低代码量 **99%**！

在开发前端项目时，尤其是目前绝大多数的项目都是前后端分离式开发的形式，因此我们经常需要对接后端接口，进行前后端交互。而基于这些，就出现了琳琅满目的前端请求框架！

从最初的 `XMLHttpRequest` 到 `ajax`、`Fetch API` ，再到 `axios`，各种各样的搭配不同框架的网络请求库应运而生，它们服务于不同的前端框架，进行优秀的前后端数据交互，给我们前端开发者提供了便利性。

虽然很方便，但是我却不满足，因为不喜欢折腾的程序员不是好将军，写代码时，还是时常问一下自己，是否还能再方便些？

因为网络请求通常就是最常用的 `GET` `PUT` `POST` `DELETE` `PATCH` 这几种，而且大多数中声明的请求方法都是重复的，是有据可循的，因此我想从这方面着手，能否优化请求流程，解放双手，进一步为开发提供便利性！

**CTRL + CV** 的开发模式，我们一定要**摒弃**！

本文介绍的工具库是 `Flyit` 工具库中的 http 模块 `FlyHttp`，核心目的就是要省略某些重复的代码，部分配置化实现极致开发体验！


![FlyHttp 文章大纲.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8348333de904d0fb60fc61cc292f4de~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2064&h=1125&s=353154&e=png&b=fffefe)
<p align=center>文章脉络全览图</p>

## 二. 认识网络请求

### 2.1 前端开发模式

在前端开发中，网络请求库通常与不同的前端框架中搭配使用，目前前端开发形式可能包括但不限于以下几种形式，我简单总结了以下几种：

1. **jQuery**：`jQuery` 是早期 `JavaScript` 框架中的王者，其中提供了方便的 `AJAX` 方法来发送网络请求。

2. **Vue**：`Vue.js` 可以说是在国内前端框架的佼佼者，提供了 `axios` 的插件来处理网络请求。

3. **React**：`React` 是另一款热门的前端框架，它本身并没有集成网络请求的功能，所以通常也会搭配像 `axios` 或者 `Fetch API` 这样的库来进行网络请求。

4. **uni-app**：`uni-app` 是一个基于 `Vue.js` 的跨平台应用开发框架，在 `uni-app` 中，可以使用封装了网络请求功能的 `uni.request` API 来进行网络请求。

5. **原生 JavaScript**：通过原生的 `XMLHttpRequest` 对象或者 `Fetch API` 来发起网络请求。

### 2.2 网络请求库

我们可以从以上这些常用的前端框架中总结出来，主流的前端请求库主要包括以下几种：

1. **axios**：基于 `Promise` 的 HTTP 客户端，可以在浏览器和 Node.js 中使用。具有简洁的 API、易用的请求拦截和响应拦截、自动处理请求和响应数据等特点，被广泛应用于前端项目中。

2. **fetch**：现代浏览器原生支持的 API，用于替代传统的 `XMLHttpRequest` 对象。

3. **jQuery**：尽管 jQuery 已经逐渐被更现代的框架替代，主要是对于一些传统项目仍然在继续使用。

4. **原生 XMLHttpRequest**：传统原生的的 XMLHttpRequest 对象，基本不会在代码中使用，仅做了解即可。

因此本文也会以这些请求库为基准，同时也回顾下在实际开发中，这些请求库的常规使用思路！

### 2.3 请求示例

以以上介绍的请求库为准，接下来我们来看一下在实际开发中，这些网络请求库是如何进行使用的！

#### 2.3.1 使用原生 `XMLHttpRequest`

`XMLHttpRequest` 是实现 `Ajax`（**Asynchronous JavaScript and XML**）技术的基础，它是原生的 `JavaScript`，可以在任何支持 `JavaScript` 的环境中使用。在早期的前端开发中，XMLHttpRequest 是发起异步请求是常见的做法。

以下是使用原生的 `XMLHttpRequest` 的方式来发起网络请求：

```js
// 简单封装一下
function httpRequest(url, method, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(null, xhr.responseText)
      } else {
        callback('error：' + xhr.statusText, null)
      }
    }
  }
  xhr.send()
}

// 使用方式
httpRequest('https://api.example.com/data', 'GET', function (error, response) {
  if (error) {
    console.error(error)
  } else {
    console.log(JSON.parse(response))
  }
})
```

#### 2.3.2 使用 jQuery 的 ajax

`jQuery` 的 `ajax` 方法主要在 `jQuery` 库中使用。在早期的前端开发中，`jQuery` 是非常流行的前端库，其提供的 `ajax` 方法简化了通过 `XMLHttpRequest` 发起异步请求的操作。

以下是使用 `jQuery` 的 `ajax` 的方式来发起网络请求：

```javascript
jQuery.ajax({
  url: 'https://api.example.com/data',
  method: 'GET',
  dataType: 'json',
  success: function (data) {
    console.log(data)
  },
  error: function (xhr, status, error) {
    console.error('error：', error)
  }
})
```

#### 2.3.3 使用 `Fetch API`

`Fetch API` 是一种现代的 `Web API`，用于网络请求和响应。它提供了一种更强大和灵活的方式来处理网络请求，取代了传统的 `XMLHttpRequest`。`Fetch API` 广泛应用于现代的前端开发中，特别是在基于 `JavaScript` 的前端框架和库中。

以下是使用 `Fetch API` 的方式来发起网络请求：

```javascript
fetch('https://api.example.com/data')
  .then(function (response) {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('error：' + response.statusText)
    }
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.error(error)
  })
```

#### 2.3.4 使用 axios

`axios` 是一个独立的 **HTTP 客户端库**，可以与任何前端框架或库结合使用。由于他提供了简洁易用的 `API`，支持 `Promise`，以及在浏览器和 `Node.js` 环境中均可使用，因此在许多前端项目中被广泛应用。

以下是使用 `axios` 的方式来发起网络请求：

```javascript
axios
  .get('https://api.example.com/data')
  .then(response) {
    console.log(response.data)
  }
  .catch(error) {
    console.error('发生错误：', error)
  }
  .finally(info) {
    console.error('请求完成：', info)
  }
```

通过以上的介绍，我们大体了解了几种主流的前端网络请求库是如何使用的了，其实他们之间的相似点还是很多的，原理暂不讨论，入参 `url`、`method` 是必要的，区别也仅在于一些使用形式，是否支持 `Promise`? 等。

> 说明：FlyHttp 工具的主要思想不是要重复建造轮子，也不会对这些优秀的网络请求库二次封装，而是以另一种思维方式与这些优秀的请求框架结合，其主要目的是加速自己在前端项目中的请求构建，优化在开发项目时的极致体验。

## 三. 讲述 FlyHttp 设计思想

以 `Vue.js` 框架为例子，我们简单看一下，在进行项目开发中，使用 `axios` 在前端进行网络请求，我们需要进行哪些步骤？

### 3.1 传统的开发流程

#### 3.1.1 封装 axios

在我们进行前端项目开发时，封装 `axios` 是必须的。因为每个项目业务可能都不一样，但是封装思想都是一样的，封装适合自己的 `axios`，不但可以统一管控自己的请求入口，还能大大节约请求工作量，这其中的好处不言而喻。

直接拿来我自己封装的 `axios` 核心代码，包括但不限于以下的简单形式：主要是构建实例，请求拦截等。

```js
import axios, { AxiosInstance } from 'axios';

// 配置新建一个 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如认证token
    if ('token') {
      config.headers!['Authorization'] = 'token';
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.status && res.status !== 200) {
      return Promise.reject(request.interceptors.response);
    } else {
      return res;
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') != -1) {
      console.error('网络超时');
    } else if (error.message == 'Network Error') {
      console.error('网络连接错误');
    } else {
      if (error.response.data) console.error(error.response.statusText);
      else console.error('接口路径找不到');
    }
    return Promise.reject(error);
  }
);
```

#### 3.1.2 开发请求 API

对以上简单封装后，我们就可以使用封装好的 `axios` 实例来进行编写请求方法了

```js
import request from '@/utils/request'

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

页面中使用方式如下：

```js
import api from '@/api'

// 用户登录
api.userLogin(params)
// 用户的登出
```

通过以上的步骤，我们就实现了**传统的、标准化**的请求流程，这种请求使用方式是在前端项目中，我认为是最常见的代码书写方式，很简单、很规范、也很好理解，可以说结构特别清晰，我认为完全没有问题！因为我在项目中，大致也是这么使用的。

### 3.2 思考如何优化？

通过以上方式的实现，我们我们有没有想过，我们在不断的重复写一些代码，不断重复的写这些 `API` 声明、`API` 请求方法！如果是一个庞大的应用，`API` 有几百个也是有可能的。

试想一下：有多少个 `API` 地址，我们就会写多少个请求方法。如果将来需要改动，我们也要联动改动。那么在实际开发中可不可以优化呢？这些重复的方法声明可以省略掉吗？（**重复的代码我不想写第二遍**）

因此，本工具的理念就是做这些重复的劳动，我们只需要配置，其他的交给工具就可以了！

#### 3.2.1 工具雏形

在 `3.1.2` 的代码步骤中，其实有一些是可以省略掉的，接口地址的定义属于配置文件，必须声明，因为每一个接口地址都是不同的。但是可以将请求方法的的构建省略，因为它们都具有相似性，可以使用函数将其生成。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d8d9e80672f4dcf90a8bf41309e4132~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=749&h=645&s=69439&e=png&b=272c33)

基于以上这个思想，就有了该工具库的雏形，如下部分核心代码：

```js
import request from '@/utils/request'

// 定义接口地址
const api = {
  useLogin: '/api/user/login', // 用户登录
  useLogout: '/api/user/logout' // 用户登出
  // ...等等还有很多接口地址
}
const modules = {}

// 写一个函数自动注入
Object.keys(api).forEach(key => {
  modules[key] = function (parameter, config = {}) {
    const url = config.url || api[key]
    const method = config.method || 'get'
    const params = method === 'get' ? parameter : {}
    const data = method === 'get' ? {} : parameter
    return request({ ...{ url, method, params, data }, ...config })
  }
})

export default modules
```

如下图所示，可以看到，通过运行代码，已经生成了请求类。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fe08125af9f4db895af8f6882c17779~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=802&h=92&s=15348&e=png&b=fefefe)

页面中使用方式如下：

```js
import api from '@/api'

// 用户登录
api.userLogin(params)
// 用户的登出
api.userLogout()
// 一些开发的参数传递
api.userLogin(params, { method: 'POST' })
```

#### 3.2.2 改进思考

其实以上的操作能够节省掉 `80%` 的代码，至少我们所有的方法声明都不用写，但是同时也有个问题，并不能适用于所有的方式！比如 **RESTful** 接口形式的请求。

可能有些前端开发对 **RESTful** 不太了解，这里简单说一下 **RESTful** 接口形式：

> RESTful（Representational State Transfer）是一种基于资源的软件架构风格，它是一种设计网络应用程序的方式，特别适用于构建 Web 服务，它是一种基于 REST 原则设计的接口规范

说白了，**RESTful** 接口使用 **HTTP** 协议定义了一组常见的操作行为：`GET`（获取资源）、`POST`（创建资源）、`PUT`（更新资源）、`DELETE`（删除资源）等。通过合理地使用这些 `HTTP` 方法，可以实现对资源的增删改查操作。

说的再直白一点，就是接口地址是一样的，通过请求方式（`GET/POST/PUT/DELETE`）实现对资源的**增删改查**操作。

因此，假如我们有一些接口是这一种请求方式，通过 `id` 获取用户信息：`/api/user/{id}`，以上的方式却不太适合，我们可以进行加以改造：

```js
import request from '@/utils/request'

// 定义接口地址
const api = {
  user: '/api/user' // 用户模块
}
const modules = {}

// 改进函数，添加 append 参数，用
Object.keys(api).forEach(key => {
  modules[key] = function (parameter, config = {}) {
    const append = config.append || ''
    const url = `${config.url || api[key]}${append}`
    const method = config.method || 'GET'
    const params = method === 'GET' ? parameter : {}
    const data = method === 'GET' ? {} : parameter
    return request({ ...{ url, method, params, data }, ...config })
  }
})
// 其他不兼容的方法，可使用自定义方法
modules.other = function (params) {
  return request({ url: '', params, method: 'GET' })
}

export default modules
```

再次运行代码，请求类已经包含了我们的自定义 **other** 方法

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bac4c6ce53d54a3a8461197661367ab5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=802&h=92&s=12046&e=png&b=ffffff)

页面中使用方式如下：

```js
import api from '@/api'

// 新增用户
api.user(params, { method: 'POST' })
// 删除用户
api.user({}, { method: 'DELETE', append: `/${userId}` })
// 修改用户
api.user(params, { method: 'PUT' })
// 查询用户
api.user(params, { method: 'GET', append: `/${userId}` })

// 其他不兼容的方法，使用自定义方法
api.other(params)
```

以上的代码其实就是 `Flyit` 工具库中 `FlyHttp` 模块的核心思想，后面的改进优化思路也都是依据请求框架来不断进步的，我整理了一下思路和代码，现已经将它发布到 `npm`，接下来我们看看具体如何使用吧！

## 四. 如何使用 FlyHttp

这是一个通用的 `JS` 包，原则上你可以在任何能运行 `JavaScript` 的地方使用，不依赖于任何的前端框架！

目的在于省略某些大量重复代码，少量配置化代码，即可实现极速开发体验！

[NPM 仓库地址](https://www.npmjs.com/package/@anyup/flyit)

### 4.1 安装

```sh
npm install @anyup/flyit -S
```

### 4.2 使用

#### 4.2.1 在 Vue / React 中使用 (axios)

```js
import { FlyHttp } from '@anyup/flyit'

// 1. 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: 'https://api.demo.com',
  timeout: 20000,
  headers: { 'Content-type': 'application/json' }
})

// 2. 创建 FlyHttp 实例
const flyHttp = new FlyHttp.Builder(axiosInstance)

// 3. 定义 URL 配置表
const urls = {
  login: { url: '/login', method: 'POST' }
}

// 4. 分发 URL
const api = flyHttp.dispatch(urls)

// 5. 页面接口
const login = () => {
  return api.login({ data: { username: 'admin' } })
}
```

#### 4.2.2 在 h5 / browser 中使用 (jQuery ajax)

> 复制 `dist` 文件夹下的 `flyit.umd.js`文件，或使用 `cdn` 线上地址，引入现有的项目中。

cdn 地址引入方式如下


```html
<!-- 最新版 -->
<script src="https://unpkg.com/@anyup/flyit/dist/flyit.umd.js"></script>

<!-- 指定版本号 -->
<script src="https://unpkg.com/@anyup/flyit@1.0.2/dist/flyit.umd.js"></script>
```

以使用 `jquery` 的 `ajax` 请求为例：

```html
<script src="dist/flyit.umd.js"></script>
<script src="dist/jquery.min.js"></script>

<script>
  const { FlyHttp } = Flyit

  const baseURL = 'https://api.demo.com'
  const headers = { 'Content-type': 'application/json' }

  // 1. 创建 ajax 实例
  function ajaxRequest({ url, method, data, success, fail, complete }) {
    jQuery.ajax({
      url: `${baseURL}${url}`,
      type: method,
      data,
      dataType: 'json',
      headers,
      success: success,
      error: fail,
      complete: complete
    })
  }

  // 2. 创建 FlyHttp 实例
  const flyHttp = new FlyHttp.Builder(config => {
    const { url, method, data } = config
    return ajaxRequest({ url, method, data })
  })

  // 3. 定义 URL 配置表
  const urls = {
    login: { url: '/login', method: 'POST' }
  }

  // 4. 分发 URL
  const api = flyHttp.dispatch(urls)

  // 5. 页面接口
  const login = () => {
    api.login({
      data: { username: 'admin' },
      success: res => {
        console.log('success', res)
      },
      fail: res => {
        console.log('fail', res)
      },
      complete: res => {
        console.log('complete', res)
      }
    })
  }
</script>
```

#### 4.2.3 在 uni-app 中使用 

在 `uni-app` 框架中，以官方提供 `uni.request` 网络请求为例，我们来看一下如何使用：

```js
import { FlyHttp } from '@anyup/flyit'

const baseURL = 'https://api.demo.com'
const headers = { 'Content-type': 'application/json' }

// 1. 创建 request 实例
function uniRequest({ url, method, data }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseURL}${url}`,
      data,
      method,
      dataType: 'json',
      header: headers, // 请求头信息
      success: res => {
        resolve(res.data)
      },
      fail: e => {
        reject(e)
      }
    })
  })
}

// 2. 创建 FlyHttp 实例
const flyHttp = new FlyHttp.Builder(uniRequest)

// 3. 定义 URL 配置表
const urls = {
  login: { url: '/login', method: 'POST' }
}

// 4. 分发 URL
const api = flyHttp.dispatch(urls)

// 5. 页面接口
const login = () => {
  return api.login({ data: { username: 'admin' } })
}
```

#### 4.2.4 在 node 中使用

##### ESM 模块规范

```js
import { FlyHttp } from '@anyup/flyit'

// 1. 创建 http 实例
const httpInstance = {}

// 2. 创建 FlyHttp 实例
const flyHttp = new FlyHttp.Builder(httpInstance)

// 3. 定义 URL 配置表
const urls = {
  login: { url: '/login', method: 'POST' }
}

// 4. 分发 URL
const api = flyHttp.dispatch(urls)

// 5. 页面接口
const login = () => {
  return api.login({ data: { username: 'admin' } })
}
```

##### CJS 模块规范

```js
const { FlyHttp } = require('@anyup/flyit')

// 1. 创建 http 实例
const httpInstance = {}

// 2. 创建 FlyHttp 实例
const flyHttp = new FlyHttp.Builder(httpInstance)

// 3. 定义 URL 配置表
const urls = {
  login: { url: '/login', method: 'POST' },
  logout: { url: '/logout', method: 'POST' }
}

// 4. 分发 URL
const api = flyHttp.dispatch(urls)

// 5. 页面接口
const login = () => {
  return api.login({ data: { username: 'admin' } })
}
```

### 4.3 说明

`FlyHttp` 模块提供了两种构建模式，一种是直接使用我们已经二次封装的好的 `http` 实例，使用 `http` 实例有一些规则要求，主要参考 `axios` 设计，如果不支持这种方式，我也提供了另一种自定义函数的方式来兼容，总之可以兼容大部分请求形式！

#### 4.2.1 使用 http 实例

> 参考第 `2.1` 部分，在 **Vue / React** 中使用，使用 `axios` 的构建方案!

本工具支持传入 `http` 实例，将会代理 `http` 实例进行请求，但是对 `http` 的请求格式有一些要求：

- `http` 请求必须支持 `Promise`
- `http` 请求格式为 `http.request(params)`

`params` 参数对象大致如下：

```js
// `url` 是用于请求的服务器 URL
url: '/user'

// `method` 是创建请求时使用的方法
method: 'get' // 默认值

// `params` 是与请求一起发送的 URL 参数
params: {
  ID: 12345
}

// `data` 是作为请求体被发送的数据
data: {
  firstName: 'Fred'
}
```

#### 4.2.2 使用自定义函数

使用 `http` 实例，可能有时候会有一定的耦合性，极端情况下（可能有我没有用的请求库，请求格式不统一等）有可能会不符合要求，因此提供一个自定义函数的入口，可灵活使用！

> 参考第 `2.2` 部分，在 **h5 / browser** 中使用，使用 `ajax` 的构建方案!

```js
// 1. 创建 ajax 实例
function ajaxRequest({ url, method, data, success, fail, complete }) {
  jQuery.ajax({
    url: `${baseURL}${url}`,
    type: method,
    data,
    dataType: 'json',
    headers,
    success: success,
    error: fail,
    complete: complete
  })
}

// 2. 创建 FlyHttp 实例
const flyHttp = new FlyHttp.Builder(config => {
  const { url, method, data } = config
  return ajaxRequest({ url, method, data })
})
```
## 五 浅谈 FlyHttp 最佳实践

开发时的最佳实践是一系列被广泛认可的方法和原则，可以帮助开发人员提高代码质量、提高团队效率、降低维护成本等。

以下是我总结的在进行 `API` 网络请求开发时的最佳实践，仅供参考：

#### 5.1 构建流程顺序

![浅谈 API 请求最佳实践.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2492c2f67e0449aa5af22e9b74206f3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1472&h=683&s=156847&e=png&b=fef7f7)

#### 5.2 Axios + FlyHttp 使用流程

以下是我在使用 Vue3 开发项目时的部分核心代码截图，请参考：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47bc81bb023f470789c75df5f4763442~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1352&h=734&s=241502&e=png&b=202020)

#### 5.3 请求示例演示

![http-demo.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/648da621f0a2440d81ec151134b80513~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=600&s=560997&e=gif&f=102&b=fefefe)

## 六. FlyHttp 适用领域

这是一个通用的 `TypeScript` 包，适用于任何在前端开发中，原则上你可以在任何能运行 `JavaScript` 的地方使用，与前端框架无关，可全端通用，包括但不限于使用以下方式开发：

- JavaScript
- TypeScript
- Vue.js
- React.js
- Angular.js
- uni-app
- 小程序

## 七. 说明

1. 在使用本工具前，要求你至少了解相关框架的不同网络请求库的使用方式，比如：`axios`、`ajax`、`Fetch API`的基本使用和基本配置，然后再查看本文档。

2. 本文档仅负责介绍 `Flyit` 工具的相关使用，如需了解更多其他相关内容，请移步相关的官方文档：

- [Vue.js 官方文档](https://cn.vuejs.org/)

- [uni-app request 官方文档](https://uniapp.dcloud.net.cn/api/request/request.html#request)

- [Axios 请求库官方文档](https://axios-http.com/zh/)

- [Fetch API](https://javascript.info/fetch-api)

- [jQuery ajax](https://api.jquery.com/jQuery.ajax/)

- [XMLHttpRequest MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

> github 源码及示例代码正在逐步开放中，官方文档正在加紧建设中，请耐心等待...

更新：[flyit 官方文档](https://www.anyup.cn/site/zh/flyit/guide/introduce.html)

<ArticleFooter link="https://juejin.cn/post/7371479502456963106" />