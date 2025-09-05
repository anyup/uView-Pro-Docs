---
title: 深入浅出Promise，循序渐进掌握JavaScript异步编程
---

# 深入浅出Promise，循序渐进掌握JavaScript异步编程

## 一. Promise 基本用法

**Promise** 是 JavaScript 中处理异步操作的一种方式。它是一个对象，代表了一个异步操作的最终完成或失败的结果。

Promise 有三种状态： **pending （进行中）**、 **fulfilled （已成功）** 和 r**ejected （已失败）**。一旦 Promise 的状态变为 fulfilled 或 rejected ，就称为 resolved （已解决）。在 resolved 状态下， Promise 的结果值就被确定了。

![fileOf7174.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a34ffa117604ca09f4c8fff2e864033~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=951&h=508&e=png&b=fefbfe)

Promise 的基本用法如下：

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作...
  if (/* 异步操作成功 */) {
    resolve(result); // 将结果传递给resolve函数
  } else {
    reject(error); // 将错误信息传递给reject函数
  }
});

promise
  .then(result => {
    // 处理异步操作成功的结果
  })
  .catch(error => {
    // 处理异步操作失败的结果
  });
```

在上面的示例中，我们创建了一个 Promise 对象，并在构造函数中传入一个执行器函数（`executor function`）。执行器函数接受两个参数， resolve 和 reject 函数，用于将 Promise 的状态改变为 fulfilled 或 rejected 。

执行器函数中进行异步操作，当异步操作成功时，调用 resolve 函数传递结果值；当异步操作失败时，调用`reject`函数传递错误信息。

接着，我们通过调用 Promise 的`then`方法来设置异步操作成功时的回调函数，并通过`catch`方法来设置异步操作失败时的回调函数。`then`方法可以链式调用，每个`then`方法都返回一个新的 Promise 实例，因此可以实现连续的异步操作。

除了`then`和`catch`方法外， Promise 还提供了一些其他的方法，如`finally`方法、`Promise.all`、`Promise.race`等，用于处理更复杂的异步操作场景。

需要注意的是， Promise 的状态一旦改变就不会再改变。因此，即使异步操作完成后再次调用 resolve 或 reject 函数，也不会对 Promise 的状态产生影响。

![fileOf7174.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9ea91f9a2eb4dfc9c2adcc802a8a1bf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1334&h=602&e=png&b=ffffff)

## 二. Promise 的高级用法

除了以上介绍基本的用法外， Promise 还提供了一些高级的用法，下面介绍几个常用的高级用法：

1. **Promise.all**: `Promise.all`方法接收一个由 Promise 实例组成的数组作为参数，并返回一个新的 Promise 实例。该新的 Promise 实例在数组中的所有 Promise 实例都变为`fulfilled`状态后，才会变为`fulfilled`状态，并将每个 Promise 实例的结果值组成一个数组传递给回调函数。

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(results {
    console.log(results); // [1, 2, 3]
  });
```

2. **Promise.race**: `Promise.race`方法同样接收一个由 Promise 实例组成的数组作为参数，并返回一个新的 Promise 实例。该新的 Promise 实例在数组中的第一个 Promise 实例变为`fulfilled`或`rejected`状态后，即变为对应的状态，并将第一个 Promise 实例的结果（或错误信息）传递给回调函数。

```javascript
const promise1 = new Promise(resolve => {
  setTimeout(() => resolve('Promise 1'), 2000)
})

const promise2 = new Promise(resolve => {
  setTimeout(() => resolve('Promise 2'), 1000)
})

Promise.race([promise1, promise2]).then(result => {
  console.log(result) // Promise 2
})
```

3. `Promise.resolve`: `Promise.resolve`方法返回一个新的 Promise 实例，该实例的状态为`fulfilled`，并将传递的值作为结果。

4. `Promise.reject`：`Promise.reject`方法返回一个新的 Promise 实例，该实例的状态为 rejected，并将传递的值作为错误信息。

```javascript
const promise1 = Promise.resolve('resolved')
promise1.then(result => {
  console.log(result) // resolved
})

const promise2 = Promise.reject(new Error('rejected'))
promise2.catch(error => {
  console.error(error) // Error: rejected
})
```

