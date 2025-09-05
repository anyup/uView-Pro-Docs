---
title: Vue 自定义指令实战：掌握高级前端开发技巧
---

# Vue 自定义指令实战：掌握高级前端开发技巧

## 引言

Vue 自定义指令是 Vue.js 框架中强大而灵活的功能之一，它允许开发者根据具体需求创建自定义的指令，以实现更加精细化的交互和数据绑定效果。本文将带你深入探索 Vue 自定义指令的使用方法、原理和实战，为你打开前端开发的新视野。

我们前面几篇文章已经简单介绍了自定义指令的基础，主要介绍指令的概念和常见的内置指令，帮助你理解指令的作用和使用方法：

本篇文章，我们将深入剖析自定义指令的实现原理，探讨指令的生命周期钩子和参数选项，为你解锁更高级的自定义指令技巧。

通过本篇文章的学习，你将学习到如何创建简单的自定义指令，如何与`DOM`元素进行交互，以及如何利用指令实现自己想要的效果。我们还将分享一些实用的案例和技巧，帮助你在实际项目中更好地应用自定义指令。

无论你是初学者还是有一定经验的开发者，都能从本文中获得实用的知识和技巧。让我们一起探索 Vue 自定义指令的奥秘，提升我们的前端开发技能吧！

## 一. 概述

Vue 自定义指令是 `Vue.js` 框架提供的一项强大功能，它允许开发者根据自己的需求，定义全局或局部指令，以便在 `DOM` 元素上添加特定的行为和功能。

自定义指令的主要作用是扩展 `Vue.js` 框架的能力，以满足特定的业务需求。通过自定义指令，我们可以在不更改组件逻辑的情况下，直接操作 `DOM` 元素，并与 `DOM` 元素进行交互。

自定义指令具有广泛的用途和许多优势，通过自定义指令，可以实现更丰富的交互和功能，可以操作 `DOM`、**实现数据绑定和交互**、**进行表单验证**、**集成第三方库**等，从而**优化代码**、**提高复性**，并**解耦视图和逻辑**。

## 二. 基本语法

Vue 自定义指令包括两种方式，**全局注册**和**局部注册**两种方式：

**全局注册自定义指令：**

```js
Vue.directive('directiveName', {
  // Directive options
})
```

**局部注册自定义指令：**

```js
directives: {
  directiveName: {
    // Directive options
  }
}
```

在上述两种注册方式中，`directiveName` 是自定义指令的名称，可以自定义命名。

下面是一个简单的例子，展示了一个简单的自定义指令，用于**改变元素的背景颜色**，提前目睹一下自定义指令的风采：

```js
Vue.directive('bg-color', {
  bind: function (el, binding) {
    el.style.backgroundColor = binding.value
  }
})
```

使用自定义指令：

