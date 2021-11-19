<template>
  <div class="container">
    <div class="login">
      <el-row>
        <el-col :span="24" class="login-form">
          <h1>weWin</h1>
          <div class="title">最强SECS转换器模块</div>
          <div class="placeholder">请你输入登录信息</div>
          <div @keyup.enter="login">
            <el-input class="form-input" placeholder="账号" v-model="user.mobile" prefix-icon="el-icon-user" clearable></el-input>
          </div>
          <div @keyup.enter="login">
            <el-input class="form-input" type="password" placeholder="密码" v-model="user.vcode" prefix-icon="el-icon-message" clearable></el-input>
          </div>
          <div>
            <el-button type="primary" :loading="loading" class="login-button" @click="login">登录</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="footer">
        <ul>
          <li>
            帮助
          </li>
          <li>
            隐私
          </li>
          <li>
            条款
          </li>
        </ul>
        <div class="coopyright">
          copyright @ 2022 广州快点科技出品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getCurrentUserInfo } from '@/api/request';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      user: {
        mobile: '',
        vcode: '',
      },
    };
  },
  methods: {
    login() {
      if (!this.user.mobile || !this.user.vcode) {
        this.$message.error('请输入用户名和密码后登录');
        return;
      }
      this.loading = true;
      login(this.user)
        .then((res) => {
          if (res && res.data && res.status === 200) {
            this.$store.commit('setToken', res.data.jwtToken);
            // this.$store.commit('setUser', this.user);
            this.$message({
              message: '登录成功',
              type: 'success',
            });
            getCurrentUserInfo().then((userInfo) => {
              console.log(userInfo);
            });
            setTimeout(() => {
              this.$router.push(this.$route.query.redirect || '/deviceStatus');
            }, 500);
          } else {
            this.$message.error(res.msg || '登录失败');
          }
        })
        .finally(() => {
          this.loading = false;
          // 返回状态为(resolved 或 rejected)
        });
      // setTimeout(() => {
      //   this.$store.commit('setToken', Math.random());
      //   this.$store.commit('setUser', this.user);
      //   this.loading = false;
      //   this.$message({
      //     message: '登录成功',
      //     type: 'success',
      //   });
      //   this.$router.push(this.$route.query.redirect || '/deviceStatus');
      //   // login(this.loginInfo);
      // }, 1500);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  background-color: #f1f2f6;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  background-image: url(~@/assets/bg.jpg);
  background-size: 1920px 1080px;
  .login {
    width: 368px;
    margin: 0 auto;
    text-align: center;
    .title {
      color: rgba(0, 0, 0, 0.42745098039215684);
      height: 74px;
      margin-top: 40px !important;
    }
    .placeholder {
      margin: 0 auto 20px !important;
      color: #409eff;
      border-bottom: 2px solid currentColor;
      font-weight: bold;
      width: 227px;
      line-height: 46px;
    }
    .login-form {
      h1 {
        line-height: 74px;
        margin: 0;
        font-size: 36px;
      }
      /deep/ .form-input {
        margin-bottom: 24px;
        input {
          height: 34px !important;
        }
      }
      .login-button {
        display: block;
        height: 40px;
        background-color: #218efa;
        width: 100%;
      }
    }
    .footer {
      color: rgba(0, 0, 0, 0.4470588235294118);
      font-size: 14px;
      ul {
        margin: 150px auto 10px !important;
        width: 300px;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-around;
        li {
          margin: 0;
          padding: 0;
          list-style: none;
        }
      }
    }
  }
}
</style>
