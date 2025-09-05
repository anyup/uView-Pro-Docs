---
title: 7 分钟了解 flatMap 的使用及实现原理，并实现一个简易版的 flatMap
---

# 函数flatMap的使用及实现原理

## 一. 前言

在 JavaScript 中，数组方法是开发中经常用到的工具之一，也是在面试中经常提到操作数组的方法，其中的 `flatMap` 方法是一个非常实用且强大的方法。`flatMap` 方法可以在一个操作中同时对数组进行映射和展平，帮助简化代码并提高效率。

`flatMap` 方法可以让我们对数组进行一系列的操作，并返回一个新的扁平化数组。本篇文章将介绍 `flatMap` 的使用方法和原理解析，并且按照原理实现一个简易版的 `flatMap`。

本篇文章的重点将以下面这张图为导向进行说明：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/040d3652e49c4526a9177feb9009654b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=853&h=449&s=40470&e=png&b=fffefe)

## 二. 了解 flatMap

### 1. 基本语法

在 JavaScript 中，`flatMap` 方法用于对数组中的每个元素执行一个提供的函数（可以是映射函数或者返回数组的函数），然后将结果展平为一个新数组。下面是 `flatMap` 方法的基本语法：

```javascript
array.flatMap(callback(currentValue[, index[, array]])[, thisArg])
```

- `callback`: 一个用来处理每个元素的回调函数，可以传入三个参数：`currentValue` 表示当前元素的值，`index` 表示当前元素的索引（可选），`array` 表示原始数组（可选）。

- `thisArg` (可选): 回调函数执行时的 `this` 值。

首先，让我们来看一下 `flatMap` 的基本使用方法。

```javascript
const arr = [1, 2, 3, 4]

const newArr = arr.flatMap(x => [x, x * 2])

console.log(newArr)
```

在上面的例子中，定义了一个数组 `arr`，然后使用 `flatMap` 方法将数组中的每个元素乘以 2，并且把原来的元素和乘以 2 后的元素放在一个新数组中返回。

运行结果如下图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80dfbc45fc7d4268a70fd3febb04a2e6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=671&h=170&s=19904&e=png&b=181818)

### 2. map 和 flatMap

`map` 方法和 `flatMap` 方法都是数组原型上的方法，但它们之间有一些重要的区别：

1. `map` 方法会返回一个新数组，新数组的每个元素是通过回调函数处理原始数组中对应位置的元素得到的。

2. `flatMap` 方法会返回一个新数组，新数组是通过对原始数组的每个元素应用一个回调函数（可以返回一个或多个元素的数组）后，将结果展平到一维数组得到的。

因此，主要区别在于 `flatMap` 方法在处理嵌套数组时会自动展平结果数组，而 `map` 方法不会自动展平。这使得 `flatMap` 方法在处理嵌套数组、映射并展开数组等场景中更为方便和高效。需要根据具体的需求来选择使用 `map` 还是 `flatMap` 方法。

## 三. flatMap 的应用

### 1. 展平嵌套数组

`flatMap`方法可以很方便地展平嵌套数组，将多维数组转换为一维数组。这在处理树形数据结构或者多层嵌套数组时非常有用。

```javascript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6]
]

const flattenedArray = nestedArray.flatMap(arr => arr)

console.log(flattenedArray)
```

在上面的示例中，有一个嵌套数组 `nestedArray`，通过 `flatMap` 方法将其展平为一个一维数组 `flattenedArray`，最终得到展平后的结果 `[1, 2, 3, 4, 5, 6]`。

运行结果如下图所示：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ed3628243614f8dbfdb999a165e9169~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=671&h=128&s=18840&e=png&b=181818)

### 2. 映射并展开

`flatMap`方法可以将数组中的每个元素应用一个映射函数，然后将所有映射结果组合成一个新数组。这在对数组中的每个元素进行转换后，再合并成一个新数组时非常方便。

```javascript
const numbers = [1, 2, 3]

const mappedAndFlattened = numbers.flatMap(num => [num, num * 2])

console.log(mappedAndFlattened)
```

以上这个示例中，`flatMap`方法将每个数字与其乘以 2 的结果组合成一个新数组，并展开至一维数组。

运行结果如下图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99fa616d083445f7a97bbcd6aedaa297~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=671&h=128&s=18945&e=png&b=181818)

### 3. 过滤和转换

结合映射函数和过滤条件，`flatMap`可以过滤掉不需要的元素，同时对符合条件的元素进行转换。这可以用于数据处理和筛选。

```javascript
const words = ['apple', 'banana', 'grape', 'orange']

const filteredAndMapped = words.flatMap(word => {
  if (word.length > 5) {
    return word.split('')
  } else {
    return []
  }
})

console.log(filteredAndMapped)
```

在上面这个示例中，`flatMap`方法根据长度大于 5 的单词将其转换为字符数组，并展开至新数组。

运行结果如下图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4da9a912f33d423ab9289bb4bebc301e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=671&h=192&s=21240&e=png&b=181818)

