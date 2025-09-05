---
title: Loading - 加载框
pageClass: demo-preview
---

<DemoPreview url="pages/components/loading"/>

# Loading - 加载框

::: tip 说明
此组件为弹窗加载提示，比如请求loading等
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
	<col-loading :show="true"></col-loading>
</template>
```
## API
### Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| show | 是否显示 | Boolean |  false   |  true |
| text | 加载文案 | String  |  - |   加载中   |
| direction | 展示方向 | String  | vertical | horizontal |
| duration | 显示时间 | Number |  0(一直显示)   |  毫秒数 |
| cancel-time | 可取消时间(点击空白区域可取消loading时间) | Number  | 10000 | - |


