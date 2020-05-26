<template>
  <van-tabs v-model="activeTab" @change="changeTabs">
    <van-tab v-for="tab in bonusType" :key="tab.value" :title="tab.label" :name="tab.value">
      <div class="bonus-list list">
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
            :to="`/bonus/${item.time}`"
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
    </van-tab>
  </van-tabs>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bonusType from "@/assets/js/bonusType";
export default {
  name: "bonus-list",
  data() {
    return {
      bonusType,
      recordList: [],
      activeTab: 0,
      page: 1,
      load: false,
      over: false
    };
  },
  computed: {
    ...mapState(["cardId", "bounsType"])
  },
  created() {
    this.activeTab = this.bounsType;
  },
  mounted() {
    this.changeTheme("gray");
    this.changeNavTitle("累计奖金");
    this.firstLoad();
  },
  methods: {
    ...mapMutations([
      "changeTheme",
      "changeNavTitle",
      "loading",
      "setBounsType"
    ]),
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
        type: this.activeTab,
        page: this.page
      };
      this.api
        .getBonusList(data)
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
    },
    // 监听选项卡改变
    changeTabs(name) {
      this.activeTab = name;
      this.setBounsType(name);
      this.firstLoad();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/record-list'
>>>.van-tabs__line
  background #360bc7
</style>