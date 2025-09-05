---
title: 巧用 meta 标签，设置 referrer 解决 403 Forbidden 问题
---

# 巧用 meta 标签，设置 referrer 解决 403 Forbidden 问题

## 一. 问题背景

在网页开发过程中，我们经常会开发一些试用功能或 demo 片段，或多或少的会借用一下网络上的现有资源。然而当我们访问某些资源的时候可能会出现一些问题，比如：`403 Forbidden` - 禁止访问。

例如：当我们访问一些外部资源，如图片资源时：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c46f693545341958f3ba18fdbe08fbf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=920&h=367&s=62100&e=png&b=fefefe)

当我们访问一些外部接口获取数据时：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/294d8eeb318c4e6b8f8ee0413ae37f56~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=920&h=328&s=36666&e=png&b=fefefe)

以上的返回结果均为：**403 Frobidden**

我在实际开发过程中确实有遇到过这种问题，比如我在开发示例代码 **【实现地图下钻】** 功能时，由于地图下钻时使用的各个省市区 geoJson 是阿里云 DataV 平台提供的，因此当我直接调用平台数据时，出现了 403 Forbidden 问题，[ECharts 地图实战分析：实现一个完整的地图下钻功能](https://juejin.cn/post/7345297984264863782)

示例代码是这么写的：

```js
function getJSON(adcode, callback) {
  const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`
  $.getJSON(url, function (data) {
    callback(data)
  }).fail(function () {
    alert('无此区域地图显示，请查看其他区域！')
  })
}
// 获取国家级 geoJson
getJSON('100000', function (data) {
  console.log(data)
})
// 获取山东省 geoJson
getJSON('370000', function (data) {
  console.log(data)
})
```

以上代码需要请求域名为 `https://geo.datav.aliyun.com` 中的 json 数据，由于有来源验证，因此在我直接调用后，返回了禁止访问！

然而，更加奇怪的是，当我本地测试的时候可以正常获取资源，然而当正常发布到线上时发现它又不可以了，继续报 **403 Forbidden** 了。

不过现在使用本文中介绍的方式，就可以解决以上这种问题，我们继续向下看。

那么，这是一种什么错误呢？

`403 Forbidden` 是一种客户端错误响应，表示服务器理解了请求，但拒绝执行它。这通常是因为服务器拒绝根据客户端的请求提供网页或资源。

因此，在我看来，这种错误是完全合理的，因为它的主要目的是保护系统免受未经授权的访问，确保数据安全和完整，同时也维护服务器资源的稳定运行。因为你随意的访问别人服务器的资源，就有可能会影响人家服务器的正常稳定运行，给别人带来风险。

那么我们在测试的时候应该如何避免这种错误呢？换句话说，我能否正常的访问这些资源？答案是可以的，接下来我们看一下如何解决。

## 二. 解决方案

直接说解决方案，添加 `meta` 标签，解决访问 403 Forbidden 错误

```js
<meta name='referrer' content='no-referrer' />
```

接下来我们看一下，以上代码做了什么？

当我们不加以上的代码时，请求资源的时候 `Referer` 会携带域名，标识来源。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93db43af60c34048a8bc12c548e57438~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=943&h=464&s=80899&e=png&b=fefdfd)

当我们加上以上的代码时，请求资源的时候 `Referer` 携带项则为空。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01e1f9e7bbad44989bfba16677cd46ac~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=955&h=524&s=95226&e=png&b=fdfdfd)

因此总结一下 `<meta name="referrer" content="no-referrer" />` 的作用：

当设置为 `no-referrer` 时，浏览器不会在请求中发送 Referer 头部，从而保护了源页面的 URL 不被目标资源服务器知晓，同时也防止 Referer 泄露

因此一些网站使用 Referer 头部来判断请求是否来自授权的来源，而设置 `no-referrer` 可以绕过这种防盗链机制，使资源可以从任意页面加载。

## 三. 原理浅析

