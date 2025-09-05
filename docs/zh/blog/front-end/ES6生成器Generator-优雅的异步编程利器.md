---
title: 学习 ES6 生成器 ( Generator ) ：掌握优雅的异步编程利器
---

# 学习 ES6 生成器 ( Generator ) ：掌握优雅的异步编程利器

<p align=right><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db871b82789448019c2b815b37b7dc6a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=747&h=316&s=173591&e=png&b=fcfcfc" alt="image.png"  /></p>

## 一. 引言

在软件开发中，异步编程是一个常见的需求。异步编程允许程序在**执行等待耗时操作时不被阻塞**，而是继续执行其他任务，提高程序的响应性和性能。然而，传统的异步编程方式（如**回调函数**和**事件监听**）往往会导致**代码复杂度增加**、**可读性下降**等问题，给开发者带来了许多困扰和挑战。

ES6 生成器（`Generator`）是 JavaScript 语言新增的一种特殊函数类型，它提供了一种优雅的解决方案来处理异步编程。生成器使得开发者可以用同步的线性代码风格来书写异步操作，代码更加简洁、可读性更高，同时还能够减少回调地狱和处理并发操作的复杂性。

本文将介绍 ES6 生成器的特性和作用。从零开始，学习生成器的语法、使用方法以及在异步编程中的应用方式。通过使用生成器，可以实现更优雅、更高效的异步编程方式，从而加快开发效率。在接下来的内容中，我们一起探索生成器的奥秘，并学习如何将其应用于实际项目中。

## 二. 生成器的基础知识

### 1. 生成器的定义和语法

生成器（`Generator`）是一个特殊的函数类型，可以在执行过程中暂停并继续执行。它通过使用 yield 关键字来定义中断点，每次调用生成器的 `next()`方法都会从上一个中断点继续执行，直到遇到下一个 yield 关键字或函数结束。

生成器的定义格式如下：

```javascript
function* generatorName() {
  // 生成器函数体
}
```

在生成器函数体内，可以使用 yield 关键字来定义中断点，该关键字后面的表达式的值将作为生成器的返回值。

例如，下面是一个简单的生成器示例，生成器名为 counter：

```javascript
function* counter() {
  let count = 0
  while (true) {
    yield count
    count++
  }
}
```

在上述示例中，`counter` 生成器会无限循环并使用 yield 关键字将当前的 count 值返回。每次调用生成器的 `next()` 方法时，它会在 yield 语句处中断，并将 yield 后面的值作为 `next()` 的返回结果。然后，下一次调用 `next()` 方法时，生成器会从上次中断的地方继续执行，更新 `count` 值并再次中断，如此往复。

生成器的语法使用了特殊的 function\*声明来定义生成器函数，同时还可以使用 yield 关键字来控制生成器的执行流程。生成器函数的调用会返回一个迭代器对象，通过 `next()` 方法对生成器进行手动迭代。

> 需要注意的是，生成器函数定义时需要在函数关键字 function 后面加上星号（\*），以标识该函数为生成器函数。另外，yield 关键字只能在生成器函数内部使用。

### 2. yield 关键字的作用和使用方法

yield 关键字在生成器函数中的作用是定义一个中断点，暂停生成器的执行，并返回一个指定的值。

生成器函数中可以有多个 yield 语句，每次调用生成器的 `next()` 方法时，它会在当前的 yield 语句处中断。当再次调用 `next()` 方法时，生成器会从上次中断的地方继续执行，直到遇到下一个 yield 语句或函数结束。

yield 语句的语法如下：

```javascript
yield expression;
```

其中，`expression` 是一个表达式，它的值将作为生成器的返回值。可以使用 yield 返回任意类型的值，例如数字、字符串、对象等。

下面是一个使用 yield 的简单示例：

