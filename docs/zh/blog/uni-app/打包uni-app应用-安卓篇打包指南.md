---
title: 【超详细】从0到1打包你的uni-app应用：安卓篇打包指南
---

# 【超详细】从 0 到 1 打包你的 uni-app 应用：安卓篇打包指南

## 一. 介绍

在当前移动应用开发的大环境下，uni-app 作为一种使用 Vue.js 开发多平台应用的框架，为开发者提供了快速构建跨平台应用的能力。本文将为你介绍如何将 uni-app 项目打包成安卓应用，让你的应用在安卓设备上运行并上架应用市场。

## 二. 准备环境

在开始之前，确保你已经安装了以下软件和工具

1. **[Node.js](https://nodejs.org/en)**
2. **[HBuilderX](https://www.dcloud.io/hbuilderx.html)**
3. **[JDK](https://www.oracle.com/java/technologies/downloads/)**（Java Development Kit）

如果你想要实现本地版离线打包，你还需要安装安卓的环境。不过如果你之前对开发安卓没有成熟的经验，你将会非常痛苦。

**离线打包需要安装以下工具**

1.  Android Studio
    下载地址：[Android Studio 官网](https://developer.android.google.cn/studio/index.html) OR [Android Studio 中文社区](http://www.android-studio.org/)

2.  App 离线 SDK 下载：[最新 android 平台 SDK 下载](https://nativesupport.dcloud.net.cn/AppDocs/download/android)

> 本文不对离线打包做详细的说明，非特殊情况下，非专业的安卓开发人员，真的不建议使用离线打包。

## 三. 创建应用

在 HBuilderX 中建新的 uni-app 项目或打开已有的项目。

1. 在 HBuilderX 中，点击 “文件” -> “新建” -> “uni-app 项目” 或者选中已有的项目。
2. 输入项目的名称和存放路径，并选择适当的模板。
3. 点击“创建”来生成项目文件。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5443f3bda134bf283f2ffc9f1524f35~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1027&h=693&s=99755&e=png&b=fdfbf7)

## 四. 生成签名证书

生成 Android 平台签名证书（.keystore）是用于对应用进行数字签名以确保应用的安全性和完整性。下面是一个简单的 Android 平台签名证书生成指南，请参考：

### 步骤一：安装 JDK（Java Development Kit）

1. 访问 [Oracle](https://www.oracle.com/java/technologies/downloads/) 官方网站，并下载适用于你的操作系统的 JDK 安装程序。
2. 执行安装程序，并按照提示进行安装。

### 步骤二：打开终端或命令提示符

1. 在 Windows 上，按下 Win + R，输入 cmd，然后按回车键打开命令提示符。
2. 在 Mac 上，打开“应用程序”>“实用工具”>“终端”。

### 步骤三：导航到 JDK 的 bin 目录

在终端或命令提示符中，使用以下命令导航到你安装的 JDK 的 bin 目录。根据你的 JDK 版本和安装路径可能有所不同，以下命令仅供参考。

```
cd C:\Program Files\Java\jdk1.8.0_221\bin  // Windows示例路径
cd /Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home/bin  // Mac示例路径
```

### 步骤四：生成签名证书

在终端或命令提示符中，使用以下命令生成签名证书（.keystore 文件）。根据你的需求和项目要求，可以根据需要修改命令中的参数。

```
keytool -genkey -v -keystore my-release-key.keystore -alias my-release-key -keyalg RSA -keysize 2048 -validity 10000
```

命令解释：

- `-genkey`：生成密钥对和证书。
- `-v`：在终端中显示密钥和证书的详细信息。
- `-keystore my-release-key.keystore`：指定要生成的.keystore 文件名。
- `-alias my-release-key`：指定密钥和证书的别名，可以自定义。
- `-keyalg RSA`：指定密钥算法为 RSA。
- `-keysize 2048`：指定密钥的位数为 2048。
- `-validity 10000`：指定证书的有效期，单位为天。

### 步骤五：按照提示填写证书信息

生成签名证书的命令会提示你填写一些证书信息，如证书拥有者的姓名、组织单位名称、城市、州/省、国家等。根据实际情况填写这些信息。

### 步骤六：设置密码

生成签名证书时，需要设置一个密码以保护证书的安全性。请记住这个密码，它将用于以后对应用进行签名和更新。

步骤七：确认生成的签名证书
生成签名证书后，会在当前目录下生成一个名为 my-release-key.keystore 的文件。请确保将这个文件妥善保存，并备份好。

生成签名证书后，你就可以使用它对你的 Android 应用进行签名了。在打包应用时，通过引用签名证书，可以验证应用的身份和完整性。

> 请注意，签名证书是非常重要的，请妥善保管好它，并谨慎分享证书文件和相关密码，以免引发安全问题。

## 五. 配置应用

### 1. 配置应用基础信息

在基础配置页签，填写应用名称、应用描述、应用版本及应用版本号等基本信息，如下图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/586caa76396648b98b76134ade446b5f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1077&h=681&s=107364&e=png&b=fefaed)

> 说明：
>
> 应用版本名称为一个字符串，例如：1.0.0，通常代表同一个应用不同的版本名称；
>
> 应用版本号是一个 number 类型的数字，通常从 1 开始依次累加，从根本上用来区别不同版本，主要用来版本更新覆盖等。

### 2. 配置应用图标

主要用来配置应用在桌面上的图标显示，这里需要配置不同分辨率的图标，主要是为了在不同屏幕分辨率的手机下避免失真效果。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dba8d8bb8ee40f9b3326029c6f14e67~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=257&h=66&s=17568&e=png&b=62879a)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f417a876e2a04c0f8314fe6e8e8ae887~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1077&h=689&s=129535&e=png&b=fefaeb)

> **小技巧**：
>
> 我通常是让 UI 同学 出一张大分辨率尺寸的图片，利用 HBuilderX 工具一键生成所需要的各种不同分辨率的图片，如上图所示，自动生成图标功能，方便快捷。

### 3. 配置应用模块

应用模块主要会涉及到一些真机的能力，比如：使用照相机、蓝牙、相册、定位等功能，也可以配置一些 uniapp 已经支持的第三方插件配置，比如：第三方地图（高德、百度等）、第三方分享、友盟统计等。如下图所示进行按需选择。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a68c2108b2f429ea8d21f6af30d1989~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=858&h=762&s=160774&e=png&b=fefaea)

目前在 uni-app 中所涉及的 Android 模块配置模块及三方 SDK 主要有以下几个，均可以在 HBuilderX 中进行选择配置

- Geolocation (定位)
- Push (消息推送)
- Share (分享)
- Oauth (登录鉴权)
- Map (地图)
- Payment (支付)
- Speech (语音输入)
- Statistic (统计)
- FacialRecognitionVerify (实人认证)
- uni-AD
- Android X5 Webview (腾讯 TBS)

> **不过需要注意的是**，如果没有使用某一些模块功能，请不要勾选，因为你每选择一个模块，将会增大你的应用体积。切记要按需选择。

### 4. 配置应用权限

在 App 权限一栏中，根据应用的需求，勾选对应的权限，通常有一些所必要的权限，下面我进行列举，其他的按照应用内所设计的权限进行添加即可。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5012de8b27f84a17aa87d1f81156756c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=828&h=539&s=118692&e=png&b=fefaea)

