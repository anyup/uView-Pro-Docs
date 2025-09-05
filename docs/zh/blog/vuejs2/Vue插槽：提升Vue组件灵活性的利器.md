---
title: Vue插槽：提升Vue组件灵活性的利器
---

# Vue插槽：提升Vue组件灵活性的利器

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/315fff7e6b1d4df392f7df0959837c91~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=748&h=372&s=44875&e=png&b=ffffff)

## 一. 介绍

### 什么是插槽

**插槽**是 `Vue.js` 中一种强大的组件封装机制，用于在组件间复用可以动态填充的内容。简而言之，插槽允许我们在组件的模板中定义一些可变的区域，在使用组件时，可以灵活地填充不同的内容进入这些区域。

当我们的组件有一些需要在使用组件时才能确定的内容时，比如**按钮、文字、图标**等，使用插槽可以非常方便地将这些内容传递给组件。

## 二. 基础插槽

### 1. 单个插槽

单个插槽也可以称为默认插槽（`Default Slot`）,基础插槽是最简单的形式，可以认为它是一个没有具体名称的插槽，使用默认的 `<slot></slot>` 标签来定义。

使用基础插槽时，可以直接在组件的模板中写入插槽的内容。这样，在使用组件时，插槽的内容将替换掉对应的 `<slot></slot>` 标签。

### 2. 具名插槽

有时，我们希望在组件内定义多个插槽，并且通过名称来区分它们。这时可以使用具名插槽，使用 `<slot name="xxx"></slot>` 标签来定义具名插槽。

在使用具名插槽时，可以通过给 `<template>` 标签添加特殊的属性 `v-slot:xxx` 或 `v-slot="xxx"` 来指定插入该具名插槽的内容。

### 3. 作用域插槽

作用域插槽是一种更复杂也更强大的插槽形式。作用域插槽允许组件在插槽中传递数据给插槽的内容，并且在插槽中可以对传递的数据进行处理。

作用域插槽的定义类似于具名插槽，使用 `<slot name="xxx" v-bind:xxx="xxx"></slot>` 标签来定义，传递的数据使用 `v-bind:xxx` 来绑定。

在使用作用域插槽时，可以通过给 `<template>` 标签添加特殊的属性 `v-slot:xxx="xxx"` 等同于 `v-slot="xxx" v-bind:xxx="xxx"` 来指定插入该作用域插槽的内容，并且可以对传递的数据进行操作。

## 三. 插槽内容

在 Vue 中，我们可以通过插槽将内容从父组件传递到子组件中。插槽的内容传递可以通过两种方式实现：**插槽默认值**和**插槽作用域**。

### 1. 插槽默认值

当父组件没有向插槽传递具体内容时，可以在插槽定义中设置默认值。在插槽中使用具体内容时，如果父组件没有提供内容，将会使用默认值。

```js
// 子组件
<template>
    <slot>默认内容</slot>
</template>


// 父组件使用
<template>
    <my-component>
        <!-- 不传递具体内容，使用默认值 -->
    </my-component>
    <my-component>
        <!-- 传递具体内容，将覆盖默认值 -->
        <span>父组件传递的内容</span>
    </my-component>
</template>
```

### 2. 插槽作用域

作用域插槽允许父组件将数据传递给插槽的子组件，并在插槽中通过作用域插槽的语法来访问和使用这些数据。

```js
// 子组件模板
<slot name="content" v-bind:content="slotData"></slot>

// 父组件使用
<template>
  <my-component>
    <template v-slot:content="slotProps">
      <!-- 使用插槽传递的内容和数据 -->
      <span>{{ slotProps.content }}</span>
    </template>
  </my-component>
</template>
```

在父组件使用插槽时，使用 `v-slot` 或 `#` 语法来指定插入具名插槽或作用域插槽的内容，并且可以在插槽中传递数据。子组件可以通过作用域插槽的参数来接收父组件传递的数据，并在插槽中使用这些数据。这样，就实现了插槽内容的传递和使用。

## 四. 动态插槽

