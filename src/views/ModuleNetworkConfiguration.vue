<template>
  <div class="module-network-configuration-container">
    <Header breadcrumb="网络模块" title="模块网络配置" secondTitle="配置模块的网口IP信息，配置完成后将会重启模块。" />
    <div class="data-table">
      <el-row class="operation">
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-check" :loading="loading" size="small" v-on:click="handleSubmit()">提交</el-button>
          <el-button icon="el-icon-refresh-right" size="small" :loading="loading" v-on:click="resetData()">重置</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="100">
        <el-col :span="12">
          <div class="demo-input-suffix">
            <label>IPv4地址1：</label>
            <el-input placeholder="IPv4地址1" v-model="net1.ip" clearable maxlength="16">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <label>子网掩码1：</label>
            <el-input placeholder="子网掩码1" v-model="net1.mask" clearable maxlength="16">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <label>网关1：</label>
            <el-input placeholder="网关1" v-model="net1.gw" clearable maxlength="16">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <label>DNS1：</label>
            <el-input placeholder="DNS1" v-model="net1.dns" clearable maxlength="16">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="demo-input-suffix">
            <label>IPv4地址2：</label>
            <el-input placeholder="IPv4地址2" v-model="net2.ip" clearable maxlength="16">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <label>子网掩码2：</label>
            <el-input placeholder="子网掩码2" v-model="net2.mask" clearable maxlength="16">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <label>网关2：</label>
            <el-input placeholder="网关2" v-model="net2.gw" clearable maxlength="16">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <label>DNS2：</label>
            <el-input placeholder="DNS2" v-model="net2.dns" clearable maxlength="16">
            </el-input>
          </div>
        </el-col>
      </el-row>

      <h3>HSMS</h3>

      <el-row :gutter="100">
        <el-col :span="12">
          <div class="demo-input-suffix">
            <label>Passive Port1：</label>
            <el-input placeholder="IPv4地址1" v-model="net1.hsmsPort" clearable maxlength="16">
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="demo-input-suffix">
            <label>Passive Port2：</label>
            <el-input placeholder="IPv4地址2" v-model="net2.hsmsPort" clearable maxlength="16">
            </el-input>
          </div>
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
      dataCopy: {},
      net1: {
        ip: '',
        mask: '',
        gw: '',
        dns: '',
      },
      net2: {
        ip: '',
        mask: '',
        gw: '',
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
    resetData() {
      const { net1, net2 } = this.dataCopy;
      this.net1 = JSON.parse(JSON.stringify(net1));
      this.net2 = JSON.parse(JSON.stringify(net2));
      console.log(JSON.stringify(this.dataCopy, null, 4));
    },
  },
  mounted() {
    getNetworkInfo().then((res) => {
      this.dataCopy = JSON.parse(JSON.stringify(res.data));
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
    width: 900px;
    margin-top: 20px;
    line-height: 32px;
    .el-row {
      .demo-input-suffix {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        label {
          width: 120px;
          text-align: right;
        }
        .el-input {
          flex: 1;
        }
      }
    }
    .operation {
      padding-left: 15px;
      margin-top: 10px;
    }
  }
}
</style>