我总结了一下我目前的一个最简单的 App 常用的权限有：（仅涉及到扫码功能）

1. `<uses-feature android:name="android.hardware.camera"/>`
   指定了应用需要使用相机功能。用于在应用中拍摄照片、录制视频或进行其他与相机相关的操作。

2. `<uses-feature android:name="android.hardware.camera.autofocus"/>`
   指定了应用需要使用相机的自动对焦功能。用于在应用中实现相机对焦功能，以确保拍摄的照片或视频清晰。

3. `<uses-permission:name="android.permission.CAMERA"/>`
   允许应用访问设备的相机。用于应用在运行时获取相机的访问权限，可以进行拍摄、录制等操作。

4. `<uses-permission android:name="android.permission.FLASHLIGHT"/>`
   允许应用控制设备的闪光灯。用于应用在需要时打开和关闭设备的闪光灯。

5. `<uses-permission android:name="android.permission.INTERNET"/>`
   允许应用访问互联网。用于应用在需要联网的功能中实现数据的传输和获取。

6. `<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>`
   允许应用挂载和卸载文件系统。用于应用在需要读取和写入外部存储设备（如 SD 卡）时进行相关操作。

7. `<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>`
   允许应用向外部存储设备写入数据。用于应用在需要保存文件到外部存储设备时进行相关操作。

