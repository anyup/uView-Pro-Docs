<template>
  <el-carousel v-if="advList.length > 0" class="sidebar-advs" height="90px" :interval="3000" indicator-position="outside">
    <el-carousel-item v-for="item in advList" :key="item.imageUrl">
      <img
        :alt="item.title"
        :src="`${item.imageUrl}`"
        @click="handleItemClick(item)"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const advList = ref<any[]>([])

const baseUrl = (import.meta as any).env.VITE_BASE_URL || '/json'

// 获取广告列表
function fetchAdvList() {
  axios
    .get(`${baseUrl}/advs.json?updateAt=${Date.now()}`)
    .then(({ data }) => {
      const {
        data: { list },
        code
      } = data
      if (code === 0) {
        advList.value = list
      }
    })
}

function handleItemClick(item) {
  window.open(item.link)
}

onMounted(() => {
  fetchAdvList()
})
</script>
