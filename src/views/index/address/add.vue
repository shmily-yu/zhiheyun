<template>
  <div class="address-add wrap">
    <van-form @submit="handleSubmit">
      <div>
        <label class="address-label">
          地址
          <van-field
            v-model="address"
            placeholder="请输入地址"
            :rules="[{ required: true, message: '请填写地址!' }]"
          />
        </label>
        <label class="address-label">
          标签
          <van-field
            v-model="label"
            placeholder="请输入标签"
            :rules="[{ required: true, message: '请填写地址标签名!' }]"
          />
        </label>
      </div>
      <van-button class="btn" :disabled="!address" type="primary" round
        >保存</van-button
      >
    </van-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "address-add",
  data() {
    return {
      address: "",
      label: ""
    };
  },
  computed: {
    ...mapState(["cardId", "userInfo"])
  },
  mounted() {
    if (!this.userInfo.phone) this.$router.replace("/home"); // 如果vuex中没有用户信息则返回首页获取
    this.changeNavTitle("添加地址");
  },
  methods: {
    ...mapMutations(["changeNavTitle"]),
    // 提交新地址
    handleSubmit() {
      let data = {
        cardno: this.cardId,
        name: this.label,
        token_address: this.address
      };
      this.api.addAddress(data).then(res => {
        res = res.data.result;
        const code = Number(res.Code);
        if (code === 200) {
          this.$toast.success(res.Msg);
          const timer = window.setTimeout(() => {
            clearTimeout(timer);
            this.$router.replace("/address");
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
.address-add
  height 100%
  display flex
  flex-direction column
  justify-content space-between
.address-label
  font-size 18px
  .van-cell
    height 60px
    line-height @height
    color #333
    font-size 15px
    padding 0
    border-bottom 1px solid #eaeaea
    margin-bottom 15px
.btn
  width 90%
  max-width 220px
  margin 0 auto
  display block
</style>
