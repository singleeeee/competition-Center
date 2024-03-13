<template>
  <view class="container">
    <view class="header">
      <button @tap="del" style="background-color: red" plain v-show="canDelete">删除</button>
      <button @tap="openPopup" plain>修改</button>
      <button @tap="add" plain>新增</button>
    </view>
    <uni-section title="经历" type="line">
      <uni-easyinput
        prefixIcon="medal"
        v-model="expValue"
        placeholder="输入经历内容，二十字以内"
        :maxlength="30"
        trim
        :disabled="!isControl"
      >
      </uni-easyinput>
    </uni-section>

    <uni-section title="选择时间" type="line">
      <view class="example-body">
        <uni-datetime-picker
          v-model="datetimerange"
          type="daterange"
          rangeSeparator="至"
          :disabled="!isControl"
        />
      </view>
    </uni-section>
    <button class="btn" @tap="confirm">确认</button>
    <uni-section title="预览效果" type="line"></uni-section>
    <view v-if="expList.length > 0">
      <uni-steps
        :options="expList"
        active-color="#007AFF"
        :active="active"
        active-icon="medal"
        direction="column"
      />
    </view>
    <view v-else style="text-align: center; padding-top: 20rpx; color: #aaa">暂无经历</view>
  </view>
  <!-- 选择某段经历 -->
  <uni-popup ref="experiencePopup" background-color="#fff">
    <picker-view :value="currentChosseExp" immediate-change @change="expChoose" class="picker-view">
      <picker-view-column>
        <view class="item" v-for="(item, index) in expList" :key="index"
          >{{ index + 1 }} {{ item.title }}</view
        >
      </picker-view-column>
    </picker-view>
  </uni-popup>
  <!-- 顶部提示信息 -->
  <uni-popup ref="messageRef" type="message">
    <uni-popup-message :type="msgType" :message="messageText" :duration="1000"></uni-popup-message>
  </uni-popup>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
const UserInfoStore = useUserInfoStore()

onLoad(() => {
  getUserExperience()
})
// 获取用户经历
const getUserExperience = async () => {
  const res = await http({
    url: '/app/user/showUserHistory',
    data: {
      userID: UserInfoStore.userInfo.ID,
    },
  })
  let arr: any = res.data.list.reverse().forEach((item) => {
    const obj = {
      ID: item.ID,
      desc: item.time,
      title: item.desc,
    }
    expList.value.push(obj)
  })
}

// 提示信息ref
const messageRef = ref()
// 提示信息内容
let messageText = ref('')
// 提示信息类型
let msgType = ref('success')
// 控制提示信息出现
const showMessage = (type: string, text: string) => {
  messageText.value = text
  msgType.value = type
  messageRef.value.open()
}

