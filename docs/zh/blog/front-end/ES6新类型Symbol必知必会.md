---
title: 一文了解 ES6 中独一无二的 Symbol 类型
---

# 一文了解 ES6 中独一无二的 Symbol 类型

![fileOf7174.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1a70f48cda34f44856522d188be571d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=500&s=141459&e=png&b=f9de55)

## 一. Symbol 的概念

`Symbol` 是 `JavaScript` 中的一种新的基本数据类型，引入自 `ECMAScript 6`（ES6）标准。它是一种不可变且唯一的数据类型，可以用来创建独一无二的键（key）。

Symbol 的创建方式是通过调用全局的 `Symbol()` 函数来生成。每个通过 `Symbol()` 创建的 Symbol 值都是独一无二的，即使它们的描述符相同也不相等。

Symbol 主要用于对象属性的唯一性标识。在对象中，Symbol 可以作为属性名，用来定义对象的非字符串类型的属性。由于每个 Symbol 都是唯一的，因此可以确保属性名的唯一性，避免属性名冲突的问题。

Symbol 还有一些内置的属性，比如 `Symbol.iterator`、`Symbol.hasInstance` 等，在某些情况下可以用来自定义对象的行为。

总而言之，`Symbol` 是 `JavaScript` 中一种用于创建独一无二键的基本数据类型，可用于定义对象的非字符串属性名，解决属性名冲突的问题。

## 二. Symbol 的使用方式

`Symbol` 的使用可以通过以下几个步骤进行：

#### 1. 创建 Symbol：

```js
const mySymbol = Symbol()
```

#### 2. 使用 Symbol 作为对象属性名：

```js
const obj = {}
const mySymbol = Symbol()
obj[mySymbol] = 'Symbol属性'
console.log(obj[mySymbol]) // 输出：Symbol属性
```

#### 3. Symbol 的描述符：

```js
const mySymbol = Symbol('描述符')
console.log(mySymbol.toString()) // 输出：Symbol(描述符)
```

#### 4. Symbol 的内置属性：

```js
const mySymbol = Symbol.iterator
const arr = [1, 2, 3]
const iterator = arr[mySymbol]()
console.log(iterator.next()) // 输出：{ value: 1, done: false }
```

需要注意的是，`Symbol` 作为属性名时，无法使用点运算符 **（.）** 而必须使用方括号 **（\[]）** 来访问。

`Symbol` 的主要作用是确保属性名的唯一性，避免属性名冲突的问题，以及在某些情况下可以自定义对象的行为。例如，可以使用 `Symbol.iterator` 创建一个自定义迭代器，通过遍历符号属性来处理对象的迭代。

除了以上示例，`Symbol` 还可以与其他 `JavaScript` 特性如迭代器、生成器、反射等一起使用，提供更强大的编程能力。

## 三. Symbol 的使用场景

`Symbol`的使用场景有很多，尤其用于创建独一无二键的基本数据类型，解决属性名冲突时使用。下面列举几个常见的例子：

#### 1. 属性名冲突解决：使用 Symbol 作为对象属性名，可以确保属性名的唯一性，避免属性名冲突的问题。

```javascript
const name = Symbol('name')
const age = Symbol('age')

const person = {
  [name]: 'John',
  [age]: 30
}

console.log(person[name]) // 输出：John
console.log(person[age]) // 输出：30
```

#### 2. 迭代器和可迭代对象：通过使用内置的 Symbol.iterator 属性，可以为对象创建自定义的迭代器，实现可迭代对象的遍历。

```javascript
const myIterable = {}
myIterable[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}

for (const value of myIterable) {
  console.log(value) // 输出：1 2 3
}
```

#### 3. 隐藏属性：使用 Symbol 作为属性名，可以隐藏属性，使其不容易被意外访问到。

```javascript
const secretKey = Symbol('secretKey')

const obj = {
  [secretKey]: 'abcdefg'
}

console.log(obj[secretKey]) // 输出：abcdefg
```

#### 4. 自定义对象的行为：通过自定义 Symbol 属性，可以自定义对象的一些行为，如迭代器、比较、字符串转换等。

```javascript
const comparator = Symbol('comparator')

class Person {
  constructor(name) {
    this.name = name
  }

  [comparator](other) {
    return this.name.length - other.name.length
  }
}

const person1 = new Person('John')
const person2 = new Person('Jane')

console.log(person1[comparator](person2)) // 输出：-1
```

这些只是 `Symbol` 的一些常见使用场景，`Symbol` 还可以与其他 `JavaScript` 特性相结合，扩展出更丰富的应用场景。

## 四.总结

### 使用 Symbol 具有以下的优势：

#### 1. 属性名的唯一性：

`Symbol` 可以确保属性名的唯一性，避免属性名冲突的问题。即使多个 `Symbol` 值使用相同的描述符，它们依然是不同的属性名。

#### 2. 防止属性被意外访问：

使用 `Symbol` 作为属性名，可以隐藏属性，使其不容易被意外访问到。这有助于在对象中定义私有属性或内部使用的属性。

#### 3. 扩展对象的功能：

通过自定义 `Symbol` 属性，可以为对象添加自定义行为，如迭代器、比较器等。这样，我们可以更灵活地扩展对象的功能，使其具备更多特定的行为。

#### 4. 安全性提升：

Symbol 的属性名不会被常规的属性遍历方法（如 `for...in` 循环）访问到，可以在一定程度上提升对象的安全性，防止属性被意外修改。

### 使用 Symbol 的缺点：

#### 1. 无法遍历：

`Symbol` 作为属性名时，无法通过常规的属性遍历方法（如 `for...in` 循环）获取到。如果需要遍历对象的属性，就不能使用 `Symbol` 作为属性名。

#### 2. 内存泄漏：

由于 `Symbol` 创建的属性是唯一的，一旦创建后就无法被销毁或被垃圾回收机制回收。如果大量使用 `Symbol` 创建属性，可能会造成内存泄漏的问题。

#### 3. 可调试性差：

`Symbol` 属性名在控制台输出时，没有明确的标识，不容易调试和查看对象的具体属性。

#### 4. 不可序列化：

`Symbol` 值不能被 `JSON.stringify()` 序列化，也不能作为对象的键值传递给其他线程或进程。

## 总结

通过学习`Symbol`，我们了解到虽然 `Symbol` 有一些缺点，但在合适的场景下，其独特的特性和优势仍然使其成为一个有价值的选择。为了充分利用 `Symbol`，需要在实际应用中权衡其优缺点，根据需求进行合理使用。

<ArticleFooter :link="['juejin::https://juejin.cn/post/7272658960301637668', 'weixin::https://mp.weixin.qq.com/s/VtoYRv2AkJjAw-79mzcj5Q']" />
