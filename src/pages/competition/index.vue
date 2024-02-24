<template>
  <view class="container">
    <view class="headBox">
      <view class="searchBox">
        <view class="search" @tap="navigateToSearch">
          <uni-icons style="vertical-align: middle" type="search" color="#888" size="20" />
          搜索</view
        >
      </view>
      <view class="scrollBox">
        <scroll-view class="scroll-view" :scroll-x="true" bindscroll="scroll" style="width: 100%">
          <view
            v-for="(item, index) in tabList"
            :key="index"
            :class="{ scrollViewItem: true, active: currentTab === index }"
            :data-id="index"
            @tap="tabTap"
            >{{ item.text }}</view
          >
        </scroll-view>
      </view>
      <view class="tagList">
        <view class="left">
          <view
            v-for="(item, index) in tagList"
            :key="index"
            :class="{ tag: true, active: currentTag === index }"
            :data-id="index"
            @tap="tagTap"
            >{{ item.text }}</view
          >
        </view>
        <view class="right">
          <view class="tag" @tap="comPopup.open('bottom')"
            >{{ comSelectd }}
            <uni-icons type="right" color="" size="12" />
          </view>
        </view>
      </view>
    </view>
    <!-- 卡片列表 -->
    <view class="itemList">
      <view v-for="(item, index) in comList" :key="index">
        <!-- 卡片 -->
        <uni-card :title="item.comTitle" :sub-title="item.comSubTitle" :thumbnail="item.comPicture">
          <text>{{ item.comIntroduction }}</text>
        </uni-card>
      </view>
    </view>
  </view>
  <!-- 比赛列表 -->
  <uni-popup ref="comPopup" background-color="#fff">
    <picker-view :value="comValue" immediate-change @change="comChange" class="picker-view">
      <picker-view-column>
        <view class="item" v-for="(item, index) in comArray" :key="index">{{ item }}</view>
      </picker-view-column>
    </picker-view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
onLoad(() => {
  getCompetitionList()
})
// 获取全部比赛列表
const currentComPage = 0
const comPageSize = 20
// 比赛列表
const comList = ref([])
const getCompetitionList = async () => {
  const res = await http({
    url: '/app/com/getComInfoList',
    data: {
      page: currentComPage,
      pageSize: comPageSize,
    },
  })
  const resData = res.data.list
  for (let i = 0; i < resData.length; i++) {
    comList.value.push(resData[i])
  }
}
const navigateToSearch = () => {
  uni.navigateTo({
    url: '/pages/competition/searchPage/index',
  })
}
const currentTab = ref(0)

// tab数组
const tabList = [
  {
    text: '算法比赛',
  },
  {
    text: '开发比赛',
  },
  {
    text: '创新创业比赛',
  },
  {
    text: '设计比赛',
  },
  {
    text: '文学类比赛',
  },
  {
    text: '学科竞赛',
  },
  {
    text: '体育竞赛',
  },
]

// 切换tab
const tabTap = (e) => {
  currentTab.value = e.currentTarget.dataset.id
}

// tag 数组
const tagList = [
  {
    text: '近期',
  },
  {
    text: '往期',
  },
  {
    text: '热门',
  },
]
// 当前tag
const currentTag = ref(0)

// 切换tag
// 切换tab
const tagTap = (e) => {
  currentTag.value = e.currentTarget.dataset.id
}

// 比赛列表
const comPopup = ref()
const comArray = [
  '全部比赛',
  '算法比赛',
  '开发比赛',
  '创新创业比赛',
  '设计比赛',
  '文学类比赛',
  '学科竞赛',
  '体育竞赛',
]
const comValue = ref([0])
const comSelectd = ref(comArray[0])

const comChange = (e: any) => {
  const val = e.detail.value
  comSelectd.value = comArray[val[0]]
}
</script>

<style lang="scss" scoped>
.container {
  .headBox {
    height: 240rpx;
    width: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0rpx 10rpx 1rpx #eee;
    .searchBox {
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .search {
        text-align: center;
        width: 80%;
        background-color: #ddd;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 30rpx;
        font-size: 30rpx;
        color: #888;
      }
    }
    .scrollBox {
      height: 60rpx;
      padding-bottom: 10rpx;
      .scroll-view {
        height: 60rpx;
        white-space: nowrap;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          color: transparent;
        }
        .scrollViewItem {
          display: inline-block;
          height: 56rpx;
          width: 140rpx;
          margin: 0 20rpx;
          text-align: center;
          line-height: 60rpx;
          font-size: 26rpx;
          color: #ccc;
        }
        .active {
          color: #000;
          font-weight: 700;
          border-bottom: 4rpx solid #12a661;
        }
      }
      &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
        color: transparent;
      }
    }
    .tagList {
      display: flex;
      justify-content: space-between;
      height: 80rpx;
      background-color: #fff;
      align-items: center;
      .left {
        display: flex;
      }
      .tag {
        background-color: #eee;
        color: #aaa;
        font-size: 26rpx;
        margin: 0 20rpx;
        padding: 10rpx 20rpx;
      }
      .active {
        // background: linear-gradient(to top, rgb(44, 141, 192), rgb(90, 196, 238));
        background: linear-gradient(to top, rgb(6, 93, 160), rgb(88, 162, 228));
        color: #fff;
      }
    }
  }
  .itemList {
    margin-top: 250rpx;
  }
}
.picker-view {
  width: 750rpx;
  height: 600rpx;
  margin-top: 20rpx;
  .item {
    line-height: 60rpx;
    text-align: center;
  }
}
</style>
