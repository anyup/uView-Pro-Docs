---
title: 安装
---

# 安装

## npm 安装

我已经将该工具库发到了`npm`上了，并且在多个项目中得到了良好的应用，可直接使用 `npm` 安装使用，通过如下方式进行安装：

点击查看在 npm 上完整的 uni-http 请求库，欢迎大家使用：[NPM 仓库地址](https://www.npmjs.com/package/@anyup/flyit) <Badge type="tip" text="^1.9.0" />

```bash
npm install @anyup/flyit
```

## cdn 引入

```html
<!-- 最新版 -->
<script src="https://unpkg.com/@anyup/flyit/dist/flyit.umd.js"></script>

<!-- 指定版本号 -->
<script src="https://unpkg.com/@anyup/flyit@1.0.4/dist/flyit.umd.js"></script>

<script>
  const { FlyHttp } = Flyit

  const flyHttp = new FlyHttp.Builder(requestInstance)
</script>

```

## 静态文件引入

> 不推荐，无法实时更新

复制 `dist` 文件夹下的 `flyit.umd.js` 文件，引入现有的项目中。

