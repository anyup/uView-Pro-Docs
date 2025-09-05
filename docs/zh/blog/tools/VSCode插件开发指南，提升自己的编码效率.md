---
title: 写一个 VSCode 插件，提升自己的编码效率
---

## 前言

作为前端开发者，我们经常使用到的代码编辑器之一就是 Visual Studio Code（简称 VSCode）。而通过编写一个自定义的 VSCode 插件，我们可以根据自己的需求，进一步提升编码效率。在本文中，我将分享如何写一个 VSCode 插件，并介绍一些可以提高编码效率的实用功能。

## 一. 插件开发的必要性

在如今快节奏的软件开发领域，编码效率对于开发者来说非常重要。而编写一个功能强大的 VSCode 插件，可以极大地提升个人的编码效率，具有以下重要性：

1. **自定义开发喜好**：每个开发者都有自己的习惯和偏好，通过编写自己的 VSCode 插件，可以根据个人需求和习惯来定制开发环境。添加自定义的代码片段、快捷键和编辑器配置，能够让自己更加舒适和高效地编写代码。

2. **增强代码编辑功能**：VSCode 插件可以提供额外的代码编辑功能，如代码补全、语法高亮、代码导航等。这些功能可以减少开发者的错误、加快开发速度，并且帮助开发者更好地理解和浏览代码。

3. **插件社区的力量**：VSCode 插件拥有一个庞大且活跃的社区，开发者可以从社区中学习、借鉴和分享各种插件。通过与其他开发者交流和合作，我们可以深入了解编码效率的提升技巧，进一步提高我们的编码水平和效率。

总而言之，编写一个个性化、功能强大的 VSCode 插件不仅能够提高个人的编码效率，还能够带来更好的编码体验和开发舒适度。它是我们工作中的得力助手，能够帮助我们更加高效地完成任务、提升工作质量和个人技能。因此，重视提升自己的编码效率，并通过编写 VSCode 插件来实现这个目标，是每个开发者都应该关注和努力的方向。

说了那么多，让我们赶紧进入插件开发的流程吧！

## 二. 插件开发环境搭建

### 插件开发环境搭建

首先，我们需要搭建好插件开发环境。可以通过安装 VSCode 和 Node.js，并在终端运行`npm install -g yo generator-code`命令来安装 VSCode 插件生成器。

### 生成插件项目

使用生成器，我们可以创建一个包含插件所需文件结构的项目。在终端中运行`yo code`命令，并根据提示填写插件的名称、描述和作者等信息。

> 注意：使用 CLI 生成的项目按照标准的目录结构进行开发，通常这种方式适合首次开发，不熟悉开发插件的同学使用，如果在我们很熟练的状态下，完全可以省略上面的步骤，直接创建文件进行开发就好了。

## 三. 开发插件功能

通过编辑插件项目中的`extension.ts`文件，我们可以添加自定义功能以提高编码效率。以下是几个常用的功能示例：

- 代码片段（Snippets）：通过定义代码片段，我们可以快速插入常用的代码块。可以通过在`package.json`文件中的`contributes`字段中添加`snippets`配置项，并编写代码片段的语法规则和代码模板。

- 命令（Commands）：通过定义命令，我们可以在 VSCode 的命令面板中直接执行特定的操作。可以在`activate`方法中使用`vscode.commands.registerCommand`函数定义命令，并在需要的地方触发执行。

- 快捷键绑定（Keybindings）：通过定义快捷键绑定，我们可以自定义快捷键来触发常用操作。可以在`package.json`文件中的`contributes`字段中添加`keybindings`配置项，并指定相应的快捷键和执行命令。

- 编辑器颜色主题（Color Themes）：通过定义编辑器颜色主题，我们可以自定义代码的着色方案。可以在`package.json`文件中的`contributes`字段中添加`themes`配置项，并指定相应的颜色主题文件。

然而，在开发的过程中，我们主要打交道的就是代码，前端开发主要涉及的就是 JavaScript 和 Html，因此对它们的编码提示就显得格外重要，所以我们本文主要开发的是如何实现代码片段（Snippets）的相关提示，其他的我们不做详细的解释。

### 插件源代码目录结构说明

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c8a77473ac845229c649230942270fa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=405&h=369&s=30974&e=png&b=191919)

```

├── snippets                       # 源代码目录
├── ├──  html.json                 # html templete 代码片段提示
├── ├──  javascript.json           # JS 代码片段提示
├── ├──  vue.json                  # Vue 代码片段提示
└──  package.json                  # package.json
```

VSCode 插件的开发源代码统一建立在 snippets 目录下，可以创建一些 `html`、`JavaScript` 以及 `Vue` 相关提示的源代码，在开发之前我们先了解以下几个参数的含义，因为在开发的时候我们主要在和这几个参数打交道。

- **prefix**：输入的提示
- **body**：主要生成的代码
- **description**：功能描述

接下来我们分别来看一下这些源代码文件是如何进行开发的？

### JS 提示类 - javascript.json

这个文件主要会开发一些 JS 代码片段的相关提示，在前端开发中，我们大部分的时间都是在书写 JS，如果把我们常用的 JS 编码封装成一个工具，在开发的时候只需要输入几个文字就可以输出整个功能的代码，试想一下，我们的编码效率会不会成倍的提升。

