// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
// 自定义样式
import './custom.css'
// import './iconfont.css'
// 全局引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 自定义组件
import DemoScan from '../components/DemoScan.vue'
import DemoPreview from '../components/DemoPreview.vue'
import FooterInfo from '../components/FooterInfo.vue'
import ArticleFooter from '../components/ArticleFooter.vue'
import CustomIcon from '../components/CustomIcon.vue'
import SitePV from '../components/SitePV.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import ColorPicker from '../components/ColorPicker.vue'
import DemoModel from '../components/DemoModel.vue'
import ChatGroup from '../components/ChatGroup.vue'
import Donation from '../components/Donation.vue'
import ThemeGenerate from '../components/ThemeGenerate.vue'
import TemplateDownload from '../components/TemplateDownload.vue'
import HomeStar from '../components/HomeStar.vue'
import BadgeVersion from '../components/BadgeVersion.vue'
import BadgeNpm from '../components/BadgeNpm.vue'
import { h } from 'vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
    Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-info-after':()=>h(HomeStar),
      'nav-bar-title-after': () => h(BadgeNpm),
    })
  },
  enhanceApp({ app }) {
    // 注册ElementPlus
    app.use(ElementPlus, {
      locale: zhCn
    })
    // 注册自定义全局组件
    app.component('DemoScan', DemoScan),
      app.component('DemoPreview', DemoPreview),
      app.component('FooterInfo', FooterInfo),
      app.component('ArticleFooter', ArticleFooter),
      app.component('CustomIcon', CustomIcon),
      app.component('SitePV', SitePV),
      app.component('ColorPicker', ColorPicker),
      app.component('ProjectInfo', ProjectInfo),
      app.component('DemoModel', DemoModel)
      app.component('ChatGroup', ChatGroup)
      app.component('Donation', Donation)
      app.component('ThemeGenerate', ThemeGenerate)
      app.component('TemplateDownload', TemplateDownload)
      app.component('BadgeVersion', BadgeVersion)
  }
}
