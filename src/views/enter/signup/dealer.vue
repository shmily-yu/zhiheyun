<template>
  <div class="dealer">
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
      >
        <verify-code
          v-if="item.type === 'digit'"
          slot="button"
          :send="tryCount"
          :ready="hasPhone"
          @click="getVerifyCode"
        />
      </van-field>
      <div style="padding: 35px 8vw 0;">
        <van-button
          round
          type="primary"
          native-type="submit"
          size="large"
          :disabled="empty"
          :loading="loading"
          autocomplete="off"
        >注册</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { validator, hasEmpty } from "assets/js/validator";
import verifyCode from "components/verifyCode";
export default {
  name: "General",
  data() {
    return {
      loading: false,
      tryCount: 0,
      fields: [
        {
          label: "phone",
          type: "tel",
          icon: require("@/assets/img/icon/enter_phone.png"),
          placeholder: "手机号",
          rule: [
            {
              required: true,
              message: "请输入手机号！"
            },
            {
              validator: val => validator("phone", val),
              message: "请填写正确手机号！"
            }
          ]
        },
        {
          label: "card",
          type: "text",
          icon: require("@/assets/img/icon/enter_card.png"),
          placeholder: "身份证",
          rule: [
            {
              required: true,
              message: "请输入身份证！"
            },
            {
              validator: val => validator("card", val),
              message: "密码格式身份证！"
            }
          ]
        },
        {
          label: "verify",
          type: "digit",
          icon: require("@/assets/img/icon/enter_verify.png"),
          placeholder: "验证码",
          rule: [
            {
              required: true,
              message: "请输入验证码！"
            },
            {
              validator: val => validator("verify", val),
              message: "验证码格式错误！"
            }
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
              message: "请输入登陆密码！"
            },
            {
              validator: val => validator("length", val),
              message: "登陆密码长度为6-18位！"
            }
          ]
        },
        {
          label: "code",
          type: "password",
          icon: require("@/assets/img/icon/enter_code.png"),
          placeholder: "安全密码",
          rule: [
            {
              required: true,
              message: "请输入安全密码！"
            },
            {
              validator: val => validator("length", val),
              message: "安全密码长度为6-18位！"
            }
          ]
        }
      ],
      form: {
        phone: "",
        card: "",
        verify: "",
        password: "",
        code: ""
      }
    };
  },
  components: { verifyCode },
  computed: {
    empty() {
      return hasEmpty(this.form);
    },
    hasPhone() {
      return validator("phone", this.form.phone);
    }
  },
  methods: {
    // 获取验证码
    getVerifyCode() {
      let data = {
        mobile_phone: this.form.phone
      };
      this.tryCount += 1;
      this.$emit("getCode", data);
    },
    // 提交注册
    onSubmit() {
      let data = {
        mobile_phone: this.form.phone,
        cardno: this.form.card,
        code: this.form.verify,
        password: this.form.password,
        repassword: this.form.code
      };
      this.$emit("submit", "dealer", data);
    }
  }
};
</script>
