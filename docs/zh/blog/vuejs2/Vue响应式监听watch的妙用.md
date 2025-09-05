---
title: Vue 响应式监听 watch 的妙用：深入解析应用场景与最佳实践
---

# Vue 响应式监听 watch 的妙用：深入解析应用场景与最佳实践

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f737aa66c87e496f8d97b9c05ca37c10~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=747&h=345&s=134382&e=png&b=fef6f5)

## 一. 前言

上一篇文章我们学习了 `watch` 的基础知识，了解了它的基本使用方法及注意事项，本篇文章我们继续了解在 Vue 中 响应式监听 watch 的妙用。

通过了解，我们知道了 `watch` 是 Vue 中的是一个强大的功能，可以让我们监听数据的变化并在变化发生时执行相应的操作。在开发 Vue 应用过程中，`watch`可以帮助我们处理许多实际的应用场景，并实现最佳实践。

在本文中，我们将会深入探讨`watch`的实际使用场景，并总结最佳实践，以下的场景都是我在实际项目中能够总结的经常使用的，包括但不限于以下内容：

1. 表单验证：用来监听表单输入框的变化，并对输入的内容进行验证。

2. 异步操作：用于监听数据的变化，并触发相应的异步操作，比如网络请求等。

3. 联动操作：监听数据的变化，并在变化时执行相应的联动操作。

4. 计算属性与`watch`的结合使用：比较`watch`和计算属性的区别，以及它们在不同场景下的应用和最佳实践。

5. 同步多个`watch`：处理多个`watch`同时触发的情况，并提供一些同步多个`watch`的最佳实践建议。

6. 监听路由参数：使用`watch`来监听 Vue 路由参数的变化，并根据参数的变化来更新组件的状态或执行相应的操作。

通过详细了解实际使用场景和最佳实践，可以帮助我们更好地理解和运用 Vue 的`watch`功能，从而提高 Vue 应用的编码灵活性。

## 二. `watch` 的实际应用场景

### 1. 表单验证

Vue 的`watch`选项在表单验证中有广泛的应用。通过监听表单字段的变化，可以实时检查用户的输入并进行验证。下面是一个简单的示例，展示了如何使用`watch`实现表单验证：

```html
<template>
  <div>
    <input v-model="username" placeholder="请输入用户名" />
    <p v-if="usernameError" class="error">用户名不能为空</p>

    <input v-model="password" type="password" placeholder="请输入密码" />
    <p v-if="passwordError" class="error">密码不能为空</p>

    <button @click="submitForm" :disabled="isInvalid">提交</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        usernameError: false,
        passwordError: false
      }
    },
    watch: {
      username(value) {
        this.validateUsername(value)
      },
      password(value) {
        this.validatePassword(value)
      }
    },
    methods: {
      validateUsername(username) {
        this.usernameError = username.length === 0
      },
      validatePassword(password) {
        this.passwordError = password.length === 0
      },
      submitForm() {
        if (!this.isInvalid) {
          // 验证通过，提交表单
          // ...
        }
      }
    },
    computed: {
      isInvalid() {
        return this.usernameError || this.passwordError
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
</style>
```

在上述示例中，我们使用了两个`watch`来监听`username`和`password`字段的变化。当用户输入用户名时，会触发`username`字段的`watch`回调函数，并调用`validateUsername`方法进行验证。同理，当用户输入密码时，会触发`password`字段的`watch`回调函数，并调用`validatePassword`方法进行验证。通过设置`usernameError`和`passwordError`变量来控制错误提示的显示。

在`submitForm`方法中，我们通过`isInvalid`计算属性来判断表单是否通过验证。只有当`isInvalid`的值为`false`时，才允许提交表单。

这样，每当用户输入用户名或密码时，`watch`会自动调用相应的验证方法，实时检查用户的输入。当用户名或密码为空时，会显示相应的错误提示，如果表单通过了验证，提交按钮就可以点击。

这个示例只是表单验证中的一种简单情况，实际应用中可能会涉及更复杂的验证逻辑。通过使用`watch`选项，我们可以根据具体需求来构建强大的表单验证功能。

### 2. 异步操作

Vue 的`watch`属性可以用于监听数据的变化，并触发相应的异步操作。以下是一个简单的 Vue 异步操作的代码示例：

