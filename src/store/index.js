import Vue from 'vue'
import Vuex from 'vuex'
import gptVuex from './modules/gptVuex'
import ownerVuex from './modules/ownerVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    gptVuex,
    ownerVuex
  }
})
