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

        <vxe-column title="操作" width="50">
          <template #default="{ row }">
            <el-link type="success" v-if="!row.alId">保存</el-link>
            <el-popover placement="top" width="180" v-model="row.visible">
              <p>确定要删除这一行({{ row.alId }})吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteButtonEvent(row.alId);row.visible = false;">确定</el-button>
              </div>
              <el-link slot="reference" type="danger" v-if="row.alId">删除</el-link>
            </el-popover>
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
    //  新建的操作
    newButtonEvent() {
      this.tableData.unshift({
        p1: '',
        p2: '',
        ALID: '',
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
    // 删除表格数据
    deleteButtonEvent(rows) {
      const list = rows || this.multipleSelection;
      const remoteData = list.filter((item) => item.id).map((item) => item.id);
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
          id: row.id || '',
          name: row.name || '',
          formatCodeType: row.formatCodeType
            ? parseInt(row.formatCodeType, 10)
            : 0,
          len: row.len ? parseInt(row.len, 10) : 0,
          def: row.def || '',
          min: row.min || '',
          max: row.max || '',
          plcType: row.plcType || '',
          plcAddr: row.plcname + row.plcvalue,
          units: row.units || '',
          comment: row.comment || '',
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
