---
title: iOS APP 备案那些事：分析如何通过证书文件获取公钥和指纹
---

## 一. 背景

首先说一下备案相关的一些事情，APP 为什么要备案？通常我们了解的只有网站备案，现在又出来了 APP 备案，它们是一回事吗？

2023 年 7 月 21 日，工业和信息化部发布了一篇关于开展移动互联网应用程序备案工作的通知，要求存量 APP 备案（2023 年 9 月-2024 年 3 月），主要包括安卓、iOS、小程序、快应用等移动端应用。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a86101487a224043a7a02a46ae5faef1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=873&h=138&s=37181&e=png&b=f9f8f8)

详情请查看：

[工业和信息化部关于开展移动互联网应用程序备案工作的通知](https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2023/art_920db564162e4312916a01bed6540ad8.html)

[一图读懂 APP 备案](https://wap.miit.gov.cn/zwgk/zcjd/art/2023/art_9f3a1277fdcb42d68e1eacd37787ae04.html)

最近我们公司也要求了，要目前线上存在的 APP 尽快履行备案手续，保证在 2024 年 3 月之前备案成功，避免后期被应用商店下架的风险。

我们采取了阿里云备案，有专门的运维人员负责这一块，就在前几天，找我要一些备案的相关信息，主要有以下的相关信息进行提供：

- iOS Bundle ID
- 公钥
- 证书指纹

如下图所示：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49b017fe9466428ab4d50d2d73b2dd12~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=989&h=545&s=153413&e=png&b=fefdfd)

## 二. 如何获取

iOS Bundle ID，大家都很熟悉，就是应用包名，创建应用的时候我们就应该清楚。因此，从以上的信息得知，我们的难点在于怎么样获取应用公钥和证书指纹。我总结了以下几种方式：

### 1. 通过 App Store Connect 获取

App Store Connect 苹果开发者中心可以获取应用 Bundle ID、公钥、证书指纹值。

1. 通过**标识符**获取应用的 Bundle ID
2. 通过**证书**获取公钥以及证书指纹

如下图所示

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20e20aaf652d45798bd2367f895dc7dd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1039&h=751&s=285060&e=png&b=fcfcfc)

### 2. 通过 Mac 钥匙串访问证书获取
仅限于 Mac 系统使用，直接使用钥匙串打开证书，输入证书密码，即可通过钥匙串访问证书的详细信息，包括**签发者信息**、**公共密钥信息**以及**指纹信息**（SHA-256、SHA-1），如下图所示：


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec325a7da64d4d12b6373eac54a03778~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=699&h=243&s=53604&e=png&b=efefef)

输入证书的密码即可查看到证书的相关信息：

![Snipaste_2023-11-29_09-19-21.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bc39fe083524d2e88fbf38c0c6552fe~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=739&h=587&s=79670&e=png&b=fcfcfc)

此方法简单快捷，在 Mac 系统下，只要拥有证书和密码，就可以方便的查看证书的公钥和指纹信息！

### 3. 通过命令行工具获取

以上的两种方式都可以很方便的查看证书的信息，接下来我们介绍第三种方案：使用命令行工具获取。

由于我们的 iOS 应用是由集团统一管理，个人的账号是没有权限查看这些信息的，只有 App 管理的权限，因此不能通过苹果开发者网站直接查看，如果你是 Windows 系统，也无法通过钥匙串访问，因此我们还可以通过使用命令行解析证书获取了公钥和指纹，使用的工具是 OpenSSL。

那么接下来我们先简单了解一下 OpenSSL 是什么以及如何使用吧。

## 三. 使用 OpenSSL 解析证书

### 1. OpenSSL 简介

OpenSSL 是一个开源的加密库，用于实现安全套接层（SSL）和输层安全（TLS）协议。它提供各种加密、解密、认证和安全通信功能，被广泛用于保护网络通和加密数据。

OpenSSL 只需要简单的命令就可以解析证书获取到公钥和指纹。下面我们来看一下是如何进行操作的。

OpenSSL采用C语言作为开发语言，这使得它具有优秀的跨平台性能，因此 OpenSSL支持：

-   Linux
-   UNIX
-   Windows
-   Mac等平台

### 2. Windows 系统

Windows 操作系统下直接访问以下链接，下载对应的安装包，按照指引安装即可：

