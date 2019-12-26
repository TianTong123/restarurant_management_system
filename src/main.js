import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./store/store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from "@/server/api.js";


Vue.config.productionTip = false;
Vue.prototype.$http = api;
Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
