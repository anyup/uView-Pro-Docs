---
title: 玩转uni-app多端编译：static目录进行条件编译的最佳实践
---

# 玩转uni-app多端编译：static目录进行条件编译的最佳实践

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e87524b3293040149cbc7cbfd7e82902~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=747&h=317&s=259136&e=png&b=63a4ee)

## 一. 前言

老生常谈，了解 uni-app 的开发都知道，uni-app 可以同时支持编译到多个平台，如**小程序、H5、移动端 App** 等。它的多端编译能力是 uni-app 的一大特点，让开发者可以使用同一套代码基于 Vue.js 的语法编写程序，然后通过 uni-app 的编译工具将代码转换成适用于不同平台的代码，极大地提高了开发效率和跨平台开发的便捷性。

之前的文章让我们清晰的认识到 uni-app 的条件编译知识，以及如何进行自定义平台的条件编译。后来好多人发私信说 static 目录如何更有效的进行条件编译，因为对小程序来讲，打包后的体积大小还是至关重要的。

本篇文章，我们就来讲述一下 uni-app 的 static 目录，以及它的条件编译，同时也包括自定义编译平台下对 static 目录的编译。

## 二. 静态资源的条件编译

### 1. 静态资源的条件编译需求

在进行对 static 目录的编译策略之前，我们必须先了解一下静态资源的条件编译，由于 uni-app 是跨平台的开发框架，所以静态资源的条件编译十分重要，那么什么场景下需要对静态资源进行条件编译呢？

一张图带大家了解一下在 uni-app 中静态资源的编译需求：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a026139fb6be437591a705e93758456f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1107&h=611&s=95301&e=png&b=fffefe)

uni-app 静态资源条件编译的需求主要是为了适应**不同平台**、**不同功能模块**、**主题定制**和**性能优化**等方面的需求，通过灵活地选择加载不同的静态资源，实现在不同场景下的最佳展示效果和性能表现。

### 2. static 目录在 uni-app 中的作用

在 uni-app 中，`static` 目录是用来存放静态资源文件的目录，主要包括图片、字体、视频、音频等静态资源文件，并且 `static` 目录下的文件不会被编译处理，直接输出到打包后的目标目录，可以在页面中直接引用这些静态资源文件。

以下是 `static` 目录在 uni-app 中的主要作用：

- **存放静态资源文件**：`static` 目录是用来存放项目中各种静态资源文件的地方，如图片、字体、视频、音频等。可以直接将这些静态资源文件放在 `static` 目录下，供全局使用。

- **不经过 webpack 处理**：`static` 目录下的文件在编译打包过程中不会经过 webpack 处理，而是直接拷贝到输出目录。确保静态资源文件原始的路径结构和内容不受影响。

### 3. 为什么需要 static 目录

在 uni-app 中，编译器根据 `pages.json` 扫描需要编译的页面，并根据页面引入的 js、css 合并打包文件。对于本地的图片、字体、视频、文件等资源，如果可以直接识别，那么也会把这些资源文件打包进去，但如果这些资源以变量的方式引用，比如：`<image :src="url"></image>`，甚至可能有更复杂的函数计算，此时编译器无法分析。

那么有了 `static` 目录，编译器就会把这个目录整体复制到最终编译包内。这样只要运行时确实能获取到这个图片，就可以显示。非 static 目录下的文件（vue 组件、js、css 等）只有被引用时，才会被打包编译。

> 注意：
> 1. 如果 `static` 里有一些没有使用的废文件，也会被打包到编译包里，造成体积变大。
> 2. css、less/scss 等资源不要放在 static 目录下，建议这些公用的资源放在 src 自建的目录下，比如：assets 目录。

另外注意，`static` 目录支持特殊的平台子目录，比如 web、app、mp-weixin 等，这些目录存放专有平台的文件，这些平台的文件在打包其他平台时不会被包含，这些在后面会详细说明。

### 4. static 目录和 App 原生资源目录

uni-app 支持 App 原生资源目录 `nativeResources`，其中包括 `assets`、`res` 等目录，但和 `static` 目录没有关系。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73a7ec2c5b174b798233f859d1319602~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=289&h=205&s=6020&e=png&b=fef9e7)

`static` 目录下的文件，在 app 第一次启动时，解压到了 app 的外部存储目录（external-path）。因此在这里需要注意控制 static 目录的大小，太大的 static 目录和太多文件，会造成 App 安装后第一次启动变慢。

