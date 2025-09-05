---
title: 改进 JavaScript 条件语句，探索可以替代 if...else 的 7 种方式！
---

# 改进 JavaScript 条件语句，探索可以替代 if...else 的 7 种方式！

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac433ca46b9144b193c23bfdea085ab8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=891&h=375&s=149479&e=png&b=f6e75e)

当优化 JavaScript 代码时，条件语句是一个经常需要思考和改进的关键部分。if...else 结构虽然是我们常用的条件语句之一，但当代码逻辑变得复杂，if...else 结构可能会导致代码冗长、难以维护和理解。因此，了解并掌握优化 if...else 结构的方法对于提高代码的可读性、可维护性和性能至关重要。

本篇文章中将根据不同的条件语句场景，提供各种不同 JavaScript 条件语句的写法，重点关注如何替代 if...else 的写法，从简单的技巧和出发，目的是提高代码的简洁性和可读性。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ae0dca0db13442186cd82f0dd1e4b01~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=914&h=571&s=63433&e=png&b=ffffff)

## 1. 使用三元运算符

三元运算符是 JavaScript 中的一种条件表达式，可以用于简化 if...else 语句的写法。它的语法是：

```javascript
condition ? expr1 : expr2
```

其中，condition 是一个条件表达式，如果条件为真，则返回 expr1，否则返回 expr2。

下面用一个简单的示例，说明如何使用三元运算符优化条件语句对比：

**示例：使用三元运算符优化条件语句对比**

```javascript
// 原始的 if...else 语句
let num = 0
let result
if (num > 0) {
  result = 'positive'
} else if (num < 0) {
  result = 'negative'
} else {
  result = 'zero'
}
console.log(result)
```

使用三元运算符优化后

```javascript
let num = 0
let result = num > 0 ? 'positive' : num < 0 ? 'negative' : 'zero'
console.log(result)
```

对于简单的条件语句，三元运算符是一个不错的选择，使用三元运算符可以使代码更加简洁和清晰，但在某些情况下也可能会影响代码的可读性。对于复杂的条件逻辑，建议慎重使用，也可以选用其他方式替代。

## 2. 使用逻辑与（&&）和逻辑或（||）

逻辑与（&&）和逻辑或（||）也是 JavaScript 中用于处理条件语句的方式之一，与三元运算符类似，逻辑与（&&）和逻辑或（||）可以帮助简化一些简单条件判断的写法。

**示例：使用逻辑与（&&）和逻辑或（||）优化条件语句对比**

```javascript
// 原始的 if 语句
let num = 10
let result
if (num > 0) {
  result = 'positive'
} else {
  result = 'non-positive'
}
console.log(result)
```

使用逻辑与和逻辑或优化后

```javascript
let num = 10
let result = (num > 0 && 'positive') || 'non-positive'
console.log(result)
```

在上面的示例中，利用逻辑与（&&）和逻辑或（||）的短路特性来简化条件判断。

- 当 num 大于 0 时，表达式 `num >  && 'positive'` 的结果为 `'positive'`，所以最终 result 的值为 `'positive'`；

- 当 num 不大于 0 时，表达式 `num > 0 && 'positive'`的结果为 false，然后逻辑或（||）操作符会返回结果`'non-positive'`。

> 注意：利用逻辑与（&&）和逻辑或（||）优化条件语句的方法适用于简单的条件判断，在复杂的条件逻辑下，也可能会降低代码的可读性。在编写代码时需要根据具体情况选择合适的方式来处理条件语句，以确保代码的清晰和易于维护。

## 3. 使用对象字面量（Object Literal）

使用对象字面量（Object Literal）通过将不同条件对应的值存储在对象字面量中，然后通过读取对象属性的方式来获取对应的值，使代码更加清晰和易于维护。

**示例：使用对象字面量优化条件语句对比**

```javascript
// 原始的 if-else 语句
let color = 'red'
let fruit

if (color === 'red') {
  fruit = 'apple'
} else if (color === 'yellow') {
  fruit = 'banana'
} else {
  fruit = 'unknown'
}
console.log(fruit)
```

使用对象字面量优化后

```javascript
let color = 'red'
let fruit =
  {
    red: 'apple',
    yellow: 'banana'
  }[color] || 'unknown'

console.log(fruit)
```

在上面的示例中，使用对象字面量来优化条件语句。通过将不同条件对应的值存储在对象字面量中，然后通过读取对象属性的方式来获取对应的值，能够简化 if-else 结构。在这个例子中，根据 color 的不同取值，直接获取对应水果名称的逻辑。

使用对象字面量的优化方法可以使代码更加简洁和易读，特别是在多个条件需要判断并返回不同值的情况下，可以替代冗长的 if-else 结构。当然，也需要根据具体情况选择合适的优化方式，以确保代码的清晰和可维护性。

## 4. 使用对象映射表（Map）

使用对象映射表（Map）适用于需要根据不同条件执行不同操作的情况，将不同条件和对应操作存储在 Map 中，根据条件获取对应的操作执行。