```html
<template>
  <div>
    <input v-model="inputValue" placeholder="请输入内容" />
    <div v-if="loading">加载中...</div>
    <div v-else>{{ result }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputValue: '',
        loading: false,
        result: ''
      }
    },
    watch: {
      inputValue(newInputValue) {
        this.loading = true

        // 模拟异步操作，比如发送请求
        setTimeout(() => {
          // 异步操作完成后更新数据
          this.loading = false
          this.result = this.processData(newInputValue)
        }, 2000)
      }
    },
    methods: {
      processData(input) {
        // 这里可以进行对输入数据的处理
        return '处理后的结果: ' + input
      }
    }
  }
</script>
```

在上述代码示例中，我们使用`v-model`指令将输入框的值与 Vue 实例的`inputValue`属性进行绑定。然后，通过`watch`属性监听`inputValue`的变化，并在变化时触发异步操作。

在`watch`的回调函数中，我们首先将`loading`设置为`true`以显示加载中的提示信息。然后，我们模拟了一个异步操作，比如发送请求。在异步操作完成后，我们将`loading`设置为`false`，并更新`result`的值，这个值会根据异步操作的结果而改变。

在这个示例中，我们模拟了一个 2 秒钟的异步操作，处理了输入的数据，并将处理后的结果赋给`result`。在异步操作进行中，用户会看到"**加载中...**"的提示信息，当异步操作完成后，会显示处理后的结果。

通过以上的代码示例，我们可以看到 Vue 的`watch`属性在异步操作中的实际应用。它可以方便我们监听数据的变化，并在变化发生后执行异步操作，从而实现了异步操作的控制与处理。

### 3. 联动操作

Vue 的`watch`属性可以用于监听数据的变化，并在变化时执行相应的联动操作。以下是一个简单的 Vue 联动操作的代码示例：

```html
<template>
  <div>
    <input v-model="inputValue" placeholder="请输入内容" />
    <div>
      <h3>输入内容的长度：</h3>
      <p>{{ inputLength }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputValue: '',
        inputLength: 0
      }
    },
    watch: {
      inputValue(newInputValue) {
        // 在输入值变化时更新输入内容的长度
        this.inputLength = newInputValue.length
      }
    }
  }
</script>
```

在这个代码示例中，我们使用`v-model`指令将输入框的值与 Vue 实例的`inputValue`属性进行双向绑定。然后，通过`watch`属性监听`inputValue`的变化，在变化时更新`inputLength`的值。

在`watch`的回调函数中，我们将输入值的新值作为参数（`newInputValue`）传入，并根据新值的长度更新`inputLength`的值。

在这个示例中，每当用户在输入框中输入内容时，`watch`会监听到`inputValue`的变化，并更新`inputLength`的值，以反映输入内容的长度。

通过以上的代码示例，我们可以看到 Vue 的`watch`属性在联动操作中的实际应用。它可以方便地监听数据的变化，并执行相应的操作，用于实现多个数据之间的联动效果。例如，在这个示例中，我们实现了输入内容长度与输入值之间的联动，保持了它们的同步更新。

### 4. 同步多个监听

在 Vue 中，可以使用`watch`来监听多个数据的变化并进行相应的处理。这种情况下，我们通常称之为同步多个`watch`。

有一个常见场景是表单联动，当表单中的多个字段之间存在关联关系时，可以使用多个`watch`来实现表单的联动效果。例如，当选择某个选项时，其他选项的可选项列表会相应改变。

```html
<template>
  <div>
    <select-model="selectedCategory">
      <option value="fruit">水果</option>
      <option value="vegetable">蔬菜</option>
    </select>
    <select v-model="selectedItem">
      <option v-for="item in items" :key="item.id">{{ item.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: null,
      selectedItem: null,
      items: []
    };
  },
  watch: {
    selectedCategory(newCategory) {
      // 根据选定的类别获取对应的选项列表
      this.items = this.fetchItemsByCategory(newCategory);
      // 重置选中的选项
      this.selectedItem = null;
    },
    selectedItem(newItem) {
      // 处理选中的选项
      this.handleSelectedItem(newItem);
    }
  },
  methods: {
    fetchItemsByCategory(category) {
      // 根据类别获取对应的选项列表
      // 在实际项目中，请替换为真正的异步请求
      // 返回选项列表
      return [];
    },
    handleSelectedItem(item) {
      // 处理选中的选项
      // ...
    }
  }
};
</script>
```

在上述示例中，我们使用了两个`watch`来监听`selectedCategory`和`selectedItem`两个数据的变化。当选择的类别`Category`改变时，第一个`watch`会重新获取对应类别的选项列表，并重置`selectedItem`为 null。而当选中的选项`selectedItem`改变时，第二个`watch`会执行相应的逻辑处理。

