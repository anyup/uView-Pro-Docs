---
title: uni-app扫码插件推荐：基于支付宝mPaaS扫码组件进行开发
---

# uni-app 扫码插件推荐：基于支付宝 mPaaS 扫码组件进行开发

## 一. 前言

之前说到，我的一个 uni-app 项目遭到用户吐槽：“**你们这个 App 扫码的正确率太低了**，尤其是**安卓的设备**。经常性的扫码扫不出来，就算是扫出来了，也是错误的结果！”

面对以上这个问题，我在当时的项目是使用了一个基于安卓原生 `zxing` 扫码插件实现的，虽然扫码效率可观，但是它也有一些弊端，比如：**仅支持安卓设备**，**不支持苹果设备**，**样式不是特别好看**，**反光二维码识别会有影响**等等，详细了解请参考我之前写过的一篇文章：

[uni-app 跳坑系列：谈谈我是如何提升安卓 App 扫码准确率的](https://juejin.cn/post/7300789760702824474)

今天这篇文章，我们继续探索一下是否还有其他更优秀的插件，可以给我们在 uni-app 的项目中提供流畅的扫码服务，之前在开发项目的过程中，确实发现一款相对更优秀的原生扫码插件，它拥有更优秀且强大的识别能力和识别速度，对**弱光**、**反光**、**模糊**的**二维码**也具有优秀的识别能力，接下来我们来具体的看一下吧！

## 二. mPaaS 扫码组件

mPaaS 扫码组件是支付宝的扫码组件，目的是可以让我们的 APP 拥有像支付宝一样的扫码体验，识别速度、识别率远超开源扫码。扫码组件完全免费提供使用，但是接入时需要在阿里云上进行注册开通并将 mPaaS 扫码添加到项目工程即可

## 三. 创建 mPaaS 应用

### 1. 开通阿里云 mPaaS

登录阿里云控制台，找到**移动开发平台 mPaaS**进入，或直接访问  [移动开发平台 mPaaS](https://www.aliyun.com/product/mobilepaas/mpaas) 产品页面就可以直接进入。

之后点击 “**管理控制台**”，进入 “**开通产品**” 页面。点击 “**立即开通**”，就可以开通 mPaaS 产品。

以上我们就完成了第一步，开通阿里云 mPaaS，接下来我们需要进行创建应用了。

### 2. 创建 mPaaS 应用

开通后您需要[创建一个 mPaaS 应用](https://mpaas.console.aliyun.com/#/mpaas/dashboard)

简单维护好**应用名称**和**应用 LOGO**就完成了开启 mPaaS 接入的第一步

将 mPaaS 接入到我的应用，1 分钟快速完成 App 代码配置

配置过程中主要包含以下四个步骤：

1. 维护应用信息

   - 主要是应用的名称及 Logo，感觉没什么用，可以跳过省略。

2. 下载配置文件

   - 填写配置信息，完成上传签名 APK，然后“**下载配置文件**”到本地，进行代码配置，需要上传签名后的 APK 文件，输入应用包名 Package Name

   - 这一步很重要，配置完成后，下载配置文件中有我们要用到的一些信息。

- Android 代码配置：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ec5750c1d0e43029a97807ee7c18851~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1177&h=675&s=124147&e=png&b=fefefe)

- iOS 代码配置：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/812aeff63dd0479d9ad2614ce2a592f3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1169&h=478&s=99038&e=png&b=959595)

3. mPaaS 基线选择：

   - 如果你是 Android 或 iOS 原生开发人员，可能你更倾向于自己开发 uni-app 原生插件，可以选择 mPaaS 某些基线功能，但如果我们仅是作为 uni-app 开发人员，不熟悉原生开发，这一步也可以进行忽略。

简单说一下 mPaaS 基线的含义，基线是指一系列功能的稳定版本的集合，是进一步开发的基础。而 mPaaS 产品是基于支付宝的某个特定版本开发的，因此对于 mPaaS 而言，基线则是所基于版本的 SDK 的集合。随着 mPaaS 产品的不断升级，会出现多个版本的基线。

4. IDE 组件配置

   - Android：主要是基于原生 AAR 方式使用 Android Studio mPaaS 插件

> 说明：在以上的接入步骤中，最重要的就是第 2 步，在接下来的配置插件步骤中需要我们使用配置文件中的信息。

## 四. 在 uni-app 中接入 mPaaS 插件

### 1. 下载封装好的 mPaas 原生扫码插件

下载地址：[进入页面，点击下载](https://gitee.com/anyup/juejin-up/blob/master/plugins/Mpaas-Scan_1.2.3.zip)

下载完成后，将 Zip 压缩包解压后，放入 uni-app 应用目录 `nativeplugins` 下

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a1ca555d76f4d3da67e2253e3a71eb2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=417&h=124&s=8661&e=png&b=faf7e2)

### 2. 修改插件的 config 信息

#### Android

这一步需要将第三部分中“**创建 mPaaS 应用**”中第 2 步已经下载的好的`config`配置文件信息同步到插件的`package.json`中，如下图所示：

![Snipaste_2023-12-12_16-28-49.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c26962470a504583afb762aa36be38aa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1658&h=506&s=219175&e=png&b=1e1e1e)

#### iOS

和 Android 同样的，将下载好的的 config 文件，重命名为 `meta.config`，然后将这个文件放入到 uni-app 项目中，

具体路径为：`/项目名称/nativeplugins/Mpaas-Scan/ios/meta.config`

### 3. 在 manifest.json 中选择本地插件

如下图所示，在 manifest.json 图形化配置菜单中点击 App 原生插件配置，选择本地插件进行配置

![Snipaste_2023-12-12_16-30-43.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e187fbb65f0a4b6fbe8a10414ff3118c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=932&h=639&s=157366&e=png&b=fdf6ee)

### 4. 在 manifest.json 中配置插件

![Snipaste_2023-12-12_16-32-21.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7674520dfd24ca6825f9136dd32f535~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=960&h=525&s=117616&e=png&b=fdf8e7)

### 5. 添加权限

#### Android

这一步不要忘记，因为要使用安卓手机正常调用起摄像头进行扫码，需要添加对应的权限，这是必不可少的。

Android 一般需要如下的权限：

1.  **CAMERA 权限**：允许应用程序访问设备的摄像头，用于拍照和录像功能。

1.  **WRITE_EXTERNAL_STORAGE 权限**：允许应用程序写入外部存储，用于保存文件和数据。
1.  **android.hardware.camera 特性**：表明设备拥有相机功能，应用程序可以使用该功能进行拍照和录像等操作。
1.  **android.hardware.camera.autofocus 特性**：表明设备支持自动对焦功能，用于相机拍摄时自动调整焦距。
1.  **FLASHLIGHT 权限**：允许应用程序控制设备闪光灯，用于手电筒功能和拍照时的补光。

```json
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
<uses-permission android:name="android.permission.FLASHLIGHT" />
```

#### iOS

同样的，iOS 也需要添加部分权限说明，用于应用第一次使用涉及到用户隐私的功能是弹出授权确认框上显示的信息，提交 App store 审核时此信息必须准确描述获取此权限的原因。

如下图所示：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e830ef248d34c72accb193c43a04e3a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1180&h=299&s=83194&e=png&b=fdfaeb)

