---
title: Canvas艺术之旅：了解几个绘制基本图形的 API
---

# Canvas艺术之旅：了解几个绘制基本图形的 API

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a16ab26d77d74aedb203888b041065d4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=802&h=321&s=50571&e=png&b=ffffff)

## 了解几个绘制基本图形的 `API`

`Canvas` 是 `HTML5` 提供的绘画 `API`，可以用于在 `Web` 页面上绘制各种基本图形。本文介绍一些 `Canvas` 绘制基本图形的 `API`：

### 前置条件

> 注意：本文章所提供的代码示例默认已经进行了 `canvas` 元素定义，`DOM` 获取以及 `canvas` 的上下文获取，以下进行代码演示时将会省略这部分代码，请注意！

```html
<canvas id="myCanvas" width="800" height="200"></canvas>
```

```javascript
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
```

## 1. 绘制直线

**`API`说明**

- `moveTo(x, y)`：将画笔移动到指定位置(x, y)。该方法定义了直线的起点。
- `lineTo(x, y)`：从当前位置绘制一条直线到指定位置(x, y)。该方法定义了直线的终点。
- `stroke()`：描边当前路径。该方法实际绘制了直线。

**基本步骤**

1.  设置直线起始点坐标`（x,y）`和终点坐标`（x,y）`
2.  开始绘制直线`beginPath()`、`moveTo()`、`lineTo()`
3.  设置线条样式`lineWidth`、`strokeStyle`等
4.  绘制直线`stroke()`

**代码示例**

```javascript
// 设置直线起始点坐标和终点坐标
var startX = 100
var startY = 100
var endX = 700
var endY = 100

// 开始绘制直线
ctx.beginPath()
ctx.moveTo(startX, startY)
ctx.lineTo(endX, endY)

// 设置线条样式
ctx.lineWidth = 2 // 线宽
ctx.strokeStyle = 'red' // 线条颜色

// 绘制直线
ctx.stroke()
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4d4be7e22724ddda3a36e8a07fb2aca~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=811&h=211&s=1298&e=png&b=ffffff)

## 2. 绘制曲线

**`API`说明**

- `moveTo(x, y)`：将画笔移动到指定位置(x, y)。该方法定义曲线的起点。
- `quadraticCurveTo(cpx, cpy, x, y)`：绘制二次贝塞尔曲线，从当前位置到(x, y)，控制点为(cpx, cpy)。该方法通过控制点来定义曲线的弯曲程度。
- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：绘制三次贝塞尔曲线，从当前位置到(x, y)，两个控制点分别为(cp1x, cp1y)和(cp2x, cp2y)。该方法通过两个控制点来定义曲线的弯曲程度。
- `stroke()`：描边当前路径。该方法实际绘制了曲线。

绘制曲线和绘制直线十分类似，区别在于`quadraticCurveTo()`，它是 `Canvas 2D API` 提供的方法之一，用于绘制二次贝塞尔曲线。二次贝塞尔曲线由起点、控制点和终点组成，它的形状由控制点的位置和两个端点的相对位置关系决定。下面是一个使用 `quadraticCurveTo()` 方法绘制二次贝塞尔曲线的示例：

**代码示例**

```javascript
// 设置曲线起始点坐标
var startX = 50
var startY = 50
// 控制点的坐标
var controlX = 250
var controlY = 250
// 终点的坐标
var endX = 700
var endY = 50

// 开始绘制曲线
ctx.beginPath()
ctx.moveTo(startX, startY)
ctx.quadraticCurveTo(controlX, controlY, endX, endY)

// 设置线条样式
ctx.lineWidth = 2 // 线宽
ctx.strokeStyle = 'red' // 线条颜色

// 绘制曲线
ctx.stroke()
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e19813ebf2143edacfaf3313ac1c65c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=811&h=214&s=6785&e=png&b=ffffff)

## 3. 绘制路径

**`API`说明**

