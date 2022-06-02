<template>
  <div>
    <div class="CMD-container">
      <el-row :gutter="20" class="form">
        <el-col :span="7">
          CPNAME/备注:
          <el-input placeholder="请输入CPNAME/备注" v-model="requestParamsObj.name" @change="getData()" @keyup.enter="getData" :disabled="loading || checking"> </el-input>
        </el-col>
      </el-row>

      <TableOperationButtons :loading="loading" :newButton="newButton" :deleteButton="deleteButton" :testButton="testButton" improtUrl="/svid/importCSV" exportUrl="/svid/exportCSV" improtUrlDisabled exportUrlDisabled></TableOperationButtons>

      <el-alert :title="alertTitle" type="info" show-icon v-show="alertTitle">
      </el-alert>

      <vxe-table keep-source border resizable show-overflow ref="xTable" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :sort-config="{trigger: 'cell',showIcon: true, defaultSort: {field: 'id', order: 'asc'},orders: [ 'asc', 'desc','']}" @edit-closed="editClosedEvent" @header-cell-click="headerCellClickEvent" @edit-disabled="editDisabledEvent" :edit-config="{
        trigger: 'dblclick',
        mode: 'row',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }"  @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent">
        <vxe-column type="checkbox" width="40" :disabled="true"></vxe-column>
        <vxe-column field="hcmdId" title="CMD">
        </vxe-column>
        <vxe-column field="name" sortable title="CPNAME" :edit-render="{ name: 'input', attrs: { type: 'text' } }" width="120">
        </vxe-column>
        <vxe-column field="rplcDataType" title="rPLC_TYPE" :edit-render="{}" width="180">
          <template #default="{ row }">
            <span>{{ plcTypeOptions[row.rplcDataType] || '未定义的数据类型' }}</span>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row.rplcDataType" transfer>
              <vxe-option v-for="(value, name) in plcTypeOptions" :key="value" :value="name" :label="value"></vxe-option>
            </vxe-select>
          </template>
        </vxe-column>

        <vxe-column width="180" field="rplcAddr" title="rPLC_Address" :edit-render="{ name: 'input', attrs: { type: 'text' } }">
          <!--使用#edit自定义编辑-->
          <template #edit="{ row }">
            <el-row>
              <el-col :span="12">
                <el-select v-model="row.rplcname" size="small" @change="row.rplcAddr = row.rplcname +row.rplcvalue">
                  <el-option v-for="item in plcAddrOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <input type="text" v-model="row.rplcvalue" class="vxe-default-input" size="small" @change="row.rplcAddr = row.rplcname +row.rplcvalue" />
              </el-col>
            </el-row>
          </template>
        </vxe-column>

        <vxe-column field="qplcDataType" title="qPLC_TYPE" :edit-render="{}" width="180">
          <template #default="{ row }">
            <span>{{ plcTypeOptions[row.qplcDataType] || '未定义的数据类型' }}</span>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row.qplcDataType" transfer>
              <vxe-option v-for="(value, name) in plcTypeOptions" :key="value" :value="name" :label="value"></vxe-option>
            </vxe-select>
          </template>
        </vxe-column>

        <vxe-column width="180" field="qplcAddr" title="qPLC_Address" :edit-render="{ name: 'input', attrs: { type: 'text' } }">
          <!--使用#edit自定义编辑-->
          <template #edit="{ row }">
            <el-row>
              <el-col :span="12">
                <el-select v-model="row.qplcname" size="small" @change="row.qplcAddr = row.qplcname +row.qplcvalue">
                  <el-option v-for="item in plcAddrOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <input type="text" v-model="row.qplcvalue" class="vxe-default-input" size="small" @change="row.qplcAddr = row.qplcname +row.qplcvalue" />
              </el-col>
            </el-row>
          </template>
        </vxe-column>

        <vxe-column field="rvalue" title="rValue" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="qvalue" title="qValue" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column title="操作">
          <template #default="{ row }">
            <div class="operation-cell">
              <el-link type="success" v-if="!checking && row.isNew" @click="saveData(row)">保存</el-link>
              <el-popover placement="top" width="180" v-model="row.visible">
                <p>确定要删除这一行({{ row.id }})吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteButtonEvent([row]);row.visible = false;">确定</el-button>
                </div>
                <el-link slot="reference" type="danger" v-if="!checking">删除</el-link>
              </el-popover>
            </div>
          </template>
        </vxe-column>
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
import { findHCPByName, setHCP, delHCPs } from '@/api/request';
import TableOperationButtons from './common/TableOperationButtons.vue';

