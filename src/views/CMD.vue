<template>
  <div>
    <Header breadcrumb="CMD" title="CMD -- CPList" />
    <div class="CMD-container">
      <el-row :gutter="20" class="form">
        <el-col :span="7">
          CMD/备注:
          <el-input placeholder="请输入CMD/备注" v-model="requestParamsObj.name" @change="getData()" @keyup.enter="getData" :disabled="loading || checking"> </el-input>
        </el-col>
      </el-row>

      <TableOperationButtons :loading="loading" :newButton="newButton" :deleteButton="deleteButton" :testButton="testButton" improtUrl="/svid/importCSV" exportUrl="/svid/exportCSV"></TableOperationButtons>

      <el-alert :title="alertTitle" type="info" show-icon v-show="alertTitle">
      </el-alert>

      <vxe-table border ref="xTable2" height="300" :row-config="{isCurrent: true, isHover: true}" :data="tableData2" @current-change="currentChangeEvent">
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
        <vxe-column field="address" title="Address" show-overflow></vxe-column>
      </vxe-table>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button @click="$refs2.xTable.setCurrentRow(tableData[1])">设置第二行选中</vxe-button>
          <vxe-button @click="$refs2.xTable.clearCurrentRow()">取消选中</vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-table keep-source border resizable show-overflow ref="xTable" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :sort-config="{trigger: 'cell',showIcon: true, defaultSort: {field: 'id', order: 'asc'},orders: [ 'asc', 'desc','']}" @toggle-row-expand="toggleExpandChangeEvent" @header-cell-click="headerCellClickEvent" @edit-disabled="editDisabledEvent" :edit-config="{
        trigger: 'dblclick',
        mode: 'row',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" :row-config="{isCurrent: true, isHover: true}" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent">
        <vxe-column type="checkbox" width="60" :disabled="true"></vxe-column>
        <vxe-column type="expand" width="60">
          <template #content="{ row, rowIndex }">
            <CMDson :row="row" :rowIndex="rowIndex"></CMDson>
          </template>
        </vxe-column>
        <vxe-column field="id" sortable title="SVID" :edit-render="{ name: 'input', attrs: { type: 'text' } }">
        </vxe-column>
        <vxe-column sortable field="name" title="NAME" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="formatCodeType" title="FORMAT" :edit-render="{}">
          <template #default="{ row }">
            <span>{{ formatOptions[row.formatCodeType] || '未定义的FORMAT' }}</span>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row.formatCodeType" transfer>
              <vxe-option v-for="(value, name) in formatOptions" :key="value" :value="name" :label="value"></vxe-option>
            </vxe-select>
          </template>
        </vxe-column>
        <vxe-column field="len" title="LENGHT" width="100" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="units" title="UNITS" :edit-render="{ name: 'input', attrs: { type: 'text' } }" width="90"></vxe-column>
        <vxe-column field="def" title="DEFAULT" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="min" title="MIN" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="max" title="MAX" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>

        <vxe-column width="200" field="plcAddr" title="PLC_Address" :edit-render="{ name: 'input', attrs: { type: 'text' } }">
          <!--使用#edit自定义编辑-->
          <template #edit="{ row }">
            <el-row>
              <el-col :span="12">
                <el-select v-model="row.plcname" size="small" @change="row.plcAddr = row.plcname +row.plcvalue">
                  <el-option v-for="item in plcAddrOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <input type="text" v-model="row.plcvalue" class="vxe-default-input" size="small" @change="row.plcAddr = row.plcname +row.plcvalue" />
              </el-col>
            </el-row>
          </template>
        </vxe-column>

        <vxe-column field="plcType" title="数据类型" :edit-render="{}" width="180">
          <template #default="{ row }">
            <span>{{ plcTypeOptions[row.plcType] || '未定义的数据类型' }}</span>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row.plcType" transfer>
              <vxe-option v-for="(value, name) in plcTypeOptions" :key="value" :value="name" :label="value"></vxe-option>
            </vxe-select>
          </template>
        </vxe-column>

        <vxe-column field="comment" title="备注" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>

        <vxe-column title="操作" width="150">
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
        <vxe-column field="value" title="当前值">
          <template #default="{ row }">
            <span v-html="row.value" :style="{'font-weight': checking ?'bold':'normal'}">{row.value}</span>
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
import Header from './common/Header.vue';
import CMDson from './CMDson.vue';
import TableOperationButtons from './common/TableOperationButtons.vue';
import {
  findCmdByName,
  // setCmd,
  delCmds,
} from '@/api/request';

export default {
  name: 'CMD',
  data() {
    return {
      loading: false,
      checking: false,
      alertTitle: '',
      tableData: [],
      tableData2: [
        {
          id: 10001,
          name: 'Test1',
          role: 'Develop',
          sex: 'Man',
          age: 28,
          address: 'test abc',
        },
        {
          id: 10002,
          name: 'Test2',
          role: 'Test',
          sex: 'Women',
          age: 22,
          address: 'Guangzhou',
        },
        {
          id: 10003,
          name: 'Test3',
          role: 'PM',
          sex: 'Man',
          age: 32,
          address: 'Shanghai',
        },
        {
          id: 10004,
          name: 'Test4',
          role: 'Designer',
          sex: 'Women',
          age: 24,
          address: 'Shanghai',
        },
      ],
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
    Header,
    CMDson,
    TableOperationButtons,
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(isChecking) {
      this.alertTitle = null;
      this.$refs.xTable.clearCheckboxRow();
      const requestParamsObj = JSON.parse(
        JSON.stringify(this.requestParamsObj)
      );
      delete requestParamsObj.page.total;
      if (!isChecking) {
        this.loading = true;
      }
      findCmdByName(requestParamsObj)
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
    deleteButtonEvent(rows) {
      const list = rows || this.multipleSelection;
      const remoteData = list.filter((item) => item.id).map((item) => item.id);
      // this.$refs.xTable.removeCheckboxRow();
      if (remoteData.length) {
        this.loading = true;
        delCmds(remoteData)
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
    toggleExpandChangeEvent({ rowIndex }) {
      console.log('====================================');
      console.log(rowIndex);
      console.log('====================================');
      this.$refs.xTable.setCurrentRow(this.tableData[rowIndex]);
      // this.$refs.xTable.clearRowExpand();
      // setTimeout(() => {
      //   this.$refs.xTable.toggleRowExpand(this.tableData[1]);
      // }, 100);
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
    background-color: #8080807a;
  }
  .vxe-table .vxe-table--body .vxe-body--row.row--current {
    background-color: #009def;
  }
}
</style>
