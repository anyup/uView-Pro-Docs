---
title: 盘点几个 input 标签鲜为人知的 HTML 属性
---

# 盘点几个input标签鲜为人知的HTML属性

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a325afb215874de1a096f11683cc39b3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=763&h=312&s=39571&e=png&b=d66e1e)

当涉及 HTML 表单元素时，大多数开发人员首先会想到常见的属性，比如`type`、`name`、`value`等。然而，除了这些常见属性之外，HTML 还提供了一些鲜为人知的属性，它们可以为表单元素带来额外的功能和灵活性。

我们将聚焦于探讨几个 input 标签鲜为人知的 HTML 属性，包括`inputmode`、`multiple`、`enterkeyhint`和`list`。这些属性可能并不为大多数人广泛使用，但它们的功能却能为表单的交互体验增添一些趣味和便利。

本篇文章抛砖引玉，我们可以通过深入了解这些不太常见的 HTML 属性，可以有机会发现更多有趣的 Web 开发技巧，并将在实际项目中创造出更丰富、更吸引人的用户界面。

## 1. inputmode

`inputmode`属性是 HTML5 新增的一个用于`<input>`和`<textarea>`标签的属性，用于指定输入字段的输入模式。它可以告诉浏览器在用户输入时应该使用何种键盘布局，以便更好地支持不同类型的输入。

### 主要取值：

- **none：** 表示没有特定的输入模式，浏览器会根据类型和情况选择合适的输入模式。

- **text：** 默认值，文本输入模式，适用于一般文本输入。

- **tel：** 电话号码输入模式，对应手机号、座机号等电话号码的输入。

- **url：** URL 输入模式，适用于输入网址 URL。

- **email：** 电子邮件输入模式，适用于输入电子邮件地址。

- **decimal：**   小数表示键盘，除了数字之外可能会有小数点 . 或者千分符逗号 ,。

- **numeric：**   会显示 0-9 的数字键盘。

- **search：**   提交按钮会显示 “search” 或者 “搜索”。

### 示例：

```html
<input type="text" inputmode="text" />
<input type="tel" inputmode="tel" />
<input type="url" inputmode="url" />
<input type="email" inputmode="email" />
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/315e0dd479f545f3a84735922a251611~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1222&h=892&s=276314&e=png&b=fcfcfa)

### 注意事项：

- `inputmode`属性并不会改变输入框的类型，它仅用于指导浏览器如何显示键盘，以及在移动设备上触摸模式下如何执行输入。

- 支持`inputmode`属性的浏览器一般是移动设备上的浏览器，而在桌面浏览器中可能不会生效，如下图所示。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/065bdbf77da0404e97ae4ec6ee0bd9d4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1363&h=391&s=84694&e=png&b=efe4d0)

### 应用场景：

- **优化移动端输入体验：** 使用`inputmode`属性可以针对不同类型的输入提供更符合期望的键盘布局，提升用户在移动设备上的输入体验。

- **提高表单输入准确性：** 通过设置合适的输入模式，可以限制用户输入的类型，减少错误输入的可能性，提高表单输入的准确性。

- **增强用户友好性：** 使用`inputmode`属性可以使页面对用户的操作更加智能和友好，为用户提供更顺畅的输入体验。

`inputmode` 属性主要是在移动设备上能够提升输入体验的有用属性，可以根据需求设置不同的输入模式，从而更好地引导用户输入正确类型的数据，避免输入错误。

## 2. multiple

`multiple` 是 `<input>` 标签的一个属性，用于指定输入框是否允许多个值输入。通常用于文件上传的输入框(`<input type="file">`)，允许用户同时选择多个文件以上传。

### 示例：

- **文件上传：**

```html
<input type="file" multiple />
```

- **邮件列表：**

```html
<input type="email" multiple />
```

当且仅当 type 为`email`、指定属性为`multiple`时，该值可以是由逗号分隔的正确形成的电子邮件地址的列表。从列表中的每个地址中删除任何结尾和前导空格。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b80a08ae52e344fa885eb2e50fc30473~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1069&h=327&s=53488&e=png&b=fefefe)

在多数情况下，`multiple` 属性常用于文件上传的输入框中，以允许用户同时选择多个文件进行上传。

### 应用场景：

- **多文件上传：** 最常见和主要的应用场景是在文件上传时，允许用户一次性选择多个文件进行上传。

- **多选数据：** 在一些特殊的场景下，可能需要让用户一次性输入多个数据项，此时也可以考虑使用 `multiple` 属性。

`multiple` 属性为 `<input>` 元素提供了一种在单个输入框中允许多个值输入的方式，对于特定的需求场景可以提供更便捷和有效的输入方式。在实际开发中，需要根据具体的功能需求来合理运用 `multiple` 属性。

## 3. enterkeyhint

`enterkeyhint`是 HTML5 新增的一个用于`<input>`和`<textarea>`标签的属性，用于指示浏览器在虚拟键盘上的"Enter"键要如何表现。该属性可以提高用户在移动设备上的输入体验，让用户知道按下"Enter"键时会发生什么操作。

### 可选取值：

- **enter**：表示按下"Enter"键时会提交表单。

- **done**：表示按下"Enter"键完成输入，通常用于表示输入完成或确认。

- **go**：表示按下"Enter"键后执行默认操作。比如，在 URL 输入框中按下"Enter"键后会转到该网址。

- **next**：表示按下"Enter"键会切换到下一个输入字段。通常用于表单中的多个输入字段的切换。

- **previous**：表示按下"Enter"键会切换到上一个输入字段。同样用于表单中的多个输入字段的切换。

### 示例：

```html
<input type="text" enterkeyhint="next" />
<input type="url" enterkeyhint="go" />
<input type="number" enterkeyhint="done" />
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f11da6ff2cb9488da649ff0eebef0346~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=373&h=642&s=31892&e=png&b=fefefe)

