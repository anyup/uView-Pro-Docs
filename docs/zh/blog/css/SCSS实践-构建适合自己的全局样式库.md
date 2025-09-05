---
title: SCSS 实践：利用 SCSS 构建适合自己的全局样式库
---

# SCSS 实践：利用 SCSS 构建适合自己的全局样式库

## 一. 为什么要开发自己的全局样式库

在前端开发中，**样式表**（CSS）是至关重要的一部分。然而，当我们面对复杂的项目时，经常会遇到编写**重复样式**的问题。这不仅会导致**代码冗余**，还会影响开发效率和代码的可维护性。

为了解决这个问题，**构建自己的全局样式库**是一个非常好的解决方案。全局样式库可以提供一套通用的样式规范和组件，以及命名和结构的约定，使开发人员能够更快速、高效地编写样式。它不仅可以提升开发的效率，还能保证项目中的样式一致性，并提高代码的可维护性。

我将采用 SCSS 来构建自己的样式库，SCSS 的优势有很多，想要提前了解更多的 SCSS 相关知识，请参考我之前的文章进行学习，本篇文章我们直接来进行实践！

[1. 揭开 SCSS 神秘面纱：利用预处理器升级你的样式表技术](https://juejin.cn/post/7296692047418507274)

[2. SCSS 进阶之道：探索更多样式表达的可能性](https://juejin.cn/post/7297033227894341671)

通过学习以上的两篇文章，我们应该了解了 SCSS 的基本语法功能，接下来可以进行开发了。

在本文中，我们将一步步进行构建自己的全局样式库。我们将从确定需求和目标开始，通过命名和结构的规范，循序渐进的编写适合项目的全局基础样式。

## 二. 确定需求和目标

在构建全局样式库之前，首先要明确需求和目标。考虑你的项目类型和主题，决定哪些样式是常用的，需要重复使用的。比如：**通用样式**、**按钮样式**、**表单样式**、**文本样式**等，确保你的全局样式库能够满足项目中大部分样式需求。

我将主要通过以下部分进行全局样式的开发：

- **主题色**：type
- **字体大小**：size
- **页面宽度**：width
- **内外边距**：margin padding
- **圆角**：radius
- **布局**：flex float
- **定位**：align、float、fixed
- **文字**：定位、加粗、省略 等等
- **阴影**：shadow
- **边框**：border
- **徽标**：badge

## 三. 规范命名和结构

为了编写可读性高、易于维护的全局样式库，需要遵循一套规范的命名和结构。可以配合语义化的类名来命名样式。

另外，可以将全局样式库按照功能或模块进行划分，将相关的样式组织在一起，使结构更清晰。

最重要的一点是，为了避免和项目中其他样式库、自定义样式命名产生冲突，可以统一携带一个自己独有的**命名前缀**，保持自己样式库的**独有性**。例如：`.a-`，`.u-`，`.is-` 等等。

其次，除了命名前缀，对自己的样式名称也要有自己的标准和含义，可以通过简称来命名，例如：

- margin-top -> mgt
- padding-top -> pgt
- background -> bg

## 四. 利用 Sass 混合器快速生成

以主题色为例，利用 Sass 混合器生成的基本思路如下：

### 1. 定义主题色变量

首先，你需要定义主题色的变量。可以根据你的设计需求，选择一组主题色并为每个颜色设置一个变量，例如 `$primary-color` 等。

### 2. 创建混合器

接下来，你可以创建一个混合器来生成主题色的样式。混合器是 Sass 中用来生成重复样式的工具。你可以使用 Sass 的 `@mixin` 关键字定义一个混合器，命名为 `theme-color` 或者其他你喜欢的名称。

在混合器中，你可以使用 Sass 的函数和操作符对颜色进行处理和计算。例如，你可以通过调整亮度、饱和度或者透明度来生成不同的主题色样式。

```scss
@mixin theme-color($color) {
  color: $color;
}
```

### 3. 使用混合器生成样式

在需要应用主题色的地方，你可以使用 `@include` 关键字引用混合器，并传入需要的主题色变量作为参数。

```scss
.is-primary {
  @include theme-color($primary-color);
}
```

在上述示例中，`.button` 类的元素将应用混合器生成的主题色样式。

### 4. 样式扩展（可选）

除了生成背景色和文本色之外，你还可以在混合器中添加其他样式属性，例如边框色、阴影效果等，以满足你的设计需求。

```scss
@mixin theme-color($color) {
  background-color: $color;
  color: mix($color, white, 30%);
  border: 1px solid darken($color, 10%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

通过以上基本思路，你可以利用 Sass 混合器来生成主题色的样式，提高样式的可维护性和复用性。同时，你还可以根据具体需求扩展混合器的功能，以满足更多的设计要求。记得在使用 Sass 编译器编译你的样式文件，以生成符合 CSS 规范的样式表。

## 五. 编写基础样式

基础样式是全局样式库中最重要的部分，它包括网页的通用样式，如布局、字体、颜色等。编写好基础样式能够确保整个项目的一致性。

使用 CSS 预处理器（如 Less、Sass 等）能够提高编写样式的效率和可维护性，定义一些全局变量、混合器或函数，以便在样式表中重复使用。

接下来我将采用 Sass 的模式开发一套样式表，主要可以使用一些全局变量、混合器等快速生成样式表，提升开发效率，同时也便于维护。最终也可以利用 Sass 命令生成标准的 css 样式，以供各种项目使用。

### 1. 几个全局变量

首先我定义了几个全局变量 `$rate` 和 `$unit`，以便于在使用 SCSS 运算时，可以直接使用这几个全局变量，基本上接下来生成样式的所有的操作都会使用这两个变量，下面解释一下是什么意思：

- **$rate：比率，表示放大倍数。**

例如：is-mg-2 中定义的 margin 的 缩放倍数

```scss
// $rate 为 1
.is-mg-2 {
  margin: 2px;
}

// $rate 为 2
.is-mg-2 {
  margin: 4px;
}
```

- **$unit：尺寸单位。**

定义值为 px 或 rpx。如果是小程序开发，则定义为 rpx，其他可以定义为 px，其实之后我们也可以扩展为 rem、em 等。

rpx 是微信小程序开发中新出了尺寸单位 rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽度为 750rpx。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbef3a65b8234635ad473fc1bea97d12~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1021&h=453&s=70330&e=png&b=fefefe)

更多`rpx`知识请参考：[微信小程序尺寸单位](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#尺寸单位)

### 2. 主题色

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86a61055fe9e4304aa5fbc0208c96af5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=847&h=177&s=19018&e=png&b=ffffff)

**用途**：

主题色主要保持网站的主色调及其其他各种主要的色彩一致，保持标准性，也便于后期网站的换肤功能定制。主要包括 主色调 `primary`、错误 `error`、警告 `warning`、提示 `info`、成功 `success` 等等

**生成主题色步骤**：

1. 定义主题色变量数组：首先，需要定义主题色的变量。可以根据你的设计需求，选择一组主题色并为每个颜色设置一个变量，例如 `primary`, `success`，后面会生成 `$is-primary`、`$is-success` 等。
2. 定义主题色颜色数组：颜色数组和变量数组一一对应，主要用户后面循环数组时，--对应赋值的操作，例如：`primary` 对应颜色 `#2979ff`
3. 定义混合器生成样式：在需要应用主题色的地方，使用 `@include` 关键字引用混合器，并传入需要的主题色变量作为参数。
4. 循环使用混合器生成主题色

**代码如下所示**：

```scss
/* 颜色 */
$type: 'primary', 'success' 'error', 'warning', , 'info', 'white';
$main: #2979ff, #19be6b, #fa3534, #ff9900, '#909399', #ffffff;
// 生成主题色 mixin 方法 .is-{$type}
@mixin add-type-color($type, $main) {
  .is-bg-#{$type} {
    background-color: $main;
  }

  .is-#{$type} {
    color: $main;
  }
}

@for $i from 1 through length($type) {
  @include add-type-color(nth($type, $i), nth($main, $i));
}
```

通过上面的方法，最终我们会利用变量和混合器生成了我们需要的主题色：`.is-primary` `.is-bg-primary`等等

**生成的格式如下**：

```scss
.is-primary {
  color: #2979ff;
}

.is-bg-primary {
  background-color: #2979ff;
}

.is-success {
  color: #19be6b;
}

.is-bg-success {
  background-color: #19be6b;
}
```

### 3. 字体大小

**用途**：

主要用于文本元素的字体大小，font-size

**思路**：

定义一个最小值`$font-min`、最大值`$font-max`、步长`$font-step`，使用 for 循环按照从最小值到最大值，按照每次循环步长递增重复执行代码块，最终生成我们所需要的字体大小。

**代码如下所示**：

```scss
// 字体
$font-min: 12;
$font-max: 40;
$font-step: 1;
$unit: px /*字体大小*/ @for $i from $font-min through $font-max {
  @if $i % $font-step == 0 {
    .is-font-#{$i} {
      font-size: $i * $rate + $unit;
    }
  }
}
```

通过上面的方法，我们将生成 font-size 从 12px 到 40px 的样式，每次递增 1px

**生成的格式如下**：

- 字体大小： .is-font-14

```scss
// 百分比宽度
.is-font-14 {
  font-size: 14px;
}
```

### 4. 页面宽度

**用途**：

主要用于元素宽度的定义，width

**思路**：

定义一个最小值`$width-min`、最大值`$width-max`、步长`$width-step`，使用 for 循环按照从最小值到最大值，按照每次循环步长递增重复执行代码块，最终生成我们所需要的宽度。

**代码如下所示**：

```scss
// 宽度
$width-min: 10;
$width-max: 100;
$width-step: 10;
/*页面宽度*/
@for $i from $width-min through $width-max {
  // 只要能被10除尽的数
  @if $i % $width-step == 0 {
    .is-width-#{$i} {
      width: $i + 0%;
    }

    .is-width-#{$i}px {
      width: $i * $rate + $unit;
    }
  }
}
```

通过上面的方法，我们将生成 width 从 10px 到 100px 的样式，同时我们还生成了百分比的宽度大小

**生成的格式如下**：

- 百分比宽度： .is-width-10
- 尺寸宽度： .is-width-10px

```scss
// 百分比宽度
.is-width-10 {
  width: 10%;
}

// 尺寸宽度
.is-width-10px {
  width: 10px;
}
```

### 5. 内外边距

**用途**：

主要用于元素内外边距，margin 和 padding，这两个是在我们样式开发中经常使用的属性。

**思路**：

定义一个最小值`$min`、最大值`$max`，使用 for 循环按照从最小值到最大值，按照每次循环递增重复执行代码块，最终生成我们所需要的内外边距样式。

**代码如下所示**：

```scss
$min: 1;
$max: 80;
// 定义内外边距
@for $i from $min through $max {
  // 只要双数和能被5除尽的数
  @if $i % 2 == 0 or $i % 5 == 0 {
    // 得出：is-mg-i
    .is-mg-#{$i} {
      margin: $i * $rate + $unit;
    }

    // 得出：is-mgtb-i
    .is-mgtb-#{$i} {
      margin-top: $i * $rate + $unit;
      margin-bottom: $i * $rate + $unit;
    }

    // 得出：is-mglr-i
    .is-mglr-#{$i} {
      margin-left: $i * $rate + $unit;
      margin-right: $i * $rate + $unit;
    }

    // 得出：is-pd-i
    .is-pd-#{$i} {
      padding: $i * $rate + $unit;
    }

    // 得出：is-pdtb-i
    .is-pdtb-#{$i} {
      padding-top: $i * $rate + $unit;
      padding-bottom: $i * $rate + $unit;
    }

    // 得出：is-pdlr-i
    .is-pdlr-#{$i} {
      padding-left: $i * $rate + $unit;
      padding-right: $i * $rate + $unit;
    }

    @each $short, $long in l left, t top, r right, b bottom {
      // 缩写版，结果如： is-mgl-i，is-pdl-i
      // 定义外边距
      .is-mg#{$short}-#{$i} {
        margin-#{$long}: $i * $rate + $unit;
      }

      // 定义内边距
      .is-pd#{$short}-#{$i} {
        padding-#{$long}: $i * $rate + $unit;
      }
    }
  }
}
```

**生成的格式如下**：

- 全外边距： .is-mg-5
- 上下外边距： .is-mgtb-5
- 左右外边距： .is-mglr-5
- 全内边距： .is-pd-5
- 上下内边距： .is-pdtb-5
- 左右内边距： .is-pdlr-5
- 上、下、左、右内边距： .is-pdt-5、.is-pdr-5、.is-pdb-5、.is-pdl-5
- 上、下、左、右外边距： .is-mgt-5、.is-mgr-5、.is-mgb-5、.is-mgl-5

```scss
// 全外边距
.is-mg-5 {
  margin 5px;
}
// 上下外边距
.is-mgtb-5 {
  margin: 5px 0;
}
// 左右外边距
.is-mglr-5 {
  margin: 0 5px;
}
// 全内边距
.is-pd-5 {
  padding 5px;
}
// 上下内边距
.is-pdtb-5 {
  padding: 5px 0;
}
// 左右内边距
.is-pdlr-5 {
  padding: 0 5px;
}
```

### 6. 圆角样式

**用途**：

主要用于元素圆角样式，比如按钮的圆角样式，使用的是`border-radius`。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cb5382404084db5b11cc2fa77d9a6fb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=281&h=124&s=4644&e=png&b=fafafa)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/581500e86a474358bc9a5eab019f6a7b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=283&h=124&s=4746&e=png&b=fafafa)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5324861b4f554e44a2057e707b220bcd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=285&h=129&s=5048&e=png&b=fafafa)

