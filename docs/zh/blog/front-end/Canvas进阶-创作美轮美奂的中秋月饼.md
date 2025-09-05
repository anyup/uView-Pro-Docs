---
title: 中秋佳节：学习 Canvas 创作美轮美奂的中秋月饼
---

# 中秋佳节：学习 Canvas 创作美轮美奂的中秋月饼

## 引言

`Canvas` 是 `HTML5` 提供的一个强大的绘图 `API`，它允许我们在网页上使用 `JavaScript` 来绘制图形、动画和交互式元素。通过 `Canvas`，我们可以实现自定义的图形效果，创建漂亮且有趣的视觉效果，提升网页的交互性和用户体验。

本文将介绍 `Canvas` 的基本使用方法和绘图步骤，帮助读者快速入门和运用 `Canvas` 绘制出想要的效果。

正值中秋佳节来临之际，本文将会在学习 `Canvas` 的同时，从零到一创作美轮美奂的中秋月饼，祝大家中秋快乐！

## 一. Canvas 基本介绍

`Canvas` 是 `HTML5` 提供的一个用于绘制图形的元素，简单来说它可以用来在网页中动态生成图形、动画和交互式内容。

**相关的基本概念：**

1. `Canvas` 元素：在 `HTML` 中，可以使用`<canvas>`标签来创建一个 `Canvas` 元素。
2. 上下文（`context`）：通过 `Canvas` 元素的 `getContext()` 方法可以获取上下文对象，用来进行图形绘制和操作。
3. 画布（`canvas`）：`Canvas` 元素创建的图形绘制区域被称为画布，用来绘制图形、文字、图像等。

**用途：**

`Canvas` 强大的绘图功能使其广泛应用于 `Web` 开发，特别是用于制作游戏、数据可视化和动画效果等方面。主要包括以下几个方面

1. 绘制 2D 图形
2. 绘制图像
3. 制作动画
4. 数据可视化
5. 实现交互和游戏
6. 图形编辑和处理

## 二. Canvas 的优势

1. **动态渲染**：`Canvas` 提供了一个可以通过 `JavaScript` 动态渲染图形的绘图环境。这允许开发者根据用户交互或其他事件实时更新画布，从而创建复杂的动画效果和交互式应用程序。

2. **像素级控制**：`Canvas` 允许直接操作像素级别的绘制，开发者可以访问和修改每个像素的颜色值。这种低级控制可以用于图像处理、特效生成和游戏开发等场景。

3. **大数据可视化**：由于 `Canvas` 的绘制是基于像素的，它对于处理大量数据，并实时更新和显示大规模图形很有效。这使得 `Canvas` 成为可视化数据和绘制复杂图表的强大工具。

4. **扩展性和自定义性**：`Canvas` 提供了丰富的绘制方法和属性，可以创建各种各样的图形和效果。通过自定义绘制算法和样式，开发者可以实现几乎任何类型的图像和视觉效果。

**Canvas 与其他绘图技术（SVG）的区别**

| 标题       | Canvas                                                                   | SVG                                                                |
| ---------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| 图形表示   | Canvas 使用基于像素的位图表示，绘制的图像被表示为一堆像素。              | SVG 使用基于矢量的图形表示。因此图像由数学描述的形状和路径组成     |
| 渲染方式   | Canvas 使用 GPU 加速渲染，在处理复杂图形时，Canvas 通常更高效。          | SVG 使用 CPU 渲染，因此 SVG 在处理简单且具有交互性的图形时更适用。 |
| 缩放与变形 | 在 Canvas 中，由于图像是基于像素的，缩放和变形可能会导致图像质量的损失。 | SVG 图形是基于数学描述的矢量形状，因此可以无损地进行缩放和变形。   |
| 交互性     | Canvas 绘制是基于像素的，要实现交互和图像操作通常需要更多的自定义代码。  | SVG 是基于 DOM 元素的，因此它更适合与其他页面元素进行交互和操作。  |

综上所述，Canvas 是一个适用于动态渲染、像素级控制和大数据可视化的强大工具，而 SVG 则更适合进行可缩放的矢量图形绘制和交互操作。开发者需要根据具体需求和场景选择最适合的绘图技术。

## 三. Canvas 的基本使用步骤

- 创建一个 `Canvas` 元素。
- 获取 `Canvas` 上下文。
- 设置 `Canvas` 元素的宽高。
- 清空和填充 `Canvas`。

