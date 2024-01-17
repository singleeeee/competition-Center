<template>
  <view class="container">
    <view class="tabBar">
      <view
        class="items"
        v-for="(items, index) in tabList"
        :key="items.id"
        @click="switchTab"
        :data-id="index"
      >
        <image
          class="img"
          :src="items.selected ? items.selectedIconPath : items.iconPath"
          mode="scaleToFill"
        />
        <text :class="{ active: items.selected, unactive: items.selected }">{{ items.text }}</text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tabList = ref([
  {
    id: 1,
    selected: true,
    iconPath: '../static/tab-images/find-unactive.png',
    selectedIconPath: '../static/tab-images/find-active.png',
    pagePath: '/pages/find/index',
    text: '发现',
    badageNum: '',
  },
  {
    id: 2,
    selected: false,
    iconPath: '../static/tab-images/competition-unactive.png',
    selectedIconPath: '../static/tab-images/competition-active.png',
    pagePath: '/pages/competition/index',
    text: '竞赛',
    badageNum: '',
  },
  {
    id: 3,
    selected: false,
    iconPath: '../static/tab-images/community-unactive.png',
    pagePath: '/pages/community/index',
    selectedIconPath: '../static/tab-images/community-active.png',
    text: '社区',
    badageNum: '',
  },
  {
    id: 4,
    selected: false,
    iconPath: '../static/tab-images/mine-unactive.png',
    selectedIconPath: '../static/tab-images/mine-active.png',
    pagePath: '/pages/mine/index',
    text: '我的',
    badageNum: '',
  },
])
// 跳转功能
function switchTab(e) {
  const activePage = e.currentTarget.dataset.id
  tabList.value.forEach((items) => {
    items.selected = false
  })
  tabList.value[activePage].selected = true
  uni.switchTab({
    url: tabList.value[activePage].pagePath,
  })
}
</script>
<style scoped lang="scss">
.container {
  position: fixed;
  bottom: 0;
  height: 120rpx;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
  .tabBar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 120rpx;
    .items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 24%;
      height: 120rpx;

      .img {
        width: 70rpx;
        height: 70rpx;
        border-right: 1px;
      }
      text {
        font-size: 22rpx;
      }
    }
  }
}
.active {
  color: #12a66a;
}
.unactive {
  columns: #333;
}
</style>
