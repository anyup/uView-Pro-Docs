---
title: JavaScript 玩转数据集合：探索 Set 对象迭代、转换和应用场景
---

# JavaScript 玩转数据集合：探索 Set 对象迭代、转换和应用场景

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d114bcd03809474496131cc711bca4f6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=593&h=303&s=133380&e=png&b=f2872a" alt="image.png"  /></p>

## 一、前言

从上一篇文章中，我们学习到 Set 对象是 JavaScript 中用于存储独一无二值的集合，与数组或对象不同，Set 对象中的每个值都是**唯一的**，重复的值将被自动忽略，这使得 Set 对象成为处理需要去重的数据集合时的有力工具。详细了解请参考上一篇文章：

[JavaScript Set 必备指南：深入理解 Set 的特性和方法](https://juejin.cn/post/7301511024167632922)

在本篇文章中，我们将探索 JavaScript Set 对象的**迭代**、**转换**和**应用场景**。通过了解和熟练掌握 Set 对象的特性和方法，我们将能够更高效、更灵活地处理数据，并应用于实际开发中。

我们将从迭代开始，通过 Set 对象内建的**迭代器**方法，可以轻松地遍历 Set 中的每个元素，并对其执行自定义的操作。不仅如此，Set 还提供了多种转换方法，可以将 Set 转换为数组或其他数据结构，为我们提供更多的处理选项。

在了解了 Set 的迭代和转换后，我们将探索一些实际应用场景，无论是**数据去重**、**集合运算**（如**并集**、**交集**和**差集**）还是构建简单的缓存机制，Set 对象都能够发挥重要的作用。我们将深入研究这些应用场景，并展示如何利用 Set 对象来实现更简洁、高效的代码。

## 二、Set 的迭代

### 1. 使用 for...of 迭代 Set

当需要遍历 Set 中的元素时，可以使用 `for...of` 循环语句来轻松地实现。这里提供了一个简单的示例来展示如何使用 `for...of` 迭代 Set：

```javascript
let mySet = new Set([1, 2, 3, 4])

for (let item of mySet) {
  console.log(item)
}
```

在上面的示例中，我们首先创建了一个包含一些整数的 Set。然后，我们使用 `for...of` 循环遍历 Set 中的每个元素。这样便能够轻松地遍历和操作 Set 中的元素。

在 `for...of` 循环中，每次迭代都会将 Set 中的一个元素赋给 `item` 变量，因此你可以在循环体内对其进行操作或处理。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9ba101aa9b64930a64ba096a922b675~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=172&s=18110&e=png&b=181818)

### 2. 使用 Set 的 forEach 方法

当你需要对 Set 中的每个元素执行相同的操作时，可以使用 `forEach` 方法。以下是一个示例，展示了如何使用 `forEach` 方法来迭代 Set 中的元素：

```javascript
let mySet = new Set([1, 2, 3, 4])

mySet.forEach((value, valueAgain, set) => {
  console.log(value)
})
```

在这个示例中，我们使用 `forEach` 方法来遍历 Set 中的每元素。在这里，回调函数接受三个参数：

- `value`: 当前迭代的元素的值
- `value`: 与 `value 相同，这个参数的存在是为了与 Map`的回调保持一致。
- `set`: 原始 Set 对象。

你可以在回调函数内部执行与每个元素相关的操作。

### 3. 将 Set 转换为数组进行迭代

如果你想将 Set 转换为数组以便进行迭代，可以使用 `Array.from()` 方法或者扩展运算符 `...` 来实现。以下是两个示例：

- 使用 `Array.from()` 方法：

```javascript
let mySet = new Set([1, 2, 3, 4])
let myArray = Array.from(mySet)

for (let item of myArray) {
  console.log(item)
}
```

- 使用扩展运算符 `...`：

```javascript
let mySet = new Set([1, 2, 3, 4])
let myArray = [...mySet]

for (let item of myArray) {
  console.log(item)
}
```

