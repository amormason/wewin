// 导入api.js
import http from './http';

export const login = (params) => http.post('login', params);

export const getDeviceStatus = () => http.get('getDeviceStatus');

export const submitModuleNetworkConfiguration = (params) => http.post('submitModuleNetworkConfiguration', params);
