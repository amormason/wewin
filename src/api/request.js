// 导入api.js
import http from './http';

export const login = (params) => http.post('/login', params);

export const getDeviceStatus = () => http.get('/getDeviceStatus');
