import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [{
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requireAuth: false,
      title: '登录页面',
    },
  },
  {
    path: '/deviceStatus',
    name: 'DeviceStatus',
    component: () => import('../views/DeviceStatus.vue'),
    meta: {
      requireAuth: true,
      title: '设备状态',
    },
  },
  {
    path: '/moduleNetworkConfiguration',
    name: 'ModuleNetworkConfiguration',
    component: () => import('../views/ModuleNetworkConfiguration.vue'),
    meta: {
      requireAuth: true,
      title: '模块网络',
    },
  },
  {
    path: '/uploadConfiguration',
    name: 'UploadConfiguration',
    component: () => import('../views/UploadConfiguration.vue'),
    meta: {
      requireAuth: true,
      title: '上行配置',
    },
  },
  {
    path: '/dictionaryInformation',
    name: 'DictionaryInformation',
    component: () => import('../views/DictionaryInformation.vue'),
    meta: {
      requireAuth: true,
      title: '字典信息',
    },
  },
  {
    path: '/downloadConfiguration',
    name: 'DownloadConfiguration',
    component: () => import('../views/DownloadConfiguration.vue'),
    meta: {
      requireAuth: true,
      title: '下行配置',
    },
  },
  {
    path: '/SVID',
    name: 'SVID',
    component: () => import('../views/SVID.vue'),
    meta: {
      requireAuth: true,
      title: 'SVID',
    },
  },
  {
    path: '/ECID',
    name: 'ECID',
    component: () => import('../views/ECID.vue'),
    meta: {
      requireAuth: true,
      title: 'ECID',
    },
  },
  {
    path: '/CEID',
    name: 'CEID',
    component: () => import('../views/CEID.vue'),
    meta: {
      requireAuth: true,
      title: 'CEID',
    },
  },
  {
    path: '/RPTID',
    name: 'RPTID',
    component: () => import('../views/RPTID.vue'),
    meta: {
      requireAuth: true,
      title: 'RPTID',
    },
  },
  {
    path: '/ALID',
    name: 'ALID',
    component: () => import('../views/ALID.vue'),
    meta: {
      requireAuth: true,
      title: 'ALID',
    },
  },
  {
    path: '/CMD',
    name: 'CMD',
    component: () => import('../views/CMD.vue'),
    meta: {
      requireAuth: true,
      title: 'CMD',
    },
  },
  {
    path: '/Log',
    name: 'Log',
    component: () => import('../views/Log.vue'),
    meta: {
      requireAuth: true,
      title: 'Log',
    },
  },
  {
    path: '*',
    redirect: '/deviceStatus',
    // 某些页面规定必须登录后才能查看 ，可以在router中配置meta，将需要登录的requireAuth设为true，
    meta: {
      requireAuth: true,
      title: '',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - WeWin`;
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (store.state.token || sessionStorage.getItem('token')) {
      next(); // 有token,进行request请求，后台还会验证token
    } else {
      next({
        path: '/login',
        // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else {
    next(); // 如果无需token,那么随它去吧
  }
});

export default router;
