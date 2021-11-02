<template>
  <div class="header-container">
    <div class="user-container">
      <!-- <el-button type="success" class="breathe success-breathe" size="mini">PLC状态正常</el-button>
      <el-button type="danger" class="breathe danger-breathe" size="mini">数据状态异常</el-button> -->
      <el-button type="text" @click="singOut">
        <el-link type="primary" icon="el-icon-user">{{ user.name }}</el-link>
      </el-button>
      <div class="user-name"></div>
    </div>

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

    <el-breadcrumb separator-class="el-icon-arrow-right">
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
@-webkit-keyframes success-breathe {
  0% {
    border: 1px solid rgba(103, 194, 58, 0.7);
    background-color: rgba(103, 194, 58, 0.7);
    box-shadow: 0 1px 2px rgba(103, 194, 58, 0.4),
      0 1px 1px rgba(103, 194, 58, 0.1) inset;
  }

  100% {
    border: 1px solid rgba(103, 194, 58, 0.7);
    background-color: rgba(103, 194, 58, 1);
    box-shadow: 0 1px 10px #67c23a, 0 1px 20px #67c23a inset;
  }
}

@-webkit-keyframes danger-breathe {
  0% {
    box-shadow: 0 1px 2px rgba(245, 108, 108, 0.4),
      0 1px 1px rgba(245, 108, 108, 0.1) inset;
  }

  100% {
    border: 1px solid rgba(245, 108, 108, 0.7);
    box-shadow: 0 1px 10px #f56c6c, 0 1px 20px #f56c6c inset;
  }
}

.header-container {
  margin-bottom: 2rem;
  .user-container {
    display: flex;
    padding-right: 10px;
    border-bottom: 1px solid $gray-border-color;
    justify-content: flex-end;
    align-items: center;
    .breathe {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      -webkit-animation-timing-function: ease-in-out;
      -webkit-animation-name: success-breathe;
      -webkit-animation-duration: 1500ms;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-direction: alternate;
    }
    .success-breathe {
      -webkit-animation-name: success-breathe;
    }
    .danger-breathe {
      -webkit-animation-name: danger-breathe;
    }
  }
  .status {
    margin:  1rem 1rem 3rem;
    padding: 0;
    display: flex;
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
  .title {
    padding: 10px 0;
    border-bottom: 1px solid #e4e7ed82;
    .second-title {
      font-size: 80%;
      color: $gray-text;
    }
  }
}
</style>
