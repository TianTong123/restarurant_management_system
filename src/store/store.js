import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      userName: "",
      account: "",
      uid: "",
      id: "",
    },//当前登陆人信息
    token: "",
  },

  mutations: {
    
  }
});
  
export default store;