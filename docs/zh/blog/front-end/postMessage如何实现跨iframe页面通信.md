---
title: postMessage 如何实现跨 iframe 页面通信？
---

# postMessage 如何实现跨 iframe 页面通信？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d553ad965374d41ac7cfadbc7d235b6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=722&h=309&s=93876&e=png&b=3eb1fe)

## 一. 引言

在前端页面开发中，随着我们的网页越来越复杂且功能丰富，我们经常会使用 iframe 元素将其他网页嵌入到当前页面中，以实现页面的划分和模块化。iframe 提供了一种有效的方式来将不同的功能模块或第三方组件集成到主页面中。

然而，随之而来的问题是，当我们需要实现跨 iframe 页面的通信时，就会遇到一些挑战。毕竟，iframe 与主页面是分离的文档，它们可能会存在跨域的限制。这就引出了一个问题：如何在不同的 iframe 页面之间进行**数据传递**、**事件触发**和**函数调用**呢？

传统的方法和技术无法直接在不同的 iframe 页面之间进行通信，因为它们被浏览器的同源策略和跨域的限制所约束。

接下来，我们将一块去探索跨 iframe 页面通信的解决方案。常见的通信方法有如窗口消息传递、postMessage API 和 SharedWorker 等，本文将首要介绍如何使用 postMessage API 实现跨 iframe 页面通信。

## 二. postMessage

在跨 iframe 页面通信的解决方案中，postMessage API 是一种通用且可靠的方法，它允许在不同窗口间进行安全的消息传递。

**基本原理**

postMessage API 提供了一种通过窗口对象来发送消息的机制。通过使用 postMessage，我们可以在不同的 iframe 页面之间传递数据，触发特定事件或调用固定函数。

以下是基本的使用原理步骤：

### 1. 获取目标窗口对象

在发送消息之前，我们需要获取目标 iframe 页面的窗口对象。可以使用 `window.parent` 或 `window.frames[]` 等方法来获取嵌套 iframe 页面的窗口对象。

### 2. 发送消息

使用 postMessage API 向目标窗口对象发送消息。该 API 接受两个参数，第一个参数是要发送的消息内容，可以是字符串或 JSON 对象；第二个参数是目标窗口的 origin，用于验证目标窗口的来源。

例如，可以使用下面的代码将消息发送给目标窗口：

```javascript
const targetWindow = window.frames['targetIframe'].contentWindow
const message = 'Hello, iframe!'
const targetOrigin = 'https://example.com'
targetWindow.postMessage(message, targetOrigin)
```

### 3. 接收消息

在目标窗口中，通过注册 message 事件监听器来接收消息。当收到消息时，可以通过 event.data 来获取传递的消息内容。

例如，可以使用如下代码来接收消息：

```javascript
window.addEventListener('message', function (event) {
  if (event.origin === 'https://example.com') {
    const message = event.data
    console.log('Received message:', message)
  }
})
```

由此可见，postMessage API 是一种强大且灵活的方法，可以让我们在不同的 iframe 页面之间实现可靠和安全的通信。但需要注意的是，为了确保数据的完整性和安全性，我们需要在代码中实现适当的验证和过滤，并对传递的数据进行适当的处理和解析。

接下来，我们将介绍更多关于窗口消息传递的实践技巧，包括数据传递、事件触发和函数调用的具体实现方法。通过这些技巧，我们将能够更方便地在跨 iframe 页面间实现复杂的通信和交互。

## 三. 通信技巧

在前面我们介绍了使用 postMessage API 实现 iframe 之间消息传递的基本原理。接下来，我们将进一步探讨如何使用这一方法来实现具体的数据传递、事件触发和函数调用。

### 1. 数据传递

在跨 iframe 页面间传递数据时，我们可以在消息中包含数据内容。这可以是简单的字符串，也可以是复杂的 JSON 对象。

发送消息的页面可以将数据作为消息的内容发送给目标 iframe 页面，而目标页面可以使用 event.data 来获取接收到的数据。

发送页面：

```javascript
const targetWindow = window.frames['targetIframe'].contentWindow
const data = { message: 'Hello, iframe!', value: 42 }
const targetOrigin = 'https://example.com'
targetWindow.postMessage(data, targetOrigin)
```

接收页面：

```javascript
window.addEventListener('message', function (event) {
  if (event.origin === 'https://example.com') {
    const data = event.data
    console.log('Received data:', data)
  }
})
```

### 2. 事件触发

除了传递数据，我们还可以通过触发特定的事件来实现 iframe 页面之间的通信。在发送页面中，我们可以使用 postMessage API 触发自定义的事件，而接收页面可以监听这些事件并做相应的处理。

发送页面：

```javascript
const targetWindow = window.frames['targetIframe'].contentWindow
const eventName = 'customEvent'
const eventData = { message: 'Hello, iframe!' }
const targetOrigin = 'https://example.com'
targetWindow.postMessage({ event: eventName, data: eventData }, targetOrigin)
```

