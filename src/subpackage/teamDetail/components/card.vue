<template>
  <button @tap="getTeamInfo">刷新</button>
  <!-- 队员信息面板 -->
  <view class="flex flex-wrap justify-evenly w-98vw">
    <view
      class="flex w-40vw flex-col items-center rounded-2xl mt-2 bg-red-200 px-2 py-3 mx-1"
      :class="{ 'bg-blue-300': item.ID === userInfo.ID }"
      v-for="(item, index) in userInfoListRender"
      :key="index"
    >
      <view class="font-bold text-lg text-green-600 h-6" v-if="item.status === 1">邀请中...</view>
      <view
        class="flex h-6 justify-center items-center font-bold text-lg text-red-600"
        v-else-if="item.status === 3"
      >
        <uni-icons class="mr-1 mt-1" type="info" color="rgb(220 38 38)" size="28" />
        <view>拒绝加入</view>
      </view>
      <view
        class="flex h-6 justify-center items-center font-bold text-lg text-red-600"
        v-else-if="item.status === 4"
      >
        <uni-icons class="mr-1 mt-1" type="info" color="rgb(220 38 38)" size="28" />
        <view>已在其它队伍</view>
      </view>
      <view v-else class="h-6"></view>

      <!-- 身份 -->
      <view class="flex items-center">
        <uni-icons class="mr-1 mt-1" type="flag-filled" color="" size="24" />
        {{ item.ID === captainId ? '队长' : '队员' }}
      </view>
      <!-- 头像 -->
      <view
        class="active boder-2 mt-4 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-white"
      >
        <img
          class="h-[58px] w-[58px] rounded-full bg-pink-200"
          :src="item.userAvatarUrl"
          alt="头像"
        />
      </view>
      <!-- 信息 -->
      <text class="mt-2 font-bold tracking-widest text-gray-700">{{ item.userName }}</text>
      <text class="mt-2 h-12 text-xs text-gray-700 text-center line-clamp-2">{{
        item.userIntroduction
      }}</text>
      <!-- 操作 -->
      <button
        class="btn rouded-lg h-[32px] justify-items-end rounded-2xl bg-red-500 px-4 py-2 text-sm leading-[18px] text-gray-100 shadow-sm"
        @tap="deleteTeam"
        v-show="item.ID === captainId && userInfo.ID === captainId"
      >
        解散队伍
      </button>
      <button
        class="btn rouded-lg h-[32px] justify-items-end rounded-2xl bg-red-500 px-4 py-2 text-sm leading-[18px] text-gray-100 shadow-sm"
        @tap="deleteTeamer(item.ID)"
        v-show="item.ID !== captainId && userInfo.ID === captainId"
      >
        移出队伍
      </button>
      <button
        class="btn rouded-lg h-[32px] justify-items-end rounded-2xl bg-red-500 px-4 py-2 text-sm leading-[18px] text-gray-100 shadow-sm"
        @tap="deleteTeamer(item.ID)"
        v-show="item.ID === userInfo.ID && userInfo.ID !== captainId"
      >
        退出队伍
      </button>
    </view>
  </view>
  <!-- 确定删除弹窗 -->
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消"
      confirmText="确认"
      title="警告"
      :content="alertContent"
      @confirm="del()"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 成功提示 -->
  <uni-popup ref="successInfo" type="message">
    <uni-popup-message type="success" message="操作成功" :duration="1000"></uni-popup-message>
  </uni-popup>
  <!-- 失败提示 -->
  <uni-popup ref="errorInfo" type="message">
    <uni-popup-message type="error" message="操作失败" :duration="1000"></uni-popup-message>
  </uni-popup>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { deleteGroupUser, deleteGroup, getInvitation } from '@/api/group/group'
import { getUserInfoByID } from '@/api/user/userInfo'
// import { idToTeamList } from '@/utils/idToTeamList'
import { useUserInfoStore } from '@/stores'
const { userInfo } = useUserInfoStore()
onMounted(() => {
  console.log('组件加载')
  getTeamInfo()
})

const props = defineProps({
  teamID: {
    type: Number,
    require: true,
  },
  captainId: {
    type: Number,
    require: true,
  },
})
// 弹窗ref
const alertDialog = ref()
// 成功ref
const successInfo = ref()
// 失败ref
const errorInfo = ref()
const alertContent = ref('您确定要解散这支队伍吗?')

const curUserID = ref(0)
// 踢出队伍或退出队伍
const deleteTeamer = (userID: number) => {
  if (userID === userInfo.ID) {
    curUserID.value = userID
    alertContent.value = '您确定要退出队伍吗?'
    alertDialog.value.open()
  } else {
    curUserID.value = userID
    alertContent.value = '您确定要移出该队员吗?'
    alertDialog.value.open()
  }
}

// 删除操作
const del = async () => {
  if (alertContent.value === '您确定要移出该队员吗?') {
    const res = await deleteGroupUser({
      userId: curUserID.value.toString(),
      groupId: props.teamID?.toString() as string,
    })
    if (res.code === '7') {
      errorInfo.value.open()
    } else {
      successInfo.value.open()
      getTeamInfo()
    }
  } else if (alertContent.value === '您确定要解散这支队伍吗?') {
    const res = await deleteGroup(props.teamID as number)
    if (res.code === '7') {
      errorInfo.value.open()
    } else {
      successInfo.value.open()
      // 回到我的队伍
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    }
    console.log(res)
  } else if (alertContent.value === '您确定要退出队伍吗?') {
    const res = await deleteGroupUser({
      userId: userInfo.ID.toString(),
      groupId: props.teamID?.toString() as string,
    })
    if (res.code === '7') {
      errorInfo.value.open()
    } else {
      successInfo.value.open()
      // 回到我的队伍
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    }
  } else {
    console.log('匹配失败')
  }
}
// 解散队伍
const deleteTeam = () => {
  alertContent.value = '您确定要解散这支队伍吗?'
  alertDialog.value.open()
}

const userInfoCache = new Map()
const userInfoListRender = ref([])

const getTeamInfo = async () => {
  userInfoListRender.value = []
  console.log(props.teamID)
  const resGroup = await getInvitation({
    groupId: props.teamID,
  })
  for (const item of resGroup.data.list) {
    const cache = userInfoCache.get(item.userId)
    // 走缓存
    if (cache) {
      const msg = {
        status: item.status,
        userAvatarUrl: cache.userAvatarUrl,
        userName: cache.userName,
        userIntroduction: cache.userIntroduction,
        ID: cache.ID,
      }
      userInfoListRender.value.push(msg)
    } else {
      const res = await getUserInfoByID(item.userId)
      const { userAvatarUrl, userName, userIntroduction, ID } = res.data.reuserData
      userInfoCache.set(item.userId, {
        userAvatarUrl,
        userName,
        userIntroduction,
        ID,
      })
      const msg = {
        status: item.status,
        userAvatarUrl,
        userName,
        userIntroduction,
        ID,
      }
      userInfoListRender.value.push(msg)
    }
  }
}
defineExpose({
  getTeamInfo,
})
</script>
<style scoped>
.active {
  border: 6rpx solid lightgreen;
}
.btn:active {
  background-color: rgb(175, 27, 27);
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
