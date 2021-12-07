<template>
  <div class="header-container">
    <div class="user-container">
      <ul class="status">
        <li>
          <div>连接模式</div>
          <label>{{{'passive':'Passtive','active':'Active'}[mode]}}</label>
        </li>
        <li>
           <div>TCP/IP状态</div>
          <label>{{{1:'Conned',0:'No Con'}[info.tcpStatus]}}</label>
        </li>
         <li>
           <div>Hsms状态</div>
          <label>{{{1:'Select',0:'NotSelect'}[info.hsmsStatus]}}</label>
        </li>
         <li>
           <div>Communicating1</div>
          <label>{{{0:'Disable',1:'Enable'}[info.commStatus]}}</label>
        </li>
         <li>
           <div>Communicating2</div>
          <label>{{{1:'Comm',0:'No Comm'}[info.commStatus2]}}</label>
        </li>
        <li>
           <div>Not Comm</div>
          <label>{{{0:'Wait CR Fr Host',1:'Wait Delay',2:'Wait CR'}[info.noCommStatus]}}</label>
        </li>
          <li>
           <div>Control</div>
          <label>{{{0:'OFF',1:'ON'}[info.ctrlStatus]}}</label>
        </li>
          <li>
           <div>Off-Line</div>
          <label>{{{1:'Att On',0:'Host Off',2:'Equ Off'}[info.offLineStatus]}}</label>
        </li>
          <li>
           <div>On-Line</div>
          <label>{{{0:'Local',1:'Remote'}[info.ctrlStatus]}}</label>
        </li>
      </ul>
      <div class="user-info">
        <i class="el-icon-bell"></i>
        <div @click="singOut" class="username">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          {{ user.mobile }}
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
      user: this.$store.state.user || {},
    };
  },
  props: {
    breadcrumb: String,
    title: String,
    secondTitle: String,
  },
  components: {},
  computed: {
    // user() {
    //   return this.$store.state.user || {};
    // },
    mode() {
      return this.$store.state.deviceMode || '';
    },
    info() {
      return this.$store.state.deviceInfo || '';
    },
  },
  mounted() {
    this.user = this.$store.state.user;
  },
  methods: {
    singOut() {
      this.$store.commit('singOut');
      this.$message({
        message: '您已退出登录',
        type: 'success',
      });
      clearInterval(sessionStorage.getItem('timer'));
      this.$router.push('/login');
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
      padding-right: 1rem;
      // width: 100px;
      line-height: 83px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        font-size: 150%;
        color: $info-text-color;
      }
      .username {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        .el-avatar {
          margin-left: 1rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
  .header-warpper {
    padding: 1rem 0;
    padding-bottom: 20px;
    border-bottom: 1px #80808042 solid;
    .el-breadcrumb {
      line-height: 54px;
      margin: 0 1rem;
    }
    .title {
      margin: 0 1rem;
    }
  }
}
</style>