```html
<div v-bg-color="'red'">Custom directive</div>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32c0239ce5f84f03bcf9b75bb93816d4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1074&h=346&s=17001&e=png&b=ffffff)

上述示例中，`v-bg-color`是自定义指令的使用方式，并通过`binding.value`获取到绑定值，然后将其应用于元素的背景颜色。

通过以上两种注册指令的语法结构，我们可以轻松自定义和使用指令，并根据需要执行相应的 `DOM` 操作。接下来我们会对自定义指令的生命周期钩子函数进行详细的解读。

## 三. 生命周期

**钩子函数**

Vue 自定义指令在使用时可以调用一些特定的生命周期钩子函数，用于在不同的阶段执行相应的操作。以下是 Vue 自定义指令的生命周期钩子函数的顺序：

1. `bind`：当指令第一次绑定到元素时调用在这个阶段可以进行一些初始化的设置，比如绑定事件监听器或进行一次性的 `DOM` 操作。

2. `inserted`：在指令所在的元素被插入到父元素时调用。如果指令所在的元素是父元素的唯一子节点，那么它将在父元素进行 `DOM` 插入操作之后立即调用。

3. `update`：在指令所在组件的 `VNode` 更新时调用，但可能会在子组件的 `VNode` 更新之前触发。可以在这个阶段根据需要更新绑定元素的属性或执行其他操作。

4. `componentUpdated`：在指令所在组件的 `VNode` 及其子组件的 `VNode` 均进行了更新后调用。

5. `unbind`：在指令从元素上解绑时调用。在这个阶段可以进行一些清理工作，比如解绑事件监听器或删除 `DOM` 操作。

需要注意的是，`inserted` 和 `update` 钩子函数的调用顺序可能会在 Vue 的更新周期中会有所不同如果需要处理执行顺序相关的逻辑，可以根据具体需求选择合适的钩子函数进行操作。

以前面的演示示例为例`v-bg-color`，我们升级一下逻辑，以便于我们更好的观察一下指令的生命周期执行顺序：

1. 元素初始的背景颜色为**红色**
2. 在**3 秒后**将背景颜色为**蓝色**

在此期间可以观察生命周期的钩子函数执行顺序，同时也可以看一下在自定义指令的生命周期的使用：

```js
Vue.directive('directiveName', {
  bind: function (el, binding) {
    // 指令绑定时的初始化操作
    el.style.backgroundColor = binding.value
    console.log('bind')
  },
  inserted: function (el, binding) {
    // 元素插入到父元素的操作
    console.log('inserted')
  },
  update: function (el, binding) {
    // 更新指令绑定元素的操作
    console.log('update')
    el.style.backgroundColor = binding.value
  },
  componentUpdated: function (el, binding) {
    // 组件及其子组件都更新后的操作
    console.log('componentUpdated')
  },
  unbind: function (el, binding) {
    // 解绑指令时的清理工作
    console.log('unbind')
  }
})
```

![0914-1.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0896ba0a439d427eab90190661da0b64~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=993&h=257&s=20236&e=gif&f=5&b=fefefe)
从日志输出的顺序来看：钩子函数的执行顺序为：`bind`、`inserted`，如果指令期间在更新的话执行`update`、`componentUpdated`进行更新，指令解绑时执行`unbind`，至此指令生命周期完结

通过自定义指令的生命周期钩子函数，你可以在不同的阶段执行相应的操作，以实现一些特定的指令功能和行为。这为你提供了更大的灵活性和控制权。

## 四. 自定义指令参数

在 Vue 中，自定义指令可以接收多个参数，这些参数可以根据需要来传递和使用。下面介绍一些常用的自定义指令参数：

1. `el`：指令所绑定的元素，可以通过操作`el`来直接改变元素的样式、属性等。

2. `binding`：一个对象，包含以下属性：

   - `value`：传递给指令的值，可以是一个绑定的表达式的结果，也可以是一个值。
   - `arg`：指令的参数，可以是一个静态值或是一个态绑定的表达式。
   - `modifiers`：一个包含修饰符的对象，用于递给指令的修饰符，可以通过`binding.modifiers`来获取。
   - `expression`：指令的表达式字符串。

3. `vnode`：Vue 编译生成的虚拟节点（VNode），可以访问和操作 VNode 的属性和方法。

4. `oldVnode`：上一个虚拟节点（仅在`update`和`componentUpdated`钩子函数中可用），可以用来比较新旧虚拟节点的差异。

5. `arg`：指的参数，与`binding.arg`相同，可以用来传递和接收静态值或动态绑定的表达式。

6. `modifiers`：用于传递给指令的修饰符，例如`v-directive.modifier1.modifier2`，可以`binding.modifiers`来获取。

在自定义指令的钩子函数中，可以通过函数的参数列表来接收这些参数，以便根据进行处理和使用。

以下是一个示例，展示了在定义指令时如何使用这些参数：

```js
Vue.directive('myDirective', {
  bind: function (el, binding, vnode, oldVnode) {
    // 指令绑定时的操作
    console.log(binding.value) // 打印传递给指令的值
    console.log(binding.arg) // 打印指令的参数
    console.log(binding.modifiers) // 打印指令的饰符

    el.style.color = 'red' // 改变绑定元素的颜色
  },
  update: function (el, binding, vnode, oldVnode) {
    // 指令更新时的操作
    console.log(binding.expression) // 打印指令的表达式字符串
    console.log(binding.oldValue) // 打印旧的绑定值

    el.style.fontSize = binding.value + 'px' // 根据递的值改变绑定元素的字体大小
    if (binding.modifiers.bold) {
      el.style.fontWeight = 'bold' // 如果有修饰符，则设置字体为粗体
    }
  }
})
```

通过传递和使用这些参数，你可以根据需要在自定义指令的钩子函数中进行相应的操作，实现不同的指令功能和行为。

## 五. 自定义指令实例

**示例：自定义一个限制输入只能是数字的指令**

要自定义一个限制输入只能是数字的指令，可以通过 Vue 自定义指令的`bind`和`update`生命周期钩子函数来实现。如下所示：

```js
Vue.directive('number-only', {
  bind: function (el) {
    el.addEventListener('input', function (event) {
      // 获取输入框的值
      let inputValue = event.target.value
      // 使用正则表达式判断输入是否为数字
      let formattedValue = inputValue.replace(/[^\d]/g, '')
      // 更新输入框的值
      event.target.value = formattedValue
    })
  },
  update: function (el) {
    // 在更新时绑定同样的事件处理程序
    el.addEventListener('input', function (event) {
      let inputValue = event.target.value
      let formattedValue = inputValue.replace(/[^\d]/g, '')
      event.target.value = formattedValue
    })
  }
})
```

在`bind`和`update`生命周期钩子函数中，我们通过`addEventListener`监听输入框的`input`事件，并在事件处理函数中进行处理。使用正则表达式`/[^\d]/g`可以将除之外的字符替换为空字符串，从而限制输入**只能是数字**。

使用自定义指令`v-number-only`可以将该指令应用到相应的输入框上：

```html
<input v-number-only type="text" />
```

这样，输入框中的文本将被限制为数字，非数字将被自动过滤掉。

![0914-1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6ff24c6e5e34ef89be5359d2437ac3e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=720&h=232&s=8892&e=gif&f=28&b=fdfdfd)

从演示的效果图中可以看出：输入框只能输入数字，如果输入其他的字符，输入框将没有任何显示。是由于我们在代码中会监听用户的输入，将不符合定义规范的字符串统一替换成了空字符串。

## 总结

Vue 自定义指令的核心知识点主要包括以下几个方面：

1. **注册指令**：使用`Vue.directive`方法注册指令，并提一个包含钩子函数的对象作为参数。可以全局注册指令，也可以在组件内部注册指令。

2. **钩子函数**：自定义指令可以使用的钩子函数包括`bind`、`inserted`、`update`、`componentUpdated`和`unbind`。这些钩子函数在指令的不同生命周期中执行相应的逻辑。

3. **参数传递**：可以使用指令的参数传递数据或选。使用`.`来指定参数，例如`v-my-direct:arg.modifier`。在钩子函数中，可以通过`binding`参数访问指令的参数。

4. **操作元素**：可以通过`el`参数访问指令绑定的元素，可以操作元素的属性、样式、class 等。

5. **绑定值**：可以通过`binding.value`来获取指令绑定的值，也可以通过`binding.oldValue`来获取之前绑定值。在钩子函数中，可以根据绑定值的变化执行相应的逻辑。

6. **更新元素**：在钩子函数中，可以通过`el`、`binding`和`node`等参数来更新元素的状态样式或属性。

7. **释放资源**：确保在指令解绑时释放相应资源，避免内存泄漏。在`unbind`钩子函数中，可以移除事件监听、定时器或其他可能导致资源泄漏的操作。

综上所述，掌握上述核心知识点能够帮助我们更好地理解和使用 Vue 自定义指令，实现各种自定义功能，增强我们的 Vue 应用的灵活性和可复用性。

<ArticleFooter link="https://juejin.cn/post/7279056679563870208" />