## 四. 使用 flatMap 的好处

先来看一段同时使用 `filter` 和 `map` 方法遍历数组的代码。我相信这种场景大家一定碰到过。为了说明问题，这里我用简单的数字内容来举个例子。

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const squaredOddNumbers = numbers.filter(num => num % 3 !== 0).map(num => num * num)

console.log(squaredOddNumbers)
```

上面代码这样写，没什么问题，而且方法的连用也是比较推荐的处理方式，但是，还是请多想想，其实我们有更好的方式来处理这一类问题。

**现在我们看使用 flatMap 如何实现的**

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const squaredOddNumbers = numbers.flatMap(num => (num % 3 !== 0 ? [num * num] : []))

console.log(squaredOddNumbers)
```

运行结果如下图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b32fdd94d3d74976a28f56d6ba6c01ed~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=671&h=183&s=20587&e=png&b=181818)

**使用 flatMap 的好处是**

只要遍历一遍，而且不产生中间多余数组

在上面的示例中，我们有一个包含空值的数组 `arrayWithEmptyValues`，通过 `flatMap` 方法结合条件判断，可以过滤掉空值，得到过滤后的结果 `[1, 2, 4, 5, 7, 8, 10]`。

通过以上示例，我们可以看到 `flatMap` 方法在展平嵌套数组和处理包含空值的数组时的简单应用。`flatMap` 方法可以帮助我们轻松地处理各种数组操作。

## 五. flatMap 的原理解析

### 1. flatMap 的原理

`flatMap` 方法其实是 `map` 方法和 `flat` 方法的组合使用。首先，`map` 方法对原数组的每个元素执行一个提供的函数，并返回一个新数组。然后，`flat` 方法会将这个新数组扁平化处理，即将嵌套数组展开成一个新数组。

`flatMap` 是数组原型对象上的方法，它结合了 `map` 和 `flat` 两个方法的功能，用于映射每个元素并将结果展平到一个新数组中。

### 2. flatMap 的具体实现

`flatMap` 方法的具体实现方式如下：

- 对原数组执行 `map` 方法，根据传入的映射函数对每个元素进行处理，返回一个新数组，此时新数组是一个嵌套数组。

- 然后将这个嵌套数组通过 `flat` 方法展平为一个一维数组，并返回最终展平后的结果。

根据 `flatMap` 方法的实现原理，我们也可以自己实现一个简化版的 `flatMap` 方法。

```javascript
Array.prototype.customFlatMap = function (callback) {
  return this.map(callback).flat()
}

const arr = [1, 2, 3, 4]

const newArr = arr.customFlatMap(x => [x, x * 2])

console.log(newArr) // [1, 2, 2, 4, 3, 6, 4, 8]
```

## 六. 自定义 flatMap 方法实现

了解 `flatMap` 方法的实现原理很关键。`flatMap` 方法将原数组中每个元素应用一个映射函数，然后将结果组合成一个新数组，并且会展开嵌套数组。

基于这个原理，我们还可以使用 `reduce` 方法来实现一个简易版的 `flatMap`，下面是一个简单的自定义 `flatMap` 方法实现：

```javascript
// 自定义 flatMap 方法实现
Array.prototype.myFlatMap = function (callback) {
  return this.reduce((acc, current) => {
    // 对当前元素应用回调函数
    const result = callback(current)

    // 如果回调函数返回的是数组，则展开至结果数组中
    return acc.concat(Array.isArray(result) ? result : [result])
  }, [])
}

// 示例用法
const arr = [1, 2, 3, 4]
const mappedArr = arr.myFlatMap(num => [num, num * 2])

console.log(mappedArr) // 输出 [1, 2, 2, 4, 3, 6, 4, 8]
```

在这个自定义的`myFlatMap`方法中，使用`reduce`方法遍历原数组，并对每个元素应用传入的回调函数`callback`。然后根据回调函数的返回值判断是否为数组，若是数组则展开至结果数组中，若不是则转为数组后再合并。最终返回展平后的新数组。

> 请注意，这只是一个简单的自定义实现示例，实际生产环境中可能还需要考虑更多的边界情况和性能优化。

## 七. 总结

`flatMap` 方法的主要作用是对数组进行映射操作，并将结果展平为一个新的数组。在实际开发中，我们经常会遇到需要处理嵌套数组的情况，而使用 `flatMap` 方法可以轻松地展平这些嵌套数组，减少代码的复杂度。

`flatMap` 方法在处理数据转换、数据过滤、数据展开等场景中非常有用。它不仅可以简化代码逻辑，还可以提高代码的可读性和可维护性。在函数式编程中，`flatMap` 方法也被广泛应用，帮助开发者实现各种复杂的数据处理操作。

不过也有一些注意事项，在使用 `flatMap` 方法时，需要格外注意操作的返回值，确保返回的是一个数组。否则，`flatMap` 方法会将返回的结果进行默认的转换处理。

<ArticleFooter link="https://juejin.cn/post/7365698962531745830" />
