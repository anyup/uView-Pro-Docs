// import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'
import Menu from './menu'
// const require = createRequire(import.meta.url)
// const pkg = require('vitepress/package.json')
const menu = new Menu('zh')

export const en = defineConfig({
  lang: 'en-US',

  description: 'Colorful Design is solution-driven and includes project best practices.',

  themeConfig: {
    nav: menu.nav(),

    sidebar: menu.sidebar(),

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under <a style="color:#4e6e8e;" rel="noopener noreferrer" target="_blank" href="https://beian.miit.gov.cn/">鲁ICP备2021040594号-1</a>',
      copyright: `Copyright © 2020 - ${new Date().getFullYear()} <a target="_blank" href="https://github.com/anyup"> Colorful Design </a>`
    }
  }
})