- `beginPath()`: 开始一个新的路径。当调用该方法后，所有之后的路径绘制操作都会被作为一个新的路径进行处理。
- `closePath()`: 结束当前路径。通过连接路径的起点和最后一个点来闭合路径。
- `moveTo(x, y)`: 将路径的起点移动到指定的坐标。将绘图游标移动到给定的位置(x, y)，不会绘制图形。
- `lineTo(x, y)`: 添加一条直线段到路径。从当前点绘制一条直线到指定的坐标(x, y)。
- `rect(x, y, width, height)`: 绘制矩形路径。在指定的位置(x, y)绘制一个宽为`width`，高为`height`的矩形路径。

**代码示例**

```javascript
// 定义路径的各个点
var pathPoints = [
  { x: 50, y: 50 },
  { x: 150, y: 150 },
  { x: 600, y: 50 },
  { x: 700, y: 150 }
]

// 开始绘制路径
ctx.beginPath()
ctx.moveTo(pathPoints[0].x, pathPoints[0].y)

// 绘制路径线条
for (var i = 1; i < pathPoints.length; i++) {
  ctx.lineTo(pathPoints[i].x, pathPoints[i].y)
}

// 设置线条样式
ctx.lineWidth = 2 // 线宽
ctx.strokeStyle = 'red' // 线条颜色

// 封闭路径（可选）
ctx.closePath()

// 绘制路径
ctx.stroke()
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83146336b7ac4fc1893c5a4d1cb28103~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=813&h=214&s=7891&e=png&b=ffffff)

## 4. 绘制矩形

**`API`说明**

- `fillRect(x, y, width, height)`: 绘制实心矩形。在指定的位置(x, y)绘制一个宽为`width`，高为`height`的实心矩形。
- `strokeRect(x, y, width, height)`: 绘制矩形的边框。在指定的位置(x, y)绘制一个宽为`width`，高为`height`的矩形的边框。
- `clearRect(x, y, width, height)`: 清除矩形区域。在指定的位置(x, y)清除一个宽为`width`，高为`height`的矩形区域。

使用 Canvas 绘制矩形（填充矩形、圆角矩形）的步骤如下：

1.  清空画布（可选）：

```javascript
ctx.clearRect(0, 0, canvas.width, canvas.height)
```

2.  绘制填充矩形：

```javascript
var x = 200,
  y = 50,
  width = 400,
  height = 100
ctx.fillStyle = 'red' // 设置填充颜色
ctx.fillRect(x, y, width, height) // 绘制矩形，参数为起始点的坐标和矩形的宽高
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4e75dc4850e4425a44d4591e879c60e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=815&h=213&s=1316&e=png&b=ffffff)

3.  绘制圆角矩形：

**代码示例**

```javascript
// 绘制圆角矩形
function drawRoundRect(x, y, width, height, radius) {
  ctx.beginPath()

  // 绘制左上角的圆弧路径
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.arcTo(x + width, y, x + width, y + radius, radius)

  // 绘制右上角的圆弧路径
  ctx.lineTo(x + width, y + height - radius)
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius)

  // 绘制右下角的圆弧路径
  ctx.lineTo(x + radius, y + height)
  ctx.arcTo(x, y + height, x, y + height - radius, radius)

  // 绘制左下角的圆弧路径
  ctx.lineTo(x, y + radius)
  ctx.arcTo(x, y, x + radius, y, radius)

  ctx.closePath()

  // 填充圆角矩形
  ctx.fillStyle = 'green'
  ctx.fill()
}

drawRoundRect(200, 50, 400, 100, 50)
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2ffb63b2b874a539d38ad009d113893~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=813&h=214&s=3493&e=png&b=ffffff)

在上述代码中，我们首先定义了一个 `drawRoundRect` 函数，该函数根据参数绘制圆角矩形图形。

其中，我们使用了 `arcTo` 方法绘制圆角路径，通过调用 `moveTo` 方法移动到圆角的起点位置，然后使用 `lineTo` 方法绘制至下一个点位置，最后使用 `arcTo` 方法绘制圆角路径。圆角的大小由 `radius` 参数决定。

绘制完四个圆角路径后，调用 `closePath` 方法将路径封闭起来。最后通过设置 `fillStyle` 属性设置填充颜色，并调用 `fill` 方法填充圆角矩形。

在 `<body>` 中的 `drawRoundRect(50, 50, 300, 100, 50)` 调用会在画布上绘制一个起点位置为 (200, 50)，宽度为 400，高度为 100，圆角半径为 50 的圆角矩形。

## 5. 绘制圆和弧

**`API`说明**

- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`: 绘制弧形或部分圆。在指定的位置(x, y)绘制一个半径为`radius`的弧形或者部分圆。`startAngle`和`endAngle`参数用于指定起始角度和结束角度（单位：弧度），anticlockwise 参数可选择是否逆时针绘制，默认为 false（顺时针）。
- `arcTo(x1, y1, x2, y2, radius)`: 绘制两个切线之间的弧线。绘制从当前点到（x2, y2）的直线，并在此间以给定半径`radius`绘制出从当前点开始的切线。

