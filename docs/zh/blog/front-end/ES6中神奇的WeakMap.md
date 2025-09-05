---
title: 认识 ES6 中神奇的 WeakMap
---

# 认识 ES6 中神奇的 WeakMap

## 引言

JavaScript 作为一门强大的编程语言，在开发中充满了各种各样的数据结构和功能。而 WeakMap 正是其中一个神秘而强大的存在。WeakMap 是在 ES6 标准中引入的数据结构，它不同于普通的 Map，具有独特的特点和用途。

WeakMap 与其他数据结构相比具有许多独特的优点和功能。它可以轻松地解决一些常见的问题，例如私有属性的存储、避免内存泄漏、缓存数据等等。

但是，WeakMap 也有自己的限制和使用注意事项。在使用它的时候，我们需要理解它的局限性，并针对特定的使用场景做出正确的设计和使用。

希望通过本篇文章的学习，我们可以了解它是如何工作的、使用场景以及如何在实际开发中充分利用它的优势，以便更好地掌握它的使用技巧和原理。

## 一. 认识 WeakMap

### 1. WeakMap 的定义

WeakMap 是 JavaScript 中的一种数据结构，它与普通的 Map 有些相似，但也有一些重要的区别。它的特点在于它能够实现弱引用关联，并且只能存储对象作为键名。

具体而言，WeakMap 中的键名必须是对象，而值则可以是任意类型的数据。与普通的 Map 不同，WeakMap 中的键名是弱引用的，也就是说，当键名所指向的对象在其他地方被清除时，WeakMap 中对应的键值对也会自动被清除。

### 2. WeakMap 的用途

WeakMap 的用途非常广泛，以下是几个常见的应用场景：

1. **私有属性的存储**：使用 WeakMap 作为私有属性的容器，可以确保私有属性只能在相关的类或方法中访问，而外部无法直接获取到私有属性。

2. **避免内存泄漏**：当我们需要在一个对象上保存一些额外的信息，但又不想让这些信息影响到对象的垃圾回收时，可以使用 WeakMap 来作为扩展信息的存储，当对象被回收时，它们也会被自动清除，从而避免内存泄漏。

3. **缓存数据**：WeakMap 可以作为缓存的存储结构，当缓存的键名所对应的对象被清除时，缓存中对应的值也会被自动清除，从而实现自动的缓存管理。

总之，WeakMap 是一种功能强大的数据结构，它通过弱引用关联提供了一种灵活的存储方式，并帮助我们解决了一些常见的问题。

### 3. WeakMap 的特点

WeakMap 的主要特点可以总结为以下几点：

1. **弱引用关联**：WeakMap 中的键名是弱引用的，也就是说，当键名所指向的对象在其他地方没有被引用时，对应的键值对会自动被清除。这意味着 WeakMap 中的键值对是临时的，对于没有其他引用的对象，它们的键值对会被垃圾回收机制自动清除。

2. **只能使用对象作为键名**：WeakMap 只能接受对象作为键名，而不能使用原始类型（比如字符串、数字等）作为键名。这是由于弱引用关联的特性决定的，只有对象才能进行弱引用的关联。

3. **无法迭代**：WeakMap 没有提供直接的方法来迭代键值对，也没有类似于 `keys()`、`values()` 和 `entries()` 这样的方法。这是因为 WeakMap 的键值对迭代顺序是不确定的，无法保证按照插入顺序或其他方式进行迭代。

4. **无法获取大小**：WeakMap 没有提供像 Map 的 `size` 属性那样能够获取键值对数量的属性或方法。这是由于 WeakMap 的特性决定的，无法直接获取容量大小。

5. **应用于临时存储和私有属性**：WeakMap 非常适用于需要临时存储数据或用于私有属性的场景。由于键值对在不被其他引用的情况下会被自动清除，使用 WeakMap 可以避免内存泄漏和不必要的资源占用。

> 注意：由于 WeakMap 的一些特殊性，需要在恰当的场景下使用。在需要长期保持数据、需要迭代或需要获取大小的情况下，应该选择使用普通的 Map 数据结构。

## 二. 细说 WeakMap 与 Map

