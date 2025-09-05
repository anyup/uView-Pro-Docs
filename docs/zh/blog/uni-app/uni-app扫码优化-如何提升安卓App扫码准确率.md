---
title: uni-app跳坑系列：谈谈我是如何提升安卓App扫码准确率的
---

# uni-app 跳坑系列：谈谈我是如何提升安卓 App 扫码准确率的

## 前言

之前的一个项目遭到用户吐槽：“**你们这个 App 扫码的正确率太低了**，尤其是**安卓的设备**。经常性的扫码扫不出来，就算是扫出来了，也是错误的结果！”

由于之前是扫描二维码的需求，所以没有对扫描条形码做严格的测试，客户提示说是条形码扫描效率低下。随即，我用自己的手机测试了一下，在安卓手机上确实有这样的问题，扫码准确率确实是低，尤其是条形码，扫码效率慢且不准确。扫描二维码的的效率还算可以，说的过去。

同一个 API，在小程序、Android、iOS 上的也会有差异，小程序和 iOS 设备上的扫码效率也属正常，唯独 Android 的机器略显尴尬。那么本篇文章我将和大家一起看一下如何在安卓的机器上提升一下扫码正确率吧！

## 如何优化

通过分析以上的这个问题，我们先分析一下是什么原因导致的这种异常现象：

- 通过官方的 API 调用的扫码，是否官方就已经存在着这个问题？是否已经有了解决方案？
- 如果是我们自己开发一个原生的插件是否能解决当先的难题？

通过以上的分析，我们分别从官方的角度和自定义的角度考虑一下这个问题的解决方案。

## 官方策略

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/648e28150a8d48ddb2796764ab6f99a5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1147&h=251&s=34361&e=png&b=ffffff)

调起客户端扫码，主要使用的是`uni.scanCode(OBJECT)`这个 API，查看官方的 API 说明，发现也没有特殊的差异性说明，也就是说：官方认为在 App 和小程序上的支持应该是一致的。

那我们就继续在看一下是不是我们使用的参数有问题？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f61ddd858f344a8eb938848df2f1e7bc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1246&h=551&s=144901&e=png&b=ffffff)

从上面图片可以看出，对 App 来说，能够配置影响扫码的 API 有：

- `scanType`：扫码类型
- `autoDecodeCharset`：是否启用自动识别字符编码功能，默认为否
- `autoZoom`：是否启用自动放大，默认启用

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc9fb002fe8544618e8315354bc826a9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=273&h=273&s=18986&e=png&b=ffffff)

```js
// 调起条码扫描
uni.scanCode({
  scanType: ['qrCode', 'barCode', 'pdf417'],
  autoDecodeCharset: true,
  success: function (res) {
    console.log('条码类型：' + res.scanType)
    console.log('条码内容：' + res.result)
  }
})
```

如上代码所示：`scanType` 添加支持了`qrCode`和`barCode`两种类型，也就是支持二维码、条形码、`PDF417`条码

重新打包后测试，发现改善效果甚微，可以说是没有改变，仍然扫码效率低下。

既然，使用官方的 API 优化并没有明显的改善效果，我们考虑一下别的方式呢？比如：使用封装的原生 API 方法。

## 自定义策略

经过查找资料了解到：App-vue 如果想自定义扫码，有以下几种方式：

