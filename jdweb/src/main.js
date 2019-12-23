// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

//引入axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios,axios);
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
