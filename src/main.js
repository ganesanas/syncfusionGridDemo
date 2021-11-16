import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import { registerFilters } from "./filters";
registerFilters();
new Vue({
  render: (h) => h(App),
}).$mount("#app");
