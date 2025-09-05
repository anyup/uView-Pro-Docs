---
title: 【Gulp + Hash】优雅的解决前端项目部署缓存问题，自动生成 hash 值替换文件名
---

## 引言

在当今的数字化时代，网站性能优化成为了每个开发者都需要关注的重要问题。用户对网站访问效率的要求越来越高，而作为开发者，我们需要采取一些措施来提升网站的性能和用户体验。

在前端开发中，我们大多数的项目都已经使用上了前端框架开发，比如：`Vue.js`，`React.js`，`Angular.js` 等等，这些大而全的框架不仅能使开发迅速，还集成了各自独特的打包方式，编译后的文件名称都具有唯一性且随时更新。如下图所示，`Vue.js` 打包编译后生成的文件列表：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dd26a8d3a48463a9a9a045924f0b08c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=534&h=529&s=68581&e=png&b=191919)

因此，使用这些框架开发的项目在部署后则不会出现页面缓存的问题。然而，我们公司也有些老项目，仍然在使用原生的 `JavaScrip` 形式开发，没有用任何的框架，最多使用了 `Layui` `JQuery` 等插件，因此基本上有些项目直接部署的源码，假如你修改了一个`JS`文件，试想一下，用户如果之前访问过页面，浏览器并有了缓存，我们修改完成后用户再次打开了对应的页面，修改后的文件会不会及时更新呢？

**答案是不会的，因为名称没有任何改变，浏览器认定是同一个文件，这就造成了非常不好的体验。**

仍然记得当时，自己修改完一个 `JS` 文件或 `CSS` 文件，还要跑去引用该文件的地方修改一下版本号，这样操作不仅麻烦易出错，还真是太 LOW 了，简直是噩梦！必须要改变，我的程序员偷懒素养不允许我这么做。

为了实现这个目标，我们可以借助 Gulp 这个流式自动化构建工具。Gulp 提供了丰富的插件和功能，使我们能够轻松地自动化处理前端工作流程的各个环节。

在本文中，我们将介绍如何使用 Gulp 自动给页面添加 hash，并实现自动清除缓存的功能。我们将详细讲解如何安装 Gulp、创建项目和相关插件，以及如何配置 Gulp 任务来实现自动化处理。

通过阅读本文，您将学习到以下内容：

1. 安装 Gulp 及相关插件的步骤；
2. 创建 Gulp 任务，包括压缩合并资源文件和给文件添加唯一的 hash 值；
3. 如何使用 Gulp 自动生成带有 hash 的文件名，并批量替换在 HTML 中引用这些文件名。

## 一. Gulp 是什么

Gulp 是一款基于 Node.js 的前端构建工具，用于自动化任务的管理和构建前端项目。它的主要目标是简化开发过程中的任务，如文件压缩、文件合并、代码编译、图片压缩、自动刷新浏览器等。

通过使用 Gulp，开发者可以通过编写简洁、易于理解的任务代码，自动化执行各种常见的前端开发任务。Gulp 使用流（streams）的方式来处理任务，可以提高处理速度并节省系统资源。

Gulp 具有以下特点和优势：

1. **简单易用**：Gulp 使用简洁的 API 和明确的任务流程，使得开发者能够快速上手并编写可读性强的构建任务代码。

2. **插件丰富**：Gulp 拥有庞大的插件生态系统，开发者可以根据项目需求选择并使用相应的插件，从而扩展和定制构建任务。

3. **高效性能**：Gulp 使用流的方式处理任务，将文件加载到内存中进行处理，大大提高了任务执行的速度和效率。

4. **自动化构建**：Gulp 能够监视文件变动并自动执行相应的构建任务，使得开发者能够实时看到代码变更的效果，提高开发效率。

总之，Gulp 是一款强大而灵活的前端构建工具，能够帮助开发者简化和优化前端开发过程，提高开发效率和项目质量。

## 二. 为什么要添加 hash

在前端部署中，通过添加哈希（**hash**）值到文件名中，可以实现缓存的清除和更新。当文件发生变化时，哈希值也会发生变化这样可以确保文件名的唯一性。因此，在每次部署新的版本时，文件名会发生变化，浏览器将这些文件作为新的资源请求，而不是使用之前缓存的旧文件。

通过添加哈希值到文件名中，实现清除缓存的主要原理如下：

1. **强制浏览器重新获取新的资源**

浏览器缓存是根据请求的资源 URL 来判断的，如果资源 URL 发生变化，浏览器就会认为这是一个新的资源，会发送请求去获取最新版本的文件。

2. **避免浏览器使用旧版本的文件**

在不添加哈希值的情况下，如果浏览器缓存了某个文件，当服务器更新该文件，浏览器可能会继续使用旧版本的文件，因为缓存资源的 URL 与请求的资源 URL 相同通过添加哈希值到文件名中，每次更新文件时，文件名都会发生改变，浏览器会认为这是一个新的资源，并重新请求获取最新的版本。

