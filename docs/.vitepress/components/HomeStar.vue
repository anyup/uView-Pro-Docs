<script setup lang="ts"></script>

<template>
  <p class="home-star">
    <a href="https://github.com/anyup/uview-pro">
      <img
        alt="GitHub Repo stars"
        src="https://img.shields.io/github/stars/anyup/uview-pro?logo=github&color=%234d80f0&link=https%3A%2F%2Fgithub.com%2Fanyup%2Fuview-pro&style=flat-square"
      />
    </a>

    <a href="https://www.npmjs.com/package/uview-pro">
      <img
        alt="npm"
        src="https://img.shields.io/npm/dm/uview-pro?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fuview-pro&style=flat-square"
      />
    </a>

    <a href="https://www.npmjs.com/package/uview-pro">
      <img
        alt="npm"
        src="https://img.shields.io/npm/v/uview-pro?logo=npm&color=%234d80f0&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fuview-pro&style=flat-square"
      />
    </a>
  </p>
</template>

<style scoped>
.home-star {
  display: flex;
  align-items: center;
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
@media (min-width: 640px) {
  .home-star {
    justify-content: center;
  }
}

@media (min-width: 960px) {
  .home-star {
    justify-content: start;
  }
}
</style>