### 5. 动态路由的处理

Vue 的`watch`属性在处理动态路由方面也有实际应用场景。比如：路由发生变化时，`watch`会监听到`$route`的变化，并执行相应的操作，主要用于处理新的路由信息。以下是一个简单的 Vue 动态路由处理的代码示例：

```html
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    watch: {
      $route(newRoute, oldRoute) {
        // 在路由变化时执行相应的操作
        console.log('路由变化:', newRoute, oldRoute)
        // 根据新的路由信息执行其他逻辑
        this.handleRouteChange(newRoute)
      }
    },
    methods: {
      handleRouteChange(route) {
        // 根据路由信息进行处理
        // 此处仅打印新的路由路径作为示例
        console.log('新的路由路径:', route.path)
      }
    }
  }
</script>
```

在这个代码示例中，我们有一个基本的 Vue 组件，使用了 Vue Router 进行路由管理。我们通过`<router-view>`标签来渲染当前的路由组件。

通过`watch`属性，我们可以监听 Vue Router 中的`$route`对象，它包含了当前路由的信息。在`$route`对象发生变化时，`watch`回调函数会被触发。

在这个示例中，我们监听了`$route`，并在路由变化时执行相应的操作。在回调函数中，我们可以获取到新的路由信息（`newRoute`）和旧的路由信息（`oldRoute`），并可以根据路由信息执行其他逻辑。

在`handleRouteChange`方法中，我们根据路由信息进行处理。在这个示例中，我们简单地使用`console.log`来打印新的路由路径。

每当路由发生变化时，`watch`会监听到`$route`的变化，并执行相应的操作，比如处理新的路由信息。

通过以上的代码示例，我们可以看到 Vue 的`watch`属性在动态路由处理方面的实际应用。它可以方便地监听路由的变化，并执行相应的操作，用于处理动态路由相关的逻辑。

## 三. `watch` 的最佳实践

Vue 的`watch`是一个非常有用的功能，它提供了对 Vue 实例的属性或者表达式的侦听器。这个侦听器会在属性或者表达式的值发生变化时触发相应的回调函数。

以下是一些 Vue 中使用`watch`的最佳实践：

### 1. 减少回调函数中的复杂逻辑

回调函数应该尽量简洁，遵循单一责任原则。如果需要处理复杂的逻辑，可以将逻辑拆分为单独的方法，然后在回调函数中调用这些方法。

### 2. 合理使用深度监听

默认情况下，`watch`是浅监听的，只能监听到对象的引用变化。如果需要监听对象内部的属性变化，可以通过`deep`选项进行深度监听。

```javascript
watch: {
  obj: {
    handler(newVal, oldVal) {
      // 对象内部属性的变化
    },
    deep: true
  }
}
```

`watch`选项虽然提供了深度监听的功能，可以跟踪嵌套对象或数组的变化。但在使用深度监听时，需要注意以下几点：

- **性能问题**：深度监听会在对象或数组的每个级别都进行递归遍历，因此在嵌套层级较深、数据量较大的情况下，可能会带来性能问题。

- **深度监听和计算属性**：深度监听和计算属性之间存在一些互相影响的问题。由于深度监听会触发对象或数组的所有变化，可能导致计算属性的计算次数过多，从而影响性能。在使用深度监听时，要特别关注计算属性的计算逻辑，以避免不必要的计算。

- **对象和数组的变化检测**：Vue 的响应式系统可以检测到对象或数组的变化，并触发相应的更新。但对于某些特定情况，如直接使用通过索引直接修改数组元素、直接用下标设置对象属性等，Vue 可能无法检测到变化。

- **引用类型数据的变化**：深度监听只能监听引用类型的变化，无法检测到引用类型数据内部属性的变化。例如，对于对象的属性值的变化，Vue 会自动进行侦测和响应。但如果仅修改了属性值，而未修改整个对象的引用，深度监听将无法触发。

深度监听是一种强大的功能，可以用于监听嵌套对象或数组的变化，但在使用时需要注意性能、计算属性、变化检测和引用类型数据的影响。根据具体的场景和需求，灵活地选择使用深度监听或其他替代方案。

### 3. 避免循环依赖

