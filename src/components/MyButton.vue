<template>
  <view class="container">
    <button :height="height" :style="{ backgroundColor: `${backgroundcolor}` }">
      {{ content }}
    </button>
  </view>
</template>
<script lang="ts" setup>
defineProps(['content', 'height', 'backgroundcolor'])
</script>
<style scoped lang="scss">
.container {
  height: 80rpx;
  width: 55vw;
  margin: 50rpx auto;

  button {
    // background-color: #c10505;
    height: 100%;
    line-height: 80rpx;
    border-radius: 50rpx;
    color: #fff;
    font-weight: 400;
    font-size: 34rpx;
    &:active {
      transform: scale(1.01);
      color: #eee;
    }
  }
}
</style>
