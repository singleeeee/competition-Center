<template>
  <view class="scroll">
    <button @tap="tap">刷新</button>
    <view>
      <uni-load-more iconType="circle" :status="status" iconSize="24" :contentText="loadingText" />
    </view>
  </view>
</template>
<script setup>
import { ref, reactive } from 'vue'
const status = ref('loading')
const loadingText = ref({
  contentdown: '展示更多内容',
  contentrefresh: '正在加载...',
  contentnomore: '已经到底了',
})
const tap = () => {
  if (status.value === 'loading') {
    status.value = 'more'
  } else {
    status.value = 'loading'
  }
}
</script>
<style scoped></style>
