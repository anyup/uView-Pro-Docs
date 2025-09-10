<script setup lang="ts">
import { type PropType } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'danger' | ''>,
    default: ''
  }

})

</script>

<template>
  <el-tag v-if="text" text style="vertical-align: middle;margin-left:8px;" size="small" effect="plain" :type="type">{{ text }}</el-tag>
</template>
