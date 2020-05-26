<template>
  <van-form class="password-login" @submit="handleSubmit">
    <div>
      <h2 class="form-title">请重新编辑您的密码</h2>
      <label class="form-label">
        密码
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
          :rules="rule.pwd"
        />
      </label>
      <label class="form-label">
        确认密码
        <van-field
          v-model="repwd"
          type="password"
          placeholder="请输入再次输入密码"
          :rules="rule.repwd"
        />
      </label>
    </div>
    <van-button class="btn" :disabled="!password || !repwd" type="primary" round
      >确认修改</van-button
    >
  </van-form>
</template>
<script>
import { validator } from "@/assets/js/validator";
import { mapState } from "vuex";
export default {
  name: "password-login",
  props: ["code"],
  data() {
    return {
      password: "",
      repwd: "",
      rule: {
        pwd: [
          { required: true, message: "请填写新密码！" },

          {
            validator: val => validator("length", val),
            message: "新密码长度为6-18位!"
          }
        ],
        repwd: [
          { required: true, message: "请填再次输入密码！" },
          {
            validator: val => this.confirmPwd(val),
            message: "两次输入的密码不一样!"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["cardId"])
  },
  methods: {
    // 确认两次密码是否一致
    confirmPwd(val) {
      return val === this.password ? true : false;
    },
    // 提交修改
    handleSubmit() {
      let data = {
        cardno: this.cardId,
        password: this.password,
        code: this.code
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      this.api.changePwd(data).then(res => {
        res = res.data.result;
        const code = Number(res.Code);
        if (code === 200) {
          this.$toast.success(res.Msg);
          const timer = window.setTimeout(() => {
            clearTimeout(timer);
            this.$router.replace("/home");
          }, 1000);
        } else {
          this.$toast.fail(res.Msg);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.password-login
  height 100%
  display flex
  flex-direction column
  justify-content space-between
</style>
