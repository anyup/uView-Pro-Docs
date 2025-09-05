---
title: 玩转uni-app多端部署：自定义平台的条件编译实战详解
---

# 玩转uni-app多端部署：自定义平台的条件编译实战详解

## 一. 前言

在使用 uni-app 进行跨平台开发的过程中，经常会遇到需要针对不同平台或不同环境进行条件编译的情况。条件编译是一种在编译过程中根据指定条件选择不同代码路径的技术，可以帮助我们在不同平台或环境下编写不同的代码，以适应不同的平台实现逻辑。

在 uni-app 中，可以说条件编译是 uni-app 实现多端部署的核心思想，通过条件编译，我们可以根据当前的平台、环境或配置选项来控制代码的执行逻辑，从而实现定制化的开发需求。

在我之前的开发项目中，不止需要已有平台的条件编译，还涉及到**自定义平台条件编译**，以适应项目中**同一套代码，多端部署**的场景。

通过本篇文章，你将学习到以下知识：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b6e798f324b4730a5728e7ef523eba4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=887&h=851&s=81911&e=png&b=ffffff" alt="image.png"  /></p>

接下来我将详细介绍 uni-app 中条件编译的使用和自定义平台，帮助大家更好地利用条件编译优化自己的应用开发过程。

## 二. 什么是编译器

uni-app 为什么能实现一套代码、多端运行，多端部署的功能？其最核心的功能是通过 **编译器 + 运行时** 实现的，我梳理了一下，如下图整体流程图所示：

![Snipaste_2024-03-07_18-12-51.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1ada850aa6c45c89a875329c8707d17~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1050&h=669&s=215829&e=png&b=fffefe)

> 好家伙，不看不知道，一看吓一跳，一堆小程序平台？？

### 1. 编译器和运行时

**编译器**：将 uni-app 统一代码编译生成每个平台支持的特有代码；如：在小程序平台，编译器将 `.vue` 文件拆分生成 `wxml`、`wxss`、`js` 等代码。

**运行时**：动态处理数据绑定、事件代理，保证 Vue 和平台宿主数据的一致性。

### 2. 编译器的实现逻辑

uni-app 项目根据所依赖的 Vue 版本不同，编译器的实现也不同，目前 uni-app 的代码支持 Vue 2 和 Vue 3 两种语言版本。

Vue 2 版本的 uni-app 编译器基于 `Wepback` 实现，而 Vue 3 版本的 uni-app 编译器基于 `Vite` 实现，编译速度更快。

可以通过 `manifest.json` 文件中切换 Vue 的使用版本，如下图所示：

![Snipaste_2024-03-07_18-22-12.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de17da0d00ce47ceb4bf6219652054c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=823&h=155&s=16676&e=png&b=fbf6e5)

### 3. 注意事项

初始化 uni-app 项目有两种方式，通过 **HBuilderX** 创建和使用 **cli** 方式创建，下面来说一下这两种创建方式在编译器方面的使用差异：

- 使用 **cli** 方式创建的项目，编译器安装在项目下，编译器不会跟随 **HBuilderX** 升级。如需升级编译器，可以参考：更新依赖到指定版本。

- 使用 **HBuilderX** 创建的项目，编译器在 **HBuilderX** 的安装目录下的 `plugin` 目录，随着 **HBuilderX** 的升级会自动升级编译器。

因此，为了避免出现一些更新问题，建议使用 **HBuilderX** 直接创建项目，便于适时更新到最新版的编译器，优化一些 **bug**。

> 提示：经常跟随官方更新也会有问题，有些旧版本的代码在新版上有可能会不兼容！注意可能有坑！

## 三. 条件编译

uni-app 已经将常用的组件、API 封装到框架中，我们可以按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足，但每个平台有自己的一些特性，因此必然会存在一些无法跨平台的情况。

详细了解可参见 uni-app 的相关文档说明：

