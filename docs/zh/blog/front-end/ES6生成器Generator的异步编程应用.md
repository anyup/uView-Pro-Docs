---
title: 探索 ES6 生成器 ( Generator ) 的异步编程应用
---

# 探索 ES6 生成器 ( Generator ) 的异步编程应用

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60e2fbd15eac4a4daa7732142325be32~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=651&h=363&s=292954&e=png&b=f2bb07)

## 一. 前言

在之前的文章中，我们介绍了生成器函数的基本概念和常见应用，包括异步操作的顺序执行、控制异步流程等，同时也了解到 Promise 和生成器结合的应用可以帮助我们更方便地处理异步操作。详细了解请参考之前的文章：

[学习 ES6 生成器 ( Generator ) ：掌握优雅的异步编程利器](https://juejin.cn/post/7302254338855206931)

然而，生成器函数的应用不仅限于此，它还有一些比较高级的应用，可以用于实现并发控制，使用生成器实现可取消的异步操作等等，以提高代码的性能和效率。在本文中，我们将介绍生成器的这些高级应用。

在介绍生成器的应用之前，我们先介绍几种生成器中的错误处理方法，在生成器中处理错误也是一种重要的机制，可以有效地捕获和处理异步操作中的错误。在接下来的异步编程应用中，我们会常常会用到如何处理异常信息。

## 二. 生成器中的错误处理

### 1. try...catch 语句

在生成器函数中处理错误可以借助于`try...catch`语句。通过在生成器函数中使用`try...catch`语句，可以捕获异步操作中的错误并采取相应的处理措施。

下面是一个示例，展示了在生成器函数中处理错误的方法：

```javascript
function* asyncGenerator() {
  try {
    const result = yield asyncOperation() // 进行异步操作

    console.log('异步操作结果：', result)
  } catch (error) {
    console.error('发生错误：', error)
  }
}

function asyncOperation() {
  return new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
      const success = Math.random() >= 0.5
      if (success) {
        resolve('成功结果')
      } else {
        reject(new Error('操作失败'))
      }
    }, 1000)
  })
}

const asyncFlow = asyncGenerator()
const { value, done } = asyncFlow.next()

if (!done) {
  value
    .then(data => {
      asyncFlow.next(data)
    })
    .catch(error => {
      asyncFlow.throw(error)
    })
}
```

在上述示例中，我们定义了一个生成器函数`asyncGenerator`，其中使用了`try...catch`语句来捕获可能发生的异步操作内的错误。

在`asyncGenerator`函数中，我们通过`yield`关键字将异步操作`asyncOperation`进行了挂起。当异步操作完成后，将结果传递给生成器函数的`yield`语句。

在外部，我们通过调用`asyncGenerator`函数并获取生成器对象后，使用`next()`方法将生成器函数的执行推进一步。然后，我们通过判断生成器对象的`done`属性来判断是否所有步骤都已完成。如果未完成，我们根据`value`属性是`Promise`对象还是错误对象来处理下一步是`next()`还是`throw()`。

在上述示例中，`asyncOperation`函数是一个模拟异步操作的函数，它返回一个`Promise`对象，模拟异步操作的成功或失败。在异步操作中，`resolve`被调用时会传递成功结果，`reject`被调用时会传递错误信息。

执行结果如下图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a1d7838de5341ddb92c8fb285a53356~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=186&s=35670&e=png&b=191919)

通过在生成器函数中使用`try...catch`语句，我们可以捕获异步操作中可能发生的错误，并在`catch`块中进行相应的处理。

> 请注意，错误处理是实现稳定的异步代码非常重要的一部分。在实际开发中，你可能还需要结合特定的异步控制库来处理错误，以确保错误能够被正确捕获和处理。

### 2. throw 方法

在生成器函数中，可以使用`throw()`方法来抛出一个错误，并使生成器函数在相应的`catch`语句中暂停执行。

下面是一个示例，展示了使用生成器函数的`throw()`方法和错误处理的方法：