WeakMap 和 Map 是 JavaScript 中两种不同的数据结构，它们在功能和特性上有一些区别。下面是 WeakMap 与 Map 的详细对比：

1. **键类型**：

   - WeakMap 的键只能是对象，不能使用基本数据类型。
   - Map 的键可以是任意类型，包括基本数据类型和对象。

2. **弱引用特性**：

   - WeakMap 的键是弱引用的，当键对象不再被其他引用持有时，会被垃圾回收器回收，并从 WeakMap 中自动删除。
   - Map 的键是强引用的，只有当键对象被显式删除或者 Map 对象被清空时，键对象才会被回收。

3. **迭代和长度**：

   - WeakMap 没有提供明确的迭代方法，也没有类似 Map 的`forEach`、`entries`等方法。无法迭代获取 WeakMap 中的键值对。
   - Map 提供了一系列迭代方法，如`forEach`、`entries`、`keys`、`values`等，能够方便地进行迭代操作。同时，Map 还提供了`size`属性来获取存储的键值对数量。

4. **性能和内存占用**：

   - WeakMap 相对于 Map 来说，在一些情况下，性能更高，内存占用更低。因为 WeakMap 的键是弱引用的，当键对象不被其他引用持有时，会被自动清理。
   - Map 相对于 WeakMap 来说，在一些情况下，性能可能会稍低，并且由于键是强引用，当不再需要时需要手动删除。

5. **适用场景**：
   - WeakMap 适用于存储与弱引用键对象相关的私有数据。它们可以在对象内部作为私有数据的存储容器，能够保护数据的安全性。
   - Map 适用于一般的键值对存储和查找操作，可以存储任意类型的键值对。

综上所述，WeakMap 和 Map 在使用场景、键类型、引用特性以及迭代和长度等方面有所不同。我们应根据实际需求和情况选择适合的数据结构，在特定的场合合理使用它们。

## 三. WeakMap 的基本操作

WeakMap 作为 JavaScript 中的一种集合类型，它主要存储键值对的映射关系，其中键是对象，值可以是任意类型。WeakMap 对于键对象的引用是弱引用（不会阻止垃圾回收器回收对象），这也是它与 Map 的主要区别之一。

下面是 WeakMap 的基本操作流程：

1. 创建一个空的 WeakMap：

```javascript
const map = new WeakMap()
```

2. 使用`set(key, value)`方法，将键值对存储到 WeakMap 中：

```javascript
const key = { name: 'John' }
const value = 'Value for John'

map.set(key, value)
```

3. 使用`get(key)`方法，根据键获取对应的值：

```javascript
const storedValue = map.get(key)
console.log(storedValue) // 输出："Value for John"
```

4. 使用`has(key)`方法，检查 WeakMap 中是否存在指定的键：

```javascript
console.log(map.has(key)) // 输出：true
```

5. 使用`delete(key)`方法，从 WeakMap 中删除指定的键值对：

```javascript
map.delete(key)
console.log(map.has(key)) // 输出：false
```

综上所述，WeakMap 的基本操作流程包括创建、存储、获取、检查和删除键值对。通过使用 WeakMap，我们可以在需要存储键值对，并且不希望阻止键对象被垃圾回收的情况下，进行有效的数据管理。

> 注意：由于 WeakMap 的键是弱引用，即使没有其他引用指向某个键对象，垃圾回收器仍然可以回收它。当键对象被回收后，WeakMap 中对应的键值对也会被自动删除，因此无法迭代 WeakMap 的键或值。
>
> 此外，WeakMap 没有提供明确的迭代方法，也没有像 Map 那样的`size`属性。因此，无法遍历整个 WeakMap 的内容，只能通过已知的键来获取对应的值。

## 四. WeakMap 的使用场景

### 1. 实现私有属性的存储

使用 WeakMap 可以实现对象的私有属性，使其对外部不可见。

