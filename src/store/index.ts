import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foo: {
      name: 'wolfBerry',
      phone: '18819490370',
      email: '906368017@qq.com'
    }
  },
  mutations: {},
  actions: {},
  modules: {
    user
  }
})