无论是使用 `Array.from()` 还是扩展运算符 `...`，都可以将 Set 转换为数组，然后你可以使用 `for...of` 循环遍历数组的每个元素。

### 4. 使用 Set 中的 entries(), values(), keys() 方法进行迭代

在 JavaScript 中，我们可以使用 `entries()`, `values()`, `keys()` 方法从 Set 中获取迭代器，然后使用这些迭代器来进行迭代。

- 使用 `entries()` 方法将返回一个迭代器，该迭代器的每个元素都是形如`[value, value]`的数组，其中两个值相同，表示 Set 中的每个项。

示例如下：

```javascript
let mySet = new Set([1, 2, 3])

let iterator = mySet.entries()

for (let entry of iterator) {
  console.log(entry)
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/722c235eddf84cb2a1c5e5e2ed46e3d6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=161&s=19133&e=png&b=181818)

- 使用 `values()` 方法将返回一个迭代器，该迭代器的每个元素都是 Set 中的值。

示例如下：

```javascript
let mySet = new Set([1, 2, 3])

let iterator = mySet.values()

for (let value of iterator) {
  console.log(value)
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56954a2340a84c28ad1b4f121e513434~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=161&s=18056&e=png&b=181818)

- 使用 `keys()` 方法将返回一个迭代器，该迭代器的每个元素都是 Set 中的值。由于 Set 中的键和值相同，因此 `keys()` 与 `values()` 返回的结果相同。

示例如下：

```javascript
let mySet = new Set([1, 2, 3])

let iterator = mySet.keys()

for (let key of iterator) {
  console.log(key)
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a3f1801ec5646f2a2149ac0e400163a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=161&s=18056&e=png&b=181818)

在上述示例中，我们使用不同的方法从 Set 中获取迭代器，并且使用 `for...of` 循环遍历迭代器中的值或键值对，这些方法都能帮助你实现对 Set 的迭代操作。

## 三、Set 与数组、对象的转换

### 1. 从数组创建 Set

你可以使用数组的内容来创建一个 Set，Set 构造函数可以接受一个可迭代对象作为参数，这样就可以将数组作为参数传递给 Set 构造函数，从而创建一个包含数组内容的 Set。

以下是一个示例，展示了如何从数组创建一个 Set：

```javascript
let myArray = [1, 2, 3, 2, 1]
let mySet = new Set(myArray)
console.log(mySet) // 输出: Set(3) {1, 2, 3}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5c66aceff594458a063bf504d125bbb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=19130&e=png&b=181818)

在这个示例中，我们首先定义了一个包含重复元素的数组 `myArray`，然后我们将 `myArray` 作为参数传递给 Set 构造函数，这样就创建了一个包含数组内容的 Set `mySet`。由于 Set 中不允许重复的元素，所以重复的元素会被自动去重，最终创建的 Set 中只包含唯一的元素。

### 2. 从 Set 创建数组

在 JavaScript 中，你可以通过几种方式从 Set 创建数组。以下是两种常见的方法：

- 使用 Array.from 方法：
  你可以使用 `Array` 方法从 Set 中创建数组，这个方法将 Set 转换为一个新的数组。下面是一个示例：

```javascript
let mySet = new Set([1, 2, 3])
let myArray = Array.from(mySet)
console.log(myArray) // 输出: [1, 2, 3]
```

上面的示例中，我们首先创建了一个包含一些元素的 Set `Set`，然使用 `Array.from` 方法将 `mySet`换为一个数组 `myArray`。

- 使用展开运符（Spread Operator） 你还可以使用展运算符 `...` 从 Set 中创建数组。这个方法为简洁，示下：

```javascript
let mySet = new Set([1, 2, 3])
myArray = [...mySet]
console.log(myArray) // 输出: [1 2, 3]
```

在这个示例中，我们使用了展开运算符 `...` 将 `mySet` 中的元素展开到一个新的数组 `Array` 中。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/515726b5f96740deba10188f8d9acc54~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=19312&e=png&b=181818)

### 3. 从对象创建 Set