```javascript
function* generatorFunction() {
  try {
    yield 'Step 1'
    yield 'Step 2'
    throw new Error('Something went wrong') // 抛出错误
    yield 'Step 3' // 不会执行到这里
  } catch (error) {
    console.log('Error:', error.message)
    yield 'Step 4'
  }
}

const generator = generatorFunction()
console.log(generator.next().value) // Output: Step 1
console.log(generator.next().value) // Output: Step 2
console.log(generator.throw(new Error('Another error message')).value) // Output: Error: Another error message
console.log(generator.next().value) // Output: Step 4
```

在上述示例中，我们定义了一个生成器函数`generatorFunction`，其中通过`yield`语句定义了一系列的步骤。

在`generatorFunction`中，我们使用了`try...catch`语句来捕获在生成器函数中可能发生的错误。当抛出错误时，生成器函数会立即停止执行，并跳转到相应的`catch`语句中处理错误。在`catch`语句中，我们可以对捕获的错误进行相应的处理。

在外部，我们首先创建了生成器对象`generator`，然后通过`next()`方法来逐步执行生成器函数中的步骤。在第一次调用`next()`之后，生成器函数会执行到第一个`yield`语句，并返回相应的值。

在第二次调用`next()`之后，生成器函数会继续执行到第二个`yield`语句，并返回相应的值。

接着，我们使用`throw()`方法抛出了一个新的错误，并将错误对象作为参数传递给`throw()`方法。生成器函数会立即停止执行，并跳转到相应的`catch`语句中处理错误。我们可以在`catch`语句中对捕获的错误进行相应的处理，并返回相应的值。

在上述示例中，生成器函数在抛出错误后，不会再执行剩余的步骤。通过使用`throw()`方法和相应的错误处理机制，我们可以更好地控制生成器函数的执行流程，并及时处理发生的错误。

执行的结果如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f8d05dd856f46f4a763f932baa80511~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=201&s=23596&e=png&b=181818)

### 3. 利用 Promise 错误处理机制

在生成器中，可以通过返回 reject 状态的 Promise 来处理错误。这种方式非常适合处理异步操作中的错误。下面是详细的说明：

```javascript
function asyncOperation() {
  return new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
      // 模拟执行错误操作
      const error = new Error('An error occurred')
      reject(error)

      // 模拟执行成功操作
      // resolve('Async operation completed');
    }, 2000)
  })
}

function* myGenerator() {
  try {
    const result = yield asyncOperation()
    console.log('Result:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}

const generator = myGenerator()

function handlePromise(result) {
  generator.next(result)
}

function handleError(error) {
  generator.throw(error)
}

generator.next().value.then(handlePromise).catch(handleError)
```

在上面的代码中，`asyncOperation`函数返回一个 Promise 对象，模拟一个异步操作，延迟 2 秒后会进入 reject 状态。在`myGenerator`生成器函数中，我们使用`yield asyncOperation()`来暂停生成器，并返回 Promise 对象。通过`try-catch`语句块，我们可以对错误进行捕获和处理。如果 Promise 对象进入了 reject 状态，错误会被抛到`catch`块中进行处理。

在主程序中，通过调用生成器的`next()`方法，启动生成器的执行。在 Promise 的`then`方法中，调用`handlePromise`函数将结果传递给生成器继续执行。如果 Promise 进入了 reject 状态，错误会被捕获并抛出，从而触发生成器的`catch`块。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6938e7304fe48e3af295362ec497b83~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=201&s=34703&e=png&b=181818)

通过这种方式，我们可以在生成器中实现错误处理逻辑，将异步操作的错误捕获和处理放在生成器内部，使得代码更加简洁和易于阅读。同时，结合 Promise 的错误处理机制，可以保证异步操作的错误能够得到正确地处理和传递。

> 需要注意的是，在处理 Promise 对象时，可以使用 .then 方法获取异步操作的结果，并通过 generator.next()方法将结果返回给生成器。如果 Promise 进入 reject 状态，可以通过 .catch 方法捕获错误并处理。通过这种方式，可以在异步操作中实现错误处理的流程控制。

总之，通过返回 reject 状态的 Promise，可以在生成器中有效地处理异步操作中的错误，并实现错误处理的流程控制。这种方式可以使生成器更加灵活和可靠。