```js
const privateData = new WeakMap()

class Person {
  constructor(name, age) {
    // 创建一个私有属性对象
    const privateProps = {
      name: name,
      age: age
    }

    // 使用WeakMap将私有属性对象与当前实例关联起来
    privateData.set(this, privateProps)
  }

  getName() {
    // 在方法中获取私有属性
    return privateData.get(this).name
  }

  getAge() {
    // 在方法中获取私有属性
    return privateData.get(this).age
  }

  setName(newName) {
    // 在方法中设置私有属性
    privateData.get(this).name = newName
  }

  setAge(newAge) {
    // 在方法中设置私有属性
    privateData.get(this).age = newAge
  }
}

// 创建Person实例
const person = new Person('Alice', 25)

// 通过公共方法获取私有属性
console.log(person.getName()) // 输出: Alice
console.log(person.getAge()) // 输出: 25

// 通过公共方法设置私有属性
person.setName('Bob')
person.setAge(30)

console.log(person.getName()) // 输出: Bob
console.log(person.getAge()) // 输出: 30
```

在上述示例中，我们创建了一个`Person`类，其中包含了`name`和`age`两个私有属性。在类的构造函数中，我们创建了一个私有属性对象`privateProps`，并将其与当前实例关联起来，即使用`privateData.set(this, privateProps)`将私有属性对象与当前实例关联。这样，每个实例都拥有各自的私有属性对象。

接下来，我们在类中定义了一些公共方法，例如`getName()`、`setName()`等。在这些公共方法中，我们通过`privateData.get(this)`获取与当前实例关联的私有属性对象，并进行相应的读取或修改。

通过这种方式，我们实现了私有属性的封装和访问控制。外部无法直接访问私有属性对象，只能通过特定的公共方法来获取或修改私有属性的值。这样可以保持对象的封装性和安全性。

### 2. 防止内存泄漏

使用 WeakMap 可以帮助防止内存泄漏，特别是在需要在对象实例中存储临时数据时。

```js
class ExpensiveOperation {
  constructor() {
    // 执行耗时操作并获取结果
    this.result = this.doExpensiveOperation()

    // 创建一个WeakMap用于存储临时数据
    this.tempData = new WeakMap()
  }

  saveTemporaryData(key, value) {
    // 将临时数据存储到WeakMap中
    this.tempData.set(key, value)
  }

  retrieveTemporaryData(key) {
    // 从WeakMap中获取临时数据
    return this.tempData.get(key)
  }

  doExpensiveOperation() {
    // 模拟耗时操作
    // 假设这个操作很耗费内存
    // ...

    // 返回结果
    return 'Expensive Operation Result'
  }
}

// 创建ExpensiveOperation实例
const operation = new ExpensiveOperation()

// 存储临时数据
const key = {}
const value = 'Temporary Data'
operation.saveTemporaryData(key, value)

// 获取临时数据
console.log(operation.retrieveTemporaryData(key)) // 输出: Temporary Data

// 实例不再被使用，对应的内存会被自动回收，防止内存泄漏
```

在上述示例中，我们创建了一个`ExpensiveOperation`类，该类执行一个耗时操作，在构造函数中获取了操作的结果。为了存储临时数据（例如计算中间结果等），我们使用了一个 WeakMap 来保存这些数据。

在类中定义了`saveTemporaryData(key, value)`和`retrieveTemporaryData(key)`方法，用于存储和获取临时数据。`saveTemporaryData()`方法利用 WeakMap 的`set()`方法将键值对存储到`tempData`中，`retrieveTemporaryData()`方法则使用 WeakMap 的`get()`方法从`tempData`中获取对应的值。

由于 WeakMap 只弱引用键名，当对应的键名不再被引用时，WeakMap 会自动进行垃圾回收，并清除对应的键值对。这样，当`ExpensiveOperation`实例不再被使用时，其中的临时数据就会被自动清除，并防止了内存泄漏的问题。

> 注意：临时数据是一种防止内存泄漏的方法，但并不意味着它可以解决所有内存泄漏的问题。在实际应用中，仍然需要综合考虑其他因素，如对象引用的管理等，来确保内存的正确释放。

### 3. 缓存数据

使用 WeakMap 来缓存数据是一种有效的方式，可以提高应用程序的性能。

