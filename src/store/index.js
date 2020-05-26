import Vue from "vue";
import Vuex from "vuex";
import API from "../api/index";
import navinfo from "./navinfo";
Vue.use(Vuex);
const api = new API();

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    cardId: localStorage.getItem("cardId"),
    loading: false,
    theme: "login",
    bounsType: 0,
    headerBar: {
      title: "",
      left: {
        note: "",
        method: "toSignUp",
        arrow: false
      }
    },
    userInfo: {
      cardId: "",
      phone: "",
      coin: "",
      cumulative: "",
      node: ""
    }
  },
  mutations: {
    // 全屏加载状态
    loading(state, operate) {
      if (operate === "close") state.loading = false;
      if (operate === "open") state.loading = true;
    },
    // 皮肤切换
    changeTheme(state, theme) {
      let temp = "default ";
      if (theme === "enter") temp += "enter";
      if (theme === "home") temp += "home gray";
      if (theme === "gray") temp += "gray";
      state.theme = temp;
    },
    // 导航模式切换
    changeNav({ headerBar }, method = false) {
      if (method) {
        let info = { ...navinfo[method] };
        headerBar.left = info;
      }
    },
    // 导航标题
    changeNavTitle({ headerBar }, str = "智合云") {
      headerBar.title = str;
    },
    // 设置缓存
    setLocalStorage(state, info) {
      state.cardId = info.cardno;
      localStorage.setItem("cardId", info.cardno);
      localStorage.setItem("token", info.token);
      console.log("cardId", localStorage.getItem("cardId"));
      console.log("token", localStorage.getItem("token"));
    },
    // 设置用户信息
    setUserInfo(state, info) {
      state.isLogin = true;
      state.userInfo = info;
    },
    // 清空用户信息
    clearUserInfo(state) {
      state.isLogin = false;
      state.token = "";
      localStorage.removeItem("token");
      state.cardId = "";
      state.userInfo = {
        cardId: "",
        phone: "",
        coin: "",
        cumulative: "",
        node: ""
      };
    },
    // 设置奖金类型
    setBounsType(state, type) {
      state.bounsType = type === 0 ? 0 : 1;
    }
  },
  actions: {
    // 登录用户
    logIn({ commit }, data) {
      commit("loading", "open");
      return new Promise((resolve, reject) => {
        api
          .login(data)
          .then(res => {
            commit("loading", "close");
            res = res.data.result;
            const code = Number(res.Code);
            if (code === 200) {
              // 设置本地缓存
              commit("setLocalStorage", res.Response);
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch(err => reject(err));
      });
    }
  }
});
