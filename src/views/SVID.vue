<template>
  <div>
    <Header breadcrumb="SVID" title="SVID" />
    <div class="dictionary-information-container">
      <el-row :gutter="0" class="form">
        <el-col :span="5">
          VID/NAME:
          <el-input placeholder="请输入" v-model="req.keyWord"> </el-input>
        </el-col>
        <el-col :span="6">
          备注:
          <el-input placeholder="请输入" v-model="req.keyWord"> </el-input>
        </el-col>
      </el-row>

      <TableOperationButtons :loading="loading" :newButton="newButton" :deleteButton="deleteButton" :testButton="testButton"></TableOperationButtons>

      <el-alert :title="alertTitle" type="info" show-icon v-show="alertTitle">
      </el-alert>

      <vxe-table keep-source border resizable show-overflow ref="xTable1" class="vxe-table" empty-text="没有更多数据了！" @edit-closed="editClosedEvent" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :edit-config="{
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent">
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column sortable field="SVID" title="SVID" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="NAME" title="NAME" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="FORMAT" title="FORMAT" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="LEN" title="LEN" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="UNITS" title="UNITS" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="DEF" title="DEF" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="MIN" title="MIN" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="MAX" title="MAX" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="PLC_TYPE" title="PLC_TYPE" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>

        <vxe-column width="150" field="PLC_Address" title="PLC_Address" :edit-render="{ name: 'input', attrs: { type: 'text' } }">
          <!--使用#edit自定义编辑-->
          <template #edit="{ row }">
            <el-row>
              <el-col :span="12">
                <el-select v-model="row.p1" size="small" @change="editRowEvent(row)">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <input type="text" v-model="row.p2" class="vxe-default-input" size="small" @change="editRowEvent(row)" />
              </el-col>
            </el-row>
          </template>
        </vxe-column>

        <vxe-column field="REMARK" title="备注" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>

        <vxe-column title="操作" width="50">
          <template #default="{ row }">
            <el-link type="success" v-if="!row.id">保存</el-link>
            <el-popover placement="top" width="180" v-model="row.visible">
              <p>确定要删除这一行({{ row.SVID }})吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteButtonEvent(row.SVID);row.visible = false;">确定</el-button>
              </div>
              <el-link slot="reference" type="danger" v-if="row.id">删除</el-link>
            </el-popover>
          </template>
        </vxe-column>

        <vxe-column type="html" :formatter="formatRole" field="CURRENTVALUE" title="当前值"></vxe-column>
      </vxe-table>

      <vxe-pager background @page-change="handlePageChange" :current-page.sync="page.currentPage" :page-size.sync="page.pageSize" :total="page.totalResult" :layouts="[
        'PrevJump',
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'NextJump',
        'Sizes',
        'FullJump',
        'Total',
      ]">
      </vxe-pager>

      <el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        这里是新增的表单
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="success" size="small" @click="dialogVisible = false">新增</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import TableOperationButtons from './common/TableOperationButtons.vue';

