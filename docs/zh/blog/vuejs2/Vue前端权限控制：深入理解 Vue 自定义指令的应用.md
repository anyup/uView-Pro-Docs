---
title: 实现细粒度的前端权限控制：深入理解 Vue 自定义指令的应用
---

# 实现细粒度的前端权限控制：深入理解 Vue 自定义指令的应用

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2af6fef1ad1743908889ee08ffa4ad2d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1280&h=540&s=135147&e=png&b=69c181)

## 一. 引言

Vue.js 提供了一种简单、灵活的方式来创建交互式的用户界面。在 Vue.js 中，指令是一种特殊的属性，可以附加到 HTML 元素上以执行一些操作。我们可以使用自定义指令来实现各种功能，比如：权限控制、自动聚焦、拖动指令等等。

权限控制是 Web 应用程序中的一个重要问题，尤其是**细粒度**的前端权限控制，比如不同的用户拥有不同的操作权限，确保只有经过身份验证的用户才能访问或操作受保护的资源。通过使用自定义指令，我们可以方便地实现权限控制功能。在本篇文章中，我们将介绍如何使用 Vue.js 实现自定义权限指令，并且利用它实现细粒度的前端权限控制。

本篇文章将涵盖以下问题：

- 什么是自定义指令
- 如何快速创建自定义指令
- 了解指令的生命周期
- 自定义指令的两种方式
- 如何在 Vue.js 中使用自定义指令实现权限控制

## 二. 什么是自定义指令

自定义指令是 Vue.js 框架提供的一项强大功能，它允许开发者根据自己的需求，定义全局或局部指令，以便在 DOM 元素上添加特定的行为和功能。自定义指令的主要作用是扩展 Vue.js 框架的能力，以满足特定的业务需求。

除了 Vue 内置的一系列指令 (比如 v-model 或 v-show) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)。

自定义指令可以用来操作 DOM，不仅可用于定义任何的 DOM 操作，并且是可复用的。

### 如何快速创建自定义指令

以定义一个最简单的自定义指令为例，需要执行以下步骤：

1. 定义一个具有 `bind` 和 `update` 函数的对象。
2. 在 Vue 实例或全局范围内使用 `Vue.directive()` 方法将指令注册为全局指令。
3. 在模板中使用自定义指令。

下面是一个简单的自定义指令示例：

```javascript
Vue.directive('focus', {
  bind: function (el) {
    el.focus()
  },
  update: function (el) {
    el.blur()
  }
})
```

在这个例子中，我们创建了一个名为 `focus` 的自定义指令。当元素被绑定时，它会调用 `focus()` 方法，使元素获得焦点。当元素被更新时，它会调用 `blur()` 方法，使元素失去焦点。

## 三. 自定义指令的两种类型

Vue 自定义指令可以分为全局指令和局部指令两种类型。全局自定义指令和局部自定义指令。全局自定义指令可以在整个应用程序中使用，而局部自定义指令只能在特定的 Vue 实例或组件中使用。

1. 全局指令：全局指令是在 Vue 实例化之前就被注册为全局可用的指令。通过在 Vue 实例化之前使用 Vue.directive() 方法全局注册指令。全局指令在任何组件中都可以使用，不需要显式地导入或声明。

示例：

```javascript
// 全局注册自定义指令
Vue.directive('custom', {
  bind(el, binding) {
    // 指令绑定时的逻辑
  }
  // ...
})
```

2. 局部指令：局部指令是在组件中局部定义和使用的指令。它只在定义了该指令的组件内部才可以使用。

示例：

```vue
<template>
  <div>
    <p v-custom>这是一个局部指令</p>
  </div>
</template>

<script>
export default {
  directives: {
    custom: {
      bind(el, binding) {
        // 指令绑定时的逻辑
      }
      // ...
    }
  }
}
</script>
```

在这个示例中，`v-custom` 是一个局部指令，只能在当前组件内部使用。它通过在组件的 `directives` 选项中注册指令，并提供相应的指令钩子函数，实现了局部指令的功能。

全局指令和局部指令可以根据实际需求选择使用，全局指令适用于在多个组件中普遍使用的指令，而局部指令适用于在特定组件中使用的指令。

## 四. 自定义指令的生命周期

首先，要实现自定义指令，首先需要理解一个指令从创建到消亡的过程，它的生命周期包括五个阶段，如下所示：

1. **bind**：只调用一次，指令第一次绑定到元素时调用。可以在这里进行一些初始化操作。
2. **inserted**：被绑定的元素插入父节点时调用。可以在这里进行一些操作，比如获取元素的子节点等。
3. **update**：当指令所在的组件实例化完成后，和刚创建时相比，会触发该钩子函数。可以在这里进行一些更新操作，比如获取元素的子节点等。
4. **componentUpdated**：被绑定的元素所在的组件渲染完成之后调用。可以在这里进行一些操作，比如获取元素的子节点等。
5. **unbind**：指令解绑时调用。可以在这里进行一些清理操作。

下面是一个简单的示例代码：

```html
<template>
  <div>
    <p v-custom>这是一个自定义指令</p>
  </div>
</template>

<script>
  export default {
    directives: {
      custom: {
        bind(el, binding, vnode) {
          console.log('bind', el, binding, vnode)
        },
        inserted(el, binding, vnode) {
          console.log('inserted', el, binding, vnode)
        },
        update(el, binding, vnode) {
          console.log('update', el, binding, vnode)
        },
        componentUpdated(el, binding, vnode) {
          console.log('componentUpdated', el, binding, vnode)
        },
        unbind(el, binding, vnode) {
          console.log('unbind', el, binding, vnode)
        }
      }
    }
  }
</script>
```