在 Vue 中，我们可以使用动态插槽来动态地选择和渲染不同的插槽内容。通过动态插槽，我们可以根据不同的条件或数据来选择不同的插槽，使得组件更加灵活和可配置。

### 1. v-slot 指令

使用`:slot`绑定属性，根据表达式的返回值来选择具名插槽。

```html
<!-- 子组件模板 -->
<slot :name="slotName"></slot>

<!-- 父组件使用 -->
<template>
  <my-component>
    <template v-slot:[dynamicSlotName]>
      <!-- 这里是插槽内容 -->
    </template>
  </my-component>
</template>
```

在父组件中，可以使用动态绑定的属性 `v-slot:[dynamicSlotName]` 来选择要传递的具名插槽。

### 2. 动态插槽名

使用动态变量来确定要使用的作用域插槽。

```html
<!-- 子组件模板 -->
<slot v-bind:name="dynamicSlotName" v-bind:content="slotData"></slot>

<!-- 父组件使用 -->
<template>
  <my-component>
    <template v-slot:[dynamicSlotName]="slotProps">
      <!-- 使用作用域插槽传递的内容和数据 -->
      <span>{{ slotProps.content }}</span>
    </template>
  </my-component>
</template>
```

在父组件中，可以使用动态绑定的属性 `v-slot:[dynamicSlotName]` 来选择要传递的作用域插槽，并通过作用域插槽的参数来接收传递的数据。

## 五. 插槽使用技巧

### 1. 作用域插槽的使用场景

前面说过：作用域插槽是 Vue 中非常强大和灵活的特性，它可以在父组件中向子组件传递数据，并且允许子组件在插槽内部使用这些数据。

作用域插槽适用于需要在父组件和子组件之间传递数据和逻辑的场景。它允许父组件将数据传递给子组件，并在插槽内部进行处理和渲染，从而实现更大的灵活性和可扩展性。而且，作用域插槽使得组件之间的交互更加容易，可以更好地实现组件的复用和解耦。

作用域插槽的使用场景如下：

1. 列表渲染
2. 数据筛选和处理
3. 自定义组件的扩展性
4. 动态组件

**举例分析**

当使用作用域插槽时，在父组件中渲染一个列表，并且要将每个列表项单独传递给子组件进行渲染。以下是一个示例：

```html
<!-- 父组件模板 -->
<template>
  <div>
    <child-component v-for="item in items" :item="item" v-slot="slotProps">
      <!-- 子组件中使用作用域插槽接收数据并渲染 -->
      <p>{{ slotProps.item }}</p>
      <button @click="slotProps.handleClick">点击</button>
    </child-component>
  </div>
</template>

<!-- 子组件模板 -->
<template>
  <div>
    <!-- 使用slotProps接收父组件传递的数据 -->
    <slot :item="item" :handleClick="handleClick"></slot>
  </div>
</template>

<!-- 父组件使用 -->
<template>
  <my-component :items="myItems">
    <!-- 父组件传递数据给子组件，并在插槽内部使用 -->
    <template v-slot="slotProps">
      <p>{{ slotProps.item }}</p>
      <button @click="slotProps.handleClick">点击</button>
    </template>
  </my-component>
</template>

<script>
  // 父组件传递的数据和方法
  export default {
    data() {
      return {
        myItems: ['Apple', 'Banana', 'Orange']
      }
    },
    methods: {
      handleClick() {
        // 点击事件逻辑
      }
    }
  }
</script>
```

在这个例子中，父组件中的`myItems`是一个包含三个水果名称的数组。通过`v-for`指令，我们遍历`items`数组，并将每个列表项传递给子组件`child-component`。在子组件中，我们使用作用域插槽接收父组件传递的数据，并在插槽内部使用这些数据进行渲染。

子组件中的插槽使用`:item="item"`表示父组件传递的数据项是`item`，`:handleClick="handleClick"`表示父组件传递的点击事件处理方法是`handleClick`。

通过这种方式，我们实现了将父组件的数据传递给子组件，并在插槽内部进行渲染和操作的功能。这样可以实现更灵活和可复用的组件设计。