通过清除缓存，可以确保用户在访问网页时获取到新的文件版本，避免出现使用旧版本文件导致的问题。这对于前端部署和网站更新非常重要，可以提供更好的用户体验和保证网站的稳定性。

## 三. 搭建环境

### 1. 安装 Gulp

首先，我们需要安装 Gulp。打开终端或命令行界面，执行以下命令：

```bash
npm install gulp-cli -g
npm install gulp -D
```

### 2. 创建项目

创建一个新的项目文件夹，并在该文件夹下初始化 npm，执行以下命令：

```bash
npm init -y
```

### 3. 安装相关插件

在项目根目录下，执行以下命令安装相关的 Gulp 插件：

在本项目中，我们使用到了以下几个插件，以下是对这些 Gulp 插件的简要说明：

1. `cross-env`：用于解决在不同部署环境中统一设置环境变量的问题，使得开发者可以更加方便地进行开发和环境配置。

2. `gulp-uglify`：用于压缩 JavaScript 文件，减少文件大小并优化代码执行速度。

3. `gulp-clean`：用于删除指定文件或文件夹，常用于清理构建过程中生成的临时文件或旧版本文件。

4. `gulp-clean-css`：用于压缩 CSS 文件，去除空格、注释和其他不必要的字符，以减小文件大小。

5. `gulp-rev`：用于生成静态资源的哈希值并重命名文件，常用于缓存管理和版本控制，确保浏览器获取最新的文件。

6. `gulp-rev-collector`：用于替换 HTML 或 CSS 文件中引用的静态资源文件路径，将原始文件名替换为哈希后的文件名来确保缓存更新。

7. `gulp-html-minifier2`：用于压缩 HTML 文件，去除空格、注释、删除无意义的标签等，以减小文件大小。

8. `gulp-zip`：用于将文件或文件夹打包成 ZIP 格式的压缩包，便于上传、发布或备份文件。

以上这些插件都是为了改善前端项目的开发和构建流程而开发的，通过自动化执行这些任务，可以提高前端项目的性能、优化代码，并简化开发者的工作流程。下面我们使用命令先安装好这些插件

```bash
npm install cross-env gulp-uglify gulp-clean gulp-clean-css gulp-rev gulp-rev-collector gulp-html-minifier2 gulp-zip -D
```

## 四. 开发 Gulp 任务

在项目根目录下，创建一个为 gulpfile.js 的文件，接下来我们逐步进行完善它：

### 1. 导入插件

首先，在 gulpfile.js 文件中引入相关的插件并定义，还需要定义一些全局的变量，便于后续使用。

```js
const { series, src, dest } = require('gulp')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const clean = require('gulp-clean')
const htmlmin = require('gulp-html-minifier2')
const zip = require('gulp-zip')
const pkg = require('./package.json')

// 源文件映射文件目录
const revDir = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
// ZIP压缩包名
const zipName = pkg.name + '.zip'
```

### 2. 实现拷贝

将源码文件夹保留不更改，重新定义一个 dist 文件夹用于编译生成的源码文件，rev 文件夹用户生成 hash 值变量的文件。

注意：拷贝之前，需要删除 `dist` 和 `rev`文件夹，避免生产重复文件

```js
/**
 * 删除 `dist` 和 `rev`
 * 避免生产重复文件
 */
function clear() {
  return src(['dist', 'rev'], { allowEmpty: true }).pipe(clean())
}

/**
 * 拷贝静态资源文件
 */
function assets() {
  return src('src/assets/**/*.*').pipe(dest('dist/assets/'))
}

/**
 * 拷贝 css 文件
 */
function css() {
  return src(['src/css/**/*.css']).pipe(dest('dist/css'))
}

/**
 * 拷贝 js 文件
 */
function js() {
  return src(['src/js/**/*.js']).pipe(dest('dist/js'))
}

/**
 * 拷贝 html 文件
 */
function html() {
  return src('src/views/**/*.html').pipe(dest('dist/views/'))
}
```

### 3. 压缩页面

在这里，我们主要进行了压缩 Html 页面中的代码，包括引用的 JavaScript 代码以及 CSS 代码

```js
/**
 * 压缩 html 页面
 */
function htmlMinify() {
  return src('dist/views/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      })
    )
    .pipe(dest('dist/views/'))
}
```

### 4. 添加 hash 值

重头戏来了，利用 `gulp-rev` 插件生成 hash 值，主要包含：引用的 JS、CSS 等文件