// 当前选中的经历下标
let currentExpIndex = ref(-1)
// picker回显选中
let currentChosseExp = ref([0])
// 打开弹出层
const openPopup = () => {
  if (expList.value.length === 0) return uni.showToast({ title: '请先添加经历', icon: 'none' })
  else if (expList.value.length === 1) {
    currentExpIndex.value = 0
    expValue.value = expList.value[0].title
    datetimerange.value = expList.value[0].desc.split(' 至 ')
    isControl.value = true
    canDelete.value = true
  }

  experiencePopup.value.open('bottom')
}
// 经历选择弹出层ref
const experiencePopup = ref()
// 是否显示删除按钮
let canDelete = ref(false)
// 选择某段经历
const expChoose = (e) => {
  const val = e.detail.value
  currentExpIndex.value = val[0]
  expValue.value = expList.value[val[0]].title
  datetimerange.value = expList.value[val[0]].desc.split(' 至 ')
  isControl.value = true
  canDelete.value = true
}
// 删除某段经历
const del = () => {
  try {
    const res = http({
      url: '/app/user/deleteUserHistory?ID=' + expList.value[currentExpIndex.value].ID,
      method: 'DELETE',
    })
    for (let i = 0; i < expList.value.length; i++) {
      if (i == currentExpIndex.value) {
        expList.value.splice(i, 1)
        break
      }
    }
    expValue.value = ''
    canDelete.value = false
    datetimerange.value = []
    isControl.value = false
    currentExpIndex.value = -1
    showMessage('success', '删除成功!')
  } catch (error) {
    uni.showToast({
      title: '删除失败',
      icon: 'none',
    })
  }
}
// 经历数组
let expList = ref([])
// 当前经历步骤
let active = ref(5)
// 输入的经历内容
let expValue = ref()
// 经历跨越时间
let datetimerange = ref('')
// 是否显示输入
let isControl = ref(false)
// 打开新增模式
const add = () => {
  isControl.value = true
  expValue.value = ''
  datetimerange.value = []
  currentExpIndex.value = -1
}
// 确认按钮
const confirm = async () => {
  // 新增模式
  if (currentExpIndex.value === -1) {
    if (!isControl.value) {
      uni.showToast({
        title: '请先填写经历',
        icon: 'none',
      })
      return
    }
    // 经历和时间是否为空
    if (!expValue.value || datetimerange.value == false) {
      return uni.showToast({
        title: '经历和时间不能为空！',
        icon: 'none',
      })
    } else {
      try {
        const res = await http({
          url: '/app/user/createUserHistory',
          method: 'POST',
          data: {
            userID: UserInfoStore.userInfo.ID,
            desc: expValue.value,
            time: datetimerange.value[0] + ' 至 ' + datetimerange.value[1],
          },
        })
        const returnMsg = await http({
          url: '/app/user/showUserHistory',
          data: {
            userID: UserInfoStore.userInfo.ID,
          },
        })
        // 回显数据
        expList.value.push({
          ID: returnMsg.data.list[0].ID,
          desc: datetimerange.value[0] + ' 至 ' + datetimerange.value[1],
          title: expValue.value,
        })
        active.value = expList.value.length - 1
        expValue.value = ''
        datetimerange.value = []
        showMessage('success', '新增成功')
      } catch (error) {
        active.value = expList.value.length - 1
        expValue.value = ''
        datetimerange.value = []
        showMessage('error', '新增失败!')
      }
    }
  } else {
    // 编辑模式
    if (!expValue.value || datetimerange.value == false) {
      return uni.showToast({
        title: '经历和时间不能为空！',
        icon: 'none',
      })
    }
    // 修改接口
    try {
      const res = await http({
        url: '/app/user/updateUserHistory',
        method: 'POST',
        data: {
          ID: expList.value[currentChosseExp.value].ID,
          desc: expValue.value,
          time: datetimerange.value[0] + ' 至 ' + datetimerange.value[1],
        },
      })
      expList.value[currentExpIndex.value] = {
        ID: expList.value[currentChosseExp.value].ID,
        desc: datetimerange.value[0] + ' 至 ' + datetimerange.value[1],
        title: expValue.value,
      }
      showMessage('success', '修改成功!')
      isControl.value = false
      expValue.value = ''
      datetimerange.value = []
      canDelete.value = false
      currentExpIndex.value = -1
    } catch (error) {
      showMessage('error', '修改失败!')
      isControl.value = false
      expValue.value = ''
      datetimerange.value = []
      canDelete.value = false
      currentExpIndex.value = -1
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 20rpx;
  .header {
    display: flex;
    justify-content: flex-end;
    button {
      height: 50rpx;
      line-height: 50rpx;
      font-size: 26rpx;
      background-color: #409eff;
      color: #fff;
      border-radius: 5rpx;
      border: 0;
      margin-top: 10rpx;
      margin-right: 10rpx;
      margin-left: 0;
      &:active {
        background-color: #337ecc;
      }
    }
  }
  .btn {
    height: 60rpx;
    width: 200px;
    line-height: 60rpx;
    font-size: 26rpx;
    background-color: #409eff;
    color: #fff;
    border-radius: 5rpx;
    border: 0;
    margin: 20rpx auto;
    &:active {
      background-color: #337ecc;
    }
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
