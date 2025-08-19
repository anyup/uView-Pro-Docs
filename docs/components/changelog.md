## 0.0.5（2025-08-19）
### ✨ Features | 新功能

-   新增 u-city-select 城市选择器组件 ([0eb4806](https://gitee.com/anyup/uView-Pro/commit/0eb4806db3be39e1a6c6f33c9ea511d8445da884))
-   完善 u-button 的 open-type 支持类型 ([37c0db5](https://gitee.com/anyup/uView-Pro/commit/37c0db527258bca57dbd55d7013b633230489853))

### 🐛 Bug Fixes | Bug 修复

-   u-upload 暴露 lists 属性 ([09f8424](https://gitee.com/anyup/uView-Pro/commit/09f8424774baaee3b6fc7a42458949f8d5903951))
-   u-upload 深度监听文件列表变化并优化事件触发 ([a41a571](https://gitee.com/anyup/uView-Pro/commit/a41a5719ddf9d6793b78c55a13025bbdc88fdfe3))

### 🚀 Demos | 示例页面优化

-   优化关于页面布局和内容 ([ad5f6a4](https://gitee.com/anyup/uView-Pro/commit/ad5f6a47847999268b43b8c5dbf1a34cb8f70802))
-   删除分类数据文件 ([5ed7a11](https://gitee.com/anyup/uView-Pro/commit/5ed7a1113db58ff493ad606296a210358348affe))
-   重构 index list 页面 ([13d780e](https://gitee.com/anyup/uView-Pro/commit/13d780ea5acc4c8eed72062482735df826d4b37a))
-   更新商场菜单组件引用 ([a5f1bf3](https://gitee.com/anyup/uView-Pro/commit/a5f1bf3f256705d6cad028d60701b4b0544332de))
-   修改图片地址 ([c459893](https://gitee.com/anyup/uView-Pro/commit/c459893848936aa9a44e7bda3277ab1428109869))
-   重构 upload 上传组件示例页面 ([686831d](https://gitee.com/anyup/uView-Pro/commit/686831de357aca67bbf7015e2f0696cf6bf48164))
-   优化多个组件的代码结构和样式 ([f2af44c](https://gitee.com/anyup/uView-Pro/commit/f2af44ca1710334495e4c4fad99d04027b3788f8))
-   添加提交规范相关配置文件 git-cz/husky/changelog ([d93b816](https://gitee.com/anyup/uView-Pro/commit/d93b816a5a3e468c4bc45e3161d7c006cba5fbf6))
-   优化 deepClone 和 deepMerge 页面的结果展示 ([b0daa70](https://gitee.com/anyup/uView-Pro/commit/b0daa700b6a385e037d38dc1f10b3612596e2403))
-   新增优惠券模板 ([1b77762](https://gitee.com/anyup/uView-Pro/commit/1b777621615f7ebe9d83606d53650987c8b2c4e0))
-   更新 easycom 配置说明，一定要放在 custom 里，否则不生效 ([fc14bf9](https://gitee.com/anyup/uView-Pro/commit/fc14bf90cb77088d258e20e79e3d25820f37e97e))
-   添加模板示例页面 ([3336af4](https://gitee.com/anyup/uView-Pro/commit/3336af406161648d18578c988d9b3ad79b86059a))
-   新增模版相关页面 ([8925a02](https://gitee.com/anyup/uView-Pro/commit/8925a02f9fa88f4742d984f2ff02909afc6ad0d7))
-   重构 request 类，优化泛型支持 ([d7b2e6a](https://gitee.com/anyup/uView-Pro/commit/d7b2e6a224d96f717e5bdbaf09edb19b712ced47))

完整更新日志请查看 [CHANGELOG.md](https://github.com/anyup/uView-Pro/blob/master/CHANGELOG.md)

## 0.0.4（2025-08-14）

### 新增

-   `u-icon` 组件新增 `space` 属性，表示`label` 在四周时与图标的距离，权重高于 `margin`，单位 rpx
-   新增`$u`工具库各类方法，同步文档
-   组件全部 setup 化，全面支持 TypeScript 和 Vue3
-   工具库示例页面全部 setup 化

### 优化

-   组件样式兼容多端
-   代码注释与类型完善
-   优化演示代码兼容性

### 修复

-   修复类型声明、变量冲突、lint 报错等问题

## 0.0.3（2025-08-06）

-   添加插件使用示例工程

## 0.0.2（2025-08-04）

-   解决一些 npm 包依赖问题

## 0.0.1（2025-08-04）

-   70+精选组件，使用 Vue3+TS 全面重构，功能丰富，多端兼容，让您快速集成，开箱即用
-   兼容安卓，iOS，微信小程序，H5 等
-   详尽的文档支持，现代化的演示效果
-   按需引入，精简打包体积

### 基础组件（8）

-   Color 色彩
-   Icon 图标
-   Image 图片
-   Button 按钮
-   Layout 布局
-   Cell 单元格
-   Badge 徽标数
-   Tag 标签

---

### 表单组件（15）

-   Form 表单
-   Calendar 日历
-   Select 列选择器
-   Keyboard 键盘
-   Picker 选择器
-   Rate 评分
-   Search 搜索
-   NumberBox 步进器
-   Upload 上传
-   VerificationCode 验证码倒计时
-   Field 输入框
-   Checkbox 复选框
-   Radio 单选框
-   Switch 开关选择器
-   Slider 滑动选择器

---

### 数据组件（4）

-   Progress 进度条
-   Table 表格
-   CountDown 倒计时
-   CountTo 数字滚动

---

### 反馈组件（10）

-   ActionSheet 操作菜单
-   AlertTips 警告提示
-   Toast 消息提示
-   NoticeBar 滚动通知
-   TopTips 顶部提示
-   SwipeAction 滑动单元格
-   Collapse 折叠面板
-   Popup 弹出层
-   Modal 模态框
-   fullScreen 压窗屏

---

### 布局组件（11）

-   Line 线条
-   Card 卡片
-   Mask 遮罩层
-   NoNetwork 无网络提示
-   Grid 宫格布局
-   Swiper 轮播图
-   TimeLine 时间轴
-   Skeleton 骨架屏
-   Sticky 吸顶
-   Waterfall 瀑布流
-   Divider 分割线

---

### 导航组件（11）

-   Dropdown 下拉菜单
-   Tabbar 底部导航栏
-   BackTop 返回顶部
-   Navbar 导航栏
-   Tabs 标签
-   TabsSwiper 全屏选项卡
-   Subsection 分段器
-   IndexList 索引列表
-   Steps 步骤条
-   Empty 内容为空
-   Section 查看更多

---

### 其他组件（8）

-   MessageInput 验证码输入
-   Loadmore 加载更多
-   ReadMore 展开阅读更多
-   LazyLoad 懒加载
-   Gap 间隔槽
-   Avatar 头像
-   Link 超链接
-   Loading 加载动画

---
