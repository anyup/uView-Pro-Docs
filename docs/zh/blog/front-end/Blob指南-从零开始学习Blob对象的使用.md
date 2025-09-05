---
title: Blob 学习指南：从零开始学习 JavaScript Blob 对象的使用
---

# Blob 学习指南：从零开始学习 JavaScript Blob 对象的使用

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80aaddfe412d486da9dbf486d54e0820~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=750&h=315&s=130779&e=png&b=e2793c)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68d0cf40b6ed4e1985a73cf740ec9aba~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1193&h=672&s=146223&e=png&b=fefefe)

## 一. 前言

当我们在处理前端开发任务时，经常会涉及到处理各种类型的数据，如文本、图片、音视频等。而 JavaScript 中的 Blob 对象提供了一种便捷的方式来操作和处理这些数据。Blob 对象可以将不同类型的数据进行封装，并提供了一系列方法和属性，使得我们能够轻松地对数据进行处理和传输。

在本篇文章中，我们将从 Blob 对象的基本概念开始，到如何使用 Blob 对象处理文件，以及如何创建和销毁 Blob URL，我们将对 Blob 对象有一个全方位的认识。此外，我们也将会探讨如何合理使用并处理 Blob 对象，以避免内存泄漏和其他性能问题。

通过上面脑图的认识，学习完 Blob，我们将了解到如何使用 Blob 对象来处理不同类型的数据，如何在前端开发中使用它进行文件操作，以及注意事项和最佳实践。最终通过 Blob 对象的灵活性和便利性在某些场景下提供更优秀的解决方案思路。下面我们从 Blob 的概念开始认识它吧！

## 二. Blob 是什么

Blob（Binary Large Object）是一种数据类型，表示二进制大对象。它可以用来存储和处理大量的二进制数据，比如图像、音频、视频、文件等。

Blob 对象通常用于在浏览器中处理和传输数据，可以在客户端进行文件上传和下载、图像处理和展示、音视频播放等操作。它是一种灵活且高效的数据类型，可以方便地处理二进制数据，同时也为网络数据传输提供了便捷的方式。

在 JavaScript 中，Blob 对象提供了一些方法和属性来操作和处理存储的二进制数据，比如获取数据大小、数据类型、分割和合并数据等。同时，Blob 对象也可以通过 File 接口进行扩展，用于处理文件对象。通过 Blob 对象，可以实现实时文件上传和下载，以及在浏览器端对二进制数据进行处理和展示。

**特点**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e91222845e40a59daa8dccc2691ac8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1321&h=350&s=103819&e=png&b=fefefe)

如上图所示，Blob 对象具有以下特点：

1. **数据封装**：Blob 对象可以将任意类型的数据进行封装，包括文本、二进制、音频、视频等。它提供了一种统一的数据形式，方便存储和传输各种类型的数据。

2. **不可变性**：Blob 对象一旦创建，其数据是不可更改的。也就是说，你不能直接修改 Blob 对象中的数据，但可以通过复制和拼接等方式创建新的 Blob 对象。

3. **跨域支持**：Blob 对象可以跨域使用。这意味着你可以在当前页面创建 Blob 对象，并将它传递给其他域名的页面或服务器，实现跨域数据传递。

4. **可用于文件操作**：Blob 对象可以模拟文件对象，提供了一系列与文件相关的方法和属性，如获取文件类型、大小、最后修改时间等。这使得在前端处理文件时更加灵活和简便。

5. **可转换为 URL**：通过调用 `URL.createObjectURL()` 方法，可以将 Blob 对象生成一个唯一的 URL，以便在页面中使用。这大大简化了在浏览器中处理 Blob 对象的操作。

6. **可用于网络请求**：Blob 对象可以作为请求的参数或响应的结果，在网络传输过程中非常方便。你可以将 Blob 对象直接发送给服务器，也可以从服务器接收 Blob 对象作为响应数据。

总体而言，Blob 对象的灵活性和便利性的特点使得 Blob 对象在前端开发中有广泛的应用。接下来，我们看一下在开发中如何创建和操作 Blob 吧。

## 三. 如何创建 Blob

