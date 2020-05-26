<template>
  <div class="password wrap">
    <verify-identidy
      v-if="!identidyPass"
      :phone="userInfo.phone"
      @getCode="getCode"
      @verfiyCode="verfiyCode"
    />
    <router-view :code="identidyCode" v-else></router-view>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import verifyIdentidy from "components/VerifyIdentidy";
export default {
  name: "password",
  data() {
    return {
      identidyPass: false,
      identidyCode: ""
    };
  },
  components: { verifyIdentidy },
  computed: {
    ...mapState(["cardId", "userInfo"]),
    type() {
      const path = this.$route.name.split("-");
      return path[1];
    }
  },
  mounted() {
    if (!this.userInfo.phone) this.$router.replace("/home");
    let str = "修改登陆密码";
    if (this.type === "security") str = "修改安全密码";
    this.changeNavTitle(str);
  },
  methods: {
    ...mapMutations(["changeNavTitle", "loading"]),
    // 获取短信验证码
    getCode() {
      let data = {
        cardno: this.cardId
      };
      this.api.getVcode(data).then(res => {
        res = res.data.result;
        const code = Number(res.Code);
        if (code === 200) {
          this.$notify({ type: "success", message: res.Msg });
        } else {
          this.$notify({ type: "danger", message: res.Msg });
        }
      });
    },
    // 核验短信验证码
    verfiyCode(vcode) {
      let data = {
        cardno: this.cardId,
        code: vcode
      };
      this.loading("open");
      this.api
        .checkVcode(data)
        .then(res => {
          this.loading("close");
          res = res.data.result;
          const code = Number(res.Code);
          if (code === 200) {
            this.identidyCode = vcode;
            this.identidyPass = "true"; // 校验成功显示显示修改界面
          } else {
            this.$toast.fail(res.Msg);
          }
        })
        .catch(() => {
          this.loading("close");
          this.$toast.fail("请求异常，请稍后重试！");
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.password
  height 100%
  >>>
    .form-title
      font-size 20px
      font-weight normal
      background url('~assets/img/icon/lock.png') center left no-repeat
      background-size auto 20px
      padding-left 28px
      margin 10px 0 35px
    .form-label
      font-size 16px
    .van-cell
      height 60px
      line-height 20px
      color #333
      font-size 15px
      padding 20px 0
      border-bottom 1px solid #eaeaea
      margin-bottom 15px
      position relative
    .van-field__error-message
      position absolute
      left 0
      top 100%
    .btn
      width 90%
      max-width 220px
      margin 0 auto
      display block
</style>