### 2. 多个插槽的使用

Vue 中使用多个插槽的方式有两种，分别是上文提到的具名插槽(named slots)和作用域插槽(scoped slots)。下面分别进行详细解释。

- 具名插槽(named slots)：具名插槽允许我们在父组件中为子组件提供多个不同名称的插槽，以便在子组件中选择性地渲染对应的插槽内容。

在子组件中使用具名插槽：

```html
<template>
  <div>
    <slot name="header">
      <!-- 默认的头部内容 -->
      <h1>默认的头部</h1>
    </slot>

    <slot name="content">
      <!-- 默认的内容 -->
      <p>默认的内容</p>
    </slot>

    <slot name="footer">
      <!-- 默认的尾部 -->
      <footer>默认的尾部</footer>
    </slot>
  </div>
</template>
```

在使用子组件时，可以通过`v-slot`指令指定具名插槽，并在其中放入相应的内容：

```html
<template>
  <div>
    <my-component>
      <template v-slot:header>
        <!-- 头部内容 -->
        <h1>这是头部标题</h1>
      </template>

      <template v-slot:content>
        <!-- 内容 -->
        <p>这是内容的一部分</p>
        <p>这是内容的另一部分</p>
      </template>

      <template v-slot:footer>
        <!-- 尾部内容 -->
        <footer>这是尾部信息</footer>
      </template>
    </my-component>
  </div>
</template>
```

- 作用域插槽(scoped slots)：作用域插槽是一种更高级的插槽，它允许子组件在插槽内部使用父组件的数据。

在子组件中定义作用域插槽：

```html
<template>
  <div>
    <slot name="header" v-bind:data="headerData">
      <!-- 头部内容 -->
      <h1>{{ data }}</h1>
    </slot>

    <slot name="content" v-bind:data="contentData">
      <!-- 内容 -->
      <p>{{ data }}</p>
    </slot>

    <slot name="footer" v-bind:data="footerData">
      <!-- 尾部内容 -->
      <footer>{{ data }}</footer>
    </slot>
  </div>
</template>
```

在使用子组件时，可以通过`template v-slot:slotName="slotProps"`来指定作用域插槽，并在其中使用`slotProps`对象来访问父组件的数据：

```html
<template>
  <div>
    <my-component>
      <template v-slot:header="slotProps">
        <!-- 头部内容 -->
        <h1>{{ slotProps.data }}</h1>
      </template>

      <template v-slot:content="slotProps">
        <!-- 内容 -->
        <p>{{ slotProps.data }}</p>
      </template>

      <template v-slot:footer="slotProps">
        <!--尾部内容 -->
        <footer>{{ slotProps.data }}</footer>
      </template>
    </my-component>
  </div>
</template>
```

通过以上两种方式，我们可以实现 Vue 中多个插槽的使用，从而灵活地传递和渲染内容。具名插槽适用于只需要传递内容的情况，而作用域插槽则适用于需要传递数据的情况。在实际开发中，可以根据需求选择使用适当的方式。

### 3. 插槽的嵌套使用

当使用 Vue 的插槽时，可以将插槽嵌套在其他组件或元素中，以构建更复杂的插槽结构。

```html
<!-- 父组件模板 -->
<template>
  <div>
    <header>
      <!-- 头部插槽 -->
      <slot name="header"> 默认的头部内容 </slot>
    </header>
    <main>
      <!-- 主体插槽 -->
      <slot name="content"> 默认的内容 </slot>
    </main>
    <footer>
      <!-- 底部插槽 -->
      <slot name="footer"> 默认的底部内容 </slot>
    </footer>
  </div>
</template>

<!-- 子组件使用 -->
<template>
  <my-component>
    <!-- 使用具名插槽来填充各个插槽位置 -->
    <template v-slot:header>
      <h1>自定义的头部内容</h1>
      <p>更多头部内容</p>
    </template>
    <template v-slot:content>
      <h2>自定义的内容</h2>
      <p>更多内容</p>
    </template>
    <template v-slot:footer>
      <h3>自定义的底部内容</h3>
      <p>更多底部内容</p>
    </template>
  </my-component>
</template>
```

