import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    size: [{
        name: "",
        item: [{
            itemname: "",
            price: ""
          },
          {
            itemname: "",
            price: ""
          }
        ]
      },

    ],
  },
  actions: {},
  mutations: {},
  getters: {}
})

export default store;
