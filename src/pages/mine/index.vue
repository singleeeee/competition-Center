<script lang="ts" setup>
import { ref } from 'vue'
import UnLog from './components/UnLog.vue'
import { onLoad, onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'

const userInfoStore = useUserInfoStore()
// 大坑！！！！！解构赋值还是会丢失响应式的，但是log出来还是proxy？
const { userInfo } = storeToRefs(userInfoStore)
let tagList = ref<string[]>([])

onLoad(() => {
  let userInfo = uni.getStorageSync('UserInfo')
  if (userInfo) {
    // 转成对象
    userInfo = JSON.parse(userInfo)
    userInfo = userInfo.userInfo
    useUserInfoStore().updateUserInfo(userInfo)
    isHeadShow.value = true
  } else {
    isHeadShow.value = false
  }
})
onShow(() => {
  let userInfo = uni.getStorageSync('UserInfo')
  if (userInfo) {
    userInfo = JSON.parse(userInfo)
    userInfo = userInfo.userInfo
    // console.log('onshow重新赋值')
    // useUserInfoStore().changeUserInfo('userLabel', userInfo.userLabel)
    // tag数组
    for (let i = 0; i < tagList.value.length; i++) tagList.value.pop()
    if (userInfo.userLabel.includes('-')) {
      tagList.value = userInfo.userLabel.split('-')
    } else if (userInfo.userLabel !== '') tagList.value.push(userInfo.userLabel)
    isHeadShow.value = true
  } else {
    isHeadShow.value = false
  }
})

// 下拉刷新
onPullDownRefresh(() => {
  console.log('刷新')
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})
// 跳转到修改个人资料页面
const navigatetoPerson = () => {
  uni.navigateTo({
    url: '/subpackage/personal_data/index',
  })
}
// 跳转到修改个人资料页面
const navigatetoPersonPage = () => {
  uni.navigateTo({
    url: '/pages/mine/personPage/index',
  })
}
// 主页item配置项
const configItems = [
  {
    id: 1,
    title: '我的奖项',
    icon: 'medal',
  },
  {
    id: 2,
    title: '我的队伍',
    icon: 'flag',
  },
  {
    id: 3,
    title: '参赛报名',
    icon: 'paperplane',
  },
  {
    id: 4,
    title: '我的经历',
    icon: 'person',
  },
  {
    id: 5,
    title: '联系客服',
    icon: 'headphones',
  },
  {
    id: 6,
    title: '更多设置',
    icon: 'gear',
  },
  {
    id: 7,
    title: '关于',
    icon: 'redo',
  },
]

let isHeadShow = ref(false)
// 改变登录状态
const changeIsLog = (val: boolean) => {
  isHeadShow.value = val
}

// 跳转非tabbar页面
const navigateTo = (target: string) => {
  uni.navigateTo({
    url: `/subpackage/${target}/index`,
  })
}
// 跳转都tabbar页面
const switchTab = (target: string) => {
  uni.navigateTo({ url: `/pages/mine/${target}/index` })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <view class="avatarBox" v-if="isHeadShow">
        <view class="avatar">
          <image class="avatar" :src="userInfo.userAvatarUrl" mode="scaleToFill" />
        </view>
        <view class="bodyBox" @tap="navigatetoPersonPage">
          <view class="nickname">{{ userInfo.userNickname }}</view>
          <view class="label">
            <view class="tag-view">
              <view v-if="tagList.length > 0">
                <uni-tag
                  v-for="(item, index) in tagList"
                  :key="index"
                  class="label"
                  :text="item"
                  :circle="true"
                  type="primary"
                  size="small"
                />
              </view>
              <view v-else>
                <uni-tag
                  class="label"
                  text="暂无标签"
                  :circle="true"
                  type="primary"
                  size="small"
                ></uni-tag>
              </view>
            </view>
          </view>
        </view>
        <view class="detail" @click="navigatetoPerson">
          <uni-icons type="right" color="#ccc" size="20"></uni-icons>
        </view>
      </view>
      <UnLog @changeIsLog="changeIsLog" v-else></UnLog>
    </view>
    <view class="body">
      <view class="collectBox">
        <view class="numberBox">
          <view class="liked">
            <view class="Number">{{ userInfo.loveNumber || 0 }}</view>
            <view class="text">获赞</view>
          </view>
          <view class="liked">
            <view class="Number">{{ userInfo.followerNumber || 0 }}</view>
            <view class="text">关注</view>
          </view>
          <view class="liked">
            <view class="Number">{{ userInfo.fansNumber || 0 }}</view>
            <view class="text">粉丝</view>
          </view>
        </view>
        <view class="itemsBox">
          <view class="items" @tap="navigateTo('myCollection')">
            <image class="img" src="@/static/mine/collect.png" mode="scaleToFill" />
            收藏</view
          >
          <view class="items" @tap="navigateTo('subscribe')">
            <image class="img" src="@/static/mine/subscribe.png" mode="scaleToFill" />
            订阅</view
          >
          <view class="items" @tap="navigateTo('fans_friends')">
            <image class="img" src="@/static/mine/follow.png" mode="scaleToFill" />
            关注</view
          >
          <view class="items" @tap="navigateTo('fans_friends')">
            <image class="img" src="@/static/mine/fans.png" mode="scaleToFill" />
            粉丝</view
          >
        </view>
      </view>
      <view class="messageBox">
        <view class="itemsBox">
          <view class="items">
            <image class="img" src="@/static/mine/message.png" mode="scaleToFill" />
            信息</view
          >
          <view class="items" @tap="navigateTo('PostWriting')">
            <image class="img" src="@/static/mine/draft.png" mode="scaleToFill" />
            草稿</view
          >
          <view class="items" @tap="switchTab('personPage')">
            <image class="img" src="@/static/mine/person.png" mode="scaleToFill" />
            个人中心</view
          >
          <view class="items">
            <image class="img" src="@/static/mine/manage.png" mode="scaleToFill" />
            内容管理</view
          >
        </view>
      </view>
      <view class="list">
        <view class="item" v-for="item in configItems" :key="item.id">
          <view class="left">
            <uni-icons style="vertical-align: middle" :type="item.icon" color="" size="24" />
            {{ item.title }}</view
          >
          <view class="right">
            <uni-icons type="right" color="#ccc" size="18" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .header {
    height: 300rpx;
    background-color: #12a66a;
    padding: 0 20rpx;
    .avatarBox {
      padding-left: 20rpx;
      display: flex;
      align-items: center;
      height: 200rpx;
      .avatar {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        background-color: skyblue;
      }
      .bodyBox {
        flex: 1;
        height: 120rpx;
        padding-left: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .nickname {
          font-family: '微软雅黑';
          font-size: 40rpx;
          padding-bottom: 10rpx;
          color: #000;
          font-weight: 700;
        }
        .label {
          margin-right: 30rpx;
        }
      }
      .detail {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120rpx;
        width: 70rpx;
      }
    }
  }
  .body {
    position: relative;
    top: -100rpx;
    z-index: 999;
    border-radius: 10rpx;
    height: 400rpx;
    margin: 0 20rpx;
    box-sizing: border-box;
    .collectBox,
    .messageBox {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10rpx;
      height: 280rpx;
      margin: 0 20rpx 20rpx 20rpx;
      padding: 20rpx;
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
      .numberBox {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #ccc;
        align-items: center;
        .liked {
          display: flex;
          position: relative;
          padding-bottom: 20rpx;
          padding-left: 30rpx;
          margin-right: 40rpx;
          .Number {
            font-size: 44rpx;
            padding-right: 10rpx;
            color: red;
            font-weight: 700;
          }
          .text {
            font-size: 26rpx;
            font-family: 'songti';
            font-weight: 700;
            margin-top: 18rpx;
          }
        }
      }

      .itemsBox {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 180rpx;
        font-weight: 700;
        font-size: 28rpx;
        .items {
          display: flex;
          width: 200rpx;
          height: 180rpx;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 10rpx;
          &:active {
            background-color: #eee;
          }
          .img {
            width: 60rpx;
            height: 60rpx;
            padding-bottom: 10rpx;
          }
        }
      }
    }

    .messageBox {
      height: 160rpx;
      .itemsBox {
        height: 140rpx;
      }
    }
    .list {
      height: auto;
      background-color: #fff;
      margin: 0 20rpx 20rpx 20rpx;
      border-radius: 10rpx;
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
      .item {
        display: flex;
        justify-content: space-between;
        padding: 30rpx;
        font-size: 28rpx;
        &:active {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
