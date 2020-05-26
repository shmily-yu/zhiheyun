<template>
  <div class="detail list">
    <div class="container">
      <van-list
        v-model="load"
        v-if="recordList.length>0"
        :finished="over"
        finished-text="没有更多了"
        @load="loadData"
      >
        <div class="record" v-for="(record,index) in recordList" :key="index">
          <div class="title">
            <span :class="['status',recordStatus(record.status)]">{{ record.status }}</span>
            <span class="time">{{ record.add_time }}</span>
          </div>
          <div class="content">
            <div class="note">
              提取地址
              <span>{{ record.tx_token_address }}</span>
            </div>
            <div class="note">
              提取金额
              <span class="amount">{{ record.amount }}币</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      recordList: [],
      page: 1,
      load: false,
      over: false
    };
  },
  computed: {
    ...mapState(["cardId"])
  },
  mounted() {
    this.changeTheme("gray");
    this.changeNavTitle("提币记录");
    this.firstLoad();
  },
  beforeDestroy() {
    this.changeTheme();
  },
  methods: {
    ...mapMutations(["changeNavTitle", "changeTheme", "loading"]),
    // 提现状态icon
    recordStatus(str) {
      let type = "wait";
      switch (str) {
        case "已通过":
          type = "ok";
          break;
        case "未通过":
          type = "false";
          break;
        default:
          type = "wait";
          break;
      }
      return type;
    },
    // 首屏记录
    firstLoad() {
      this.loading("open");
      this.loadData();
    },
    // 请求记录
    loadData() {
      let data = {
        cardno: this.cardId,
        page: this.page
      };
      this.api
        .withDrawResult(data)
        .then(res => {
          this.loading("close");
          res = res.data.result;
          const code = Number(res.Code);
          if (code === 200) {
            this.recordList.push(...res.Response);
            this.page += 1;
            this.load = false;
            if (res.Response.length === 0) this.over = true;
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
@import '~assets/stylus/variables'
.detail
  width 100%
  height 100%
.record
  background white
  border-radius 10px
  margin-bottom 10px
.title
  font-size 15px
  padding 25px 20px
  border-bottom 1px solid #eaeaea
  display flex
  justify-content space-between
  .status
    display flex
    align-items center
    &:before
      content ''
      width 20px
      height 20px
      background url('~assets/img/icon/status_wait.png') center no-repeat
      background-size contain
      margin-right 8px
      display block
    &.ok:before
      background-image url('~assets/img/icon/status_ok.png')
    &.false:before
      background-image url('~assets/img/icon/status_false.png')
  .time
    color #878787
.note
  padding 15px 25px
  display flex
  justify-content space-between
  span
    color #878787
  .amount
    color $primary-color
.container
  &:empty
    &:before
      content ''
      width 100%
      height 60px
      background url('~assets/img/empty.png') center no-repeat
      background-size contain
      margin 10vh 0 5vh
      display block
    &:after
      content '暂无数据信息'
      width 100%
      text-align center
      font-size 3.5vw
      color gray
      display block
</style>