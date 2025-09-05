---
title: Push - 推送
---


# Push - 推送
## 简介

`Push`为方便客户端使用`UniPush`，初始化并监听了消息接收事件、点击事件。更多使用详见[UniPush使用指南](https://ask.dcloud.net.cn/article/35622)

`App.vue`中使用
```html
<script>
import { Push } from 'colorful-uni'
export default {
  onLaunch: function () {
    /* #ifdef APP-PLUS */
    new Push().register(payload => {
      setTimeout(() => {
        try {
          uni.navigateTo({ url: '/pages/message/message' })
        } catch (error) {
        }
      }, 500);
    })
    /* #endif */
  }
}
</script>
```
### 获取clientid

```js
import { Plus } from 'colorful-uni'
new Plus().clientid()
```