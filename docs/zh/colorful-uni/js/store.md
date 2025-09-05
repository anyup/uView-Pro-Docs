---
title: Store - 状态管理
pageClass: demo-preview
---

<DemoPreview url="pages/js/store"/>

# Store - 状态管理
## 简介
`Vuex` 是一个专为 `Vue.js` 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化，同样`uni-app`也支持`Vuex`

1. 支持模块生成，getters、state、mutations、actions一键生成
2. 支持持久化数据存储
3. 支持state更新、重置、清空
### 三个重要的类及方法
1. Store: 封装了部分常用方法类，commit、dispatch、set、get等，详细见下文
2. StoreModule: 模块生成器类，内部使用namespace命名空间区分
3. useStore: 使用Store

::: warning 使用注意事项
- 必须按照模块划分vuex
- 为便于开发使用vuex，建议统一使用本Store生成器
- 尽量不要部分使用自己创建的store，同时又使用了本Store，会冲突
:::

### 如何使用Store
创建`store/index.js`，使用默认的状态管理

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { useStore } from 'colorful-uni'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: useStore.modules(),
  getters: useStore.getters()
})
</script>
```
### 默认状态
::: warning 
- 使用本Store，会默认集成了部分状态，命名空间为'base'，不可删除，如下
- 如果需要拓展，可按照规范进行追加
:::
| 名称 | 类型 | 说明 |
| :--: | :--: | :--: |
| user | Object | 一般作为存储用户数据，持久化存储 |
| token | Object | 用户token，持久化存储 |
| bundle | Object | 页面携带信息 |
| loading | Object | 加载框显示信息 |
| toast | Object | toast显示信息 |
### 如何获取状态
1. useStore自动获取声明的state并生成了getters，使用mixin全局混入到页面中，可直接获取使用
2. 为避免声明重复，所有的getters会自动追加getter_，所以获取的时候须注意，如下示例

```html
<template>
  <view>
    <view>{{ getter_base }}</view>
    <view>{{ getter_base.user }}</view>
    <view>{{ getter_base.token }}</view>
    <view>{{ getter_base.bundel }}</view>
    <view>{{ getter_base.loading }}</view>
    <view>{{ getter_base.toast }}</view>
  </view>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```


### 如何新增Vuex模块

`store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { useStore, StoreModule, Store } from 'colorful-uni'

Vue.use(Vuex)

const store = new Store()

/**
 * @demo new StoreModule(state, keys, namespace)
 * @param {*} state 初始状态，例如：{ userInfo: store.getStorage('userInfo', {}, 'user'), token: '' }
 * @param {*} keys 为需要持久化存储的字段，例如：['token']
 * @param {*} namespace 命名空间，例如：'user'
 */
const modules = {
  user: new StoreModule(
    { userinfo: store.getStorage('userinfo', {}, 'user'), token: '' },
    ['userinfo'],
    'user'
  ),
}

export default new Vuex.Store({
  modules: useStore.modules(modules),
  getters: useStore.getters(modules)
})
</script>

```

#### 获取新声明的状态

以上声明的Vuex模块的命名空间为`user`，获取方式如下：

```html
<template>
  <view>
    <view>{{ getter_user }}</view>
    <view>{{ getter_user.userinfo }}</view>
  </view>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```