- [uni-app 组件使用手册](https://uniapp.dcloud.net.cn/component/)

- [uni-app API 使用手册](https://uniapp.dcloud.net.cn/api/)

当我们在写代码涉及到多平台时，由于每个平台的实现代码可能有所不同，因此如果是大量写 `if else`，会造成代码执行性能低下和管理混乱，编译到不同的工程后二次修改，会让后续升级变的很麻烦。

由以上这个背景， uni-app 参考在 C 语言中的一些实践经验，为其提供了类似的条件编译手段，通过 `#ifdef`、`#ifndef` 的方式，为小程序端、Web 端、App 端 等不同客户端编译不同的代码，在一个工程里优雅的完成了平台个性化实现。

那么接下来我们看一下什么是条件编译及其使用方法？

### 1. 什么是条件编译

条件编译其实是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**条件判断规则**

以 `#ifdef` 或 `#ifndef` 加 `%PLATFORM%` 开头，以 `#endif` 结尾。

完整的判断方式为：

```
#ifdef  %PLATFORM%
此部分为实现对应平台的代码
#endif
```

参数说明：

`#ifdef`：if defined 仅在某平台存在
`#ifndef`：if not defined 除了某平台均存在
`%PLATFORM%`：平台名称

### 2. 支持的平台

目前 uni-app 条件编译所支持的平台大概有 24 个，分别如下：

#### 引擎+编译器相关

| 值        | 生效条件                      | 值         | 生效条件             |
| --------- | ----------------------------- | ---------- | -------------------- |
| VUE3      | 用于区分 vue2 和 3            | VUE2       | 用于区分 vue2 和 3   |
| UNI-APP-X | 用于区分是否是 uni-app x 项目 | uniVersion | 用于区分编译器的版本 |

#### APP 相关

| 值                        | 生效条件      | 值          | 生效条件         |
| ------------------------- | ------------- | ----------- | ---------------- |
| APP                       | App           | APP-PLUS    | 编译为 App 时    |
| APP-PLUS-NVUE 或 APP-NVUE | App nvue 页面 | APP-ANDROID | App Android 平台 |
| APP-IOS                   | App iOS 平台  |

#### Web 相关

| 值  | 生效条件 | 值  | 生效条件 |
| --- | -------- | --- | -------- |
| H5  | H5       | WEB | web      |

#### 小程序相关

| 值         | 生效条件       | 值          | 生效条件   |
| ---------- | -------------- | ----------- | ---------- |
| MP         | 包括所有小程序 | MP-WEIXIN   | 微信小程序 |
| MP-ALIPAY  | 支付宝小程序   | MP-BAIDU    | 百度小程序 |
| MP-TOUTIAO | 抖音小程序     | MP-LARK     | 飞书小程序 |
| MP-QQ      | QQ 小程序      | MP-KUAISHOU | 快手小程序 |
| MP-JD      | 京东小程序     | MP-360      | 360 小程序 |

#### 快应用相关

| 值                      | 生效条件       |
| ----------------------- | -------------- |
| QUICKAPP-WEBVIEW        | 包括所有快应用 |
| QUICKAPP-WEBVIEW-UNION  | 快应用联盟     |
| QUICKAPP-WEBVIEW-HUAWEI | 快应用华为     |

### 3. 支持的文件

我们主要可以在以下的文件中使用条件编译，如下所示：

- **主文件**：包括 .vue/.nvue/.uvue 文件
- **API 文件**：包括 .js/.uts 文件
- **样式文件**：包括 css 文件和各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug 文件
- **配置文件**：pages.json 文件

### 4. 支持的场景

uni-app 的条件编译能支持以下几种场景，具体如图所示：

#### API 的条件编译

简言之，同一功能实现，可能有不同的逻辑处理，比如：在 js 文件中，或者在 Vue 文件中的 script 代码中有不同的逻辑处理方式，使用方式如下：

```js
// #ifdef  %PLATFORM%
该平台特有的API实现;
// #endif
```

#### 组件的条件编译

在 template 模版中，可能会在不同的平台展示不同的组件，或者是展示效果不同，或者是在某一平台不需要展示，使用方式如下：

```html
<!--  #ifdef  %PLATFORM% -->
该平台特有的组件
<!--  #endif -->
```

#### 样式的条件编译

在不同的平台下有差异性的样式处理，使用方式如下：

```css
/*  #ifdef  %PLATFORM%  */
该平台特有的样式
/*  #endif  */
```

#### pages.json 的条件编译

不同平台下的特有功能，以及小程序平台的分包，都可以通过 `pages.json` 的条件编译来更好地实现。这样，就不会在其它平台产生多余的资源，进而减小包体积。

例如：在 `pages.json` 中配置 pages 页面路由，在 H5 平台下编译 “**测试 1**” 页面，在微信小程序页面下编译 “**测试 2**” 页面

```json
"pages": [
    // #ifdef H5
    {
      "path": "pages/test1",
      "style": {
        "navigationBarTitleText": "测试1"
      }
    },
    // #endif
    // #ifdef MP-WEIXIN
    {
      "path": "pages/test2",
      "style": {
        "navigationBarTitleText": "测试2"
      }
    },
    // #endif
]
```

> 特别注意：json 的条件编译，一定要注意最后","分隔符的所属问题，不能有多余的逗号，可能会出现异常情况，导致编译失败！

#### static 目录的条件编译

在不同平台，引用的静态资源可能也存在差异，通过 static 的条件编译可以解决此问题，static 目录下新建不同平台的专有目录，目录名称均为小写，专有目录下的静态资源只有在特定平台才会编译进去。

如以下目录结构，a.png 只有在微信小程序平台才会编译进去，b.png 在所有平台都会被编译，合理的利用 static 目录的条件编译能够大大的减小包体积，在微信小程序的分包实践中尤为重要！

```
┌─static
│  ├─mp-weixin
│  │  └─a.png
│  └─b.png
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

### 3. 注意事项

关于条件编译，有以下几个注意事项需要在编程的过程中重点关注一下：

1. 条件编译是利用注释实现的，在不同语法里注释写法不一样，不要使用错误的注释编写代码，可能会造成一些问题，具体注释形式如下所示：

- 在 js/uts 文件中， 使用 `//` 注释
- 在 css 文件中， 使用 `/*  */` 注释
- 在 vue/nvue/uvue 模板里使用 `<!-- 注释 -->`

2. 条件编译 APP-PLUS 包含 APP-NVUE 和 APP-VUE ；

3. 对于未定义平台名称，可能是名称写错了，也可能是低版本 HBuilderX 没有这个平台，此时的条件编译，`#ifdef` 中的代码不会生效，而 `#ifndef` 中的代码会生效；

4. 使用条件编译请保证编译前和编译后文件的语法正确性，即要保障无论条件编译是否生效都能通过语法校验。比如：json 文件中不能有多余的逗号，js 中不能重复导入；

5. Android 和 iOS 平台不支持通过条件编译来区分，如果需要区分 Android、iOS 平台，请通过调用 `uni.getSystemInfo` 来获取平台信息。支持 `ifios`、`ifAndroid` 代码块，可方便编写判断。

## 四. 自定义条件编译平台

### 1. 背景（我为什么要进行自定义平台）

在开发 Web 时，可能有时候需要将同一套代码编译发布到不同的站点，比如多个不同的微信 h5 站，这些站点可能有不同的差异性处理。在开发小程序时，也经常有扩展小程序平台，比如同一套代码，我需要发布到多个小程序，可能这些小程序之间少许有些差异。因此，uni-app 通过在 `package.json` 文件中增加 uni-app 扩展节点，可实现自定义条件编译平台。

在我之前开发的**实际项目**中，同一套代码需要部署多个平台，大概有 **10** 个平台，而且这几个平台可能有 **90%** 以上的代码是相同的，因此我就没有必要重新开发一套代码了。这多个平台的含义是：在微信小程序有多个平台，在 H5 网站有多个平台，可能在 APP 中也有多个平台，在这些平台之间，可能有或多或少的差异，比如：

- 功能的差异性，页面展示不同，tabbar 数量等
- 请求 API 的差异性，对应的后端服务 API 不同
- 全局变量的差异性，主题配色变量，默认语言等

因此，以上这些差异就会要求在代码中处理不同平台之间的差异性，以下是我的实际项目中的自定义平台：

![Snipaste_2024-03-09_11-12-31.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b1d8cb6f0ad44f2a446242babe49d6f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=746&h=628&s=213297&e=png&b=f5f3e4)

> 除此之外，还有两个 APP 平台，但是目前 uni-app 不支持自定义 APP 的基准平台！

如何增加 uni-app 扩展节点，总结一下有以下几个步骤可以快速完成一个全新平台的编译：

- 声明配置，添加新平台
- 在代码中使用新平台条件编译
- 编译到新平台

### 2. 第一步： 声明配置，添加新平台

在 package.json 中添加 uni-app 节点，添加以下配置，使新定义的平台生效：

```json
   "uni-app": {
    "scripts": {
      "custom-h5": {
        "title": "自定义H5平台",
		    "browser": "chrome",
        "env": {
          "UNI_PLATFORM": "h5"
        },
        "define": {
          "CUSTOM-H5": true
        }
      },
      "custom-mp": {
        "title": "自定义小程序平台",
        "env": {
          "UNI_PLATFORM": "mp-weixin"
        },
        "define": {
          "CUSTOM-MP": true
        }
      }
    }
  }
```

**参数说明：**

正确的结构就是如上所示，下面说一下这几个参数的具体含义

- **title**：自定义扩展名称， 在 **HBuilderX** 中会显示在 运行/发行 菜单中
- **browser**：运行到的目标浏览器，仅当 **UNI_PLATFORM** 为 h5 时有效
- **env**：环境变量
  - **UNI_PLATFORM**：基准平台
  - **MY_TEST**：其他自定义环境变量
- **define**：自定义条件编译
  - **CUSTOM-H5**：自定义条件编译常量，建议为大写

**注意事项：**

- 只能扩展 web 和小程序平台，不能扩展 app 平台。并且扩展小程序平台时只能基于指定的基准平台扩展子平台，不能扩展基准平台。也就是说 **UNI_PLATFORM** 仅支持填写 uni-app 默认支持的基准平台，目前仅限如下枚举值：`h5`、`mp-weixin`、`mp-alipay`、`mp-baidu`、`mp-toutiao`、`mp-qq`。

- `browser` 仅在 `UNI_PLATFORM` 为 h5 时有效,目前仅限如下枚举值：chrome、firefox、ie、edge、safari、hbuilderx。

- `package.json` 文件中不允许出现注释，否则扩展配置无效。

### 3. 第二步：在代码中使用条件编译

接下来，可以在代码里使用自定义的条件编译，为这个新平台编写专用代码：

```js
// 新的自定义微信小程序平台
// #ifdef CUSTOM-MP
/**
 * 微信小程序 代码
 */
// #endif

// 新的自定义H5平台
// #ifdef CUSTOM-H5
/**
 * H5 代码
 */
// #endif
```

### 4. 第三步：编译到新平台

运行时可以执行面向新平台的编译运行，发行时可以执行面向新平台的编译发行。如下图所示，我们点击运行和发行，已经都有了我们刚才已经自定义好的平台名称。

![Snipaste_2024-03-08_18-02-41.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c849de570c4e4ba393bbb511a3d37ad9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1286&h=569&s=450380&e=png&b=f9f4e5)

## 五. 总结

条件编译是 uni-app 实现一套代码、多端运行，多端部署的核心思想，uni-app 在条件编译方面不止是处理 js，任何代码都可以多端条件编译，因此可以大大降低了在实际项目的多端开发时的繁琐问题。

而关于你是否需要自定义平台，关键在于项目里复用的代码多还是个性的代码多，如果都是复用的代码多，并且对应的服务端是一致的，所以仍然可以自定义平台多端部署，而个性的代码放到不同平台的目录下，进行差异化维护。

## 资源文档

- [uni-app 组件使用手册](https://uniapp.dcloud.net.cn/component/)

- [uni-app API 使用手册](https://uniapp.dcloud.net.cn/api/)

- [uni-app 条件编译处理多端差异](https://uniapp.dcloud.net.cn/tutorial/platform.html)

- [package.json 扩展 uni-app 属性](https://uniapp.dcloud.net.cn/collocation/package.html#uni-app-%E5%B1%9E%E6%80%A7)

- [vue.config.js 说明](https://uniapp.dcloud.net.cn/collocation/vue-config.html)

<ArticleFooter link="https://juejin.cn/post/7344970197131329575" />