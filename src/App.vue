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
    //  在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState({
        ...this.$store.state,
        ...JSON.parse(sessionStorage.getItem('store')),
      });
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
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
      padding: 10px;
      max-width: 1720px;
      overflow-x: hidden;
    }
  }
}
</style>
