<template>
  <div>
    <Header breadcrumb="RPTID" title="RPTID" />
    <div class="dictionary-information-container">
      <el-row :gutter="0" class="form">
        <el-col :span="7">
          RPTID/NAME备注:
          <el-input placeholder="请输入" v-model="requestParamsObj.name" @change="getData()" @keyup.enter="getData" :disabled="loading || checking"> </el-input>
        </el-col>
      </el-row>

      <TableOperationButtons :loading="loading" :newButton="newButton" :deleteButton="deleteButton" :testButton="testButton" improtUrl="/rptid/importCSV" exportUrl="/rptid/exportCSV" :noChecking="true"></TableOperationButtons>

      <el-alert :title="alertTitle" type="info" show-icon v-show="alertTitle">
      </el-alert>

      <vxe-table keep-source border resizable show-overflow ref="xTable" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :sort-config="{trigger: 'cell', defaultSort: {field: 'id', order: 'asc'},orders: ['asc','desc', '']}" @header-cell-click="headerCellClickEvent" :edit-config="{
        trigger: 'dblclick',
        mode: 'row',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent" @edit-actived="editActivedEvent" @edit-closed="editClosedEvent">
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column sortable field="id" width="120" title="RPTID" :edit-render="{ name: 'input', attrs: { type: 'text',row:50} }"></vxe-column>
        <vxe-column field="vidsStr" title="VID" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="comments" title="备注" width="120" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>

        <vxe-column title="操作" width="150">
          <template #default="{ row }">
            <div class="operation-cell">
              <el-link type="success" v-if="row.isNew" @click="saveData(row)">保存</el-link>
              <el-popover placement="top" width="180" v-model="row.visible">
                <p>确定要删除这一行({{ row.id }})吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteButtonEvent([row]);row.visible = false;">确定</el-button>
                </div>
                <el-link slot="reference" type="danger">删除</el-link>
              </el-popover>
            </div>
          </template>
        </vxe-column>

      </vxe-table>

      <vxe-pager background @page-change="handlePageChange" :current-page.sync="requestParamsObj.page.page" :page-size.sync="requestParamsObj.page.size" :total="requestParamsObj.page.total" :layouts="[
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
    </div>
  </div>
</template>

<script>
import { findRptidByName, setRptid, delRptids } from '@/api/request';
import Header from './common/Header.vue';
import TableOperationButtons from './common/TableOperationButtons.vue';

export default {
  name: 'RPTID',
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 20,
        totalResult: 124,
      },
      tableData: [],
      wayList: [
        { label: '上升沿', value: '1' },
        { label: '下降沿', value: '2' },
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
      checking: false,
      alertTitle: '',
      requestParamsObj: {
        name: '',
        orderBy: {
          fieldName: 'id',
          fieldOrderType: 'asc',
        },
        page: {
          page: 1,
          size: 15,
          total: 0,
        },
      },
    };
  },
  components: {
    Header,
    TableOperationButtons,
  },
  mounted() {
    this.getData();
  },
  computed: {
    formatOptions() {
      return this.$store.state.formatOptions || {};
    },
    plcTypeOptions() {
      return this.$store.state.plcTypeOptions || {};
    },
  },
  methods: {
    headerCellClickEvent({
      column,
      // triggerResizable,
      // triggerSort,
      // triggerFilter,
    }) {
      // 如果触发了列的其他功能按钮
      if (column.sortable) {
        if (column.order) {
          this.requestParamsObj.orderBy = {
            fieldName: column.property,
            fieldOrderType: column.order,
          };
        } else {
          delete this.requestParamsObj.orderBy;
        }
        this.getData();
      }
    },
    getData(isChecking) {
      const requestParamsObj = JSON.parse(
        JSON.stringify(this.requestParamsObj),
      );
      delete requestParamsObj.page.total;
      if (!isChecking) {
        this.loading = true;
      }
      this.alertTitle = null;
      this.$refs.xTable.clearCheckboxRow();
      findRptidByName(requestParamsObj)
        .then((res) => {
          if (res.status === 200) {
            this.requestParamsObj.page = {
              page: res.data.page,
              size: res.data.size,
              total: res.data.total,
            };
            this.tableData = res.data.result.map((item) => {
              const temp = item;
              const { plcname, plcvalue } = this.GLOBAL.getPLC(item.plcAddr);
              temp.plcname = plcname;
              temp.plcvalue = plcvalue;
              return {
                ...temp,
              };
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    saveData(row) {
      const savaObj = {
        id: row.id || '',
        vidsStr: row.vidsStr || '',
        comments: row.comments || '',
      };

      setRptid(savaObj).then((res) => {
        if (res.status === 200) {
          this.getData();
          this.$message({
            message: res.msg || '恭喜你，这是一条成功消息',
            type: 'success',
          });
        }
      });
    },
    handleClick() {
      console.log('handleClick');
    },
    handleClose() {
      console.log('handleClose');
    },

    //  新建的操作
    async newButtonEvent() {
      const $table = this.$refs.xTable;
      const record = {
        isNew: true,
        id: '',
        vidsStr: '',
        comments: '',
      };
      const { row: newRow } = await $table.insertAt(record);
      await $table.setActiveCell(newRow, 'id');
    },

    // 编辑表格的规则
    editActivedEvent({ row, rowIndex }) {
      console.log({ row, rowIndex });
    },
    // 测试当前页
    testButtonEvent() {
      this.testButton.clicked = !this.testButton.clicked;
    },

    // 删除表格数据
    deleteButtonEvent(rows) {
      const list = rows || this.multipleSelection;
      const remoteData = list.filter((item) => item.id).map((item) => item.id);
      // this.$refs.xTable.removeCheckboxRow();
      if (remoteData.length) {
        this.loading = true;
        delRptids(remoteData)
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                message: res.msg || '恭喜你，这是一条成功消息',
                type: 'success',
              });
              this.getData();
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    // 分页参数改变
    handlePageChange(page) {
      this.requestParamsObj.page = {
        page: page.currentPage,
        size: page.pageSize,
      };
      this.getData();
    },

    // 表格编辑完
    editClosedEvent({ row, column }) {
      const $table = this.$refs.xTable;
      const field = column.property;
      // const cellValue = row[field];
      // 判断单元格值是否被修改
      if ($table.isUpdateByRow(row, field)) {
        if (row.isNew) {
          return;
        }
        const savaObj = {
          id: row.id || '',
          vidsStr: row.vidsStr || '',
          comments: row.comments || '',
        };
        this.loading = true;
        setRptid(savaObj)
          .then((res) => {
            if (res && res.status === 200) {
              this.$message({
                message: res.msg || '恭喜你，这是一条成功消息',
                type: 'success',
              });
            }
          })
          .finally(() => {
            this.getData();
          });
      }
    },

    // 表格编辑
    editRowEvent(row) {
      // console.log(row);
      const $grid = this.$refs.xTable;
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
  .textarea {
    height: 100px;
    display: block;
  }
}
</style>
