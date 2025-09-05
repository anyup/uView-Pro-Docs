---
title: 100行代码打造小而美的uni-app请求库
---

# 100行代码打造小而美的uni-app请求库

## 一. 前言

在开发 uni-app 项目时，我们经常需要对接后端接口进行数据请求。虽然 uni-app 框架本身提供了`uni.request` 用于发起请求，但在实际项目中，我们往往会封装一些请求库来简化请求的操作，提高代码复用性和可维护性。

本文将介绍基于 `uni.request` 实现一款小而美的请求工具，通过大约 100 行代码的实现，为 uni-app 项目打造一个简洁高效的请求库。

## 二. 请求库的设计思路

### 1. 了解 uni.request

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

### 2. 请求库的实现目标

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cadc5aca19fb4cfcb32579fb0ce5eb1c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=945&h=410&s=75305&e=png&b=ffffff)

我的目标核心是实现一个基于 Promise 的，轻量且强大的 http 网络库，基于以上这个目标，我的请求库应该具备以下基本功能：

1. 提供统一的 `Promise API`
2. 基于 `uni.request`，支持多种运行环境，浏览器 H5、小程序、APP 等
3. 支持发起 `GET`、`POST`、`PUT`、`DELETE` 请求
4. 支持请求／响应拦截器
5. 支持设置请求的 `header`
6. 支持处理请求的 `loading` 状态
7. 支持对请求结果进行统一处理
8. 支持链式调用

## 三. 请求库实现

基于以上的目标特性，我会一步一步实现请求库，而它的实现应该主要包括以下几个核心点：

1. **Config 配置项**：设计一个统一的配置项对象 `config`，其中包含了 baseURL、header、data、method、dataType、responseType 等网络请求的基本配置信息。这样可以确保在发起网络请求时，可以统一管理这些配置项，方便进行全局设置和覆盖。

2. **拦截器 Interceptors**：设计请求拦截器和响应拦截器，提供 `use` 方法来添加拦截器处理函数。请求拦截器可以在发送请求前对请求参数进行处理，而响应拦截器则可以在收到响应后对响应结果进行处理。通过拦截器可以实现一些通用的网络请求处理逻辑，比如添加请求头、处理请求参数、统一处理响应结果等。

3. **链式调用**：在 `setBaseURL`、`setHeader`、`setData` 等方法中都使用了链式调用的方式，即每一个方法返回当前实例的引用，使得可以连续调用多个方法来设置请求的各个参数，提高代码的可读性和可维护性。

4. **Promise 处理**：在 `request` 方法中使用了 Promise 对网络请求的结果进行处理，包括请求成功和失败的处理逻辑。同时也通过 Promise 来处理拦截器的返回结果，保证请求和拦截器的执行顺序和逻辑。

5. **错误处理**：在请求完成后，根据返回的状态码来判断请求的成功与失败，并通过不同的处理逻辑来处理不同状态下的响应结果。同时，在拦截器和请求的过程中，也会对错误进行处理，保证请求过程的稳定性和可靠性。

接下来我们分别对以上的核心点进行一一实现：

### 1. 构造函数

- 在构造函数中，初始化 `config` 对象和 `interceptors` 对象，分别用来存储请求的配置信息和拦截器。

- `config` 包含了 baseURL、header、data、method、dataType、responseType、success、fail 和 complete 等属性。

- `interceptors` 包含了 request 和 response 拦截器，用来处理请求和响应的拦截操作。

通过构造函数，来定义统一的公共变量

```js
class Http {
  constructor() {
    this.config = {
      baseURL: "",
      header: { "Content-Type": "application/json;charset=UTF-8" },
      data: {},
      method: "GET",
      dataType: "json",
      responseType: "text",
      success() {},
      fail() {},
      complete() {},
    };
  }
}
```

### 2. 设置 BaseURL

定义 `setBaseURL` 方法，用来设置请求的基础 URL 统一请求前缀，将传入的 baseURL 参数赋值给 config.baseURL 属性。

```js
function setBaseURL(baseURL) {
  this.config.baseURL = baseURL;
  return this;
}
```

### 3. 设置请求 header

定义 `setHeader` 方法，用来设置请求的头部信息，将传入的 header 参数与原有的 header 属性合并更新。

```js
function setHeader(header) {
  this.config.header = { ...this.config.header, ...header };
  return this;
}
```

### 4. 设置请求体

定义 `setData` 方法，用来设置请求的数据，根据传入的数据类型判断是直接赋值还是合并更新到 config.data 属性中。

```js
function setData(data) {
  if (Array.isArray(data)) {
    this.config.data = data;
  } else {
    this.config.data = { ...this.config.data, ...data };
  }
  return this;
}
```

### 5. 设置拦截器

