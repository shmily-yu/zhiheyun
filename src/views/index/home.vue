<template>
  <van-pull-refresh v-model="isLoading" head-height="0" @refresh="getHomePage">
    <div id="home">
      <div class="overview">
        <div class="notices" @click="showNote=!showNote" v-show="note.title">
          <van-icon name="bullhorn-o" size="15" />
          <span>公告:{{ note.title }}</span>
        </div>
        <div class="container">
          <section class="user">
            <div class="avatar">
              <img src="@/assets/img/avatar.png" />
            </div>
            <div class="info">
              <div class="phone">{{ DSTphone }}</div>
              <div class="card">{{ userInfo.cardId }}</div>
            </div>
          </section>
          <section class="btn-group">
            <router-link to="/withdraw">
              <img src="@/assets/img/icon/home_withdraw.png" alt="提币" />
              <p>提币</p>
            </router-link>
            <router-link to="/address">
              <img src="@/assets/img/icon/home_address.png" alt="地址" />
              <p>地址</p>
            </router-link>
          </section>
        </div>
      </div>
      <div class="manage">
        <van-cell-group class="group" :border="false">
          <van-cell title="节点数" size="large" :value="userInfo.node" />
          <van-cell title="F币" size="large" :value="userInfo.coin" is-link to="/record" />
          <van-cell title="累计产出" size="large" :value="userInfo.cumulative" />
          <van-cell title="累计奖金" size="large" :value="userInfo.bonus" is-link to="/bonus" />
        </van-cell-group>
        <van-cell-group class="group" :border="false">
          <van-cell title="登录密码" size="large" is-link to="password/login" />
          <van-cell title="安全密码" size="large" is-link to="password/security" />
        </van-cell-group>
        <button class="log-out" @click="confirmSignOut">退出</button>
      </div>
      <van-dialog v-model="showNote" :title="note.title" v-if="showNote">
        <article class="note-content" v-html="note.content"></article>
      </van-dialog>
    </div>
  </van-pull-refresh>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "home-page",
  data() {
    return {
      note: {},
      showNote: false,
      isLoading: false
    };
  },
  computed: {
    ...mapState(["cardId", "userInfo"]),
    DSTphone() {
      if (!this.userInfo.cardId) return;
      const pat = /(\d{3})\d*(\d{4})/;
      const phone = this.userInfo.phone;
      return phone.replace(pat, "$1****$2") || "";
    }
  },
  mounted() {
    this.changeTheme("home");
    this.changeNavTitle("我的");
    if (!this.userInfo.phone) this.getHomePage();
  },
  beforeDestroy() {
    this.changeTheme("defalut");
  },
  methods: {
    ...mapMutations([
      "changeTheme",
      "changeNavTitle",
      "loading",
      "setUserInfo",
      "clearUserInfo"
    ]),
    // 获取用户信息
    getHomePage() {
      let data = {
        cardno: this.cardId
      };
      this.loading("open");
      this.api
        .getHome(data)
        .then(res => {
          res = res.data.result;
          this.loading("close");
          this.isLoading = false;
          const code = Number(res.Code);
          if (code === 200) {
            const data = res.Response;
            console.log(res);
            this.note = {
              title: data.title,
              content: data.html_content
            };
            let info = {
              cardId: data.cardno,
              phone: data.mobile_phone,
              coin: data.f_coin,
              cumulative: data.sum_coin,
              bonus: data.pay_points2,
              node: data.node_nums
            };
            this.setUserInfo(info);
          } else {
            this.$notify({ type: "danger", message: res.Msg });
          }
        })
        .catch(() => {
          this.loading("close");
          this.$toast.fail("请求异常，请稍后重试！");
        });
    },
    // 登出
    confirmSignOut() {
      this.$dialog
        .confirm({
          title: "警告",
          message: "是否登出当前账户"
        })
        .then(() => {
          this.clearUserInfo();
          this.$router.push("/login");
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variables'
@import '~assets/stylus/mixins'
.van-pull-refresh
  overflow visible
.overview
  padding-bottom 25px
  position relative
  z-index 2
  &:before
    content ''
    width 120vw
    height 100vh
    background-image url('~assets/img/bg/home.png'), linear-gradient(to right top, #7550fe, #8e5bfc)
    background-position center bottom
    background-repeat no-repeat
    background-size 100%
    border-bottom-right-radius 50% 100px
    border-bottom-left-radius @border-bottom-right-radius
    display block
    position absolute
    left -10vw
    bottom 0
    transform translateY(-46px)
    z-index -1
  .notices
    width 100%
    height 25px
    line-height @height
    color white
    text-align left
    background rgba(#463588, 0.19)
    padding 0 20px
    display flex
    align-items center
    overflow hidden
    box-sizing border-box
    span
      width 100%
      font-size 13px
      padding-left 5px
      display block
      oneline()
  .container
    padding 6vh 12vw 0
  .user
    color white
    margin 25px 0
    display flex
    align-items center
    .avatar
      width 20vw
      max-width 100px
      height 20vw
      max-height 100px
      border 5px solid rgba(#F5F5F5, 0.1)
      border-radius 40%
      margin-right 15px
      overflow hidden
      flex 0 0 auto
      box-sizing border-box
      img
        width 100%
        height 100%
        background #eaeaea
        display block
    .phone
      font-size 21px
      margin-bottom 10px
    .card
      line-height 14px
      display flex
      align-items center
      &:before
        content url('~assets/img/icon/home_card.png')
        margin-right 8px
        display block
  .btn-group
    height 80px
    background white
    border-radius (@height / 2)
    box-shadow 1px 1px 14px rgba(#261956, 0.1)
    display flex
    justify-content space-around
    align-items center
    position relative
    &:before
      content ''
      width 1px
      height 50px
      background #efefef
      display block
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
    a
      width @height
      height @width
      line-height 1
      font-size 15px
      text-align center
      color #878789
      padding 15px 0
      display block
      box-sizing border-box
      img
        width @height - 50px
        height @width
        margin 0 auto 5px
        display block
      p
        margin 0
.note-content
  max-height 50vh
  word-break break-all
  padding 25px 15px
  overflow-x hidden
.manage
  padding 15px 10px
  .group
    padding 0 15px
    border-radius 10px
    margin-bottom 10px
    overflow hidden
  .log-out
    width 80%
    max-width 200px
    height 45px
    color white
    background #bfbfbf
    border 0
    border-radius (@height / 2)
    margin 25px auto 0
    display block
</style>
