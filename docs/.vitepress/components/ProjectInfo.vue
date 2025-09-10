<template>
  <div class="project-info">
    <div class="card-group blue">
      <div class="card-group-title primary">开源项目 uView Pro</div>
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>uni-app Vue3 快速开发工具库</span>
          </div>
        </template>
        <p>
          简介：uView Pro，是全面支持 Vue3.0、TypeScript 的 uni-app
          生态框架，uView Pro 的基线版本是基于 uView 1.8.8 修改，使用 TypeScript
          完全重构，目前已全面支持 uni-app Vue3.0。
        </p>
        <template #footer>
          <DemoScan type="0" border-color="#c6e2ff"></DemoScan>
        </template>
      </el-card>
    </div>
    <div class="card-group blue">
      <div class="card-group-title primary">开源项目 Colorful Uni</div>
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>uni-app Vue2 快速开发工具库</span>
          </div>
        </template>
        <p>
          简介：基于 uni-app 的一个快速开发工具库，UI 组件基于 uView。uView
          已经非常优秀，本着不重复造轮子、快速高效开发 App
          的原则，同时基于项目开发最佳实践，不断优化迭代。使用该工具库可以高效、快速的进行多平台开发
          App、H5、微信小程序等。
          这套工具库的初衷是面向实际开发项目，打造一个好用、快速开发、最佳实践的高标准工具库。
        </p>
        <template #footer>
          <DemoScan type="1" border-color="#c6e2ff"></DemoScan>
        </template>
      </el-card>
    </div>
    <div class="card-group blue">
      <div class="card-group-title">软考题库</div>
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>有题记</span>
          </div>
        </template>
        <p>
          简介：有题记小程序是我个人独立开发的一款 PMP
          和软考刷题小程序，目前完全免费，致力于做最好用的考试刷题小程序。技术栈为：uni-app
          + uniCloud
        </p>
        <template #footer>
          <DemoScan type="2" border-color="#c6e2ff"></DemoScan>
        </template>
      </el-card>
    </div>
    <div class="card-group blue">
      <div class="card-group-title">个人品牌建设</div>
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>前端梦工厂</span>
          </div>
        </template>
        <p>
          简介：前端梦工厂是一个汇聚前端梦想和工作的精彩公众号，同时也是掘金优秀创作者，CSDN
          博客专家。关注我，让我们一起逐梦前端！
        </p>
        <template #footer>
          <DemoScan type="3" border-color="#c6e2ff"></DemoScan>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemoScan from './DemoScan.vue'
</script>

<style scoped>
.card-group {
  margin: 40px 0;
}
.card-group-title {
  position: relative;
  padding-left: 15px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 20px 0;
  color: #606060;
  line-height: 30px;
}

.gray .card-group-title {
  color: #666666 !important;
}

.gray .card-group-title::after {
  background-color: #666666 !important;
}

.blue .card-group-title {
  color: #2979ff !important;
}

.blue .card-group-title::after {
  background-color: #2979ff !important;
}

.green .card-group-title {
  color: #67c23a !important;
}

.green .card-group-title::after {
  background-color: #67c23a !important;
}

.yellow .card-group-title {
  color: #e6a23c !important;
}

.yellow .card-group-title::after {
  background-color: #e6a23c !important;
}

.card-group-title::after {
  position: absolute;
  content: '';
  top: 0;
  width: 5px;
  height: 30px;
  left: 0;
  border-radius: 10px;
  background-color: #606060;
}

.project-info p {
  font-size: 14px;
}

.gray .el-card {
  --el-card-border-color: #e6e6e6;
  background-color: #f6f6f6;
}

.blue .el-card {
  --el-card-border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.green .el-card {
  --el-card-border-color: #d2edc4;
  background-color: #f0f9ec;
}

.yellow .el-card {
  --el-card-border-color: #f8e3c5;
  background-color: #fdf6ec;
}
</style>
