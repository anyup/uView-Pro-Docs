---
title: Vuex 入门与实战：了解 Vue 状态管理的核心概念
---

# Vuex 入门与实战：了解 Vue 状态管理的核心概念

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb36fd347368493bae9185e760e174c1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=855&h=378&s=254577&e=png&b=fffafa)

## 引言

Vuex 是 Vue.js 官方推荐的状态管理库，它可以帮助我们更好地管理 Vue 应用的状态。在大型应用中，组件之间的状态共享和通信是一个非常重要的问题，而 Vuex 提供了一种优雅的解决方案。

在 Vue 应用中，数据的流动一般是单向的：从父组件传递到子组件。但是当我们需要在多个组件之共享和修改数据时，这种单向的数据流就显得不够灵活。此时，Vuex 可以提供一个集中式的状态管理方案，让我们更方便地管理和共享应用的状态，并且处理复杂的组件通信需求。

通过本篇文章的学习，你将全面了解 Vuex 的基础使用方法和注意事项，掌握高效的状态管理技巧。

## 一. 什么是 Vuex

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e2acdeba1214d7e935bedc8c87a0b52~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=724&h=348&s=19007&e=png&b=ffffff)

<p align=center>单向数据流</p>

Vuex 是一个专门为 Vue.js 应用程序开发的状态管理模式和库。它集中管理 Vue 组件的状态，并提供了一种可预测的方式来管理和变更状态，从而方便多个组件之共享数据。Vuex 遵循**单向数据流**的原则，使得状态的变化更加可控和追踪。它与 Vue.js 的配合使用可以管理全局的状态，包括数据、网络请求、用户登录状态等。

### 1. 核心概念

1. **State**（状态）：用于存储应用中共享的状态数据，类似于组中的本地 data。
2. **Mutations**（突变）：用于修改状态，只能执行同步操作，类似于组件中的方法。
3. **Actions**（动作）：用于执行异步操作和复杂的业务逻辑，并最终通过提交 mutations 来修改状态。
4. **Getters**（获取）：用于从状态中派生出一些数据，类似于组件中的计算属性。

### 2. 核心思想

Vuex 的核心思想是**单一状态树**，即：使用一个对象来存储应用的所有状态，这样整个应用的状态变化可以被追踪和维护。

Vuex 使不同组件之间可以更方便地共享和访问状态，降低了组件间的耦合性，特别是在大型复杂的应用中，可以帮助开发人员更好地管理和维护状态，提高开发效率。

### 3. 基本原则

Vuex 状态管理的原则主要包括以下几点：

1. **单一数据源**：

遵循单一数据源的原则，即将所有的状态存储在一个单一的 state 对象中。这种集中的状态管理使得状态的变化更加可追踪和可预测，同时也方便了开发者对状态的统一管理和调试。

2. **状态是响应式的**：

使用 Vue 的响应式系统来实现状态的变化监测和更新。当 state 中的数据发生变化时，所有依赖于该状态的组件都会自动更新。这样可以保证组件和状态之间的一致性，避免了手动去同步状态的问题。

3. **Mutations 是同步的**：

mutations 用于修改 state 中的数据，它们必须是同步的。这是因为 Vue 的响应式机制要求对状态的更新是同步的。如果需要进行异步操作，应该使用 actions 来处理。

4. **Actions 处理异步操作**：

Actions 用于处理异步操作和复杂业务逻辑。通过提交 mutations 来修改 state 中的数据。这样的设计可以将异步操作和状态更新的职责进行分离，使代码更加清晰和可维护。同时，actions 也可以用来触发其他 actions，实现复杂的异步操作的串联和组合。

5. **Getters 计算派生状态**：

Getters 用于从 state 中派生出一些状态，类似于 Vue 组件中的 computed 属性。它们可以对 state 进行逻辑计算和过滤，从而在组件中方便地获取需要的派生状态。通过 getters，我们可以避免在多个组件中重复计算相同的逻辑。

6. **模块化管理**：

当应用的状态变得非常庞大和复杂时，可以使用 Vuex 的模块化管理来将状态进行划分和组织。每个模块都可以拥有自己的 state、mutations、actions 和 getters，从而实现更好的代码组织和维护。

