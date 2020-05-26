<template>
  <div class="sign-up">
    <van-row class="type">
      <van-col span="12">
        <router-link to="general">普通注册</router-link>
      </van-col>
      <van-col span="12">
        <router-link to="dealer">经销商注册</router-link>
      </van-col>
    </van-row>
    <div class="box">
      <transition :name="transType">
        <router-view @getCode="getVerCode" @submit="signUp"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "sign-up",
  data() {
    return {};
  },
  computed: {
    // 切换注册方式
    transType() {
      const path = this.$route.name.split("-");
      let type = "van-slide-right";
      if (path[1] === "general") type = "van-slide-left";
      return type;
    }
  },
  mounted() {
    // 修改标题及返回按钮
    this.changeNav("signup");
    this.changeNavTitle("欢迎注册");
  },
  methods: {
    ...mapMutations(["changeNav", "changeNavTitle", "loading"]),
    // 获取注册验证码
    getVerCode(data) {
      this.api.getRegCode(data).then(res => {
        res = res.data.result;
        const code = Number(res.Code);
        if (code === 200) {
          this.$notify({ type: "success", message: res.Msg });
        } else {
          this.$notify({ type: "danger", message: res.Msg });
        }
      });
    },
    // 注册操作
    signUp(type, data) {
      this.loading("open");
      let method = type + "Reg";
      this.api[method](data)
        .then(res => {
          res = res.data.result;
          const code = Number(res.Code);
          this.loading("close");
          if (code === 200) {
            this.$notify({ type: "success", message: res.Msg });
            localStorage.setItem("cardId", data.cardno);
            this.$router.push("/login");
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
@import '~assets/stylus/variables.styl'
.sign-up
  .type
    font-size 19px
    text-align center
    a
      color #7f7f7f
      &:after
        content ''
        width 28px
        height 5px
        background $primary-color
        border-radius 3px
        margin 8px auto
        display block
        opacity 0
        transition opacity 0.3s
    .active
      color black
      position relative
      &:after
        opacity 1
.box
  position relative
  z-index 2
  >>>
    .van-slide-left-leave-active, .van-slide-right-leave-active
      position absolute
      top 0
      left 0
      z-index -1
      transition opacity 0.4s
      opacity 0
</style>
