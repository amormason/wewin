<template>
  <div class="login">
    <el-row>
      <el-col :span="24" class="login-form">
        <h1>weWin</h1>
        <div class="title">最强SECS转换器模块</div>
        <div class="placeholder">请你输入登录信息</div>
        <div>
          <el-input placeholder="账号" v-model="user.name" clearable></el-input>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-input
                type="password"
                placeholder="密码"
                v-model="user.password"
                clearable
              ></el-input>
            </el-col>
          </el-row>
        </div>
        <!-- <div>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-checkbox v-model="loginInfo.checked">自动登录</el-checkbox>
            </el-col>
            <el-col :span="12">&nbsp;</el-col>
            <el-col :span="6">
              <el-link>忘记密码</el-link>
            </el-col>
          </el-row>
        </div> -->
        <!-- {{ loginInfo }} -->
        <div>
          <el-button type="primary" :loading="loading" class="login-button" @click="login"
            >登录</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { login } from '@/api/request';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      user: {
        name: 'administrator',
        password: '1111',
      },
    };
  },
  methods: {
    login() {
      if (!this.user.name || !this.user.password) {
        this.$message.error('请输入用户名和密码后登录');
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.$store.commit('setToken', Math.random());
        this.$store.commit('setUser', this.user);
        this.loading = false;
        this.$message({
          message: '登录成功',
          type: 'success',
        });
        this.$router.push(this.$route.query.redirect || '/deviceStatus');
        // login(this.loginInfo);
      }, 1500);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  .title {
    color: #909399;
    margin-top: 100px !important;
  }
  .placeholder {
    margin-top: 70px !important;
    color: #409eff;
    border-bottom: 2px solid currentColor;
    padding-bottom: 20px;
    font-weight: bold;
  }
  .login-form {
    > div {
      margin: 20px 0;
    }
    .login-button {
      display: block;
      width: 100%;
    }
  }
}
</style>