在 JavaScript 中，你可以使用 Set 构造函数来从对象创建 Set。Set 构造函数需要接收一个可迭代对象（iterable）作为参数，因此你需要将对象的键或值转换为可迭代的形式，然后将其作为参数传递给 Set 构造函数。

以下是一个示例，展示了如何从对象创建一个 Set：

```javascript
let myObject = { a: 1, b: 2, c: 3 }
let mySet = new Set(Object.keys(myObject))
console.log(mySet) // 输出: Set(3) {"a", "b", "c"}
```

在这个示例中，我们首先定义了一个对象 `myObject`，然后我们使用 `Object.keys` 方法来获取对象的键，即将对象的键转换为一个数组。接下来，我们将这个数组作为参数传递给 Set 构造函数，这样就创建了一个包含对象键的 Set `mySet`。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cca9fda1d80481ca2a206298e2a7678~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=19131&e=png&b=181818)

除了使用 `Object.keys`，你还可以使用其他方法来将对象转换为可迭代的形式，比如 `Object.values` 或 `Object.entries`。

## 四、实际应用场景

### 1. 使用 Set 去重

Set 的一个常见实际应用场景就是用来去重。在 JavaScript 中，Set 是一种能够存储唯一值的数据结构，这意味着你可以使用 Set 来从数组或其他数据集合中快速去除重复的元素。

以下是一个示例，展示了如何使用 Set 来去重一个数组：

```javascript
let arrayWithDuplicates = [1, 2, 3, 1, 2, 4]
let set = new Set(arrayWithDuplicates)
let arrayWithoutDuplicates = Array.from(set)
console.log(arrayWithoutDuplicates) // 输出: [1, 2, 3, 4]
```

在这个示例中，我们首先定义了一个包含重复元素的数组 `arrayWithDuplicates`，然后我们通过将它传递给 Set 构造函数，创建了一个 Set `set`，这样就自动去除了重复的元素。接着，我们通过 `Array.from` 方法将 Set 转换回数组，得到了一个不包含重复元素的新数组 `arrayWithoutDuplicates`。

这是 Set 去重的一个常见实际应用场景，特别适用于需要处理大量数据并确保唯一性的情况。

### 2. 使用 Set 进行交集、并集、差集等操作

使用 Set 进行集合操作（如交集、并集、差集等）是 数据结构的一个重要应用场景。在 JavaScript 中，你可以利用 Set 提供的方法和运算符来实现这些集合操作。

下面是一些示例代码，演示了如何使用 Set 进行交集、并集、差集等操作：

- **交集（Intersection）：**

```javascript
let set1 = new Set([1, 2, 3])
let set2 = new Set([2, 3, 4])
let intersection = new Set([...set1].filter(x => set2.has(x)))
console.log(intersection) // 输出: Set(2) {2, 3}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/858f69d247524267a0a294970e90d91f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=18765&e=png&b=181818)

在这个示例中，我们创建了两个 Set `set1` 和 `set2`，然后通过使用扩展运算符 `filter`方法，找两个 Set 的交集，并将结果存储在新的 Set `intersection` 中。

- **并集（Union）：**

```javascript
let set1 = new Set([1, 2, 3])
let set2 = new Set([3, 4, 5])
let union = new Set([...set1, ...set2])
console.log(union) // 输出: Set(5) {1, 2, 3, , 5}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdb79cc7e73641efb9f904680c75d41d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=19568&e=png&b=181818)

在这个示例中，我们了两个 Set `set1` 和 `set2`，然后通过将它们合并并创建一个新的 Set `union`，从而得两个 Set 的并集。

- **差集 Difference）：**

