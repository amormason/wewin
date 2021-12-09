// 导入api.js
import http from './http';

export const login = (params) => http.post('/login/login', params);
export const getCurrentUserInfo = () => http.post('/login/getCurrentUserInfo');
export const logout = () => http.post('/logout');
export const getFormatOptions = () => http.get('/conf/getFormatCodes');
export const getPlcTypeOptions = () => http.get('/conf/getPLCTypes');

export const getDeviceStatus = () => http.get('/status/getAllStatus');

export const getNetworkInfo = () => http.get('/conf/getNetworkInfo');
export const setNetworkInfo = (params) => http.post('/conf/setNetworkInfo', params);

export const getHsmsInfo = () => http.get('/conf/getHsmsInfo');
export const setHsmsInfo = (params) => http.post('/conf/setHsmsInfo', params);

export const findDidByName = (params) => http.post('/conf/findDidByName', params);
export const setDid = (params) => http.post('/conf/setDid', params);

export const findSvidByName = (params) => http.post('/svid/findSvidByName', params);
export const setSvid = (params) => http.post('/svid/setSvid', params);
export const delSvids = (params) => http.post('/svid/delSvids/', params);

export const findEcidByName = (params) => http.post('/ecid/findEcidByName', params);
export const setEcid = (params) => http.post('/ecid/setEcid', params);
export const delEcids = (params) => http.post('/ecid/delEcids/', params);

export const findAlarmByName = (params) => http.post('/alarm/findAlarmByName', params);
export const setAlarm = (params) => http.post('/alarm/setAlarm', params);
export const delAlarm = (params) => http.post('/alarm/delAlarms', params);

export const findRptidByName = (params) => http.post('/rptid/findRptidByName', params);
export const setRptid = (params) => http.post('/rptid/setRptid', params);
export const delRptids = (params) => http.post('/rptid/delRptids', params);

export const findCeidByName = (params) => http.post('/ceid/findCeidByName', params);
export const setCeid = (params) => http.post('/ceid/setCeid', params);
export const delCeids = (params) => http.post('/ceid/delCeids', params);

export const findCmdByName = (params) => http.post('/ceid/findCeidByName', params);
export const setCmd = (params) => http.post('/ceid/setCeid', params);
export const delCmds = (params) => http.post('/ceid/delCeids', params);

export const testPLC = () => http.get('/conf/testPLC');
export const getPlcConf = () => http.get('/conf/getPlcConf');
export const setPlcConf = (params) => http.post('/conf/setPlcConf', params);

export const setLogInfo = (params) => http.post('/conf/setLogInfo', params);
export const getLogInfo = () => http.get('/conf/getLogInfo');

export const exportCSV = (params) => http.get(params);

export const uploadFile = (url, file) => http.uploadFile(url, file);
// 上传文件
// export const uploadFile = (url, file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   const config = {
//     baseURL: '/api/', // url = base url + request url
//     withCredentials: true, // send cookies when cross-domain requests
//     timeout: 10000, // request timeout
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: store.state.token,
//     },
//   };
//   return axios.post(url, formData, config);
// };
