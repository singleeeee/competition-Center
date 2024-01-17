<template>
  <view class="container">
    <!-- 卡片 -->
    <uni-section class="mb-10" title="A类竞赛" sub-title="一等奖：200 二等奖： 180 三等奖：160">
      <template v-slot:decoration>
        <view class="decoration"></view>
      </template>
    </uni-section>
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
    <uni-section class="mb-10" title="B类竞赛" sub-title="一等奖：160 二等奖： 140 三等奖：120">
      <template v-slot:decoration>
        <view class="decoration"></view>
      </template>
    </uni-section>
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
    <uni-section class="mb-10" title="C类竞赛" sub-title="一等奖：160 二等奖： 140 三等奖：120">
      <template v-slot:decoration>
        <view class="decoration"></view>
      </template>
    </uni-section>
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
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
$uni-success: #18bc37 !default;

.uni-wrap {
  flex-direction: column;
  /* #ifdef H5 */
  height: calc(100vh - 44px);
  /* #endif */
  /* #ifndef H5 */
  height: 100vh;
  /* #endif */
  flex: 1;
}

.mb-10 {
  margin-bottom: 10px;
}

.decoration {
  width: 6px;
  height: 6px;
  margin-right: 4px;
  border-radius: 50%;
  background-color: $uni-success;
}
</style>