```javascript
let set1 = new Set([1, 2, 3])
let set2 = new Set([3, 4, 5])
let difference = new Set([...set1].filter(x => !set2.has(x)))
console.log(difference) // 输出: Set(2) {1, 2}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d8d31a6afa740ea9c9e940e0eb97f65~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=18884&e=png&b=181818)

在这个示例中，我们创建了两个 `set1` 和 `set2`，然后通过使用 `filter`方法找到 set1 相对于 set 的差集，并将结果存储在新的`difference` 中。

通过这些示例，你可以看到如何使用 Set 数据结进行交集、并集、差集等集操作。

### 3. 其他常见应用场景

除了去重和集合操作外，Set 还有一些其他常见的用场景，以下是一些示例：

- **数据集合的快速查找**：

使用 Set 来存储大量数据，并利用其 O(1)查找效率，够快速判断某个元素是否已存在于集合中。

```javascript
let dataSet = new Set([1, 2, 3, 4, 5])
console.log(dataSet.has(3)) // 输出: true
console.log(dataSet.has(6)) // 输出: false
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeba9cab73f84fe1908253e826842777~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=19836&e=png&b=181818)

- **事件订阅与删除**：

利用 Set 储存订阅者，确保每个订阅者只订阅一次，避免重复订阅。

```javascript
let subscribers = new Set()
function subscribe(subscriber) {
  subscribers.add(subscriber)
}
function unsubscribe(subscriber) {
  subscribers.delete(subscriber)
}
subscribe('click') // 添加订阅
console.log(subscribers)
unsubscribe('click') // 删除订阅
console.log(subscribers)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c569635c60a44bff9df66cc7ceeae113~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=20406&e=png&b=181818)

- **字符去重**：

对字符串去重操作，避免重复字符出现，常用一些需要处理唯一字符的场景。

```javascript
function uniqueChars(arr) {
  return [...new Set(arr)]
}

const arr = ['a', 'b', 'c', 'a', 'd', 'e', 'b', 'c']
uniqueArr = uniqueChars(arr)
console.log(uniqueArr)
```

运行上述代码，输出结果为：`["a", "b", "c", "d", "e"]`，即成功去除了重复的字符。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45860444fe4c49e29cabc7d022a84ba3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=135&s=19960&e=png&b=181818)

- **数据对比**：

将数据存储在 Set 中，可以方便地进行数据对比，找出交集、差集等

```javascript
let setA = new Set([1, 2, 3])
let setB = new Set([3, 4, 5])
let intersection = new Set([...setA].filter(x => setB.has(x)))
console.log(intersection) // 输出 Set(1) {3}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/113540b1461a4c309849b51a953adf96~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=136&s=18523&e=png&b=181818)

这些都是 Set 数据结的一些常见应用场景，它的高效的去重和集合操作特性，使得它在实际开发中有着广泛的应用。

## 五、总结

在本文中，我们探索了 JavaScript Set 对象的迭代、转换和应用场景。通过对 Set 对象在实际开发中的使用，我们了解到它在处理独一无二的值集合时具有许多强大的特性。

首先，通过 Set 对象内建的迭代器方法，如 `forEach`、`keys`、`values` 和 `entries`，我们可以轻松地遍历 Set 中的所有元素，并对其中的每个元素执行特定的操作。这使得我们能够快速而直观地处理数据集合。

其次，Set 对象还可以很容易地与其他数据结构进行转换。我们可以将 Set 转换为数组，使用展开运算符，或通过 `Array.from` 方法进行转换。这为我们提供了灵活的选项，使我们可以在不同的场景下灵地操作和使用数据。

最后，通过总结常见的应用场景，对 Set 对象的特性得到了充分的利用。**无复值的特性**使得特别适用于**数据去重**、**检查是否存在重项**和**数组并集、交集、差集**等操作。此外，Set 对象还可以用于保留插入的顺序和快速的查找，用于构建简单的缓存机制等。

总的来说，Set 对象为开发者提供了一种简单而强大的机制来处理独一无二的值集合它的**迭代**、**转换**和**应用场景**让我们能够更加**灵活地处理数据**，并提高代码的可读性和性能。

希望本文为你在开发过程中应用 Set 带来启发，无论是处理数据**集合**、**去重**、**运算**等，Set 都是一个强大的工具。

<ArticleFooter link="https://juejin.cn/post/7302260568642174995" />
