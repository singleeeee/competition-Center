<template>
  <div class="postDetail">帖子详情页面</div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const params = ref('')
onLoad((options) => {
  const { disID } = options
  console.log(disID)
})
</script>

<style lang="scss" scoped></style>
