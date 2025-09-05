---
title: Http - 网络请求
pageClass: demo-preview
---

<DemoPreview url="pages/js/http"/>

# Http - 网络请求

## 简介

一个基于 `promise` 的，轻量且强大的 `http` 网络库，特点如下：

1. 提供统一的 `Promise API`。
2. 浏览器环境下，轻量且非常轻量 。
3. 基于`uni.request`，支持多种运行环境。
4. 支持请求／响应拦截器。
5. 自动转换 `JSON` 数据。

## 快速上手

```js
import { Http, HttpHeader } from 'colorful-uni'

const http = new Http()
const header = new HttpHeader({ 'Content-Type': 'json' })
const baseURL = 'https://api.demo'

// 设置baseURL
http.setBaseURL(baseURL)
// 设置header
http.setHeader(header)
// 设置请求拦截器
http.interceptors.request.use(
	request => {
		// 如果header需要设置授权信息、token等
		request.header['Authorization'] = ''
		return request
	},
	error => Promise.resolve(error)
)
// 设置响应拦截器
http.interceptors.response.use(
	response => {
		// 按照统一接口业务做处理即可
		if (!response.data) {
			return Promise.reject(new Error('接口请求未知错误'))
		}
		return Promise.resolve(response)
	},
	error => {
		// 如果请求错误
		return Promise.reject(error)
	}
)

// 请求示例
requestLogin(username, password) {
	http.request('/login', { username, password }, { method: 'get/post/put/delete' }).then(res => {

	})
}

// es6 await风格
async requestLogin(username, password) {
	await http.request('/login', { username, password }, { method: 'get/post/put/delete' })
}

// 上传文件示例，上传文件封装的uni.uploadFile
async uploadFile() {
	await http.upload('/upload', { filePath: 'file', , name: 'fileName', formData: {} } )
}
```

## 进阶使用，按需批量生成API，体验飞一般的感觉

### 1.初始化 Http 类

```js
// http.js
import { Http } from 'colorful-uni'

const header = {}
const baseURL = ''
const http = new Http().setBaseURL(baseURL).setHeader(header)

// 请求拦截器
http.interceptors.request.use(
  request => {
    if (request.loading) {
      // 如果配置了loading，显示
    }
    // 设置请求header
    request.header['Authorization'] = ''
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
    // 请求完成
    if (complete.request.loading) {
      // 如果配置了loading，关闭
    }
    // 其他业务处理
    console.log('complete', complete)
  }
)

export default new Http.Builder(http)
```

### 2.定义接口配置

```js
// api.js
import http from './http'

const urls = {
  // 用户
  login: { url: '/api/login', method: 'POST', loading: true } // 用户登录
}

export default http.dispatch(urls)
```

### 3.使用方式

```vue
// demo.vue
<script>
import api from './api'
export default {
  methods: {
    login() {
      api.login().then(res => {
        // 请求成功
      })
    }
  }
}
```

## API
### Methods
| 名称 | 说明 |
| :--: | :--: |
| setBaseURL | 统一设置接口前缀 |
| setHeader | 设置header |
| interceptors | 拦截器 |
| request | 请求 |
| get/post/put/delete/upload | 请求方式 |