接收页面：

```javascript
window.addEventListener('message', function (event) {
  if (event.origin === 'https://example.com') {
    const { event: eventName, data: eventData } = event.data
    if (eventName === 'customEvent') {
      console.log('Received custom event:', eventData)
    }
  }
})
```

### 3. 函数调用

除了传递数据和触发事件，我们还可以通过 postMessage API 实现不同 iframe 页面间的函数调用。在发送页面中，我们可以将函数名和参数作为消息内容发送给目标页面。接收页面可以根据接收到的消息内容来执行相应的函数。

发送页面：

```javascript
const targetWindow = window.frames['targetIframe'].contentWindow
const methodName = 'addNumbers'
const methodArgs = [2, 3]
const targetOrigin = 'https://example.com'
targetWindow.postMessage({ method: methodName, args: methodArgs }, targetOrigin)
```

接收页面：

```javascript
window.addEventListener('message', function (event) {
  if (event.origin === 'https://example.com') {
    const { method: methodName, args: methodArgs } = event.data
    if (methodName === 'addNumbers') {
      const result = addNumbers(...methodArgs)
      console.log('Result:', result)
    }
  }
})
```

这需要保证目标页面中存在所调用的函数，并且函数的执行结果可以传回给发送页面。

通过这些实践技巧，我们可以在跨 iframe 页面之间实现更加复杂和灵活的通信。无论是简单的数据传递、事件触发还是函数调用，我们可以使用 postMessage API 在不同的 iframe 页面之间实现可靠、安全和高效的通信机制。

## 四. 安全性考虑

确保消息的安全性和有效性是使用窗口消息传递时的重要考虑因素。那么如何确保消息的安全性与有效性？

### 1. 验证消息来源

在接收消息的页面中，我们应该验证消息的来源是否是可信的。使用 event.origin 属性可以获取消息的来源，我们可以通过与预期的来源进行比较来验证消息的合法性。如果来源不匹配，我们可以选择忽略该消息或采取其他适当的安全措施。

```javascript
window.addEventListener('message', function (event) {
  if (event.origin !== 'https://example.com') {
    // 不是预期的来源，忽略消息或采取其他安全措施
    return
  }
  // 执行消息处理逻辑
})
```

### 2. 限制消息处理范围

我们可以限制消息的处理范围，以确保消息只在预定的接收页面中进行处理。在接消息的页面中，可以通过判断窗口对象的来源、位置或其他属性来验证它是否是预期的收页面。如果验证失败我们可以选择忽略消息或采取其他适当的安全措施。

```javascript
// 判断是否在预期的接收页面中处理消息
if (window.location.href !== 'https://example.com/receive.html') {
  // 忽略消息或采取其他安全措施
  return
}
```

### 3. 加密消息内容

对于敏感数据，我们可以在发送消息时进行加密，以确保数据的机密性。可以使用加密算法（如 AES、RSA 等）对消息内容进行加密，发送方和接收方之间共享密钥来进行解密。这样可以防止数据在传输过程中被恶意篡改或窃取。

### 4. 过滤和验证消息内容

在接收的页面中，我们应该对消息内容进行过滤和验证，以确保接收到的数据的完整性和有效性。可以使用合适的数据验证和解析方法（比如 JSON 解析器）来处理数据，以防止由于恶意数据导致的安全漏洞（如 XSS 攻击）。

```javascript
window.addEventListener('message', function (event) {
  if (event.origin === 'https://example.com') {
    const data = event.data
    // 进行数据验证和解析，确保数据的有效性和完整性
    if (isValidData(data)) {
      // 执行消息处理逻辑
    }
  }
})
```

综上所述，确保消息的安全性和有效性需要在代码中实施相应的安全措施。通过验证消息来源、限制消息处理范围、加密敏感数据、过滤和验证消息内容以及定义安全通信策略，我们可以确保窗口消息传递的安全性，并防止潜在的安全漏洞。

## 五. 使用场景

窗口消息传递适用于同源或跨域的 iframe 页面通信。下面是不同场景的示例：

### 1. 同源 iframe 页面通信

如果你的应用中存在同源的 iframe 页面，它们拥有相同的协议、主机和端口，那么你可以轻松地使用窗口消息传递实现它们之间的通信。这种情况下，消息可以直接通过 postMessage API 在不同的 iframe 页面之间传递。

```javascript
// 发送页面 - 同源 iframe 页面通信
const targetIframe = document.getElementById('targetIframe').contentWindow
const message = 'Hello, iframe!'
targetIframe.postMessage(message, '*')
```

```javascript
// 接收页面 - 同源 iframe 页面通信
window.addEventListener('message', function (event) {
  const message = event.data
  console.log('Received message:', message)
})
```

### 2. 跨域 iframe 页面通信

如果你的应用中存在跨域的 iframe 页面，它们拥有不同的协议、主机或端口，那么你需要在通信时处理跨域安全性限制。在发送消息时，你需要指定接收消息的窗口的 origin（来源），接收方需要验证消息的来源是否匹配预期的安全来源。

