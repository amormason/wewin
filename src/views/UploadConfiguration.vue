<template>
  <div class="upload-configuration-container">
    <Header breadcrumb="上行配置" title="上行配置" secondTitle="配置HOST的相关信息，配置完成后，模块不会重启，但是业务系统会进行重启，5s内请暂时不要操任何。" />
    <div class="data-table">
      <el-row :gutter="100">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <h3>HSMS</h3>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="3" class="label">Host IP: </el-col>
            <el-col :span="12">
              <el-input placeholder="192.168.1.100" v-model="hsms.ip" clearable>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-input placeholder="端口" v-model="hsms.port" clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="3" class="label">Protocol: </el-col>
            <el-col :span="12">
              <!-- <el-select v-model="hsms.mode" clearable placeholder="HSMS / SECES-I" disabled>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <el-input placeholder="HSMS / SECES-I" disabled> </el-input>
            </el-col>
            <el-col :span="9">
              <el-select v-model="hsms.mode" clearable placeholder="Active / Passtive">
                <el-option v-for="item in activeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="3" class="label">DeviceID: </el-col>
            <el-col :span="12">
              <el-input placeholder="Eq1001" v-model="hsms.comId" clearable>
              </el-input>
            </el-col>
            <el-col :span="9"></el-col>
          </el-row>

          <el-row class="operation">
            <el-col :span="24">
              <el-button type="primary" size="small" icon="el-icon-check" :loading="loading" @click="setHsmsInfoHandle">提交HSMS</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <h3>Timeout</h3>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="3" class="label">T3: </el-col>
            <el-col :span="8">
              <el-input placeholder="sec" oninput="value=value.replace(/[^\d]/g,'');" v-model="hsms.t3" clearable>
              </el-input>
            </el-col>
            <el-col :span="2" class="label">&nbsp; </el-col>
            <el-col :span="3" class="label">T5: </el-col>
            <el-col :span="8">
              <el-input placeholder="sec" oninput="value=value.replace(/[^\d]/g,'');" v-model="hsms.t5" clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="3" class="label">T6: </el-col>
            <el-col :span="8">
              <el-input placeholder="sec" oninput="value=value.replace(/[^\d]/g,'');" v-model="hsms.t6" clearable>
              </el-input>
            </el-col>
            <el-col :span="2" class="label">&nbsp; </el-col>
            <el-col :span="3" class="label">T7: </el-col>
            <el-col :span="8">
              <el-input placeholder="sec" oninput="value=value.replace(/[^\d]/g,'');" v-model="hsms.t7" clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="3" class="label">T8: </el-col>
            <el-col :span="8">
              <el-input placeholder="sec" oninput="value=value.replace(/[^\d]/g,'');" v-model="hsms.t8" clearable>
              </el-input>
            </el-col>
            <el-col :span="2" class="label">&nbsp; </el-col>
            <el-col :span="3" class="label">LinkTest: </el-col>
            <el-col :span="8">
              <el-input placeholder="sec" v-model="hsms.linkTest" oninput="value=value.replace(/[^\d]/g,'');" clearable>
              </el-input>
            </el-col>
          </el-row>

          <!-- <el-row class="operation">
            <el-col :span="24">
              <el-button type="primary" size="small" :loading="loading" icon="el-icon-check">提交Timeout</el-button>
            </el-col>
          </el-row> -->
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
      },
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
    };
  },
  components: {
    Header,
  },
  methods: {
    setHsmsInfoHandle() {
      this.loading = true;
      setHsmsInfo(this.hsms)
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
.upload-configuration-container {
  .data-table {
    margin-top: 0;
    line-height: 32px;
    .el-row {
      margin: 0 0;
      .label {
        line-height: 40px;
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
