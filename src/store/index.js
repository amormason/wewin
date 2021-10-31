import Vue from 'vue';
import Vuex from 'vuex';
import storage from './storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: {},
    authenticated: false,
  },
  mutations: {
    // 修改token，并将token存入sessionStorage
    setToken(state, token) {
      state.token = token;
      storage.set('token', token);
    },
    delToken(state) {
      state.token = '';
      state.user = '';
      storage.remove('token');
      storage.remove('user');
      storage.remove('state');
    },
    // 可选
    setUser(state, user) {
      state.user = user;
      storage.set('user', user);
    },
  },
  actions: {},
  modules: {},
});
