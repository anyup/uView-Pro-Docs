---
title:  Updater - 应用更新管理
pageClass: demo-preview
---

<DemoPreview url="pages/components/updater"/>

# Updater - 应用更新管理

::: tip 说明
此组件为App更新提示
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   x   |     x      |

## 基本使用

```html
<template>
	<col-updater 
    ref="updater" 
    :auto="true" 
    :request="request" 
    :is-force="isForce" 
    maskClosable="false"
    modal-title="版本更新" 
    @result="onresult" 
  />
</template>
<script>
export default {
  data() {
    return {
	  isForce: false,
      request: {
        header: {},
        url: `https://app.update.api`,
        params: {},
        method: 'POST'
      }
    }
  },
  methods: {
    // 如果auto设置为false，页面展示时不会自动更新，可以手动检测更新
    checkUpdate() {
      this.$refs.updater.checkUpdate()
    },
	  // 检测更新完成回调方法 
    onresult({ data, ref }) {
      /* #ifdef APP-PLUS */
      const { downloadUrl, releaseNotes, versionCode, forceUpdate } = data.appVersions
      if (versionCode > this.$_u.plus.versionCode()) {
        this.isForce = forceUpdate
        if (this.isForce) uni.hideTabBar()
        ref.showModal(downloadUrl, releaseNotes)
      }
      /* #endif */
    }
  }
}
</script>
```

## API
### Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| request | 更新接口请求配置 | Object | `{ header:  Object, url: String, params: Object, method: POST }` | - |
| auto | 是否自动检测更新 | Boolean | false | true |
| is-force | 是否强制更新 | Boolean | false | true |
| mask-closable | 是否允许点击遮罩层关闭弹窗 | Boolean | false | true |
| modal-title | 弹窗标题 | String | 发现新版本 | - |
| confirm-text | 弹窗确认文字 | String | 立即更新 | - |
| cancel-text | 弹窗确认文字 | String | 以后再说 | - |

### Events
| 名称 | 说明 | 回调 |
| :--: | :--: | :--: |
| result | 请求完成回调 |   `{ data, ref }` |

### Methods
| 名称 | 说明 | 参数 |
| :--: | :--: | :--: |
| checkUpdate | 主动更新方法 | - |
| showModal | 显示弹窗 | downloadUrl, modalContent |
