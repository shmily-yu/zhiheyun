<template>
  <van-button
    class="verify-code"
    size="small"
    type="primary"
    round
    :disabled="wait || !ready"
    @click.prevent="handleClick"
  >
    {{ msg }}</van-button
  >
</template>

<script>
export default {
  name: "verify-code",
  props: {
    send: {
      type: Number,
      default: 0,
      required: true
    },
    ready: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      msg: "获取",
      wait: false,
      clock: 30
    };
  },
  watch: {
    send() {
      this.wait = true;
      this.countdown();
    }
  },
  methods: {
    // 触发点击
    handleClick() {
      this.$emit("click");
    },
    // 重置倒计时
    countdown() {
      this.clock = 30;
      this.msg = `已发送 ${this.clock}S`;
      this.timer = window.setInterval(() => {
        this.clock -= 1;
        this.msg = `已发送 ${this.clock}S`;
        if (this.clock <= 0) {
          clearInterval(this.timer);
          this.wait = false;
          this.msg = "重新获取";
        }
      }, 1000);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
