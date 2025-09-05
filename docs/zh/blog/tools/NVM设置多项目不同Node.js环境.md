---
title: 使用 nvm 为多项目设置不同 Node.js 环境，被同事们集体点赞了 ！
---

## 背景

昨天开会时，突然一位前端开发同事埋冤到：”我太痛苦了，我有好几个项目要开发，关键是使用的 Node.js 版本不一致，每次运行不同的项目还得使用 nvm 重新切换一下 Node.js 版本，我快要崩溃了！“

听到这里，我忍不住要为你赋能一下，能显著提升你的开发效率，解决你的心里崩溃，让你快乐开发。

> nvm 支持为不同的项目设置不同的 Node.js 版本

听到这，我看到他脸上有了快乐的笑容，其他同事也在向我问询。

什么？竟然咱们这么多开发同事不知道吗？稍后我整理了一下方案分享了出去，同事们给我了一个大大的赞 👍

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ad8998c87e2648488171cae1fe0745cd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119648&x-orig-sign=puPQFTWTzwEe0ZvBuecnuUVwogE%3D)

接下来，让我们一块来认识一下 nvm，并且看一下如何使用 nvm 设置项目级版本吧！

## 一、nvm 简介

nvm 是一个免费开源的命令行工具，允许在一台计算机上安装和切换多个 Node.js 版本。它支持 Linux、macOS 和 Windows 等操作系统，是许多开发者的首选工具。

在多项目开发环境中，不同的项目可能依赖于 Node.js 的不同版本。例如，一个旧项目可能需要 Node.js v12 以确保兼容性，而新项目可能要求 v18 或更高版本以利用最新的特性和性能改进。在这种情况下，手动管理每个项目的 Node.js 版本变得既繁琐又容易出错。

幸运的是，nvm（Node Version Manager）提供了一个优雅的解决方案，使得跨项目管理 Node.js 版本变得简单高效。

## 二、安装 nvm

### 1. Linux/macOS

打开终端并执行以下命令：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

或者使用 wget：

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

### 2. Windows

访问[nvm for Windows](https://github.com/coreybutler/nvm-windows/releases)下载并安装。

安装完成后，可以验证一下你的 nvm 是否安装成功，使用 `nvm -v` 即可查看你的 nvm 安装版本，如下所示：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6218fb9582a64bad9d3b5a0426a23b1f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119648&x-orig-sign=8Cui8crmrevPvjk2s7bWwQoSLxE%3D)

## 三、使用 nvm 管理 Node.js 版本

一旦 nvm 安装完成，你就可以开始管理 Node.js 版本了。在这里，我总结一下我日常在使用 nvm 时，最常使用的命令，基本上掌握以下这几种就可以了：

### 1. 查看已安装版本

```bash
nvm ls
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3d4f60190f7643fc843dd9ec7c828266~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119648&x-orig-sign=RDAeL2e4YzA0di4TkgLUMXjyQt8%3D)

### 2. 安装新版本

```bash
nvm install <version>
```

例如，安装 Node.js v16.9.0：

```bash
nvm install 16.9.0
```

### 3. 删除版本

```bash
nvm uninstall <version>
```

### 4. 切换版本

直接在命令行输入 `nvm use` 命令可以切换已经安装的 Node.js 版本，例如：

```bash
nvm use <version>
```

切换到 Node.js v16.9.0：

```bash
nvm use 16.9.0
```

注意：以上命令为全局命令，使用完成后全局将生效。比如：使用 `nvm use 16.9.0` 命令后，我们所有的项目都将切换为使用 Node.js v16.9.0 版本

其实 nvm 也支持设置项目级别的版本号，即为不同的项目设置不同的 Node.js 版本，接下来我们一起看一下！

## 四、使用 nvm 设置项目级版本

在项目根目录下创建或编辑 `.nvmrc` 文件，指定项目所需版本：

```bash
16.9.0
```

下次进入该项目目录时，手动在项目目录下执行 `nvm use` 会自动使用 `.nvmrc` 中指定的版本。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5df9431c09284e97813782674f8acc95~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119648&x-orig-sign=pz3aHsefQLd%2BklCmzhUw5XEflys%3D)

如果你使用 VSCode 开发应用，可以搭配插件 vsc-nvm 自动执行，安装并启用该插件后每次打开项目，`nvm use` 则自动执行，无需手动执行。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8cb4c14e05114533b3cdb45e5bc2d304~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119648&x-orig-sign=JTACEUU1JCaovt4QoVVdJcYNKag%3D)

## 五、实战案例

**前提条件**：

- 已经安装好了 nvm 以及使用 nvm 安装了所需要的 Node.js 版本
- VSCode 已经安装好了 vsc-nvm 插件（不安装也可以，就是每次打开项目目录时手动执行下 nvm use 即可）

假设你有两个项目，Project A 需要 Node.js v20.13.1，而 Project B 则需要 v16.9.0。

1. **在 Project A 中**：

   - 在项目根目录下创建 `.nvmrc` 文件，并写入 `20.13.1`。

   - 每次进入项目目录时，nvm 会自动切换到 v20.13.1。

2. **在 Project B 中**：

   - 同样在项目根目录下创建 `.nvmrc` 文件，并写入 `16.9.0`。

   - 当你切换到这个项目时，nvm 会自动使用 v16.9.0。

## 总结

nvm 极大地简化了跨项目管理 Node.js 版本的过程，无论是对于个人开发者还是团队协作，都能显著提高开发效率和项目稳定性。

通过 `.nvmrc` 文件，每个项目都可以独立于其他项目运行在最佳的 Node.js 版本上，从而避免了版本冲突的问题。同时如果你是使用 VSCode 编辑器，则可以搭配使用 vsc-nvm 插件，实现启动项目自动切换 Node.js 版本，让你有更好的开发体验。

除了 nvm 以外，也有其他的 Node.js 版本管理工具支持这种操作，例如：**Volta**，也支持为不同项目切换不同的 Node.js 版本。

没有最好的工具，只有最适合自己的工具！因为我早先使用的是 nvm，所以也就使用 nvm 来管理项目级版本号。

对 `Volta` 感兴趣的也可以查看官方文档：[Volta Document](https://volta.sh/)

关于 `Volta` 的使用，请看这篇文章：

<ArticleFooter link="https://juejin.cn/post/7392070976060866596" />
