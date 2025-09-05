---
title: Toast - 提示框
pageClass: demo-preview
---

<DemoPreview url="pages/components/toast"/>


# Toast - 提示框

::: tip 说明
此组件为弹窗提示框，用于提示用户信息
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
	<col-toast :toast="toast"></col-toast>
</template>
```

## API
## Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| toast | 加载文案 |  Object |  `{ title: 'Success', icon: 'none', content: '' }`  |  -  |
| duration | 持续时间 |  Number |  2000  |  -  |
| position | 显示位置 |  String |  center  |  top/bottom  |


## Methods
| 名称 | 说明 | 参数 |
| :--: | :--: | :--: |
| show | 显示弹窗 | `{ title, icon, content }` |

::: tip 最佳实践
由于组件内部监听toast变换
可以将toast保存在vuex变量，每次修改vuex变量都可以显示弹窗
:::
