import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cliente: localStorage.getItem('cliente') !== null ? JSON.parse(localStorage.getItem('cliente')) : {nombre: 'Sin Cliente', identificacion:'0', cupoCompra: 0},
  },
  getters: {
    cliente(state){
      return state.cliente
    },
  },
  mutations: {
    seleccionarCliente(state, payload){   
      state.cliente = payload;
    }
  },
  actions: {
    guardarCliente({commit}, payload){
      commit('seleccionarCliente', payload);
      localStorage.setItem('cliente', JSON.stringify(payload));
    }
  },
  modules: {
  }
})