```javascript
function* generator() {
  yield 'Hello'
  yield 'World'
  yield 2023
}

const gen = generator()
console.log(gen.next()) // {value: 'Hello', done: false}
console.log(gen.next()) // {value: 'World', done: false}
console.log(gen.next()) // {value: 2023, done: false}
console.log(gen.next()) // {value: undefined, done: true}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/480535e8ebd94b95b93d6c532cebf78c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=182&s=28711&e=png&b=181818)

在上述示例中，`generator` 生成器函数内部有三个 yield 语句。每次调用 `gen.next()`方法时，生成器会从上一次中断的地方继续执行，并将当前 yield 语句后面的值作为返回结果。当所有的 yield 语句都执行完后，生成器的 `done` 属性会变为 `true`，表示生成器执行结束。

需要注意的是，yield 关键字只能在生成器函数内部使用，用于定义中断点。在其他函数或普通的代码块中使用 yield 关键字会导致语法错误。另外，yield 关键字后面可以跟**任意的表达式**，包括**函数调用**、**计算表达式**等。

### 3. next() 方法的调用和执行过程

next()方法用于执行生成器函数，并返回一个对象，包含生成器的执行结果。它的执行过程如下：

1. 调用生成器函数，生成一个迭代器对象：

   ```javascript
   const gen = generator()
   ```

2. 调用迭代器对象的 `next()` 方法：

   ```javascript
   const result = gen.next()
   ```

3. 生成器函数从上一次 yield 语句处开始执行，直到遇到下一个 yield 语句或函数结束。

4. 如果遇到 yield 语句，则将 yield 后面的值作为 `next()` 方法的返回结果。同时，暂停生成器的执行，保存生成器的上下文状态。

5. 如果生成器函数执行完所有的 yield 语句，或者执行到函数的结束，生成器的 done 属性将变为 true，表示生成器执行结束。此时，`next()`方法的返回结果中的 value 属性为 `undefined`。

6. 如果需要再次执行生成器，可以再次调用 `next()` 方法，并重复步骤 3-5。

下面是一个具体的示例：

```javascript
function* generator() {
  console.log('Start')
  yield 'Hello'
  console.log('Middle')
  yield 'World'
  console.log('End')
}

const gen = generator()
console.log(gen.next()) // 输出: Start, {value: 'Hello', done: false}
console.log(gen.next()) // 输出: Middle, {value: 'World', done: false}
console.log(gen.next()) // 输出: End, {value: undefined, done: true}
console.log(gen.next()) // 输出: {value: undefined, done: true}
```

在上述示例中，调用 `gen.next()`方法会依次执行生成器函数内的代码。每次调用 next()方法时，生成器会从上一次 yield 语句处继续执行，并将 yield 后面的值作为返回结果。当生成器执行完所有的 yield 语句后，done 属性为 true，表示生成器执行结束。再次调用 `next()` 方法只会返回`{value: undefined, done: true}`。如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be66e40196a84fa282ac9fe505e59cd7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=230&s=30622&e=png&b=181818)

> 需要注意的是，`next()` 方法的调用不一定需要在代码执行的开始，可以在任意阶段调用，生成器会从上一次中断的地方继续执行。每次调用 `next()` 方法时，生成器函数会执行一次，直到遇到下一个 yield 语句或函数结束。

## 三. 使用生成器进行同步迭代

生成器函数和可迭代对象之间存在紧密的关系。生成器函数可以用来创建可迭代对象，而可迭代对象则可以被用于循环迭代或传递给消费者函数进行处理。

生成器函数定义为一个带有 yield 语句的函数，在调用生成器函数时，它返回一个生成器对象。生成器对象是可迭代对象的一种，因此可以在 `for...of` 循环中使用，或者调用可迭代对象的内置迭代器方法（如 `next()` 和 `Symbol.iterator`）。

下面是一个示例，展示了生成器函数和可迭代对象之间的关系：

```javascript
function* generator() {
  yield 'Hello'
  yield 'World'
}

const iterable = generator()

for (const value of iterable) {
  console.log(value)
}
// 输出：
// Hello
// World
```

在上述示例中，生成器函数`generator`返回一个生成器对象，该生成器对象可以被迭代。我们将生成器对象赋值给变量`iterable`，然后在 `for...of` 循环中使用 `iterable`进行迭代。每次迭代时，生成器函数会从上一次 yield 语句处开始执行，并将 yield 后面的值作为迭代结果。如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5eab1e6b67614b0d9a04ee2d6e879eec~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=144&s=18000&e=png&b=181818)

除了使用 `for...of` 循环外，我们也可以使用可迭代对象的内置迭代器方法进行手动迭代，如下所示：

```javascript
function* generator() {
  yield 'Hello'
  yield 'World'
}

