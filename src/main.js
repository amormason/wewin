import Vue from 'vue';
import ElementUI from 'element-ui';
import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import 'vxe-table/lib/style.css';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Header from './views/common/Header.vue';
import TableOperationButtons from './views/common/TableOperationButtons.vue';

VXETable.setup({
  keepSource: true,
});
Vue.use(ElementUI);
Vue.use(VXETable);
VXETable.use(VXETablePluginElement);
Vue.config.productionTip = false;
Vue.component('Header', Header);
Vue.component('TableOperationButtons', TableOperationButtons);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
