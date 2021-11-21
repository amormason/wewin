<template>
  <div class="container">
    <Header breadcrumb="Log" title="Log" />
    <div class="form">
      <div class="item">
        <label>SECom Log Level:</label>
        <el-select v-model="log.level" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <label>Log Backup(day):</label>
        <el-input placeholder="day" oninput="value=value.replace(/[^\d]/g,'');" v-model="log.day" clearable maxlength="10">
        </el-input>
      </div>
      <div class="item buttons">
        <el-button type="primary" size="small" icon="el-icon-check" :loading="loading" @click="submit">保存设置</el-button>
        <el-button type="default" size="small" icon="el-icon-paperclip" :loading="loading" @click="getLog">下载日志</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import { exportCSV } from '@/api/request';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      exportUrl: '/svid/exportCSV',
      options: [
        {
          value: 'Level1',
          label: 'Level1',
        },
        {
          value: 'Level2',
          label: 'Level2',
        },
        {
          value: 'Level3',
          label: 'Level3',
        },
        {
          value: 'Level4',
          label: 'Level4',
        },
        {
          value: 'Level5',
          label: 'Level5',
        },
      ],
      log: {
        level: '',
        day: 1,
      },
    };
  },
  components: {
    Header,
  },
  methods: {
    getLog() {
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
      if (!this.log.level) {
        this.$message.error('请选择SECom Log Level');
        return false;
      }
      if (!this.log.day) {
        this.$message.error('请输入Log Backup');
        return false;
      }
      return true;
    },
    submit() {
      if (this.checkData()) {
        console.log('submit');
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
