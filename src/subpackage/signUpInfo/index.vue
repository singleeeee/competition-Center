<template>
  <view class="container">
    <view class="info"><span style="color: red">*</span> 仅用于比赛报名，不会泄露给其他用户</view>
    <!-- 真实姓名 -->
    <view class="items" @tap.stop="onTapInput('nameShow')">
      <view class="left">
        <span style="color: red">*</span>
        姓名</view
      >
      <view class="right">
        <view class="close" v-if="nameShow">{{ nameValue }}</view>
        <view class="input" v-else>
          <uni-easyinput
            :clearable="false"
            :focus="autofocus"
            v-model="nameValue"
            placeholder="请输入真实姓名"
            :maxlength="5"
            trim
            @change="completeInput('nameShow')"
          ></uni-easyinput>
        </view>
      </view>
    </view>
    <!-- 年级 -->
    <view class="items" @tap="gradePopup.open('bottom')">
      <view class="left">
        <span style="color: red">*</span>
        年级</view
      >
      <view class="right" style="margin-right: 30rpx">
        <view class="back">
          <span style="color: #ccc; margin-right: 10rpx; font-size: 28rpx">{{
            gradeSelectd || '请选择年级'
          }}</span>
          <uni-icons type="right" color="#ccc" size="16" />
        </view>
      </view>
    </view>
    <!-- 专业 -->
    <view class="items" @tap="professionPopup.open('bottom')">
      <view class="left">
        <span style="color: red">*</span>
        专业</view
      >
      <view class="right" style="margin-right: 30rpx">
        <view class="back">
          <span style="color: #ccc; margin-right: 10rpx; font-size: 28rpx">{{
            professionSelectd || '请选择专业'
          }}</span>
          <uni-icons type="right" color="#ccc" size="16" />
        </view>
      </view>
    </view>
    <!-- 班级 -->
    <view class="items" @tap.stop="onTapInput('classShow')">
      <view class="left">
        <span style="color: red">*</span>
        班级</view
      >
      <view class="right">
        <view class="close" v-show="classShow">{{ classValue }}</view>
        <view class="input" v-show="!classShow">
          <uni-easyinput
            :clearable="false"
            :focus="autofocus"
            v-model="classValue"
            placeholder="请输入所在班级"
            :maxlength="4"
            trim
            @change="completeInput('classShow')"
          ></uni-easyinput>
        </view>
      </view>
    </view>
    <!-- 学号 -->
    <view class="items" @tap.stop="onTapInput('studentIdShow')">
      <view class="left">
        <span style="color: red">*</span>
        学号</view
      >
      <view class="right">
        <view class="close" v-if="studentIdShow">{{ studentIdValue }}</view>
        <view class="input" v-else>
          <uni-easyinput
            :clearable="false"
            :focus="autofocus"
            v-model="studentIdValue"
            placeholder="请输入您的学号"
            :maxlength="13"
            trim
            @change="completeInput('studentIdShow')"
          ></uni-easyinput>
        </view>
      </view>
    </view>
    <!-- 电话号码 -->
    <view class="items" @tap.stop="onTapInput('phoneNumberShow')">
      <view class="left">
        <span style="color: red">*</span>
        电话号码</view
      >
      <view class="right">
        <view class="close" v-if="phoneNumberShow">{{ phoneNumberValue }}</view>
        <view class="input" v-else>
          <uni-easyinput
            :clearable="false"
            :focus="autofocus"
            v-model="phoneNumberValue"
            placeholder="请输入您的手机号码"
            :maxlength="11"
            trim
            @change="completeInput('phoneNumberShow')"
          ></uni-easyinput>
        </view>
      </view>
    </view>
    <!-- 身份证号码 -->
    <view class="items" @tap.stop="onTapInput('personalIdShow')">
      <view class="left">
        <span style="color: red">*</span>
        身份证号码</view
      >
      <view class="right">
        <view class="close" v-if="personalIdShow">{{ personalIdValue }}</view>
        <view class="input" v-else>
          <uni-easyinput
            :clearable="false"
            :focus="autofocus"
            v-model="personalIdValue"
            placeholder="请输入您的身份证号码"
            :maxlength="18"
            trim
            @change="completeInput('personalIdShow')"
          ></uni-easyinput>
        </view>
      </view>
    </view>
  </view>
  <!-- 专业 -->
  <uni-popup ref="professionPopup" background-color="#fff">
    <picker-view
      :value="professionValue"
      immediate-change
      @change="professionChange"
      class="picker-view"
    >
      <picker-view-column>
        <view class="item" v-for="(item, index) in professionArray" :key="index">{{ item }}</view>
      </picker-view-column>
    </picker-view>
  </uni-popup>
  <!-- 年级 -->
  <uni-popup ref="gradePopup" background-color="#fff">
    <picker-view :value="gradeValue" immediate-change @change="gradeChange" class="picker-view">
      <picker-view-column>
        <view class="item" v-for="(item, index) in gradeArray" :key="index">{{ item }}</view>
      </picker-view-column>
    </picker-view>
  </uni-popup>
  <!-- 成功提示 -->
  <uni-popup ref="successInfo" type="message">
    <uni-popup-message type="success" message="修改成功" :duration="500"></uni-popup-message>
  </uni-popup>
  <!-- 失败提示 -->
  <uni-popup ref="errorInfo" type="message">
    <uni-popup-message type="error" message="修改失败" :duration="500"></uni-popup-message>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
  // 专业回显
  professionSelectd.value = userInfo.value.userProfession
  const professionValueID = professionArray.indexOf(professionSelectd.value)
  professionValue.value[0] = professionValueID
  // 年级回显
  gradeSelectd.value = userInfo.value.userGrade
  const gradeValueID = gradeArray.indexOf(gradeSelectd.value)
  console.log(gradeValueID)
  gradeValue.value[0] = gradeValueID
})
// 回显和使用
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
// 成功和失败ref
const successInfo = ref()
const errorInfo = ref()
// 专业ref
const professionPopup = ref()
// 专业修改
const professionArray = [
  '计算机科学与技术',
  '计算机科学与技术(国际班)',
  '信息与计算科学',
  '物联网工程',
  '计算机科学与技术(三二分段)',
  '数据科学与大数据技术',
  '计算机科学与技术(杨班)',
  '计算机科学与技术(工业软件)',
  '软件工程',
  '软件工程(卓越计划班)',
  '网络工程',
  '网络空间安全',
  '软件工程(杨班)',
  '计算机类',
]
const professionValue = ref([0])
const professionSelectd = ref('计算机类')
const professionChange = (e: any) => {
  const val = e.detail.value
  professionSelectd.value = professionArray[val[0]]
  userInfoStore.changeUserInfo('userProfession', professionSelectd.value)
  successInfo.value.open()
}

