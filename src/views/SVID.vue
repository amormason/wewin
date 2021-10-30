<template>
  <div class="dictionary-information-container">
    <Header breadcrumb="SVID" title="SVID" />
    <el-row :gutter="10" class="form">
      <el-col :span="2" class="label"> VID/NAME: </el-col>
      <el-col :span="6">
        <el-input
          placeholder="请输入"
          suffix-icon="el-icon-date"
          v-model="req.keyWord"
        >
        </el-input>
      </el-col>

      <el-col :span="2" class="label"> 备注: </el-col>
      <el-col :span="6">
        <el-select v-model="req.status" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-refresh-left">重置</el-button>
      </el-col>
    </el-row>

    <el-row class="buttons-container">
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
        <!-- <el-button size="small">...</el-button> -->
      </el-col>
    </el-row>

    <el-alert :title="alertTitle" type="info" show-icon> </el-alert>

    <el-table
      ref="multipleTable"
      :data="tableData"
      highlight-current-row
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="vid" label="VID" sortable width="100">
      </el-table-column>
      <el-table-column prop="name" label="NAME" sortable width="100">
      </el-table-column>
      <el-table-column prop="type" label="类型" sortable> </el-table-column>
      <el-table-column prop="len" label="LEN" sortable> </el-table-column>
      <el-table-column prop="UNITS" label="UNITS" sortable> </el-table-column>
      <el-table-column prop="DEF" label="DEF" sortable> </el-table-column>
      <el-table-column prop="MIN" label="MIN" sortable> </el-table-column>
      <el-table-column prop="MAX" label="MAX" sortable> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-link type="danger" @click="handleClick(scope.row)">删除</el-link>
          <el-link type="primary" @click="handleClick(scope.row)">编辑</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
import Header from './common/Header.vue';

export default {
  name: 'SVID',
  data() {
    return {
      multipleSelection: [],
      alertTitle: '',
      req: {
        keyWord: '',
        status: '',
        gateway: '',
        dns: '',
      },
      currentPage4: 2,
      tableData: [
        {
          vid: '1001',
          name: '这里是值',
          type: 'I1',
          len: '20',
          UNITS: 'A',
          DEF: '1',
          MIN: '1',
          MAX: '8',
          PLC_TYPE: 'uint16',
          PLC_Address: '1001',
          remark: '一些内容说明',
        },
        {
          vid: '1001',
          name: '这里是值',
          type: 'I1',
          len: '20',
          UNITS: 'A',
          DEF: '1',
          MIN: '1',
          MAX: '8',
          PLC_TYPE: 'uint16',
          PLC_Address: '1001',
          remark: '一些内容说明',
        },
        {
          vid: '1001',
          name: '这里是值',
          type: 'I1',
          len: '20',
          UNITS: 'A',
          DEF: '1',
          MIN: '1',
          MAX: '8',
          PLC_TYPE: 'uint16',
          PLC_Address: '1001',
          remark: '一些内容说明',
        },
        {
          vid: '1001',
          name: '这里是值',
          type: 'I1',
          len: '20',
          UNITS: 'A',
          DEF: '1',
          MIN: '1',
          MAX: '8',
          PLC_TYPE: 'uint16',
          PLC_Address: '1001',
          remark: '一些内容说明',
        },
        {
          vid: '1001',
          name: '这里是值',
          type: 'I1',
          len: '20',
          UNITS: 'A',
          DEF: '1',
          MIN: '1',
          MAX: '8',
          PLC_TYPE: 'uint16',
          PLC_Address: '1001',
          remark: '一些内容说明',
        },
        {
          vid: '1001',
          name: '这里是值',
          type: 'I1',
          len: '20',
          UNITS: 'A',
          DEF: '1',
          MIN: '1',
          MAX: '8',
          PLC_TYPE: 'uint16',
          PLC_Address: '1001',
          remark: '一些内容说明',
        },
        {
          vid: '1001',
          name: '这里是值',
          type: 'I1',
          len: '20',
          UNITS: 'A',
          DEF: '1',
          MIN: '1',
          MAX: '8',
          PLC_TYPE: 'uint16',
          PLC_Address: '1001',
          remark: '一些内容说明',
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
  components: {
    Header,
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.alertTitle = `已经选择 ${val.length} 了项`;
      console.log(this.multipleSelection);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dictionary-information-container {
  width: 1500px;

  .form {
    margin-top: 20px;
    .el-input,
    .el-select {
      width: 100%;
    }
    .label {
      line-height: 40px;
      text-align: center;
    }
  }
  .buttons-container {
    margin: 20px 20px;
  }
  .el-table {
    margin: 20px 0;
    .el-link {
      margin: 0 5px;
    }
  }
}
</style>