## 三. 生成器的异步编程应用

### 1. 与 async/await 结合使用

生成器函数和`async/await`可以很好地结合使用，以简化异步编程，并使代码更具可读性和可维护性。下面是使用生成器和`async/await`模式处理异步操作的示例：

```javascript
function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('数据')
    }, 1000)
  })
}

function* fetchAsyncData() {
  try {
    const data = yield getData()
    console.log('获取到的数据：', data)

    const moreData = yield getData()
    console.log('更多的数据：', moreData)

    return '完成'
  } catch (error) {
    console.error('发生错误：', error)
    return '出错'
  }
}

async function fetchData() {
  try {
    const generator = fetchAsyncData()
    let result = generator.next()

    while (!result.done) {
      result = await result.value
      result = generator.next(result)
    }

    console.log('最终结果：', result.value)
  } catch (error) {
    console.error('发生错误：', error)
  }
}

fetchData()
```

在上面的示例中，`fetchAsyncData`是一个生成器函数，用于处理异步操作。在生成器函数中，我们使用`yield`关键字暂停执行，并通过`yield`关键字返回一个`Promise`对象，此处使用了`getData`函数模拟异步操作。

在`fetchData`函数中，我们使用`async/await`模式来驱动生成器函数的执行。在`while`循环中，我们使用`await`关键字等待异步操作的结果，并通过`generator.next()`方法将结果传递给生成器函数。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c185840a58f3473e807c1a607e03f243~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=165&s=24992&e=png&b=181818)

生成器函数中的`try...catch`块可以捕获异步操作中的异常情况，确保代码的稳定性。在`catch`块中，我们可以处理错误并返回结果通过结合使用生成器和`async/await`式，我们可以以顺序和分步的方式处理异步操作，使代码更清晰、易读，并且能够很好地处理异常情况。

### 2. 实现可取消的异步操作

使用生成器实现可取消的异步操作可以通过结合使用生成器函数和`yield`语句来实现暂停和恢复异步任务。下面是一个简单的示例：

```javascript
function* cancellableAsyncOperation() {
  try {
    const result = yield new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        resolve('操作完成')
      }, 3000)

      // 注册取消操作的回调函数
      onCancel(() => {
        clearTimeout(timeoutId)
        reject(new Error('操作被取消'))
      })
    })

    console.log(result)
  } catch (err) {
    console.error('操作出错：', err.message)
  }
}

// 取消操作的函数
let cancelCallback = null
function onCancel(callback) {
  cancelCallback = callback
}

// 取消操作的函数调用
function cancelOperation() {
  if (cancelCallback) {
    cancelCallback()
  }
}

// 执行异步操作
const iterator = cancellableAsyncOperation()
const promise = iterator.next().value

promise
  .then(() => {
    console.log('操作完成')
  })
  .catch(err => {
    console.error('操作被取消或出错：', err.message)
  })

// 5秒后取消操作
setTimeout(() => {
  console.log('取消操作')
  cancelOperation()
}, 5000)
```

在这个示例中，我们定义了一个生成器函数`cancellableAsyncOperation`，它模拟一个异步操作的执行过程。在生成器函数内部，我们创建了一个`Promise`对象，并在其中注册了一个定时器来模拟异步操作的延时执行。同时，我们通过`onCancel`函数，注册了一个取消操作的回调函数。

然后，我们定义了一个全局的`cancelCallback`变量，用来保存取消操作的回调函数。

接着，我们通过调用`iterator.next().value`来获取生成器的第一个`yield`表达式返回的`Promise`对象，并通过`then()`和`catch()`方法处理操作的完成和取消或出错的情况。

最后，我们通过`setTimeout`函数，在 5 秒后调用`cancelOperation`函数来取消操作。`cancelOperation`函数会调用之前注册的取消操作的回调函数，从而中断异步操作的执行。

执行流程如下图所示：

![record.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e879984f1c04b28b2df17fa5b5e1148~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=964&h=755&s=139222&e=gif&f=20&b=1c1c1c)

