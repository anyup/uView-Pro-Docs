---
title:  Webview - 网页视图
pageClass: demo-preview
---

<DemoPreview url="pages/components/webview"/>

# Webview - 网页视图

::: tip 说明
webview 是一个 web 浏览器组件，可以用来承载网页的容器，会自动铺满整个页面（nvue 使用需要手动指定宽高）
:::

::: warning 
各小程序平台，web-view 加载的 url 需要在后台配置域名白名单，包括内部再次 iframe 内嵌的其他 url
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
	<col-webview :src="src" />
</template>
<script>
export default {
  data() {
    return {
	    src: 'https://uniapp.dcloud.io/component/web-view'
    }
  }
}
</script>
```

## API
### Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| src | webview 指向网页的链接 | String | - | - |
| webview-styles | webview的样式 | Object | - | - |
| progress-color | loadingbar颜色值 | String | #2979ff | - |
