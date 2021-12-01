<template>
  <div class="upload-configuration-container">
    <Header title="下行配置" breadcrumb="下行配置" secondTitle="配置PLC的相关信息，配置完成后，模块不会重启，但是业务系统会进行重启，5s内请暂时不要操任何。" />
    <div class="data-table">
      <el-row :gutter="20">
        <el-col :span="4" class="label">PLC IP:</el-col>
        <el-col :span="12">
          <el-input placeholder="192.168.1.100" v-model="hsms.plcCommAddr" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="端口" v-model="hsms.plcCommPort" clearable maxlength="5" oninput="value=value.replace(/[^\d]/g,'');"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="label">Protocol:</el-col>
        <el-col :span="12">
          <el-select v-model="hsms.prol" clearable placeholder="HSMS / SECES-I">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="operation">
        <el-col :span="24">
          <el-button type="primary" size="small" icon="el-icon-check" @click="saveHandle()" :disabled="loading" :loading="loading" :closable="true">提交</el-button>
          <el-button type="warning" size="small" icon="el-icon-s-claim" @click="handldTest()" :disabled="loading" :loading="loading">测试</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-alert v-if="res.success === true" :title="res.msg" type="success" effect="dark"></el-alert>
        </el-col>

        <el-alert v-if="res.success === false" :title="res.msg" type="error" effect="dark"></el-alert>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import { getPlcConf, setPlcConf, testPLC } from '@/api/request';

export default {
  name: 'DownloadConfiguration',
  data() {
    return {
      loading: false,
      hsms: {
        plcCommAddr: '',
        plcCommPort: '',
        prol: 'mc',
      },
      res: {},
      activeOptions: [
        {
          value: '1',
          label: 'Active',
        },
        {
          value: '0',
          label: 'Passtive',
        },
      ],
      options: [
        {
          value: 'mc',
          label: 'MC',
        },
        // {
        //   value: 'fsmc',
        //   label: 'FSMC',
        // },
        // {
        //   value: 'modbusRTU',
        //   label: 'ModbusRTU',
        // },
        // {
        //   value: 'modbusTCP',
        //   label: 'ModbusTCP',
        // },
        // {
        //   value: 's7',
        //   label: 'S7',
        // },
      ],
    };
  },
  components: {
    Header,
  },
  methods: {
    getData() {
      this.loading = true;
      getPlcConf()
        .then((res) => {
          if (res && res.data) {
            this.hsms = res.data;
          } else {
            this.$message.error('获取数据失败');
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    checkData() {
      if (!this.GLOBAL.isValidIP(this.hsms.plcCommAddr)) {
        this.$message.error('IPv4地址1必须是有效的IP地址');
        return false;
      }
      if (!this.hsms.plcCommPort) {
        this.$message.error('端口必须是有效的数字');
        return false;
      }
      return true;
    },
    saveHandle() {
      if (this.checkData()) {
        this.loading = true;
        setPlcConf(this.hsms)
          .then((res) => {
            if (res.status === 200) {
              this.getData();
              this.$message({
                message: res.msg || '恭喜你，这是一条成功消息',
                type: 'success',
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handldTest() {
      this.loading = true;
      this.res.success = undefined;
      testPLC()
        .then((res) => {
          this.res = {
            msg: res.data,
            success: res.status === 200,
          };
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.upload-configuration-container {
  .data-table {
    width: 700px;
    margin-top: 20px;
    line-height: 32px;
    .el-row {
      margin: 16px 0;
      .label {
        line-height: 40px;
        text-align: right;
      }
      .el-select {
        width: 100%;
      }
    }
    .operation {
      padding-left: 15px;
      margin-top: 20px;
    }
    .ses {
      color: $gray-text;
    }
  }
}
</style>
