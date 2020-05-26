<template>
  <div class="detail list">
    <div class="container">
      <van-list
        v-model="load"
        v-if="recordList.length > 0"
        :finished="over"
        finished-text="没有更多了"
        @load="loadData"
      >
        <div class="record" v-for="(record, index) in recordList" :key="index">
          <div class="title">{{ record.change_time }}</div>
          <div class="detail">
            <div class="note">
              合同编号
              <span>{{ record.ht_order_sn }}</span>
            </div>
            <div class="note">
              收入
              <span class="amount">{{ record.user_money1 }}币</span>
            </div>
            <div class="note">
              节点数
              <span>{{ record.node_nums }}</span>
            </div>
            <div class="note">
              备注
              <span>{{ record.change_desc }}</span>
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
  name: "record-detail",
  data() {
    return {
      recordList: [],
      page: 1,
      load: false,
      over: false
    };
  },
  computed: {
    ...mapState(["cardId"]),
    time() {
      return this.$route.params.time;
    }
  },
  mounted() {
    this.changeTheme("gray");
    this.changeNavTitle("F币");
    this.firstLoad();
  },
  beforeDestroy() {
    this.changeTheme();
  },
  methods: {
    ...mapMutations(["changeTheme", "changeNavTitle", "loading"]),
    // 首屏内容加载
    firstLoad() {
      this.loading("open");
      this.recordList = [];
      this.page = 1;
      this.loadData();
    },
    // 请求数据
    loadData() {
      let data = {
        cardno: this.cardId,
        day: this.time,
        page: this.page
      };
      this.api
        .getLogDetail(data)
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
@import '~assets/stylus/record-detail'
</style>
