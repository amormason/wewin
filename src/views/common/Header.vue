<template>
  <div class="header-container">
    <div class="user-container">
      <el-button type="success" class="breathe success-breathe" size="mini"
        >PLC状态正常</el-button
      >
      <el-button type="danger" class="breathe danger-breathe" size="mini"
        >数据状态异常</el-button
      >
      <el-button type="text">
        <el-link type="primary" icon="el-icon-user">{{ user.name }}</el-link>
      </el-button>
      <div class="user-name"></div>
    </div>

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
  .user-container {
    margin-bottom: 20px;
    display: flex;
    padding-bottom: 10px;
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
