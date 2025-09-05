---
title: uni-app图标库整合：使用iconfont构建属于自己的图标库
---

# uni-app 图标库整合：使用 iconfont 构建属于自己的图标库

## 一. 前言

在前端开发中，图标已经成为页面设计中不可或缺的一部分。图标可以使界面更加美观、清晰，并且能够提升用户体验。而使用图标库来管理和引用图标资源，可以带来更多的便利和效率。

而在众多的图标库中，**iconfont** 独树一帜。**iconfont** 是一种基于字体的图标库，它将图标转换为字体的形式，并通过 **unicode** 编码引用。这种方式不仅可以减少图标资源的大小，提升页面加载速度，而且可以通过 CSS 进行灵活的样式控制，让图标的应用更加方便和可定制。

假设在一个项目中，需要扩展多个图标，所以我们应该把各个图标收集进一个阿里图标库的项目中，即使后面不断的扩展图标，也能让它们在同一个库中，方便项目所有图标的整合与应用。

在本篇文章中，我将为大家介绍在 **uni-app** 中使用 **iconfont** 自定义图标库的方法和步骤，如何更方便更简捷的使用自定义图标。

## 二. 阿里巴巴矢量图标库

### 1. 简介

阿里巴巴矢量图标库是一种图标字体库，它将图标转换为字体的形式，并通过 **unicode** 编码进行引用。通过使用 **iconfont**，开发者可以使用字体图标代替传统的图片图标，以提高网页加载速度和图标的灵活性。**iconfont** 中的图标可以使用 CSS 进行样式控制，并且可以根据需要进行缩放、颜色调整等操作，非常方便。

官方链接：[iconfont - 阿里巴巴矢量图标库](https://www.iconfont.cn/)

### 2. 创建项目

登录阿里巴巴矢量图标库系统后，可以选择创建项目或者管理自己所参与的项目。

点击“**资源管理**” -> “**我的项目**” 即可以进行查看自己所属项目范围，可以进行编辑项目，挑选图标库中的图标引入自己项目中。

## 三. 管理图标库

一般情况下，我建议在收藏的项目中，使用 “**下载至本地**" 的功能，而后解压，复制文件夹中的 “**iconfont.css**” 到 `uni-app` 项目中(其余的文件可忽略)，具体的操作我们接下来一步一步进行演示一下。

下面的操作默认已经进入阿里图标库的“图标管理”栏目中。

### 1. 修改图标前缀

我建议应该修改这个图标的前缀，这样以后有新图标加入的时候，不用每次频繁修改前缀，点击右上角的 “**项目设置**“ ，进行修改项目信息，这里主要修改的是图标前缀信息，如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c6435d16253468994f160ab70079d65~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=790&h=236&s=29723&e=png&b=f8f8f8)

修改 “**FontClass/Symbol 前缀**” 项为“**custom-icon-**”

修改 “**Font Family**” 为 “**custom-icon**”

如下图所示：

![Snipaste_2023-12-19_11-39-04.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e083e3cb3c1849998bd6af743f19dbc6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=532&h=590&s=34481&e=png&b=fefefe)

完成这一步，我们就可以在 iconfont 的海量图标库中选用适合自己的图标了，可以将适合自己项目的图标添加到自己的项目中。

> 说明：
>
> **FontClass/Symbol 前缀** 的主要作用是：会在自己添加的图标 css 名称前添加统一的字符串，例如：home 图标，那么生成的 css 样式名称则为：custom-icon-setting
>
> **Font Family** 的主要作用是：所用的图标具备的相同特性，定义字体的公共信息，使用的 font-family 等

### 2. 下载项目至本地

添加所需要的图标至项目完成后，我们就可以下载图标的 css 文件了。在项目的图标页面，点击右上角的 “**下载至本地**”，就可以将 iconfont 相关项目文件夹下载下来了，如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6a9818ff9854b96af6352857e690f7f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=857&h=145&s=41242&e=png&b=f7f7f7)

下载完成，将文件夹解压后大概有下面几项文件，但是我们只需要一个文件即可：**iconfont.css**，如下图所示：

![Snipaste_2023-12-19_11-42-30.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/531b8fa5bdfb485ca232902b3a3f883f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=819&h=250&s=47873&e=png&b=fefefe)

完成以上的几个步骤，我们大致就完成了在 iconfont 网站上对图标的操作了，接下来需要我们做的就是将这个图标库如何引入到 uni-app 项目中并进行使用。

### 3. 添加图标库到项目

复制上述的 “**iconfont.css**”文件到`uni-app`根目录的`static`目录后(也可以为其他目录，例如：`assets`等)，打开“**iconfont.css**”，内部 css 代码如下：