> 需要注意的是，这个示例只是模拟了可取消的异步操作的实现方式。在实际使用中，可能需要根据具体需求和异步操作的性质，进行适当的调整和优化。

### 3. 实现并发控制

在编程中，我们经常需要处理并行执行的任务，例如同时下载多个文件，或者同时发送多个请求。并发控制就是一种管理并行任务执行的机制，它可以控制任务的数量、顺序和结果处理等。

#### 基本原理及步骤

生成器函数提供了一种优雅且灵活的方式来实现并发控制。通过使用生成器函数和 yield 表达式，我们可以轻松地管理多个并发任务的执行，以及处理任务的结果。下面是生成器函数并发控制的基本原理：

- 创建一个生成器函数，该函数包含多个异步任务的生成器调用，并将每个任务包装在 yield 表达式中。
- 通过控制生成器的迭代过程，以及使用异步操作的 Promise 结果，实现任务的并发执行和结果处理。

因此，生成器的并发控制可以通过使用异步操作的 Promise 和生成器函数的特性来实现。下面是一个简单的示例，我们看一下如何使用生成器函数来管理并发任务的执行：

```javascript
// 模拟异步请求
function fetch(url) {
  return new Promise((resolve, reject) => {
    console.log('异步操作执行中：' + url)

    const timer = setTimeout(() => {
      clearTimeout(timer)
      console.log('异步操作完成：' + url)
      resolve({ status: 1, msg: '异步操作完成：' + url, data: null })
    }, 2000)
  })
}

// 生成器函数
function* taskGenerator() {
  const task1 = yield fetch('https://api.example.com/task1')
  const task2 = yield fetch('https://api.example.com/task2')
  const task3 = yield fetch('https://api.example.com/task3')

  console.log(task1)
  console.log(task2)
  console.log(task3)
}

function executeGenerator(generator) {
  const iterator = generator()

  function handle(iteratorResult) {
    if (iteratorResult.done) {
      return Promise.resolve(iteratorResult.value)
    }

    return Promise.resolve(iteratorResult.value)
      .then(res => handle(iterator.next(res)))
      .catch(err => iterator.throw(err))
  }

  try {
    return handle(iterator.next())
  } catch (err) {
    return Promise.reject(err)
  }
}

// 执行任务
executeGenerator(taskGenerator)
  .then(() => {
    console.log('所有任务完成')
  })
  .catch(err => {
    console.error('执行过程中出错：', err)
  })
```

在上面这个示例中，我们定义了一个生成器函数`taskGenerator`，它包含三个异步任务。每个任务使用`yield`语句暂停生成器的执行，等待相应的异步操作结果。

然后，我们定义了一个辅助函数`executeGenerator`，用于执行生成器。在函数内部，我们通过递归调用`handle`函数，依次处理生成器的每个`yield`表达式。其中，`handle`函数接收一个`yield`表达式的结果，并根据结果继续执行生成器的下一个`yield`表达式，直到生成器执行完毕。

最后，我们调用`executeGenerator(taskGenerator)`来执行生成器。在生成器执行过程中，每个任务会并发地执行。当所有任务都完成后，输出“所有任务完成”。如果在执行过程中出现错误，会捕获并输出错误信息。

执行流程如下图所示：

![record.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d40a4489ec414e8d90f9099fa658e945~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=964&h=809&s=288322&e=gif&f=28&b=1c1c1c)

> 需要注意的是，生成器的并发控制是通过顺序执行任务并处理它们的结果来实现的，并非真正的并行执行。如果需要更高级的并行控制，可以结合使用生成器和其他异步编程模式，例如使用`Promise.all()`来同时执行多个任务。

通过以上的代码演示，我们可以实现并发任务的执行和结果处理，有效地利用生成器的并发控制能力。当然，这只是一个简单的示例，你可以根据实际需求进行更复杂的并发控制实现。

### 4. 嵌套和组合

生成器的嵌套和组合是指在生成器函数中使用其他生成器函数的能力，以及将多个生成器函数组合在一起以形成更复杂的生成器函数。

#### 嵌套其他生成器函数

