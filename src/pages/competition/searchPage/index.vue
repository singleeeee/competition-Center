<template>
  <view class="searchPage">
    <uni-search-bar
      v-model="inputValue"
      style="width: 100%"
      focus
      cancelButton="none"
      @confirm="confirm"
      @input="handleChange"
      clear
    />
  </view>
  <view v-if="!isResultShow" class="container">
    {
    <view class="searchRecord">
      <view class="title">历史记录</view>
      <view class="icon">
        <uni-icons type="trash" color="#ccc" size="20" @tap="deleteRecord" />
      </view>
    </view>
    <view class="content">
      <template v-if="recordList.length > 0">
        <view v-for="(items, index) in recordList" :key="index" class="tagBox">
          <view class="tag">{{ items }}</view>
        </view>
      </template>
      <template v-else>
        <view class="tag">暂无记录</view>
      </template>
    </view>
    <view class="hotSearch">
      <view class="title"
        >热门搜索
        <uni-icons type="fire-filled" color="red" size="22" />
      </view>
      <view class="list">
        <view
          v-for="(item, index) in rankingList"
          :key="index"
          :class="{ item: true, front: index < 3 }"
        >
          <view class="left">
            <view>
              <image class="img" :src="item.img" mode="scaleToFill" />
            </view>
            <view class="text">{{ item.text }}</view>
          </view>
          <view class="right">热度{{ item.hotNum }}万 </view>
        </view>
      </view>
    </view>
    }
  </view>
  <view v-else class="searchResult">
    <view class="topTab">
      <view :class="{ item: true, active: currentPage === 0 }" @tap="handleTabChange(0)">全部</view>
      <view :class="{ item: true, active: currentPage === 1 }" @tap="handleTabChange(1)">比赛</view>
      <view :class="{ item: true, active: currentPage === 2 }" @tap="handleTabChange(2)">帖子</view>
      <view :class="{ item: true, active: currentPage === 3 }" @tap="handleTabChange(3)">通告</view>
      <view :class="{ item: true, active: currentPage === 4 }" @tap="handleTabChange(4)">用户</view>
    </view>
    <swiper class="swiper" @change="swiperChange" :current="currentPage">
      <swiper-item v-for="(item, index) in classList" :key="index">
        <view v-if="resultList.length > 0">
          <template v-if="index < 4">
            <view
              class="resultItem"
              v-for="(item, index) in resultList"
              :key="index"
              @tap="toResult(item.disID)"
            >
              <uni-icons type="color" color="" size="12" />
              <view class="text">{{ item.disTitle }}</view>
            </view>
          </template>
          <template v-else>
            <view
              class="resultItem"
              v-for="(item, index) in resultList"
              :key="index"
              @tap="toPersonPage(item.disID)"
            >
              <view class="text">{{ item.disTitle }}</view>
            </view>
          </template>
        </view>
        <!-- 环形加载 -->
        <uni-load-more
          v-else
          iconType="circle"
          :status="loadingStatus"
          :contentText="loadingText"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { useSearchRecordStore } from '@/stores/modules/searchRecord'
