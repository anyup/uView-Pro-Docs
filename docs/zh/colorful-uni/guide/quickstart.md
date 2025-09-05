---
title: 快速上手
---

# 快速上手

## 导入组件

::: warning 注意

1. 请确保您的 `pages.json` 中只有一个 `easycom` 字段，否则请自行合并多个引入规则。
2. 由于组件引入是通过 `easycom` 形式的，写在 `pages.json` 中，以 `col-` 开头，请注意这可能和其他 `UI` 组件冲突
3. `easycom` 配置的规则优先级比页面引入的组件规则高

:::

使用 `uni_modules` 安装时 `colorful-uni` 的组件自动支持 `easycom` 规范，无需额外配置就可以自动引入组件，而使用 `npm` 安装 需按照此步骤配置：

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^col-(.*)": "colorful-uni/dist/components/col-$1/col-$1.vue"
    }
  },
  // 页面配置
  "pages": [
    // ......
  ]
}
```

## 在 main.js 注册

```js
// 项目中最好使用Vuex Store，因为部分功能依赖
import store from './store'
import ColorfulUni from 'colorful-uni'
Vue.use(ColorfulUni, { store })
```

## App.vue 导入全局样式

```scss
<style lang="scss">
@import 'colorful-uni/dist/index.scss';

page {
  height: 100%;
  background-color: #ffffff;
}
</style>
```

## 在 uni.scss 导入主题样式

```scss
@import 'colorful-uni/dist/theme.scss';
// 自定义主题颜色
$is-type-primary: #2979ff;
$is-type-primary-light: #ecf5ff;
$is-type-primary-disabled: #a0cfff;
$is-type-primary-dark: #2b85e4;

$is-type-warning: #ff9900;
$is-type-warning-disabled: #fcbd71;
$is-type-warning-dark: #f29100;
$is-type-warning-light: #fdf6ec;

$is-type-success: #19be6b;
$is-type-success-disabled: #71d5a1;
$is-type-success-dark: #18b566;
$is-type-success-light: #dbf1e1;

$is-type-error: #fa3534;
$is-type-error-disabled: #fab6b6;
$is-type-error-dark: #dd6161;
$is-type-error-light: #fef0f0;

$is-type-info: #909399;
$is-type-info-disabled: #c8c9cc;
$is-type-info-dark: #82848a;
$is-type-info-light: #f4f4f5;
// 其他颜色
$is-main-color: #303133;
$is-content-color: #606266;
$is-tips-color: #909399;
$is-light-color: #c0c4cc;
$is-border-color: #e4e7ed;
$is-bg-color: #f3f4f6;
$is-form-item-border-color: #dcdfe6;
$is-form-item-height: 70rpx;
```

如果你使用了 `uView` 组件库，可以更简单些，直接导入 `uView` 主题样式即可：

```scss
@import 'uview-ui/theme.scss';
// 自定义了部分uview-ui主题颜色
$u-type-primary: #004ea2;
$u-type-primary-light: #ecf5ff;
$u-type-primary-disabled: #a0cfff;
$u-type-primary-dark: #2b85e4;
// 必须在导入 uview-ui 之后，继承 uview-ui 的主题变量
@import 'colorful-uni/dist/u.theme.scss';
```

## 使用脚手架

Colorful Uni 支持使用 `create-colorful-app` CLI 脚手架快速创建项目

详细查看文档：[使用 Colorful Uni Cli 快速创建 uni-app 模板](/zh/template/create-uni/)