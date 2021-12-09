<template>
  <div class="module-network-configuration-container">
    <Header breadcrumb="网络模块" title="模块网络配置" secondTitle="配置模块的网口IP信息，配置完成后将会重启模块。" />
    <div class="data-table">
      <div class="operation">
        <vxe-button size="medium" status="success" icon="vxe-icon--check" :disabled="loading" @click="handleSubmit">提交</vxe-button>
        <vxe-button size="medium" icon="vxe-icon--refresh" :disabled="loading" @click="resetData">重置</vxe-button>
      </div>

      <div class="form-container">
        <div >
          <div class="demo-input-suffix">
            <label>IPv4地址1：</label>
            <vxe-input :disabled="loading" placeholder="IPv4地址1" v-model="net1.ip" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>子网掩码1：</label>
            <vxe-input :disabled="loading" placeholder="子网掩码1" v-model="net1.mask" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>网关1：</label>
            <vxe-input :disabled="loading" placeholder="网关1" v-model="net1.gw" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>DNS1：</label>
            <vxe-input :disabled="loading" placeholder="DNS1" v-model="net1.dns" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>本机端口号1：</label>
            <vxe-input :disabled="loading" placeholder="DNS1" v-model="net1.hsmsPort" clearable maxlength="5" oninput="value=value.replace(/[^\d]/g,'');">
            </vxe-input>
          </div>
        </div>
        <div >
          <div class="demo-input-suffix">
            <label>IPv4地址2：</label>
            <vxe-input :disabled="loading" placeholder="IPv4地址2" v-model="net2.ip" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>子网掩码2：</label>
            <vxe-input :disabled="loading" placeholder="子网掩码2" v-model="net2.mask" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>网关2：</label>
            <vxe-input :disabled="loading" placeholder="网关2" v-model="net2.gw" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>DNS2：</label>
            <vxe-input :disabled="loading" placeholder="DNS2" v-model="net2.dns" clearable maxlength="15" oninput="value=value.replace(/[^\d^\.]+/g,'');">
            </vxe-input>
          </div>
          <div class="demo-input-suffix">
            <label>本机端口号2：</label>
            <vxe-input :disabled="loading" placeholder="DNS1" v-model="net2.hsmsPort" clearable maxlength="5" oninput="value=value.replace(/[^\d]/g,'');">
            </vxe-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./common/Header.vue";
import { getNetworkInfo, setNetworkInfo } from "../api/request";

export default {
  name: "ModuleNetworkConfiguration",
  data() {
    return {
      loading: false,
      dataCopy: {},
      net1: {
        ip: "",
        mask: "",
        gw: "",
        dns: "",
      },
      net2: {
        ip: "",
        mask: "",
        gw: "",
        dns: "",
      },
    };
  },
  components: {
    Header,
  },
  methods: {
    checkData() {
      if (this.net1.ip === this.net2.ip) {
        this.$message.error("IPv4地址1和IPv4地址2不能相同");
        return false;
      }

      if (this.net1.ip && !this.GLOBAL.isValidIP(this.net1.ip)) {
        this.$message.error("IPv4地址1必须是有效的IP地址");
        return false;
      }
      if (this.net2.ip && !this.GLOBAL.isValidIP(this.net2.ip)) {
        this.$message.error("IPv4地址2必须是有效的IP地址");
        return false;
      }

      return true;
    },
    handleSubmit() {
      this.loading = true;
      if (this.checkData()) {
        setNetworkInfo({
          net1: this.net1,
          net2: this.net2,
        })
          .then((res) => {
            if (res.status === 200) {
              this.$XModal.message({
                content: res.msg || "恭喜你，这是一条成功消息",
                status: "success",
              });
              getNetworkInfo();
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    resetData() {
      const { net1, net2 } = this.dataCopy;
      this.net1 = JSON.parse(JSON.stringify(net1));
      this.net2 = JSON.parse(JSON.stringify(net2));
      console.log(JSON.stringify(this.dataCopy, null, 4));
    },
  },
  mounted() {
    getNetworkInfo().then((res) => {
      this.dataCopy = JSON.parse(JSON.stringify(res.data));
      this.net1 = res.data.net1;
      this.net2 = res.data.net2;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.module-network-configuration-container {
  .form-container {
    width: 900px;
    line-height: 32px;
    display: flex;
    .demo-input-suffix {
      margin: 1rem 0;
      label {
        display: inline-block;
        width: 120px;
        text-align: right;
      }
    }
  }
}
</style>