8. `<uses-permission android:name="android.permission.WRITE_SETTINGS"/>`
   允许应用修改系统设置。用于应用在需要修改设备设置（如音量、显示亮度等）时进行相关操作。

这些权限在安卓应用开发中常见且常用，根据应用的实际需求，可以在清单文件（**manifest.json**）中声明和使用这些权限。确保应用以正确、安全的方式使用这些功能和资源，例如相机、闪光灯、互联网访问、外部存储等。

请注意，在 Android 6.0（API 级别 23）及以上版本，部分权限属于危险权限（**Dangerous Permissions**）。用户在安装应用时需要授予这些权限，否则应用将无法正常使用对应的功能。在使用这些权限时，应遵循 Android 官方的权限管理原则。

> 基本上完成上面的几个 App 配置就差不多了，后续可以根据自己对项目的深入程度，定向的做一下删减或增加。

## 六. 真机调试

在打包引用之前，我们首先要经过真机测试，保证所要打包的代码在真机环境下运行没有问题，才可以启动打包程序，可以采用以下步骤进行连接安卓手机进行真机调试

1. 首先通过 USB 连接安卓手机，并打开开发者选项，允许 USB 调试开关打开
2. 选择运行到 Android App 基座即可选择你在上一步连接电脑的安卓手机，确认运行就可以了

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b6baa2a5f144fcfb3ba1a139ed27f4e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=487&h=241&s=82920&e=png&b=ecece2)

> 说明：如果在这个地方检测不到你的真机设备，说明手机和电脑通过 USB 未真正连接成功，通常的解决方案是下载一个 360 手机助手、豌豆荚、应用宝等第三方应用，这些应用会安装一些必备的驱动，从侧面解决你的连接调试问题。

真机调试主要是测试你的代码运行情况，避免频繁使用云打包带来的延时、效率低下的问题。避免编写一行代码几秒钟，打包一次 5 分钟的尴尬境地，大幅度的降低了开发效率。

## 七. 云打包

### 1. 发行

打开 HBuilderX 的工具栏点击工具栏参数界面的 “**发行**” 按钮，可以看到有如下的菜单提供选择，下面分别对 App 发行的选项进行说明：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/890b608179a44e3eafb17a7a38e170ba~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=485&h=525&s=150420&e=png&b=f0efe2)

1. **原生 App - 云打包**

这个功能是我们接下来要使用的重点功能，主要用来打包 App 的配置项，包括 Android 配置和 iOS 配置，接下来会进行详细的说明。

2. **原生 App - 查看云打包状态**

很简单，这个功能主要是用来发布云打包请求之后，查看目前所请求的云打包状态，是否打包成功，如下图展示。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68bbe98f73f84caf8b4b8818999dba06~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1023&h=134&s=106080&e=png&b=fdfaf3)

3. **原生 App - 本地打包**

这个功能主要是生成本地打包 App 资源，然后配合 Android Studio 进行离线打包。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c0ed77309804bca9f24dbfc567c9afc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=503&h=175&s=66552&e=png&b=efeee7)

运行该指令，主要会将你的项目生成 一个 **www** 的文件夹，这是 App 离线 资源，主要包含以下内容。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fc292629a884d87af5195148b9feac0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=902&h=532&s=141078&e=png&b=fefefe)

这种方式，如果你想要深入了解的话，请参考以下链接：
[App 离线打包](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)

4. **原生 App - 制作应用 wgt 包**

这个功能其实很有用，其主要生成 H5 的资源包，主要用于应用热更新，解决频繁的整包更新。如果你的应用使用了热更新方案，那么这个你将会时常用到。