下面是使用 `JavaScript` 实现 `Canvas` 相关操作的简单代码示例，提前对 Canvas 有一个简单的了解：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Canvas Demo</title>
  </head>
  <body>
    <canvas id="myCanvas"></canvas>
    <script>
      // 创建 Canvas 元素
      const canvas = document.getElementById('myCanvas')

      // 获取 Canvas 上下文
      const ctx = canvas.getContext('2d')

      // 设置 Canvas 元素的宽高
      canvas.width = 500
      canvas.height = 300

      // 清空和填充 Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height) // 清空画布

      ctx.fillStyle = 'red'
      ctx.fillRect(50, 50, 200, 100) // 填充一个红色矩形

      ctx.fillStyle = 'blue'
      ctx.fillRect(100, 100, 100, 150) // 填充一个蓝色矩形
    </script>
  </body>
</html>
```

在上面的示例中，我们按照步骤进行了以下操作：

1. 创建了一个 Canvas 元素，并给它指定了一个 id 为 "myCanvas"。
2. 使用 `getElementById` 方法获取了 Canvas 元素，并将其赋值给变量 `canvas`。
3. 使用 `getContext` 方法传入参数 `"2d"`了一个 2D 绘图上下文，并将其赋值给变量 `ctx`。
4. 设置 元素的宽高，这里将宽度设置为 500px，高度设置为 px。
5. 使用 `clearRect` 方法清空画布，参数 `(0, 0, canvas.width, canvas.height)` 指定了清空区域为整个画布。
6. 设置填充颜色为红色，并使用 `fillRect` 方法填充了一个矩形。参数 `(50, 50, 200, 100)` 指定了矩形的位置和大小。
7. 更改填充颜色为蓝色，并使用 `fillRect` 方法填充了另一个矩形。

通过以上步骤，我们成功创建了一个 `Canvas` 元素，获取了上下文对象，设置了元素的宽，并在画布上进行了清空和填充的操作。你可以在浏览器中运行以上代码，并查看画布上的效果：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a8d6e089ddc47f59eb5a63c4b66b476~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=703&h=383&s=2029&e=png&b=ffffff)

## 四. 绘制中秋节月饼

了解了 `Canvas` 的基本使用步骤，我们按照以上步骤使用 `Canvas` 画一个经典五仁月饼，如下图所示！

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce9403179c014b2d8c773862f576c5b3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=809&h=411&s=15080&e=png&b=ffffff)

<p align=center>中秋快乐</p>

**我们按部就班的按照步骤进行：**

**1. 创建了一个 Canvas 元素，并获取到上下文**

```html
<canvas id="mooncakeCanvas" width="800" height="400"></canvas>
```

```js
const canvas = document.getElementById('mooncakeCanvas')
const ctx = canvas.getContext('2d')
// 设置圆心坐标和半径
const centerX = canvas.width / 2
const centerY = canvas.height / 2
const radius = 100
```

首先，创建了一个 Canvas 元素，并给它指定了一个 id 为 "mooncakeCanvas"，设置元素的宽高，将宽度设置为 800px，高度设置为 400px。

其次，使用 `getElementById` 方法获取了 Canvas 元素，并将其赋值给变量 `canvas`。使用 `getContext` 方法传入参数 `"2d"`了一个 2D 绘图上下文，并将其赋值给变量 `ctx`。

同时，我们还定义了一些常量，设置圆心坐标和半径，方便后续方法的直接使用。

**2. 绘制月饼填充**

```js
function drawMooncakeFill() {
  // 开始绘制圆
  ctx.beginPath()

  // 绘制一个完整的圆形，作为月饼的整体填充图案
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2) // 绘制圆形作为月饼的图案

  // 设置填充颜色和绘制样式
  ctx.fillStyle = '#F4AD2F'

  // 填充圆形
  ctx.fill()
  ctx.closePath()
}
```

在上面的代码中，我们按照已经定义好的圆心坐标和半径，首先绘制了月饼整体形状为圆形，并对其填充了颜色为金黄色（"#F4AD2F"），最终我们画出了一个圆形，如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd2dc529e3764ea0a88d5ea6249eb853~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=812&h=411&s=6373&e=png&b=ffffff)

**3. 绘制月饼花纹**

```js
function drawMooncakePattern() {
  const patternRadius = radius * 0.65
  // 线条数量
  const patternCount = 8
  // 线条角度（弧度）
  const angle = (Math.PI * 2) / patternCount

  // 开始绘制线条
  ctx.beginPath()
  for (let i = 0; i < patternCount; i++) {
    const x = centerX + Math.cos(angle * i) * patternRadius
    const y = centerY + Math.sin(angle * i) * patternRadius
    ctx.lineTo(x, y)
  }
  // 设置线条宽度
  ctx.lineWidth = 20

  // 设置连接处样式：bevel（斜角）、round（圆角）、miter（尖角，默认值）
  ctx.lineJoin = 'round'

  // 设置线条颜色
  ctx.strokeStyle = '#D64541'
  ctx.closePath()
  ctx.stroke()
}
```

在上面的代码中，我们主要思想是绘制几条带有角度的弧线，作为月饼的馅料。主要设置线条数量、弧度、线宽、颜色、样式等，最终我们画出了几条线作为月饼馅料，如下图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/084de96346a74be29aa5244fb91dbf16~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=814&h=413&s=8132&e=png&b=ffffff)

**4. 绘制文本祝福语**

```js
function drawGreeting() {
  // 设置字体样式和大小
  ctx.font = '20px Arial'

  // 设置填充颜色
  ctx.fillStyle = '#D64541'

  // 设置字体居中样式
  ctx.textAlign = 'center'

  // 绘制填充文本，参数为文本内容和起始点的坐标
  ctx.fillText('五仁月饼', centerX, centerY - 5)
  ctx.fillText('中秋快乐', centerX, centerY + 25)
}
```

在上述代码中，我们主要设置文字参数的值和样式，比如字体样式和大小（`"20px Arial"`），填充颜色（`"#D64541"`），以及文字和起始点的坐标（x, y）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fd6fe6171734fb2a4c4b84ebbe19402~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=815&h=414&s=6930&e=png&b=ffffff)

**5. 绘制月饼成品**

```js
function drawMooncakeAndGreeting() {
  drawMooncakeFill() // 绘制月饼填充
  drawMooncakePattern() // 绘制月饼花纹
  drawGreeting() // 绘制祝福语
}
```

将以上的绘制月饼、绘制月饼填充、绘制文本等方法按照顺序执行，在 `Canvas` 画出来，我们最终就获得了一个成品月饼，如下图所示：（获取完整代码在文章末尾）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/493e562686a640d79b8fc9f9ae8b846a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=813&h=414&s=15127&e=png&b=ffffff)

## 总结

在本文中，我们学习了 `Canvas` 的基本使用方法和基本绘图步骤。我们首先学习了如何获取 `Canvas` 元素和上文对象，并设置画布的尺寸。然后，我们了解了如何使用上下文的属性和方法来绘制图形、设置样式和填充颜色。我们按照 `Canvas` 的基本使用步骤按部就班的实现了一个**中秋月饼的实例**，相信大家应该对其有一个基本的认识了。

`Canvas` 提供了丰富的功能和灵活的扩展性，同时可以通过结合其他技术（`JavaScript`、`CSS`）来创建出更加丰富多样的绘图效果和交互体验。希望本文章能对大家有所帮助，让大家可以更好地利用 `Canvas` 来创作出独特的网页元素和视觉效果。

- 参考资料：[Canvas - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

**中秋月饼**完整的代码如下所示：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>品五仁月饼，共度美好中秋！</title>
    <style>
      canvas {
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <canvas id="mooncakeCanvas" width="800" height="400"></canvas>
    <script>
      const canvas = document.getElementById('mooncakeCanvas')
      const ctx = canvas.getContext('2d')

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 100

      // 清空画布
      function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      // 1. 绘制月饼填充
      function drawMooncakeFill() {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fillStyle = '#F4AD2F'
        ctx.fill()
        ctx.closePath()
      }

      // 2. 绘制月饼花纹
      function drawMooncakePattern() {
        const patternRadius = radius * 0.65
        const patternCount = 8 // 花纹的数量
        const angle = (Math.PI * 2) / patternCount

        ctx.beginPath()
        for (let i = 0; i < patternCount; i++) {
          const x = centerX + Math.cos(angle * i) * patternRadius
          const y = centerY + Math.sin(angle * i) * patternRadius
          ctx.lineTo(x, y)
        }
        ctx.lineWidth = 20
        ctx.lineJoin = 'round'
        ctx.strokeStyle = '#D64541'
        ctx.closePath()
        ctx.stroke()
      }

      // 3. 绘制祝福语
      function drawGreeting() {
        ctx.font = '20px Arial'
        ctx.fillStyle = '#D64541'
        ctx.textAlign = 'center'
        ctx.fillText('五仁月饼', centerX, centerY - 5)
        ctx.fillText('中秋快乐', centerX, centerY + 25)
      }

      // 4.绘制整个月饼
      function drawMooncakeAndGreeting() {
        clearCanvas() // 清空画布
        drawMooncakeFill() // 绘制月饼填充
        drawMooncakePattern() // 绘制月饼花纹
        drawGreeting() // 绘制祝福语
      }

      drawMooncakeAndGreeting()
    </script>
  </body>
</html>
```

<ArticleFooter link="https://juejin.cn/post/7280007125983002624" />
