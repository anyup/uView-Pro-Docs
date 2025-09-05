import { defineConfig, type DefaultTheme } from 'vitepress'

// 自动化，给text添加索引值
function addTextIndex(array): DefaultTheme.SidebarItem[] {
  return array.map(arr => {
    arr.items = arr.items.map((item, index) => {
      item.text = `${index + 1}. ${item.text}`
      return item
    })
    return arr
  })
}

class Menu<T> {
  locale: string
  constructor(locale: string) {
    this.locale = locale
  }
  // 导航栏
  nav(): DefaultTheme.NavItem[] {
    return [
      { text: '首页', link: '/' },
      {
        text: 'uni-app 相关库',
        activeMatch: `/${this.locale}/uni`,
        items: [
          { text: 'uView Pro Vue3 组件库', link: `https://uview-pro.netlify.app/` },
          { text: 'uni-app Vue2 开源库', link: `/${this.locale}/colorful-uni/guide/introduce`, activeMatch: `/${this.locale}/colorful-uni/` },
          { text: 'uni-app 请求库', link: `/${this.locale}/uni-http/guide/introduce`, activeMatch: `/${this.locale}/uni-http/` },
        ]
      },
      // {
      //   text: 'JS 相关库',
      //   activeMatch: `/${this.locale}/fly`,
      //   items: [{ text: 'flyit 工具库', link: `/${this.locale}/flyit/guide/introduce`, activeMatch: `/${this.locale}/flyit/` }]
      // },
      {
        text: '脚手架工具',
        activeMatch: `/${this.locale}/template/create-uni/`,
        link: `/${this.locale}/template/create-uni/`
      },
      {
        text: '博客园',
        activeMatch: `/${this.locale}/blog/`,
        items: [
          { text: '关于我', link: `/${this.locale}/blog/` },
          { text: 'uni-app开发', link: `/${this.locale}/blog/uni-app/`, activeMatch: `/${this.locale}/blog/uni-app/` },
          { text: '精通前端', link: `/${this.locale}/blog/front-end/`, activeMatch: `/${this.locale}/blog/front-end/` },
          { text: '前端设计模式', link: `/${this.locale}/blog/design-pattern/`, activeMatch: `/${this.locale}/blog/design-pattern/` },
          { text: 'CSS样式表', link: `/${this.locale}/blog/css/`, activeMatch: `/${this.locale}/blog/css/` },
          { text: 'Vue开发', link: `/${this.locale}/blog/vuejs2/`, activeMatch: `/${this.locale}/blog/vuejs2/` },
          { text: '开发工具', link: `/${this.locale}/blog/tools/`, activeMatch: `/${this.locale}/blog/tools/` },
          { text: '可视化大屏', link: `/${this.locale}/blog/large-screen/`, activeMatch: `/${this.locale}/blog/large-screen/` }
        ]
      }
    ]
  }
  // 侧边栏
  sidebar(): DefaultTheme.Sidebar {
    return {
      '/zh/blog/': { base: '/zh/blog/', items: this.sidebarBlog() },
      '/zh/colorful-uni/': { base: '', items: this.sidebarColorfulUni() },
      '/zh/uni-http/': { base: '', items: this.sidebarUniHttp() },
      '/zh/flyit/': { base: '', items: this.sidebarFlyit() },
      '/zh/template/': { base: '', items: this.sidebarTemplate() }
    }
  }
  // 1.博客菜单
  sidebarBlog(): DefaultTheme.SidebarItem[] {
    return addTextIndex([
      {
        text: 'CSS样式表',
        collapsed: true,
        items: [
          { text: 'CSS样式表', link: 'css/' },
          { text: 'SCSS入门-利用预处理器升级样式表技术', link: 'css/SCSS入门-利用预处理器升级样式表技术' },
          { text: 'SCSS实践-构建适合自己的全局样式库', link: 'css/SCSS实践-构建适合自己的全局样式库' },
          { text: 'SCSS进阶-探索更多样式表达的可能性', link: 'css/SCSS进阶-探索更多样式表达的可能性' }
        ]
      },
      {
        text: '设计模式',
        collapsed: true,
        items: [
          { text: '设计模式', link: 'design-pattern/' },
          { text: '必备导航指南', link: 'design-pattern/必备导航指南' },
          { text: '创建型-单例模式', link: 'design-pattern/创建型-单例模式' },
          { text: '创建型-原型模式', link: 'design-pattern/创建型-原型模式' },
          { text: '创建型-工厂方法模式', link: 'design-pattern/创建型-工厂方法模式' },
          { text: '创建型-建造者模式', link: 'design-pattern/创建型-建造者模式' },
          { text: '创建型-抽象工厂模式', link: 'design-pattern/创建型-抽象工厂模式' },
          { text: '创建型-简单工厂模式', link: 'design-pattern/创建型-简单工厂模式' },
          { text: '结构型-享元模式', link: 'design-pattern/结构型-享元模式' },
          { text: '结构型-代理模式', link: 'design-pattern/结构型-代理模式' },
          { text: '结构型-外观模式', link: 'design-pattern/结构型-外观模式' },
          { text: '结构型-桥接模式', link: 'design-pattern/结构型-桥接模式' },
          { text: '结构型-组合模式', link: 'design-pattern/结构型-组合模式' },
          { text: '结构型-装饰者模式', link: 'design-pattern/结构型-装饰者模式' },
          { text: '结构型-适配器模式', link: 'design-pattern/结构型-适配器模式' },
          { text: '行为型-命令模式实战', link: 'design-pattern/行为型-命令模式实战' },
          { text: '行为型-模板方法模式', link: 'design-pattern/行为型-模板方法模式' },
          { text: '行为型-状态模式', link: 'design-pattern/行为型-状态模式' },
          { text: '行为型-策略模式', link: 'design-pattern/行为型-策略模式' },
          { text: '行为型-职责链模式', link: 'design-pattern/行为型-职责链模式' },
          { text: '行为型-观察者模式', link: 'design-pattern/行为型-观察者模式' }
        ]
      },
      {
        text: '精通前端',
        collapsed: true,
        items: [
          { text: '精通前端', link: 'front-end/' },
          { text: 'Blob实践-应用场景和实例分析', link: 'front-end/Blob实践-应用场景和实例分析' },
          { text: 'Blob指南-从零开始学习Blob对象的使用', link: 'front-end/Blob指南-从零开始学习Blob对象的使用' },
          { text: 'Canvas入门-了解几个绘制基本图形的 API', link: 'front-end/Canvas入门-了解几个绘制基本图形的 API' },
          { text: 'Canvas进阶-创作美轮美奂的中秋月饼', link: 'front-end/Canvas进阶-创作美轮美奂的中秋月饼' },
          { text: 'ES6中神奇的WeakMap', link: 'front-end/ES6中神奇的WeakMap' },
          { text: 'ES6异步编程Promise，循序渐进掌握', link: 'front-end/ES6异步编程Promise，循序渐进掌握' },
          { text: 'ES6新类型Symbol必知必会', link: 'front-end/ES6新类型Symbol必知必会' },
          { text: 'ES6生成器Generator-优雅的异步编程利器', link: 'front-end/ES6生成器Generator-优雅的异步编程利器' },
          { text: 'ES6生成器Generator的异步编程应用', link: 'front-end/ES6生成器Generator的异步编程应用' },
          { text: 'Math工具函数的妙用-常用的数值操作', link: 'front-end/Math工具函数的妙用-常用的数值操作' },
          { text: 'Set实践-探索Set对象迭代、转换和应用场景', link: 'front-end/Set实践-探索Set对象迭代、转换和应用场景' },
          { text: 'Set必备指南-深入理解Set的特性和方法', link: 'front-end/Set必备指南-深入理解Set的特性和方法' },
          { text: 'postMessage如何实现跨iframe页面通信', link: 'front-end/postMessage如何实现跨iframe页面通信' },
          { text: '一行代码-数组版', link: 'front-end/一行代码-数组版' },
          { text: '万物皆对象，详解面向对象编程的核心方法', link: 'front-end/万物皆对象，详解面向对象编程的核心方法' },
          { text: '事件循环机制，一文解析宏任务与微任务', link: 'front-end/事件循环机制，一文解析宏任务与微任务' },
          { text: '函数flatMap的使用及实现原理', link: 'front-end/函数flatMap的使用及实现原理' },
          { text: '函数reduce的妙用', link: 'front-end/函数reduce的妙用' },
          { text: '函数反柯里化', link: 'front-end/函数反柯里化' },
          { text: '函数柯里化的实现与应用', link: 'front-end/函数柯里化的实现与应用' },
          { text: '前端性能优化-CDN缓存', link: 'front-end/前端性能优化-CDN缓存' },
          { text: '前端性能优化-回流与重绘', link: 'front-end/前端性能优化-回流与重绘' },
          { text: '前端性能优化-图片懒加载', link: 'front-end/前端性能优化-图片懒加载' },
          { text: '前端性能优化-防抖与节流', link: 'front-end/前端性能优化-防抖与节流' },
          { text: '可选链打造简洁且健壮的代码', link: 'front-end/可选链打造简洁且健壮的代码' },
          { text: '巧用meta标签，设置referrer解决403Forbidden', link: 'front-end/巧用meta标签，设置referrer解决403Forbidden' },
          { text: '微信公众号，从零到一快速实现微信公众号授权', link: 'front-end/微信公众号，从零到一快速实现微信公众号授权' },
          { text: '微信公众号，微信小程序与公众号下发统一消息接口调整', link: 'front-end/微信公众号，微信小程序与公众号下发统一消息接口调整' },
          { text: '微信小程序，推送公众号模版消息整改方案', link: 'front-end/微信小程序，推送公众号模版消息整改方案' },
          { text: '探索优雅的处理JavaScript类数组对象的技巧', link: 'front-end/探索优雅的处理JavaScript类数组对象的技巧' },
          { text: '改进条件语句，探索可以替代if...else的7种方式', link: 'front-end/改进条件语句，探索可以替代if...else的7种方式' },
          { text: '数组判断攻略-告别误判，精准判定变量是否为数组', link: 'front-end/数组判断攻略-告别误判，精准判定变量是否为数组' },
          { text: '文字跑马灯，实现文字自动滚动策略的原理分析', link: 'front-end/文字跑马灯，实现文字自动滚动策略的原理分析' },
          { text: '深入学习面向对象设计原则', link: 'front-end/深入学习面向对象设计原则' },
          { text: '深入理解对象的原型与原型链', link: 'front-end/深入理解对象的原型与原型链' },
          { text: '玩转深拷贝和浅拷贝', link: 'front-end/玩转深拷贝和浅拷贝' },
          { text: '盘点几个input标签鲜为人知的HTML属性', link: 'front-end/盘点几个input标签鲜为人知的HTML属性' },
          { text: '闭包与立即执行函数表达式IIFE', link: 'front-end/闭包与立即执行函数表达式IIFE' }
        ]
      },
      {
        text: '可视化大屏',
        collapsed: true,
        items: [
          { text: '可视化大屏', link: 'large-screen/' },
          { text: 'ECharts-GL实现3D地图下钻功能', link: 'large-screen/ECharts-GL实现3D地图下钻功能' },
          { text: 'ECharts-GL实现3D旋转地球', link: 'large-screen/ECharts-GL实现3D旋转地球' },
          { text: 'ECharts-GL实现世界级、国家级、省市级3D地图', link: 'large-screen/ECharts-GL实现世界级、国家级、省市级3D地图' },
          { text: 'ECharts十万级+数据渲染性能优化方案', link: 'large-screen/ECharts十万级+数据渲染性能优化方案' },
          { text: 'ECharts图表渲染导致的内存泄漏问题分析', link: 'large-screen/ECharts图表渲染导致的内存泄漏问题分析' },
          { text: 'ECharts地图区域自动高亮轮播的方案', link: 'large-screen/ECharts地图区域自动高亮轮播的方案' },
          { text: 'ECharts地图合规整改，实现最基础的中国地图', link: 'large-screen/ECharts地图合规整改，实现最基础的中国地图' },
          { text: 'ECharts地图实战分析，实现完整的地图下钻功能', link: 'large-screen/ECharts地图实战分析，实现完整的地图下钻功能' },
          { text: 'ECharts鼠标自由刷选区域，定向放大图表', link: 'large-screen/ECharts鼠标自由刷选区域，定向放大图表' }
        ]
      },
      {
        text: '开源项目',
        collapsed: true,
        items: [
          { text: '100行代码打造小而美的uni-app请求库', link: 'open-source/100行代码打造小而美的uni-app请求库' },
          { text: 'FlyHttp代码提示指南', link: 'open-source/FlyHttp代码提示指南' },
          { text: '全端通用前端小工具！加速构建API请求类', link: 'open-source/全端通用前端小工具！加速构建API请求类' }
        ]
      },
      {
        text: '开发工具',
        collapsed: true,
        items: [
          { text: '开发工具', link: 'tools/' },
          { text: 'Coze扣子初体验，创建一个智能故事机Bot', link: 'tools/Coze扣子初体验，创建一个智能故事机Bot' },
          { text: 'GitFlow：优化开发流程，团队协作的最佳实践', link: 'tools/GitFlow：优化开发流程，团队协作的最佳实践' },
          { text: 'Gulp打包：解决前端项目部署缓存问题', link: 'tools/Gulp打包：解决前端项目部署缓存问题' },
          { text: 'NVM设置多项目不同Node.js环境', link: 'tools/NVM设置多项目不同Node.js环境' },
          { text: 'PNPM包管理探索', link: 'tools/PNPM包管理探索' },
          { text: 'Rollup入门指南：解密高效的JavaScript打包器', link: 'tools/Rollup入门指南：解密高效的JavaScript打包器' },
          { text: 'Rollup高级特性：代码拆分、Tree-shaking和插件系统', link: 'tools/Rollup高级特性：代码拆分、Tree-shaking和插件系统' },
          { text: 'VOLTA：更优秀的项目级Node.js版本管理工具', link: 'tools/VOLTA：更优秀的项目级Node.js版本管理工具' },
          { text: 'VSCode插件开发指南，提升自己的编码效率', link: 'tools/VSCode插件开发指南，提升自己的编码效率' },
          { text: 'gitignore文件中的通配符使用和忽略规则', link: 'tools/gitignore文件中的通配符使用和忽略规则' },
          { text: 'i18NEXT国际化：陈年老旧项目如何进行国际化', link: 'tools/i18NEXT国际化：陈年老旧项目如何进行国际化' },
          { text: 'iOSAPP备案：如何通过证书文件获取公钥和指纹', link: 'tools/iOSAPP备案：如何通过证书文件获取公钥和指纹' }
        ]
      },
      {
        text: 'uni-app开发',
        collapsed: true,
        items: [
          { text: 'uni-app开发', link: 'uni-app/' },
          { text: 'uni-app图标库整合-使用iconfont构建图标库', link: 'uni-app/uni-app图标库整合-使用iconfont构建图标库' },
          { text: 'uni-app多端编译-static目录条件编译最佳实践', link: 'uni-app/uni-app多端编译-static目录条件编译最佳实践' },
          { text: 'uni-app多端部署-自定义平台的条件编译实战详解', link: 'uni-app/uni-app多端部署-自定义平台的条件编译实战详解' },
          { text: 'uni-app小程序分包策略-合理优化包体积分布', link: 'uni-app/uni-app小程序分包策略-合理优化包体积分布' },
          { text: 'uni-app尺寸单位rpx', link: 'uni-app/uni-app尺寸单位rpx' },
          { text: 'uni-app扫码优化-如何提升安卓App扫码准确率', link: 'uni-app/uni-app扫码优化-如何提升安卓App扫码准确率' },
          { text: 'uni-app扫码插件推荐-基于支付宝mPaaS扫码组件', link: 'uni-app/uni-app扫码插件推荐-基于支付宝mPaaS扫码组件' },
          { text: 'uni-app请求最佳实践-基于自定义Request请求库', link: 'uni-app/uni-app请求最佳实践-基于自定义Request请求库' },
          { text: '打包uni-app应用-安卓篇打包指南', link: 'uni-app/打包uni-app应用-安卓篇打包指南' },
          { text: '经历了PMP和软考高项，我独立开发了一款刷题小程序', link: 'uni-app/经历了PMP和软考高项，我独立开发了一款刷题小程序' }
        ]
      },
      {
        text: 'Vue.js开发',
        collapsed: true,
        items: [
          { text: 'Vue.js开发', link: 'vuejs2/' },
          { text: 'Vuex入门与实战', link: 'vuejs2/Vuex入门与实战' },
          { text: 'Vuex进阶知识', link: 'vuejs2/Vuex进阶知识' },
          { text: 'Vue事件总线的原理与应用', link: 'vuejs2/Vue事件总线的原理与应用' },
          { text: 'Vue依赖注入机制', link: 'vuejs2/Vue依赖注入机制' },
          { text: 'Vue侦听器watch的使用方法及注意事项', link: 'vuejs2/Vue侦听器watch的使用方法及注意事项' },
          { text: 'Vue内存泄漏分析：如何避免开发过程中导致的内存泄漏问题', link: 'vuejs2/Vue内存泄漏分析：如何避免开发过程中导致的内存泄漏问题' },
          { text: 'Vue前端权限控制：深入理解 Vue 自定义指令的应用', link: 'vuejs2/Vue前端权限控制：深入理解 Vue 自定义指令的应用' },
          { text: 'Vue响应式监听watch的妙用', link: 'vuejs2/Vue响应式监听watch的妙用' },
          { text: 'Vue基础指令的魅力', link: 'vuejs2/Vue基础指令的魅力' },
          { text: 'Vue异步更新nextTick解析与实践', link: 'vuejs2/Vue异步更新nextTick解析与实践' },
          { text: 'Vue插槽：提升Vue组件灵活性的利器', link: 'vuejs2/Vue插槽：提升Vue组件灵活性的利器' },
          { text: 'Vue缓存组件：KeepAlive', link: 'vuejs2/Vue缓存组件：KeepAlive' },
          { text: 'Vue自定义指令实战：掌握高级前端开发技巧', link: 'vuejs2/Vue自定义指令实战：掌握高级前端开发技巧' },
          { text: 'Vue自定义组件实现v-model的几种方式', link: 'vuejs2/Vue自定义组件实现v-model的几种方式' },
          { text: 'Vue计算属性：computed的使用与优化', link: 'vuejs2/Vue计算属性：computed的使用与优化' },
          { text: 'Vue高级指令解析：掌握几个内置指令的各种妙用', link: 'vuejs2/Vue高级指令解析：掌握几个内置指令的各种妙用' }
        ]
      }
    ])
  }