```js
class DataCache {
  constructor() {
    // 创建一个WeakMap来作为缓存容器
    this.cache = new WeakMap()
  }

  getValue(key) {
    // 从缓存中获取值
    return this.cache.get(key)
  }

  setValue(key, value) {
    // 将值存储到缓存中
    this.cache.set(key, value)
  }
}

// 创建DataCache实例
const cache = new DataCache()

// 模拟获取数据操作
function fetchData() {
  // 模拟获取数据的耗时操作
  // ...

  return 'Data from API'
}

// 尝试从缓存中获取数据
const cachedData = cache.getValue(fetchData)

if (cachedData) {
  console.log('Data from cache:', cachedData)
} else {
  // 如果缓存中没有数据，则从API中获取数据
  const dataFromApi = fetchData()

  // 将数据存储到缓存中
  cache.setValue(fetchData, dataFromApi)

  console.log('Data from API:', dataFromApi)
}
```

在上述示例中，我们创建了一个`DataCache`类，该类使用 WeakMap 作为缓存容器。类中定义了`getValue(key)`和`setValue(key, value)`方法，用于从缓存中获取值和将值存储到缓存中。

我们还定义了一个`fetchData()`函数，用于模拟从 API 中获取数据的耗时操作。首先，我们尝试从缓存中获取数据，如果缓存中有数据则直接使用，输出"Data from cache"。如果缓存中没有数据，则调用`fetchData()`函数从 API 中获取数据，并将数据存储到缓存中，输出"Data from API"。

这样，当多次调用`fetchData()`时，第一次会从 API 中获取数据并存储到缓存中，后续调用时直接从缓存中获取数据，避免了重复的 API 请求，提高了应用程序的性能。

> 注意：由于 WeakMap 只弱引用键名，当对应的键名不再被引用时，WeakMap 会自动进行垃圾回收，并清除对应的键值对。因此，当键名不再被使用时，缓存中对应的数据会被自动清除。这样可以避免因为缓存中的数据没有被及时回收而导致的内存泄漏问题。

### 4. 保持监听器和回调函数的正确性

使用 WeakMap 可以确保监听器和回调函数的正确性，特别是在需要保持函数的私有性以及避免内存泄漏的情况下。

```js
class EventEmitter {
  constructor() {
    // 使用WeakMap来存储监听器和回调函数
    this.listeners = new WeakMap()
  }

  // 添加监听器
  addListener(eventName, callback) {
    // 获取存储监听器和回调函数的Map
    let eventListeners = this.listeners.get(eventName)

    // 如果Map不存在，则创建一个新的Map并存储到WeakMap中
    if (!eventListeners) {
      eventListeners = new Map()
      this.listeners.set(eventName, eventListeners)
    }

    // 存储回调函数到对应的Map中
    eventListeners.set(callback, callback)
  }

  // 触发事件
  emit(eventName, ...args) {
    // 获取存储监听器和回调函数的Map
    const eventListeners = this.listeners.get(eventName)

    // 如果Map存在，则依次调用回调函数
    if (eventListeners) {
      eventListeners.forEach(callback => {
        callback.apply(null, args)
      })
    }
  }

  // 移除监听器
  removeListener(eventName, callback) {
    // 获取存储监听器和回调函数的Map
    const eventListeners = this.listeners.get(eventName)

    // 如果Map存在，则从中移除对应的回调函数
    if (eventListeners) {
      eventListeners.delete(callback)

      // 如果Map中没有回调函数了，则从WeakMap中移除对应的Map
      if (eventListeners.size === 0) {
        this.listeners.delete(eventName)
      }
    }
  }
}

// 示例用法
const emitter = new EventEmitter()
// 定义键对象
const event1 = { name: 'event1' }

// 添加监听器和回调函数
const event1Callback = () => {
  console.log('Event 1 callback')
}
emitter.addListener(event1, event1Callback)

// 触发事件
emitter.emit(event1) // 输出："Event 1 callback"

// 移除监听器和回调函数
emitter.removeListener(event1, event1Callback)

// 再次触发事件，但不会有输出
emitter.emit(event1)
```

在上述示例中，我们创建了一个`EventEmitter`类，该类用于管理事件的监听器和回调函数。使用 WeakMap 来存储监听器和回调函数，确保了监听器和回调函数的私有性，并且当不再需要监听器时，自动进行垃圾回收。