**思路**：

定义一个最小值`$radius-min`、最大值`$radius-max`、步长`$radius-step`，使用 `for` 循环按照从最小值到最大值，按照每次循环步长递增重复执行代码块，最终生成我们所需要的圆角样式。

**代码如下所示**：

```scss
// 圆角
$radius-min: 2;
$radius-max: 10;
$radius-step: 2;
/* 圆角 is-radius-1, is-radius-top-1 */
@for $i from $radius-min through $radius-max {
  @if $i % $radius-step == 0 {
    // 全圆角
    .is-radius-#{$i} {
      border-radius: $i + px;
    }
    // 上圆角
    .is-radius-top-#{$i} {
      border-top-left-radius: $i + px;
      border-top-right-radius: $i + px;
    }
    // 下圆角
    .is-radius-bottom-#{$i} {
      border-bottom-left-radius: $i + px;
      border-bottom-right-radius: $i + px;
    }
  }
}
```

**生成的格式所示**：

- 全圆角：.is-radius-2
- 上圆角：.is-radius-top-2
- 下圆角：.is-radius-bottom-2

```scss
// 全圆角
.is-radius-2 {
  border-radius: 2px;
}
// 上圆角
.is-radius-top-2 {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
// 下圆角
.is-radius-top-2 {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
```

