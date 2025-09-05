---
title: Vuex 进阶知识：如何优雅的进行 Vue 的状态管理
---

# Vuex 进阶知识：如何优雅的进行 Vue 的状态管理

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e19bc05cb36485488ec181d9212ae82~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=856&h=375&s=259196&e=png&b=fffafa)

## 引言

随着项目的发展和复杂性的增加，对 Vuex 进行更深入的了解和使用就变得非常重要。本篇文章将带您探索 Vuex 的进阶使用，包括模块化、命名空间、getter 的高级用法等。

在进阶使用 Vuex 之前，想要了解 Vuex 相关的基础知识，请先阅读之前文章：

[Vuex 入门与实战：了解 Vue 状态管理的核心概念](https://juejin.cn/post/7282759923343523881)

本篇文章将重点介绍以下几个进阶使用方面：

1. **辅助函数**：简化在 Vue 组件中使用 Vuex 的操作而提供的一组工具函数。
2. **计算属性**：使用 getters 封装复杂逻辑，使组件逻辑更清晰。
3. **命名空间**：详解命名空间的作用和用法，避免模块之间的命名冲突。
4. **模块化**：将 Vuex 的状态逻辑拆分成多个模块，并实现模块间的通信和协作。

通过学习本篇文章，你将进一步掌握 Vuex 的进阶用法，提升对 Vuex 的理解和运用能力，更加优雅的组织你的状态管理树！

## 一. 使用 Vuex 辅助函数

Vuex 辅助函数是为了简化在 Vue 组件中使用 Vuex 的操作而提供的一组工具函数。使用辅助函数可以简化对 state、getters、mutations 和 actions 的访问，减少了冗余的代码和复杂的语法。

下面是常见的 Vuex 辅助函数：

- **mapState**：简化状态映射
- **mapGetters**：简化 getters 映射
- **mapMutations**：简化 mutations 映射
- **mapActions**：简化 actions 映射

### 1. mapState

`mapState`函数用于将 store 中的 state 映射到组件的计算属性中，或者直接访问这些 state 属性。它接受一个数组或对象作为参数，用于指定要映射的 state 属性名。

示例：

```javascript
import { mapState } from 'vuex'
export default {
  computed {
    ...mapState(['count'])
  },
  mounted () {
    console.log(this.count)
  },
}
```

`count` 对应的是 Vuex store 中的 state 属性，通过使用`mapState`函数，将`count`属性映射到了组件的计算属性中，可以使用 `this` 实例直接获取到

### 2. mapGetters

`mapGetters`函数用于将 store 中的 getters 映射到组件的计算属性中，或者直接访问这些 getters。它接受一个数组或对象作为参数，用于指定要映射的 getters 函数名。

示例：

```javascript
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['count'])
  }
}
```

`count` 对应的是 Vuex store 中的 getter 函数，通过使用`mapGetters`函数，将`count`函数映射到了组件的计算属性中。

### 3. mapMutations

`mapMutations` 函数用于将 store 中的 mutations 映射到组件的方法中，以便组件可以直接调用`commit`来触发 mutations。它接受一个数组或对象作为参数，用于指定要映射的 mutations 函数名。

示例：

```javascript
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['increment'])
  }
}
```

`increment` 对应的是 Vuex store 中的 mutation 函数，通过使用`mapMutations`函数，将`increment`函数映射到了组件的方法中。

### 4. mapActions

`mapActions`函数用于将 store 中的 actions 映射到组件的方法中，以便组件可以直接调用`dispatch`来触发 actions。它接受一个数组或对象作为参数，用于指定要映射的 actions 函数名。

示例：

```javascript
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['incrementAsync'])
  }
}
```

`incrementAsync`对应的是 Vuex store 中的 action 函数，通过使用`mapActions`函数，我们将`incrementAsync`函数映射到了组件的方法中。

> Vuex 辅助函数的使用可以简化在组件中对 Vuex 的调用和使用，使代码更加简洁和可读。通过使用这些辅助函数，我们可以更方便地访问和操作 store 中的 state、getters、mutations 和 actions。

## 二. 使用 getters 计算属性

### 1. getters 的作用

在 Vuex 中，getters 是用于获取状态的计算属性，类似于组件中的计算属性。它们可以对 Vuex 中的状态进行处理、筛选或组合，并以一种响应式的方式提供新的派生状态。

getters 的作用是从 store 中获取数据，并以一种经过处理的形式进行展示或使用。在组件中使用 getters 可以方便地获取所需的状态，而不需要在组件内部重复编写逻辑。

### 2. getters 的使用步骤

**定义 getters**

在 Vuex 的模块配置中，可以使用 `getters` 字段定义 getters。

```javascript
const store = new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: {
    computedState: state => {
      // 处理 state 并返回派生状态的计算属性
      return state.someData + 10
    },
    filteredData: state => {
      // 根据条件筛选 state 中的数据并返回派生状态
      return state.data.filter(item => item.condition === true)
    }
  }
})
```

以上我们定义了两个 getters，分别是 `computedState` 和 `filteredData`。

**使用 getters**

在组件中可以使用 `mapGetters` 辅助函数或使用 `$store.getters` 来访问 getters 的值。

```javascript
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['computedState', 'filteredData'])
  },
  mounted() {
    console.log(this.computedState) // 输出经过处理的状态值
    console.log(this.filteredData) // 输出经过筛选的数据数组
    console.log(this.$store.getters.computedState) // 通过 $store.getters 访问
  }
}
```

在上面的代码中，我们使用 `mapGetters` 辅助函数将 getters 映射到组件的计算属性中，然后可以在组件中直接使用。

### 3. getters 的优势

Vuex 的 getters 在状态管理中具有以下几个优势：

1. **统一管理计算属性**：有时需要根据一些状态值进行一些复杂的计算，例如对状态进行过滤、组合、转换等操作，而 getters 可以让我们统一管理这些计算属性。通过将计算逻辑放在 getters 中，可以使代码更具可维护性和可读性。

2. **响应式更新**：Vuex 的 getters 是响应式的，当所依赖的状态发生变化时，getters 会自动重新计算。这意味着当 getters 所依赖的状态发生变化时，相关组件也会自动更新。这样可以避免手动监听状态的变化或手动触发计算属性的更新。

3. **避免重复计算**：Vuex 对 getters 进行了缓存优化。只有在 getters 所依赖的状态发生变化时，getters 才会重新计算。这样可以避免不必要的计算开销。而且，如果 getters 的值没有发生变化，多次访问它将会直接从缓存中读取。这在某些情况下可以提升性能。

4. **封装复杂逻辑**：有时候，某些状态间的处理逻辑可能比较复杂，涉及多个模块或多个状态之间的交互。通过使用 getters，可以将这些复杂逻辑封装到一个单独的地方，使组件逻辑更清晰，减少代码的冗余和重复。

> Vuex 的 getters 在状态管理中起到了统一管理计算属性、实现响应式更新、避免重复计算、封装复杂逻辑、提高可复用性和可测试性的作用。它们为开发者提供了一种方便且强大的方式来处理和展示状态，使得应用程序的状态管理更加简洁、可维护和高效。

## 三. 命名空间

### 1. 什么是命名空间

在 Vuex 中，命名空间（namespaces）是一种组织和隔离模块的方式，用于避免模块之间的命名冲突。

命名空间为每个模块提供了一个层级根，使得模块的状态、行为、和 getter 可以通过命名空间进行访问。这样，就可以在模块的路径前加上命名空间前缀，来确保模块的所有内容是唯一且不会与其他模块产生冲突。

### 2. 如何使用命名空间

1. 定义命名空间：

在模块中，可以通过在模块配置中设置 `namespaced: true` 来定义命名空间。例如：

```javascript
const store = new Vuex.Store({
  modules: {
    myModule: {
      namespaced: true,
      state: { ... },
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }
  }
})
```

以上代码是我们将名为 `myModule` 的模块设置为命名空间模块。

2. 使用命名空间：

使用命名空间时，可以通过在访问模块的内容之前添加命名空间前缀来引用模块的状态、行为和 getter。例如：

```javascript
// 访问命名空间模块的状态
store.state.myModule.stateName

// 调用命名空间模块的 mutation
store.commit('myModule/mutationName', payload)

// 调用命名空间模块的 action
store.dispatch('myModule/actionName', payload)

// 获取命名空间块的 getter
store.getters['myModule/getterName']
```

如上所示，我们使用命名空间前缀 `myModule/` 来访问和调用模块的状态、行为和 getter。

> 命名空间的使用使得模块之间的关系更为清晰，并可以避免命名冲突。但是**请注意**：在使用命名空间时需要小心，确保正确地引用和调用模块的内容。

## 四. 模块化管理

### 1. 模块化组织结构

在 Vuex 中，可以使用模块化的组织结构来管理大型的状态管理。模块化能够将整个应用的状态分割为多个小模块，每个模块都有自己的 state、mutations、getters 和 actions。

以下是 Vuex 中最简单模块化组织结构：

```
├── index.html
├── main.js
├── components // 组件
└── store
    ├── index.js         # 组装模块并导出 store 的主文件
    └── modules
        ├── moduleA.js   # moduleA 模块
        └── moduleB.js   # moduleB 模块
```

**（1）定义 moduleA 模块**

```javascript
// 创建一个模块A
const moduleA = {
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
}

export default moduleA
```

**（2）定义 moduleB 模块**

```js
// 创建一个模块B
const moduleB = {
  state: {
    name: 'John'
  },
  mutations: {
    changeName(state, newName) {
      state.name = newName
    }
  }
}
export default moduleB
```

**（3）引入所用模块，并创建 Vuex 实例**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from 'moduleA'
import moduleB from 'moduleB'

Vue.use(Vuex)

// 创建Vuex实例
const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  }
})

