---
title: Vue缓存组件 | 详解KeepAlive
---

# Vue缓存组件 | 详解KeepAlive

## 引言

在`Vue`开发中，我们经常需要处理大量的组件渲染和销毁操作，这可能会影响应用的性能和用户体验。而`Vue`的`KeepAlive`组件提供了一种简便的方式来优化组件的渲染和销毁流程，通过缓存已经渲染的组件来提升应用的性能。

本文将详细介绍`Vue`的`KeepAlive`组件，探讨其原理和用法。我们将首先了解`KeepAlive`组件的作用和优势，在什么情况下使用它能够带来性提升。然后，我们将学习如何使用`KeepAlive`组件缓存需要保持状态的组件，以及如何通过生命周期钩子函数来控制缓存的组件。我们还会介绍`KeepAlive`与动态组件、路由组件的搭配使用，以及其在列表渲染中的应用。

通过本文的学习，您将了解到如何灵活运用`KeepAlive`组件来优化 Vue 应用的性能。您将掌握到如何合理地使用缓存组件，以及其与其他`Vue`特性的结合使用，来构建出更高效、流畅的应用。让我们一起深入探索`Vue`的缓存组件`KeepAlive`！

**以下是本文的目录**

> 一. keep-alive 的作用
>
> 二. keep-alive 的原理
>
> 三. keep-alive 的应用
>
> 四. keep-alive 的刷新
>
> 五. keep-alive 页面缓存思路

## 一. keep-alive 的作用

首先引用官网文档介绍：[keep-alive 官方文档](https://cn.vuejs.org/guide/built-ins/keep-alive.html#keepalive)

`Vue` 的 `keep-alive`为抽象组件，主要用于缓存内部组件数据状态。可以将组件缓存起来并在需要时重新使用，而不是每次重新创建。这可以提高应用的性能和用户体验，特别是在需要频繁切换组件时。

**Props：**
`include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
`exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
`max` - 数字。最多可以缓存多少组件实例。

**用法：**

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 `DOM` 元素，也不会出现在组件的父组件链中。

当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

通常情况下，组件在销毁时会释放它所占用的资源，如 `DOM` 元素、监听器、定时器等。而当组件需要重新使用时，需要重新创建这些资源，这会消耗额外的时间和性能。

使用  `keep-alive`  组件可以避免这种情况，它可以将组件缓存起来并在需要时直接使用，而不需要重新创建。这样可以节省资源和提高性能，特别是对于那些需要频繁切换的组件，比如 Tab 切换、路由切换等等。

另外，`keep-alive` 组件也提供了一些钩子函数，可以用来在组件激活和失活时执行一些操作，比如更新数据、发送请求等等。这些钩子函数包括：

- `activated`: 组件被激活时调用，可以用来更新数据等操作。
- `deactivated`: 组件被缓存时调用，可以用来清除数据等操作。

> 需要注意的是：`keep-alive` 组件只能缓存有状态组件，不能缓存无状态组件（比如纯展示组件）。此外，如果需要缓存多个组件，需要使用 `v-for` 循环遍历，而且每个缓存的组件必须有一个唯一的 `key` 属性。

总之，`keep-alive` 组件可以提高应用的性能和用户体验，特别是在需要频繁切换组件时。但需要注意使用时的细节和限制。

## 二. keep-alive 的原理

`keep-alive` 组件的实现原理是将被缓存的组件实例存储到一个缓存对象中，当需要重新渲染这个组件时，会从缓存中获取到之前的实例，并将其重新挂载到 `DOM` 上。

从`Vue`的渲染看`keep-alive`的渲染

![713-2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/083680ea33764af0b2e0bf87c228e510~tplv-k3u1fbpfcp-watermark.image?)

`Vue`的渲染是从图中`render`阶段开始的  
但`keep-alive`的渲染是在`patch`阶段（构建组件树（虚拟`DOM`树），并将`VNode`转换成真正`DOM`节点的过程）

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce0eb2bafb1846e1872e6c88ed550118~tplv-k3u1fbpfcp-watermark.image?)

1、在首次加载被包裹组件时，由`keep-alive.js`中的`render`函数可知，`vnode.componentInstance`的值是`undfined`，`keepAlive`的值是`true`，因为`keep-alive`组件作为父组件，它的`render`函数会先于被包裹组件执行；那么只执行到`i(vnode,false)`，后面的逻辑不执行；

2、再次访问被包裹组件时，`vnode.componentInstance`的值就是已经缓存的组件实例，那么会执行`insert(parentElm, vnode.elm, refElm)`逻辑，这样就直接把上一次的`DOM`插入到父元素中。

![713-1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/361aee006d7e4eafb583cbaaeef80bfb~tplv-k3u1fbpfcp-watermark.image?)