在`addListener(eventName, callback)`方法中，我们使用 WeakMap 来存储 Map，其中 Key 是事件名称，Value 是一个存储回调函数的 Map。如果 Map 不存在，则创建一个新的 Map 并存储到 WeakMap 中。然后将回调函数存储到对应的 Map 中。

在`emit(eventName, ...args)`方法中，我们从 WeakMap 中获取相应的 Map，然后依次调用其中的回调函数。

在`removeListener(eventName, callback)`方法中，我们首先从 WeakMap 中获取相应的 Map，然后从 Map 中删除对应的回调函数。如果删除后 Map 中没有回调函数了，则从 WeakMap 中删除此 Map。

通过使用 WeakMap，可以确保当不再需要监听器时，对应的回调函数会被正确地释放，并且不会造成内存泄漏的问题。当监听器和对应的回调函数不再被引用时，它们会自动被垃圾回收，这样就保证了数据的正确性和内存的正确释放。

## 五. WeakMap 的注意事项

在使用 WeakMap 时，有一些注意事项需要注意：

1. **键必须是对象**：WeakMap 的键只能是对象，不能使用基本数据类型（如字符串、数字等）作为键。如果尝试使用非对象作为键，将会导致报错。

2. **弱引用特性**：WeakMap 的键是弱引用的，这意味着当键对象不再被其他引用持有时，它可以被垃圾回收器回收，并从 WeakMap 中自动删除。这也就意味着无法确保 WeakMap 中的键始终存在。

3. **不可迭代**：WeakMap 没有提供明确的迭代方法，也没有类似 Map 的`forEach`或`entries`方法。这是为了强调 WeakMap 的私有性和限制对键对象的访问。

4. **无法获取长度**：与 Map 不同，WeakMap 没有类似`size`属性来获取存储的键值对数量。这是因为 WeakMap 的键是弱引用的，无法追踪存储的键值对的数量。

5. **无法清空整个 WeakMap**：由于 WeakMap 的键是弱引用的，无法清空整个 WeakMap。垃圾回收器会根据键对象的引用情况来自动清理无效的键值对。

6. **适用于存储私有数据**：由于 WeakMap 的特性，它通常用于存储与键对象相关的私有数据或状态。通过将数据存储在 WeakMap 中，可以确保这些数据与键对象紧密关联，并且在键对象被回收后自动清理数据。

WeakMap 的使用场景相对较特殊。在一般情况下，我们更常使用 Map 来存储键值对。只有在确实需要存储与弱引用键对象关联的私有数据时，才应考虑使用 WeakMap。

因此，在使用 WeakMap 时，应根据实际情况慎重考虑其使用，并且了解它的特性和限制。

## 总结

到这里，我们应该已经了解了 JavaScript 中的 WeakMap 数据结构的基本操作和注意事项。通过弱引用的特性，WeakMap 提供了一种私有性的数据存储方式，能够有效保护与键对象相关的私有数据。在使用 WeakMap 时，我们需要注意键必须是对象、无法迭代和获取长度等限制。

WeakMap 的设计初衷是为了实现一种私有性，并且能够自动回收不再被其他引用持有的键对象，从而避免内存泄漏的问题。因此，在构建一些需要保护数据的模块、类或库时，WeakMap 可以帮助我们安全地存储私有数据和状态。通过合理使用 WeakMap，我们可以提高代码的安全性和可维护性。

然而，正因为 WeakMap 的特殊性，我们在实际使用时需要慎重考虑。它的使用场景相对较特殊，只有在确实需要存储与键对象关联的私有数据时才应该使用。在其他情况下，我们更常使用常规的 Map 对象来存储键值对。

总而言之，WeakMap 是 JavaScript 中一个特殊且有用的数据结构，它提供了一种私有性和自回收的数据存储方式。在保护私有数据、避免内存泄漏的同时，我们需要明确使用场景和了解其特性和限制。

<ArticleFooter :link="['juejin::https://juejin.cn/post/7294470739964182566', 'weixin::https://mp.weixin.qq.com/s/FwfU4g-1NQG_XBTuqBP8uA']" />
