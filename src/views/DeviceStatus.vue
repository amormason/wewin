<template>
  <div class="device-status-container">
    <Header breadcrumb="设备状态" title="设备状态" />
    <div class="data-table">
      <div class="flex">
        <div class="label-container">连接模式:</div>
        <vxe-button :status="mode=='active' ?'primary':'default'" >Active</vxe-button>
        <vxe-button :status="mode=='passive' ?'primary':'default'" >Passtive</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">TCP/IP状态:</div>
        <vxe-button :status="info.tcpStatus==1 ?'primary':'default'" >Conned</vxe-button>
        <vxe-button :status="info.tcpStatus==0 ?'primary':'default'" >No Con</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">Hsms状态:</div>
        <vxe-button :status="info.hsmsStatus==1 ?'primary':'default'" >Select</vxe-button>
        <vxe-button :status="info.hsmsStatus==0 ?'primary':'default'" >NotSelect</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">Communicating1:</div>
        <vxe-button :status="info.commStatus==0 ?'primary':'default'" >Disable</vxe-button>
        <vxe-button :status="info.commStatus==1 ?'primary':'default'" >Enable</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">Communicating2:</div>
        <vxe-button :status="info.commStatus2==1 ?'primary':'default'" >Comm</vxe-button>
        <vxe-button :status="info.commStatus2==0 ?'primary':'default'" >No Comm</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">Not Comm:</div>
        <vxe-button :status="info.noCommStatus==0 ?'primary':'default'" >Wait CR Fr Host</vxe-button>
        <vxe-button :status="info.noCommStatus==1 ?'primary':'default'" >Wait Delay</vxe-button>
        <vxe-button :status="info.noCommStatus==2 ?'primary':'default'" >Wait CR</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">Control:</div>
        <vxe-button :status="info.ctrlStatus==0 ?'primary':'default'" >OFF</vxe-button>
        <vxe-button :status="info.ctrlStatus==1 ?'primary':'default'" >ON</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">Off-Line:</div>
        <vxe-button :status="info.offLineStatus==1 ?'primary':'default'" >Att On</vxe-button>
        <vxe-button :status="info.offLineStatus==0 ?'primary':'default'" >Host Off</vxe-button>
        <vxe-button :status="info.offLineStatus==2 ?'primary':'default'" >Equ Off</vxe-button>
      </div>
      <div class="flex">
        <div class="label-container">On-Line:</div>
        <vxe-button :status="info.onLineStatus==0 ?'primary':'default'" >Local</vxe-button>
        <vxe-button :status="info.onLineStatus==1 ?'primary':'default'" >Remote</vxe-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./common/Header.vue";

export default {
  name: "DeviceStatus",
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
      return this.$store.state.deviceMode || "";
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.device-status-container {
  .flex {
    display: flex;
    margin: 1rem 0;
    .label-container {
      margin-right: 1rem;
      line-height: 34px;
    }
    .vxe-button {
      margin-left: 0;
    }
  }
}
</style>
