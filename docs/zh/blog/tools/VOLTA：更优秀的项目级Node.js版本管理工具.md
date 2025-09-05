---
title: VOLTA：更优秀的项目级 Node.js 版本管理工具
---

## 一. 背景

前一篇文章写到：[使用 nvm 为多项目设置不同 Node.js 环境，被同事们集体点赞了 ！](https://juejin.cn/post/7392070976060866596)

文章的主要目的是为了解决在同时开发多个项目的时候，由于每个项目可能使用的 Node.js 版本不一致，如何方便快捷的根据不同项目使用适应的 Node.js 版本。

如果你也是使用的 nvm 来管理，可以搭配 `.nvmrc` + `vscode` 插件配合使用实现无缝切换。

但是由于 nvm 这个工具比较老，可能在设置项目级版本的方案上，有一些兼容问题，比如：`.nvmrc` 配置不支持 Windows 系统，可能需要搭配其他的命令或工具实现。

其实要实现这种项目级别 Node.js 版本切换，或许有其他更优的解决方案可以参考，本文我们来介绍一个新的 node 版本管理工具：`Volta`

## 二. 了解 Volta

`Volta`  是一种管理 JavaScript 命令行工具的便捷方式。

在这里，我对比一下我正在使用的 `nvm` 管理工具，我总结了 `Volta`  的优点：

- 项目级管理，无缝版本切换
- 跨平台支持，包括 Windows 和所有 Unix shell
- 支持多个包管理器 npm yarn pnpm

## 三. 安装

在安装 Volta 工具前，如果有使用其它的 Node.js 管理工具，建议卸载掉，避免出现问题。

### 1. Unix 安装

在大多数 Unix 系统(包括 macOS)上，您可以使用一个命令安装 Volta：

```bash
curl https://get.volta.sh | bash
```

### 2. Windows 安装

对于 Windows，下载并运行 Windows 安装程序并按照说明，进行安装操作。如下所示，选择最新版本或其他合适的版本进行下载，当前 Volta 最新版本为 v1.1.1

[Volta 选择版本下载](https://github.com/volta-cli/volta/releases)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/906c19e734804de488ffcd00279dec97~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119680&x-orig-sign=tK2rfIq36vFXZChPMDKUlO%2F8N44%3D)

## 四. 一些主要命令

Volta 提供了一系列命令来帮助你管理 Node.js、npm、yarn 和 pnpm 的版本，下面是 Volta 基本命令的简要说明：

### 1. `fetch`

从远程仓库获取工具（如 Node.js 或 npm）的特定版本，但不安装它们，可以将工具缓存到本地机器以供离线使用。

```sh
volta fetch node 16.14.0
```

### 2. `install`

安装工具的指定版本，设置工具的默认版本，并使其成为全局默认版本或项目级别的版本。

```sh
# 全局安装 Node.js 16.14.0
volta install node 16.14.0

# 项目级别的安装
cd /path/to/project
volta install node 16.14.0
```

### 3. `uninstall`

卸载之前安装的工具版本。

```sh
volta uninstall node 16.14.0
```

### 4. `pin`

固定项目的运行时或包管理器，将工具版本与项目关联起来，通常用于将版本写入 `package.json` 文件中的 `volta` 属性。

````sh
# 在当前目录下设置 Node.js 16.14.0 为项目版本
volta pin node 16.14.0
```全部

### 5. `list`

列出已安装的工具版本。

```sh
volta list
````

### 6. `completions`

输出 shell 的自动完成脚本，以便更方便地使用 Volta 命令，可以理解为命令补全

```sh
# 输出 Bash 自动完成脚本
volta completions bash > /etc/bash_completion.d/volta
```

### 7. `which`

显示指定工具的可执行文件路径，查看 volta 安装的工具的目录

```sh
volta which node
```

### 8. `setup`

初始化 Volta 的环境，包括安装和配置必要的组件，为当前用户/shell 启用 volta

```sh
volta setup
```

### 9. `help`

输出帮助信息，显示特定命令的帮助文档。

```sh
# 显示 `volta install` 的帮助
volta help install
```

这些命令可以帮助你有效地管理和使用不同版本的工具，特别是在多项目环境中。

## 五. 一些常用命令

### 1. 安装版本

全局安装并设置默认版本，选择 node 的确切版本作为默认版本，例如安装并设置默认 node 版本为 v16.9.0

```bash
volta install node@16.9.0
```

![1.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9711dfaa59e2413ba7d8c41f39fb79db~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119680&x-orig-sign=38uPeM5rtTLY2QsRgW%2FZNdKGEAs%3D)

如果你不指定一个精确的版本，Volta 会选择当前大版本下合适的版本来匹配你的请求:

```bash
volta install node@18
```

如果你不选择任何版本，Volta 将选择最新的 LTS 版本:

```bash
volta install node
```

### 2. 查看版本

查看当前已经安装的 node 版本列表

```bash
volta ls node
```

![2.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f5aa17701cca4e87b1f85b44369341ad~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119680&x-orig-sign=%2F52RGMkpDD7SiQ53gaNXyWFfmj0%3D)

### 3. 卸载版本

指定某个 node 版本进行卸载

```bash
volta uninstall node@16.9.0
```

## 六. 实战：设置项目级别版本

Volta 是一个优秀的项目级别版本管理工具，它可以帮助你在不同的项目中使用特定版本的 Node.js、npm、yarn 和 pnpm。这对于维护多个项目，每个项目可能需要不同版本的这些工具的情况非常有用。

使用  `volta pin`  命令，将项目的运行时或包管理器设置为指定的版本。

```bash
volta pin node@18.20.4
```

![4.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/57a63b994d5a4a5bb316d885ec2f77d1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119680&x-orig-sign=MMhVKjW9600D4f%2F3LJ5%2FG9oBRp0%3D)

设置完成后，使用 `node -v` 可以查看当前项目的生效 node 版本

![5.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4960ec07db014b70bf477d2e1ba5da45~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726119680&x-orig-sign=KIzjGJerLxvsVskw%2FctxpUPRwLg%3D)

通过上面的步骤，即可以实现项目级 node 环境的统一，只要是安装了 Volta 工具，任何开发该项目的团队成员都是使用在 package.json 中指定的 node 版本，确保所有开发人员都在同一 node 版本环境下进行开发。

## 七. 总结

Volta 极大地简化了跨项目管理 Node.js 版本的过程，通过使用 Volta 管理项目级别的 Node.js 版本，我们可以确保每个项目都有一个干净且独立的开发环境。

这不仅有助于避免版本冲突问题，还能提高团队协作效率，确保所有开发人员都在同一环境下进行开发工作。因此，无论是对于个人开发者还是团队协作，都能显著提高开发效率和项目稳定性。

以下总结使用 Volta 的一些要点：

- **自动化**: Volta 自动检测并安装项目所需的 Node.js 版本，无需手动切换。

- **一致性**: 确保所有团队成员使用相同的 Node.js 版本，减少潜在的错误。
- **工具链管理**: Volta 同时管理 npm、yarn 和 pnpm 的版本，简化了项目依赖的管理（不过目前我并没有管理过 pnpm，后面有机会尝试一下吧）。
- **高效**: 由于 Volta 的高性能特性，它能够更快地启动项目，提高开发效率。

总之，Volta 为开发者提供了一个强大而灵活的解决方案，以应对多项目开发环境中的版本管理挑战。

官方文档：[Volta Document](https://volta.sh/)

<ArticleFooter link="https://juejin.cn/post/7398747326069882889" />
