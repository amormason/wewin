<template>
  <div class="left-menu">
    <div class="logo-container">
      <h1>weWin</h1>
    </div>
    <ul class="firstLevel">
      <li>
        <div class="title">
          首页
        </div>
        <ul class="items">
          <li>
            <router-link to="/deviceStatus">设备状态</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="firstLevel">
      <li>
        <div class="title">
          基本配置
        </div>
        <ul class="items">
          <li>
            <router-link to="/moduleNetworkConfiguration">模块网络</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="firstLevel">
      <li>
        <div class="title">
          业务配置
        </div>
        <ul class="items">
          <li>
            <router-link to="/uploadConfiguration">上行配置</router-link>
          </li>
          <li>
            <router-link to="/downloadConfiguration">下行配置</router-link>
          </li>
          <li>
            <router-link to="/dictionaryInformation">字典信息</router-link>
          </li>
          <li>
            <router-link to="/SVID">SVID</router-link>
          </li>
          <li>
            <router-link to="/ECID">ECID</router-link>
          </li>
          <li>
            <router-link to="/CEID">CEID</router-link>
          </li>
          <li>
            <router-link to="/RPTID">RPTID</router-link>
          </li>
          <li>
            <router-link to="/ALID">ALID</router-link>
          </li>
          <li>
            <router-link to="/CMD">CMD</router-link>
          </li>
          <li>
            <router-link to="/Log">Log</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      routes: this.$router.options.routes,
      defaultActive: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {},
};
</script>

<style  lang="scss" scoped>
.left-menu {
  background-color: rgba(0, 21, 41, 1);
  min-width: 256px;
  .logo-container {
    background-color: white;
    text-align: center;
    border-bottom: 1px solid #fff;
    line-height: 62px;
    box-sizing: border-box;
    h1 {
      margin: 0;
    }
  }
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    a {
      color: white;
      text-decoration: none;
    }
  }
  .items {
    li {
      margin: 1rem 0;
      padding-left: 3rem;
    }
  }
  .firstLevel {
    margin: 1rem 0 2rem;
    li {
      padding-left: 2rem;
      color: white;
    }
  }
}
</style>
