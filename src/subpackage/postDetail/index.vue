<template>
  <view v-if="isPostShow">
    <view class="header">
      <nameTitle
        :author="postDetail.userInfo.userNickname"
        :avatar-url="postDetail.userInfo.userAvatarUrl"
        :date="postDetail.date"
        :extra="postDetail.extra"
        @tap-avatar="toUserPage"
      ></nameTitle>
    </view>
    <PostBody
      :content="postDetail.disContent"
      :title="postDetail.disTitle"
      :img-list="postDetail.disPicture"
      :dis-id="postDetail.ID"
      :authorId="postDetail.userInfo.ID"
      :liked="postDetail.isLiked"
      :collected="postDetail.isCollected"
    ></PostBody>
    <view class="commentArear">
      <CommentArea :disId="postDetail.ID"></CommentArea>
    </view>
  </view>
  <view v-else>
    <!-- 骨架屏 -->
    <template name="skeleton">
      <view class="sk-container">
        <view class="data-v-84b55b5c data-v-84b55b5c">
          <view class="header header data-v-84b55b5c data-v-84b55b5c">
            <view is="components/nameTitle" class="data-v-84b55b5c data-v-84b55b5c">
              <view
                class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 container nameTitle--container"
              >
                <view
                  class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 authorBox nameTitle--authorBox"
                >
                  <view class="avatar nameTitle--avatar data-v-a1d5eb03 nameTitle--data-v-a1d5eb03">
                    <image
                      class="avatar nameTitle--avatar data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-image"
                      mode="scaleToFill"
                    ></image>
                  </view>
                  <view
                    class="bodyBox nameTitle--bodyBox data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                  >
                    <view
                      class="nickname nameTitle--nickname data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-transparent sk-text-14-2857-659 sk-text"
                      style="color: orange"
                      >Single</view
                    >
                    <view
                      class="date_add nameTitle--date_add data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                    >
                      <view
                        class="date nameTitle--date data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-transparent sk-text-14-2857-976 sk-text"
                        >2024/2/18 22:57</view
                      >
                      <view
                        class="add nameTitle--add data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-transparent sk-text-14-2857-64 sk-text"
                        >河北</view
                      >
                    </view>
                  </view>
                  <view class="share nameTitle--share data-v-a1d5eb03 nameTitle--data-v-a1d5eb03">
                    <label
                      class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                      style="font-size: 12px; color: #ccc"
                    ></label>
                    <view
                      is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                      class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                    >
                      <text
                        class="uni-icons icons--uni-icons uniui- icons--uniui-"
                        style="color: #ccc; font-size: 18px"
                      ></text>
                    </view>
                  </view>
                </view>
                <view
                  class="commentItem nameTitle--commentItem data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                ></view>
              </view>
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup"
                class="r nameTitle--r data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
              ></view>
            </view>
          </view>
          <view is="components/PostBody" class="data-v-84b55b5c data-v-84b55b5c">
            <view class="container PostBody--container data-v-865c7b31 PostBody--data-v-865c7b31">
              <view
                class="title PostBody--title data-v-865c7b31 PostBody--data-v-865c7b31 sk-transparent sk-text-14-2857-165 sk-text"
                >测试3</view
              >
              <view
                class="content PostBody--content data-v-865c7b31 PostBody--data-v-865c7b31 sk-transparent sk-text-14-2857-321 sk-text"
                >测试</view
              >
              <view class="imgBox PostBody--imgBox data-v-865c7b31 PostBody--data-v-865c7b31">
                <view class="imgBox PostBody--imgBox data-v-865c7b31 PostBody--data-v-865c7b31">
                  <view class="data-v-865c7b31 PostBody--data-v-865c7b31">
                    <image
                      class="img PostBody--img data-v-865c7b31 PostBody--data-v-865c7b31 sk-image"
                      mode="heightFix"
                      style="width: 153.712px"
                    ></image>
                  </view>
                </view>
              </view>
              <view class="share PostBody--share data-v-865c7b31 PostBody--data-v-865c7b31">
                <view class="lineBox PostBody--lineBox data-v-865c7b31 PostBody--data-v-865c7b31">
                  <view
                    class="line PostBody--line data-v-865c7b31 PostBody--data-v-865c7b31"
                  ></view>
                  <view
                    class="text PostBody--text data-v-865c7b31 PostBody--data-v-865c7b31 sk-transparent sk-text-14-2857-164 sk-text"
                    >分享至</view
                  >
                  <view
                    class="line PostBody--line data-v-865c7b31 PostBody--data-v-865c7b31"
                  ></view>
                </view>
                <view class="iconBox PostBody--iconBox data-v-865c7b31 PostBody--data-v-865c7b31">
                  <view
                    is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                    class="data-v-865c7b31 PostBody--data-v-865c7b31"
                    style="margin-right: 15px"
                  >
                    <text
                      class="uni-icons icons--uni-icons uniui-weixin icons--uniui-weixin sk-pseudo sk-pseudo-circle"
                      style="color: #ccc; font-size: 38px"
                    ></text>
                  </view>
                  <view
                    is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                    class="data-v-865c7b31 PostBody--data-v-865c7b31"
                    style="margin-right: 15px"
                  >
                    <text
                      class="uni-icons icons--uni-icons uniui-qq icons--uniui-qq sk-pseudo sk-pseudo-circle"
                      style="color: #ccc; font-size: 38px"
                    ></text>
                  </view>
                  <view
                    is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                    class="data-v-865c7b31 PostBody--data-v-865c7b31"
                    style="margin-right: 15px"
                  >
                    <text
                      class="uni-icons icons--uni-icons uniui-weibo icons--uniui-weibo sk-pseudo sk-pseudo-circle"
                      style="color: #ccc; font-size: 38px"
                    ></text>
                  </view>
                  <view
                    is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                    class="data-v-865c7b31 PostBody--data-v-865c7b31"
                    style="margin-right: 15px"
                  >
                    <text
                      class="uni-icons icons--uni-icons uniui-pyq icons--uniui-pyq sk-pseudo sk-pseudo-circle"
                      style="color: #ccc; font-size: 38px"
                    ></text>
                  </view>
                </view>
              </view>
              <view class="likeBox PostBody--likeBox data-v-865c7b31 PostBody--data-v-865c7b31">
                <view
                  class="data-v-865c7b31 PostBody--data-v-865c7b31 liked PostBody--liked active PostBody--active"
                >
                  <view class="data-v-865c7b31 PostBody--data-v-865c7b31">
                    <view
                      is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                      class="data-v-865c7b31 PostBody--data-v-865c7b31"
                    >
                      <text
                        class="uni-icons icons--uni-icons uniui-hand-up-filled icons--uniui-hand-up-filled sk-pseudo sk-pseudo-circle"
                        style="color:; font-size: 24px"
                      ></text>
                    </view>
                  </view>
                  <view
                    class="data-v-865c7b31 PostBody--data-v-865c7b31 sk-transparent sk-text-14-2857-383 sk-text"
                  >
                    已点赞
                  </view>
                </view>
                <view
                  class="data-v-865c7b31 PostBody--data-v-865c7b31 collect PostBody--collect active PostBody--active"
                >
                  <view class="data-v-865c7b31 PostBody--data-v-865c7b31">
                    <view
                      is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                      class="data-v-865c7b31 PostBody--data-v-865c7b31"
                    >
                      <text
                        class="uni-icons icons--uni-icons uniui-star-filled icons--uniui-star-filled sk-pseudo sk-pseudo-circle"
                        style="color:; font-size: 24px"
                      ></text>
                    </view>
                  </view>
                  <view
                    class="data-v-865c7b31 PostBody--data-v-865c7b31 sk-transparent sk-text-14-2857-553 sk-text"
                  >
                    已收藏
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view is="components/CommentArea" class="data-v-84b55b5c data-v-84b55b5c">
            <view
              class="container CommentArea--container data-v-eccb98fd CommentArea--data-v-eccb98fd"
            >
              <view
                class="title CommentArea--title data-v-eccb98fd CommentArea--data-v-eccb98fd sk-transparent sk-text-14-2857-182 sk-text"
                >评论(1)</view
              >
              <view is="components/nameTitle" class="data-v-eccb98fd CommentArea--data-v-eccb98fd">
                <view
                  class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 container nameTitle--container comment nameTitle--comment border nameTitle--border"
                >
                  <view
                    class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 authorBox nameTitle--authorBox comment nameTitle--comment"
                  >
                    <view
                      class="avatar nameTitle--avatar data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                    >
                      <image
                        class="avatar nameTitle--avatar data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-image"
                        mode="scaleToFill"
                      ></image>
                    </view>
                    <view
                      class="bodyBox nameTitle--bodyBox data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                    >
                      <view
                        class="nickname nameTitle--nickname data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-transparent sk-text-14-2857-642 sk-text"
                        style="color: orange"
                        >Yjddb</view
                      >
                      <view
                        class="date_add nameTitle--date_add data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                      >
                        <view
                          class="date nameTitle--date data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-transparent sk-text-14-2857-341 sk-text"
                          >2024/3/7 16:07</view
                        >
                        <view
                          class="add nameTitle--add data-v-a1d5eb03 nameTitle--data-v-a1d5eb03 sk-transparent sk-text-14-2857-357 sk-text"
                          >广西</view
                        >
                      </view>
                    </view>
                    <view class="share nameTitle--share data-v-a1d5eb03 nameTitle--data-v-a1d5eb03">
                      <label
                        class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                        style="display: inline; font-size: 12px; color: #ccc"
                      ></label>
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                        class="data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                        style="margin-right: 5px"
                      >
                        <text
                          class="uni-icons icons--uni-icons uniui-closeempty icons--uniui-closeempty sk-pseudo sk-pseudo-circle"
                          style="color: #ccc; font-size: 18px"
                        ></text>
                      </view>
                    </view>
                  </view>
                  <view
                    class="commentItem nameTitle--commentItem data-v-a1d5eb03 nameTitle--data-v-a1d5eb03"
                  >
                    <view>
                      <view class="data-v-eccb98fd CommentArea--data-v-eccb98fd">
                        <view
                          class="commentText CommentArea--commentText data-v-eccb98fd CommentArea--data-v-eccb98fd sk-transparent"
                          >测试
                          <view class="data-v-eccb98fd CommentArea--data-v-eccb98fd">
                            <view
                              class="secondCommentList CommentArea--secondCommentList data-v-eccb98fd CommentArea--data-v-eccb98fd"
                            >
                              <view
                                class="left CommentArea--left data-v-eccb98fd CommentArea--data-v-eccb98fd"
                              >
                                <view
                                  class="userInfo CommentArea--userInfo data-v-eccb98fd CommentArea--data-v-eccb98fd sk-transparent sk-text-14-2857-134 sk-text"
                                  >Single</view
                                >
                                <view
                                  class="content CommentArea--content data-v-eccb98fd CommentArea--data-v-eccb98fd sk-transparent sk-text-14-2857-589 sk-text"
                                  >怎么代金宇的评论我有删除记号</view
                                >
                                <view
                                  class="replyTime CommentArea--replyTime data-v-eccb98fd CommentArea--data-v-eccb98fd sk-transparent sk-text-14-2857-441 sk-text"
                                  >2024/3/9 13:55 河北</view
                                >
                              </view>
                              <view
                                class="right CommentArea--right data-v-eccb98fd CommentArea--data-v-eccb98fd"
                              ></view>
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view
              class="inputArea CommentArea--inputArea data-v-eccb98fd CommentArea--data-v-eccb98fd"
            >
              <view
                class="input CommentArea--input data-v-eccb98fd CommentArea--data-v-eccb98fd sk-transparent"
              >
                <view
                  is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                  class="data-v-eccb98fd CommentArea--data-v-eccb98fd"
                  style="padding-right: 5px"
                >
                  <text
                    class="uni-icons icons--uni-icons uniui-compose icons--uniui-compose sk-pseudo sk-pseudo-circle"
                    style="color: #ccc; font-size: 24px"
                  ></text>
                </view>
                请文明发言</view
              >
            </view>
          </view>
        </view>
      </view>
    </template>
  </view>
  <view v-if="isPostLost" class="empty">
    <img src="../../static/empty/emptyPost.png" />
    <span style="font-size: 36rpx; color: #999">帖子被外星人偷走了!</span></view
  >