5. `Promise.prototype.finally`: `Promise.prototype.finally`方法用于指定不管 Promise 状态如何，都会执行的回调函数。该方法返回一个新的 Promise 实例，它在回调函数执行完毕后，根据之前 Promise 实例的状态，变为对应的状态。

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('done')
  }, 1000)
})

promise
  .then(result => {
    console.log(result) // done
  })
  .catch(error => {
    console.error(error)
  })
  .finally(() => {
    console.log('finally') // finally
  })
```

除了上述介绍的方法外，Promise 还提供了很多其他的方法，如`Promise.allSettled`、`Promise.any`等，用于处理更复杂的异步操作场景。

## 三. Promise 的异步编程场景

以下是一些 Promise 的异步编程场景的例子：

1. **发起网络请求**：当需要从服务器获取数据时，可以使用 Promise 来发起异步网络请求。通过使用 Promise 封装`XMLHttpRequest`或`fetch API`，我们可以在请求完成后，通过`then`方法处理返回的数据或错误信息。

```javascript
function getData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)

    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.statusText))
      }
    }

    xhr.onerror = function () {
      reject(new Error('Network Error'))
    }

    xhr.send()
  })
}

getData('https://api.example.com/data')
  .then(response => {
    console.log('Data:', response)
  })
  .catch(error => {
    console.error('Error:')
  })
```

2. **并行执行多个异步操作**：当需要同时执行多个异步操作，并在所有操作都完成后进行处理时，可以使用`Promise.all`方法。`Promise.all`接受一个包含多个 Promise 对象的数组作为参数，并返回一个新的 Promise 对象，当所有 Promise 都解决（`fulfilled`）时，返回的 Promise 对象也将解决（`fulfilled`），并提供一个包含所有解决值的数组。

```javascript
const loadData = () => {
  const request1 = getData('https://api.example.com/data1');
  const request2 = getData('https://api.example.com/data2');
  const request3 = getData('https://api.example.com/data3');

  return Promise.all([request1, request2, request3]);
};

