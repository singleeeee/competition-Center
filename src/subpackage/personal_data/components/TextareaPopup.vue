<template>
  <view class="container">
    <view class="title">请输入简介</view>
    <textarea
      class="input"
      placeholder="请输入简介"
      :value="props.introduction"
      @blur="blur"
      @input="$emit('update:introduction', $event.target?.value)"
    />
    <view class="btnBox">
      <button class="btn cancel" @tap="cancel" plain>取消</button>
      <button class="btn" @tap="confirm" plain>确认</button>
    </view>
  </view>
</template>
<script lang="ts" setup>
const props = defineProps(['introduction'])
const emit = defineEmits(['introCancel', 'introConfirm', 'update:introduction'])
const confirm = () => {
  emit('introConfirm')
}
const cancel = () => {
  emit('introCancel')
}
// 输入框失焦事件 ->解决自带名字输入无法同步更新的问题
const blur = (e: any) => {
  emit('update:introduction', e.detail.value)
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 520rpx;
  background-color: #fff;
  .title {
    width: 60%;
    font-size: 32rpx;
    font-weight: 600;
    text-align: center;
    margin-top: 40rpx;
  }
  .input {
    width: 80%;
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
    margin: 40rpx 0 20rpx 0;
    font-size: 25rpx;
    background-color: #ccc;
  }
  .btnBox {
    height: 150rpx;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .btn {
      width: 45%;
      font-size: 30rpx;
      border-radius: 40rpx;
      border: 2rpx solid #ccc;
    }
    .cancel {
      color: #fff;
      background: linear-gradient(45deg, #010101, #211f1f, #323030, #4a4646, #5b5959);
    }
  }
}
</style>
