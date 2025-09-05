---
title: Pager - 分页
pageClass: demo-preview
---

<DemoPreview url="pages/js/pager"/>

# Pager - 分页

## 简介

1. 支持两种分页模式，按照 总页数分页 `pages`、总数量分页 `total` 两种模式分页，根据接口返回数据为 total 或 pages。
2. 支持判断数据是否为空 `empty`。
3. 支持判断上拉加载数据状态 `loadmore`。
4. 支持判断是否还有更多数据 `hasMore`。

::: tip 分页说明

- 初始化分页实例类，`new Pager(page, limit)` page默认第1页，limit默认每页20条数据
- 接口入参一般为 当前页 `page` 或 偏移量 `offset`、每页数量 `limit`
- 接口返回一般为 总页数 `pages` 或 总数量 `total`

:::

## 配置

如果需要，开启下拉刷新

```json
{
  "path": "pages/index/index",
  "style": {
    "navigationBarTitleText": "首页",
    "enablePullDownRefresh": true
  }
}
```

页面配置

```html
<template>
  <col-layout>
    <u-empty v-if="pager.empty()" />
	  <view v-else>
		  <view v-for="item in page.data" :key="item.id">{{ item.name }}</view>
	  </view>
    <!-- 底部显示加载状态 -->
    <u-loadmore :status="pager.loadmore()" />
  </col-layout>
</template>

<script>
import { Pager } from 'colorful-uni'

export default {
  data() {
    return {
      // 参数1：page默认第1页，参数2：limit默认每页20条数据
      pager: new Pager(1, 20) 
    }
  },
  // 上拉加载
  onReachBottom() {
    if (this.pager.hasMore()) {
      this.getList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 重置分页所有状态
    this.pager.reset()
    this.getList()
  },
  onLoad(options) {
    this.getList()
  },
  methods: {
    // 按照总页数分页
    getListByPage() {
      const { page, limit } = this.pager
      this.$api.getList({ page, limit }).then(res => {
        uni.stopPullDownRefresh()
        if (res.code === 200) {
          const { list, pages } = res
          this.pager.setData(list).setPages(pages)
        }
      })
    },
    // 按照总数量分页
    getListByTotal() {
      const { offset, limit } = this.pager
      this.$api.getList({ offset, limit }).then(res => {
        uni.stopPullDownRefresh()
        if (res.code === 200) {
          const { list, total } = res
          this.pager.setData(list).setTotal(total)
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>

```

## API
### Data
| 名称 | 类型 | 说明 | 默认值 |
| :--: | :--: | :--: | :--: |
| page | Number | 当前页 | 1 |
| limt | Number | 每页限制数量 | 20 |
| pages | Number | 总页数 | 0 |
| total | Function | 总数量 | 0 |
| data  | [Object, Array] | 数据源 | [] |
| offset | Number | 偏移量 | 0 |
| empty | Boolean | 是否为空 | true |

### Methods
| 名称 | 类型 | 说明 |
| :--: | :--: | :--: |
| constructor | Function | 构造器 new Pager(page=1, limit=20) |
| setPage | Function | 当前页 |
| setLimit | Function | 每页限制数量 |
| setData | Function | 追加数据源[Object, Array] |
| resetData | Function | 重置数据源 |
| setPages | Function | 总页数 |
| setTotal | Function | 总数量 |
| hasMore | Function | 是否还有下一页 |
| loadmore | Function | 加载状态: more,loading,noMore，配合uview loadmore组件使用 |
| reset    | Function | 重置分页所有状态 |
