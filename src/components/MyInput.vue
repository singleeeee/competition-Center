<template>
  <view class="container">
    <view class="content">
      <textarea
        class="text"
        cols="30"
        rows="10"
        placeholder="请输入内容"
        :value="textarea"
        autofocus
        focus
        :cursor-spacing="225"
        @input="emit('update:textarea', ($event.target as any).value)"
      />
    </view>
    <view class="img">
      <view
        class="imageItem"
        v-for="(item, index) in imgList"
        :key="index"
        :data-id="index"
        @tap="deleteImg"
      >
        <image class="image" :src="item" mode="scaleToFill" />
        <uni-icons class="clear" type="clear" color="" size="20" />
      </view>
    </view>
    <view class="function">
      <view><uni-icons type="image" color="#888" size="26" @tap="chooseImg" /></view>
      <view>
        <button class="sendBtn" plain @tap="send">发送</button>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
defineProps(['textarea'])
const emit = defineEmits(['update:textarea', 'send'])
const imgList = ref<string[]>([])
const chooseImg = () => {
  uni.chooseImage({
    count: 1,
    success: (success) => {
      if (imgList.value.length < 3) {
        uni.showLoading({
          mask: true,
        })
        const fileurl = success.tempFilePaths[0]
        uni.uploadFile({
          url: 'http://47.113.177.192:8082/app/upload/file',
          filePath: fileurl,
          name: 'file',
          success: (success) => {
            const {
              data: { url },
            } = JSON.parse(success.data)
            imgList.value.push(url)
            uni.hideLoading()
          },
        })
      } else {
        uni.showToast({
          title: '不能超过三张图片',
          icon: 'none',
          mask: true,
        })
      }
    },
  })
}
// 删除照片
const deleteImg = (e: any) => {
  const index = e.currentTarget.dataset.id
  imgList.value.splice(index, 1)
}

// 发送
const send = () => {
  setTimeout(() => {
    imgList.value = []
  }, 100)
  emit('send', imgList.value)
}
</script>
<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 20rpx;
  height: 450rpx;
  background-color: #fff;
  .content {
    height: 200rpx;
    background-color: #eee;
    border-radius: 10rpx;
  }
  .img {
    display: flex;
    align-items: center;
    height: 150rpx;
    .imageItem {
      position: relative;
      width: 120rpx;
      height: 120rpx;
      background-color: pink;
      margin: 0 20rpx;
      .image {
        height: 120rpx;
        width: 120rpx;
      }
      .clear {
        position: absolute;
        top: -16rpx;
        right: -16rpx;
        z-index: 99;
      }
    }
  }
  .function {
    padding: 0 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    .sendBtn {
      border: 0;
      width: 200rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      background-color: #12a66a;
      box-shadow: 0rpx 1rpx 12rpx 4rpx #efefef;
      color: #eee;
      border-radius: 30rpx;
    }
  }
  .text {
    padding: 10rpx;
    font-size: 28rpx;
  }
}
</style>
