<template>
  <div class="device-status-container">
    <Header breadcrumb="设备状态" title="设备状态" />
    <div class="data-table">
      <el-row>
        <el-col :span="8" class="label-container">连接模式:</el-col>
        <el-col :span="16" class="value-container">
          {{ info.commStatus }}
          <!-- <el-link type="danger" icon="el-icon-error" v-if="!info.commStatus">获取连接模式失败</el-link> -->
          <!-- <el-button-group>
            <el-button
              :type="info.mode === 'active' ? 'success' : ''"
              size="small"
              >Active</el-button
            >
            <el-button
              :type="info.mode === 'passtive' ? 'success' : ''"
              size="small"
              >Passtive</el-button
            >
          </el-button-group> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">Active状态:</el-col>
        <el-col :span="16" class="value-container">
          {{ info.dataStatus }}
          <!-- <el-link type="danger" icon="el-icon-error" v-if="!info.active">获取Active状态失败
          </el-link> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">业务状态:</el-col>
        <el-col :span="16" class="value-container">
          {{ info.hsmsStatus }}
          <!-- <el-link type="danger" icon="el-icon-error" v-if="!info.hsmsStatus">获取业务状态失败
          </el-link> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">PLC状态:</el-col>
        <el-col :span="16" class="value-container">
          {{ info.lineStatus }}
          <!-- <el-link type="danger" icon="el-icon-error" v-if="!info.lineStatus">获取PLC状态失败
          </el-link> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="label-container">数据状态:</el-col>
        <el-col :span="16" class="value-container">
          <!-- <i class="el-icon-loading"></i> -->
          {{ info.tcpStatus }}
          <!-- <el-link type="danger" icon="el-icon-error" v-if="!info.tcpStatus">获取数据状态失败
          </el-link> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import { getDeviceStatus } from '@/api/request';

export default {
  name: 'DeviceStatus',
  data() {
    return {
      info: {
        commStatus: 0,
        dataStatus: 0,
        hsmsStatus: 0,
        lineStatus: 0,
        tcpStatus: 0,
      },
    };
  },
  components: {
    Header,
  },
  methods: {},
  mounted() {
    getDeviceStatus()
      .then((res) => {
        if (res.status === 200) {
          this.info = res.data;
        }
      })
      .catch(() => {
        this.info = {};
      });
  },
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