```javascript
// 发送页面 - 跨域 iframe 页面通信
const targetIframe = document.getElementById('targetIframe').contentWindow
const message = 'Hello, iframe!'
const targetOrigin = 'https://example.com'
targetIframe.postMessage(message, targetOrigin)
```

```javascript
// 接收页面 - 跨域 iframe 页面通信
window.addEventListener('message', function (event) {
  if (event.origin === 'https://example.com') {
    const message = event.data
    console.log('Received message:', message)
  }
})
```

在这两种场景下，窗口消息传递提供了一种简单且有效的方式来实现同源或跨域的 iframe 页面通信。通过 postMessage API，你可以发送各种类型的数据、触发自定义事件和执行函数调用，实现更复杂的通信需求。请注意，在跨域通信中要特别注意安全性，并进行适当的消息验证和限制。

## 六. 安全性保障

在上文中，已经提及到了一些通信时候的安全性考虑事项，包括：验证消息来源、限制消息处理范围、加密消息内容等等，下面我们结合上面的的一些考虑总结一下安全性保障的最佳实践。

### 1. 域名白名单验证

在父页面和子页面之间进行跨域通信时，可以通过验证消息的来源域名，只接受来自特定域名的消息。这样可以防止恶意注入和攻击者冒充其他域名发送消息。

示例代码：

```javascript
var allowedDomains = ['http://example.com']
window.addEventListener('message', function (event) {
  if (allowedDomains.includes(event.origin)) {
    console.log(event.data)
  }
})
```

在这个示例中，`allowedDomains` 数组中列出了被允许的域名。在监听 `message` 事件时，只有当事件的 `origin` 属性在白名单中时，才处理接收到的消息。

### 2. 配置正确的 `targetOrigin` 参数

在使用 `postMessage` 发送消息时，应尽量明确指定目标源(`targetOrigin` 参数)，以避免消息被发送到不受信任的页面。

示例代码：

```javascript
var iframe = document.getElementById('child').contentWindow
iframe.postMessage('Hello from parent', 'http://example.com')
```

在这个示例中，将消息发送给子页面时，将目标源指定为 `http://example.com`，即只允许该域名下的页面接收到消息。

### 3. 消息内容验证

在接收到消息后，对消息内容进行验证，确保只处理合法的消息。可以对消息的格式、内容进行验证，防止恶意的脚本注入或其他攻击。

示例代码：

```javascript
window.addEventListener('message', function (event) {
  var message = event.data
  if (typeof message === 'string' && message.startsWith('Hello')) {
    console.log(message)
  } else {
    // 拒绝处理不合法的消息
  }
})
```

在这个示例中，只有当接收到的消息是以 "Hello" 开头的字符串时，才会处理该消息，否则会拒绝处理。

### 4. 阻止不必要的子页面间通信

限制不同的子页面之间的通信，只允许父页面与特定的子页面进行通信。这可以通过配置 `X-Frame-Options` 和 Content Security Policy（CSP）等安全头来实现。这些安全头可以防止将页面嵌入到其他域下的 iframe 中，从而减少恶意注入和攻击的风险。

示例代码（通过设置 `X-Frame-Options`）：

```
X-Frame-Options: SAMEORIGIN
```

在这个示例中，通过设置 `X-Frame-Options` 为 `SAMEORIGIN`，限制只允许当前页面在相同域名下的 iframe 中进行嵌入，防止在其他域下的 iframe 中进行嵌入。

综上所述，通过域名白名单验证、正确配置目标源参数、消息内容验证和阻止不必要的子页面间通信等措施，可以有效地保障跨 iframe 页面通信的安全性，防止恶意注入和攻击。

## 总结

在本文中，我们详细分析了通过 postMessage API 跨 iframe 页面通信的实现方法和技术。无论是同域跨 iframe 通信，还是跨域跨 iframe 通信，以上都提供了常用的解决方案和示例代码。

通过 postMessage API，我们可以实现 iframe 之间的数据传递、事件处理和共享资源。不论是在单页面应用中，还是在多个独立页面之间，跨 iframe 页面通信都能够为我们带来更加灵活、高效的交互和协作方式。

然而，在实践中，我们也需要注意安全性和性能方面的考虑。在跨域通信中，要确保信任的源站点，并采取适当的安全措施，防止恶意注入和攻击。同时，还要控制跨 iframe 通信的频率和数据量以保证性能和用户体验。

总的来说，跨 iframe 页面通信是一项非常有价值的技术，可以解决前端应用中的许多实际问题。我们应该根据实际需求选择合适的通信方法，并加以灵活运用。通过合理的设计和技术实现，我们可以打破页面边界，创造出更加强大、富有交互性的前端应用。

## 参考资料

- [postMessage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

<ArticleFooter link="https://juejin.cn/post/7305986100098695209" />
