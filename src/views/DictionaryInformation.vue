<template>
  <div class="dictionary-information-container">
    <Header breadcrumb="字典信息" title="字典信息" />
    <div class="form">
      NAME:
      <el-input class="keyword" placeholder="请输入" clearable v-model="req.keyWord">
      </el-input>
    </div>
    <TableOperationButtons :loading="loading" :newButton="newButton" :deleteButton="deleteButton"></TableOperationButtons>

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

    <vxe-table keep-source border resizable show-overflow ref="xTable1" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :edit-config="{
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column sortable field="name" title="Name"></vxe-column>
      <vxe-column field="format" title="FORMAT" :edit-render="{ name: 'input', attrs: { type: 'text' } }"></vxe-column>
      <vxe-column field="length" title="LEN"></vxe-column>
      <vxe-column field="remark" title="备注"></vxe-column>
      <vxe-column sortable field="date" title="创建时间"></vxe-column>
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
  </div>
</template>

<script>
export default {
  name: 'ModuleNetworkConfiguration',
  data() {
    return {
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 20,
        totalResult: 124,
      },
      req: {
        keyWord: '',
        status: '',
        gateway: '',
        dns: '',
      },
      deleteButton: {
        event: this.deleteButtonEvent,
        length: 0,
      },
      newButton: {
        event: this.newButtonEvent,
      },
      tableData: [
        {
          id: '',
          name: 'MDNL',
          date: '2016-05-02 05:50:54',
          format: 'ASCII',
          length: '22',
          remark: '这里是一些备注信息',
        },
        {
          id: '',
          name: 'MDNL',
          date: '2016-05-02 05:50:54',
          format: 'ASCII',
          length: '22',
          remark: '这里是一些备注信息',
        },
        {
          id: '',
          name: 'MDNL',
          date: '2016-05-02 05:50:54',
          format: 'ASCII',
          length: '22',
          remark: '这里是一些备注信息',
        },
        {
          id: '',
          name: 'MDNL',
          date: '2016-05-02 05:50:54',
          format: 'ASCII',
          length: '22',
          remark: '这里是一些备注信息',
        },
        {
          id: '',
          name: 'MDNL',
          date: '2016-05-02 05:50:54',
          format: 'ASCII',
          length: '22',
          remark: '这里是一些备注信息',
        },
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
    };
  },
  methods: {
    selectAllEvent() {
      console.log('selectAllEvent');
    },
    selectChangeEvent() {
      console.log('selectChangeEvent');
    },
    // 翻页
    handlePageChange() {
      console.log('handlePageChange');
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
        this.$refs.xTable1.clearCheckboxRow();
      }, 1500);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dictionary-information-container {
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
