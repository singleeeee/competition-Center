<template>
  <view class="container">
    <view class="UserList">
      <view class="title">
        <view>我的关注(106人)</view>
        <view class="sort">排序</view>
      </view>
      <view class="group">
        <view
          v-for="(item, index) in groupList"
          :key="index"
          :data-id="index"
          @tap="changeGroup"
          :class="{ button: true, active: index === currentGroup }"
          >{{ item }}</view
        >
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in fansList" :key="index">
          <nameTitle
            :author="item.author"
            :avatar-url="item.avatar"
            :icon="item.icon"
            :date="item.others"
          ></nameTitle>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import nameTitle from '@/components/nameTitle.vue'
// 当前分组
const currentGroup = ref(0)
const groupList = ref(['全部', '挚友', '家人'])

const changeGroup = (e) => {
  console.log(e)

  currentGroup.value = e.currentTarget.dataset.id
}

const fansList = ref([
  {
    author: 'Single',
    avatar: 'http://tmp/wpinKs1JejQv9558093d8ac2138389013e440bfe808e.jpeg',
    icon: 'more-filled',
    others: '帅哥',
  },
  {
    author: 'Yjddb',
    avatar:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
    icon: 'more-filled',
    others: '大金鱼',
  },
  {
    author: '*',
    avatar:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
    icon: 'more-filled',
    others: '学妹',
  },
])
</script>

<style lang="scss" scoped>
.container {
  margin: 0 20rpx;
  .UserList {
    .title {
      display: flex;
      justify-content: space-between;
      color: #aaa;
      font-size: 26rpx;
      margin: 20rpx 0;
      font-family: '楷体';
      font-weight: 700;
    }
    .group {
      display: flex;
      flex-wrap: wrap;
      .button {
        background-color: #eee;
        font-size: 22rpx;
        padding: 12rpx 18rpx;
        margin-right: 30rpx;
        color: #aaa;
      }
      .active {
        color: #000;
      }
    }
  }
}
</style>
