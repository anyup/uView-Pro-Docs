---
title: Button - 按钮
pageClass: demo-preview
---

<DemoPreview url="pages/components/button"/>

# Button - 按钮

::: tip 说明
1. 此组件与uView button 组件基本一致，由此拓展而来，详细参考[uView](https://www.uviewui.com/components/button.html)
2. 此组件扩展了uView button 的部分功能
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
  <col-button type="primary" size="medium" palin>按钮</col-button>
</template>
```

## 如何自定义按钮的主题

**1.在uni.scss添加主题颜色变量**

```scss
/* 金色*/
$is-type-gold: #dcb170;
$is-type-gold-light: #f8f0e5;
$is-type-gold-disabled: #e0c9a5;
$is-type-gold-dark: #cea973;
```
**2.组件生效，依据项目UI可以以此单独封装Button**
```html
<template>
  <col-button :custom-types="['gold']" type="gold">自定义按钮</col-button>
</template>
<style lang="scss">
@import 'colorful-uni/dist/css/mixin.scss';

  $type: gold;
  $color: #ffffff;
  $main: $is-type-gold;
  $light: $is-type-gold-light;
  $disabled: $is-type-gold-disabled;
  $dark: $is-type-gold-dark;

  @for $i from 1 through length($type) {
    @include add-btn-theme(
      nth($type, $i),
      nth($color, $i),
      nth($main, $i),
      nth($light, $i),
      nth($disabled, $i),
      nth($dark, $i)
    );
  }
</style>
```

## API
### Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| type | 按钮主题类型 |	String |	default | primary / success / info/ warning / error |
| size | 按钮大小|	String |	default | medium / mini |
| shape |	按钮外观形状 |	String |	square |	circle |
| plain |	按钮是否镂空 |	Boolean|	false|	true|
| hollow | 按钮是否完全镂空，背景色透明 |	Boolean |	false |	true|
| disabled | 是否禁用|	Boolean |	false|	true |
| hair-line |	是否显示按钮的细边框 |	Boolean|	true|	false |
| loading |	按钮名称前是否带loading图标 |	Boolean	|false|	true|	App-nvue 平台，在 ios 上为雪花，Android上为圆圈|
| form-type |	用于 `<form>` 组件，点击分别会触发 `<form>` 组件的 submit/reset 事件|	String|	- |	submit / reset|
| open-type |	开放能力|	String|	请参考uni-app方文档 |	- |
| hover-class |	指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果|	String|	button-hover |	- | 
| throttle-time |	节流的时间间隔，单位ms	| String | Number |	500	| - |

### Events
| 名称 | 说明 | 回调 |
| :--: | :--: | :--: |
| click |	按钮点击，请勿使用@tap点击事件，微信小程序无效，返回值为点击事件及参数| 	Handler	|	
| getphonenumber |	open-type="getPhoneNumber"时有效| 	Handler	|		
| getuserinfo |	用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo	| Handler|		
| error |	当使用开放能力时，发生错误的回调	| Handler		|		
| opensetting |	在打开授权设置页并关闭后回调| 	Handler		|		
| launchapp |	打开 APP 成功的回调	| Handler	|
