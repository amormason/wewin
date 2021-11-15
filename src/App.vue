<template>
  <div id="app">
    <Menu />
    <div class="view-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from './views/common/Menu.vue';

export default {
  components: { Menu },
  name: 'App',
  data() {
    return {};
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('state')) {
      this.$store.replaceState({
        ...this.$store.state,
        ...JSON.parse(sessionStorage.getItem('state')),
      });
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state));
    });
  },
  // watch: {
  //   '$route.path': {
  //     handler(to, from) {
  //       console.log('to:::', to);
  //       console.log('from:::', from);
  //     },
  //     deep: true,
  //   },
  // },
  methods: {},
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    .view-container {
      flex: 1;
      min-width: 1664px;
      overflow-x: hidden;
    }
  }
  .data-table {
    margin: 1rem;
  }
}
.el-message {
  margin-top: 150px;
}
</style>