**示例：使用对象映射表（Map）优化条件语句对比**

```javascript
// 原始的 if-else 语句
let condition = 'B'

if (condition === 'A') {
  console.log('执行A操作')
} else if (condition === 'B') {
  console.log('执行B操作')
} else if (condition === 'C') {
  console.log('执行C操作')
}
```

使用对象映射表（Map）优化后

```javascript
let conditionsMap = new Map([
  ['A', () => console.log('执行A操作')],
  ['B', () => console.log('执行B操作')],
  ['C', () => console.log('执行C操作')]
])

if (conditionsMap.has(condition)) {
  conditionsMap.get(condition)()
}
```

通过上述的代码，使用对象映射表（Map）将不同条件和对应操作存储在 Map 中，根据条件获取对应的操作执行。

使用对象映射表（Map）优化条件语句的方法可以简化代码逻辑，提高代码的可读性和可维护性。特别适用于需要根据多个条件执行不同的情况，可以将条件和对应操作一一映射存储，通过 Map 快速获取执行对应操作。

## 5. 使用 Array.includes

使用 Array.includes 方法适用于需要判断某个值是否包含在一个数组中的情况，大大简化了条件判断的过程。

**示例：使用 Array.includes 优化条件语句对比**

```javascript
// 原始的 if-else 语句
let fruit = 'apple'
let isFruit = false

if (fruit === 'apple' || fruit === 'banana' || fruit === 'orange') {
  isFruit = true
}
console.log(isFruit)
```

使用 Array.includes 优化后

```javascript
let fruit = 'apple'
let fruits = ['apple', 'banana', 'orange']
let isFruit = fruits.includes(fruit)
console.log(isFruit)
```

在上面的示例中，原始的 if-else 结构需要逐个判断 fruit 是否等于 'apple'、'banana' 或 'orange'，而使用 Array.includes 方法则可以直接判断 fruit 是否包含在 fruits 数组中，从而简化了条件判断的过程。

使用 Array.includes 方法的优化方法适合于需要判断某个值是否属于一个集合的情况，避免了重复的多次判断。当需要判断值是否包含在某个数组中时，可以考虑使用 Array.includes 方法来优化条件语句。

> 注意：`Array.includes`  属于 ES6+ 中新增的方法，因此在较旧的浏览器版本中可能不被支持，为了确保网页在各种浏览器中的兼容性，如果需要使用 `Array.includes` 方法，可以考虑使用 [Babel](https://babeljs.io/) 或其他类似的工具来转译代码，将 ES6 的语法转换为能在更多浏览器中运行的 ES5 代码。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74e10f428b964520a38a633dd796370d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1369&h=403&s=87288&e=png&b=f0e6d1)

## 6. 使用 Array.every

使用 Array.every 方法适用于需要对数组中的所有元素进行条件判断的情况。

**示例：使用 Array.every 优化条件语句对比**

```javascript
// 原始的 if-else 语句
let numbers = [2, 4, 6, 8]
let allEven = true

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 !== 0) {
    allEven = false
    break
  }
}
console.log(allEven)
```

使用 Array.every 优化后

```javascript
let numbers = [2, 4, 6, 8]
let allEven = numbers.every(num => num % 2 === 0)
console.log(allEven)
```

原始的 if-else 结构通过遍历数组中的所有元素，判断是否全部为偶数，而使用 Array.every 方法则可以直接对数组中的每个元素应用条件判断，并返回是否所有素都满足条件的结果。

使用 Array.every 方法的优化方法适合于需要对数组中所有元素进行条件判断的情况，能够大幅度的简化代码逻辑。当需要判断数组中所有元素是否满足某个条件时，可以考虑使用 Array.every 方法来优化条件语句。

## 7. 使用 switch...case

使用 switch...case 适用于多个条件需要进行严格相等比较的情况。

**示例：使用 switch...case 优化条件语句对比**

```javascript
// 原始的 if-else 语句
let fruit = 'apple'
let color = ''

if (fruit === 'apple') {
  color = 'red'
} else if (fruit === 'banana') {
  color = 'yellow'
} else if (fruit === 'orange') {
  color = 'orange'
} else {
  color = 'unknown'
}
console.log(color)
```

使用 switch...case 优化后

```javascript
let fruit = 'apple'
let color = ''

switch (fruit) {
  case 'apple':
    color = 'red'
    break
  case 'banana':
    color = 'yellow'
    break
  case 'orange':
    color = 'orange'
    break
  default:
    color = 'unknown'
}
console.log(color)
```

在上面的示例中，原始的 if-else 结构包含多个条件判断，而使用 switch...case 结构可以更清晰地将不同情况分支进行处理，适用于多个严格相等比较的情况。

使用 switch...case 语句的优化方法适合于需要根据不同值进行严格相等比较的情况，能够简化逻辑，提高代码的可读性和可维护性。当需要对多个条件进行严格相等比较时，可以考虑使用 switch...case 语句来优化条件语句。

<ArticleFooter link="https://juejin.cn/post/7338645700098785331" />
