---
title: i18next，看陈年老旧项目如何进行国际化
---

## 一. 背景

随着业务的扩展和技术的进步，国际化（`i18n`）成为了软件产品和服务的重要组成部分。国际化已经成为一种常态。然而，对于那些历史悠久、架构复杂且维护成本高昂的老旧系统来说，实现国际化并非易事。

这些老旧的系统往往承载着公司核心业务的运行，任何改动都需要极其谨慎地考虑。所以本篇文章从项目的现状出发，探讨如何对陈年老旧项目进行国际化改造，使其能够适应多元文化环境，满足不同国家和地区用户的需求。

本篇使用 `i18next` 改造老项目简要实现国际化的效果如下图所示：

![i18next.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/27a73666222242ae9d3aff97d7d52a3e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119780&x-orig-sign=yzJ0ubDVxq9zHCa3hZcei62znaw%3D)

## 二. i18next

### 1. 简介

`i18next` 是一个用 `JavaScript` 编写并用于 `JavaScript` 的国际化框架。但它远不止这些！i18next 不仅仅提供了标准的 `i18n` 功能，例如(**复数、上下文、插值、格式**)。它为我们提供了一个完整的解决方案，以本地化您的产品从网络到移动和桌面。同时它支持各种前端框架，例如 `Vue.js`、`React.js`、`Angular.js` 等。

不仅如此，它也支持原生 JavaScript 的项目进行国际化改造，同时也支持 JQuery 等其他项目进行国际化改造。

i18next 官方支持的工具如下图所示：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/38e0f5e5439e4c4d981bae6d54205f93~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119780&x-orig-sign=p7RrRjZa8%2FddcxwGFj6V6mdXFxs%3D)

### 2. 安装方式

**npm/yarn 安装方式如下：**

```bash
# npm
$ npm install i18next --save

# yarn
$ yarn add i18next
```

**cdn 引入方式如下：**

我一般会使用 `unpkg.com` 的方式引入 `i18next`，如下所示：

```html
<script src="https://unpkg.com/i18next/dist/umd/i18next.js"></script>

<script src="https://unpkg.com/i18next/dist/umd/i18next.min.js"></script>
```

### 3. 初始化

**最简单是示例代码如下所示：**

以下代码表示将 `i18next` 初始化到 `en` 语言下，并且将 `key` 为 `key` 的字符串进行国际化。

```js
import i18next from 'i18next'

i18next.init(
  {
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: {
          key: 'hello world'
        }
      }
    }
  },
  function (err, t) {
    // initialized and ready to go!
    document.getElementById('output').innerHTML = i18next.t('key')
  }
)
```

## 三. 几个重要流程

我仅仅拿我的项目做了一个简单的示例说明，看一下搭配 `i18next` 进行国际化改造，基本流程是怎样的：

### 1. 定义语言 json 文件

以中文简体和英文为例，定义语言文件如下所示：

中文简体：`locales/zh/translation.json`

```json
{
  "zh": "中文简体",
  "en": "英文",
  "title": "标题",
  "body": "内容",
  "message": "动态内容",
  "placeholder": "自定义输入框提示",
  "myName": "你好，我的名字是{{name}}"
}
```

英文：`locales/en/translation.json`

```json
{
  "zh": "zh-CN",
  "en": "EN",
  "title": "titly",
  "body": "body",
  "message": "dynamic message",
  "placeholder": "custom placeholder",
  "myName": "Hello, my name is {{name}}"
}
```

### 2. 使用 data-i18n

在静态 html 页面中，对需要国际化的文案标签上添加 data-i18n 属性进行标识，如下所示：

```html
<div>
  <h1 data-i18n="title">title</h1>
  <p data-i18n="body">body</p>
  <p id="message"></p>
  <p id="myName" data-i18n="myName"></p>
  <input data-i18n="[placeholder]placeholder; [title]placeholder" />
</div>
```

### 3. 初始化 i18next

以上两步骤完成以后，我们就可以进行 i18next 的初始化，初始化完成以后即可以看到你想要的显示效果了：

```js
i18next.init(
  {
    debug: true,
    lng: 'en',
    resources: {
      en: {
        translation: {
          zh: 'zh-CN',
          en: 'EN',
          title: 'title',
          body: 'body',
          message: 'dynamic message',
          placeholder: 'custom placeholder',
          myName: 'Hello, my name is {{name}}'
        }
      },
      zh: {
        translation: {
          zh: '中文简体',
          en: '英文',
          title: '标题',
          body: '内容',
          message: '动态内容',
          placeholder: '自定义输入框提示',
          myName: '你好，我的名字是{{name}}'
        }
      }
    }
  },
  function (err, t) {
    jqueryI18next.init(i18next, $, { useOptionsAttr: true })
    $('html').localize()
    $('#message').html(i18next.t('message'))
    $('#myName').html(i18next.t('myName', { name: 'anyup' }))
  }
)
```

### 4. 切换语言

加个切换语言的功能，更能说明国际化流程：

```html
<div>
  <a data-i18n="zh" href="javascript:;" onclick="changeLanguage('zh')">zh-CN</a> |
  <a data-i18n="en" href="javascript:;" onclick="changeLanguage('en')">EN</a>
</div>
```

```js
function changeLanguage(lang = 'zh') {
  i18next.changeLanguage(lang, (err, t) => {
    if (err) return console.log('something went wrong loading', err)
    jqueryI18next.init(i18next, $, { useOptionsAttr: true })
    $('html').localize()
    $('#message').html(i18next.t('message'))
    $('#myName').html(i18next.t('myName', { name: 'anyup' }))
  })
}
```

以上代码实现后的效果如下图所示：

![i18next.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/27a73666222242ae9d3aff97d7d52a3e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119780&x-orig-sign=yzJ0ubDVxq9zHCa3hZcei62znaw%3D)

码上掘金演示如下，Demo 可直接复制运行：

[jcode](https://code.juejin.cn/pen/7403234910418239497)

## 四. 几个重要特性

我在使用 `i18next` 的过程中，主要使用到了它的以下几个重要特性，或者说了解这几个规则就可以实现国际化改造了。

### 1. 动态赋值

在页面中，我们可以使用 `data-i18n` 属性绑定标签，实现国际化功能。而当我们在 js 中给页面赋值时，可以这么使用：

```js
// 定义
{
    "message": 'dynamic message'
}

// 使用
i18next.t('message')
// -> "dynamic message"
```

### 2. 插值

插值是 `i18next` 中最常用的功能之一，它允许将动态值集成到翻译中。默认情况下，键是由大括号括起来的字符串，如下所示使用方式：

```js
// 定义
{
    "key": "Hello, my name is {{name}}"
}

// 使用
i18next.t('key', { name: 'anyup' })
// -> "Hello, my name is anyup"

```

还有其他更多好用好玩的功能，比如**复数**、**上下文**、**格式化**等，感兴趣的可以去查看官方文档。

[i18next 官方文档](https://www.i18next.com/overview/getting-started)

## 五. 总结

虽然现在是前端框架横行的年代，各种使用 `Vue.js`，`React.js`，`Angular.js` 开发的应用层出不穷，但是也不乏有一些陈旧老项目使用原生 `javascript` 或 `jquery` 来开发的，这时候如果要进行国际化改造，而你又不想重构项目，使用 `i18next` 仍然是一个非常不错的选择，值得一试。

以上是我的真实项目中所发生，项目太老了，然而也没有规划要重构，正巧其中几个页面要做国际化，所以这种方式是成本最低的，完美的解决国际化改造。

<ArticleFooter link="https://juejin.cn/post/7402960438860251199" />
