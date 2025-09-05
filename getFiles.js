const fs = require('fs')
const path = require('path')
const nameKeys = {
  css: 'CSS样式表',
  'design-pattern': '设计模式',
  'front-end': '精通前端',
  'large-screen': '可视化大屏',
  'open-source': '开源项目',
  tools: '开发工具',
  'uni-app': 'uni-app开发',
  vuejs2: 'Vue.js开发'
}

const list = []
const blogList = []

function readDirectoryRecursively(dirPath, baseDir = '') {
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err)
      return
    }
    files.forEach((file, index) => {
      const fullPath = path.join(dirPath, file.name)
      const relativePath = path.join(baseDir, file.name).replace(/\\/g, '/') // 替换反斜杠为正斜杠

      if (file.isDirectory()) {
        // 如果是目录，则递归调用自身
        readDirectoryRecursively(fullPath, relativePath)
      } else if (file.name.endsWith('.md')) {
        // 如果是 .md 文件，打印路径
        // console.log({ text: file.name.replace(/\.md$/, ''), link: relativePath.replace(/\.md$/, '') }) // 去掉 .md 后缀
        // 去掉 .md 后缀
        let text = file.name.replace(/\.md$/, '')
        let link = relativePath.replace(/\.md$/, '')
        if (file.name === 'index.md') {
          text = nameKeys[baseDir]
          link = relativePath.replace(/index.md$/, '')
          list.unshift({ text, link })
        } else {
          list.push({ text, link })
        }
      }
    })
  })
}

// 调用函数，开始遍历目录
readDirectoryRecursively(path.join(__dirname, 'docs/zh/blog'), '')
// 生成数组
setTimeout(() => {
  for (const key in nameKeys) {
    const listItem = {
      text: nameKeys[key],
      collapsed: true,
      items: []
    }
    listItem.items = list.filter(item => item.link.indexOf(key) === 0)
    blogList.push(listItem)
  }
  console.log(JSON.stringify(blogList))
}, 1000)
