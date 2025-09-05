# 2024 年了！ CSS 终于加入了 light-dark 函数！

## 一. 前言

随着 Web 技术的不断发展，用户体验成为了设计和开发过程中越来越重要的因素之一。为了更好地适应用户的视觉偏好，CSS 在 2024 年正式引入了一项新的功能 —— `light-dark()` 函数。

这项功能的加入主要在于简化网页对于浅色模式（`Light Mode`）与深色模式（`Dark Mode`）的支持，使得我们能够更快更轻松轻松地实现不同的主题切换。

接下来，我们就来详细了解一下我们在开发网页是如何实现主题切换的！

以下 Demo 示例，支持跟随系统模式和自定义切换主题，先一睹为快吧！

![juejin6.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/83d684e684a7409893cf17af019afb96~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qKm5bel5Y6C:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733812168&x-orig-sign=H0%2Fi5655YH0JhQO%2BqBOCarnwkNA%3D)

## 二. 传统方式

在 `light-dark()` 函数出现之前，开发者通常需要通过 JavaScript 或者 CSS 变量配合媒体查询来实现主题切换。例如：

**使用 CSS 变量 + 媒体查询**：

开发者会定义一套 CSS 变量，然后基于用户的偏好设置（如：`prefers-color-scheme: dark` 或 `prefers-color-schema: light`）来改变这些变量的值。

```css
/* 默认模式 */
:root {
  --background-color: white;
  --text-color: black;
}

/* dark模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #333;
    --text-color: #fff;
  }
}
```

**也可以使用 JavaScript 监听主题切换**：

JavaScript 可以监听用户更改其操作系统级别的主题设置，并相应地更新网页中的类名或样式表链接。

```javascript
// 检测是否启用了dark模式
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode')
} else {
  document.body.classList.remove('dark-mode')
}
```

以上这种方法虽然有效，但增加了代码复杂度，特别是当需要处理多个元素的颜色变化时，我们可能需要更多的代码来支持主题。

接下来我们看一下 `light-dark` 是如何实现的？

## 三. 什么是 light-dark？

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/91d430c909cf499a9013b23d33d1b55c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qKm5bel5Y6C:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733812168&x-orig-sign=17lTUWWaltXevZGaHlo8tT70Mas%3D)

`light-dark()` 是在 2024 年新加入的一种新的 CSS 函数，它允许我们根据用户的系统颜色方案（浅色或深色模式）来自动选择合适的颜色值。这个函数的引入简化了创建响应用户偏好主题的应用程序和网站的过程，而无需使用媒体查询或其他复杂的逻辑。

### 1. 基本用法

具体的说，`light-dark()` 函数接受两个参数，分别对应于浅色模式下的颜色值和深色模式下的颜色值。

*   第一个参数是在浅色模式下使用的颜色。

*   第二个参数是在深色模式下使用的颜色。

当用户的设备设置为浅色模式时，`light-dark()` 会返回第一个参数的颜色；当用户的设备设置为深色模式时，则返回第二个参数的颜色。

基本语法如下：

```css
color: light-dark(浅色模式颜色, 深色模式颜色);
```

因此，`light-dark()` 提供了一种更简洁的方式来直接在 CSS 中指定两种模式下的颜色，而不需要额外的脚本或复杂的 CSS 结构。例如：

```css
body {
  background-color: light-dark(white, #333);
  color: light-dark(black, #fff);
}
```

这里的 `light-dark(白色, 深灰色)` 表示如果用户处于浅色模式下，则背景色为白色；如果是深色模式，则背景色为深灰色。同样适用于文本颜色等其他属性。

### 2. 结合其他 CSS 特性

`light-dark()` 可以很好地与其他 CSS 特性结合使用，如变量、渐变等，以创造更加丰富多样的效果。当结合其他 CSS 特性使用 `light-dark()` 将更加灵活的创造页面的效果。

#### (1) 结合 CSS 变量

你可以利用 CSS 变量来存储颜色值，然后在 `light-dark()` 内引用这些变量，这样就能够在一处更改颜色方案并影响整个站点。