> 在 Vue 项目中使用 Vuex 时，遵循这些原则，可以使状态管理变得更加易于理解、可维护和扩展。同时，也能够让我们更好地利用 Vuex 的特性和功能来进行状态管理。

## 二. 深入理解 Vuex 的核心概念

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e49ca74417434a0aa7192c33c7ecf541~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=825&h=504&s=24594&e=png&b=ffffff)

Vuex 提供了一种集中式的状态管理方案，使得组件之间的状态共享更加方便和可控。在 Vuex 中，有四个核心概念：**state**、**mutations**、**actions** 和 **getters**。

**场景**：以数值累加的计算方式为场景，详细说明这几个重要概念

### 1. State（状态）

State 即应用的状态，可以理解为存储数据的容器。在 Vuex 中，我们通过定义一个 state 对象来存储应用的各种状态值。

定义一个名为 count 的状态来存储计数值：

```js
state: {
  count: 0
}
```

通过 `this.$store.state.count` 来访问和获取状态值。

### 2. Mutations（突变）

Mutations 用于修改 state 的值，它是唯一可以修改 state 的方法。每个 mutation 都有一个字符串的事件类型（type）和一个回调函数。回调函数中进行实际的状态修改操作。

定义一个名为 increment 的 mutation 来增加 count 的值：

```js
mutations: {
  increment(state) {
    state.count++;
  }
}
```

通过 `this.$store.commit('increment')` 来提交（触发）一个 mutation，并修改 state 中的值。

### 3. Actions（动作）

Actions 用于处理异步逻辑，可以包含任意异步操作和业务逻辑。和 mutation 类似，每个 action 也有一个字符串的事件类型和一个回调函数。回调函数中可以执行异步操作，并通过提交（commit）mutation 来修改 state。

定义一个名为 incrementAsync 的 action 来异步函数增加 count 的值：

```js
actions: {
  incrementAsync(context) {
    setTimeout(() => {
      context.commit('increment');
    }, 1000);
  }
}
```

通过 `this.$store.dispatch('incrementAsync')` 来分发（触发）一个 action，执行异步操作。

### 4. Getters（计算属性）

Getters 用于从 state 中派生出一些衍生状态，类似于 Vue 组件中的计算属性。它们可以对 state 进行逻辑计算和过滤，并返回派生的值。

定义一个名为 doubleCount 的 getter 来返回 count 的两倍值：

```js
getters: {
  doubleCount(state) {
    return state.count * 2;
  }
}
```

通过 `this.$store.getters.doubleCount` 来访问和获取 getter 的值。

> 以上的这些核心概念共同组成了 Vuex 的状态管理机制，通过统一的方式管理和响应 state 的变化，使得应用的状态变得可预测和可维护。同时，Vuex 提供了丰富的工具和功能，可以帮助我们更好地进行状态管理。

## 三. Vuex 的使用场景

Vuex 的使用场景主要包括以下几种情况：

1. **多个组件共享状态数据**：

当多个组件需要访问或修改同一个状态数据时，可以使用 Vuex 来集中管理这些状态数据，避免状态的分散和重复定义。例如，一个购物车应用中的多个组件可能都需要访问购物车的商品数量和总价，使用 Vuex 可以方便地共享这些状态数据。

2. **多个组件共享数据的响应式更新**：

当一个组件修改了共享状态数据时，其他组件也需要能够感知到状态的变化并进行相应的处理。Vuex 通过响应式地管理和更新状态数据，可以确保多个组件之间状态的一致性，避免手动在组件之间进行数据传递和同步。

3. **管理异步操作和业务逻辑**：

当需要进行异步操作（如网络请求）或复杂的业务逻辑处理时，可以使用 Vuex 的 Actions 来封装这些操作和逻辑，并最终通过提交 Mutations 来修改状态。使用 Vuex 可以让异步操作和业务逻辑与组件解耦，使得组件更关注于展示和用户交互。

## 四. Vuex 的使用步骤

**场景**：还是以数值累加的计算方式为场景，我们用 Vuex 来管理它们的状态，实现数值的显示和修改

### 1. 安装 Vuex

通过 npm 或 yarn 来安装 Vuex。打开命令行工具，进入你的项目根目录，然后执行以下命令：

```
npm install vuex
```

或者：

```
yarn add vuex
```

### 2. 创建 Vuex 的 store