设计请求拦截器和响应拦截器，提供 `use` 方法来添加拦截器处理函数。请求拦截器可以在发送请求前对请求参数进行处理，而响应拦截器则可以在收到响应后对响应结果进行处理。

通过拦截器可以实现一些通用的网络请求处理逻辑，比如添加请求头、处理请求参数、统一处理响应结果等。

```js
this.interceptors = {
  response: {
    use(handler, onerror, complete) {
      this.handler = handler;
      this.onerror = onerror;
      this.complete = complete;
    },
  },
  request: {
    use(handler) {
      this.handler = handler;
    },
  },
};
```

### 6. 基于 Promise 对象来实现

通过以上的配置，其实我们已经完成了一半，接下来，使用这些配置好的变量按需使用 `uni.request` 就可以了，是不是很简单？

而 request 方法应该包含以下内容：

- `request` 方法用来发起请求，根据传入的 URL、数据和选项进行请求配置。

- 先处理请求的基础配置，包括 URL、baseURL、header、method、dataType 等。

- 接着处理拦截器，分为 request 和 response 拦截器，根据拦截器的设置进行相应的拦截操作。

- 最后返回一个 Promise 对象，实现异步请求的链式调用，并根据请求结果执行相应的回调处理。

接下来，我们按部就班的来实现我们最重要的 request 方法

```js
function request(url, data, options) {
  if (!options) options = {};
  // 请求URL
  options.url = url;
  // 请求baseURL：优先级为：实时传递的 > 公共配置的
  options.baseURL =
    options.baseURL !== undefined ? options.baseURL : this.config.baseURL;
  // 请求头：合并公共配置与实时设置的header， 且优先级实时设置会覆盖公共配置的
  options.header = { ...this.config.header, ...options.header };
  // 请求方式：优先级为：实时传递的 > 公共配置的
  options.method = options.method || this.config.method;
  // 数据格式：默认json
  options.dataType = options.dataType || this.config.dataType;
  // 请求体：优先级为：实时传递的 > 公共配置的
  if (isArray(data)) {
    options.data = data;
  } else {
    options.data = { ...this.config.data, ...data };
  }
  // 拦截器处理
  let interceptors = this.interceptors;
  let requestInterceptor = interceptors.request;
  let responseInterceptor = interceptors.response;
  let requestInterceptorHandler = requestInterceptor.handler;
  // 实现 Promise
  return new Promise((resolve, reject) => {
    function isPromise(p) {
      return p && p.then && p.catch;
    }

    /**
     * 公用方法
     * If the request/response interceptor has been locked
     */
    function enqueueIfLocked(promise, callback) {
      if (promise) {
        promise.then(() => {
          callback();
        });
      } else {
        callback();
      }
    }
    // 响应回调
    function onresult(handler, response, type) {
      enqueueIfLocked(responseInterceptor.p, function () {
        if (handler) {
          // 统一添加请求信息
          response.request = options;
          let ret = handler.call(responseInterceptor, response, Promise);
          response = ret === undefined ? response : ret;
        }
        if (!isPromise(response)) {
          response = Promise[type === 0 ? "resolve" : "reject"](response);
        }
        response
          .then((d) => {
            resolve(d.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    }
    // 请求完成回调，不管请求成功或者失败，都会走这个方法
    options.complete = (response) => {
      let statusCode = response.statusCode;
      let type = 0;
      if ((statusCode >= 200 && statusCode < 300) || statusCode === 304) {
        // 请求成功
        type = 0;
        onresult(responseInterceptor.handler, response, type);
      } else {
        // 请求错误
        type = -1;
        onresult(responseInterceptor.onerror, response, type);
      }
      // 请求完成，无论请求成功、失败都会走的回调
      onresult(responseInterceptor.complete, response, type);
    };

    // 开始请求
    enqueueIfLocked(requestInterceptor.p, () => {
      options = Object.assign({}, this.config, options);
      options.requestId = new Date().getTime();
      let ret = options;
      if (requestInterceptorHandler) {
        ret =
          requestInterceptorHandler.call(
            requestInterceptor,
            options,
            Promise
          ) || options;
      }
      if (!isPromise(ret)) {
        ret = Promise.resolve(ret);
      }
      ret.then(
        (d) => {
          if (d === options) {
            // url处理
            d.url =
              d.url && d.url.indexOf("http") !== 0 ? d.baseURL + d.url : d.url;
            // 是否有追加restful url
            d.url = d.restURL ? d.url + d.restURL : d.url;
            // 使用 uni.request 正式请求， d 为所有的请求参数
            uni.request(d);
          } else {
            resolve(d);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}
```

综上所述，以上请求库的设计思路是以封装、拓展性和易用性为核心，通过配置项、拦截器、链式调用和 Promise 处理等设计，实现了一个简单但功能完善的网络请求库，适用于处理各种类型的网络请求需求。

