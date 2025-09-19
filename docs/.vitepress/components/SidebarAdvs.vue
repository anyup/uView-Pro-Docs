<template>
  <el-carousel height="90px" :interval="3000" indicator-position="outside">
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
const advList = [
  {
    title: '精美浏览器插件',
    imageUrl:
      'https://ik.imagekit.io/anyup/uview-pro/advs/nbtab.png?updatedAt=1758250689316',
    link: 'https://nbtab.com/'
  },
  {
    title: '有题记小程序',
    imageUrl:
      'https://ik.imagekit.io/anyup/images/social/youti-item.png?updatedAt=1754376701993',
    link: 'https://mp.weixin.qq.com/s/bgkhC02WPlEHmGnCbSmDcg'
  },
  {
    title: '商务合作',
    imageUrl:
      'https://mmbiz.qpic.cn/mmbiz_png/XTwjYITHToBTNrZHaIylOQUkUIXmtjDm2iaZu2RvPGmdUNbe4LPNVOGBXQFrhCibov3HiayD9YYWst1xN3R5BibMiag/640',
    link: 'https://mp.weixin.qq.com/s/OcaoEfC2xqDHYtyyihVWaA'
  }
]

function handleItemClick(item) {
  window.open(item.link)
}
</script>

<style scoped></style>
