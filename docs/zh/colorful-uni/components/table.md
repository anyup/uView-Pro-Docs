---
title:  Table - 表格
pageClass: demo-preview
---

<DemoPreview url="pages/components/table"/>

# Table - 表格

::: tip 说明
此组件为表格组件，一般用于展示大量结构化数据的场景
:::

## 平台差异说明
|  App  |  H5   | 微信小程序 |
| :---: | :---: | :--------: |
|   √   |   √   |     √      |

## 基本使用

```html
<template>
	<col-table padding="10rpx">
      <col-tr fixed>
        <col-th>姓名</col-th>
        <col-th>性别</col-th>
        <col-th :sort="sort" @click="onSort">年龄</col-th>
        <col-th>居住地</col-th>
      </col-tr>
      <col-tr v-for="(value, key) in 3" :key="key">
        <col-td>张三</col-td>
        <col-td>男</col-td>
        <col-td>18</col-td>
        <col-td>北京</col-td>
      </col-tr>
    </col-table>
</template>
<script>
export default {
  data() {
    return {
	    sort: 'desc'
    }
  }
}
</script>
```

## API
## Table Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| border-color  |   表格边框的颜色   | String |   #e4e7ed    |   -    |
| bg-color |   表格的背景颜色   | String |   #ffffff    |   -    |
| align | 单元格的内容对齐方式，作用类似css的text-align | center |   	left / right    |   -    |
| padding |   单元格的内边距，同css的padding写法   | String |   10rpx 0    |   -    |
| font-size |   单元格字体大小，单位rpx   | String / Number |   28    |   -    |
| color |   单元格字体颜色   | String |   #606266    |   -    |
| th-style |   th单元格的样式，对象形式(将th所需参数放在table组件，是为了避免每一个th组件要写一遍)   | Object |   {}    |   -    |

## Th Props

| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| sort | 排序显示| String |   -    |   asc/desc/none    | 
| width	| 标题单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度	|String / Number|	auto|	-|

## Td Props
| 名称 | 说明 | 类型 | 默认值 | 可选值 |
| :--: | :--: | :--: | :--: | :--: |
| width	|单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度	|String / Number|	auto|	-|

### Th Events
| 名称 | 说明 | 回调 |
| :--: | :--: | :--: |
| click | th点击事件，用户排序 | Handler |
