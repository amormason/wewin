<template>
  <el-row class="table-operation-buttons-container">
    <el-col :span="24">
      <el-button type="success" size="small" icon="el-icon-plus" :loading="loading" @click="newButton.event">新建</el-button>

      <el-popover class="deletePopover" placement="top" width="160" v-model="deleteVisible">
        <p>确认将已选择的{{ deleteBtn.length }}条数据删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
          <el-button type="primary" size="mini" :loading="loading" @click="
              deleteVisible = false;
              deleteButton.event();
            ">确认</el-button>
        </div>
        <el-button slot="reference" type="danger" icon="el-icon-delete" size="small" :loading="loading" :disabled="!deleteBtn.length">批量删除({{ deleteBtn.length }})</el-button>
      </el-popover>

      <el-button type="primary" icon="el-icon-receiving" size="small" :loading="loading">导入</el-button>

      <el-popover class="Popover" placement="top" width="160" v-model="exportVisible">
        <p>确定要下载一个excel文件吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="exportVisible = false">取消</el-button>
          <el-button type="primary" size="mini" :loading="loading" @click="exportExcel();">确认</el-button>
        </div>
        <el-button slot="reference" type="primary" icon="el-icon-paperclip" size="small" :loading="loading">导出</el-button>
      </el-popover>

      <el-button v-if="testButton" icon="el-icon-s-operation" :type="testBtn.clicked ? 'success':''" size="small" :loading="loading" @click="testButton.event">测试当前页</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TableOperationButtons',
  data() {
    return {
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
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    // 导出下载文件
    exportExcel() {
      this.exportVisible = false;
      console.log('开始下载文件');
    },
  },
  watch: {
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
  },
};
</script>

<style scoped lang="scss">
.table-operation-buttons-container {
  margin: 2rem 0;
  button {
    margin: 0 20px 0 0;
  }
}
</style>
