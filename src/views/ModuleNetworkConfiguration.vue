<template>
  <div class="module-network-configuration-container">
    <Header breadcrumb="网络模块" title="模块网络配置" secondTitle="配置模块的网口IP信息，配置完成后将会重启模块。" />
    <div class="data-table">
      <el-row :gutter="100">
        <el-col :span="12">
          <el-input placeholder="192.168.1.100" v-model="net1.ip" clearable maxlength="16">
            <template slot="prepend">IPv4地址1</template>
          </el-input>
          <el-input placeholder="255.255.255.0" v-model="net1.mask" clearable maxlength="16">
            <template slot="prepend">子网掩码1</template>
          </el-input>
          <el-input placeholder="192.168.1.1" v-model="net1.gw" clearable maxlength="16">
            <template slot="prepend">网关1</template>
          </el-input>
          <el-input placeholder="114.114.114.114" v-model="net1.dns" clearable maxlength="16">
            <template slot="prepend">DNS1</template>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="192.168.1.100" v-model="net2.ip" clearable maxlength="16">
            <template slot="prepend">IPv4地址2</template>
          </el-input>
          <el-input placeholder="255.255.255.0" v-model="net2.mask" clearable maxlength="16">
            <template slot="prepend">子网掩码2</template>
          </el-input>
          <el-input placeholder="192.168.1.1" v-model="net2.gw" clearable maxlength="16">
            <template slot="prepend">网关2</template>
          </el-input>
          <el-input placeholder="114.114.114.114" v-model="net2.dns" clearable maxlength="16">
            <template slot="prepend">DNS2</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="operation">
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-check" :loading="loading" size="small" v-on:click="handleSubmit()">提交</el-button>
          <el-button icon="el-icon-close" size="small" :loading="loading" v-on:click="handleClear()">重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import { getNetworkInfo, setNetworkInfo } from '../api/request';

export default {
  name: 'ModuleNetworkConfiguration',
  data() {
    return {
      loading: false,
      net1: {
        ip: '',
        mask: '',
        gw: '255.255.0.0',
        dns: '',
      },
      net2: {
        ip: '',
        mask: '',
        gw: '255.255.0.0',
        dns: '',
      },
    };
  },
  components: {
    Header,
  },
  methods: {
    checkData() {
      if (!this.net1.ip || !this.net2.ip) {
        this.$message.error('IPv4地址1或者IPv4地址2不能为空');
        return false;
      }
      if (this.net1.ip === this.net2.ip) {
        this.$message.error('IPv4地址1和IPv4地址2不能相同');
        return false;
      }
      return true;
    },
    handleSubmit() {
      this.$loading = true;
      if (this.checkData()) {
        setNetworkInfo({
          net1: this.net1,
          net2: this.net2,
        })
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                message: res.msg || '恭喜你，这是一条成功消息',
                type: 'success',
              });
              getNetworkInfo();
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleClear() {
      this.net1 = {
        ip: '',
        mask: '',
        gw: '',
        dns: '',
      };
      this.net2 = {
        ip: '',
        mask: '',
        gw: '',
        dns: '',
      };
    },
  },
  mounted() {
    getNetworkInfo().then((res) => {
      this.net1 = res.data.net1;
      this.net2 = res.data.net2;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.module-network-configuration-container {
  .data-table {
    width: 700px;
    margin-top: 20px;
    line-height: 32px;
    .el-row {
      .el-input-group__prepend {
        width: 60px;
      }
      .el-input {
        margin: 16px;
      }
    }
    .operation {
      padding-left: 15px;
      margin-top: 50px;
    }
  }
}
</style>
