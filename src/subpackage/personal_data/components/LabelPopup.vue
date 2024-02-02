<template>
  <view class="container">
    <view class="title">修改标签</view>
    <view class="tagShow">
      <view
        style="position: relative"
        v-for="(item, index) in tagList"
        :key="index"
        :data-id="index"
        @tap="deleteTag"
        v-show="tagList.length > 0"
      >
        <view class="tag">{{ item }}</view>
        <uni-icons class="clear" type="clear" color="#999" size="18" />
      </view>
      <view style="font-size: 28rpx; color: #666" v-show="tagList.length === 0"
        >你还没有添加标签</view
      >
    </view>
    <view class="inputBox">
      <view><input class="input" type="text" placeholder="请输入" v-model="value" /></view>
      <view><button class="btn" plain @tap="addTag">添加</button></view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useUserInfoStore } from '@/stores'
import { ref } from 'vue'

const userInfoStore = useUserInfoStore()
const label = userInfoStore.userInfo.userLabel
let tagList = ref<string[]>([])
if (label.includes('-')) {
  tagList = ref(label.split('-'))
} else {
  if (label !== '') {
    tagList.value.push(label)
  }
}

const value = ref('')
//删除
const deleteTag = (e) => {
  const id = e.currentTarget.dataset.id
  tagList.value.splice(id, 1)
  const str = tagList.value.join('-')
  userInfoStore.changeUserInfo('userLabel', str)
}
// 添加
const addTag = () => {
  // 不能为空
  if (value.value.trim() === '') {
    uni.showToast({
      title: '标签不能为空',
      icon: 'none',
    })
    return
  }
  // 三个标签
  if (tagList.value.length > 2) {
    uni.showToast({
      title: '最多使用三个标签',
    })
    return
  }
  // 六个字符以内
  if (value.value.length > 6) {
    uni.showToast({
      title: '不能超过六个字符',
      icon: 'none',
    })
  } else {
    tagList.value.push(value.value)
    const userLabel = tagList.value.join('-')
    userInfoStore.changeUserInfo('userLabel', userLabel)
    value.value = ''
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 40vh;
  width: 80vw;
  background-color: #fff;
  padding: 20rpx;
  .title {
    text-align: center;
    height: 60rpx;
    font-weight: 700;
    font-size: 36rpx;
    margin-bottom: 20rpx;
  }
  .tagShow {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 20vh;
    padding: 20rpx;
    background-color: #efefef;
    border-radius: 20rpx;

    .tag {
      padding: 10rpx 20rpx 10rpx 20rpx;
      background-color: #12a661;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx;
      margin-right: 40rpx;
    }
    .clear {
      position: absolute;
      top: -20rpx;
      right: 20rpx;
    }
  }
  .inputBox {
    height: 10vh;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    align-items: center;
    .input {
      width: 50vw;
      background-color: #efefef;
      border-radius: 10rpx;
      padding: 0 20rpx;
      font-size: 24rpx;
      height: 60rpx;
      border: 1rpx solid #ccc;
      overflow-x: scroll;
    }
    .btn {
      width: 120rpx;
      font-size: 26rpx;
      padding: 0;
      border: 0;
      background: linear-gradient(to right, #12a661, #12a111);
      color: #fff;
      border-radius: 40rpx;
      box-shadow: 0 1rpx 0 4rpx #efefef;
    }
  }
}
</style>
