# 自定义主题

<demo-model url="/pages/componentsC/color/index"></demo-model>

uView Pro 目前可以自定主题色，字体颜色，边框颜色等，所有组件内部的样式，都基于同一套主题，比如您修改了`primary`主题色，所有用到了`primary`颜色
的组件都会受影响。

## 教程

1. 可以在打开的颜色拾取器中输入或者选择颜色，再点"确定"按钮即可。
2. 颜色配置完后，在页面底部下载文件，会得到一个名为`uview-pro.theme.scss`的文件。
3. 将文件复制到项目的公共目录(视情况而定)中，再在项目根目录的`uni.scss`中引入即可。
4. 删除`uni.scss`文件中原来引入的`@import 'uview-pro/theme.scss';`(旧的内置主题文件引入语句)。
5. 重新编译项目或者重启 HX 即可生效。

<theme-generate></theme-generate>


