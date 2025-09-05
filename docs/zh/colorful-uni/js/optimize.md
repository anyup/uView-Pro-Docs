---
title: Optimize - 优化类
pageClass: demo-preview
---

<DemoPreview url="pages/js/optimize"/>

# Optimize - 优化类

::: tip 定义
- 防抖：一定时间内，只有最后一次操作后，经过设定时间后执行
- 节流：一定时间内，只执行一次
:::

```html
<template>
  <view class="is-pd-10">点击次数：{{ times }}</view>
</template>
<script>
import { Optimize } from 'colorful-uni'
export default {
  data() {
    return {
	  times: 0,
      optimize: new Optimize.Builder(2000)
    }
  },
  methods: {
	// 防抖
    debounce() {
      this.optimize.debounce(() => {
        this.times++
      })
    },
	// 节流
	throttle() {
      this.optimize.throttle(() => {
        this.times++
      })
    }
  }
}
</script>
```