<template>
  <div class="address list">
    <div class="container">
      <div class="item" v-for="item in addressList" :key="item.id">
        <div class="info">
          <p>{{ item.token_address }}</p>
          <span class="label">{{ item.name }}</span>
        </div>
        <!-- <div class="del" @click="handleDelete(item.id)">
          <van-icon name="delete" size="20" />
        </div>-->
      </div>
    </div>
    <van-button
      class="add-btn"
      type="primary"
      round
      @click="$router.push('/address/add')"
      >新增地址</van-button
    >
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "address-list",
  data() {
    return {
      addressList: []
    };
  },
  computed: {
    ...mapState(["cardId"])
  },
  mounted() {
    this.changeTheme("gray");
    this.changeNavTitle("地址");
    this.loadData();
  },
  beforeDestroy() {
    this.changeTheme();
  },
  methods: {
    ...mapMutations(["changeTheme", "changeNavTitle"]),
    // 读取提币地址
    loadData() {
      let data = {
        cardno: this.cardId
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      this.api.getAddressList(data).then(res => {
        res = res.data.result;
        this.$toast.clear();
        const code = Number(res.Code);
        if (code === 200) {
          const list = res.Response;
          this.addressList = list;
        } else {
          this.$toast.fail(res.Msg);
        }
      });
    }
    // handleDelete(id) {
    //   console.log(id);
    // }
  }
};
</script>
<style lang="stylus" scoped>
.address
  height auto
  min-height 100%
  padding-bottom 100px
  display flex
  flex-direction column
  justify-content space-between
  .item
    background white
    padding 10px 35px 10px 30px
    border-radius 10px
    margin-bottom 15px
    display flex
    align-items center
    justify-content space-between
    p
      font-size 17px
      text-transform uppercase
      margin 10px 0
    .label
      height 20px
      line-height @height
      font-size 12px
      color #878789
      background #eaeaea
      padding 0 10px
      border-radius 2px
      display inline-block
    .del
      color #878787
      padding 10px
      margin-right -10px
      flex 0 0 auto
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
      content '暂无地址信息，添加一个吧！'
      width 100%
      text-align center
      font-size 3.5vw
      color gray
      display block
.add-btn
  width 90%
  max-width 220px
  position fixed
  left 50%
  bottom 20px
  transform translateX(-50%)
</style>