`watch`中的依赖关系是自动解析的，但是要注意避免出现循环依赖的情况。当在 `watch` 选项中监听属性时，如果在回调函数中修改了被监听的属性，可能会导致循环引用的问题。为了避免这种问题，可以在修改属性前检查新旧值是否相等，或者使用 Vue 的`this.$nextTick()`来推迟执行。

### 4. 使用`immediate`选项

`immediate`选项可以在组件加载时立即执行回调函数一次。这常用于初始化数据或者处理一些需要立即执行的操作。

```javascript
watch: {
  foo: {
    handler(newVal, oldVal) {
      // 回调函数
    },
    immediate: true
  }
}
```

### 5. 使用 `watch` 配合 `computed`

`computed`属性可以根据数据的变化自动更新计算结果，而`watch`可以用于监听数据的变化并执行相应的副作用操作。可以结合使用这两个功能来实现更复杂的逻辑。

```javascript
watch: {
  fullName: {
    handler(newVal, oldVal) {
      // 监听computed属性fullName的变化
    },
    immediate: true
  }
},
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
```

### 6. 合理使用`watch`

`watch` 选项可以用于在数据变化时执行一些复杂的逻辑操作，但过度使用 `watch` 可能会导致性能问题。在不必要的情况下，可以尝试使用计算属性来替代 `watch`。只在需要监听特定数据变化时使用 `watch`。

因此，虽然 `watch`虽然是一个强大的功能，但是在不必要的情况下，应该尽量避免过多的使用。因为每个`watch`都需要消耗一些性能，当`watch`过多或者逻辑复杂时，可能会导致性能下降。优先考虑使用`computed`属性来处理需求。

### 7. 注意异步更新的情况

在 Vue 中，`watch`选项默认是同步的，即在侦听到数据变化后立即触发回调函数。但有时候我们需要在`watch`中进行异步操作，例如发送网络请求或执行定时任务等。下面介两种实现异步更新的方法：

- 使用`nextTick`方法：可以在`watch`回调函数中使用`$nextTick`方法，将操作放入下一次 DOM 更新循环中执行，从而实现异步更新。

```js
watch: {
  username(newValue) {
    this.$nextTick(() => {
      // 异步操作
      // ...
    });
  }
}
```

`this.$nextTick`方法接受一个回调函数作为参数，并在下一次 DOM 更新循环中执行该回调函数。这样就可以将需要异步执行的操作放在回调函数内部。

- 使用`setTimeout`方法：可以在`watch`调函数中使用`setTimeout`方法来延迟执行代码，实现异步更新。

```js
watch: {
  username(newValue) {
    setTimeout(() => {
      // 异步操作
      // ...
    }, 0);
  }
}
```

通过将代码放入`setTimeout`回调函数内部，可以以 0 毫秒的延迟将代码放入事件队列中从而实现异步执行。

> 注意：使用异步更新会使得代码的执行顺序发生变化，可能会导致一些意想不到的问题。确保在异步操作中正确处理所有依赖关系和数据同步，避免出现竞争条件或数据不一致的情况。

另外，对于复杂的异步操作，推荐使用`Promise`、`async/await`等异步编程的方式，以便更好地管理和处理异步逻辑。

总结：虽然`watch`默认是同步的，但可以通过`$nextTick`和`setTimeout`等方式实现异步更新。根据具体需求选择适合的方式来处理异步操作，确保代码的正确性和可维护性。

综上所述，合理使用 Vue 的 `watch` 选项可以方便地监听数据变化并执行相应的操作。但需要注意避免过度使用、处理循环引用和使用相应的选项来适应不同的需求。

通过遵循以上的最佳实践，可以更好地应用 Vue 的`watch`功能，提高代码的可读性、可维护性，同时避免潜在的性能问题。

## 四. 总结

在本篇文章中，我们详细探讨了 Vue 的`watch`功能的实际使用场景和最佳实践。了解和熟练运用 `watch` 可以帮助我们更好地处理数据变化和执行相应的操作，提高 Vue 应用的质量和效率。

在使用`watch`时，我们应该根据具体的需求和场景进行设计和实践，合理选择选项和处理方式。同时，我们了解到异步处理、与计算属性配合使用以及监听路由参数的方法和技巧。

通过遵循最佳实践，我们可以编写更具可读性、可维护性和性能的代码。在实际开发中，不断学习和掌握 `watch` 功能的用法，加深对 Vue 的理解，将有助于我们构建出更优雅、高效的 Vue 应用。

<ArticleFooter link="https://juejin.cn/post/7293780925195403290" />
