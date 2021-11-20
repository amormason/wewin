<template>
  <div>
    <Header breadcrumb="字典信息" title="字典信息" />
    <div class="dictionary-information-container">
      <div class="form">
        Name:
        <el-input class="keyword" placeholder="请输入" clearable v-model="requestParamsObj.name" @change="getData()" @keyup.enter="getData" :disabled="loading">
        </el-input>
      </div>
      <!-- <el-row class="buttons-container">
      <el-col :span="24">
        <el-button type="primary" size="small" icon="el-icon-plus"
          >新建</el-button
        >
        <el-button type="warning" icon="el-icon-s-operation" size="small"
          >批量编辑</el-button
        >
        <el-button type="danger" icon="el-icon-s-operation" size="small"
          >批量删除</el-button
        >
      </el-col>
    </el-row> -->

      <!-- <el-alert title="成功提示的文案" type="success" effect="dark"> </el-alert> -->

      <vxe-table keep-source border resizable show-overflow ref="xTable" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :edit-config="{
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent" @edit-closed="editClosedEvent">
        <!-- <vxe-column type="seq" width="60"></vxe-column> -->
        <vxe-column sortable field="name" title="Name"></vxe-column>

        <vxe-column field="format" title="FORMAT" :edit-render="{}">
          <template #default="{ row }">
            <span>{{ this.formatOptions[row.format] || '未定义的FORMAT'}}</span>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row.format" transfer>
              <vxe-option v-for="(value, name) in formatOptions" :key="value" :value="name" :label="value"></vxe-option>
            </vxe-select>
          </template>
        </vxe-column>

        <vxe-column field="len" title="LENGHT" width="100" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <vxe-column field="comment" title="备注" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
        <!-- <vxe-column sortable field="date" title="创建时间"></vxe-column> -->
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
import { findDidByName, setDid } from '@/api/request';

export default {
  name: 'ModuleNetworkConfiguration',
  data() {
    return {
      loading: false,
      formatOptions: this.$store.state.formatOptions || {},
      page: {
        currentPage: 1,
        pageSize: 20,
        totalResult: 124,
      },
      requestParamsObj: {
        name: '',
        page: {
          page: 1,
          size: 15,
          total: 0,
        },
      },
      deleteButton: {
        event: this.deleteButtonEvent,
        length: 0,
      },
      newButton: {
        event: this.newButtonEvent,
      },
      tableData: [],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      const requestParamsObj = JSON.parse(
        JSON.stringify(this.requestParamsObj),
      );
      delete requestParamsObj.page.total;
      this.loading = true;
      this.alertTitle = null;
      this.$refs.xTable.clearCheckboxRow();
      findDidByName(requestParamsObj)
        .then((res) => {
          this.requestParamsObj.page = {
            page: res.data.page,
            size: res.data.size,
            total: res.data.total,
          };
          this.tableData = ((res.data && res.data.result) || []).map((item) => {
            const list = item;
            list.format = JSON.stringify(item.format);
            return {
              ...list,
            };
          });
        })
        .finally(() => {
          this.loading = false;
        });
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
          name: row.name,
          format: row.format,
          len: row.len,
          comment: row.comment,
        };
        this.loading = true;
        setDid(savaObj)
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
    selectAllEvent() {
      console.log('selectAllEvent');
    },
    selectChangeEvent() {
      console.log('selectChangeEvent');
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
    },
    // 删除表格数据
    deleteButtonEvent(list) {
      console.log(list);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.handleSelectionChange([]);
        this.$refs.xTable.clearCheckboxRow();
      }, 1500);
    },
  },

  mounted() {
    this.getData();
  },

  components: {
    Header,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dictionary-information-container {
  padding: 1rem;
  .form {
    .keyword {
      display: inline-block;
      width: 200px;
      margin-left: 1rem;
    }
  }
  .vxe-table {
    margin-top: 20px;
  }
}
</style>