export default {
  name: 'SVID',
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 20,
        totalResult: 124,
      },
      tableData: [
        {
          id: 1,
          p1: 'D',
          p2: '1001',
          SVID: 1001,
          NAME: '这里是值',
          FORMAT: 'l1',
          LEN: 20,
          UNITS: 'A',
          DEF: 1,
          MIN: 1,
          MAX: 1,
          PLC_TYPE: 'uint16',
          PLC_Address: 'D1001',
          REMARK: '一些内容说明',
          CURRENTVALUE: '222',
        },
        {
          id: 2,
          p1: 'B',
          p2: '2001',
          SVID: 1002,
          NAME: '这里是值',
          FORMAT: 'l1',
          LEN: 10,
          UNITS: 'A',
          DEF: 1,
          MIN: 1,
          MAX: 1,
          PLC_TYPE: 'uint32',
          PLC_Address: 'B2001',
          REMARK: '一些内容说明',
          CURRENTVALUE: '',
        },
        {
          id: 3,
          p1: 'C',
          p2: '2009',
          SVID: 1002,
          NAME: '这里是值',
          FORMAT: 'l1',
          LEN: 20,
          UNITS: 'A',
          DEF: 1,
          MIN: 1,
          MAX: 1,
          PLC_TYPE: 'uint16',
          PLC_Address: 'C2009',
          REMARK: '一些内容说明',
          CURRENTVALUE: '222',
        },
      ],
      options: [
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
        { label: 'C', value: 'C' },
        { label: 'B', value: 'B' },
        { label: 'A', value: 'A' },
      ],
      loading: false,
      visible: false,
      dialogVisible: false,
      multipleSelection: [],
      deleteButton: {
        event: this.deleteButtonEvent,
        length: 0,
      },
      newButton: {
        event: this.newButtonEvent,
      },
      testButton: {
        event: this.testButtonEvent,
        clicked: false,
      },
      value1: false,
      alertTitle: '',
      req: {
        keyWord: '',
        status: '',
        gateway: '',
        dns: '',
      },
      currentPage4: 2,
    };
  },
  components: {
    Header,
    TableOperationButtons,
  },
  mounted() {
    // console.log(this.$store.state);
  },
  methods: {
    handleClick() {
      console.log('handleClick');
    },
    handleClose() {
      console.log('handleClose');
    },

    //  新建的操作
    newButtonEvent() {
      this.tableData.unshift({
        p1: '',
        p2: '',
        SVID: '',
        NAME: '',
        FORMAT: '',
        LEN: 0,
        UNITS: '0',
        DEF: 0,
        MIN: 0,
        MAX: 0,
        PLC_TYPE: '',
        PLC_Address: '',
        REMARK: '',
        CURRENTVALUE: '',
      });
      // this.dialogVisible = true;
    },

    // 测试当前页
    testButtonEvent() {
      this.testButton.clicked = !this.testButton.clicked;
    },

    // 删除表格数据
    deleteButtonEvent(list) {
      console.log(list);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.handleSelectionChange([]);
        this.$refs.xTable1.clearCheckboxRow();
      }, 1500);
    },

    // 分页参数改变
    handlePageChange(page) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      console.log(page);
    },

    editClosedEvent({ row, column }) {
      const $table = this.$refs.xTable1;
      const field = column.property;
      const cellValue = row[field];
      // 判断单元格值是否被修改
      if ($table.isUpdateByRow(row, field)) {
        this.loading = true;
        setTimeout(() => {
          this.$message({
            message: `局部保存成功！ ${field}=${cellValue}`,
            type: 'success',
          });
          this.loading = false;
        }, 300);
      }
    },

    // 表格编辑
    editRowEvent(row) {
      console.log(row);
      const $grid = this.$refs.xTable1;
      $grid.setActiveRow(null);
      this.tableData[0].PLC_Address = row.p1 + row.p2;
    },

    selectAllEvent({ records }) {
      this.multipleSelection = records;
      this.deleteButton.length = records.length;
      this.alertTitle = `已经选择 ${records.length} 了项`;
    },
    selectChangeEvent({ records }) {
      this.multipleSelection = records;
      this.deleteButton.length = records.length;
      this.alertTitle = `已经选择 ${records.length} 了项`;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.alertTitle = `已经选择 ${val.length} 了项`;
      this.deleteButton.length = val.length;
    },
    // 格式化输出表格值
    formatRole({ cellValue }) {
      if (this.testButton.clicked) {
        return cellValue
          ? `<el-link type="success">${cellValue}</el-link>`
          : '<el-link type="danger">测试失败</el-link>';
      }
      return '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dictionary-information-container {
  margin: 1rem;
  .form {
    .el-input,
    .el-select {
      width: 200px;
      display: inline-block;
      margin-left: 0.5rem;
    }
    .label {
      line-height: 40px;
      text-align: center;
    }
  }
  .buttons-container {
    margin: 20px 20px;
  }
  .vxe-table {
    margin: 20px 0;
    input {
      height: 32px;
    }
  }
  .el-table {
    margin: 20px 0;
    .el-link {
      margin: 0 5px;
    }
  }
}
</style>
