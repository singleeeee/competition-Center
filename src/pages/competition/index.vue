<template>
  <view class="container">
    <view class="headBox">
      <view class="searchBox">
        <view class="search">搜索</view>
      </view>
      <view class="scrollBox">
        <scroll-view class="scroll-view" :scroll-x="true" bindscroll="scroll" style="width: 100%">
          <view class="scroll-view-item active">算法比赛</view>
          <view class="scroll-view-item">创业比赛</view>
          <view class="scroll-view-item">开发比赛</view>
          <view class="scroll-view-item">设计比赛</view>
          <view class="scroll-view-item">文学类比赛</view>
          <view class="scroll-view-item">体育类比赛</view>
        </scroll-view>
      </view>
      <view class="tagList">
        <view class="left">
          <view class="tag active">近期</view>
          <view class="tag">往期</view>
        </view>
        <view class="right">
          <view class="tag"
            >全部赛事
            <uni-icons type="right" color="" size="12" />
          </view>
        </view>
      </view>
    </view>
    <view class="itemList">
      <!-- 卡片 -->
      <uni-card
        title="互联网+"
        sub-title="中国国际“互联网+”大学生创新创业大赛"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      >
        <text
          >中国国际“互联网+”大学生创新创业大赛是由中国教育部主管，由中国科学技术协会、中国电子学会等单位共同主办的一项大型赛事。</text
        >
      </uni-card>
      <uni-card
        title="挑战杯"
        sub-title="“挑战杯”全国大学生课外学术科技作品竞赛"
        extra="大挑"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      >
        <text
          >“挑战杯”是由共青团中央、中国科协、教育部和全国学联共同主办的全国性的大学生课外学术实践竞赛</text
        >
      </uni-card>
      <uni-card
        title="挑战杯"
        sub-title="“挑战杯”中国大学生创业大赛"
        extra="小挑"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      >
        <text>创业计划竞赛起源于美国，又称商业计划竞赛，是风靡全球高校的重要赛事。</text>
      </uni-card>
      <uni-card
        title="国际大学生程序设计竞赛"
        sub-title="算法比赛"
        extra="ICPC"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      >
        <text
          >国际大学生程序设计竞赛（ICPC）是由美国计算机协会（ACM）主办的年度竞赛，旨在展示大学生创新能力、团队精神和在压力下编写程序、分析和解决问题能力。</text
        >
      </uni-card>
      <uni-card
        title="蓝桥杯全国软件和信息技术专业人才大赛"
        sub-title="算法比赛"
        extra="篮球杯"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      >
        <text
          >蓝桥杯由中国教育部主管，由中国计算机学会主办，旨在通过比赛的方式促进大学生在计算机科学与技术领域的学习和创新。</text
        >
      </uni-card>
      <uni-card
        title="全国大学生数学建模竞赛"
        sub-title="数学建模"
        extra="数学建模比赛"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      >
        <text
          >全国大学生数学建模竞赛是中国的一项面向大学生的数学竞赛，旨在培养学生的实际问题解决能力和团队协作精神。</text
        >
      </uni-card>
      <uni-card
        title="广东省大学生计算机设计大赛"
        sub-title="计算机设计大赛"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      >
        <text
          >全国大学生数学建模竞赛是中国的一项面向大学生的数学竞赛，旨在培养学生的实际问题解决能力和团队协作精神。</text
        >
      </uni-card>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.container {
  .headBox {
    height: 240rpx;
    width: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    background-color: #fff;
    .searchBox {
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .search {
        text-align: center;
        width: 80%;
        background-color: #ccc;
        height: 50rpx;
        line-height: 50rpx;
        border-radius: 30rpx;
        font-size: 30rpx;
      }
    }
    .scrollBox {
      margin: 5rpx 0;
      height: 60rpx;
      background-color: #fff;
      border-bottom: 1rpx solid #eee;
      padding-bottom: 10rpx;
      background-color: pink;
      .scroll-view {
        height: 50rpx;
        white-space: nowrap;
        .scroll-view-item {
          display: inline-block;
          height: 62rpx;
          background-color: plum;
          width: 140rpx;
          margin: 0 40rpx;
          text-align: center;
          line-height: 60rpx;
          font-size: 26rpx;
          border-bottom: 4rpx solid skyblue;
        }
        .active {
          border-bottom: 4rpx solid skyblue;
        }
      }
    }
    .tagList {
      display: flex;
      justify-content: space-between;
      height: 80rpx;
      background-color: #fff;
      align-items: center;
      .left {
        display: flex;
      }
      .tag {
        background-color: #eee;
        color: #aaa;
        font-size: 26rpx;
        margin: 0 20rpx;
        padding: 10rpx 20rpx;
      }
      .active {
        background: linear-gradient(to top, rgb(44, 141, 192), rgb(90, 196, 238));
        color: #fff;
      }
    }
  }
  .itemList {
    margin-top: 320rpx;
  }
}
</style>
