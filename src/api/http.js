import axios from 'axios';
import qs from 'qs';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: '/api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000, // request timeout
});

// 请求拦截器
instance.interceptors.request.use(
  (configP) => {
    const config = configP;
    config.headers.Authorization = store.getters.get_token;
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            window.location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    console.log(`err${error}`);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

// 按照请求类型对axios进行封装
const http = {
  get(url, data) {
    return instance.get(url, { params: data });
  },
  post(url, data) {
    return instance.post(url, qs.stringify(data));
  },
};

export default http;