const iterable = generator()

console.log(iterable.next()) // {value: 'Hello', done: false}
console.log(iterable.next()) // {value: 'World', done: false}
console.log(iterable.next()) // {value: undefined, done: true}
```

可迭代对象的内置迭代器方法 `next()` 会使生成器函数从上一次中断的地方开始执行，并返回迭代结果。每次调用 `next()` 方法时，生成器函数会执行一次，直到遇到下一个 yield 语句或函数结束。如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9533ea15bf634be6995c297599a7eebd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=166&s=25346&e=png&b=181818)

> 总结来说，生成器函数是创建可迭代对象的一种方式，而可迭代对象可以通过迭代器方法进行迭代和取值，实现了迭代器协议。生成器函数的灵活性和方便性使得可以轻松地实现惰性计算、无限序列等功能。同时，可迭代对象的支持使得我们能够更方便地对其进行迭代和处理。

## 四. 异步编程中的生成器应用

### 1. 异步操作的挂起和恢复

生成器在异步操作中的挂起和恢复是通过 yield 关键字实现的。

当生成器函数在执行过程中遇到 yield 关键字时，它会将当前的执行状态保存下来，并将生成器函数的控制权返回给调用者。这个过程被称为挂起。

挂起后，生成器函数可以等待异步操作的完成，例如等待一个异步请求的响应。一旦异步操作完成，可以通过调用 `generator.next(value)` 方法恢复生成器函数的执行，并将一个值传递给挂起的 yield 表达式。

当生成器函数再次执行到下一个 yield 表达式时，又会被挂起，将当前的执行状态保存下来。这个过程可以重复多次，直到函数执行完毕或遇到 `return` 语句。

以下是一个简单的示例，演示了生成器函数在异步操作中的挂起和恢复：

```javascript
function* myGenerator() {
  console.log('Start')
  yield 1
  console.log('After first yield')
  yield 2
  console.log('After second yield')
  return 3
}

const generator = myGenerator()
console.log(generator.next()) // { value: 1, done: false }

setTimeout(function () {
  console.log(generator.next()) // { value: 2, done: false }
  console.log(generator.next()) // { value: 3, done: true }
}, 1000)
```

在上述示例中，生成器函数 `myGenerator` 中有两个 yield 表达式。在运行到这两个 yield 表达式时，它会分别挂起，并返回相应的值。之后，通过调用 `setTimeout` 模拟一个异步操作，在 1 秒后再次调用 `generator.next()` 来恢复生成器函数的执行，并传递下一个值。

总结来说，生成器函数通过 yield 关键字实现了在异步操作中的挂起和恢复。这使得生成器函数可以以一种流畅而直观的方式处理和控制异步流程。

### 2. 使用 yield 关键字处理异步操作中的回调函数

生成器函数可以使用 yield 关键字处理异步操作中的回调函数。通常情况下，异步操作的回调函数会被封装在一个 `Promise` 对象中，用于处理异步操作的结果。

在生成器函数内部，可以使用 yield 关键字暂停函数的执行，并返回一个 `Promise` 对象。当异步操作完成时，可以通过将结果传递给 `Promise` 的 `resolve` 方法来恢复生成器函数的执行。

以下是一个示例，演示了如何在生成器函数中使用 yield 关键字处理异步操作的回调函数：

```javascript
function asyncOperation(callback) {
  setTimeout(function () {
    const result = 'Async Operation Result'
    callback(result)
  }, 1000)
}

function* myGenerator() {
  const result = yield new Promise(function (resolve, reject) {
    asyncOperation(function (data) {
      resolve(data)
    })
  })

  console.log(result)
}

const generator = myGenerator()