## 三. static 目录的条件编译方法

在 uni-app 中，static 目录的条件编译方法通常有以下几种，根据不同的条件，在编译时选择性地处理部分代码或资源，以达到更灵活的应用场景需求。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8660baca7cc0406aa095cd2548c284b6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1020&h=385&s=48376&e=png&b=fffdfd)

### 1. 创建多平台 static 目录

在 static 目录下新建不同平台的专有目录，专有目录下的静态资源只有在特定平台才会编译进去。目录名称均为小写，如下所示常用的名称定义：

- **app**：App 端
- **web**：H5 端和 web 端
- **mp-weixin**：微信小程序端
- **mp-alipay**：支付宝小程序端

如以下目录结构，`a.png` 只有在 APP 平台才会被编译，`b.png` 在 H5 平台和 Web 平台被编译，`c.png` 在微信小程序平台被编译，`d.png` 在阿里云小程序平台被编译，而 `e.png` 会在所有平台都会被编译。

```
┌─static
│  ├─app
│  │  └─a.png
│  ├─web
│  │  └─b.png
│  ├─mp-weixin
│  │  └─c.png
│  ├─mp-alipay
│  │  └─d.png
│  └─e.png
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

以上的平台示例只是一部分，其余的平台请参考官方文档：[static 目录的条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#static)

### 2. 使用分包编译

在分包下建立 static 目录，同时在 `pages.json` 中配合使用条件编译可以实现 static 的条件编译。

因为编译器根据 `pages.json` 扫描需要编译的页面，编译时将静态资源打包到对应的子包中，减少主包的体积大小，这种方式在小程序分包中尤其常见。

```json
{
  "pages": [
    {
      "path": "pages/index"
    }
  ],
  "subPackages": [
    {
      "root": "pagesCustom",
      "pages": [
        {
          "path": "pages/index"
        }
      ]
    }
  ]
}
```

通过以上条件编译方法，我们可以根据需求对 static 目录中的静态资源进行条件性处理，实现更加灵活和定制化的开发和部署。在实际应用中，根据具体情况选择合适的方法，以达到最佳的效果。

## 四. 自定义平台如何进行 static 目录的条件编译

关于如何自定平台，参考之前文章：[玩转 uni-app 多端部署：自定义平台的条件编译实战详解](https://juejin.cn/post/7344970197131329575)

由于官方不支持创建自定义平台下的 static 目录，例如以下方式，`mp-weixin-custom` 会被认为是一个普通文件夹，将会在所有平台被打包进去。

```
┌─static
│  ├─mp-weixin
│  │  └─a.png
│  ├─mp-weixin-custom
│  │  └─b.png
│  └─c.png
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

因此，在这里提供一种思路，可以支持自定义平台的打包策略，可以利用分包实现。

### 1. 创建分包目录

在 uni-app 项目中和 pages 同级创建 pagesCustom 目录，如下所示：

