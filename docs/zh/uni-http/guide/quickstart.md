---
title: 快速上手
---

# 快速上手

## 1. 实例化 Http 类

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

## 2. 设置拦截器

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

## 3. 请求示例

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