- 使用 Html 5+ 的 Barcode 模块管理条码（一维码和二维码）扫描识别 [查看链接](https://www.html5plus.org/doc/zh_cn/barcode.html)。
- 自己封装一个安卓原生扫码 API：使用 zxing 插件等。

直接说明我自己的做法，采用了自定义封装的（zxing）安卓原生扫码 API，可以说是解决了扫码低下的问题：
首先，时间和精力有限，没有自己封装，而是从插件应用市场搜索到一个开发者已经封装好的扫码原生插件，直接使用的，下面通过以下几个步骤看一下是如何使用的：

### 1. 导入插件

将插件下载后放入 uni-app 的 nativeplugins 目录下，[下载地址](https://github.com/anyup/juejin-up/tree/master/src/nativeplugins)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1784b416104443a28b4cbe0c8f2edcfe~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=428&h=125&s=10996&e=png&b=fcf9e6)

### 2. 在 manifest.json 中配置插件

如下图所示，在 manifest.json 图形化配置菜单中点击 App 原生插件配置，选择本地插件进行配置
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9295a91290cb4c9aa4da485ee9b55485~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1011&h=705&s=184615&e=png&b=fcf7ee)

### 3. 添加权限

要使用安卓手机正常调用起摄像头进行扫码，需要添加对应的权限，这是必不可少的。

```json
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.FLASHLIGHT" />
```

### 4. 参数格式说明

| 参数名   | 说明               | 默认值 | 可选值               |
| -------- | ------------------ | ------ | -------------------- |
| scanType | 扫码类型           | null   | PDF_417、CODE_128 等 |
| prompt   | 扫码提示语         | -      | -                    |
| locked   | 方向是否锁定、旋转 | true   | true 或 false        |

### 5. 返回格式说明

| 参数名   | 参数说明       |
| -------- | -------------- |
| success  | 扫码状态       |
| scanType | 返回的扫码类型 |
| result   | 扫码结果信息   |

### 6. 使用方式

```js
// 引入插件
const myScanCode = uni.requireNativePlugin('My-ScanCode')
// 插件配置参数
const options = {
  scanType: ['CODE_128', 'QR_CODE'],
  prompt: '提示：将条形码/二维码图片对准扫描框即可自动扫描',
  locked: true
}
// 开始扫码
myScanCode.scanCode(options, res => {
  if (res.success === 'true') {
    // 扫码成功
  } else {
    // 扫码异常
  }
})
```

通过以上的几个步骤，我们就将原生扫码插件引入到我们项目中，并且配置成功后正常使用了。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6862f56168fc4f3a876ff0bff3197982~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=413&h=888&s=56257&e=png&b=010101" alt="image.png" width="40%" />

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e4ec0b8fb0246ff8908d2645208dcbe~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=413&h=888&s=552523&e=png&b=bcb3bd" alt="image.png" width="40%" />

## 注意事项

由于本次优化仅限于对安卓平台的优化，我们使用的插件也是针对于安卓平台的，因此需要平台差异化编码，让代码在安卓环境下进行，其他比如小程序、iOS 环境还是继续使用`uni.scanCode` 这个 API

```js
export default {
  start: function () {
    return new Promise((resolve, reject) => {
      // #ifdef APP-PLUS
      if (uni.getSystemInfoSync().platform === 'android') {
        const myScanCode = uni.requireNativePlugin('My-ScanCode')
        const options = {
          scanType: ['CODE_128', 'QR_CODE'],
          prompt: '提示：将条形码/二维码图片对准扫描框即可自动扫描',
          locked: true
        }
        myScanCode.scanCode(options, res => {
          if (res.success === 'true') {
            resolve(res.result)
          } else {
            reject(res)
          }
        })
      } else {
        uni.scanCode({
          onlyFromCamera: true,
          scanType: ['barCode', 'qrCode'],
          success(res) {
            resolve(res.result)
          }
        })
      }
      // #endif
      // #ifndef APP-PLUS
      uni.scanCode({
        onlyFromCamera: true,
        scanType: ['barCode', 'qrCode'],
        success(res) {
          resolve(res.result)
        }
      })
      // #endif
    })
  }
}
```

通过以上的差异性编码优化，就可以放心的使用了，不用担心兼容性问题了，使用方式如下：

```js
scanCode.start().then(res => {
  // 扫码成功后逻辑处理
})
```

## 总结

以上就是之前在项目中遇到的扫码问题。虽然时隔已经很长时间了，但是目前的代码运行良好，二维码和条形码的识别能力也有个质的提升。

由于当时开发较早，插件市场的插件寥寥无几，而且后来也发现了一款更优秀的原生扫码插件，拥有更优秀且强大的识别能力和识别速度，对**弱光**、**反光**、**模糊**的二维码也具有优秀的识别能力。

后续的文章我将会继续对其它扫码插件进行说明，看一下其他优秀的扫码插件是如何使用的，敬请关注！

<ArticleFooter :link="['juejin::https://juejin.cn/post/7300789760702824474', 'weixin::https://mp.weixin.qq.com/s/3c9IafKHtokl0wxqdjzJ8A']" />
