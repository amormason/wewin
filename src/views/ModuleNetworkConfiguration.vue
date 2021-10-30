<template>
  <div class="module-network-configuration-container">
    <Header
      breadcrumb="网络模块"
      title="模块网络配置"
      secondTitle="配置模块的网口IP信息，配置完成后将会重启模块。"
    />
    <div class="data-table">
      <el-row :gutter="100">
        <el-col :span="12">
          <el-input
            placeholder="192.168.1.100"
            v-model="obj1.ip"
            clearable
            maxlength="16"
          >
            <template slot="prepend">IPv4地址1</template>
          </el-input>
          <el-input
            placeholder="255.255.255.0"
            v-model="obj1.subnetMask"
            clearable
            maxlength="16"
          >
            <template slot="prepend">子网掩码1</template>
          </el-input>
          <el-input
            placeholder="192.168.1.1"
            v-model="obj1.gateway"
            clearable
            maxlength="16"
          >
            <template slot="prepend">网关1</template>
          </el-input>
          <el-input
            placeholder="114.114.114.114"
            v-model="obj1.dns"
            clearable
            maxlength="16"
          >
            <template slot="prepend">DNS1</template>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input
            placeholder="192.168.1.100"
            v-model="obj2.ip"
            clearable
            maxlength="16"
          >
            <template slot="prepend">IPv4地址2</template>
          </el-input>
          <el-input
            placeholder="255.255.255.0"
            v-model="obj2.subnetMask"
            clearable
            maxlength="16"
          >
            <template slot="prepend">子网掩码2</template>
          </el-input>
          <el-input
            placeholder="192.168.1.1"
            v-model="obj2.gateway"
            clearable
            maxlength="16"
          >
            <template slot="prepend">网关2</template>
          </el-input>
          <el-input
            placeholder="114.114.114.114"
            v-model="obj2.dns"
            clearable
            maxlength="16"
          >
            <template slot="prepend">DNS2</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="operation">
        <el-col :span="24">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="small"
            v-on:click="handleSubmit()"
            >提交</el-button
          >
          <el-button
            icon="el-icon-close"
            size="small"
            v-on:click="handleClear()"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import { submitModuleNetworkConfiguration } from '../api/request';

export default {
  name: 'ModuleNetworkConfiguration',
  data() {
    return {
      obj1: {
        ip: '',
        subnetMask: '',
        gateway: '255.255.0.0',
        dns: '',
      },
      obj2: {
        ip: '',
        subnetMask: '',
        gateway: '255.255.0.0',
        dns: '',
      },
    };
  },
  components: {
    Header,
  },
  methods: {
    checkData() {
      if (!this.obj1.ip || !this.obj2.ip) {
        this.$message.error('IPv4地址1或者IPv4地址2不能为空');
        return false;
      }
      if (this.obj1.ip === this.obj2.ip) {
        this.$message.error('IPv4地址1和IPv4地址2不能相同');
        return false;
      }
      return true;
    },
    handleSubmit() {
      if (this.checkData()) {
        submitModuleNetworkConfiguration();
      }
    },
    handleClear() {
      this.obj1 = {
        ip: '',
        subnetMask: '',
        gateway: '',
        dns: '',
      };
      this.obj2 = {
        ip: '',
        subnetMask: '',
        gateway: '',
        dns: '',
      };
    },
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
