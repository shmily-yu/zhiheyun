<template>
  <div class="verify-identidy">
    <div>
      <label class="form-label">
        手机号
        <van-field :value="phone" placeholder="请输入手机号" readonly />
      </label>
      <label class="form-label">
        验证码
        <van-field v-model="code" placeholder="请输入验证码">
          <verify-code slot="button" :send="tryCount" :ready="hasPhone" @click="getVerifyCode" />
        </van-field>
      </label>
    </div>
    <van-button
      class="btn"
      :disabled="!hasPhone||!code"
      type="primary"
      round
      @click="handleSubmit"
    >下一步</van-button>
  </div>
</template>
<script>
import { validator } from "assets/js/validator";
import verifyCode from "components/verifyCode";
export default {
  name: "verify-identidy",
  props: ["phone"],
  data() {
    return {
      code: "",
      tryCount: 0
    };
  },
  computed: {
    hasPhone() {
      return validator("phone", this.phone);
    }
  },
  components: { verifyCode },
  methods: {
    // 获取验证码
    getVerifyCode() {
      this.tryCount += 1;
      this.$emit("getCode");
    },
    // 提交验证
    handleSubmit() {
      this.$emit("verfiyCode", this.code);
    }
  }
};
</script>
<style lang="stylus" scoped>
.verify-identidy
  height 100%
  display flex
  flex-direction column
  justify-content space-between
</style>