import Vue from 'vue';
// import ElementUI from 'element-ui';
import {
  Button,
  Select,
  Submenu,
  Menu,
  MenuItem,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Switch,
  Popover,
  Input,
  Alert,
  Link,
  ButtonGroup,
  Option,
  Message,
} from 'element-ui';
import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import 'vxe-table/lib/style.css';
import router from './router';
import store from './store';
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import global from './util/index';

Vue.use(Button);
Vue.use(Select);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Avatar);
Vue.use(Breadcrumb);
Vue.use(Row);
Vue.use(Col);
Vue.use(Switch);
Vue.use(Popover);
Vue.use(Input);
Vue.use(BreadcrumbItem);
Vue.use(Alert);
Vue.use(Link);
Vue.use(ButtonGroup);
Vue.use(Option);
Vue.prototype.$message = Message;

VXETable.setup({
  keepSource: true,
});
// Vue.use(ElementUI);
Vue.use(VXETable);
VXETable.use(VXETablePluginElement);
Vue.config.productionTip = false;
Vue.prototype.GLOBAL = global;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