```json
{
  "$_u.trim": {
    "prefix": "$_u.trim",
    "body": "\\$_u.trim($1)",
    "description": "trim 去除空格"
  },
  "$_u.toast": {
    "prefix": "$_u.toast",
    "body": "\\$_u.toast($1)",
    "description": "toast 轻提示"
  },
  "$_u.throttle": {
    "prefix": "$_u.throttle",
    "body": "\\$_u.throttle($1)",
    "description": "throttle 节流"
  },
  "$_u.debounce": {
    "prefix": "$_u.debounce",
    "body": "\\$_u.debounce($1)",
    "description": "debounce 防抖"
  },
  "$_u.timeFormat": {
    "prefix": "$_u.timeFormat",
    "body": "\\$_u.timeFormat($1)",
    "description": "timeFormat 格式化时间"
  }
}
```

### Html 提示类 - html.json

这个文件主要会开发一些在 html 语言中的相关代码提示，包括一些自定义的组件标签，例如：下面代码中是在项目开发中封装的一些自定义组件`au-button`，`au-layout`等等

```json
{
  "au-button": {
    "prefix": "au-button",
    "body": "<au-button type=\"primary\">$1</au-button>",
    "description": "Button 按钮"
  },
  "au-layout": {
    "prefix": "au-layout",
    "body": ["<au-layout>", "\t<slot></slot>", "</au-layout>"],
    "description": "Layout 布局"
  },
  "au-loading": {
    "prefix": "au-loading",
    "body": "<au-loading text=\"$1\" visible=\"$2\" direction=\"veritical\" />",
    "description": "Loading 加载动画"
  },
  "au-toast": {
    "prefix": "au-toast",
    "body": "<au-toast ref=\"toast\" />",
    "description": "Toast 轻提示"
  }
}
```

### 配置 - package.json

以上的代码开发完成后务必要在 package.json 文件中配置 contributes -> snippets，这是使代码片段能够正确提示的关键。

开发代码是一方面，正确的配置也是重要的一方面，否则将会不生效，必须指定文件对应的生效语言才可以，如下所示：

```json
{
  "contributes": {
    "snippets": [
      {
        "language": "vue",
        "path": "./snippets/vue.json"
      },
      {
        "language": "html",
        "path": "./snippets/html.json"
      },
      {
        "language": "vue-html",
        "path": "./snippets/html.json"
      },
      {
        "language": "javascript",
        "path": "./snippets/javascript.json"
      }
    ]
  }
}
```

> 注意：本小节使用的代码是开发的组件相关的代码，所以组件我的命名方式为：`au-`，在实际开发过程中，可以根据自己的标准和习惯来定义前缀。

## 四. 调试和发布插件

为了调试插件，可以使用 VSCode 的调试功能来运行我们的插件项目。而要发布插件，可以使用 VSCode 提供的发布工具`vsce`，将插件打包成`.vsix`文件，打包完成后可以本地导入也可以发布到 VSCode 插件市场。下面介绍三种方式调试和发布插件：

### 调试插件

可以将你要进行开发的 JSON 代码复制到 VSCode 的环境变量里，配置完成且生效后即可进行代码的提示。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8392bc1813da42d3adbfda364caf4542~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2230&h=650&s=197016&e=png&b=1f1f1f)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bcfc4fce0d94de99a801eea76e05ec8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1520&h=834&s=214264&e=png&b=222222)

### 发布插件

想要发布插件，必须要打包编译为 `.vsix` 文件才可以进行发布，本地安装也是需要这个格式。因此打包文件离不开`vsce` 插件的支持，下面简单说一下插件的使用方法：

### vsce 使用

**安装**

```
npm install vsce
```

**打包**

```
vsce package
```

使用以上打包命令即可生成 `.vsix` 文件了，生成完成后可以在 VSCode 中安装`.vsix` 文件使用。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96116f6aa2dc4dac8b709f26386780d0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1354&h=756&s=162040&e=png&b=1c1c1c)

> vsce 还提供将插件发布到 VSCode 插件市场，如何发布到市场，本文不作过多的描述，以后会专门讲解这一部分的内容。

### 最终效果

以下两张图片就是上面我们开发完成代码并安装到 VSCode 后，输入指定的代码进行的提示。

![demo1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4be37fac7e3490191d30d757ad307f1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1874&h=816&s=317461&e=png&b=1e1e1e)

<p align=center>Html 标签代码片段提示</p>

![demo2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/240f03f0544c403a8a68814fd0e2fe4a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1844&h=690&s=272653&e=png&b=1e1e1e)

<p align=center>JavaScript 代码片段提示</p>

## 总结

通过本文的学习，我们了解了编写一个自定义的 VSCode 插件来提升编码效率的方法。通过添加代码片段，我们可以根据个人需求和习惯来自定义我们的开发环境。

通过编写自己的插件，我们可以更加高效地进行代码编写、调试和定制。这不仅提升了我们的工作效率，还增加了我们对自己工作环境的控制感，使我们的编码过程更加流畅和愉快。

在实际开发中，我们也可以从 VSCode 插件市场或开源社区学习其他开发者编写的插件，借鉴他们的经验和思路，进一步提高自己的编码效率。

希望通过本文的介绍，你对编写自己的 VSCode 插件有了更深入的了解。希望你能尝试编写自己的插件，定制属于自己的开发环境，提升自己的编码效率。

<ArticleFooter link="https://juejin.cn/post/7292957290891001867" />
