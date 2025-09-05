---
title: 经历了PMP和软考高项，我独立开发了一款刷题小程序
---

# 经历了PMP和软考高项，我独立开发了一款刷题小程序

# 一. 背景

四年前，我通过培训机构学习了 **PMP**，系统的学习了**项目管理知识体系**，说实话，学完感觉确实是有用的，尤其在项目管理方面，一些管理思维确实能够帮助到自己。

如果说 PMP 是国外的项目管理知识体系认证，那么国内也有相关的项目管理认证，叫做【**信息系统项目管理师**】，简称软考高项。由于它和 PMP 知识点重合度比较高，因此在通过 PMP 考试后，我也备考了这一项考试！但是由于当时市面上存在着各种题库，杂乱无章，有些还需要收费，看广告。因此我决定自己做一款适合自己考试的小程序，帮助自己顺利通过考试。

为了帮助广大的**软考**和 **PMP** 考试的朋友们，我特地的将我多年前做的这款小程序分享出来，不管是在 PMP 领域还是在软考的领域，希望给大家在考试的道路上助力成功。正巧最近我也优化了一些 **UI**，以及更新了一些题库，希望能够帮助到大家。

# 二. 有题记小程序

## 1. 已完成功能

- [x] 软考试题列表
- [x] PMP 试题列表
- [x] 考试模式（选择题、案例题、论文题）
- [x] 背题模式（选择题、案例题、论文题）
- [x] 基础知识学习

**接下来我们看一下已完成功能的应用快照吧！**

## 2. 首页-试题列表


![首页.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30d43ccd6b2147ca98455569c8c15dd0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=944&h=600&s=155382&e=png&b=fbfbfb)

## 3. 考试模式

![考试模式.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5805738304094fe383b594c496c3c330~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=970&h=637&s=242658&e=png&b=fefefe)

## 4. 背题模式

![背题模式.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76d0ed7644d845fc89ece9186672fd19~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=970&h=637&s=258631&e=png&b=fefefe)

## 5. 考试解析、答题卡

![考试解析、答题卡.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05cf3089a3334adfa3adecd3475b20f3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=970&h=637&s=201010&e=png&b=fefefe)

## 6. 重要知识总结

![ITTO.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b52e5ad9f93d46adb9826a611b8b22f0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1006&h=579&s=239365&e=png&b=f9f9f9)

# 三. 架构

总结一下我在开发这款小程序时所用到的一些技术栈，主要是基于 uni-app + uniCloud 来开发的，不得不说，uni-app 用来开发小程序太便捷了！

## 1. 前端技术栈

![前端技术栈.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daab524a47e046498d63c8cfc6e3e701~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=479&s=75093&e=png&b=fefafa)

### （1）uni-app：基于 Vue 2.x

目前 uni-app 也已经有了支持 Vue 3.x 的版本，同时也有了 uni-app x 的问世，号称是下一代 uni-app，是一个跨平台应用开发引擎。然而我目前还没有精力去研究。