CSS 变量（也称为自定义属性）允许你存储可重复使用的值，这使得在不同的主题之间切换变得非常方便。你可以设置基础颜色变量，然后利用 `light-dark()` 来决定这些变量的具体值。

```css
:root {
  --primary-color: light-dark(#007bff, #6c757d);
  --background-color: light-dark(white, #212529);
  --text-color: light-dark(black, white);
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

#### (2) 结合媒体查询

虽然 `light-dark()` 本身就可以根据系统偏好自动调整颜色，但有时候你可能还需要针对特定的屏幕尺寸或分辨率进行额外的样式调整。这时可以将 `light-dark()` 与媒体查询结合使用。

```css
@media (max-width: 600px) {
  body {
    --button-bg: light-dark(#f8f9fa, #343a40); /* 更小的屏幕上按钮背景色 */
    --button-text: light-dark(black, white);
  }
  button {
    background-color: var(--button-bg);
    color: var(--button-text);
  }
}
```

#### (3) 结合伪类

`light-dark()` 也可以与伪类一起工作，比如 `:hover`, `:focus` 等，以实现不同状态下的颜色变化。

```css
button {
  background-color: light-dark(#007bff, #6c757d);
  color: light-dark(white, black);
}

button:hover,
button:focus {
  background-color: light-dark(#0056b3, #5a6268);
}
```

#### (4) 结合渐变

如果你希望在浅色模式和深色模式下使用不同的渐变效果，同样可以通过 `light-dark()` 来实现。

```css
.header {
  background: linear-gradient(light-dark(#e9ecef, #343a40), light-dark(#dee2e6, #495057));
}
```

#### (5) 结合阴影

对于元素的阴影效果，你也可以根据不同主题设置不同的阴影颜色和强度。

```css
.box-shadow {
  box-shadow: 0 4px 8px rgba(light-dark(0, 255), light-dark(0, 255), light-dark(0, 255), 0.1);
}
```

通过上述方法，你可以充分利用 `light-dark()` 函数的优势，并与其他 CSS 特性结合，创造出既美观又具有高度适应性的网页设计。这样不仅提高了用户体验，还简化了开发过程中的复杂度。

**码上掘金演示：**

可以点击按钮切换主题，也可以切换系统的暗黑模式跟随：

[jcode](https://code.juejin.cn/pen/7444039041395195914)

## 五. 兼容性

在 2024 年初时，`light-dark()` 函数作为 CSS 的一个新特性被加入到规范中，并且开始得到一些现代浏览器的支持。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a14e5aef82af47539af431f6a920ebcb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qKm5bel5Y6C:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733812168&x-orig-sign=HS2QN4q%2FfcdpA9Cv3AjzTXIQ4vA%3D)

其实，通过上图我们可以看到，`light-dark()` 在主流浏览器在大部分版本下都是支持了，所以我们可以放心的使用它。

但是同时我们也要注意，在一些较低的浏览器版本上仍然不被支持，比如 IE。因此，为了确保兼容性，在生产环境中使用该功能前需要检查目标浏览器是否支持这一特性。

如果浏览器不支持 `light-dark()`，可能需要提供回退方案，比如使用传统的媒体查询 `@media (prefers-color-scheme: dark)` 或者通过 JavaScript 来动态设置颜色。

## 四. 总结

通过本文，我们了解到，light-dark() 函数是 CSS 中的一个新特性，它允许开发者根据用户的系统偏好（浅色或深色模式）来自动切换颜色。

通过与传统模式开发深浅主题的比较，我们可以总结出 `light-dark()` 的优势应该包括：

*   **使用简洁**：不需要编写额外的媒体查询，简洁高效。

*   **自动响应**：能够随着系统的颜色方案改变而自动切换颜色。

*   **易于维护**：所有与颜色相关的样式可以在同一处定义。

*   **减少代码量**：相比使用多个媒体查询，可以显著减少 CSS 代码量。

`light-dark()` 函数是 CSS 领域的一项进步，它不仅简化了响应式设计的过程，也体现了对终端用户个性化体验的重视。随着越来越多的现代浏览器开始支持这一特性，我们未来可以在更多的应用场景中使用这一特性！

## 文档

[light-dark](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)
