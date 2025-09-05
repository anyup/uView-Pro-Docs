## 一. 前言

`Uni-App` 是一个使用 `Vue.js` 开发（所有）前端应用的框架，能够编译到 `iOS`、`Android`、快应用以及各种小程序等多个平台。因此，如果你需要快速开发一款跨平台的应用，比如在 `H5`、小程序、`iOS`、`Android` 等多个平台上线，那么 `Uni-App` 是一个不错的选择。

`Uni-App` 进行多平台开发的优势不言而喻，同时主要因为它拥有许多跨端的 `API` 兼容支持和条件编译，在各个平台可以使用同一套 API 或通过条件编译使用不同的代码。

以上说了这么多，今天我们主要学习**蓝牙连接**相关的 `API`，同时也是为了后续开发**蓝牙打印**功能打基础。

蓝牙功能的开发是移动应用中非常常见的一项特性，可以用于设备间的**数据传输**等场景。关于蓝牙连接的功能，`Uni-App` 提供了一系列的 `API` 来帮助开发者快速地实现跨平台应用开发。下面我总结了一张图，标识需要了解的蓝牙连接核心 `API`.

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e1876ade29d04d13892d3894c239dd9c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=9GngaVs7UljMQY6VC%2B2GcPJytMs%3D)

## 二. 蓝牙主要功能

`Uni-App` 提供的蓝牙 `API` 允许我们开发时主要实现以下功能：

*   扫描并连接到蓝牙设备
*   发现已连接设备的服务和特征值
*   向设备发送数据
*   接收设备发送的数据

**流程图：**

关于开发时进行蓝牙连接的流程，我总结了以下这张图：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5b084603df7b4708b632a315b8380a9f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=ZmKL8zAdgJo7aVfldS6nIpstiGw%3D)

## 三. 蓝牙核心 API 介绍

蓝牙 `API` 分为通用蓝牙 `API` 和低功耗蓝牙的 `API`

### 通用蓝牙 API

兼容性：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bd81083b9dca4f25b6855622758b8603~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=PDyCJJhF0jJMEF2wwiozJSrmKts%3D)

#### 1. 初始化蓝牙模块

当开始使用蓝牙前，需要先初始化蓝牙模块，初始化蓝牙适配器成功后才可以继续使用其他的 `API`：