loadData()
  .then(dataArr => {
    console.log('Data 1:', dataArr[0]);
    console.log('Data 2:', dataArr[1]);
    console.log('Data 3 dataArr[2]);
   .catch(error => {
    console.error('Error:', error);
  });
```

3. **异步操作的串执行**：当需要按照顺序依次执行一系列异步操作，且每个操作依赖上一个操作的结果时，可以通过`then`方法的链式调用来实现。每个`then`方法中返回一个新的 Promise 对象，用于传递上一个操作的结果给下一个操作。

```javascript
getData('https://api.example.com/data1')
  .then(response1 => {
    console.log('Data 1:', response1)
    return getData('https://api.example.com/data2')
  })
  .then(response2 => {
    console.log('Data 2:', response2)
    return getData('https://api.example.com/data3')
  })
  .then(response3 => {
    console.log('Data 3:', response3)
  })
  .catch(error => {
    console.error('Error:', error)
  })
```

这些例子展示了 Promise 在异步编程中的一些应用场景，包括网络请求、并行执行和串行执行等。通过合理利用 Promise 的特性，我们可以实现更优雅、可读性更高的代码。

![fileOf7174.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b09afc28c2ec4fcdbe01c4c71e126350~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1032&h=689&e=png&b=fefefe)

## 四. Promise 的影响

Promise 的出现对`JavaScript`编程带来了以下几个重要的贡献：

1. **处理异步操作**：`JavaScript`是单线程的，异步操作的处理一直是发者们头疼的问题。而 Promise 通过提供一种构化的方式来处理异步操作，避免了回调地狱（`callback hell`）的问题。 Promise 的链式调用使得异步操作可以按照顺序执行，提高了代码的可读性和可维性。

2. **错误处理**：传统的回调函数方式对错误处理较为繁琐，容易出现遗漏或混乱。而 Promise 通过`catch`方法提供了统一的错误处理机制，使得错误处理变得简洁明了。同时， Promise 还可以将同步代码和异步代码的错误处理方式统一起来，提高了的一致性。

3. **并行操作**： Promise 的些高级方法如`Promise.all`和`Promise.race`，使得并行操作变得更加简单。开发者可以很方便地将多个异步操作并行执行，并等待它们全部完成或任一完成后继续进行后续处理。

4. **更好的代码组织**： Promise 的链式调用可以使代码逻辑更加清晰可读。通过将异步操作按照顺序连接起来，能够更好地组织，易于理解和维护。

总的来说， Promise 的出现使得`JavaScript`在处理异步操作方面变得更加简洁、可读、可维护，提高了开发效率和代码质量。它改变了`JavaScript`编程的方式，成为现代异步程的重要工具之一。

## 五. Promise 实现的基本原理

Promise 的源码实现原理可以简要概括如下：

1. **构造函数**： Promise 是一个构造函数，当我们使用`new`关键字创建一个 Promise 对象时，会调用构造函数。构造函数接受一个`executor`函数作为参数，`executor`函数在 Promise 对象的实例化过程中立即执行，它接受两个参数：`resolve`和`reject`。

2. **状态管理**： Promise 对象有三个状态：`pending`、`fulfilled`和`rejected`。初始状态为`pending`，执行`executor`函数时可以调用`resolve`函数将状态从`pending`转为`fulfilled`，或调用`reject`函数将状态从`pending`转为`rejected`。同时， Promise 对象还有一个内部属性`value`用于保存`resolve`函数传递的值，或`reason`来保存`reject`函数传递的错误信息。

3. **回调函数**： Promise 对象可以通过`then`、`catch`和`finally`等方法注册回调函数，处理异步操作的结果或错误信息。`then`方法用于注册成功的回调函数，`catch`方法用于注册失败的回调函数，`finally`方法则用于注册无论成功或失败都会被调用的回调函数。

4. **异步操作**： Promise 的实现中，可以通过`setTimeout`和`setImmediate`等宏任务和微任务的方法进行异步操作的处理。在和`reject`函数被调用时，会根据状态的变化，将对应的回调函数添加到任务队列中，并在适当的时候执行。

5. **链式调用**：通过`then`方法的链式调用，可以将多个异步操作按顺序组织起来。当一个 Promise 对象的状态变为`fulfilled`时，会执行当前`then`方法的回调函数，并将回调函数的返回值作为下一个`then`方法的参数。

总的来说， Promise 的源码实现原理是通过构造函数实例化 Promise 对象，在对象中管理状态、回调函数和异步操作。通过`then`、`catch`和`finally`等方法来注册和执行回调函数，实现了异步操作的顺序控制和错误处理。具体实现会涉及到一些细节，例如任务队列的管理和错误处理的机制，这些都是 Promise 的实现细节。

## 六. Promise 和 SetTimeout 的区别

Promise 和`setTimeout`在处理异步操作时有一些区别：

1. **功能和用途**： Promise 是一种用于处理异步操作的对象，它提供了一种更优雅和可靠的方式来处理异步操作的结果和错误。 Promise 可以用于处理异步操作的流程控制，以及实现依赖关系和顺序执行。而`setTimeout`是浏览器提供的一个函数，用于在指定的时间间隔后执行一次回调函数或代码。

2. **结构和调用方式**： Promise 是一个对象，它有自己的方法和状态。我们通过`new`关键字创建 Promise 实例，并通过`then`、`catch`和`finally`等方法来注册回调函数。而`setTimeout`是一个函数，我们可以直接调用它，传递回调函数和延时时间。

3. **错误处理**： Promise 提供了更完善的错误处理机制。我们可以通过注册`catch`方法来捕获并处理 Promise 中的错误信息。而`setTimeout`只能通过`try-catch`语句块来处理回调函数中可能发生的错误。

4. **异步操作的控制和组织**： Promise 允许我们通过串行地、并行地和异步地组织和控制异步操作的流程。通过使用 then 方法的链式调用，我们可以按照期望的次序执行异步操作，并处理它们的结果。而`setTimeout`只能用于延时执行一次回调函数，并没有提供更高级的流程控制和依赖管理。

5. **可读性和可维护性**： Promise 的代码往往更加可读、简洁和易于维护。通过链式调用的方式，我们可以将异步操作按照顺序组织起来，并在每一步都进行必要的处理。而`setTimeout`的代码往往需要通过回调函数的嵌套来处理多个异步操作，使代码变得复杂和难以理解。

综上所述， Promise 和`setTimeout`在处理异步操作时的功能、用途、结构和调用方式、错误处理、控制和组织方式等方面有一些区别， Promise 更加灵活强大，能够提供更好的异步编程体验。

<ArticleFooter :link="['juejin::https://juejin.cn/post/7272231877078794295', 'weixin::https://mp.weixin.qq.com/s/0wUOm2R7djuEaLkrxbUv6g']" />
