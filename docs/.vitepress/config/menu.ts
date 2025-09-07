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
      {
        text: '指南',
        activeMatch: `/${this.locale}/guide`,
        link: `/${this.locale}/guide/demo`
        // items: [{ text: '效果演示', link: `/${this.locale}/guide/demo` }]
      },
      {
        text: '组件',
        activeMatch: `/${this.locale}/components`,
        link: `/${this.locale}/components/intro`
      },
      {
        text: '工具',
        activeMatch: `/${this.locale}/tools`,
        link: `/${this.locale}/tools/intro`
      },
      {
        text: '模版',
        activeMatch: `/${this.locale}/layout`,
        link: `/${this.locale}/layout/intro`
      },
      {
        text: '资源',
        link: `/${this.locale}/resource/intro`
      },
      {
        text: '交流反馈',
        link: `/${this.locale}/resource/about`
      },
      {
        text: '捐赠',
        link: `/${this.locale}/resource/donation`
      },
    ]
  }
  // 侧边栏
  sidebar(): DefaultTheme.Sidebar {
    return {
      '/zh/guide/': { base: '/zh/guide/', items: this.sidebarGuide() },
      '/zh/tools/': { base: '/zh/guide/', items: this.sidebarTools() },
      '/zh/layout/': { base: '/zh/layout/', items: this.sidebarLayout() },
      '/zh/components/': {
        base: '/zh/components/',
        items: this.sidebarComponents()
      },
    }
  }
  // guide 文档
  sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '指南',
        base: `/${this.locale}/guide/`,
        items: [
          { text: '效果演示', link: 'demo' },
          { text: '扩展自定义图标库', link: 'customIcon' },
          { text: '自定义主题', link: 'theme' },
          { text: '代码提示', link: 'codeHint' },
          { text: '设计理念', link: 'design' },
          { text: '注意事项', link: 'note' },
          { text: 'FAQ', link: 'faq' }
        ]
      }
    ]
  }
  // components 文档
  sidebarComponents(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '组件',
        base: `/${this.locale}/components/`,
        items: [
          {
            text: '起步',
            collapsed: false,
            items: [
              { text: '交流反馈', link: 'chatGroup' },
              { text: '介绍', link: 'intro' },
              { text: '安装', link: 'install' },
              { text: '配置', link: 'setting' },
              { text: '快速上手', link: 'quickstart' },
              { text: '内置样式', link: 'common' },
              { text: '注意事项', link: 'feature' },
              { text: 'Nvue排错指南', link: 'nvue' },
              { text: '更新日志', link: 'changelog' }
            ]
          },
          {
            text: '基础组件',
            collapsed: false,
            items: [
              { text: 'Color 色彩', link: 'color' },
              { text: 'Icon 图标', link: 'icon' },
              { text: 'Image 图片', link: 'image' },
              { text: 'Button 按钮', link: 'button' },
              { text: 'Layout 布局', link: 'layout' },
              { text: 'Cell 单元格', link: 'cell' },
              { text: 'Badge 徽标数', link: 'badge' },
              { text: 'Tag 标签', link: 'tag' }
            ]
          },
          {
            text: '表单组件',
            collapsed: false,
            items: [
              { text: 'Input 输入框', link: 'input' },
              { text: 'Form 表单', link: 'form' },
              { text: 'Calendar 日历', link: 'calendar' },
              { text: 'Select 列选择器', link: 'select' },
              { text: 'Keyboard 键盘', link: 'keyboard' },
              { text: 'Picker 选择器', link: 'picker' },
              { text: 'Rate 评分', link: 'rate' },
              { text: 'Search 搜索', link: 'search' },
              { text: 'NumberBox 步进器', link: 'numberBox' },
              { text: 'Upload 上传', link: 'upload' },
              {
                text: 'VerificationCode 验证码倒计时',
                link: 'verificationCode'
              },
              { text: 'Field 输入框', link: 'field' },
              { text: 'Checkbox 复选框', link: 'checkbox' },
              { text: 'Radio 单选框', link: 'radio' },
              { text: 'Switch 开关选择器', link: 'switch' },
              { text: 'Slider 滑动选择器', link: 'slider' }
            ]
          },
          {
            text: '数据组件',
            collapsed: false,
            items: [
              { text: 'CircleProgress 圆形进度条', link: 'circleProgress' },
              { text: 'LineProgress 线形进度条', link: 'lineProgress' },
              { text: 'Table 表格', link: 'table' },
              { text: 'CountDown 倒计时', link: 'countDown' },
              { text: 'CountTo 数字滚动', link: 'countTo' }
            ]
          },
          {
            text: '反馈组件',
            collapsed: false,
            items: [
              { text: 'ActionSheet 操作菜单', link: 'actionSheet' },
              { text: 'AlertTips 警告提示', link: 'alertTips' },
              { text: 'Toast 消息提示', link: 'toast' },
              { text: 'NoticeBar 滚动通知', link: 'noticeBar' },
              { text: 'TopTips 顶部提示', link: 'topTips' },
              { text: 'Collapse 折叠面板', link: 'collapse' },
              { text: 'Popup 弹出层', link: 'popup' },
              { text: 'SwipeAction 滑动单元格', link: 'swipeAction' },
              { text: 'Modal 模态框', link: 'modal' },
              { text: 'FullScreen 压窗屏', link: 'fullScreen' }
            ]
          },
          {
            text: '布局组件',
            collapsed: false,
            items: [
              { text: 'Line 线条', link: 'line' },
              { text: 'Card 卡片', link: 'card' },
              { text: 'Mask 遮罩层', link: 'mask' },
              { text: 'NoNetwork 无网络提示', link: 'noNetwork' },
              { text: 'Grid 宫格布局', link: 'grid' },
              { text: 'Swiper 轮播图', link: 'swiper' },
              { text: 'TimeLine 时间轴', link: 'timeLine' },
              { text: 'Skeleton 骨架屏', link: 'skeleton' },
              { text: 'Sticky 吸顶', link: 'sticky' },
              { text: 'Waterfall 瀑布流', link: 'waterfall' },
              { text: 'Divider 分割线', link: 'divider' }
            ]
          },
          {
            text: '导航组件',
            collapsed: false,
            items: [
              { text: 'Dropdown 下拉菜单', link: 'dropdown' },
              { text: 'Tabbar 底部导航栏', link: 'tabbar' },
              { text: 'BackTop 返回顶部', link: 'backTop' },
              { text: 'Navbar 导航栏', link: 'navbar' },
              { text: 'Tabs 标签', link: 'tabs' },
              { text: 'TabsSwiper 全屏选项卡', link: 'tabsSwiper' },
              { text: 'Subsection 分段器', link: 'subsection' },
              { text: 'IndexList 索引列表', link: 'indexList' },
              { text: 'Steps 步骤条', link: 'steps' },
              { text: 'Empty 内容为空', link: 'empty' },
              { text: 'Link 超链接', link: 'link' },
              { text: 'Section 查看更多', link: 'section' }
            ]
          },
          {
            text: '其他组件',
            collapsed: false,
            items: [
              { text: 'MessageInput 验证码输入', link: 'messageInput' },
              { text: 'Loadmore 加载更多', link: 'loadMore' },
              { text: 'ReadMore 展开阅读更多', link: 'readMore' },
              { text: 'LazyLoad 懒加载', link: 'lazyLoad' },
              { text: 'Gap 间隔槽', link: 'gap' },
              { text: 'Avatar 头像', link: 'avatar' },
              { text: 'Loading 加载动画', link: 'loading' }
            ]
          }
        ]
      }
    ]
  }
  // tools 文档
  sidebarTools(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '工具',
        base: `/${this.locale}/tools/`,
        items: [
          {
            text: '指南',
            collapsed: false,
            items: [
              { text: '介绍', link: 'intro' },
              { text: '便捷工具', link: 'fastUse' }
            ]
          },
          {
            text: '网络',
            collapsed: false,
            items: [
              { text: 'Request请求', link: 'request' },
            ]
          },
          {
            text: '工具库',
            collapsed: false,
            items: [
              { text: '节流防抖', link: 'debounce' },
              { text: '对象深度克隆', link: 'deepClone' },
              { text: '对象深度合并', link: 'deepMerge' },
              { text: '时间格式化', link: 'time' },
              { text: '路由跳转', link: 'route' },
              { text: '数组乱序', link: 'randomArray' },
              { text: '全局唯一标识符', link: 'guid' },
              { text: '颜色转换', link: 'colorSwitch' },
              { text: '颜色值', link: 'color' },
              { text: '对象转URL参数', link: 'queryParams' },
              { text: '规则校验', link: 'test' },
              { text: 'md5加密', link: 'md5' },
              { text: '随机数值', link: 'random' },
              { text: '去除空格', link: 'trim' },
              { text: '节点布局信息', link: 'getRect' }
            ]
          }
        ]
      }
    ]
  }
  // layout 文档
  sidebarLayout(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '模版',
        base: `/${this.locale}/layout/`,
        items: [
          {
            text: '起步',
            collapsed: false,
            items: [
              { text: '介绍', link: 'intro' },
            ]
          },
          {
            text: '部件',
            collapsed: false,
            items: [
              { text: 'Coupon 优惠券', link: 'coupon' },
            ]
          },
          {
            text: '页面',
            collapsed: false,
            items: [
              { text: '微信个人中心页', link: 'wxCenter' },
              { text: '自定义键盘支付', link: 'keyboardPay' },
              { text: '垂直分类', link: 'menu' },
              { text: '提交订单栏', link: 'submitBar' },
              { text: '评论列表', link: 'comment' },
              { text: '订单列表', link: 'order' },
              { text: '登录界面', link: 'login' },
              { text: '收货地址', link: 'address' },
              { text: '城市选择', link: 'citySelect' }
            ]
          },
        ]
      }
    ]
  }
}

export default Menu
