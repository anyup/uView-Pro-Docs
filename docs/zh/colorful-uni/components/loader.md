---
title: Loader - 加载图标
pageClass: demo-preview
---

<DemoPreview url="pages/components/loader"/>

# Loader - 加载图标

::: tip 说明
此组件为一个小动画，目前用在组件的正在加载状态场景。
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
	<col-loader mode="circle"></col-loader>
</template>
```


## API
### Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| mode | 动画类型 | String |  circle | flower  |
| color | 动画颜色，只对mode=flower有效 | String |  #8f8d8e  | -  |
| size | 图标大小 | String/Number | 34 | - |
| width | 图标宽度，只对mode=circle有效 | String | 2px | - |
