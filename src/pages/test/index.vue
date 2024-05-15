<template>
  <view class="containerBox">
    <uni-collapse>
      <uni-collapse-item titleBorder="none" v-for="(item, index) in teamInfoList" :key="index">
        <template v-slot:title>
          <view class="titleBox">
            <view class="container">
              <image
                class="comImg"
                src="https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-20/1663143151329180_副本.png"
                mode="scaleToFill"
              />
              <view class="titleContent">
                <view class="TeamName">{{ item.groupName }}</view>
                <view class="title">{{ item.comTitle }}</view>
              </view>
              <view class="titleTime">
                <view>{{ item.comStart }}</view>
                <view>{{ item.comEnd }}</view>
              </view>
            </view>
          </view>
        </template>
        <view class="contentBox">
          <view class="teamerBox">
            <image
              v-for="(teamer, teamerIndex) in item.userInfoList"
              :key="teamerIndex"
              class="item"
              :src="teamer.userAvatarUrl"
            ></image>
          </view>
          <view class="btnBox">
            <view class="btn">进入比赛</view>
            <view class="btn" style="border-color: #e96f6f; color: #e96f6f">删除队伍</view>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>
<script setup></script>
<style lang="scss" scoped>
.containerBox {
  background-color: #f1f1f1;
  min-height: 100vh;
  padding: 0 20rpx;
}
.titleBox {
  background-color: #fff;
  width: calc(100% - 40rpx);
  margin: 10rpx 20rpx;
  border-radius: 20rpx;
  padding: 10rpx 20rpx;
  overflow: hidden;
  .container {
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #eee;
    padding-bottom: 20rpx;
    .comImg {
      width: 100rpx;
      height: 100rpx;
      border-radius: 20rpx;
      margin-right: 20rpx;
      box-shadow: 0rpx 0rpx 4rpx 2rpx #ccc;
    }
    .titleContent {
      flex: 1;
      .TeamName {
        margin-bottom: 10rpx;
        font-weight: bold;
      }
      .title {
        font-size: 28rpx;
        color: #333;
      }
    }
    .titleTime {
      font-size: 28rpx;
      width: 200rpx;
    }
  }
}
.contentBox {
  display: flex;
  align-items: center;
  margin: 10rpx 20rpx;
  padding: 20rpx 20rpx;
  background-color: #fff;
  .teamerBox {
    flex: 1;
    .item {
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      margin-right: 10rpx;
    }
  }
  .btn {
    width: 150rpx;
    height: 60rpx;
    border: 1rpx solid #000;
    border-radius: 4rpx;
    text-align: center;
    line-height: 60rpx;
    margin-bottom: 20rpx;
  }
  .btnBox {
    width: 150rpx;
    display: flex;
    flex-direction: column;
  }
  .btn:active {
    background: #eee;
  }
}
</style>
