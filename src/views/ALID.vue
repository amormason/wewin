<template>
  <div>
    <Header breadcrumb="ALID" title="ALID -- Alarm List" />
    <div class="dictionary-information-container">

      <el-row :gutter="0" class="form">
        <el-col :span="5">
          Alarm/TITLE备注:
          <el-input placeholder="请输入" v-model="requestParamsObj.name" @change="getData()" @keyup.enter="getData" :disabled="loading || checking"> </el-input>
        </el-col>
      </el-row>

      <TableOperationButtons :loading="loading" :newButton="newButton" :deleteButton="deleteButton" :testButton="testButton" improtUrl="/alarm/importCSV" exportUrl="/alarm/exportCSV"></TableOperationButtons>

      <el-alert :title="alertTitle" type="info" show-icon v-show="alertTitle">
      </el-alert>

      <vxe-table keep-source border resizable show-overflow ref="xTable" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :edit-config="{
        trigger: 'dblclick',
        mode: 'row',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent" @edit-actived="editActivedEvent" @edit-closed="editClosedEvent">
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column sortable field="alId" title="ALID" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="alcd" title="ALCD" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="altx" title="ALTX" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="plcType" title="PLC_TYPE" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column width="200" field="plcAddr" title="PLC_Address" :edit-render="{ name: 'input', attrs: { type: 'text' } }">
          <!--使用#edit自定义编辑-->
          <template #edit="{ row }">
            <el-row>
              <el-col :span="12">
                <el-select v-model="row.plcname" size="small" @change="row.plcAddr = row.plcname +row.plcvalue">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <input type="text" v-model="row.plcvalue" class="vxe-default-input" size="small" @change="row.plcAddr = row.plcname +row.plcvalue" />
              </el-col>
            </el-row>
          </template>
        </vxe-column>
        <vxe-column field="activeValue" title="触发方式" :edit-render="{name: '$select', options: wayList}"></vxe-column>
        <vxe-column type="html" :formatter="formatRole" field="value" title="当前值"></vxe-column>
        <vxe-column field="comments" title="备注" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>

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
import Header from './common/Header.vue';
import TableOperationButtons from './common/TableOperationButtons.vue';
import { findAlarmByName, setAlarm, delAlarm } from '@/api/request';

export default {
  name: 'ALID',
  data() {
    return {
      tableData: [],
      wayList: [
        { label: '上升沿', value: 1 },
        { label: '下降沿', value: 0 },
      ],
      options: this.GLOBAL.plcAddrOptions,
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
  methods: {
    getData() {
      const requestParamsObj = JSON.parse(
        JSON.stringify(this.requestParamsObj),
      );
      delete requestParamsObj.page.total;
      this.loading = true;
      findAlarmByName(requestParamsObj)
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
    handleClick() {
      console.log('handleClick');
    },
    handleClose() {
      console.log('handleClose');
    },
    // 编辑表格的规则
    editActivedEvent({ row, rowIndex }) {
      console.log({ row, rowIndex });
    },
    saveData(row) {
      const savaObj = {
        activeValue: row.activeValue,
        alId: row.alId,
        alcd: row.alcd,
        altx: row.altx,
        comments: row.comments,
        plcAddr: row.plcname + row.plcvalue,
        plcType: row.plcType,
      };

      setAlarm(savaObj).then((res) => {
        if (res.status === 200) {
          this.getData();
          this.$message({
            message: res.msg || '恭喜你，这是一条成功消息',
            type: 'success',
          });
        }
      });
    },
    //  新建的操作
    async newButtonEvent() {
      const $table = this.$refs.xTable;
      const record = {
        isNew: true,
        activeValue: 1,
        alId: '9901',
        alcd: '',
        altx: 'AlarmID0001',
        comments: 'XXXX',
        plcAddr: 'B1001',
        plcType: 'bool',
      };
      const { row: newRow } = await $table.insertAt(record);
      await $table.setActiveCell(newRow, 'alId');
    },

    // 测试当前页
    testButtonEvent() {
      this.testButton.clicked = !this.testButton.clicked;
    },

    // 删除表格数据
    deleteButtonEvent(rows) {
      const list = rows || this.multipleSelection;
      const remoteData = list
        .filter((item) => !item.isNew)
        .map((item) => item.alId);
      // this.$refs.xTable.removeCheckboxRow();
      if (remoteData.length) {
        this.loading = true;
        delAlarm(remoteData)
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
          activeValue: row.activeValue,
          alId: row.alId,
          alcd: row.alcd,
          altx: row.altx,
          comments: row.comments,
          plcAddr: row.plcname + row.plcvalue,
          plcType: row.plcType,
          // value: '',
        };
        this.loading = true;
        setAlarm(savaObj)
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

    // 分页参数改变
    handlePageChange(page) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      console.log(page);
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