在生成器函数中使用其他生成器函数可以让我们更好地组织和复用代码。我们可以将一部分逻辑封装在一个生成器函数中，然后在另一个生成器函数中通过 `yield*` 语法来调用这个生成器函数。这样做可以减少代码的重复性，提高代码的可读性和可维护性。

下面是一个简单的例子，展示了如何在生成器函数中嵌套使用其他生成器函数：

```javascript
function* innerGenerator() {
  yield 1
  yield 2
  yield 3
}

function* outerGenerator() {
  yield 'a'
  yield 'b'
  yield 'c'
  yield* innerGenerator()
  yield 'd'
  yield 'e'
}

const generator = outerGenerator()
for (const value of generator) {
  console.log(value)
}
```

在上面的例子中，`innerGenerator` 是一个简单的生成器函数，它生成了数字 1、2、3。`outerGenerator` 是另一个生成器函数，它先生成字母 'a'、'b'、'c'，然后通过 `yield*` 调用了 `innerGenerator`，生成了数字 1、2、3。最后，它生成了字母 'd'、'e'。当我们遍历 `outerGenerator` 的返回值时，会依次输出 'a'、'b'、'c'、1、2、3、'd'、'e'。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07d492771f294b4ab717fcc1ccc84a62~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=248&s=19181&e=png&b=181818)

#### 组合多个生成器函数

除了嵌套生成器函数，我们还可以通过组合多个生成器函数来创建更复杂的生成器函数。这样做可以将不同的生成器函数的逻辑组合在一起，形成一个新的生成器函数。在组合生成器函数时，可以使用 `yield*` 或通过遍历多个生成器函数的返回值来实现。

下面是一个示例，演示了如何组合多个生成器函数：

```javascript
function* generator1() {
  yield 'A'
  yield 'B'
}

function* generator2() {
  yield '1'
  yield '2'
}

function* combinedGenerator() {
  yield* generator1()
  yield* generator2()
}

const generator = combinedGenerator()
for (const value of generator) {
  console.log(value)
}
```

在上面的例子中，`generator1` 和 `generator2` 分别是两个简单的生成器函数，分别生成了字母 'A'、'B' 和数字 '1'、'2'。`combinedGenerator` 是一个组合生成器函数，通过 `yield*` 调用了 `generator1` 和 `generator2`，以达到将两者逻辑组合在一起的目的。当我们遍历 `combinedGenerator` 的返回值时，会依次输出 'A'、'B'、'1'、'2'。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54dc996ef6754502a03ebcdd352f24d9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=173&s=17811&e=png&b=181818)

通过生成器的嵌套和组合，我们可以更好地组织和复用生成器函数的逻辑，实现更灵活和可扩展的功能。这种技术可以在异步编程、数据处理和状态管理等方面发挥重要作用，帮助我们更高效地处理复杂的业务需求。

## 四. 总结

在本篇文章中，我们了解了生成器中的错误处理，如何使用生成器来实现可取消的异步操作和并发控制，以及利用嵌套和组合这些技术来应对复杂的异步场景。

通过生成器函数，我们可以**使用 yield 语句暂停和恢复异步操作**的执行，实现可取消的异步操作。以注册取消操作的回调函数，并在需要取消操作时调用该回调函数，以中断异步操作的执行。这样，我们就能够更加灵活地管理和控制异步操作。

此外，通过将**生成器与 Promise 结合**，我们能够更方便地组织和管理异步操作的流程。这样，我们可以以更清晰、易读的方式编写异步代码。

在处理复杂的异步场景时，通过**嵌套和组合生成器函数**，可以实现更复杂的异步操作流程，以满足特定的需求。

总的来说，ES6 生成器异步编程应用为我们提供了更多的工具和技术，帮助我们处理复杂的异步操作和错误处理。无论是取消异步操作、实现并发控制，还是嵌套和组合这些技术，我们都可以根据具体的场景和需求，选择合适的方法和技术，提高代码的可读性、可维护性和性能。通过不断探索这些新的思路，我们可以更好地、更有技巧的应对异步编程带来的挑战。

<ArticleFooter link="https://juejin.cn/post/7303789264340795433" />
