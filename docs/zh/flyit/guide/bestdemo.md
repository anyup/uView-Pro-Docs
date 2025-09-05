---
title: 最佳实践
---

# 最佳实践

## 一. 浅谈 FlyHttp 最佳实践

开发时的最佳实践是一系列被广泛认可的方法和原则，可以帮助开发人员提高代码质量、提高团队效率、降低维护成本等。

以下是我总结的在进行 `API` 网络请求开发时的最佳实践，仅供参考：

![浅谈 API 请求最佳实践.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2492c2f67e0449aa5af22e9b74206f3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1472&h=683&s=156847&e=png&b=fef7f7)

## 二. Axios + FlyHttp 构建流程

以下是我在使用 Vue3 开发项目时的部分核心代码截图，请参考：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47bc81bb023f470789c75df5f4763442~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1352&h=734&s=241502&e=png&b=202020)

## 1. 组织结构

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

## 2. 二次封装 Axios

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

// 构建一个 FlyHttp 实例，二选一
const flyHttpInstance = new FlyHttp.Builder(axiosInstance)
// 构建一个自定义的实例，二选一
const flyHttpInstance = new FlyHttp.Builder((options)=>{
  return axiosInstance.request(options)
})

// 导出
export { axiosInstance, flyHttpInstance }
```

## 3. 定义 URL 配置表，并分发 URL，批量生成 API

`FlyHttp` 内部模块提供了基础的 `Type` 定义，导入部分定义即可以实现基础的代码提示，以用户模块为例 `user.ts`，看一下如何使用代码提示！

```js
import { flyHttpInstance } from '@/api/axios' // 在 axios 应该要导出 FlyHttp 实例
import type { IRequestConfig, IResult } from '@anyup/flyit';

// 定义 interface
interface IApi {
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
export flyHttpInstance.dispatch(URL) as IApi;
```

## 4. 在页面中使用

```ts
// 导出整个对象
import userApi from '@/api/modules/user';
// 另一种导出方式
import { getUserList } from '@/api/modules/user';

<script lang="ts" setup>
  const requestDemo = (offset: number, limit: number) => {
    const query = { offset, limit };

    userApi.getUserList({ data: { query } }).then((res) => {
      console.log(res);
    });

    getUserList({ data: { query } }).then((res) => {
      console.log(res);
    });

  };
</script>

```

## 三. 请求示例演示

![http-demo.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/648da621f0a2440d81ec151134b80513~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=600&s=560997&e=gif&f=102&b=fefefe)