import { http } from '@/utils/http'
import { myDebounce } from '@/utils/myDebounce'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
// 类型列表
const classList = ref(['全部', '比赛', '帖子', '通告', '用户'])
//tab栏切换
let currentPage = ref(0)
// 加载状态
const loadingStatus = ref('noMore')
// 状态说明
const loadingText = ref({
  contentdown: '上拉显示更多',
  contentrefresh: '正在加载...',
  contentnomore: '暂无数据',
})
const swiperChange = async (e) => {
  if (inputValue.value.trim() !== '') {
    let res
    switch (e.detail.current) {
      case 0:
        resultList.value = []
        getData()
        break
      case 1:
        console.log('比赛')
        resultList.value = []
        loadingStatus.value = 'loading'
        res = await http({
          url: '/app/dis/getDisInfoList',
          data: {
            disTitle: inputValue.value,
            disModel: 3,
            disStatus: 2,
            page: 1,
            pageSize: 10,
          },
        })
        for (let i = 0; i < res.data.list.length; i++) {
          const obj = {
            disID: res.data.list[i].ID,
            disTitle: res.data.list[i].disTitle,
          }
          resultList.value.push(obj)
        }
        loadingStatus.value = 'noMore'
        break
      case 2:
        console.log('帖子')
        resultList.value = []
        loadingStatus.value = 'loading'
        res = await http({
          url: '/app/dis/getDisInfoList',
          data: {
            disTitle: inputValue.value,
            disModel: 1,
            disStatus: 2,
            page: 1,
            pageSize: 10,
          },
        })
        for (let i = 0; i < res.data.list.length; i++) {
          const obj = {
            disID: res.data.list[i].ID,
            disTitle: res.data.list[i].disTitle,
          }
          resultList.value.push(obj)
        }
        loadingStatus.value = 'noMore'
        break
      case 3:
        console.log('通告')
        resultList.value = []
        loadingStatus.value = 'loading'
        res = await http({
          url: '/app/dis/getDisInfoList',
          data: {
            disTitle: inputValue.value,
            disModel: 2,
            disStatus: 2,
            page: 1,
            pageSize: 10,
          },
        })
        for (let i = 0; i < res.data.list.length; i++) {
          const obj = {
            disID: res.data.list[i].ID,
            disTitle: res.data.list[i].disTitle,
          }
          resultList.value.push(obj)
        }
        loadingStatus.value = 'noMore'
        break
      case 4:
        resultList.value = []
        console.log('用户')
        res = await http({
          url: '/app/user/getUserInfoList',
          data: {
            userNickname: inputValue.value,
            page: 1,
            pageSize: 10,
          },
        })
        for (let i = 0; i < res.data.list.length; i++) {
          const obj = {
            disID: res.data.list[i].ID,
            disTitle: res.data.list[i].userNickname,
          }
          resultList.value.push(obj)
        }
        break
    }
  } else {
    resultList.value = []
  }
  currentPage.value = e.detail.current
}
// 获取数据
const getData = myDebounce(async () => {
  resultList.value = []
  loadingStatus.value = 'loading'
  // 帖子数据
  let res = await http({
    url: '/app/dis/getDisInfoList',
    data: {
      disTitle: inputValue.value,
      disStatus: 2,
      page: 1,
      pageSize: 10,
    },
  })
  for (let i = 0; i < res.data.list.length; i++) {
    const obj = {
      disID: res.data.list[i].ID,
      disTitle: res.data.list[i].disTitle,
    }
    resultList.value.push(obj)
  }
  // 好友数据
  res = await http({
    url: '/app/user/getUserInfoList',
    data: {
      userNickname: inputValue.value,
      page: 1,
      pageSize: 10,
    },
  })
  for (let i = 0; i < res.data.list.length; i++) {
    const obj = {
      disID: res.data.list[i].ID,
      disTitle: res.data.list[i].userNickname,
    }
    resultList.value.push(obj)
  }
  loadingStatus.value = 'noMore'
})

// 跳转到搜索结果
const toResult = (id: number) => {
  searchRecord.addRecord(inputValue.value)
  uni.navigateTo({
    url: '/subpackage/postDetail/index?disId=' + id,
  })
}
// 跳转到用户主页
const toPersonPage = (id: number) => {
  searchRecord.addRecord(inputValue.value)
  uni.navigateTo({
    url: '/pages/mine/personPage/index?userID=' + id,
  })
}
// tab栏改变
const handleTabChange = (e) => {
  currentPage.value = e
}
// 搜素结果引导
const resultList = ref([])
// 是否显示结果引导
const isResultShow = ref(false)
// 输入框内容
const inputValue = ref('')
// 防抖
let timer: number = 1
// 实时监听输入
const handleChange = (index: number) => {
  if (timer) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (inputValue.value.trim() !== '') {
        getData()
        isResultShow.value = true
      } else if (inputValue.value.trim() === '') isResultShow.value = false
    }, 200)
  }
}
// 失焦事件
const confirm = () => {
  if (inputValue.value.trim() !== '') {
    searchRecord.addRecord(inputValue.value)
    inputValue.value = ''
    isResultShow.value = false
  }
}
// 获取搜索历史仓库
const searchRecord = useSearchRecordStore()
const { searchList } = storeToRefs(searchRecord)
const recordList = searchList