在这个示例中，我们定义了一个名为 `v-custom` 的自定义指令，并在其中实现了五个生命周期钩子函数。在模板中使用这个指令时，每次绑定、插入、更新、组件更新和解绑都会打印相应的日志信息。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62c760c17b864fe1a17934a41869c565~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2226&h=454&s=207497&e=png&b=fefefe)

## 五. 自定义指令实现权限控制

### 1. 定义权限指令

首先，我们需要定义一个自定义指令。在 Vue.js 中，指令是带有 v- 前缀的特殊属性，用于向元素添加特定的行为。我们可以使用 directive 方法来定义一个自定义指令：

```javascript
Vue.directive('hasPermission', {
  inserted: function (el, binding) {
    // 获取需要检查的权限名称
    const permissionName = binding.value
    // 判断当前用户是否拥有该权限
    if (!checkPermission(permissionName)) {
      // 如果用户没有该权限，则将其隐藏或移除元素
      ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
    } else {
      // 如果用户拥有该权限，则显示元素
    }
  }
})
```

上述代码中，我们定义了一个名为 hasPermission 的自定义指令，当该指令被插入到元素中时，会通过 `inserted` 钩子函数来执行相应的逻辑。在以上的代码中，我们通过 `checkPermission` 方法来判断当前用户是否拥有指定的权限。如果用户没有该权限，则将其隐藏；如果用户拥有该权限，则显示元素。

> 注意：隐藏和移除元素虽然在展示上我们看不到有任何不同，但其实之间有质的差别。类似于 `v-if` 和 `v-show`，隐藏其实是控制的 `display` 样式，赋值为 none 或 block。而移除则直接是移除的 dom 元素，页面上将不存在这个元素。因此，对于权限控制来说，移除具有比较高的安全性！

- 使用 el.parentNode.removeChild 移除元素的效果

![record-2.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77350b8babc341b1abc8e718e11ea96f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1221&h=440&s=657531&e=gif&f=57&b=fdfcfc)

- 使用 el.style.display = "none" 隐藏元素的效果

![record-3.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/524ceff22a8e41328bbba80b27b20192~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1221&h=440&s=827536&e=gif&f=54&b=fdfcfc)

### 2. 实现 checkPermission 方法

接下来，我们需要实现 `checkPermission` 方法，该方法用于检查当前用户是否拥有指定的权限。在这个方法中，我们可以从服务器端获取用户的权限列表，或者从本地存储中获取已存储的权限列表。这里我们假设已经从服务器端获取并存储了用户的权限列表，并将其存储在了 `localStorage` 中。具体实现如下：

```javascript
function checkPermission(permissionName) {
  // 获取当前登录用户的权限列表（假设已经从服务器获取并存储在了 localStorage 中）
  const userPermissions = JSON.parse(localStorage.getItem('userPermissions')) || []
  // 判断用户是否拥有指定的权限
  return userPermissions.indexOf(permissionName) !== -1
}
```

上述代码中，我们首先从 `localStorage` 中获取已存储的用户权限列表 `userPermissions`。然后，我们使用 `indexOf` 方法来判断当前用户是否拥有指定的权限。如果该用户拥有该权限，则返回 `true`；否则返回 `false`。

### 3. 使用权限指令

最后，我们可以在需要添加权限控制的元素的 `v-hasPermission` 属性上绑定需要检查的权限名称。例如：

```html
<div>
  <div v-hasPermission="'edit'">编辑按钮</div>
  <div v-hasPermission="'delete'">删除按钮</div>
</div>
```

以上代码中，我们在需要添加编辑权限控制的编辑按钮上使用了 `v-hasPermission` 属性，并将其绑定到了 `edit` 这个权限名称上。这样，当用户点击该按钮时，就会触发 `hasPermission` 钩子函数，从而判断其是否有编辑权限。如果有权限，则显示按钮；否则隐藏按钮。

![record-1.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7ffd6b522144893a5aeccaf547e9701~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=815&h=298&s=64027&e=gif&f=43&b=fefefe)

## 六. 总结

本文介绍了 Vue.js 中自定义指令的实现方法。通过自定义指令，我们可以控制 DOM 元素的显示和隐藏、修改元素属性等操作，从而实现更加灵活的交互效果。

通过使用自定义指令实现权限控制，我们可以更好地控制页面元素的显示和隐藏，从而提供更好的用户体验。此外，我们还可以使用自定义指令来验证用户输入的数据是否符合要求，以确保应用程序的安全性和可靠性。

在实现自定义指令时，我们需要遵循以下步骤：

**1. 定义一个具有钩子函数的对象，该对象包含了指令的各种行为和逻辑。**

**2. 在 Vue 实例或组件中注册该指令。**

**3. 在 HTML 中使用该指令。**

需要注意的是，在使用自定义指令时，我们需要确保在 Vue 实例或组件中传递了正确的上下文（context），以便能够正确地获取到权限列表等信息。同时，我们也需要在指令对象中定义相应的钩子函数，以实现不同的行为和逻辑。

总之，Vue.js 自定义指令是一个非常强大的功能，可以帮助我们快速构建出高效、安全和可靠的 Web 应用程序。其次通过自定义指令我们可以实现更多复杂的功能，而本篇文章所讲的权限指令属于项目中最常见且比较容易实现的，因此接下来需要我们探索去实现更多的其他指令！

<ArticleFooter link="https://juejin.cn/post/7299354844447653942" />