![Snipaste_2023-12-19_11-44-58.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e24067b8dcb1468997f61c2fa48d1aac~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=901&h=151&s=29745&e=png&b=1d1d1d)

删掉上图中圈出的部分，

> 注意：
>
> 切记把`src: url('data:application/x-font-woff2......,'` 最后的逗号`,`改成分号`;`。

删除掉 css 中无用的部分，最终如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9795c4880e904a429a0276e5cc1f51e8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=901&h=102&s=23402&e=png&b=202020)

通过以上的操作步骤，我们最终得到了项目图标库生成的 css 样式，这样以后有新图标加入的时候，不用每次频繁修改项目设置中的图标前缀，只需要进行添加图标至项目后，下载文件到本地，替换现有的 css 文件即可。

接下来我们开始讲最重要的部分，如何使用这些图标

## 四. 组件化开发

### 1. 原始引用

按照以前的前端项目开发，我们一般会直接引入 iconfont 文件，然后在前端中这样使用

```html
<span class="iconfont iconfont-setting" style="font-size: 20px;color: #fff;"></span>
```

如上述代码所示，使用了 `setting` 图标，设置了图标大小以及图标颜色。虽说这样使用没有什么问题，但是每次都这样使用的话没办法进行统一管理，也多少有点繁琐了。

而且现在前端开发基本上都是组件化开发的理念，为了方便统一进行管理，去除繁琐，我们最终要开发一个 `Icon` 的组件进行使用。

### 2. 图标组件

首先我们分析一下这个图标组件所需要承载的最简单的功能，那就展示图标，因此这个组件简要的功能主要包含：

- 通过图标名称直接引用图标

- 支持修改图标样式

- 支持修改图标前缀，便于添加其他不同的 `iconfont` 库

```html
<template>
  <text :class="[ prefix, `${prefix}-${name}` ]" :style="{ 'font-size': size, color: color }"> </text>
</template>

<script>
  export default {
    name: 'custom-icon',
    props: {
      // 图标类名
      name: {
        type: String,
        default: ''
      },
      // 图标颜色
      color: {
        type: String,
        default: '#333'
      },
      // 字体大小，单位rpx或px
      size: {
        type: String,
        default: '16px'
      },
      // 图标前缀
      prefix: {
        type: String,
        default: 'custom-icon'
      }
    }
  }
</script>
```

通过上述的代码，我们简单的实现了一个图标组件，主要提供了 4 个 props

- name：图标类名，例如：setting、home、user

- color：图标颜色，例如：#333、red、blue

- size：字体大小，例如：16px、40rpx

- prefix：图标前缀，例如：custom-icon、other-icon

当然，这个组件封装其实特别简单，在实际的项目开发中，我们可以根据项目的业务场景，将所需图标样式的复杂度进行一步步改造和优化，打造一款适合自己项目的图标库组件。

### 3. 如何使用

在项目中可以进行这样使用：

```html
<custom-icon name="setting" size="40rpx" color="#333333"></custom-icon>
```

加载后的图标如下图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc3976cdbb8642f1b0851ce09f104f5c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=975&h=180&s=12652&e=png&b=fcfcfc)

### 4. 优缺点分析

对比直接使用 iconfont 样式的方式使用图标，使用组件化图标有以下几个优缺点：

**优点**

- 使用简单快捷
- 便于统一管理和维护
- 便于多方协作
- 便于拓展功能

**缺点**

一个最大的缺点就是需要额外开发一个组件进行使用，这个缺点可以忽略不计。

> **说明**：图标前缀默认使用的我自己项目中的 custom-icon，组件中也提供了一个 prefix 的 props，如果我们项目中需要引入多个不同的图标前缀的 iconfont 库，那么这个 props 就发挥自己的作用了，只需要修改这个图标的前缀即可

## 五. 总结

通过本篇文章，我们了解了在前端项目中使用 iconfont 自定义图标库的方法和步骤。使用自定义图标库不仅能够提升页面的美观，还能减少图标资源的大小，提升页面加载速度。对于前端开发者来说，iconfont 是一个强大而便捷的工具。

在使用 iconfont 进行图标库的创建和管理时，我们需要注意以下几个注意事项：

- 维护好自己的图标资源，以免出现图标名称混淆或冲突的情况，导致引用图标不明确。

- 修改 “**iconfont.css**” 时，注意修改最后的 `,` 为 `;`，避免导致引入样式文件出错，图标不展示等问题。

## 资源链接

[iconfont - 阿里巴巴矢量图标库](https://www.iconfont.cn/)

<ArticleFooter :link="['juejin::https://juejin.cn/post/7314121672886075443', 'weixin::https://mp.weixin.qq.com/s/tIuiI34Dwexcq_AGsDN5gg']" />