// 清空历史记录
const deleteRecord = () => {
  searchRecord.clearRecord()
}
// 排行榜
const rankingList = ref([
  {
    img: '../../../static/serachPage/diyiming.png',
    text: '蓝桥杯国奖需要多少分以上',
    hotNum: 134.2,
  },
  {
    img: '../../../static/serachPage/dierming.png',
    text: '互联网+金牌加多少学分',
    hotNum: 112,
  },
  {
    img: '../../../static/serachPage/disanming.png',
    text: '挑战杯真的是PPT大赛吗？',
    hotNum: 110.1,
  },
  {
    img: '../../../static/serachPage/icon-test.png',
    text: '这周的蓝桥杯双周赛什么时候开始？',
    hotNum: 78,
  },
  {
    img: '../../../static/serachPage/icon-test3.png',
    text: '软通杯',
    hotNum: 65.6,
  },
  {
    img: '../../../static/serachPage/icon-test1.png',
    text: '蓝桥杯国奖经验',
    hotNum: 56.7,
  },
  {
    img: '../../../static/serachPage/icon-test4.png',
    text: '计算机设计大赛',
    hotNum: 34,
  },
  {
    img: '../../../static/serachPage/icon-test2.png',
    text: '代金宇是谁',
    hotNum: 14,
  },
  {
    img: '../../../static/serachPage/icon-test5.png',
    text: '彭肠是谁',
    hotNum: 10,
  },
])
</script>

<style lang="scss" scoped>
.searchPage {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99999;
  height: 150rpx;
  display: flex;
  align-items: center;
  background-color: #12a66a;
}

.searchRecord {
  box-sizing: border-box;
  width: 100%;
  height: 80rpx;
  position: absolute;
  top: 140rpx;
  z-index: 9999;
  border-radius: 30rpx 0rpx 0 30rpx;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  .title {
    font-size: 32rpx;
    font-weight: 600;
  }
}
.content {
  box-sizing: border-box;
  margin-top: 160rpx;
  width: 100%;
  height: auto;
  padding: 10rpx 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: scroll;
  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40rpx;
    border-radius: 24rpx;
    background-color: #f8f8f8;
    color: #666;
    font-size: 20rpx;
    margin: 10rpx 20rpx 0 0;
    padding: 6rpx 12rpx;
  }
}
.hotSearch {
  border-top: 1rpx solid #eee;
  margin: 20rpx;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10rpx;
    color: #f58e46;
    font-weight: 700;
    font-size: 32rpx;
    margin-top: 20rpx;
    padding-left: 20rpx;
    text-align: center;
  }
  .list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      justify-content: space-between;
      width: 100%;
      height: 100rpx;
      margin: 10rpx;
      border-radius: 10rpx;
      padding: 10rpx;
      background-color: #fff;
      .img {
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
        margin: 0 10rpx;
      }
      .text {
        font-size: 28rpx;
        padding-left: 10rpx;
      }
      .left {
        display: flex;
        align-items: center;
      }
      .right {
        font-size: 26rpx;
        color: #aaa;
      }
    }
    .front {
      background: linear-gradient(to right, #fef9f5, #fff);
    }
  }
}
.searchResult {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 150rpx;
  .resultItem {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    margin: 10rpx;
    padding: 20rpx 10rpx;
    border-bottom: 1rpx solid #eee;
    .text {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #666;
    }
    &:active {
      background-color: #ddd;
    }
  }
  .topTab {
    height: 5vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    .item {
      height: 120rpx;
      margin: 0 20rpx;
      width: 18%;
      font-size: 24rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
    }
  }
  .swiper {
    height: 80vh;
  }
  .active {
    transform: scale(1.01);
    color: #000 !important;
    transition: all 0.2s ease;
    font-weight: 700;
    border-bottom: 4rpx solid #12a661;
  }
}
</style>
