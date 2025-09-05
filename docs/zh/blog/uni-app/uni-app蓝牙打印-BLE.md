## 一. 前言

近期，在已经上线的 uni-app 应用上迭代了一个功能，连接热敏蓝牙打印机实现小票打印功能，其中涉及到了微信小程序和 APP 蓝牙连接和打印，因此本篇文章总结一下开发思路以及实现逻辑，并且在开发的同时遇到的一些问题，最后提供一个工具类帮助来实现蓝牙一键连接和快速打印的功能。

蓝牙技术因其便捷性和低能耗特性，在智能设备之间通信中扮演着越来越重要的角色。特别是低功耗蓝牙（`BLE, Bluetooth Low Energy`）技术，它为移动应用与外围设备之间的无线连接提供了新的可能性。

BLE 蓝牙打印是指通过手机或平板等移动设备，利用低功耗蓝牙技术直接向支持 `BLE` 的打印机发送打印指令的过程。这种方式相比传统的有线打印或者 `Wi-Fi` 打印更加方便快捷，并且由于采用了低功耗技术，对于电池供电的便携式打印机来说非常友好。

之前的文章对蓝牙连接的 API 有一个详细的讲解，详细请查看：[uni-app 蓝牙连接 API 流程最佳实践 ](https://juejin.cn/post/7439972983945904137)

本篇文章我们结合之前的蓝牙连接的相关 API，快速实现连接打印机实现打印的功能。文章末尾附录源码！

## 二. 开发流程

主要的开发步骤可以概括为以下几步：

- **蓝牙模块配置**：如果是 APP，需要在 `manifest.json` 文件中的 `App模块配置` 里添加蓝牙模块，小程序不需要。

- **蓝牙权限管理**：用户授权应用获取蓝牙权限

- **连接蓝牙打印机**：搜索到蓝牙打印机并连接成功

- **向蓝牙打印机发送打印指令**：获取到蓝牙打印机的服务和特征值，向打印机发送打印指令

- **打印完成后断开蓝牙连接**：完成打印任务后，断开与打印机的连接

## 三. 蓝牙连接

关于蓝牙连接详细的 API 及连接流程请查看这篇文章：[uni-app 蓝牙连接 API 流程最佳实践 ](https://juejin.cn/post/7439972983945904137)

我们所用到的蓝牙连接流程做一个简单有用的总结，主要为以下功能：

- **配置蓝牙模块**

- **获取蓝牙权限**

- **搜索到蓝牙打印机并连接成功**

### 1. 添加蓝牙模块

如果你是开发 APP 应用，首先，你需要在 `manifest.json` 文件中的 `App模块配置` 里添加 **Bluetooth（低功耗蓝牙）**。

![Snipaste_2024-12-02_11-11-01.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0a0c1e5755cd4c888c9dcff536eebdf4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qKm5bel5Y6C:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733205369&x-orig-sign=X%2BzA%2BD5zXUIKgTvASGFgNJ9lVC8%3D)

只有添加了这个模块，我们在使用打包的时候，才能将 **Bluetooth（低功耗蓝牙）** 模块编译到应用包内，我们才能正常的使用蓝牙功能。

否则，我们在使用 APP 的时候，应用将会提示我们 “**打包时未添加 bluetooth 模块**”，影响我们的正常使用。

![Snipaste_2024-12-02_11-32-10.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e78b09963f1d453f995e657c2c9db558~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qKm5bel5Y6C:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733205419&x-orig-sign=GeGkAtrAmuGwkG5nBOoMvEpG6Nc%3D)

> 注意：如果是小程序，不需要添加蓝牙模块。只有 APP 应用需要添加蓝牙模块。

### 2. 获取用户授权

在进行任何蓝牙操作之前，必须先请求用户的授权。可以使用 `uni.authorize` 方法请求蓝牙权限。

在请求蓝牙权限之前，需要先判断是否已经有权限。可以使用 `uni.getSetting` 方法判断是否已经拥有蓝牙权限。

```js
// 检验是否有蓝牙权限
function checkAndRequestPermissions() {
  const permissions = ['scope.bluetooth']
  // 检查权限
  uni.getSetting({
    success: res => {
      let authResult = true
      permissions.forEach(permission => {
        if (!res.authSetting[permission]) {
          authResult = false
          return
        }
      })
      if (!authResult) {
        // 没有权限，请求权限
        this.requestPermissions()
      } else {
        // 已经有权限，可以进行蓝牙操作
        // ...
      }
    }
  })
}
```

如果通过以上代码检测，还没有获得蓝牙权限，可以通过以下代码请求蓝牙权限。

```javascript
// 申请蓝牙权限
function requestPermissions() {
  const permissions = ['scope.bluetooth']

  permissions.forEach(permission => {
    uni.authorize({
      scope: permission,
      success: () => {
        console.log(`权限 ${permission} 请求成功`)
        // 已经有权限，可以进行蓝牙操作
      },
      fail: err => {
        console.error(`权限 ${permission} 请求失败`, err)
        uni.showModal({
          title: '提示',
          content: '请在设置中开启蓝牙和位置权限',
          showCancel: false
        })
      }
    })
  })
}
```

### 3. 初始化蓝牙适配器

使用 `uni.openBluetoothAdapter` 开启蓝牙适配器，这是所有蓝牙操作的基础。

```javascript
uni.openBluetoothAdapter({
  success(res) {
    console.log('蓝牙适配器打开成功', res)
  },
  fail(err) {
    console.error('蓝牙适配器打开失败', err)
  }
})
```

### 4. 搜索并连接打印机

开启蓝牙后，可以通过 `uni.startBluetoothDevicesDiscovery` 开始搜索附近的蓝牙设备。找到目标打印机后调用 `uni.createBLEConnection` 建立连接。

## 四. 打印流程

### 2. 获取蓝牙服务和特征值

获取蓝牙服务和特征值这一步尤为重要，因为后续的打印指令和文本数据都需要通过这些服务和特征值来进行传输。而且发送成功的关键也在这一步，是因为这一步我们要成功获取到支持读写的特征值，才能发送打印指令和文本数据。

那么如何获取到支持读写的特征值呢？

一般的，我们根据 `deviceId` 获取服务，再根据服务 `Service` 获取特征值 `Characteristic`，特征值的 `properties` 中包含了 `read、write、notify、indicate` 四个属性，其中 `read` 和 `write` 表示该特征值是否支持读和写操作。

```js
/**
 * 获取所有服务
 */
function getBLEDeviceServices() {
  const { deviceId } = this.device
  return new Promise((resolve, reject) => {
    uni.getBLEDeviceServices({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId,
      success: res => {
        console.log('获取设备服务成功', JSON.stringify(res))
        resolve(res)
      },
      fail: e => {
        console.log('获取设备服务失败', JSON.stringify(e))
        reject(e)
      }
    })
  })
}
/**
 * 根据deviceId, serviceId获取某个服务下的所有特征值
 */
function getBLEDeviceCharacteristicsById({ deviceId, serviceId }) {
  return new Promise((resolve, reject) => {
    uni.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: res => {
        resolve(res)
      },
      fail: e => {
        reject(e)
      }
    })
  })
}
/**
 * 获取某服务下的支持读写的特征值
 */
async function getReadWriteBLEValue() {
  return new Promise(async (resolve, reject) => {
    try {
      const { deviceId } = this.device
      let res = await this.getBLEDeviceServices() // 获取所有服务
      for (const service of res.services) {
        const serviceId = service.uuid
        const characteristicsRes = await this.getBLEDeviceCharacteristicsById({
          deviceId,
          serviceId
        })
        if (characteristicsRes) {
          console.log(serviceId, characteristicsRes)
          // 过滤出可以读写的特征值
          const findList = characteristicsRes.characteristics.filter(item => item.properties.read && item.properties.write && item.properties.notify && item.properties.indicate)
          if (findList.length > 0) {
            this.setDevice({ serviceId, characteristicId: findList[0].uuid, characteristic: findList[0] })
            console.log(`寻找到可以读写的特性`, serviceId, findList[0].uuid)
            return resolve({
              status: 1,
              msg: '成功找到可以读写的特征值',
              data: { serviceId, characteristicId: findList[0].uuid, characteristic: findList[0] }
            })
          }
        }
      }
      return reject('未找到可以读写的特征值')
    } catch (e) {
      reject(e)
    }
  })
}
```

通过以上封装的方法，我们直接调用 `getReadWriteBLEValue` 可以获取到支持读写的特征值。

### 3. 发送打印数据

在发送打印数据之前，需要将指令和文本数据转换为字节数组，然后通过 `uni.writeBLECharacteristicValue` 方法写入蓝牙设备。

需要传递的参数有：

- **deviceId**：蓝牙设备的 ID
- **serviceId**：蓝牙服务的 ID
- **characteristicId**：蓝牙特征值的 ID
- **value**：要发送的数据

如下代码示例：

```js
// 发送的数据
const value = new Uint8Array(this.datas).buffer

// 写入蓝牙打印机
uni.writeBLECharacteristicValue({
  deviceId,
  serviceId,
  characteristicId,
  value: buffer,
  success: res => {
    console.log('写入成功', JSON.stringify(res))
    resolve(res)
  },
  fail: e => {
    console.log('写入失败', JSON.stringify(e))
    reject(e)
  }
})
```

### 4. 将数据分片进行打印

uni-app 文档中有描述：APP 不会对写入数据包大小做限制，但系统与蓝牙设备会限制蓝牙 4.0 单次传输的数据大小，超过最大字节数后会发生写入错误，建议每次写入不超过 20 字节。

![Snipaste_2024-12-02_13-37-38.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d3f1ce9ced0d4753b7f569d1552c5667~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5qKm5bel5Y6C:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1733205708&x-orig-sign=hJSSOaHPPbjU3Jy14EdcoqMQnmQ%3D)

因此，在实际应用中，由于蓝牙设备的传输限制，我们需要将打印数据进行分片，我们也要控制在 20 个字节，以确保数据能够完整地传输到打印机。

```js
/**
 * 获取分片数组
 */
function getSliceBufferList(buffer) {
  let pos = 0
  let bytes = buffer.byteLength
  let maxChunk = 20 // 每包控制大小
  let list = []
  while (bytes > 0) {
    let tmpBuffer
    if (bytes > maxChunk) {
      tmpBuffer = buffer.slice(pos, pos + maxChunk)
      pos += maxChunk
      bytes -= maxChunk
    } else {
      tmpBuffer = buffer.slice(pos, pos + bytes)
      pos += bytes
      bytes -= bytes
    }
    list.push(tmpBuffer)
  }
  return list
}
```

### 5. 打印队列

通过上一步，我们成功的将数据按照合适的字节大小将数据进行分片，所以我们会得到一个数据包数组，遍历这个数据，循环向打印机发送数据包就可以了。

除了使用分片数据传输以外，我们还应注意传输时避免并行调用 `uni.writeBLECharacteristicValue` 向蓝牙发送数据，并行调用多次会存在写失败的可能性，在实际情况中我确实也遇到了这种写入失败问题。

所以我们有个机制来进行管理打印，进行排队打印，只有当上一次发送数据成功后才可以进行下一次，而且我们应该有一个重试机制来重新发送已经失败的数据包，重试次数自定义。

```js
/**
 * 向低功耗蓝牙设备特征值中写入二进制数据
 */
async function writeBLEValueLoop(buffer) {
  return new Promise(async (resolve, reject) => {
    const maxRetries = 3 // 最大重试次数

    let items = this.getSliceBufferList(buffer)
    for (const item of items) {
      let retries = 0
      while (retries <= maxRetries) {
        try {
          const response = await this.writeBLECharacteristicValue(item)
          if (response) {
            console.log(`Successfully sent ${item}`)
            break // 请求成功后跳出while循环，进行下一项
          }
        } catch (error) {
          retries++
          console.error(`Failed to send ${item}, retrying... (${retries}/${maxRetries})`)
          if (retries > maxRetries) {
            console.error(`Max retries reached, failed to send ${item}.`)
            break // 达到最大重试次数后停止重试
          }
          // 可以根据需要添加延迟再重试
          await new Promise(resolve => setTimeout(resolve, 500 * retries)) // 指数退避
        }
      }
    }
    console.log('All items sent successfully.')
    resolve({ status: 1, msg: '发送完成' })
  })
}
```

## 五. 打印工具类

### 1. 打印指令封装

参考 [node-escpos] 的指令修改了一版适合自己的打印指令，如下所示：

主要为：

- **文本相关**：字体大小，字体样式，颜色，加粗，斜体，下划线等
- **布局相关**：左右、左中右打印布局等
- **硬件相关**：初始化，选择，复位等

> 注意：有些指令可能对于不同的打印机可能有不同的效果，具体请参考打印机的技术文档。

```js
const commands = {
  LF: [0x0a],
  FS: [0x1c],
  FF: [0x0c],
  GS: [0x1d],
  DLE: [0x10],
  EOT: [0x04],
  NUL: [0x00],
  ESC: [0x1b],
  EOL: '\n',
  /**
   * 打印机蜂鸣器
   * @type {string}
   */
  BEEP: [0x1b, 0x42], // Printer Buzzer pre hex

  TEXT_FORMAT: {
    TXT_NORMAL: [0x1b, 0x21, 0x00], // 正常文本大小
    TXT_2HEIGHT: [0x1b, 0x21, 0x10], // 2倍高 text
    TXT_2WIDTH: [0x1b, 0x21, 0x20], // 2倍宽 text
    TXT_4SQUARE: [0x1b, 0x21, 0x30], // 2倍宽高 text

    // 自定义的字体大小
    TXT_CUSTOM_SIZE: function (width, height) {
      // other sizes
      width = width > 8 ? 8 : width
      width = width < 1 ? 1 : width
      height = height > 8 ? 8 : height
      height = height < 1 ? 1 : height

      var widthDec = (width - 1) * 16 // Values between 1-8
      var heightDec = height - 1 // Values between 1-8
      var sizeDec = widthDec + heightDec
      return [0x1d, 0x21, sizeDec]
    },

    TXT_UNDERL_OFF: [0x1b, 0x2d, 0x00], // 下划线的字体 OFF
    TXT_UNDERL_ON: [0x1b, 0x2d, 0x01], // 下划线的字体 1-dot ON
    TXT_UNDERL2_ON: [0x1b, 0x2d, 0x02], // 下划线的字体 2-dot ON
    TXT_BOLD_OFF: [0x1b, 0x45, 0x00], // 粗体 OFF
    TXT_BOLD_ON: [0x1b, 0x45, 0x01], // 粗体 ON
    TXT_ITALIC_OFF: [0x1b, 0x35], // 斜体 OFF
    TXT_ITALIC_ON: [0x1b, 0x34], // 斜体 ON

    TXT_FONT_A: [0x1b, 0x4d, 0x00], // 字体类型 A
    TXT_FONT_B: [0x1b, 0x4d, 0x01], // 字体类型 B
    TXT_FONT_C: [0x1b, 0x4d, 0x02], // 字体类型 C

    TXT_ALIGN_LT: [0x1b, 0x61, 0x00], // 左对齐
    TXT_ALIGN_CT: [0x1b, 0x61, 0x01], // 居中
    TXT_ALIGN_RT: [0x1b, 0x61, 0x02] // 右对齐
  },
  COLOR: {
    0: [0x1b, 0x72, 0x00], // 黑
    1: [0x1b, 0x72, 0x01] // 红
  },
  /**
   * [HARDWARE Printer hardware]
   * @type {Object}
   */
  HARDWARE: {
    HW_INIT: [0x1b, 0x40], // 清除缓冲和复位模式下的数据
    HW_SELECT: [0x1b, 0x3d, 0x01], // 打印机选择
    HW_RESET: [0x1b, 0x3f, 0x0a, 0x00] // 重置打印机硬件
  },
  LINE_SPACING: {
    LS_DEFAULT: [0x1b, 0x32],
    LS_SET: [0x1b, 0x33]
  }
}
```

### 2. 打印工具封装

简洁高效的打印流程，当然离不开打印工具类的封装，比如我封装了一些常用的打印方法：

- 设置字体
- 设置字体对齐方式：居中、居左、居右
- 设置字体尺寸
- 设置字体下划线
- 字符填充一整行
- 左右布局格式打印
- 左中右布局格式打印

等等还有很多，不一一列举了，详细可以通过文章末尾源码获取！

以下列举几个，意思一下：

```js
class Printer {
  constructor() {
    this.datas = Array.from(commands.HARDWARE.HW_INIT)
    this.width = 32
  }
  /**
   * 设置字体
   * @param  {string} family A/B/C
   */
  setFont(family) {
    let array = Array.from(commands.TEXT_FORMAT['TXT_FONT_' + family.toUpperCase()])
    this.addData(array)
    return this
  }
  /**
   * 设置对齐方式
   * @param {string} align 对齐方式 LT/CT/RT
   */
  setAlign(align) {
    let array = Array.from(commands.TEXT_FORMAT['TXT_ALIGN_' + align.toUpperCase()])
    this.addData(array)
    return this
  }
  /**
   * 设定字体尺寸
   * @param  {number} width 字体宽度 1~2
   * @param  {number} height 字体高度 1~2
   */
  setSize(width = 1, height = 1) {
    width = width < 1 ? 1 : width > 1 ? 2 : 1
    height = height < 1 ? 1 : height > 1 ? 2 : 1
    let array = Array.from(commands.TEXT_FORMAT['TXT_CUSTOM_SIZE'](width, height))
    this.addData(array)
    return this
  }
  /**
   * 清空任务
   */
  reset() {
    this.data = Array.from(commands.HARDWARE.HW_INIT)
    return this
  }
  /**
   * 增加打印数据
   * @param {*} list 数组
   */
  addData(list) {
    this.datas = [...this.datas, ...list]
    return this
  }
  /**
   * 结束打印，返回buffer
   * @returns
   */
  buffer() {
    return new Uint8Array(this.datas).buffer
  }
}
```

当我们进行打印的时候，就可以这么使用了：

```js
// 蓝牙连接类
const bluetooth = new Bluetooth()
// 打印工具类
const buffer = new Printer()
  .setAlign('ct')
  .setSize(1, 2)
  .print('居中标题')
  .setAlign('lt')
  .setSize(1, 1)
  .printFill()
  .printLR('左侧文字', '右侧文字')
  .printLCR('左侧文字', '中间文字', '右侧文字')
  .setSize(2, 1)
  .print('宽度放大文字')
  .setSize(1, 2)
  .print('高度放大文字')
  .setSize(2, 2)
  .print('等比放大文字')
  .setSize(1, 1)
  .printFill()
  .print('打印时间：' + this._u.formatTime(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss'))
  .println()
  .end()

bluetooth.writeBLEValueLoop(buffer).then(res => {
  uni.showModal({
    title: '提示',
    content: '所有数据打印完成',
    showCancel: false
  })
})
```

是不是很方便？

## 六. 断开连接

完成打印任务后，记得断开与打印机的连接和断开蓝牙模块，使用 `uni.closeBLEConnection` 方法断开蓝牙连接，使用 `uni.closeBluetoothAdapter` 断开蓝牙模块，以便于打印机再次被连接。

一般的，在页面的生命周期 `beforeDestroy` 内使用断开的方法，如下所示：

```js
export default {
  beforeDestroy() {
    // 断开蓝牙连接
    uni.closeBLEConnection({
      deviceId,
      success(res) {
        // 断开蓝牙模块
        uni.closeBluetoothAdapter({
          success(res) {
            console.log(res)
          }
        })
      }
    })
  }
}
```

## 七. 注意事项

- 不同品牌和型号的打印机可能对打印指令、数据格式有不同的要求，参照具体设备的技术文档即可。

- 如果是微信小程序，需要开启微信的蓝牙权限，小程序的蓝牙权限。

- 需要打开系统蓝牙和位置信息，保证能搜索到附近的蓝牙设备。

- 权限管理，使用蓝牙前判断用户是否已经允许应用访问蓝牙。

- 打印时注意将数据分片，避免出现包过大导致写入失败的问题。

- 避免进行并行写入数据，可能有较高的概率会写入失败。

- 用户体验，建议一定要加入错误处理机制以及友好的用户提示信息，这样也能在出现问题时根据提示快速排查原因。

## 八. 总结

本篇文章，我们详细讲了低功耗蓝牙的打印流程，并且将一些蓝牙连接 API 和打印 API 友好的封装了起来，便于我们一键调用，主要包括：

- 用户授权

- 初始化蓝牙

- 连接蓝牙打印机

- 发送打印数据

其中我们也总结了注意事项：

- 分片打印

- 权限管理

- 避免并行传输

相信通过上述步骤的学习，你可以在 uni-app 项目中游刃有余的实现低功耗蓝牙打印功能了。

## 文档

[蓝牙 Bluetooth](https://uniapp.dcloud.net.cn/api/system/bluetooth.html)

[低功耗蓝牙 BLE](https://uniapp.dcloud.net.cn/api/system/ble.html)

## 源码及演示

源码封装了一键连接蓝牙并获取可支持读写的特征值方法，方便快捷的实现蓝牙打印流程！

**源码**：[Github](https://github.com/anyup/colorful-uni)、[Gitee](https://gitee.com/anyup/colorful-uni) （使用 HBuilder X 工具运行，敬请 `Star、Fork`）

**演示**：通过沸点获取，[点击查看沸点](https://juejin.cn/pin/7439974840259805235)
