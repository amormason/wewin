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
  // 获取接口返回结果
  const res = response.data;
  // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
  if (res.code === 0) {
    return res;
  }
  if (res.code === 10000) {
    // 10000假设是未登录状态码
    Message.warning(res.message);
    // 也可使用router进行跳转
    window.location.href = '/#/login';
    return res;
  }
  // 错误显示可在service中控制，因为某些场景我们不想要展示错误
  // Message.error(res.message);
  return res;
}, (error) => {
  Message.error('网络请求异常，请稍后重试!' || error);
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