export default {
  name: 'CMDson',
  data() {
    return {
      loading: false,
      checking: false,
      alertTitle: '',
      tableHeight: 500,
      tableData: [],
      requestParamsObj: {
        name: '',
        hcmdId: this.row.id,
        orderBy: {
          fieldName: 'name',
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
  components: {
    TableOperationButtons,
  },
  props: {
    row: Object,
  },
  mounted() {
    this.getData();
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

              temp.qplcname = this.GLOBAL.getPLC(item.qplcAddr).plcname;
              temp.qplcvalue = this.GLOBAL.getPLC(item.qplcAddr).plcvalue;

              temp.rplcname = this.GLOBAL.getPLC(item.rplcAddr).plcname;
              temp.rplcvalue = this.GLOBAL.getPLC(item.rplcAddr).plcvalue;

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
        this.saveData(row);
      }
    },

    //  保存数据
    saveData(row) {
      const savaObj = {
        hcmdId: row.hcmdId || '',
        name: row.name || '',
        rplcAddr: row.rplcAddr || '',
        rplcDataType: row.rplcDataType || '',
        rvalue: row.rvalue || '',
        qvalue: row.qvalue || '',
        qplcAddr: row.qplcAddr || '',
        qplcDataType: row.qplcDataType || '',
        comments: row.comments || '',
        title: row.title || '',
      };

      setHCP(savaObj).then((res) => {
        if (res.status === 200) {
          this.getData();
          this.$message({
            message: res.msg || '恭喜你，这是一条成功消息',
            type: 'success',
          });
        }
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
        comments: '',
        hcmdId: this.row.id,
        qplcAddr: 'A00',
        qplcDataType: 'int',
        qvalue: '',
        rplcAddr: 'A00',
        rplcDataType: 'int',
        rvalue: '',
        title: '',
        uvalue: '',
        qplcname: 'A',
        qplcvalue: '00',
        rplcname: 'A',
        rplcvalue: '00',
      };
      const { row: newRow } = await $table.insertAt(record);
      await $table.setActiveCell(newRow, 'id');
    },
    // 删除表格数据
    deleteButtonEvent(rows) {
      const list = rows || this.multipleSelection;
      let data = [];
      if (list && list.length) {
        data = list.map((item) => item.name);
      }
      if (data.length) {
        this.loading = true;
        delHCPs(this.row.id, data)
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
    // 展开行的切换
    toggleExpandChangeEvent({ row }) {
      if (!row || !row.id) {
        this.$message({
          message: '保存成功本条数据后才能展开子表',
          type: 'error',
        });
      }
      return true;
    },
  },
  computed: {
    formatOptions() {
      return this.$store.state.formatOptions || {};
    },
    plcTypeOptions() {
      return this.$store.state.plcTypeOptions || {};
    },
    plcAddrOptions() {
      return this.GLOBAL.getPlcAddrOptions() || [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.CMD-container {
  padding: 1rem;
  .form {
    // margin: 1rem 0;
    .el-input {
      width: 200px;
      display: inline-block;
      margin-left: 0.5rem;
    }
  }
  /deep/ .vxe-body--expanded-column {
    background-color: #e6f7ff;
  }
  .el-alert {
    margin-bottom: 1rem;
  }
}
</style>
