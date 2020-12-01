import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Notifications from "vue-notification";
import Clipboard from "v-clipboard";
import "./scss/main.scss";
import "./plugins/baseURL";
import "./plugins/globalVars";
import "./plugins/directives";
import { makeServer } from "./mock/server";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

Vue.config.productionTip = false;
Vue.use(Clipboard);
Vue.use(Notifications);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
