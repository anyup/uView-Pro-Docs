<template>
  <div class="pv-row container">
    <div class="pv-col">本站总访问量<span id="busuanzi_value_site_pv"></span>次</div>
    <div class="pv-col">本站总访客数<span id="busuanzi_value_site_uv"></span>人</div>
    <div class="pv-col">本文总阅读量<span id="busuanzi_value_page_pv"></span>次</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const offset = {
  sitePV: 10000,
  siteUV: 6000,
  pagePV: 3000
}
const setValue = (id: string, offset: number) => {
  // 获取页面元素
  const dom = document.getElementById(id)
  // 检查是否成功获取到了pv元素，并且它有内容（即不蒜子已经加载并设置了值）
  if (dom && dom.innerHTML) {
    // 将文本内容转换为整数并加上偏移量
    var currentPV = parseInt(dom.innerHTML, 10)
    var newPV = currentPV + offset
    // 更新页面上的显示
    dom.innerHTML = String(newPV)
    return
  }
  // 如果没有成功获取到pv元素，等待1秒后再次尝试
  setTimeout(() => {
    setValue(id, offset)
  }, 1000)
}
onMounted(() => {
  // 检查并更新page pv
  setValue('busuanzi_value_page_pv', offset.pagePV)
  // 检查并更新site uv
  setValue('busuanzi_value_site_uv', offset.siteUV)
  // 检查并更新site pv
  setValue('busuanzi_value_site_pv', offset.sitePV)
})
</script>

<style scoped>

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.pv-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  /* padding: 10px; */
}
.pv-col {
  flex: 1;
  text-align: center;
  padding: 20px;
  border: 1px dashed #2979ff;
  border-radius: 5px;
  color: #666;
  min-width: 260px;
}
.pv-col + .pv-col {
  margin-left: 20px;
}
.pv-col span {
  color: #2979ff;
  font-weight: 700;
  padding: 0 5px;
}

@media (max-width: 1000px) {
  .pv-row {
    flex-direction: column;
  }
  .pv-col + .pv-col {
    margin-left: 0;
    margin-top: 20px;
  }
}
</style>