## 五. 在 uni-app 项目中使用插件

### 1. 使用方式

在 uni-app 项目中，我们可以进行如下使用：

- 引入插件
- 调用插件方法
- 处理方法返回结果

```js
// 引入原生插件
const mpaasScanModule = uni.requireNativePlugin('Mpaas-Scan-Module')
// 调用插件的 mpaasScan 方法
mpaasScanModule.mpaasScan(
  {
    // 扫码识别类型，参数可多选，qrCode、barCode，
    // 如不设置，默认识别所有扫码类型，可能有些许影响识别效率
    scanType: ['qrCode', 'barCode'],
    // 是否隐藏相册，默认false不隐藏
    hideAlbum: false
  },
  ret => {
    console.log(ret)
    uni.showModal({
      title: '扫码结果',
      // 返回值中，有三个参数 resp_code、resp_message、resp_result
      // resp_code 表示返回结果值，10：用户取消，11：其他错误，1000：成功
      // resp_message 表示返回结果信息
      // resp_result 表示扫码结果，只有成功才会有返回
      content: JSON.stringify(ret),
      showCancel: false,
      confirmText: '确定'
    })
  }
)
```

### 2. API 参数说明

以下是 mPaaS 官方 API 调用时提供的方法入参、返回值和 code 错误码说明

#### 入参

| 名称      | 类型     | 必填 | 描述                                                                   |
| --------- | -------- | ---- | ---------------------------------------------------------------------- |
| scanType  | String   | 否   | 扫码识别类型，默认值为  `['qrCode','barCode']`。                       |
| hideAlbum | Boolean  | 否   | 是否隐藏相册（不允许从相册选择图片，只能从相机扫码），默认值为 false。 |
| success   | Function | 否   | 调用成功的回调函数                                                     |
| fail      | Function | 否   | 调用失败的回调函数                                                     |
| complete  | Function | 否   | 调用结束的回调函数（调用成功、失败都会执行）                           |

#### success 返回值

| 名称    | 类型   | 描述                       |
| ------- | ------ | -------------------------- |
| code    | String | 扫码所得数据               |
| qrCode  | String | 扫描二维码时返回二维码数据 |
| barCode | String | 扫描条形码时返回条形码数据 |

#### 错误码

| error | 描述     | 解决方案                                     |
| ----- | -------- | -------------------------------------------- |
| 10    | 用户取消 | 为用户正常交互流程分支，不需要进行特殊处理。 |
| 11    | 操作失败 | 具体原因需要查看客户端协助排查。             |

### 3. APP 演示

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9d359e624194827acce5d215835e04f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1297&h=718&s=299680&e=png&b=fefefe)

如果你想要体验 APP 的扫码想过，请下载我的 APP 进行体验，体验路径为：**首页** -> **工具类** -> **mPaaS 扫码**，下载链接如下：

[下载 Anyup Demo 安卓版进行体验](https://www.pgyer.com/anyup-demo)

## 参考文档

[mPaas 官方文档](https://help.aliyun.com/document_detail/49549.html?spm=a2c4g.165212.0.0.66762a9dEzJcn7)

[uni-app 支付宝原生扫码插件](https://ext.dcloud.net.cn/plugin?id=2636)

<ArticleFooter :link="['juejin::https://juejin.cn/post/7312358144924188722', 'weixin::https://mp.weixin.qq.com/s/RelllOXpwJLzMTXdlZl5vw']" />
