<template>
  <view>
    <uni-data-picker
      :placeholder="userCity"
      popup-title="请选择所在地区"
      :localdata="dataTree"
      v-model="userCity"
      @change="onchange"
      @nodeclick="onnodeclick"
      @popupopened="onpopupopened"
      @popupclosed="onpopupclosed"
      :clear-icon="false"
    >
    </uni-data-picker>
  </view>
</template>
<script lang="ts" setup>
import { useUserInfoStore } from '@/stores'

const dataTree = [
  {
    text: '广东',
    value: '广东',
    children: [
      {
        text: '湛江市',
        value: '湛江',
      },
      {
        text: '茂名市',
        value: '茂名',
      },
      {
        text: '阳江市',
        value: '阳江',
      },
      {
        text: '汕头市',
        value: '汕头',
      },
      {
        text: '深圳市',
        value: '深圳',
      },
      {
        text: '潮州市',
        value: '潮州',
      },
    ],
  },
  {
    text: '河北',
    value: '河北',
    children: [
      {
        text: '石家庄市',
        value: '石家庄',
      },
      {
        text: '邢台市',
        value: '邢台',
      },
      {
        text: '邯郸市',
        value: '邯郸',
      },
      {
        text: '马庄市',
        value: '马庄',
      },
      {
        text: '张家口市',
        value: '张家口',
      },
    ],
  },
  {
    text: '广西',
    value: '广西',
    children: [
      {
        text: '桂林市',
        value: '桂林',
      },
      {
        text: '南宁市',
        value: '南宁',
      },
    ],
  },
]

let userCity = useUserInfoStore().userInfo.userCity
function onpopupopened() {}
function onpopupclosed() {}
function onnodeclick() {}
function onchange(e) {
  const arr = e.detail.value
  const userCity = arr[0].text + '/' + arr[1].text
  useUserInfoStore().changeUserInfo('userCity', userCity)
}
</script>
<style scoped></style>
