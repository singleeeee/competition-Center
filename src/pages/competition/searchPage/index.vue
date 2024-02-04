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
  <view class="searchRecord">
    <view class="title">历史记录</view>
    <view class="icon">
      <uni-icons type="trash" color="#ccc" size="20" @tap="deleteRecord" />
    </view>
  </view>
  <view class="content">
    <view v-for="(items, index) in recordList" :key="index" class="tagBox">
      <view class="tag">{{ items }}</view>
    </view>
  </view>
  <view class="hotSearch">
    <view class="title"
      >热门搜索
      <uni-icons type="fire-filled" color="red" size="22" />
    </view>
    <view class="list">
      <view
        v-for="(item, index) in rangkingList"
        :key="index"
        :class="{ item: true, front: index < 3 }"
      >
        <view class="left">
          <view>
            <image class="img" :src="item.img" mode="scaleToFill" />
          </view>
          <view class="text">{{ item.text }}</view>
        </view>
        <view class="right"> 热度{{ item.hotNum }}万 </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useSearchRecordStore } from '@/stores/modules/searchRecord'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
// 输入框内容
const inputValue = ref('')

// 防抖
let timer: number = 1
// 实时监听输入
const handleChange = (e) => {
  if (timer) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(e)
    }, 200)
  }
}
// 失焦事件
const confirm = () => {
  if (inputValue.value.trim() !== '') {
    searchRecord.addRecord(inputValue.value)
    inputValue.value = ''
  }
}
// 获取仓库
const searchRecord = useSearchRecordStore()
console.log(searchRecord)

const { searchList } = storeToRefs(searchRecord)
const recordList = searchList

// 清空历史记录
const deleteRecord = () => {
  searchRecord.clearRecord()
}

// 排行榜
const rangkingList = ref([
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
  margin-top: 210rpx;
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
</style>
