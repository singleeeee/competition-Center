<template>
  <uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @select="select" @progress="progress"
    @success="success" @fail="fail" />
  <button @tap="send">关注</button>
</template>
<script setup>
import { ref } from 'vue'
import { upLoadFile } from '@/api/user/upLoadFile'
import { followUser, unfollowUser, getUserFollowers, getUserFans } from '@/api/user/follow'
// api 测试
async function send() {
  const res = await getUserFans(10000)
  console.log(res)
}

// 选择文件
const imageValue = ref([])
// 获取上传状态
async function select(e) {
  const file = e.tempFiles[0].file
  const res = await upLoadFile(file)
  console.log('上传结果：', res.data.url)
}
// 获取上传进度
function progress(e) {
  console.log('上传进度：', e)
}

// 上传成功
function success(e) {
  console.log('上传成功')
}

// 上传失败
function fail(e) {
  console.log('上传失败：', e)
}
</script>
<style scoped></style>
