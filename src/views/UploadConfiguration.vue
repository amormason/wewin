<template>
  <div class="upload-configuration-container">
    <Header
      breadcrumb="上行配置"
      title="上行配置"
      secondTitle="配置HOST的相关信息，配置完成后，模块不会重启，但是业务系统会进行重启，5s内请暂时不要操任何。"
    />
    <div class="data-table">
      <el-row class="wapper" :gutter="100">
        <el-col :span="12">
          <el-row class="noMargin">
            <el-col :span="24">
              <h3>HSMS</h3>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3" class="label">Host IP: </el-col>
            <el-col :span="12">
              <el-input
                placeholder="请输入一个有效的IP地址"
                v-model="hsms.ip"
                clearable
                maxlength="15"
              >
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-input
                placeholder="端口"
                v-model="hsms.port"
                oninput="value=value.replace(/[^\d]/g,'');"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="3" class="label">Protocol: </el-col>
            <el-col :span="12">
              <el-input placeholder="HSMS / SECES-I" disabled> </el-input>
            </el-col>
            <el-col :span="9">
              <el-select
                v-model="hsms.mode"
                clearable
                maxlength="10"
                placeholder="Active / Passtive"
              >
                <el-option
                  v-for="item in activeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="3" class="label">DeviceID: </el-col>
            <el-col :span="12">
              <el-input
                placeholder="DeviceID"
                v-model="hsms.comId"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
            <el-col :span="9"></el-col>
          </el-row>

          <!-- <el-row class="operation">
            <el-col :span="24">
              <el-button type="primary" size="small" icon="el-icon-check" :loading="loading" @click="setHsmsInfoHandle">提交HSMS</el-button>
            </el-col>
          </el-row> -->
        </el-col>
        <el-col :span="12">
          <el-row class="noMargin">
            <el-col :span="24">
              <h3>Timeout</h3>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="3" class="label">T3: </el-col>
            <el-col :span="8">
              <el-input
                placeholder="sec"
                oninput="value=value.replace(/[^\d]/g,'');"
                v-model="hsms.t3"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
            <el-col :span="2" class="label">&nbsp; </el-col>
            <el-col :span="3" class="label">T5: </el-col>
            <el-col :span="8">
              <el-input
                placeholder="sec"
                oninput="value=value.replace(/[^\d]/g,'');"
                v-model="hsms.t5"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="3" class="label">T6: </el-col>
            <el-col :span="8">
              <el-input
                placeholder="sec"
                oninput="value=value.replace(/[^\d]/g,'');"
                v-model="hsms.t6"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
            <el-col :span="2" class="label">&nbsp; </el-col>
            <el-col :span="3" class="label">T7: </el-col>
            <el-col :span="8">
              <el-input
                placeholder="sec"
                oninput="value=value.replace(/[^\d]/g,'');"
                v-model="hsms.t7"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="3" class="label">T8: </el-col>
            <el-col :span="8">
              <el-input
                placeholder="sec"
                oninput="value=value.replace(/[^\d]/g,'');"
                v-model="hsms.t8"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
            <el-col :span="2" class="label">&nbsp; </el-col>
            <el-col :span="3" class="label">LinkTest: </el-col>
            <el-col :span="8">
              <el-input
                placeholder="sec"
                v-model="hsms.linkTest"
                oninput="value=value.replace(/[^\d]/g,'');"
                clearable
                maxlength="10"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="100" class="plc">
        <el-col :span="15">
          <el-row>
            <el-col :span="24">
              <h3>Status PLC Addr</h3>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6" class="label">Disabled/Enabled切换: </el-col>
            <el-col :span="6">
              <el-input
                placeholder="CommStatus1 Ctrl Addr"
                v-model="hsms.commStatus1Addr"
                clearable
                maxlength="15"
              >
              </el-input>
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="hsms.commStatus1Type"
                clearable
                maxlength="10"
                placeholder="Active / Passtive"
              >
                <el-option
                  v-for="(value, name) in plcTypeOptions"
                  :key="value"
                  :value="name"
                  :label="value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6" class="label">Offline触发: </el-col>
            <el-col :span="6">
              <el-input
                placeholder="Wait For Host or Equ Ctrl Addr"
                v-model="hsms.waitForHEAddr"
                clearable
                maxlength="15"
              >
              </el-input>
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="hsms.waitForHEType"
                clearable
                maxlength="10"
                placeholder="Active / Passtive"
              >
                <el-option
                  v-for="(value, name) in plcTypeOptions"
                  :key="value"
                  :value="name"
                  :label="value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6" class="label">Online触发: </el-col>
            <el-col :span="6">
              <el-input
                placeholder="Wait For Host or Equ Ctrl Addr"
                v-model="hsms.attOrEquAddr"
                clearable
                maxlength="15"
              >
              </el-input>
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="hsms.attOrEquType"
                clearable
                maxlength="10"
                placeholder="Active / Passtive"
              >
                <el-option
                  v-for="(value, name) in plcTypeOptions"
                  :key="value"
                  :value="name"
                  :label="value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6" class="label">Local/Remote触发: </el-col>
            <el-col :span="6">
              <el-input
                placeholder="Wait For Host or Equ Ctrl Addr"
                v-model="hsms.localRemoteAddr"
                clearable
                maxlength="15"
              >
              </el-input>
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="hsms.localRemoteType"
                clearable
                maxlength="10"
                placeholder="Active / Passtive"
              >
                <el-option
                  v-for="(value, name) in plcTypeOptions"
                  :key="value"
                  :value="name"
                  :label="value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6" class="label">默认offline状态: </el-col>
            <el-col :span="6">
              <el-select
                v-model="hsms.defOffLineModel"
                clearable
                maxlength="10"
                placeholder="默认offline状态"
              >
                <el-option
                  v-for="item in defOffLineModelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6" class="label">默认Local/Remote状态: </el-col>
            <el-col :span="6">
              <el-select
                v-model="hsms.defCtrlModel"
                clearable
                maxlength="10"
                placeholder="默认Local/Remote状态"
              >
                <el-option
                  v-for="item in defCtrlModelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row class="operation">
            <el-col :span="24">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-check"
                :loading="loading"
                @click="setHsmsInfoHandle"
                >提交HSMS</el-button
              >
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import { getHsmsInfo, setHsmsInfo } from '@/api/request';

