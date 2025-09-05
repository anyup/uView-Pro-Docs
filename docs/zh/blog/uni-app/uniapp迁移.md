![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2ed3ce2e6825433194fff205723ba0be~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=5YnvJ1KjIzfVQ8XB%2Bl82mzzH7eQ%3D)

近期文章推荐：

[微信公众号 h5 网页授权开发，附源码](https://juejin.cn/post/7441094982979747880)

[uni-app 蓝牙连接 API 流程最佳实践](https://juejin.cn/post/7439972983945904137)

## 一. 前言

终于，一直在维护的多个 uni-app 项目逐步在迁移了！忍受了长时间的 `Hbuilder X` 开发工具，终于放弃了它，我现在终于可以使用 `VSCode` 开发 `uni-app` 项目了!

并不是说 `Hbuilder X` 不好，只是我适应不了，谁让我先遇到的是 `VSCode` 呢！

在之前的多个 `uni-app` 项目开发中，我使用的是 `Hbuilder X` 开发工具创建的，大部分是基于 `Hbuilder X` + `Vue2` + `uView 1.0` 来构建开发的，项目开发完成部署后，也一直没有机会升级。所以我的开发流程是：使用 `VSCode` 开发，然后使用 `Hbuilder X` 运行、打包、发布等等，是否有很多的人是这么使用的？

但是最近，在使用 `HBuilder X` 运行项目的过程中，出现了一个问题：长时间运行 `HBuilder X` 崩溃，导致电脑应用频繁崩溃，打开任何应用都会崩溃，只有电脑重启才会解决问题。起初我不知道是否为 `HBuilder X` 工具的问题，但是后来发现我只要不运行 HBuilder X 就没有问题。

因此，综上所述，我决定将之前的 `uni-app` 项目慢慢的全部转换为 `Vue CLI` 项目，以便更好地利用 `VSCode` 开发工具的优势。

在我将一个 `uni-app` 项目转换为 `Vue CLI` 项目的过程中，总结了一些经验和技巧，希望能对大家有所帮助。

同时在迁移的同时，也衍生出一个脚手架 [create-colorful-app](https://www.npmjs.com/package/create-colorful-app) ，它可以帮助你快速初始化一个 uni-app 项目，包含使用以下 uni-app 相关技术栈：

*   [Vue 2](https://v2.cn.vuejs.org/)

*   [uView 1.x UI 组件库](https://v1.uviewui.com/components/intro.html)

*   [colorful-uni 工具库](https://www.anyup.cn/site/zh/colorful-uni/guide/introduce.html)

目前 `create-colorful-app` cli 仅支持 Vue2 项目的模板创建，后续会支持更多的项目，比如：uni-app、Vue2、Vue3、Angular、React 等等。

所以，如果你要迁移你的 uni-app 项目或重新开始一个新的 uni-app 项目，或许本文可以给你一下思路，我总结了以下几个重要的步骤：

1.  初始化 `uni-app` 项目模板
2.  迁移源代码：`src` 目录
3.  配置文件调整：`main.js`、`vue.config.js`
4.  依赖项管理：`package.json`
5.  测试运行：h5、微信小程序、APP

接下来我们按照步骤开始吧！

## 二. 初始化项目模板

以基于 Vue2 版本的 uni-app 项目为例，可以通过以下两个方式快速初始化一个 Vue CLI 项目：

### 1. 使用脚手架 create-colorful-app

如果你要初始化一个全新的 uni-app Vue2 项目，建议使用 `create-colorful-app` 脚手架，内置快速开发的工具库 `colorful-uni`，以帮助你简洁高效的开发应用：

[create-colorful-app](https://www.npmjs.com/package/create-colorful-app) 是一个用于快速创建 uniapp 项目的轻量脚手架工具，它可以帮助你快速创建一个 uni-app 项目。

通过以下两种命令方式快速创建：

第一种，用 `pnpm create` 命令快速创建项目

```bash
pnpm create colorful-app
```

第二种，使用 `npx` 命令快速创建项目

```bash
npx create-colorful-app
```

> 注意：创建的项目默认使用了自研的开源工具库 `colorful-uni` 来快速实现一些功能，如果不想使用该工具库，也可以在项目中自行移除即可。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/30f21567cfec4dae9bad7c6dd363ceea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=Ai1mxeB8HMpiZFCKAmLSbx8MvoU%3D)

成功后会按需生成以下项目：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/393106552e064d7a8539baf0503a95bf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=uGAqrgylS%2BkVJX6w2iB5P9p0cE8%3D)

创建的项目有以下几个主要目录：

```bash
├── public               # 静态资源文件
├── src                  # 主要源代码目录
├── ├──  api             # 网络请求目录
├── ├──  components      # 组件目录
├── ├──  config          # 环境配置目录
├── ├──  pages           # 页面
├── ├──  static          # 静态资源
├── └── store            # Vuex模块
├── ├── App.vue          # 应用的入口文件
├── ├── main.js          # 主入口文件
├── ├── manifest.json    # 应用配置文件
├── ├── pages.json       # 应用路由配置文件
├── ├── uni.promisify.adaptor.js # 适配器
├── └── uni.scss         # 全局的 SCSS 变量
├── package.json         # 项目依赖
└── postcss.config.js    # PostCSS 配置文件
```

### 2. 使用 Vue 脚手架 Vue CLI

当然，也可以通过 Vue CLI 的方式创建一个新的项目来作为基础模板。如果你还没有安装 Vue CLI，可以通过 npm 安装：

```bash
npm install -g @vue/cli
```

然后，使用 Vue CLI 创建一个新的项目：

```bash
vue create -p dcloudio/uni-preset-vue my-project
```

如果你使用 Vue CLI 方式创建项目，详细可以查看 uni-app 官方文档：[通过 vue-cli 命令行创建 uni-app 应用](https://uniapp.dcloud.net.cn/quickstart-cli.html)

## 三. 迁移源代码

一般的，源代码迁移主要是将 HBuilderX 版本的 uni-app 项目中的源代码复制到新创建的 CLI 项目的相应目录中。

通常情况下，我们主要需要关注 `src` 目录，因为大部分的代码都会迁移到 `src` 目录。

主要会有以下文件目录和文件直接迁移到 src 目录下：

**目录类**：

*   api 请求类目录
*   assets 资源目录
*   components 组件目录
*   config 配置目录
*   pages 页面目录
*   static 静态资源目录
*   store 状态管理目录

**文件类**：

*   App.vue 应用入口文件
*   main.js 主入口文件
*   manifest.json 应用配置文件
*   pages.json 应用路由配置文件
*   uni.scss 全局的 SCSS 变量

**如下图所示，变更前和变更后的目录文件对比**：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5254df79004b487ba037d19d5e533cb3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=%2FOf2dnB3lZKYiRxHDotJyHK6NIg%3D)

将以上文件迁移到 src 目录下后，主要关注一些配置文件的调整和依赖项的管理是否需要调整，我们继续向下看。

## 四. 配置文件调整

配置文件调整主要涉及以下几个文件：

*   manifest.json：应用配置文件
*   uni.scss：全局的样式 scss 变量
*   main.js：应用入口文件
*   App.vue：主入口文件
*   vue.config.js：Vue配置文件，如果你shi yo

检查并调整以上主要配置文件，确保应用的入口点正确配置，主要包括一些路径导入和声明。

## 五. 依赖项管理

检查 `package.json` 文件，确保所有必要的依赖项都已添加到新的 CLI 项目中，主要包括任何第三方库和一些必要插件。

一般为：

*   Vue 的相关依赖
*   @dcloudio、uni-app 的项目依赖
*   scss 项目依赖：node-sass、sass-loader 等
*   第三方组件库

由于 `HBuilderX` 开发工具可能已经全局装了一下必要的依赖项，并没有体现在 `package.json` 中，所以之前我们的 `package.json` 文件的声明的依赖项比较少：

`HBuilderX` 开发工具全局装的插件项如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/79f4dc1f5cf041449ad741ce7e8380cb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=lOOAMg0h5vyeo1S5E902gn9wAiU%3D)

`package.json` 整体变更前后对比图如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/27ce0ef8eaec4686a2aca21e3dd2f1ad~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=xysBNFvkIYieFF0oBUI8BbOBMlE%3D)

变更完成之后，可以像执行 Vue 项目中的命令一样执行 uni-app 项目，其实就是一个引入 uni-app 依赖的 Vue 项目。

使用 npm 或 yarn 安装成功这些依赖项：

```bash
# npm
npm install
# 或者 yarn
yarn
```

## 六. 测试运行项目

在完成上述步骤后，尝试运行新的 Vue CLI 项目，看看是否有任何错误或警告。首先，我们不可能一次改动就成功，可以根据报错信息来更加精确的修改，这是验证转换是否成功的重要步骤。

使用以下命令运行或打包项目，platform 代表支持的平台：h5、mp-weixin、app-plus 等。

```bash
# 运行
# 默认启动 h5 浏览器预览
npm run dev:platform
# 或者
yarn dev:platform

# 打包
# 默认启动 h5 浏览器预览
npm run build:platform
# 或者
yarn build:platform
```

### 1. 测试 H5 运行

h5 是最常见的调试平台，方便且快捷，所以我们先测试一下 h5 运行。如果 h5 平台的运行和打包没有问题了，那么其他平台也不会有大问题。运行以下命令可以进行调试 h5:

```bash
# 运行
yarn dev
# 打包
yarn build
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bbbc9ed8e6c4447c8e7438ceab11fb4e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=S7IhUtNk2Zq%2FtxRilmDSKQ8wlFM%3D)

### 2. 测试小程序运行

```bash
# 运行
yarn dev:mp-weixin
# 打包
yarn build:mp-weixin
```

![Snipaste\_2024-11-27\_13-56-27.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d79a49158dea44daae2ab20755d0e0cb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=JTC2eoq2jKtwWFO6hvwYdZZB%2BD0%3D)

使用以上命令会在 `dist/dev` 或 `dist/build` 目录下生成对应的 `mp-weixin` 目录，使用微信开发者工具导入运行即可。

### 3. 测试 APP 运行

```bash
# 运行
yarn dev:app-plus
# 打包
yarn build:app-plus
```

通过以上的更改，运行命令调试、打包发布等流程，经过测试发现，均没有问题。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b6bdbd4c64124224a96511e5db023be3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=NplaOsrNO8Qz4s5z7d1LrCxFACc%3D)

APP 打包运行最终还是离不开使用 HBuilderX 工具，所以如果你是选择云打包，还是需要使用 HBuilderX。但如果你是使用本地打包，完全就可以自主控制了。

关于 APP 打包，之前有一篇文章介绍，感兴趣的可以跳转阅读：[【超详细】从 0 到 1 打包你的 uni-app 应用：安卓篇打包指南](https://juejin.cn/post/7296317316206411787)

**小提示**：

通过 CLI 的方式运行到 APP 平台，可以通过以下方式进行：

**导入**：打开 HBuilderX，选择 **导入项目**，选择 `dist/dev/app-plus` 文件夹即可。

![Snipaste\_2024-11-27\_13-42-22.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/131bbd1e1125469a9eff504e0ecd421e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=F0OKq4h%2FK%2Fw%2FJ6Ia4r60wJPsWxw%3D)

**运行**：通过 `yarn dev:app-plus` 会在 `dist/dev` 目录下生成资源文件，然后打开 HBuilderX，导入刚刚生成的 `dist/dev/app-plus` 文件夹，选择 **运行 -> 运行到手机或模拟器 -> 运行到 Android/iOS App 基座** 即可。

![Snipaste\_2024-11-27\_13-43-20.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bf09e1f238e64e638055cb5785647324~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=Mx2TLiV7u0aXIo4CCFV1T%2BG22qg%3D)

**打包**：通过 `yarn build:app-plus` 会在 `dist/build` 目录下生成资源文件，然后打开 HBuilderX，导入刚刚生成的 `dist/build/app-plus` 文件夹，选择 **发行 -> 原生 APP -> 云打包** 即可。

![Snipaste\_2024-11-27\_13-42-59.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d169f159dc744b5dbfad26789ae86b30~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733301954&x-orig-sign=RRLR6h911DE4Sxq%2F8v4c4aER4M4%3D)

## 六. 总结

本篇文章主要介绍了如何将 uni-app 正在开发的项目迁移到 VSCode，并使用 CLI 命令进行调试、打包和发布。主要步骤如下：

*   **初始化 uni-app 项目模板**：使用 `Vue CLI` 或 `create-colorful-app` 脚手架初始化项目。

*   **迁移代码**：将 uni-app 项目的代码从 HBuilderX 迁移到 src 目录中。

*   **配置环境变量**：查看是否有配置文件的调整，以便能够正确运行 uni-app 项目。

*   **安装依赖**：安装 uni-app 项目所需的依赖，包括 `@dcloudio` 和 `Vue` 的依赖和其他必要的依赖，主要是第三方插件和组件库。

*   **运行调试**：使用 `yarn dev:platform` 命令运行 uni-app 项目，并进行调试。

*   **打包发布**：使用 `yarn build:platform` 命令打包 uni-app 项目，并进行发布。

通过以上步骤正确的执行，我们就可以方便地在 VSCode 中进行 uni-app 项目的开发、调试和发布了。

终于舒服了，uni-app 老项目也可以使用 VSCode 愉快的开发了！

## 文档链接

[vue-cli 创建 uni-app 应用](https://uniapp.dcloud.net.cn/quickstart-cli.html)

[create-colorful-app 脚手架创建 uni-app 应用](https://www.npmjs.com/package/create-colorful-app)

[colorful-uni 开发文档](https://www.anyup.cn/)

[uView UI 组件文档](https://v1.uviewui.com/)