```js
/**
 *  Css 文件后面加 hash 值
 */
function cssRevHash() {
  if (process.env.NODE_ENV === 'production') {
    return src('dist/css/**/*.css')
      .pipe(rev())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(dest('dist/css/'))
      .pipe(rev.manifest())
      .pipe(dest(`rev/${revDir}/css`))
  } else {
    return src('dist/css/**/*.css')
      .pipe(rev())
      .pipe(dest('dist/css/'))
      .pipe(rev.manifest())
      .pipe(dest(`rev/${revDir}/css`))
  }
}

/**
 * Js 文件后面加 hash 值
 */
function jsRevHash() {
  if (process.env.NODE_ENV === 'production') {
    return src('dist/js/**/*.js')
      .pipe(rev())
      .pipe(uglify())
      .pipe(dest('dist/js/'))
      .pipe(rev.manifest())
      .pipe(dest(`rev/${revDir}/js`))
  } else {
    return src('dist/js/**/*.js')
      .pipe(rev())
      .pipe(dest('dist/js/'))
      .pipe(rev.manifest())
      .pipe(dest(`rev/${revDir}/js`))
  }
}

/**
 * 将 rev 目录下的 hash 文件替换掉 html 中对应的源文件链接
 */
function htmlRevInject() {
  return src([`rev/${revDir}/**/*.json`, 'dist/views/**/*.html'])
    .pipe(revCollector({ replaceReved: true }))
    .pipe(dest('dist/views/'))
}
```

### 5. 生成 Zip 包

使用`gulp-zip`将文件或文件夹打包成 ZIP 格式的压缩包，便于上传、发布或备份文件。

```js
/**
 * 打包生成Zip
 */
function generateZip() {
  return src('dist/**/*').pipe(zip(zipName)).pipe(dest('dist'))
}
```

### 6. 区分环境

利用`cross-env`运行任务时，添加环境变量，用于区分生产和开发环境，可以定向的做一写打包区分优化。比如：

- 在生产环境下，代码进行压缩、生成 Zip 包用于快速发版等
- 在开发环境下，未便于调试查看源码的，可以不进行代码压缩机清理等

```js
// 生产环境下执行
if (process.env.NODE_ENV === 'production') {
  exports.build = series(clear, assets, css, js, html, cssRevHash, jsRevHash, htmlRevInject, htmlMinify, generateZip)
}
// 开发环境下执行
else {
  exports.build = series(clear, assets, css, js, html, cssRevHash, jsRevHash, htmlRevInject)
}
```

### 7. 运行 Gulp 任务

在终端或命令行界面中，进入项目根目录，执行以下命令进行构建：

```bash
# development 环境
cross-env NODE_ENV=development gulp build
# production 环境
cross-env NODE_ENV=production gulp build
```

执行完毕后，你会在 `dist` 目录下看到生成的带有 hash 后缀的文件。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f679e484fcb427088cf9d046c5611d0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=339&h=244&s=14770&e=png&b=1b1b1b)

## 五. 部署验证

当我们要更新网站代码并发布新版本时，删除之前的缓存文件，将我们最新生成的 dist 文件夹拷贝到服务器下面。部署成功后可以明确的看见最新代码有没有更新成功。如下图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34765560100c4659a019125ab550b887~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=718&h=335&s=82074&e=png&b=ffffff)

可以清楚的看见，引用的 JS 和 CSS 文件都加上了自动生成的一串字符

通过这种方式，我们实现了自动给页面添加 hash 和实现自动清除缓存的基本示范，轻松提高网站的性能，改善用户的访问体验。

## 总结

优化网页性能和提升用户体验一直是前端开发的重要任务之一。在前端部署中，为了解决文件缓存导致用户浏览旧版本文件的问题，我们可以通过使用 Gulp 自动给页面添加哈希（hash）来实现缓的清除和更新。我们在详细介绍了如何使用 Gulp 实现该功能。

首先，我们了解了为什么添加哈希值到文件名中可以清除缓存。通过添加哈希值，我们可以实现以下两个目标强制浏览器重新获取新的资源和避免浏览器使用旧版本的文件。

其次，我们学习了如何使用 Gulp 实现自动添加哈希值的功能。通过使用 gulp-rev 插件，我们可以在文件名中添加哈希值，并生成带有哈希值的文件。然后，通过使用 gulp-rev-replace 插件，我们可以自动更新 HTML 文件中资源的引用路径，确保引用的是带有哈希值的最新文件。

虽然说，现在开发都用上了极速的框架，框架也已经内置了这种方法，但是也不排除有些老项目仍然会使用原生的开发方式。

总的来说，通过使用 Gulp 自动给页面添加哈希，并使用合理的缓存策略，我们可以很好地解决文件缓存导致的问题，提供更好的用户体验和网站的稳定性。希望本文对你理解和应用 Gulp 构建工具在前端部署中的作用有所帮助。

<ArticleFooter link="https://juejin.cn/post/7295559402475323428" />
