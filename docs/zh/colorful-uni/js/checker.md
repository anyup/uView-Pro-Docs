---
title: Checker - 表单校验
pageClass: demo-preview
---

<DemoPreview url="pages/js/checker"/>

# Checker - 表单校验

## 简介
提供了常用的表单校验方法，封装了常用规则，暂时不支持扩展规则。

```html
<template>
  <view>
    <form>
      <input v-model="form.name" placeholder="请输入姓名" />
      <input v-model="form.intro" placeholder="请输入简介" />
      <input v-model="form.phone" placeholder="请输入手机号" />
    </form>
    <view class="is-mgtb-20 is-flex">
      <view class="is-flex-1">
        <col-button type="default" @click="reset">重置</col-button>
      </view>
      <view style="width: 100rpx"></view>
      <view class="is-flex-1">
        <col-button type="primary" @click="submit">提交</col-button>
      </view>
    </view>
  </view>
</template>
<script>
  import { checker } from 'colorful-uni';
  export default {
    data() {
      return {
        form: {
          name: "",
          intro: "",
          phone: "",
        },
      };
    },
    methods: {
      reset() {
        this.form = {
          name: "",
          intro: "",
          phone: "",
        };
      },
      submit() {
        let rules = [
          {
            name: "name",
            rule: ["required"],
            msg: ["请输入姓名"],
          },
          {
            name: "intro",
            rule: ["required"],
            msg: ["请输入简介"],
          },
          {
            name: "phone",
            rule: ["required", "!isMobile"],
            msg: ["请输入手机号", "请输入正确手机号"],
          },
        ];
        let checkRes = checker.validation(this.form, rules);
        if (checkRes) {
          this.$_u.tips.toast(checkRes, "info");
          return;
        }
        this.$_u.tips.toast("校验成功", "success");
      },
    },
  };
</script>
```

## API
### Methods
| 名称 | 说明 |
| :--: | :--: |
| required | 是否必填项 |
| isMobile | 是否为手机号 |
| isEmail | 是否为邮箱 |
| isCarNo | 是否为车牌 |
| isIdCard | 是否为身份证号 |
| isAmount | 是否为金额，只允许保留两位小数 |
| isNum | 是否为数字 |
| isZh | 是否为中文 |
| isEn | 是否为英文 |
| isEnAndNum | 是否为8~20位数字和字母组合 |
| isEnOrNum | 是否为英文或者数字 |
| isSpecial | 是否包含特殊字符 |
| isSpecialZh | 是否包含中文特殊字符 |
| isEmoji | 是否包含表情 |
| isDate | 是否为日期 2019-10-12 |
| isUrl | 是否为链接 |
| isSame | 是否相同isSame:key |
| isRange | 是否在范围内isRange:[Number,Number] |
| minLength | 最小长度minLength:Number |
| maxLength | 最大长度maxLength:Number |