  // 2.colorful-uni 文档
  sidebarColorfulUni(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: 'uni-app 快速开发库',
        base: `/${this.locale}/colorful-uni/`,
        items: [
          {
            text: '指南',
            collapsed: false,
            items: [
              { text: '介绍', link: 'guide/introduce' },
              { text: '安装', link: 'guide/install' },
              { text: '快速上手', link: 'guide/quickstart' },
              { text: '目录结构', link: 'guide/directory' },
              { text: '开发工具', link: 'guide/devtools' },
              { text: '注意事项', link: 'guide/feature' },
              { text: '更新日志', link: 'guide/changelog' }
            ]
          },
          {
            text: '组件',
            collapsed: false,
            items: [
              { text: 'Layout - 布局', link: 'components/layout' },
              { text: 'Button - 按钮', link: 'components/button' },
              { text: 'Loader - 加载图标', link: 'components/loader' },
              { text: 'Loading - 加载框', link: 'components/loading' },
              { text: 'Table - 表格', link: 'components/table' },
              { text: 'Toast - 提示', link: 'components/toast' },
              { text: 'WebView - 网页视图', link: 'components/webview' },
              { text: 'Updater - 应用更新管理', link: 'components/updater' },
              { text: 'Apis - 服务器选择', link: 'components/apis' }
            ]
          },
          {
            text: '工具',
            collapsed: false,
            items: [
              { text: 'Checker - 表单校验', link: 'js/checker' },
              { text: 'Http - 网络请求', link: 'js/http' },
              { text: 'Optimize - 优化类', link: 'js/optimize' },
              { text: 'Pager - 分页', link: 'js/pager' },
              { text: 'Push - 推送', link: 'js/push' },
              { text: 'Plus - 真机类', link: 'js/plus' },
              { text: 'Store - 状态管理', link: 'js/store' },
              { text: 'Tips - 提示', link: 'js/tips' }
            ]
          }
        ]
      },
      { text: 'github', link: 'https://github.com/anyup/colorful-uni' },
      { text: 'gitee', link: 'https://gitee.com/anyup/colorful-uni' }
    ]
  }

  // 3.uni-http 文档
  sidebarUniHttp(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: 'uni-http 请求库',
        base: `/${this.locale}/uni-http/`,
        items: [
          {
            text: '指南',
            collapsed: false,
            items: [
              { text: '介绍', link: 'guide/introduce' },
              { text: '实现思路', link: 'guide/implement' },
              { text: '安装', link: 'guide/install' },
              { text: '快速上手', link: 'guide/quickstart' },
              { text: '注意事项', link: 'guide/feature' },
              { text: '更新日志', link: 'guide/changelog' }
            ]
          }
        ]
      },
      { text: 'github', link: 'https://github.com/anyup/uni-http' },
      { text: 'gitee', link: 'https://gitee.com/anyup/uni-http' }
    ]
  }

  // 4.flyit 文档
  sidebarFlyit(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: 'flyit 工具库',
        base: `/${this.locale}/flyit/`,
        items: [
          {
            text: '指南',
            collapsed: false,
            items: [
              { text: '介绍', link: 'guide/introduce' },
              { text: '安装', link: 'guide/install' },
              { text: '快速上手', link: 'guide/quickstart' },
              { text: '最佳实践', link: 'guide/bestdemo' }
            ]
          }
        ]
      },
      { text: 'github', link: 'https://github.com/anyup/flyit' },
      { text: 'gitee', link: 'https://gitee.com/anyup/flyit' }
    ]
  }

  // 5.脚手架 文档
  sidebarTemplate(): DefaultTheme.SidebarItem[] {
    return [{ text: '', base: `/${this.locale}/template/`, link: 'create-uni/index' }]
  }
}

export default Menu
