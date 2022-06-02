<template>
  <div class="container">
    <Header breadcrumb="Log" title="Log" />
    <div class="form">
      <div class="item">
        <label>SECom Log Level:</label>
        <el-select v-model="log.logLevel" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <label>Log Backup(day):</label>
        <el-input placeholder="day" oninput="value=value.replace(/[^\d]/g,'');" v-model="log.logPeriod" clearable maxlength="10">
        </el-input>
      </div>
      <div class="item buttons">
        <el-button type="primary" size="small" icon="el-icon-check" :loading="loading" @click="submit">保存设置</el-button>
        <el-button type="default" size="small" icon="el-icon-paperclip" :loading="loading" @click="downLog">下载日志</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { exportCSV, setLogInfo, getLogInfo } from '@/api/request';
import Header from './common/Header.vue';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      exportUrl: '/conf/downLog',
      options: [
        {
          value: 1,
          label: 'Level1',
        },
        {
          value: 2,
          label: 'Level2',
        },
        {
          value: 3,
          label: 'Level3',
        },
        {
          value: 4,
          label: 'Level4',
        },
        {
          value: 5,
          label: 'Level5',
        },
      ],
      log: {
        logLevel: 1,
        logPeriod: 1,
      },
    };
  },
  components: {
    Header,
  },
  mounted() {
    this.getLogInfo();
  },
  methods: {
    getLogInfo() {
      getLogInfo().then((res) => {
        this.log = res.data;
      });
    },
    downLog() {
      this.loading = true;
      exportCSV(this.exportUrl)
        .then((res) => {
          if (res && res.data) {
            const blob = new Blob([res.data], {
              type: 'text/csv;charset=utf-8;',
            });
            const filename = res.fileName || '导出数据';
            if (navigator.msSaveBlob) {
              // IE 10+
              navigator.msSaveBlob(blob, filename);
            } else {
              const link = document.createElement('a');
              if (link.download !== undefined) {
                // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }
            this.$message({
              message: '下载日志成功',
              type: 'success',
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    checkData() {
      if (!this.log.logLevel) {
        this.$message.error('请选择SECom Log Level');
        return false;
      }
      if (!this.log.logPeriod) {
        this.$message.error('请输入Log Backup');
        return false;
      }
      return true;
    },
    submit() {
      if (this.checkData()) {
        setLogInfo(this.log).then((res) => {
          if (res && res.status === 200) {
            this.$message({
              message: res.msg || '保存设置成功',
              type: 'success',
            });
          }
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  .form {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    .item {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      width: 440px;
      label {
        width: 140px;
        text-align: right;
        padding-right: 1rem;
      }
      .el-input,
      .el-select {
        width: 300px;
      }
    }
    .buttons {
      margin-top: 2rem;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
