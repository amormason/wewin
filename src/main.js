import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './util/index';
console.log(VXETable);
Vue.use(VXETable)
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global
Vue.prototype.$XModal = VXETable.modal
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')