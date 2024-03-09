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
        text: '广州市',
        value: '广州',
      },
      {
        text: '深圳市',
        value: '深圳',
      },
      {
        text: '东莞市',
        value: '东莞',
      },
      {
        text: '中山市',
        value: '中山',
      },
      {
        text: '惠州市',
        value: '惠州',
      },
      {
        text: '江门市',
        value: '江门',
      },
      {
        text: '珠海市',
        value: '珠海',
      },
      {
        text: '汕头市',
        value: '汕头',
      },
      {
        text: '佛山市',
        value: '佛山',
      },
      {
        text: '韶关市',
        value: '韶关',
      },
      {
        text: '湛江市',
        value: '湛江',
      },
      {
        text: '茂名市',
        value: '茂名',
      },
      {
        text: '肇庆市',
        value: '肇庆',
      },
      {
        text: '潮州市',
        value: '潮州',
      },
      {
        text: '清远市',
        value: '清远',
      },
      {
        text: '揭阳市',
        value: '揭阳',
      },
      {
        text: '梅州市',
        value: '梅州',
      },
      {
        text: '汕尾市',
        value: '汕尾',
      },
      {
        text: '云浮市',
        value: '云浮',
      },

      {
        text: '潮阳市',
        value: '潮阳',
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
      {
        text: '唐山市',
        value: '唐山',
      },
      {
        text: '秦皇岛市',
        value: '秦皇岛',
      },
      {
        text: '保定市',
        value: '保定',
      },
      {
        text: '承德市',
        value: '承德',
      },
      {
        text: '沧州市',
        value: '沧州',
      },
      {
        text: '廊坊市',
        value: '廊坊',
      },
      {
        text: '衡水市',
        value: '衡水',
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
      {
        text: '柳州市',
        value: '柳州',
      },
      {
        text: '梧州市',
        value: '梧州',
      },
      {
        text: '北海市',
        value: '北海',
      },
      {
        text: '防城港市',
        value: '防城港',
      },
      {
        text: '钦州市',
        value: '钦州',
      },
      {
        text: '钦州市',
        value: '钦州',
      },
      {
        text: '贵港市',
        value: '贵港',
      },
      {
        text: '玉林市',
        value: '玉林',
      },
      {
        text: '百色市',
        value: '百色',
      },
      {
        text: '贺州市',
        value: '贺州',
      },
      {
        text: '河池市',
        value: '河池',
      },
      {
        text: '来宾市',
        value: '来宾',
      },
      {
        text: '崇左市',
        value: '崇左',
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
