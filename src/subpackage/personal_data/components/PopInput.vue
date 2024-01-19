<template>
  <view class="container">
    <view class="title">修改昵称</view>
    <view class="input">
      <input class="inputStyle" type="text" placeholder="输入昵称" :maxlength="24" />
    </view>
    <view class="bottom">
      <button style="background-color: #2f2f2f; color: #fff" @tap="cancel">取消</button>
      <button style="background-color: #12a66a; color: #fff" @tap="confirm">确认</button>
    </view>
  </view>
</template>
<script setup lang="ts">
const emit = defineEmits(['cancel', 'confirm'])
const cancel = () => {
  emit('cancel')
}
const confirm = () => {
  emit('confirm')
}
</script>
<style scoped lang="scss">
.container {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  .title {
    margin-top: 50rpx;
    margin-bottom: 20rpx;
    font-size: 36rpx;
    font-weight: 700;
  }
  .input {
    margin: 20rpx 0;
    box-sizing: border-box;
    .inputStyle {
      height: 70rpx;
      line-height: 70rpx;
      width: 65vw;
      border-radius: 20rpx;
      padding: 0 20rpx;
      background-color: #ddd;
      font-size: 24rpx;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    button {
      width: 50vw;
      height: 70rpx;
      line-height: 70rpx;
      margin: 20rpx 30rpx;
      margin-bottom: 40rpx;
      border-radius: 40rpx;
      font-size: 30rpx;
    }
  }
}
</style>
