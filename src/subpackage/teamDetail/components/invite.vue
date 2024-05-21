<template>
  <view
    class="flex justify-center items-center bg-white rounded-full w-10 h-10 addShowdow mr-4 activeBtn"
    @tap="popup.open('bottom')"
  >
    <uni-icons type="plusempty" size="24" />
  </view>
  <!-- 普通弹窗 -->
  <uni-popup ref="popup">
    <view class="flex h-56 flex-col rounded-xl bg-blue-200 px-6 py-4 text-center">
      <!-- 搜索框 -->
      <view class="flex h-12 items-center justify-center">
        <input
          id="input"
          class="h-8 w-3/5 rounded-2xl bg-white px-4"
          placeholder="请输入邀请人的姓名"
          v-model="inputValue"
          type="text"
          @input="inputChange"
        />
        <view
          class="icon ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#5179ef]"
          @tap="search"
        >
          <uni-icons class="icon" type="search" color="#fff" size="22" />
        </view>
      </view>
      <!-- 好友列表 -->
      <view class="m-2 h-42 overflow-scroll rounded-2xl">
        <!-- item -->
        <template v-if="userInfoList.length > 0">
          <view
            class="my-2 flex items-center justify-between rounded-2xl bg-white px-2 py-2"
            v-for="(item, index) in userInfoList"
            :key="index"
          >
            <img class="h-12 w-12 rounded-full" :src="item.userAvatarUrl" alt="头像" />
            <view class="flex-1 pl-2 text-start">
              <view class="text-orange-300">{{ item.userNickname }}</view>
              <view class="text-sm text-gray-400">{{ item.userIntroduction }}</view>
            </view>
            <view
              class="icon flex h-10 w-10 items-center justify-center rounded-full bg-[#5179ef]"
              @tap="inviteTeamer(item.ID)"
            >
              <uni-icons type="plusempty" color="#fff" size="24" />
            </view>
          </view>
        </template>
        <template v-else>
          <uni-load-more :status="status" iconType="circle" :content-text="contentText" />
        </template>
      </view>
    </view>
  </uni-popup>
</template>
<script lang="ts" setup>
import { myThrottle } from '@/utils/myThrottle'
import { ref } from 'vue'
import { getUserList } from '@/api/user/userInfo'
import { inviteUser } from '@/api/group/group'
const props = defineProps({
  groupID: {
    type: Number,
    require: true,
  },
})

const emit = defineEmits(['invite'])

const popup = ref()
const status = ref('loading')
const contentText = ref({
  contentdown: '请搜索',
  contentrefresh: '加载中',
  contentnomore: '没有更多用户了',
})
const userInfoList = ref([])
const inputValue = ref('')
const inputChange = myThrottle(async () => {
  userInfoList.value = []
  search()
})
const search = async () => {
  status.value = 'loading'
  const res = await getUserList({
    userNickname: inputValue.value,
  })
  userInfoList.value = res.data.list
  status.value = 'noMore'
}
const inviteTeamer = async (userID: number) => {
  const res = await inviteUser({
    userId: userID,
    groupId: props.groupID,
  })
  emit('invite')
  uni.showToast({
    title: res.msg,
    icon: 'none',
  })
}
</script>
<style scoped>
.activeBtn:active {
  background-color: #eee;
}
.addShowdow {
  box-shadow: 2rpx 4rpx 8rpx 4rpx rgb(206, 230, 240);
}

.icon:active {
  background-color: rgb(2, 41, 63);
}
</style>