当你在网页中添加 `<meta name="referrer" content="no-referrer" />` 标签时，你实际上是在指示浏览器不要在 HTTP 请求中包含 `Referer` 头。这意味着服务器将不会收到有关请求来源的信息，这有时可以使服务器不再拒绝请求，因为它无法确定请求是否来自一个应被阻止的源。

具体来说，以下是一些可能导致服务器因为 `Referer` 信息而产生 403 Forbidden 错误的情况：

- **防盗链策略**：有些服务器会检查 `Referer` 头，以确保所有外部资源（如图像、视频、字体等）的请求都来自同一站点或一组授权站点。如果 `Referer` 头缺失或不符合预设的规则，服务器可能会拒绝请求。

- **安全策略**：服务器可能配置了安全策略，仅允许来自特定来源的请求。如果请求的 `Referer` 头显示请求来自一个不在白名单上的源，服务器将拒绝请求。

- **隐私政策**：有些服务器可能有隐私政策，不允许从未经允许的源引用其资源，以保护用户隐私。

通过使用 `no-referrer` 设置，浏览器将不会向服务器发送 `Referer` 信息，这样服务器就无法基于 `Referer` 头来做出拒绝请求的决策，从而可能避免 403 Forbidden 错误的发生。Referer 头部有多种用途，包括但不限于统计分析、防盗链、优化缓存等。

## 四. meta referrer 的选项

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f404628324c241e783b397bc8c1be772~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=952&h=581&s=85367&e=png&b=fefafa)

当浏览器解析 HTML 文档时，它会读取`<meta>`标签中的指令。`<meta name="referrer"`标签告诉浏览器如何处理 Referer 头部。`content`属性的不同值决定了 Referer 头部的处理策略：

- **no-referrer**：完全禁用 Referer 头部，即不发送任何 Referer 信息。

- **no-referrer-when-downgrade**：只有当从 HTTPS 请求降级到 HTTP 请求时，才不发送 Referer 信息。这有助于保护 HTTPS 站点的隐私，同时允许 HTTP 到 HTTPS 的引用。

- **origin**：发送请求的站点的协议、主机名和端口号，但不包括路径或查询参数。

- **origin-when-cross-origin**：当请求是跨域时，只发送起源信息；同源请求则发送完整的 URL。

- **same-origin**：只在同源请求中发送完整的 URL，跨域请求时不发送 Referer 信息。

- **strict-origin**：与`origin`相似，但在跨域请求中不发送 Referer 信息。

- **strict-origin-when-cross-origin**：与`origin-when-cross-origin`相似，但在跨域请求中只发送起源信息。

- **unsafe-url**：发送完整的 URL，包括路径和查询参数，即使请求是跨域的。

通过使用 `<meta name="referrer"` 标签，我们在开发网站时可以更加精细控制 Referer 头部的行为，以适应不同的安全和隐私需求。

## 五. 总结

在某些情况下，将 `<meta name="referrer" content="no-referrer" />` 添加到网页的 `<head>` 部分确实可以帮助解决 403 Forbidden 错误。这是因为一些服务器或 Web 应用会检查 HTTP 请求头中的 `Referer` 字段，以确定请求的来源，并基于这个信息做出访问控制决策。当`Referer`字段显示请求来自一个未授权或不受信任的源时，服务器可能会拒绝请求，从而返回 403 Forbidden 错误。

然而，这种方法只是掩盖了 `Referer` 头，而不是解决了潜在的访问控制问题。在某些情况下，服务器可能有合理的理由拒绝请求，比如出于安全或隐私的考虑。

因此，禁用 `Referer` 头只是一种简单的方式，尤其在当我们进行测试代码或者做自己的小应用验证时，有可能会使用第三方的资源，如果也出现 403 Forbidden，而这时候巧用、善用、适度使用 `Referer` 也许能解决你的问题。

<ArticleFooter link="https://juejin.cn/post/7388072384349650959" />
