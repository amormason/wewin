import Vue from 'vue';
import Vuex from 'vuex';
import storage from './storage';
import {
  getFormatOptions,
  getPlcTypeOptions,
  getDeviceStatus,
  getHsmsInfo,
} from '@/api/request';

Vue.use(Vuex);
const getDefaultState = () => ({
  token: '',
  formatOptions: {},
  plcTypeOptions: {},
  user: {
    mobile: '',
  },
  deviceInfo: {},
  deviceMode: '',
  height: {},
});

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    // 修改token，并将token存入sessionStorage
    setToken(state, token) {
      state.token = token;
      storage.set('token', token);
    },
    setHeight(state, heightObj) {
      state.height = {
        ...state.height,
        ...heightObj,
      };
      storage.set('height', state.height);
    },
    singOut(state) {
      Object.assign(state, getDefaultState());
      sessionStorage.clear();
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

    updatePlcTypeOptions(state, plcTypeOptions) {
      const ret = {};
      Object.keys(plcTypeOptions).forEach((key) => {
        ret[plcTypeOptions[key]] = key;
      });
      state.plcTypeOptions = ret;
      storage.set('plcTypeOptions', ret);
    },

    setDeviceInfo(state, data) {
      state.deviceInfo = data;
      storage.set('deviceInfo', data);
    },

    setDeviceMode(state, data) {
      state.deviceMode = data;
      storage.set('deviceMode', data);
    },

  },
  actions: {
    singOut({
      commit,
    }) {
      commit('singOut', {});
    },

    async getPlcTypeOptions({
      commit,
    }) {
      await getPlcTypeOptions().then((result) => {
        commit('updatePlcTypeOptions', result.data);
      });
    },

    async getFormatOptions({
      commit,
    }) {
      await getFormatOptions().then((result) => {
        commit('updateFormatOptions', result.data);
      });
    },

    async getDeviceStatus({
      commit,
    }) {
      await getDeviceStatus().then((result) => {
        if (result && result.data) {
          commit('setDeviceInfo', result.data || {});
        }
      });
    },

    async getHsmsInfo({
      commit,
    }) {
      await getHsmsInfo().then((result) => {
        if (result && result.data) {
          commit('setDeviceMode', result.data.mode || '');
        }
      });
    },
  },
  modules: {},
});
