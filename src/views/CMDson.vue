<template>
  <div>
    <div class="CMD-container">
      <el-row :gutter="20" class="form">
        <el-col :span="7">
          CPNAME/备注:
          <el-input placeholder="请输入CMD/备注" v-model="requestParamsObj.name" @change="getData()" @keyup.enter="getData" :disabled="loading || checking"> </el-input>
        </el-col>
      </el-row>
      <!-- {{row}} -->
      <TableOperationButtons :loading="loading" :newButton="newButton" :deleteButton="deleteButton" :testButton="testButton" :noChecking="true" improtUrl="/svid/importCSV" exportUrl="/svid/exportCSV" improtUrlDisabled exportUrlDisabled></TableOperationButtons>

      <el-alert :title="alertTitle" type="info" show-icon v-show="alertTitle">
      </el-alert>

      <vxe-table keep-source border resizable show-overflow ref="xTable" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :sort-config="{trigger: 'cell',showIcon: true, defaultSort: {field: 'id', order: 'asc'},orders: [ 'asc', 'desc','']}" @header-cell-click="headerCellClickEvent" @edit-disabled="editDisabledEvent" :edit-config="{
        trigger: 'dblclick',
        mode: 'row',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent">
        <vxe-column type="checkbox" width="60" :disabled="true"></vxe-column>
        <vxe-column field="hcmdId" title="CMD" :edit-render="{ name: 'input', attrs: { type: 'text' } }">
        </vxe-column>
        <vxe-column field="name" title="CNAME" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="rplcDataType" title="rPLC_TYPE" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="rplcAddr" title="rPLC_Address" width="200" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="qplcDataType" title="qPLC_TYPE" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="qplcAddr" title="qPLC_Address" width="150" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="rvalue" title="rValue" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="qvalue" title="qValue" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="comments" title="备注" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="uvalue" title="当前值">
          <template #default="{ row }">
            <span v-html="row.uvalue" :style="{'font-weight': checking ?'bold':'normal'}">{row.uvalue}</span>
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
// import Header from './common/Header.vue';
import TableOperationButtons from './common/TableOperationButtons.vue';
import {
  findHCPByName,
  // setCmd,
  delHCPs,
} from '@/api/request';

export default {
  name: 'CMDson',
  data() {
    return {
      loading: false,
      checking: false,
      alertTitle: '',
      tableData: [],
      requestParamsObj: {
        name: '',
        hcmdId: this.row.id,
        orderBy: {
          fieldName: 'id',
          fieldOrderType: 'asc',
        },
        page: {
          page: 1,
          size: 5,
          total: 0,
        },
      },
      newButton: {
        event: this.newButtonEvent,
      },
      deleteButton: {
        event: this.deleteButtonEvent,
        length: 0,
      },
      testButton: {
        clicked: false,
      },
    };
  },
  props: {
    row: Object,
  },
  components: {
    // Header,
    TableOperationButtons,
  },
  mounted() {
    if (this.row.id) {
      this.getData();
    }
  },
  methods: {
    getData(isChecking) {
      this.alertTitle = null;
      this.$refs.xTable.clearCheckboxRow();
      const requestParamsObj = JSON.parse(
        JSON.stringify(this.requestParamsObj),
      );
      delete requestParamsObj.page.total;
      if (!isChecking) {
        this.loading = true;
      }
      findHCPByName(requestParamsObj)
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
              temp.formatCodeType = `${item.formatCodeType}`;
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
    // 切换表格排序的规则
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
    editDisabledEvent({ row, column }) {
      console.log(row, column);
      // this.$XModal.message({ content: '禁止编辑', status: 'error' });
      this.$message({
        message: '监控状态下不能操作表格数据',
        type: 'warning',
        // duration: 999999,
      });
    },
    // 全选事件
    selectAllEvent({ records }) {
      this.multipleSelection = records;
      this.deleteButton.length = records.length;
      this.alertTitle = `已经选择 ${records.length} 了项`;
    },
    // 勾选事件
    selectChangeEvent({ records }) {
      this.multipleSelection = records;
      this.deleteButton.length = records.length;
      this.alertTitle = `已经选择 ${records.length} 了项`;
    },
    // 分页参数改变
    handlePageChange(page) {
      this.requestParamsObj.page = {
        page: page.currentPage,
        size: page.pageSize,
      };
      this.getData();
    },
    //  新建的操作
    async newButtonEvent() {
      const $table = this.$refs.xTable;
      const record = {
        isNew: true,
        id: '10',
        name: 'SVID0',
        formatCodeType: 104,
        len: 10,
        def: '2',
        min: '1',
        max: '9',
        plcType: 'C',
        plcAddr: 'A',
        units: '014',
        comment: '备注信息',
        plcname: 'D',
        plcvalue: '999',
      };
      const { row: newRow } = await $table.insertAt(record);
      await $table.setActiveCell(newRow, 'id');
    },
    // 删除表格数据
    deleteButtonEvent() {
      if (this.multipleSelection.length) {
        this.loading = true;
        delHCPs(
          this.row.id,
          this.multipleSelection.map((item) => item.name),
        )
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
  },
  computed: {
    formatOptions() {
      return this.$store.state.formatOptions || {};
    },
    plcTypeOptions() {
      return this.$store.state.plcTypeOptions || {};
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.CMD-container {
  font-size: 80%;
  padding: 1rem;
  .form {
    // margin: 1rem 0;
    .el-input {
      width: 200px;
      display: inline-block;
      margin-left: 0.5rem;
    }
  }
}
</style>
