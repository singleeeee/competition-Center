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
        <scroll-view class="scroll-view" :scroll-x="true" style="width: 100%">
          <view
            v-for="(item, index) in comTypeList"
            :key="item.ID"
            :class="{ scrollViewItem: true, active: currentTab === index }"
            :data-id="index"
            @tap="tabTap"
            >{{ item.label }}</view
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
      <view v-if="comList.length > 0">
        <view v-for="(item, index) in comList" :key="index">
          <!-- 卡片 -->
          <uni-card
            :title="item.comTitle"
            :sub-title="item.comSubTitle"
            :thumbnail="item.comPicture"
          >
            <text>{{ item.comIntroduction }}</text>
          </uni-card>
        </view>
        <uni-load-more
          :status="comListStatus"
          :contentText="{
            contentrefresh: '比赛信息加载中...',
            contentnomore: '没有更多比赛信息了',
          }"
        />
      </view>
      <view v-else>
        <uni-load-more
          iconType="circle"
          :status="loadingStatus"
          :contentText="{ contentrefresh: ' ', contentnomore: '暂无比赛数据' }"
        />
      </view>
    </view>
  </view>
  <!-- 比赛列表 -->
  <uni-popup ref="comPopup" background-color="#fff">
    <picker-view :value="comValue" immediate-change @change="comChange" class="picker-view">
      <picker-view-column>
        <view class="item" v-for="(item, index) in comArray" :key="index">{{ item.label }}</view>
      </picker-view-column>
    </picker-view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
onLoad(async () => {
  await getComType()
  await getAllCom()
})
// 跳转到搜索页面
const navigateToSearch = () => {
  uni.navigateTo({
    url: '/pages/competition/searchPage/index',
  })
}
// 获取比赛种类
const getComType = async () => {
  comTypeList.value = []
  const res = await http({
    url: 'http://jk.singleeeee.top/api/manager/getSysDictionaryDetailListPublic',
    data: {
      page: 1,
      pageSize: 100,
      sysDictionaryID: 9,
    },
  })
  comTypeList.value.push({
    ID: 1,
    label: '全部比赛',
  })
  comArray.value.push({
    ID: 1,
    label: '全部比赛',
  })
  for (let i = 0; i < res.data.list.length; i++) {
    comTypeList.value.push(res.data.list[i])
    comArray.value.push(res.data.list[i])
  }
}
// 获取所有比赛
const getAllCom = async () => {
  const res = await http({
    url: '/app/com/getComInfoList',
    data: {
      sort: 'com_hot',
      order: 'descending',
    },
  })
  comList.value = []
  const resData = res.data.list
  // 判断是否还有下一页
  if (res.data.total <= currentComPage * comPageSize) {
    comListStatus.value = 'noMore'
  }
  for (let i = 0; i < resData.length; i++) {
    comList.value.push(resData[i])
  }
}
// 获取比赛列表分页器
let currentComPage = 1
const comPageSize = 5
// 比赛列表
const comList = ref([])
// 获取比赛列表
const getCompetitionList = async (comType: number) => {
  // 第一次请求清空，否则继续添加
  if (currentComPage === 1) {
    comList.value = []
  }
  const res = await http({
    url: '/app/com/getComInfoList',
    data: {
      comType: comType,
      page: currentComPage,
      pageSize: comPageSize,
      sort: 'com_hot',
      order: 'descending',
    },
  })
  const resData = res.data.list
  // 判断是否还有下一页
  if (res.data.total <= currentComPage * comPageSize) {
    comListStatus.value = 'noMore'
  }
  // 判断是否该类比赛暂无数据
  if (resData.length === 0) {
    loadingStatus.value = 'noMore'
    return
  }
  currentComPage++
  for (let i = 0; i < resData.length; i++) {
    comList.value.push(resData[i])
  }
}

// 当前比赛种类
const currentTab = ref(0)
// 比赛种类列表
const comTypeList = ref([
  {
    ID: 0,
    label: '暂无数据',
  },
])

// 加载状态
let loadingStatus = ref('loading')
// 切换比赛种类
const tabTap = (e) => {
  // 重置分页器
  currentComPage = 1
  currentTab.value = e.currentTarget.dataset.id
  const index = currentTab.value
  if (index !== 0) {
    getCompetitionList(comTypeList.value[index].value)
  } else {
    getAllCom()
  }
}
// 下拉状态 todo
let comListStatus = ref('more')

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

// 切换tab
const tagTap = (e) => {
  currentTag.value = e.currentTarget.dataset.id
}

// 下拉比赛列表
const comPopup = ref()
const comArray = ref([])
const comValue = ref([0])
const comSelectd = ref(comArray.value[0])
// 下拉比赛种类tab栏切换
const comChange = (e: any) => {
  const val = e.detail.value
  comSelectd.value = comArray.value[val[0]].label
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
          font-size: 30rpx;
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
