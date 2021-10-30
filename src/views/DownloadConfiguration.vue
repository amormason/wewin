<template>
  <div class="upload-configuration-container">
    <Header
      breadcrumb="下行配置"
      title="下行配置"
      secondTitle="配置PLC的相关信息，配置完成后，模块不会重启，但是业务系统会进行重启，5s内请暂时不要操任何。"
    />
    <div class="data-table">
      <el-row :gutter="20">
        <el-col :span="4" class="label">PLC IP: </el-col>
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
        <!-- <el-col :span="6">
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
        </el-col> -->
      </el-row>

      <el-row class="operation">
        <el-col :span="24">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-check"
            :disabled="loading"
            :loading="loading"
            :closable="true"
            >提交</el-button
          >
          <el-button
            type="warning"
            size="small"
            icon="el-icon-s-claim"
            @click="handldTest()"
            :disabled="loading"
            :loading="loading"
            >测试</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-alert
            v-if="res.success === true"
            title="成功提示的文案"
            type="success"
            effect="dark"
          >
          </el-alert>
        </el-col>

        <el-alert
          v-if="res.success === false"
          title="测试失败"
          type="error"
          effect="dark"
        >
        </el-alert>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';

export default {
  name: 'DownloadConfiguration',
  data() {
    return {
      loading: false,
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
    handldTest() {
      this.loading = true;
      this.res.success = undefined;
      setTimeout(() => {
        this.loading = false;
        this.res = {
          success: Math.random() > 0.5,
        };
      }, 1000);
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
