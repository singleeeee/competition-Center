<template>
  <button
    @tap="
      memberStore.setProfile({
        nickname: '用户33033',
      })
    "
  >
    保存用户信息
  </button>
  <button @tap="memberStore.clearProfile()">清理用户信息</button>
  <button @tap="getData">请求测试</button>
</template>

<script lang="ts" setup>
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'
const memberStore = useMemberStore()
// 测试请求
const getData = async () => {
  const res = await http<string[]>({
    method: 'GET',
    url: '/home/banner',
    header: {},
  })
  console.log('请求成功！', res)
}
</script>

<style scoped></style>