**代码示例**

1.  绘制圆：

```javascript
// 设置圆的中心点坐标和半径
var centerX = canvas.width / 2
var centerY = canvas.height / 2
var radius = 80

// 开始绘制路径
ctx.beginPath()

// 绘制圆
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)

// 设置圆的边框样式
ctx.strokeStyle = 'black'

// 设置圆的填充颜色
ctx.fillStyle = 'green'

// 填充圆
ctx.fill()

// 绘制圆的边框
ctx.stroke()

// 结束绘制路径
ctx.closePath()
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5ee2b5de3234a028adb620d62c8129e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=810&h=208&s=6468&e=png&b=ffffff)

以上代码会在画布上绘制一个半径为`100px`的绿色实心圆，边框为黑色。注意，在绘制圆之前，我们首先通过调用 `beginPath()` 方法开始一条新的路径，然后用 `arc()` 方法定义圆的形状，最后调用 `fill()` 方法填充圆并 `stroke()` 方法绘制圆的边框。

2.  绘制弧：

```javascript
// 设置弧的中心点坐标、半径、起始角度和结束角度（以弧度为单位）
var centerX = 400
var centerY = 50
var radius = 100
var startAngle = Math.PI / 4 // 45度
var endAngle = (3 * Math.PI) / 4 // 135度
var counterclockwise = false // 是否顺时针绘制弧形

// 开始绘制路径
ctx.beginPath()

// 绘制弧形
ctx.arc(centerX, centerY, radius, startAngle, endAngle, counterclockwise)

// 设置弧形的边框样式
ctx.strokeStyle = 'red'

// 设置弧形的线宽
ctx.lineWidth = 5

// 绘制弧形的边框
ctx.stroke()

// 结束绘制路径
ctx.closePath()
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cf791c157a54765b9e8a392065d1437~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=812&h=210&s=2847&e=png&b=ffffff)

以上代码会绘制一个半径为`100px`的弧形，起始角度为 45 度，结束角度为 135 度，顺时针绘制，并设定边框样式为红色，线宽为 5 像素。注意，在绘制弧形之前，我们同样先通过调用 `beginPath()` 方法开始一条新的路径，然后使用 `arc()` 方法定义弧形的形状，`arc()`方法接受的参数依次是圆心的 x 坐标、y 坐标、半径、起始角度、终止角度。起始角度和终止角度都是弧度制表示，可以使用`Math.PI`来得到常用的角度值。最后调用 `stroke()` 方法绘制弧形的边框。

## 6. 绘制文本

**`API`说明**

- `fillText(text, x, y, maxWidth)`: 在指定位置绘制填充文本。在指定的位置(x, y)绘制给定的文本内容`text`。可选参数`maxWidth`用于指定文本的最大宽度，文本会在达到最大宽度后自动换行。
- `strokeText(text, x, y, maxWidth)`: 在指定位置绘制边框文本。在指定的位置(x, y)绘制给定的文本内容`text`的边框。可选参数`maxWidth`用于指定文本的最大宽度，文本会在达到最大宽度后自动换行。
- `measureText(text)`: 测量文本的宽度。返回一个 TextMetrics 对象，该对象包含文本的宽度和其他相关信息。可以使用 `measureText(text).width` 来获取文本的宽度。
- `font = value`: 设置文本的字体样式。通过给 `font` 赋值来设置文本的字体样式，例如：`ctx.font = "bold 12px Arial";`
- `textAlign = value`: 设置文本的水平对齐方式。通过给 `textAlign` 赋值来设置文本的水平对齐方式，可选值有 `"start"`, `"end"`, `"left"`, `"right"`, `"center"` 等。
- `textBaseline = value`: 设置文本的垂直对齐方式。通过给 `textBaseline` 赋值来设置文本的垂直对齐方式，可选值有 `"top"`, `"hanging"`, `"middle"`, `"alphabetic"`, `"ideographic"`, `"bottom"` 等。

