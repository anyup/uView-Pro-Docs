
<p align="center">
    <img alt="logo" src="/anyup/images/logo-heart-transparent.png" width="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Colorful UniApp CLI</h1>

<h2 align="center">
    <sub>一个快速创建 uni-app 模板项目的 CLI 工具</sub>
</h2>

## 一. 介绍

`create-colorful-app` 是一个用于快速创建 `uniapp` 项目的轻量脚手架工具，它可以帮助你快速创建一个 `uni-app` 项目。

## 二. 快速使用

### 1. 使用 `pnpm create` 命令快速创建项目

```shell
pnpm create colorful-app # 问询方式创建项目
pnpm create colorful-app <项目名称> # 默认会创建 base-template 模板
pnpm create colorful-app <项目名称> -t <模板名> # 根据模板名称创建对应模板
```
### 2. 使用 `npx` 命令快速创建项目

```shell
npx create-colorful-app # 问询方式创建项目
npx create-colorful-app <项目名称> # 默认会创建 base-template 模板
npx create-colorful-app <项目名称> -t <模板名> # 根据模板名称创建对应模板
```

### 3. 选择模板说明

`create-colorful-app` 支持 `-t` 参数选择模板，目前有 `3` 个模板，为 `Vue 2` 模板分别是：

- `base-template`：基础模板，包含 `template` 的基础功能
  
- `base-template-hbx`：`HBuilderX` 模板，包含 `template` 的基础功能

- `demo-hbx`：`HBuilderX` 模板，包含所有的 `demo` 示例功能


> Vue 3 版本的模板还在开发中，敬请期待！
