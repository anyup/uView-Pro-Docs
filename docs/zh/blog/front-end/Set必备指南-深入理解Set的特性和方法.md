---
title: JavaScript Set 必备指南：深入理解 Set 的特性和方法
---

# JavaScript Set 必备指南：深入理解 Set 的特性和方法

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db92c5656c5c4579b4f7c3a398bd1e8d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=589&h=351&s=97954&e=png&b=fdfafa" alt="image.png"  /></p>

## 一. 了解 Set

### 1. 概念和用途

Set 是 JavaScript 中的一种集合（collection）数据结构，它类似于数组，但是集合中的元素是唯一的，不允许重复。Set 提供了一种存储不重复数值或对象的机制，可以用于存储一组唯一的值，并且拥有一些方便的方法来操作这些值。

### 2. 为什么使用 Set

- **唯一性：** Set 中的元素是唯一的，不允许重复。这使得 Set 成为一种方便的去重工具，可以快速地剔除数组或其他数据结构中重复的元素。
- **性能优势：** 由于 Set 的内部实现使用了哈希表等高效数据结构，因此在查找和插入元素时具有较好的性能，特别是在处理大量数据时，使用 Set 可以提高处理效率。
- **丰富的方法：** Set 提供了丰富的操作方法，如添加元素、删除元素、查找元素、集合运算等，使得开发者能够方便地对集合进行操作。

JavaScript 的 Set 数据结构提供了一种高效、方便且具有唯一性的集合存储机制，适用于处理需要唯一性数据的场景，例如去重、标记已访问元素等。

## 二. 创建 Set

### 1. 使用构造函数创建 Set

在 JavaScript 中，您可以使用 Set 构造函数来创建一个新的 Set 实例。具体操作如下:

```javascript
// 创建一个空的 Set
let mySet = new Set()

// 创建包含初始元素的 Set
let initialSet = new Set([1, 2, 3, 4, 5])
```

### 2. 添加元素到 Set

可以使用 `add` 方法将元素添加到 Set 中，确保每个元素都是唯一的，不会重复添加:

```javascript
// 创建一个空的 Set
let mySet = new Set()

// 添加元素到 Set
mySet.add(1)
mySet.add(2)
mySet.add(3)
```

### 3. 从数组创建 Set

可以使用数组的元素来创建一个 Set 实例，数组中的重复元素将被自动去重：

```javascript
// 创建一个包含重复元素的数组
let duplicatesArray = [2, 3, 4, 4, 5, 5]

// 使用数组来创建 Set，同时来去重
let uniqueSet = new Set(duplicatesArray)
// 此时 uniqueSet 为 {2, 3, 4, 5}
```

通过上述方法，您可以很容易地创建 Set 并向其中添加元素，也可以通过数组快速地创建并去重一个 Set 对象。

## 三. Set 的特性

Set 是一种数据结构，它包含一组唯一且无序的值。在 JavaScript 中，Set 以对象的形式存在，其中的值只能出现一次。以下是 Set 的一些特性说明：

### 1. 唯一性

Set 中的值必须是唯一的。如果将相同的值加入 Set 多次，只会存储一次这使得 Set 成为去重数据的想结构。

```javascript
let uniqueSet = new Set()
uniqueSet.add(1)
uniqueSet.add(2)
uniqueSet.add(1)
console.log(uniqueSet) // 输出: Set(2) {1, 2}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f281d44d93242f2aa45204aed455a58~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=139&s=18207&e=png&b=181818)

### 2. 无序性

在 Set 中，值的排列顺序不是照插入的顺序来决定的。这意味着无法依赖 Set 的顺序性进行操作。

```javascript
let unorderedSet = new Set()
unorderedSet.add(3)
unorderedSet.add(1)
unorderedSet.add(2)
console.log(unorderedSet) // 输出: Set(3) {3, 1, 2}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3be48fd980644883826d49ca2abae5c5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=139&s=18054&e=png&b=181818)

### 3. 可迭代性

Set 是可通过迭代器进行遍历，可以使用 for... 循环或者 Array.from 方法将 Set 转换数组。

```javascript
let iterableSet = new Set([1, 2, 3])
for (let item of iterableSet) {
  console.log(item)
}
// 输出:
// 1
// 2
// 3
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6126e26dae9647e79643fe0c1d171a07~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=164&s=17125&e=png&b=181818)

### 4. 长度属性

Set 实例有 size 属性，表示 Set 中值的数量。

```javascript
let sizedSet = new Set([1, 2, 3, 4, 5])
console.log(sizedSet.size) // 输出: 5
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d715c351a5a2418cac5f8fb0f38526d6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=134&s=16512&e=png&b=181818)

### 5. 添加和删除

Set 具有添加值的 add 方法，移值的 delete 方法，以及清空所有值的 clear 方法。

