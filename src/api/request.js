// 导入api.js
import axios from 'axios';
import store from '@/store';
import http from './http';

export const login = (params) => http.post('/login/login', params);
export const getCurrentUserInfo = () => http.post('/login/getCurrentUserInfo');
export const logout = () => http.post('/logout');

export const getDeviceStatus = () => http.get('/status/getAllStatus');

export const getNetworkInfo = () => http.get('/conf/getNetworkInfo');
export const setNetworkInfo = (params) => http.post('/conf/setNetworkInfo', params);

export const getHsmsInfo = () => http.get('/conf/getHsmsInfo');
export const setHsmsInfo = (params) => http.post('/conf/setHsmsInfo', params);

export const findDidByName = (params) => http.post('/conf/findDidByName', params);

export const findSvidByName = (params) => http.post('/svid/findSvidByName', params);
export const setSvid = (params) => http.post('/svid/setSvid', params);
export const delSvids = (params) => http.post('/svid/delSvids/', params);

export const findEcidByName = (params) => http.post('/ecid/findEcidByName', params);
export const setEcid = (params) => http.post('/ecid/setEcid', params);

export const testPLC = () => http.get('/conf/testPLC');
export const getPlcConf = () => http.get('/conf/getPlcConf');
export const setPlcConf = (params) => http.post('/conf/setPlcConf', params);

// 上传文件
export const uploadFile = (url, file) => {
  const formData = new FormData();
  formData.append('multipartFile', file);
  const config = {
    baseURL: '/api/', // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: store.state.token,
    },
  };
  return axios.post(url, formData, config);
};