总的来说，以上代码实现了一个简洁易用的 HTTP 请求类，结合了配置管理、拦截器功能和异步请求处理，并提供了一些常用的方法来方便进行 HTTP 请求的管理和处理。

## 四. 使用方式

### 1. npm 安装

我已经将`uni-http`的请求库发到了`npm`上了，并且在多个项目中得到了良好的应用，可直接使用 `npm` 安装使用，通过如下方式进行安装：

```bash
// 安装
npm install @anyup/uni-http -S

// 更新
npm update @anyup/uni-http
```

点击查看在 npm 上完整的 uni-http 请求库，欢迎大家使用：[npm 地址](https://www.npmjs.com/package/@anyup/uni-http)

### 2. 快速上手

#### 实例化 Http 类

Http 为一个类，所以在使用前需要实例化 `new`，通过构造函数实例化一些必备参数

```js
import { Http } from "@anyup/uni-http";

const http = new Http();

// 设置统一的头部
const header = { "Content-Type": "application/json" };

// 仅为示例 API 域名，使用时替换自己的接口域名即可
const baseURL = "https://demo.api.com";

// 设置 baseURL 和 header，支持链式调用
http.setBaseURL(baseURL).setHeader(header);
```

#### 设置拦截器

- 通过 `interceptors.request.use` 设置请求拦截器，主要对请求 header 的配置，比如 token 等。
- 通过 `interceptors.response.use` 设置响应拦截器，如果需要，可以对所有的请求成功的响应数据做统一的业务处理，以简化代码。

```js
// 设置请求拦截器
http.interceptors.request.use(
  (request) => {
    if (request.loading) {
      // 如果配置了loading，请求开始需要显示
    }
    // 设置请求header
    request.header["Authorization"] = "";
    return request;
  },
  (error) => Promise.resolve(error)
);
// 设置响应拦截器
http.interceptors.response.use(
  (response) => {
    // 请求成功
    if (!response.data) {
      return Promise.reject(new Error("接口请求未知错误"));
    }
    // 其他业务处理
    return Promise.resolve(response);
  },
  (error) => {
    // 请求失败，业务处理
    return Promise.reject(error);
  },
  (complete) => {
    // 请求完成
    if (complete.request.loading) {
      // 如果配置了loading，请求完成需要关闭
    }
    // 其他业务处理
    console.log("complete", complete);
  }
);
```

#### 请求示例

以登录请求为示例，通过传递 url，data，option，分别配置请求的 api 地址，请求参数，以及请求的个性化配置（是否需要请求 loading 等）。

```js
// 登录请求示例，并配置请求时显示loading
function requestLogin(username, password) {
  http
    .request(
      "/login",
      { username, password },
      { method: "POST", loading: true }
    )
    .then((res) => {
      // 处理 response 响应
      if (res.status === 1) {
        console.log(res);
      }
    });
}

// 直接使用 get|post|put|delete 方式请求
function requestLogin1(username, password) {
  // 也可以直接使用 post 方法
  http.post("/login", { username, password }, { loading: true }).then((res) => {
    // 处理 response 响应
    if (res.status === 1) {
      console.log(res);
    }
  });
}

// es6 await 风格 登录请求示例
async function requestLogin2(username, password) {
  const res = await http.request(
    "/login",
    { username, password },
    { method: "POST", loading: true }
  );
  // 处理 response 响应
  if (res.status === 1) {
    console.log(res);
  }
}
```

## 五. 总结

通过以上代码的实现，我们成功构建了一个简洁高效的 uni-app 请求库，实现了一个小而美的 uni-app 请求库，能够满足常见的请求需求，同时除去注释，代码量也被控制在了 100 行左右。而且还实现了统一请求响应拦截器、全局错误处理等功能，使用它可以让我们的项目开发变得更加顺畅和便利。

希望本文能够对大家在 uni-app 项目中封装请求库有所帮助，让我们的开发工作更加高效和便捷。

在实际项目中，如果你有任何疑问或建议，欢迎联系我，我可以根据需求继续扩展这个请求库。

## 六. 结语

- 如果你有任何问题，或者想要共同学习交流，欢迎通过沸点联系我：[点击查看沸点](https://juejin.cn/pin/7360857598806310963)

- 剧透：篇幅有限，下篇文章我会继续以此为基础，说明如何实现批量生成 API 请求，简化代码量 **99.99%**，通过类的工厂模式，搞定繁琐的请求 function 定义，敬请关注！

## 源码

开源不易，欢迎 Start、Fork

- [Github](https://github.com/anyup/uni-http)

- [Gitee](https://gitee.com/anyup/uni-http)

- [npm](https://www.npmjs.com/package/@anyup/uni-http)

<ArticleFooter link="https://juejin.cn/post/7360893272199348233" />