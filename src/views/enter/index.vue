<template>
  <div class="enter">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "enter",
  mounted() {
    this.changeTheme("enter");
  },
  methods: {
    ...mapMutations(["changeTheme"])
  }
};
</script>
<style lang="stylus" scoped>
.enter
  max-width 260px
  padding 20vh 15px 2vh
  margin 0 auto
  >>>
    .van-field
      font-size 15px
      padding 20px 16px
      &__left-icon
        margin-right 15px
        .van-icon
          font-size 20px
      &__image
        width 16px
        height 20px
      &__error-message
        line-height 1
        position absolute
        top 25px
</style>
