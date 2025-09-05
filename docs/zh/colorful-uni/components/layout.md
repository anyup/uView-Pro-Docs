---
title: Layout - 布局
pageClass: demo-preview
---

<DemoPreview url="pages/components/layout"/>

# Layout - 布局

::: tip 说明
1. 此组件为所有页面父布局，为便于全局注入方法及组件，所有页面需要以此来包裹
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
  <col-layout
    :page-show="true"
    :bg-color="#ffffff"
    :custom-style="customStyle"
    loading-text="加载中"
  >
    页面
  </col-layout>
</template>
<script>
export default {
	data() {
		return {
			customStyle: {
				padding: '10rpx'
			}
		}
  },
}
</script>

```
## API
### Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| page-show | 是否显示页面 | Boolean |  true  | false  | 
| bg-color | 背景色值 | String |  #ffffff  | - | 
| height | 页面高度 | String |  -  | 100%  |
| padding | 内边距 | String |  0  | 10rpx | 
| loading-text | loading文案 | String |  -  | 加载中  | 
| loading | 是否显示loading | Boolean |  false  | true  | 
| toast | toast配置 | Object |  `{ title: '操作成功', icon: 'none', content: '' }`  | - | 
| toast-duration | toast持续时间 | Number |  2000  | -  | 
| toast-position | toast位置 |  String |  center  | top/bottom  | 

::: tip 最佳实践
1. 依据开发项目实际需求，独立再次封装下layout布局，作为所有页面的父布局
2. 思路：
* 统一loading，toast，本身layout内部已经做好了封装，自动带有loading、toast配置，支持vuex绑定变量 或 props传递变量
* 如果是开发App，可以选配添加Updater更新管理封装
* 默认设置页面字体样式、容器宽高等
* 检测用户是否登录进行业务处理
* 封装页面空布局展示、加载更多等其他布局展示，提高用户体验，及减少代码量
:::

```html
<template>
  <col-layout
    :page-show="pageShow"
    :bg-color="bgColor"
    :custom-style="customStyle"
    loading-text="加载中"
  >
    <slot></slot>
    <!-- 如果是App需要版本更新 -->
    <col-updater :auto="autoUpdate" :request="request" :is-force="isForce" @result="onUpdate" />
    <view v-if="loadmore" class="is-pd-10"> <u-loadmore :status="loadmore" /> </view>
    <view v-if="empty" class="is-pdtb-50"> <u-empty v-if="empty" /> </view>
  </col-layout>
</template>

<script>
export default {
  name: 'AppLayout',
  components: {},
  props: {
    // 背景色值
    bgColor: {
      type: String,
      default: '#f3f4f5'
    },
    // 自定义样式，对象形式
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否检测登录
    checkLogin: {
      type: Boolean,
      default: true
    },
    // 是否自动检测版本更新
    autoUpdate: {
      type: Boolean,
      default: false
    },
    // 加载更多状态
    loadmore: {
      type: String,
      default: '' // loadmore, loading, nomore
    },
    // 是否展示空布局
    empty: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      isForce: false
    }
  },
  computed: {
    // App更新检测配置
    request() {
      return {
        header: {},
        url: '',
        params: {},
        method: 'POST'
      }
    },
    // 判断页面是否展示，用户是否登录
    // 如果需要登录 && 用户已经登录，则显示页面
    pageShow() {
      if (this.checkLogin) {
        return !!this.g_token
      }
      return true
    }
  },
  created() {
    // 需要检测登录 && 未登录，重定向登录页面
    if (this.checkLogin && !this.g_token) {
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/login/login' })
      }, 100)
    }
  },
  methods: {
    onUpdate({ data, ref }) {
      /* #ifdef APP-PLUS */
      const { downloadUrl, releaseNotes, versionStatus, forceUpdate } = data.appVersions
      if (versionStatus > this.$_u.plus.versionCode()) {
        this.isForce = forceUpdate
        // 是否强制更新
        if (this.isForce) uni.hideTabBar()
        ref.showModal(downloadUrl, releaseNotes)
      }
      /* #endif */
    }
  }
}
</script>

<style></style>

```