要创建 Blob 对象，你可以使用以下几种方法：

### 1. 使用 Blob 构造函数

```javascript
const blob = new Blob(array, options)
```

- `array`参数是一个数组，用于存储 Blob 对象的数据内容。它可以包含多种数据类型，如字符串、ArrayBuffer、ArrayBufferView、Blob 等。

- `options`参数是一个可选的对象，用于指定其他属性，比如 MIME 类型等。

示例：创建了一个包含文本数据的 Blob 对象。

```javascript
const parts = ['Hello', 'World']
const options = { type: '/plain' }
const blob = new Blob(parts, options)
```

### 2. 使用 BlobBuilder（在老版本的浏览器中）：

使用 BlobBuilder 来创建 Blob 对象。

```javascript
const bb = new BlobBuilder()
bb.append('Hello')
bb.append('World')
const blob = bb.getBlob('text/plain')
```

请注意，在现代的浏览器中，BlobBuilder 已被弃用，建议使用 Blob 构造函数。

## 四. Blob 常见操作

Blob 对象有一些常见的操作，包括：获取 Blob 的大小和类型，读取相关数据，切片操作，转换为其它格式，我们分别看一下是如何操作的。

### 1. 获取 Blob 对象的大小

使用 `size` 属性可以获取 Blob 对象的大小，单位为字节。

```javascript
const parts = ['Hello', 'World']
const options = { type: 'text/plain' }
const blob = new Blob(parts, options)
const size = blob.size
console.log(size) // 输出 Blob 对象的大小
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01777c03058e40118429d813d7437759~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=874&h=155&s=38451&e=png&b=fdfdfd)

### 2. 获取 Blob 对象的类型

使用 `type` 属性可以获取 Blob 对象的 MIME 类型。

```javascript
const parts = ['Hello', 'World']
const options = { type: 'text/plain' }
const blob = new Blob(parts, options)
const type = blob.type
console.log(type) // 输出 Blob 对象的类型
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/917750acbab0476bbe49833e15083e3f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=874&h=155&s=39654&e=png&b=fdfdfd)

### 3. 读取 Blob 对象的数据

可以使用 FileReader 对象来读取 Blob 对象的数据。通过调用 `readAsText()`、`readAsArrayBuffer()`、`readAsDataURL()` 方法，可以将 Blob 对象的数据转换为文本、ArrayBuffer 或 Data URL。

```javascript
const reader = new FileReader()

reader.onload = function (e) {
  const result = reader.result
  console.log(result) // 输出读取到的数据
}

reader.readAsText(blob) // 以文本格式读取 Blob 对象的数据
```

### 4. 切片 Blob 对象

可以使用 `slice()` 方法将 Blob 对象切片成多个片段。该方法接受起始位置和结束位置作为参数，返回切片后的 Blob 对象。

```javascript
const start = 0
const end = 1024
const slice = blob.slice(start, end)
```

### 5. 转换 Blob 对象为其他格式

可以通过调用 `blob.arrayBuffer()`、`blob.text()`、`blob.stream()` 方法将 Blob 对象转换为 ArrayBuffer、文本或可读流。

```javascript
blob.arrayBuffer().then(function (arrayBuffer) {
  console.log(arrayBuffer) // 输出 ArrayBuffer
})

blob.text().then(function (text) {
  console.log(text) // 输出文本
})

const readableStream = blob.stream()
console.log(readableStream) // 输出可读流
```

### 6. 创建 URL 对象

可以使用 `URL.createObjectURL()` 方法将 Blob 对象转换为可供下载或展示的 URL 对象。

```javascript
const parts = ['Hello', 'World']
const options = { type: 'text/plain' }
const blob = new Blob(parts, options)
const url = URL.createObjectURL(blob)
console.log(url) // 输出 URL 对象
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0170b9b5682f401f955a9e98625fe3ec~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=874&h=139&s=22860&e=png&b=fefefe)

需要注意的是，使用完 Blob 对象后，为了释放资源，需要调用 `URL.revokeObjectURL()` 方法来释放创建的 URL 对象。

```javascript
URL.revokeObjectURL(url)
```

这些是 Blob 对象的常见操作，根据具体的需选择相应的方法来处理 Blob 对象。

## 五. Blob 的读取和使用

读取和使用 Blob 对象有以下几种常见方式：

### 1. 文本数据读取

可以使用 `FileReader` 对象来读取 Blob 对象中的文本数据。

```javascript
const reader = new FileReader()

