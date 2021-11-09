// 导入api.js
import http from './http';

export const login = (params) => http.post('/login/login', params);
export const getCurrentUserInfo = () => http.post('/login/getCurrentUserInfo');
export const logout = () => http.post('/logout');

export const getDeviceStatus = () => http.post('/status/getAllStatus');

export const getNetworkInfo = () => http.post('/conf/getNetworkInfo');
export const setNetworkInfo = (params) => http.post('/conf/setNetworkInfo', params);

export const getHsmsInfo = () => http.get('/conf/getHsmsInfo');
export const setHsmsInfo = (params) => http.post('/conf/setHsmsInfo', params);

export const findDidByName = (params) => http.post('/conf/findDidByName', params);

export const findSvidByName = (params) => http.post('/svid/findSvidByName', params);
export const setSvid = (params) => http.post('/svid/setSvid', params);

export const findEcidByName = (params) => http.post('/ecid/findEcidByName', params);
export const setEcid = (params) => http.post('/ecid/setEcid', params);

export const getPlcConf = () => http.get('/conf/getPlcConf');
export const setPlcConf = (params) => http.post('/conf/setPlcConf', params);