在这个示例中，根据不同的需求场景，设置了不同类型的输入框的`enterkeyhint`属性，以指示用户按下"Enter"键时相应的操作。

### 注意事项：

- `enterkeyhint`属性虽然提供了附加的交互提示，但不是所有浏览器都支持该属性，因此在实际应用中需要进行兼容性考虑。

- 在使用`enterkeyhint`属性时，建议结合其他交互设计原则和技巧，形成更加合理和明确的用户输入体验。

`enterkeyhint`属性的浏览器兼容性如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac2d5ce4d1214d2a8c4d50942857dfb2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1369&h=341&s=75827&e=png&b=f0e6d1)

### 应用场景：

- **优化移动端表单输入体验：** 通过设置不同类型的`enterkeyhint`属性，可以指示用户按下"Enter"键时的操作，提高移动设备上的表单输入体验。

- **减少用户输入误操作：** 正确定义"Enter"键的行为，能够减少用户误操作，提高用户在填写表单时的效率。

- **增强用户界面交互性：** 使用`enterkeyhint`属性可以增加用户界面的交互性和友好性，指导用户正确操作，提高用户满意度。

`enterkeyhint`属性是一个用于指示"Enter"键行为的属性，能够在移动设备上优化表单输入体验，提高用户的操作有效性和准确性。

## 4. list

`<input>` 标签的 `list` 属性用于将输入框与一个 `<datalist>` 元素相关联，以提供用户可以选择的预定义选项。通过这种方式，用户可以从预定义的选项中选择一个值，而不仅仅是手动输入。这种功能可以提高用户体验，尤其是针对需要用户输入固定选项的情况。

### 使用方法：

- 首先，在 `<datalist>` 元素中定义一组选项：

```html
<datalist id="colors">
  <option value="Red"></option>
  <option value="Green"></option>
  <option value="Blue"></option>
  <option value="Yellow"></option>
</datalist>
```

- 然后，将 `<input>` 标签中的 `list` 属性与上述 `<datalist>` 元素的 `id` 相关联：

```html
<input list="colors" name="color" />
```

在这个例子中，用户将能够从包含 "Red"、"Green"、"Blue" 和 "Yellow" 的下拉列表中选择一个颜色，而不是手动输入。

### 完整示例代码：

```html
<label for="color">Choose a color:</label>
<input list="colors" name="color" />
<datalist id="colors">
  <option value="Red"></option>
  <option value="Green"></option>
  <option value="Blue"></option>
  <option value="Yellow"></option>
</datalist>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/314a8ca9251e4605908f91bd20471ed9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=532&h=130&s=6168&e=png&b=ffffff)

### 注意事项：

- `<input>` 标签的类型通常应该是文字输入类型，如 `text` 或 `email`。`list` 属性通常与这些类型的输入框一起使用。

- 用户可以选择已经存在于 `<datalist>` 元素中的选项，也可以继续手动输入其他值。

- `<datalist>` 元素不会显示在页面上，只会在用户开始输入时提供一个下拉列表选择框。

通过使用 `list` 属性与 `<datalist>` 元素，可以让用户更轻松地从预定义选项中进行选择，减少输入错误和提高输入效率。这是一个非常有用的功能，尤其是在需要用户选择固定选项的情况下。

## 小结

`inputmode`属性可以指导浏览器选择合适的输入模式，帮助用户更轻松、准确地输入特定类型的数据。`multiple`属性允许用户一次性选择并上传多个文件，提高了文件上传功能的效率。`enterkeyhint`属性能够告诉用户在移动设备上键盘上回车键的功能，增强了输入操作的智能化。`list`属性可以与 datalist 元素结合，为用户提供预定义的选项列表，提升了输入框的自动完成能力。

通过了解和利用这些不太常见但功能强大的属性，我们可以为用户提供更好的交互体验，增强表单的灵活性和实用性。

<ArticleFooter :link="['juejin::https://juejin.cn/post/7339924521783951375', 'weixin::https://mp.weixin.qq.com/s/r4mbyLf4X9NHuCnOsgKDLg']" />
