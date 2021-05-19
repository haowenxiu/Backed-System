import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyLoad from "vue-lazyload";
import Api from "network/api";

import "element-ui/lib/theme-chalk/index.css";
import ElementUi from "element-ui";
Vue.use(VueLazyLoad);

Vue.use(ElementUi);

Vue.config.productionTip = false;
Vue.prototype.$api = Api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
