<template>
  <router-view></router-view>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "index",
  data() {
    return {
      cardId: localStorage.getItem("cardId"),
      token: localStorage.getItem("token")
    };
  },
  mounted() {
    this.changeNav("home");
    this.authentication();
  },
  methods: {
    ...mapMutations(["changeNav", "signOut"]),
    // token校验
    authentication() {
      let data = {
        cardno: this.cardId,
        token: this.token
      };
      this.api.AUTZ(data).then(res => {
        res = res.data.result;
        const code = Number(res.Code);
        if (code !== 200) {
          this.signOut();
          localStorage.removeItem("token");
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>