// 年级ref
const gradePopup = ref()
// 年级修改
const gradeArray = new Array(20).fill(0).map((item, index) => 2010 + index)
const gradeValue = ref([0])
const gradeSelectd = ref(2023)
const gradeChange = (e: any) => {
  const val = e.detail.value
  gradeSelectd.value = gradeArray[val[0]]
  userInfoStore.changeUserInfo('userGrade', gradeSelectd.value)
  successInfo.value.open()
}

// 控制显示隐藏
const classShow = ref(true)
const nameShow = ref(true)
const studentIdShow = ref(true)
const phoneNumberShow = ref(true)
const personalIdShow = ref(true)

// 输入框绑定的值
const classValue = ref(userInfo.value.userClass)
const nameValue = ref(userInfo.value.userName)
const studentIdValue = ref(userInfo.value.userStudentId)
const phoneNumberValue = ref(userInfo.value.userPhone)
const personalIdValue = ref(userInfo.value.userPersonalId)

// 自动对焦
const autofocus = ref(false)
// 处理输入框失焦事件
const completeInput = (typeShow: string) => {
  autofocus.value = false
  switch (typeShow) {
    case 'classShow':
      userInfoStore.changeUserInfo('userClass', classValue.value)
      successInfo.value.open()
      classShow.value = true
      break
    case 'nameShow':
      userInfoStore.changeUserInfo('userName', nameValue.value)
      successInfo.value.open()
      nameShow.value = true
      break
    case 'studentIdShow':
      userInfoStore.changeUserInfo('userStudentId', studentIdValue.value)
      successInfo.value.open()
      studentIdShow.value = true
      break
    case 'phoneNumberShow':
      userInfoStore.changeUserInfo('userPhone', phoneNumberValue.value)
      successInfo.value.open()
      phoneNumberShow.value = true
      break
    case 'personalIdShow':
      userInfoStore.changeUserInfo('userPersonalId', personalIdValue.value)
      successInfo.value.open()
      personalIdShow.value = true
      break
    default:
      break
  }
}
// 处理点击输入框事件
const onTapInput = (typeShow: string) => {
  autofocus.value = true
  switch (typeShow) {
    case 'classShow':
      classShow.value = false
      break
    case 'nameShow':
      nameShow.value = false
      break
    case 'studentIdShow':
      studentIdShow.value = false
      break
    case 'phoneNumberShow':
      phoneNumberShow.value = false
      break
    case 'personalIdShow':
      personalIdShow.value = false
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .info {
    text-align: center;
    padding: 10rpx 0;
    font-size: 20rpx;
    color: #aaa;
  }
  .items {
    height: 140rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #eee;
    padding: 0 20rpx;
    &:active {
      background-color: #eee;
    }
    .right {
      .close {
        box-sizing: border-box;
        height: 56rpx;
        width: 360rpx;
        margin-right: 40rpx;
        border-radius: 30rpx;
        text-align: center;
        background-color: #eee;
        max-width: 70vw;
        overflow: hidden;
        line-height: 56rpx;
        padding: 0 20rpx;
        color: #aaa;
        font-size: 28rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
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
