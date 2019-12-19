// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// ElementUI的引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引用animate.css
import animated from "animate.css";
Vue.use(animated);

//导入axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://127.0.0.1:3000"
//引入富文本编辑器
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
Vue.use(QuillEditor)

//载入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//引入vuex,使用vuex
import store from "@/store/store";
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
