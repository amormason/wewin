import axios from 'axios';
import {
  Message,
} from 'element-ui';
import store from '@/store';
// 创建一个 axios 实例
const service = axios.create({
  baseURL: '/api/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

const getFileNmaFromHeaders = (str) => {
  const arr = str && str.split(';');
  const filenameArr = arr && arr.filter((item) => item.includes('filename='));
  return filenameArr && filenameArr[0] && filenameArr[0].split('=')[1];
};

// 请求拦截器
service.interceptors.request.use(
  (configP) => {
    const config = configP;
    config.headers.Authorization = store.state.token;
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// 返回拦截
service.interceptors.response.use((response) => {
  const fileName = getFileNmaFromHeaders(response.headers['content-disposition']);
  if (fileName) {
    return {
      data: response.data,
      fileName,
    };
  }
  return response.data;
}, (error) => {
  Message.error(error.message || '网络请求异常，请稍后重试!' || error);
});

// 按照请求类型对axios进行封装
const http = {
  get(url, data) {
    return service.get(url, {
      params: data,
    });
  },
  post(url, data) {
    return service.post(url, data);
  },
};

export default http;
