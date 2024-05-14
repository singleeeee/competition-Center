<template>
  <template v-if="isLog">
    <view class="serachBox">
      <uni-search-bar
        v-model="inputValue"
        style="width: 100%"
        cancelButton="none"
        @input="handleChange"
        @focus="focus"
        @blur="unFocus"
        placeholder="搜索好友"
        clear
      />
      <view class="searchResult" v-show="isFocus">
        <block v-if="searchResult.length > 0">
          <view
            class="item"
            v-for="(item, index) in searchResult"
            :key="index"
            @tap="toUserInfo(item.ID)"
          >
            <uni-icons type="search" color="#333" size="14" />
            {{ item.userNickname }}</view
          >
        </block>
        <block v-else>
          <view class="empty">
            <uni-load-more
              :status="loadingStatus"
              :contentText="contentText"
              iconType="circle"
            ></uni-load-more>
          </view>
        </block>
      </view>
    </view>
    <uni-collapse ref="collapse">
      <!-- 好友分组 -->
      <uni-collapse-item
        v-for="(group, index) in groupList"
        :key="index"
        :title="group.groupName"
        :open="true"
        bgColor="#f5f5f5"
      >
        <view class="content">
          <view class="frdbox" v-for="item in group.groupMember" :key="item.id">
            <view>
              <image class="image" :src="item.userAvatarUrl" mode="scaleToFill" />
            </view>
            <view class="body" @tap="switchToChat(item.userID)">
              <view class="nickname">{{ item.userNickname }}</view>
              <view class="info">{{ item.userIntroduction }}</view>
            </view>
            <view class="statusBox">
              <view class="status" :style="{ color: item.isOnline ? 'green' : '#ccc' }">{{
                item.isOnline ? '在线' : '离线'
              }}</view>
              <button plain @tap="switchToChat(item.userID)">聊天</button>
            </view>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </template>
  <view v-else class="login">
    请先登录!
    <image class="img" src="../../../static/empty/unLog.png" mode="scaleToFill" />
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useUserInfoStore } from '@/stores'
import { myThrottle } from '@/utils/myThrottle'
import { getUserList } from '@/api/user/userInfo'
import type { UserInfoList } from '@/api/user/userInfo'
const toUserInfo = (userId: number) => {
  uni.navigateTo({
    url: `/pages/mine/personPage/index?userID=${userId}`,
  })
}

const loadingStatus = ref('noMore')
const contentText = {
  contentdown: '请输入搜索内容',
  contentrefresh: '',
  contentnomore: '暂无数据',
}
const searchResult: Ref<UserInfoList[]> = ref([
  // {
  //   ID: 4,
  //   userName: '代金宇',
  //   userStudentId: '2022463030703',
  //   userNickname: 'Yjddb',
  //   userAvatarUrl:
  //     'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-13/1710292057tmp_21d274078c19a8320fc9802d001269a4fbc91de187eecc16.jpg',
  //   userGender: 1,
  //   userGrade: 2021,
  //   userProfession: '计算机科学与技术',
  //   userClass: '1班',
  //   userPhone: '13131227873',
  //   userPersonalId: '',
  //   userIntroduction: '我爱莞工',
  //   userLabel: 'icpc',
  //   userCity: '广西/百色市',
  //   loveNumber: 111,
  //   fansNumber: 0,
  //   followerNumber: 3,
  //   friendNumber: 1,
  //   sessionKey: '',
  //   userModel: 1,
  //   isYourFans: false,
  //   isYourFollower: true,
  //   isYourFriend: false,
  //   isOnline: false,
  //   CreatedAt: '2024-02-14T21:17:12.425Z',
  //   UpdatedAt: '2024-04-07T20:12:08.126Z',
  // },
  // {
  //   ID: 4,
  //   userName: '王书广',
  //   userStudentId: '2022463030703',
  //   userNickname: 'Yjddb',
  //   userAvatarUrl:
  //     'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-13/1710292057tmp_21d274078c19a8320fc9802d001269a4fbc91de187eecc16.jpg',
  //   userGender: 1,
  //   userGrade: 2021,
  //   userProfession: '计算机科学与技术',
  //   userClass: '1班',
  //   userPhone: '13131227873',
  //   userPersonalId: '',
  //   userIntroduction: '我爱莞工',
  //   userLabel: 'icpc',
  //   userCity: '广西/百色市',
  //   loveNumber: 111,
  //   fansNumber: 0,
  //   followerNumber: 3,
  //   friendNumber: 1,
  //   sessionKey: '',
  //   userModel: 1,
  //   isYourFans: false,
  //   isYourFollower: true,
  //   isYourFriend: false,
  //   isOnline: false,
  //   CreatedAt: '2024-02-14T21:17:12.425Z',
  //   UpdatedAt: '2024-04-07T20:12:08.126Z',
  // },
])
const getSearchResult = async () => {
  loadingStatus.value = 'loading'
  console.log(inputValue.value, '当前的values')
  if (inputValue.value !== '') {
    const res = await getUserList({
      userNickname: inputValue.value,
      page: '1',
      pageSize: '20',
    })
    if (res.data.list.length <= 0) {
      loadingStatus.value = 'noMore'
    }
    searchResult.value = []
    searchResult.value = searchResult.value.concat(res.data.list)
    loadingStatus.value = 'more'
  } else {
    searchResult.value = []
    loadingStatus.value = 'more'
  }
  loadingStatus.value = 'more'
}
const isFocus = ref(false)
//  搜索栏绑定的值
const inputValue = ref('')
// 输入事件
const handleChange = myThrottle(() => {
  getSearchResult()
})
const focus = () => {
  isFocus.value = true
}
const unFocus = () => {
  isFocus.value = false
}
// 登录状态
const isLog = ref(false)