### 2. 云打包

点击 “**原生 App - 云打包**” 按钮，HBuilderX 将打开打包配置界面，主要填写好下面几个参数，即可实现云打包。主要填写的相关信息如下：

- Android 包名
- 证书的相关信息（上文中我们已经生成了相关证书）
  - 证书文件
  - 证书别名
  - 证书密码
- 选择传统打包或快速安心打包
  - 主要区别在于是否上传证书及代码

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e70b2b4ae3644b0e8a6c6abde0fdf761~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=759&h=922&s=128855&e=png&b=fcfcfc)

## 八. 总结一些坑

### 1. 上线 Google Play 应用市场

1. 确保将 HBulider X 升级到 **3.2.15+版本**，否则 App 将会出现问题
2. App 提交云端打包时请勾选“**GooglePlay(AAB)**”渠道，生成.aab 格式的应用
3. 不能直接下载 apk 方式安装应用，需引导用户到 **Google Play** 安装
4. 不能存在**动态加载代码**行为
5. “App 常用其它设置”中需要将 **targetSdkVersion** 设置值大于等于 **30**
6. 务必在 Android11 设备上进行测试，确保应用所有功能可以正常运行
7. **不能包含安装应用权限**，在 App 权限配置中不要勾选 android.permission.INSTALL_PACKAGES、android.permission.REQUEST_INSTALL_PACKAGES 权限

### 2. 应用市场隐私审核不通过

目前不管是上架任何的应用市场，在首次安装应用或更新高版本的应用时，必须首要弹出应用隐私弹窗，用户进行阅读和同意，其次会检测应用获取的隐私条目和隐私政策是否匹配，不匹配也会被拒绝。以华为应用市场为例，下图是在上架华为应用市场时隐私不匹配被拒绝的案例。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/039c37e4067e4ffcb0bdde1120414d88~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=960&h=399&s=143044&e=png&b=fbfbfb)

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15b867fa879a4c51a27e7b810a48272c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=339&h=721&s=74983&e=png&b=05182d" alt="image.png" width="40%" /></p>
<p align=center>App应用内隐私弹窗提示案例</p>

### 3. 不要频繁的使用云打包

DCloud 官方为了节流，做了一些打包次数的限制，官方说明：打包不是为了测试应用，而是为了发布应用。所以频繁的打包超出一定限制后（我当时是每天 5 次，不知道现在是否有变化），当天会禁止你再次打包。

为了解决这个问题，你可以“制作自定义调试基座”，然后运行到手机，使用自定义基座运行调试，如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe9cde285416401e9a088182c75a7647~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1282&h=460&s=237357&e=png&b=f8f6ee)

### 4. 应用包体积特别大

上文已经有提到过，可能是由于打包了第三方模块导致的应用包体积变大，具体可以参考以下步骤进行排除：

- 取消无用的 App 第三方模块的勾选，上文提到过；
- 检查代码中是否有引用的相关模块；
- 说到底是被 uniapp 卡脖子了，云打包确实会打包一些无用的插件，但是官方不解决，没有办法，其次你也可以使用离线打包试一下，但是效果不怎么理想。

## 总结

通过以上内容的了解，你应当学习了如何使用 uni-app 框架和 HBuilderX 工具来打包生成安卓应用。还大体了解了一些打包 App 及上架应用市场的注意事项及解决方案。

你可以按照这个步骤一步步操作，将你的 uni-app 项目转化为安卓应用，并在安卓设备上运行和测试，祝你成功。

由于我本身不是专业的安卓开发人员，如有不正确的地方，敬请指出。

## 参考资料

[Android 平台签名证书生成指南](https://ask.dcloud.net.cn/article/35777)

[Android 模块配置](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/geolocation.html)

[App 离线打包](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)

<ArticleFooter :link="['juejin::https://juejin.cn/post/7296317316206411787', 'weixin::https://mp.weixin.qq.com/s/hztgJFzR48th0OP3XcbrmA', 'yuque::https://www.yuque.com/anyup/uniapp/atg07ko13urzund1', 'csdn::https://blog.csdn.net/qq_24956515/article/details/141716906']" />
