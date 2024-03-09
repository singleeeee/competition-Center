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
    <uni-steps
      :options="expList"
      active-color="#007AFF"
      :active="active"
      active-icon="medal"
      direction="column"
    />
  </view>
  <uni-popup ref="experiencePopup" background-color="#fff">
    <picker-view :value="currentChosseExp" immediate-change @change="expChoose" class="picker-view">
      <picker-view-column>
        <view class="item" v-for="(item, index) in expList" :key="index"
          >{{ index + 1 }} {{ item.title }}</view
        >
      </picker-view-column>
    </picker-view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 当前选中的经历下标
let currentExpIndex = ref(-1)
// picker回显选中
let currentChosseExp = ref([0])
// 打开弹出层
const openPopup = () => {
  if (expList.value.length === 0) return uni.showToast({ title: '请先添加经历', icon: 'none' })

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
}
// 经历数组
let expList = ref([
  {
    desc: '2012-11-13 至 2018-12',
    title: '就读马庄小学，跟马庄小学校长是好哥儿们',
  },
  {
    desc: '2012-11-13 至 2018-12',
    title: '高考740分,满昏状元，进入东莞理工学院',
  },
  {
    desc: '2012-11-13 至 2018-12',
    title: '拿下黑丝校花学姐',
  },
  {
    desc: '2012-11-13 至 2018-12',
    title: '蓝桥杯国一',
  },
  {
    desc: '2012-11-13 至 2018-12',
    title: '入职腾讯，升职CEO',
  },
  {
    desc: '2012-11-13 至 2018-12',
    title: '梦醒了，欠债百万',
  },
])
// 当前经历步骤
let active = ref(5)
// 输入的经历内容
let expValue = ref()
// 经历跨越时间
let datetimerange = ref('')
// 是否显示输入
let isControl = ref(false)
// 添加经历
const add = () => {
  isControl.value = true
  expValue.value = ''
  datetimerange.value = []
  currentExpIndex.value = -1
}
// 确认按钮
const confirm = () => {
  // 新增
  if (currentExpIndex.value === -1) {
    if (!isControl.value) {
      uni.showToast({
        title: '请先填写经历',
        icon: 'none',
      })
      return
    }
    if (expList.value === '' || datetimerange.value === []) {
      return uni.showToast({
        title: '经历或者时间不能为空！',
        icon: 'none',
      })
    }
    expList.value.push({
      desc: datetimerange.value[0] + '至' + datetimerange.value[1],
      title: expValue.value,
    })
    active.value = expList.value.length - 1
  } else {
    console.log(expList.value, 'title')
    if (expList.value === '') {
      return uni.showToast({
        title: '经历不能为空！',
        icon: 'none',
      })
    }
    // 允许不加时间
    if (!datetimerange.value) {
      // 修改
      expList.value[currentExpIndex.value] = {
        desc: '',
        title: expValue.value,
      }
    } else {
      // 修改
      expList.value[currentExpIndex.value] = {
        desc: datetimerange.value[0] + '至' + datetimerange.value[1],
        title: expValue.value,
      }
    }

    isControl.value = false
    expValue.value = ''
    datetimerange.value = []
    canDelete.value = false
    currentExpIndex.value = -1
    console.log(expList.value)
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