</template>
<script lang="ts" setup>
import nameTitle from '@/components/nameTitle.vue'
import PostBody from '@/components/PostBody.vue'
import CommentArea from '@/components/CommentArea.vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { ref } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'

// 帖子详细信息
const postDetail = ref()
// 控制帖子显示
const isPostShow = ref(false)
onLoad(async (options) => {
  const { disId } = options
  getPostDetail(disId)
})

// 获取帖子详细信息
const getPostDetail = async (disId: number) => {
  // 请求获取帖子详细信息
  const res = await http({
    url: `/app/dis/getDisInfoByid?ID=${disId}`,
  })
  postDetail.value = res.data.redisData

  const time = toLocalTime(postDetail.value.CreatedAt)
  // 修改时间
  postDetail.value.date = time
  const province = postDetail.value.userInfo.userCity

  // 修改省份
  postDetail.value.extra = province.slice(0, province.indexOf('/'))
  isPostShow.value = true
}

// 跳转到用户主页
const toUserPage = () => {
  uni.navigateTo({
    url: `/pages/mine/personPage/index?userID=${postDetail.value.userInfo.ID}`,
  })
}
</script>
<style lang="scss" scoped>
.header {
  margin: 0 20rpx;
}
.empty {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
// 骨架屏

.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-659 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 42rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-976 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-64 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-165 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 47.6rpx;
  position: relative !important;
}
.sk-text-14-2857-321 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-164 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: absolute !important;
}
.sk-text-14-2857-383 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-553 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-182 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-642 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-341 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-357 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-text-14-2857-134 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-589 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-441 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 30.8rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
