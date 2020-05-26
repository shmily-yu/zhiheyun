<template>
  <div class="record-list list">
    <van-list
      v-model="load"
      v-if="recordList.length > 0"
      :finished="over"
      finished-text="没有更多了"
      @load="loadData"
    >
      <router-link
        class="record"
        v-for="item in recordList"
        :key="item.id"
        :to="`/record/${item.time}`"
      >
        <div class="date">
          <span>
            <van-icon name="clock-o" />
            {{ item.time }}
          </span>
          <van-icon name="arrow" size="13" />
        </div>
        <div class="info">
          <span>{{ item.change_desc }}</span>
          <span class="amount">{{ item.user_money1 }}币</span>
        </div>
      </router-link>
    </van-list>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "record-list",
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
    this.changeNavTitle("F币");
    this.firstLoad();
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
        page: this.page
      };
      this.api
        .getLogList(data)
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
@import '~assets/stylus/record-list'
</style>
