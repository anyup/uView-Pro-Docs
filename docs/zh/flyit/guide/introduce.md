---
title: 介绍
---

# 介绍

> 可自动生成前端代码层的工具类，目的就是要解放你的双手，化繁为简，可降低代码量 **99%**！

这是一个通用的 `TypeScript` 包，原则上你可以在任何能运行 `JavaScript` 的地方使用，不依赖于任何的前端框架！

目的在于省略某些大量重复代码，少量配置化代码，即可实现极速开发体验！

## 1. FlyHttp

> FlyHttp 是一个自动生成前端 `service` 层代码的工具类！

在开发前端项目时，尤其是目前绝大多数的项目都是前后端分离式开发的形式，因此我们经常需要对接后端接口，进行前后端交互。而基于这些，就出现了琳琅满目的前端请求框架！

从最初的 `XMLHttpRequest` 到 `ajax`、`Fetch API` ，再到 `axios`，各种各样的搭配不同框架的网络请求库应运而生，它们服务于不同的前端框架，进行优秀的前后端数据交互，给我们前端开发者提供了便利性。

虽然很方便，但是我却不满足，因为不喜欢折腾的程序员不是好将军，写代码时，还是时常问一下自己，是否还能再方便些？

因为网络请求通常就是最常用的 `GET` `PUT` `POST` `DELETE` `PATCH` 这几种，而且大多数中声明的请求方法都是重复的，是有据可循的，因此我想从这方面着手，能否优化请求流程，解放双手，进一步为开发提供便利性！

**CTRL + CV** 的开发模式，我们一定要**摒弃**！

`FlyHttp` 是 `Flyit` 工具库中的 `http` 模块，核心目的就是要省略某些重复的代码，部分配置化实现极致开发体验！

## 2. 适用领域

这是一个通用的 `TypeScript` 包，适用于任何在前端开发中，原则上你可以在任何能运行 `JavaScript` 的地方使用，与前端框架无关，可全端通用，包括但不限于使用以下方式开发：

- <Badge type="tip" text="JavaScript" />
- <Badge type="tip" text="TypeScript" />
- <Badge type="tip" text="Vue.js" />
- <Badge type="tip" text="React.js" />
- <Badge type="tip" text="Angular.js" />
- <Badge type="tip" text="uni-app" />
- <Badge type="tip" text="小程序" />

## 3. 说明

1. 在使用本工具前，要求你至少了解相关框架的不同网络请求库的使用方式，比如：`axios`、`ajax`、`Fetch API`的基本使用和基本配置，然后再查看本文档。

2. 本文档仅负责介绍 `Flyit` 工具的相关使用，如需了解更多其他相关内容，请移步相关的官方文档：

- [Vue.js 官方文档](https://cn.vuejs.org/)

- [uni-app request 官方文档](https://uniapp.dcloud.net.cn/api/request/request.html#request)

- [Axios 请求库官方文档](https://axios-http.com/zh/)

- [Fetch API](https://javascript.info/fetch-api)

- [jQuery ajax](https://api.jquery.com/jQuery.ajax/)

- [XMLHttpRequest MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

## 4. 版权信息

> flyit 遵循 MIT 开源协议，但禁止将此应用到非法的领域，如因此产生纠纷等法律问题，flyit 不承担任何责任。