onShow(async () => {
  if (useUserInfoStore().userInfo.token) {
    getFriends()
    isLog.value = true
  }
})
// 获取好友列表
const getFriends = async () => {
  groupList.value[0].groupMember = []
  // 获取朋友列表
  const res = await http({
    url: `/app/user/showUserFriend?userID=${useUserInfoStore().userInfo.ID}`,
  })
  for (let i = 0; i < res.data.length; i++) {
    groupList.value[0].groupMember.push(res.data[i])
  }
}
const switchToChat = (targetID: number) => {
  uni.navigateTo({ url: `/pages/community/chatRoom/index?targetID=${targetID}` })
}

const groupList = ref([
  {
    id: 1,
    groupName: '我的好友',
    groupMember: [
      // {
      //   userID: 3,
      //   userNickname: '代金宇',
      //   userAvatarUrl:
      //     'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      //   userIntroduction: '我踏马来啦',
      //   isOnline: '在线',
      // },
    ],
  },
])
</script>
<style scoped lang="scss">
.frdbox {
  height: 140rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
  .image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    .nickname {
      font-weight: 700;
      font-size: 28rpx;
      padding-bottom: 10rpx;
    }
    .info {
      font-size: 20rpx;
      color: #888;
    }
  }
  .statusBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    height: 90rpx;
    width: 80rpx;
    .status {
      font-size: 20rpx;
      text-align: center;
      padding-bottom: 5rpx;
    }
    button {
      display: block;
      width: 80rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 20rpx;
      font-weight: 700;
      padding: 0;
      border-radius: 1rpx;
      border: 1px solid black;
    }
  }
}
.serachBox {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20rpx;
  background-color: #fff;
  .searchResult {
    width: calc(100% - 80rpx);
    position: absolute;
    min-height: 200rpx;
    z-index: 9999;
    top: 84rpx;
    margin: 0 40rpx;
    background-color: #f8f8f8;
    box-shadow: 0rpx 0rpx 4rpx 2rpx #eee;
    .item {
      background-color: #f8f8f8;
      padding: 20rpx 20rpx;
      border-bottom: #eee solid 1rpx;
      font-size: 26rpx;
      color: #333;
    }
    .item:active {
      background-color: #f1f1f1;
    }
  }
}
.empty {
  font-size: 26rpx;
  color: #333;
  text-align: center;
  margin-top: 40rpx;
}
.login {
  height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0;
  background-color: #f2f2fa;
  text-align: center;
  font-size: 40rpx;
  font-weight: 700;
}
</style>
