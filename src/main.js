// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import DemoView from "./DemoView";
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;

const veeConfig = {
  events: "change|input"
};

Vue.use(VeeValidate, veeConfig);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { DemoView },
  template: "<DemoView/>"
});
