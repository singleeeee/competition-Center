<template>
  <view class="header">
    <view class="eng"> ABOUT US </view>
    <view class="teamName"> 竞赛云界 </view>
    <view style="display: inline; margin-top: 40rpx">
      <span class="tag">
        <span class="text">欢迎进入竞赛云界</span>
        <image
          style="width: 30rpx; height: 20rpx; display: inline-block; margin-left: 6rpx"
          src="@/static/AboutUs/rightArrow.png"
          mode="scaleToFill"
        />
      </span>
    </view>
  </view>
  <view class="logo">竞赛云界</view>
  <view class="body">
    <!-- 产品说明 -->
    <view class="card">
      <view class="top">
        <view class="items">
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
        </view>
        <view class="text">INTRODUCTION 产品说明</view>
      </view>
      <view class="content"
        >竞赛云界小程序是一款服务于高校大学生，提供各种比赛信息的平台，该小程序旨在打破比赛信息差，及时通知比赛消息，提供信息交流平台供同学们进行知识共享，同时发现志同道合的好友，一起参加比赛，最终达到以赛促学，提升个人竞争力。
      </view>
    </view>
    <!-- 社区公约 -->
    <view class="card">
      <view class="top">
        <view class="items">
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
        </view>
        <view class="text">CONVENTION 社区公约</view>
      </view>
      <!-- 公约准则 -->
      <!-- 1.请尊重原创，并分享真实的内容 -->
      <view class="ruleBox">
        <view class="dot"></view>
        <h1 class="title">请尊重原创，并分享真实的内容</h1>
        <p class="p">
          在竞赛社区进行分享和交流时，请保证所使用的素材来自于自己的经验或创造。如果你需要借鉴，请确保你有权使用它们。同时，也请保证所有素材的真实性，这是沟通交流的基本前提。如果你需要转载，请获得对方同意，并注明出处。
        </p>
      </view>
      <!-- 2.请避免使用夸张、猎奇等手段吸引用户点击 -->
      <view class="ruleBox">
        <view class="dot"></view>
        <h1 class="title">请避免使用夸张、猎奇等手段吸引用户点击</h1>
        <p class="p">
          请分享文题相符的内容。使用夸张、猎奇的标题和封面，是一种不真诚的分享行为，竞赛社区也会对此进行适度调控。分享者不应抱有侥幸，请通过真诚分享持续积累粉丝。
        </p>
      </view>
      <!-- 3.请尊重他人，文明交流 -->
      <view class="ruleBox">
        <view class="dot"></view>
        <h1 class="title">请尊重他人，文明交流</h1>
        <p class="p">
          1.如果你的分享涉及他人，请坚持自愿原则，并尊重他人隐私、肖像、名誉等权利;<br />
          2.如果你的分享涉及弱势群体，请最大程度同理对方处境，维护对方尊严;<br />
          3.评论或者分享时请保持文明用语，避免使用攻击性词汇;<br />
          4.请尊重他人，保持和谐交流氛围。
        </p>
      </view>
    </view>
    <!-- 开发人员 -->
    <view class="developerBox">
      <!-- Single -->
      <template v-for="(item, index) in infoList" :key="index">
        <view class="boxItem">
          <image class="avatar" :src="item.avatar" mode="scaleToFill" />
          <view class="content">
            <h1 class="title">{{ item.nickname }}</h1>
            <p class="intro">{{ item.introduce }}</p>
          </view>
          <view class="work">{{ item.work }}</view>
        </view>
        <view class="card"> &nbsp;&nbsp;{{ item.content }} </view>
      </template>
    </view>
    <!-- 编写日期 -->
    <view class="bottom">
      <view class="line"></view>
      <view class="text">2024年03月17日更新</view>
      <view class="line"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const infoList = [
  {
    nickname: 'Single',
    introduce: '人间秋月有幸事，落叶与风再相逢。',
    content:
      '欢迎各位体验我们的竞赛云界小程序，从研发到现在，团队的小伙伴们都付出了非常多的心血，在此我由衷地向他们表示感谢。',
    avatar:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/微信图片_20240317102843.jpg',
    work: '前端',
  },
  {
    nickname: 'Yjddb',
    introduce: '倚楼听风雨，淡看江湖路。',
    content: '后端开发 ， go天下无敌!',
    avatar:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/djy.jpg',
    work: '后端',
  },
  {
    nickname: 'ww"',
    introduce: '春风若有怜花香，可否许我再少年。',
    content:
      '欢迎来到竞赛云界：这里不仅仅有比赛，更是一个舞台，在这里每一个热爱竞赛的人都可以发光发热。其次，我要感谢我团队小伙伴，因为有你们，我才能成长进步。',
    avatar:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/ww.jpg',
    work: '测试',
  },
  {
    nickname: '🌟',
    introduce: '那就去追星星吧  乘着浪花攀越悬崖。',
    content:
      '欢迎来到竞赛云界小程序！感谢团队伙伴们共同付出，在这里，挑战与乐趣同在，让我们一起揭开竞赛之旅的面纱吧。',
    avatar:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/mcl.jpg',
    work: '后端',
  },
]
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  z-index: 9999;
  top: 60rpx;
  right: 30rpx;
  display: inline;
  font-size: 34rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 40rpx;
  font-weight: 700;
  color: rgb(255, 158, 175);
  box-shadow: 4rpx 4prx 4prx 12rpx #000;
}
.header {
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 350rpx;
  justify-content: center;
  background-color: #12a66a;
  padding-left: 40rpx;
  z-index: 999;
  .eng {
    font-size: 52rpx;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;
  }
  .teamName {
    font-size: 52rpx;
    color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .tag {
    display: inline;
    margin-top: 60rpx;
    font-weight: 700;
    background-color: #fff;
    padding: 10rpx;
    font-size: 24rpx;
    color: #515151;
  }
}
.body {
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx;
  background: linear-gradient(to right, #d9faf5, #e0f9f5, #e8faf7);
  margin-top: 350rpx;
  .card {
    margin: 40rpx 40rpx;
    padding: 10rpx 40rpx;
    background-color: #fff;
    border-radius: 40rpx;
    box-shadow: 2rpx 2rpx 2rpx 2rpx #ddd;
    overflow: hidden;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100rpx;
      border-bottom: 2rpx solid #000;
      .items {
        display: flex;
        justify-content: space-evenly;
        .item {
          width: 30rpx;
          height: 30rpx;
          background-color: #d9faf5;
          border-radius: 50%;
        }
      }
      .text {
        font-weight: 700;
        font-size: 28rpx;
      }
    }
    .ruleBox {
      .dot {
        width: 26rpx;
        height: 26rpx;
        margin: 10rpx;
        margin-top: 30rpx;
        background-color: #12a66a;
      }
      .title {
        padding-left: 10rpx;
        font-size: 28rpx;
        font-weight: 700;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
      }
      .p {
        padding-left: 10rpx;
        font-size: 24rpx;
        letter-spacing: 2rpx;
        margin: 10rpx 0;
        color: #666;
      }
    }
    .content {
      margin: 20rpx 0;
      padding: 10rpx;
      font-size: 24rpx;
      color: #666;
      letter-spacing: 2rpx;
    }
  }
  .developerBox {
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 40rpx 40rpx;
    margin-top: 160rpx;
    .boxItem {
      position: relative;
      display: flex;
      height: 140rpx;
      background-color: #fff;
      border-radius: 70rpx 0 0 70rpx;
      box-shadow: 0rpx 0rpx 6rpx 6rpx #ddd;
      overflow: hidden;
      .avatar {
        box-sizing: border-box;
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        border: 8rpx solid #fff;
        z-index: 2;
        &:active {
          animation: rotateAvatar 0.5s forwards ease-in-out;
        }
      }
      .content {
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20rpx;
        .title {
          font-size: 28rpx;
          font-weight: 700;
        }
        .intro {
          margin-top: 10rpx;
          font-size: 22rpx;
          color: #666;
        }
      }
      .content::after {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgb(167, 224, 247);
        height: 230rpx;
        width: 70vw;
        transform: skewX(8deg);
      }
      .work {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 30rpx;
        height: 80rpx;
        width: 40rpx;
        font-size: 24rpx;
        color: #fff;
        padding: 10rpx 6rpx;
        border-radius: 4rpx;
        background-color: red;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -18rpx;
          width: 0rpx;
          height: 0rpx;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid red;
        }
      }
    }
    .card {
      position: relative;
      margin: 0;
      margin-top: 60rpx;
      font-size: 26rpx;
      letter-spacing: 2rpx;
      line-height: 40rpx;
      overflow: visible;
      margin-bottom: 120rpx;
      padding: 30rpx 40rpx;
      &::after {
        content: '';
        position: absolute;

        top: -12rpx;
        left: 40rpx;
        z-index: 2;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
      }
    }
  }
  .bottom {
    display: flex;
    height: 60rpx;
    align-items: center;
    justify-content: center;
    .line {
      background-color: #aaa;
      height: 2rpx;
      width: 10vw;
    }
    .text {
      margin: 0 30rpx;
      font-size: 26rpx;
      color: #aaa;
    }
  }
  @keyframes rotateAvatar {
    100% {
      transform: rotate(-360deg);
    }
  }
}
</style>
