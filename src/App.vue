<template>
  <div id="app" :class="theme">
    <van-nav-bar
      :title="headerBar.title"
      :border="false"
      :left-text="left.note"
      :left-arrow="left.arrow"
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <main class="main">
      <router-view></router-view>
    </main>
    <van-overlay class-name="loading" :show="loading" z-index="999"
      ><!-- 全屏loading -->
      <van-loading size="80" />
    </van-overlay>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    ...mapState(["headerBar", "loading", "theme"]),
    left() {
      return this.headerBar.left;
    },
    rightText() {
      return this.$route.name === "withdraw" ? "日志" : "";
    }
  },
  methods: {
    // 左侧方法选择器
    onClickLeft() {
      switch (this.left.method) {
        case "toLogin":
          this.$router.push("/login");
          break;
        case "toSignUp":
          this.$router.push("/signup");
          break;
        case "goBack":
          this.$router.go(-1);
          break;
        default:
          this.$router.go(-1);
          break;
      }
    },
    // 跳转到提现日志列表
    onClickRight() {
      this.$router.push("/withdraw/detail");
    }
  }
};
</script>
<style lang="stylus">
@import '~assets/stylus/variables'
#app
  width 100%
  height 100%
  max-width 1200px
  font-size $global-font-size
  font-family 'PingFang-SC-Medium', 'Microsoft YaHei'
  background-color white
  background-position center top
  background-repeat no-repeat
  background-size contain
  margin 0 auto
  overflow-x hidden
  position relative
  &.enter
    background-color white
    background-image url('~assets/img/bg/enter.png')
    .van-nav-bar
      background none
    .van-nav-bar__title, .van-nav-bar__text
      color black
  &.home
    .van-nav-bar
      background none
    .van-nav-bar__left
      display none
  &.gray
    background #F5F5F5
  .van-nav-bar
    width 100%
    background $primary-color
    position absolute
    z-index 10
    .van-icon
      color white
.loading
  display flex
  justify-content center
  align-items center
.main
  height 100%
  padding-top $header-size
  box-sizing border-box
.wrap
  padding 25px 40px
  box-sizing border-box
.list
  padding 20px 10px
  box-sizing border-box
img
  max-width 100%
</style>
