---
title: 目录结构
---

# 目录结构

## uni-app 项目目录结构

```
├── api                    # 所有请求
├── assets                 # 主题 字体等静态资源
├── common                 # 全局通用工具类
├── components             # 全局公用组件
├── constant               # 全局公用常量
├── i18n                   # 国际化 i18n language
├── mixins                 # 全局混入
├── models                 # 公共实体类
├── nativeplugins          # 原生插件
├── node_modules           # node包管理
├── pages                  # views 所有页面
├── ├──  index             # 视图模块名
├── └── └──  index.vue     # 模块入口页面
├── static                 # 存放应用引用静态资源（如图片、视频等）的目录
├── store                  # 全局 store管理
├── unpackage              # 打包存放目录，app资源配置目录
├── wxcomponents           # 小程序组件的目录
├── App.vue                # 入口页面，应用配置，配置App全局样式以及监听
├── main.js                # 入口文件 加载组件 初始化等
├── manifest.json          # 配置应用名称、appid、logo、版本等打包信息
├── package.json           # package.json
└── pages.json             # 配置页面路由、导航条、选项卡等页面类信息
```

## colorful-uni 目录结构

```
├── src                  # 源代码
├── ├──  components      # 组件
├── ├──  core            # 工具
├── ├──  css             # 样式
├── └── store            # vuex
├── index.js             # 模块输出
├── index.css            # 样式输出
├── theme.scss           # 主题样式输出
└── u.theme.scss         # uview主题样式关联
```

---
