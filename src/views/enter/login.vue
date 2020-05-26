<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/avatar.png" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-for="(item, index) in fields"
        :key="index"
        v-model="form[item.label]"
        size="large"
        :type="item.type"
        :name="item.label"
        :placeholder="item.placeholder"
        :left-icon="item.icon"
        :rules="item.rule"
      />
      <!-- <div class="forgot">
        <router-link to="/forgot">忘记密码？</router-link>
      </div>-->
      <div style="padding: 15vh 10% 0;">
        <van-button round type="primary" native-type="submit" size="large" :disabled="empty">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import { validator, hasEmpty } from "assets/js/validator";
export default {
  name: "log-in",
  data() {
    return {
      wait: false,
      fields: [
        {
          label: "card",
          type: "text",
          icon: require("@/assets/img/icon/enter_card.png"),
          placeholder: "身份证",
          rule: [
            {
              required: true,
              message: "请输入身份证号！"
            }
            // {
            //   validator: val => validator("card", val),
            //   message: "请填写正确身份证号！"
            // }
          ]
        },
        {
          label: "password",
          type: "password",
          icon: require("@/assets/img/icon/enter_pwd.png"),
          placeholder: "登陆密码",
          rule: [
            {
              required: true,
              message: "请输入密码！"
            },
            {
              validator: val => validator("length", val),
              message: "密码长度为6-18位！"
            }
          ]
        }
      ],
      form: {
        card: localStorage.getItem("cardId"), // 自动读取上一次的登陆账号
        password: ""
      }
    };
  },
  computed: {
    empty() {
      return hasEmpty(this.form);
    }
  },
  mounted() {
    this.changeNav("login");
    this.changeNavTitle("欢迎登录");
  },
  methods: {
    ...mapMutations(["changeNav", "changeNavTitle", "loading", "signIn"]),
    ...mapActions(["logIn"]),
    // 提交登陆
    onSubmit() {
      let data = {
        cardno: this.form.card,
        password: this.form.password
      };
      localStorage.setItem("cardId", data.cardno);
      this.logIn(data)
        .then(res => {
          this.$notify({ type: "success", message: res.Msg });
          this.$router.push("/home");
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail(err.Msg);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.logo
  width 70px
  height 70px
  background #EAEAEA
  padding 8px
  border-radius 50%
  margin 0 auto
  img
    width 100%
    height 100%
.forgot
  font-size 12px
  text-align right
  margin-top 5px
  a
    color #aaa
    padding 5px 10px
    display inline-block
</style>