```json
┌─pagesCustom
│  ├─pages
│  │  └─index.vue
│  ├─static
│  └─ └─h5-custom-icon.png
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

### 2. 定义分包页面

在 `pages.json` 中定义页面地址，配合使用条件编译实现。

```json
{
  "pages": [
    {
      "path": "pages/index"
    }
  ],
  "subPackages": [
    // #ifdef H5-CUSTOM
    {
      "root": "pagesCustom",
      "pages": [
        {
          "path": "pages/index"
        }
      ]
    }
    // #endif
  ]
}
```

因为编译器根据 `pages.json` 扫描需要编译的页面，所以分包 `pagesCustom` 当只有在平台 `H5-CUSTOM` 的环境下才会被打包，其他平台下会被忽略。利用以上这种方式，可以实现自定义平台下的 `static` 条件编译。

> 注意：使用分包的这种方式虽然能实现自定义平台下 static 目录的条件编译，但是我非常不建议这样使用，这样纯粹是为了分离 static 目录而分包，如果是项目页面比较的多的情况下，可见会相当繁琐，应当慎用。目前官方不支持直接在 static 目录下创建自定义平台，希望 uni-app 官方后续可以新增这个功能。

### 3. 拓展

uni-app 默认支持使用 `webpack-chain` 插件实现预处理器，应该可以在 `vue.config.js` 中配置以实现对 static 目录进行条件编译的方法，例如：

- vue.config.js

```javascript
chainWebpack: (config) => {
  // 定义全局常量，可用于条件编译
  config.plugin("define").tap((args) => {
    args[0]["process.env"]["YOUR_VARIABLE"] = JSON.stringify(
      process.env.YOUR_VARIABLE
    );
    return args;
  });
};
```

由于时间精力原因，以上这种方式未经过验证，有实践过的同学可以相互探讨一下。

## 五. 最佳实践：实例演示

**实例演示：如何利用 static 目录进行条件编译实现不同端的定制化需求，包括自定义平台。**

假设我们现在要实现一个 uni-app 项目，需要在不同端（比如 H5 端、微信小程序端、支付宝小程序端、自定义 H5 端）展示不同的图标。

### 1. 在 static 目录下准备不同端的图标文件

在 `static` 目录下准备不同端需要展示的图标文件，例如有以下 4 不同端个图标：

- `h5-icon.png` （H5 端图标）
- `weixin-icon.png` （微信小程序端图标）
- `alipay-icon.png` （支付宝小程序端图标）
- `h5-custom-icon.png` （自定义 H5 端图标）

在 uni-app 项目中创建的目录如下所示：

```
┌─static
│  ├─h5
│  │  └─h5-icon.png
│  ├─mp-weixin
│  │  └─weixin-icon.png
│  ├─mp-alipay
│  └─ └─alipay-icon.png
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

### 2. 在代码中使用条件编译实现定制化需求

在代码中利用条件编译，根据不同端选择性地引用 static 目录下的图标文件。

在 `vue` 模版中可以这样写：

```html
<template>
  <view>
    <!--#ifdef H5-->
    <img src="/static/h5/h5-icon.png" alt="H5 Icon" />
    <!--#endif-->

    <!--#ifdef MP-WEIXIN-->
    <img src="/static/mp-weixin/weixin-icon.png" alt="Weixin Icon" />
    <!--#endif-->

    <!--#ifdef MP-ALIPAY-->
    <img src="/static/mp-alipay/alipay-icon.png" alt="Alipay Icon" />
    <!--#endif-->
  </view>
</template>
```

以上两个步骤，其实就实现了在不同端展示不同的图标，而且在打包时也不会将多余端的`static`被打包到包里，不会造成体积变大。接下来，我们再实现在自定义 H5 平台也实现这种效果。

### 3. 使用分包实现定制化 static 目录

在 package.json 中添加 uni-app 节点，添加以下配置，使新定义的平台生效：

```json
{
  "uni-app": {
    "scripts": {
      "h5-custom": {
        "title": "自定义H5平台",
        "browser": "chrome",
        "env": {
          "UNI_PLATFORM": "h5"
        },
        "define": {
          "H5-CUSTOM": true
        }
      }
    }
  }
}
```

在分包下建立 pages 页面和 static 静态资源目录，如下所示：

```json
┌─pagesCustom
│  ├─pages
│  │  └─index.vue
│  ├─static
│  └─ └─h5-custom-icon.png
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

在 `pages.json` 中定义页面地址，配合使用条件编译可以实现，如下所示：

```json
{
  "pages": [
    {
      "path": "pages/index"
    }
  ],
  "subPackages": [
    // #ifdef H5-CUSTOM
    {
      "root": "pagesCustom",
      "pages": [
        {
          "path": "pages/index"
        }
      ]
    }
    // #endif
  ]
}
```

通过以上步骤，我们可以利用 static 目录进行条件编译，实现不同端的定制化需求，根据具体端的要求展示相应的静态资源文件。这样可以更灵活地根据不同端的特性进行定制化开发，提升用户体验。

最后，使用一张图总结一下最佳实践步骤：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9e37597d35f4e4e99e9d0f2c32c989e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1493&h=842&s=218765&e=png&b=fdf9f7)

## 六. 结语

通过这篇文章，相信大家都了解 static 目录的作用以及 static 目录的条件编译方法，在实际应用中，根据具体情况选择合适的方法，相信大家在 uni-app 条件编译的实践中有一个快乐的编码体验。

## 资源文档

[uni-app 工程目录简介](https://uniapp.dcloud.net.cn/tutorial/project.html)

[uni-app static 目录的条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#static)

<ArticleFooter link="https://juejin.cn/post/7348245676889718834" />