```javascript
uni.openBluetoothAdapter({
  success: function (res) {
    console.log('初始化蓝牙适配器成功', res)
  },
  fail: function (err) {
    console.error('初始化蓝牙适配器失败', err)
  }
})
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1a1f760121fa47558f57f291c3c7f5cd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=IqGHPxNvKbl7%2B2eA9%2BvgDXMuXsE%3D)

#### 2. 开始搜索蓝牙设备

初始化成功后，就可以通过调用 `startBluetoothDevicesDiscovery` 方法开始搜索附近的蓝牙设备：

> 注意：**此操作比较耗费系统资源，请在搜索并连接到设备后调用  `uni.stopBluetoothDevicesDiscovery`  方法停止搜索。**

```javascript
uni.startBluetoothDevicesDiscovery({
  success: function (res) {
    console.log('开始搜索蓝牙设备', res)
  },
  fail: function (err) {
    console.error('开始搜索蓝牙设备失败', err)
  }
})
```

> 说明：App 端目前仅支持发现 BLE 低功耗蓝牙设备，其实我们也主要和低功耗蓝牙设备建立通信关系。一般为发送指令（开关机、蓝牙打印等），接收数据（蓝牙温度记录仪）

#### 3. 停止搜索蓝牙设备

当不再需要继续搜索设备时，可以调用 `stopBluetoothDevicesDiscovery` 停止搜索：

```javascript
uni.stopBluetoothDevicesDiscovery({
  success: function (res) {
    console.log('停止搜索蓝牙设备', res)
  },
  fail: function (err) {
    console.error('停止搜索蓝牙设备失败', err)
  }
})
```

#### 4. 监听已发现的蓝牙设备

通过 `onBluetoothDeviceFound` 方法获取当前已发现的蓝牙设备列表，此方式是回调方法，只要发现了新的蓝牙设备，都会进入该回调：

```javascript
uni.onBluetoothDeviceFound(function (devices) {
  console.log('new device list has founded')
  console.dir(devices)
})
```

#### 5. 获取已发现的蓝牙设备列表

通过 `getBluetoothDevices` 方法获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。

```javascript
uni.getBluetoothDevices({
  success: function (res) {
    console.log('已发现的蓝牙设备', res.devices)
  },
  fail: function (err) {
    console.error('获取已发现的蓝牙设备列表失败', err)
  }
})
```

<img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ca70860f617042a193295a0ff04bc2ad~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=lGp2Z0EDIF2E%2B7rub%2B0riUpHA4I%3D" alt="image.png" width="50%">

#### 6. 关闭蓝牙模块

通过调用 `closeBluetoothAdapter` 方法将关闭蓝牙模块，断开所有已建立的连接并释放系统资源。

> 调用该方法将断开所有已建立的连接并释放系统资源。一般在使用蓝牙流程完毕后，主动调用该方法，可在页面生命周期中使用。
> 应与  `uni.openBluetoothAdapter` 成对调用。

```javascript
uni.closeBluetoothAdapter({
  success(res) {
    console.log(res)
  }
})
```

### 低功耗蓝牙 API

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6db83d271cb742788c120ad23240fb87~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=Z35bfkMQi4LNfOVenvWN2IbFzy8%3D)

#### 1. 连接到蓝牙设备

选择一个设备后，可以通过设备 ID 调用 `createBLEConnection` 方法建立与该设备的连接：

```javascript
uni.createBLEConnection({
  deviceId: '目标设备ID',
  success: function (res) {
    console.log('连接蓝牙设备成功', res)
  },
  fail: function (err) {
    console.error('连接蓝牙设备失败', err)
  }
})
```

#### 2. 获取蓝牙设备的服务

连接成功后，可以通过设备 ID 调用 `getBLEDeviceServices` 方法获取该设备提供的服务：

```javascript
uni.getBLEDeviceServices({
  deviceId: '目标设备ID',
  success: function (res) {
    console.log('获取蓝牙设备服务成功', res.services)
  },
  fail: function (err) {
    console.error('获取蓝牙设备服务失败', err)
  }
})
```

<img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/68bc0cd58f384df4ba29f4b8b6f843b4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=sGiRpDCiE0Fz0b%2BoB7DG2Ukua9w%3D" alt="image.png" width="50%">

#### 3. 获取服务中的特征值

获取服务成功后，可以通过备 ID，服务 ID 调用 `getBLEDeviceCharacteristics` 方法获取特定服务下的特征值：

```javascript
uni.getBLEDeviceCharacteristics({
  deviceId: '目标设备ID',
  serviceId: '服务ID',
  success: function (res) {
    console.log('获取蓝牙设备特征值成功', res.characteristics)
  },
  fail: function (err) {
    console.error('获取蓝牙设备特征值失败', err)
  }
})
```

<img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/99d23800b2b545d1a36c11d2ff8f698b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=t7%2FqSwlGS%2FEhEkxWrhC0IHbV4d0%3D" alt="image.png" width="70%">

#### 4. 向蓝牙设备写入数据

确定了要使用的特征值后，可以使用 `writeBLECharacteristicValue` 方法向蓝牙设备写入数据：

> 注意：只有获取到支持读写的特征值后，才可以像蓝牙设备写入数据。

```javascript
uni.writeBLECharacteristicValue({
  deviceId: '目标设备ID',
  serviceId: '服务ID',
  characteristicId: '特征值ID',
  value: new ArrayBuffer(2), // 示例数据
  success: function (res) {
    console.log('向蓝牙设备写入数据成功', res)
  },
  fail: function (err) {
    console.error('向蓝牙设备写入数据失败', err)
  }
})
```

> 说明：蓝牙打印机主要会使用该 API，将在下一文章中说明。

#### 5. 监听来自蓝牙设备的数据

如果需要接收来自蓝牙设备的数据，可以监听 `onBLECharacteristicValueChange` 事件：

```javascript
uni.onBLECharacteristicValueChange(function (res) {
  console.log('接收到蓝牙设备数据', res.value)
})
```

#### 6. 断开蓝牙连接

通过调用 `closeBLEConnection` 断开与低功耗蓝牙设备的连接。

```javascript
uni.closeBLEConnection({
  deviceId,
  success(res) {
    console.log(res)
  }
})
```

## 四. 使用蓝牙 API 前的准备

在 `Uni-App` 中使用蓝牙功能时，尤其是真机（`Android` 和 `iOS`），需要添加蓝牙打包模块；除此之外，还需要确保在 `manifest.json` 文件中正确声明所需的蓝牙权限，并在运行时请求这些权限。

### 1. 添加蓝牙模块

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ecbc50c836a040debceb5edc9b7c62a2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=x8Wf2m0BAyDRpsMDU3yK3uewUj8%3D)

### 2. Android 权限

处理 `Android` 蓝牙权限需要在 `manifest.json` 中声明权限，首先，打开你的 `manifest.json` 文件，并在 `app-plus` 节点下添加所需的蓝牙权限。

> 注意：根据不同的 Android 版本，你可能需要声明不同的权限。

#### 基本权限

在 `manifest.json` 配置如下权限：

```json
{
  "app-plus": {
    "distribute": {
      "android": {
        "permissions": ["android.permission.BLUETOOTH", "android.permission.BLUETOOTH_ADMIN"]
      }
    }
  }
}
```

#### 高级权限（Android 12 及以上）

如果应用需要扫描附近的蓝牙设备，还需要声明 `ACCESS_FINE_LOCATION` 权限，从 Android 12 开始，还需要声明 `BLUETOOTH_SCAN`、`BLUETOOTH_CONNECT` 和 `BLUETOOTH_ADVERTISE` 权限：

```json
{
  "app-plus": {
    "distribute": {
      "android": {
        "permissions": [
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_FINE_LOCATION",
          "android.permission.BLUETOOTH_SCAN",
          "android.permission.BLUETOOTH_CONNECT",
          "android.permission.BLUETOOTH_ADVERTISE"
        ]
      }
    }
  }
}
```

### 3. iOS

对于 `iOS` 平台，和 `Android` 平台类似，同样的需要 在`manifest.json` 文件，并在 `app-plus` 节点下添加所需的蓝牙权限。需要声明 `NSBluetoothAlwaysUsageDescription` 和 `NSBluetoothPeripheralUsageDescription`，并在其中提供用途说明。

在 `manifest.json` 配置如下权限：

```json
{
  "app-plus": {
    "distribute": {
      "ios": {
        "permissions": {
          "NSBluetoothAlwaysUsageDescription": "需要蓝牙权限以连接和控制外部设备",
          "NSBluetoothPeripheralUsageDescription": "需要蓝牙权限以连接和控制外部设备"
        }
      }
    }
  }
}
```

### 4. 运行时请求权限

在 `Uni-App` 中，你可以使用 `uni.authorize` 方法来请求运行时权限。以下示例代码，表示如何在应用启动时请求蓝牙相关权限：

```javascript
export default {
  data() {
    return {}
  },
  onReady() {
    this.checkAndRequestPermissions()
  },
  methods: {
    checkAndRequestPermissions() {
      const permissions = ['scope.bluetooth', 'scope.location']

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
            // 请求权限
            this.requestPermissions()
          } else {
            // 已经有权限，可以进行蓝牙操作
            this.initBluetooth()
          }
        }
      })
    },

    requestPermissions() {
      const permissions = ['scope.bluetooth', 'scope.location']

      permissions.forEach(permission => {
        uni.authorize({
          scope: permission,
          success: () => {
            console.log(`权限 ${permission} 请求成功`)
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
    },

    initBluetooth() {
      uni.openBluetoothAdapter({
        success: res => {
          console.log('初始化蓝牙适配器成功', res)
          // 继续进行蓝牙操作
        },
        fail: err => {
          console.error('初始化蓝牙适配器失败', err)
        }
      })
    }
  }
}
```

### 5. 处理用户拒绝权限的情况

如果用户拒绝了权限请求，可以通过 `uni.showModal` 方法提示用户在设置中手动开启权限。如下所示：

```javascript
uni.showModal({
  title: '提示',
  content: '请在设置中开启蓝牙和位置权限',
  confirmText: '去设置',
  success: res => {
    if (res.confirm) {
      uni.openSetting({
        success: settingData => {
          console.log('用户设置结果', settingData)
        }
      })
    }
  }
})
```

**小程序中的授权提示如下：**

<img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8a6d5445c65a484c9d255ebf8903d11a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=v4CoxNTGggSItVZcJnd6NpgQ5xc%3D" alt="image.png" width="50%">

## 五. 注意事项

在使用蓝牙 API 时，请确保用户已经开启了手机的蓝牙功能和位置信息。

1.  蓝牙 API 调用时机：蓝牙相关 API 的抵用必须在  `uni.openBluetoothAdapter` 调用之后使用，否则 API 会返回错误（`errCode=10000`）。

2.  在用户蓝牙开关未开启或者手机不支持蓝牙功能的情况下，调用  `uni.openBluetoothAdapter` 会返回错误（`errCode=10001`），表示手机蓝牙功能不可用。

3.  版本兼容性：部分蓝牙 API 可能因操作系统版本不同而有所差异，具体请参考官方文档。

4.  用户提示：确保在请求蓝牙权限时提供清晰的提示信息，告知用户为什么需要这些权限。

5.  蓝牙状态检查：在初始化蓝牙适配器之前，应检查蓝牙是否已开启。可以使用 `uni.getBluetoothAdapterState` 方法来检查蓝牙状态，如下代码：

```javascript
uni.getBluetoothAdapterState({
  success: res => {
    if (!res.discovering && !res.available) {
      uni.showModal({
        title: '提示',
        content: '请确保蓝牙已开启',
        showCancel: false
      })
    }
  },
  fail: err => {
    console.error('检查蓝牙适配器状态失败', err)
  }
})
```

## 六. 总结

通过以上的蓝牙连接核心 `API` 的了解，基本可以在 `Uni-App` 中正确声明和请求蓝牙权限，并且和低功耗蓝牙建立连接，并成功获取蓝牙设备的服务和特征值。

## 文档链接

[蓝牙 Bluetooth - uni-app 文档](https://uniapp.dcloud.net.cn/api/system/bluetooth.html)

[低功耗蓝牙 BLE - uni-app 文档](https://uniapp.dcloud.net.cn/api/system/ble.html)

## 小程序体验

<img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/726a9729dbf143909651dd23f6152cbc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYW55dXA=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIzMDU3NjQ3MjU4OTk3NiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1732870817&x-orig-sign=Z8gxcJ3QuZNnL5OLZM81gWf%2BfTQ%3D" alt="image.png" width="30%">

如果需要体验小程序或 APP 的掘友，可通过沸点获取：[点击查看沸点](https://juejin.cn/pin/7439974840259805235)

> 如果文章对您有帮助，麻烦点赞，收藏加关注，您的支持是我不断创作的动力！