**代码示例**

```javascript
// 设置文本样式
ctx.font = 'bold 50px Arial' // 设置文本粗细、大小及字体
ctx.fillStyle = 'red' // 设置文本颜色
ctx.textAlign = 'center' // 设置文本对齐方式：center（居中对齐）
ctx.textBaseline = 'middle' // 设置文本基线：middle（垂直居中）

// 绘制文本
ctx.fillText('Hello, Canvas!', canvas.width / 2, canvas.height / 2)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe67d2496bca40d19e9f3b8af3a23483~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=811&h=212&s=7144&e=png&b=ffffff)

上述代码会在画布上绘制文本。我们使用 `font` 属性来设置文本的粗细、大小和字体，使用 `fillStyle` 属性来设置文本颜色，使用 `textAlign` 属性来设置文本对齐方式，使用 `textBaseline` 属性设置文本基线，

然后，我们使用 `fillText()` 方法来绘制文本，通过指定文本内容、位置（x 坐标和 y 坐标）来实现。在上述代码中，我们将文本设置为`"Hello, Canvas!"`，并将其绘制在画布的中心位置。注意使用的是 `fillText()` 方法来填充文本，如果希望绘制的是文本的边框，可以使用 `strokeText()` 方法，并在绘制文本之前设置 `strokeStyle` 属性。

## 总结

本文主要介绍了绘制基本图形的几个常用的 `API` 及示例，目的就是要对 `Canvas` 绘图 `API` 有一个基本的认识，图形绘制是 `Canvas` 的基础，是 `Canvas` 最简单的功能，只有基础打牢，后面我们使用 `Canvas` 开发图表可视化、动画、游戏等高级项目时，我们才会更快的学习。

本文主要讲解了绘制简单图形的基本操作：包括绘制直线、曲线、路径、圆弧、文本等，以下是在绘制这几种的图形的常用 `API`，总结一下：

1.  绘制直线：

    - `moveTo(x, y)`：将画笔移动到指定位置(x, y)。
    - `lineTo(x, y)`：从当前位置绘制一条直线到指定位置(x, y)。

2.  绘制矩形：

    - `fillRect(x, y, width, height)`：绘制一个填充的矩形，起点为(x, y)，宽度为`width`，高度为`height`。
    - `strokeRect(x, y, width, height)`：绘制一个边框的矩形，起点为(x, y)，宽度为`width`，高度为`height`。

3.  绘制路径：

    - `fillRect(x, y, width, height)`：绘制一个填充的矩形，起点为(x, y)，宽度为`width`，高度为`height`。
    - `strokeRect(x, y, width, height)`：绘制一个边框的矩形，起点为(x, y)，宽度为`width`，高度为`height`。

4.  绘制圆形、弧形：

    - `arc(x, y, radius, startAngle, endAngle, anticlockwise)`：从起点(x, y)开始，以半径`radius`绘制一段弧线，从`startAngle`角度开始，到`endAngle`角度结束（以弧度为单位）。
    - `arcTo(x1, y1, x2, y2, radius)`：绘制一段连接两个切线的弧线，其中(x1, y1)和(x2, y2)是切线的起点和终点，`radius`是弧线的半径。

5.  绘制文本
    - `fillText(text, x, y, maxWidth)`: 在指定位置绘制填充文本。在指定的位置(x, y)绘制给定的文本内容`text`。
    - `strokeText(text, x, y, maxWidth)`: 在指定位置绘制边框文本。在指定的位置(x, y)绘制给定的文本内容`text`的边框。
    - `font = value`: 设置文本的字体样式。例如：`ctx.font = "bold 12px Arial";`

希望本文能为你在初学 `Canvas` 绘图时，给你提供一些帮助！加油！

<ArticleFooter link="https://juejin.cn/post/7280125658340474919" />
