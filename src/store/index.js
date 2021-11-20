import Vue from 'vue';
import Vuex from 'vuex';
import storage from './storage';
import {
  getFormatOptions,
} from '@/api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    formatOptions: [],
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
      state.user = {};
      storage.remove('token');
      storage.remove('user');
      storage.remove('state');
    },
    // 可选
    setUser(state, user) {
      state.user = user;
      storage.set('user', user);
    },

    updateFormatOptions(state, formatOptions) {
      const ret = {};
      Object.keys(formatOptions).forEach((key) => {
        ret[formatOptions[key]] = key;
      });
      state.formatOptions = ret;
      storage.set('formatOptions', ret);
    },
  },
  actions: {
    async getFormatOptions({
      commit,
    }) {
      await getFormatOptions().then((result) => {
        commit('updateFormatOptions', result.data);
      });
    },
  },
  modules: {},
});
