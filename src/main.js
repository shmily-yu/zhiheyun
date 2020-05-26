import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API from "./api";
import {
  NavBar,
  Row,
  Col,
  Form,
  Field,
  Button,
  Cell,
  CellGroup,
  Icon,
  ActionSheet,
  Notify,
  Overlay,
  Loading,
  Toast,
  Dialog,
  PullRefresh,
  List,
  Tab,
  Tabs
} from "vant";

import "normalize.css";
import "vant/lib/row/style/less";
import "vant/lib/col/style/less";
import "vant/lib/nav-bar/style/less";
import "vant/lib/field/style/less";
import "vant/lib/form/style/less";
import "vant/lib/button/style/less";
import "vant/lib/cell/style/less";
import "vant/lib/cell-group/style/less";
import "vant/lib/icon/style/less";
import "vant/lib/action-sheet/style/less";
import "vant/lib/notify/style/less";
import "vant/lib/overlay/style/less";
import "vant/lib/loading/style/less";
import "vant/lib/toast/style/less";
import "vant/lib/dialog/style/less";
import "vant/lib/pull-refresh/style/less";
import "vant/lib/list/style/less";
import "vant/lib/tab/style/less";
import "vant/lib/tabs/style/less";

Vue.use(NavBar)
  .use(Row)
  .use(Col)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(ActionSheet)
  .use(Notify)
  .use(Overlay)
  .use(Loading)
  .use(Toast)
  .use(Dialog)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs);

Vue.prototype.api = new API();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