export default store
```

上述示例中，我们定义了两个模块：moduleA 和 moduleB。每个模块有自己的 state、mutations、actions 和 getters。在创建 Vuex 实例时，将这些模块对象放入`modules`选项中。

在组件中使用模块化的状态时，可以通过辅助函数`mapState`、`mapMutations`、`mapActions`和`mapGetters`来简化使用：

```javascript
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('moduleA', {
      countA: 'count'
    }),
    ...mapState('moduleB', {
      nameB: 'name'
    }),
    ...mapGetters('moduleA', ['doubleCount'])
  },
  methods: {
    ...mapMutations('moduleA', ['increment']),
    ...mapActions('moduleA', ['incrementAsync']),
    ...mapMutations('moduleB', ['changeName'])
  }
}
```

在上述示例中，通过指定模块名，我们可以将模块中的状态和操作映射到组件的计算属性和方法中。通过`mapState`可以将模块 A 中的`count`映射为`countA`计算属性，通过`Mutations`和`mapActions`可以将模块 A 中的`increment`和`incrementAsync`映射为组件的方法。

通过模块化组织结构，可以更好地管理和维护大型应用的状态，使得状态结构更加清晰和可维护。模块化还可以方便地复用模块，将模块拆分为多个文件进行管理，提高开发效率。

> 注意：在模块内部的 mutations 和 getters 中，可以使用`rootState`和`rootGetters`参数来访问根模块中的状态和 getters。例如，在 moduleA 的 mutations 中可以使用`rootState.moduleB.name`来获取 moduleB 中的 name 状态。

### 2. 使用模块化的优势

1. **代码分离和组织**：将 Vuex 的状态逻辑分割成多个模块，可以更好地组织代码，提高代码的可维护性和可读性。每个模块都有自己的状态、操作和获取器，使得代码更加清晰和可扩展。

2. **避免命名冲突**：使用模块化可以避免全局状态中的命名冲突问题。每个模块都有己的命名空间防止了不同模块之间的命名冲突，提高了代码的健壮性和稳定性。

3. **提高可复用性**：模块化的设计使得模块可以在不同的应用程序中被复用。可以将通用的状态模块封装成独立的模块，然后在不同的应用程序中引入并使用。

4. **模块独立调试**：每个模块都可以独立进行状态的修改和操作，方便调试。通过模块化，可以更加精确地定位到问题所在，快速解决 bug。

### 3. 什么情况下需要使用模块化

1. **大型应用程序**：对于大型的 Vue.js 应用程序，使用模块化可以更好地组织和管理状态。不同模块可以分别负责处理不同的业务逻辑，使得代码更清晰。

2. **多人协作开发**：在多人协作开发的项目中，使用模块化可以更好地分工合作。每个开发者可以负责一个或多个模块的开发和维护，减少了代码冲突和影响范围，提高了开发效率。

3. **复杂的业务逻辑**：对于复杂的业务逻辑，使用模块化可以将其拆分成多个独立的模块，使得代码更易于理解和维护。每个模块负责处理各自的逻辑，减少了耦合度。

4. **可复用的模块**：如果有一些通用的状态逻辑需要在不同的应用程序中复用，可以将其封装成独立的模块。这样可以避免重复编写代码，提高了开发效率和代码的可维护性。

> Vuex 的模块化设计使得代码更加清晰、可维护性更高，并且有利于多人协作开发和复用状态逻辑。在大型应用程序或者需要拆分复杂业务逻辑的情况下，使用模块化可以带来诸多好处。

## 结语

在本篇文章中，我们介绍了 Vuex 的进阶使用，包括模块化、命名空间以及高级选项等方面。通过这些进阶技巧，我们可以更好地组织和管理 Vuex 的状态管理。

模块化是 Vuex 中非常重要的一个特性，通过将状态拆分为多个模块，我们可以更好地管理复杂的应用程序状态。从而更灵活地扩展和配置我们的状态管理。命名空间则可以帮助我们解决模块之间的命名冲突问题，并提供更清晰的语义。

通过掌握这些进阶技巧，我们可以更好地应对复杂的状态管理需求，并提高应用程序的可维护性和开发效率。

<ArticleFooter link="https://juejin.cn/post/7283314026342350859" />