export default {
  name: 'UploadConfiguration',
  data() {
    return {
      loading: false,
      hsms: {
        ip: '',
        port: '',
        gateway: '',
        mode: '',
        linkTest: '',
        comId: '',
        protocol: 'HSMS / SECES-I',
        t3: '',
        t5: '',
        t6: '',
        t7: '',
        t8: '',
        commStatus1Type: '',
        waitForHEAddr: '',
        attOrEquType: '',
        localRemoteType: '',
        defCtrlModel: '',
        defOffLineModel: '',
      },
      plcTypeOptions: this.$store.state.plcTypeOptions || {},
      activeOptions: [
        {
          value: 'active',
          label: 'Active',
        },
        {
          value: 'passive',
          label: 'Passtive',
        },
      ],
      options: [
        {
          value: 'HSMS / SECES-I',
          label: 'HSMS / SECES-I',
        },
      ],
      defOffLineModelOptions: [
        {
          value: 1,
          label: 'Attempt ON-LINE',
        },
        {
          value: 0,
          label: 'Equipment OFF-LINE',
        },
        {
          value: 2,
          label: 'Host OFF-LINE',
        },
      ],
      defCtrlModelOptions: [
        {
          value: 0,
          label: 'LOCAL',
        },
        {
          value: 1,
          label: 'REMOTE',
        },
      ],
    };
  },
  components: {
    Header,
  },
  methods: {
    checkData() {
      if (!this.GLOBAL.isValidIP(this.hsms.ip)) {
        this.$message.error('请输入一个有效的IP地址');
        return false;
      }
      if (!this.hsms.port) {
        this.$message.error('端口不能为空');
        return false;
      }
      if (!this.hsms.comId) {
        this.$message.error('DeviceID不能为空');
        return false;
      }
      if (!this.hsms.t3) {
        this.$message.error('T3不能为空');
        return false;
      }
      if (!this.hsms.t5) {
        this.$message.error('T5不能为空');
        return false;
      }
      if (!this.hsms.t6) {
        this.$message.error('T6不能为空');
        return false;
      }
      if (!this.hsms.t7) {
        this.$message.error('T7不能为空');
        return false;
      }
      if (!this.hsms.t8) {
        this.$message.error('T8不能为空');
        return false;
      }
      if (!this.hsms.linkTest) {
        this.$message.error('LinkTest不能为空');
        return false;
      }
      return true;
    },
    setHsmsInfoHandle() {
      const hsms = JSON.parse(JSON.stringify(this.hsms));
      const numberArray = ['port', 'linkTest', 't3', 't5', 't6', 't7', 't8'];
      Object.keys(hsms).forEach((key) => {
        if (numberArray.includes(key)) {
          hsms[key] = Number.parseInt(hsms[key], 10);
        }
      });
      if (this.checkData()) {
        this.loading = true;
        setHsmsInfo(hsms)
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                message: res.msg || '恭喜你，这是一条成功消息',
                type: 'success',
              });
              getHsmsInfo();
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleClear() {
      this.hsmsInfo = {
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
  mounted() {
    getHsmsInfo().then((res) => {
      console.log(res.data);
      this.hsms = res.data;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wapper {
  margin-top: 0 !important;
}
.noMargin {
  margin: 0 !important;
}
.upload-configuration-container {
  h3 {
    margin-bottom: 0;
  }
  .data-table {
    margin: 0 1rem;
    line-height: 32px;
    .el-row {
      margin: 1rem 0;
      .label {
        line-height: 40px;
        text-align: right;
      }
      .required::before {
        content: '*';
        color: red;
        margin-right: 5px;
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
