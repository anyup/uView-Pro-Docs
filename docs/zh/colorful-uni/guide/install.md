---
title: 安装
---

# 安装

## 关于安装

`colorful-uni` 提供了 `uni_modules` 和 `npm` 两种安装方式，按需选择。

- 使用 `uni_modules` 安装无需额外配置，即插即用，但是每次更新组件库需要处理代码差异（如果您有改动源码）。

- 使用 `npm` 安装需要额外配置，更新组件库时无需处理代码差异。

::: tip 说明

1. `Hbuilder X 2.5.5` 及以上版本才支持使用 `easycom` 模式，本组件库同样支持，关于 UI 组件库部分，不用页面单独引入即可使用
2. 请确保您下载的 `Hbuilder X` 为 APP 开发版，而非标准版，并且在“**工具-插件安装**”中安装了“**scss/sass 编译**”插件
3. 如果您使用的是 `Vue Cli` 初始化项目，需要安装 `node-sass` 和 `sass-loader`

:::

## npm 安装

```bash
npm install colorful-uni
```

## uni_modules 安装

`colorful-uni` 支持 `uni_modules` 规范，已经上架到 uni-app 的插件市场。

在 uni-app 插件市场选择使用 HBuilderX 导入，或者选择手动在 `src` 目录下创建 `uni_modules` 文件夹并将 `colorful-uni` 解压到 `uni_modules` 中，结构如下:

```
├── uni_modules                  # uni_modules
├── ├──  colorful-uni            # 组件目录
├── └── └──  components          # 组件
├── └── └──  core                # 工具
├── └── └──  css                 # 样式
└── └── └──  index.js            # 统一入口
```

[插件市场下载地址](https://ext.dcloud.net.cn/plugin?name=colorful-uni)