### 7. 其他样式

- 布局：flex float
- 定位：align、float、fixed
- 文字：定位、加粗、省略、几行展示
- 阴影：shadow
- 徽标：badge

譬如以上这些零零散散的样式，不适合批量生成，因此在开发项目的时候，需要我们要自己多总结，多收集，可以将其逐步的纳入自己的样式库中，如下所示：

```scss
/* 盒子模型 */
.is-box {
  box-sizing: border-box;
}

/* 布局 */
.is-flex {
  display: flex;
  flex-direction: row;
}

.is-block {
  display: block;
}
/* start--文本行数限制--start */
.is-line-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.is-line-2 {
  -webkit-line-clamp: 2;
}

/* 位置 定位 */
.is-floatr {
  float: right;
}

.is-absolute {
  position: absolute;
}

.is-relative {
  position: relative;
}

.is-fixed {
  position: fixed;
}

/* 含有阴影 */
.is-shadow {
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
}

/* 含有边框 */
.is-border {
  border: 1px solid $is-border-color;
}

/* 徽标 */
.is-badge-border {
  border: 1px solid $is-border-color;
  padding: 6 + $unit 6 + $unit;
}
```

### 8. 转化成 CSS 样式

通过之前文章的说明， SCSS 是 CSS 的超集，但在使用 SCSS 之前需要将其编译为原生 CSS，才能在浏览器中正常运行。这一过程可以通过使用 Sass 编译器或其他构建工具来完成。

