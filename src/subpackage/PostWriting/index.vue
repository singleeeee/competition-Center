<template>
  <view class="container">
    <!-- 关联比赛 -->
    <uni-section title="关联比赛" type="line">
      <view style="padding: 0 20rpx">
        <uni-data-select
          class="select"
          :localdata="matchList"
          field="appid as value, name as text"
          v-model="relativeCom"
          placeholder="请选择关联的比赛"
          emptyTips="暂无比赛"
        />
      </view>
    </uni-section>

    <view class="inputTitleBox">
      <view class="info">标题:</view>
      <input class="inputTitle" v-model="title" placeholder="输入标题" @input="titleChange" />
    </view>
    <view class="content">
      <textarea
        class="text"
        placeholder="请输入内容"
        v-model="textarea"
        :cursor-spacing="225"
        :auto-height="true"
        :maxlength="-1"
      />
    </view>
    <view class="img">
      <view class="imageItem" v-for="(item, index) in imgList" :key="index" :data-id="index">
        <image @tap="previewImg(item)" class="image" :src="item" mode="scaleToFill" />
        <uni-icons @tap="deleteImg" class="clear" type="clear" color="" size="20" />
      </view>
    </view>
    <view class="function">
      <view class="icon">
        <uni-icons type="image" color="#888" size="30" @tap="chooseImg('album')" />
        <uni-icons type="camera" color="#888" size="30" @tap="chooseImg('camera')" />
      </view>
      <view>
        <button class="sendBtn" plain @tap="send">发布</button>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useUserInfoStore } from '@/stores'
import { http } from '@/utils/http'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
onLoad(async () => {
  // 获取比赛列表
  const res = await http({
    url: '/app/com/getComInfoList',
  })
  console.log(res.data.list, '比赛列表')
  for (let i = 0; i < res.data.list.length; i++) {
    const matchItem = {
      value: res.data.list[i].ID,
      text: res.data.list[i].comTitle,
    }
    matchList.value.push(matchItem)
  }
})
// 预览图片
const previewImg = (url: string) => {
  if (!url) return
  let urls = [url]
  uni.previewImage({
    urls,
    success: (result) => {},
    fail: (error) => {
      uni.showToast({
        title: '预览失败',
        icon: 'none',
      })
    },
  })
}
// 内容区
const textarea = ref('')
// 关联比赛
const relativeCom = ref()
// 比赛列表
const matchList = ref<any>([])
// 标题
const title = ref('')

// 标题变化
const titleChange = () => {}
// 图片列表
const imgList = ref<string[]>([])
// 上传图片
const chooseImg = (mode: string) => {
  const arr = mode === 'album' ? ['album'] : ['camera']
  uni.chooseImage({
    count: 1,
    sourceType: arr,
    success: (success) => {
      if (imgList.value.length < 3) {
        uni.showLoading({
          mask: true,
        })
        const fileurl = success.tempFilePaths[0]
        uni.uploadFile({
          url: 'http://47.113.177.192:8082/app/upload/file',
          filePath: fileurl,
          name: 'file',
          success: (success) => {
            const {
              data: { url },
            } = JSON.parse(success.data)
            imgList.value.push(url)
            uni.hideLoading()
          },
        })
      } else {
        uni.showToast({
          title: '不能超过三张图片',
          icon: 'none',
          mask: true,
        })
      }
    },
  })
}
// 删除照片
const deleteImg = (e: any) => {
  const index = e.currentTarget.dataset.id
  imgList.value.splice(index, 1)
}
// 获取用户信息
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)

// 发布帖子
const send = () => {
  if (title.value.trim() && textarea.value.trim()) {
    http({
      url: '/app/dis/createDisInfo',
      data: {
        disTitle: title.value,
        disContent: textarea.value,
        disComId: relativeCom.value,
        disUserId: userInfo.value.ID,
        disPicture: imgList.value,
      },
      method: 'POST',
    })
    uni.showToast({
      title: '发布成功!',
      icon: 'success',
      duration: 1400,
      success: () => {
        uni.navigateTo({
          url: '/subpackage/postManage/index',
        })
      },
    })
  } else {
    uni.showToast({
      title: '标题或内容都不能为空',
      icon: 'none',
    })
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 450rpx;
  .inputTitleBox {
    display: flex;
    width: 100%;
    margin: 40rpx 0;
    height: 80rpx;
    align-items: center;
    padding: 0 20rpx;
    .info {
      flex: 1;
      min-width: 80rpx;
      font-weight: 700;
    }
    .inputTitle {
      flex: 9;
      height: 60rpx;
      background-color: #eee;
      margin: 0 20rpx;
      border-radius: 10rpx;
      font-size: 26rpx;
      padding: 0 20rpx;
    }
  }
  .content {
    background-color: #eee;
    border-radius: 10rpx;
    margin: 0 20rpx;
    padding: 10rpx;
    padding-bottom: 300rpx;
  }
  .img {
    position: fixed;
    z-index: 9999;
    bottom: 100rpx;
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 180rpx;
    background-color: #fff;
    .imageItem {
      position: relative;
      height: 120rpx;
      margin: 0 20rpx;
      .image {
        height: 120rpx;
        width: 120rpx;
      }
      .clear {
        position: absolute;
        top: -16rpx;
        right: -16rpx;
        z-index: 99;
      }
    }
  }
  .function {
    box-sizing: border-box;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    width: 100%;
    padding: 0 40rpx;
    padding-left: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100rpx;
    box-shadow: 2rpx 0 0 2rpx #eee;
    background-color: #fff;
    .icon {
      width: 30vw;
      display: flex;
      justify-content: space-evenly;
    }
    .sendBtn {
      border: 0;
      width: 200rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      background-color: #12a66a;
      box-shadow: 0rpx 1rpx 12rpx 4rpx #efefef;
      color: #eee;
      border-radius: 30rpx;
    }
  }
  .text {
    width: 100%;
    font-size: 28rpx;
    padding: 20rpx;
  }
}
</style>