## 三. keep-alive 的应用

下面是一个简单的例子，演示了如何使用 `keep-alive` 组件缓存一个计数器组件：

```js
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
export default {
  props: ['count'],
  methods: {
    increment() {
      this.$emit('increment')
    },
    decrement() {
      this.$emit('decrement')
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

```

**父组件使用**

```js
<template>
  <div>
    <keep-alive>
      <counter :count="count" @increment="increment" @decrement="decrement" @reset="reset" />
    </keep-alive>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
import Counter from './Counter.vue'

export default {
  components: {
    Counter
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  }
}
</script>

```

在这个例子中，我们创建了一个计数器组件 `Counter`，并在父组件中使用 `keep-alive` 组件来缓存它。我们还定义了一个 `count` 数据属性，并将它传递给 `Counter` 组件作为一个 prop，用于展示当前的计数值。同时，我们还绑定了三个自定义事件 `increment`、`decrement` 和 `reset`，用于响应计数器的操作。

当我们点击增加或减少按钮时，`Counter` 组件的 `count` 属性会发生变化，但由于它被包裹在 `keep-alive` 组件中，所以实际上并没有被销毁。当我们再次渲染 `Counter` 组件时，它会从缓存中获取到之前的实例，并将其重新挂载到 DOM 上，这样就能够保留之前的状态。 在上面的例子中，我们可以看到在 `keep-alive` 组件中只包含了一个 `Counter` 组件。但是，在实际应用中，我们可能需要缓存多个不同的组件，这时我们可以通过 `include` 和 `exclude` 属性来指定要缓存或排除的组件。

例如，我们可以修改上面的例子，将 `Counter` 组件和另一个文本组件 `Text` 都缓存起来

```js
<template>
  <div>
    <keep-alive :include="[Counter, Text]">
      <component :is="currentComponent" :count="count" v-on:increment="increment" v-on:decrement="decrement" v-on:reset="reset" />
    </keep-alive>
    <button @click="toggleComponent">切换</button>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
import Counter from './Counter.vue'
import Text from './Text.vue'

export default {
  components: {
    Counter,
    Text
  },
  data() {
    return {
      count: 0,
      currentComponent: 'Counter'
    }
  },
  methods: {
    toggleComponent() {
      this.currentComponent = this.currentComponent === 'Counter' ? 'Text' : 'Counter'
    },
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  }
}
</script>

```

在上面的例子中，我们定义了一个 `currentComponent` 数据属性，用于动态切换要渲染的组件。我们还使用了 `component` 元素来动态渲染不同的组件。

在 `keep-alive` 组件中，我们使用了 `include` 属性来指定要缓存的组件。注意，这里传入的是一个数组，可以包含多个组件。

同时，我们还可以使用 `exclude` 属性来排除某些组件不进行缓存。例如，我们可以将 `Text` 组件排除在缓存之外，如下所示：

```js
<keep-alive :include="[Counter]" :exclude="[Text]">
  <!-- 缓存 Counter 组件，排除 Text 组件 -->
</keep-alive>
```

**注意事项**

`KeepAlive`组件是一个强大的性能优化工具，但是需要合理使用，并注意其中的一些注意事项。通过深入理解和正确使用`KeepAlive`组件，才可以在`Vue`应用中提高性能和用户体验。在使用`Vue`的`KeepAlive`组件时，有一些注意事项需要注意：

1. **合理使用**：`KeepAlive`组件通过缓存已经渲染的组件，可以提升应用的性能。但是，过多地使用`KeepAlive`组件可能会导致内存占用增加，因此需要谨慎使用。只在真正需要保持组件状态的场景下使用`KeepAlive`组件。

2. **控制缓存的组件数量**：默认情况下，`KeepAlive`会缓存所有经过它的子组件。如果不需要缓存所有组件，需要通过`include`和`exclude`属性来选择性地缓存组件。这样可以避免不必要的内存占用。

3. **生命周期的影响**：被`KeepAlive`缓存的组件，会在`activated`和`deactivated`生命周期钩子函数中触发相应的逻辑。因此，在使用`KeepAlive`时，要注意这些生命周期函数的使用场景和影响。

4. **组件状态更新**：由于`KeepAlive`组件对缓存的组件进行了复用，因此需要小心处理组件状态的更新。一些状态变更操作，可能不会在组件重新激活时触发，需要手动处理相应的逻辑。

5. **样式与动画**：由于`KeepAlive`组件会复用组件实例，可能会导致一些样式和动画的问题。特别是涉及到组件之间的切换效果时，需要特别注意相关的样式和动画逻辑。

总而言之，`keep-alive` 组件的作用是缓存动态组件或者组件的状态，避免重复渲染和销毁组件，从而提高应用的性能。在实际应用中，我们可以通过指定要缓存或排除的组件来灵活地控制组件的缓存策略，以满足不同的需求。

