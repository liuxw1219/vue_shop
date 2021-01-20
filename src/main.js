import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/base.css";
import "./assets/font/iconfont.css";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