在项目的根目录或 src 目录下创建一个新的文件夹，例如 store，然后在 store 文件夹中创建一个新的 JavaScript 文件，例如 index.js。这个文件将是 Vuex 的 store 的入口文件。

在 index.js 中，需要引入 Vue 和 Vuex，并创建一个新的 store 实例。示例代码如下：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 在这里配置你的state、mutations、actions、getters等
})

export default store
```

### 3. 配置 state、mutations、actions 和 getters

在 store 的配置对象中，可以定义和配置你的 state、mutations、actions 和 getters。

例如，可以定义一个名为 count 的状态，并定义一个名为 increment 的 mutation 方法来增加 count 的值。示例代码如下：

```js
import Vuex from 'vuex'

// 在这里配置你的state、mutations、actions、getters
const store = new Vuex.Store({
  // 配置 state
  state: {
    count: 0,
    doubleCount: 0
  },
  // 配置 mutations
  mutations: {
    increment: (state, device) => {
      state.count++
    },
    reduce: (state, device) => {
      state.count--
    }
  },
  // 配置 actions
  actions: {
    incrementAsync({ commit }) {
      commit('increment')
    },
    reduceAsync({ commit }) {
      commit('reduce')
    }
  },
  // 配置 getters
  getters: {
    count: state => state.count,
    doubleCount: state => state.count * 2
  }
})
```

### 4. 在 Vue 应用中使用 Vuex 的 store

现在，需要将 store 配置应用到 Vue 实例中。在 main.js 入口文件中，引入 store 并在 Vue 实例的配置中使用它。示例代码如下：

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

### 5. 在组件中使用 Vuex

现在，可以在 Vue 组件中使用 Vuex 的 store 了。

在组件中可以通过`this.$store.state.count`来获取状态值，
通过`this.$store.commit('increment')`来提交一个 mutation 并修改状态值。

同时，可以通过`mapState`、`mapMutations`、`mapActions`和`mapters`等辅助函数来简化在组件中使用 vuex 的过程。示例代码如下：

```js
<template>
  <div>
    <h3>基于 Vuex 的状态管理</h3>
    <button @click="increment">
      increment
    </button>
    <button @click="reduce">
      reduce
    </button>
    <button @click="incrementAsync">
      incrementAsync
    </button>
    <button @click="reduceAsync">
      reduceAsync
    </button>
    <h3>count：{{ count }}</h3>
    <h3>doubleCount：{{ doubleCount }}</h3>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.getters.count;
    },
    doubleCount() {
      return this.$store.getters.doubleCount;
    },
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    reduce() {
      this.$store.commit('reduce')
    },
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    },
    reduceAsync() {
      this.$store.dispatch('reduceAsync')
    }
  }
};
</script>
```

这样就从零到一实现了 Vuex 的安装、配置和使用。现在，你可以在 Vue 组件中使用 this.$store 来访问和操作 store 中的状态、调用 mutations 和 actions，以及获取 getters 中的派生状态了。

通过 Vuex，可以更好地组织和管理 Vue 应用的状态，实现状态的共享和通信。

![record-vuex.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24d5725a587b47fb8dfce7419e262a71~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1222&h=298&s=108025&e=gif&f=52&b=fefefe)

> 注意：以上的 Vuex 代码完全可以优化，尤其是管理大型复杂系统时，例如可以使用以下几种方式：
>
> 1.Vuex 辅助函数：例如： mapState：简化状态映射、mapMutations：简化 mutations 映射、mapActions：简化 actions 映射、 mapGetters：简化 getters 映射
>
> 2.模块化管理和命名空间：模块化组织结构，当状态和操作较多时，通过使用 namespace 命名空间来组织状态和操作。
>
> ...等等还有其他的各种优化创建、使用的操作

## 五. Vuex 的优缺点总结

### 1. 使用 Vuex 的优点

1. **集中管理状态**：使状态的变化更可追踪、可控。通过单一状态树的方式，开发人员可以清晰地知道状态在哪里被修改，方便调试和排查问题。

2. **共享状态数据**：方便地实现多个组件之间的状态共享，避免了手动传递和同步数据的麻烦。组件通过访问 Vuex 中的状态数据，可以实时获取最新的数据，并根据需要进行相应的操作。

3. **响应式更新**：通过采用 Vue 的响应式机制，可以自动追踪状态的变化并触发组件的重新染。当状态发生变化时，相关的组件会自动更新，无需手动进行数据更新的操作。

4. **简化异步操作**：提供了 Actions 来管理异步操作，例如网络请求、定时任务等。开发人员可以在 Actions 中封装相关的异步逻辑，执行完成后再通过提交 Mutations 来改变状态。这样可以更好地组织和管理异步操作，使代码更具可读性和可维护性。

### 2. 使用 Vuex 的缺点

1. **学习成本**：相对简单的状态管理可能会增加一些学习成本，在刚开始学习使用时，需要了解 Vuex 的核心概念和使用方法，理解单向数据流等概念。

2. **适用场景有限**：适用于大型复杂的应用程序，在小型应用中使用 Vuex 可能会显得冗余。如果应用较简单，状态管理需求不高，使用 Vuex 会增加代码量和复杂度。

3. **引入额外的依赖**：需要将其集成到 Vue.js 应用中，这会增加额外的依赖。如果项目中没有其他需要集成的插件或库，可能会觉得引入 Vuex 有点过于繁琐。

总体来说，Vuex 在大型应用中能够极大地简化状态管理，提高开发效率和代码质量但在小型应用中或对状态管理需求不高的情况下，使用 Vuex 可能会显得过于繁琐，不利于代码的简洁性。因此，需要根据具体的项目需求和模来评估是否使用 Vuex。

## 六. 使用注意事项

在使用 Vuex 时，有一些注意事项需要我们注意：

1. **单一状态树**：建议将应用的状态保存在单一的状态树中。这意味着所有的状态都集中存放在一个地方，方便状态的管理和追踪。

2. **异步操作**：在 Actions 中封装异步逻辑时，需要确保异步操作完成后再通过提交 Mutations 来修改状态，否则会导致状态不一致的问题。

3. **只能通过 Mutations 修改状态**：状态的修改只能通过 Mutations 来进行，不能直接在组件中直接修改状态。这样可以确保状态的变更可追踪，方便排查问题。

4. **避免在组件中直接访问和修改 Vuex 的状态**：虽然 Vuex 允许通过组件的计算属性和方法来访问和修改状态，但是为了保持状态的单向数据流，最好将状态的获取和修改逻辑统一放到 Vuex 的 Getter 和 Mutations 中。

5. **模块化管理**：随着应用规模的增加，可以将 Vuex 的状态和逻辑按照模块进行划分，方便管理和维护。

6. **注意命名冲突**：当状态和操作较多时，要注意避免命名冲突。可以通过使用命名空间来组织状态和操作，或者在命名时添加模块前缀来避免冲突。

7. **应用较小的场景**：对于较小的应用或者状态管理需求较低的情况，可能不需要引入 Vuex。可以通过 Props 和 Events 等 Vue.js 的核心特性来进行组件间的状态传递和通信。

以上是在使用 Vuex 时需要注意的几点事项，遵循这些注意事项可以帮助我们更好地使用和管理应用的状态，提高开发效率并保持代码的可维护性。

## 结语

在本篇文章中，我们简单介绍了 Vuex 的基础知识、使用场景以及其优缺点。Vuex 作为 Vue.js 的官方状态管理库，可以帮助开发者更好地管理和共享应用的状态数据，提高开发效率和代码质量。

通过使用 Vuex，我们可以集中管理应用的状态，实现多个组件之间的状态共享，避免了手动传递和同步数据的麻烦。同时，通过采用 Vue 的响应式机制，Vuex 实现了状态的自动更新，使得状态变化和组件的重新染过程更加高效和简洁。

然而，使用 Vuex 也会有一些学习成本，并且在小型应用或状态管理需求不高的情况下引入 Vuex 可能会过于繁琐。因此，在项目开发前需要对项目需求和规模进行评估，选择是否使用 Vuex。

总之，通过合理使用 Vuex，我们可以更好地管理应用的状态，将代码逻辑与数据分离，提高开发效率和代码重用性。如果你正在进行 Vue.js 项目开发，我相信 Vuex 会是一个值得考虑的选择！

## 参考资料

- [Vuex 3.x 官方文档](https://v3.vuex.vuejs.org/zh/)
- [Vue 2 官方文档](https://v2.cn.vuejs.org/)

<ArticleFooter link="https://juejin.cn/post/7282759923343523881" />