const promise = generator.next().value
promise.then(function (result) {
  generator.next(result)
})
```

在上述示例中，`asyncOperation` 是一个模拟的异步操作，它接受一个回调函数作为参数，在异步操作完成后调用该回调函数并传递结果，如下图所示：

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c92207350c4c495f911a7e6de9ba401b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=713&h=654&s=76947&e=gif&f=14&b=1d1d1d" alt="record.gif"  /></p>

在 `myGenerator` 生成器函数中，使用 yield 关键字创建一个 `Promise` 对象，并将异步操作的结果通过回调函数传递给 `resolve` 方法。生成器函数在执行到这个 yield 表达式时会暂停，并返回这个 `Promise` 对象。

在主程序中，通过调用 `generator.next().value` 获取生成器函数的当前 yield 表达式返回的 `Promise` 对象，并通过 `then` 方法注册一个回调函数，用于在异步操作完成后继续执行生成器函数。回调函数的参数即为异步操作的结果，通过调用 `generator.next(result)` 传递给生成器函数，恢复函数的执行。

总结来说，生成器函数可以使用 yield 关键字暂停函数的执行，并通过 `Promise` 对象处理异步操作的回调函数。通过这种方式，可以在异步操作中更直观和流畅地编写、控制代码逻辑。

## 五. Promise 与生成器的结合应用

Promise 和生成器结合的应用可以帮助我们更方便地处理异步操作，使代码逻辑更清晰和可读。

异步操作的顺序执行是 Promise 和生成器结合的常见应用之一。通过使用生成器函数和 yield 关键字，我们可以按照预期的顺序执行多个异步操作，并且保持代码的可读性。

下面是一个示例，演示如何使用 Promise 和生成器结合实现异步操作的顺序执行：

```javascript
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    // 模拟下载文件的异步操作
    setTimeout(() => {
      console.log(`Downloading file from: ${url}`)
      resolve(`File downloaded: ${url}`)
    }, Math.random() * 2000)
  })
}

function* downloadFilesGenerator() {
  const file1 = yield downloadFile('http://example.com/file1.txt')
  console.log(file1)

  const file2 = yield downloadFile('http://example.com/file2.txt')
  console.log(file2)

  const file3 = yield downloadFile('http://example.com/file3.txt')
  console.log(file3)
}

function runGenerator(generator) {
  const iterator = generator()

  function handleResult(result) {
    if (result.done) {
      return result.value
    }

    return Promise.resolve(result.value)
      .then(res => handleResult(iterator.next(res)))
      .catch(err => iterator.throw(err))
  }

  return handleResult(iterator.next())
}

runGenerator(downloadFilesGenerator)
  .then(() => {
    console.log('All files downloaded successfully.')
  })
  .catch(error => {
    console.error('Error occurred:', error)
  })
```

在上述示例中，`downloadFile` 函数模拟了下载文件的异步操作，返回一个 Promise 对象，执行流程如下图所示：

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bab58a0847f46b3acff753515a4df36~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=713&h=680&s=84438&e=gif&f=19&b=1c1c1c" alt="record.gif"  /></p>

在 `downloadFilesGenerator` 生成器函数中，使用 yield 关键字来暂停执行并等待每个文件的下载完成。每个 yield 表达式都会以一个 Promise 对象的形式返回。

在 `runGenerator` 函数中，通过递归地处理结果，按照生成器函数中的顺序执行异步操作。如果 Promise 对象成功解析，会继续执行下一个异步操作；如果出现错误，则使用 `throw` 方法抛出异常并在外部的错误处理中捕获。

最后，通过调用 `runGenerator(downloadFilesGenerator)` 来启动生成器函数的执行，并使用 `.then()` 和 `.catch()` 方法处理最终的成功和失败情况。

这样，我们就可以确保异步操作按照顺序执行，并在每个异步操作都完成后打印出结果。

## 六. 结语

ES6 生成器是一种强大的异步编程工具，提供了一种优雅、灵活且易于理解的方式来处理异步操作的顺序和流程。它简化了异步代码的逻辑，使其更易读和维护。通过与 Promise 结合使用，生成器函数可以实现复杂的异步操作控制和错误处理。在开发中，我们可以充分发挥生成器函数的优势，提升代码的可维护性。

总而言之，ES6 生成器是现代 JavaScript 异步编程中的一把利器，它为我们带来了更加优雅和灵活的代码编写方式，使我们能够更高效地处理异步操作。在适合的场景下，我们可以充分利用生成器函数的特性，提升代码质量和开发效率，使异步编程变得更加愉悦和简单。

<ArticleFooter link="https://juejin.cn/post/7302254338855206931" />
