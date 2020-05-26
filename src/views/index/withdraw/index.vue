<template>
  <div class="withdraw wrap">
    <van-cell-group :border="false">
      <van-cell title="提取至" :value="selected.name||'请选择'" size="large" @click="selectCard" is-link />
      <van-cell class="withdraw-value" title="提取F币" size="large">
        <van-field
          class="withdraw-input"
          slot="default"
          v-model.number="amount"
          type="number"
          :placeholder="`可以提取余额（${balance}）`"
        />
        <i v-if="amount>0" class="withdraw-headup">{{ balance }}</i>
      </van-cell>
    </van-cell-group>
    <van-button class="btn" type="primary" :disabled="!amount" @click="confirmScyCode" round>确认提现</van-button>
    <van-action-sheet v-model="show" :actions="cardList" cancel-text="取消" @select="handleSelect" />
    <van-dialog
      v-model="submit"
      title="安全密码"
      confirmButtonText="确认提现"
      @confirm="handleSubmit"
      show-cancel-button
      :class="this.password.length>0?'':'empty'"
    >
      <input ref="pwd" class="password" type="password" v-model="password" />
    </van-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
const NOADDRESS = {
  id: 0,
  name: "还未拥有提币地址",
  disabled: true
};
export default {
  name: "withdraw",
  data() {
    return {
      cardList: [{ loading: true }],
      balance: "0.00",
      selected: {
        name: ""
      },
      amount: "",
      password: "",
      show: false,
      submit: false
    };
  },
  computed: {
    ...mapState(["cardId", "userInfo"])
  },
  watch: {
    amount(val) {
      if (val > this.balance) {
        this.amount = Number(this.balance);
      }
    }
  },
  mounted() {
    if (!this.userInfo.phone) this.$router.replace("/home");
    this.changeNavTitle("提币");
    this.loadData();
  },
  methods: {
    ...mapMutations(["changeNavTitle"]),
    // 请求数据
    loadData() {
      let data = {
        cardno: this.cardId
      };
      this.$toast.loading({
        duration: 0,
        forbidClick: true
      });
      axios
        .all([this.api.getAddressList(data), this.api.getBalance(data)])
        .then(
          axios.spread((address, balance) => {
            this.$toast.clear();
            this.setAddress(address.data.result);
            this.setDeposit(balance.data.result);
          })
        );
    },
    // 地址列表赋值
    setAddress(res) {
      const code = Number(res.Code);
      if (code === 200) {
        const data = res.Response;
        if (data.length > 0) {
          this.cardList = res.Response;
        } else {
          this.cardList = [NOADDRESS];
          this.$toast.fail("请先添加提币地址!");
        }
        this.selected = this.cardList[0];
      } else {
        this.$toast.fail(res.Msg);
      }
    },
    // 余额赋值
    setDeposit(res) {
      const code = Number(res.Code);
      if (code === 200) {
        this.balance = res.Response.f_coin;
      } else {
        this.$toast.fail(res.Msg);
      }
    },
    // 显示选择器
    selectCard() {
      this.show = true;
    },
    // 卡号选择事件
    handleSelect(action) {
      this.selected = action;
      this.show = false;
    },
    // 验证表单
    confirmScyCode() {
      if (!this.amount) {
        this.$toast.fail("请输入金额！");
        return;
      }
      if (this.amount % 1 !== 0) {
        this.$toast.fail("提取金额不能有小数");
        return;
      }
      if (!this.selected.id) {
        this.$toast.fail("请选择地址！");
        return;
      }
      this.submit = true;
      this.$nextTick(() => {
        this.$refs.pwd.focus();
      });
    },
    // 提交数据
    handleSubmit() {
      let data = {
        cardno: this.userInfo.cardId,
        passwtokenadd_idord: this.selected.id,
        amount: this.amount,
        repassword: this.password
      };
      if (!this.password) {
        this.$toast.fail("请输入密码");
        return;
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true
      });
      this.api.withDraw(data).then(res => {
        this.password = "";
        res = res.data.result;
        this.$toast.clear();
        const code = Number(res.Code);
        if (code === 200) {
          this.$toast.success(res.Msg);
          this.$router.push("/withdraw/detail");
        } else {
          this.$toast.fail(res.Msg);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.withdraw
  min-height 100%
  display flex
  flex-direction column
  justify-content space-between
  .van-cell
    padding-left 0
    padding-right 0
    &-group
      width 100%
    &__value
      flex 0 0 auto
    span
      word-wrap normal
      white-space nowrap
    &:after
      left 0
.withdraw-value
  display block
.withdraw-input
  font-size 18px
  padding 20px 10px 10px
  border-bottom 1px solid #ebedf0
  display block
.withdraw-headup
  width 100%
  line-height @heihgt
  text-align right
  color #999
  font-style normal
  display block
  &:before
    content '余额：'
    display inline
.password
  width 90%
  height 40px
  line-height @height
  font-size 20px
  letter-spacing 5px
  text-align center
  padding 0 10px
  border 1px solid #eee
  margin 10px auto 30px
  display block
  box-sizing border-box
.btn
  width 90%
  max-width 220px
  margin 0 auto
  display block
.empty
  >>>.van-dialog__confirm
    pointer-events none
    color #eee
</style>
