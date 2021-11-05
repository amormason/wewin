<template>
  <div class="header-container">
    <div class="user-container">
      <ul class="status">
        <li>
          <div class="status-item success-status" v-if="status1">
            <i class="iconfont icon-connection"></i>Connected
          </div>
          <div class="status-item danger-status" v-if="!status1">
            <i class="iconfont icon-disconnect"></i>Not Connected
          </div>
          <div @click="status1=!status1">TCP/IP通讯状态</div>
        </li>
        <li>
          <div class="status-item success-status" v-if="status2">
            <i class="iconfont icon-duoxuanxuanzhong"></i>SELECTED
          </div>
          <div class="status-item danger-status" v-if="!status2">
            <i class="iconfont icon-duoxuanweixuanzhong"></i>NOT SELECTED
          </div>
          <div @click="status2=!status2">HSMS通讯状态</div>
        </li>
        <li>
          <div class="status-item success-status" v-if="status3">
            <i class="iconfont icon-gps-location-symbol"></i>DISABLED
          </div>
          <div class="status-item danger-status" v-if="!status3">
            <i class="iconfont icon-gps-location-disabled"></i>ENABLED
          </div>
          <div @click="status3=!status3">COMMUNICATING状态1</div>
        </li>
        <li>
          <div class="status-item success-status" v-if="status4">
            <i class="iconfont icon-communitygreen"></i>COMMUNICATING
          </div>
          <div class="status-item danger-status" v-if="!status4">
            <i class="iconfont icon-disconnect"></i>NOT COMMUNICATING
          </div>
          <div @click="status4=!status4">COMMUNICATING状态2</div>
        </li>
        <li>
          <div class="status-item danger-status" v-if="status2">
            <i class="iconfont icon-Wifi-Delay"></i>WAIT CR FROM HOST
          </div>
          <!-- <div class="status-item danger-status" v-if="!status2">
          <i class="iconfont icon-Wifi-Delay"></i>WAIT DELAY
        </div> -->
          <div class="status-item danger-status" v-if="!status2">
            <i class="iconfont icon-Wifi-Delay"></i>WAIT CRA
          </div>
          <div>NOT COMMUNICATING子状态</div>
        </li>
        <li>
          <div class="status-item success-status" v-if="status6">
            <i class="iconfont icon-communitygreen"></i>ON-LINE
          </div>
          <div class="status-item danger-status" v-if="!status6">
            <i class="iconfont icon-offline"></i>OFF-LINE
          </div>
          <div @click="status6=!status6">CONTROL状态</div>
        </li>
        <li>
          <div class="status-item success-status" v-if="status7">
            <i class="iconfont icon-lianjiezhong"></i>Attempt ON-LINE
          </div>
          <div class="status-item danger-status" v-if="!status7">
            <i class="iconfont icon-tongxunshibai"></i>Equipment OFF-LINE
          </div>
          <!-- <div class="status-item danger-status" v-if="!status2">
          <i class="iconfont icon-disconnect"></i>Host OFF-LINE
        </div> -->
          <div @click="status7=!status7">OFF-LINE子状态</div>
        </li>
        <li>
          <div class="status-item danger-status" v-if="status8">
            <i class="iconfont icon-jurassic_pc"></i>LOCAL
          </div>
          <div class="status-item success-status" v-if="!status8">
            <i class="iconfont icon-remote-control-line"></i>REMOTE
          </div>
          <div @click="status8=!status8">ON-LINE子状态</div>
        </li>
      </ul>
      <div class="user-info">
        <i class="el-icon-bell"></i>
        <div @click="singOut" class="username">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          {{ user.name }}
        </div>
      </div>
    </div>

    <div class="header-warpper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadcrumb }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">
        <h2>{{ title }}</h2>
        <div class="second-title" v-if="secondTitle">
          <i>{{ secondTitle }}</i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      status1: false,
      status2: true,
      status3: false,
      status4: true,
      status5: true,
      status6: true,
      status7: true,
      status8: true,
    };
  },
  props: {
    breadcrumb: String,
    title: String,
    secondTitle: String,
  },
  components: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    singOut() {
      this.$store.commit('delToken');
      this.$router.push('/login');
      this.$message({
        message: '您已退出登录',
        type: 'success',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header-container {
  .user-container {
    display: flex;
    height: 63px;
    align-items: center;
    border-bottom: 1px solid $gray-border-color;
    border-left: 1px solid $gray-border-color;
    .status {
      flex: 1;
      padding: 0;
      margin: 0;
      display: flex;
      font-size: 85%;
      justify-content: space-around;
      .iconfont {
        margin-right: 0.3rem;
        font-size: 120%;
        font-weight: bolder;
      }
      .success-status {
        color: $success-text-color;
      }
      .danger-status {
        color: $danger-text-color;
      }
      .warning-status {
        color: $warning-text-color;
      }
      li {
        list-style: none;
        text-align: center;
        line-height: 25px;
        .status-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .user-info {
      margin: 0 1rem 0 2rem;
      width: 200px;
      line-height: 83px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        font-size: 150%;
        color: $info-text-color;
      }
      .username {
        height: 100%;
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 0.5rem;
        }
      }
    }
  }
  .header-warpper {
    padding: 1rem;
    .el-breadcrumb {
      line-height: 54px;
    }
  }
}
</style>