[下载链接：https://slproweb.com/products/Win32OpenSSL.html](https://slproweb.com/products/Win32OpenSSL.html)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee523b62685d4b41b357ba99efbd143e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=773&h=294&s=118057&e=png&b=fdfcfc)

### 3. macOS 系统

苹果的 macOS 操作系统不再默认安装 OpenSSL，但你可以通过以下几种方法安装 OpenSSL：

#### （1）使用 Homebrew 安装

如果你已经安装了 Homebrew 包管理器，可以使用命令行终端执行以下命令安装 OpenSSL：

```bash
brew install openssl
```

安装完成后，你就可以在终端中使用 OpenSSL 相关命令了。

#### （2）使用 MacPorts 安装

如果你使用 MacPorts 包管理器，可以使用以下命令安装 OpenSSL：

```bash
sudo port install openssl
```

安装完成后，你就可以在终端中使用 OpenSSL 相关命令了。

#### （3）手动编译安装

如果你喜欢手动编译安装，可以从 OpenSSL 官方网站（ https://www.openssl.org/ ）下载源代码，然后按照官方提供的编译安装指南进行安装。

在安装完成后，你可以使用 OpenSSL 命令行工具执行 SSL 相关操作，也可以在你的应用程序中使用 OpenSSL 进行加密和解密操作等。

#### （4）验证是否安装成功

```bash
openssl version
```

如果成功安装，将显示 OpenSSL 的版本信息。

## 四. 提取公钥和 MD5 指纹

### 1. 提取证书

使用以下命令从 “**.p12**” 文件中提取证书文件，并将其保存为单独的文件。

```bash
openssl pkcs12 -in Certificate.p12 -clcerts -nokeys -out MyCertificate.crt
```

这条命令的作用是操作 PKCS#12 格式的证书文件，并将其中的（certificates）提取出来，保存为 CRT 格式的证书文件中，私钥将不包含在输出文件中。让我们对这个命令进行分解解析：

- `pkcs12`: 指定了要执行 PKCS#12 操作。
- `-in Certificate.p12`: 指定了输入的证书文件，文件名为 Certificate.p12。注意，这个文件应该是 PKCS#12 格式的证书文件。
- `-clcerts`: 表示只保存其中的凭证（certificates），而不包括私钥（private keys）。
- `-nokeys`: 表示不包括私钥（private keys）。
- `-out MyCertificate.crt`: 指定了输出的文件名，即提取出来的凭证将保存为 MyCertificate.crt 文件，该文件是 CRT 格式的证书文件。

命令执行后，会等待我们输入密码后，将提取证书并将其保存为“**MyCertificate.crt**”文件，如下图所示：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/417de29bc2694a9d833e0471135f49e7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=585&h=371&s=42787&e=png&b=191919)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/277e9ef231464c2c92cc685c5bbef387~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=585&h=212&s=16020&e=png&b=fefefe)

### 2. 获取证书指纹

通过上一步输出的 CRT 格式的证书文件，使用以下命令获取证书的 MD5 指纹 和 SHA-1 指纹。

```bash
# MD5 指纹
openssl x509 -noout -fingerprint -md5 -inform pem -in MyCertificate.crt

# SHA-1 指纹
openssl x509 -noout -fingerprint -sha1 -inform pem -in MyCertificate.crt
```

这条命令的主要作用是对该证书文件进行指纹（fingerprint）计算，并将结果以声明的算法的格式进行输出。下面对这个命令进行分解解析：

- `x509`: 指定了要 X.509 格式的书进行操作。
- `-noout`: 表示输出证书本身的内容，只输出指定的信息。
- `-fingerprint`: 指定计算证书的指纹（fingerprint）。
- `-md5`: 指定使用 MD5 哈希算法来计算指纹。
- `-sha1`: 指定使用 SHA-1 算法来计算指纹。
- `-inform pem`: 指定输入证书文件的格式为 PEM 格式。
- `-in MyCertificate.crt` 指定了的证书文件，文件为 MyCertificate.crt。

运行上面命令后将输出证书的指纹，可以从中获取 MD5 值和 SHA-1 值，如下图所示：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2338397d4e5b4c7bbd3444959a11b4a2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=585&h=371&s=42516&e=png&b=181818)


### 3. 获取公钥

使用以下命令从证书中提取公钥，提取私钥并将其保存为'PublicKey.pem'文件。

```bash
openssl x509 -pubkey -noout -inform pem -in MyCertificate.crt > PublicKey.pem
```

这条命令的作用是从指定证书文件中提取出公钥，并将提取的公钥内容保存到一个新的 PEM 格式的文件 PublicKey.pem 中。下面对这个命令进行分解解析：

- `x509`: 指定了要对 X.509 格式的证书进行操作。
- `-pubkey`: 表示提取证书中的公钥。
- `-noout`: 表示不输出证书本身的内容，只输出提取的公钥。
- `-inform pem`: 指定输入证书文件的格式为 PEM 格式。
- `-in MyCertificate.crt`: 指定了要操作的证书文件，文件名为 MyCertificate.crt。
- `> PublicKey.pem`: 将提取的公钥内容重定向（redirect）到一个新的文件 PublicKey.pem 中。

运行以上的命令就可以提取证书的公钥并将其保存“**PublicKey.pem**”文件，将 `.pem` 后缀修改为 `.txt` 即可查看公钥，如下图所示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a4aed7f0fa84a448aa6f2a013854fb5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=585&h=196&s=18523&e=png&b=fdfdfd)

### 4. 获取成功

现在，已经通过“**.p12**”证书文件成功获取了公钥和 MD5。请注意，上述命令中的文件名需要根据自己的实际情况进行调整。

## 五. 总结

通过这篇文章的总结，我们了解了如何通过证书文件获取到公钥和指纹，常用的主要有两种方式：

- 通过 App Store Connect 网站获取，苹果的官方网站，简单快捷。
- 通过钥匙串访问证书获取，仅限于 macOS。
- 通过 OpenSSL 工具获取，只要对命令行熟悉也能快速获取，支持 Windows 和 macOS。

我们主要分析了通过以上三种方式获取，其中重点对 OpenSSL 这个工具获取命令进行了相关解析，既解决了我们的问题，同时也学习到了命令行中几个命令的含义，两全其美。

以上就是最近在进行 iOS APP 备案中，如何通过证书文件获取公钥和指纹总结来的一些经验。

<ArticleFooter link="https://juejin.cn/post/7304858521627852810" />