## 四. keep-alive 如何刷新

当使用 `keep-alive` 组件缓存一个组件时，如果需要在组件被缓存时执行一些操作，可以使用 `activated` 钩子函数，在组件被激活（被缓存并且被展示）时触发。如果需要在组件被缓存时清除一些数据或状态，可以使用 `deactivated` 钩子函数，在组件被停用（被缓存但不被展示）时触发。

如果需要强制重新渲染被缓存的组件，可以使用 `this.$forceUpdate()` 方法。在被缓存的组件中，可以将这个方法绑定到一个按钮上，当按钮被点击时，被缓存的组件会强制重新渲染。

需要注意的是，使用 `this.$forceUpdate()` 方法会重新渲染整个组件，包括不在 `keep-alive` 组件中的部分，因此需要谨慎使用，以免影响应用的性能。

> 除了使用 `this.$forceUpdate()` 方法强制重新渲染组件外，还可以使用 `include` 和 `exclude` 属性来控制哪些组件应该被缓存或不被缓存。当我们需要更新一个被缓存的组件时，可以将它从缓存中排除，并在需要更新时再重新包含到缓存中。这样可以避免无谓的重复渲染，提高应用的性能。

综上所述，我们可以通过使用 `activated` 和 `deactivated` 钩子函数、`this.$forceUpdate()` 方法以及 `include` 和 `exclude` 属性来控制被缓存的组件的刷新策略，以满足不同的需求。

## 五. keep-alive 页面缓存思路

功能需求描述：

1.  页面前进刷新，后退不刷新
2.  动态配置可缓存的页面
3.  手动刷新已缓存的页面

实现思路：动态`include`配置缓存组件，路由拦截判断当前跳转路由是否配置可缓存

```js
<template>
  <keep-alive :include="cachedViews" :exclude="excludeViews">
    <router-view></router-view>
  </keep-alive>
</template>
```

**动态操作 include 绑定值 store 状态管理：**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cachedViews: [],
    excludeViews: []
  },
  mutations: {
    ADD_CACHED_VIEW: (state, payload) => {
      if (state.cachedViews.includes(payload)) return
      state.cachedViews.push(payload)
    },
    DEL_CACHED_VIEW: (state, payload) => {
      const index = state.cachedViews.indexOf(payload)
      index > -1 && state.cachedViews.splice(index, 1)
    }
  },
  actions: {
    ADD_CACHED_VIEW({ commit }, payload) {
      commit('ADD_CACHED_VIEW', payload)
    },
    DEL_CACHED_VIEW({ commit }, payload) {
      commit('DEL_CACHED_VIEW', payload)
    }
  }
})

export default store
```

**在路由拦截器中实现逻辑：**

1. 路由导航进入时，如果配置了缓存，则记录状态，并实现缓存页面

```javascript
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (to.meta.keepAlive) {
    store.dispatch('ADD_CACHED_VIEW', to.name)
  }
})
```

2. 路由离开时，删除缓存标识

```javascript
<script>
export default {
  name: "B",
  beforeRouteLeave(to, from, next) {
    if (to.name != "C") {
      this.$store.dispatch('DEL_CACHED_VIEW', to.name)
    }
    next();
  },
  methods: {
  }
};
</script>
```

## 结语

通过本文的学习，我们深入了解了 Vue 中的缓存组件`KeepAlive`，并详细介绍了它的原理和使用方法。我们了解了`KeepAlive`组件的作用，以及通过缓存已经渲染的组件来提升应用性能的优势。

在实际开发中，我们经常会遇到需要保持组件状态的场景，比如在**动态组件**、**路由组件**或者**列表渲染**中。使用`KeepAlive`组件可以很方便地缓存这些组件，并在需要时重新激活，避免了频繁的组件销毁和重新渲染。

同时，我们也提到了`KeepAlive`组件的一些使用注意事项。由于缓存组件可能导致内存占用增加，所以需要对缓存的组件进行适当管理，避免出现内存泄漏的情况。我们还介绍了如何使用 activated 和 deactivated 生命周期钩子函数来控制缓存的组件的行为，以及如何通过`exclude`和`include`属性来选择性地缓存组件。

通过合理地运用`KeepAlive`组件，我们可以在`Vue`应用中显著提升性能和用户体验。使用`KeepAlive`组件不仅能够减少不必要的组件渲染，还能提高页面切换的流畅度，让用户感受到更好的应用响应速度。

<ArticleFooter :link="['juejin::https://juejin.cn/post/7270160291413016628', 'weixin::https://mp.weixin.qq.com/s/i_TyFj9t6izxob0HjdaFVA']" />
