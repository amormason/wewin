<template>
  <div class="dictionary-information-container">
    <Header breadcrumb="字典信息" title="字典信息" />
    <el-row :gutter="10" class="form">
      <el-col :span="2" class="label"> Key: </el-col>
      <el-col :span="6">
        <el-input
          placeholder="请输入"
          suffix-icon="el-icon-date"
          v-model="req.keyWord"
        >
        </el-input>
      </el-col>

      <el-col :span="2" class="label"> 状态: </el-col>
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

    <el-alert title="成功提示的文案" type="success" effect="dark"> </el-alert>

    <el-table
      :data="tableData"
      highlight-current-row
      stripe
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="date" label="Key" sortable width="100">
      </el-table-column>
      <el-table-column prop="name" label="Value" sortable width="100">
      </el-table-column>
      <el-table-column prop="address" label="类型" sortable> </el-table-column>
      <el-table-column prop="address" label="备注" sortable> </el-table-column>
      <el-table-column prop="date" label="创建时间" sortable> </el-table-column>
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
  name: 'ModuleNetworkConfiguration',
  data() {
    return {
      req: {
        keyWord: '',
        status: '',
        gateway: '',
        dns: '',
      },
      currentPage4: 2,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
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
