<template>
  <div class="upload-configuration-container">
    <Header
      breadcrumb="上行配置"
      title="上行配置"
      secondTitle="配置HOST的相关信息，配置完成后，模块不会重启，但是业务系统会进行重启，5s内请暂时不要操任何。"
    />
    <div class="data-table">
      <el-row>
        <el-col :span="24">
          <h3>HSMS</h3>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="label">Host IP: </el-col>
        <el-col :span="12">
          <el-input placeholder="192.168.1.100" v-model="hsms.ip" clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="端口" v-model="hsms.prot" clearable>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="label">Protocol: </el-col>
        <el-col :span="12">
          <el-select v-model="hsms.hsms" clearable placeholder="HSMS / SECES-I">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="hsms.active"
            clearable
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
        <el-col :span="4" class="label">SECComID: </el-col>
        <el-col :span="12">
          <el-input placeholder="Eq1001" v-model="hsms.ip" clearable>
          </el-input>
        </el-col>
        <el-col :span="8"> </el-col>
      </el-row>

      <el-row class="operation">
        <el-col :span="24">
          <el-button type="primary" size="small" icon="el-icon-check"
            >提交</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>Timeout</h3>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="label">T3: </el-col>
        <el-col :span="12">
          <el-input placeholder="1" v-model="hsms.t3" clearable> </el-input>
        </el-col>
        <el-col :span="8" class="ses">(ses) </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="label">T4: </el-col>
        <el-col :span="12">
          <el-input placeholder="1" v-model="hsms.t4" clearable> </el-input>
        </el-col>
        <el-col :span="8" class="ses">(ses) </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="label">T5: </el-col>
        <el-col :span="12">
          <el-input placeholder="1" v-model="hsms.t5" clearable> </el-input>
        </el-col>
        <el-col :span="8" class="ses">(ses) </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="label">T6: </el-col>
        <el-col :span="12">
          <el-input placeholder="1" v-model="hsms.t6" clearable> </el-input>
        </el-col>
        <el-col :span="8" class="ses">(ses) </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="label">T7: </el-col>
        <el-col :span="12">
          <el-input placeholder="1" v-model="hsms.t7" clearable> </el-input>
        </el-col>
        <el-col :span="8" class="ses">(ses) </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="label">LinkTest: </el-col>
        <el-col :span="12">
          <el-input placeholder="1" v-model="hsms.linkTest" clearable>
          </el-input>
        </el-col>
        <el-col :span="8" class="ses">(ses) </el-col>
      </el-row>

      <el-row class="operation">
        <el-col :span="24">
          <el-button type="primary" size="small" icon="el-icon-check"
            >提交</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';

export default {
  name: 'UploadConfiguration',
  data() {
    return {
      hsms: {
        ip: '',
        hsms: '',
        gateway: '',
        active: '',
        LinkTest: '',
        t3: '',
        t4: '',
        t5: '',
        t6: '',
        t7: '',
        t8: '',
      },
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
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
    };
  },
  components: {
    Header,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
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