在上述示例中，父组件（`my-component`）定义了三个具名插槽：`header`，`content`和`footer`。在子组件中，通过使用`v-slot`指令，可以将具名插槽嵌套在`my-component`组件内，并且在插槽中添加任意的 HTML 元素和内容。

在这个示例中，父组件提供了默认的插槽内容，如果子组件没有提供具体的插槽内容，则显示默认内容。但是，如果子组件提供了自定义的插槽内容，那么默认内容将会被覆盖。

通过使用插槽的嵌套，我们可以构建更复杂和灵活的组件，同时允许父组件和子组件在插槽中进行更多的自定义和交互。

## 六. 插槽具名规则

在 Vue 中，插槽具名规则是在父组件中给插槽赋予特定的名称，然后在子组件中使用该名称来定义具名插槽。具名插槽允许有多个不同名称的插槽，以便在父组件中根据需要选择性地填充和渲染不同的插槽内容。

### 1. 具名插槽

具名插槽的规则如下：

1. 在父组件中，使用`<template>`标签，并使用`v-slot`指令来为插槽命名，例如：`v-slot:slotName`。或者可以使用较短的语法`#slotName`。
2. 在子组件中，使用`<slot>`标签，通过`name`属性来定义具名插槽的名称，例如：`<slot name="slotName"></slot>`。

```html
<!-- 父组件模板 -->
<template>
  <div>
    <child-component>
      <!-- 使用具名插槽 slotA -->
      <template v-slot:slotA>
        <p>This is slot A content.</p>
      </template>

      <!-- 使用具名插槽 slotB -->
      <template v-slot:slotB>
        <p>This is slot B content.</p>
      </template>
    </child-component>
  </div>
</template>

<!-- 子组件模板 -->
<template>
  <div>
    <!-- 使用具名插槽 slotA -->
    <slot name="slotA"></slot>

    <!-- 使用具名插槽 slotB -->
    <slot name="slotB"></slot>
  </div>
</template>
```

在这个例子中，父组件`child-component`中定义了两个具名插槽`slotA`和`slotB`。在子组件中，使用`<slot>`标签并通过`name`属性来接收并渲染这两个具名插槽。

通过这种方式，我们实现了在父组件中定义多个具名插槽，并在子组件中根据这些名称来选择性地渲染插槽内容。这样可以使组件更加灵活和可复用，适应不同的布局和需求。

### 2. 后备插槽

后备插槽（Fallback Slot）是在 Vue 中用于处理未命名的插槽内容的特殊插槽。当父组件没有提供特定名称的插槽内容时，可以使用后备插槽来渲染默认的内容。后备插槽使用`v-slot`指令或较短的语法`#default`来定义。

```html
<!-- 父组件模板 -->
<template>
  <div>
    <child-component>
      <!-- 没有具名插槽内容时，使用后备插槽 -->
      <template #default>
        <p>This is the default slot content.</p>
      </template>
    </child-component>
  </div>
</template>

<!-- 子组件模板 -->
<template>
  <div>
    <!-- 使用后备插槽 -->
    <slot></slot>
  </div>
</template>
```

在这个例子中，父组件`child-component`使用了后备插槽`#default`，当父组件没有提供具名插槽内容时，将默认渲染后备插槽中的内容。

子组件中使用`<slot></slot>`来表示后备插槽，当父组件没有提供具名插槽内容时，后备插槽中的内容将被渲染。

通过使用后备插槽，我们可以为组件提供默认的内容，以便在没有特定插槽内容的情况下进行渲染，并使组件具有更好的健壮性和适应性。

## 总结

通过本文的阅读和学习，将能够全面了 Vue 插槽的使用，掌握插槽的基本用法，并掌握一些最佳实践和技巧，以便在开发过程中更地利用插槽来升 Vue 组件的可制性和可复用性。

<ArticleFooter link="https://juejin.cn/post/7277371354452803642" />
