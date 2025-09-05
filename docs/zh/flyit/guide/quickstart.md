---
title: 快速上手
---

# 快速上手

## 1. 在 Vue / React 中使用 (FlyHttp axios)

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

## 2. 在 h5 / browser 中使用 (FlyHttp jQuery ajax)

> 复制 `dist` 文件夹下的 `flyit.umd.js`文件，或使用 `cdn` 线上地址，引入现有的项目中。

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

## 3. 在 uni-app 中使用 (FlyHttp uni.request)

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

## 4. 在 node 中使用

### ESM 模块规范

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

### CJS 模块规范

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
