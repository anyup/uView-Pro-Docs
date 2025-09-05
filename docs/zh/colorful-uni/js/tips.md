---
title: Tips - 提示
pageClass: demo-preview
---

<DemoPreview url="pages/js/tips"/>

# Tips - 提示
## 简介

Tips为方法类，内部使用了基于 `vuex` 的状态管理，主要封装了`loading`、`toast`、`confirm`等常用方法。

::: warning
- 如果项目中没有使用vuex，同时也没有使用本库封装的[Store](./store)，则不要调用此类内部方法
- 封装的tips提示工具类，已经挂载到全局`prototype`，可使用`this.$tips`或导入`Tips`对象使用
- 使用col-layout作为父布局的已经默认导入`Loading`、`Toast`组件，直接使用方法即可，否则参照组件使用规则使用，详见[Loading](../components/loading)、[Toast](../components/toast) 组件介绍
- confirm方法为封装的`Promise`风格的uni.showModal(OBJECT)，详见官方文档，[showModal](https://uniapp.dcloud.io/api/ui/prompt?id=showmodal)
:::

```html
<template>
	<col-layout>
 	  <col-button @click="loading">显示loading</col-button>
 	  <col-button @click="toast">显示toast</col-button>
 	  <col-button @click="confirm">显示confirm</col-button>
	</col-layout>
</template>
<script>
import { Tips } from 'colorful-uni'
export default {
  data() {
    return {
    }
  },
  methods: {
    loading() {
	  this.$_u.tips.loading('加载中...')
	  // 或使用类的方式
	  new Tips.loading('加载中...') // 使用类
    },
	toast() {
	  this.$_u.tips.toast('提示', 'success')
	  // 或使用类的方式
	  new Tips.toast('提示', 'success') // 使用类
    },
	confrim() {
	  this.$_u.tips.confirm('请确认').then(()=>{
		// 确认
	  }).catch(()=>{
		// 取消
	  })
	  // 或使用类的方式
	  new Tips.confirm('请确认').then(()=>{
		// 确认
	  }).catch(()=>{
		// 取消
	  })
	}
  }
}
</script>
```

## API
### Methods
| 名称 | 说明 | 参数说明 |
| :--: | :--: | :--: |
| loading | 显示加载弹窗 | - |
| loaded | 隐藏加载弹窗 | - |
| toast | 显示提示弹窗 | title:提示内容, icon:图标 |
| confrim | 显示确认弹窗 | content:显示内容<br>options:{ title,showCancel,confirmText,cancelText }<br>payload: 回调数据|
