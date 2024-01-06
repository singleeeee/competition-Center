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
</template>

<script lang="ts" setup>
import { useMemberStore } from '@/stores'

const memberStore = useMemberStore()
</script>

<style scoped></style>
