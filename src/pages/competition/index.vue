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
            @tap="comTypeChange"
            >{{ item.label }}</view
          >
        </scroll-view>
      </view>
      <view class="tagList">
        <view class="left">
          <view
            v-for="(item, index) in comStatusList"
            :key="item.ID"
            :class="{ tag: true, active: currentTag === index }"
            :data-id="index"
            @tap="comStatusChange"
            >{{ item.label }}</view
          >
        </view>
        <view class="right">
          <view class="tag" @tap="comPopup.open('bottom')"
            >{{ comSelected }}
            <uni-icons type="right" color="" size="12" />
          </view>
        </view>
      </view>
    </view>
    <!-- 卡片列表 -->
    <view class="itemList">
      <view v-if="comList.length > 0">
        <!-- 比赛列表 -->
        <view v-for="(item, index) in comList" :key="index" @tap="navigateToComDetail(item.ID)">
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
        <view class="item" v-for="(item, index) in comSelectArray" :key="index">{{
          item.label
        }}</view>
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
  await getSelectCom()
  await getComStatus()
  await getCompetitionList()
})
// 跳转到比赛详情页
const navigateToComDetail = (comID: string) => {
  console.log(comID)
  uni.navigateTo({
    url: '/subpackage/comDetail/index?comID=' + comID,
  })
}
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
  for (let i = 0; i < res.data.list.length; i++) {
    comTypeList.value.push(res.data.list[i])
  }
}
// 获取比赛进行状态
const getComStatus = async () => {
  comStatusList.value = []
  const res = await http({
    url: 'http://jk.singleeeee.top/api/manager/getSysDictionaryDetailListPublic',
    data: {
      page: 1,
      pageSize: 100,
      sysDictionaryID: 12,
    },
  })
  for (let i = 0; i < res.data.list.length; i++) {
    comStatusList.value.push(res.data.list[i])
  }
  console.log(comStatusList.value, '比赛进行状态')
}
// 获取比赛列表分页器
let currentComPage = 1
const comPageSize = 5
// 比赛列表
const comList = ref([])
// 0 表示全部比赛
let currentComType = 0,
  currentComModel = 0,
  currentComStatus = 0
// 比赛列表是否为空加载状态
let loadingStatus = ref('loading')
// 获取比赛列表
const getCompetitionList = async () => {
  if (currentComPage === 1) {
    comList.value = []
  }
  const res = await http({
    url: '/app/com/getComInfoList',
    data: {
      comType: currentComType, // 筛选的比赛类别
      comModel: currentComModel, // 筛选的比赛等级
      comStatus: currentComStatus, // 筛选的比赛状态
      page: currentComPage,
      pageSize: comPageSize,
      sort: 'com_hot',
      order: 'descending',
    },
  })
  // 更新比赛总数
  const resData = res.data.list
  // 判断是否还有下一页
  if (res.data.total <= currentComPage * comPageSize) {
    comListStatus.value = 'noMore'
  }
  // 判断是否比赛列表为空
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
// 切换比赛种类
const comTypeChange = (e) => {
  // 重置分页器
  currentComPage = 1
  currentTab.value = e.currentTarget.dataset.id
  currentComType = comTypeList.value[currentTab.value].value
  const index = currentTab.value
  getCompetitionList(comTypeList.value[index].value)
}
// 比赛列表下拉状态
let comListStatus = ref('more')
//  比赛进行状态数组
const comStatusList = ref([])
// 当前比赛状态tag
const currentTag = ref(0)
// 切换比赛状态
const comStatusChange = (e) => {
  currentComPage = 1
  currentTag.value = e.currentTarget.dataset.id
  currentComStatus = comStatusList.value[currentTag.value].value
  getCompetitionList()
}
// 下拉比赛列表 todo
const comPopup = ref()
const comSelectArray = ref([
  {
    ID: 1,
    label: '比赛等级',
    value: 0,
  },
])
// 当前分类所有比赛
let currentComList = ref([])
// 当前的比赛等级
let currentComRating = ref(0)
const comValue = ref([0])
const comSelected = ref(comSelectArray.value[0].label)
// 获取下拉比赛列表
const getSelectCom = async () => {
  comSelectArray.value = []
  const res = await http({
    url: 'http://jk.singleeeee.top/api/manager/getSysDictionaryDetailListPublic',
    data: {
      page: 1,
      pageSize: 100,
      sysDictionaryID: 8,
    },
  })
  for (let i = 0; i < res.data.list.length; i++) {
    comSelectArray.value.push(res.data.list[i])
  }
}
// 下拉比赛种类tab栏切换
const comChange = (e: any) => {
  currentComPage = 1
  const index = e.detail.value
  comSelected.value = comSelectArray.value[index[0]].label
  // 修改当前的比赛等级
  currentComModel = comSelectArray.value[index[0]].value
  getCompetitionList()
}
</script>

<style lang="scss" scoped>
.container {
  .headBox {
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
      margin: 10rpx 0;
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
      height: 100rpx;
      background-color: #fff;
      align-items: center;
      .left {
        display: flex;
        flex: 1;
        margin-right: 120rpx;
        overflow-x: scroll;
      }

      .tag {
        text-align: center;
        min-width: 120rpx;
        background-color: #eee;
        color: #aaa;
        font-size: 26rpx;
        margin: 0 20rpx;
        padding: 10rpx 20rpx;
        border-radius: 30rpx;
      }
      .active {
        // background: linear-gradient(to top, rgb(44, 141, 192), rgb(90, 196, 238));
        background: linear-gradient(to right bottom, #7bd686, #4c9872);
        color: #fff;
        border-radius: 30rpx;
      }
    }
  }
  .itemList {
    margin-top: 320rpx;
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
