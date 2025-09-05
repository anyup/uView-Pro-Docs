---
title: Apis - 服务器选择
pageClass: demo-preview
---

<DemoPreview url="pages/components/apis"/>

# Apis - 服务器选择

::: tip 说明
1. 此组件解决多个服务器环境切换功能
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
  <col-apis :list="apiList" @select="setServer" />
</template>
<script>
const apiList = [
  {
    name: '生产环境',
    children: [
      { id: 'domain', value: 'https://api.prod.com' },
      { id: 'port', value: '8080' }
    ]
  },
  {
    name: 'Test',
    children: [
      { id: 'domain', value: 'https://api.test.com' },
      { id: 'port', value: '8080' }
    ]
  },
  {
    name: 'Test1',
    children: [
      { id: 'domain', value: 'https://api.test1.com' },
      { id: 'port', value: '8080' }
    ]
  }
]
export default {
  data() {
    return {
      value: null,
      apiList
    }
  },
  methods: {
    setServer(item) {
      this.value = item
    }
  }
}
</script>
```

## API
### Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| list | 配置数组 |	Array |	- | - |

### Events
| 名称 | 说明 | 回调 |
| :--: | :--: | :--: |
| select |	行点击事件及参数| 	Handler	|	