因此我们在编写好 SCSS 样式后，可以将其转化成原生 CSS，注意：由于目前许多前端框架（如 Vue）等框架可以通过集成的方式实现内部编译，因此不用我们来操作，我们只考虑单独使用 CSS 文件的时候。

看下面如何进行转化：假如我们编写的 SCSS 样式文件为 `global.scss`

- 在项目中安装 Sass

```bash
npm install sass -D
```

- 编译 SCSS 文件，使其转化成 CSS

```bash
sass --style compressed global.scss global.css
```

通过运行以上的命令，即可将 SCSS 编译成 CSS，如下图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39fb246183a14c30a84515d501c31e6c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1758&h=976&s=331638&e=png&b=1f1f1f)

## 六. 实现样式重置和规范化

CSS 进行样式重置的主要原因是为了消除不同浏览器对页面元素的默认样式差异，使得页面在各种浏览器上能够呈现一致的外观。由于不同浏览器对元素的默认样式有所差异，有时会导致页面在不同浏览器上显示不一致，影响用户体验和开发效率。通过进行样式重置，可以将各种浏览器的默认样式统为一致的基础样式，从而更加灵活地进行样式定义和页面布局。

常见的样式重置方法包括使用通用的样式重置方案（如 `normalize.css`、`reset.css` 等）或者自定义重置样式，以清除各浏览器默认样对页面元素的影响。这样可以更好地掌控页面的外观和布局，提高开发效率，确保页面在不同浏览器上的一致性。

[normalize.css](https://github.com/necolas/normalize.css)

## 七. 总结

构建自己的全局样式库是一个值得投入时间和精力的过程，但它将为你的开发工作带来巨大的好处。通过减少冗余代码、提高开发效率和代码可维护性，全局样式库能够极大地简化开发流程，并确保整个项目的一致性。

但是要记住，每个项目都有自己的特点和需求，所以自己的全局样式库也需要灵活地根据项目的实际情况进行调整和优化。不断学习和改进是构建全局样式库的关键，与其他开发者的交流和分享也能够帮助你不断提高。

最后，希望通过构建自己的全局样式库，你能够更高效地开发网站和应用，提高代码的可维护性，为用户提供更好的体验。

## 项目源码

本文章编写的源代码已经上传到 GitHub，包括 SCSS 和编译生成的 CSS，有感兴趣的可以进行自取，如果对你有帮助，请给个 **Star**、**Fork**。

[GitHub 项目源码](https://github.com/anyup/juejin-up)

> 创作不易，如果文章对你有帮助，请帮忙给个赞！

<ArticleFooter link="https://juejin.cn/post/7298927417317507081" />
