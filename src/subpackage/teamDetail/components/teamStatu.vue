<template>
  <!-- 待报名 -->
  <view
    v-if="teamStatus === 1"
    class="ml-2 rounded-xl bg-blue-400 px-2 py-1 text-sm font-bold tracking-widest text-white"
    >待报名</view
  >
  <!-- 待审核 -->
  <view
    v-else-if="teamStatus === 2"
    class="ml-2 rounded-xl bg-yellow-400 px-2 py-1 text-sm font-bold tracking-widest"
    >待审核</view
  >
  <!-- 报名成功 -->
  <view
    v-else-if="teamStatus === 3"
    class="ml-2 rounded-xl bg-green-400 px-2 py-1 text-sm font-bold tracking-widest text-white"
    >报名成功</view
  >
  <!-- 报名失败 -->
  <view
    v-else-if="teamStatus === 4"
    class="ml-2 rounded-xl bg-red-400 px-2 py-1 text-sm font-bold tracking-widest"
    >报名失败</view
  >
</template>
<script setup>
import { ref } from 'vue'
const content = ref('')
const props = defineProps({
  teamStatus: {
    type: Number,
    default: 1,
  },
})
console.log(content.value)
switch (props.teamStatus) {
  case 1:
    content.value = '待报名'
    break
  case 2:
    content.value = '待审核'
    break
  case 3:
    content.value = '报名成功'
    break
  case 4:
    content.value = '报名失败'
    break
  default:
    break
}
</script>
<style scoped></style>
