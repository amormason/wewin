<template>
  <el-row class="table-operation-buttons-container">
    <el-col :span="24">
      <el-button type="success" size="small" icon="el-icon-plus" :loading="loading" :disabled="checking" @click="newButton.event" v-if="!noNew">新建</el-button>

      <el-popover class="deletePopover" placement="top" width="160" v-model="deleteVisible">
        <p>确认将已选择的{{ deleteBtn.length }}条数据删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
          <el-button type="primary" size="mini" :loading="loading" @click="
              deleteVisible = false;
              deleteButton.event();
            ">确认</el-button>
        </div>
        <el-button slot="reference" type="danger" icon="el-icon-delete" size="small" :loading="loading" :disabled="checking||!deleteBtn.length">批量删除({{ deleteBtn.length }})</el-button>
      </el-popover>

      <el-button type="primary" icon="el-icon-receiving" size="small" :loading="loading" :disabled="checking" @click="selectFile($event)" v-if="improtUrl">导入</el-button>
      <input type="file" name="" id="uploadEventFile" style="display:none" @change="getFile($event)" v-if="improtUrl" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">

      <el-popover class="Popover" placement="top" width="160" v-model="exportVisible">
        <p>确定要下载一个excel文件吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="exportVisible = false">取消</el-button>
          <el-button type="primary" size="mini" :loading="loading" @click="handelExportCSV();">确认</el-button>
        </div>
        <el-button slot="reference" type="primary" icon="el-icon-paperclip" size="small" :loading="loading" :disabled="checking" v-if="exportUrl">导出</el-button>
      </el-popover>

      <el-switch v-model="checking" active-color="#13ce66" inactive-color="gray" active-text="正在监控" inactive-text="停止监控" @change="changeChcek(checking)"> </el-switch>

      <!-- <el-button v-if="testButton" icon="el-icon-s-operation" :type="testBtn.clicked ? 'success':''" size="small" :loading="loading" @click="testButton.event">测试当前页</el-button> -->
    </el-col>
  </el-row>
</template>

<script>
import { uploadFile, exportCSV } from '@/api/request';

export default {
  name: 'TableOperationButtons',
  data() {
    return {
      timer: undefined,
      checking: false,
      checkingMessage: {},
      deleteVisible: false,
      exportVisible: false,
      newBtn: {},
      deleteBtn: {},
      importBtn: {},
      exportBtn: {},
      testBtn: {},
    };
  },
  props: {
    loading: Boolean,
    pageName: String,
    newButton: Object,
    deleteButton: Object,
    importButton: Object,
    exportButton: Object,
    testButton: Object,
    noNew: Boolean,
    improtUrl: String,
    exportUrl: String,
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    selectFile(event) {
      event.preventDefault();
      document.querySelector('#uploadEventFile').click();
    },
    getFile(event) {
      this.$parent.loading = true;
      const file = event.target.files[0];
      uploadFile(this.improtUrl, file)
        .then((res) => {
          console.log('res:', res);
          this.$message({
            message: res.data.msg,
            type: res.data.status === 200 ? 'success' : 'error',
          });

          // 刷新父组件数据
          if (res.status === 200) {
            this.$parent.getData();
          }
        })
        .catch((error) => {
          this.$message.error(error.message || '发生了网络错误');
        })
        .finally(() => {
          this.$parent.loading = false;
        });
    },
    // 改变监控状态
    changeChcek(status) {
      if (status) {
        this.checkingMessage = this.$message({
          message: '监控状态下不能操作表格数据',
          type: 'warning',
          duration: 999999,
        });
      } else {
        this.checkingMessage.close();
      }
    },
    // 导出下载文件
    handelExportCSV() {
      exportCSV(this.exportUrl).then((res) => {
        console.log(res);
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
            message: '导出数据成功',
            type: 'success',
          });
        }
      });
      this.exportVisible = false;
    },
  },
  watch: {
    '$route.path': {
      handler(to, from) {
        console.log('to:::', to);
        console.log('from:::', from);
      },
      deep: true,
    },
    deleteButton: {
      handler(newVal) {
        this.deleteBtn = newVal;
      },
      deep: true,
    },
    testButton: {
      handler(newVal) {
        this.testBtn = newVal;
      },
      deep: true,
    },
    checking: {
      handler(val) {
        this.$parent.checking = val;
        if (val) {
          this.timer = setInterval(() => {
            this.$parent.getData();
          }, 1000);
        } else {
          clearInterval(this.timer);
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.table-operation-buttons-container {
  margin: 2rem 0;
  button {
    margin: 0 20px 0 0;
  }
  .import-btn {
    display: inline-block;
  }
}
</style>
