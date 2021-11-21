<template>
  <div class="left-menu">
    <div class="logo-container">
      <h1>weWin</h1>
    </div>
    <el-menu :default-active="defaultActive" :default-openeds="openeds" class="el-menu-vertical" @open="handleOpen" @close="handleClose" text-color="white" background-color="rgba(0, 21, 41, 1)" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-odometer"></i>
          <span>首页</span>
        </template>
        <!-- <el-menu-item index="login">登录</el-menu-item> -->
        <el-menu-item index="deviceStatus">设备状态</el-menu-item>
        <!-- <el-menu-item index="1-3">草稿</el-menu-item> -->
      </el-submenu>

      <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span>架构设计图</span>
          </template>
          <el-menu-item index="2-1">系统架构图</el-menu-item>
          <el-menu-item index="2-2">逻辑单元原理</el-menu-item>
        </el-submenu> -->

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>基本配置</span>
        </template>
        <el-menu-item index="moduleNetworkConfiguration">模块网络</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>业务配置</span>
        </template>
        <el-menu-item index="uploadConfiguration">上行配置</el-menu-item>
        <el-menu-item index="downloadConfiguration">下行配置</el-menu-item>
        <el-menu-item index="dictionaryInformation">字典信息</el-menu-item>
        <el-menu-item index="ECID">ECID</el-menu-item>
        <el-menu-item index="SVID">SVID</el-menu-item>
        <el-menu-item index="CEID">CEID</el-menu-item>
        <el-menu-item index="RPTID">RPTID</el-menu-item>
        <el-menu-item index="ALID">ALID</el-menu-item>
        <el-menu-item index="Log">Log</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      openeds: ['1', '2', '3', '4'],
      defaultActive: '',
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
  mounted() {
    // console.log(`/${window.location.href.split('/')[4]}`);
    this.defaultActive = `/${window.location.href.split('/')[4]}`;
  },
};
</script>

<style  lang="scss">
.left-menu {
  background-color: rgba(0, 21, 41, 1);
  width: 256px;
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
  .el-menu {
    border-right: none;
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      background-color: #333333 !important;
      &.is-active {
        background-color: rgba(24, 144, 255, 1) !important;
        color: white !important;
      }
    }
    .el-submenu__title {
      padding-left: 10px !important;
    }
    .el-menu-item {
      padding-left: 45px !important;
    }
    .el-submenu__icon-arrow {
      font-size: 21px;
    }
    .menuitem {
      background-color: red !important;
    }
  }
}
</style>
