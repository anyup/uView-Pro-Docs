---
title: Vue 自定义组件实现 v-model 的几种方式
---

# Vue 自定义组件实现 v-model 的几种方式

## 前言

在 Vue 中，v-model 是一个常用的指令，用于实现表单元素和组件之间的双向绑定。当我们使用原生的表单元素时，直接使用 v-model 是很方便的，但是对于自定义组件来说，要实现类似的双向绑定功能就需要一些额外的处理。

本篇文章将介绍几种在自定义组件中实现 v-model 的方式，主要如下：

- 使用 `v-model` 属性：适用于表单元素

- 定义 `model` 属性：适用于非表单元素

除了以上的两种方式外，还有我们通常使用的[`.sync`  修饰符](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6 '.sync 修饰符')(2.3.0+ 新增)，主要区别在于使用方式的不同，前者直接使用 v-model，后者使用 `.sync` 修饰符进行绑定

## 一. 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

> 注意：每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不应该**在一个子组件内部改变 prop。虽然可以，但是如果你这样做了，Vue 会在浏览器的控制台中发出警告。

## 二. 基础原理浅析

v-model 实际上就是 `props:value` 和 `$emit('input')` 的组合语法糖，简单来说，v-model 的使用其实做了两个比较重要的操作，理解这两个操作，我们就可以轻松实现组件的自定义 `v-model`

1.  v-bind 绑定 value 属性的值 - props:value；

1.  v-on 绑定 input 事件监听到函数中，函数会获取最新的值赋值到绑定的属性中 - $emit('input')；

## 三. 实现 v-model 的两种方式

### 1. 直接使用 v-model 属性

> 适用于表单元素，或者原组件已经实现了 v-model，需要我们进行二次封装

以 input 表单元素为例，在 vue 中，我们可以直接使用 v-model 进行绑定数据，当我们在实现自定义组件`custom-component`进行封装 input 时，我们的组件对外暴露时也需要使用 v-model，看下面我们应该如何实现：

在自定义组件中，我们可以通过在组件内部使用 value 属性和手动触发 input 事件来实现 v-model 的双向绑定效果。具体实现如下：

```html
<template>
  <input v-model="newValue" />
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      newValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
```

使用`custom-component`

```js
<custom-component v-model='newValue' />
```

在上述代码中，我们通过 value 属性接收父组件传入的值，并且使用 computed 的 set 属性用来监听值的更新，手动触发 `$emit('input', value)` 来将新值传递给父组件，从而实现双向绑定的效果。

### 2. 定义 model 属性

> 适用于非表单元素，完全非表单元素自定义的组件

Vue 允许我们在定义组件中通过定义 model 属性来简化 v-model 的使用。通过定义 model 属性，我们可以指定组件中哪个属性的值应该作 v-model 的值。

假如我们实现一个计数器的组件`custom-counter`，在页面中显示两个按钮，点击按钮可以进行数值的加减操作，具体示例如下：

```html
<template>
  <div>
    <button @click="increment">+</button>
    <span>{{ value }}</span>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
  export default {
    // 当 model 为默认值时，可以将其省略
    model: {
      prop: 'value', // 默认是 value
      event: 'input' // 默认是 input
    },
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      increment() {
        this.$emit('input', this.value + 1)
      },
      decrement() {
        this.$emit('input', this.value - 1)
      }
    }
  }
</script>
```

> 提示：当 model 为默认值时，可以将其省略

父组件中使用`custom-counter`

```html
<template>
  <div>
    <custom-counter v-model="count"></custom-counter>
    <p>计数器的值为：{{ count }}</p>
  </div>
</template>

<script>
  import CustomCounter from './CustomCounter.vue'

  export default {
    components: {
      CustomCounter
    },
    data() {
      return {
        count: 0
      }
    }
  }
</script>
```

演示效果如下图所示：

![record.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25d9576798ed45e4b0022ea7f5cddd36~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=998&h=254&s=39165&e=gif&f=34&b=fefefe)

在上面的示例中，`CustomCounter`组件接收一个`value`属性来接收父组件传递的值，并在点击按钮时修改`value`属性的值。通过调用`this.$emit('input', newValue)`触发`input`事件，将新的`value`值传递给父组件进行更新。

在父组件中，使用`v-model`将父组件中的`count`属性绑定到`CustomCounter`组件的`value`属性上，绑定 input 事件监听到函数中，从而实现了数据的双向绑定。

model 是允许 vue 自定义组件使用 v-model 的关键，虽然有时我们不显性的使用它，也不影响我们在自定义组件中使用 v-model 指令，这只是因为被设置默认值。而有的时候，显示的使用，并自定义 model 的 prop 和 event 会有益。

> 注意：允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

## 四. .sync 修饰符

> 适用于提供于多个双向绑定的 prop，灵活提供你想要绑定的 property 名

在有些情况下，我们可能需要对一个 prop 进行 “双向绑定”。但是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。

举个例子，还是上面的计数器的例子，在一个包含 `count` prop 的计数组件中，我们可以用以下方法表达对其赋新值的意图：

```js
this.$emit('update:count', newCount)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```html
<custom-counter v-bind:count="count" v-on:update:count="count = $event" />
```

我们为这种模式提供一个缩写，即 .sync 修饰符，如下：

```html
<custom-counter :count.sync="count"></custom-counter>
```

以上的两种写法是等价的

> 注意：带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:count.sync=”count + 1” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model。

## 五. 总结

本篇文章介绍了在 Vue 自定义组中实现 v-model 的几种方式，包括定义 model 属性和使用 v-model 属性。通过以上案例实际分析，相信大家都已经了解这几种方式的创建以及应用场景，以便更加灵活地应用到实际项目中。

以上面两种方式为例，我们可以灵活地根据自己的需求选择合适的方式来实现自定义组件 v-model。如果是表单元素，可以直接使用 v-model 属性；如果是非表单元素，可以通过定义 model 属性指定组件中哪个属性的值应该作 v-model 的值。

除此之外，使用 `.sync` 修饰符也是进行自定义组件双向绑定的优秀选择，因此在实际开发中，选择适合自己项目需求的方式是最重要的。

## 参考资料

[Prop](https://v2.cn.vuejs.org/v2/guide/components-props.html)

[自定义事件](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html)

[.sync  修饰符](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6 '.sync 修饰符')

<ArticleFooter link="https://juejin.cn/post/7336538738749423616" />
