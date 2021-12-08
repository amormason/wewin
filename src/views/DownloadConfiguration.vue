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

      <el-row :gutter="20">
        <el-col :span="4" class="label">时间:</el-col>
        <el-col :span="5">
          <el-select v-model="hsms.temp_plcTimeAddr1" @change="hsms.plcTimeAddr = hsms.temp_plcTimeAddr1 +hsms.temp_plcTimeAddr2">
            <el-option v-for="item in plcAddrOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input type="text" v-model="hsms.temp_plcTimeAddr2" class="vxe-default-input" @change="hsms.plcTimeAddr = hsms.temp_plcTimeAddr1 +hsms.temp_plcTimeAddr2" />
        </el-col>
        <el-col :span="6">
          <el-select v-model="hsms.plcTimeValue">
            <el-option v-for="(value, name) in plcTypeOptions" :key="value" :value="name" :label="value"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="label">TID:</el-col>
        <el-col :span="5">
          <el-select v-model="hsms.temp_plcTidAddr1" @change="hsms.plcTidAddr = hsms.temp_plcTidAddr1 +hsms.temp_plcTidAddr2">
            <el-option v-for="item in plcAddrOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input type="text" v-model="hsms.temp_plcTidAddr2" class="vxe-default-input" @change="hsms.plcTidAddr = hsms.temp_plcTidAddr1 +hsms.temp_plcTidAddr2" />
        </el-col>
        <el-col :span="6">
          <el-select v-model="hsms.plcTidValue">
            <el-option v-for="(value, name) in plcTypeOptions" :key="value" :value="name" :label="value"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="label">TEXT:</el-col>
        <el-col :span="5">
          <el-select v-model="hsms.temp_plcTextAddr1" @change="hsms.plcTextAddr = hsms.temp_plcTextAddr1 +hsms.temp_plcTextAddr2">
            <el-option v-for="item in plcAddrOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input type="text" v-model="hsms.temp_plcTextAddr2" class="vxe-default-input" @change="hsms.plcTextAddr = hsms.temp_plcTextAddr1 +hsms.temp_plcTextAddr2" />
        </el-col>
        <el-col :span="6">
          <el-select v-model="hsms.plcTextValue">
            <el-option v-for="(value, name) in plcTypeOptions" :key="value" :value="name" :label="value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="operation">
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-check" @click="saveHandle()" :disabled="loading" :loading="loading" :closable="true">提交</el-button>
          <el-button type="warning" icon="el-icon-s-claim" @click="handldTest()" :disabled="loading" :loading="loading">测试</el-button>
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
      plcTypeOptions: this.$store.state.plcTypeOptions || {},
      plcAddrOptions: this.GLOBAL.getPlcAddrOptions() || [],
      hsms: {
        plcCommAddr: '',
        plcCommPort: '',
        plcTimeAddr: '',
        plcTimeType: '',
        plcTidAddr: '',
        plcTidType: '',
        plcTextAddr: '',
        plcTextType: '',
        temp_plcTextAddr1: '',
        temp_plcTextAddr2: '',
        temp_plcTidAddr1: '',
        temp_plcTidAddr2: '',
        temp_plcTimeAddr1: '',
        temp_plcTimeAddr2: '',
        prol: 'mc',
      },
      res: {},
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
            const data = res && res.data;
            const plcData = {};
            if (data.plcTimeAddr) {
              const { plcname, plcvalue } = this.GLOBAL.getPLC(
                data.plcTimeAddr,
              );
              plcData.temp_plcTimeAddr1 = plcname;
              plcData.temp_plcTimeAddr2 = plcvalue;
            }
            if (data.plcTidAddr) {
              const { plcname, plcvalue } = this.GLOBAL.getPLC(data.plcTidAddr);
              plcData.temp_plcTidAddr1 = plcname;
              plcData.temp_plcTidAddr2 = plcvalue;
            }
            if (data.plcTextAddr) {
              const { plcname, plcvalue } = this.GLOBAL.getPLC(
                data.plcTextAddr,
              );
              plcData.temp_plcTextAddr1 = plcname;
              plcData.temp_plcTextAddr2 = plcvalue;
            }
            this.hsms = {
              ...data,
              ...plcData,
            };
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
        this.$message.error('PLC IP必须是有效的IP地址');
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
        const data = {};
        const hsms = JSON.parse(JSON.stringify(this.hsms));
        console.log(JSON.stringify(hsms, null, 4));
        Object.keys(hsms).forEach((key) => {
          if (!key.startsWith('temp_')) {
            data[key] = hsms[key];
          }
        });
        console.log(data);
        setPlcConf(data)
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
