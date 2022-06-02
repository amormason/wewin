<template>
  <div class="device-status-container">
    <Header breadcrumb="设备状态" title="设备状态" />
    <div class="data-table">
      <el-row>
        <el-col :span="8" class="label-container">连接模式:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="mode=='active' ?'primary':'default'" size="small">Active</el-button>
            <el-button :type="mode=='passive' ?'primary':'default'" size="small">Passtive</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">TCP/IP状态:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.tcpStatus==1 ?'primary':'default'" size="small">Conned</el-button>
            <el-button :type="info.tcpStatus==0 ?'primary':'default'" size="small">No Con</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">Hsms状态:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.hsmsStatus==1 ?'primary':'default'" size="small">Select</el-button>
            <el-button :type="info.hsmsStatus==0 ?'primary':'default'" size="small">NotSelect</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">Communicating1:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.commStatus==0 ?'primary':'default'" size="small">Disable</el-button>
            <el-button :type="info.commStatus==1 ?'primary':'default'" size="small">Enable</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">Communicating2:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.commStatus2==1 ?'primary':'default'" size="small">Comm</el-button>
            <el-button :type="info.commStatus2==0 ?'primary':'default'" size="small">No Comm</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">Not Comm:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.noCommStatus==0 ?'primary':'default'" size="small">Wait CR Fr Host</el-button>
            <el-button :type="info.noCommStatus==1 ?'primary':'default'" size="small">Wait Delay</el-button>
            <el-button :type="info.noCommStatus==2 ?'primary':'default'" size="small">Wait CR</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">Control:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.ctrlStatus==0 ?'primary':'default'" size="small">OFF</el-button>
            <el-button :type="info.ctrlStatus==1 ?'primary':'default'" size="small">ON</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">Off-Line:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.offLineStatus==1 ?'primary':'default'" size="small">Att On</el-button>
            <el-button :type="info.offLineStatus==0 ?'primary':'default'" size="small">Host Off</el-button>
            <el-button :type="info.offLineStatus==2 ?'primary':'default'" size="small">Equ Off</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">On-Line:</el-col>
        <el-col :span="16" class="value-container">
          <el-button-group>
            <el-button :type="info.onLineStatus==0 ?'primary':'default'" size="small">Local</el-button>
            <el-button :type="info.onLineStatus==1 ?'primary':'default'" size="small">Remote</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';

export default {
  name: 'DeviceStatus',
  data() {
    return {};
  },
  components: {
    Header,
  },
  methods: {},
  computed: {
    info() {
      return this.$store.state.deviceInfo || {};
    },
    mode() {
      return this.$store.state.deviceMode || '';
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.device-status-container {
  .data-table {
    width: 500px;
    margin-top: 20px;
    margin-left: 100px;
    line-height: 32px;
    .el-row {
      margin: 16px 0;
      i {
        margin-right: 5px;
        color: $success-text-color;
      }
      .label-container {
        text-align: right;
        padding-right: 20px;
      }
    }
  }
}
</style>
