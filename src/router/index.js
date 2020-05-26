import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
    component: () => import("views/index"),
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem("token") && localStorage.getItem("cardId")) {
    //     next();
    //   } else {
    //     next("/enter");
    //   }
    // },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("views/index/home")
      },
      {
        path: "/record",
        name: "record",
        component: () => import("views/index/record")
      },
      {
        path: "/record/:time",
        name: "record-detail",
        component: () => import("views/index/record/detail")
      },
      {
        path: "/withdraw",
        name: "withdraw",
        component: () => import("views/index/withdraw")
      },
      {
        path: "/withdraw/detail/",
        name: "withdraw-detail",
        component: () => import("views/index/withdraw/detail")
      },
      {
        path: "/address",
        name: "address",
        component: () => import("views/index/address")
      },
      {
        path: "/address/add",
        name: "address-add",
        component: () => import("views/index/address/add")
      },
      {
        path: "/password",
        name: "password",
        component: () => import("views/index/password"),
        children: [
          {
            path: "/password/login",
            name: "password-login",
            component: () => import("views/index/password/login")
          },
          {
            path: "/password/security",
            name: "password-security",
            component: () => import("views/index/password/security")
          }
        ]
      },
      {
        path: "/bonus",
        name: "bonus-list",
        component: () => import("views/index/bonus/list")
      },
      {
        path: "/bonus/:time",
        name: "bonus-detail",
        component: () => import("views/index/bonus/detail")
      }
    ]
  },
  {
    path: "/enter",
    name: "enter",
    redirect: "/login",
    component: () => import("views/enter"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("views/enter/login")
      },
      {
        path: "/signup",
        name: "signup",
        redirect: "/signup/general",
        component: () => import("views/enter/signup"),
        children: [
          {
            path: "/signup/general",
            name: "signup-general",
            component: () => import("views/enter/signup/general")
          },
          {
            path: "/signup/dealer",
            name: "signup-dealer",
            component: () => import("views/enter/signup/dealer")
          }
        ]
      }
    ]
  }
];
const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  routes
});

export default router;