关于 uni-app，我写过了很多的文章，相关知识可以通过我的专栏进行了解，我会继续更新更多的有关 uni-app 的最佳实践解决方案，点击 [掘金专栏：uni-app 前端开发](https://juejin.cn/column/7070045934851194911)了解，免费订阅获取更新。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e10491d42ba24c12a051cbaee0e2da11~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=958&h=901&s=294611&e=png&b=ffffff)

### （2）UI 框架：uView UI 1.0

关于 UI 框架，其实就是各种封装的轮子，如果用的顺手，能够大幅度提升你的开发效率。因为当时 uni-app 刚起步不就，用的人不太多，比较好的 UI 框架也不多，所以我简单对比了以下几款：

- **ColorUI**：一款高颜值 css 库，已经停止更新了好长时间。

- **官方组件库**： dcloudio/uni-ui，当时还不支持 npm 安装，坑巨多，现在可能好多了。

- **uView UI**：提供了各种组件和工具库，挺好用。

对比这三款，它们各有优缺点。ColorUI 颜值高，但是内部的 css 样式修改了小程序的原生组件样式，我认为太粗暴了，就放弃了。官方组件库 uni-ui 太丑了，bug 也很多，也没选用。

最终选用的是 uView UI，也有一些问题，当时只有 1.0，并且还在不断完善中，现在也已经不断更新，也有了 uView 2.0，并且也兼容了 nvue

### （3）个人开源框架 anyup/uni-ui

我崇尚简洁至上，仅需要简单的代码，就可以完成优秀的功能，能一行代码实现的功能，绝不两行代码。

因此，基于 uView UI，我又开发了一款适合自己项目的 uni-app 开源框架，与其说框架，不如说是为自己项目开发量身打造的工具库更为合适。

同时，这套工具库也是我在做 uni-app 项目中总结的一些最佳实践，公司内部使用良好。不过这也是多年前做的了，一直在断断续续维护中，最近也有计划，打算对它进行重构。

详细文档查看请点击：[anyup/uni-ui 官方文档](https://www.anyup.cn/docs/)

![官方文档.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4ec763e820043ab96a10924ef74f52d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=796&h=497&s=102287&e=png&b=ffffff)

## 2. 技术架构

可能通过 uni-app，你完全可以从 0 到 1 开发一款产品交付给用户了，不再需要复杂的后端开发、服务器运维了。当然还是仅限于简单项目，有多简单，可以自行体会。有题记小程序是我通过 uniCloud 云开发平台完成的前后端交互，数据存储、下载等功能，接下来简单介绍一下：了解 uniCloud，独立自主的开发一款应用。

我总结整理了一下技术架构图，如下所示：

![技术架构.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b53933276d4b435db0bc963a0e0604ff~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1930&h=940&s=144241&e=png&b=fff9f9)

### （1）云开发

uniCloud 是 DCloud 联合阿里云、腾讯云、支付宝云等，为开发者提供的基于 serverless 模式和 js 编程的云开发平台。提供 2 个免费服务空间，可以让你也可以拥有自己的服务器。我目前创建的是阿里云的服务器空间，将有题记小程序的云函数、数据库、前端代码部署在上面

### （2）云函数

云函数是指在云端（服务器端）运行的函数。无需购买、搭建服务器，编写代码并部署到云端即可在客户端（App/Web/小程序等）调用，同时云函数之间也可以互相调用。

一个云函数的写法与一个在本地定义的 JavaScript 方法一样，代码运行在云端 Node.js 中。当云函数被客户端调用时，定义的代码会被放在 Node.js 运行环境中执行。

之后，我们可以如在 Node.js 环境中使用 JavaScript 一样在云函数中进行网络请求等操作。

例如，一个最简单的云函数如下写法：

```js
// 云函数入口文件 index.js
"use strict";
exports.main = async (event, context) => {
  // event为客户端上传的参数
  let c = event.a + event.b;
  // 通过return返回结果给客户端
  return {
    sum: c,
  };
};
```

### （3）云数据库

uniCloud 提供了 2 个 nosql 数据库，如下：

- **JSON 文档型云数据库**

阿里云版的云数据库是 MongoDB 的 serverless 版；数据库中的每条记录都是一个 JSON 格式的对象。对于我们 JavaScript 开发者而言，非常容易理解。

MongoDB 的传统操作方法还是比较复杂，uniCloud 提供了更多简单操作数据库的方案，包括类似 SQL 的 JQL 语法、clientDB 等技术，感兴趣的可以去官方网站了解。

- **redis 数据库**

redis 是一种可以运行在内存中的键值对数据库，它的能力没有 MongoDB 强大，但由于可运行在内存中，它的性能远超常规数据库，同时它也使用 json 方式 key/value 键值对存储数据，目前我并没有使用到它，大家可以按需进行研究

关于操作数据库，在 uni-app 中，就如下述代码一样简单：

```js
// 获取数据库对象的API
const db = uniCloud.database();

// 获取名为 `table1` 数据表的引用
const table1 = db.collection("table1");

// 调用 add 方法，给数据表新增数据记录
table1.add({ name: "anyup" });
```

### （4）云存储

云存储提供稳定、安全、低成本、简单易用的云端存储服务，支持任意数量和形式的非结构化数据存储，例如图片、文档、音频、视频、文件等。

### （5）前端网页托管

uniCloud 同时也提供了前端网页托管的功能，可以将网站打包成 Web 传入，为 html 网页提供快速、安全、省心，关键是便宜的网站发布。

> 总结：如果你想要独立自主的开发一款适合自己的小程序，uniCloud 是一个不错的选择，当然，如果你有服务器，还会写后端语言，uniCloud 云开发的方式玩玩也是可以的，文末加我，有机会我们共同探讨，玩转前端开发！

# 四. 功能规划

## 1. 短期规划

- [ ] 微信登录
- [ ] 题库更新
- [ ] 题目收藏
- [ ] 计时考试
- [ ] 错题回顾
- [ ] 论文鉴赏

## 2. 长期规划

虽然在目前，小程序仅仅做了软考高项和 PMP 的考试和知识点的学习，但是在我的规划中，是有将目前的软考相关考试整合到这款小程序中的，主要包括以下：

- 高级：系统分析师、系统架构设计师、网络规划设计师、系统规划与管理师...
- 中级：软件设计师、网络工程师...
- 等等...

以上比较热门的考试，如果对这些考试的需求量大，我也可以考虑将题库引入。

# 五. 说明

## 1. 完全免费

在小程序中，所有题库免费查看，还有题目解析，而且没有任何广告。但是由于现在用的人少，就是担心将来用户增多，我那免费的服务器能否撑住？

## 2. 题库更新

目前仅仅上了做题系统，软考题库的的时间为 2018-2022，PMP 题库是基于第六版 PMBOK 指南教材的，后续有时间我会继续更新最新的题库。

因为我经历了 PMP 考试和软考高项。反向学习，通过题库汲取有用的知识，我觉得这是最能巩固自己记忆知识点的方式，当然肯定也需要你提前对基础知识的了解才可以，切勿盲做。

# 六. 如何获取

小程序名称：**有题记**

由于小程序未进行微信认证，当前在小程序市场搜索不到，同时在掘金又不方便放二维码，所以通过以下方式获取。
[点击查看沸点获取](https://juejin.cn/pin/7360578271584796687) ！

# 更新说明

## 2024.04.22 更新

最新 **UI** 已更新，**信息系统项目管理师** 2023 年真题题库已导入（目前支持 **2018年 - 2023年** 真题）。

因此软考高项真题题库暂时告一段落，预计本周会上线软考其他题库，敬请期待！


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f56bc151cc734fcaa9ded5486ca3488a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=945&h=610&s=153349&e=png&b=fdfdfd)

## 2024.05.04 更新

最新更新，目前已添加以下题库：

1. 软考高级
- 信息系统项目管理师
- 系统架构设计师

2. 软考中级
- 网络工程师
- 软件设计师

如下图所示，后续题库正在逐渐完善中。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c14397eef474e058e06be305fd47cec~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=654&h=1162&s=165910&e=png&b=f9f9f9" alt="image.png" width="50%" />

<ArticleFooter :link="['juejin::https://juejin.cn/post/7357141293111525416', 'weixin::https://mp.weixin.qq.com/s/D4s9qeRAGtPsF_rZ30iSzg', 'yuque::https://www.yuque.com/anyup/uniapp/kr7ze899zlsexvyh', 'csdn::https://blog.csdn.net/qq_24956515/article/details/137789087']" />
