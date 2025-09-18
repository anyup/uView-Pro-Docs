// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
// 自定义样式
import './rainbow.css'
import './vars.css'
import './overrides.css'
// 全局引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { h, watch } from 'vue'
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
import BadgeVersion from '../components/BadgeVersion.vue'
import ToApi from '../components/ToApi.vue'
import IconList from '../components/IconList.vue'
import CustomBlock from '../components/CustomBlock.vue'
import SidebarAdvs from '../components/SidebarAdvs.vue'
import CSSLayout from './CSSLayout.vue'
import Contributors from '../components/Contributors.vue'
import Developers from '../components/Developers.vue'
import Overview from '../components/Overview.vue'
import Partners from '../components/Partners.vue'

let homePageStyle = undefined

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout() {
    return h(CSSLayout)
  },
  enhanceApp({ app, router }) {
    // 注册ElementPlus
    app.use(ElementPlus, {
      locale: zhCn
    })
    // 注册自定义全局组件
    app.component('DemoScan', DemoScan)
    app.component('DemoPreview', DemoPreview)
    app.component('FooterInfo', FooterInfo)
    app.component('ArticleFooter', ArticleFooter)
    app.component('CustomIcon', CustomIcon)
    app.component('SitePV', SitePV)
    app.component('ColorPicker', ColorPicker)
    app.component('ProjectInfo', ProjectInfo)
    app.component('DemoModel', DemoModel)
    app.component('ChatGroup', ChatGroup)
    app.component('Donation', Donation)
    app.component('ThemeGenerate', ThemeGenerate)
    app.component('TemplateDownload', TemplateDownload)
    app.component('BadgeVersion', BadgeVersion)
    app.component('ToApi', ToApi)
    app.component('IconList', IconList)
    app.component('CustomBlock', CustomBlock)
    app.component('SidebarAdvs', SidebarAdvs)
    app.component('Contributors', Contributors)
    app.component('Developers', Developers)
    app.component('Overview', Overview)
    app.component('Partners', Partners)

    if (typeof window === 'undefined') return
    document.documentElement.classList.add('rainbow')

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true }
    )

  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return
    homePageStyle.remove()
    homePageStyle = undefined
  }
}