reader.onload = function (e) {
  const text = reader.result
  console.log('Read Success：' + text) // 输出读取到的文本数据
}

const parts = ['Hello', 'World']
const options = { type: 'text/plain' }
const blob = new Blob(parts, options)

reader.readAsText(blob) // 以文本格式读取 Blob 对象的数据
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b48149bdd8394e7dacba15f8682a0762~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=874&h=126&s=18931&e=png&b=ffffff)

### 2. 二进制数据读取

如果 Blob 对象包含二进制数据，可以使用 `FileReader` 对象的 `readAsArrayBuffer()` 方法将其读取为 `ArrayBuffer` 对象。

```javascript
const reader = new FileReader()

reader.onload = function (e) {
  const arrayBuffer = reader.result
  console.log(arrayBuffer) // 输出读取到的二进制数据（ArrayBuffer 对象）
}

reader.readAsArrayBuffer(blob) // 以二进制格式读取 Blob 对象的数据
```

### 3. 传递 Blob 对象

在某些场景下，可以将 Blob 对象作为请求体的数据进行传递，比如上传文件等。可以使用 `XMLHttpRequest` 或 `fetch` API 来发送请求。
使用 `XMLHttpRequest` 的示例：

```javascript
const xhr = new XMLHttpRequest()
xhr.open('POST', '/upload', true)
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log('文件上传成功')
  }
}
xhr.send(blob)
```

或者使用 `fetch` API 的示例：

```javascript
fetch('/upload', {
  method: 'POST',
  body: blob
}).then(response => {
  console.log('文件上传成功')
})
```

注意，以上示例中的 `/upload` 是上传文件的接口，具体的接口地址需要根据实际的后端逻辑来确定。

以上是读取和使用 Blob 对象的一些常见方式，具体的使用方式会根据实际需求而有所不同。

## 六. 如何合理使用 Blob 对象

下面总结一下使用 Blob 的注意事项，合理使用 Blob 对象需要考虑以下几个方面：

### 1. 数据类型选择

Blob 对象可以保存各种类型的数据，包括文本、二进制、音视频等。在使用 Blob 对象时，需要根据实际的需求选择合适的数据类型。如果要保存文本数据，可以使用 `new Blob([text], { type: 'text/plain' })`，如果要保存二制数据，可以使用 ` Blob([arrayBuffer], { type: 'application/octet-stream' })`。

### 2. 数据处理

使用 Blob 对象时，可能需要对数据进行一些处理，比如压缩、裁剪、转换等。可以通过相应库或工具来处理数据，如使用 Canvas API 对图片进行裁剪和压缩，使用音视频编解码库进行格式转换等。

### 3. 内存管理

在使用 Blob 对象时，需要注意内存管理，避免占用过多内存致性能问题。特是处理大文件时，可以考虑分片上传或分段读取，减小内存占用。

### 4. 销毁 Blob URL

如果使用 `URL.createObject()` 创建了 Blob URL，需要在不再使用时及时调用 `URL.revokeObjectURL()` 销毁 Blob URL，以释放浏览器内存资源。

### 5. 浏览器兼容性

Blob 对象在现代浏览器中得到很好的支持，但某些旧版本的浏览器可能存在兼容问题。在使用 Blob 对时，需要仔细考虑目标用户的浏览器环境，并确定是否需要提供兼容的替代方案。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba77948aa338467ebca50ae948e6c75c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=980&h=450&s=236607&e=png&b=ece1c8)

总的来说，合理使用 Blob 对象需要根据具体的需求和场景来决定数据类型、数据处理方式以内存管理策略。，要关注浏览器兼容性，并及时销毁不再使用的 Blob URL，确保应用程序的性能和稳定性。

## 参考文档

[Blob - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

<ArticleFooter link="https://juejin.cn/post/7306694295246585895" />