```javascript
let addDeleteSet = new Set()
addDeleteSet.add(1)
addDeleteSet.add(2)
console.log(addDeleteSet) // 输出: Set(2) {1, 2}
addDeleteSet.delete(1)
console.log(addDeleteSet) // 输出: Set(1) {2}
addDeleteSet.clear()
console.log(addDeleteSet) // 输出: Set(0) {}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ee4b4ca908c4d2286f9bde22f44597c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=163&s=21210&e=png&b=181818)

### 6. 判断值是否存在

可以使用 has 方法来检查某一特定值是否存在 Set 中。

```javascript
let hasSet = new Set([1, 2, 3])
console.log(hasSet.has(2)) // 输出: true
console.log(hasSet.has(4)) // 输出: false
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebdf0884583f45508acaeca376a04937~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=147&s=17929&e=png&b=181818)

### 7. 引用

在 Set 中存储的值弱引用的，意味着如果没有其他引用指向 Set 中的某个值，那么这个值可能会被垃圾回收。

> 总的来说 Set 是一种非常有用的数据结构，特别适用于需要存储唯值并且不需要考虑顺序的情况。它的高效去重能力和集合操作特性，使得它在实际开发中有着广泛的应用。

## 四. Set 的方法

### 1. 添加元素：`add()`

使用 `add()` 方法向 Set 中添加新的元素。

```javascript
let mySet = new Set()
mySet.add(1)
mySet.add(2)
mySet.add(3)
```

### 2. 删除元素：`delete()`

使用 `delete()` 方法从 Set 中删除指定的元素。

```javascript
mySet.delete(2) // 从 Set 中删除元素 2
```

### 3. 检查元素是否存在：`has()`

使用 `has()` 方法检查指定元素是否存在于 Set 中。

```javascript
mySet.has(1) // 检查 Set 中是否存在元素 1，返回结果为 true 或
```

### 4. 清空 Set：`clear()`

使用 `clear()` 方法清空 Set 中所有元素。

```javascript
mySet.clear() // 清空 Set
```

### 5. 获取 Set 的大小：size 属性

使用 `size` 属性获取 Set 内元素数量。

```javascript
let setSize = mySet.size; 获取 Set 的大小
```

掌握以上的这些方法能够帮助你在开发过程中，熟练的对 Set 进行元素的增查操作，以及 Set 的大小信息。

## 五. 注意事项

通过上面的了解，我们基本认识到了 Set 的特性以及最常用的使用方法，但是在使用 Set 时，有几个注意事项需要我们提前了解一下，下面是我总结的使用 Set 时需要注意的几个事项：

### 1. 值的唯一性

Set 中的值必须是唯一的，相同的值不会被重复存储。这意味着当你向一个 Set 中添加已存在的值时，不会有任何变化。因此，要确保你向 Set 添加的值是唯一的，否则可能会导致意外的结果。

### 2. 对象引用

Set 存储的是值的引用，而不是复制。这意味着当你向 Set 添加一个对象时，实际存储的是对象的引用而不是对象本身。这可能会导致一些意想不到的结果，特别是在修改对象时。请注意在修改对象后检查 Set 中的值是否也会被修改。

### 3. NaN 的处理

在 Set 中，NaN 被视为是相同的值，即 NaN 只能存储一次。这可能与你的预期不同，因为在其他地方 NaN 通常被视为是不相同的值。所以，确保在使用 Set 存储 NaN 时，不会出现重复的情况。

```javascript
const set = [...new Set([Number('one'), Number('two'), 'one', 'two'])]
console.log(set)
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01308bf9eec647b0ab7b43109c455829~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=131&s=18005&e=png&b=181818)

### 4. 不支持索引访问

Set 不支持通过索引来访问值，因为它的值是无序的。如果你需要通过索引访问值，请考虑使用 Array。

### 5. 类型转换

当我们向 Set 中添加值的时候，不会进行类型转换，即 '1'和 1 是不相同的

```javascript
const set = [...new Set([1, '1'])]
console.log(set)
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d75846507ba4d89976eaedea9940955~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=131&s=16822&e=png&b=181818)

在使用 Set 时需要针对具体场景进行合理的选择和注意。尽管 Set 在去重和集合操作等方面非常实用，但也需要注意它的特性和限制，以便正确使用和处理数据。

## 六. 总结

通过对本文的学习，我们都知道了 Set 是 JavaScript 中的一种数据结构，它提供了一种用于存储唯一值的机制，同时还具备高效的数据操作能力。

首先，我们了解了 Set 的核心特性：**唯一性**、**无序性**、**可迭代性**以及**长度属性**等。这些特性使得 Set 成为一个强大的去重工具，并且具备高效的集合操作能力。

紧接着，我们逐一介绍了 Set 的各种方法的使用。我们学习了如何向 Set 中添加和删除值，通过 `add`、`delete` 和 `clear` 方法完成这些操作。我们还了解了如何判断某个值是否存在于 Set 中，通过 `has` 方法可以快速判断。

在实际开发中，Set 有着广泛的应用。无论是从一个数组中快速去重重复的值，还是利用集合操作来处理数据，Set 都能提供便利且高效的解决方案。

总而言之，Set 是 JavaScript 中的一个重要而强大的数据结构。通过深入理解 Set 的特性和方法，我们能够更好地应用它来解决实际问题。

<ArticleFooter link="https://juejin.cn/post/7301511024167632922" />
